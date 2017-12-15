import {UserAddress} from './userAddress' ;
export class User {
    id: Number;
    name: string;
    teamName: string;
    salary: Number;
    userAddress: UserAddress;

    constructor();
    constructor(name: string, teamName: string, salary: Number, userAddress: UserAddress, id?: Number);
    constructor(name?: string, teamName?: string, salary?: Number, userAddress?: UserAddress, id?: Number) {
        this.name = name;
        this.teamName = teamName;
        this.salary = salary;
        this.id = id ;
        this.userAddress = userAddress ;
}}

