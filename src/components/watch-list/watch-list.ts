import Component from "../component";
import Watch from "../watch/watch";
import {watchListTemplate} from "./watch-list-template";
import {timeZones} from "../../model/time-zones";

export default class WatchList extends Component {
    readonly element: HTMLDivElement;
    private readonly addWatchButton: HTMLButtonElement;
    private readonly timeZoneSelect: HTMLSelectElement;

    constructor() {
        super();

        // Create main element and set HTML using template
        this.element = document.createElement("div");
        const watchListHTML = watchListTemplate();
        this.element.innerHTML = watchListHTML;

        // Bind UI elements
        this.addWatchButton = this.element.querySelector('.add-watch-button');
        this.timeZoneSelect = this.element.querySelector('#timezones') as HTMLSelectElement;

        // Add event listener to add watch button
        this.addWatchButton.addEventListener('click', () => this.addWatch(this.timeZoneSelect.value));

    }

    // Populate the time zone select dropdown
    populateTimeZones() {
        const timeZoneSelect = document.getElementById("timezones") as HTMLSelectElement;
        timeZones.forEach(timeZone => {
            const option = document.createElement('option');
            option.textContent = timeZone;
            timeZoneSelect.add(option);
        });
    }

    // Initialize the watch list with 4 default watches
    init() {
        for (let i = 0; i < 4 && i < timeZones.length; i++) {
            this.addWatch(timeZones[i]);
        }
        this.populateTimeZones();
    }

    // Add a new watch based on the selected time zone
    addWatch(timeZone: string) {
        const watch = new Watch(timeZone);
        const allClockElement = document.getElementById('allClocks');
        if (!allClockElement) {
            console.error("All Clocks element not found");
            return;
        }
        watch.render(allClockElement);
    }
}
