import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  private getIframeData$ = new BehaviorSubject<string | any>(undefined);

  constructor() {}

  get getIframeData() {
    return this.getIframeData$.asObservable();
  }

  sendIframeData(body: any) {
    this.getIframeData$.next(body);
  }
}
