import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LaptopsComponent } from './laptops.component';
import { AddEditComponent } from './add-edit.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: LaptopsComponent},
      { path: 'add', component: AddEditComponent},
      { path: 'edit/:id', component: AddEditComponent}

    ]
    
  }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LaptopRoutingModule { }
