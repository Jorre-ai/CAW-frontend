import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { LaptopRequest, LaptopRequestRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  public requestLaptopForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    type_os: new FormControl("", [Validators.required]),
    count: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    payment_method: new FormControl("", [Validators.required]),
    waranty: new FormControl("", [Validators.required]),
    status: new FormControl("pending")
  })

  constructor(public restApi: ApiconfigService, public router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log(this.requestLaptopForm.value);

    var laptopRequest: LaptopRequestRequest = {
      name: "test" + this.requestLaptopForm.value.name,
      email: this.requestLaptopForm.value.email,
      count: this.requestLaptopForm.value.count,
      type_os: this.requestLaptopForm.value.type_os,
      payment_method: "payment method",
      description: this.requestLaptopForm.value.description,
      waranty: "warantyyy",
      status: "pending",
      laptop_id: 0
    }

    this.restApi.postLaptopRequest(laptopRequest).subscribe(response => {
      console.log(response);

      this.router.navigate(['/request/succes'])
    });

  }

}
