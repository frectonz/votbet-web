import { createContext, useContext, useReducer } from "react";

export default function makeStore(userReducer, initialState, key) {
  const dipatchCtx = createContext();
  const storeCtx = createContext();

  try {
    initialState = JSON.parse(localStorage.getItem(key)) || initialState;
  } catch {}

  const reducer = (state, action) => {
    const newState = userReducer(state, action);
    localStorage.setItem(key, JSON.stringify(newState));
    return newState;
  };

  const StoreProvider = ({ children }) => {
    const [store, dipatch] = useReducer(reducer, initialState);

    return (
      <dipatchCtx.Provider value={dipatch}>
        <storeCtx.Provider value={store}>{children}</storeCtx.Provider>
      </dipatchCtx.Provider>
    );
  };

  function useDispatch() {
    return useContext(dipatchCtx);
  }

  function useStore() {
    return useContext(storeCtx);
  }

  return [StoreProvider, useDispatch, useStore];
}
