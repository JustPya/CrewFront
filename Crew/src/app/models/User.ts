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

export class PersonalExpense {
  object: string;
  type: string;
  amount: number;
}
export class Friend {
  name: string;
  uID: string;
}
