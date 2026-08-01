import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productData } from '../static/data'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'


const formatPrice = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

const initials = (name = '') =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/* -------------------- inline icons (no dependency) -------------------- */
const Star = ({ fill = 'full' }) => (
  <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
    <path
      d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.2 5.06 16.8 6 11.3l-4-3.9 5.53-.8z"
      fill={fill === 'full' ? '#F5B301' : '#e5e0e6'}
    />
  </svg>
)
const Stars = ({ value = 0 }) => (
  <span className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} fill={value >= i ? 'full' : 'empty'} />
    ))}
  </span>
)
const IconMinus = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round" /></svg>
)
const IconPlus = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
)
const IconCart = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 3h2l2.4 12.3a1 1 0 0 0 1 .7h8.5a1 1 0 0 0 1-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /></svg>
)
const IconHeart = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill={filled ? '#B5316B' : 'none'} stroke={filled ? '#B5316B' : 'currentColor'} strokeWidth="1.7"><path d="M12 20s-7-4.35-9.2-8.4C1.3 8.9 2.6 6 5.5 6c1.9 0 3.1 1.1 3.7 2.1h1.6C11.4 7.1 12.6 6 14.5 6c2.9 0 4.2 2.9 2.7 5.6C19 15.65 12 20 12 20z" strokeLinejoin="round" /></svg>
)
const IconEye = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
)
const IconMessage = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 5h16v11H8l-4 3z" strokeLinejoin="round" /></svg>
)
const IconTruck = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></svg>
)
const IconShield = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" strokeLinejoin="round" /><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const IconReturn = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8a9 9 0 1 1-1 4" strokeLinecap="round" /><path d="M3 4v4h4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/* -------------------- related-product card -------------------- */
const ProductCard = ({ p }) => {
  const [liked, setLiked] = useState(false)
  const selling = p.discountPrice ?? p.price
  const pct = p.price > selling ? Math.round(((p.price - selling) / p.price) * 100) : 0
  const showDiscount = pct > 0 && pct < 95
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#f2e4ea] bg-white transition hover:shadow-lg">
      <div className="relative aspect-square bg-[#f1e8ec] p-4">
        <Link to={`/products/${p.id}`}>
          <img src={p.imageUrl[0].url} alt={p.name} className="h-full w-full object-contain" />
        </Link>
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button onClick={() => setLiked((v) => !v)} aria-label="Add to wishlist" className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#2E294E] shadow-sm transition hover:text-[#B5316B]"><IconHeart filled={liked} /></button>
          <Link to={`/products/${p.id}`} aria-label="Quick view" className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#2E294E] shadow-sm transition hover:text-[#B5316B]"><IconEye /></Link>
          <button aria-label="Add to cart" className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#2E294E] shadow-sm transition hover:text-[#B5316B]"><IconCart /></button>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-[#6b6480]">{p.shop.name}</p>
        <Link to={`/products/${p.id}`} className="mt-1 truncate font-semibold text-[#2E294E] transition hover:text-[#B5316B]">{p.name}</Link>
        <div className="mt-2"><Stars value={p.rating} /></div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-bold text-[#2E294E]">{formatPrice(selling)}</span>
          {showDiscount && <span className="text-sm text-[#a89fb0] line-through">{formatPrice(p.price)}</span>}
          <span className="ml-auto text-sm text-emerald-600">{p.totalSell} sold</span>
        </div>
      </div>
    </div>
  )
}

