import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from '../models/movie';

@Injectable({ providedIn: 'root'})
export class MovieService {

    private movieUrl = 'assets/movies.json';

    constructor(private http: HttpClient) {}

    /** GET movies from the server */
    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.movieUrl).pipe(
            tap(_ => console.log('fetched movies')),
            catchError(this.handelError<Movie[]>('getMovies', []))
        );
    }

    getMovie(id: number): Observable<Movie | undefined> {
        // return this.http.get<Movie>(`${this.movieUrl}/${id}`);
        return this.getMovies()
            .pipe(
                map(movies => movies.find(movie => movie.id === id))
            );
    }

    /**
     * Get the movie which contains search term/string/parameter.
     *
     * @param term search paramater
     * @returns list of movies | []
     */
    searchMovies(term: string): Observable<Movie[]> {
        if (!term.trim()) {
            // if not search term, return empty movie array.
            return of([]);
        }

        return this.http.get<Movie[]>(`${this.movieUrl}?title=${term}`).pipe(
            // tap(_ => console.log(`found movies matching "${term}"`)),
            map((movies: Movie[]) => movies.filter(movie => movie.title.toLowerCase().includes(term.toLowerCase()))),
            catchError(this.handelError<Movie[]>('searchMovie', []))
        );
    }

    /**
     * Get the top 4 selling movies (excluding the top 1st movie).
     *
     * @returns list of movies
     */
    getTopSellingMovies(): Observable<Movie[]> {
        return this.getMovies().pipe(
            map(movies => movies.sort((a, b) => b.totalBookings - a.totalBookings)),
            map(sortedMovies => sortedMovies.slice(1, 5))
        );
    }

    /**
     * Handel the Http that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result optionl value to return as the observable result
     * @returns empty result
     */
    private handelError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // Log the error to console
            console.error(error);

            // Error understandable by human
            console.log(`${operation} failed: ${error.message}`);

            // let the app keep runing by returning an empty result.
            return of(result as T);
        }
    }
}
