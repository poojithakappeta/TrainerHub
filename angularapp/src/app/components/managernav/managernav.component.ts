import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-managernav',
  templateUrl: './managernav.component.html',
  styleUrls: ['./managernav.component.css']
})
export class ManagernavComponent implements OnInit {

  showLogoutPopup = false;
  isLoggedin = false;
  role: string | null = null;
  username: string | null = null;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.isLoggedin = this.auth.isUserLoggedIn();
    this.role = this.auth.getRole();
    this.username = this.auth.getAuthenticatedUser();
  }
  confirmLogout() {
    this.showLogoutPopup = true;
  }
  cancelLogout() {
    this.showLogoutPopup = false;
  }
  logout() {
    this.auth.logout();
    this.isLoggedin = false;
    this.role = null;
    this.username = null;
    this.showLogoutPopup = false;
    this.router.navigate(['/login']).then(() => { window.location.reload() });
  }

  isManager() {
    return this.role === 'Manager';
  }




}
