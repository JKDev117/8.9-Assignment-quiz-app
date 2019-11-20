'use strict'

//global variables
let i=0;
const total = STORE.length;
let score = 0;
let qNum = 1;

//array to store html code for images
const array = [
    '<img src="images/tyrion-dancing.gif" alt="tyrion-dancing" class="correct-response-image">',
    '<img src="images/tywin-jaime.gif" alt="tywin-jaime-gif" class="correct-response-image">',
    '<img src="images/jaime-lannister-giving-thanks.gif" alt="ice-sword" class="correct-response-image">',
    '<img src="images/cersei-lannister.gif" alt="cersei-lannister-gif" class="correct-response-image">',
    '<img src="images/brienne.gif" alt="brienne-of-tarth" class="correct-response-image">',
];

//load 1st question, answer set, score card, & submit button
function startQuiz(){
    $('#startButton').click(function(){
        $('aside').show();
        $('.menu-bg').hide();
        $(this).hide();
        loadQuestions();
    });
};

//function to load up the questions
function loadQuestions(){
    $('#QNA').append(`
    <form>
        <fieldset>
            <legend>${STORE[i].question}</legend>
    
            <div class="answerChoices">    
                <label for="${STORE[i].choices[0]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[0]}" required>
                <span class="store-span">${STORE[i].choices[0]}</span>
            </div>
            <div class="answerChoices">    
                <label for="${STORE[i].choices[1]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[1]}" required>
                <span class="store-span">${STORE[i].choices[1]}</span>
            </div>
            <div class="answerChoices">    
                <label for="${STORE[i].choices[2]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[2]}" required>
                <span class="store-span">${STORE[i].choices[2]}</span>
            </div>
            <div class="answerChoices">    
                <label for="${STORE[i].choices[3]}"></label>  
                <input type="radio" name="radio" value="${STORE[i].choices[3]}" required>
                <span class="store-span">${STORE[i].choices[3]}</span>
            </div>
        </fieldset>

        <button class="submitButton button">Submit</button>
    </form>`
    );
};

//function to handle the user's input
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
        }
    });
};

//function to handle feedback if the user's answer is correct
function rightAnswer(){
    $('#feedback').append(`
        <div class="set">
            <p class="message correct"><span class="green">You got it right.</span></br> The correct answer is "${STORE[i].answer}"<\p>
            <button class="nextButton button">Next >></button>
        </div>    
    `);
    if(qNum==1){
        $('.set').append(`
            ${array[i]}
        `);  
    } else if(qNum==2){
        $('.set').append(`
            ${array[i]}
        `); 
    } else if (qNum==3){
        $('.set').append(`
            ${array[i]}
        `); 
    } else if (qNum==4){
        $('.set').append(`
            ${array[i]}
        `); 
    } else {
        $('.set').append(`
            ${array[i]}
        `); 
    };
    score+=1; 
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#aside-span1').text(`${qNum}`);
        $('#alt-aside-span1').text(`Q${qNum}`);
    };
        $('#aside-span2').text(`${score} of 5`);
        $('#alt-aside-span2').text(`${score} of 5 pts`);
};

//function to handle feedback if the user's answer is incorrect
function wrongAnswer(){
    $('#feedback').append(`
        <div class="set">
            <p class="message wrong"><span class="red">Incorrect.</span></br> The correct answer is "${STORE[i].answer}"<\p>
            <img src="images/ygritte.gif" alt="ygritte" id="ygritte" class="response-img"/>
            <button class="nextButton button">Next >></button>
        </div>    
    `);
    i+=1; 
    qNum+=1;
    if(i<5){
        $('#aside-span1').text(`${qNum}`);
        $('#alt-aside-span1').text(`Q${qNum}`);
    };
        $('#aside-span2').text(`${score} of 5`);
        $('#alt-aside-span2').text(`${score} of 5 pts`);
};

//function to process the next set of questions depending on where the user is in terms of question number
function nextQuestionPath(){
    $('#feedback').on('click', '.nextButton', function(){
        $('aside').show();
        $('.response-vid').hide();
        $('.response-img').hide();
        if(i<5){
            $('.set').remove(); //removes the feedback
            $('form').remove(); //removes previous form
            loadQuestions(); //loads next set of questions
            $('#QNA').show(); //shows the questions
        } else {
            $('#results').append(`
                <div class="final">
                    <p class="message last">You got ${score} out of 5</br> correct.<\p>
                    <button class="button" id='retakeQuizButton'>Retake Quiz</button>
                <\div>
            `);
            $('aside').hide();
            $('.set').remove();
        };
    });
};                               

//function to restart the quiz
function restartQuiz(){
    $('#results').on('click', '#retakeQuizButton', (function(){
        i=0;
        score=0;
        qNum=1;
        $('#currentQ').text(`Question ${qNum}`);
        $('#currentScore').text(`${score} of 5`);
        $('#alt-aside-span1').text(`Q${qNum}`);  
        $('#alt-aside-span2').text(`${score} of 5 pts`);
        $('form').remove();
        $('.final').remove();
        $('#QNA').show();
        $('aside').show();
        loadQuestions();
    }));
};

/* functions to call when the web page is loaded ---------------------------------------- */

$('aside').hide();

function start(){
    startQuiz();
    handleAnswer();
    nextQuestionPath();
    restartQuiz();
};

$(start);



