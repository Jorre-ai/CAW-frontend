import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Laptop } from 'src/app/_models/laptop';

@Component({
  selector: 'app-linked-laptops',
  templateUrl: './linked-laptops.component.html',
  styleUrls: ['./linked-laptops.component.css']
})
export class LinkedLaptopsComponent implements OnInit {
  allLaptops: Laptop[] = [];
  linkedLaptops: Laptop[] = [];

  constructor(public restApi: ApiconfigService) { }

  ngOnInit(): void {
    this.restApi.getLaptops()
    .pipe(map(laptops => {
      this.linkedLaptops.splice(0, this.linkedLaptops.length)
      for (let index in laptops){
        if(laptops[index].status == "away"){
          this.linkedLaptops.push(laptops[index])
        }
      }
      this.linkedLaptops.sort((a, b) => {
        let fa = a.created_at,
        fb = b.created_at
        if (fa < fb){
          return 1
        }
        if (fa > fb){
          return -1
        }
        return 0
      })
    })).subscribe()
  }
  onDeleteLaptop(id: number) {
    this.restApi.deleteLaptop(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    });
  }

  sortPaidLaptops(isPaid: boolean){
    this.restApi.getLaptops()
    .pipe(map(laptops => {
      this.linkedLaptops.splice(0, this.linkedLaptops.length)
      for (let index in laptops){
        if(laptops[index].status == "away" && laptops[index].isPaid == isPaid){
          this.linkedLaptops.push(laptops[index])
        }
      }
      this.linkedLaptops.sort((a, b) => {
        let fa = a.created_at,
        fb = b.created_at
        if (fa < fb){
          return 1
        }
        if (fa > fb){
          return -1
        }
        return 0
      })
    })).subscribe()
    
  }

  allTypedLaptops(type: string){
    this.restApi.getLaptops()
    .pipe(map(laptops => {
      this.linkedLaptops.splice(0, this.linkedLaptops.length)
      for (let index in laptops){
        if(laptops[index].status == "away" && laptops[index].type == type){
          this.linkedLaptops.push(laptops[index])
        }
      }
      this.linkedLaptops.sort((a, b) => {
        let fa = a.created_at,
        fb = b.created_at
        if (fa < fb){
          return 1
        }
        if (fa > fb){
          return -1
        }
        return 0
      })
    })).subscribe()
  }

}
