import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentInfo } from '../common/payment-info';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  private purchaseUrl  = 'http://localhost:6060/api/checkout/purchase';

  private paymentIntentUrl  = 'http://localhost:6060/api/checkout/payment-intent';


  constructor(private httpClient : HttpClient) { }

  placeOrder(purchase : Purchase) : Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl , purchase);
  }

  createPaymentIntent(paymentInfo : PaymentInfo) : Observable<any>{

    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl ,paymentInfo);
    
  }
  

  












}
