import { getQuestions } from './data/questions.js'

const quiz_minutes = 1

let questions = []
let questionIndex = 0
let time = null
let answers =[]
startApp();
saveUserAnswers()//shall call it here once for the handler bugs

async function startApp() {
  questions = await getQuestions();  
  answers = new Array(questions.length).fill(null);   
  displayQuizTitle();                
  
}

function displayQuizTitle(){
  let theHtml = ''
  theHtml = 
  `welcome. the quiz has ${questions.length} quests. <p>deadline:${quiz_minutes}m</p>
  <button class="start_btn_js">start</button>`

  document.querySelector('.quiz_title_js').innerHTML = theHtml
  document.querySelector('.start_btn_js').addEventListener('click',() => {
    document.querySelector('.quiz_title_js').innerHTML = ''
    displayQuestion(questionIndex)
    timer(quiz_minutes)
    
  })
}

function displayQuestion(index){

  let optionHTML =''
  

  document.querySelector('.question_text_js')
  .innerHTML=
  `Q${questionIndex+1}: ${questions[index].question}`

  questions[index].options.forEach((option,i) => {
    let cssClass = ''
    if (answers[index] == i){ cssClass = 'selected' }
    optionHTML += `<button class='option_js ${cssClass}' data-index=${i} >${option}</button>`
  })
  
  document.querySelector('.options_js')
  .innerHTML= optionHTML
  displayBtns()
}

function displayBtns(){

  let btnHTML= ''
  btnHTML += `
  <button class="next_btn_js">next</button>
  <button class="previous_btn_js">previous</button>
  <div class='finish_btn_container_js'>
    <button class="finish_btn_js">finish.</button>
    <p>make sure that u submit all the answers right before finishing the quiz!</p>
  </div>`
  
  document.querySelector('.pre_next_question_btn_js')
  .innerHTML = btnHTML

  document.querySelector('.next_btn_js').addEventListener('click',() => {
    if(questionIndex < questions.length-1){
      questionIndex++
      displayQuestion(questionIndex)
    } else if (questionIndex == questions.length-1){
      document.querySelector('.finish_btn_container_js').classList.add('visible')
      document.querySelector('.finish_btn_js').addEventListener('click',() => {
        document.querySelector('.container').innerHTML = ''
        clearInterval(time)
        quizResult()
      })
    } else { return }
    })
  document.querySelector('.previous_btn_js').addEventListener('click',() => {
    if(questionIndex == 0){ return } 
    else {
      questionIndex--
      displayQuestion(questionIndex)
    } 
  })
}

function saveUserAnswers(){
  const input = document.querySelector('.options_js');
  input.addEventListener('click', (event) => {
    if (!event.target.classList.contains('option_js')) return ;
    input.querySelectorAll('.option_js').forEach((btn) => {
      btn.classList.remove('selected')
    })
    event.target.classList.add('selected')
    answers[questionIndex] = Number(event.target.dataset.index)    
  }); 
}

function quizResult(){
  let score = 0
  let resultHTML = ``
  questions.forEach((q,i) => {
    if(answers[i] == q.correct){ score++ }
  })
  resultHTML += `<h1>your score:${score}</h1>`
  questions.forEach((q,i) => {
    
    resultHTML += `
    <p style="text-decoration: underline;" >${q.question}</p>`
    q.options.forEach((opt,j) => {
      let cssClass=''
      if(answers[i] == null && j == q.correct){
        cssClass = 'null'
      } else if(j == q.correct ){
        cssClass = 'correct'
      } else if (j == answers[i]) {
        cssClass = 'wrong'
      } 
      resultHTML += `<div class='option_js_check ${cssClass}'>${opt}</div>`
    })
  })
  document.querySelector('.container').innerHTML = resultHTML
}

function timer(x){
  let secondsRemain = x*60
  
  time = setInterval(() => {
    
    const min =String(Math.floor(secondsRemain/60)).padStart(2,'0')//find out the min
    const sec = String(secondsRemain % 60 ).padStart(2,'0')// find out the seconds
    secondsRemain--
    document.querySelector('.time-track-js')
    .innerHTML =  `
    deadline:${min}:${sec}
    `
    if(secondsRemain == -1 ){
      clearInterval(time)
      quizResult()
    }
  }, 1000);
  
}

