import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServerInfo } from '../setting/dashboard/login/server-info';
import { Server } from 'selenium-webdriver/safari';
import { DataMap } from './data-map';

@Injectable({
  providedIn: 'root'
})
export class CookieStoreService {

  private data:DataMap[]=[];

  private cookieName ='_validaiton_save_datas'

  constructor(private cookie: CookieService) {
    let exist = cookie.get(this.cookieName);
    if (exist) {
      this.data = JSON.parse(exist);
      }
  }

  private getExpiredDate(){
    let dt = new Date();
    dt.setTime(dt.getTime() + (1000 * 60 * 60 * 24 * 30));
    return dt ; 
  }
  private getDataMap(key:string){
    if(!this.data){ this.data = []; }
    return this.data.find(d => d.key == key);
  }

  private update(){
    let json = JSON.stringify(this.data);
    this.cookie.set(this.cookieName, json , this.getExpiredDate());
  }
  public setData(key:string, value:any){
    let map = this.getDataMap(key);
    if(!map){
      map = new DataMap();
      map.key = key;
      this.data.push(map);
    }

    map.value = value;

    this.update();
  }

  public getData(key:string):any{
    if(!this.data ){ return null; }
    let map = this.getDataMap(key);
    if(!map){ return null; }
    return map.value;
  }

  public setCookie(key:string, value:any){
    this.cookie.set(key, JSON.stringify(value), this.getExpiredDate());
  }
  public getCookie(key:string):any{
    let json = this.cookie.get(key);
    if(!json ){ return null; }
    return JSON.parse(json);
  }

  public getServerInfo():ServerInfo{
    return this.getData("serverInfo");
  }
  public setServerInfo(serverInfo:ServerInfo){
    return this.setData("serverInfo", serverInfo);
  }
  public loginSuccess(serverInfo:ServerInfo){
      this.cookie.set('AuthHeader',serverInfo.token, null, '/', serverInfo.baseUrl, false);
  }

  
}
