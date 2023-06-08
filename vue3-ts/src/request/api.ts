import service from '.';

interface LoginData{
    username:string,
    password:string
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

export function getusers() {

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4NjIxMjQwMCwiZXhwIjoxNjg2MjE1MTAwLCJpc3MiOiJib29rc3Rlci1zZXJ2ZXItYXBpIiwic3ViIjoic3R1ZGVudCBsaWNlbnNlZCBqd3QgYWNjZXNzIHRva2VuIn0.PviXhS3CXnW5J8mIXm95TsohUtz8V7hIn3BOMctJu3Q';
    return service({
        url:"/admin/users",
        method:"get",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    
}

