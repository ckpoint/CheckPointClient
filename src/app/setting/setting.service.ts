import { Injectable } from '@angular/core';
import { ApplicationHttpClient } from 'src/app/util/http.client';
import { Observable } from 'rxjs/internal/Observable';
import { ReqUrl } from 'src/app/setting/domain/req-url';
import { ValidationData } from 'src/app/setting/domain/validation-data';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:ApplicationHttpClient) { }

  public delete(reqUrl:ReqUrl){
    return this.http.delete("/delete/url", {body:reqUrl})
  }
  public deleteAll(validationDatas:ValidationData[]){
    return this.http.delete("/delete/param/from/url", {body:validationDatas})
  }
  public cleanAll(){
    return this.http.delete("/delete/all");
  }

  public getUrlAllList():Observable<ReqUrl[]>{
    return this.http.get<ReqUrl[]>("/url/list/all");
  }
  
  public getValidationDataList(paramType:string, url:ReqUrl):Observable<ValidationData[]>{
    let params = new HttpParams();
    params = params.append("paramType", paramType);
    params = params.append("url", String(url.url));
    params = params.append("method", String(url.method));

    return this.http.get<ValidationData[]>("/param/from/url", {params:params});
  }

  public updateValidationDataList(params:ValidationData[] ):Observable<ValidationData[]>{
    return this.http.post<ValidationData[]>("/update/param/from/url", params);
  }
}
