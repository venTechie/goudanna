  import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { goud } from '../model/goud';

@Injectable({
  providedIn: 'root'
})
export class DataServiceTsService {

  constructor(private afs : AngularFirestore) { }

  addGoud(goud: goud){
    goud.id = this.afs.createId();
    return this.afs.collection('/goudanna').add(goud);
  }

  getAllGoudsByDistrictMandalVillage(district: string, mandal: string, village: string) {
    return this.afs.collection('/goudanna', ref => ref.where('district', '==', district).where('mandal', '==', parseInt(mandal+'')).where('Village', '==', parseInt(village+''))).snapshotChanges();
  }

  addDistrict(district: any){
    return this.afs.collection('/districts').add(district);
  }

  addMandal(mandal: any){
    return this.afs.collection('/mandals').add(mandal);
  }

  addVillage(village: any){
    return this.afs.collection('/villages').add(village);
  }
  
  getAllDistricts() {
    return this.afs.collection('/districts', ref => ref.orderBy('dist_name', 'asc')).snapshotChanges();
  }

  getManadalByDistrict(district: number) {
    return this.afs.collection('/mandals', ref => ref.where('district_code', '==', parseInt(district+'') )).snapshotChanges();
  }

  getVillageByDistrictAndMandal(district: number, mandal: number) { 
    return this.afs.collection('/villages', ref => ref.where('district_code', '==', district ).where('mandal_code', '==', parseInt(mandal+''))).snapshotChanges();
  }
}
