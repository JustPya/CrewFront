interface User {
    Email: string;
    Friends: Friend[];
    Grupos: Grupo[];
    Name: string;
    PersonalExpenses: PersonalExpense[];
    'Teléfono': number;
    UID: string;
  }

interface PersonalExpense {
    Object: string;
    Tipo: string;
    Valor: number | string;
  }


interface Friend {
    Name: string;
    UID: string;
  }
