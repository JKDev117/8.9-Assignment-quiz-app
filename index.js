'use strict'

//global variables
let i=0;
const total = STORE.length;
let score = 0;
let qNum = 1;


//load 1st question & answer set, display score card, & submit button
function startQuiz(){
    $('#startButton').click(function(){
        $('aside').show();
        $('.menu-bg').hide();
        $(this).hide();
        loadQuestions();
    });
};

//to load up the questions
function loadQuestions(){
    $('#QNA').append(`
    <form>
        <fieldset>
            <legend>${STORE[i].question}</legend>
    
            <div class="answerChoice">    
                <label for="${STORE[i].choices[0]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[0]}" required>
                <span class="store-span">${STORE[i].choices[0]}</span>
            </div>
            <div class="answerChoice">    
                <label for="${STORE[i].choices[1]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[1]}" required>
                <span class="store-span">${STORE[i].choices[1]}</span>
            </div>
            <div class="answerChoice">    
                <label for="${STORE[i].choices[2]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[2]}" required>
                <span class="store-span">${STORE[i].choices[2]}</span>
            </div>
            <div class="answerChoice">    
                <label for="${STORE[i].choices[3]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[3]}" required>
                <span class="store-span">${STORE[i].choices[3]}</span>
            </div>

        </fieldset>
        <button class="submitButton button">Submit</button>
    </form>`
    );
};

//to handle the user input
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

//feedback for if the user's answer is correct
function rightAnswer(){
    $('#feedback').append(`
        <div class="set">
            <p class="message correct"><span class="green">You got it right.</span></br> The correct answer is "${STORE[i].answer}"<\p>
            <button class="nextButton button">Next >></button>
        </div>    
    `);
    if(qNum==1){
        $('#imagereply1').show();
    } else if(qNum==2){
        $('#imagereply2').show();
    } else if (qNum==3){
        $('#imagereply3').show();
    } else if (qNum==4){
        $('#imagereply4').show();
    } else {
        $('#imagereply5').show();
    };
    score+=1; 
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#currentQ').text(`Question ${qNum}`);
    };
        $('#currentScore').text(`${score} of 5 Correct`);
};

//feedback for if the user's answer is incorrect
function wrongAnswer(){
    $('#feedback').append(`
        <div class="set">
            <p class="message wrong"><span class="red">Incorrect.</span></br> The correct answer is "${STORE[i].answer}"<\p>
            <button class="nextButton button">Next >></button>
        </div>    
    `);
    $('#ygritte').show();
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#currentQ').text(`Question ${qNum}`);
    };
        $('#currentScore').text(`${score} of 5 Correct`);
};

//how to process the next set of questions depending on where it is in its path
function nextQuestionPath(){
        $('#feedback').click(function(){
            $('aside').show();
            $('.response-img').hide();
            if(i<5){
                $('.set').remove(); //removes the feedback
                $('form').remove(); //removes previous form
                loadQuestions(); //loads next set of questions
                $('#QNA').show(); //shows the questions
            } else {
                $('#results').append(`
                    <div class="final">
                        <p class="message last">${score} out of 5</br> is your final score.<\p>
                        <button class="button" id='retakeQuizButton'>Retake Quiz</button>
                    <\div>
                `);
                //$('aside').hide(); //deleted code
                $('.set').remove();
            };
        });
};

//process to restart the quiz
function restartQuiz(){
    $('#results').click(function(){
        i=0;
        score=0;
        qNum=1;
        $('#currentQ').text(`Question ${qNum}`);
        $('#currentScore').text(`${score} of 5 Correct`);
        $('form').remove();
        $('.final').remove();
        $('#QNA').show();
        $('aside').show();
        loadQuestions();
    });
};


/* functions to call when page is loaded ---------------------------------------- */

$('aside').hide();
$('.response-img').hide();

function start(){
    startQuiz();
    handleAnswer();
    nextQuestionPath();
    restartQuiz();
};

$(start);










