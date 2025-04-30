import { AxiosPromise } from 'axios';
import apiClient from './client';

export const updateItem = <T>(
    itemId: string,
    updatedData: Partial<T>,
    itemType: string
): AxiosPromise<T> => apiClient.put(`/${itemType}/${itemId}`, updatedData);

export const deleteItem = <T>(
    itemId: string,
    itemType: string
): AxiosPromise<T> => apiClient.delete(`/${itemType}/${itemId}`);
