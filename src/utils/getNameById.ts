import {IUsersState} from "../reducers/postsReducer";

export function getNameById(id: string, data: IUsersState['users']['byId']) {
    return data.filter(user => user.username === id)[0].name
}
