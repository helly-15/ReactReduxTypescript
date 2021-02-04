
export interface IPostsInterface{
   signedUser:string,
   signedUserID :string
}

export interface IPostTextInterface{
   post:
       {id: string,
   author: string,
   body: string,
   likes: string[] },

   signedUserID :string
}

