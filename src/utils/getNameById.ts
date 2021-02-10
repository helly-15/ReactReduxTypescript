import {IUsersState} from "../reducers/usersReducer";

export function getNameById(id: string, data: IUsersState['users']['byId']) {
    return data.filter(user => user.userId === id)[0].name
}
