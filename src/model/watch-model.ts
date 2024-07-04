
export default class WatchModel {
    public isLightOn: boolean = false;
    public is24HourFormat: boolean = true;
    public hoursIncrement: number = 0;
    public minutesIncrement: number = 0;
    public readonly timeZone: string;

    constructor(timeZone: string) {
        this.timeZone = timeZone;
    }
}
