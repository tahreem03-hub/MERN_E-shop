import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/actions/cart'
import { addToWishlist, removeFromWishlist } from '../redux/actions/wishlist'
import { toast } from 'react-hot-toast'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Loader from '../components/Layout/Loader'

const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

const initials = (name = '') =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/* inline icons */
const Star = ({ fill = 'full' }) => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <path d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.2 5.06 16.8 6 11.3l-4-3.9 5.53-.8z" fill={fill === 'full' ? '#F5B301' : '#e5e0e6'} />
  </svg>
)
const Stars = ({ value = 0 }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} fill={value >= i ? 'full' : 'empty'} />)}
  </span>
)
const IconMinus = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round" /></svg>
const IconPlus = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
const IconCart = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h8.5a1 1 0 0 0 1-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></svg>
const IconHeart = ({ filled }) => <svg viewBox="0 0 24 24" className="h-5 w-5" fill={filled ? '#B5316B' : 'none'} stroke={filled ? '#B5316B' : 'currentColor'} strokeWidth="1.7"><path d="M12 20s-7-4.35-9.2-8.4C1.3 8.9 2.6 6 5.5 6c1.9 0 3.1 1.1 3.7 2.1h1.6C11.4 7.1 12.6 6 14.5 6c2.9 0 4.2 2.9 2.7 5.6C19 15.65 12 20 12 20z" strokeLinejoin="round" /></svg>
const IconMessage = () => <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h16v11H8l-4 3z" strokeLinejoin="round" /></svg>
const IconTruck = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>
const IconShield = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
const IconReturn = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8a9 9 0 1 1-1 4" strokeLinecap="round" /><path d="M3 4v4h4" strokeLinecap="round" strokeLinejoin="round" /></svg>

