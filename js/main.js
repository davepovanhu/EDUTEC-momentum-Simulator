var scale = 10;
var m1 = 100;
var m2 = 10;
var vel = 10;
var count = 0;
var timeStamps = 1;
var [h1, h2] = [5, 5];
var intervalId;  // Variable to store the interval ID
var b1, b2;

window.onload = () => {
    document.getElementById("vel").value = vel;
    document.getElementById("m1").value = m1;
    document.getElementById("m2").value = m2;
    document.getElementById("Timestamps").value = timeStamps;
};

document.addEventListener('DOMContentLoaded', () => {
    const quizButton = document.querySelector('#quiz-button'); // Correct ID
    if (quizButton) {
        quizButton.addEventListener('click', (event) => {
            event.preventDefault();  // Prevent any default action like highlighting
            showQuiz();  // Call showQuiz function to display the quiz
        });
    }
});

// Function to display quiz questions
function showQuiz() {
    const quizContainer = document.getElementById("quiz-container");

    // Example quiz content
    const quizHTML = `
        <div class="quiz-question">
            <p>1.What is the formula for momentum?</p>
            <label class="quiz-answer"><input type="radio" name="q1" value="a"> Force × Acceleration</label>
            <label class="quiz-answer"><input type="radio" name="q1" value="b"> Mass × Velocity</label>
            <label class="quiz-answer"><input type="radio" name="q1" value="c"> Mass ÷ Time</label>
        </div>
        <div class="quiz-question">
            <p>2.What is the unit of momentum?</p>
            <label class="quiz-answer"><input type="radio" name="q2" value="a"> kg · m/s</label>
            <label class="quiz-answer"><input type="radio" name="q2" value="b"> m/s²</label>
            <label class="quiz-answer"><input type="radio" name="q2" value="c"> Newton</label>
        </div>
        <button onclick="submitQuiz()">Submit Quiz</button>
    `;

    // Insert the quiz into the container and display it
    quizContainer.innerHTML = quizHTML;
    quizContainer.style.display = 'block';  // Make the quiz container visible
}

// Function to handle quiz submission (optional, add more functionality if needed)
function submitQuiz() {
    // Process the quiz answers here
    alert('Quiz submitted!');
}

// Start simulation when Start button is clicked
function startSimulation() {
    document.getElementById("intro-modal").style.display = 'none'; // Hide the intro modal

    const root = document.getElementById("root");
    const rootWidth = root.offsetWidth;

    // Calculate initial positions to be near the center of the simulation area
    const centerX = rootWidth / 2;
    const initialX1 = centerX + 100;
    const initialX2 = centerX - 100;

    // Initialize blocks
    b1 = new Block(initialX1, m1, vel, h1, scale, 1);
    b2 = new Block(initialX2, m2, 0, h2, scale, 2);

    b1.init();
    b2.init();

    // Ensure simulation starts and is not already running
    if (!intervalId) {
        intervalId = setInterval(simulationLoop, 100);
    }
}

// Core simulation loop
function simulationLoop() {
    // Update the mass values dynamically based on user input
    b1.setMass(parseFloat(document.getElementById("m1").value, 10));
    b2.setMass(parseFloat(document.getElementById("m2").value, 10));

    for (var i = 0; i < timeStamps; i++) {
        if (b1.colide(b2)) {
            var v1 = b1.hit(b2);
            var v2 = b2.hit(b1);
            b1.vel = v1;
            b2.vel = v2;
            count++;

            // Display block masses after collision
            document.getElementById("count").innerHTML = `Collisions: ${count}`;
            document.getElementById("velofb1").innerHTML = `Velocity of Block 1: ${b1.vel.toFixed(3)} | Mass: ${b1.mass}`;
            document.getElementById("velofb2").innerHTML = `Velocity of Block 2: ${b2.vel.toFixed(3)} | Mass: ${b2.mass}`;
        }

        if (b1.hitWall()) {
            b1.vel = -b1.vel;
            count++;
        }

        if (b2.hitWall()) {
            b2.vel = -b2.vel;
            count++;
        }

        b1.update();
        b2.update();

        b1.display();
        b2.display();
    }
}

// Stop simulation when Stop button is clicked
function stopSimulation() {
    clearInterval(intervalId);  // Stop the simulation
    intervalId = null;  // Reset the interval ID to allow restarting later
}

// Reset simulation when Reset button is clicked
function resetSimulation() {
    clearInterval(intervalId);  // Stop the simulation
    intervalId = null;  // Reset interval ID

    const root = document.getElementById("root");
    root.innerHTML = '';  // Clear the simulation area
    document.getElementById("count").innerHTML = 'Collisions: 0';
    document.getElementById("velofb1").innerHTML = 'Velocity of Block 1: 0';
    document.getElementById("velofb2").innerHTML = 'Velocity of Block 2: 0';
    count = 0;
}
