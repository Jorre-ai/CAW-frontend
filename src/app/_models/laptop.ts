export class Laptop {
  id: number;
  name: string;
  type: string;
  price: number;
  user_ID: Number;
  status: string;
}

export class LaptopCreate {
  name: string;
  type: string;
  price: number;
  status: string;
  isPaid: boolean;
  isFree: boolean;
}

export class LaptopEdit {
  id: number;
  name: string;
  type: string;
  price: number;
  status: string;
  isPaid: boolean;
  isFree: boolean;
}
