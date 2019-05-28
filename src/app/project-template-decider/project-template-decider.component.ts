import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-project-template-decider',
  templateUrl: './project-template-decider.component.html',
  styleUrls: ['./project-template-decider.component.css']
})
export class ProjectTemplateDeciderComponent implements OnInit, AfterViewInit {

  content : any = new Map();
  $content: Observable<any>;
  contentSub: Subscription;

  id;
  loaded = false;

  constructor(private route: ActivatedRoute, private contentService: ContentService) { 
    
   }

  ngOnInit() { 
    
    this.id = this.route.snapshot.paramMap.get('id');
    this.setUpSub();
    // this.content = this.contentService.getContentById(id);
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
