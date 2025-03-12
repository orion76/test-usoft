import { Component, computed, model, ViewEncapsulation } from '@angular/core';
import { IFieldView } from './types';

@Component({
  selector: 'app-library-view',
  template: `
  <div class="dialog-layout" (click)="close()">
    <dialog class="dialog-window" [open]="open()">
    @for(field of fields(); track field.name){
      <div class="library-field">
        <div class="field-name">{{field.name}}</div>
        <div class="field-content">{{field.content}}</div>
      </div>
    }
    <div class="dialog-buttons">
      <button (click)="close()" >Закрыть</button>
    </div>
    </dialog>
  </div>
  `,
  styleUrl: 'library-view.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class LibraryViewComponent {
  SHOW_FIELDS: string[] = ['n', 'name', 'address'];

  data = model<Record<string, string>>();
  open = computed(() => Boolean(this.data()))

  fields = computed<IFieldView[] | undefined>(() => {
    const _data = this.data();

    if (_data === undefined) {
      return;
    }

    return this.SHOW_FIELDS.map((name) => ({ name, content: _data[name] })
    )
  })

  close() {
    this.data.set(undefined);
  }
}
