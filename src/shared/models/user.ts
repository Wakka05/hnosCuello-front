// User model
export interface User {
    _id: string;
    name: string;
    surnames: string;
    picture?: Picture;
    roles: string;
    email: string;
    orders?: string[];
}

export interface Picture {
    _id: string;
    content: string;
}
