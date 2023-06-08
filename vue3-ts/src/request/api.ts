import service from '.';

interface LoginData{
    username:string,
    password:string
}

interface userInfoInt{
    username:string
}

let accessToken: string | null = null;

export function login(data:LoginData) {
    return service({
        url:"/auth/login",
        method:"post",
        data,
    }).then((res)=>{
        accessToken = res.data.accessToken;
        return res;
    });
}

export function getBooks(){
    return service({
        url:"/library/books",
        method:"get"
    })
}

export function getUsers() {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4NjIyMDc4NSwiZXhwIjoxNjg2MjIzNDg1LCJpc3MiOiJib29rc3Rlci1zZXJ2ZXItYXBpIiwic3ViIjoic3R1ZGVudCBsaWNlbnNlZCBqd3QgYWNjZXNzIHRva2VuIn0.RDZhzIuBawu2u0ai_8ADEaQwaIvwAJAtrDEmeg6XMDM';
    return service({
        url:"/admin/users",
        method:"get",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
    
}

export function putUser(username:string){

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4NjIyMDc4NSwiZXhwIjoxNjg2MjIzNDg1LCJpc3MiOiJib29rc3Rlci1zZXJ2ZXItYXBpIiwic3ViIjoic3R1ZGVudCBsaWNlbnNlZCBqd3QgYWNjZXNzIHRva2VuIn0.RDZhzIuBawu2u0ai_8ADEaQwaIvwAJAtrDEmeg6XMDM';
    const data = {
        username: username
    }
    return service({
        url:"/admin/users",
        method:"put",
        data,
        headers:{
            Authorization: `Bearer ${token}`,
        },
    })
}

