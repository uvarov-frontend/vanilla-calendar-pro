declare const TimeRange: (name: string, CSSClass: string, labels: {
    [key: string]: string;
}, min: number, max: number, step: number, value: string) => string;
export default TimeRange;
