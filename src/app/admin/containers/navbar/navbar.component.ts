import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'src/app/models/_menu';
import { NotificationService } from 'src/app/helpers/notification.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Lang } from 'src/app/models/_carts';
import { IRole } from 'src/app/models/_role';
import { AuthService } from 'src/app/services/auth.service';



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
  nav:MenuItem=new MenuItem(); 
  _page: any[]; _pid:'';  ppnav:any=''
  _role:IRole[]; _rol:any; 
  constructor(private _auth: AuthService, private _caSer: NavbarService,
     private notificationService: NotificationService) {
     this.nav.nid="";
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
      this._caSer._getrole().subscribe(list=>
        { 
              this._role=list;                          
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!'));        
      this._yenile();
    }
_yenile()
{
  let rol=this._auth.getrole();
  this._caSer._allmenu(rol).subscribe( p=>{     
    this.listnav=p;
    this.filterednav = this.listnav; 
    this._page=this.listnav;
    this._page = this._page.filter(f=>f.pid===null && f.nisparent===true) 

    this._caSer._jsonmenu().subscribe( p=>{     
      this.jsonlistnav=p;
      console.log()
      this.addmenu();     
   })
   // console.log(this._page)
    });  
 }

get navid() { return this.navForm.get('nid'); }
//get parentid() { return this.navForm.get('pid'); }
// get ntitle() { return this.navForm.get('ntitle'); }
// get npath() { return this.navForm.get('npath'); }
// get nlan() { return this.navForm.get('nlan'); }
// get nicon() { return this.navForm.get('nicon'); }
langu(lan:any){  this._lan=lan; }
selPage(sel:any){ this._pid=sel;}
selrol(sel:any){ this._rol=sel;}
  _addnav()
  {
   // this.nav.nid='';
    this.nav.pid='';
    this.nav.ntitle='';
    this.nav.npath='';
    this.nav.nlan='';
    this.nav.nicon='';
    this.nav.nrol='';
    this.nav.ncsay=1;
    this.nav.nisparent=false;
  }
  _cline(){ 
    this.navForm = new FormGroup({  
      // navid: new FormControl(''),   
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
       this.nav.nrol=ca.nrol;
       this.nav.nisparent=ca.nisparent;
       this.nav.ncsay=ca.ncsay;
       
     }
 onadd()
  { 
    if(this.navForm.valid)  
    {
       console.log(this._page.find(x=>x.npid==this._pid ))
      // console.log(this.navForm.value.npid)
       console.log(this._rol)
       console.log(this._pid)     
      var kn;
      if(this.navForm.value.npid===undefined){kn=''}
      else{
        var gg=this._page.find(x=>x.ntitle==this.navForm.value.npid)
        if(gg!=null){kn=gg!.nid;}
        
      // console.log('111')
       //console.log(kn)
      }
      // let rr=this._role.find(x=>x.name===this._rol)?.id;
      // if(rr===this.navForm.value.nrol){ rr=this.navForm.value.nrol; }
     
     // let pp=this._page.find(x=>x.ntitle==this._pid)!.nid;
    //  if(pp===this.navForm.value.npath){ pp=this.navForm.value.npath; }
       var p={
        nid:this.nav.nid,
        pid:kn,
        ntitle:this.navForm.value.ntitle,
        npath:this.navForm.value.npath,
        nlan:this.navForm.value.nlan,
        nrol:this.navForm.value.nrol,
        nisparent:this.navForm.value.nisparent,
        ncsay:this.navForm.value.ncsay,
        nicon:this.navForm.value.nicon}
       //console.log(p)
       this._caSer._posmenu(p).subscribe();  
       this._yenile(); 
       this._addnav(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');                
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
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
         // console.log(p)
         this._caSer._posmenu(p).subscribe();  
      }
    }
    else
    {
      var kn;
      for (let item of this.listnav) 
      {
        if(item.pid===''){kn=''}
        else{
          kn=this.listnav.find(x=>x.ntitle===item.pid )!.nid;
       //   console.log('111')
         // console.log(kn)
        }
         var pp={
          nid:item.nid,
          pid:kn,
          ntitle:item.ntitle,
          npath:item.npath,
          nlan:item.nlan,
          nrol:item.nrol,
          nisparent:item.nisparent,
          ncsay:item.ncsay,
          nicon:item.nicon
        }
          console.log(pp)
         this._caSer._posmenu(pp).subscribe();  
      
      }
    }
  }
}
