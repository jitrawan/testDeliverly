import { ForgetPasswordModel } from './../../shared/models/forgetPassword.model';
import { UserProfile } from './../../shared/models/userProfile.model';
import { ChangePasswordModel } from './../../shared/models/changePassword.model';
import { checkLoginModel } from './../../shared/models/checkLogin.model';
import { checkEmailSocial } from './../../shared/models/checkEmail.model';
import { ApiService } from './../../shared/services/api.service';
import { User } from './../../shared/models/user.model';
import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModel } from '../../shared/models/header.model';
import { HeaderService } from '../../shared/services/header.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import * as Crypto2 from 'crypto2';
// import { PushNotificationsService } from 'angular2-notifications';
declare function JSEncrypt(): any;
declare var jQuery: any;
declare var $: any

@Component({
    selector: 'app-navbar',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', 
    '../../../assets/css/standard/utility.css', 
    '../../../assets/css/standard/layout.css']
})
export class HeaderComponent implements OnInit {
    responRecaptcha : string;
    userModel: User = new User();
    userProfileModel : UserProfile = new UserProfile();
    changePasswordModel : ChangePasswordModel = new ChangePasswordModel();
    _checkEmailSocial: checkEmailSocial = new checkEmailSocial();
    _checkLoginModel: checkLoginModel = new checkLoginModel();
    forgetPasswordModel : ForgetPasswordModel = new ForgetPasswordModel();
    authForm: FormGroup;
    changePasswordForm: FormGroup;
    mediaType:string;
    editProfileForm: FormGroup;
    emailNameView: string;
    firstNameView: string;
    lastNameView : string;
    idCardView : string;
    invalid: string;
    private headerModel: HeaderModel[];
    private resizeTimeout: number = 0;
    isMobileSize: boolean = false;
    isWindowSize: boolean = true;
    isSidebarOpen: boolean = false;
    showOverlay: boolean = false;
    isLoginOpen: boolean = false;
    isRegisterOpen: boolean = false;
    isShowForgotPassword: boolean = false;
    userMenu: boolean = false;
    socialLogin: boolean = false;
    RegAndLog: boolean = true;
    isEditProfileOpen: boolean = false;
    isChangePasswordOpen: boolean = false;
    isValidateAlert: boolean = false;
    isCaptchaOpen: boolean = false;
    isReCaptchaOpen: boolean = true;
    showEmergency: boolean;
    actionTrigger: triggerType = {
        login: 'login',
        signUp: 'signup',
        forgotPassword: 'forgot'
    }
    userActionTrigger: userTriggerType = {
        edit: 'edit',
        change: 'change',
        history: 'history',
    }
    emailSocial: String;
    nameSocial: String;
    lastNameSocial: String;
    gender: String;
    confirmPassword: any;
    user: SocialUser;
    isLoading : boolean = false;

    emailEdit:string;
    firstnameEdit: string;
    lastnameEdit: string;
    genderEdit: string;
    birthDayDateEdit: any;
    birthDayMonthEdit: any;
    birthDayYearEdit: any;
    idCardEdit: string;
    phoneEdit: string;

    _emailOfForgotPasseord:string;


