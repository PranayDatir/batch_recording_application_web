import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { faGraduationCap, faLayerGroup, faSignOutAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet, FontAwesomeModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  router = inject(Router);
  faGraduationCap = faGraduationCap;
  faLayerGroup = faLayerGroup;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;

  logout() {
    localStorage.removeItem('candidate');
    this.router.navigate(['/login']);
  }
}
