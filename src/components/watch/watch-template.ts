export const watchTemplate = (timeZone: string): string => `
<div class="watch-item">
    <!-- Container for a single watch item -->
    <div class="timezone">${timeZone}</div>
    <!-- Display the timezone for this watch -->
    <div class="watch">
        <!-- Watch container -->
        <div class="watch__content">
            <!-- Container for stopwatch content -->
            <div class="time"></div>
            <!-- Display the current time for this watch -->
        </div>
        <div class="buttons">
            <!-- Container for watch control buttons -->
            <button class="watch-mode-button"><span></span></button>
            <!-- Button to toggle mode -->  
            <div class="watch-mode watch__control">
                <div class="mode-button"></div>
            </div>
            <button class="watch-increment-button"><span></span></button>
            <!-- Button to increment time -->
            <div class="watch-increment watch__control"> <!--watch-increment for moving the button-->
                <div class="increment-button"></div> <!--for design-->
       
            </div>
            <button class="watch-reset-button"><span></span></button>
            <!-- Button to reset time -->
            <div class="watch-reset watch__control">
                <div class="reset-button"></div>
            </div>
            <button class="watch-light-button"><span></span></button>
            <!-- Button to toggle light -->
            <div class="watch-light watch__control">
                <div class="light-button"></div>
            </div>
            <button class="watch-format-button"><span></span></button>
            <!-- Button to toggle time format -->
            <div class="watch-format watch__control">
                <div class="format-button"></div>
            </div>
        </div>
    </div>
</div>
`;
