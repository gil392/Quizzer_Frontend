import {
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../utils/utils";

export function addHandlerWithToast<
  State,
  Thunk extends AsyncThunk<any, any, any>
>(
  builder: ActionReducerMapBuilder<State>,
  asyncThunk: Thunk,
  onFulfilled: (
    state: Draft<State>,
    action: PayloadAction<ReturnType<any>>
  ) => void,
  message: string,
  noSuccessMessage?: boolean,
  noErrorMessage?: boolean
) {
  builder.addCase(asyncThunk.fulfilled, (state, action) => {
    onFulfilled(state, action);
    if (!noSuccessMessage) {
      toastSuccess("Successfully " + pastVerb(message));
    }
  });

  if (!noErrorMessage) {
    builder.addCase(asyncThunk.rejected, () => {
      toastError("Failed to " + message + ". Please try again later");
    });
  }
}

function pastVerb(label: string) {
  const parts = label.trim().split(" ");
  if (parts.length === 0) return "";

  let verb = parts[0];
  verb = verb.endsWith("e") ? verb + "d" : verb + "ed";

  const rest = parts.slice(1).join(" ");
  return `${verb} ${rest}`.trim();
}
