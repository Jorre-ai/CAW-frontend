import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { first } from 'rxjs';
import { Laptop, LaptopEdit } from 'src/app/_models/laptop';
import { LaptopCreate } from 'src/app/_models/laptop';

@Component({
  selector: 'app-add-edit',
  templateUrl: './laptop-add-edit.component.html',
  styleUrls: ['./laptop-add-edit.component.css'],
})
export class LaptopAddEditComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  source: string;
  fromRequest = false;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  allLaptops: Laptop[] = null;
  currentLaptop: Laptop = null;

  createLaptopObject: LaptopCreate;
  editLaptopObject: LaptopEdit;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restApi: ApiconfigService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.routeConfig.path)
    this.source = this.route.snapshot.routeConfig.path
    if (this.source.includes('payed')){
      this.fromRequest = true
    }


    this.isAddMode = !this.id;



    this.form = this.formBuilder.group({
      name: [
        '',
        [
          Validators.minLength(6),
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ],
      ],
      type: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.form = this.formBuilder.group({
        name: [
          '',
          [
            Validators.minLength(6),
            Validators.required,
            Validators.pattern('[a-zA-Z0-9 ]*'),
          ],
        ],
        type: ['', Validators.required],
        isPaid: ['', Validators.required],
        isFree: ['', Validators.required]
      });

      this.restApi
        .getLaptopById(this.id)
        .pipe(first())
        .subscribe((response) => {
          this.currentLaptop = response
          this.form.patchValue(response);
          console.log(response)
        });
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.form.invalid) {
      console.log('Invalid form');
      return;
    }

    this.isAddMode == true ? this.createLaptop() : this.editLaptop();
  }

  createLaptop() {
    this.createLaptopObject = new LaptopCreate();
    this.createLaptopObject = this.form.value;
    this.createLaptopObject.type == 'Windows'
      ? (this.createLaptopObject.price = 50)
      : (this.createLaptopObject.price = 30);
    this.createLaptopObject.status = 'available';
    this.createLaptopObject.isPaid = false;
    this.createLaptopObject.isFree = false;

    this.restApi.postLaptop(this.createLaptopObject).subscribe((response) => {
      this.router.navigate(['/laptops'], { relativeTo: this.route });
    });
  }

  editLaptop() {
    this.editLaptopObject = new LaptopEdit();
    this.editLaptopObject = this.form.value;
    this.editLaptopObject.id = this.id;
    this.editLaptopObject.type == 'Windows'
      ? (this.editLaptopObject.price = 50)
      : (this.editLaptopObject.price = 30);
    this.editLaptopObject.status = this.currentLaptop.status;
    this.editLaptopObject.isPaid = this.form.get('isPaid')?.value;
    this.editLaptopObject.isFree = this.form.get('isFree')?.value;

    this.restApi.editLaptop(this.editLaptopObject).subscribe((response) => {
      this.router.navigate(['/laptops'], { relativeTo: this.route });
    });
  }
}
