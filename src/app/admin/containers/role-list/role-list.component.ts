import { Component, OnInit} from '@angular/core';
import { NotificationService } from 'src/app/helpers/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRole, IRoleEdit, IRoleModifi } from 'src/app/models/_role';
import { RolesService } from 'src/app/services/roles.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { getIsAdmin } from 'src/app/auth/store/auth.selectors';
import { MenuItem, NavbarRole, NavRole } from 'src/app/models/_menu';
import { NavbarService } from 'src/app/services/navbar.service';
import { getMenuData } from 'src/app/core/store/menus.selectors';


@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  constructor(public _kamService: RolesService, public store: Store<AppState>,private store$: Store,
    private _caSer: NavbarService,private noti: NotificationService ) {  }  
  //----------------------  
  id:string='';name:string;
  editform:FormGroup;
  ToDelete: string[]=[];
  ToAdd: string[]=[];
  usrol:IRoleEdit= new IRoleEdit();
  //---------------------
   //narol:NavRole[]=[];
   listnav:MenuItem[]=[];
   nnrol:MenuItem[]=[];
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
   this._caSer._getmenu().subscribe(list => { 
    this.listnav = list;           
   } , error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
  
  // this.store$.select(getMenuData).subscribe(p=>{
  //   this.listnav=p
  //   // console.log('112')
  //    //console.log(this.listnav)
  // //  for (var i = 0; i < this.listnav.length; i++)  {this.listnav[i].isChecked=false }
  //   console.log(this.listnav)
  // })
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
      this.id=_id.id;
      this.name=_id.name; 
      for (var i = 0; i < this.listnav.length; i++)  {this.listnav[i].isChecked=false }
      this._caSer._allnrol(_id.name).subscribe(list=>
      { 
           this. nnrol=list;  
           //console.log(this.nnrol)    
           for (var j = 0; j < this.nnrol.length; j++) 
           {
            //  console.log(this.nnrol) 
            //  console.log(this.nnrol[j].nid)
            //  console.log(this.listnav) 
              for (var i = 0; i < this.listnav.length; i++) 
              { 
                //console.log(this.listnav[i].nid +'='+this.nnrol[j].nid +'='+ this.listnav[i].id 
              //  +'='+ this.nnrol[j].id)

               if(this.listnav[i].nid===this.nnrol[j].nid //&& this.listnav[i].id===this.nnrol[j].id
                )
                {
                  //console.log(this.listnav[i].isChecked)
                  this.listnav[i].isChecked=true;
                 // console.log(i)  
                 // console.log(this.listnav)         
                } 
              } 
            }
           
      }, error => console.error(error + 'Siz ')); 
     // console.log(this.listnav)
     //  console.log('SS')
    
    } 
  //------------------------------------------------------------
    checkedEvnt(val) {   for(let i =0;i < this.listnav.length;i++) { this.listnav[i].isChecked = val;  }   }
  //-------------------------------------------------------------------------------
  onChangeRole(nid:any, val){
    if(val){ 
            var nrs=new NavbarRole();
            nrs.nrid="";
            nrs.RoleId=this.id;
            nrs.nid=nid;
            this._caSer._addnavrol(nrs).subscribe(); 
          }
      else{
           var nrs=new NavbarRole();
            nrs.nrid="";
            nrs.RoleId=this.id;
            nrs.nid=nid;
            this._caSer._delnavrol(nrs).subscribe();                   
       } 
      } 
 
 //-------------- 
}
