export class MenuItem {
    nid:string;
    pid?:string;
    ntitle: string;
    npath: string;    
    nicon?: string;
    nlan?: string;
    ncsay?:number;
    nrol?:string;
    ink?:string;
    nisparent?:boolean;
    name?:string;
    isChecked?:boolean ;
    id?:string;
}

export class NavbarRole {
    nrid:string;
    nid:string;   
    RoleId: string;    
}
export class NavRole {
    nid:string;
    roleId:string;
    name:string;
    ntitle:string;
    isChecked?:boolean =false;
}
export interface IMenujson {
    NavId: string;
    navtext: string;
    navLink: string;
    RolId: string;
    Name:string;
 }
 