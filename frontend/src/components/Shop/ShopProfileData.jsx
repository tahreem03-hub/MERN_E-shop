import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { getAllShopProducts } from '../../redux/actions/product'
import { getAllEventsShop } from '../../redux/actions/event'
import ProductCard from '../route/ProductCard'

const ShopProfileData = () => {
  const [active, setActive] = useState(1)
  const { id } = useParams()

  const { products, isLoading: productsLoading } = useSelector((s) => s.product)
  const { events, isLoading: eventsLoading } = useSelector((s) => s.event)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getAllShopProducts(id))
      dispatch(getAllEventsShop(id))
    }
  }, [dispatch, id])

  // Flatten all reviews from all products
  const allReviews =
    products?.flatMap((p) => p.reviews || []) || []

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex items-center border-b border-[#f2e4ea] px-5">
        {[
          { id: 1, label: 'Shop Products' },
          { id: 2, label: 'Running Events' },
          { id: 3, label: `Shop Reviews (${allReviews.length})` },
        ].map((t) => (
          <h5
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-5 py-3 cursor-pointer font-semibold ${
              active === t.id
                ? 'text-[#B5316B] border-b-2 border-[#B5316B]'
                : 'text-[#2E294E]/60'
            }`}
          >
            {t.label}
          </h5>
        ))}
      </div>

      {/* Shop Products */}
      {active === 1 &&
        (productsLoading ? (
          <Loader />
        ) : !products || products.length === 0 ? (
          <Empty text="No products yet." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
            {products.map((p) => (
              <ProductCard data={p} key={p._id} />
            ))}
          </div>
        ))}

      {/* Running Events */}
      {active === 2 &&
        (eventsLoading ? (
          <Loader />
        ) : !events || events.length === 0 ? (
          <Empty text="No running events yet." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5">
            {events.map((e) => (
              <ProductCard data={e} key={e._id} isEvent={true} />
            ))}
          </div>
        ))}

      {/* Shop Reviews */}
      {active === 3 &&
        (allReviews.length === 0 ? (
          <Empty text="No reviews yet." />
        ) : (
          <div className="p-5 space-y-4">
            {allReviews.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#f2e4ea] bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`${import.meta.env.VITE_URL}/uploads/${r.user?.avatar}`}
                    alt={r.user?.name}
                    className="h-12 w-12 rounded-full object-cover bg-[#f1e8ec]"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-[#2E294E]">
                      {r.user?.name}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span
                          key={s}
                          className={`text-sm ${
                            s <= r.rating ? 'text-[#F5B301]' : 'text-[#e5e0e6]'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-xs text-[#6b6480] ml-2">
                        {r.createdAt?.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#57516b] leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  )
}

const Loader = () => (
  <div className="flex justify-center py-16">
    <Loader2 className="h-6 w-6 animate-spin text-[#2E294E]/40" />
  </div>
)

const Empty = ({ text }) => (
  <div className="p-5 text-[#2E294E]/50 text-center py-10">{text}</div>
)

export default ShopProfileData