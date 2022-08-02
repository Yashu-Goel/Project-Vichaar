const start_btn=document.querySelector(".start button");
const rules_info=document.querySelector(".rules_info");
const exit_btn=rules_info.querySelector(".exit_button .exit");
const continue_btn=rules_info.querySelector(".exit_button .continue");
const quiz_box=document.querySelector(".quiz_box");
const option_list=document.querySelector(".option_list");
const next_button=quiz_box.querySelector(".next_button");
const result=document.querySelector(".result");
const intro=document.querySelector(".intro");


let ques_cnt=0, ques_num=1, divergent_score=0,convergent_score=0, flag=0;
// configure start_btn
start_btn.onclick=()=>{
    rules_info.classList.add("activeRules");
    start_btn.classList.add("activeStartButton");
    intro.classList.add("activeContent");
}
// configure exit_btn
exit_btn.onclick=()=>{
    rules_info.classList.remove("activeRules");
    start_btn.classList.remove("activeStartButton");
    intro.classList.remove("activeContent");
}
// configure continue_btn
continue_btn.onclick=()=>{
    rules_info.classList.remove("activeRules");
    quiz_box.classList.add("activeQuiz");
    displayQuestion(0);
    question_counter(1);
}
// configure next_button

next_button.onclick=()=>{
    if(ques_cnt < questions.length - 1 )
    {
        ques_cnt++;
        ques_num++;
        displayQuestion(ques_cnt);
        question_counter(ques_num);
        next_button.style.display="none";        
    }
    else
    {
        quiz_box.classList.remove("activeQuiz");
        result.classList.add("activeResult");    
        showScore();    
        console.log("Quiz Completed");
    }
    
}
// configure questions

function displayQuestion(index){
    const question=document.querySelector(".question");

    let ques_txt="<span>"+ questions[index].question_num+ ". "+ questions[index].question +"</span>";
    let option_txt='<div class="option"> <span>' + questions[index].options[0] +'</span></div>' 
    + '<div class="option"> <span>' + questions[index].options[1] +' </span></div>'
    + '<div class="option"> <span>' + questions[index].options[2] +'</span></div>' 
    + '<div class="option"> <span>' + questions[index].options[3] +'</span></div>';
    question.innerHTML= ques_txt;
    option_list.innerHTML=option_txt;


    const option=option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
function optionSelected(answer)
{
    let userAns=answer.textContent;
    let correctAnswer=questions[ques_cnt].answer;
    let allOptions=option_list.children.length;
    
    console.log(correctAnswer);
    console.log(userAns);
    if(userAns == correctAnswer)
    {
        console.log("Right Answer");
        answer.classList.add("correct_ans");
        if(flag%2==0)
        {
            convergent_score=convergent_score+1;
            flag=1;
        }
        else{
            divergent_score=divergent_score+1;
            flag=0;
        }
        

    }
    else{
        console.log("Wrong Answer");
        answer.classList.add("wrong_ans");
        if(flag%2==0)
        {
            flag=1;
        }
        else{
            flag=0;
        }
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent==correctAnswer){
                option_list.children[i].setAttribute("class","option correct_ans");
            }
        }

    }

    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_button.style.display="block";
    console.log( convergent_score);
    console.log( divergent_score);
}
// configure total_ques

function question_counter(index){
    const total_ques=quiz_box.querySelector(".total_ques");

    let total_ques_cnt= '<p><span>'+index+'</span> of <span>'+ questions.length+'</span> Questions</p>';

    total_ques.innerHTML=total_ques_cnt;
}

function showScore(){
    const convergent_box= result.querySelector(".convergent_score");
    const divergent_box= result.querySelector(".divergent_score");
    let convergent_score_cnt='<p>Your Convergent Thinking Score: <span>'+ convergent_score +'</span><p>';
    let divergent_score_cnt='<p>Your divergent Thinking Score: <span>'+ divergent_score +'</span><p>';
    convergent_box.innerHTML=convergent_score_cnt;    
    divergent_box.innerHTML=divergent_score_cnt;    
}
