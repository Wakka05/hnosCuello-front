export const config = {
    users: '/users',
    logged: '/logged',
    product: '/products',
    category: '/categories',
    login: '/login'
} 

export const TOKEN_STORAGE_NAME: string = 'token';
/* 
* Guardamos el token de usuario para tener la información de este sin tener que hacer llamadas extra a la BBDD cada vez que queramos
* consultar algo
*/
export const USER_STORAGE_NAME: string = 'user';
//export const COOKIE_NAME: string = 'hnosCuello-market';