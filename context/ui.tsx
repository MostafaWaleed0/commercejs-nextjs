import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from 'react';

type State = {
  displaySearch: boolean;
};

const initialState = {
  displaySearch: false
};

const SHOW_SEARCH = 'SHOW_SEARCH';
const CLOSE_SEARCH = 'CLOSE_SEARCH';
type UIProviderProps = { children: React.ReactNode };

type Action = { type: 'SHOW_SEARCH' } | { type: 'CLOSE_SEARCH' };

const UIContext = createContext<State | any>(initialState);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SHOW_SEARCH: {
      return {
        ...state,
        displaySearch: true
      };
    }
    case CLOSE_SEARCH: {
      return {
        ...state,
        displaySearch: false
      };
    }
  }
};

const UIProvider = ({ children }: UIProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSearch = useCallback(
    () => dispatch({ type: SHOW_SEARCH }),
    [dispatch]
  );

  const closeSearch = useCallback(
    () => dispatch({ type: CLOSE_SEARCH }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      closeSearch,
      openSearch
    }),
    [state]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export { UIProvider, useUI };
