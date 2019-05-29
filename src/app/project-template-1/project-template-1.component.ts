import { Component, OnInit, Input, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-project-template-1',
  templateUrl: './project-template-1.component.html',
  styleUrls: ['./project-template-1.component.css']
})
export class ProjectTemplate1Component implements OnInit, AfterViewInit, OnDestroy {

  content : any = new Map();
  $content: Observable<any>;
  contentSub: Subscription;
  
  @Input()
  id;
  loaded = false;

  constructor(private route: ActivatedRoute, private contentService: ContentService) { 
    
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
    this.contentSub.unsubscribe;


  }

  ngOnDestroy(){     
    this.contentSub.unsubscribe;

  }


}
