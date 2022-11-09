import { Component, OnInit } from '@angular/core';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Laptop } from 'src/app/_models/laptop';
import { first } from 'rxjs';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css'],
})
export class LaptopComponent implements OnInit {
  allLaptops: Laptop[] = null;

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
}
