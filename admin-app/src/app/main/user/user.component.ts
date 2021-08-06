import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageContstants } from 'src/app/core/common';
import { DataService, NotificationService } from 'src/app/core/services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular2-dropdown-multiselect';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  
  @ViewChild('modalAddEdit') public modalAddEdit: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 1;
  public filter: string = '';
  public users: any[];
  public totalRows: number = 0;
  public entity: any;
  public isDisabledUpdateButton: boolean = false;
  //public myRoles: string[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[] = [];
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };
  public isEditAction: boolean = false;

  public multiSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 5,
    displayAllSelectedText: true
  };

  public multiSelectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };
  
  constructor(private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onLoad();
    this.onLoadRoles();
  }

  onLoad(): void{
    this.dataService.get(`/api/appUser/getlistpaging?page=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
    .subscribe((response: any) => {
      if(response) {
        this.users = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRows = response.TotalRows;
      }
    },
    () => {
      this.notificationService.printErrorMessage(MessageContstants.LOAD_FAILED_MSG);
    });
  }

  onSearch(){
    this.onLoad();
  }

  onPageChanged(event: any): void{
    this.pageIndex = event.page;
    this.onLoad();
  }

  onShowAddModal(): void{
    this.entity = {};
    this.modalAddEdit.show();
    this.isDisabledUpdateButton = false;
    this.isEditAction = false;
  }

  onShowEditModal(id: any): void{
    this.onLoadUserDetail(id);
    this.modalAddEdit.show();
    this.isDisabledUpdateButton = false;
    this.isEditAction = true;
  }

  onLoadRoles(): void{
    this.dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for(let role of response){
        this.allRoles.push({id : role.Name, name: role.Description});
      }
    }
    , (error: any) => this.dataService.handleError(error))
  }

  onSaveChange(): void{
    this.isDisabledUpdateButton = true;
    if(!this.entity.Id || this.entity.Id === undefined){
      this.dataService.post('/api/appUser/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        if(response){
          this.notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
          setTimeout(() => {
            this.modalAddEdit.hide();
            this.onLoad();
          }, 2000);
        }
      }
      , (error: any) => {
         this.isDisabledUpdateButton = false;
         this.dataService.handleError(error);
      })
    }
    else{
      this.dataService.put('/api/appUser/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        if(response){
          this.notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
          setTimeout(() => {
            this.modalAddEdit.hide();
            this.onLoad();
          }, 2000);
        }
      }
      , (error: any) => {
         this.isDisabledUpdateButton = false;
         this.dataService.handleError(error);
      });
    }
  }

  onLoadUserDetail(id: any){
    this.dataService.get('/api/appUser/detail/' + id).subscribe((response: any) => {
      this.entity = response;
    });
  }

  onDeleteItem(id: any): void{
    this.notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG,() => this.onDeleteItemConfirm(id));
  }
  
  onDeleteItemConfirm(id: any): void{
    this.dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.onLoad();
    })
  }

  onSelectGender(event: any): void{
    this.entity.Gender = event.target.value;
  }
  
  onSelectBirthDay(value: any): void{
    this.entity.BirthDay = value.start.format('DD/MM/yyyy');
  }
}
