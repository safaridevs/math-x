let num1, num2;
let score = 0;
let timeLeft = 120;  // Set the timer to 2 minutes
let maxNumber = 10;
let leaderboard = [];
let usedPairs = [];  // Array to store used number pairs
let gameActive = false;  // Track whether a game is active
let timerInterval;
let nextQuestionTimeout;

// Generate unique multiplication question
function generateQuestion() {
    let newPair;
    do {
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;
        newPair = [num1, num2];
    } while (isPairUsed(newPair));

    usedPairs.push(newPair);  // Store the generated pair
    document.getElementById('question').innerHTML = `What is ${num1} x ${num2}?`;
}

// Check if the generated pair has been used before
function isPairUsed(pair) {
    return usedPairs.some(usedPair => usedPair[0] === pair[0] && usedPair[1] === pair[1]);
}

// Check the student's answer
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer').value);
    let correctAnswer = num1 * num2;

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById('result').innerHTML = 'Correct! You earned a star!';
        document.getElementById('result').classList.add('correct');
        playSound(true);
    } else {
        document.getElementById('result').innerHTML = `Wrong! The correct answer was ${correctAnswer}.`;
        document.getElementById('result').classList.add('wrong');
        playSound(false);
    }

    document.getElementById('score').innerHTML = `Score: ${score}`;
    document.getElementById('answer').value = '';  // Clear the input

    // Automatically move to the next question after 3 seconds
    nextQuestionTimeout = setTimeout(nextQuestion, 2000);
}

// Move to the next question
function nextQuestion() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').classList.remove('correct', 'wrong');
    generateQuestion();
}

// Start a timer
function startTimer() {
    timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            enableLevelButtons();
            alert('Time is up! Your final score is ' + score);
            let playerName = prompt('Enter your name to save your score:');
            updateLeaderboard(playerName, score);
            resetFields();
        } else {
            document.getElementById('timer').innerHTML = `Time left: ${timeLeft} seconds`;
        }
        timeLeft--;
    }, 1000);
}

// Set level and disable buttons while level is active
function setLevel(level) {
    if (!gameActive) {
        gameActive = true;
        disableLevelButtons();

        if (level === 1) {
            maxNumber = 5;
        } else if (level === 2) {
            maxNumber = 10;
        } else {
            maxNumber = 20;
        }
        resetGame();
        startTimer();
    }
}

// Disable level buttons
function disableLevelButtons() {
    document.getElementById('level1').disabled = true;
    document.getElementById('level2').disabled = true;
    document.getElementById('level3').disabled = true;
}

// Enable level buttons
function enableLevelButtons() {
    document.getElementById('level1').disabled = false;
    document.getElementById('level2').disabled = false;
    document.getElementById('level3').disabled = false;
}

// Play sound based on answer correctness
function playSound(isCorrect) {
    const sound = document.getElementById(isCorrect ? 'correct-sound' : 'wrong-sound');
    sound.play();
}

// Update leaderboard
function updateLeaderboard(name, score) {
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    displayLeaderboard();
}

// Display leaderboard
function displayLeaderboard() {
    let leaderboardHTML = leaderboard.map(entry => `<li>${entry.name}: ${entry.score} points</li>`).join('');
    document.getElementById('leaderboard').innerHTML = `<ul>${leaderboardHTML}</ul>`;
}

// Reset the fields after time runs out (except leaderboard)
function resetFields() {
    score = 0;
    timeLeft = 120;  // Reset time to 2 minutes
    usedPairs = [];  // Clear used number pairs
    document.getElementById('score').innerHTML = `Score: 0`;
    document.getElementById('timer').innerHTML = '';
    document.getElementById('question').innerHTML = '';
    document.getElementById('answer').value = '';
    document.getElementById('result').innerHTML = '';
    clearTimeout(nextQuestionTimeout);  // Clear any pending next question timeout
}

// Reset the game for new rounds
function resetGame() {
    score = 0;
    timeLeft = 120;  // Set to 2 minutes
    usedPairs = [];  // Reset unique question pairs
    document.getElementById('score').innerHTML = `Score: 0`;
    document.getElementById('timer').innerHTML = `Time left: ${timeLeft} seconds`;
    nextQuestion();
}

// Generate the first question when the page loads
window.onload = function() {
    generateQuestion();
};
