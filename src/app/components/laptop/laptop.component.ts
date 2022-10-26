import { Component, OnInit } from '@angular/core';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Laptop } from 'src/app/_models/laptop';
import { first } from 'rxjs';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  allLaptops : Laptop[] = null;

  constructor(public restApi: ApiconfigService) {}

  ngOnInit(): void {
    this.restApi.getLaptops().pipe(first()).subscribe(laptops => this.allLaptops = laptops)

  }

  onGetLaptop() {
    this.restApi.getLaptops().subscribe(data => {
      console.log(data);
    });
  }

  onCreateLaptop() {
    var laptop: Laptop = new Laptop();

    // this should be a form
    laptop.name = "my awasome name2";
    laptop.type = "linux is bestttt";
    laptop.price = "40";
    laptop.user_ID = 1;


    this.restApi.postLaptop(laptop).subscribe(data => {
      console.log(data);
    });
  }
}