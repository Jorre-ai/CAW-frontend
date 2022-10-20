import { NgModule } from '@angular/core';


import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { LaptopsComponent } from './laptops.component';
import { LaptopRoutingModule } from './laptop-routing.module';

@NgModule({
    imports: [
        CommonModule,
        LaptopRoutingModule,
    ],
    declarations: [
        LayoutComponent,
        LaptopsComponent,
    ]
})
export class LaptopsModule{}