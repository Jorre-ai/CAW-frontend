import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { AlertService } from 'src/app/_services';
import { LaptopRequest } from 'src/app/_models/laptoprequest';
import { first, map } from 'rxjs';
import { Caw } from 'src/app/_models/caw';

@Component({
  selector: 'app-request-add-edit',
  templateUrl: './request-add-edit.component.html',
  styleUrls: ['./request-add-edit.component.css']
})
export class RequestAddEditComponent implements OnInit {
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
      email: ['', Validators.required],
      count: ['', Validators.required],
      type_os: ['', Validators.required],
      //payment_method: ['', Validators.required],
      description: [''],
      //status: ['', Validators.required],
      caw_id: ['', Validators.required],
    })

     if (!this.isAddMode){
      this.restApi
        .getLaptopRequestById(this.id)
        .pipe(first())
        .subscribe((response) => {
          this.form.patchValue(response);
        })
    } 
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid){
      console.log('unvalid form')
      return
    }

    this.currentRequest = this.form.value;

    this.isAddMode == true ? this.createRequest() : this.editRequest();

  }

  createRequest(){
    console.log(this.currentRequest)
    //this.currentRequest.type_os = "Windows";
    this.currentRequest.payment_method = "none";
    this.currentRequest.status = "pending";
    this.restApi.postLaptopRequest(this.currentRequest)
      .subscribe(response => {
        this.router.navigate(['/requests'], { relativeTo: this.route });

      })
  }

  editRequest(){
    
  }

}
