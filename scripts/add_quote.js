const add_quote = document.querySelector('#add-quote');
const  input_container = document.querySelector('#input-container');
const add = document.querySelector('#add');
const close = document.querySelector('#close');
const overlay = document.querySelector('#overlay');

add_quote.addEventListener('click', () => {
    input_container.style.display = "block";
    overlay.style.display = "block"
})

close.addEventListener('click', () => {
    input_container.style.display = "none";
    overlay.style.display = "none"

})

overlay.addEventListener('click', () => {
    overlay.style.display = "none"
    input_container.style.display = "none";
})
