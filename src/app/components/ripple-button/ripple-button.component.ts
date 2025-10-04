import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonRippleEffect } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ripple-button',
  templateUrl: './ripple-button.component.html',
  styleUrls: ['./ripple-button.component.scss'],
  standalone: true,
  imports: [IonRippleEffect],
})
export class RippleButtonComponent {
  @Input() text: string = 'Button';      
  @Input() color: string = '#3880ff';     
  @Output() clicked = new EventEmitter<void>(); 

  onClick() {
    this.clicked.emit();
  }
}
