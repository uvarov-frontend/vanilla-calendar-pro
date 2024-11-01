import type labels from './labels';
import type styles from './styles';
import { FormatDateString } from './types/FormatDateString';
import { IDates } from './types/IDates';
import { IHtmlElementPosition } from './types/IHtmlElementPosition';
import { ILayouts } from './types/ILayouts';
import { ILocale, Locale } from './types/ILocale';
import { IOptions } from './types/IOptions';
import { IPopup, IPopups } from './types/IPopup';
import { IPrivateVariables } from './types/IPrivateVariables';
import { IReset } from './types/IReset';
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
  IReset,
  Styles,
  IVanillaCalendar,
  Positions,
  Range,
  ToggleSelected,
  TypesCalendar,
  WeekDays,
  WeekDayID,
};
