package com.luv2code.Full.Stack.Ecommerce.Dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.Full.Stack.Ecommerce.Entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{

	
	
}
