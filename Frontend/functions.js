
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

export async function validateJsonConType(request, headersCORS) {
    const contentType = request.headers.get("Content-Type")
    if(contentType !== "application/json") {
        return new Response(JSON.stringify({error: "Content-Type must be application/json"}), { status: 415, headers: headersCORS })
    }
    return true
}

export function errorPopupMessageHandler(element, message, duration = 5000) {
    let originalText = element.dataset.originalText
    element.textContent = message
    element.classList.add("popupErrorMessage")
    setTimeout(() => {
        element.textContent = originalText
        element.classList.remove("popupErrorMessage")
    }, duration)
}

export function successPopupMessageHandler(element, message, duration = 5000) {
    let originalText = element.dataset.originalText
    element.textContent = message
    element.classList.add("popupSuccessMessage")
    setTimeout(() => {
        element.textContent = originalText
        element.classList.remove("popupSuccessMessage")
    }, duration)
}



