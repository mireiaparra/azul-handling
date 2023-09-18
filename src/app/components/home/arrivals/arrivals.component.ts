import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.scss']
})
export class ArrivalsComponent {
  public flights: any[] = [];

  constructor(private _apiService: ApiService) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
      },
    });
  }
}
