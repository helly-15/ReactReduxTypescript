import {IUsersState} from "../reducers/postsReducer";


export function getIdByName(name: string, data: IUsersState['users']['byId']) {
    return data.filter(user => user.name === name)[0].username
}
