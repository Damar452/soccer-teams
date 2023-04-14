import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/interfaces/authentication';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuild: FormBuilder, 
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.setForm();
  }

  public onLogin(form: User){
    this.authService.loginUser(form).subscribe( () => {
      this.storageService.saveUser(form);
      this.router.navigate(['/dashboard/equipment-list']);
    });
  }

  public getValidation(controlName: string, validator: string) {
    const control = this.loginForm.get(controlName);
    return control?.touched && control.hasError(validator);
  }

  private setForm() {
    this.loginForm = this.formBuild.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

}
