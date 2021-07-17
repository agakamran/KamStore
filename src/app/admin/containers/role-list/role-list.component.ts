import { Component, OnInit} from '@angular/core';
import { NotificationService } from 'src/app/helpers/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRole, IRoleEdit, IRoleModifi } from 'src/app/models/_role';
import { RolesService } from 'src/app/services/roles.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { getIsAdmin } from 'src/app/auth/store/auth.selectors';
import { getMenuData } from 'src/app/core/store/menus.selectors';
import { NavbarRole, NavRole } from 'src/app/models/_menu';
import { NavbarService } from 'src/app/services/navbar.service';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  constructor(private store$: Store,public _kamService: RolesService, public store: Store<AppState>,
    private _caSer: NavbarService,private noti: NotificationService ) {  }  
  //----------------------  
  id:string='';name:string;
  editform:FormGroup;
  ToDelete: string[]=[];
  ToAdd: string[]=[];
  usrol:IRoleEdit= new IRoleEdit();
  //---------------------
   narol:NavRole[]=[];
   //listnav:MenuItem[]=[];
  //-------------------------
  addform: FormGroup; 
  
  listrole:IRole[] = []; 
  filteredrole: IRole[];
  _listFilter: any;  
  get listFilter(): string {    return this._listFilter;   }
  set listFilter(value: string) { this._listFilter = value; 
  this.filteredrole = this.listFilter ? this.performFilter(this.listFilter) : this.listrole; }  
  performFilter(filterBy: string): IRole[] {
    filterBy = filterBy.toLocaleLowerCase();
   return this.listrole.filter((p: IRole) =>  p.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  //-----------------------
  ngOnInit() 
  {    
   //------------------------------------------------------
  this.addform = new FormGroup({  id:new FormControl(''), name: new FormControl('',[Validators.required])});
  this.editform= new FormGroup({  RoleId:new FormControl(null), RoleName:new FormControl('',Validators.required),
                                  IdsToAdd:new FormControl([]), IdsToDelete:new FormControl([]) });   
   //--------------------------------------------------------------------------------------------- 
   this._caSer._allnrol("Op").subscribe(list => { 
    this.narol = list;           
} , error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    this.store.select(getIsAdmin).subscribe(k=>{
      if(k) 
      {// console.log(k)
        this._kamService._getrole().subscribe(list=>
         { //console.log(list)
               this.listrole=list;
               this.filteredrole = this.listrole;              
         }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));                   
      }
     // else{}
    })      
  } 
    //-----------------yeni-----------------------------
    _ToAdd(ToAd:any){
        this.ToAdd.push( ToAd); 
        // console.log(this.ToAdd)
    }
    _ToDelete(ToDel:any){  this.ToDelete .push( ToDel);  } 
    _editrole(_id:any)
    {
      if(_id.id!='') 
      {
        this.id=_id.id;
        this.name=_id.name;
      //console.log(this.id+'pppp')  
      this._kamService._getUser(_id.id).subscribe(list =>
      {             
        // console.log(list) 
          this.usrol = list;       
      } , error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
      }      
    }  
    onedit()
    {
      if(this.ToAdd.length>0 ||this.ToDelete.length>0)
      {
        const bo:IRoleModifi= {RoleName: this.name,  RoleId:this.id, IdsToAdd:this.ToAdd, IdsToDelete:this.ToDelete ,sel:false}      
        this._kamService._EditRol(bo) ;
        this.ToDelete=[]; this.ToAdd=[];
      }
    }
    onadd()
    { 
      if(this.addform.valid)  
        {
            // console.log('geldi')
              this._kamService._CreateRole(this.addform.value)       
              this.noti.success('::Submitted successfully');    
              this.addform.reset();        
        }   
    }  
    ondel()
    {
          this.noti.warn('!Deleted successfully');     
          this._kamService._delRol(this.id).subscribe();  
    }
    _delrole(_id:any) {              
        if(_id.id!='') 
        {
          this.id=_id.id;
          this.name=_id.name;  
        }         
    } 
    //---------Edit Permishin---------------------
    _editnav(_id:any)
    {
      //console.log('SS')
      for (var i = 0; i < this.narol.length; i++) {  this.narol[i].isChecked=false;  }
      //console.log(this.narol)
      if(_id.id!='') 
      {
        this.id=_id.id;
        this.name=_id.name;       
        for (var i = 0; i < this.narol.length; i++) { 
          if(this.narol[i].name==this.name){
             this.narol[i].isChecked=true;            
          }
            
          }
       // console.log(this.id) 
      }      
    } 
    //--------------
    checkedEvnt(val) {   for(let i =0;i < this.narol.length;i++) { this.narol[i].isChecked = val;  }   }
 //-------------------------------------------------------------------------------
  onChangeRole(userRole:any, val) {
    //console.log(userRole)
    if(val){  
        for (var i = 0; i < this.narol.length; i++) { 
           if(this.narol[i].nid===userRole){
            this.narol[i].isChecked=true;                    
          }
        }
      }
    else{
      for (var i = 0; i < this.narol.length; i++) { 
        if(this.narol[i].nid===userRole){
         this.narol[i].isChecked=false;                    
       }
      }           
     }      
     this._caSer._delnavrol(this.id,'rol').subscribe();        
     for (var i = 0; i < this.narol.length; i++) {
      
      if(this.narol[i].isChecked==true){
        var nrs=new NavbarRole();
        nrs.nrid="";
        nrs.RoleId=this.narol[i].roleId;
        nrs.nid=this.narol[i].nid;
       this._caSer._addnavrol(nrs).subscribe();;
       }         
     } 
  } 
  // onpermitedit()
  //   {
  //     console.log(this.narol)
  //    this._caSer._delnavrol(this.id,'rol').subscribe();        
  //      for (var i = 0; i < this.narol.length; i++) {
        
  //       if(this.narol[i].isChecked==true){
  //        // console.log('Geldi')
  //         var nrs=new NavbarRole();
  //         nrs.nrid="";
  //         nrs.RoleId=this.narol[i].roleId;
  //         nrs.nid=this.narol[i].nid;
  //        this._caSer._addnavrol(nrs).subscribe();;
  //        }         
  //      } 
  //     //console.log(this.narol)
  //   }
 //-------------- 
}
