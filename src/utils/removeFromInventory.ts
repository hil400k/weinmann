import { TAppContext } from '../models.ts';

export function removeFromInventory(appCtx: TAppContext, selected: string[]) {
  let updatedList = [...appCtx.lists.basketItems];

  selected.forEach(s => {
    updatedList = [...updatedList.filter(i => i.id !== s)];
  });

  appCtx.updateLists({
    ...appCtx.lists,
    basketItems: updatedList
  });
}
