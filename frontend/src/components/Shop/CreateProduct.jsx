import React, { useEffect, useState } from 'react'
import { createProduct } from '../../redux/actions/product'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const CreateProduct = () => {

  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [images, setImages] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [discountPrice, setDiscountPrice] = useState('')
  const [stock, setStock] = useState('')

  const categoriesData = [{ title: 'Gift' }, { title: 'Flowers' }, { title: 'Decor' }]

  const handleImageChange = (e) => {
    e.preventDefault()
    const files = Array.from(e.target.files)
    setImages((prev) => [...prev, ...files])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newForm = new FormData();
    images.forEach((image) =>
      newForm.append("images", image));

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    dispatch(createProduct(newForm));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  return (
    <div className='w-[90%] md:w-[50%] bg-white shadow-sm h-[80vh] rounded-[4px] p-3 overflow-y-scroll'>
      <h5 className='text-[30px] font-Poppins text-center text-[#2E294E]'>Create Product</h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className='pb-2'>
            Name <span className='text-[#B5316B]'>*</span>
          </label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder='Enter your product name'
            className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
          />
        </div>

        <br />
        <div>
          <label className='pb-2'>
            Description <span className='text-[#B5316B]'>*</span>
          </label>
          <textarea
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={8}
            placeholder='Enter your product description'
            className='appearance-none block w-full px-3 pt-2 border border-[#f2e4ea] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
          />
        </div>

        <br />
        <div>
          <label className='pb-2'>
            Category <span className='text-[#B5316B]'>*</span>
          </label>
          <select
            className='w-full mt-2 border h-[35px] rounded-[5px] border-[#f2e4ea]'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value='Choose a category'>Choose a category</option>
            {categoriesData.map((c) => (
              <option value={c.title} key={c.title}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <br />
        <div>
          <label className='pb-2'>Tags</label>
          <input
            type='text'
            name='tags'
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder='Enter your product tags'
            className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
          />
        </div>

        <br />
        <div>
          <label className='pb-2'>Original Price</label>
          <input
            type='number'
            name='originalPrice'
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder='Enter your product price'
            className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
          />
        </div>

        <br />
        <div>
          <label className='pb-2'>
            Price (With Discount) <span className='text-[#B5316B]'>*</span>
          </label>
          <input
            type='number'
            name='discountPrice'
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            required
            placeholder='Enter your price with discount'
            className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
          />
        </div>

        <br />
        <div>
          <label className='pb-2'>
            Product Stock <span className='text-[#B5316B]'>*</span>
          </label>
          <input
            type='number'
            name='stock'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            placeholder='Enter your product stock'
            className='appearance-none block w-full px-3 h-[35px] border border-[#f2e4ea] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-[#B5316B] focus:border-[#B5316B] sm:text-sm sm:leading-5'
          />
        </div>

        <br />
        <div>
          <label className='pb-2'>
            Upload Images <span className='text-[#B5316B]'>*</span>
          </label>
          <input
            type='file'
            id='upload'
            className='hidden'
            multiple
            onChange={handleImageChange}
          />
          <div className='w-full flex items-center flex-wrap gap-2'>
            <label htmlFor='upload' className='cursor-pointer'>
              <span className='text-[30px] text-[#2E294E]'>+</span>
            </label>
            {images.map((img, i) => (
              <img
                src={URL.createObjectURL(img)}
                key={i}
                alt=''
                className='w-[120px] h-[120px] object-cover rounded-[2px]'
              />
            ))}
          </div>
        </div>

        <br />
        <div>
          <input
            type='submit'
            value='Create'
            className='w-full h-[42px] rounded-[5px] bg-[#B5316B] text-white font-[600] cursor-pointer'
          />
        </div>
      </form>
    </div>
  )
}

export default CreateProduct