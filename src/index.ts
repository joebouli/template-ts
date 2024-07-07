import './index.css';
import { timeZones } from './model/time-zones';
import Watch from "./components/watch/watch";
import WatchList from "./components/watch-list/watch-list";

const appElement = document.getElementById('app');

function renderApp(){
    if(appElement!==null){
        const watchList = new WatchList();
        watchList.render(appElement);
        watchList.init();

    }
}

renderApp()
//render function
/*
document.addEventListener("DOMContentLoaded", () => {
    const defaultId = "clockDefault";
    let clockIndex = 1;
    const defaultElement = document.getElementById(defaultId);
    defaultElement.innerHTML = watchTemplate(defaultId);
    new Watch(defaultElement, 0); // Default to UTC

    const timeZoneSelect = document.getElementById("timezones") as HTMLSelectElement;
    const addClockButton = document.getElementById("addClockButton");
    const allClocks = document.getElementById("allClocks");

    // Populate the time zones select element
    timeZones.forEach(zone => {
        const option = document.createElement("option");
        option.value = zone.offset.toString();
        option.text = zone.label;
        timeZoneSelect.appendChild(option);
    });

    addClockButton.addEventListener("click", () => {
        const selectedTimeZone = timeZoneSelect.options[timeZoneSelect.selectedIndex].text;
        const selectedOffset = parseInt(timeZoneSelect.value, 10);

        const newClockId = `clock${clockIndex}`;
        const newClockHTML = watchTemplate(newClockId);

        const newClock = document.createElement("div");
        newClock.id = newClockId;
        newClock.innerHTML = newClockHTML;

        const clockLabel = document.createElement("h2");
        clockLabel.textContent = `Time Zone: ${selectedTimeZone}`;
        newClock.insertBefore(clockLabel, newClock.firstChild);

        allClocks.appendChild(newClock);
        new Watch(newClock, selectedOffset);

        clockIndex++;
    });
});*/
