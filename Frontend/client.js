import * as functions from "./functions.js";

const loginPopupButton = document.querySelector("#loginNavButton")
const popupLoginContainer = document.querySelector("#popupLoginContainer")
const closePopup = document.querySelectorAll(".popupClose")

const registerPopupButton = document.querySelector("#registerNavButton")
const popupRegisterContainer = document.querySelector("#popupRegisterContainer")



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



closePopup.forEach(button => button.addEventListener("click", async () => {
    functions.Hide(popupLoginContainer)
    functions.Hide(popupRegisterContainer)
}))