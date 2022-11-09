import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Caw } from 'src/app/_models/caw';
import { AlertService } from 'src/app/_services';

@Component({
  selector: 'app-caw-add-edit',
  templateUrl: './caw-add-edit.component.html',
  styleUrls: ['./caw-add-edit.component.css']
})
export class CawAddEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  caw: Caw = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restApi: ApiconfigService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', [Validators.required,]],
      email: [''],
      phone: ['']
    })

    if (!this.isAddMode){
      this.restApi
        .getCawById(this.id)
        .pipe(first())
        .subscribe((response) => {
          this.form.patchValue(response);
        })
    }
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(){
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid){
      console.log('Invalid form');
      return
    }

    this.isAddMode == true ? this.createCaw() : this.editCaw();

  }

  createCaw() {
    this.caw = this.form.value;
    console.log(this.caw)

    this.restApi.postCaw(this.caw).subscribe((response) =>{
      this.router.navigate(['/caw'], { relativeTo: this.route })
    })
    }

  editCaw() { 
    this.caw = this.form.value;
    this.caw.id = this.id;
    console.log(this.caw)

    this.restApi.editCaw(this.caw).subscribe((response) => {
      this.router.navigate(['/caw'], { relativeTo: this.route })
    })
  }

}
