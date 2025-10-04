import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  imports : [CommonModule],
})
export class ContainerComponent implements OnInit {
  @Input() text: string = 'Box';
  @Input() color: string = '#3880ff';
  @Input() bgColor: string = '#3880ff';
  @Output() clicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  onClick() {
    this.clicked.emit();
  }

}
