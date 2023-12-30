import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'goudanna';
  changeStatus:boolean=true;
  
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.changeStatus = true;
  }

  changeToHome() {
    this.changeStatus = false
    this.router.navigate(['/addgoud']); // Fix: Use 'navigate' instead of 'navigateTo'
  }
  changeToSearch() {
    this.changeStatus = true;
    this.router.navigate(['/']); // Fix: Use 'navigate' instead of 'navigateTo'
  }  

}
