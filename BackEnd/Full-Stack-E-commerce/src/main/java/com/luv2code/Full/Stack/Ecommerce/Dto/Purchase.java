package com.luv2code.Full.Stack.Ecommerce.Dto;

import java.util.Set;

import com.luv2code.Full.Stack.Ecommerce.Entity.Address;
import com.luv2code.Full.Stack.Ecommerce.Entity.Customer;
import com.luv2code.Full.Stack.Ecommerce.Entity.Order;
import com.luv2code.Full.Stack.Ecommerce.Entity.OrderItem;

public class Purchase {
	
	
	 private Customer customer;
	    private Address shippingAddress;
	    private Address billingAddress;
	    private Order order;
	    private Set<OrderItem> orderItems;
		public Customer getCustomer() {
			return customer;
		}
		public void setCustomer(Customer customer) {
			this.customer = customer;
		}
		public Address getShippingAddress() {
			return shippingAddress;
		}
		public void setShippingAddress(Address shippingAddress) {
			this.shippingAddress = shippingAddress;
		}
		public Address getBillingAddress() {
			return billingAddress;
		}
		public void setBillingAddress(Address billingAddress) {
			this.billingAddress = billingAddress;
		}
		public Order getOrder() {
			return order;
		}
		public void setOrder(Order order) {
			this.order = order;
		}
		public Set<OrderItem> getOrderItems() {
			return orderItems;
		}
		public void setOrderItems(Set<OrderItem> orderItems) {
			this.orderItems = orderItems;
		}
		@Override
		public String toString() {
			return "Purchase [customer=" + customer + ", shippingAddress=" + shippingAddress + ", billingAddress="
					+ billingAddress + ", order=" + order + ", orderItems=" + orderItems + "]";
		}
	    
	    
	    
	    public Purchase() {
	    	
	    }

}
