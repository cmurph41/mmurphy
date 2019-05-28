import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterViewInit {

  elementPosition: any;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  handleClick ($event) {
    
    $event.target.blur();
  }

  
}
