const allProductsBoxEl = document.querySelector('.allProducts-box');
const localStorageKey = "reviews";
const initialData = localStorage.getItem(localStorageKey);
const revies = JSON.parse(initialData);

document.addEventListener('DOMContentLoaded', function (e) {
    revies.forEach(element => {
        const productEl = document.createElement('div');
        productEl.classList.add('productEl');
        productEl.textContent = `Product name:${element.product}`;
        allProductsBoxEl.append(productEl);
        const productReviewsEL = document.createElement('div');
        productReviewsEL.classList.add('productReviewsEL')
        productReviewsEL.setAttribute('style', 'display:none');
        productEl.append(productReviewsEL);
        element.reviews.forEach(item => {
            const productReviewEl = document.createElement('div');
            productReviewEl.classList.add('productReview');
            productReviewEl.setAttribute("data-id", `${item.id}`);
            productReviewsEL.append(productReviewEl);
            const productReviewId = document.createElement('div');
            productReviewId.textContent = `Review id: ${item.id}`;
            productReviewEl.append(productReviewId);
            const productReviewsTextEl = document.createElement('div');
            productReviewsTextEl.textContent = `Review text: ${item.text}`;
            productReviewEl.append(productReviewsTextEl);
            const delButtonEl = document.createElement('button');
            delButtonEl.textContent = `Delete Review id ${item.id}`;
            productReviewEl.append(delButtonEl);
            delButtonEl.addEventListener('click', function (e) {
                const reviewToDel = e.target.closest('.productReview').dataset.id;
                const localStorageData = localStorage.getItem(localStorageKey);
                const data = JSON.parse(localStorageData);
                data.forEach(element => {
                    element.reviews = element.reviews.filter(person => person.id != reviewToDel);
                });
                localStorage.setItem(localStorageKey, JSON.stringify(data))
            });
        });
        productEl.addEventListener('click', ({ target }) => {
            if (target.classList.contains("productEl")) {
                target.firstChild.nextSibling.setAttribute('style', 'display:block');
            }
        });
    });
});