import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { NotificationService } from 'src/app/helpers/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { gender } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {
  pageTitle='';  
  genForm: FormGroup; 
  listgen:gender[] = []; 
  filteredgen: gender[];
  gen:gender=new gender(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _page: gender[];  _pid:'';
  
  constructor(private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.gen.genId="";
   }

   ngOnInit(): void {
    this.genForm = new FormGroup({     
     genname: new FormControl('', [Validators.required,Validators.maxLength(50)])         
    });  
      //this._caSer._getfirma().subscribe( p=>{ this._page=p;console.log(p)});  
      this._caSer._getgender().subscribe(list=>
        { 
           this.listgen=list; 
           this.filteredgen = this.listgen; 
           //console.log(this.listgen)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }
get genname() { return this.genForm.get('genname'); }

langu(lan:any){  this._lan=lan; }
  _addgen(){
    this.gen.genname='';   
  }
  _cline(){ 
    this.genForm = new FormGroup({  
       
      genId: new FormControl(''),
      genname: new FormControl('')
      });
     
   }
   _editgen(ca:gender){  
       this.gen.genId=ca.genId;
       this.gen.genname=ca.genname;//this._page.find(x=>x.pid==ca.pId).pagename;
           
     }
 onadd()
  { 
    if(this.genForm.valid)  
    {
       var p={
             genId:this.gen.genId  ,
             genname:this.genForm.value.genname
            }
      //  console.log(p)
       this._caSer._postgender(p).subscribe();  
       //this._yenile(); 
       this._addgen(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');         
                     
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delgender(this.gen).subscribe(); 
       
  } 

}
