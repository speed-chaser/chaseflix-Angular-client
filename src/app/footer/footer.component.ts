import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  toGitHub(): void {
    window.open('https://github.com/speed-chaser', '_blank');
  }
  toPortfolioSite(): void {
    window.open('chasebrooke.netlify.app', '_blank');
  }
  toLinkedIn(): void {
    window.open(
      'https://www.linkedin.com/in/chase-brooke-050a14179/',
      '_blank'
    );
  }
}
