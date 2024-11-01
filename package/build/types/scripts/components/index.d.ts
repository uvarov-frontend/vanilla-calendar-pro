export declare const components: {
    ArrowNext: (self: import("../../vanilla-calendar").default, type: "month" | "year") => string;
    ArrowPrev: (self: import("../../vanilla-calendar").default, type: "month" | "year") => string;
    ControlTime: (self: import("../../vanilla-calendar").default) => string;
    Dates: (self: import("../../vanilla-calendar").default) => string;
    Month: (self: import("../../vanilla-calendar").default) => string;
    Months: (self: import("../../vanilla-calendar").default) => string;
    Week: (self: import("../../vanilla-calendar").default) => string;
    WeekNumbers: (self: import("../../vanilla-calendar").default) => string;
    Year: (self: import("../../vanilla-calendar").default) => string;
    Years: (self: import("../../vanilla-calendar").default) => string;
};
export declare const getComponent: (pattern: string) => ((self: import("../../vanilla-calendar").default, type: "month" | "year") => string) | ((self: import("../../vanilla-calendar").default, type: "month" | "year") => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string) | ((self: import("../../vanilla-calendar").default) => string);
