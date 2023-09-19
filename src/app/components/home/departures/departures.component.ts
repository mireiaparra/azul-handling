import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { SharedService } from 'src/app/core/shared.service';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss']
})
export class DeparturesComponent {
  public flights: any[] = [];
  public filteredFlights: any[] = [];
  receivedValue = '';

  constructor(private _apiService: ApiService, private _communicationService: SharedService) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
        this.filteredFlights = data.data
      },
    });
     this._communicationService.inputValue$.subscribe((value) => {
      this.receivedValue = value;
      this.filterFlights(value);
    });
  }

  public filterFlights(param: string) {
    this.filteredFlights = this.flights.filter(flight => flight.flight_iata.toLowerCase().trim().includes(param.toLowerCase().trim()) || flight.flight.dep_iata.toLowerCase().trim().includes(param.toLowerCase().trim()));
  }
}
