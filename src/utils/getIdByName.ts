import {IDataInterface} from "../data/dataInterface";

export function getIdByName (name:string, data:IDataInterface){
    return data.users.byId.filter(user=>user.name === name)[0].username
}
