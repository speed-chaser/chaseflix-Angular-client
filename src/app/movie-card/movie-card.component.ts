// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content-component/dialog-content-component.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @ViewChild('moviesContainer') moviesContainer!: ElementRef;
  movies: any[] = [];
  userFavorites: any[] = [];
  featuredMovies: any[] = [];
  rowsOfMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUserFavorites();
  }

  isLongTitle(title: string): boolean {
    const maxLength = 30;
    return title.length > maxLength;
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.featuredMovies = resp.filter(
        (movie: any) => movie.Featured === true
      );
      console.log(this.featuredMovies);
    });
  }

  chunkArray(myArray: any[], chunk_size: number): any[] {
    var results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }

  scrollMoviesContainer(direction: string, container: HTMLElement): void {
    const scrollAmount = 319;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      return;
    }
  }

  /*--- Click to scroll through movies ---*/
  scrolling: boolean = false;
  startX: number = 0;
  scrollLeft: number = 0;

  startScroll(e: MouseEvent) {
    this.scrolling = true;
    this.startX = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;
    this.scrollLeft = (e.currentTarget as HTMLElement).scrollLeft;
  }

  stopScroll() {
    this.scrolling = false;
  }

  scrollMovies(e: MouseEvent) {
    if (!this.scrolling) return;
    e.preventDefault();
    const x = e.pageX - (e.currentTarget as HTMLElement).offsetLeft;

    const walk = (x - this.startX) * 0.8; // Adjust the multiplier here, smaller values will make the scrolling slower
    (e.currentTarget as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }

  /*--- End of click to scroll through movies ---*/

  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    const username = user ? JSON.parse(user).Username : null;

    if (!username) {
      console.error('No username found');
      return;
    }

    this.fetchApiData.getFavoriteMovies(username).subscribe((favorites) => {
      this.userFavorites = favorites;
    });
  }

  openDialog(title: string, content: string): void {
    this.dialog.open(DialogContentComponent, {
      data: {
        title: title,
        content: content,
      },
      width: '600px',
    });
  }

  isFavorited(movieID: number): boolean {
    return this.userFavorites.includes(movieID);
  }

  toggleFavorite(movieID: number): void {
    if (this.isFavorited(movieID)) {
      this.removeFavorite(movieID);
    } else {
      this.addFavorite(movieID);
    }
  }

  addFavorite(movieID: number): void {
    const user = localStorage.getItem('user');
    const username = user ? JSON.parse(user).Username : null;

    if (!username) {
      console.error('No username found');
      return;
    }

    this.fetchApiData.addFavoriteMovie(username, movieID).subscribe(() => {
      console.log(movieID, 'added to favorites.');
      this.snackBar.open('Added to favorites', 'OK', {
        duration: 2000,
      });
      this.userFavorites.push(movieID);
    });
  }

  removeFavorite(movieID: number): void {
    const user = localStorage.getItem('user');
    const username = user ? JSON.parse(user).Username : null;

    if (!username) {
      console.error('No username found');
      return;
    }

    this.fetchApiData.removeFavoriteMovie(username, movieID).subscribe(() => {
      console.log(movieID, 'removed from favorites.');
      this.snackBar.open('Removed from favorites', 'OK', {
        duration: 2000,
      });
      this.userFavorites = this.userFavorites.filter((id) => id !== movieID);
    });
  }
}
