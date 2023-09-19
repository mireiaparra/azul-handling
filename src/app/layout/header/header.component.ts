import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from 'src/app/core/api.service';
import { DbService } from 'src/app/core/db.service';
import { FiltersService } from 'src/app/core/filters.service';
import { SharedService } from 'src/app/core/shared.service';
import { SocketService } from 'src/app/core/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  
  public flights: any[] = [];
  public airports: any[] = [];
  public selectedDate: Date;

   inputValue = '';


  constructor(
    private _socketService: SocketService,
    private _filtersService: FiltersService,
    private _communicationService: SharedService
  ) {
    this._socketService.on('initialData', (data: any[]) => {
      this.flights = data;
      this.airports = Array.from(new Set(this.flights.map((flight) => flight.dep_iata)));
    });

    this.selectedDate = new Date();
  }

  public onAirportFilterChange(event: MatSelectChange) {
    const airportCode = event.value;
    this._filtersService.setAirportFilter(airportCode);
  }

  public onDateSelected() {
    this._filtersService.setDateFilter(this.selectedDate);
  }

  public setToday() {
    this.selectedDate = new Date();
    this._filtersService.setDateFilter(this.selectedDate);
  }

  onEnter(event: Event) {
      this._communicationService.setInputValue(this.inputValue);
    
  }
}
