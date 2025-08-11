
export function Reveal (element) {
    if (element.classList.contains("Hide")) {
        element.classList.remove("Hide")
        element.classList.add("Reveal")
    }
}

 export function Hide (element) {
    if (element.classList.contains("Reveal")) {
        element.classList.remove("Reveal")
        element.classList.add("Hide")
    }
}

export function validateJsonConType(request) {
    const contentType = request.headers.get("Content-Type")
    if(contentType !== "application/json") {
        return new Response(JSON.stringify({error: "Content type must be application/json"}), { status: 415, headers: headersCORS })
    }
    return true
}

export function errorPopupMessageHandler(element, message, duration = 5000) {
    let originalText = element.textContent
    let originalColor = element.style.color
    element.textContent = message
    element.classList.add("popupErrorMessage")
    setTimeout(() => {
        element.textContent = originalText
        element.classList.remove("popupErrorMessage")
    },
    duration)
}

