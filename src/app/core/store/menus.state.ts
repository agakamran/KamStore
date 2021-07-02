import { MenuItem } from "src/app/models/_menu";

export interface MenusState {
  menuloading: boolean;
  menuloaded: boolean;
  error: any;
  menudata: MenuItem[];
}

export const menusInitialState: MenusState = {
  menuloaded: false,
  menuloading: false,
  error: '',
  menudata: []
};