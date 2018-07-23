import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ValidationData } from '../../../domain/validation-data';
import { StrObj } from '../../../domain/str-obj';
import { ArrayUtil } from '../../../../util/array.util';

@Component({
  selector: 'app-list-input-box',
  templateUrl: './list-input-box.component.html',
  styleUrls: ['./list-input-box.component.css']

})
export class ListInputBoxComponent implements OnInit {

  @Input() strs:StrObj[];
  @Output() update:EventEmitter <string[]>=new EventEmitter<string[]>();


  constructor() { }

  ngOnInit() {
  }

  plus(){
    ArrayUtil.push(this.strs, new StrObj(''));
  }
  minus(str:StrObj){
    if(this.strs.length < 2){
      this.strs[0].value = '';
      return;
    }
    ArrayUtil.remove(this.strs, str);
    this.changed();
  }
  changed(){
    this.update.emit(this.strs.filter(str=>str.value).map(str =>str.value));
  }

}
