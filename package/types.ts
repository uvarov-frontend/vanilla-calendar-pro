import type labels from './labels';
import type styles from './styles';
import { FormatDateString } from './types/FormatDateString';
import { IActions } from './types/IActions';
import { IDates } from './types/IDates';
import { IHtmlElementPosition } from './types/IHtmlElementPosition';
import { ILayouts } from './types/ILayouts';
import { ILocale, Locale } from './types/ILocale';
import { IOptions } from './types/IOptions';
import { IPopup, IPopups } from './types/IPopup';
import { IPrivateVariables } from './types/IPrivateVariables';
import { IRange } from './types/IRange';
import { IReset } from './types/IReset';
import { ISelected } from './types/ISelected';
import { ISelection } from './types/ISelection';
import { ISettings } from './types/ISettings';
import { IVanillaCalendar } from './types/IVanillaCalendar';
import { IVisibility } from './types/IVisibility';
import { Positions } from './types/Positions';
import { Range } from './types/Range';
import { ToggleSelected } from './types/ToggleSelected';
import { TypesCalendar } from './types/TypesCalendar';
import { WeekDayID, WeekDays } from './types/WeekDays';

type Styles = typeof styles;

type Labels = typeof labels;

export {
  IActions,
  FormatDateString,
  IDates,
  IHtmlElementPosition,
  Labels,
  ILayouts,
  ILocale,
  Locale,
  IOptions,
  IPopup,
  IPopups,
  IPrivateVariables,
  IRange,
  IReset,
  ISelected,
  ISelection,
  Styles,
  ISettings,
  IVanillaCalendar,
  IVisibility,
  Positions,
  Range,
  ToggleSelected,
  TypesCalendar,
  WeekDays,
  WeekDayID,
};
