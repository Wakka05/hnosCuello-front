// User model
export interface User {
    _id: string;
    name: string;
    surnames: string;
    picture?: Picture;
    roles: string;
    email: string;
    order?: Item;
}

export interface Picture {
  _id: string;
  content: string;
}

export interface Item {
  ticket: string[];
  isConfirmed: boolean;
}
