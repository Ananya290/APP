import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class NotificationserviceService {


  constructor() { }

  private notificationSubject = new BehaviorSubject<AppNotification>({
    message: '',
    type: 'success',
    show: false
  })

  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string) {
  this.showMessage(message, 'success');
}
 showError(message: string) {
    this.showMessage(message, 'error');
  }

  showInfo(message: string) {
    this.showMessage(message, 'info');
  }

  private showMessage(message: string, type: 'success' | 'error' | 'info') {
    this.notificationSubject.next({
      message,
      type,
      show: true
    });  setTimeout(() => {
      this.clear();
    }, 5000);
  }


  clear() {
    this.notificationSubject.next({
      message: '',
      type: 'success',
      show: false
    });
  }
}

export interface AppNotification {
 message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;     
  }