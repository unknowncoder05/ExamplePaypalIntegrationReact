import './App.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMDkxMzkyLCJqdGkiOiJhYWVmNDU2YzU4M2Y0NDhiODliYzY3Y2RjNjRjM2Y3MCIsInVzZXJfaWQiOiI5ZjY5N2Y4Ni1kZTc1LTQ5ODMtYWIyYS1mMzNlNzM5ODcyMmEifQ.vwCir5PkM3TvMlLUIsafa5XMqhX1PqOazXHDTVzILqI'
const PAYPAL_CLIENT_ID = 'AV6AqYVCf8QZezQP6KkDwhmzfHU13L_kXZPx9pfFrdAyWmEFAwttUUNS4mB5ZD9zWi4UoHyjbT5aoF55'
const SERVICE_PAYMENT_PLAN = "80879f2f-7de2-44dd-8db5-2cf0b51da90d"

function App() {
    /*paypal.Buttons({
      // Order is created on the server and the order id is returned
      createOrder: (data, actions) => {
        return fetch(`http://0.0.0.0:8000/api/v1/service-deals/`, {
          method: "post",
          body: JSON.stringify({service_payment_plan:"80879f2f-7de2-44dd-8db5-2cf0b51da90d"}),
          headers: {
            Authentication: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMDIyODUwLCJqdGkiOiI1ZTE3Mjk0ODkzMzQ0ZWRjYjI2YzRmMDM3MzUyYzUyMiIsInVzZXJfaWQiOiI5ZjY5N2Y4Ni1kZTc1LTQ5ODMtYWIyYS1mMzNlNzM5ODcyMmEifQ.E_mwsmVUb5MLwF3Hem7kp3JduvYIl2rEp_3slA8hNYw"
          }
        })
        .then((response) => response.json())
        .then((order) => order.id);
      },
      // Finalize the transaction on the server after payer approval
      onApprove: (data, actions) => {
        return fetch(`http://0.0.0.0:8000/api/v1/payments/${data.orderID}/capture`, {
          method: "post",
          headers: {
            Authentication: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMDIyODUwLCJqdGkiOiI1ZTE3Mjk0ODkzMzQ0ZWRjYjI2YzRmMDM3MzUyYzUyMiIsInVzZXJfaWQiOiI5ZjY5N2Y4Ni1kZTc1LTQ5ODMtYWIyYS1mMzNlNzM5ODcyMmEifQ.E_mwsmVUb5MLwF3Hem7kp3JduvYIl2rEp_3slA8hNYw"
          }
        })
        .then((response) => response.json())
        .then((orderData) => {
          // Successful capture! For dev/demo purposes:
          console.log('Capture result', JSON.stringify(orderData, null, 2));
          const transaction = orderData.purchase_units[0].payments.captures[0];
          alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
          // When ready to go live, remove the alert and show a success message within this page. For example:
          // const element = document.getElementById('paypal-button-container');
          // element.innerHTML = '<h3>Thank you for your payment!</h3>';
          // Or go to another URL:  actions.redirect('thank_you.html');
        });
      }
    })*/
  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID,
    currency: "USD",
    //intent: "capture",
  };
  return (
    <div className="App">
      car
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          amount='70'
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return fetch(`http://localhost:8000/api/v1/service-deals/`, {
              method: "post",
              body: JSON.stringify({ service_payment_plan: SERVICE_PAYMENT_PLAN }),
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`
              }
            })
              .then((response) => response.json())
              .then((order) => {
                console.log(order);
                return order.transaction.external_id
              });
          }}
          onApprove={(data, actions) => {
            return fetch(`http://localhost:8000/api/v1/payments/${data.orderID}/capture/`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`
              }
            })
              .then((response) => response.json())
              .then((orderData) => {
                console.log('Capture result', JSON.stringify(orderData, null, 2));
                const transaction = orderData.purchase_units[0].payments.captures[0];
                alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
              });
          }
          }
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
