import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

    private baseUrl = 'http://localhost:3000'; 
  constructor(private _http: HttpClient) { }


  public getFlights(): Observable<{data: any}> {
    return this._http.get(`${this.baseUrl}/flights`);
  }

}

