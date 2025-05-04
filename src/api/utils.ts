import { AxiosPromise, CanceledError } from 'axios';

export const AbortableRequest = <T>(
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
