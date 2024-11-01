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
import { ISelection } from './types/ISelection';
import { ISettings } from './types/ISettings';
import { IVanillaCalendar } from './types/IVanillaCalendar';
import { MonthsCount } from './types/MonthsCount';
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
  MonthsCount,
  ILocale,
  Locale,
  IOptions,
  IPopup,
  IPopups,
  IPrivateVariables,
  IRange,
  IReset,
  ISelection,
  Styles,
  ISettings,
  IVanillaCalendar,
  Positions,
  Range,
  ToggleSelected,
  TypesCalendar,
  WeekDays,
  WeekDayID,
};
