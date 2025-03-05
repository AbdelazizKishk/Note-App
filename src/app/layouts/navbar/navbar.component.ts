import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly router = inject(Router);
  logOut(): void {
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);
  }
  @ViewChild('navbarNav', { static: false }) navbarNav!: ElementRef;

  closeNavbar() {
    const navbarElement = this.navbarNav.nativeElement;
    if (navbarElement.classList.contains('show')) {
      navbarElement.classList.remove('show');
    }
  }
}
