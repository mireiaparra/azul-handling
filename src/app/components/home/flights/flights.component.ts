import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { DbService } from 'src/app/core/db.service';
import { FiltersService } from 'src/app/core/filters.service';
import { SocketService } from 'src/app/core/socket.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  public flights: any[] = [];

  constructor(
    private _apiService: ApiService,
    private socketService: SocketService,
    private _filtersService: FiltersService,
    private _dbService: DbService
  ) {
    // this._apiService.getFlights().subscribe({
    //   next: (data) => {
    //     this.flights = data.data;
    //   },
    // });
  }

  ngOnInit(): void {
    this.socketService.on('initialData', (data: any[]) => {
      this.flights = data;
    });

    this.socketService.on('dataUpdated', (data: any[]) => {
      this.flights = data;
    });

    this._filtersService.airportFilter$.subscribe((airportCode) => {
      this.getFlightsByAirport(airportCode);
    });

    this._filtersService.dateFilter$.subscribe((date) => {
      this.getFlightsByDate(date);
    });
  }

  public getFlightsByAirport(airportCode: string): void {
    this._dbService.getFlightsByAirport(airportCode).subscribe({
      next: (data) => {
        this.flights = data;
      },
    });
  }

  public getFlightsByDate(date: Date): void {
    this._dbService.getFlightsByDate(date).subscribe({
      next: (data) => {
        this.flights = data;
      },
    });
  }
}
