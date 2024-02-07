const formEl = document.querySelector('.reviews-box');
const inputEl = document.querySelector('.review__productName');
const textareaEl = document.querySelector('.reviews__productReview');

const localStorageKey = "reviews";
const initialData = `[{"product":"1","reviews":[{"id":"${Math.round(Date.now() * Math.random())}", "text":"2"},{"id":"${Math.round(Date.now() * Math.random())}", "text":"3"}]}]`;

if (!localStorage.getItem(localStorageKey)) {
    localStorage.setItem(localStorageKey, initialData)
}

const revies = JSON.parse(localStorage.getItem(localStorageKey));
console.log(revies);

function saveData(array) {
    localStorage.setItem(localStorageKey, JSON.stringify(array));
}

formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    if (inputEl.value.length < 1 || textareaEl.value.length < 1) {
        alert('Field must not be empty!');
    } else {
        const productName = inputEl.value;
        const productRewies = textareaEl.value;

        if (revies.some(item => item.product === `${productName}`)) {
            console.log(revies.some(item => item.product === `${productName}`));
            const indexProductEl = revies.findIndex(item => {
                return item.product === productName;
            })
            console.log(indexProductEl);
            revies[indexProductEl].reviews.push({ id: `${Math.round(Date.now() * Math.random())}`, text: productRewies })
            console.log(revies);
            saveData(revies);

        } else {
            revies.push({ product: productName, reviews: [{ id: `${Math.round(Date.now() * Math.random())}`, text: productRewies }] });
            console.log(revies);
            saveData(revies);
        }
    }
});