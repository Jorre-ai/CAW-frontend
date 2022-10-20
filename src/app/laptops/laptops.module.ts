import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LaptopsComponent } from './laptops.component';
import { LaptopRoutingModule } from './laptop-routing.module';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        LaptopRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        LaptopsComponent,
        AddEditComponent,
    ]
})
export class LaptopsModule{}