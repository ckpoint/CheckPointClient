import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ReqUrl } from '../domain/req-url';
import { ValidationDataComponent } from './validation-body/validation-data.component';


@Component({
  selector: 'app-url-detail',
  templateUrl: './url-detail.component.html',
  styleUrls: ['./url-detail.component.css']
})

export class UrlDetailComponent implements OnInit {

  @ViewChildren(ValidationDataComponent) validationDataComponents: QueryList<ValidationDataComponent>;

  paramTypes=['BODY' , 'QUERY_PARAM']
  reqUrl:ReqUrl;

  constructor() { }
  ngOnInit() { }

  refreshUrl(url: ReqUrl) {
    this.reqUrl = url ; 

    console.log ( this.validationDataComponents)
    this.validationDataComponents.forEach( c =>{
      c.refreshUrl(url);
    })
  }

  refresh(){
    this.reqUrl = null;
    this.validationDataComponents.forEach(c =>{
      c.refresh();
    })
  }
}
