// Task 3: An array of sample paragraphs
const randomParagraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing is a skill that improves with practice and persistence.",
    "JavaScript is a versatile language used for web development.",
    "Keep calm and code on. Typing is fun when you practice."
  ];

// Task 3, 4, 5, 6, 7, 8: DOM Elements
const randomParagraphElement = document.getElementById("randomParagraph");

const textInputElement = document.getElementById("textInput");

const timerDisplayElement = document.getElementById("timer-display");

const speedDisplayElement = document.getElementById("speed");

const accuracyDisplayElement = document.getElementById("accuracy");

const startButton = document.getElementById("startButton");

const stopButton = document.getElementById("stopButton");

// Task 3, 5: State Variables
let selectedParagraph = "";
let testRunning = false;
let startTime = null;
let timerInterval = null;

// Task 3: Pick and display a random paragraph
function displayRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * randomParagraphs.length);
    selectedParagraph = randomParagraphs[randomIndex];
    randomParagraphElement.textContent = selectedParagraph;
  }

// Task 4: Event Listener: Monitor typing and end test if completed
textInputElement.addEventListener("input", () => {
    if (textInputElement.value.trim() === selectedParagraph) {
        endTest();
    }
});

// Function: Start the typing test
function startTest() {
    // Task 8: Clear data on start
    clearData();

    // Task 3: Display the paragraph if test is running
    if (testRunning) return;
    displayRandomParagraph();
  
    // Perform additional logic to start the test
    testRunning = true;

    // Task 5: Update timer after every second
    startTime = Date.now();
    // Add periodic update after every second
    timerInterval = setInterval(updateTimer, 1000);

}


// Function: Stop the typing test
function endTest() {
    // Task 4: Exit if test is not running; otherwise, stop the test
    if (!testRunning) return;

    console.log("Test stopped!");

    // Perform additional logic to end the test
    testRunning = false;

    // Task 5: Stop the timer
    clearInterval(timerInterval);

    // Task 6: Calculate and display typing speed
    // Calculate speed (words per minute)
    const speed = calculateSpeed();
    speedDisplayElement.textContent = `Speed: ${speed} WPM`;

    // Task 7: Update the accuracy display element
    // Calculate speed (in percentage)
    const accuracy = calculateAccuracy();
    accuracyDisplayElement.textContent = `Accuracy: ${accuracy}%`;

}

// Task 5: Function: Update the timer display
function updateTimer() {
    if (!startTime) return;

    const elapsedTime = Date.now() - startTime;
    timerDisplayElement.textContent = formatTime(elapsedTime);
}

// Task 5: Utility: Format time in HH:MM:SS

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Task 6: Function: Calculate typing speed (WPM)
function calculateSpeed() {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const wordCount = textInputElement.value.trim().split(" ").filter(Boolean).length;
    return Math.round((wordCount / elapsedSeconds) * 60); // Words per minute
}

// Task 7: Function: Calculate typing accuracy
function calculateAccuracy() {
    const originalWords = selectedParagraph.split(" ");
    const typedWords = textInputElement.value.trim().split(" ");
    let correctWords = 0;

    originalWords.forEach((word, index) => {
        if (typedWords[index] === word) correctWords++;
    });

    return Math.round((correctWords / originalWords.length) * 100); // percentage
}

// Task 8: Event Listener: Start button

startButton.addEventListener("click", startTest);

// Task 8: Event Listener: Stop button

stopButton.addEventListener("click", () => {
    if (testRunning) {
        endTest();
    } else {
        alert("The test is not running!");
    }
});


// Task 8: Function: Clear data and reset the UI
function clearData() {
    textInputElement.value = "";
    timerDisplayElement.textContent = "00:00:00";
    speedDisplayElement.textContent = "";
    accuracyDisplayElement.textContent = "";
    clearInterval(timerInterval);
    startTime = null;
    testRunning = false;
}
