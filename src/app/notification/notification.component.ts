import { Component, OnInit } from '@angular/core';
import { NotificationserviceService } from '../service/notification/notificationservice.service';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

 notificationMessage!: any
  constructor(private notificationService : NotificationserviceService){}

 ngOnInit(): void {
  this.notificationService.notification$.subscribe((notification) => {
    this.notificationMessage = notification;  
  });
}
}
