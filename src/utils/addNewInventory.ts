import { TAppContext } from '../models.ts';

export function addNewInventory(ctx: TAppContext, val: string) {
  const updatedList = [
    { id: new Date().getTime().toString(),
      title: val
    },
    ...ctx.lists.inventoryItems
  ];

  ctx.updateLists({
    ...ctx.lists,
    inventoryItems: updatedList
  });
}
