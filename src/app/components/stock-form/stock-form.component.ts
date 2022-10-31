import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiconfigService } from 'src/app/config/apiconfig.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {

  public editRequestForm: FormGroup = new FormGroup({
  })

  panelOpenState = false;
  public laptopRequests: any = [];
  public laptops: any = [];
  public selectedLaptopId: any;
  public laptopCount: number;
  public availableLaptops: any = [];
  public availableLaptopCount: number;
  public type_os: string;
  public laptopName: string;

  constructor(public restApi: ApiconfigService) { }

  ngOnInit(): void {
    this.restApi.getLaptopRequests().subscribe(response => {
      console.log(response);
      this.laptopRequests = response;
    });

    this.laptops = [];

    this.restApi.getLaptops().subscribe(response => {
      console.log(response);
      this.laptops = response;
      
      this.laptopCount = this.laptops.length;
      this.availableLaptops = [];

      this.laptops.forEach((item: any) => {
        if (item.status == "available"){
          this.availableLaptops.push(item)  
        }
        
      });

      this.availableLaptopCount = this.availableLaptops.length;

    });
  }

  public onSubmitLaptopRequest(request: any): void {
    console.log(request);
    console.log(this.selectedLaptopId)

    request.status = "approved";
    request.laptop_id = this.selectedLaptopId;

    var laptop = {
      id: this.selectedLaptopId,
      status: "assigned"
    }

    this.restApi.updateLaptop(laptop).subscribe(laptopresponse => {
      console.log(laptopresponse);
    });

    this.restApi.editLaptopRequest(request).subscribe((response: any) => {
      console.log(response);
    });

    this.ngOnInit();

  }

  public onSelectLaptop(laptopId: any): void {
    this.selectedLaptopId = laptopId;
  }

  public onValChange(val: string){
    console.log(val);
    this.type_os = val;
  }

  public onLaptopNameChange(laptopName: string){
    console.log(laptopName);
    this.laptopName = laptopName;
  }

  public onAddLaptop(): void {
    var laptop = {
      name: this.laptopName,
      type: this.type_os,
      price: "50",
      user_ID: 1,
      status: "available"
    }

    console.log(laptop)

    // this.restApi.postLaptop(laptop).subscribe(response => {
    //   console.log(response);
    //   this.ngOnInit();
    // });
  
  }

}
