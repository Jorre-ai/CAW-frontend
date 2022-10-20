import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {
  getAllLaptops() {
    console.log("function is called properly")
  }

  constructor() { }

  ngOnInit(): void {
  }

}
