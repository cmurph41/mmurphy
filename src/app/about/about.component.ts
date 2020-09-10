import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Location } from '@angular/common';


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
  applicationsUrl = '';

  constructor(private location: Location, private route: ActivatedRoute, private contentService: ContentService, private http: HttpClient) { 
  
   }
   goBack() {
     this.location.back();
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
  
  downloadFile(){ 
    let headers = new HttpHeaders({'Accept':'application/pdf'});
    
    return this.http.get('../../assets/CV_Mairead_Murphy_2019.pdf',
     {headers: headers, responseType:'blob'}).subscribe((data)=>{
       
       let blob = new Blob([data], {type:'application/pdf'});
       saveAs(blob, "CV_Mairead_Murphy.pdf");

     });
    }
}
