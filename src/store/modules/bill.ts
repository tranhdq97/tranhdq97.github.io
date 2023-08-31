export interface IFState {
  VAT: number;
}

export default {
  namespaced: true,
  state: {
    VAT: 5,
  } as IFState,
  getters: {
    VAT: (state: IFState) => state.VAT,
  },
  actions: {},
};
