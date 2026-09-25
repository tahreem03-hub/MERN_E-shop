import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMoneyCollect, AiOutlineArrowRight } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllShopProducts } from "../../redux/actions/product";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllShopProducts(seller._id));
    }
  }, [dispatch, seller?._id]);

  const availableBalance = seller?.availableBalance?.toFixed(2) || "0.00";
  const latestOrders = orders?.slice(0, 5) || [];

  return (
    <div className="w-full p-4 lg:p-8">
      <h3 className="text-xl font-bold text-[#2E294E] pb-4">Overview</h3>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Balance */}
        <div className="rounded-2xl border border-[#f2e4ea] bg-white p-5">
          <div className="flex items-center gap-2">
            <AiOutlineMoneyCollect size={26} className="text-[#B5316B]" />
            <h3 className="text-sm font-medium text-[#6b6480]">
              Account Balance{" "}
              <span className="text-xs">(with 10% service charge)</span>
            </h3>
          </div>
          <h5 className="mt-3 text-2xl font-bold text-[#2E294E]">
            ${availableBalance}
          </h5>
          <Link to="/dashboard/withdraw-money">
            <h5 className="mt-3 text-sm font-semibold text-[#B5316B] hover:underline">
              Withdraw Money
            </h5>
          </Link>
        </div>

        {/* Orders */}
        <div className="rounded-2xl border border-[#f2e4ea] bg-white p-5">
          <div className="flex items-center gap-2">
            <MdBorderClear size={26} className="text-[#B5316B]" />
            <h3 className="text-sm font-medium text-[#6b6480]">All Orders</h3>
          </div>
          <h5 className="mt-3 text-2xl font-bold text-[#2E294E]">
            {orders?.length || 0}
          </h5>
          <Link to="/dashboard/orders">
            <h5 className="mt-3 text-sm font-semibold text-[#B5316B] hover:underline">
              View Orders
            </h5>
          </Link>
        </div>

        {/* Products */}
        <div className="rounded-2xl border border-[#f2e4ea] bg-white p-5">
          <div className="flex items-center gap-2">
            <AiOutlineMoneyCollect size={26} className="text-[#B5316B]" />
            <h3 className="text-sm font-medium text-[#6b6480]">All Products</h3>
          </div>
          <h5 className="mt-3 text-2xl font-bold text-[#2E294E]">
            {products?.length || 0}
          </h5>
          <Link to="/dashboard/products">
            <h5 className="mt-3 text-sm font-semibold text-[#B5316B] hover:underline">
              View Products
            </h5>
          </Link>
        </div>
      </div>

      {/* Latest Orders */}
      <h3 className="mt-8 mb-4 text-xl font-bold text-[#2E294E]">
        Latest Orders
      </h3>
      <div className="rounded-2xl border border-[#f2e4ea] bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f1e8ec] text-left text-[#2E294E]">
            <tr>
              <th className="px-4 py-3 font-semibold">Order ID</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Items Qty</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold"></th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.length > 0 ? (
              latestOrders.map((item) => (
                <tr key={item._id} className="border-t border-[#f2e4ea]">
                  <td className="px-4 py-3 font-medium text-[#2E294E]">
                    #{item._id?.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3 text-[#6b6480]">{item.status}</td>
                  <td className="px-4 py-3 text-[#6b6480]">
                    {item.cart?.reduce((acc, i) => acc + i.quantity, 0)}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#2E294E]">
                    ${item.totalPrice}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/dashboard/order/${item._id}`}
                      className="text-[#B5316B] hover:underline"
                    >
                      <AiOutlineArrowRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-[#6b6480]">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHero;