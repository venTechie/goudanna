import { Component } from '@angular/core';
import * as XLSX from "xlsx";
import { District } from '../model/district';
import { DataServiceTsService } from '../shared/data.service.ts.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-export-files',
  templateUrl: './export-files.component.html',
  styleUrls: ['./export-files.component.scss']
})
export class ExportFilesComponent {

  //Read Excel file from upload form
  districtObj: District = {
    id: 0,
    dist_code: "",
    dist_name: ""
  }

  mandalObj: any = {
    district_code: 0,
    mandal_code: 0,
    mandal_name: ""
  }

  villageObj: any = {
    district_code: 0,
    mandal_code: 0,
    village_code: 0,
    village_name: ""
  }

  constructor(private data: DataServiceTsService, private spinnerService: NgxSpinnerService) {}

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length > 1) {
      alert('Multiple files are not allowed');
      return;
    }
    else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log(data);
        data.forEach((element: any) => {
          console.log(element);
          /*this.districtObj.id = element[0];
          this.districtObj.dist_name = element[1];
          this.districtObj.dist_code = element[2];*/

          /*this.mandalObj.district_code = element[0];
          this.mandalObj.mandal_code = element[1];
          this.mandalObj.mandal_name = element[2];*/

          this.villageObj.district_code = element[0];
          this.villageObj.mandal_code = element[1];
          this.villageObj.village_code = element[2];
          this.villageObj.village_name = element[3];

          
        //Enable this code to insert data into database
        /*this.spinnerService.show();
          this.data.addVillage(this.villageObj).then((res) => {
            console.log(res);
            this.spinnerService.hide();
          }); */
        });
      }
      reader.readAsBinaryString(target.files[0]);
    }
  }



}
