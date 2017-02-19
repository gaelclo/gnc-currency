import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApiCurrency} from '../../shared/api-currency.service';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  private currencies: any;
  private fromCurrency: string;
  private toCurrency: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiCurrency: ApiCurrency) {}

  ionViewDidLoad() {
    this.apiCurrency.getCurrencies().subscribe(result => {
      this.currencies = JSON.parse(result._body);
    });
  }

  add(): void {
    if(this.fromCurrency && this.toCurrency) this.apiCurrency.addConversion(this.fromCurrency, this.toCurrency);
    this.fromCurrency = "";
    this.toCurrency = ""; 
    this.navCtrl.setPages([HomePage]);
   }
}
