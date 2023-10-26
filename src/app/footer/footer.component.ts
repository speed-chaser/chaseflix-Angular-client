import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

/**
 * A footer component that displays links to my socials.
 */
export class FooterComponent {
  /**
   * Routes to my GitHub.
   */
  toGitHub(): void {
    window.open('https://github.com/speed-chaser', '_blank');
  }

  /**
   * Routes to my portfolio site.
   */
  toPortfolioSite(): void {
    window.open('chasebrooke.netlify.app', '_blank');
  }

  /**
   * Routes to my LinkedIn.
   */
  toLinkedIn(): void {
    window.open(
      'https://www.linkedin.com/in/chase-brooke-050a14179/',
      '_blank'
    );
  }
}
