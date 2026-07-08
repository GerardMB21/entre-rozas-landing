import type { Flower } from '@interfaces/carousel'

export interface CartItem {
    id: number
    name: string
    image: string
    price: string
    quantity: number
}

const STORAGE_KEY = 'entre-rozas-cart'

type Listener = (items: CartItem[]) => void

function load(): CartItem[] {
    if (typeof localStorage === 'undefined') return []
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
        return []
    }
}

function save(items: CartItem[]) {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

/** Parse a display price like "$89.99" into a number. */
export function parsePrice(price: string): number {
    const value = Number.parseFloat(price.replace(/[^0-9.]/g, ''))
    return Number.isFinite(value) ? value : 0
}

let items: CartItem[] = load()
const listeners = new Set<Listener>()

function emit() {
    save(items)
    listeners.forEach((listener) => listener(items))
}

export const cart = {
    getItems: (): CartItem[] => items,

    getCount: (): number =>
        items.reduce((total, item) => total + item.quantity, 0),

    getTotal: (): number =>
        items.reduce(
            (total, item) => total + parsePrice(item.price) * item.quantity,
            0,
        ),

    add(flower: Flower) {
        const existing = items.find((item) => item.id === flower.id)
        if (existing) {
            items = items.map((item) =>
                item.id === flower.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item,
            )
        } else {
            items = [
                ...items,
                {
                    id: flower.id,
                    name: flower.name,
                    image: flower.image,
                    price: flower.price,
                    quantity: 1,
                },
            ]
        }
        emit()
    },

    remove(id: number) {
        items = items.filter((item) => item.id !== id)
        emit()
    },

    setQuantity(id: number, quantity: number) {
        if (quantity <= 0) {
            this.remove(id)
            return
        }
        items = items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
        )
        emit()
    },

    clear() {
        items = []
        emit()
    },

    /** Subscribe to changes. Fires immediately with the current items. */
    subscribe(listener: Listener): () => void {
        listeners.add(listener)
        listener(items)
        return () => listeners.delete(listener)
    },
}
