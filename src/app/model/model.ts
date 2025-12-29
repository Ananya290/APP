export interface toDoI{
    id?:number;
    assignedTo: string;
    status:string;
    dueDate:Date;
    priority:string;
    description:string
}

export interface authResponse{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?:boolean
}