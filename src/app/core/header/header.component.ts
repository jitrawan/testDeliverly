import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderModel } from '../../shared/model/header.model';
import { HeaderService } from '../../shared/service/header.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private headerModel: HeaderModel[];
    private resizeTimeout: number = 0;
    private isMobileSize: boolean = false;
    private isSidebarOpen: boolean = false;
    private showOverlay: boolean = false;
    private isLoginOpen: boolean = false;
    private isRegisterOpen: boolean = false;
    private isShowForgotPassword: boolean = false;

    @ViewChild('navSideBar') private navSideBar: ElementRef;
    @ViewChild('modalBox') private modalBox: ElementRef;

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
    
    triggerDialog(type:string) {

        this.showOverlay = true;
        this.renderer.addClass(this.modalBox.nativeElement, 'show');
        
        if(type === 'login') {
            this.isRegisterOpen = false;
            this.isShowForgotPassword = false;
            this.isLoginOpen = true;
        } else if(type === 'signUp') {
            this.isLoginOpen = false;
            this.isShowForgotPassword = false;
            this.isRegisterOpen = true;
        } else if(type === 'forgot') {
            this.isLoginOpen = false;
            this.isRegisterOpen = false;
            this.isShowForgotPassword = true;
        }
        
        this.isSidebarOpen = false;
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');
    }


    closeAllDialog() {
        this.renderer.removeClass(this.modalBox.nativeElement, 'show');
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
}
