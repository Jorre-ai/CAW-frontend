import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './_components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { SuccesComponent } from './components/request-form/succes/succes.component';
import { AddEditComponent } from './components/laptop/add-edit/add-edit.component';
import { RequestComponent } from './components/request/request.component';
import { DetailComponent } from './components/request/detail/detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    RequestFormComponent,
    StockFormComponent,
    LaptopComponent,
    SuccesComponent,
    AddEditComponent,
    RequestComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,

    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonToggleModule,
    FontAwesomeModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
