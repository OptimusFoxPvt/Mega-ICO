import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitFiatPayment } from "../../Services/profileServices";

const FiatPaymentModal = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    amount: "",
    currency: "",
  });

  const { number, exp_month, exp_year, cvc, amount, currency } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      number: number,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: cvc,
      amount: amount,
      currency: currency,
    };
    dispatch(submitFiatPayment(data));
  };

  return (
    <div class="modal fade" id="pay-review" tabIndex="-1">
      <div class="modal-dialog modal-dialog-md modal-dialog-centered">
        <div class="modal-content">
          <div class="popup-body text-center">
            <div class="gaps-2x"></div>
            <div class="pay-status pay-status-success"></div>
            <div class="gaps-2x"></div>
            <form onSubmit={(e) => onSubmit(e)}>
              <div class="form-group">
                <label> Credit Card Number</label>
                <input
                  onChange={(e) => onChange(e)}
                  value={number}
                  name="number"
                  type="number"
                  className="form-control"
                />
                <label for="exampleInputEmail1">Expiry Month</label>
                <input
                  onChange={(e) => onChange(e)}
                  name="exp_month"
                  value={exp_month}
                  type="number"
                  className="form-control"
                />
                <label for="exampleInputEmail1">Expiry Year</label>
                <input
                  onChange={(e) => onChange(e)}
                  name="exp_year"
                  value={exp_year}
                  type="number"
                  className="form-control"
                />
                <label for="exampleInputEmail1">CVC</label>
                <input
                  onChange={(e) => onChange(e)}
                  name="cvc"
                  value={cvc}
                  type="number"
                  className="form-control"
                />
                <label for="exampleInputEmail1">Amount</label>
                <input
                  onChange={(e) => onChange(e)}
                  name="amount"
                  value={amount}
                  type="number"
                  className="form-control"
                />
                <label for="exampleInputEmail1">Currency</label>
                <input
                  onChange={(e) => onChange(e)}
                  name="currency"
                  value={currency}
                  type="text"
                  className="form-control"
                />
              </div>
              <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>

            <div class="gaps-1x"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiatPaymentModal;
