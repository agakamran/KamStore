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
     this.yak.yakaId="";
   }   
   ngOnInit(): void {
    this.yakForm = new FormGroup({  
     // firma_id: new FormControl('', [Validators.required,Validators.maxLength(36)]),   
     yakaname: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
     genId: new FormControl('', [Validators.required,Validators.maxLength(50)]),   
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
get yakaname() { return this.yakForm.get('yakaname'); }
get genId() { return this.yakForm.get('genId'); }

langu(lan:any){  this._lan=lan; }
//selcat(sel){ this._cat=sel;}
selgen(sel:any){ this._gen=sel;}
  _addyak() {
    this.gender='';
    this.yak.yakaId='';   
    this.yak.yakaname='';  
    this.yak.genId='';  
  }
  _cline(){ 
    this.yakForm = new FormGroup({         
      yakaId: new FormControl(''),
      yakaname: new FormControl(''),   
      });     
   }
   _edityak(ca:yaka){ 
   // console.log('12111')   
    // console.log(ca)  

       this.yak.yakaId=ca.yakaId;
       this.yak.yakaname=ca.yakaname;
       if(ca.genId!=null) {
         this.gender=this._gender.find(x=>x.genId==ca.genId)!.genname;  
       }     
       
       this.yak.genId=ca.genId;
       console.log( this.gender)        
     }
 onadd()
  { 
    if(this.yakForm.valid)  
    {
       //console.log('333')
      // console.log(this.yakForm.value)
      let _genderId='';
      if(this.gender!=null){
        _genderId= this._gender.find(x=>x.genname===this.gender )!.genId
      }
       var p={
        yakaId:this.yak.yakaId  ,
        yakaname:this.yakForm.value.yaka_name,         
        genId:_genderId      
             
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
