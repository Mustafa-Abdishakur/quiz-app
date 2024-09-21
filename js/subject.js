import data from '../data.json' with { type: 'json' };
const DOM = {
    subjectLogo: document.querySelector('.subject-logo'),
    subjectTitle: document.querySelector('.subject-title'),
    questionNumber: document.querySelector('.question-number'),
    question: document.querySelector('.question'),
    options: [document.querySelector('.option-a'), document.querySelector('.option-b'), document.querySelector('.option-c'), document.querySelector('.option-d')],
}
const eventDOM = {
    optionsContainer: document.querySelector('.options-container')
}
const state = {
    subject: '',
    subjectInfo:{},
    questionNumber: 1,
    score: 0,
    selectedOption: ""
}
window.onload = () => {
    // 1) Change url to the subject's url
    const subject = localStorage.getItem("subject");
    state.subject = subject;
    const newUrl = `/${subject}`;

    //UNCOMMENT THIS IN THE END ( FOR HEAD TITLE )
    //CAUSES RELOAD ISSUES
    /*   const stateObj = { subject: subject };
      history.pushState(stateObj, `${subject}`, newUrl); */

    //2) Populate the page with info from the json file
    for (const [key, value] of Object.entries(DOM)) {
        value.innerHTML = '';
    }
    const quiz = data.quizzes.find( quiz => quiz.title === subject);

    // console.log(quiz)
    state.subjectInfo = quiz;

    DOM.subjectLogo.src = quiz.icon; 
    DOM.subjectTitle.textContent = quiz.title;
    DOM.questionNumber.textContent = `Question ${state.questionNumber} of 10`;
    DOM.question.textContent = quiz.questions[state.questionNumber - 1].question;
    DOM.options.forEach((option,index) => {
     option.textContent = quiz.questions[state.questionNumber - 1].options[index];
    });

    

}
// https://www.quora.com/How-do-I-modify-the-URL-without-reloading-the-page-using-JavaScript

DOM.options.forEach( option => {
    option.addEventListener('click', e => {
        state.selectedOption = e.target.closest(".selected").textContent;
        Array.from(eventDOM.optionsContainer.children).forEach(el => {
            el.classList.remove("active");
            el.children[0].classList.remove("active2");
        })

        e.target.closest('.option').classList.add("active");
        e.target.parentElement.children[0].classList.add("active2");

        console.log(state)
    })
})
