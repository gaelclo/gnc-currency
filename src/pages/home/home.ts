import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ApiCurrency} from '../../shared/api-currency.service';

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
    // TODO
  }
}
