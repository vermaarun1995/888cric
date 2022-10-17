import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from 'src/app/services/confirm.service';
import { HttpService } from 'src/app/services/http.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;
  formSubmitError: string = "";

  constructor(private formBuilder: FormBuilder, private confirmService: ConfirmService, private service: HttpService, private authService: AuthService, private modalService: NgbModal) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

   loginFormSubmit() {    
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }    
    //this.confirmService.openConfirmBox(true);

    this.confirmService.getConfirmData().subscribe(
      (res) => {
        if (res == false) {
          this.service.post('Account/Login', this.loginForm.value)
            .subscribe((response: ResponseModel) => {
              if (response.status == 200 && response.data != null) {
                this.formSubmitError = "";
                this.authService.login(response.data);
                this.modalService.dismissAll();
              }
              if (response.data == null) {
                this.formSubmitError = response.message;
              }
            });
        }
      }
    );
  }

  ngOnInit(): void {
  } 

}
