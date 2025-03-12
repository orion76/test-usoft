import { Component, model } from '@angular/core';


@Component({
  selector: 'app-library-search-form',
  template: `
    <input #searchQuery type="text" class="form-element form-input" />
    <button class="form-element form-button" (click)="setSearchText(searchQuery.value)">Найти</button>
  `,
  host: { 'class': 'search-form' },
  standalone: true
})
export class LibrarySearchFormComponent {

  searchText = model<string>('')

  setSearchText(searchText: string) {
    this.searchText.set(searchText);
  }
}
