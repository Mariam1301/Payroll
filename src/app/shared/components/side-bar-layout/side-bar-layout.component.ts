import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

@Component({
  templateUrl: './side-bar-layout.component.html',
  selector: 'ui-side-bar-layout',
  standalone: true,
  imports: [ButtonModule, NgClass, DrawerModule],
  // animations: [
  //   trigger('slideInOut', [
  //     transition(':enter', [
  //       style({ width: '0%' }), // Start from invisible
  //       animate('200ms', style({ width: '20%' })), // Expand
  //     ]),
  //     transition(':leave', [
  //       style({ width: '20%' }), // Start from invisible
  //       animate('200ms', style({ width: '0px' })), // Expand
  //     ]),
  //   ]),
  // ],
})
export class UiSideBarLayoutComponent {
  label = input<string>();

  isSidebarOpen = signal(true);

  // isDrawerOpen = signal(false);

  toggle() {
    this.isSidebarOpen.update((prev) => !prev);
  }

  // toggleDrawer() {
  //   this.isDrawerOpen.update((prev) => !prev);
  // }
}
