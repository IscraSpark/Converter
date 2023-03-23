import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {
  @Input() label: string = '';
  @Input() selectList: string[] = [];
  @Input() startValue: string = '';
  @Output() selectedEmiter = new EventEmitter<string>();
  
  value: string ='';
  
  formCntrol = new FormControl()

  ngOnInit(): void {
    this.value = this.startValue;
  }

  onChange(event: string) {
    this.selectedEmiter.emit(event);
  }




}
