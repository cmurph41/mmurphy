import { EventEmitter, Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Accepts': 'application/json',
    'Content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private content: any = new Map();
  public contentBehaviourSub: BehaviorSubject<any>;
  public $currentContentMap: Observable<any>;

  private about: any = new Map();
  public aboutBehaviourSub: BehaviorSubject<any>;
  public $currentAboutMap: Observable<any>;

  contentInitialised = false;

  constructor( private httpClient: HttpClient) { 
    this.contentBehaviourSub = new BehaviorSubject<any> (this.content);
    this.$currentContentMap = this.contentBehaviourSub.asObservable();
    this.aboutBehaviourSub = new BehaviorSubject<any> (this.about);
    this.$currentAboutMap = this.aboutBehaviourSub.asObservable();
    this.initContent();
    this.initAbout();
  }
  public getCurrentContentMapEmitter() : Observable<any>{ 
    return this.$currentContentMap;
  }
  public getAboutMapEmitter() : Observable<any>{ 
    return this.$currentAboutMap;
  }

  public initContent(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('../assets/content.json', httpOptions)
      .toPromise()
      .then((initData: any) => { 
        this.contentInitialised = true;
        for(let tile of initData) {
          this.content.set(tile.name, tile);
        }
        resolve();
      });
      
    });

  }

  public initAbout(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('../assets/about.json', httpOptions)
      .toPromise()
      .then((initData: any) => { 
        for(let tile of initData) {
          this.about.set(tile.name, tile);
        }
        resolve();
      });
      
    });

  }

  public getContent(){
    if (this.contentInitialised) {
      return this.content;
    }
    else { 
      this.initContent().then(()=>{ 
        return this.content;
      })
    } 
    
  }
  public getContentById (id) { 
    let result = this.content.get(id);
    return result;

  }

}
