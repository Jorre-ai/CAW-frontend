export class Laptop {
  id: number;
  name: string;
  type: string;
  price: number;
  status: string;
  isPaid: boolean;
  isFree: boolean;
  request_id: number;
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
export class LaptopUpdate {
  id: number;
  status: string;
  isPaid: boolean;
  isFree: boolean;
  soldDate: string;
  request_id: number;
}

