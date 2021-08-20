const cartItems = document.querySelectorAll('.cart-product');
let arrCartItems = getNewArr(cartItems); // new array of cartItems nodeList
const plusBtns = document.querySelectorAll('.plus');
const minusBtns = document.querySelectorAll('.minus');
const productPrices = document.querySelectorAll('.price');
let arrProductPrices = getNewArr(productPrices); // new array of productPrices nodeList
const productQtys = document.querySelectorAll('.product-qty');

const subTotal = document.querySelector('.sub-total');
const grandTotal = document.querySelector('.grand-total');
const tax = document.querySelector('.tax');

const taxPercentage = 5;

arrCartItems.forEach((item, index) => {
    const price = Number(productPrices[index].getAttribute('data-price')); // getting each product price
    productPrices[index].innerText = productQtys[index].value * price; // update each product price display
    updateDisplayTotal(taxPercentage); // update totals
    item.addEventListener('click', function (e) {
        if (e.target.classList.contains('plus')) { // plus btn
            btnUpdate(price, index, 1);
        }
        if (e.target.classList.contains('minus')) { // minus btn
            if (productQtys[index].value == 0) {
                return;
            }
            btnUpdate(price, index, -1);
        }
        // delete items [MOST IMPORTANT FINDINGS OF RUDRA]
        if (e.target.classList.contains('remove-item')) {
            let deleteIndex = arrCartItems.indexOf(item); // get the delete index
            arrCartItems.splice(deleteIndex, 1); // deleting arrCartItem
            arrProductPrices.splice(deleteIndex, 1); // deleting arrProductPrices
            item.remove();
            updateDisplayTotal(taxPercentage); // update display totals when deleted
        }
        updateDisplayTotal(taxPercentage); // update display totals
    });
});

function getNewArr(nodeList) {
    /* This function is created to generate new array of nodeList. Since all array methods cannot be implemented in nodeList */
    let newArr = [];
    nodeList.forEach(item => {
        newArr.push(item);
    });
    return newArr;
};

function btnUpdate(productPrice, productIndex, multiplier) {
    productQtys[productIndex].value = Number(productQtys[productIndex].value) + (multiplier);
    productPrices[productIndex].innerText = productQtys[productIndex].value * productPrice;
};

function getSubTotal() {
    let total = 0;
    arrProductPrices.forEach(e => {
        total += parseFloat(e.innerText);
    });
    return total;
};

function getTax(taxRate) {
    let res = getSubTotal() * (taxRate / 100);
    if (res === 0) {
        return 0;
    }
    return parseFloat(res.toFixed(2));
};

function updateDisplayTotal(taxRate) {
    subTotal.innerText = getSubTotal();
    tax.innerText = getTax(taxRate);
    grandTotal.innerText = getSubTotal() + getTax(taxRate);
};