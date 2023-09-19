import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from 'src/app/core/api.service';
import { FiltersService } from 'src/app/core/filters.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public flights: any[] = [];
  public airports: any[] = [];
  public selectedDate: Date;

  constructor(private _apiService: ApiService, private _filtersService: FiltersService) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
      },
    });

    this._apiService.getAirports().subscribe({
      next: (data) => {
        this.airports = data.data;
      },
    });

    this.selectedDate = new Date();
  }

  onAirportFilterChange(event: MatSelectChange) {
    const airportCode = event.value;
    this._filtersService.setAirportFilter(airportCode);
  }

  onDateSelected() {
    this._filtersService.setDateFilter(this.selectedDate);
  }

}
