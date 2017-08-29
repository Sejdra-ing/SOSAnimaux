



import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { 
  IonicPage, 
  LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { MainPage } from '../../pages/pages';
import { User } from '../../providers/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsPage } from '../../pages/tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type

  public signupForm:FormGroup;
  public loading:Loading;


  account: { name: string, email: string, password: string } = {
    name: 'Test Human',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public nav: NavController, public authData: AuthProvider,
    public user: User,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public translateService: TranslateService,public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

      this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }



  signupUser(){
    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
      .then(() => {
        this.nav.setRoot(TabsPage);
      }, (error) => {
        this.loading.dismiss().then( () => {
          var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }


  
}