    @ViewChild('navSideBar') private navSideBar: ElementRef;
    @ViewChild('modalBox') private modalBox: ElementRef;
    @ViewChild('modalBoxAlert') private modalBoxAlert: ElementRef;
    @ViewChild('userModalBox') private userModalBox: ElementRef;
    @ViewChild('closeSideBar') private closeSideBar: ElementRef;
    @ViewChild('runningYes') private runningYes: ElementRef;
    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        // this.resizeTimeout = setTimeout((() => {
        //     this.checkSidebar(event.target.innerWidth);
        // }).bind(this), 100);
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        // private _pushNotifications: PushNotificationsService
    ) {
        // _pushNotifications.requestPermission(); 
        this.showEmergency = false;

        // use FormBuilder to create a form group
  this.authForm = this.formBuilder.group({
    'email': ['', Validators.required],
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'password': ['', Validators.required],
    'confirmpassword': ['', Validators.required],
    'gender': ['', Validators.required],
    'birthdayDate': ['', Validators.required],
    'birthdayMonth': ['', Validators.required],
    'birthdayYear': ['', Validators.required],
    'idCard': ['', Validators.required],
    'phone': ['', Validators.required],
    'acceptTerm': ['', Validators.required],
    'acceptNews': ['', Validators.required],
    'currentItem': ['', Validators.required]

   });

   this.changePasswordForm = this.formBuilder.group({
    'oldPassword': ['', Validators.required],
    'newPassword': ['', Validators.required],
    'confirmNewPassword': ['', Validators.required]

   });

   this.editProfileForm = this.formBuilder.group({
    'email': ['', Validators.required],
    'firstName': ['', Validators.required],
    'lastName': ['', Validators.required],
    'gender': ['', Validators.required],
    'birthDayDate': [Number, Validators.required],
    'birthDayMonth': ['', Validators.required],
    'birthDayYear': [Number, Validators.required],
    'idCard': ['', Validators.required],
    'phone': ['', Validators.required],
    'currentItem': ['', Validators.required]

   });


}

    ngOnInit() {
        // localStorage.removeItem('USER_PROFILE');
        // var retrievedObject = localStorage.getItem('USER_PROFILE');
        // console.log('retrievedObject: ', JSON.parse((retrievedObject)));
        // var result =  JSON.parse((retrievedObject));
        // this.firstNameView = result.CUST_FIRSTNAME;
        // this.lastNameView = result.CUST_LASTNAME;
        // this.userMenu = true;
        // this.RegAndLog = false;

        this.resizeTimeout = 0;
        // recaptcha prod
        // 6Lfg51QUAAAAAID_dAd_epeHdsoj0gkr8IyQ3pmf
        //dev
        // 6LcPgVAUAAAAAP9AjXUNyt82AOHKjtVmmOeiwYZK

        this.headerService.getHeaderMenu().subscribe(response => {
            this.headerModel = response['data'];
        });
        this.user = null;
        var privateKey = 'MIIBOQIBAAJAWYbAUbPhRWQ7TAjKaotbJEQJI6imMtmXnrXDMSYpLU5AxDXjUsoCMbzk/9PEh2igdu2JyyhLPGgwqJFZxJM1SwIDAQABAkAxiLo+On3I7CVW84IzozlhfndkEHsspXIbsUv3lLqxwvLsDXrZWiMdQJKWOvwojFmbEFhxjKZC3c/BzMVjjCZxAiEAp+U3uAPhZB8Vr+s0zrONEYyAgzm49FqezwjT+Zvia9kCIQCIgZK0I0rja3ZRiI/kQjqcrf5F46sU8hg1ROrIovUnwwIhAI3l12KpvOuerfihZF8yNw7W3aKKvXufv0qhXm4+xm15AiBbP8pyclkgNvirvg759a+6hrC/xVXatY6rJTuRDSW2AwIgUgpYOwni1NMbjqryxZo9UXR7oUaI4EZDuQ/0BTMUCt8=' ;
        var publicKey = 'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAWYbAUbPhRWQ7TAjKaotbJEQJI6imMtmXnrXDMSYpLU5AxDXjUsoCMbzk/9PEh2igdu2JyyhLPGgwqJFZxJM1SwIDAQAB';
        JSEncrypt.prototype.setPrivateKey(privateKey);
        JSEncrypt.prototype.setPublicKey(publicKey);
        console.log("Password En: " + JSEncrypt.prototype.encrypt("1234"));
        
        }
      
    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        this.loginSocial("FACEBOOK");
        this.socialLogin = true;
        this.mediaType = "FACEBOOK";
        console.log("Media : " + this.mediaType)
    }
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.loginSocial("GOOGLE");
        this.socialLogin = true;
        this.mediaType = "GOOGLE";
        console.log("Media : " + this.mediaType)
    }

    signUp(): void {
        this.userModel.email = this.authForm.value.email;
        this.userModel.password = this.authForm.value.password;
        this.userModel.confirmpassword = this.authForm.value.confirmpassword;
        this.userModel.firstName = this.authForm.value.firstname;
        this.userModel.lastName = this.authForm.value.lastname;
        this.userModel.gender = this.authForm.value.gender;
        this.userModel.birthday = $('#select-month').val() +"/" + $('#select-date').val() +"/" + $('#select-year').val();
        this.userModel.idCard = this.authForm.value.idCard;
        this.userModel.phone = this.authForm.value.phone;
        this.userModel.acceptTerm = this.authForm.value.acceptTerm;
        this.userModel.acceptNews = this.authForm.value.acceptNews;
          
        
        console.log("Data : " + JSON.stringify(this.userModel));
        console.log("socialLogin : " + this.socialLogin);

            if(this.userModel.email == null || this.userModel.email == ''|| this.userModel.email.length == 0){
                this.invalid = 'Please input your email !!'
                this.alertValidate();
            }
            else if(this.userModel.password == null || this.userModel.password == ''|| this.userModel.password.length == 0){
                this.invalid = 'Please input your password !!'
                this.alertValidate();
            }
            else if(this.userModel.password.length < 8){
                this.invalid = 'Please input your password over 8 character !!'
                this.alertValidate();
            }
            else if(this.userModel.confirmpassword == null || this.userModel.confirmpassword == ''|| this.userModel.confirmpassword.length == 0){
                this.invalid = 'Please input your confirm password !!'
                this.alertValidate();
            }
            else if(this.userModel.confirmpassword != this.userModel.password){
                this.invalid = 'Please input your confirm password like password !!'
                this.alertValidate();
            }
            else if(this.userModel.firstName == null || this.userModel.firstName == ''|| this.userModel.firstName.length == 0){
                this.invalid = 'Please input your First Name !!'
                this.alertValidate();
            }
            else if(this.userModel.lastName == null || this.userModel.lastName == ''|| this.userModel.lastName.length == 0){
                this.invalid = 'Please input your Last Name !!'
                this.alertValidate();
            }
            else if(this.userModel.gender == null || this.userModel.gender == ''|| this.userModel.gender.length == 0){
                this.invalid = 'Please choose your Gender !!'
                this.alertValidate();
            }
            else if($('#select-date').val() == null || $('#select-date').val() == ''|| $('#select-date').val() == 0 || $('#select-month').val() == null || $('#select-month').val() == ''|| $('#select-month').val() == 0 || $('#select-year').val() == null || $('#select-year').val() == ''|| $('#select-year').val() == 0){
                this.invalid = 'Please input your Birthday !!'
                this.alertValidate();
            }
            else if(this.userModel.idCard == null || this.userModel.idCard == ''&& this.userModel.idCard.length < 13){
                this.invalid = 'Please input your ID Card !!'
                this.alertValidate();
            }
            else if(this.userModel.phone == null || this.userModel.phone == ''|| this.userModel.phone.length < 10){
                this.invalid = 'Please input your Phone number !!'
                this.alertValidate();
            }
            else if(this.userModel.acceptTerm != true ){
                this.invalid = 'Please choose Accept Terms !!'
                this.alertValidate();
            }
            else if(this.responRecaptcha == null){
            this.invalid = 'Please input Captcha key !!'
            this.alertValidate();
            this.userMenu = false;
            this.RegAndLog = true;
            }
            else{
            this.apiService.createUser(this.userModel)
                .subscribe( data => {
                    console.log("Data Response " +  JSON.stringify(data));
                    var result =  JSON.parse(JSON.stringify(data));
                    if(result["success"] == true){

                        if(this.socialLogin == true){
                            this.isLoading = false;
                            this.showOverlay = false;
                            this.userMenu = true;
                            this.RegAndLog = false;
                            this.closeAllDialog();
                        }else{
                            if(result["message"] == "Email นี้มีอยู่ในระบบแล้วไม่สามารถใช้งานได้"){
                                
                            this.invalid = 'Email นี้มีอยู่ในระบบแล้วไม่สามารถใช้งานได้ !!'
                            this.alertValidate();
                            this.closeAllDialog();
                            this.userMenu = false;
                            this.RegAndLog = true;
                             }else{
                               this.invalid = 'Please Confirm Email !!'
                               this.alertValidate();
                                                        
                            }
                        }
                    }else{
                        this.invalid = 'พบข้อผิดพลาดระหว่างการส่ง Mail !!'
                        this.alertValidate();
                        this.userMenu = false;
                        this.RegAndLog = true;
                    }
                });
                
            }
    }
    ngAfterViewInit() {
        // setTimeout(_ => this.navbarContent = this.child.nativeElement.innerHTML);
    }
    clearInputRegisterForm(){
        this.authForm.value.email = null;
        this.authForm.value.password = null;
        this.authForm.value.confirmpassword = null;
        this.authForm.value.firstname = null;
        this.authForm.value.lastname = null;
        this.authForm.value.gender = null;
        this.authForm.value.idCard = null;
        this.authForm.value.phone = null;
        this.authForm.value.acceptTerm = false;
        this.authForm.value.acceptNews = false;



    }
    routeMenu(route: string) {
        this.router.navigate([route]);
        this.closeAllDialog();
    }

    triggerSidebar() {
        if (this.isSidebarOpen === false && this.isWindowSize) {
            this.isSidebarOpen = true;
            this.showOverlay = true;
            this.renderer.addClass(this.navSideBar.nativeElement, 'show');
            this.renderer.addClass(this.closeSideBar.nativeElement, 'show');
        } else {
            this.closeAllDialog();
        }
    }

    triggerDialog(type: string) {
        this.showOverlay = true;
        this.renderer.addClass(this.modalBox.nativeElement, 'show');

        if (type === this.actionTrigger.login) {
            this.isRegisterOpen = false;
            this.isShowForgotPassword = false;
            this.isLoginOpen = true;
            window.scrollTo(0, 0);
        } else if (type === this.actionTrigger.signUp) {
            
            if(this.socialLogin == false){
                this.clearInputRegisterForm();
                this.userModel.mediaType = "NORMAL";
                this.emailNameView = "";
                this.firstNameView = "";
                this.lastNameView = "";
            }
            this.isLoginOpen = false;
            this.isShowForgotPassword = false;
            this.isRegisterOpen = true;
            this.user = null;
           
        } else if (type === this.actionTrigger.forgotPassword) {
            this.isLoginOpen = false;
            this.isRegisterOpen = false;
            this.isShowForgotPassword = true;
        }

        this.isSidebarOpen = false;
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');
        this.renderer.removeClass(this.closeSideBar.nativeElement, 'show');
    }

    userTriggerDialog(type: string) {
        this.showOverlay = true;
        this.renderer.addClass(this.userModalBox.nativeElement, 'show');

        if (type === this.userActionTrigger.change) {
            this.isEditProfileOpen = false;
            this.isChangePasswordOpen = true;
            window.scrollTo(0, 0);
        } else if (type === this.userActionTrigger.edit) {
            this.isChangePasswordOpen = false;
            this.isEditProfileOpen = true;
        }

        this.isSidebarOpen = false;
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');
        this.renderer.removeClass(this.closeSideBar.nativeElement, 'show');
    }

    closeAllDialog() {
        this.renderer.removeClass(this.modalBox.nativeElement, 'show');
        this.renderer.removeClass(this.userModalBox.nativeElement, 'show');
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');
        this.renderer.removeClass(this.closeSideBar.nativeElement, 'show');

        this.isSidebarOpen = false;
        this.showOverlay = false;
        this.isLoginOpen = false;
        this.isRegisterOpen = false;
        this.isShowForgotPassword = false;
        this.isChangePasswordOpen = false;
    }

    routeHistory() {
        this.router.navigate(['history']);
        this.closeAllDialog();
    }
    loginSocial(mediaType : string){
        this.closeAllDialog();
        this.authService.authState.subscribe((user) => {
            this.user = user;
            if (this.user != null) {
                console.log("Email : "+this.user.firstName);
                this.authForm.value.firstname = this.user.firstName;
                this.authForm.value.lastname = this.user.lastName;
                this.userModel.accessToken = this.user.authToken;

                this._checkEmailSocial.email = this.user.email;
                this._checkEmailSocial.accessToken = this.user.authToken;
                this._checkEmailSocial.mediaType = mediaType;
                console.log("Data Check Email : " + JSON.stringify(this._checkEmailSocial));

                this.isLoading = true;
                this.showOverlay = true;
                
                this.apiService.checkEmail(this._checkEmailSocial).subscribe(data => {
                    var result =  JSON.parse(JSON.stringify(data));
                    var success = false;
                    console.log("Data response Login Social : " + JSON.stringify(data));
                    if( this.mediaType == "FACEBOOK"){
                        success = result["success"];
                    }
                    else if( this.mediaType == "GOOGLE"){
                        success = result["verified_email"];
                    }
                    console.log("Success : " + success);
                    if(success == true){
                        this.isRegisterOpen = false;
                        this.checkLoginSocial();
                       
                    }else{
                        this.isLoading = false;
                        this.showOverlay = false;
                        this.isLoading = false;
                        this.showOverlay = false;
                        this.RegAndLog = true;
                        this.userMenu = false;
                        this.emailNameView = this.user.email;
                        this.firstNameView = this.user.firstName;
                        this.lastNameView = this.user.lastName;
                        this.triggerDialog(this.actionTrigger.signUp);
                    }
                    
                });

            }else{
                this.userMenu = false;
                this.RegAndLog = true;
            }
        });
        
    }
    // checkSidebar(width) {
    //     if (width <= 992) {
    //         this.isMobileSize = true;
    //     } else {
    //         this.isMobileSize = false;
    //         this.triggerSidebar();
    //     }
    // }

    overlayClicked(event) {
        this.closeAllDialog();
    }

    checklogin() {
        if($('#email-login').val() == null || $('#email-login').val() == '' || $('#email-login').val().lenght == 0 ){
            this.invalid = 'Please input your email !!'
            this.alertValidate();
            this.userMenu = false;
            this.RegAndLog = true;
        }
        else if($('#password-login').val() == null || $('#password-login').val() == '' || $('#password-login').val().lenght == 0 ){
            this.invalid = 'Please input your password !!'
            this.alertValidate();
            this.userMenu = false;
            this.RegAndLog = true;
        }
        else{
        this.isLoading = true;
        this.showOverlay = true;

        this._checkLoginModel.email = $('#email-login').val();
        this._checkLoginModel.password = $('#password-login').val();
        this._checkLoginModel.mediaType =  "NORMAL";
        this._checkLoginModel.accessToken = "";

        this.apiService.checkLogin(this._checkLoginModel).subscribe(data => {
            var result =  JSON.parse(JSON.stringify(data));
            console.log("Data response Login Normal : " + JSON.stringify(data));
            if(result["success"] == true){
                if(result["data"]["CUST_STATUS"] == "Y"){
                    localStorage.setItem('USER_PROFILE', JSON.stringify(result["data"]));
                    this.emailEdit = result["data"]["CUST_EMAIL"];
                    this.firstnameEdit = result["data"]["CUST_FIRSTNAME"];
                    this.lastnameEdit = result["data"]["CUST_LASTNAME"];
                    this.idCardEdit = result["data"]["CARD_ID"];
                    this.genderEdit = result["data"]["GENDER"];
                    var resultBirthDay = result["data"]["DATE_OF_BIRTH"].replace("T00:00:00.000Z","");
                    var dateFormat = resultBirthDay.split("-")
                    this.birthDayDateEdit = dateFormat[2];
                    this.birthDayMonthEdit = dateFormat[1];
                    this.birthDayYearEdit = dateFormat[0];
                    this.phoneEdit = result["data"]["CUST_TEL"];
                    this.RegAndLog = false;
                    this.userMenu = true;
                    this.isLoading = false;
                    this.showOverlay = false;   
                    this.closeAllDialog();
                }else{
                    this.isLoading = false;
                    this.showOverlay = false;
                    this.invalid = 'Please Confirm your Email !!'
                    this.alertValidate();
                }
                
               
            }else{
                this.invalid = 'Please Register !!'
                this.userMenu = false;
                this.RegAndLog = true;
                this.alertValidate();
                this.triggerDialog(this.actionTrigger.signUp);
            }
            
        });
        }
    }
    checkLoginSocial(){
        this._checkLoginModel.email = this._checkEmailSocial.email;
        this._checkLoginModel.password = "";
        this._checkLoginModel.mediaType =  this._checkEmailSocial.mediaType;
        this._checkLoginModel.accessToken = this._checkEmailSocial.accessToken;
        this.showOverlay = true;
        this.apiService.checkLogin(this._checkLoginModel).subscribe(data => {
            var result =  JSON.parse(JSON.stringify(data));
            console.log("Data response Check Login Social : " + JSON.stringify(data));
            if(result["success"] == true){
                if(result["data"]["CUST_STATUS"] == "Y"){
                    localStorage.setItem('USER_PROFILE', JSON.stringify(result["data"]));
                    this.emailEdit = result["data"]["CUST_EMAIL"];
                    this.firstNameView = result["data"]["CUST_FIRSTNAME"];
                    this.lastNameView = result["data"]["CUST_LASTNAME"];
                    this.firstnameEdit = result["data"]["CUST_FIRSTNAME"];
                    this.lastnameEdit = result["data"]["CUST_LASTNAME"];
                    this.idCardEdit = result["data"]["CARD_ID"];
                    this.genderEdit = result["data"]["GENDER"];
                    var resultBirthDay = result["data"]["DATE_OF_BIRTH"].replace("T00:00:00.000Z","");
                    var dateFormat = resultBirthDay.split("-");
                    this.birthDayDateEdit = dateFormat[2];
                    this.birthDayMonthEdit = dateFormat[1];
                    this.birthDayYearEdit = dateFormat[0];
                    this.phoneEdit = result["data"]["CUST_TEL"];
                    
                    this.RegAndLog = false;
                    this.userMenu = true;
                    this.isLoading = false;
                    this.showOverlay = false;   
                    this.closeAllDialog();
                }
            }else{
                this.RegAndLog = true;
                this.userMenu = false;
                this.isLoading = false;
                this.showOverlay = false;   
            }
            
        });
    }
    onForgetPassword(){
        this.forgetPasswordModel.email = $('#forgotPwd-value').val();
        this.apiService.forgetPassword(this.forgetPasswordModel).subscribe(data =>{
            var result =  JSON.parse(JSON.stringify(data));
            console.log("Data response Login Normal : " + JSON.stringify(data));
        });
    }

    onChangePassword(){
        this.changePasswordForm.value.newPassword
        this.changePasswordModel.email = this.emailNameView;
        this.changePasswordModel.oldPassword = this.changePasswordForm.value.oldPassword;
        this.changePasswordModel.newPassword = this.changePasswordForm.value.newPassword;
        this.changePasswordModel.confirmNewPassword = this.changePasswordForm.value.confirmNewPassword;
        console.log("Data Change Password : " + JSON.stringify(this.changePasswordModel));

        if(this.changePasswordModel.oldPassword.length == 0){
            this.invalid = 'Please input Old Password  !!'
            this.alertValidate();
        }
        else if(this.changePasswordModel.newPassword.length == 0){
            this.invalid = 'Please input New Password  !!'
            this.alertValidate();
        }
        else if(this.changePasswordModel.newPassword.length < 8){
            this.invalid = 'Please input New Password over 8 chracter  !!'
            this.alertValidate();
        }
        else if(this.changePasswordModel.confirmNewPassword.length == 0){
            this.invalid = 'Please input Confirm New Password  !!'
            this.alertValidate();
        }
        else if(this.changePasswordModel.confirmNewPassword != this.changePasswordModel.newPassword){
            this.invalid = 'Please input Confirm Password like with Password  !!'
            this.alertValidate();
        }else{
        this.apiService.changePassword(this.changePasswordModel).subscribe(data => {
            var result =  JSON.parse(JSON.stringify(data));
            console.log("Data Response ChangePassword : "+ (JSON.stringify(data)))
            if(result["success"] == true){
                this.invalid = 'Change Password success  !!'
                this.alertValidate();
                this.closeAllDialog();
            }else{
                this.invalid = 'Old Password Fail  !!'
                this.alertValidate();
            }
        });
    }
    }

    onEditProfile(){
        this.userProfileModel.email = this.editProfileForm.value.email;
        this.userProfileModel.idCard = this.editProfileForm.value.idCard;
        this.userProfileModel.firstName = this.editProfileForm.value.firstName;
        this.userProfileModel.lastName = this.editProfileForm.value.lastName;
        this.userProfileModel.gender = this.editProfileForm.value.gender;
        this.userProfileModel.birthday = $('#select-month-edit').val() +"/" + $('#select-date-edit').val() +"/" + $('#select-year-edit').val();
        this.userProfileModel.phone = this.editProfileForm.value.phone;

        console.log("User Profile : " + JSON.stringify(this.userProfileModel))
        this.apiService.updateProfile(this.userProfileModel).subscribe(data => {
            var result =  JSON.parse(JSON.stringify(data));
            console.log("Data Response ChangePassword : "+ (JSON.stringify(data)))
            if(result["success"] == true){
                this.invalid = 'Update Profile success  !!'
                this.alertValidate();
                this.closeAllDialog();
            }else{
                this.invalid = 'Update Profile Fail  !!'
                this.alertValidate();
            }
        });
    }

    logout() {
        this.userMenu = false;
        this.RegAndLog = true;
        this.closeAllDialog();
        this.user = null;
        this.socialLogin = false;
        this.responRecaptcha = null
        this.router.navigate(['/']);

    }

    showEditProfile() {
        this.isRegisterOpen = true;
    }

    showEmergencyWrap() {
        this.showEmergency = true;
    }

    hideEmergencyWrap() {
        this.showEmergency = false;
    }

    alertValidate(){
      
        this.isValidateAlert = true;
        $(document).ready(function () {
                      $("#myModal").on("show", function () {   
                          $("#myModal a.btn").on("click", function (e) {
                              $("#myModal").modal('hide');
                          });
                      });
                      $("#myModal").on("hide", function () {
                          $("#myModal a.btn").off("click");
                      });
                      $("#myModal").on("hidden", function () { 
                          $("#myModal").remove();
                      });
                      $("#myModal").modal({                 
                          "backdrop": "static",
                          "keyboard": true,
                          "show": true                   
                      });
                  });
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response ${captchaResponse}:`);
        this.responRecaptcha = captchaResponse;
        console.log("Token :" + this.responRecaptcha);
    }
    
}

interface triggerType {
    login: string;
    signUp: string;
    forgotPassword: string;
}

interface userTriggerType {
    edit: string;
    change: string;
    history: string;
}

