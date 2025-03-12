import { Routes } from '@angular/router';
import { LibraryListComponent } from './components/library-list/library-list.component';

export const routes: Routes = [
    { path: '', component: LibraryListComponent },
    { path: '**', redirectTo: '/' },
];
