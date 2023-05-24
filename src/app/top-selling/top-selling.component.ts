import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit{
    public topSellingMovie: any;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.http.get<any>('assets/movies.json').subscribe(data => {
        this.topSellingMovie = data.reduce((prev: { totalBookings: number; }, current: { totalBookings: number; }) => {
            return (prev.totalBookings > current.totalBookings) ? prev : current;
        });
        this.topSellingMovie.posterUrl = this.topSellingMovie.url;
        });
    }

    goToMovieDescription(moveId: number) {
        this.router.navigate(['/movies', moveId]);
    }
}
