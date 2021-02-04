export interface IDataInterface{
    posts : {
        byId :
             {
                id : string,
                author : string,
                body : string,
                likes : string[]
            }[],
        allIds : string[]
    },
    users : {
        byId :
            {
                username : string,
                name : string,
                subscriptions: string[]
            }[],

        allIds : string[]
    }
}
