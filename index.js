'use strict'

let i=0;
const total = STORE.length;
let score = 0;
let qNum = 1;


//load 1st question & answer set, display score card, & submit button
function startQuiz(){
    $('#startButton').click(function(){
        $('aside').show();
        $(this).hide();
        loadQuestions();
    });
};

function loadQuestions(){
    $('#QNA').append(`
    <form>
        <fieldset>
            <legend>${STORE[i].question}</legend>
    
            <label for="${STORE[i].choices[0]}"></label>  
            <input type="radio" name="radio" value="${STORE[i].choices[0]}" required>
            <span>${STORE[i].choices[0]}</span></br>
    
            <label for="${STORE[i].choices[1]}"></label>  
            <input type="radio" name="radio" value="${STORE[i].choices[1]}" required>
            <span>${STORE[i].choices[1]}</span></br>
    
            <label for="${STORE[i].choices[2]}"></label>  
            <input type="radio" name="radio" value="${STORE[i].choices[2]}" required>
            <span>${STORE[i].choices[2]}</span></br>
    
            <label for="${STORE[i].choices[3]}"></label>  
            <input type="radio" name="radio" value="${STORE[i].choices[3]}" required>
            <span>${STORE[i].choices[3]}</span></br>
        </fieldset>
        <button class="submitButton">Submit</button>
    </form>`
    );
};


function handleAnswer(){
    $('#QNA').submit(function(event) {
        event.preventDefault();
        let choice=$("input:checked").val();
        let correctAnswer=STORE[i].answer;
        $('#QNA').hide();
        $('aside').hide();
        if(choice==correctAnswer){
            rightAnswer();
        } else {
            wrongAnswer();
        };
    });
};

function rightAnswer(){
    $('#feedback').append(`
        <div class="set">
            <p class="message">You got it right. The correct answer is "${STORE[i].answer}"<\p>
            <button class="nextButton">Next Question</button>
        </div>    
    `);
    score+=1; 
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#currentQ').text(qNum);
    };
    $('#currentScore').text(score);
};

function wrongAnswer(){
    $('#feedback').append(`
        <div class="set">
            <p class="message">You got it wrong. The correct answer is "${STORE[i].answer}"<\p>
            <button class="nextButton">Next Question</button>
        </div>    
    `);
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#currentQ').text(qNum);
    };
    $('#currentScore').text(score);
};


function nextQuestion(){
        $('#feedback').click(function(){
            $('aside').show();
            if(i<5){
                $('.set').remove(); //removes the feedback
                $('form').remove(); //removes previous form
                loadQuestions(); //loads next set of questions
                $('#QNA').show(); //shows the questions
            } else {
                $('#results').append(`
                    <div class="final">
                        <p>Your final score is ${score} out of 5.<\p>
                        <button id='retakeQuizButton'>Retake Quiz</button>
                    <\div>
                `);
                $('aside').hide();
                $('.set').remove();
            };
        });
};

function displayResults(){
    $('#results').click(function(){
        i=0;
        score=0;
        qNum=1;
        $('#currentQ').text(1);
        $('#currentScore').text(0);
        $('form').remove();
        $('.final').remove();
        $('#QNA').show();
        $('aside').show();
        loadQuestions();
    });
};


/* functions to call when page is loaded ---------------------------------------- */

$('aside').hide();

function start(){
    startQuiz();
    handleAnswer();
    nextQuestion();
    displayResults();
};

$(start);