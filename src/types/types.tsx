interface Product {
    name:string,
    price:number
}

interface Company {
    companyName:string,
    products:Product[]
}

interface Output {
    name: string,
    price: number,
    amount: number
}

export type { Company,Output };
