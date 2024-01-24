const email = document.getElementById("email")
const password = document.getElementById("password");
const message = document.getElementById("message")
const signUpHandler = () => {
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            console.log(res.user);
            message.innerHTML = "Success";
            message.style.color = "green";
            res.user.sendEmailVerification().then(() => {
                setTimeout(() => {
                    window.location.assign("./email-verification.html")
                }, 2000);
            })

        })
        .catch((err) => {
            message.innerHTML = err.message;
            message.style.color = "red"
        })
}


