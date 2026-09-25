import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { loadSeller } from "../../redux/actions/user";

const inputClass =
  "w-full h-11 rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-4 text-sm text-[#2E294E] outline-none focus:border-[#B5316B]";

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(50);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    if (seller?._id) dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller?._id]);

  const availableBalance = seller?.availableBalance?.toFixed(2) || "0.00";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = { ...bankInfo };
    setPaymentMethod(false);

    await axios
      .put(
        `${import.meta.env.VITE_URL}/shop/update-payment-methods`,
        { withdrawMethod },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Withdraw method added successfully!");
        dispatch(loadSeller());
        setBankInfo({
          bankName: "",
          bankCountry: "",
          bankSwiftCode: "",
          bankAccountNumber: "",
          bankHolderName: "",
          bankAddress: "",
        });
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${import.meta.env.VITE_URL}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
      toast.error("You can't withdraw this amount!");
      return;
    }
    await axios
      .post(
        `${import.meta.env.VITE_URL}/withdraw/create-withdraw-request`,
        { amount: withdrawAmount },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Withdraw money request successful!");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="w-full p-4 lg:p-8">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl border border-[#f2e4ea] p-10 flex flex-col items-center">
        <h5 className="text-base text-[#6b6480]">
          Available Balance:{" "}
          <span className="text-[#2E294E] font-semibold">
            ${availableBalance}
          </span>
        </h5>

        <button
          onClick={() =>
            availableBalance < 50
              ? toast.error("You don't have enough balance to withdraw!")
              : setOpen(true)
          }
          className="mt-4 h-11 px-8 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90"
        >
          Withdraw
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
          <div
            className={`w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 relative ${
              paymentMethod ? "h-[80vh] overflow-y-auto" : "min-h-[40vh]"
            }`}
          >
            <RxCross1
              size={26}
              onClick={() => {
                setOpen(false);
                setPaymentMethod(false);
              }}
              className="cursor-pointer absolute top-4 right-4 text-[#2E294E]"
            />

            {paymentMethod ? (
              <div>
                <h3 className="text-xl font-bold text-[#2E294E] text-center mb-4">
                  Add New Withdraw Method
                </h3>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {[
                    { key: "bankName", label: "Bank Name" },
                    { key: "bankCountry", label: "Bank Country" },
                    { key: "bankSwiftCode", label: "Bank Swift Code" },
                    { key: "bankAccountNumber", label: "Bank Account Number" },
                    { key: "bankHolderName", label: "Bank Holder Name" },
                    { key: "bankAddress", label: "Bank Address" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <label className="block pb-1 text-sm font-medium text-[#2E294E]">
                        {label} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={bankInfo[key]}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, [key]: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90"
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#2E294E] mb-4">
                  Available Withdraw Methods
                </h3>

                {seller?.withdrawMethod ? (
                  <div>
                    <div className="flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <h5 className="text-sm text-[#6b6480]">
                          Account Number:{" "}
                          {"*".repeat(
                            seller.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5 className="text-sm text-[#6b6480]">
                          Bank Name: {seller.withdrawMethod.bankName}
                        </h5>
                      </div>
                      <AiOutlineDelete
                        size={22}
                        className="cursor-pointer text-[#B5316B]"
                        onClick={deleteHandler}
                      />
                    </div>

                    <h4 className="mt-4 text-sm font-semibold text-[#2E294E]">
                      Available Balance: ${availableBalance}
                    </h4>

                    <div className="mt-4 flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="w-32 h-11 rounded-xl border border-[#f2e4ea] bg-[#f1e8ec] px-3 text-sm outline-none focus:border-[#B5316B]"
                      />
                      <button
                        onClick={withdrawHandler}
                        className="h-11 px-6 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-[#6b6480]">
                      No Withdraw Methods available!
                    </p>
                    <button
                      onClick={() => setPaymentMethod(true)}
                      className="mt-4 h-11 px-6 rounded-xl bg-[#2E294E] text-white font-semibold hover:opacity-90"
                    >
                      Add New
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;