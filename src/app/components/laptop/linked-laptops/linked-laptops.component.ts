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
      this.allLaptops = laptops
      
      for (let index in this.allLaptops){
  
        if (this.allLaptops[index].status == "away"){
          console.log(this.allLaptops[index])
          this.linkedLaptops.push(this.allLaptops[index])
        }
      }
    })).subscribe()

  }
  onDeleteLaptop(id: number) {
    this.restApi.deleteLaptop(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    });
  }

  sortPaidLaptops(isPaid: boolean){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        if (laptop.isPaid == isPaid){
          console.log(laptop)
          this.allLaptops.push(laptop)
        }
      }
      this.allLaptops.sort((a, b) => {
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
      return laptops
    }))
    .subscribe();
  }

  allTypedLaptops(type: string){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        if (laptop.type == type){
          console.log(laptop)
          this.allLaptops.push(laptop)
        }
      }
      this.allLaptops.sort((a, b) => {
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
      return laptops
    }))
    .subscribe();
  }

}
