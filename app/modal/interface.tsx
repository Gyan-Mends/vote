// interfaces.ts

export interface EventInterface {
    _id: string
    name: string;
    type:string;
    description: string;
    email:string;
    logo: string;
}

export interface CategoryInterface {
    _id : string
    event: string;
    category:string;
    description: string;
    email:string;
}

export interface EditionInterface {
    _id : string
    event: string;
    name:string;
    description: string;
    price:number;
    email:string;
    logo:string
}
