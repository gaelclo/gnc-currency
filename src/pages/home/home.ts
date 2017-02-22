import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ApiCurrency} from '../../shared/api-currency.service';

function parseExchangeRate(data): void {
    var name = data.query.results.row.name;
    var rate = parseFloat(data.query.results.row.rate);
    console.log("Exchange rate " + name + " is " + rate);
  }
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private conversions: any;

  constructor(public navCtrl: NavController, private apiCurrency: ApiCurrency) {}

  ionViewWillEnter(): any {
    this.conversions = this.apiCurrency.getConversions();
  }

  hasConversion(): boolean {
    return this.conversions && this.conversions.length > 0;
  }

  logDrag(event: any): void {
    console.log('event drag', event);
  }

  delete(c: any): void {
    this.conversions = this.apiCurrency.delete(c);
  }

  more(c: any): void {
    console.log('v=', c);
    if(c.show) {
      c.show = false;
    }
    else {
      c.show = true;
    }
  }
}
