import { Group } from './Group';
export class User {
    Email: string;
    Friends: Friend[];
    Groups: Group[];
    Name: string;
    PersonalExpenses: PersonalExpense[];
    Phone: number;
    UID: string;

    constructor( email: string, name: string) {
      this.Email = email;
      this.Name = name;
    }
  }

export interface PersonalExpense {
    Object: string;
    Type: string;
    Amount: number;
  }
export interface Friend {
    Name: string;
    UID: string;
  }
