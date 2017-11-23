import { Component, OnInit, AfterViewInit, HostListener, ElementRef, ViewChild, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private resizeTimeout: number = 0;
    private isMobileSize: boolean = false;
    private isSidebarOpen: boolean = false;
    private showOverlay: boolean = false;
    private isLoginOpen: boolean = false;
    private isRegisterOpen: boolean = false;

    @ViewChild('navSideBar') private navSideBar: ElementRef;

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
            this.checkSidebar(event.target.innerWidth);
        }).bind(this), 100);
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    ngOnInit() {
        this.resizeTimeout = 0;
        this.checkSidebar(window.innerWidth);

    }
        
    ngAfterViewInit() {
        // setTimeout(_ => this.navbarContent = this.child.nativeElement.innerHTML);
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

        if(type === 'login') {
            this.isLoginOpen = true;
        } else if(type === 'signUp') {
            this.isLoginOpen = false;
            this.isRegisterOpen = true;
        }
        
        this.isSidebarOpen = false;
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');
    }


    closeAllDialog() {
        this.isSidebarOpen = false;
        this.showOverlay = false;
        this.isLoginOpen = false;
        this.isRegisterOpen = false;
        this.renderer.removeClass(this.navSideBar.nativeElement, 'show');
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
