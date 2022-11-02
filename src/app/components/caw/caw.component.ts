import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Caw } from 'src/app/_models/caw';
import { first } from 'rxjs';

@Component({
  selector: 'app-caw',
  templateUrl: './caw.component.html',
  styleUrls: ['./caw.component.css']
})
export class CawComponent implements OnInit {
  allCaws: Caw[] = [];

  constructor(public restApi: ApiconfigService) { 
  }



  ngOnInit(): void {
    this.restApi.getCaws().pipe(first()).subscribe((caws) => (this.allCaws = caws))
    this.restApi.getCaws().pipe(first()).subscribe(data => console.log(data))
  }



}
