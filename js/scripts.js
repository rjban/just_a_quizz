// Var
const scoreContainer = document.querySelector("#score-container");
const quizzContainer = document.querySelector("#quizz-container");
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const letters = ["a","b","c","d"];
let points = 0;
let actualQuestion = 0;

//Answers
const questions = [
    {
        "question": "Quem é o pai de Kratos do jogo God of War?",
        "answers": [
            {
                "answer": "Hades",
                "correct": false
            },
            {
                "answer": "Zeus",
                "correct": true
            },
            {
                "answer": "Ares",
                "correct": false
            },
            {
                "answer": "Poseidon",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual as cores dos 4 fantasmas que perseguem o Pac-man?",
        "answers": [
            {
                "answer": "Cinza, Ciano, Verde e Rosa",
                "correct": false
            },
            {
                "answer": "Azul, Lilás, Preto e Bege",
                "correct": false
            },
            {
                "answer": "Laranja, Vermelho, Rosa e Azul",
                "correct": true
            },
            {
                "answer": "Vermelho, Rosa, Laranja e Preto",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o nome dos fantasminhas de Pac-man?",
        "answers": [
            {
                "answer": "Joel, Ellie, Margot e Star",
                "correct": false
            },
            {
                "answer": "Joel, jurubeba, Clebisu e Cleitinho",
                "correct": false
            },
            {
                "answer": "Clyde, Blinky, Pinky e Inky",
                "correct": true
            },
            {
                "answer": "Kleber, Igor, Chumb e Iron",
                "correct": false
            },
        ]
    },
    {
        "question": "Você sabia que o jogo Assassins Creed veio na verdade de um outro jogo da Ubisoft? Qual a Franquia qual ele foi devirado?",
        "answers": [
            {
                "answer": "Skull & Bones",
                "correct": false
            },
            {
                "answer": "Far Cry",
                "correct": false
            },
            {
                "answer": "Watch Dogs",
                "correct": false
            },
            {
                "answer": "Prince Of Persia",
                "correct": true
            }
        ]
    },
    {
        "question": "Você sabia que no Jogo Nier Automata, diversos personagens são baseados em filósofos. Dito isso, qual destes é referenciado no jogo?",
        "answers": [
            {
                "answer": "Friedrich Nietzsche",
                "correct": false
            },
            {
                "answer": "Jean-Paul Sartre ",
                "correct": true
            },
            {
                "answer": "Platão",
                "correct": false
            },
            {
                "answer": "Sócrates",
                "correct": false
            },
        ]
    },
]


function init() {
    createQuestion(0);
}

function createQuestion(i){
    //Clear the previous question
    const oldButtons = answersBox.querySelectorAll("button");
    
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    //Change text
    const questionNumber = question.querySelector("#question-number");
    const questionText = question.querySelector("#question-txt");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;
    console.log(questions[i].answers)

    //insert the alternatives
    questions[i].answers.forEach(function(answer,i){
        //change text of the template
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer["answer"];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);
        //remove
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");
        //insert template
        answersBox.appendChild(answerTemplate);

        answerTemplate.addEventListener("click", function(){
            checkAnswers(this);
        });
    });
    actualQuestion++;
}

// Verify the users response
function checkAnswers(btn) {

    //Select all buttons
    const buttons = answersBox.querySelectorAll("button");
    
    //Verify if the response was correct and add classes in buttons
    buttons.forEach(function(button){
        if(button.getAttribute("correct-answer") === "true"){
            button.classList.add("correct-answer");
            //check if the user chose the correct answer
            if(btn === button) {
                points++
            }
        } else {
            button.classList.add("wrong-answer");
        }
        console.log(points)

    });
    //Next question
    nextQuestion();
}   

function nextQuestion() {
    //Time to the users see the answers
    setTimeout(function(){
        //verify if is the last one
        if(actualQuestion >= questions.length){ 
            showSucessMesssage();
            return;
        }
        createQuestion(actualQuestion);
    }, 1200);
}

console.log(points)
//Show the final screen
function showSucessMesssage(){
    
    hideOrShow();

    //
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

function hideOrShow(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

//Restart quizz

const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
    actualQuestion = 0;
    points = 0;
    hideOrShow();
    init();
});




init();