const RelatedCard = ({ p }) => {
  const dispatch = useDispatch()
  const wishlist = useSelector(state => state.wishlist.wishlist)
  const cart = useSelector(state => state.cart.cart)
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    const exists = wishlist.find(item => item._id === p._id)
    setLiked(exists ? true : false)
  }, [wishlist, p._id])

  const addToWishlistHandler = () => {
    dispatch(addToWishlist(p))
    setLiked(true)
  }

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(p._id))
    setLiked(false)
  }

  const addToCartHandler = (e) => {
    e.stopPropagation()

    const itemExists = cart.find(item => item._id === data._id)

    if (itemExists) {
      // Check if adding more would exceed stock
      if (itemExists.quantity >= data.stock) {
        toast.error(`Only ${data.stock} items available in stock`)
        return
      }
      // Update quantity
      const updatedItem = { ...data, quantity: itemExists.quantity + 1 }
      dispatch(addToCart(updatedItem))
      toast.success("Quantity updated in cart")
      return
    }

    if (data.stock < 1) {
      toast.error("Product out of stock")
      return
    }

    const cartData = { ...data, quantity: 1 }
    dispatch(addToCart(cartData))
    toast.success("Item added to cart successfully")
  }
  const selling = p.discountPrice
  const pct = p.originalPrice > selling ? Math.round(((p.originalPrice - selling) / p.originalPrice) * 100) : 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#f2e4ea] bg-white transition hover:shadow-lg">
      <div className="relative aspect-square bg-[#f1e8ec] p-4">
        <Link to={`/product/${p._id}`}>
          <img src={`${import.meta.env.VITE_URL}/uploads/${p.images?.[0]}`} alt={p.name} className="h-full w-full object-contain" />
        </Link>
        <button
          onClick={(e) => {
            e.stopPropagation()
            liked ? removeFromWishlistHandler() : addToWishlistHandler()
          }}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-[#2E294E] shadow-sm transition hover:text-[#B5316B]"
        >
          <IconHeart filled={liked} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-[#6b6480]">{p.shop?.name}</p>
        <Link to={`/product/${p._id}`} className="mt-1 truncate font-semibold text-[#2E294E] transition hover:text-[#B5316B]">{p.name}</Link>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-bold text-[#2E294E]">{formatPrice(selling)}</span>
          {pct > 0 && <span className="text-sm text-[#a89fb0] line-through">{formatPrice(p.originalPrice)}</span>}
          <span className="ml-auto text-sm text-emerald-600">{p.soldOut || 0} sold</span>
        </div>
        <button
          onClick={addToCartHandler}
          className="mt-3 w-full rounded-xl bg-[#2E294E] py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { allProducts, isLoading } = useSelector((state) => state.product)
  const cart = useSelector(state => state.cart.cart)
  const wishlist = useSelector(state => state.wishlist.wishlist)
  const product = allProducts?.find((item) => item._id === id)

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [tab, setTab] = useState('details')

  const [reviews, setReviews] = useState([])
  const [formRating, setFormRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formText, setFormText] = useState('')

  // Check wishlist status
  useEffect(() => {
    if (product) {
      const exists = wishlist.find(item => item._id === product._id)
      setWishlisted(exists ? true : false)
    }
  }, [wishlist, product])

  useEffect(() => {
    setActiveImg(0)
    setQty(1)
    setAdded(false)
    setTab('details')
  }, [id])

  // Wishlist handlers
  const addToWishlistHandler = () => {
    dispatch(addToWishlist(product))
    setWishlisted(true)
    toast.success("Added to wishlist")
  }

  const removeFromWishlistHandler = () => {
    dispatch(removeFromWishlist(product._id))
    setWishlisted(false)
    toast.success("Removed from wishlist")
  }

  // Add to cart handler
  const handleAddToCart = () => {
    const itemExists = cart.find(item => item._id === product._id)

    if (itemExists) {
      toast.error("Item already in cart")
      return
    }

    if (product.stock < qty) {
      toast.error("Product stock limited")
      return
    }

    const cartData = { ...product, quantity: qty }
    dispatch(addToCart(cartData))
    setAdded(true)
    toast.success("Item added to cart successfully")
    setTimeout(() => setAdded(false), 1600)
  }

  if (isLoading) {
    return <Loader />
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-[#2E294E]">We couldn't find that product</h1>
          <p className="mt-3 text-[#6b6480]">It may have been removed or the link is wrong.</p>
          <Link to="/" className="mt-6 inline-block rounded-xl bg-[#2E294E] px-6 py-3 text-white transition hover:opacity-90">Back to shop</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const images = product.images || []
  const inStock = product.stock > 0
  const original = product.originalPrice
  const selling = product.discountPrice
  const pct = original > selling ? Math.round(((original - selling) / original) * 100) : 0
  const showDiscount = pct > 0 && pct < 95

  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0
  const dist = [5, 4, 3, 2, 1].map((s) => reviews.filter((r) => r.rating === s).length)

  const related = allProducts?.filter((p) => p._id !== product._id && p.category === product.category) || []
  const relatedList = related.slice(0, 4)
  const sellerProductCount = allProducts?.filter((p) => p.shop?._id === product.shop?._id).length || 0

  const dec = () => setQty((q) => Math.max(1, q - 1))
  const inc = () => setQty((q) => Math.min(product.stock, q + 1))

  const submitReview = () => {
    if (!formRating || !formText.trim()) return
    setReviews((prev) => [{ name: 'You', rating: formRating, date: 'Just now', comment: formText.trim() }, ...prev])
    setFormRating(0)
    setFormText('')
    setTab('reviews')
  }

  const tabs = [
    { key: 'details', label: 'Product details' },
    { key: 'reviews', label: `Reviews (${reviews.length})` },
    { key: 'seller', label: 'Seller information' },
  ]

  return (
    <div className="bg-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#6b6480]">
          <Link to="/" className="hover:text-[#2E294E]">Home</Link>
          <span>/</span>
          <span className="hover:text-[#2E294E]">{product.category}</span>
          <span>/</span>
          <span className="truncate font-medium text-[#2E294E]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <div className="flex gap-3 overflow-x-auto sm:flex-col">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f1e8ec] p-1.5 transition sm:h-20 sm:w-20
                      ${activeImg === i ? 'ring-2 ring-[#2E294E]' : 'ring-1 ring-[#f2e4ea] hover:ring-[#2E294E]/40'}`}>
                    <img src={`${import.meta.env.VITE_URL}/uploads/${img}`} alt="" className="h-full w-full rounded-lg object-contain" />
                  </button>
                ))}
              </div>
              <div className="relative flex-1">
                {showDiscount && (
                  <span className="absolute left-4 top-4 rounded-full bg-[#B5316B] px-3 py-1 text-xs font-semibold text-white">{pct}% off</span>
                )}
                <div className="flex aspect-square items-center justify-center rounded-3xl border border-[#f2e4ea] bg-[#f1e8ec] p-5 shadow-sm sm:p-8">
                  <img src={`${import.meta.env.VITE_URL}/uploads/${images[activeImg]}`} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B5316B]">{product.category}</p>
              <button
                onClick={() => wishlisted ? removeFromWishlistHandler() : addToWishlistHandler()}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f2e4ea] text-[#2E294E] transition hover:border-[#B5316B] hover:text-[#B5316B]"
              >
                <IconHeart filled={wishlisted} />
              </button>
            </div>

            <h1 className="mt-2 text-2xl font-bold leading-snug text-[#2E294E] sm:text-3xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#6b6480]">
              <span className="h-4 w-px bg-[#f2e4ea]" />
              <button onClick={() => setTab('reviews')} className="hover:text-[#B5316B]">{reviews.length} reviews</button>
              <span className="h-4 w-px bg-[#f2e4ea]" />
              <span>{product.soldOut || 0} sold</span>
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <span className="text-3xl font-bold text-[#2E294E]">{formatPrice(selling)}</span>
              {showDiscount && (
                <>
                  <span className="text-lg text-[#a89fb0] line-through">{formatPrice(original)}</span>
                  <span className="rounded-md bg-[#B5316B]/10 px-2 py-1 text-sm font-semibold text-[#B5316B]">Save {pct}%</span>
                </>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className={`h-2.5 w-2.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className={inStock ? 'text-emerald-700' : 'text-red-600'}>
                {inStock ? `In stock — ${product.stock} available` : 'Out of stock'}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-xl border border-[#f2e4ea] bg-[#f1e8ec]">
                <button onClick={dec} disabled={qty <= 1} className="grid h-11 w-11 place-items-center rounded-l-xl text-[#2E294E] hover:bg-[#f2e4ea] disabled:opacity-40"><IconMinus /></button>
                <span className="w-10 text-center font-semibold text-[#2E294E]">{qty}</span>
                <button onClick={inc} disabled={qty >= product.stock} className="grid h-11 w-11 place-items-center rounded-r-xl text-[#2E294E] hover:bg-[#f2e4ea] disabled:opacity-40"><IconPlus /></button>
              </div>
              <button onClick={handleAddToCart} disabled={!inStock} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border-2 border-[#2E294E] font-semibold text-[#2E294E] transition hover:bg-[#2E294E] hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
                <IconCart />{added ? 'Added ✓' : 'Add to cart'}
              </button>
            </div>

            <button disabled={!inStock} className="mt-3 h-12 w-full rounded-xl bg-[#2E294E] font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Buy it now</button>

            <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl border border-[#f2e4ea] bg-[#f1e8ec] p-4 text-center text-xs text-[#6b6480]">
              <div className="flex flex-col items-center gap-1.5"><span className="text-[#2E294E]"><IconTruck /></span>Free delivery</div>
              <div className="flex flex-col items-center gap-1.5"><span className="text-[#2E294E]"><IconReturn /></span>7-day returns</div>
              <div className="flex flex-col items-center gap-1.5"><span className="text-[#2E294E]"><IconShield /></span>Secure checkout</div>
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#f2e4ea] p-4 sm:flex-row sm:items-center">
              <img src={`${import.meta.env.VITE_URL}/uploads/${product.shop?.avatar}`} alt={product.shop?.name} className="h-14 w-14 rounded-full border-2 border-[#f2e4ea] object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold text-[#2E294E]">{product.shop?.name}</h2>
                <div className="flex items-center gap-1.5 text-sm text-[#6b6480]"><Stars value={4} /><span>4.0 ratings</span></div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"><IconMessage />Send message</button>
                <Link to={`/shop/${product.shop?._id}`} className="rounded-xl border border-[#2E294E] px-4 py-2 text-sm font-semibold text-[#2E294E] transition hover:bg-[#2E294E] hover:text-white">Visit store</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-6 overflow-x-auto border-b border-[#f2e4ea]">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition sm:text-base ${tab === t.key ? 'border-[#B5316B] text-[#2E294E]' : 'border-transparent text-[#6b6480] hover:text-[#2E294E]'}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === 'details' && (
              <div className="grid gap-8 lg:grid-cols-3">
                <p className="leading-relaxed text-[#57516b] lg:col-span-2">{product.description}</p>
                <div className="rounded-2xl border border-[#f2e4ea] bg-[#f1e8ec] p-5">
                  <h3 className="font-bold text-[#2E294E]">At a glance</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Category</dt><dd className="font-medium text-[#2E294E]">{product.category}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Availability</dt><dd className="font-medium text-[#2E294E]">{inStock ? `${product.stock} in stock` : 'Out of stock'}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Units sold</dt><dd className="font-medium text-[#2E294E]">{product.soldOut || 0}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Sold by</dt><dd className="font-medium text-[#2E294E]">{product.shop?.name}</dd></div>
                  </dl>
                </div>
              </div>
            )}

            {tab === 'reviews' && (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  {reviews.length === 0 ? (
                    <p className="text-[#6b6480]">No reviews yet.</p>
                  ) : (
                    <>
                      <div className="flex flex-col gap-6 rounded-2xl border border-[#f2e4ea] p-5 sm:flex-row sm:items-center">
                        <div className="text-center sm:border-r sm:border-[#f2e4ea] sm:pr-6">
                          <div className="text-4xl font-bold text-[#2E294E]">{avg.toFixed(1)}</div>
                          <div className="mt-1 flex justify-center"><Stars value={Math.round(avg)} /></div>
                          <div className="mt-1 text-xs text-[#6b6480]">{reviews.length} reviews</div>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {[5, 4, 3, 2, 1].map((s, i) => (
                            <div key={s} className="flex items-center gap-2 text-xs text-[#6b6480]">
                              <span className="w-3">{s}</span>
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f1e8ec]">
                                <div className="h-full rounded-full bg-[#F5B301]" style={{ width: `${reviews.length ? (dist[i] / reviews.length) * 100 : 0}%` }} />
                              </div>
                              <span className="w-6 text-right">{dist[i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 space-y-5">
                        {reviews.map((r, i) => (
                          <div key={i} className="border-b border-[#f2e4ea] pb-5 last:border-0">
                            <div className="flex items-center gap-3">
                              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#2E294E] text-sm font-semibold text-white">{initials(r.name)}</span>
                              <div>
                                <p className="font-semibold text-[#2E294E]">{r.name}</p>
                                <div className="flex items-center gap-2 text-xs text-[#6b6480]"><Stars value={r.rating} /><span>{r.date}</span></div>
                              </div>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-[#57516b]">{r.comment}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="h-fit rounded-2xl border border-[#f2e4ea] bg-[#f1e8ec] p-5">
                  <h3 className="font-bold text-[#2E294E]">Write a review</h3>
                  <div className="mt-3 flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button key={i} onMouseEnter={() => setHoverRating(i)} onClick={() => setFormRating(i)} className="p-0.5">
                        <svg viewBox="0 0 20 20" className="h-6 w-6"><path d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.2 5.06 16.8 6 11.3l-4-3.9 5.53-.8z" fill={(hoverRating || formRating) >= i ? '#F5B301' : '#e5e0e6'} /></svg>
                      </button>
                    ))}
                  </div>
                  <textarea value={formText} onChange={(e) => setFormText(e.target.value)} rows={4}
                    placeholder="Share your thoughts about this product…"
                    className="mt-3 w-full resize-none rounded-xl border border-[#f2e4ea] bg-white p-3 text-sm text-[#2E294E] outline-none focus:border-[#2E294E]" />
                  <button onClick={submitReview} disabled={!formRating || !formText.trim()} className="mt-3 w-full rounded-xl bg-[#2E294E] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40">
                    Submit review
                  </button>
                  <p className="mt-2 text-xs text-[#6b6480]">Saved for this session only until the backend is connected.</p>
                </div>
              </div>
            )}

            {tab === 'seller' && (
              <div className="rounded-2xl border border-[#f2e4ea] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={`${import.meta.env.VITE_URL}/uploads/${product.shop?.avatar}`} alt={product.shop?.name} className="h-16 w-16 rounded-full border-2 border-[#f2e4ea] object-cover" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2E294E]">{product.shop?.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"><IconMessage />Send message</button>
                    <Link to={`/shop/${product.shop?._id}`} className="rounded-xl border border-[#2E294E] px-4 py-2 text-sm font-semibold text-[#2E294E] transition hover:bg-[#2E294E] hover:text-white">Visit store</Link>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-[#f1e8ec] p-4 text-center">
                    <div className="text-xl font-bold text-[#2E294E]">{sellerProductCount}</div>
                    <div className="mt-1 text-xs text-[#6b6480]">Products</div>
                  </div>
                  <div className="rounded-xl bg-[#f1e8ec] p-4 text-center">
                    <div className="text-xl font-bold text-[#2E294E]">{product.shop?.createdAt?.slice(0, 10) || '—'}</div>
                    <div className="mt-1 text-xs text-[#6b6480]">Joined</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedList.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between border-b border-[#f2e4ea] pb-4">
              <h2 className="text-xl font-bold text-[#2E294E] sm:text-2xl">Related products</h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedList.map((p) => <RelatedCard key={p._id} p={p} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetail