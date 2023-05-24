import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from 'src/services/movie.service';
import { BookingService } from 'src/services/booking.service';
import { Observable } from 'rxjs';
import { RadioButtonsComponent } from '../radio-buttons/radio-buttons.component';
import { Movie } from 'src/models/movie';
import { TicketsService } from 'src/services/tickets.service';
import { Booking } from 'src/models/booking';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit{

    movie!: Observable<Movie | undefined>;
    todayDate: Date = new Date();
    showModal: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService,
        private bookingService: BookingService,
        private ticketsService: TicketsService
    ) {}

    ngOnInit(): void {
        const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        // this.http.get<Movie[]>('assets/movies.json').subscribe(movies => {
        //     this.movie = movies.find(movie => movie.id === id);
        // });

        this.movie = this.movieService.getMovie(id);
        // this.movie.subscribe(movie => console.log(movie));
    }

    convertToDate(dateString: string): Date {
        return new Date(dateString);
    }

    showAlert() {
      this.showModal = true;
    }

    hideModal() {
      this.showModal = false;
    }

    bookTickets(): void {
      this.movie.subscribe((movie: Movie | undefined) => {
        if (movie) {
          const totalPrice = 250 * this.ticketsService.selectedNumber;

          const bookingData = {
            id: movie.id,
            title: movie.title,
            totalPrice: totalPrice,
            totalSeats: this.ticketsService.selectedNumber
          };

          this.bookingService.checkIfBookingExists(movie.id).subscribe((existingBooking: Booking | undefined) => {
            if (existingBooking) {
              alert('Booking already exists for this movie!');
            } else {
              this.bookingService.storeBooking(bookingData).subscribe(() => {
                console.log('Booking data stored successfully!');
              });
            }
          });

          this.hideModal();
        }
      });
    }
}
