let num1, num2;
let score = 0;
let timeLeft = 60;
let maxNumber = 10;
let leaderboard = [];
let usedQuestions = [];
let levelActive = false;

// Generate multiplication question without repeating the same numbers in the same order
function generateQuestion() {
    do {
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;
    } while (usedQuestions.includes(`${num1}x${num2}`));

    usedQuestions.push(`${num1}x${num2}`); // Track used questions

    document.getElementById('question').innerHTML = `What is ${num1} x ${num2}?`;
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
}

// Move to the next question
function nextQuestion() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').classList.remove('correct', 'wrong');
    generateQuestion();
}

// Start a timer and disable level buttons during gameplay
function startTimer() {
    disableLevelButtons(true);
    const timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your final score is ' + score);
            let playerName = prompt('Enter your name to save your score:');
            updateLeaderboard(playerName, score);
            resetGame();  // Reset fields except leaderboard
        } else {
            document.getElementById('timer').innerHTML = `Time left: ${timeLeft} seconds`;
        }
        timeLeft--;
    }, 1000);
}

// Set level based on button clicked and start the game
function setLevel(level) {
    if (levelActive) return; // Prevent switching levels during an active game
    levelActive = true;

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

// Disable or enable level buttons
function disableLevelButtons(disable) {
    document.getElementById('level1').disabled = disable;
    document.getElementById('level2').disabled = disable;
    document.getElementById('level3').disabled = disable;
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

// Reset the game for new rounds, but keep the leaderboard intact
function resetGame() {
    score = 0;
    timeLeft = 60;
    usedQuestions = [];  // Clear used questions to allow fresh set
    levelActive = false;
    document.getElementById('score').innerHTML = `Score: 0`;
    document.getElementById('timer').innerHTML = `Time left: ${timeLeft} seconds`;
    document.getElementById('result').innerHTML = '';
    document.getElementById('answer').value = '';
    disableLevelButtons(false); // Enable level buttons after game ends
    nextQuestion();
}

// Generate the first question when the page loads
window.onload = function() {
    generateQuestion();
};
