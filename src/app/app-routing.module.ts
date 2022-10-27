import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaptopComponent } from './components/laptop/laptop.component';
import { AddEditComponent } from './components/laptop/add-edit/add-edit.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { SuccesComponent } from './components/request-form/succes/succes.component';
import { StockFormComponent } from './components/stock-form/stock-form.component';
import { AuthGuard } from './_helpers/auth.guard';
import { RequestComponent } from './components/request/request.component';
import { DetailComponent } from './components/request/detail/detail.component'

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const laptopsModule = () => import('./laptops/laptops.module').then(x => x.LaptopsModule)

const routes: Routes = [

  // add your routes here
  { path: '', component: RequestFormComponent},
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },

  { path: 'stock', component: StockFormComponent},
  { path: 'request/succes', component:SuccesComponent},
  { path: 'backuplaptop', loadChildren: laptopsModule},

  // laptop routing

  { path: 'laptops', component: LaptopComponent},
  { path: 'laptops/add', component: AddEditComponent},
  { path: 'laptops/edit/:id', component: AddEditComponent},

  // request routing
  { path: 'requests', component: RequestComponent},
  { path: 'requests/detail/:id', component: DetailComponent},



  // otherwise redirect to home
  { path: '**', redirectTo: '' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
