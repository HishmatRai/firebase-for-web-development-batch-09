const email = document.getElementById("email")
const password = document.getElementById("password");
const message = document.getElementById("message")
const firstName = document.getElementById("firstName")
const lastName = document.getElementById("lastName")
const phone = document.getElementById("phone")
const signUpHandler = () => {
    // 
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => {
            console.log(res.user);
            message.innerHTML = "Success";
            message.style.color = "green";
            res.user.sendEmailVerification().then(() => {
                firebase.database().ref("users/" + res.user.uid).set({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    phone: phone.value,
                    email: email.value,
                    password: password.value,
                    // profileImage: ""
                })
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


