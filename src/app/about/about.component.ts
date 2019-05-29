import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  content : any = new Map();
  $content: Observable<any>;
  contentSub: Subscription;

  id;
  loaded = false;

  constructor(private route: ActivatedRoute, private contentService: ContentService) { 
    
   }

  ngOnInit() { 
    
    this.id = 'about';
    this.setUpSub();
  }
  public setUpSub(){
    this.$content = this.contentService.getAboutMapEmitter();
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
