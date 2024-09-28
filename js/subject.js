import data from '../data.json' with { type: 'json' };
const DOM = {
    subjectLogo: document.querySelector('.subject-logo'),
    subjectTitle: document.querySelector('.subject-title'),
    questionNumber: document.querySelector('.question-number'),
    question: document.querySelector('.question'),
    options: [document.querySelector('.option-a'), document.querySelector('.option-b'), document.querySelector('.option-c'), document.querySelector('.option-d')],
}
const eventDOM = {
    optionsContainer: document.querySelector('.options-container'),
    submitBtn: document.querySelector('.submit-btn'),
    progressBar: document.querySelector('.progress-bar'),
    slideBall: document.querySelector('.slide-ball'),
    body: document.querySelector('body'),
    sunLight: document.querySelector('.sun-light'),
    sunDark: document.querySelector('.sun-dark'),
    moonLight: document.querySelector('.moon-light'),
    moonDark: document.querySelector('.moon-dark'),
    options: document.querySelectorAll('.option')

}
const state = {
    subject: '',
    subjectInfo: {},
    questionNumber: 1,
    score: 0,
    selectedOption: "",
    submitAnswer: false,
    progress: 10

}
window.onload = () => {
    // check theme 
    const darkTheme = localStorage.getItem("dark-theme");
    if (darkTheme === 'true') {
        theme();
    }
    // Populate the page with info from the json file
    const subject = localStorage.getItem("subject");
    state.subject = subject;

    for (const [key, value] of Object.entries(DOM)) {
        value.innerHTML = '';
    }
    const quiz = data.quizzes.find(quiz => quiz.title === subject);

    state.subjectInfo = quiz;
    renderQuestion();
}
const renderQuestion = () => {
    DOM.subjectLogo.src = state.subjectInfo.icon;
    DOM.subjectTitle.textContent = state.subjectInfo.title;
    DOM.questionNumber.textContent = `Question ${state.questionNumber} of 10`;
    DOM.question.textContent = state.subjectInfo.questions[state.questionNumber - 1].question;
    DOM.options.forEach((option, index) => {
        option.textContent = state.subjectInfo.questions[state.questionNumber - 1].options[index];
    });
}

DOM.options.forEach(option => {
    option.addEventListener('click', e => {
        if (state.submitAnswer == true) return;

        state.selectedOption = e.target.closest(".select").textContent;

        Array.from(eventDOM.optionsContainer.children).forEach(el => {
            el.classList.remove("active");
            el.children[0].classList.remove("active2");
        })
        // Highlight selected option
        e.target.closest('.option').classList.add("active");
        e.target.parentElement.children[0].classList.add("active2");

    })
})

eventDOM.submitBtn.addEventListener("click", (e) => {
    if (e.target.textContent === "Submit Answer") {
        if (state.selectedOption === "") return;
        state.submitAnswer = true;

        if (state.selectedOption === state.subjectInfo.questions[state.questionNumber - 1].answer) {
            // correct answer
            state.score = state.score + 1;
            document.querySelector('.active').classList.add("correct");
            document.querySelector('.active2').classList.add("correct2");
            document.querySelector('.active').children[2].style.display = "initial";
        } else {
            // wrong answer
            document.querySelector('.active').classList.add("false");
            document.querySelector('.active2').classList.add("false2");
            document.querySelector('.active').children[3].style.display = "initial";
            DOM.options.forEach(el => {
                if (el.textContent === state.subjectInfo.questions[state.questionNumber - 1].answer) {
                    el.parentElement.children[2].style.display = "initial";
                }
            })
        }
        e.target.textContent = "Next Question";
    } else {
        //NEXT QUESTION
        // Reset state and DOM
        state.questionNumber = state.questionNumber + 1;
        state.selectedOption = "";
        state.submitAnswer = false;
        e.target.textContent = "Submit Answer";
        DOM.options.forEach(el => {
            el.parentElement.classList.remove("active");
            el.parentElement.classList.remove("correct");
            el.parentElement.classList.remove("false");
            el.parentElement.children[0].classList.remove("active2");
            el.parentElement.children[0].classList.remove("correct2");
            el.parentElement.children[0].classList.remove("false2");
            el.parentElement.children[2].style.display = "none";
            el.parentElement.children[3].style.display = "none";
        })
        // Increase percentage bar
        state.progress = state.progress + 10;
        eventDOM.progressBar.style.width = `${state.progress}%`;

        // Render new question or final score if complete
        if (state.questionNumber <= state.subjectInfo.questions.length) {
            renderQuestion();
        } else {
            // Render score
            localStorage.setItem("icon", state.subjectInfo.icon);
            localStorage.setItem("score", state.score);
            window.location.href = "./score.html";
        }
    }
})

eventDOM.slideBall.addEventListener('click', e => theme());

const theme = () => {
    eventDOM.slideBall.classList.toggle("move");
    eventDOM.body.classList.toggle("dark");
    eventDOM.sunLight.classList.toggle("dark-1");
    eventDOM.moonLight.classList.toggle("dark-1");
    eventDOM.sunDark.classList.toggle("dark-2");
    eventDOM.moonDark.classList.toggle("dark-2");
    eventDOM.options.forEach(option => option.classList.toggle("dark-3"));
    let darkTheme;
    if (eventDOM.body.classList.contains("dark")) {
        darkTheme = true;
    } else {
        darkTheme = false;
    }
    localStorage.setItem("dark-theme", darkTheme);
}