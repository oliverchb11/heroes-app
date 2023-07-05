export interface AuthInterface {

}


export interface User{
    id: number;
    user: string;
    email: string;
}

export interface ErrorResponse {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      Error;
}

export interface Error {
}

export interface Headers {
    normalizedNames: Error;
    lazyUpdate:      null;
}
