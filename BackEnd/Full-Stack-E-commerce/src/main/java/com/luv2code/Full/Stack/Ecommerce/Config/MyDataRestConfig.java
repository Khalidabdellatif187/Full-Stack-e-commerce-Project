package com.luv2code.Full.Stack.Ecommerce.Config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.luv2code.Full.Stack.Ecommerce.Entity.Country;
import com.luv2code.Full.Stack.Ecommerce.Entity.Product;
import com.luv2code.Full.Stack.Ecommerce.Entity.ProductCategory;
import com.luv2code.Full.Stack.Ecommerce.Entity.State;


@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	
	private EntityManager  entitymanager;
	
	
	@Autowired
	 public MyDataRestConfig(EntityManager entitymanager) {
		
		this.entitymanager = entitymanager;
	}



	@Override
	    public void configureRepositoryRestConfiguration( RepositoryRestConfiguration config, CorsRegistry cors) {

	        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

	        // disable HTTP methods for Product: PUT, POST, DELETE and PATCH
	      
	        // disable HTTP methods for ProductCategory: PUT, POST, DELETE and PATCH
	        HttpMethod(ProductCategory.class , config, theUnsupportedActions);
	        HttpMethod(Product.class , config, theUnsupportedActions);
	        HttpMethod(Country.class , config, theUnsupportedActions);
	        HttpMethod(State.class , config, theUnsupportedActions);
	        
	        
	        
	        
	        
	        exposeIds(config);

	    }



	private void HttpMethod(Class theclass , RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
		config.getExposureConfiguration()
		        .forDomainType(theclass)
		        .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
		        .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}



	 private void exposeIds(RepositoryRestConfiguration config) {

	        // expose entity ids
	        //

	        // - get a list of all entity classes from the entity manager
	        Set<EntityType<?>> entities = entitymanager.getMetamodel().getEntities();

	        // - create an array of the entity types
	        List<Class> entityClasses = new ArrayList<>();

	        // - get the entity types for the entities
	        for (EntityType tempEntityType : entities) {
	            entityClasses.add(tempEntityType.getJavaType());
	        }

	        // - expose the entity ids for the array of entity/domain types
	        Class[] domainTypes = entityClasses.toArray(new Class[0]);
	        config.exposeIdsFor(domainTypes);
	    }




	



	
	



	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
