// communication.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private inputValueSubject = new BehaviorSubject<string>('');
  inputValue$ = this.inputValueSubject.asObservable();

  setInputValue(value: string) {
    this.inputValueSubject.next(value);
  }
}
