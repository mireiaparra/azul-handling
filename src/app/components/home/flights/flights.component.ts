import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  public flights: any[] = [];

  constructor(private _apiService: ApiService) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
      },
    });
  }
}
