export class gender {        
        gender_Id: string;       
        gender_name: string;       
    }
export class firma {
    firma_Id?:string;
    firma_name:string;
    firma_telefon: string;
    firma_unvan: string;
    firma_email?: string;
    userId?: string; 
    voen?: number;
}
export class beden
{    
    beden_Id:string;
    beden:string;
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
    item_categoriy_Id:string;  
    gender_Id ?:string;    
}
export class item_categoriy
{   
    item_categoriy_Id:string;   
    item_categoriy_name:string;
    parid?:string;
    gender_Id:string;
}
export class item_color
{
    item_color_Id:string;
    item_color:string;
    url_color:string;
}
export class yaka {      
        yaka_Id: string;        
        yaka_name: string;
        gender_Id:string;
    }
export class item_desen{    
    item_desen_Id:string;
    item_desen_name:string;
}
export class item_marka{    
     item_marka_Id:string; 
     item_marka_name:string;
}
export class item_materal{    
    item_materal_Id:string;    
    item_materal_name:string;
}
export class item_stil{
   item_stil_Id:string;
   item_stil_name:string;
}
export class kullanimAlani{    
    kulalan_Id: string;    
    kullanim_name:string;    
}
export class kumashtipi{    
    kumash_Id: string;    
    kumash_name: string;
}
export class qelip{    
    qelip_Id: string;    
    qelip_name: string;
}
export class qoltipi{   
    qol_Id: string;
    qoltipi_name: string;
    gender_Id:string;
}
//--------------------
export class itemdetail{   
     item_Id:string;      
     firma_Id:string;   
     gender_Id:string;   
     item_categoriy_Id:string;    
     item_marka_Id:string;    
     beden_Id: string;  
     item_color_Id:string;   
     qelip_Id: string;   
     item_materal_Id:string;   
     yaka_Id:string;    
     qol_Id:string ;    
     item_stil_Id: string;    
     item_desen_Id: string;   
     kulalan_Id: string;    
     kumash_Id: string;    
     item_name:string;   
     item_code: string;   
     item_price:number;
     item_sales_price:number;  
     item_quantity:number;    
     item_discount:number;    
     item_hidden:boolean ;
    item_delivery: boolean;
    qaime_date: string;
}
export class items_photo{
    item_photo_Id:string;
    item_Id:string;
    item_photo_url:string;
}

//--------------------
export class item_sales{    
    item_sales_Id:string;    
    item_Id:string;    
    item_sale_date:Date;
    shipdet_Id:string;
}
export class ShippingDetail{    
    shipdet_Id:string;   
    userId:string;
    client_name:string;
    client_sity:string;    
    client_strit: string;
    client_house:string;
    client_flat:string;  
    client_phone: string;    
    client_email:string ;
}