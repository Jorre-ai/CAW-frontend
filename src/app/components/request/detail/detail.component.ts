import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs';
import { ApiconfigService } from 'src/app/config/apiconfig.service';
import { Laptop } from 'src/app/_models/laptop';
import { LaptopRequest } from 'src/app/_models/laptoprequest';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  allRequests: LaptopRequest[] = [];
  currentRequest: LaptopRequest;
  allLaptops: Laptop[] = [];
  windowsLaptops: Laptop[] = [];
  linuxLaptops: Laptop[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private restApi: ApiconfigService,
  ) { 
    this.restApi.getLaptops()
    .pipe(map(requests => {
      for(let request of requests){
        if (request.type == "Windows"){
          this.windowsLaptops.push(request)
        }
        if (request.type == "Linux"){
          this.linuxLaptops.push(request)
        }
      }
      return requests}
      ))
    .subscribe()
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.formBuilder.group({
      
    })
    // All requests
    this.restApi.getLaptopRequests().pipe(first())
      .subscribe(requests => this.allRequests = requests)
    // All laptops
    this.restApi.getLaptops().pipe(first()).subscribe(laptops => this.allLaptops = laptops)
    console.log("Linux ", this.linuxLaptops)
    console.log("Windows ", this.windowsLaptops)
    
  }

  counter(i: number) {
    return new Array(i);
  }

  onSubmit(){
    console.log(this.form.value)
  }

}
