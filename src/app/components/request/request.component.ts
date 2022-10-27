import { Component, OnInit, Pipe } from '@angular/core';
import { first } from 'rxjs';
import { filter } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { LaptopRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit{
  allRequests: LaptopRequest[] = null;

  constructor(public restApi: ApiconfigService) { 
    this.restApi.getLaptopRequests().subscribe(requests => this.allRequests = requests)


  }

  ngOnInit(): void {
    console.log("alle requests" , this.allRequests)
  }
}

