import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CookieStoreService } from '../../../util/cookie-store';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Input() visible: boolean;
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();

  importMenuView:boolean=false;

  constructor(public http: ApplicationHttpClient , private cookieStore:CookieStoreService) {
  }

  ngOnInit() {
  }

  refreshClick(){
    this.refresh.emit();
    this.hide();
  }

  getServerUrl() {
    let serverInfo = this.cookieStore.getServerInfo();
    if(!serverInfo ){
      return "";
    }
    return serverInfo.baseUrl;
  }

  selectLogout() {
    this.hide();
    this.logout.emit();
  }
  downloadJson() {
    this.http.getBlob("/download/api/json/all").subscribe(res =>{
            this.http.fileDownload(res, 'checkpoint_export', 'json');
    })
    this.hide();
  }
  downloadExcel() {
    this.http.getBlob("/download/api/excel/all").subscribe(res =>{
            this.http.fileDownload(res, 'checkpoint_export', 'xls');
    }, error => {
      if (error.status == 424) {
        alert("Not found apache POI library, must import poi to your maven or gradle dependency")
      }
    })
    this.hide();
  }

  importJson(){
    this.importMenuView = true;
  }
  hide() {
    this.visible = false;
    this.onHide.emit();
  }
}
