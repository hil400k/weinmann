export type TInventoryItem = {
  id: string;
  title: string;
  count?: number;
};

export type TLists = {
  inventoryItems: TInventoryItem[];
  basketItems: TInventoryItem[];
};

export type TAppContext = {
  lists: TLists;
  updateLists: (lists: any) => void;
  removeFromBasket: (payload: any) => void;
  initInventory: (payload: any) => void;
  createNew: (payload: any) => void;
  addToBasket: (payload: any) => void;
};

export type TAction = {
  type: string;
  payload: any;
}

export type TReducer = (state: TLists, action: TAction) => TLists;


