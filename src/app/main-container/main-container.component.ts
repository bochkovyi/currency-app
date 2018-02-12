import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../crypto.service';
import { CryptoItem } from '../crypto-item';
import { MatSnackBar } from '@angular/material';
import { SelectItem as MultiSelectItem } from '../multiselect/common/select-item.multiselect';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  public currencyData: CryptoItem[];
  public currencyItems: MultiSelectItem[];
  public actionsItems: MultiSelectItem[];

  public cryptoForm: FormGroup;
  public selectedActions: MultiSelectItem[] = [];

  public readyToAct: boolean = false;
  public pepeImg: string = 'assets/images/Pepe.jpg';
  public dogeImg: string = 'assets/images/Dogecoin.gif';
  public heroImage: string = this.pepeImg;

  constructor(private cryptoService: CryptoService, public snackBar: MatSnackBar) { }

  public performAction() {
    let actions = this.selectedActions.map((item: MultiSelectItem) => item.label).join(', ');

    let selected = [];
    this.cryptoForm.value.selectedCurrencies.forEach((multyItem: MultiSelectItem) => {
      this.currencyData.forEach((cryptoItem: CryptoItem) => {
        if (multyItem.value === cryptoItem.id) {
          selected.push(cryptoItem);
        }
      });
    });

    let temp = selected.map((item: CryptoItem) => `${item.name} (${item.price_usd} USD)`);
    let currencies = temp.join(', ');
    let msg = `You are performing ${actions} with ${currencies}. Good game!`;
    let dismissMsg = "Big Miner!";
    this.snackBar.open(msg, dismissMsg, { duration: 10000 });

    // Just for fun
    this.heroImage = msg.indexOf('Doge') !== -1 ? this.dogeImg : this.pepeImg;
    this.selectedActions.map((item: MultiSelectItem) => {
      if (item.label === 'Divide by zero') {
        window.document.body.innerHTML = `
          <div style="position: fixed; width: 100%; height: 100%; background: blue; color: white; z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <p style="font-size: 3rem">You divided by zero. Congratulations.</p>
          </div>`;
      }
    });
  }
  
  private setCryptoData(data: CryptoItem[]) {
    this.currencyData = data;
    this.currencyItems = this.currencyData.map((item: CryptoItem) => ({label: item.name, value: item.id}));
  }

  public startOver(templateForm) {
    this.cryptoForm.controls['selectedCurrencies'].setValue([]);
    this.selectedActions = [];
    this.heroImage = this.pepeImg;

    templateForm.reset();
    this.cryptoForm.reset();

  }

  public log(data: any) {
    console.log(JSON.stringify(data, null, 2));
  }

  ngOnInit() {
    this.cryptoService.getCryptoRates().subscribe(
      (data: CryptoItem[]) => this.setCryptoData(data),
      (error: any) => console.error(error)
    );

    this.cryptoForm = new FormGroup({
      selectedCurrencies: new FormControl([])
    });

    this.actionsItems = ['Buy', 'Sell', 'Multiply by zero', 'Divide by zero'].map(item => ({label: item, value: item}));
  }

}
