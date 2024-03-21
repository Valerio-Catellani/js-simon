
/*
TODO        Esercizio di oggi: Simon Says
TODO        nome repo: js-simon
TODO        Descrizione:
TODO        Visualizzare in pagina 5 numeri casuali ( tra 1 e 100) non duplicati.
TODO        Da lì parte un timer di 30 secondi.
TODO        Dopo i 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto        TODO        precedentemente, tramite il prompt()  ( o meglio caselle di input).
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

sendButton.addEventListener("click", () => play())

//^ FUNCTION: play
function play() {
    sendButton.disabled = true; //disable the pay button to prevent indesidered effect with the settimeout
    reset(); //reset function
    sendButton.innerHTML = "Restart Game"; //chenage the html of the button
    //--- element: wrapper
    const Wrapper = document.createElement('div');
    Wrapper.id = "wrapper";
    Wrapper.className = "container d-flex justify-content-center fle align-items-center flex-column flex-md-row p-3 my-3";
    const arrayNumbers = generateNumbers(Wrapper, 5);
    App.append(Wrapper);
    //--- element: timer
    const Timer = document.createElement('h3');
    Timer.id = "timer";
    Timer.innerHTML = "Time remaning: <span id='timer-seconds'></span>s";
    App.append(Timer);
    timer(30000);
    //--- timout for 30s
    setTimeout(() => {
        sendButton.disabled = false;
        opacity(Wrapper)
        for (let i = 0; i < arrayNumbers.length; i++) {
            App.appendChild(generateQuestions(i + 1));
        }
        App.append(generateResultsButton(arrayNumbers))

    }, 31000)
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
    Cell.className = "cell d-flex justify-content-center align-items-center border rounded-circle border-5  p-5 m-3 fs-1 fw-bold";
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
            enableButton(5);
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
    resultsButton.className = "button-49 btn-warning my-4";
    resultsButton.innerHTML = "Check Results";
    resultsButton.disabled = true;
    resultsButton.addEventListener('click', function () {
        let userValueArray = [];
        document.querySelectorAll(".user-input-value").forEach(element => {
            userValueArray.push(parseInt(element.value))
            element.disabled = true
        })
        opacity(document.getElementById("wrapper"))
        compare(arrayNumbers, userValueArray);
        this.remove()
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
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        let cell = document.getElementById(`cell-${numbers[i]}`);
        let input = document.getElementById(`user-input-${i + 1}`);
        let message = document.createElement('h4');
        if (numbers[i] === answer[i]) {
            count++
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
    document.body.prepend(modalEnd(count, 5))
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


//^ FUNCTION MODAL END
function modalEnd(score, condition) {
    const BackGroundBlack = document.createElement('div');
    BackGroundBlack.id = "hype-modal"
    BackGroundBlack.className = "position-absolute w-100 h-100 overflow-hidden d-flex align-items-center justify-conentent-center position-fixed";
    BackGroundBlack.style = "z-index:100; left:0; top:0; background-color: rgba(0, 0, 0, 0.4);";
    const EndBanner = document.createElement('div');
    EndBanner.className = "mx-auto d-flex align-items-center justify-content-center flex-column";
    EndBanner.style = "width:700px; height:700px;";
    EndBanner.id = `banner`
    const EndText = document.createElement('h2');
    EndText.className = "text-white text-center";
    EndText.style = "font-size:5rem; -webkit-text-stroke: 1px black; ";
    EndText.innerHTML = `You found ${score}/${condition}! <p class='fs-1'>Total Points: ${score}</p>`;
    const EndButton = document.createElement('button')
    EndButton.id = "end"
    EndButton.className = `btn btn-lg bg-${score !== 5 ? "danger" : "success"}`
    EndButton.innerHTML = score !== 5 ? `Try Again` : "Play Again!"
    EndButton.addEventListener('click', () => {
        document.getElementById("hype-modal").remove()
    })
    EndBanner.append(EndText, EndButton)
    BackGroundBlack.appendChild(EndBanner);
    return BackGroundBlack
}

//!---------- my bonus ------------//
//^ FUNCTION opacity
function opacity(element) {
    let opacity = parseFloat(getComputedStyle(element).opacity);
    let increment = opacity >= 1 ? -0.1 : 0.1;

    const intervallo = setInterval(() => {
        opacity += increment;
        element.style.opacity = opacity.toString();


        if ((opacity <= 0 && increment < 0) || (opacity >= 1 && increment > 0)) {
            clearInterval(intervallo);
            element.style.opacity = increment < 0 ? '0' : '1';
        }
    }, 30);
}


//!---------- my bonus ------------//
//^FUNCTION: Timer
function timer(numberMilliseconds) {
    let counter = numberMilliseconds / 1000;
    let time = setInterval(() => {
        document.getElementById('timer-seconds').innerHTML = counter
        if (counter === 0) {
            clearInterval(time);
            document.getElementById('timer').remove();
        } else {
            counter--;
        }
    }, 1000)
}

