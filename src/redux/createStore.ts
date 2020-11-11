import { createStore as createReduxStore, Store } from "redux";
import { State } from "./state";
import rootReducer from "./rootReducer";

export function createStore(): Store<State> {
    return createReduxStore(rootReducer);
}