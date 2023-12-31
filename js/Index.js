//#region Element Reference
const bntRegistro = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const repassword = document.getElementById("repass");
const spanMessage = document.getElementById("message");
const userList = document.getElementById("userList");
configErrorMessage()

//#endregion

//#region variables
let _email, 
_pass, 
_rePass = "";


let users = []

const keys = {
    user_key:"usuarios"
}

let lsUsers = localStorage.getItem(keys.user_key);
if(lsUsers) {
    users = JSON.parse(lsUsers)
    refresh()
}
//#end region


//#region class
class User{
    constructor(email, password, repassword) {
        this.email = email;
        this.password = password;
        this.repassword = repassword;
    }
}
//#endregion


//#region function
function addUser() {
    let newUser = {
        email: _email,
        password: _pass,
    }
    users.push(newUser);
    let json = JSON.stringify(users);
    localStorage.setItem(keys.user_key, json);
}

function refresh() {
    userList.innerHTML = "";
    users.forEach(function(user) {
        let li = document.createElement("li")
        let spanMail = document.createElement("span")
        spanMail.style.color ="green"
        spanMail.innerText = user.email
        li.appendChild(spanMail)
        userList.appendChild(li)
    });
}

function validateUser(){
    if(!_email || _email.trim() === "") {
        throw new Error("El Email es obligatorio");
    }else if (!_pass || _pass.trim() === "" ) {
        throw new Error("El password es obligatorio")
    }else if (!_rePass || _rePass.trim() === "") {
        throw new Error("Debe repetir la contraseña.")
    }
}


function configErrorMessage(){
    spanMessage.style.color = "red";
    spanMessage.style.fontSize = "8px";
    spanMessage.style.display ="block";
    spanMessage.style.textAlign = "center";
}


//#endregion


//#region events
email.addEventListener("change", function(e){
    _email = e.target.value;
})

password.addEventListener("change", function(e){
    _pass = e.target.value;
})

repassword.addEventListener("change", function(e){
    _rePass = e.target.value;
})

bntRegistro.addEventListener("click", function(e){
    e.preventDefault();
    try
    {
        validateUser()
        addUser()
        refresh()

    }catch(ex) {
        spanMessage.innerText = ex.message;
        bntRegistro.disabled = true
        email.style.border = "2px solid red"
        setTimeout(() => {
            spanMessage.innerText = "";
            bntRegistro.disabled = false;
            email.style.border = ""
        }, 1500);
    }
    
})
//#endregion