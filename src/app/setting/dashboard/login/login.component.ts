import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ApplicationHttpClient } from '../../../util/http.client';
import { ServerInfo } from './server-info';
import { LoginInfo } from './login-info';
import { CookieStoreService } from '../../../util/cookie-store';
import { SelectItem } from '../../../../../node_modules/primeng/api';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    inputNewUrl:boolean=true;

    loginInfo: LoginInfo = new LoginInfo('', '');
    serverInfo: ServerInfo;

    urlHistory: SelectItem[];

    constructor(public http: ApplicationHttpClient, private cookieStore: CookieStoreService, private router:Router) { }

    ngOnInit() {
        this.urlHistory = this.cookieStore.getCookie('urlhistory');
        let defaultUrl = this.cookieStore.getData('defaultUrl') ;

        if (this.urlHistory && this.urlHistory.length > 0) {
            this.inputNewUrl = false;
            defaultUrl = this.urlHistory.find(url => url == defaultUrl);
            if(!defaultUrl){
                defaultUrl = this.urlHistory[0].value;
            }
        }

        this.serverInfo = this.cookieStore.getServerInfo();
        
        if (!this.serverInfo) {
            this.serverInfo = new ServerInfo(defaultUrl, null);
        } else {
            this.loginToken();
        }

        this.cookieStore.setServerInfo(this.serverInfo);
    }

    addUrlHistory(url: string) {
        if (!this.urlHistory) { this.urlHistory = []; }
        let exist = this.urlHistory.find(urlhis => urlhis.value == url);
        if (!exist) {
            this.urlHistory.push({ label: url, value: url });
        }

        this.cookieStore.setCookie('urlhistory', this.urlHistory);
    }

    loginToken() {
        this.login(true);
    }

    login(serverToken: boolean) {

        let token = serverToken ? this.serverInfo.token : this.loginInfo.token;
        if(!token ){ return; }

        this.http.post<any>("/auth", {token:token}).toPromise().then(res => {
            this.addUrlHistory(this.serverInfo.baseUrl);
            this.serverInfo.token = res.token;
            this.cookieStore.setServerInfo(this.serverInfo);
            this.cookieStore.setCookie('defaultUrl', this.serverInfo.baseUrl );
            this.router.navigate(['/list'])
        }).catch(err => {
            this.loginInfo.token = '';
            this.serverInfo.token = null;
            this.cookieStore.setServerInfo(this.serverInfo);
            if (!serverToken) {
                alert("login fail ");
            }
        });

    }


}
