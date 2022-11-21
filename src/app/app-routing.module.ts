import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaptopComponent } from './components/laptop/laptop.component';
import { LaptopAddEditComponent } from './components/laptop/laptop-add-edit/laptop-add-edit.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { SuccesComponent } from './components/request-form/succes/succes.component';
import { RequestComponent } from './components/request/request.component';
import { DetailComponent } from './components/request/detail/detail.component'
import { CawComponent } from './components/caw/caw.component';
import { RequestAddEditComponent } from './components/request/request-add-edit/request-add-edit.component';
import { CawAddEditComponent } from './components/caw/caw-add-edit/caw-add-edit.component';
import { CawDetailComponent } from './components/caw/caw-detail/caw-detail.component';



const routes: Routes = [

  // add your routes here
  { path: '', component: RequestFormComponent},
  { path: 'request/succes', component: SuccesComponent},

  // laptop routing

  { path: 'laptops', component: LaptopComponent},
  { path: 'laptops/add', component: LaptopAddEditComponent},
  { path: 'laptops/edit/:id', component: LaptopAddEditComponent},

  // request routing
  { path: 'requests', component: RequestComponent},
  { path: 'requests/add', component: RequestAddEditComponent},
  { path: 'requests/detail/:id', component: DetailComponent},
  { path: 'requests/edit/:id', component: RequestAddEditComponent},

  // caw routing
  { path: 'caw', component: CawComponent},
  { path: 'caw/add', component: CawAddEditComponent},
  { path: 'caw/detail/:id', component: CawDetailComponent},
  { path: 'caw/edit/:id', component: CawAddEditComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
