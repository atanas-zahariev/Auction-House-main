export interface itemI {
    bider: biderInterface | null;
    category: string;
    description: string;
    imgUrl: string;
    owner: string;
    price: number;
    title: string;
    __v: number;
    _id: string;
}

export interface biderInterface {
    email: string;
    firstname: string;
    hashedPassword: string;
    lastname: string;
    __v: number;
    _id: string;
}