import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
  [x: string]: any;

    public customer! : Customer ;
    public shippingAddress! : Address ; 
        public billingAddress! : Address ; 
        public order! : Order ; 
        public orderItems! : OrderItem[];
  purchase: any;
    constructor(){}

        
}
