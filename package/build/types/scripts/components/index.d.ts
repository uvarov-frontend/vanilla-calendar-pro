export declare const components: {
    ArrowNext: (self: import('../..').VanillaCalendarPro, type: "month" | "year") => string;
    ArrowPrev: (self: import('../..').VanillaCalendarPro, type: "month" | "year") => string;
    ControlTime: (self: import('../..').VanillaCalendarPro) => string;
    Dates: (self: import('../..').VanillaCalendarPro) => string;
    Month: (self: import('../..').VanillaCalendarPro) => string;
    Months: (self: import('../..').VanillaCalendarPro) => string;
    Week: (self: import('../..').VanillaCalendarPro) => string;
    WeekNumbers: (self: import('../..').VanillaCalendarPro) => string;
    Year: (self: import('../..').VanillaCalendarPro) => string;
    Years: (self: import('../..').VanillaCalendarPro) => string;
};
export declare const getComponent: (pattern: string) => ((self: import('../..').VanillaCalendarPro, type: "month" | "year") => string) | ((self: import('../..').VanillaCalendarPro, type: "month" | "year") => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string) | ((self: import('../..').VanillaCalendarPro) => string);
