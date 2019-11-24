'use strict'

//global variables
let i=0;
const total = STORE.length;
let score = 0;
let qNum = 1;

//array to store html code for images
const array = [
    '<img src="images/tyrion-dancing.gif" alt="tyrion-dancing" class="correct-response-image response-img">',
    '<img src="images/tywin-jaime.gif" alt="tywin-jaime-gif" class="correct-response-image response-img">',
    '<img src="images/jaime-lannister-giving-thanks.gif" alt="ice-sword" class="correct-response-image response-img">',
    '<img src="images/cersei-lannister.gif" alt="cersei-lannister-gif" class="correct-response-image response-img">',
    '<img src="images/brienne.gif" alt="brienne-of-tarth" class="correct-response-image response-img">',
];

//load 1st question, answer set, score card, & submit button
function startQuiz(){
    $('#startButton').click(function(){
        $('.scorecard1').show();
        $('aside').show();
        $('#start').remove();
        loadQuestions();
    });
};

//function to load up the questions
function loadQuestions(){
    $('.sections').append(`
    <form>
        <fieldset>
            <legend>${STORE[i].question}</legend>
    
            <div class="answerChoices">    
                <label>
                    <input type="radio" name="radio" value="${STORE[i].choices[0]}" required>
                    ${STORE[i].choices[0]}
                </label>   
            </div>
            <div class="answerChoices">    
                <label>
                    <input type="radio" name="radio" value="${STORE[i].choices[1]}" required>
                    ${STORE[i].choices[1]}
                </label>  
            </div>
            <div class="answerChoices">    
                <label>
                    <input type="radio" name="radio" value="${STORE[i].choices[2]}" required>
                    ${STORE[i].choices[2]}
                </label>  
            </div>
            <div class="answerChoices">    
                <label>
                    <input type="radio" name="radio" value="${STORE[i].choices[3]}" required>
                    ${STORE[i].choices[3]}
                </label>  
            </div>
        </fieldset>
        <button id="submitButton" class="button">Submit</button>
    </form>`
    );
};

//function to handle the user's input
function handleAnswer(){
    $('.sections').submit(function(){
        event.preventDefault();
        let choice=$("input:checked").val();
        let correctAnswer=STORE[i].answer;
        $('form').remove();
        $('.scorecard1').hide();
        $('aside').hide();
        if(choice==correctAnswer){
            rightAnswer();
        } else {
            wrongAnswer();
        }
    });
};

//function to handle feedback if the user's answer is correct
function rightAnswer(){
    $('.sections').append(`
        <div class="set">
            <p class="message correct"><span class="green">You got it right.</span></br> The correct answer is "${STORE[i].answer}"<\p>
            <div>${array[i]}</div>
            <button id="nextButton" class="button">Next >></button>
        </div>    
        `);
    score+=1; 
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#q-span').text(`Q${qNum}`);
        $('#score-span').text(`${score} of 5 pts`);

        $('#alt-q-span').text(`${qNum}`);
        $('#alt-score-span').text(`${score} of 5`);
    }    
};

//function to handle feedback if the user's answer is incorrect
function wrongAnswer(){
    $('.sections').append(`
        <div class="set">
            <p class="message wrong"><span class="red">Incorrect.</span></br> The correct answer is "${STORE[i].answer}"<\p>
            <div><img src="images/ygritte.gif" alt="ygritte" id="ygritte" class="response-img"/></div>
            <button id="nextButton" class="button">Next >></button>
        </div>    
    `);
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#q-span').text(`Q${qNum}`);
        $('#score-span').text(`${score} of 5 pts`);

        $('#alt-q-span').text(`${qNum}`);
        $('#alt-score-span').text(`${score} of 5`);
    }
};

//function to process the next set of questions depending on where the user is in terms of question number
function nextQuestionPath(){
    $('.sections').on('click', '#nextButton', function(){
        $('.set').remove();
        $('.scorecard1').show();
        $('aside').show();
        if(i<5){
            loadQuestions();
        } else {
            $('.set').remove();
            $('.sections').append(`
                <div class="final">
                    <p class="message last">You got ${score} out of 5</br> correct.<\p>
                    <button class="button" id='retakeQuizButton'>Retake Quiz</button>
                <\div>
            `);
            $('.scorecard1').hide();
            $('aside').hide();
        };
    });
};                               

//function to restart the quiz
function restartQuiz(){
    $('.sections').on('click', '#retakeQuizButton', (function(){
        $('.final').remove();
        i=0;
        score=0;
        qNum=1;
        $('#q-span').text(`Q${qNum}`);  
        $('#score-span').text(`${score} of 5 pts`);
        $('#currentQ').text(`Question ${qNum}`);
        $('#currentScore').text(`${score} of 5`);
        loadQuestions();
        $('.scorecard1').show();
        $('aside').show();
    }));
};

/* functions to call when the web page is loaded ---------------------------------------- */

function start(){
    $('.scorecard1').hide();
    $('aside').hide();
    startQuiz();
    handleAnswer();
    nextQuestionPath();
    restartQuiz();
};

$(start);



