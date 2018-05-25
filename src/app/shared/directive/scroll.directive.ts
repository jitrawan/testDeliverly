import { Directive, HostListener, ElementRef, EventEmitter, Output, Input } from '@angular/core';

@Directive({
  selector: '[scrollable]'
})
export class ScrollDirective {

  @Output() scrollPosition = new EventEmitter()
  @Input('heightTrigger') heightTrigger:number;
  
  constructor(private el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    try {
      var top = event.target.scrollingElement.scrollTop;

      if (top > this.heightTrigger) {
        this.scrollPosition.emit(true);
      } else {
        this.scrollPosition.emit(false);
      }

    } catch (err) {

    }
  }
  
}
