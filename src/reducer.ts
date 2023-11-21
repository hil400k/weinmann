import { TAction, TLists } from './models.ts';

// todo: turn on strict mode
// todo: add types for actions
export function reducer(state: TLists, action: TAction): TLists {
  let updatedState;

  switch (action.type) {
    case 'init': {
      updatedState = { ...state, pending: false };
      updatedState.inventoryItems = action.payload.inventory;

      break;
    }
    case 'remove-from-basket': {
      let updatedList = [...state.basketItems];

      action.payload.selected.forEach((s: string) => {
        updatedList = [...updatedList.filter(i => i.id !== s)];
      });

      updatedState = {
        ...state,
        basketItems: updatedList
      };

      break;
    }
    case 'add-to-basket': {
      updatedState = {
        ...state,
        basketItems: action.payload
      };

      break;
    }
    case 'create-new': {
      const updatedList = [
        { id: new Date().getTime().toString(),
          title: action.payload.val
        },
        ...state.inventoryItems
      ];

      updatedState = {
        ...state,
        inventoryItems: updatedList
      };
      break;
    }

    default: updatedState = state;
  }

  return updatedState;
}
