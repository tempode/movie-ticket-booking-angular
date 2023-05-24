import { Component, EventEmitter, Output } from '@angular/core';
import { TicketsService } from 'src/services/tickets.service';

@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.css']
})
export class RadioButtonsComponent {
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7];
  selectedNumber: number = 1;

  constructor(private ticketsService: TicketsService) {}

  selectNumber(option: number) {
    this.ticketsService.selectedNumber = option;
  }
}
