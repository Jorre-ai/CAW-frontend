import { Component, OnInit, Pipe } from '@angular/core';
import { first, pipe } from 'rxjs';
import { filter } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { LaptopRequest } from 'src/app/_models/laptoprequest';
import { map } from 'rxjs';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  allRequests: LaptopRequest[] = [];
  pendingRequests: LaptopRequest[] = [];
  approvedRequests: LaptopRequest[] = [];


  constructor(public restApi: ApiconfigService) { 
    this.restApi.getLaptopRequests().
    pipe(map(requests => {
      for(let request of requests){
        if (request.status == "pending"){
          this.pendingRequests.push(request)
        }
        if (request.status == "approved"){
          this.approvedRequests.push(request)
        }
      }
      return requests}
      ))
    .subscribe()
  }

  ngOnInit(): void {
    console.log("alle approved requests" , this.approvedRequests)
    console.log("alle pending requests", this.pendingRequests)
  }
}

