import { TAppContext, TInventoryItem } from '../models.ts';

export function addToBasket(ctx: TAppContext, selected: string[]) {
  const basketItems = ctx.lists.basketItems;
  let updatedList = [...basketItems];

  selected.forEach(s => {
    const existedIndex = updatedList.findIndex(i => i.id === s);

    if (existedIndex !== -1) {
      (updatedList[existedIndex] as Required<TInventoryItem>).count ++;
    } else {
      const fromInventory = ctx.lists.inventoryItems.find(i => i.id === s);
      updatedList = [{
        ...(fromInventory as TInventoryItem),
        count: 1
      }, ...updatedList];
    }
  });

  ctx.updateLists({
    ...ctx.lists,
    basketItems: updatedList
  });
}
