import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss']
})
export class DeparturesComponent {
  public flights: any[] = [];

  constructor(private _apiService: ApiService) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
      },
    });
  }
}
