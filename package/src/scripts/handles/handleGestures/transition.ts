import { isEnabled } from '@scripts/utils/animate';
import type { Calendar } from '@src/index';

export type Transition = {
  distance: number;
  from: number;
  track: () => void;
  seek: (progress: number) => void;
  settle: (toEnd: boolean) => void;
};

export const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const MIN_SETTLE_DURATION_RATIO = 0.8;
const KEYFRAME_META = new Set(['offset', 'computedOffset', 'easing', 'composite']);

const cssName = (property: string) => property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const getSettleFrames = (animation: Animation, toEnd: boolean) => {
  const effect = animation.effect as KeyframeEffect | null;
  const target = effect?.target;
  if (!effect || !(target instanceof Element)) return null;

  const keyframes = effect.getKeyframes();
  const endpoint = keyframes[toEnd ? keyframes.length - 1 : 0];
  if (!endpoint) return null;

  const computed = getComputedStyle(target);
  const current: Keyframe = {};
  const end: Keyframe = {};

  Object.entries(endpoint).forEach(([property, value]) => {
    if (KEYFRAME_META.has(property)) return;
    current[property] = computed.getPropertyValue(cssName(property));
    end[property] = value;
  });

  return { effect, keyframes: [current, end] };
};

export const scrub = (self: Calendar, animations: Animation[], duration: number, finish: (toEnd: boolean) => void) => {
  animations.forEach((animation) => animation.pause());
  const easing = animations[0]?.effect?.getTiming().easing ?? 'linear';
  let tracked = false;

  // Finish events can race with a manual settle.
  let settled = false;
  const done = (toEnd: boolean) => {
    if (settled) return;
    settled = true;
    finish(toEnd);
  };

  const track = () => {
    tracked = true;
    animations.forEach((animation) => animation.effect?.updateTiming({ easing: 'linear' }));
  };

  const seek = (progress: number) => {
    const time = clamp(progress) * duration;
    animations.forEach((animation) => {
      animation.currentTime = time;
    });
  };

  const settle = (toEnd: boolean) => {
    if (settled) return;
    if (!animations.length || !isEnabled(self) || animations[0].currentTime === (toEnd ? duration : 0)) return done(toEnd);

    if (tracked) {
      const progress = clamp(Number(animations[0].currentTime) / duration);
      const remaining = Math.abs(Number(toEnd) - progress);
      const settleDuration = duration * Math.max(remaining, MIN_SETTLE_DURATION_RATIO);
      // Start from computed pixels so restoring easing cannot move the content on release.
      const frames = animations.map((animation) => getSettleFrames(animation, toEnd));
      if (frames.every((frame) => frame !== null)) {
        frames.forEach((frame, index) => {
          if (!frame) return;
          const animation = animations[index];
          frame.effect.setKeyframes(frame.keyframes);
          animation.effect?.updateTiming({ duration: settleDuration, easing });
          animation.currentTime = 0;
          animation.playbackRate = 1;
          animation.play();
        });
        animations[0].onfinish = () => done(toEnd);
        return;
      }
    }

    animations.forEach((animation) => {
      animation.playbackRate = toEnd ? 1 : -1;
      animation.play();
    });
    animations[0].onfinish = () => done(toEnd);
  };

  return { track, seek, settle };
};
