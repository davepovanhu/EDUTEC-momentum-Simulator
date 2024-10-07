const quizQuestions = [
    {
        question: "What is the formula for calculating momentum?",
        answers: ["Momentum = Mass × Acceleration", "Momentum = Mass × Speed", "Momentum = Mass × Velocity", "Momentum = Mass ÷ Time"],
        correctAnswer: "Momentum = Mass × Velocity",
        explanation: "Momentum is calculated by multiplying an object's mass by its velocity."
    },
    {
        question: "If ablock1 has a mass of 1000 kg and is moving at a velocity of 20 m/s, what is its momentum?",
        answers: ["20,000 kg m/s", "1,000 kg m/s", "50,000 kg m/s", "2,000 kg m/s"],
        correctAnswer: "20,000 kg m/s",
        explanation: "Momentum is calculated as mass (1000 kg) multiplied by velocity (20 m/s), which equals 20,000 kg m/s."
    },
    {
        question: "True or False block2 with more mass always has more momentum if moving at the same speed as another block1.",
        answers: ["True", "False"],
        correctAnswer: "True",
        explanation: "Momentum increases with mass if speed is the same. More mass means more momentum."
    },
    {
        question: "If two blocks are moving with the same velocity, the one with more mass has more:",
        answers: ["Speed", "Force", "Momentum", "Energy"],
        correctAnswer: "Momentum",
        explanation: "Momentum is directly proportional to mass. If velocity is constant, more mass means more momentum."
    },
    {
        question: "Which unit is used to measure momentum?",
        answers: ["Kilogram (kg)", "Meter per second (m/s)", "Kilogram meter per second (kg m/s)", "Newton (N)"],
        correctAnswer: "Kilogram meter per second (kg m/s)",
        explanation: "Momentum is measured in kg m/s, which combines mass and velocity units."
    }
];

function showQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = 'block'; // Make quiz visible
    quizContainer.innerHTML = '';

    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("quiz-question");
        questionDiv.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;
        q.answers.forEach((answer) => {
            const answerLabel = document.createElement("label");
            answerLabel.classList.add("quiz-answer");
            answerLabel.innerHTML = `<input type="radio" name="q${index}" value="${answer}"> ${answer}`;
            questionDiv.appendChild(answerLabel);
        });
        quizContainer.appendChild(questionDiv);
    });

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit Quiz";
    submitButton.onclick = checkAnswers;
    quizContainer.appendChild(submitButton);
}

function checkAnswers() {
    const answers = document.querySelectorAll('input[type="radio"]:checked');
    let score = 0;
    let feedbackHTML = '';

    quizQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && selectedAnswer.value === q.correctAnswer) {
            score++;
        }
    });

    quizQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        feedbackHTML += `<p><strong>Question ${index + 1}: ${q.question}</strong><br>`;
        feedbackHTML += `Your answer: ${selectedAnswer ? selectedAnswer.value : 'None'}<br>`;
        feedbackHTML += `Correct answer: ${q.correctAnswer}<br>`;
        feedbackHTML += `Explanation: ${q.explanation}</p><br>`;
    });

    const resultMessage = score === quizQuestions.length
        ? "Congratulations! You got a perfect score!<br><br>"
        : `You scored ${score} out of ${quizQuestions.length}. Try again!<br><br>`;

    document.getElementById("quiz-container").innerHTML = resultMessage + feedbackHTML;

    // Ensure the user can click anywhere to go back only after showing feedback
    setTimeout(() => {
        document.body.onclick = () => {
            window.location.href = 'index.html'; // Replace with your home page URL
        };
    }, 10); // Delay to allow feedback to be visible
}

document.addEventListener('DOMContentLoaded', () => {
    const quizButton = document.getElementById('quiz-button');
    quizButton.addEventListener('click', showQuiz);
});
