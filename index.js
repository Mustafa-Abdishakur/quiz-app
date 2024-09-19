
document.querySelector('.options-container').addEventListener('click', e => {
    if (e.target.className === "options-container") return;
    const subject = e.target.closest(".option").value;
    localStorage.setItem("subject", subject);

    window.location.href = "./subject.html";

 


})