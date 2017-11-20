export class User {
    id: Number;
    name: string;
    teamName: string;
    salary: Number;
    constructor(id: Number, name: string, salary: Number, teamName: string){
        this.id = id;
        this.name = name;
        this.teamName = teamName;
        this.salary = salary;
      }
     
}
