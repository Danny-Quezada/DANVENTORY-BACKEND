import User from "../models/entities/user.entities";
import IModel from "./iModel.interface";

export default interface IUserInterface extends IModel<User>{

    verifyUser(email: string, password: string): Promise<User>;
    getUserById(id: number): Promise<User>;
}