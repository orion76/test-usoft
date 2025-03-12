import { Component, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
 @if(showLoader()){
  <div class="loader-layout">
    <div class="loader-dual-ring"></div>
  </div>
 }
`,
  styleUrl: 'loader.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
  showLoader = input.required<boolean>()
}
