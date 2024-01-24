const email = document.getElementById("email")
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
        email.innerHTML = user.email

        if (user.emailVerified) {
            window.location.assign("./home.html")
        }
    } else {
        window.location.assign("./sign-in.html")
    }
});

const message = document.getElementById("message")
const resendHandler = () => {
    firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
            message.innerHTML = "Email verification sent!"
        });
}

const goHome = () => {
    location.reload()
}