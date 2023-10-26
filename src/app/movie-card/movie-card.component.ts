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

/**
 * MovieCardComponent is responsible for displaying movies and managing user interactions such as scrolling, and favoriting movies.
 */
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

  /**
   * Determines whether the title of a movie is long based on a pre-defined maximum length.
   * Implemented for scrolling title feature (see star wars as example in project).
   * @param title - The title of the movie.
   * @returns - A boolean indicating whether the title is considered long.
   */
  isLongTitle(title: string): boolean {
    const maxLength = 30;
    return title.length > maxLength;
  }

  /**
   * Fetches movies from the API and initializes movie lists.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.featuredMovies = resp.filter(
        (movie: any) => movie.Featured === true
      );
      console.log(this.featuredMovies);
    });
  }

  /**
   *chunkArray is set up so that movies can be displayed in a certain number for each row.
   */
  chunkArray(myArray: any[], chunk_size: number): any[] {
    var results = [];
    while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
    }
    return results;
  }

  /**
   * Allows the movies to scroll using buttons and/or dragging.
   */
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

  /*--- Click to scroll through movies for desktop users ---*/
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

  /**
   * Gets a list of the user's favorites to display the correct favorite/unfavorite button.
   */
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

  /**
   * Opens popup dialog used for info about the movie / director.
   * @param title - The initial, titular text at the top of the popup.
   * @param content - This will be the body of text that goes below the title.
   */
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

  /**
   * Toggles a movie as a favorite.
   * @param movieID - The ID of the movie to be added or removed from favorites.
   */
  toggleFavorite(movieID: number): void {
    if (this.isFavorited(movieID)) {
      this.removeFavorite(movieID);
    } else {
      this.addFavorite(movieID);
    }
  }

  /**
   * Adds a movie to the user's favorites.
   * @param movieID - The ID of the movie to be added to favorites.
   */
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

  /**
   * Removes a movie from the user's favorites.
   * @param movieID - The ID of the movie to be removed from favorites.
   */
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