/* ============================ PAGE ============================ */
const ProductDetail = () => {
  const { id } = useParams()
  const product = productData.find((item) => item.id === Number(id))

  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [tab, setTab] = useState('details')

  /* placeholder reviews — replace with data from your API later.
     Kept in state so the "write a review" form can prepend to it. */
  const [reviews, setReviews] = useState([
    { name: 'Ayesha K.', rating: 5, date: '2 days ago', comment: 'Exactly as described and shipping was quick. Really happy with it!' },
    { name: 'Daniel M.', rating: 4, date: '1 week ago', comment: 'Good quality for the price. Packaging could be a little better.' },
  ])
  const [formRating, setFormRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formText, setFormText] = useState('')

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

  const images = product.imageUrl
  const inStock = product.stock > 0
  const original = product.price
  const selling = product.discountPrice ?? product.price
  const pct = original > selling ? Math.round(((original - selling) / original) * 100) : 0
  const showDiscount = pct > 0 && pct < 95

  /* review aggregates */
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : product.rating
  const dist = [5, 4, 3, 2, 1].map((s) => reviews.filter((r) => r.rating === s).length)

  /* related + seller stats derived from the same static data */
  const related = productData.filter((p) => p.id !== product.id && p.category === product.category)
  const relatedList = (related.length ? related : productData.filter((p) => p.id !== product.id)).slice(0, 4)
  const sellerProductCount = productData.filter((p) => p.shop.name === product.shop.name).length

  const dec = () => setQty((q) => Math.max(1, q - 1))
  const inc = () => setQty((q) => Math.min(product.stock, q + 1))

  const handleAddToCart = () => {
    // TODO: dispatch to your cart context / redux store
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  const submitReview = () => {
    // TODO: POST to your reviews API — this only updates local state for now
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
        {/* breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-[#6b6480]">
          <Link to="/" className="hover:text-[#2E294E]">Home</Link>
          <span>/</span>
          <span className="hover:text-[#2E294E]">{product.category}</span>
          <span>/</span>
          <span className="truncate font-medium text-[#2E294E]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* -------- gallery -------- */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <div className="flex gap-3 overflow-x-auto sm:flex-col">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f1e8ec] p-1.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E294E] sm:h-20 sm:w-20
                      ${activeImg === i ? 'ring-2 ring-[#2E294E]' : 'ring-1 ring-[#f2e4ea] hover:ring-[#2E294E]/40'}`}
                  >
                    <img src={img.url} alt="" className="h-full w-full rounded-lg object-contain" />
                  </button>
                ))}
              </div>
              <div className="relative flex-1">
                {showDiscount && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-[#B5316B] px-3 py-1 text-xs font-semibold text-white">{pct}% off</span>
                )}
                <div className="flex aspect-square items-center justify-center rounded-3xl border border-[#f2e4ea] bg-[#f1e8ec] p-5 shadow-sm sm:p-8">
                  <img src={images[activeImg].url} alt={product.name} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* -------- info -------- */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B5316B]">{product.category}</p>
              <button
                onClick={() => setWishlisted((v) => !v)}
                aria-label="Save to wishlist"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f2e4ea] text-[#2E294E] transition hover:border-[#B5316B] hover:text-[#B5316B]"
              >
                <IconHeart filled={wishlisted} />
              </button>
            </div>

            <h1 className="mt-2 text-2xl font-bold leading-snug text-[#2E294E] sm:text-3xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#6b6480]">
              <Stars value={product.rating} />
              <span className="font-medium text-[#2E294E]">{product.rating.toFixed(1)}</span>
              <span className="h-4 w-px bg-[#f2e4ea]" />
              <button onClick={() => setTab('reviews')} className="hover:text-[#B5316B]">{reviews.length} reviews</button>
              <span className="h-4 w-px bg-[#f2e4ea]" />
              <span>{product.totalSell} sold</span>
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
                <button onClick={dec} disabled={qty <= 1} aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center rounded-l-xl text-[#2E294E] transition hover:bg-[#f2e4ea] disabled:opacity-40"><IconMinus /></button>
                <span className="w-10 text-center font-semibold text-[#2E294E]">{qty}</span>
                <button onClick={inc} disabled={qty >= product.stock} aria-label="Increase quantity" className="grid h-11 w-11 place-items-center rounded-r-xl text-[#2E294E] transition hover:bg-[#f2e4ea] disabled:opacity-40"><IconPlus /></button>
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

            {/* shop card with Send message */}
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#f2e4ea] p-4 sm:flex-row sm:items-center">
              <img src={product.shop.shopAvatar.url} alt={product.shop.name} className="h-14 w-14 rounded-full border-2 border-[#f2e4ea] object-cover" />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-bold text-[#2E294E]">{product.shop.name}</h2>
                <div className="flex items-center gap-1.5 text-sm text-[#6b6480]"><Stars value={product.shop.ratings} /><span>{product.shop.ratings.toFixed(1)} ratings</span></div>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"><IconMessage />Send message</button>
                <Link to="/" className="rounded-xl border border-[#2E294E] px-4 py-2 text-sm font-semibold text-[#2E294E] transition hover:bg-[#2E294E] hover:text-white">Visit store</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- tabs ---------------- */}
        <div className="mt-12">
          <div className="flex gap-6 overflow-x-auto border-b border-[#f2e4ea]">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition sm:text-base
                  ${tab === t.key ? 'border-[#B5316B] text-[#2E294E]' : 'border-transparent text-[#6b6480] hover:text-[#2E294E]'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {/* --- details --- */}
            {tab === 'details' && (
              <div className="grid gap-8 lg:grid-cols-3">
                <p className="leading-relaxed text-[#57516b] lg:col-span-2">{product.description}</p>
                <div className="rounded-2xl border border-[#f2e4ea] bg-[#f1e8ec] p-5">
                  <h3 className="font-bold text-[#2E294E]">At a glance</h3>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Category</dt><dd className="font-medium text-[#2E294E]">{product.category}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Availability</dt><dd className="font-medium text-[#2E294E]">{inStock ? `${product.stock} in stock` : 'Out of stock'}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Units sold</dt><dd className="font-medium text-[#2E294E]">{product.totalSell}</dd></div>
                    <div className="flex justify-between gap-4"><dt className="text-[#6b6480]">Sold by</dt><dd className="font-medium text-[#2E294E]">{product.shop.name}</dd></div>
                  </dl>
                </div>
              </div>
            )}

            {/* --- reviews --- */}
            {tab === 'reviews' && (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* summary + list */}
                <div className="lg:col-span-2">
                  <div className="flex flex-col gap-6 rounded-2xl border border-[#f2e4ea] p-5 sm:flex-row sm:items-center">
                    <div className="text-center sm:border-r sm:border-[#f2e4ea] sm:pr-6">
                      <div className="text-4xl font-bold text-[#2E294E]">{avg.toFixed(1)}</div>
                      <div className="mt-1 flex justify-center"><Stars value={Math.round(avg)} /></div>
                      <div className="mt-1 text-xs text-[#6b6480]">{reviews.length} reviews</div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((s, i) => {
                        const count = dist[i]
                        const width = reviews.length ? (count / reviews.length) * 100 : 0
                        return (
                          <div key={s} className="flex items-center gap-2 text-xs text-[#6b6480]">
                            <span className="w-3">{s}</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f1e8ec]">
                              <div className="h-full rounded-full bg-[#F5B301]" style={{ width: `${width}%` }} />
                            </div>
                            <span className="w-6 text-right">{count}</span>
                          </div>
                        )
                      })}
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
                </div>

                {/* write a review */}
                <div className="h-fit rounded-2xl border border-[#f2e4ea] bg-[#f1e8ec] p-5">
                  <h3 className="font-bold text-[#2E294E]">Write a review</h3>
                  <div className="mt-3 flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button key={i} onMouseEnter={() => setHoverRating(i)} onClick={() => setFormRating(i)} aria-label={`${i} star`} className="p-0.5">
                        <svg viewBox="0 0 20 20" className="h-6 w-6"><path d="M10 1.6l2.47 5 5.53.8-4 3.9.94 5.5L10 14.2 5.06 16.8 6 11.3l-4-3.9 5.53-.8z" fill={(hoverRating || formRating) >= i ? '#F5B301' : '#e5e0e6'} /></svg>
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    rows={4}
                    placeholder="Share your thoughts about this product…"
                    className="mt-3 w-full resize-none rounded-xl border border-[#f2e4ea] bg-white p-3 text-sm text-[#2E294E] outline-none focus:border-[#2E294E]"
                  />
                  <button onClick={submitReview} disabled={!formRating || !formText.trim()} className="mt-3 w-full rounded-xl bg-[#2E294E] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40">
                    Submit review
                  </button>
                  <p className="mt-2 text-xs text-[#6b6480]">Saved for this session only until the backend is connected.</p>
                </div>
              </div>
            )}

            {/* --- seller --- */}
            {tab === 'seller' && (
              <div className="rounded-2xl border border-[#f2e4ea] p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <img src={product.shop.shopAvatar.url} alt={product.shop.name} className="h-16 w-16 rounded-full border-2 border-[#f2e4ea] object-cover" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2E294E]">{product.shop.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-[#6b6480]"><Stars value={product.shop.ratings} /><span>{product.shop.ratings.toFixed(1)} ratings</span></div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 rounded-xl bg-[#2E294E] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"><IconMessage />Send message</button>
                    <Link to="/" className="rounded-xl border border-[#2E294E] px-4 py-2 text-sm font-semibold text-[#2E294E] transition hover:bg-[#2E294E] hover:text-white">Visit store</Link>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { k: 'Products', v: sellerProductCount },
                    { k: 'Rating', v: product.shop.ratings.toFixed(1) },
                    { k: 'Joined', v: 'Jan 2024' },
                    { k: 'Response rate', v: '98%' },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl bg-[#f1e8ec] p-4 text-center">
                      <div className="text-xl font-bold text-[#2E294E]">{s.v}</div>
                      <div className="mt-1 text-xs text-[#6b6480]">{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ---------------- related products ---------------- */}
        {relatedList.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between border-b border-[#f2e4ea] pb-4">
              <h2 className="text-xl font-bold text-[#2E294E] sm:text-2xl">Related products</h2>
              <Link to="/" className="text-sm font-semibold text-[#B5316B] hover:underline">View all</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedList.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetail