import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private baseUrl = 'http://vps-5df88ab9.vps.ovh.net:3000'; 
  constructor(private _http: HttpClient) { }


  public getFlights(): Observable<Object> {
    return this._http.get(`${this.baseUrl}/flights`);
  }

  public getFlightsByAirport(airportCode: string): Observable<any[]> {
    const url = `${this.baseUrl}/flightsByAirport/${airportCode}`;
    return this._http.get<any[]>(url);
  }


  public getFlightsByDate(date: string): Observable<any[]> {
    const url = `${this.baseUrl}/flightsByDate/${date}`;
    return this._http.get<any[]>(url);
  }

}

