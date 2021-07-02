import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
//import { Store } from '@ngrx/store';
//import { Observable } from 'rxjs';
//import { getUser } from 'src/app/auth/store/auth.selectors';
//import { StorageService } from 'src/app/helpers/storage.service';
import { MenuItem } from 'src/app/models/_menu';
import { User } from 'src/app/models/_users';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { environment } from 'src/environments/environment';
import { getMenuData } from '../store/menus.selectors';
import * as actions from '../store/menus.actions';                         
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title='kamStore'
  @Output() public sidenavToggle = new EventEmitter();  
  public onToggleSidenav = () => { this.sidenavToggle.emit(); }
  _menu:MenuItem[];_childmenu:any;
  _photoUrl=''
  @Input() user: User;
  @Input() isLoggedIn: boolean;
  @Input() isLoading: boolean;
  @Input() isAdmin: boolean;
  @Output() logout = new EventEmitter<User>(); 
  menudata$: Observable<MenuItem[]> = this.store$.pipe(select(getMenuData)); 
  constructor(private _aut:AuthService,private _caSer: NavbarService ,
    private store$: Store ) { }
  ngOnInit() {
    //var gg ;
     if(this._aut.getrole()!=undefined){//na='User' 
     // console.log('11')
    // console.log(this._aut.getrole())
      this.store$.dispatch(new actions.initMenu(this._aut.getrole())); 
    //  this.menudata$.subscribe( f => {
     
    //    console.log(f) ;
      // console.log('111') ;
    // });
    //  //console.log(gg) ;     
      

    // this._caSer._allmenu(this._aut.getrole()).subscribe( p=>{
    //    this._menu=p;        
    //    this._childmenu=this._menu.filter(g=>!g.nisparent && g.pid!=null);                 
    //  });
     this._photoUrl=environment.apiUrl.replace('/api/','/')+this.user.photoUrl;
    }         
  }
  onLogout() {  this.logout.emit(this.user); }
}

