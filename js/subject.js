import data from '../data.json' with { type: 'json' };

const state = {
    subject: ''
}
window.onload = () => {
    // change url to the subject's url
    const subject = localStorage.getItem("subject");
    state.subject = subject;
    const newUrl = `/${subject}`;
    const stateObj = { subject: subject };
    history.pushState(stateObj, `${subject}`, newUrl);
}
// https://www.quora.com/How-do-I-modify-the-URL-without-reloading-the-page-using-JavaScript

console.log(data)