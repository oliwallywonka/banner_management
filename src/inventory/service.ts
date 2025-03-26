interface InventoryAPI {
  Grupo: string;
  Linea: string;
  Clase: string;
  SubClase: string;
  Ciudad: string;
  Articulo: string;
  Stock: string;
  Minimo: string;
  Maximo: string;
}

interface Inventory {
  grupo: string;
  linea: string;
  clase: string;
  subClase: string;
  ciudad: string;
  articulo: string;
  stock: number;
  minimo: number;
  maximo: number;
}

export interface InventoryService {
  getAll(): Promise<any>;
}

export class InventoryServiceImpl implements InventoryService {
  async getAll(): Promise<Inventory[]> {
    const res = await fetch(process.env.LARAVEL_API || "localhost");
    const data = (await res.json()) as InventoryAPI[];
    return data.map((inventory) => this.parseInventory(inventory));
  }

  private parseInventory(inventory: InventoryAPI): Inventory {
    return {
      grupo: inventory.Grupo,
      linea: inventory.Linea,
      clase: inventory.Clase,
      subClase: inventory.SubClase,
      ciudad: inventory.Ciudad,
      articulo: inventory.Articulo,
      stock: parseInt(inventory.Stock),
      minimo: parseInt(inventory.Minimo),
      maximo: parseInt(inventory.Maximo),
    };
  }
}
