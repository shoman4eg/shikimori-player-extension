import { resolve } from 'path'

export const port = parseInt(process.env.PORT || '') || 3303
export const r = (...args) => resolve(__dirname, '..', ...args)
export const isDev = process.env.NODE_ENV !== 'production'
