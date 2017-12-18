import {UserAddress} from './userAddress' ;
import {Product} from './product' ;
export class User {
    id: Number;
    name: string;
    teamName: string;
    salary: Number;
    userAddress: UserAddress;
    productList:Array<Product>;

    constructor();
    constructor(name: string, teamName: string, salary: Number, userAddress: UserAddress, id?: Number);
    constructor(name?: string, teamName?: string, salary?: Number, userAddress?: UserAddress, id?: Number,product?:Array<Product>) {
        this.name = name;
        this.teamName = teamName;
        this.salary = salary;
        this.id = id ;
        this.userAddress = userAddress ;
        this.productList=product ;
}}

