import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';
import { CookieStoreService } from '../../../util/cookie-store';

@Component({
  selector: 'app-import-menu',
  templateUrl: './import-menu.component.html',
  styleUrls: ['./import-menu.component.css']
})
export class ImportMenuComponent implements OnInit {

  constructor(private http :ApplicationHttpClient, private cookieStore:CookieStoreService) { }

  @Input() visible: boolean;
  @Output() refresh: EventEmitter<any> = new EventEmitter<any>();
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
  }
  getUploadUrl(){
    let url = this.http.getUrl("/upload/json");
    url += '?token=' + this.cookieStore.getServerInfo().token;
    return url;
  }
  hide() {
    this.visible = false;
    this.onHide.emit();
  }
  uploadCompleted(){
    alert("import completed!")
    this.refresh.emit();
    this.hide();
  }

}
