import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SettingModule } from 'src/app/setting/setting.module';
import { AppRoutingModule } from 'src/app/app.routes';
import { ApplicationHttpClient } from 'src/app/util/http.client';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SettingModule,
  ],
  providers: [ApplicationHttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
