import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ErrorResponse, User } from '../../interfaces/auth-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private _snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private router = inject(Router);
  public onLogin(): void{
    this.authService.login('oliver@gmail.com','123456').subscribe({
      next: (resp) => this.handlerNext(resp),
      error: (err) => this.handlerError(err)
    })
  }

  public handlerNext(resp: User): void {
    if(resp){
      this.router.navigateByUrl('/heroes');
      this._snackBar.open('Ingreso correcto', 'success', {
        duration: 5000
      });
    }
  }
  public handlerError(err: ErrorResponse): void {
    this._snackBar.open('Error', err.message, {
      duration: 5000
    });
  }

}
