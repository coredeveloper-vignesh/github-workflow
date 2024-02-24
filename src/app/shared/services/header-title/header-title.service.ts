import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderTitleService {
  private subHeaderTitle$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  get getSubHeaderTitle() {
    return this.subHeaderTitle$.asObservable();
  }
  setSubHeaderTitle(title: string) {
    this.subHeaderTitle$.next(title);
  }
}
