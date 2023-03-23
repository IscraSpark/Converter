import { Component, Input } from '@angular/core';

import { moneyTypeEnum } from './../enums/enums';

@Component({
  selector: 'app-convertor',
  templateUrl: './convertor.component.html',
  styleUrls: ['./convertor.component.scss']
})
export class ConvertorComponent {
  @Input() moneyData: { [value: string]: number } = {};
  @Input() result!: number | string;

  from: string = 'USD';
  to: string = 'UAH';
  selectList = ['UAH', 'USD', 'EUR'];
  converted: number = 1;
  error = false;

  convert() {
    this.error = false;

    if (this.from === this.to) this.result = this.converted;
    else if (this.moneyData[moneyTypeEnum[this.from as keyof typeof moneyTypeEnum] + '_' + moneyTypeEnum[this.to as keyof typeof moneyTypeEnum]]) {
      this.result = this.converted * this.moneyData[moneyTypeEnum[this.from as keyof typeof moneyTypeEnum] + '_' + moneyTypeEnum[this.to as keyof typeof moneyTypeEnum]];
    }
    else {
      this.error = true;
    }


  }

  selectedChange(event: any, type: string) {
    switch (type) {
      case 'from': 
        this.from = event;
        break;
      case 'to':
        this.to = event;
        break;
    }
    
  }



}
