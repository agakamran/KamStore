import {
  ActionReducerMap,
  MetaReducer,
  ActionReducer,
  Action
} from '@ngrx/store';
import { AuthState } from '../auth/store/auth.state';
import * as fromAuth from '../auth/store/auth.reducer';
import { AdminState } from '../admin/store/admin.state';
import * as fromAdmin from '../admin/store/admin.reducer';
// import { MenusState } from '../core/store/menus.state';
// import * as fromMenu from '../core/store/menus.reducer';


export interface AppState {
  auth: AuthState;
  admin: AdminState;
  //menu: MenusState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  admin: fromAdmin.adminReducer,
  //menu: fromMenu.menusReducer
};

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState | undefined, action: Action): AppState {
    if (action.type === '[Auth] LOGOUT completed') {
      state = undefined;
    }
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<AppState>[] = [clearState];
