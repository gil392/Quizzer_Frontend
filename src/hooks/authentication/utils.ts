import { HttpStatusCode } from 'axios';
import { refreshAuthAccessToken } from '../../api/authentication/api';
import { RetriableAxiosConfig } from './types';

export const injectTokenToAxiosConfig = (
    config: RetriableAxiosConfig,
    token: string | null
) => {
    if (!config._retry && token) {
        config.headers.Authorization = `JWT ${token}`;
    }
    return config;
};

export const refreshTokenInAxiosRequest = async (
    originalRequest: RetriableAxiosConfig
) => {
    const {
        data: { token }
    } = await refreshAuthAccessToken();
    injectTokenToAxiosConfig(originalRequest, token);
    originalRequest._retry = true;
    return { token, refreshedRequest: originalRequest };
};

export const shoulRefreshAccessToken = (
    request: RetriableAxiosConfig,
    responseStatus: number = HttpStatusCode.InternalServerError
): boolean =>
    responseStatus === HttpStatusCode.Unauthorized && !request._retry;
