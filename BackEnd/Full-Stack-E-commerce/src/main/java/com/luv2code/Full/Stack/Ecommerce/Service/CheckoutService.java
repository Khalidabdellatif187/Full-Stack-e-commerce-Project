package com.luv2code.Full.Stack.Ecommerce.Service;

import com.luv2code.Full.Stack.Ecommerce.Dto.PaymentInfo;
import com.luv2code.Full.Stack.Ecommerce.Dto.Purchase;
import com.luv2code.Full.Stack.Ecommerce.Dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {

	public PurchaseResponse placeOrder(Purchase purchase);
	
	public PaymentIntent createPaymentIntent(PaymentInfo paymentinfo) throws StripeException;
}
