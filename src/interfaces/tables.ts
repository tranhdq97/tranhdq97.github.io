export interface IFTable {
  id?: number;
  name?: string;
  is_available?: boolean;
}

export interface IFTableRep {
  phoneNumber?: string;
  lastServedAt?: Date | null;
  newestOrderedAt?: Date | null;
  numServed?: number;
  numOrders?: number;
}
