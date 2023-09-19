import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

@Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();

public closeNav(){
  this.close.emit(true);
}
}
