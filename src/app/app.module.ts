import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import {FormsModule,  ReactiveFormsModule} from "@angular/forms";

import { MarkerService } from './services/marker.service';
import { PopUpService } from './services/pop-up.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [MarkerService, PopUpService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
