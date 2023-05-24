import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { TicketsService } from 'src/services/tickets.service';

@Component({
    selector: 'app-model',
    templateUrl: './model.component.html',
    styleUrls: ['./model.component.css'],
    animations: [
    trigger('modalAnimation', [
        state('void', style({ transform: 'scale(0)', opacity: 0 })),
        state('*', style({ transform: 'scale(1)', opacity: 1 })),
        transition('void => *', [
            animate('0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'scale(1)', opacity: 1 }))
        ]),
        transition('* => void', [
            animate('0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'scale(0)', opacity: 0 }))
        ])
    ])
    ]
})
export class ModelComponent {
    @Input() showModal: boolean = false;
    @Output() hideModal = new EventEmitter<void>();
    @Output() proceedClicked = new EventEmitter<void>();

    constructor(private ticketsSerive: TicketsService) {}
}
