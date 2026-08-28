import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllShopProducts, deleteProduct } from '../../redux/actions/product'
import { Link } from 'react-router-dom'
import { Eye, Trash2, Loader2, PackageX } from 'lucide-react'

const AllProducts = () => {
  const { seller } = useSelector((state) => state.seller)
  const { products, isLoading } = useSelector((state) => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllShopProducts(seller._id))
    }
  }, [dispatch, seller?._id])

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
    window.location.reload();
  }

  return (
    <div className='w-full mx-8 pt-1 mt-10 bg-white'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center py-24 text-[#2E294E]/50'>
          <Loader2 className='h-6 w-6 animate-spin' />
          <p className='mt-3 text-sm'>Loading products…</p>
        </div>
      ) : !products || products.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <PackageX className='h-8 w-8 text-[#2E294E]/30' />
          <p className='mt-3 text-sm font-medium text-[#2E294E]'>No products yet</p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='border-b border-[#f2e4ea] text-xs uppercase tracking-wide text-[#2E294E]/60'>
                <th className='py-3 px-2'>Name</th>
                <th className='py-3 px-2'>Price</th>
                <th className='py-3 px-2'>Stock</th>
                <th className='py-3 px-2'>Sold</th>
                <th className='py-3 px-2'>Preview</th>
                <th className='py-3 px-2'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className='border-b border-[#f2e4ea] text-sm text-[#2E294E]'>
                  <td className='py-3 px-2'>{product.name}</td>
                  <td className='py-3 px-2'>US$ {product.discountPrice}</td>
                  <td className='py-3 px-2'>{product.stock}</td>
                  <td className='py-3 px-2'>{product.soldOut}</td>
                  <td className='py-3 px-2'>
                    <Link to={`/product/${product._id}`}>
                      <Eye className='h-4 w-4 text-[#2E294E]/60 hover:text-[#B5316B]' />
                    </Link>
                  </td>
                  <td className='py-3 px-2'>
                    <button onClick={() => handleDelete(product._id)}>
                      <Trash2 className='h-4 w-4 text-[#2E294E]/60 hover:text-[#B5316B]' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AllProducts