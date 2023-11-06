let userName = '';

async function signIn() {
    document.getElementById('signInBtn').disabled = true;
    givenDetail = getInputData("email", "password");

    if (givenDetail.password != 'A123') {
        console.log("Wrong Password");
        alertFn("Wrong Password!", "alert-danger");
    } else {
        console.log("You are in!");
        userName = givenDetail.email;
        let name = givenDetail.email;
        alertFn(`Welcome ${name}`, "alert-success");
        showApp(userName, name);
    }
    document.getElementById('signInBtn').disabled = false;
}

async function signUp() {
    document.getElementById('signUpBtn').disabled = true;
    givenDetail = getInputData("signup-email", "signup-password");

    username = document.getElementById('signup-name').value;
    document.getElementById('signup-name').value = '';

    
    document.getElementById('signUpBtn').disabled = true;
}

function getInputData(email, pass) {
    givenEmail = document.getElementById(email).value;
    givenPass = document.getElementById(pass).value;
    document.getElementById(email).value = '';
    document.getElementById(pass).value = '';
    return { email: givenEmail, password: givenPass };
}


function showLogin() {
    document.getElementById('login').classList.remove('hide');
    document.getElementById('signup').classList.add('hide');
    document.getElementById('inner').classList.add('hide');
}

function showSignUp() {
    document.getElementById('signup').classList.remove('hide');
    document.getElementById('login').classList.add('hide');
    document.getElementById('inner').classList.add('hide');
}

function showApp(user, name) {
    document.getElementById('inner').classList.remove('hide');
    document.getElementById('login').classList.add('hide');
    document.getElementById('signup').classList.add('hide');

    userName = user;
    document.getElementById('user-nam').innerHTML = user;
    document.title = name;
}

function alertFn(message, type) {
    document.getElementById('alertBox').classList.remove('hide');
    document.getElementById('alertBox').classList.add(type);
    document.getElementById('alertBox').innerHTML = message;

    setTimeout(function() {
        document.getElementById('alertBox').classList.add('hide');
        document.getElementById('alertBox').classList.remove(type);
        document.getElementById('alertBox').innerHTML = '';
    }, 3600);
}