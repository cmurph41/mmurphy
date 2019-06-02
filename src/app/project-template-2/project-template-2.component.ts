import { Component, OnInit, Input, AfterViewInit, OnChanges, HostListener } from '@angular/core';
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

  desktopImageSource = [] ;
  mobileImageSource = [] ;
  imageSource = [] ;
  innerWidth: any;
  
  @Input()
  id;
  loaded = false;

  constructor(private contentService: ContentService) { 
    
   }

  ngOnInit() { 
    
    this.setUpSub();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.setImgSrc();     
  }

  setImgSrc () {
    if(this.innerWidth > 660) {
      this.imageSource = this.desktopImageSource;
    }
    else {
      this.imageSource = this.mobileImageSource;
    }
  }

  getimageSrc(index) {
    return this.innerWidth > 660 ? this.desktopImageSource : this.mobileImageSource;
  }
  public setUpSub(){
    this.$content = this.contentService.getCurrentContentMapEmitter();
    this.contentSub = this.$content.subscribe( (data: any) => { 
      
      this.content = data.get(this.id);
      
      this.desktopImageSource[1] = this.content.section1.image; 
      this.mobileImageSource[1] = this.content.section1.mobileImg;    
      this.desktopImageSource[2] = this.content.section2.image; 
      this.mobileImageSource[2] = this.content.section2.mobileImg;   

      this.innerWidth = window.innerWidth;
      this.setImgSrc(); 
      this.loaded = true;
    } );
  }

  ngAfterViewInit() { 

  }

  ngOnDestroy(){     
    this.contentSub.unsubscribe;

  }



}
