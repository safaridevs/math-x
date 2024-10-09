let num1, num2;
let score = 0;
let timeLeft = 60;
let maxNumber = 10;
let leaderboard = [];

// Generate multiplication question based on current level
function generateQuestion() {
    num1 = Math.floor(Math.random() * maxNumber) + 1;
    num2 = Math.floor(Math.random() * maxNumber) + 1;
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

// Start a timer
function startTimer() {
    const timerInterval = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up! Your final score is ' + score);
            let playerName = prompt('Enter your name to save your score:');
            document.getElementById('result').innerHTML = '';
            updateLeaderboard(playerName, score);
        } else {
            document.getElementById('timer').innerHTML = `Time left: ${timeLeft} seconds`;
        }
        timeLeft--;
    }, 1000);
}

// Set level based on button clicked
function setLevel(level) {
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

// Reset the game for new rounds
function resetGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('score').innerHTML = `Score: 0`;
    document.getElementById('timer').innerHTML = `Time left: ${timeLeft} seconds`;
    nextQuestion();
}

// Generate the first question when the page loads
window.onload = function() {
    generateQuestion();
};
