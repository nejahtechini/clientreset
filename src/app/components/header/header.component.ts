import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
endValueR = false ;
endValueH = false ;
  constructor(private router: Router) {
        }
  ngOnInit() {
  }
    onClickRecherche() {
      this.endValueR = true;
      if (this.endValueH === true) {
        this.endValueH = false ;
      }
    }
    onClickHome() {
      this.endValueH = true;
      if (this.endValueR === true) {
        this.endValueR = false ;
      }
    }
  isDisabledHome(): boolean {
       return  this.endValueH ;
    }
    isDisabledRecherche(): boolean {
      return  this.endValueR ;
   }
  }
