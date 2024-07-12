export default class WatchModel {
    public timeZone: string;
    public hoursIncrement: number = 0;
    public minutesIncrement: number = 0;


    constructor(timeZone: string) {
        this.timeZone = timeZone;
    }

    resetTime(): void {
        this.hoursIncrement = 0;
        this.minutesIncrement = 0;
    }

    increaseHours(): void {
        this.hoursIncrement++;
    }

    increaseMinutes(): void {
        this.minutesIncrement++;
    }

}
