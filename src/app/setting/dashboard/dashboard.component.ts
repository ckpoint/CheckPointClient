import { Component, OnInit, ViewChild } from '@angular/core';
import { ReqUrl } from 'src/app/setting/domain/req-url';
import { UrlDetailComponent } from 'src/app/setting/url-detail/url-detail.component';
import { ApplicationHttpClient } from '../../util/http.client';
import { UrlListComponent } from '../url-list/url-list.component';
import { CookieStoreService } from '../../util/cookie-store';
import { ServerInfo } from './login/server-info';
import { Router } from '../../../../node_modules/@angular/router';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectUrl:ReqUrl=new ReqUrl();
  menuView:boolean=false;
  scanMenuView:boolean=false;
  tabSize:number=1;
  

  @ViewChild(UrlDetailComponent) UrlDetailComponent:UrlDetailComponent;
  @ViewChild(UrlListComponent) UrlListComponent:UrlListComponent;

  constructor(private settingService:SettingService, private cookieStore:CookieStoreService, private router:Router){ }

  ngOnInit() {
      let serverInfo = this.cookieStore.getServerInfo();
      if(!serverInfo || !serverInfo.token){ this.logout(); return; }
      this.tabSize = this.cookieStore.getData('tabSize');
      if(this.tabSize < 1){ this.tabSize = 2; }
  }


  getUiClassName(size:number){
    return "ui-g-"+size;
  }
  updateTabSize(plus:number){
    this.tabSize+= plus;
    if(this.tabSize < 1 ){
        this.tabSize = 1 ;
    }
    else if(this.tabSize > 4){
        this.tabSize = 4;
    }
    this.cookieStore.setData('tabSize', this.tabSize);
  }

  openMenu(){
    this.menuView = true;
  }
  openScanMenu(){
    this.scanMenuView = true;
  }

  getBaseUrl(){
    let serverinfo = this.cookieStore.getServerInfo();

    if(!serverinfo ){ return '' }
    return serverinfo.baseUrl;
  }

  logout(){
    let serverInfo:ServerInfo = this.cookieStore.getServerInfo();
    if(serverInfo){ serverInfo.token = null; }

    this.cookieStore.setServerInfo(serverInfo)
    this.router.navigate(['']);
  }

  clean(){
    if (confirm("are you delete all data?")) {
        this.settingService.cleanAll().subscribe(res =>{
            this.cookieStore.setData('ValidationFavorites', '');
            this.refresh();
        })
    }
  }

  refresh() {
    this.UrlListComponent.refresh();
    this.UrlDetailComponent.refresh();
  }


  urlChange(url: ReqUrl) {
    if (!url) {
      this.UrlDetailComponent.refresh();
    }
    else {
      this.UrlDetailComponent.refreshUrl(url);
    }
    window.scroll(0,0)
  }
}

