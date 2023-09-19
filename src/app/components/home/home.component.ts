import { Component } from '@angular/core';
import { SocketService } from 'src/app/core/socket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public newFlights: any[] = [];

  constructor(private _socketService: SocketService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this._socketService.on('newFlight', (newFlight: any) => {
      this.newFlights.push(newFlight);
      this._showSnackBar();
    });
  }

  private _showSnackBar(): void {
    const message = 'New flights detected';
    const action = 'Close';

    const snackBarRef = this._snackBar.openFromComponent(SnackbarComponent, {
      data: {
        icon: 'warning',
        flights: this.newFlights,
      },
      duration: 5000,
      panelClass: ['mat-toolbar', 'mat-primary'],
    });

    snackBarRef.afterDismissed().subscribe(() => {
    this.newFlights = [];
    });
  }
}
