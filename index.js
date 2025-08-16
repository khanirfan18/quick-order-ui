import { menuArray } from './data.js'

function dinerHTML(){
    let menu = ''
    menuArray.map((food) => {    
        menu += `    
            <div class="product-card">
                <div class="image">
                    <img src="${food.image}" class="product">
                </div>
                <div class="info">
                    <div class="product-names">
                        <ul class="product-name">${food.name}</ul>
                    </div>
                    <div class="product-ingredients-info">
                        <ul class="ingredients">
                            <li>${food.ingredients},</li>
                        </ul>
                    </div>
                    <div class="product-prices">
                        <ul class="product-price">
                            <li>${food.price}$</li>
                        </ul>
                    </div>
                </div>
            </div>
            <button class="plusButton" data-add="${food.id}">
                <i class="fa-solid fa-plus" data-add="${food.id}"></i>
            </button>
        `
    })
    return menu
}

function render(){
    document.getElementById('section').innerHTML = dinerHTML(menuArray)
}
render()

let cart = []

document.addEventListener('click', function(e) {
    if (e.target.dataset.add) {
        const foodId = e.target.dataset.add 
        const food = menuArray.find(item => item.id == foodId) 
        if(food) { 
            cart.push(food)
            renderCart()
        }
    }
    if (e.target.dataset.remove) {
        const removeId = e.target.dataset.remove
        cart = cart.filter(item => item.id != removeId) 
        renderCart()
    }
})

function renderCart() {
    if (cart.length === 0) {
        document.getElementById('section-part-one').innerHTML = ""
        return
    }
    let completeOrderHTML = `
        <main id="section-one">
            <p class="your-order">Your order</p>
            <div class="summary">
    `
    cart.map((item) => {
        completeOrderHTML += `
            <div class="row">
                <span class="cart-product">${item.name}</span>
                <button class="removeButton" data-remove="${item.id}">remove</button>
                <span class="product-price">$${item.price}</span>
            </div>
        `
    })
    const total = cart.reduce((sum, item) => sum + item.price, 0)
    completeOrderHTML += `
            <div class="line"></div>
            <div class="row">
                <span class="subtotal-label">Total price</span>
                <span class="subtotal-price">$${total}</span>
            </div>
            <button class="complete-order-btn" type="submit" data-submit="complete-order-btn">Complete order</button>
        </div>
    </main>
    `
    document.getElementById('section-part-one').innerHTML = completeOrderHTML
}

document.addEventListener('click',function(e){
    if(e.target.dataset.submit){
        let submitOrderHtml = `<form id = "consent-form">
                    <p class="form-heading">Enter card details</p>
                    <div class="form-inputs">
                    <input type="text" name="fullName" id = "fullName" placeholder="Enter your name" minlength="4" required/>
                    <input type="number" name="cardNumber" placeholder="Enter card number" minlength="4" required/>
                     <input type="password" name="CVV" placeholder="Enter your CVV" minlength="3" required/>
                    </div>
                    <div class="form-btn">
                    <button type="submit" id="form-modal-btn" data-pay="form-modal-btn">Pay</button>
                    </div>
                </form>`
                document.getElementById('popup-modal').innerHTML = submitOrderHtml
    } 
})

document.addEventListener('click', function(e) {
    if (e.target.dataset.pay) {
        e.preventDefault()  
        const consentForm = document.getElementById('consent-form')
        const consentFormData = new FormData(consentForm)
        const fullName = consentFormData.get('fullName')
        let finalMessage = `
            <div class="final-msg">
                <p class="userName">Thanks, ${fullName}! Your order is on its way!</p>
            </div>
        `
        document.getElementById('popup-modal').style.display = 'none' 
        document.getElementById('section-part-one').innerHTML = finalMessage  
    }
})
