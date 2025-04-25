import { AxiosError, isAxiosError } from 'axios';
import { identity, isNil } from 'ramda';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';
import { RetriableAxiosConfig, SetAccessTokenFunction } from './types';
import {
    injectTokenToAxiosConfig,
    refreshTokenInAxiosRequest,
    shoulRefreshAccessToken
} from './utils';
import { PAGES_ROUTES } from '../../routes/routes.const';

export const useAuthentication = (): SetAccessTokenFunction => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('accessToken')
    );
    const navigate = useNavigate();

    const setAccessToken: SetAccessTokenFunction = useCallback(
        (token: string | null) => {
            if (token) {
                localStorage.setItem('accessToken', token);
            }
            setToken(token);
        },
        []
    );

    useLayoutEffect(() => {
        const authInterceptor = apiClient.interceptors.request.use((config) =>
            injectTokenToAxiosConfig(config, token)
        );

        return () => {
            apiClient.interceptors.request.eject(authInterceptor);
        };
    }, [token]);

    useLayoutEffect(() => {
        let isRefreshing = false;
        const refreshInterceptor = apiClient.interceptors.response.use(
            identity,
            async (error: AxiosError | Error) => {
                if (!isAxiosError(error)) {
                    return Promise.reject(error);
                }

                const { config, response } = error;
                if (isNil(config)) {
                    return Promise.reject('no request or response ');
                }

                const originalRequest: RetriableAxiosConfig = config;
                if (
                    shoulRefreshAccessToken(originalRequest, response?.status)
                ) {
                    try {
                        if (isRefreshing) {
                            await new Promise((res) => setTimeout(res, 100));
                            return apiClient(originalRequest);
                        }

                        isRefreshing = true;
                        const { token, refreshedRequest } =
                            await refreshTokenInAxiosRequest(originalRequest);
                        isRefreshing = false;
                        setAccessToken(token);

                        return apiClient(refreshedRequest);
                    } catch (error) {
                        setAccessToken(null);
                        console.error('refresh token error:', error);

                        return navigate(PAGES_ROUTES.LOGIN);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            apiClient.interceptors.response.eject(refreshInterceptor);
        };
    }, [navigate, token, setAccessToken]);

    return setAccessToken;
};
