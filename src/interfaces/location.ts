import { MapPin } from '@lucide/astro'

export interface LocationItem {
    icon: typeof MapPin
    name: string
    linkRef: string
    text: string
}

export interface LocationInfo {
    locationItems: LocationItem[]
    timeSchedule: string[]
}
