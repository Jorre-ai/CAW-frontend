import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { first, map } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Caw } from 'src/app/_models/caw';
import { LaptopRequest } from 'src/app/_models/laptoprequest';
import { AlertService } from 'src/app/_services';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  allRequests: LaptopRequest[] = [];
  currentRequest: LaptopRequest = null
  allCaws: Caw[] = [];

  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restApi: ApiconfigService,
    private alertService: AlertService,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.restApi.getCaws().pipe(map(caws => {
      this.allCaws = caws
      this.allCaws.sort((a, b) => {
        let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();
        if (fa < fb){
          return -1
        }
        if (fa > fb){
          return 1
        }
        return 0
      })
    })).subscribe()

    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      count: ['', Validators.required],
      type_os: ['', Validators.required],
      description: [''],
      caw_id: ['', Validators.required],
    })
  }

  get f() {
    return this.form.controls;
  }

  public onSubmit(): void {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid){
      console.log('Invalid form');
      console.log(this.f.email.errors)
      console.log(this.submitted)
      console.log(this.f.email.errors.required)
      return;
    }

    this.currentRequest = this.form.value;

    console.log(this.currentRequest)
    //this.currentRequest.type_os = "Windows";
    this.currentRequest.payment_method = "none";
    this.currentRequest.status = "lopende";
    this.restApi.postLaptopRequest(this.currentRequest)
      .subscribe(response => {
        this.router.navigate(['/request/succes'], { relativeTo: this.route });

      })
  }

}
