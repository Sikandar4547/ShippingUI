import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  userProfile: any = {};
  loading = true;
  error = '';

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    Promise.all([
      this.loadStats(),
      this.loadUserProfile()
    ]).finally(() => {
      this.loading = false;
    });
  }

  private async loadStats(): Promise<void> {
    try {
      const response = await this.dashboardService.getDashboardStats().toPromise();
      if (response?.data) {
        this.stats = response.data;
      }
    } catch (error) {
      this.error = 'Failed to load dashboard stats';
      console.error(error);
    }
  }

  private async loadUserProfile(): Promise<void> {
    try {
      const response = await this.dashboardService.getUserProfile().toPromise();
      if (response?.data) {
        this.userProfile = response.data;
      }
    } catch (error) {
      this.error = 'Failed to load user profile';
      console.error(error);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
