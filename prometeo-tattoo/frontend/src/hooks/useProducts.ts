import { useState, useEffect, useCallback } from 'react'
import { Product, ProductFilters, ProductsResponse } from '../types/product'
import { productService } from '../services/productService'

const EMPTY: ProductsResponse = { products: [], total: 0, page: 1, totalPages: 0 }

export function useProducts(initialFilters: ProductFilters = {}) {
  const [data, setData] = useState<ProductsResponse>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  const fetchProducts = useCallback(async (currentFilters: ProductFilters) => {
    setLoading(true)
    setError(null)
    try {
      const result = await productService.getProducts(currentFilters)
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts(filters)
  }, [filters, fetchProducts])

  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }, [])

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }, [])

  return {
    products: data.products,
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
    loading,
    error,
    filters,
    updateFilters,
    setPage,
  }
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .getFeaturedProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}
