import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' }) 
export class ThemeService {
  isDarkMode = signal(false);
  
  constructor() {
    effect(() => {
      if (this.isDarkMode()) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(v => !v);
  }
}