import data from '../data.json' with { type: 'json' };
const DOM = {
    subjectLogo: document.querySelector('.subject-logo'),
    subjectTitle: document.querySelector('.subject-title'),
    questionNumber: document.querySelector('.question-number'),
    question: document.querySelector('.question'),
    options: [document.querySelector('.option-a'), document.querySelector('.option-b'), document.querySelector('.option-c'), document.querySelector('.option-d')]

}
const state = {
    subject: '',
    questionNumber: 1
}
window.onload = () => {
    // change url to the subject's url
    const subject = localStorage.getItem("subject");
    state.subject = subject;
    const newUrl = `/${subject}`;

    //UNCOMMENT THIS IN THE END ( FOR HEAD TITLE )
    //CAUSES RELOAD ISSUES
    /*   const stateObj = { subject: subject };
      history.pushState(stateObj, `${subject}`, newUrl); */

    //Populate the page with info from the json file
    for (const [key, value] of Object.entries(DOM)) {
        value.innerHTML = '';
    }
    const quiz = data.quizzes.find( quiz => quiz.title === subject);
    console.log(subject, data)

    DOM.subjectLogo.src = quiz.icon; 
    DOM.subjectTitle.textContent = quiz.title;
    DOM.questionNumber.textContent = `Question ${state.questionNumber} of 10`;
    DOM.question.textContent = quiz.questions[state.questionNumber - 1].question;
    DOM.options.forEach((option,index) => {
     option.textContent = quiz.questions[state.questionNumber - 1].options[index];
    });

    
    console.log(quiz)

}
// https://www.quora.com/How-do-I-modify-the-URL-without-reloading-the-page-using-JavaScript

