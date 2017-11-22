import { Component, OnInit , AfterViewInit , HostListener , ElementRef , ViewChild , Renderer2 } from '@angular/core';

@Component({
   selector: 'app-navbar',
   templateUrl: './header.component.html',
   styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   private resizeTimeout: number = 0;
   private showSideNav: boolean = false;
   private isSidebarOpen: boolean = false;
   
   @ViewChild('navSideBar') 
   private navSideBar : ElementRef;

   @HostListener('window:resize', ['$event'])
   onWindowResize(event) {
      
      if (this.resizeTimeout) {
         clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout((() => {
         this.checkSidebar(event.target.innerWidth);
      }).bind(this), 100);
   }
   
   constructor(private el : ElementRef , private renderer : Renderer2 ) {
   }

   ngOnInit() {
      this.resizeTimeout = 0;
      this.checkSidebar(window.innerWidth);

   }

   triggerSidebar() {

      if(this.isSidebarOpen === false) {
         this.isSidebarOpen = true;
         this.renderer.addClass(this.navSideBar.nativeElement,'show');
      } else {
         this.isSidebarOpen = false;
         this.renderer.removeClass(this.navSideBar.nativeElement,'show');
      }

   }
   checkSidebar(width){
      console.log(width)
      if(width <= 992) {
         this.showSideNav = true;
      } else {
         this.showSideNav = false;
      }
   }
   ngAfterViewInit() {
      
      // setTimeout(_ => this.navbarContent = this.child.nativeElement.innerHTML);
   }

}
