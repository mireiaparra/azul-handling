import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public flights: any[] = [];

  constructor(private _apiService: ApiService) {
    this._apiService.getFlights().subscribe({
      next: (data) => {
        this.flights = data.data;
      },
    });
  }
}
