import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import { CookieService } from 'ngx-cookie-service';
import { CookieStoreService } from './cookie-store';



export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: true;
    body?: any;
}


@Injectable()
export class ApplicationHttpClient {


    private getDefaultHeaders(headers:HttpHeaders, method: string, file?:boolean): HttpHeaders{
        let serverInfo = this.cookieStore.getServerInfo();

        if( !headers){ headers  = new HttpHeaders(); }

        if (serverInfo && serverInfo.token) {
            headers = headers.append('Authorization', serverInfo.token);
        }
        if (method != 'GET') {
            headers = headers.append('Content-Type', file ? 'multipart/form-data':'application/json');
        }
        return headers;
    }

    private getDefaultIOptions(option:IRequestOptions, method: string, file?:boolean): IRequestOptions{
        let opt  = option;
        if ( !opt){ opt = {}; }
        opt.headers = this.getDefaultHeaders(opt.headers, method, file);
        return opt;
    }

    private prefix = '/setting';

    public getUrl(endPoint:string):string{
        
        let serverInfo = this.cookieStore.getData("serverInfo");
        let url = '';
        if ( serverInfo && serverInfo.baseUrl){
            url += serverInfo.baseUrl;
        }
        if ( this.prefix){
           url +=this.prefix 
        }
        return url += endPoint;
    }

    // Extending the HttpClient through the Angular DI.
    public constructor(public http: HttpClient, private cookieStore:CookieStoreService) {

    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.get<T>(this.getUrl(endPoint), this.getDefaultIOptions(options,"GET"));
    }

    public getBlob(endPoint: string, options?: any):Observable<HttpResponse<Blob>> {
        return this.http.get(this.getUrl(endPoint), {responseType:'blob', observe:'response', headers:this.getDefaultHeaders(null, "GET")});
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.post<T>(this.getUrl(endPoint), params, this.getDefaultIOptions(options, "POST"));
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<T> {
        return this.http.put<T>(this.getUrl(endPoint), params, this.getDefaultIOptions(options,"PUT"));
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
        return this.http.delete<T>(this.getUrl(endPoint), this.getDefaultIOptions(options,"DELETE"));
    }



    fileDownload(res: any, filename: string, type: string) {
        var url = window.URL.createObjectURL(res.body);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = filename + '.' + type;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    }
}
