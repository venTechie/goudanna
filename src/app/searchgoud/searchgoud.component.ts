import { Component, OnInit } from '@angular/core';
import { districts, mandals, villages } from './../../data';
import { DataServiceTsService } from '../shared/data.service.ts.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-searchgoud',
  templateUrl: './searchgoud.component.html',
  styleUrls: ['./searchgoud.component.scss']
})

export class SearchgoudComponent implements OnInit {

  // dropdown list for districts,Mandals,Villages
  districts: any = [];
  mandals: any = [];
  villages: any = [];
  district: string = "0";
  mandal: string = "0";
  village: string = "0";
  goudsList: any = [];

  // ...

  constructor(private data: DataServiceTsService, private spinnerService: NgxSpinnerService, private dfs: DataServiceTsService) {}
  
  ngOnInit(): void {
    this.reset();
    this.districts = this.dfs.getAllDistricts().subscribe(res => {
      this.districts = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    });
  }

  onSubmit() {
    this.spinnerService.show();
   if(this.district == "0" || this.mandal == "0" || this.village == "0"){
      this.spinnerService.hide();
      alert("Please fill all the fields");
      this.reset();
      return;
    }
    
    this.data.getAllGoudsByDistrictMandalVillage(this.district,this.mandal,this.village).subscribe(res => {
        if(res.length == 0){
          alert("No records found");
          this.reset();
          this.spinnerService.hide();
          return;
        }
        this.goudsList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          this.reset();
          this.spinnerService.hide();
          return data;
        })
        
    })
  }

  reset() {
    this.district = "0";
    this.mandal = "0";
    this.village = "0";
    this.goudsList = [];
  }

  onDistrictChange(districtId: any) {
    this.district = districtId;
    this.dfs.getManadalByDistrict(districtId).subscribe(res => {
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
    this.dfs.getVillageByDistrictAndMandal(parseInt(this.district), mandalId).subscribe(res => {
      this.villages = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
      this.village = "0";
    })
  }

}
