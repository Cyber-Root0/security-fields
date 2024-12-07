import SecurityForm from "./SecurityForm";
const formS = new SecurityForm("app", "container");
var uid = formS.config('/teste', 'POST', {
    "X-key": 'teste'
}).build();-
window.addEventListener(uid, (event) => {
    console.log(event.detail);
}, false);