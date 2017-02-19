import {Injectable}   from '@angular/core';
import {Http}   from '@angular/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class ApiCurrency {

    private url: string = 'http://api.fixer.io/';
    private currenciesData: string = '../assets/currency.json'; 

    private conversions = [];

    constructor(private http: Http) {}

    getCurrencyValue(currencyIn: string, currencyOut: string): Observable<any> {
        return this.http.get(this.url + 'latest?base=' + currencyIn + '&symbols=' + currencyOut);
    }

    getCurrencies(): Observable<any> {
        return this.http.get(this.currenciesData);
    }

    addConversion(fromCurrency: string, toCurrency: string) {
        this.getCurrencyValue(fromCurrency, toCurrency).subscribe(result => {
            let rate = JSON.parse(result._body).rates;
            console.log('out:', rate);
            this.conversions.push({fromCurrency: fromCurrency, toCurrency: toCurrency, rate: rate[toCurrency]});
        });
    }

    getConversions(): Array<any> {
        return this.conversions;
    }
}