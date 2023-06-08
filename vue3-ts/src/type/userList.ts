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

export class usersData{
    selectData:selectDataInt={
        username:""
    }
    libraryUsers:libraryUsersInt = {
        version: -1
    }
    list:userInt[] = []
}