import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SettingService } from 'src/app/setting/setting.service';
import { ReqUrl } from 'src/app/setting/domain/req-url';
import { AccordionModule, ButtonModule } from 'primeng/primeng';
import { Method } from 'src/app/setting/domain/method.enum';
import { UrlListMap } from './url-list-map';
import { CookieService } from 'ngx-cookie-service';
import { CookieStoreService } from '../../util/cookie-store';


@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {

  constructor(private cookieStore:CookieStoreService ,private settingService:SettingService) { }

  @Output() urlChanged:EventEmitter<ReqUrl>=new EventEmitter<ReqUrl>();

  urlList:ReqUrl[];
  urlListMap:UrlListMap[]=[];

  methods=[Method.FAVORITES, Method.POST, Method.GET, Method.PUT, Method.PATCH, Method.DELETE];

  saveFavorites(){
    let favorites = this.urlList.filter(url=>url.favorite);

    this.cookieStore.setData("ValidationFavorites", favorites);
    this.urlListMap.find(map=>map.method == Method.FAVORITES).urlList = favorites;

  }

  loadFavorites(){
      let favorites:ReqUrl[] = this.cookieStore.getData("ValidationFavorites")
      if(!favorites){ return; }

      favorites.forEach( favorite =>{
        let favoriteUrl = this.urlList.find( url => url.method == favorite.method && url.url == favorite.url);
        if (favoriteUrl) {
          favoriteUrl.favorite = true;
        }
      })
  }
  favoriteClick(reqUrl:ReqUrl){
    console.log(reqUrl);
    this.saveFavorites();
  }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.urlList = [];
    this.urlListMap =[];

    this.settingService.getUrlAllList().subscribe(res => {
      this.urlList = res; 
      this.initUrlList();
    } , error => {
        if (error.status == 401) {
          this.cookieStore.setServerInfo(null);
          window.location.reload();
        }
      } 
    );
  }
  initUrlList(){
    this.urlListMap =[];
    this.loadFavorites();
    this.methods.forEach( m =>{
      this.urlListMap.push(new UrlListMap(m, this.urlList))
    })
  }

  selectUrl(url:ReqUrl){
    this.urlChanged.emit(url);
    this.urlList.forEach( u =>{
      u.select = false;
    })

    url.select = true;
  }

}
