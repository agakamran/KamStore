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
    
}
export class NavbarRole {
    nrid:string;
    nid:string;   
    RoleId: string;    
}

export interface IMenujson {
    NavId: string;
    navtext: string;
    navLink: string;
    RolId: string;
    Name:string;
 }
 