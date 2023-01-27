import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "../store/model";

const typeHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typeHooks.useStoreActions;
export const useStoreDispatch = typeHooks.useStoreDispatch;
export const useStoreState = typeHooks.useStoreState;
