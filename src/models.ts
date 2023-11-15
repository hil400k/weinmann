export type TInventoryItem = {
  id: string;
  title: string;
  count?: number;
};

export type TAppContext = {
  lists: {
    inventoryItems: TInventoryItem[];
    basketItems: TInventoryItem[];
  }
  updateLists: (lists: any) => void;
};
