export interface Order {
    id:            number;
    businessId:    number;
    userId:        number;
    statusId:      number;
    subtotal:      number;
    iva:           number;
    total:         number;
    createdAt:     Date;
    updatedAt:     Date;
    OrderProducts: OrderProduct[];
}

export interface OrderProduct {
    id:        number;
    orderId:   number;
    productId: number;
    quantity:  number;
    price:     number;
    createdAt: Date;
    updatedAt: Date;
    Product:   Product;
}

export interface Product {
    name:  string;
    price: number;
}