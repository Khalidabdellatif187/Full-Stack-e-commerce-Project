package com.luv2code.Full.Stack.Ecommerce.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.luv2code.Full.Stack.Ecommerce.Dao.CustomerRepository;
import com.luv2code.Full.Stack.Ecommerce.Dto.PaymentInfo;
import com.luv2code.Full.Stack.Ecommerce.Dto.Purchase;
import com.luv2code.Full.Stack.Ecommerce.Dto.PurchaseResponse;
import com.luv2code.Full.Stack.Ecommerce.Entity.Customer;
import com.luv2code.Full.Stack.Ecommerce.Entity.Order;
import com.luv2code.Full.Stack.Ecommerce.Entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;


@Service
public class CheckoutServiceImpl implements CheckoutService{
	
	 private CustomerRepository customerRepository;

	    @Autowired
	    public CheckoutServiceImpl(CustomerRepository customerRepository,@Value("${stripe.key.secret}") String secretKey) {
	        this.customerRepository = customerRepository;
	        
	        Stripe.apiKey = secretKey;
	    }

	   

	    private String generateOrderTrackingNumber() {

	        // generate a random UUID number (UUID version-4)
	        // For details see: https://en.wikipedia.org/wiki/Universally_unique_identifier
	        //
	        return UUID.randomUUID().toString();
	    }



		@Override
		@Transactional
		public PurchaseResponse placeOrder(Purchase purchase) {
			 // retrieve the order info from dto
	        Order order = purchase.getOrder();

	        // generate tracking number
	        String orderTrackingNumber = generateOrderTrackingNumber();
	        order.setOrderTrackingNumber(orderTrackingNumber);

	        // populate order with orderItems
	        Set<OrderItem> orderItems = purchase.getOrderItems();
	        orderItems.forEach(item -> order.add(item));

	        // populate order with billingAddress and shippingAddress
	        order.setBillingAddress(purchase.getBillingAddress());
	        order.setShippingAddress(purchase.getShippingAddress());

	        // populate customer with order
	        Customer customer = purchase.getCustomer();
	        customer.add(order);

	        // save to the database
	        customerRepository.save(customer);

	        // return a response
	        return new PurchaseResponse(orderTrackingNumber);
		}



		@Override
		public PaymentIntent createPaymentIntent(PaymentInfo paymentinfo) throws StripeException {
			
			List<String> paymentMethodTypes = new ArrayList<>();
			
			paymentMethodTypes.add("card");
			
			Map<String , Object> params = new HashMap<>();
			
			params.put("amount", paymentinfo.getAmount());
			
			params.put("currency", paymentinfo.getCurrency());
			
			params.put("payment_method_types", paymentMethodTypes);
			params.put("description", "Luv2shop purchase");
			
			params.put("receipt-email", paymentinfo.getRecieptEmail());
			
			return PaymentIntent.create(params);
		}

}
