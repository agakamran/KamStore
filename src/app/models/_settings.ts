export class gender {        
        genId: string;       
        genname: string;       
    }
export class firma {
    storId?:string;
    storname:string;
    storphone: string;
    storadress: string;
    storemail?: string;
    userId?: string; 
    storvoen?: number;
    storpercent?:number;
}
export class beden
{    
    bedenId:string;
    bedeni:string;
    trEu: string ; 
    uk: string ;
    us: string ;
    it : string ;
    koks : string ;
    bel: string ;
    ayakUz: string ;
    ichBacakBoyu: string ;
    yaka: string ;    
    kot: string ;
  //  kanvas : string ;   
    uzunluk: string ;    
    catId:string;  
    genId ?:string;    
}
export class _categoriy
{   
    catId:string;   
    catname:string;
    parid?:string;
    genId:string;
}
export class _color
{
    colId:string;
    colname:string;
    colurl:string;
    isChecked?:boolean;
}
export class yaka {      
        yakaId: string;        
        yakaname: string;
        genId:string;
    }
export class _desen{    
    desId:string;
    desname:string;
}
export class _marka{    
     markaId:string; 
     markaname:string;
}
export class _materal{    
    matId:string;    
    matname:string;
}
export class _stil{
   stilId:string;
   stilname:string;
}
export class kullanimAlani{    
    kulalanId: string;    
    kullanimname:string;    
}
export class kumashtipi{    
    kumashId: string;    
    kumashname: string;
}
export class qelip{    
    qelipId: string;    
    qelipname: string;
}
export class qoltipi{   
    qolId: string;
    qoltipiname: string;
    genId:string;
}
//--------------------
export class product{  
    proId:string; 
    genId:string; 
    catId:string;        
    markaId:string;    
    bedenId: string;  
    colId:string;   
    qelipId: string; 
    matId:string;   
    yakaId:string;    
    qolId:string ;    
    stilId: string;    
    desId: string;   
    kulalanId: string;    
    kumashId: string; 
    prodname:string;   
    barcode?: number;  
    storId:string ;           //magaza
    boxquantity?:number;      //qutuda olan 
    unitsinstock:number;      //anbarda olan       
    buy_unitprice: number;     //birinin      alish
    sell_unitprice:number;   //birinin      satish       
    discount:number;          //скидка    
    ModifiedDate: string;
    Discontinued:boolean;       //Снято с производства    
    opr:string;                //emeliyyat 
    delivery?: boolean;        //chatdirilma
     
}
export class orderdet  {
        ordId:string; 
        proId:string;
        boxquantity:number;//qutuda
        quantity:number;//количество  
        unitprice:number;//Цена за единицу      alish  
        discount:number;//скидка      
        unitsinstock:number;//Единицы на складе    satish
        unitsonorder:number;//Единицы по заказу
        reorderlevel:number;//Уровень повторного заказа
        opr ?:string;      //emeliyyat        
        storId:string;
        ormId:string;//order master
        UserId:string;       
    }

export class prodphoto{
    photoId:string;
    proId:string;
    photourl:string;
}

//--------------------
export class _sales{    
    salesId:string;    
    itemId:string;    
    saledate:Date;
    shipdetId:string;
}
export class shipper{    
    shipdet_Id:string;   
    userId:string;
    clientname:string;
    clientsity:string;    
    clientstrit: string;
    clienthouse:string;
    clientflat:string;  
    clientphone: string;    
    clientemail:string ;
}