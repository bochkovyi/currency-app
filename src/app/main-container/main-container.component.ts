import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { CryptoItem } from '../crypto-item';
import { MatSnackBar } from '@angular/material';
import { SelectItem as MultiSelectItem } from '../multiselect/common/select-item.multiselect';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  public currencyData: CryptoItem[];
  public currencyItems: MultiSelectItem[];
  public actionsItems: MultiSelectItem[];

  private selectedCurrencies: CryptoItem[];
  private selectedActions: string[];

  public readyToAct: boolean = false;
  public pepeImg: string = 'assets/images/Pepe.jpg';
  public dogeImg: string = 'assets/images/Dogecoin.gif';
  public heroImage: string = this.pepeImg;

  constructor(private cryptoService: CryptoService, public snackBar: MatSnackBar) { }

  public currenciesSelected(items: MultiSelectItem[]) {
    let selected = [];
    items.forEach((multyItem: MultiSelectItem) => {
      this.currencyData.forEach((cryptoItem: CryptoItem) => {
        if (multyItem.value === cryptoItem.id) {
          selected.push(cryptoItem);
        }
      });
    });
    this.selectedCurrencies = selected;
    this.setReadyToAct();
  }

  public actionsSelected(items: MultiSelectItem[]) {
    this.selectedActions = items.map((item: MultiSelectItem) => item.label);
    this.setReadyToAct();
  }

  public performAction() {
    console.log(this.selectedCurrencies, this.selectedActions);
    let actions = this.selectedActions.join(', ');
    let temp = this.selectedCurrencies.map((item: CryptoItem) => `${item.name} (${item.price_usd} USD)`);
    let currencies = temp.join(', ');

    let msg = `You are performing ${actions} with ${currencies}. Good game!`;

    // Change image
    this.heroImage = msg.indexOf('Doge') !== -1 ? this.dogeImg : this.pepeImg;

    let dismissMsg = "Big Miner!";
    this.snackBar.open(msg, dismissMsg, { duration: 10000 });
  }

  private setCryptoData(data: CryptoItem[]) {
    this.currencyData = data;
    this.currencyItems = this.currencyData.map((item: CryptoItem) => ({label: item.name, value: item.id}));
  }

  public startOver() {

  }

  private setReadyToAct() {
    let isReadyToAct = this.selectedCurrencies && this.selectedActions && this.selectedCurrencies.length > 0 && this.selectedActions.length > 0;
    this.readyToAct = isReadyToAct ? true : false;
  }

  ngOnInit() {
    this.cryptoService.getCryptoRates().subscribe(
      (data: CryptoItem[]) => this.setCryptoData(data),
      (error: any) => console.error(error)
    );

    this.actionsItems = ['Buy', 'Sell', 'Multiply by zero', 'Divide by zero'].map(item => ({label: item, value: item}));
  }

}
