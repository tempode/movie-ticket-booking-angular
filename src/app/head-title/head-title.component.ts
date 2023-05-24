import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-head-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="movies-page-header">
        <h2>//</h2>
        <h1>{{title}}</h1>
    </div>
  `,
  styleUrls: ['./head-title.component.css']
})
export class HeadTitleComponent {
    @Input() title!: string;
}
