import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { SharedService } from 'src/app/core/shared.service';

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.scss'],
})
export class ArrivalsComponent {
  public flights: any[] = [];
  public filteredFlights: any[] = [];
  receivedValue = '';

  constructor(
    private _apiService: ApiService,
    private _communicationService: SharedService
  ) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
        this.filteredFlights = data.data;
      },
    });
    this._communicationService.inputValue$.subscribe((value) => {
      this.receivedValue = value;
      this._filterFlights(value);
    });
  }

  private _filterFlights(param: string) {
    this.filteredFlights = this.flights.filter((flight) => {
      return (
        flight.flight_iata
          .toLowerCase()
          .trim()
          .includes(param.toLowerCase().trim()) ||
        flight.arr_iata
          .toLowerCase()
          .trim()
          .includes(param.toLowerCase().trim())
      );
    });
  }
}
