import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Movie } from 'src/models/movie';
import { MovieService } from 'src/services/movie.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit{
    movies$!: Observable<Movie[]>;
    private searchTerms = new Subject<string>();

    constructor(private movieService: MovieService) {}

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.movies$ = this.searchTerms.pipe(

            debounceTime(300),

            distinctUntilChanged(),

            switchMap((term: string) => this.movieService.searchMovies(term)),
        )
    }
}
