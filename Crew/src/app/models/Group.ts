export class Group {
    expenses: Expense[];
    name: string;
    participants: Participant[];
    description: string;
    total: number;

    constructor(name: string, description: string) {
      this.name = name;
      this.description = description;
    }
}
export class Participant {
  name: string;
  budget: number;
  UID: string;

  constructor(name: string, UID: string) {
    this.name = name;
    this.UID = UID;
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
    UID: string;
    amount: number;

  constructor(name: string, UID: string) {
    this.name = name;
    this.UID = UID;
    this.amount = 0;
  }
 }
