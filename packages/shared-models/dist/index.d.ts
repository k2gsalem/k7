export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    sku: string;
}
export interface Order {
    id: string;
    status: 'Pending' | 'Accepted' | 'Ready' | 'OutForDelivery' | 'Delivered';
    total: number;
    customerId: string;
    storeId: string;
}
export interface CreditAccount {
    id: string;
    customerId: string;
    balance: number;
    limit: number;
    status: 'active' | 'suspended';
}
export interface DeliveryTask {
    id: string;
    orderId: string;
    pickupLocation: [number, number];
    dropoffLocation: [number, number];
    status: 'pending' | 'enroute' | 'completed';
}
export declare const datastoreModels: {
    Product: any;
    Order: any;
    CreditAccount: any;
    DeliveryTask: any;
};
