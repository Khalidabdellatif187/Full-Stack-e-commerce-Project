import { CartItem } from "./cart-item";

export class OrderItem {
    public imageUrl : string;
    public unitPrice : number
    public quantity : number
    public productId : string


    constructor( public cartItem : CartItem){
        this.imageUrl = cartItem.imageUrl;
        this.unitPrice = cartItem.unitPrice;
        this.quantity = cartItem.unitPrice;
        this.productId = cartItem.id;

    }

}
