export let cart=JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart=[{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  delivaryoptionId:'1'
},{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  delivaryoptionId:'2'
}];
}

 export function saveTocart(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addTocart(productId){
    let matchingItem;
      cart.forEach((cartItem)=>{
        if(productId===cartItem.productId){
          matchingItem=cartItem;
          }
      });
      if(matchingItem){
        matchingItem.quantity++;
      }else{

        cart.push({
          productId:productId,
          quantity:1,
          delivaryoptionID:'2'
        });
      }
      saveTocart();
}
export function removecart(productId){
  const newCart=[];
  cart.forEach((cartItem) =>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart=newCart;
  saveTocart();
}
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveTocart();
}