import { ReqUrl } from "../domain/req-url";

export class UrlListMap {
    method:string;
    urlList:ReqUrl[];

    public constructor(m:string, l:ReqUrl[]){
        this.method = m;
        if(this.method.toLowerCase() == 'favorites'){
            this.urlList = l.filter(u => u.favorite);
        }
        else {
            this.urlList = l.filter(u => u.method == this.method);
        }
    }
}
