export type TInventoryItem = {
  id: string;
  title: string;
  count?: number;
};

export type TLists = {
  inventoryItems: TInventoryItem[];
  basketItems: TInventoryItem[];
  pending: boolean;
};

export type TAppContext = {
  lists: TLists;
  removeFromBasket: (payload: any) => void;
  initInventory: () => void;
  createNew: (payload: any) => void;
  addToBasket: (payload: any) => void;
};

export type TAction = {
  type: string;
  payload: any;
}

export type TReducer = (state: TLists, action: TAction) => TLists;


