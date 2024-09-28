const DOM = {
    optionsContainer: document.querySelector('.options-container'),
    slideBall: document.querySelector('.slide-ball'),
    body: document.querySelector('body'),
    sunLight: document.querySelector('.sun-light'),
    sunDark: document.querySelector('.sun-dark'),
    moonLight: document.querySelector('.moon-light'),
    moonDark: document.querySelector('.moon-dark'),
    options: document.querySelectorAll('.option')
}
window.onload = () => {
    localStorage.clear();
}
DOM.optionsContainer.addEventListener('click', e => {
    if (e.target.className === "options-container") return;
    const subject = e.target.closest(".option").value;
    localStorage.setItem("subject", subject);
    window.location.href = "./subject.html";
})

DOM.slideBall.addEventListener('click', e => {
    e.target.classList.toggle("move");
    DOM.body.classList.toggle("dark");
    DOM.sunLight.classList.toggle("dark-1");
    DOM.moonLight.classList.toggle("dark-1");
    DOM.sunDark.classList.toggle("dark-2");
    DOM.moonDark.classList.toggle("dark-2");
    DOM.options.forEach(option => option.classList.toggle("dark-3"));

    let darkTheme;
    if (DOM.body.classList.contains("dark")) {
        darkTheme = true;
    } else {
        darkTheme = false;
    }
    localStorage.setItem("dark-theme", darkTheme);

})
