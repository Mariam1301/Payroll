import { Component, inject, output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AvatarModule } from 'primeng/avatar';
import { selectUser, selectUserState } from '../../../store/user/user.selector';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AuthUser } from '../../../store/user/user.state';
import { UiLanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'ui-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [AvatarModule, AsyncPipe, UiLanguageSwitchComponent],
})
export class UiHeaderComponent {
  menuClicked = output();

  private readonly _store = inject(Store<{ user: AuthUser }>);

  user$ = this._store.select(selectUser).pipe(
    map((value) => {
      return value?.name[0];
    })
  );
}
