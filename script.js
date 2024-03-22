const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const hourHand = document.getElementById('hour-hand');

// Function to rotate clock hands
function rotateClockHand(element, rotation) {
    element.style.setProperty('--rotate', rotation * 360);
}

// Function to generate a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Function to change color of numbers and clock hands
function changeColor() {
    let count = 0;
    const interval = setInterval(() => {
        count += 2;
        if (count > 60) {
            clearInterval(interval); // Stop the interval when count exceeds 60 seconds
            changeColor(); // Restart the color change process
            return;
        }

        const color = getRandomColor(); // Generate a random color
        document.querySelectorAll('.number').forEach(number => {
            number.style.color = color; // Apply color to each number
            number.style.textShadow = `0 0 10px ${color}`; // Apply text shadow with the same color
        });

        // Apply color to hour and minute hands
        hourHand.style.backgroundColor = color;
        minuteHand.style.backgroundColor = color;
    }, 1000); // Change color every 2 seconds
}

// Call the function to change number color and clock hands color
changeColor();

// Counter to keep track of ticks
let tickCounter = 0;

// Function to update clock hands every second
function clockTick() {
    const date = new Date();
    const seconds = date.getSeconds() / 60;
    const minutes = (seconds + date.getMinutes()) / 60;
    const hours = (minutes + date.getHours()) / 12;

    rotateClockHand(secondHand, seconds);
    rotateClockHand(minuteHand, minutes);
    rotateClockHand(hourHand, hours);

    // Play ticking sound
    const tickSound = new Audio('tick.mp3');
    tickSound.play();

    // Increment tick counter
    tickCounter++;

    // Reset tick counter after 60 seconds
    if (tickCounter >= 60) {
        tickCounter = 0;
    }
}

// Call the clockTick function every second
setInterval(clockTick, 1000);

// Call the clockTick function immediately to ensure the clock is properly initialized
clockTick();
