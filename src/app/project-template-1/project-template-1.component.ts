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

  maxHeightWithMargin = 0;

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
      
      this.content.section1.maxheightWithMargin += this.getHeightFromStrng(this.content.section1.maxHeight);
      this.content.section1.maxheightWithMargin += this.getHeightFromStrng(this.content.section1.marginTop) ;
      this.content.section1.maxheightWithMargin += this.getHeightFromStrng(this.content.section1.marginBottom );

      this.content.section2.maxheightWithMargin += this.getHeightFromStrng(this.content.section2.maxHeight);
      this.content.section2.maxheightWithMargin += this.getHeightFromStrng(this.content.section2.marginTop) ;
      this.content.section2.maxheightWithMargin += this.getHeightFromStrng(this.content.section2.marginBottom );

      this.content.section3.maxheightWithMargin += this.getHeightFromStrng(this.content.section3.maxHeight);
      this.content.section3.maxheightWithMargin += this.getHeightFromStrng(this.content.section3.marginTop) ;
      this.content.section3.maxheightWithMargin += this.getHeightFromStrng(this.content.section3.marginBottom );

      this.innerWidth = window.innerWidth;
      this.setImgSrc(); 

      this.loaded = true;

    } );
  }
  getHeightFromStrng (strWithPx) {
    let index = strWithPx.indexOf('px');
    let num = Number(strWithPx.slice(0,index));
    return num;

  }

  ngAfterViewInit() { 
    this.contentSub.unsubscribe;


  }

  ngOnDestroy(){     
    this.contentSub.unsubscribe;

  }


}
