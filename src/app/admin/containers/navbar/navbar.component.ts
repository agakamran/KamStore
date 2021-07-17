import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem, NavbarRole } from 'src/app/models/_menu';
import { NotificationService } from 'src/app/helpers/notification.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Lang } from 'src/app/models/_carts';
import { IRole } from 'src/app/models/_role';
//import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { getMenuData } from 'src/app/core/store/menus.selectors';
import { AppState } from 'src/app/reducers';
import { getId } from 'src/app/auth/store/auth.selectors';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  pageTitle='AddNavbar';  
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  navForm: FormGroup; 
  listnav:MenuItem[] = []; 
  jsonlistnav:MenuItem[] = [];
  filterednav: MenuItem[];
  nav:MenuItem=new MenuItem();; 
  _Id="";
  _page: any[]; _pid:'';  ppnav:any=''
  _role:IRole[]; _rol:any; 
  
  constructor(private store$: Store, private _caSer: NavbarService,//private _auth: AuthService,
     private noti: NotificationService,private store: Store<AppState>//,private fb: FormBuilder
     ) {  
     
   }
  
   ngOnInit(): void {
    this.navForm = new FormGroup({  
     // navid: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
      nid: new FormControl(''),
      npid: new FormControl(''),
      ntitle: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      npath: new FormControl('', [Validators.required,Validators.maxLength(50)]),  
      nrol: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      nisparent: new FormControl(false),
      ncsay: new FormControl(1),
      nlan: new FormControl('', [Validators.required,Validators.maxLength(2)])
    });  
     // this._caSer._getmenu().subscribe( p=>{ this._page=p;//console.log(p)
     // });  
     this.store.select(getId).subscribe(k=>{   this._Id=k;   })
      this._caSer._getrole(this._Id).subscribe(list=> { 
              this._role=list;  
              for (var i = 0; i < this._role.length; i++) {   this._role[i].isChecked=false;      }
              // console.log(this._role)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));        
      this._yenile();      
      }
      get selectedCheckboxList() {
        return this._role.filter(item => item.isChecked);
      }
   _yenile()
   {

 // let rol=this._auth.getrole();
 // this._caSer._allmenu(rol).subscribe( p=>{  
    this.store$.select(getMenuData).subscribe(p=>{    
    this.listnav=p;
    this.filterednav = this.listnav; 
    this._page=this.listnav;
    this._page = this._page.filter(f=>f.pid===null && f.nisparent===true) 
    if(this.listnav.length===0){
    this._caSer._jsonmenu().subscribe( p=>{     
          this.jsonlistnav=p;
        // console.log(this.listnav.length)
        //  this.addmenu();     
      })
    }   
   // console.log(this._page)
    });  
   }
 //--------------
 checkedEvnt(val) {   for(let i =0;i < this._role.length;i++) { this._role[i].isChecked = val;  }   }
 //-------------------------------------------------------------------------------
  onChangeRole(userRole:any, val) {
    if(val){  
        for (var i = 0; i < this._role.length; i++) { 
           if(this._role[i].name===userRole){
            this._role[i].isChecked=true;                    
          }
        }
      }
    else{
      for (var i = 0; i < this._role.length; i++) { 
        if(this._role[i].name===userRole){
         this._role[i].isChecked=false;                    
       }
      }           
     }      
      this._caSer._delnavrol(this.nav.nid,'').subscribe();        
       for (var i = 0; i < this._role.length; i++) {
        
        if(this._role[i].isChecked==true){
          var nrs=new NavbarRole();
          nrs.nrid="";
          nrs.RoleId=this._role[i].id;
          nrs.nid=this.nav.nid;
         this._caSer._addnavrol(nrs).subscribe();;
         }         
       } 
      // console.log(this._role)
   // console.log(this.checkboxlist);
  }
 
 //--------------

langu(lan:any){  this._lan=lan; }
selPage(sel:any){ this._pid=sel;}
selrol(sel:any){ this._rol=sel;}
  _addnav()
  {
    this.nav.nid='';
    this.nav.pid='';
    this.nav.ntitle='';
    this.nav.npath='';
    this.nav.nlan='';
    this.nav.nicon='';
    this.nav.nrol='';
    this.nav.ncsay=1;
    this.nav.nisparent=false;
    for (var i = 0; i < this._role.length; i++) { this._role[i].isChecked=false;    } 
  }
  _cline(){ 
    this.navForm = new FormGroup({  
       nid: new FormControl(''),   
       pid: new FormControl(''),
       ntitle: new FormControl(''),
       npath: new FormControl(''),     
       nlan: new FormControl(''),
       nrol: new FormControl(''),
      });
     
   }
   _editnav(ca:MenuItem){  
     // console.log(ca)  

       this.nav.nid=ca.nid;
     // if(ca.pid!=null){ this.ppnav=this._page.find(x=>x.nid==ca.nid).ntitle;}

      if(ca.pid===null){this.ppnav=null} 
        else {
          this.ppnav=this._page.find(x=>x.nid==ca.pid)!.ntitle;          
        }   
       this.nav.pid=ca.pid;
       this.nav.nlan=ca.nlan; 
       this.nav.ntitle=ca.ntitle;
       this.nav.npath=ca.npath;      
       this.nav.nisparent=ca.nisparent;
       this.nav.ncsay=ca.ncsay; 
       this.nav.nrol=ca.nrol;
       console.log(this._role)  
       for (var i = 0; i < this._role.length; i++) { this._role[i].isChecked=false;    } 
       for (var i = 0; i < this._role.length; i++) {         
          this._role[i].isChecked=false;
              if(this._role[i].name===ca.name){
               this._role[i].isChecked=true;            
        }
       }
       console.log(this._role)     
     }
  onadd()
  { 
    if(this.navForm.valid)  
    {
      // console.log(this._page.find(x=>x.npid==this._pid ))
      // console.log(this.navForm.value.npid)
      //  console.log(this._rol)
       console.log(this.navForm.value)     
      var kn;
      if(this.navForm.value.npid===undefined){kn=''}
      else{
        var gg=this._page.find(x=>x.ntitle==this.navForm.value.npid)
        if(gg!=null){kn=gg!.nid;}        
      }
       
       var p={
        nid:this.nav.nid,
        pid:kn,
        ntitle:this.navForm.value.ntitle,
        npath:this.navForm.value.npath,
        nlan:this.navForm.value.nlan,
        nrol:(this.navForm.value.nrol).toString(),
        nisparent:this.navForm.value.nisparent,
        ncsay:this.navForm.value.ncsay,
        nicon:this.navForm.value.nicon }
       console.log(p)
       this._caSer._posmenu(p).subscribe(); 
      // console.log(this._role) 
      
       this._yenile(); 
       this._addnav(); 
       this._cline();   
       this.noti.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.noti.warn('!Deleted successfully');     
        this._caSer._delmenu(this.nav).subscribe();  
        this._yenile();
  } 
  addmenu()
  { 
    if(this.listnav.length===0)
    {
      var kn;
      for (let item of this.jsonlistnav) 
      {
        
         var p={
          nid:'',
          pid:item.pid,
          ntitle:item.ntitle,
          npath:item.npath,
          nlan:item.nlan,
          nrol:item.nrol,
          nisparent:item.nisparent,
          ncsay:item.ncsay,
          nicon:item.nicon}
          //console.log('77')
         this._caSer._posmenu(p).subscribe();  
      }
    }
    // else
    // {
      //var kn;
      // for (let item of this.listnav) 
      // {
      //   console.log(item.pid)
      //   if(item.pid===''){kn=''}
      //   else{
      //     kn=this.listnav.find(x=>x.ntitle===item.pid )?.nid;
      //  //   console.log('111')
      //     console.log(kn)
      //   }
      //    var pp={
      //     nid:item.nid,
      //     pid:kn,
      //     ntitle:item.ntitle,
      //     npath:item.npath,
      //     nlan:item.nlan,
      //     nrol:item.nrol,
      //     nisparent:item.nisparent,
      //     ncsay:item.ncsay,
      //     nicon:item.nicon
      //   }
        //  console.log(pp)
         //this._caSer._posmenu(pp).subscribe();  
      
     // }
    //}
  }
}
