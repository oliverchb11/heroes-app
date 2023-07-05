import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/auth-interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  

  public sidebarItems = [
    {
      label: 'List',
      icon: 'label',
      url: './list'
    },
    {
      label: 'Add',
      icon: 'add',
      url: './add-hero'
    },
    {
      label: 'Search',
      icon: 'search',
      url: './search'
    }
  ];



  get user(): User | undefined{
    return this.authService.currentUser
  }

  onLogout(): void{
    this.authService.logout();
    this.router.navigateByUrl('auth/login')
  }

}
