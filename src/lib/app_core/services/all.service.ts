
import IUserInterface from "../../domain/interfaces/iUser.interface";
import UserRepository from "../../infraestructure/repository/user.repository";



 const iUserInterface : IUserInterface=new UserRepository();

export {iUserInterface}