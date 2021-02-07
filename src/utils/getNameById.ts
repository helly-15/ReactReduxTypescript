import {IDataInterface} from "../data/dataInterface";

export function getNameById(id: string, data: IDataInterface) {
    return data.users.byId.filter(user => user.username === id)[0].name
}
