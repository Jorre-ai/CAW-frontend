import { Component, OnInit } from '@angular/core';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Laptop } from 'src/app/_models/laptop';
import { first, map } from 'rxjs';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css'],
})
export class LaptopComponent implements OnInit {
  allLaptops: Laptop[] = null;
  sorting: string;

  constructor(public restApi: ApiconfigService) {}

  ngOnInit(): void {
    this.restApi
      .getLaptops()
      .pipe(map(laptops => {
        this.allLaptops = laptops
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
        console.log(this.allLaptops)
      })).subscribe();
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
