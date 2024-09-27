const DOM = {
    subjectLogo: document.querySelector('.subject-logo'),
    subjectIcon: document.querySelector('.subject-icon'),
    subjectTitle: document.querySelector('.subject-title'),
    subjectName: document.querySelector('.subject-name'),
    score: document.querySelector('.score'),
    playBtn: document.querySelector('.play-btn')

    
}

window.onload = () => {
    const icon = localStorage.getItem("icon");
    const subject = localStorage.getItem("subject");
    const score = localStorage.getItem("score");

    DOM.subjectLogo.src = icon;
    DOM.subjectIcon.src = icon;
    DOM.subjectTitle.textContent = subject;
    DOM.subjectName.textContent = subject;
    DOM.score.textContent = score;
}
DOM.playBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = "/";
})