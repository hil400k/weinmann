import { queryClient } from '../store.ts';
import { InventoryItem } from '../models.ts';

export const changeInventoryItemLocation = (
  from: string,
  to: string,
  selected: string | null,
  data: InventoryItem[],
  resetSelected: () => void
) => {
  if (!selected) {
    return;
  }

  queryClient.setQueriesData({
    queryKey: [to],
  }, (prev) => {
    const item = data.find(i => i.id === selected);
    return [item, ...(prev as any[])];
  });

  queryClient.setQueriesData({
    queryKey: [from]
  }, (prev) => {
    const newList = prev.filter(i => i.id !== selected);

    return newList || [];
  });

  resetSelected();
}
