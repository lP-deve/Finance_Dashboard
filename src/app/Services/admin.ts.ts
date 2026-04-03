import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminTs {
  userRole = signal<'admin' | 'viewer'>('admin');

  setRole(role: 'admin' | 'viewer') {
    this.userRole.set(role);
  }
}
