import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-project-template-2',
  templateUrl: './project-template-2.component.html',
  styleUrls: ['./project-template-2.component.css']
})
export class ProjectTemplate2Component implements OnInit, AfterViewInit {

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
