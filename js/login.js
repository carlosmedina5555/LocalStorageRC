//#region Element Reference
const bntRegistro = document.getElementById("register");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const repassword = document.getElementById("repass");
const spanMessage = document.getElementById("message");
configErrorMessage()

//#endregion

//#region variables
let _email, 
_pass = ""

const keys = {
    user_key:"usuarios"
}

//#end region



//#region function

function refresh(email) {
    
        let li = document.createElement("li")
        let spanMail = document.createElement("span")
        spanMail.style.color ="green"
        spanMail.innerText = email + " " + "Activo"
        li.appendChild(spanMail)
        userList.appendChild(li)
}

function validateUser(){
    if(!_email || _email.trim() === "") {
        throw new Error("El Email es obligatorio");
    }else if (!_pass || _pass.trim() === "" ) {
        throw new Error("El password es obligatorio")
    }
}


function configErrorMessage(){
    spanMessage.style.color = "red";
    spanMessage.style.fontSize = "8px";
    spanMessage.style.display ="block";
    spanMessage.style.textAlign = "center";
}

function login(email, password) {
    const userLs = localStorage.getItem(keys.user_key);
    if(!userLs) {
        throw new error("No existe el usuario indicado");
    }

    const usuarios = JSON.parse(userLs);
    const usuario = usuarios.find(function(user){
        return user.email === email;
    });

    if(!usuario) {
        throw new Error("El usuario o la contraseña no son correctas");
    }

    if (usuario.password === password) {
        return true;
        
    } else {
        throw new Error("El usuario o la contraseña no son correctas");
    }
}


//#endregion


//#region events
email.addEventListener("change", function(e){
    _email = e.target.value;
})

password.addEventListener("change", function(e){
    _pass = e.target.value;
})

bntRegistro.addEventListener("click", function(e){
    e.preventDefault();
    try{
        validateUser();
       if(login(_email, _pass)){
        refresh(_email)
       }

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