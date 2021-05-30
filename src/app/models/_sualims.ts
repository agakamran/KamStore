import { Subscription } from 'rxjs';

export class ISualim {    
        suId: string;
        Sunom: number;
        sual: string;
        cavab: number;
        cavSay: number;
        movId: string;
        dil: string ;      
}
export interface IMovzum {    
        movId: string;
        movname: string;
        dil: string ;
        mnom:number;
   }
   export class FileUploadModel {
        data: File;
        state: string;
        inProgress: boolean;
        progress: number;
        canRetry: boolean;
        canCancel: boolean;
        sub?: Subscription;
  }
  // https://blog.angularindepth.com/deploy-an-angular-application-to-iis-60a0897742e7