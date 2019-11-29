export class Group {
    expenses: Expense[];
    name: string;
    participants: Participant[];
    description: string;
    total: number;
    date: Date;

    constructor(name: string, description: string, date: Date, participants: Participant[]) {
      this.name = name;
      this.description = description;
      this.date = date;
      this.participants = participants;
      this.expenses = new Array<Expense>();
    }
}
export class Participant {
  name: string;
  budget: number;
  uID: string;

  constructor(name: string, uID: string) {
    this.name = name;
    this.uID = uID;
    this.budget = 0;
  }
}

export class Expense {
    name: string;
    amount: number;
    deb: Array<Debtor>;
 }

export class Debtor {
    name: string;
    uID: string;
    amount: number;

  constructor(name: string, UID: string) {
    this.name = name;
    this.uID = UID;
    this.amount = 0;
  }
 }
