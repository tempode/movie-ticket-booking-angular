import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl = 'http://localhost:3000/bookings'; // API endpoint for bookings
  private getBookingsUrl = 'mock-server/db.json';
  constructor(private http: HttpClient) {}

  storeBooking(booking: Booking): Observable<any> {
    return this.http.post<Booking>(this.bookingsUrl, booking).pipe(
      tap(() => {
        console.log('Booking data stored successfully!');
      })
    );
  }

  checkIfBookingExists(id: number): Observable<Booking | undefined> {
    return this.http.get<Booking[]>(this.bookingsUrl + `?id=${id}`).pipe(
      map(bookings => bookings.length > 0 ? bookings[0] : undefined)
    );
  }

  fetchBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }

  deleteBooking(id: number): Observable<any> {
    const url = `${this.bookingsUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {
        console.log(`Booking with id ${id} deleted successfully!`);
      })
    );
  }
}
