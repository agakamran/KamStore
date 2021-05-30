export interface Iinvoice {  
    
   _UserId: string;
   _pid: string;
   MovId:string;
   BId:string;
}
export class Ipayments {   
   _pid: string;
   _userId: string;    
   _Sum: number;
   _date:string;
   _file: File;
   //_imag:string; 
}
export interface Transaction {
   item: string;
   cost: number;
 }
 export class IPrise{
    _pid:string;
   _pname:string;
   _price:number;
   _pdate:string;
   is_actived:boolean;
   Percent:number;
 }
 