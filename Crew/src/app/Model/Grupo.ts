interface Grupo {
    Gastos: Gasto[];
    Nombre: string;
    Participantes: Participante[];
    Total: number;
  }
interface Participante {
    Nombre: string;
    Presupuesto: number;
    UID: string;
  }

interface Gasto {
    Name: string;
    'Quien Paga': QuienPaga | any[];
    Valor: number | string;
  }

interface QuienPaga {
    Nombre: string;
    UID: string;
  }
