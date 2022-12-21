package com.luv2code.Full.Stack.Ecommerce.Dto;

public class PaymentInfo {
	
	private int amount;
	
	private String currency;
	
	
	private String RecieptEmail;
	
	
	

	public String getRecieptEmail() {
		return RecieptEmail;
	}

	public void setRecieptEmail(String recieptEmail) {
		RecieptEmail = recieptEmail;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	

	
	
	
	@Override
	public String toString() {
		return "PaymentInfo [amount=" + amount + ", currency=" + currency + ", RecieptEmail=" + RecieptEmail + "]";
	}

	public PaymentInfo(int amount, String currency, String recieptEmail) {
		super();
		this.amount = amount;
		this.currency = currency;
		RecieptEmail = recieptEmail;
	}

	public PaymentInfo() {
		
	}

}
