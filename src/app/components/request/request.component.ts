import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { LaptopRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  allRequests: LaptopRequest[] = null;

  constructor(public restApi: ApiconfigService) { }

  ngOnInit(): void {
    this.restApi.getLaptopRequests().pipe(first()).subscribe(requests => this.allRequests = requests)
  }

}
