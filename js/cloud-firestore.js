const input = document.getElementById("input")
const addData = () => {
    // firebase.firestore().collection("testing/").doc("testing-2").set({
    //     todo: input.value
    // }).then(() => {
    //     console.log("Document successfully written!");
    //     input.value = ""
    // })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });

    firebase.firestore().collection("testing/").add({
        todo: input.value,
        verified: false,
    }).then((res) => {
        console.log("Document successfully written!", res);
        firebase.firestore().collection("testing/").doc(res.id).update({
            id: res.id
        })
        input.value = ""
    })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}



// firebase.firestore().collection("testing/").doc("4oCy2fZrukSVpgCAR76x").get().then((doc) => {
//     console.log("res>>>>>>>>>>>>", doc)
//     console.log("res>>>>>>>>>>>>", doc.data())
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

// firebase.firestore().collection("testing/").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log(val.data())
//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

// firebase.firestore().collection("testing/").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log(val.data());
//         if(val.data().todo === 'iHunar'){
//             console.log("iHunar>>>>>>>>>>>>>>>",val.data());

//         }
//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
// firebase.firestore().collection("testing/").where("todo", "==", "iHunar").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log("data>>>>>>>>>>>>>>>", val.data());

//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });

// firebase.firestore().collection("testing/").where("verified", "==", true).get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log("data>>>>>>>>>>>>>>>", val.data());

//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });
const container = document.getElementById("container")
// firebase.firestore().collection("testing/").get().then((doc) => {
//     doc.forEach((val, index) => {
//         console.log("data>>>>>>>>>>>>>>>", val.data());
//         const p = document.createElement("p");
//         container.appendChild(p);
//         p.innerHTML = val.data().todo

//     })
// }).catch((error) => {
//     console.log("Error getting document:", error);
// });


firebase.firestore().collection("testing/")

    .onSnapshot((querySnapshot) => {
        container.innerHTML = ""
        var todos = [];
        querySnapshot.forEach((doc) => {
            todos.push(doc.data());

        });
        todos.map((v, i) => {
            const p = document.createElement("p");
            container.appendChild(p);
            p.innerHTML = v.todo;
            // if (v.verified) {
            //     const img = document.createElement("img");
            //     p.appendChild(img);
            //     img.src = "https://cdn3.vectorstock.com/i/1000x1000/09/82/check-icon-vector-10850982.jpg"
            // }else{
            //     const img = document.createElement("img");
            //     p.appendChild(img);
            //     img.src = "https://t3.ftcdn.net/jpg/05/77/95/38/360_F_577953883_zBPvFb7h53kH4EORs7Cy8C1iTlrBP6lQ.jpg"
            // }
            const img = document.createElement("img");
            p.appendChild(img);
            // if (v.verified) {
            //     img.src = "https://cdn3.vectorstock.com/i/1000x1000/09/82/check-icon-vector-10850982.jpg"
            // } else {
            //     img.src = "https://t3.ftcdn.net/jpg/05/77/95/38/360_F_577953883_zBPvFb7h53kH4EORs7Cy8C1iTlrBP6lQ.jpg"
            // }
            img.src = v.verified ? "https://cdn3.vectorstock.com/i/1000x1000/09/82/check-icon-vector-10850982.jpg" : "https://t3.ftcdn.net/jpg/05/77/95/38/360_F_577953883_zBPvFb7h53kH4EORs7Cy8C1iTlrBP6lQ.jpg"
            const editButton = document.createElement("button");
            p.appendChild(editButton);
            editButton.innerHTML = "Edit";
            const deleteButton = document.createElement("button");
            p.appendChild(deleteButton);
            deleteButton.innerHTML = "Delete";


            // edit function
            editButton.addEventListener("click", () => {
                var pro = prompt("todo", v.todo)
                // firebase.database().ref("testing/"+v.id).
                firebase.firestore().collection("testing/").doc(v.id).update({
                    todo: pro
                })
            })
            // delete function
            deleteButton.addEventListener("click", () => {
                firebase.firestore().collection("testing/").doc(v.id).delete()
            })

        })
        console.log(todos);
    });