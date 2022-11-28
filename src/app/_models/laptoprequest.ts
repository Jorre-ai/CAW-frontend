export class LaptopRequest {
    id: BigInteger;
    email: string;
    count: number;
    type_os: string;
    payment_method: string;
    description: string;
    status: string;
    caw_id: BigInteger;
    created_at: string;
    updated_at : string
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

