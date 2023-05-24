import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/models/booking';
import { BookingService } from 'src/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit{
    bookings$!: Observable<Booking[]>;
    totalBookings: number = 0;
    totalBookingPrice: number = 0;

    constructor (private bookingService: BookingService) {}

    ngOnInit(): void {
        this.getBookings();
    }

    getBookings() {
        this.bookings$ = this.bookingService.fetchBookings();
        this.calculateMaxTotal();
    }

    calculateMaxTotal() {
      this.bookings$.subscribe(bookings => {
        this.totalBookings = bookings.length;
        this.totalBookingPrice = bookings.reduce((total, booking) => total + booking.totalPrice, 0);
      });
    }

    deleteBooking(id: number) {
      this.bookingService.deleteBooking(id).subscribe(() => {
        console.log(`Booking with id ${id} deleted successfully!`);
        this.getBookings(); // Refresh the bookings after deletion
      });
    }
}
