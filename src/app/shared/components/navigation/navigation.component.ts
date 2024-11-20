import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
})
export class UiNavigationComponent {
  navigation = input.required<NavigationModel[]>();

  navigationClicked = output();
}

export interface NavigationModel {
  title: string;
  path: string;
  icon?: string;
  subItems?: NavigationModel[];
}
