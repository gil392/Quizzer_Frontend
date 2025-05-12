import { AxiosPromise, CanceledError } from "axios";
import apiClient from "./client";

export const updateItem = <T>(
  itemId: string,
  updatedData: Partial<T>,
  itemType: string
): AxiosPromise<T> => apiClient.put(`/${itemType}/${itemId}`, updatedData);

export const deleteItem = <T>(
  itemId: string,
  itemType: string
): AxiosPromise<T> => apiClient.delete(`/${itemType}/${itemId}`);

export const abortableRequest = <T>(
  axiosRequest: (aborController: AbortController) => AxiosPromise<T>
) => {
  const abortController = new AbortController();
  const request = axiosRequest(abortController);

  return { request, abort: () => abortController.abort() };
};

export const ignoreCanceledRequest = (error: Error) => {
  if (!(error instanceof CanceledError)) {
    console.error(error);
    throw error;
  }
};
