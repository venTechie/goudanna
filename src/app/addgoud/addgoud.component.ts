import { Component, OnInit } from '@angular/core';
import { districts, mandals, villages } from './../../data';
import { HttpClient } from '@angular/common/http';
import { DataServiceTsService } from '../shared/data.service.ts.service';
import { goud } from '../model/goud';
import { Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-addgoud',
  templateUrl: './addgoud.component.html',
  styleUrls: ['./addgoud.component.scss']
})
export class AddgoudComponent implements OnInit {

  // dropdown list for districts,Mandals,Villages
  districts: any = [];
  mandals: any = [];
  villages: any = [];
  goudName: string = "";
  goudPhNumber: string = "";
  district: string = "0";
  mandal: string = "0";
  village: string = "0"; // Add the 'village' property
  goudsList: any = [];

  goudObj: goud = {
    id: "",
    Name: "",
    phone_Number: "",
    district: "0",
    mandal: "0",
    Village: "0",
    created_Date: "",
    crated_Time: "",
    created_By: "",
  }

  apiJsonResponseData: any;

  constructor(private http:HttpClient, private data: DataServiceTsService, private route: Router, private spinnerService: NgxSpinnerService) {}
    
  
  ngOnInit(): void {
    this.reset();
  }
  
  onSubmit() {
    // TODO: Implement onSubmit logic
    console.log("Submitted");
    this.spinnerService.show();
    if(this.goudName == "0" || this.goudPhNumber == "0" || this.district == "0" || this.mandal == "0" || this.village == "0"){
      this.spinnerService.hide();
      alert("Please fill all the fields");
      return
    }

    this.goudObj.Name = this.goudName;
    this.goudObj.phone_Number = this.goudPhNumber;
    this.goudObj.district = this.district;
    this.goudObj.mandal = this.mandal;
    this.goudObj.Village = this.village;
    this.goudObj.created_Date = new Date().toLocaleDateString();
    this.goudObj.crated_Time = new Date().getTime().toLocaleString();
    this.goudObj.created_By = "user";

    this.data.addGoud(this.goudObj).then(res => {
      console.log(res);
      this.reset();
      this.spinnerService.hide();
      alert("Goud Added Successfully");
      this.route.navigate(['/searchgoud']);
    }).catch(err => {
      console.log(err);
    })

  }

  onDistrictChange(districtId: any) {
    this.district = districtId;
    this.data.getManadalByDistrict(districtId).subscribe(res => {
      this.mandals = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      this.mandal = "0";
      this.village = "0";
    })
  }

  onMandalChange(mandalId: number) {
    this.data.getVillageByDistrictAndMandal(parseInt(this.district), mandalId).subscribe(res => {
      this.villages = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      this.village = "0";
    })
  }

  reset(){
    this.goudName = "";
    this.goudPhNumber = "";
    this.district = "0";
    this.mandal = "0";
    this.village = "0";
    this.districts = this.data.getAllDistricts().subscribe(res => {
      this.districts = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    });
  }
}
