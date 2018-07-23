import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UrlListComponent } from './url-list/url-list.component';
import { SettingRoutingModule } from 'src/app/setting/setting.routes';
import { ApplicationHttpClient } from 'src/app/util/http.client';
import { AccordionModule, ButtonModule, DropdownModule, DialogModule, FileUploadModule } from 'primeng/primeng';
import {TreeTableModule} from 'primeng/treetable';
import {CheckboxModule} from 'primeng/checkbox';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UrlDetailComponent } from './url-detail/url-detail.component';
import { ValidationDataComponent } from './url-detail/validation-body/validation-data.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './dashboard/login/login.component';
import { UrlItemComponent } from './url-list/url-item/url-item.component';
import { ListInputBoxComponent } from './url-detail/validation-body/list-input-box/list-input-box.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { DownloadMenuComponent } from './menu/download-menu/download-menu.component';
import { ImportMenuComponent } from './menu/import-menu/import-menu.component';
import { CookieStoreService } from '../util/cookie-store';
import { ScanMenuComponent } from './menu/scan-menu/scan-menu.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingRoutingModule,
    AccordionModule, ButtonModule, TreeTableModule ,CheckboxModule,DropdownModule,DialogModule,FileUploadModule
  ],
  declarations: [UrlListComponent, DashboardComponent, UrlDetailComponent, ValidationDataComponent
    ,LoginComponent, UrlItemComponent, ListInputBoxComponent, MainMenuComponent, DownloadMenuComponent, ImportMenuComponent, ScanMenuComponent ],
  providers:[
    ApplicationHttpClient,CookieService,CookieStoreService
  ]
})
export class SettingModule { }
