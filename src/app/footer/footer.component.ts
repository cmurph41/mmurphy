import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  content : any = new Map();
  $content: Observable<any>;
  contentSub: Subscription;

  previousProjectId;
  nextProjectId;
  isProjectPage: boolean;

  windowScrolled: boolean;
  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, private contentService: ContentService) {

   }
   ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
        if(id){
          this.isProjectPage = true;
          this.setUpSub(id);
        }
        
   }
   public setUpSub(id){
    this.$content = this.contentService.getCurrentContentMapEmitter();
    this.contentSub = this.$content.subscribe( (data: any) => { 
      let arraySize = data.size;
      let index = data.get(id).index;
      data.forEach( item => {
        if (item.index == index + 1)
        {
          this.nextProjectId = item.name;
        } else if (index == arraySize && item.index == 1) {
          this.nextProjectId = item.name;
        } else if (item.index == index - 1) {
          this.previousProjectId = item.name;
        } else if (index == 1 && item.index == arraySize) {
          this.previousProjectId = item.name;
        }
        
      });
    } );
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    }
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop
        || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 25));
      }
    })();
  }

  ngOnDestroy(){
    if(this.contentSub) {
      this.contentSub.unsubscribe;
    }     
    

  }


}
