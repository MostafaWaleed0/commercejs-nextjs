import type { Cart } from '@chec/commerce.js/types/cart';
import type { LineItem } from '@chec/commerce.js/types/line-item';
import type { Price } from '@chec/commerce.js/types/price';
import { commerce } from 'lib/commerce';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react';

type State = {
  id: string;
  total_items: number;
  total_unique_items: number;
  subtotal: Price;
  line_items: LineItem[];
};

type CartStateContextType = State & {
  setCart: (card: Cart) => void;
  reset: () => void;
};

const SET_CART = 'SET_CART';
const RESET = 'RESET';
type CartProviderProps = { children: React.ReactNode };

const initialState: State = {
  id: '',
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
  subtotal: {} as Price
};

type Action =
  | {
      type: 'SET_CART';
      cart: Cart;
    }
  | {
      type: 'RESET';
    };

const CartContext = createContext<State | Action | any>(initialState);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.cart };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCart = useCallback(async () => {
    try {
      const cart = await commerce.cart.retrieve();
      dispatch({ type: SET_CART, cart: cart });
    } catch (err) {
      throw new Error(err);
    }
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, []);

  const reset = useCallback(() => dispatch({ type: RESET }), [dispatch]);

  const setCart = useCallback(
    (cart: Cart) => dispatch({ type: SET_CART, cart }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      setCart,
      reset
    }),
    [setCart, reset]
  );

  return (
    <CartContext.Provider value={{ ...state, ...value }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext<CartStateContextType>(CartContext);
  if (context === undefined) {
    throw new Error(`useCartContext must be used within a CartProvider`);
  }
  return context;
};

export { useCartContext, CartProvider };
