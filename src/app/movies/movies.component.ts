import { Component, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';

import { Movie } from 'src/models/movie';
import { MovieService } from 'src/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    // public movies: any[] = [];
    movies$!: Observable<Movie[]>;
    isLoading: boolean = true;

    constructor (private movieService: MovieService) {}

    ngOnInit(): void {
        console.log('Movies component init.');
        this.getMovies();
    }

    getMovies(): void {
        this.isLoading = true;

        setTimeout(() => 1000);

        // fetch movies
        this.movies$ = this.movieService.getMovies();

        this.movies$.pipe(
          delay(1000)
        ).subscribe(() => {
          this.isLoading = false;
        })
    }
}
