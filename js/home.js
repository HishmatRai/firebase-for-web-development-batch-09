let uid;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        uid = user.uid
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
    // firebase.database().ref("todos/" + "user2").set({
    //     name: "iSkillers",
    //     email: "info@iskillers.com",
    //     phoneNumber: "11111111111111111"
    // })
    var addData = firebase.database().ref("todos/").push({
        todo: input.value,
        uid: uid
    })
    firebase.database().ref("todos/" + addData.key).update({
        key: addData.key
    })
    input.value = "";

}



// get data
// firebase.database().ref("todos/" + "-Np-mYxRaeO-2ZoyPeCe").on("value", (res) => {
//     console.log("res >>>>>>>>>>>", res.val())
// })

const container = document.getElementById("container");
const loading = document.getElementById("loading")
firebase.database().ref("todos/").on("value", (res) => {
    loading.style.display = "none";
    container.style.display = "block"
    container.innerHTML = "";
    if (res.val() === null) {
        const noData = document.createElement("p");
        container.appendChild(noData);
        noData.innerHTML = "Data not found!"
    } else {
        res.forEach((item, index) => {
            console.log(">>>>>>>>>>item.val()", item.val())
            // console.log("res >>>>>>>>>>>", item.val());
            const paragraph = document.createElement("p");
            container.appendChild(paragraph);
            paragraph.innerHTML = item.val().todo;
            // edit button
            if (item.val().uid === uid) {
                const editButton = document.createElement("button");
                paragraph.appendChild(editButton);
                editButton.innerHTML = "Edit";

                // delete button
                const deleteButton = document.createElement("button");
                paragraph.appendChild(deleteButton);
                deleteButton.innerHTML = "Delete";

                editButton.addEventListener("click", () => {
                    var pro = prompt("Todo", item.val().todo)
                    firebase.database().ref("todos/" + item.val().key).update({
                        todo: pro
                    })
                })
    
                // delete function
                deleteButton.addEventListener("click", () => {
                    firebase.database().ref("todos/" + item.val().key).remove()
                })
            }

            // edit function 

         

        })
    }

})


// edit
// const editHandler = () => {
//     var pro = prompt();
//     firebase.database().ref("todos/" + "-Np-smmbJxltL_pxbksR").update({
//         todo: pro,
//     })
// }


// // delete
// const deleteHandler = () => {
//     firebase.database().ref("todos/" + "-Np-smmbJxltL_pxbksR").remove()
// }