import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Caw } from 'src/app/_models/caw';
import { first, map } from 'rxjs';

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
    this.restApi.getCaws().pipe(map(caws => {
      this.allCaws = caws
      this.allCaws.sort((a, b) => {
        let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
        if (fa < fb){
          return -1
        }
        if (fa > fb){
          return 1
        }
        return 0
      })
    })).subscribe()
    this.restApi.getCaws().pipe(first()).subscribe(data => console.log(data))
  }

  onDeleteCaw(id: number){
    this.restApi.deleteCaw(id).subscribe((response) =>{
      console.log(response);
      this.ngOnInit();
    })
  }



}
