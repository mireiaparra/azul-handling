import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }


  public getFlights(): Observable<{data: any}> {
    return of(
    { data: [{
        "airline_iata": "BA",
        "airline_icao": "BAW",
        "flight_iata": "BA6984",
        "flight_icao": "BAW6984",
        "flight_number": "6984",
        "cs_airline_iata": "AA",
        "cs_flight_number": "2421",
        "cs_flight_iata": "AA2421",
        "dep_iata": "MIA",
        "dep_icao": "KMIA",
        "dep_terminal": "C",
        "dep_gate": "E4",
        "dep_time": "2021-07-14 19:53",
        "dep_time_ts": 1626306780,
        "dep_time_utc": "2021-07-14 23:53",
        "dep_estimated": "2021-07-14 22:10",
        "dep_estimated_ts": 1626315000,
        "dep_estimated_utc": "2021-07-15 02:10",
        "dep_actual": "2021-07-14 22:10",
        "dep_actual_ts": 1626315000,
        "dep_actual_utc": "2021-07-15 02:10",
        "arr_iata": "SFO",
        "arr_icao": "KSFO",
        "arr_terminal": "1",
        "arr_gate": "B24",
        "arr_baggage": "1",
        "arr_time": "2021-07-14 22:52",
        "arr_time_ts": 1626328320,
        "arr_time_utc": "2021-07-15 05:52",
        "arr_estimated": "2021-07-15 01:09",
        "arr_estimated_ts": 1626336540,
        "arr_estimated_utc": "2021-07-15 08:09",
        "arr_actual": "2021-07-15 01:09",
        "arr_actual_ts": 1626336540,
        "arr_actual_utc": "2021-07-15 08:09",
        "status": "scheduled",
        "duration": 359,
        "delayed": 137,
        "dep_delayed": 137,
        "arr_delayed": 137
      }]}
    )
      // return this._http.get<{data:  any}>('https://airlabs.co/api/v9/flights?flag=ES&api_key=f2b540bf-e0de-403b-8560-22f45de02a75')
    
    // return this._http.get<{data:  any}>('https://airlabs.co/api/v9/schedules&api_key=f2b540bf-e0de-403b-8560-22f45de02a75')
  }

  public getAirports():Observable<{data: any}> {
    return of(
      {
        data: [{
          "name": "Paris Charles de Gaulle Airport",
          "iata_code": "CDG",
          "icao_code": "LFPG",
          "lat": 49.009592,
          "lng": 2.555675,
          "alt": 392,
          "city": "Paris",
          "city_code": "PAR",
          "un_locode": "FRCDG",
          "timezone": "Europe/Paris",
          "country_code": "FR",
          "phone": "+33170363950",
          "website": "http://www.aeroportsdeparis.fr/",
          "facebook": "facebook.com/parisaeroport",
          "instagram": "instagram.com/parisaeroport/",
          "linkedin": "linkedin.com/company/groupe-adp",
          "twitter": "twitter.com/parisaeroport",
          "names": {
            "no": "Charles de Gaulle internasjonale lufthavn",
            "de": "Flughafen Paris-Charles-de-Gaulle",
            "hi": "चार्ल्स डि गॉल विमानक्षेत्र",
            "ln": "Libándá lya Ndáko ya mpɛ́pɔ Paris-Charles-de-Gaulle",
            "ru": "Париж — Шарль-де-Голль",
            "fi": "Charles de Gaullen kansainvälinen lentoasema",
            "pt": "Aeroporto de Paris-Charles de Gaulle",
            "jv": "Bandhar Udhara Paris-Charles de Gaulle",
            "fr": "Aéroport Paris–Charles de Gaulle",
            "hu": "Párizs-Charles de Gaulle repülőtér",
            "wuu": "巴黎夏尔·戴高乐机场",
            "uk": "Міжнародний аеропорт імені Шарля де Голля",
            "sk": "Letisko Charlesa de Gaulla",
            "id": "Bandar Udara Paris-Charles de Gaulle",
            "mk": "Аеродром Париз-Шарл де Гол",
            "sv": "Paris-Charles de Gaulle-flygplatsen",
            "ko": "파리 샤를 드 골 공항",
            "pnb": "پیرس چارلس ڈیگال ہوائی اڈہ",
            "mr": "चार्ल्स दि गॉल आंतरराष्ट्रीय विमानतळ",
            "el": "Διεθνές Αεροδρόμιο Παρισιού Σαρλ ντε Γκωλ",
            "en": "Paris Charles de Gaulle Airport",
            "is": "Paris-Charles de Gaulle-flugvöllur",
            "it": "Aeroporto di Parigi Charles de Gaulle",
            "ta": "சார்லசு டிகால் வானூர்தி நிலையம்",
            "es": "Aeropuerto de París - Charles de Gaulle",
            "cs": "Letiště Charlese de Gaulla",
            "ar": "مطار باريس شارل دو غول الدولي",
            "vi": "Sân bay quốc tế Charles-de-Gaulle",
            "th": "ท่าอากาศยานนานาชาติปารีส-ชาร์ล เดอ โกล",
            "ja": "シャルル・ド・ゴール国際空港",
            "fa": "فرودگاه پاری-شارل-دو-گل",
            "pl": "Port lotniczy Paryż-Roissy-Charles de Gaulle",
            "ro": "Aeroportul Internațional Charles de Gaulle",
            "he": "נמל התעופה שארל דה גול",
            "tr": "Paris-Charles de Gaulle Havalimanı",
            "nl": "Luchthaven Parijs-Charles de Gaulle"
          },
          "runways": 8,
          "departures": 186292,
          "connections": 411,
          "is_major": false,
          "is_international": 1,
          "slug": "charles-gaulle-cdg-lfpg-fr"
        }]
      }
    ) 
  }
}
