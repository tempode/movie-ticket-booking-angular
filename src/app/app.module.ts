import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from "./movie/movie.component";
import { MoviesComponent } from './movies/movies.component';
import { HomeComponent } from './home/home.component';
import { DescriptionComponent } from './description/description.component';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { HeadTitleComponent } from "./head-title/head-title.component";
import { ButtonComponent } from "./button/button.component";
import { TopSellingComponent } from './top-selling/top-selling.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ModelComponent } from './model/model.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { FormsModule } from '@angular/forms';
import { TicketsService } from 'src/services/tickets.service';

@NgModule({
    declarations: [
        AppComponent,
        MoviesComponent,
        HomeComponent,
        DescriptionComponent,
        MovieSearchComponent,
        TopSellingComponent,
        BookingsComponent,
        ModelComponent,
        RadioButtonsComponent,
    ],
    providers: [TicketsService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MovieComponent,
        HeadTitleComponent,
        ButtonComponent,
        BrowserAnimationsModule
    ]
})
export class AppModule { }
