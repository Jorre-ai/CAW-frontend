import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Caw } from 'src/app/_models/caw';
import { Laptop } from 'src/app/_models/laptop';
import { LaptopRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-caw-detail',
  templateUrl: './caw-detail.component.html',
  styleUrls: ['./caw-detail.component.css']
})
export class CawDetailComponent implements OnInit {
  id!: number;
  currentCaw: Caw;
  runningRequests: LaptopRequest[] = [];
  approcedRequests: LaptopRequest[] = [];
  allRequests: LaptopRequest[] = [];
  currentRequest: LaptopRequest;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restApi: ApiconfigService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.restApi.getLaptopRequestByCawId(this.id)
    .pipe(map(requests => {
      if (requests.length <= 1){
        this.currentRequest = requests[0]
      }
      
      this.allRequests = requests
      console.log(requests)
    })).subscribe()


    this.restApi.getCawById(this.id)
    .pipe(map(caw => {
      this.currentCaw = caw
      console.log(this.currentCaw)
    })).subscribe()
  }

}
