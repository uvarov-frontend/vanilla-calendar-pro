/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Calendar, ContextVariables } from '@src/index';

const setContext = <K extends keyof ContextVariables>(self: Calendar, name: K, value: ContextVariables[K]) => {
  (self.context as any)[name] = value;
};

export default setContext;
