import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReqUrl } from '../../domain/req-url';
import { ApplicationHttpClient } from '../../../util/http.client';

@Component({
  selector: 'app-download-menu',
  templateUrl: './download-menu.component.html',
  styleUrls: ['./download-menu.component.css']
})
export class DownloadMenuComponent implements OnInit {

  @Input() reqUrl:ReqUrl;
  @Input() visible:boolean;
  @Output() onHide:EventEmitter<any>=new EventEmitter<any>();

  constructor(private http:ApplicationHttpClient) { }

  ngOnInit() {
  }

  getReqUrlKey(){
    return this.reqUrl.method + '_' + this.reqUrl.url + '_';
  }

  downloadJson(){
    this.http.getBlob("/download/api/json?method="+this.reqUrl.method + "&url=" + btoa(this.reqUrl.url)).subscribe(res =>{
            this.http.fileDownload(res, this.getReqUrlKey() + 'checkpoint_export', 'json');
    })
    this.hide();
  }
  downloadExcel(){
    this.http.getBlob("/download/api/excel?method="+this.reqUrl.method + "&url=" + btoa(this.reqUrl.url)).subscribe(res =>{
            this.http.fileDownload(res, this.getReqUrlKey() +'checkpoint_export', 'xls');
    }, error => {
      if (error.status == 424) {
        alert("Not found apache POI library, must import poi to your maven or gradle dependency")
      }
    }
    )

    this.hide();
  }

  hide(){
    this.visible = false;
    this.onHide.emit();
  }

}
