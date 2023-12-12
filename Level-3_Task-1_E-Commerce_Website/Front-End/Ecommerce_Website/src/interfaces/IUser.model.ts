import { ICart } from "./ICart.model";

export interface IUser extends IUserEdit{
    userID: string;
}

export interface IUserEdit extends IAddUser{
    carts: ICart[];
}

export interface IAddUser{
    username: string;
    email: string;
}