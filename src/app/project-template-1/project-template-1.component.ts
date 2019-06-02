import { Component, OnInit, Input, AfterViewInit, OnChanges, OnDestroy, HostListener } from '@angular/core';
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

  desktopImageSource = [] ;
  mobileImageSource = [] ;
  imageSource = [] ;
  innerWidth: any;

  @Input()
  id;
  loaded = false;

  constructor(private route: ActivatedRoute, private contentService: ContentService) { 
    
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
      this.desktopImageSource[3] = this.content.section3.image; 
      this.mobileImageSource[3] = this.content.section3.mobileImg;   

      this.innerWidth = window.innerWidth;
      this.setImgSrc(); 

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
