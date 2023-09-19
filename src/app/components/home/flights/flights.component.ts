import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  public flights: any[] = [];

  constructor(private _apiService: ApiService, private socketService: SocketService) {
    // this._apiService.getFlights().subscribe({
    //   next: (data) => {
    //     this.flights = data.data;
    //   },
    // });
  }

  ngOnInit(): void {
    this.socketService.connect();

    this.socketService.on('initialData', (data: any[]) => {
      this.flights = data;
    });

    this.socketService.on('dataUpdated', (data: any[]) => {
      this.flights = data;
    });
  }
}
