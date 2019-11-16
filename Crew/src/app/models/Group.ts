export class Group {
    Expenses: Expense[];
    Name: string;
    Participants: Participant[];
    Description: string;
    Total: number;

    constructor(name: string, description: string) {
      this.Name = name;
      this.Description = description;
    }
  }
export interface Participant {
    Name: string;
    Presupuesto: number;
    UID: string;
  }

export interface Expense {
    Name: string;
    Deb: Debtor | any[];
    Amount: number | string;
  }

export interface Debtor {
    Name: string;
    UID: string;
  }
