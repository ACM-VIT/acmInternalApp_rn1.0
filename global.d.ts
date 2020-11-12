export type GenericFunc = (props:any)=>any;

export interface PostType {
    key:string,
    user:{
        username:string
        name:string,
        profilePic:string, 
    },
    project:{
        createdAt:string,
        name:string,
        noOfComments:number,
        desc:string,
        noOfUpvotes:number,
        image?:string
    }
}

export interface UserType {
    name:string,
    username:string,
    profilePic:string, 
}

export interface ProjectType {
    createdAt:string,
    name:string,
    noOfComments:number,
    desc:string,
    noOfUpvotes:number,
    image?:string
}