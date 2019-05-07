import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  content : any = new Map();
  $content: Observable<any>;
  contentSub: Subscription;
  welfare;
  constructor(private contentService: ContentService)  {
   
  }

  ngOnInit() {
    this.setUpSub();
  }

  public setUpSub(){
    this.$content = this.contentService.getCurrentContentMapEmitter();
    this.contentSub = this.$content.subscribe( (data: any) => { 
      this.content = data;
    } );
  }

  ngOnChanges(){
    
  }

  ngOnDestroy(){
    this.contentSub.unsubscribe;
  }
  getKeys(){ 
    return Array.from(this.contentService.getContent().keys());
  }

}
