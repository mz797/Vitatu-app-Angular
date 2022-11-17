import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit {
  @Input() defaultColor: string = 'rgb(254, 254, 248)';
  @Input() highlightColor: string = 'rgb(254, 254, 248)';
  @HostBinding('style.backgroundColor') backgroundColor: string;
  @HostBinding('style.transition') transition: string;

  constructor() {}
  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'rgb(253, 253, 210)';
    this.transition = 'background-color .1s';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent';
    this.transition = 'background-color .1s';
  }
}
