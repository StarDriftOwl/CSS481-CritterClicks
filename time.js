
// Function to update the countdown timer
function updateCountdown() {
    const now = new Date();
    const utc8Offset = -8 * 60; // UTC-8 in minutes
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60000; // UTC time in ms
    const localUtc8Time = new Date(utcNow + utc8Offset * 60000);

    let resetTime = new Date(localUtc8Time);
    resetTime.setUTCHours(12, 0, 0, 0); // Set to 12:00 PM UTC-8

    if (localUtc8Time > resetTime) {
        resetTime.setUTCDate(resetTime.getUTCDate() + 1); // Move to next day
    }

    let timeRemaining = resetTime - localUtc8Time; // Time until reset in milliseconds
    let hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("login").innerHTML = 
        `<a href="dailyLogin.html">Daily login (Resets in ${hours}h ${minutes}m ${seconds}s)</a>`;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to set the countdown immediately
