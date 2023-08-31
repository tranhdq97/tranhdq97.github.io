export interface IFState {
  isSideBarHide: boolean;
  isSideBarCollapsed: boolean;
}

export default {
  namespaced: true,
  state: {
    isSideBarHide: false,
    isSideBarCollapsed: true,
  },
  getters: {
    isSideBarCollapsed: (state: IFState) => state.isSideBarCollapsed,
  },
  actions: {
    toggleSideBar({ state }: { state: IFState }) {
      state.isSideBarCollapsed = !state.isSideBarCollapsed;
    },
    collapseSideBar({ state }: { state: IFState }) {
      state.isSideBarCollapsed = true;
    },
  },
};
