import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MenusState } from './menus.state';


export const getMenusState = createFeatureSelector<MenusState>('menus');


export const getLoading = createSelector(
  getMenusState,
  state => state.menuloading
);

export const getLoaded = createSelector(
  getMenusState,
  state => state.menuloaded
);

export const getMenuData   = createSelector(
  getMenusState,
  state => state.menudata
);
export const getError  = createSelector(
  getMenusState,
  state => state.error
);