'use client'
import React, { createContext, useEffect, useState } from 'react'

const CartContext = createContext({
  items: [] as any[],
  addItem: (item: any) => {},
  removeItem: (id: any) => {},
  clear: () => {}
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('hk_cart')
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {}
  }, [])

  useEffect(() => {
    localStorage.setItem('hk_cart', JSON.stringify(items))
  }, [items])

  function addItem(item: any) {
    setItems(prev => {
      const exists = prev.find(p => p.id === item.id && p.size === item.size)
      if (exists) {
        return prev.map(p => p.id === item.id && p.size === item.size ? { ...p, qty: p.qty + (item.qty || 1) } : p)
      }
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }

  function removeItem(id: any) {
    setItems(prev => prev.filter(p => p.id !== id))
  }

  function clear() {
    setItems([])
  }

  return <CartContext.Provider value={{ items, addItem, removeItem, clear }}>{children}</CartContext.Provider>
}

export default CartContext
