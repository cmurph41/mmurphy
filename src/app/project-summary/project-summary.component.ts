import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-project-summary',
  templateUrl: './project-summary.component.html',
  styleUrls: ['./project-summary.component.css']
})
export class ProjectSummaryComponent implements OnInit, AfterViewInit {

  @Input()
  id;

  @Input()
  content;

  load = false;
  
  constructor() { 
    
   }

  ngOnInit() { 
    console.log("on init"); 
    
  }

  ngAfterViewInit() { 
    if(this.content.img){
      this.load = true;
    }

  }

  ngOnDestroy(){     
    console.log("on destroy");

  }


}
