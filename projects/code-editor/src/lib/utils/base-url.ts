export const BASE_MONACO_URL = '';

/**
 * get default url
 * @param baseUrl default url
 */
export const getBaseMonacoUrl = (baseUrl?: string) => baseUrl || '' || BASE_MONACO_URL;
