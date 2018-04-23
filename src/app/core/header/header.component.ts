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
// import { PushNotificationsService } from 'angular2-notifications';
declare function JSEncrypt(): any;
declare var jQuery: any;
declare var $: any;

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
    _checkEmailSocial: checkEmailSocial = new checkEmailSocial();
    _checkLoginModel: checkLoginModel = new checkLoginModel();
    authForm: FormGroup;
    emailNameView: string;
    firstNameView: string;
    lastNameView : string;
    invalid: string;
    birthDayDate: any;
    birthDayMonth: any;
    birthDayYear: any;
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

    @ViewChild('navSideBar') private navSideBar: ElementRef;
    @ViewChild('modalBox') private modalBox: ElementRef;
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
        private fb: FormBuilder,
        private apiService: ApiService,
        // private _pushNotifications: PushNotificationsService
    ) {
        // _pushNotifications.requestPermission(); 
        this.showEmergency = false;

        // use FormBuilder to create a form group
  this.authForm = this.fb.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required],
    'confirmpassword': ['', Validators.required],
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'gender': ['', Validators.required],
    'birthdayDate': ['', Validators.required],
    'birthdayMonth': ['', Validators.required],
    'birthdayYear': ['', Validators.required],
    'idCard': ['', Validators.required],
    'phone': ['', Validators.required],
    'acceptTeam': ['', Validators.required],
    'acceptNews': ['', Validators.required],
    'currentItem': ['', Validators.required]

   });
    }

    ngOnInit() {
        this.resizeTimeout = 0;
        // 6Lfg51QUAAAAAID_dAd_epeHdsoj0gkr8IyQ3pmf
        // 6LcPgVAUAAAAAP9AjXUNyt82AOHKjtVmmOeiwYZK
        this.headerService.getHeaderMenu().subscribe(response => {
            this.headerModel = response['data'];
        });
        this.user = null;
        JSEncrypt.prototype.setPrivateKey('MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAs2hMvCeWnKyp/uxtzhScCuxInUTlUtBmtCMfY99SWfa07c2ytNIClREavSCcvWoybrBzQT8pnlsFWm/Cr3/IrQIDAQABAkBb1bjp223qNywxlL7EbaJOqRKmhlzI3mqkLRJlYixaZeXS7UXWaLo7+XRb60TF5N0fLcC0QMxGuPD/Jbv2pkehAiEA5ixxF3hosuaCvwypl4Dulf0Td6Q1tH2wbwTrWRPpZ5kCIQDHiaOKA9pkMk0vp7UQQw5Vd313pib6aH0MDOy+bpXGNQIgVsRQCXnxdechSGW8lIkc51uUeBhlyllLJj6jfVvdM5kCIQCWEjTHdoJoXVSkBNQu+N/s88OPm40xRCjYSVg9GVrYCQIgMXHdMVgaRL7mI4f0kl9/jeiFAJKdX5Wol+vVxB85ZGc=');
        console.log("Password : " + JSEncrypt.prototype.encrypt("1234"));
        }
      
    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        this.loginSocial();
        this.socialLogin = true;
        this.userModel.mediaType = "FACEBOOK";
    }
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.loginSocial();
        this.socialLogin = true;
        this.userModel.mediaType = "GOOGLE";
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
        this.userModel.acceptTeam = this.authForm.value.acceptTeam;
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
                this.invalid = 'Please input your confirm password same password !!'
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
            else if(this.userModel.acceptTeam == null ){
                this.invalid = 'Please choose Accept Term !!'
                this.alertValidate();
            }
            else{
            this.apiService.createUser(this.userModel)
                .subscribe( data => {
                    console.log("Data Response " +  JSON.stringify(data));
                    var result =  JSON.parse(JSON.stringify(data));
                    if(result["success"] == true){

                        if(this.socialLogin == true){
                            this.userMenu = true;
                            this.RegAndLog = false;
                            this.closeAllDialog();
                        }else{
                            if(result["message"] != "Email นี้มีอยู่ในระบบแล้วไม่สามารถใช้งานได้"){
                                
                            this.invalid = 'Please Confirm your Email !!'
                            this.alertValidate();
                            this.closeAllDialog();
                            this.userMenu = false;
                            this.RegAndLog = true;
                             }else{
                               this.invalid = 'Email นี้มีอยู่ในระบบแล้วไม่สามารถใช้งานได้ !!'
                               this.alertValidate();
                                                        
                            }
                        }
                    }
                });
                
            }
        
    }
    ngAfterViewInit() {
        // setTimeout(_ => this.navbarContent = this.child.nativeElement.innerHTML);
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
                this.userModel.mediaType = "NORMAL";
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
    }

    routeHistory() {
        this.router.navigate(['history']);
        this.closeAllDialog();
    }
    loginSocial(){
        this.authService.authState.subscribe((user) => {
            this.user = user;
            if (this.user != null) {
                console.log("Email : "+this.user.firstName);
                this.authForm.value.email = this.user.email;
                this.authForm.value.firstname = this.user.firstName;
                this.authForm.value.lastname = this.user.lastName;
                this.userModel.accessToken = this.user.authToken;
              
                // this.userMenu = true;
                
                this._checkEmailSocial.email = this.user.email;
                this._checkEmailSocial.accessToken = this.user.authToken;

                console.log("Data Check Email : " + JSON.stringify(this._checkEmailSocial));

                this.apiService.checkEmail(this._checkEmailSocial).subscribe(data => {
                    var result =  JSON.parse(JSON.stringify(data));
                    console.log("Data response Login Social : " + JSON.stringify(data));
                    if(result["success"] == true){
                                this.RegAndLog = false;
                                this.userMenu = true;
                                this.firstNameView = this.user.firstName;
                                this.lastNameView = this.user.lastName;
                                this.closeAllDialog();
                       
                    }else{
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
        else if(this.responRecaptcha == null){
            this.invalid = 'Please input Captcha key !!'
            this.alertValidate();
            this.userMenu = false;
            this.RegAndLog = true;
        }
        else{

        this._checkLoginModel.email = $('#email-login').val();
        this._checkLoginModel.password = $('#password-login').val();
        this._checkLoginModel.mediaType =  "NORMAL";
        this._checkLoginModel.accessToken = "";

        this.apiService.checkLogin(this._checkLoginModel).subscribe(data => {
            var result =  JSON.parse(JSON.stringify(data));
            console.log("Data response Login Normal : " + JSON.stringify(data));
            if(result["success"] == true){
                if(result["data"]["CUST_STATUS"] == "Y"){
                    console.log("Data information User : " + result["data"]["CARD_ID"]);
                    this.firstNameView = result["data"]["CUST_FIRSTNAME"];
                    this.lastNameView = result["data"]["CUST_LASTNAME"];
                    this.RegAndLog = false;
                    this.userMenu = true;
                    this.closeAllDialog();
                }else{
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

        // this.firstNameView = "Prasittichai";
        // this.lastNameView = "Samngam";

        // this.userMenu = true;
        // this.RegAndLog = false;
        // this.closeAllDialog();
        }
    }

    logout() {
        this.userMenu = false;
        this.RegAndLog = true;
        this.closeAllDialog();
        this.user = null;
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
        $(document).ready(function () {
            
                      $("#myModal").on("show", function () {   
                          $("#myModal a.btn").on("click", function (e) {
                              $("#myModal").modal('hide');
                          });
                      });
                      $("#myModal").on("hide", function () {    // remove the event listeners when the dialog is dismissed
                          $("#myModal a.btn").off("click");
                      });
                      $("#myModal").on("hidden", function () {  // remove the actual elements from the DOM when fully hidden
                          $("#myModal").remove();
                      });
                      $("#myModal").modal({                    // wire up the actual modal functionality and show the dialog
                          "backdrop": "static",
                          "keyboard": true,
                          "show": true                     // ensure the modal is shown immediately
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

