
/*
TODO        Esercizio di oggi: Simon Says
TODO        nome repo: js-simon
TODO        Descrizione:
TODO        Visualizzare in pagina 5 numeri casuali ( tra 1 e 100) non duplicati.
TODO        Da lì parte un timer di 30 secondi.
TODO        Dopo i 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto        TODO        precedentemente, tramite il prompt() ( o meglio caselle di input).
TODO        Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati 
todo        individuati.
TODO        Consigli del giorno:
TODO        * Pensate prima in italiano.
TODO        * Dividete in piccoli problemi la consegna.
TODO        * Individuate gli elementi di cui avete bisogno per realizzare il programma.
TODO        Buon pomeriggio e buon lavoro !!!! :muscolo:
*/

const sendButton = document.getElementById("send-button");
const App = document.getElementById("app")

//console.log(document.querySelector("body").style);




sendButton.addEventListener("click", () => play())

//^ FUNCTION: play
function play() {
    sendButton.disabled = true;
    reset()
    const Wrapper = document.createElement('div');
    Wrapper.id = "wrapper";
    Wrapper.className = "container d-flex justify-content-center align-items-center p-5 my-3";
    const arrayNumbers = generateNumbers(Wrapper, 5)
    App.append(Wrapper)
    setTimeout(() => {
        sendButton.disabled = false;
        document.getElementById("wrapper").classList.add("opacity-0")
        for (let i = 0; i < arrayNumbers.length; i++) {
            App.appendChild(generateQuestions(i + 1));
        }
        App.append(generateResultsButton(arrayNumbers))

    }, 1000)
}

//^ FUNCTION: RESET
function reset() {
    document.getElementById("wrapper") ? document.getElementById("wrapper").remove() : "";
    document.querySelectorAll(".answer-container").length > 0 ? document.querySelectorAll(".answer-container").forEach(element => {
        element.remove()
    }) : "";
    document.getElementById("result-button") ? document.getElementById("result-button").remove() : ""
}


//^ FUNCTION: genetateNumbers
/**
 * A function that generate unique numbersa
 * @param {*} difficulty 
 * @returns 
*/
function generateNumbers(container, difficulty) {
    let arrayNumbers = [];
    while (arrayNumbers.length < difficulty) {
        let number = getRndInteger(1, 100)
        if (!arrayNumbers.includes(number)) {
            arrayNumbers.push(number)
            container.append(cellGenerator(number))
        }
    }
    return arrayNumbers;
}


//^FUNCTION: cellGenerator
function cellGenerator(number) {
    const Cell = document.createElement('div');
    Cell.id = `cell-${number}`
    Cell.className = "cell d-flex justify-content-center align-items-center border rounded-circle border-5 p-5 m-3";
    Cell.innerHTML = number;
    return Cell
}


//^ FUNCTION: generateQuestions
function generateQuestions(index) {
    const container = document.createElement('div');
    container.className = "my-3 answer-container w-75";
    const label = document.createElement('label');
    label.htmlFor = `user-input-${index}`;
    label.className = "form-label";
    label.innerHTML = `Insert the ${index}` + (index === 1 ? "st" : index === 2 ? "nd" : "th") + " number:"
    const input = document.createElement('input');
    input.id = `user-input-${index}`;
    input.className = "user-input-value form-control border-danger bg-danger-subtle border-4";
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", "insert the specified number");
    input.addEventListener("input", () => {
        if (!(input.value === "" || isNaN(input.value))) {
            changeColor(input, "success")
            enableButton(5);
        } else {
            changeColor(input, "fail")
        }
    })
    container.append(label, input);
    return container
}


//^ FUNCTION: generateResultButton

function generateResultsButton(arrayNumbers) {
    const resultsButton = document.createElement('button');
    resultsButton.id = "result-button";
    resultsButton.type = "button";
    resultsButton.className = "btn btn-lg btn-warning my-4";
    resultsButton.innerHTML = "Check Results";
    resultsButton.disabled = true;
    resultsButton.addEventListener('click', () => {
        let userValueArray = [];
        document.querySelectorAll(".user-input-value").forEach(element => {
            userValueArray.push(parseInt(element.value))
        })
        document.getElementById("wrapper").classList.remove("opacity-0")
        compare(arrayNumbers, userValueArray)
    })
    return resultsButton
}

//^ FUNCTION: enableButton 
function enableButton(elementToEnable) {
    let counter = 0;
    document.querySelectorAll(".user-input-value").forEach(element => {
        element.classList.contains("bg-success-subtle") ? counter++ : ""
    })
    let buttonToEnable = document.getElementById("result-button")
    return counter === elementToEnable ? buttonToEnable.disabled = false : buttonToEnable.disabled = true
}


//^ FUNCTION: compare
function compare(numbers, answer) {

    for (let i = 0; i < numbers.length; i++) {
        let cell = document.getElementById(`cell-${numbers[i]}`);
        let input = document.getElementById(`user-input-${i + 1}`);
        let message = document.createElement('h4');
        if (numbers[i] === answer[i]) {
            changeColor(cell, "success");
            changeColor(input, "success");
            message.className = "text-success text-center"
            message.innerHTML = `Congrats! You choose correctly ${answer[i]}!`
            input.parentElement.append(message)
        } else {
            changeColor(cell, "fail");
            changeColor(input, "fail");
            message.className = "text-danger text-center";
            message.innerHTML = `Unlucky! You choose ${answer[i]} but the number was ${numbers[i]}!`;
            input.parentElement.append(message);
        }
    }
}

//^ FUCNTION changeColor
function changeColor(element, type) {
    if (type === "success") {
        element.classList.remove("border-danger")
        element.classList.remove("bg-danger-subtle")
        element.classList.add("border-success")
        element.classList.add("bg-success-subtle")
    } else if ("fail") {
        element.classList.add("border-danger")
        element.classList.add("bg-danger-subtle")
        element.classList.remove("border-success")
        element.classList.remove("bg-success-subtle")
    }

} 