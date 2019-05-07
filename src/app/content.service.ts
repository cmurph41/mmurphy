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
  public $currentContentMap: Observable<any>

  contentInitialised = false;

  constructor( private httpClient: HttpClient) { 
    this.contentBehaviourSub = new BehaviorSubject<any> (this.content);
    this.$currentContentMap = this.contentBehaviourSub.asObservable();

    this.initContent();
  }
  public getCurrentContentMapEmitter() : Observable<any>{
    return this.$currentContentMap;
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

}
