


function loginSuccess() {
    let userId = document.getElementById("floatingInput").value;
    userId = userId.substring(0, userId.indexOf('@'));
    localStorage.setItem("userId", userId)
}