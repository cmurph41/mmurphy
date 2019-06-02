import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-project-template-3',
  templateUrl: './project-template-3.component.html',
  styleUrls: ['./project-template-3.component.css']
})
export class ProjectTemplate3Component implements OnInit, AfterViewInit {

  content : any = new Map();
  $content: Observable<any>;
  contentSub: Subscription;
  
  @Input()
  id;
  loaded = false;

  constructor(private contentService: ContentService) { 
    
   }

  ngOnInit() { 
    
    this.setUpSub();
  }
  public setUpSub(){
    this.$content = this.contentService.getCurrentContentMapEmitter();
    this.contentSub = this.$content.subscribe( (data: any) => { 
      
      this.content = data.get(this.id);
      
      this.loaded = true;
    } );
  }

  ngAfterViewInit() { 

  }

  ngOnDestroy(){     
    this.contentSub.unsubscribe;

  }



}
