import { cart, removecart, addTocart, updateQuantity } from '../data/cart.js';
import { products } from "../data/products.js";
import { formatcuurancy } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { delivaryoption } from '../data/delivaryoptions.js';

const today = dayjs();
const todays=today.format('dddd, MMMM D ');
const delivarydate = today.add(7, 'days');
let cartSummeryHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  cartSummeryHTML +=
    ` <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Today date: ${todays}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatcuurancy(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-link"
                      data-product-id="${matchingProduct.id}">Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${delivaryOption(matchingProduct,cartItem)}
              </div>
            </div>
          </div>`;
});
function delivaryOption(matchingProduct,cartItem) {
  let html = '';
  delivaryoption.forEach((delivary) => {
    const today = dayjs();
    const delivarydate = today.add(delivary.delivarydate, 'days');
    const daystring = delivarydate.format('dddd, MMMM D');
    const dayprice = daystring === 0 ? "FREE" : `${formatcuurancy(delivary.priceCents)}-`;
    const ischecked = delivaryOption.id === cartItem.delivaryOptionId
    html +=
      `<div class="delivery-options">
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${daystring}
                    </div>
                    <div class="delivery-option-price">
                      $${dayprice} Shipping
                    </div>
                  </div>
                </div>
        </div>`;
  });
  return html;
}
document.querySelector('.js-cart-summart').innerHTML = cartSummeryHTML;
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removecart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
});
const updates = document.querySelectorAll('.js-update-link');
updates.innerHTML = '<input type="number" ><button>Save</button>';
updates.forEach((link) => {
  link.addEventListener('click', () => {
    const update = link.dataset.productId;
    const container = document.querySelector(
      `.js-cart-item-container-${update}`
    );
    container.classList.add('is-editing-quantity');
  });
});
document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId, newQuantity);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
    });
  });
