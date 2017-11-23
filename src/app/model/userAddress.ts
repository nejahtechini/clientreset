export class UserAddress {
    id: number;
    countryName: string;
    constructor(countryName: string, id?: number);
    constructor(countryName?: string, id?: number) {
        this.id = id ;
        this.countryName = countryName;
    }
}
