
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

//console.log(document.querySelector("body").style);




sendButton.addEventListener("click", () => play())

function play() {
    sendButton.disabled = true;
    document.getElementById("wrapper") ? document.getElementById("wrapper").remove() : "";
    const Wrapper = document.createElement('div');
    Wrapper.id = "wrapper";
    Wrapper.className = "container d-flex justify-content-center align-items-center p-5 my-3";
    let arrayNumbers = generateNumbers(Wrapper, 5)
    sendButton.parentNode.insertBefore(Wrapper, sendButton.nextSibling);
    setTimeout(() => {
        sendButton.disabled = false;
        document.querySelectorAll(".cell").forEach(element => {
            element.classList.add("d-none")
        })
        for (let i = arrayNumbers.length - 1; i >= 0; i--) {
            sendButton.parentNode.insertBefore(generateQuestions(i + 1), sendButton.nextSibling);
        }
    }, 3000)
}

/* 
^ FUNCTION: genetateNumbers
*/
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
    Cell.className = "cell d-flex justify-content-center align-items-center border rounded-circle rounded-2 p-5 m-3";
    Cell.innerHTML = number;
    return Cell
}


//^ FUNCTION: generateQuestions
generateQuestions(4)
function generateQuestions(index) {
    const container = document.createElement('div');
    container.className = "my-3";
    const label = document.createElement('label');
    label.htmlFor = `user-input-${index}`;
    label.className = "form-label";
    label.innerHTML = `Insert the ${index}` + (index === 1 ? "st" : index === 2 ? "nd" : "th") + " number:"
    const input = document.createElement('div');
    input.type = "number";
    input.className = "form-control"
    input.id = `user-input-${index}`;
    input.placeholder = "insert the specified number"
    container.append(label, input)
    return container
}




