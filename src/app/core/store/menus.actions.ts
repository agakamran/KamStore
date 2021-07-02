import { Action } from '@ngrx/store';
import { MenuItem } from 'src/app/models/_menu';
import { IRole } from 'src/app/models/_role';

export enum MenusActionTypes {
  INIT = '[Menu ] init',
  MENU_SUCCESS  = '[Menu Success] Menu Success',
  MENU_FAILED = '[Menu Failed] Menu Failed', 
  MENU_ERROR = '[Menu] Error'
}

export class initMenu  implements Action {
  readonly type = MenusActionTypes.INIT;
  constructor(public payload: { role: IRole }) { }
}
export class MenuSuccess implements Action {
  readonly type = MenusActionTypes.MENU_SUCCESS;
  //constructor(public payload: { user: User }) {}
  constructor(public payload: { menudata: MenuItem []}) {}
}

export class MenuFailed  implements Action {
  readonly type = MenusActionTypes.MENU_FAILED;

  constructor(public payload: { error: any }) {
   //on(LogoutCompleted,reduce()=>INITIAL_STATE)
  }
}
export class MenuError implements Action {
  readonly type = MenusActionTypes.MENU_ERROR;

  constructor(public payload: { error: any }) {}
}



export type MenusActions =
  | initMenu
  | MenuSuccess
  | MenuFailed
  | MenuError;




// export enum ChartsActionTypes {
//   LINE_CHART_QUERY = '[Charts] Line chart query',
//   LINE_CHART_LOADED = '[Charts] Line chart loaded',

//   BAR_CHART_QUERY = '[Charts] Bar chart query',
//   BAR_CHART_LOADED = '[Charts] Bar chart loaded',

//   CHARTS_ERROR = '[Charts] Error'
// }

// export class LineChartQuery implements Action {
//   readonly type = ChartsActionTypes.LINE_CHART_QUERY;

//   constructor(public payload: { currency: string }) {}
// }

// export class BarChartQuery implements Action {
//   readonly type = ChartsActionTypes.BAR_CHART_QUERY;
// }

// export class LineChartLoaded implements Action {
//   readonly type = ChartsActionTypes.LINE_CHART_LOADED;

//   constructor(public payload: { lineChartData: any }) {}
// }

// export class BarChartLoaded implements Action {
//   readonly type = ChartsActionTypes.BAR_CHART_LOADED;

//   constructor(public payload: { barChartData: any }) {}
// }

// export class ChartsError implements Action {
//   readonly type = ChartsActionTypes.CHARTS_ERROR;

//   constructor(public payload: { error: any }) {}
// }

// export type ChartsActions =
//   | LineChartQuery
//   | LineChartLoaded
//   | BarChartQuery
//   | BarChartLoaded
//   | ChartsError;
