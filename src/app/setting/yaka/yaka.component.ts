import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { yaka,  gender } from 'src/app/models/_settings';
import { Lang } from 'src/app/models/_carts';
import { SettingsService } from 'src/app/services/settings.service';
import { NotificationService } from 'src/app/helpers/notification.service';

@Component({
  selector: 'app-yaka',
  templateUrl: './yaka.component.html',
  styleUrls: ['./yaka.component.scss']
})
export class YakaComponent implements OnInit {
  yakForm: FormGroup; 
  listyak:yaka[] = []; 
  filteredyak: yaka[];
  yak:yaka=new yaka(); 
  _lang:Lang[]=[{lid: '1', lname: 'Az'},{lid: '2', lname: 'En'},{lid: '3', lname: 'Ru'} ];  _lan='';
  _yak: yaka[];  _pid:'';
  //_page: item_categoriy[];_cat; catname: string;
  _gender: gender[];_gen:any; gender:any;
  constructor( private _caSer: SettingsService,
     private notificationService: NotificationService) {
     this.yak.yaka_Id="";
   }   
   ngOnInit(): void {
    this.yakForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     yaka_name: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
     gender_Id: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
    });  
      this._caSer._getgender().subscribe( p=>{ this._gender=p;//console.log(p)
        //this._page=this._page.filter(g=>g.parid==='')
      });  
      this._caSer._getyaka().subscribe(list=>
        { 
           this.listyak=list; 
           this.filteredyak = this.listyak; 
          // console.log(this.listyak)                        
        }, error => console.error(error + 'Siz sistemə daxil olmalısınız!')); 
    }
get yaka_name() { return this.yakForm.get('yaka_name'); }
get gender_Id() { return this.yakForm.get('gender_Id'); }

langu(lan:any){  this._lan=lan; }
//selcat(sel){ this._cat=sel;}
selgen(sel:any){ this._gen=sel;}
  _addyak() {
    this.yak.yaka_Id='';   
    this.yak.yaka_name='';  
    this.yak.gender_Id='';  
  }
  _cline(){ 
    this.yakForm = new FormGroup({         
      yaka_Id: new FormControl(''),
      yaka_name: new FormControl(''),   
      });     
   }
   _edityak(ca:yaka){ 
   // console.log('12111')   
    // console.log(ca)  

       this.yak.yaka_Id=ca.yaka_Id;
       this.yak.yaka_name=ca.yaka_name;
       if(ca.gender_Id!=null) {
         this.gender=this._gender.find(x=>x.gender_name==ca.gender_Id)!.gender_Id;  
       }     
       
       this.yak.gender_Id=ca.gender_Id;
      // console.log( this.catname)        
     }
 onadd()
  { 
    if(this.yakForm.valid)  
    {
       //console.log('333')
      // console.log(this.yakForm.value)
      let _gender_Id='';
      if(this.gender!=null){
        _gender_Id= this._gender.find(x=>x.gender_name===this.gender )!.gender_Id
      }
       var p={
        yaka_Id:this.yak.yaka_Id  ,
        yaka_name:this.yakForm.value.yaka_name,         
        gender_Id:_gender_Id      
             
      }
      //  console.log(p)
      //  console.log('33311')
       this._caSer._posyaka(p).subscribe();       
       this._addyak(); 
       this._cline();   
       this.notificationService.success('::Submitted successfully');             
    }   
  } 
  ondel()
  {
        this.notificationService.warn('!Deleted successfully');     
        this._caSer._delyaka(this.yak).subscribe();  
       // this._yenile();
  } 
}
