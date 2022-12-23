import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = 'http://localhost:6060/api/countries'
  private stateUrl = 'http://localhost:6060/api/states'

  constructor(private httpClient : HttpClient) { }


   getCountries () : Observable<Country []>{
    return this.httpClient.get<GetResponse>(this.countriesUrl).pipe(
      map( response => response._embedded.countries)
    );
   }


   getStates(theCountryCode : string) : Observable<State []> {
            
    const searchUrl = `${this.stateUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetStates>(searchUrl).pipe(
      map(response => response._embedded.states)
    );
   }







  getCreditCardMonth(startMonth : number) : Observable<number []> {
       
     let data : number [] = [];

     for (let month = startMonth ; month <= 12 ; month++ ){
            
        data.push(month);
     }

     return of(data);


  }

  getCreditCardYears() : Observable<number []> {
    
    let data : number [] = [];

    const startYear : number = new Date().getFullYear();
    const lastyear : number = startYear + 10;

    for(let year = startYear ; year <= lastyear ; year++){
      data.push(year);
    }

    return of (data);

  }



}


interface GetResponse {
  _embedded : {
    countries : Country [];
  }
}

interface GetStates {
  _embedded : {
    states : State []
  }
}
