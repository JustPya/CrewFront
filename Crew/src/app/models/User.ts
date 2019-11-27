import { Group } from './Group';
export class User {
  email: string;
  friends: Friend[];
  groups: Group[];
  name: string;
  personalExpenses: PersonalExpense[];
  phone: number;
  uID: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
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
