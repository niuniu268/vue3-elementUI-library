export interface booksInt{
    title: string,
    author: string,
    quantity: number
}

export interface libraryBooksInt{
    version:number
}

export interface selectDataInt{
    title: string
}

export class booksData{
    selectData:selectDataInt={
        title:""
    }
    libraryBooks:libraryBooksInt = {
        version: -1
    }

    list:booksInt[] = []
}