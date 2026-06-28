const products = [
  {
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    info: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      star: 4.5,
      count: 87,
    },
    Price: 1090,
  },
  {
    image: "images/products/intermediate-composite-basketball.jpg",
    info: "Intermediate Size Basketball",
    rating: {
      star: 4,
      count: 127,
    },
    Price: 2095,
  },
  {
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    info: " Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      star: 4.5,
      count: 56,
    },
    Price: 799,
  },
];
let productsHTML='';
products.forEach((product) => {
  productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.info}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-$stars"
              src="images/ratings/rating-${product.rating.star*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.Price/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`;
});
console.log(productsHTML);
document.querySelector('.js-products-grid').innerHTML=productsHTML;