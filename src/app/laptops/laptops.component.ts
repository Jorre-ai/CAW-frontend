import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Laptop } from '../_models/laptop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-laptops',
  templateUrl: './laptops.component.html',
  styleUrls: ['./laptops.component.css']
})
export class LaptopsComponent implements OnInit {
  laptopUrl = 'http://localhost:8000/laptop';
  laptop: any;

  constructor(
    private http: HttpClient,
    // Declaring laptop in constructor gives error
    // private laptop: Laptop,
    ) { }
   getAllLaptops() {
    console.log("function is called properly")
    return this.http.get(this.laptopUrl).pipe(map((res => {return res})))
  };

  // Function doesn't store http request
  showAllLaptops() {
    console.log("show all is called properly");
    
    console.log(this.getAllLaptops()
    .subscribe(data => this.laptop = data));
  } 
  /*

   req = this.http.get<Laptop>(this.laptopUrl);

  showAllLaptops(){
    console.log(this.req.subscribe((data: Laptop) => this.laptop = {
      id: data.id,
      name: data.name,
      status: data.status
    }));
  } 
*/

  ngOnInit(): void {
  }

}
