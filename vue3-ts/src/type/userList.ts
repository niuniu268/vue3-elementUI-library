export interface userInt{
    username:string,
    password:string,
    role:string
}

export interface selectDataInt{
    username:string
}

export interface libraryUsersInt{
    version:number
}

interface activeInt{
    username:string,
    password:string,
    role:string
}

interface roleListInt{
    role:string
}

export class usersData{
    selectData:selectDataInt={
        username:""
    }
    libraryUsers:libraryUsersInt = {
        version: -1
    }
    list:userInt[] = []
    isShow=false
    rolelist:roleListInt[] = []
    active:activeInt={
        username:"",
        password:"",
        role:"",
    }
}