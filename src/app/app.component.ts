import { IConvertor } from './interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'converter';
  from: string = 'USD';
  to: string = 'UAH';
  selectList = ['UAH', 'USD', 'EUR'];
  converted: number = 1;
  result: number | string = 1;
  error = false;
  moneyData: { [value: string]: IConvertor } = {}

  constructor (private api: ApiService) {}

  ngOnInit(): void {
    this.error = true;
   this.api.getExchangeRate().pipe(take(1)).subscribe(data => {
      // 978 - EUR, 980 - UAH, 840 - USD
      this.moneyData['UAH_USD'] = data.find((item: IConvertor) => item.currencyCodeA == 840 && item.currencyCodeB == 980);
      this.moneyData['UAH_EUR'] = data.find((item: IConvertor) => item.currencyCodeA == 978 && item.currencyCodeB == 980);
      this.moneyData['EUR_USD'] = data.find((item: IConvertor) => item.currencyCodeA == 978 && item.currencyCodeB == 840); 
      this.convert();     
    });
    
    
  }

  convert() {
    this.error = false;

    if (this.from === this.to) this.result = this.converted;
    else if (this.moneyData[this.from + '_' + this.to]) {
      let temp = this.moneyData[this.to + '_' + this.from];
      this.result = this.converted / this.moneyData[this.from + '_' + this.to].rateBuy;
    }
    else if (this.moneyData[this.to + '_' + this.from]) {
      let temp = this.moneyData[this.to + '_' + this.from];
      this.result = this.converted * temp.rateBuy;
    } else {
      this.error = true;
    }


  }


}
