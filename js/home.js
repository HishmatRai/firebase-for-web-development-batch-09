firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        console.log("login true");
        if (!user.emailVerified) {
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


// add data
const input = document.getElementById("input")
const addDataHandler = () => {
    // firebase.database().ref("users/" + "user2").set({
    //     name: "iSkillers",
    //     email: "info@iskillers.com",
    //     phoneNumber: "11111111111111111"
    // })
    firebase.database().ref("users/").push({
        todo: input.value
    })
    input.value = ""
}



// get data
// firebase.database().ref("users/" + "-Np-mYxRaeO-2ZoyPeCe").on("value", (res) => {
//     console.log("res >>>>>>>>>>>", res.val())
// })

const container = document.getElementById("container");
const loading = document.getElementById("loading")
firebase.database().ref("users/").on("value", (res) => {
    loading.style.display = "none";
    container.style.display = "block"
    container.innerHTML = "";
    if (res.val() === null) {
        const noData = document.createElement("p");
        container.appendChild(noData);
        noData.innerHTML = "Data not found!"
    } else {
        res.forEach((item, index) => {
            // console.log("res >>>>>>>>>>>", item.val());
            const paragraph = document.createElement("p");
            container.appendChild(paragraph);
            paragraph.innerHTML = item.val().todo

        })
    }

})