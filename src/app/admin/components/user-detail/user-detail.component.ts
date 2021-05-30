import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Customer } from 'src/app/manage/customers/models/customer.model';
import { Project } from 'src/app/manage/projects/models/project.model';

import { User } from 'src/app/models/_users';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Input() projects: Project[];
  @Input() customers: Customer[];
  @Input() userProjectsLoading: boolean;
  @Input() userCustomersLoading: boolean;
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() projectsLoad = new EventEmitter<any>();
  @Output() customersLoad = new EventEmitter<any>();
  @Output() projectDeleted = new EventEmitter<Project>();
  @Output() customerDeleted = new EventEmitter<Customer>();
  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  closeDetails() {
    this.detailsClosed.emit();
  }

  loadProjects() {
    this.projectsLoad.emit();
  }

  loadCustomers() {
    this.customersLoad.emit();
  }

  onProjectDelete(project: Project) {
    this.projectDeleted.emit(project);
  }

  onCustomerDelete(customer: Customer) {
    this.customerDeleted.emit(customer);
  }

  onAddAdmin() {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin() {
    this.removeAdmin.emit(this.user);
  }
}
