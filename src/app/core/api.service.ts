import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }


  public getFlights(): Observable<{data: any}> {
    // return of(
    // { data: [{
    //     "airline_iata": "BA",
    //     "airline_icao": "BAW",
    //     "flight_iata": "BA6984",
    //     "flight_icao": "BAW6984",
    //     "flight_number": "6984",
    //     "cs_airline_iata": "AA",
    //     "cs_flight_number": "2421",
    //     "cs_flight_iata": "AA2421",
    //     "dep_iata": "MIA",
    //     "dep_icao": "KMIA",
    //     "dep_terminal": "C",
    //     "dep_gate": "E4",
    //     "dep_time": "2021-07-14 19:53",
    //     "dep_time_ts": 1626306780,
    //     "dep_time_utc": "2021-07-14 23:53",
    //     "dep_estimated": "2021-07-14 22:10",
    //     "dep_estimated_ts": 1626315000,
    //     "dep_estimated_utc": "2021-07-15 02:10",
    //     "dep_actual": "2021-07-14 22:10",
    //     "dep_actual_ts": 1626315000,
    //     "dep_actual_utc": "2021-07-15 02:10",
    //     "arr_iata": "SFO",
    //     "arr_icao": "KSFO",
    //     "arr_terminal": "1",
    //     "arr_gate": "B24",
    //     "arr_baggage": "1",
    //     "arr_time": "2021-07-14 22:52",
    //     "arr_time_ts": 1626328320,
    //     "arr_time_utc": "2021-07-15 05:52",
    //     "arr_estimated": "2021-07-15 01:09",
    //     "arr_estimated_ts": 1626336540,
    //     "arr_estimated_utc": "2021-07-15 08:09",
    //     "arr_actual": "2021-07-15 01:09",
    //     "arr_actual_ts": 1626336540,
    //     "arr_actual_utc": "2021-07-15 08:09",
    //     "status": "scheduled",
    //     "duration": 359,
    //     "delayed": 137,
    //     "dep_delayed": 137,
    //     "arr_delayed": 137
    //   }]}
    // )
    
    return this._http.get<{response:  any}>('https://airlabs.co/api/v9/schedules?dep_iata=SVQ&api_key=f2b540bf-e0de-403b-8560-22f45de02a75')
    .pipe(
      map((data) => {
        return {
          data: data.response,
        };
      })
    );
  }

}
