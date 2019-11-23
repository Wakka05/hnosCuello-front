// User model
export interface User {
    _id: string;
    name: string;
    picture?: Picture;
    roles: string[];
    email: string;
}

export interface Picture {
    _id: string;
    content: string;
}