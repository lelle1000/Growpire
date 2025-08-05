
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