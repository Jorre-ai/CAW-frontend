import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { first } from 'rxjs';
import { Laptop } from 'src/app/_models/laptop';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  allLaptops : Laptop[] = null;
  currentLaptop: Laptop = null;
  


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
      name: ['', Validators.required],
      type: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.restApi.getLaptops().pipe(first()).subscribe(laptops => this.allLaptops = laptops)

    }
  }

  get f() { return this.form.controls;}

  onSubmit(){
    this.submitted = true;

    this.alertService.clear();

    if (this.form.invalid){
      console.log("unvalid form")
      return;
    }

    // Store laptop in database
    this.currentLaptop = this.form.value;
    this.currentLaptop.price = "30";
    if (this.currentLaptop.type == "Windows"){
      this.currentLaptop.price = "50";
    }
    this.currentLaptop.user_ID = 1;
    this.currentLaptop.status = "available";
    //this.currentLaptop.requestID = null;
    //this.isPaid = False;
    //this.isFree = False;

    this.restApi.postLaptop(this.currentLaptop).subscribe(response => {
      console.log(response);
    })

    this.router.navigate(['/laptops'], { relativeTo: this.route })
  }

  
}
