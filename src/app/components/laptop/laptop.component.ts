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
      .pipe(first())
      .subscribe((laptops) => (this.allLaptops = laptops));
  }

  onDeleteLaptop(id: number) {
    this.restApi.deleteLaptop(id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    });
  }

  sortPaidLaptops(){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        if (laptop.isPaid == true){
          console.log(laptop)
          this.allLaptops.push(laptop)
        }
      }
      return laptops
    }))
    .subscribe();
  }

  sortUnpaidLaptops(){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        if (laptop.isPaid == false){
          console.log(laptop)
          this.allLaptops.push(laptop)
        }
      }
      return laptops
    }))
    .subscribe();
  }
  resetSort(){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        this.allLaptops.push(laptop)
      }
      return laptops
    }))
    .subscribe();
  }
  allLinuxLaptops(){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        if (laptop.type == "Linux"){
          console.log(laptop)
          this.allLaptops.push(laptop)
        }
      }
      return laptops
    }))
    .subscribe();
  }

  allWindowsLaptops(){
    this.restApi
    .getLaptops()
    .pipe(map(laptops => {
      this.allLaptops.splice(0, this.allLaptops.length)
      for(let laptop of laptops){
        if (laptop.type == "Windows"){
          console.log(laptop)
          this.allLaptops.push(laptop)
        }
      }
      return laptops
    }))
    .subscribe();
  }
}
