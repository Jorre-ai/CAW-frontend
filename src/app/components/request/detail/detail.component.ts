import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Laptop, LaptopUpdate } from 'src/app/_models/laptop';
import { LaptopRequest } from 'src/app/_models/laptoprequest';
import { AlertService } from 'src/app/_services';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  loading = false;
  submitted = false;
  allRequests: LaptopRequest[] = [];
  currentRequest: LaptopRequest;
  currentLaptop: LaptopUpdate;
  allLaptops: Laptop[] = [];
  windowsLaptops: Laptop[] = [];
  linuxLaptops: Laptop[] = [];
  allFreeLaptops: Laptop[] = [];
  requestLaptops: Laptop[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private restApi: ApiconfigService,
    private alertService: AlertService
  ) { 
    
  }

  ngOnInit(): void {
    //this.submitted = false;
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      laptop_id: ['', Validators.required]
    })
    this.restApi.getLaptops()
    .pipe(map(requests => {
      for(let request of requests){
        if (request.type == "Windows" && request.status == "available"){
          this.windowsLaptops.push(request)
        }
        if (request.type == "Linux" && request.status == "available"){
          this.linuxLaptops.push(request)
        }
        if (request.status == "available"){
          this.allFreeLaptops.push(request)
        }
      }
      return}
      ))
      .subscribe();

      this.id = this.route.snapshot.params['id'];

      this.restApi.getLaptopsByRequestId(this.id)
      .pipe(map(requests =>{
        this.requestLaptops = requests
      })).subscribe()


      // All requests
      this.restApi.getLaptopRequests()
      .pipe(map(requests => {
        for(let request of requests){
          if (+request.id == this.id){
            this.currentRequest = request
          }
        }
        this.allRequests = requests
        console.log("Alle requests ", this.allRequests)
        console.log("Current request ", this.currentRequest)
      }))
      .subscribe()
      // All laptops
      this.restApi.getLaptops().pipe(first()).subscribe(laptops => this.allLaptops = laptops)
  }

  get f(){
    return this.form.controls
  }

  onAddLaptop(){
    this.submitted = true;
    this.alertService.clear()
    console.log("submit status " + this.submitted);
    console.log("error for required" + this.f.laptop_id.errors)

    if (this.form.invalid){
      console.log('form invalid');

      return
    }

    
    this.currentLaptop;
    console.log(this.form.value.laptop_id)
    for (let laptop of this.allLaptops){
      if (laptop.id == this.form.value.laptop_id){
        this.currentLaptop = {
          "id": laptop.id,
          "status": "away",          
          "isPaid": laptop.isPaid,
          "isFree": laptop.isFree,
          "soldDate": "2022-11-03T10:47:10.958Z",
          "request_id": +this.id,
        }      
        console.log(this.currentLaptop)  
      }
    }
    this.restApi.updateLaptop(this.currentLaptop).subscribe(result => console.log("this is the result",result))
    //this.ngOnInit();
    this.router.navigate(['/requests/detail/' + this.id]).then(() => {
      window.location.reload()
    })
  }

  onRemoveLaptop(id: number){
    this.ngOnInit();
  }

  approveRequest(id: number){
    this.currentRequest.status = "approved"
    this.restApi.editLaptopRequest(this.currentRequest).subscribe(result => console.log("This is the result", result))
    this.router.navigate(['/requests'])
  }
}
