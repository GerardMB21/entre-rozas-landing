declare global {
    interface Window {
        dataLayer?: unknown[]
    }
}

export interface AnalyticsItem {
    item_id: string | number
    item_name: string
    price: number
    quantity?: number
}

function toGtagItem(item: AnalyticsItem) {
    return {
        item_id: String(item.item_id),
        item_name: item.item_name,
        price: item.price,
        quantity: item.quantity ?? 1,
    }
}

/** Push a GA4 event to dataLayer (forwarded to gtag.js through Partytown). */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...params })
}

/** Click on any WhatsApp CTA (floating button, cart checkout, etc). */
export function trackWhatsAppClick(source: string) {
    trackEvent('whatsapp_click', { source })
}

/** GA4 recommended ecommerce event: product added to the cart. */
export function trackAddToCart(item: AnalyticsItem) {
    trackEvent('add_to_cart', {
        currency: 'PEN',
        value: item.price * (item.quantity ?? 1),
        items: [toGtagItem(item)],
    })
}

/** GA4 recommended ecommerce event: checkout started (via WhatsApp). */
export function trackBeginCheckout(items: AnalyticsItem[], value: number) {
    trackEvent('begin_checkout', {
        currency: 'PEN',
        value,
        items: items.map(toGtagItem),
    })
}

/** "Ver más productos" opened. */
export function trackViewMoreProducts() {
    trackEvent('view_more_products')
}
