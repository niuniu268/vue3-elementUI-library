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

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJvYiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4NjIwMDE4NSwiZXhwIjoxNjg2MjAyODg1LCJpc3MiOiJib29rc3Rlci1zZXJ2ZXItYXBpIiwic3ViIjoic3R1ZGVudCBsaWNlbnNlZCBqd3QgYWNjZXNzIHRva2VuIn0.QKOM7k436xI4EfYwt_-pca-30pkTsUCZ9D_UoQ9cz0I';
    return service({
        url:"/admin/users",
        method:"get",
        headers:{
            Authorization: `Bearer ${token}`,
        },
    });
    
}