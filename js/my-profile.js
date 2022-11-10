// BOOTSTRAP FORM VALIDATION
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                profileSubmit()
                form.classList.add('was-validated')
            }, false)
        })
})()

const profileForm = document.getElementById("profileForm")
const fields = document.getElementsByClassName("profile-field")
const pictureInput = document.getElementById('picture');

// SUBMIT PROFILE INFO

function profileSubmit() {
    if (profileForm.checkValidity()) {
        let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            profileInfo[field.id] = field.value
        }
        localStorage.setItem("profileInfo", JSON.stringify(profileInfo))
    }
}


// SUBMIT PROFILE PICTURE
pictureInput.addEventListener('change', () => {
    const file = pictureInput.files[0];
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.addEventListener('load', () => {
        const base64Img = fr.result

        let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
        profileInfo.picture = base64Img
        localStorage.setItem("profileInfo", JSON.stringify(profileInfo))
        loadProfileInfo()
    })
})




// LOAD PROFILE INFO
function loadProfileInfo() {
    let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        field.value = profileInfo[field.id] || null
    }
    loadProfilePicture()
}

// LOAD PROFILE PICTURE
function loadProfilePicture() {
    let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
    profileInfo.picture == undefined ? null : document.getElementById("profilePictureElement").src = profileInfo.picture
    loadNavbarProfilePicture()
}



window.addEventListener("load", () => {
    loadProfileInfo()
})