import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-list',
  templateUrl: './manage-list.component.html',
  styleUrls: ['./manage-list.component.scss']
})
export class ManageListComponent implements OnInit {
  pageTitle= '';//Manager CENTER
  constructor() { }

  ngOnInit(): void {
  }

}
