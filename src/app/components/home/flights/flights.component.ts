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
  public updatedFlightId: string | null = null;

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

    this.socketService.on('dataUpdated', (data: any) => {
      const method = data.method;
      if (method === 'PUT') {
        this.updatedFlightId = data.newFlight.reg_number;
        setTimeout(() => {
          this.updatedFlightId = null;
        }, 2000);
      }
      const flightExistIndex = this.flights.findIndex(
        (flight) => flight.reg_number === this.updatedFlightId
      );
      if (flightExistIndex !== -1) {
        this.flights.splice(flightExistIndex, 1, data.newFlight);
      } else {
        this.flights.push(data.newFlight);
      }
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
    const formattedDate = date.toISOString().slice(0, 10);
    this._dbService.getFlightsByDate(formattedDate).subscribe({
      next: (data) => {
        this.flights = data;
      },
    });
  }
}
