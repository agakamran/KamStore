import { createFeatureSelector, createSelector } from '@ngrx/store';


import { MenusState } from './menus.state';

export const MenuState =createFeatureSelector<MenusState>('menus');

export const getMenuData   = createSelector(  
  MenuState,
  state => state.menudata
);
export const getLoading = createSelector(
  MenuState,
  state => state.menuloading
);

export const getLoaded = createSelector(
  MenuState,
  state => state.menuloaded
  
);


export const getError  = createSelector(
  MenuState,
  state => state.error
);