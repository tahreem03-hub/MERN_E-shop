import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { productData } from '../static/data'
import slugify from '../../utils/slugify'
import ProductCard from '../components/route/ProductCard'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

const ProductPage = () => {
  const [searchParams] = useSearchParams()
  const categoryName = searchParams.get('category')
  const [data, setData] = useState([])

  useEffect(() => {
    if (categoryName === 'all' || !categoryName) {
      setData(productData)
    } else {
      const filtered = productData.filter((item) => slugify(item.category) === categoryName)
      setData(filtered)
    }
  }, [categoryName])

  /* display-only: nice title from the real category name (or humanized slug) */
  const isAll = !categoryName || categoryName === 'all'
  const title = isAll
    ? 'All products'
    : data[0]?.category ??
      categoryName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className="bg-white">
      <Header />

      {/* header band */}
      <div className="border-b border-[#f2e4ea] bg-[#f1e8ec]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-5">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-[#6b6480]">
            <Link to="/" className="hover:text-[#2E294E]">Home</Link>
            <span>/</span>
            <span className="font-medium text-[#2E294E]">{title}</span>
          </nav>
          <p className="mt-3 text-sm text-[#6b6480]">
            {data.length} {data.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {/* grid */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((i, index) => (
              <ProductCard data={i} key={index} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-[#f2e4ea] bg-[#f1e8ec] px-6 py-16 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-[#B5316B]">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 6h18l-2 12H5z" strokeLinejoin="round" />
                <path d="M9 6V4a3 3 0 0 1 6 0v2" strokeLinecap="round" />
              </svg>
            </span>
            <h2 className="mt-5 text-lg font-bold text-[#2E294E]">No products found</h2>
            <p className="mt-2 text-sm text-[#6b6480]">
              We couldn't find anything in this category yet. Try browsing everything instead.
            </p>
            <Link
              to="/products?category=all"
              className="mt-6 rounded-xl bg-[#2E294E] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Browse all products
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ProductPage