export const watchTemplate = (timeZone: string): string => `
<div class="watch-item">
    <!-- Container for a single watch item -->
    <div class="timezone">${timeZone}</div>
    <!-- Display the timezone for this watch -->

    <div class="stopwatch">
        <!-- Stopwatch container -->

        <div class="stopwatch__content">
            <!-- Container for stopwatch content -->
            <div class="time"></div>
            <!-- Display the current time for this watch -->
        </div>

        <div class="buttons">
            <!-- Container for stopwatch control buttons -->
            <button class="stopwatch-mode-button"><span></span></button>
            <!-- Button to toggle mode -->
            <button class="stopwatch-increment-button"><span></span></button>
            <!-- Button to increment time -->
            <button class="stopwatch-reset-button"><span></span></button>
            <!-- Button to reset time -->

            <!-- Additional controls -->
            <div class="stopwatch-mode stopwatch__control">
                <div class="mode-button"></div>
            </div>
            <div class="stopwatch-increment stopwatch__control">
                <div class="increment-button"></div>
            </div>
            <div class="stopwatch-reset stopwatch__control">
                <div class="reset-button"></div>
            </div>
            <button class="stopwatch-light-button"><span></span></button>
            <!-- Button to toggle light -->
            <div class="stopwatch-light stopwatch__control">
                <div class="light-button"></div>
            </div>
            <button class="stopwatch-format-button"><span></span></button>
            <!-- Button to toggle time format -->
            <div class="stopwatch-format stopwatch__control">
                <div class="format-button"></div>
            </div>
        </div>
    </div>
</div>
`;
