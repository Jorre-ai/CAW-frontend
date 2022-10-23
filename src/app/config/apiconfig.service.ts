import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LaptopRequest } from '../_models/laptoprequest';
import { Laptop } from '../_models/laptop';

@Injectable({
  providedIn: 'root'
})
export class ApiconfigService {

  private baseUrl: string = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // LAPTOP REQUESTS
  getLaptopRequests(){
    return this.http
    .get<LaptopRequest[]>(this.baseUrl + "/laptoprequest")
  }

  postLaptopRequest(laptopRequest: LaptopRequest){
    return this.http
    .post(this.baseUrl + "/laptoprequest" , JSON.stringify(laptopRequest))
  }

  editLaptopRequest(laptopRequest: LaptopRequest){
    return this.http
    .patch(this.baseUrl + "/laptoprequest", JSON.stringify(laptopRequest))
  }


  // LAPTOPS
  getLaptops(){
    console.log(this.baseUrl + "/laptop")
    return this.http
    .get(this.baseUrl + "/laptop")
  }

  postLaptop(laptop: Laptop): Observable<Laptop>{
    console.log(JSON.stringify(laptop));
    return this.http
    .post<Laptop>(this.baseUrl + "/laptop", JSON.stringify(laptop), this.httpOptions)
  }

  editLaptop(laptop: Laptop){
    return this.http
    .patch(this.baseUrl + "/laptop", JSON.stringify(laptop))
  }

  // USERS




}
