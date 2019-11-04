export interface Group {
    Expenses: Expense[];
    Name: string;
    Participants: Participant[];
    Total: number;
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
