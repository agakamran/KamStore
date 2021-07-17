export class IRole {  
    id: string;    
    name: string;
    isChecked:boolean ;       
}
export class IRoleEdit { 
    Role: string;
    members: string[] = [];
    nonMembers:string[] = [];
}
export class IRoleModifi {
    RoleId:string; 
    RoleName:string;         
    IdsToAdd:string[]=[];
    IdsToDelete:string[]=[];
    sel: boolean;
}
//https://ng-bootstrap.github.io/#/components/modal/examples
//https://medium.com/codingthesmartway-com-blog/building-an-angular-5-project-with-bootstrap-4-and-firebase-4504ff7717c1