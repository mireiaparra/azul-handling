import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private _airportFilter = new BehaviorSubject<string>('');
  airportFilter$ = this._airportFilter.asObservable();

  private _dateFilter = new BehaviorSubject<Date>(new Date());
  dateFilter$ = this._dateFilter.asObservable();

  constructor() { }

  public setAirportFilter(airportCode: string) {
    this._airportFilter.next(airportCode);
  }

  public setDateFilter(date: Date) {
    this._dateFilter.next(date);
  }
}
