import WatchController from "../watch/watch-controller";

class TimeController {
    private currentTime: Date;
    private watches: WatchController[];

    constructor() {
        this.currentTime = new Date();
        this.watches = [];
        setInterval(() => {
            this.currentTime = new Date();
            this.updateWatches();
        }, 1000);
    }

    public getCurrentTime(): Date {
        return this.currentTime;
    }

    public addWatch(watch: WatchController) {
        this.watches.push(watch);
    }

    private updateWatches() {
        this.watches.forEach(watch => {
            watch.updateTime(this.currentTime);
        });
    }
}

const globalTimeController = new TimeController();
export default globalTimeController;
