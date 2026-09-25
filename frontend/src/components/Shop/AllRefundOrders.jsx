import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";

const statusStyle = {
  "Processing refund": "bg-purple-100 text-purple-700",
  "Refund Success": "bg-emerald-100 text-emerald-700",
};

const AllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller?._id]);

  const refundOrders =
    orders?.filter(
      (item) =>
        item.status === "Processing refund" || item.status === "Refund Success"
    ) || [];

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      <h1 className="mb-6 text-xl font-bold text-[#2E294E]">Refund Requests</h1>

      {refundOrders.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-[#f2e4ea] bg-white">
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
              {refundOrders.map((item) => (
                <tr key={item._id} className="border-t border-[#f2e4ea]">
                  <td className="px-4 py-3 font-medium text-[#2E294E]">
                    #{item._id?.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyle[item.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#6b6480]">
                    {item.cart?.length}
                  </td>
                  <td className="px-4 py-3 font-medium text-[#2E294E]">
                    ${item.totalPrice}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/dashboard/order/${item._id}`}
                      className="inline-flex items-center gap-1 font-semibold text-[#B5316B] hover:underline"
                    >
                      <AiOutlineArrowRight size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-[#6b6480]">
          No refund requests yet.
        </p>
      )}
    </div>
  );
};

export default AllRefundOrders;