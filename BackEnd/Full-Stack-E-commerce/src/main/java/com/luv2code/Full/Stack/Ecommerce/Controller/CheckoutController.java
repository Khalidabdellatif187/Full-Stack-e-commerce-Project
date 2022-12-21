package com.luv2code.Full.Stack.Ecommerce.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.Full.Stack.Ecommerce.Dto.PaymentInfo;
import com.luv2code.Full.Stack.Ecommerce.Dto.Purchase;
import com.luv2code.Full.Stack.Ecommerce.Dto.PurchaseResponse;
import com.luv2code.Full.Stack.Ecommerce.Service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
	
	
	private CheckoutService checkoutService;

	@Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
    
    
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentinfo) throws StripeException{
    	
    	
    	PaymentIntent paymentintent = checkoutService.createPaymentIntent(paymentinfo);
    	
    	String payments = paymentintent.toJson();
    	
    	return new ResponseEntity<>(payments , HttpStatus.OK);
    	
    	
    }
    
    
    
    
    
    
    
    


}
