import { Component, } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private errorService: ErrorService,
    private authService: AuthService
  ) { }
  
  onSubmit() {
    const errorService = this.errorService
    const route = this.router
    const loginForm = this.loginForm
    
    if (Object.values(this.loginForm.value).some(x => !x)) {
      this.errorService.Error = ['All fields are required!']
      return
    };

    this.authService.login(this.loginForm.value).subscribe({
       next(data){
        localStorage.setItem('user', JSON.stringify(data));
        errorService.cleanErrors()
        route.navigate(['/'])
       },
       error(err){
        errorService.getError(err.error)
        loginForm.reset()
       }
    })
  }

}

// next(data) {
//   localStorage.setItem('user', JSON.stringify(data));
//   errorService.cleanErrors()
//   this.router.navigate(['/'])

// },
// error(err) => {
//   errorService.getError(err.error)
//   this.loginForm.reset();
// }
