import * as functions from "./functions.js";

const loginPopupButton = document.querySelector("#loginNavButton");
const popupLoginContainer = document.querySelector("#popupLoginContainer");
const closePopup = document.querySelectorAll(".popupClose");

const registerPopupButton = document.querySelector("#registerNavButton");
const popupRegisterContainer = document.querySelector("#popupRegisterContainer");

const registerPopupClickHere = document.querySelector("#registerPopupClickHere");
const loginPopupClickHere = document.querySelector("#loginPopupClickHere");

const createAccount = document.querySelector("#registerButton");
const login = document.querySelector("#loginButton");

const registerUsername = document.querySelector("#registerInputUsername");
const registerPassword = document.querySelector("#registerInputPassword");
const registerGmail = document.querySelector("#registerInputGmail");

const loginUsername = document.querySelector("#loginInputUsername");
const loginPassword = document.querySelector("#loginInputPassword");

const registerHeadline = document.querySelector("#registerHeadline")
const loginHeadline = document.querySelector("#loginHeadline")

const loggedInUser = document.querySelector("#loggedInUser")
const userSubMenu = document.querySelector("#userSubmenuContainer")

const signOutButton = document.querySelector("#signOutButton")

const userBalanceAmount = document.querySelector("#userBalanceAmount")

let activeUserId = undefined
userBalanceAmount.textContent = userBalanceAmount.dataset.originalText

loginPopupButton.addEventListener("click", async () => {
    if (popupLoginContainer.classList.contains("Hide")) {
        functions.Reveal(popupLoginContainer)
        functions.Hide(popupRegisterContainer)
    } else if (popupLoginContainer.classList.contains("Reveal")) {
        functions.Hide(popupLoginContainer)   
    }
})

registerPopupButton.addEventListener("click", async () => {
    if (popupRegisterContainer.classList.contains("Hide")) {
        functions.Reveal(popupRegisterContainer)
        functions.Hide(popupLoginContainer)
    } else if (popupRegisterContainer.classList.contains("Reveal")) {
        functions.Hide(popupRegisterContainer)   
    }
})

registerPopupClickHere.addEventListener("click", async () => {
    functions.Hide(popupRegisterContainer)
    functions.Reveal(popupLoginContainer)
})

loginPopupClickHere.addEventListener("click", async () => {
    functions.Hide(popupLoginContainer)
    functions.Reveal(popupRegisterContainer)
})

closePopup.forEach(button => button.addEventListener("click", async () => {
    functions.Hide(popupLoginContainer)
    functions.Hide(popupRegisterContainer)
}))

loggedInUser.addEventListener("click", async () => {
    if(userSubMenu.classList.contains("Hide")) {
        functions.Reveal(userSubMenu)
    } else if (userSubMenu.classList.contains("Reveal")) {
        functions.Hide(userSubMenu)
    }
})


// Register & Login request

createAccount.addEventListener("click", async () => {
    const registerResponse = await fetch("http://localhost:8000/register", {
        method: "POST",
        body: JSON.stringify({ registerUsername: registerUsername.value, registerPassword: registerPassword.value, registerGmail: registerGmail.value }),
        headers: { "Content-Type" : "application/json" }
    })

    registerUsername.value = ""
    registerPassword.value = ""
    registerGmail.value = ""

    if(registerResponse.status === 202 || registerResponse.ok) {
        const successfulData = await registerResponse.json()
        functions.successPopupMessageHandler(registerHeadline, "Account successfully created")
        setTimeout(() => {
            functions.Hide(popupRegisterContainer)
        }, 5000)

        activeUserId = successfulData.userId
        
        if (activeUserId !== undefined) {
            if(successfulData.username.length <= 8) {
                loggedInUser.textContent = successfulData.username
                functions.Reveal(loggedInUser)
                functions.Hide(registerPopupButton)
                functions.Hide(loginPopupButton)
            } else {
                loggedInUser.textContent = loggedInUser.dataset.originalText
                functions.Reveal(loggedInUser)
                functions.Hide(registerPopupButton)
                functions.Hide(loginPopupButton)
            }
            
            userBalanceAmount = successfulData.userBalance
            
        }

    }

    if(!registerResponse.ok) {
        const errorData = await registerResponse.json()   
        if (registerResponse.status === 400) {
            functions.errorPopupMessageHandler(registerHeadline, "Fields needs to be filled")
        }

        if (registerResponse.status === 406) {
            functions.errorPopupMessageHandler(registerHeadline, "Email already in use")
        }

        if (registerResponse.status === 409) {
             if (errorData.error === "INVALID USERNAME") {
            functions.errorPopupMessageHandler(registerHeadline, "Username Invalid")
            } else if (errorData.error === "INVALID PASSWORD") {
            functions.errorPopupMessageHandler(registerHeadline, "Password Invalid")
            } else if (errorData.error === "INVALID EMAIL") {
            functions.errorPopupMessageHandler(registerHeadline, "Email Invalid")
            }
        }
       
    }

})

login.addEventListener("click", async () => {
    const loginResponse = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ loginUsername: loginUsername.value, loginPassword: loginPassword.value }),
        headers: { "Content-Type" : "application/json" }
    })

    if(loginResponse.ok || loginResponse.status === 202 ) {
        const successfulData = await loginResponse.json()

        activeUserId = successfulData.userId
        
        userBalanceAmount = successfulData.userBalance

        functions.successPopupMessageHandler(loginHeadline, "Logged in")
        setTimeout(() => {
            functions.Hide(popupLoginContainer)
        }, 5000)
        
        
        if (activeUserId !== undefined) {
            if(successfulData.username.length <= 8) {
                loggedInUser.textContent = successfulData.username
                functions.Reveal(loggedInUser)
                functions.Hide(registerPopupButton)
                functions.Hide(loginPopupButton)
            } else {
                loggedInUser.textContent = loggedInUser.dataset.originalText
                functions.Reveal(loggedInUser)
                functions.Hide(registerPopupButton)
                functions.Hide(loginPopupButton)
            }
            
        }
    }

    if(!loginResponse.ok || loginResponse.status === 404) {
        const errorData = await loginResponse.json()
    }
    
    
})

signOutButton.addEventListener("click", async () => {
    functions.Hide(loggedInUser)
    functions.Reveal(loginPopupButton)
    functions.Reveal(registerPopupButton)
    functions.Hide(userSubMenu)

    if (activeUserId !== undefined) {
        activeUserId = undefined
        userBalanceAmount.textContent = userBalanceAmount.dataset.originalText
    }
})


