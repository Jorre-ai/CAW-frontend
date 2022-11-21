import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './_components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { SuccesComponent } from './components/request-form/succes/succes.component';
import { LaptopAddEditComponent } from './components/laptop/laptop-add-edit/laptop-add-edit.component';
import { RequestComponent } from './components/request/request.component';
import { DetailComponent } from './components/request/detail/detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CawComponent } from './components/caw/caw.component';
import { RequestAddEditComponent } from './components/request/request-add-edit/request-add-edit.component';
import { CawAddEditComponent } from './components/caw/caw-add-edit/caw-add-edit.component';
import { CawDetailComponent } from './components/caw/caw-detail/caw-detail.component';
import { ApprovedRequestsComponent } from './components/request/approved-requests/approved-requests.component';



@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    RequestFormComponent,
    LaptopComponent,
    SuccesComponent,
    LaptopAddEditComponent,
    RequestComponent,
    DetailComponent,
    CawComponent,
    RequestAddEditComponent,
    CawAddEditComponent,
    CawDetailComponent,
    ApprovedRequestsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
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
