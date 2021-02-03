// export const data = [
//     {
//         date:'05.02.12',
//         user:'Lena',
//         post: 'Lanana',
//     },
//     {
//         date:'04.02.12',
//         user:'Gena',
//         post: 'Ganana',
//     },
// ]
export const data = {
    posts: {
        byId: [
            {
                id: "post1",
                author: "user1",
                body: "To be or not to be",
                likes: ["user2", "user3"]
            },
            {
                id: "post2",
                author: "user2",
                body: "Little mouse little mouse where is your house",
                likes: ["user1", "user3"]
            }
        ],
        allIds: ["post1", "post2"]
    },
    users: {
        byId: [
            {
                username: "user1",
                name: "Masha",
                subscriptions: ["user2"]
            },
             {
                username: "user2",
                name: "Misha",
                subscriptions: ["user1", "user3"]
            },
             {
                username: "user3",
                name: "Arisha",
                subscriptions: ["user1"]
            }
        ],
        allIds: ["user1", "user2", "user3"]
    }
}
