import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModel } from '../../shared/models/header.model';
import { HeaderService } from '../../shared/services/header.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css', '../../../assets/css/standard/utility.css']
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
    username: boolean = true;
    regAndLog: boolean = true;
    isEditProfileOpen: boolean = false;
    isChangePasswordOpen: boolean = false;
    actionTrigger: triggerType = {
        login: 'login',
        signUp: 'signup',
        forgotPassword: 'forgot'
    }
    userActionTrigger: userTriggerType = {
        edit: 'edit',
        change: 'change',
    }

    @ViewChild('navSideBar') private navSideBar: ElementRef;
    @ViewChild('modalBox') private modalBox: ElementRef;
    @ViewChild('userModalBox') private userModalBox: ElementRef;

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
        private router: Router) {
    }

    ngOnInit() {
        this.resizeTimeout = 0;

        this.headerService.getHeaderMenu().subscribe(response => {
            this.headerModel = response['data'];
        });

        this.checkSidebar(window.innerWidth);
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
    }

    userTriggerDialog(type: string) {
                console.log("ice")
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
            }

    closeAllDialog() {
        this.renderer.removeClass(this.modalBox.nativeElement, 'show');
        this.renderer.removeClass(this.userModalBox.nativeElement, 'show');
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');

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
        if ((<HTMLInputElement>document.getElementById("email")).value == "test"
            && (<HTMLInputElement>document.getElementById("password")).value == "test") {
            console.log("test");

            this.username = !this.username;
            this.regAndLog = !this.regAndLog;
            this.renderer.removeClass(this.modalBox.nativeElement, 'show');
            this.isSidebarOpen = false;
            this.showOverlay = false;
            console.log("pass");
        } else {
            console.log("false");
            return false;
        }
    }

    logout(){
		window.location.reload();
	}
}
interface triggerType {
    login: string;
    signUp: string;
    forgotPassword: string;
}

interface userTriggerType{
    edit: string;
    change: string;
}