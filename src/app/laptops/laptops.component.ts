import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, first, retry } from 'rxjs/operators';
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
  laptops: {};
  allLaptops: any[] = null;

  constructor(
    private http: HttpClient,
    ) { }


   getAllLaptops() {
    return this.http.get<Laptop[]>(this.laptopUrl)
  }


    ngOnInit(): void {
      this.getAllLaptops().pipe(first()).subscribe(laptops => this.allLaptops = laptops)
  }

}
