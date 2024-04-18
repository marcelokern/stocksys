import config from "@/config/app.config";

type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function requester<RequestType, ResponseType>(method: HttpMethods, url: string, data?: RequestType): Promise<ResponseType> {

    const headers = { 'Content-Type': 'application/json' };

    if (localStorage.getItem('@stocksys-token')) {
        headers['Authorization'] = localStorage.getItem('@stocksys-token');
    }

    const body = data ? JSON.stringify(data) : undefined;

    try {

        const response = await fetch(config.baseUrl + url, { method, headers, body });
        if (!response.ok) throw await response.json();
        const json = await response.json() as ResponseType;
        return json;

    } catch (error: any) {

        if (error?.errorCode === 'UNAUTHORIZED' || error?.errorCode === 'FORBIDDEN' || error?.errorCode === 'INVALID_TOKEN') {
            localStorage.removeItem('@stocksys-token');
        }
        throw error;

    }

}

export default requester;