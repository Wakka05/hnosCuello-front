// User model
export interface User {
    id: string;
    name: string;
    picture?: Picture;
    roles: string[];
    email: string;
}

export interface Picture {
    id: string;
    content: string;
}