import { Component, OnInit, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';
import { KeyValue } from '@angular/common';

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
  desktopImageSource = [];
  mobileImageSource = [];
  imageSource = [];

  maxHeightWithMargin = 0;

  innerWidth: any;

  constructor(private contentService: ContentService)  {
   
  }

  ngOnInit() {
    this.setUpSub(); 
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.setImgSrc();     
  }

  setMaxHeightWithMargin () {


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
    return this.innerWidth > 660 ? this.desktopImageSource[index-1] : this.mobileImageSource[index-1];
  }

  public setUpSub(){
    this.$content = this.contentService.getCurrentContentMapEmitter();
    this.contentSub = this.$content.subscribe( (data: any) => { 
      
      this.content = data;

      data.forEach( item => {
        this.desktopImageSource[item.index-1] = item.img; 
        this.mobileImageSource[item.index-1] = item.mobileImg;    
      }); 

      this.content.forEach( item => {
        item.maxWithMargin += this.getHeightFromStrng( item.maxHeight);
        item.maxWithMargin += this.getHeightFromStrng( item.marginBottom);
        item.maxWithMargin += this.getHeightFromStrng( item.marginTop);
      });

      this.innerWidth = window.innerWidth;
      this.setImgSrc(); 
     
    } );
  }

  getHeightFromStrng (strWithPx) {
    let index = strWithPx.indexOf('px');
    let num = Number(strWithPx.slice(0,index));
    return num;

  }

  ngOnChanges(){
    
  }

  ngOnDestroy(){
    this.contentSub.unsubscribe;
  }

  indexOrderAsc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
    const a = akv.value.index;
    const b = bkv.value.index;

    return a > b ? 1 : (b > a ? -1 : 0);
};

}
