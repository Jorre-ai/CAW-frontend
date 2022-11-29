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
  allLaptops: Laptop[] = [];
  sorting: string;
  freeLaptops: Laptop[] = []

  constructor(public restApi: ApiconfigService) {}

  ngOnInit(): void {

    this.restApi.getLaptops()
    .pipe(map(laptops => {
      this.freeLaptops.splice(0, this.freeLaptops.length)
      for (let index in laptops){
        if(laptops[index].status == "available"){
          this.freeLaptops.push(laptops[index])
        }
      }
      this.freeLaptops.sort((a, b) => {
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
      this.freeLaptops.splice(0, this.freeLaptops.length)
      for (let index in laptops){
        if(laptops[index].status == "available" && laptops[index].isPaid == isPaid){
          this.freeLaptops.push(laptops[index])
        }
      }
      this.freeLaptops.sort((a, b) => {
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
      this.freeLaptops.splice(0, this.freeLaptops.length)
      for (let index in laptops){
        if(laptops[index].status == "available" && laptops[index].type == type){
          this.freeLaptops.push(laptops[index])
        }
      }
      this.freeLaptops.sort((a, b) => {
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
