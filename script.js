let userAnswers = JSON.parse(sessionStorage.getItem('progress')) || [];

// Function to render questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];
function renderQuestions() {
  const questionsElement = document.getElementById('questions');
  questionsElement.innerHTML = ''; 

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement('div');
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement('input');
      choiceElement.setAttribute('type', 'radio');
      choiceElement.setAttribute('name', `question-${i}`);
      choiceElement.setAttribute('value', choice);

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute('checked', true);
      }

      // Add event listener to save progress
      choiceElement.addEventListener('change', function() {
        userAnswers[i] = choice;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });

      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

// Function to calculate and display the score
function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  document.getElementById('score').textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
}

// Event listener for the submit button
document.getElementById('submit').addEventListener('click', function() {
  calculateScore();
});

// Initial rendering of questions
renderQuestions();

// Display the last score if available
const lastScore = localStorage.getItem('score');
if (lastScore !== null) {
  document.getElementById('score').textContent = `Your last score was ${lastScore} out of 5.`;
}
