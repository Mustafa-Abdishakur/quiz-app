const DOM = {
    subjectLogo: document.querySelector('.subject-logo'),
    subjectIcon: document.querySelector('.subject-icon'),
    subjectTitle: document.querySelector('.subject-title'),
    subjectName: document.querySelector('.subject-name'),
    score: document.querySelector('.score'),
    playBtn: document.querySelector('.play-btn'),
    slideBall: document.querySelector('.slide-ball'),
    body: document.querySelector('body'),
    sunLight: document.querySelector('.sun-light'),
    sunDark: document.querySelector('.sun-dark'),
    moonLight: document.querySelector('.moon-light'),
    moonDark: document.querySelector('.moon-dark'),
    scoreInfo: document.querySelector('.score-info')
}

window.onload = () => {
    const icon = localStorage.getItem("icon");
    const subject = localStorage.getItem("subject");
    const score = localStorage.getItem("score");
    const darkTheme = localStorage.getItem("dark-theme");

    if (darkTheme === 'true') {
        theme();
    }

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

DOM.slideBall.addEventListener('click', e => theme());

const theme = () => {
    DOM.slideBall.classList.toggle("move");
    DOM.body.classList.toggle("dark");
    DOM.sunLight.classList.toggle("dark-1");
    DOM.moonLight.classList.toggle("dark-1");
    DOM.sunDark.classList.toggle("dark-2");
    DOM.moonDark.classList.toggle("dark-2");
    DOM.scoreInfo.classList.toggle("dark-3");
    let darkTheme;
    if (DOM.body.classList.contains("dark")) {
        darkTheme = true;
    } else {
        darkTheme = false;
    }
    localStorage.setItem("dark-theme", darkTheme);
}