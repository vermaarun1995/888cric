import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmService } from 'src/app/services/confirm.service';
import { HttpService } from 'src/app/services/http.service';
import { ResponseModel } from 'src/app/models/responseModel';
import { AuthService } from 'src/app/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitted = false;
  formSubmitError: string = "";

  constructor(private formBuilder: FormBuilder, private confirmService: ConfirmService, private service: HttpService, private authService: AuthService, private modalService: NgbModal) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phonenumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
   }

   registerFormSubmit(){
    debugger;
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      alert("invalid parameters");
      return;
    }    

    if(this.registerForm.value.password != this.registerForm.value.confirmpassword){
      alert("Password and confirm password not match");
      return;
    }

    this.confirmService.getConfirmData().subscribe(
      (res) => {
        if (res == false) {
          this.service.post('Account/Register', this.registerForm.value)
            .subscribe((response: ResponseModel) => {
              if (response.status == 200 && response.data != null) {
                this.formSubmitError = "";
                this.authService.login(response.data);
                this.modalService.dismissAll();
              }
              if (response.data == null) {
                this.formSubmitError = response.message;
                alert(response.message);
              }
            });
        }
      }
    );

   }

  ngOnInit(): void {
  }

}
