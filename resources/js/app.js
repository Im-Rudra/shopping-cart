const cartItems = document.querySelectorAll('.cart-product');
const plusBtns = document.querySelectorAll('.plus');
const minusBtns = document.querySelectorAll('.minus');
const productPrices = document.querySelectorAll('.price');
const productQtys = document.querySelectorAll('.product-qty');

const subTotal = document.querySelector('.sub-total');
const grandTotal = document.querySelector('.grand-total');
const tax = document.querySelector('.tax');

let taxRate = 5;
subTotal.innerText = getSubtotal();
tax.innerText = getTax(5);
grandTotal.innerText = getSubtotal() + getTax(taxRate);

cartItems.forEach((item, index) => {
    item.addEventListener('click', function (e) {
        const price = Number(productPrices[index].getAttribute('data-price'));

        if (e.target.classList.contains('plus')) {
            btnUpdate(price, index, 1);
        }

        if (e.target.classList.contains('minus')) {
            if (productQtys[index].value == 0) {
                return
            }
            btnUpdate(price, index, -1);
        }
        
        subTotal.innerText = getSubtotal();
        tax.innerText = getTax(taxRate);
        grandTotal.innerText = getSubtotal() + getTax(taxRate);
    });
});

function btnUpdate(productPrice, productIndex, multiplier) {
    productQtys[productIndex].value = Number(productQtys[productIndex].value) + (multiplier);
    productPrices[productIndex].innerText = productQtys[productIndex].value * productPrice;
}

function getSubtotal() {
    let total = 0;
    productPrices.forEach(e => {
        total += parseFloat(e.innerText);
    });
    return total;
}

function getTax(taxPercentage) {
    let res = getSubtotal() * (taxPercentage / 100);
    if (res === 0) {
        return 0;
    }
    return parseFloat(res.toFixed(2));
}