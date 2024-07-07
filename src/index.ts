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
