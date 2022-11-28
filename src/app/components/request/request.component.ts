import { Component, OnInit, Pipe } from '@angular/core';
import { first, pipe } from 'rxjs';
import { filter } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { LaptopRequest } from 'src/app/_models/laptoprequest';
import { map } from 'rxjs';
import { Caw } from 'src/app/_models/caw';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  allRequests: LaptopRequest[] = [];
  pendingRequests: LaptopRequest[] = [];
  approvedRequests: LaptopRequest[] = [];
  allCaws: Caw[] = [];


  constructor(public restApi: ApiconfigService) { 

  }

  ngOnInit(): void {
    this.restApi.getLaptopRequests()
    .pipe(map(requests => {
      this.pendingRequests.splice(0, this.pendingRequests.length)
      for(let request of requests){
        if (request.status == "lopende"){
          this.pendingRequests.push(request)
        }
      }
      this.pendingRequests.sort((a, b) =>{
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

      return requests}
      ))
    .subscribe()
    this.restApi.getCaws().pipe(first()).subscribe((caws) => (this.allCaws = caws))
    console.log("alle approved requests" , this.approvedRequests)
    console.log("alle pending requests", this.pendingRequests)
  }

  onDeleteRequest(id: number){
    this.restApi.deleteLaptopRequest(id).subscribe((response) => {
      console.log(response);
    });
    window.location.reload()
  }

  sortTypedRequests(type: string){
    this.restApi.getLaptopRequests()
    .pipe(map(requests => {
      this.pendingRequests.splice(0, this.pendingRequests.length)
      for(let request of requests){
        if (request.type_os == type && request.status == "lopende"){
          this.pendingRequests.push(request)
        }
      }
      return requests}
      ))
    .subscribe()
  }
}

