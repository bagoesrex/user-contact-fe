export interface Address {
    id: number
    street: string
    city: string
    province: string
    country: string
    postal_code: string
}

export interface AddressInput {
    street?: string
    city?: string
    province?: string
    country: string
    postal_code: string
}