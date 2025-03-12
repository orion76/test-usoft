import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './services/loader/loader.component';
import { LoadingService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: 'app.component.scss',
  standalone: true,
  host: {
    'class': 'app-root'
  },
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  loader = inject(LoadingService);
}
