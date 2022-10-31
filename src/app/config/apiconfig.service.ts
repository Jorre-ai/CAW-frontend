import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LaptopRequest, LaptopRequestRequest } from '../_models/laptoprequest';
import { Laptop, LaptopCreate, LaptopEdit } from '../_models/laptop';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiconfigService {
  private baseUrl: string = 'http://localhost:8000';
  allLaptops: Laptop[] = null;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // LAPTOP REQUESTS
  getLaptopRequests() {
    return this.http.get<LaptopRequest[]>(
      this.baseUrl + '/laptoprequest',
      this.httpOptions
    );
  }

  postLaptopRequest(laptopRequest: LaptopRequestRequest) {
    return this.http.post(
      this.baseUrl + '/laptoprequest',
      JSON.stringify(laptopRequest),
      this.httpOptions
    );
  }

  editLaptopRequest(laptopRequest: LaptopRequest) {
    return this.http.patch(
      this.baseUrl + '/laptoprequest',
      JSON.stringify(laptopRequest),
      this.httpOptions
    );
  }

  // LAPTOPS
  getLaptops() {
    console.log(this.baseUrl + '/laptop');
    return this.http.get<Laptop[]>(this.baseUrl + '/laptop');
  }

  getLaptopById(id: number) {
    return this.http.get<Laptop>(this.baseUrl + '/laptop/' + id);
  }

  postLaptop(createLaptopObject: LaptopCreate): Observable<LaptopCreate> {
    return this.http.post<LaptopCreate>(
      this.baseUrl + '/laptop',
      JSON.stringify(createLaptopObject),
      this.httpOptions
    );
  }

  editLaptop(editLaptopObject: LaptopEdit): Observable<LaptopEdit> {
    return this.http.put<LaptopEdit>(
      this.baseUrl + '/laptop',
      JSON.stringify(editLaptopObject),
      this.httpOptions
    );
  }

  updateLaptop(laptop: any) {
    return this.http.patch(
      this.baseUrl + '/laptop',
      JSON.stringify(laptop),
      this.httpOptions
    );
  }

  deleteLaptop(id: number) {
    return this.http.delete(this.baseUrl + '/laptop/' + id);
  }

  // USERS
}
