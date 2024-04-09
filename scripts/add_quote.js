const add_quote = document.querySelector('#add-quote');
const input_container = document.querySelector('#input-container');
const add = document.querySelector('#add');
const close = document.querySelector('#close');
const overlay = document.querySelector('#overlay');
const quote_input = document.querySelector('#quote-input');

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

add.addEventListener('click', () => {
    const quote = quote_input.value.trim();
    if (quote !== '') {
        // Store the quote in the 'quotes' collection under 'monday'
        db.collection('quotes').doc('wednesday').set({
            quote: quote
        })
            .then(() => {
                console.log('Quote added successfully');
                quote_input.value = ''; // Clear the input field after adding the quote
            })
            .catch((error) => {
                console.error('Error adding quote: ', error);
            });
    } else {
        console.log('Please enter a valid quote');
    }

})