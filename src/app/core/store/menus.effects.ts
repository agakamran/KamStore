import { Injectable } from '@angular/core';
import { Actions, createEffect,  Effect,  ofType } from '@ngrx/effects';
import { select,Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { NavbarService } from 'src/app/services/navbar.service';
import * as menu from './menus.actions';
import { getLoaded, getLoading } from './menus.selectors';



@Injectable()
export class MenusEffects {
  
  constructor(
    private actions$: Actions,
    private navbarService: NavbarService,
    private store$: Store<AppState>) {}

 // menuStorage$ = createEffect(() => this.actions$.pipe(
   //      ofType<menu.initMenu>(menu.MenusActionTypes.INIT),
       // withLatestFrom(
      //  this.store$.pipe(select(getLoaded)),
      //  this.store$.pipe(select(getLoading))
  //  ),
  //   filter(([_, loaded, loading]) => !loaded && loading),
  //   switchMap(() => this.navbarService._allmenu(payload).pipe(
  //     map(menudata => menu.MenuSuccess({menudata})),
  //     catchError(error => of(new menu.MenuError({ error })))      
   //  ))
 // ));

  @Effect()
  menuAction$ = this.actions$.pipe(
    ofType<menu.initMenu>(menu.MenusActionTypes.INIT),
    map( (action: menu.initMenu) => action.payload),    
    // withLatestFrom(      
    //       this.store$.pipe(select(getLoaded)),
    //       this.store$.pipe(select(getLoading))
    //   ),
    // filter(([_, getLoaded, getLoading]) => !getLoaded && getLoading),
    
    switchMap(payload => this.navbarService._allmenu(payload).pipe(
      map((res: any) => {    
       // console.log(res)
        return new menu.MenuSuccess( { menudata:res } );
      }),
     // tap(() => this.router.navigateByUrl('')),
      catchError(error => of(new menu.MenuError({ error })))
    )
  )
);

}

