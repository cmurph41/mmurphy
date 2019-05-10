import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.css']
})
export class ContentTileComponent implements OnInit, AfterViewInit {

  @Input()
  id;

  @Input()
  content;

  load = false;

  constructor() {
    
   }
//    return Array.from(this.contentService.getContent().keys());

  ngOnInit() {
    console.log("on init");

  }

  ngAfterViewInit() { 
    if(this.content.img){
      this.load = true;
    }
    // this.setBackgroundImage();

  }

  getUrl(){
    return "url('" + this.content.img + "')";
  }

  ngOnDestroy(){     
    console.log("on destroy");

  }

  setBackgroundImage():any{ 
    console.log("background image");
    document.getElementById(""+this.id+"").style.backgroundImage 
      = "url(" +this.content.img+")"; 
  }

}
