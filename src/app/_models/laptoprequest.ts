export class LaptopRequest {
    id: BigInteger;
    email: string;
    count: number;
    type_os: string;
    payment_method: string;
    description: string;
    status: string;
    caw_id: BigInteger;
}

export class LaptopRequestCreate {
    email: string;
    count: number;
    type_os: string;
    payment_method: string;
    description: string;
    status: string;
    caw_id: BigInteger;
}

export class LaptopRequestEdit {
    id: BigInteger;
    email: string;
    count: number;
    type_os: string;
    payment_method: string;
    description: string;
    status: string;
    caw_id: BigInteger;
}

