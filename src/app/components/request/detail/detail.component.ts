import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { LaptopRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  allRequests: LaptopRequest[] = null;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private restApi: ApiconfigService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.restApi.getLaptopRequests().pipe(first()).subscribe(laptopRequests => this.allRequests = laptopRequests)


    
  }

}
