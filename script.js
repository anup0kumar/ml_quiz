const questions = [
    {
        question:"Which type of machine learning algorithm is commonly used for classification tasks?",
        answers:[
            { text:"Regression",correct :false},
            { text:"Clustering",correct :false},
            { text:"Decision Trees",correct :true},
            { text:"PCA",correct :false},
        ]
    },
    {
        question:"What does the 'k' in k-nearest neighbors (k-NN) algorithm represent?",
        answers:[
            { text:"Kernel",correct :false},
            { text:"Number of clusters",correct :false},
            { text:"Number Of nearest neighbors",correct :true},
            { text:"None of these",correct :false},
        ]
    },
    {
        
        question:"Which machine learning algorithm is suitable for both classification and regression tasks and is inspired by the human brain's neural structure?",
        answers:[
            { text:"Support Vector Machine",correct :false},
            { text:"K-Means",correct :false},
            { text:"Artificial Neural Network",correct :true},
            { text:"Random Forest",correct :false},
        ]
    },

        {
        question:"In the context of decision trees, what is the term used for a node that has no children and is used to make a final prediction?",
        answers:[
            { text:"Root Node",correct :false},
            { text:"Internal Node",correct :false},
            { text:"Leaf Node",correct :true},
            { text:"Split Node",correct :false},
        ]
    },

    {
        question:"Which optimization algorithm is commonly used to train deep neural networks by adjusting the model's weights to minimize the loss function?",
        answers:[
            { text:"Gradient Boosting",correct :false},
            { text:"Genetic Algorithm",correct :false},
            { text:"Stochastic Gradient Descent(SGD)",correct :true},
            { text:"K-means",correct :false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// creating variable for storing q index and score

let CurrentQIndex = 0;
let score =0;

function startQuiz(){
    CurrentQIndex =0;
    score =0;
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let CurrentQ = questions[CurrentQIndex];
    let qNo = CurrentQIndex +1;
    questionElement.innerHTML = qNo + ". " + CurrentQ.question;

    CurrentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    CurrentQIndex++;
    if(CurrentQIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(CurrentQIndex< questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();