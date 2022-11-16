// LOGIN SUCCESS

function loginSuccess() {
    let email = document.getElementById("floatingInput").value;
    if (localStorage.getItem("profileInfo") == undefined) {
        let profileInfo = {"email" : email}
        localStorage.setItem("profileInfo", JSON.stringify(profileInfo))
    }
    userId = email.substring(0, email.indexOf('@'));
    localStorage.setItem("userId", userId)
}