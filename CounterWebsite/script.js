const countvalue = document.querySelector("#countvalue");

const increment = () => {
    let value = parseInt(countvalue.innerText);
    value += 1;
    countvalue.innerText = value;
}

const decrement = () => {
    let value = parseInt(countvalue.innerText);
    value -= 1;
    countvalue.innerText = value;
}