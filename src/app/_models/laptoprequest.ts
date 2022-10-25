export class LaptopRequest {
    id: BigInteger;
    name: string;
    count: BigInteger;
    type_os: string;
    payment_method: string;
    description: string;
    waranty: string;
    status: string;
    laptop_id: BigInteger;
}

export class LaptopRequestRequest {
    name: string;
    email: string;
    count: BigInteger;
    type_os: string;
    payment_method: string;
    description: string;
    waranty: string;
    status: string;
    laptop_id: number;
}
