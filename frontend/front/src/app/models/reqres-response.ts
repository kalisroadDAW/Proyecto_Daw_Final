//PARA GET

export interface ReqResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        ReqUser[];
    support:     Support;
}

export interface ReqUser {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface Support {
    url:  string;
    text: string;
}

//PARA PUT / UPDATE

export interface ReqUserUpdate {
    [x: string]: any;
    name: string;
    job:  string;
}

//PARA BORRAR //RESPONSE = 204




