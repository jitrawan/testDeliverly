import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModel } from '../../shared/models/header.model';
import { HeaderService } from '../../shared/services/header.service';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', '../../../assets/css/standard/utility.css', '../../../assets/css/standard/layout.css']
})
export class HeaderComponent implements OnInit {

    private headerModel: HeaderModel[];
    private resizeTimeout: number = 0;
    isMobileSize: boolean = false;
    isSidebarOpen: boolean = false;
    showOverlay: boolean = false;
    isLoginOpen: boolean = false;
    isRegisterOpen: boolean = false;
    isShowForgotPassword: boolean = false;
    userMenu: boolean = false;
    RegAndLog: boolean = true;
    isEditProfileOpen: boolean = false;
    isChangePasswordOpen: boolean = false;
    isCaptchaOpen: boolean = false;
    showEmergency: boolean;
    actionTrigger: triggerType = {
        login: 'login',
        signUp: 'signup',
        forgotPassword: 'forgot'
    }
    userActionTrigger: userTriggerType = {
        edit: 'edit',
        change: 'change',
    }
    emailSocial: String;
    nameSocial: String;
    lastNameSocial: String;
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
        this.resizeTimeout = setTimeout((() => {
            this.checkSidebar(event.target.innerWidth);
        }).bind(this), 100);
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private headerService: HeaderService,
        private router: Router,
        private authService: AuthService
    ) {
        this.showEmergency = false;
    }

    ngOnInit() {
        this.resizeTimeout = 0;

        this.headerService.getHeaderMenu().subscribe(response => {
            this.headerModel = response['data'];
        });

        this.authService.authState.subscribe((user) => {
            this.user = user;
            if (this.user != null) {
                this.emailSocial = this.user.email;
                this.nameSocial = this.user.firstName;
                this.lastNameSocial = this.user.lastName;
            }
        });


    }

    signInWithFB(): void {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    ngAfterViewInit() {
        // setTimeout(_ => this.navbarContent = this.child.nativeElement.innerHTML);
    }

    routeMenu(route: string) {
        this.router.navigate([route]);
    }

    triggerSidebar() {
        if (this.isSidebarOpen === false && this.isMobileSize) {
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
            this.isLoginOpen = false;
            this.isShowForgotPassword = false;
            this.isRegisterOpen = true;
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

    checkSidebar(width) {
        if (width <= 992) {
            this.isMobileSize = true;
        } else {
            this.isMobileSize = false;
            this.triggerSidebar();
        }
    }

    overlayClicked(event) {
        this.closeAllDialog();
    }

    checklogin() {
        // (<HTMLInputElement>document.getElementById("email")).value == "test"
        // && (<HTMLInputElement>document.getElementById("password")).value == "test")
        this.userMenu = true;
        this.RegAndLog = false;
        this.closeAllDialog();
    }

    logout() {
        window.location.reload();
    }

    showEditProfile() {
        console.log('fuck');
        this.isRegisterOpen = true;
    }

    showEmergencyWrap() {
        this.showEmergency = true;
    }

    hideEmergencyWrap() {
        this.showEmergency = false;
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
}