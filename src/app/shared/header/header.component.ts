import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interfaces/authentication';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userSession: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.getUser()
  }

  public logout() {
    const user = this.storageService.getUser();
    this.authService.logoutUser(user).subscribe(() => {
      this.storageService.deleteUser();
      this.router.navigate(['/login']);
    })
  }

  public getUser() {
    this.userSession = this.storageService.getUser();
  }
}
