import { Group } from './Group';
export interface User {
    Email: string;
    Friends: Friend[];
    Groups: Group[];
    Name: string;
    PersonalExpenses: PersonalExpense[];
    Phone: number;
    UID: string;
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
