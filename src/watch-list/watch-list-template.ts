export const watchListTemplate = (): string => `
<div class="wrapper">
    <!-- Wrapper div for the entire watch list -->
    <div class="top-banner">
        <!-- Top banner-->
        <div class="add-clock-banner">
            <!-- Banner for adding a new clock -->
            <label for="timezones">Time zones list:</label>
            <!-- Label for the time zones dropdown -->
            <select name="timezones" id="timezones" class="timezones"></select>
            <!-- Dropdown for selecting time zones -->
            <button class="add-watch-button">Add Clock</button>
            <!-- Button to add a new clock -->
        </div>
        <img src="../src/assets/watchDescription.png" class="watchDescription" alt="">
        <!-- Image displaying watch description -->
    </div>

    <div id="allClocks" class="allClocks">
        <!-- Container for displaying all clocks -->
    </div>
</div>
`;
