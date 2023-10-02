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
                event.preventDefault()
                event.stopPropagation()
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
    console.log("Submiting profile...")
    if (profileForm.checkValidity()) {
        if (localStorage.getItem("profileInfo") == null) {
            let profileInfo = {}
            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                profileInfo[field.id] = field.value
            }
            localStorage.setItem("profileInfo", JSON.stringify(profileInfo))
        }
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



function loadProfileInfo() {
    let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
    if (profileInfo) {
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            field.value = profileInfo[field.id] || null
        }
        loadProfilePicture();
    }
}

// LOAD PROFILE PICTURE
function loadProfilePicture() {
    let profileInfo = JSON.parse(localStorage.getItem("profileInfo"))
    if (profileInfo && profileInfo.picture) {
        document.getElementById("profilePictureElement").src = profileInfo.picture;
    }
}


window.addEventListener("load", () => {
    loadProfileInfo()
})