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
};
