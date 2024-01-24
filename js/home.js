firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        console.log("login true");
        if (!user.emailVerified){
            window.location.assign("./email-verification.html")
        }
    } else {
        window.location.assign("./sign-in.html")
    }
});


const logOutHandler = () => {
    firebase.auth().signOut().then(() => {
        window.location.assign("./sign-in.html")
    })
}