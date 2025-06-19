import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';



@Component({
  selector: 'app-container',
  imports: [RouterOutlet, RouterLink,CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  
})
export class ContainerComponent implements OnInit {
  errorMessage : string = '';
  email : string = '';
  activeLink: string = '/Admin/dashboard'; 
  isSidebarOpen = false;
  menuItems = [
    { label: 'Dashboard', link: '/Admin//home/facilities', icon: 'ri-home-2-line' },
    { label: 'Orders', link: '/Admin/home/orders', icon: 'ri-instance-line' },
    { label: 'Generator', link: '/Admin/home/qrCodeGenerator', icon: 'fa fa-qrcode' },
    { label: 'Settings', link: '/Admin/home/settings', icon: 'ri-settings-2-line' }
  ];
  constructor(private authService : AuthService , private router : Router){}
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
  ngOnInit(): void {
      this.getUser();
  }
  getUser(){
    
    this.authService.getUser().subscribe({
      next: (res) => {

         this.email = res.user.email;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.errors?.map((e: any) => e.Errors).flat().join(', ') ||
          err?.error?.error;
      },
    });
  }
  setActive(link: string) {
    this.activeLink = link; // Update active link
  }
  signout(event: Event): void {
    
     localStorage.removeItem('token');        // حذف التوكن
     this.router.navigate(['Auth/login']);   

  }
}
