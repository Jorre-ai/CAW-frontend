import { Component, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Caw } from 'src/app/_models/caw';
import { LaptopRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.css']
})
export class ApprovedRequestsComponent implements OnInit {
  allRequests: LaptopRequest[] = [];
  pendingRequests: LaptopRequest[] = [];
  approvedRequests: LaptopRequest[] = [];
  allCaws: Caw[] = [];

  constructor(public restApi: ApiconfigService) { 
    this.restApi.getLaptopRequests()
    .pipe(map(requests => {
      for(let request of requests){
        if (request.status == "goedgekeurd"){
          this.approvedRequests.push(request)
        }
      }
      return requests}
      ))
    .subscribe()
    this.restApi.getCaws().pipe(first()).subscribe((caws) => (this.allCaws = caws))
  }

  ngOnInit(): void {
  }
}
