import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LaptopRequest } from '../_models/laptoprequest';
import { Laptop, LaptopCreate, LaptopEdit } from '../_models/laptop';
import { first } from 'rxjs/operators';
import { Caw } from '../_models/caw';

@Injectable({
  providedIn: 'root',
})
export class ApiconfigService {
  private baseUrl: string = 'http://localhost:8000/api';
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

  getLaptopRequestById(id: number){
    return this.http.get<LaptopRequest>(
      this.baseUrl + '/laptoprequest/' + id,
      this.httpOptions
    );

  }

  getLaptopRequestByCawId(id: number){
    return this.http.get<LaptopRequest[]>(
      this.baseUrl + '/laptoprequest/caw/' + id,
      this.httpOptions
    )
  }

  postLaptopRequest(laptopRequest: LaptopRequest) {
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

  deleteLaptopRequest(id: number){
    return this.http.delete(this.baseUrl + '/laptoprequest/' + id);

  }

  // LAPTOPS
  getLaptops() {
    return this.http.get<Laptop[]>(
      this.baseUrl + '/laptop',
      this.httpOptions
      );
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
    console.log("update laptop in database: ", laptop)
    return this.http.patch(
      this.baseUrl + '/laptop',
      JSON.stringify(laptop),
      this.httpOptions
    );
  }

  deleteLaptop(id: number) {
    return this.http.delete(this.baseUrl + '/laptop/' + id);
  }

  getLaptopsByRequestId(id: number){
    return this.http.get<Laptop[]>(this.baseUrl + '/laptop/request/' + id)
  }


  // USERS


  // CAWS
  getCaws(){
    console.log(this.baseUrl + '/caw');
    return this.http.get<Caw[]>(this.baseUrl + '/caw');
  }

  getCawById(id: number){
    return this.http.get<Caw>(
      this.baseUrl + '/caw/' + id
    );
  }

  postCaw(caw: Caw): Observable<Caw>{
    return this.http.post<Caw>(
      this.baseUrl + "/caw",
      JSON.stringify(caw),
      this.httpOptions
    )
  }

  editCaw(caw: Caw): Observable<Caw> {
    return this.http.patch<Caw>(
      this.baseUrl + '/caw',
      JSON.stringify(caw),
      this.httpOptions
    )
  }

  deleteCaw(id: number){
    return this.http.delete(this.baseUrl + "/caw/" + id);
  }


}
