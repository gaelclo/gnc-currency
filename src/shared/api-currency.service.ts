import {Injectable}   from '@angular/core';
import {Http}   from '@angular/http';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Observable} from 'rxjs';

import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class ApiCurrency {

    private url: string = 'http://api.fixer.io/';
    private urlYahoo: string = "";
    private currenciesData: string = '../../assets/currency.json'; 

    private conversions = [];

    constructor(public toastController: ToastController, private http: Http) {
        this.addConversion('GBP', 'EUR', false);
        this.addConversion('GBP', 'USD', false);
        this.addConversion('GBP', 'THB', false);
        this.addConversion('AUD', 'GBP', false);
    }

    getLastDayCurrency(currencyIn: string, currencyOut: string): Observable<any> {
        console.log('moment-1:',moment().subtract(1, 'd').format('YYYY-MM-DD'));
        return this.http.get(this.url + moment().subtract(1, 'd').format('YYYY-MM-DD') + '?base=' + currencyIn + '&symbols=' + currencyOut);
    }

    getCurrencyValue(currencyIn: string, currencyOut: string): Observable<any> {
        return this.http.get(this.url + 'latest?base=' + currencyIn + '&symbols=' + currencyOut);
    }

    getCurrencies(): Observable<any> {
        return this.http.get(this.currenciesData);
    }

    addConversion(fromCurrency: string, toCurrency: string, toast: boolean): void {
        this.getCurrencyValue(fromCurrency, toCurrency).subscribe(r1 => {
            this.getLastDayCurrency(fromCurrency, toCurrency).subscribe(r2 => {
                let rate1 = JSON.parse(r1._body).rates;
                let rate2 = JSON.parse(r2._body).rates;
                let trend = parseFloat(rate1[toCurrency]) > parseFloat(rate2[toCurrency]);
                console.log('rate1:',rate1);
                console.log('rate2:',rate2);
                console.log('p=', parseFloat(rate1[toCurrency]))
                console.log('trend:',trend);
                let previous = JSON.parse(r2._body);
                previous.rate = rate2[toCurrency];
                this.conversions.push({fromCurrency: fromCurrency, toCurrency: toCurrency, rate: rate1[toCurrency], trend: trend, 
                    previous: previous});
                if(toast) {
                    let toast = this.toastController.create({
                            message: 'Conversion added.',
                            duration: 2000,
                            position: 'bottom'
                    });
                    toast.present();
                }
            });
                
        });
    }

    getConversions(): Array<any> {
        return this.conversions;
    }

    delete(conversion: any): Array<any> {
        this.conversions.splice(this.conversions.indexOf(conversion), 1);
        let toast = this.toastController.create({
                        message: 'Conversion deleted.',
                        duration: 2000,
                        position: 'bottom'
                    });
        toast.present();
        return this.conversions;
    }
}