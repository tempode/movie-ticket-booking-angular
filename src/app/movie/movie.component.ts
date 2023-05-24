import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="movie" (click)="goToMovieDescription(movie.id)">
        <img src={{movie.posterUrl}} alt="movie-poster">
        <h4>{{movie.title}}</h4>
    </div>
  `,
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{
    @Input() movie: any;

    constructor(
      private router: Router,
      private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {}

    goToMovieDescription(moveId: number) {
        this.router.navigate(['/movies', moveId]);
        this.cdr.detectChanges();
    }
}
