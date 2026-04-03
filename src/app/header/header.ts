import { Component, inject } from '@angular/core';
import { ThemeService } from '../Services/theme.service/theme.service';
import { RouterModule } from '@angular/router';
import { AdminTs } from '../Services/admin.ts'; // This is your Role Service

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public admin = inject(AdminTs);
  public themeService = inject(ThemeService);


  changeRole(role: 'admin' | 'viewer') {
    this.admin.userRole.set(role);
  }
}