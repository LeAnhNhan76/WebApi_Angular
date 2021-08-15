import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { UrlConstants } from 'src/app/core/common';
import { LoggedInUser } from 'src/app/core/domain';
import { AuthenService, DataService, SignalrService } from 'src/app/core/services';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public user: LoggedInUser;
  public announcements: any[];
  public canSendMessage : boolean;
  constructor(private authenService: AuthenService
    , private dataService: DataService
    , private signalRService: SignalrService
    , private ngZone: NgZone
    , private router: Router) { }

  ngOnInit(): void {
    this.user = this.authenService.getLoggedinUser();
    this.onLoadAnnouncements();
    this.subscribeToEvents();
    this.canSendMessage = this.signalRService.connectionExists;
  }

  private subscribeToEvents(): void {

    var self = this;
    self.announcements = [];

    // if connection exists it can call of method.  
    this.signalRService.connectionEstablished.subscribe(() => {
      this.canSendMessage = true;
    });

    // finally our service method to call when response received from server event and transfer response to some variable to be shwon on the browser.  
    this.signalRService.announcementReceived.subscribe((announcement: any) => {
      this.ngZone.run(() => {
        announcement.CreatedDate = moment(moment(announcement.CreatedDate).format("YYYYMMDD"), "YYYYMMDD").fromNow();
        self.announcements.push(announcement);
      });
    });
  }

  onMarkAsRead(id: number) {
    var body = { announId: id };
    this.dataService.get('/api/Announcement/markAsRead?announId=' + id.toString()).subscribe((response: any) => {
      if (response) {
        this.onLoadAnnouncements();
      }
    });
  }

  onLoadAnnouncements() {
    this.dataService.get('/api/Announcement/getTopMyAnnouncement').subscribe((response: any) => {
      this.announcements = [];
      for (let item of response) {
        item.CreatedDate = moment(moment().format("YYYYMMDD"), "YYYYMMDD").fromNow();
        this.announcements.push(item);
      }
    });
  }

  onLogout(): void{
    this.authenService.logout();
    setTimeout(() => {
      this.router.navigate([UrlConstants.LOGIN]);  
    }, 3000);
  }
}
