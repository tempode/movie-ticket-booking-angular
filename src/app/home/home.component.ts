import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/models/movie';
import { MovieService } from 'src/services/movie.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
    topSellingMovies$!: Observable<Movie[]>;

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.fetchTopSellingMovies();
    }

    fetchTopSellingMovies() {
        this.topSellingMovies$ = this.movieService.getTopSellingMovies();
    }
}
