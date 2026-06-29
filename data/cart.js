export const cart=[];

export function addTocart(productId){
    let matchingItem;
      cart.forEach((item)=>{
        if(productId===item.productId){
          matchingItem=item
          }
      });
      if(matchingItem){
        matchingItem.quantity++;
      }else{

        cart.push({
          productId:productId,
          quantity:1
        });
      }
}