import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';

@Component({
  selector: 'app-scan-menu',
  templateUrl: './scan-menu.component.html',
  styleUrls: ['./scan-menu.component.css']
})
export class ScanMenuComponent implements OnInit {

  @Input() visible: boolean;
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  maxDeepLevel:number = 5;
  ing:boolean=false;

  constructor(private http:ApplicationHttpClient) {
    
  }

  ngOnInit() {
  }

  scan(){
    this.ing = true;
    this.http.get("/scan/" + this.maxDeepLevel).subscribe( res =>{
      this.complete();
    })
  }

  complete(){
    alert("Scan Complete!!")
    this.refresh.emit();
    this.hide();
  }

  hide() {
    this.ing = false;
    this.visible = false;
    this.onHide.emit();
  }

}
