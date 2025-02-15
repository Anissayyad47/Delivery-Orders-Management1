import { useState,useEffect } from "react";
import axios from "axios";
import "./CSS/MainPage.css";
import { FaBars } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
function MainPage() {
  const [isPopUp, setIsPopUp] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [detailOrder,setDetailsOrder]=useState(null);
  const [isDetailPopUp, setDetailPopUp] = useState(false);
  const [orderStatus, setOrderStatus]=useState(false);
  const [orderID,setOrderID]=useState(null)
  // const [recievedData,setRecievedData]=useState(null);
  const [data, setData] = useState({
    address: "",
    products: "",
    customer_no: "",
    distance: "",
    price: "",
    order_place_time: "",
    order_pickup_time: "",
    order_complete_time: "",
    delivery_boy: "",
    order_status: "Pending",
  });

  useEffect(() => {
    axios.get("http://localhost:5500/api/user")
      .then((response) => {
        console.log("Received data:", response.data);
        if (Array.isArray(response.data)) {
          setDataList(response.data);
        } else {
          console.error("Data is not an array:", response.data);
          setDataList([]); // Prevent errors
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  function HandleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function HandlePlaceOrder() {
    const newOrder = {
      ...data,
      order_place_time: new Date().toLocaleTimeString(),
      products: data.products.split(","), 
      distance: Number(data.distance),
      price: Number(data.price),
      delivery_boy:"Not Picked Yet",
      order_pickup_time:"Not Picked Yet",
      order_complete_time:"Not Picked Yet",
    };

    try {
      const response = await axios.post("http://localhost:5500/add-order", newOrder);
      alert(response.data.message);
      setIsPopUp(false);
      setData({
        seller_name:"",
        address: "",
        products: "",
        customer_no: "",
        distance: "",
        price: "",
        order_place_time: "",
        order_pickup_time: "",
        order_complete_time: "",
        delivery_boy: "",
        order_status: "Pending",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to place order");
    }
  }

  function HandlePop() {
    setIsPopUp(true);
  }

  function HandleCancel() {
    setIsPopUp(false);
  }

  function HandleIsPicked(orderId) {
    const updateData={
      order_pickup_time: new Date().toLocaleTimeString(),
      delivery_boy: "Anis Sayyad",
      order_status: "In-Processing",
    }
    axios.put(`http://localhost:5500/api/orders/${orderId}`, updateData)
    .then(response => {
      console.log("Updated order:", response.data);
      alert("Order updated successfully!");
    })
    .catch(error => console.error("Error updating order:", error));
  }

  function handleOrderComplete(orderId){
    const updateData={
      order_complete_time: new Date().toLocaleTimeString(),
      order_status: "Completed",
    }
    axios.put(`http://localhost:5500/api/orders/${orderId}`, updateData)
    .then(response => {
      console.log("Updated order:", response.data);
      alert("Order updated successfully!");
    })
    .catch(error => console.error("Error updating order:", error));
    setOrderStatus(false);
  }

  function handleOrderCancelled(orderId){
    const updateData={
      order_complete_time: new Date().toLocaleTimeString(),
      order_status: "Cancelled",
    }
    axios.put(`http://localhost:5500/api/orders/${orderId}`, updateData)
    .then(response => {
      console.log("Updated order:", response.data);
      alert("Order updated successfully!");
    })
    .catch(error => console.error("Error updating order:", error));
    setOrderStatus(false);
  }

  return (
    <>
    <div className="whole-container">
    {/* Navigation Bar */}
      <div className="NavBar">
      <FaBars className="profile"/>
        <div className="NavBarContent"><h1><span className="dukanse">DUKANSE</span> <span className="organization">ORGANIZATION</span></h1></div>
        <MdOutlineAddCircle onClick={HandlePop} className="add-logo"></MdOutlineAddCircle>
      </div>
      {/* Add Order Details Pop up */}
      {isPopUp && (
        <div className="popup-overlay">
        <div className="place-Order-Template">
          <div className="place-Order-top">
          <input type="text" placeholder="Seller Name" name="seller_name" onChange={HandleChange} required></input>
          <input type="text" placeholder="Order Address" name="address" onChange={HandleChange} required />
          <input type="text" placeholder="Product Names (comma-separated)" name="products" onChange={HandleChange} required />
          <input type="text" placeholder="Customer Number" name="customer_no" onChange={HandleChange} required />
          </div>

          <div className="place-Order-mid">
          <div className="place-order-Distance">
            <input type="number" placeholder="Distance (km)" name="distance" onChange={HandleChange} required />
            <input type="number" placeholder="Price" name="price" onChange={HandleChange} required />
          </div>
          </div>

          <div className="place-Order-bottom">
          <div className="place-order-cancel">
            <button onClick={HandlePlaceOrder}>Place Order</button>
            <button onClick={HandleCancel}>Cancel Order</button>
          </div>
          </div>

        </div>
        </div>
      )}

      {dataList.map((order, index) => (
        <div className="order-place-template-container">
        <div className="order-place-template" key={index}>
          <div className="order-place-template-in">
          <p>Seller Name : {order.seller_name}</p>
          <p>Order Address : {order.address}</p>
          <p>Customer Contact : {order.customer_no}</p>
          <p>Distance : {order.distance}</p>
          <p>Charges :{order.price} </p>
          <p>Order Status : {order.order_status}</p>
          <div className="order-place-template-button">
          {order.order_status==="Pending" ? (<button onClick={()=>HandleIsPicked(order._id)}>Pick Order</button>)
          :order.order_status==="In-Processing" && (<>
           <button onClick={()=> {setOrderStatus(true);setOrderID(order._id);}}>Order Status</button>
          </>)}
          <button onClick={() =>
            {setDetailPopUp(true);
              setDetailsOrder(order);
            }}>Details</button>
            </div>
            </div>
        </div>
        <div className="delivery-picked">
        <p> . . . Delivery Piked By {order.delivery_boy}</p>
        </div>
        </div>
      ))}
      {orderStatus===true && ( 
        <div className="order-complete-cancel-overlay">
        <div className="order-complete-cancel">
          <MdCancel className="order-complete-cancel-popup-cancel" onClick={()=>setOrderStatus(false)}></MdCancel>
        <p>After Completing or Cancelling the order the Staus cannot be update </p>
        <div>
          <button onClick={()=> handleOrderComplete(orderID)}>Complete</button>
          <button onClick={()=> handleOrderCancelled(orderID)}>Cancelled</button>
        </div>
        </div>
        <div>
        </div>
      </div>
      )}
      {isDetailPopUp && (
        <div className="popup-overlay">
          <div className="order-details-template">
            <div className="order-details"><h3>Seller Name : </h3><p>{detailOrder.seller_name}</p></div>
            <div className="order-details"><h3>Order Address : </h3><p>{detailOrder.address}</p></div>
            <div className="order-details"><h3>Products : </h3><p>{detailOrder.products}</p></div>
            <div className="order-details"><h3>Customer Contacts : </h3><p>{detailOrder.customer_no}</p></div>
            <div className="order-details"><h3>Delivery Boy : </h3><p>{detailOrder.delivery_boy}</p></div>
            <div className="order-details"><h3>Distance : </h3><p>{detailOrder.distance}</p></div>
            <div className="order-details"><h3>Order Charges : </h3><p>{detailOrder.price}</p></div>
            <div className="order-details"><h3>Place Time : </h3><p>{detailOrder.order_place_time}</p></div>
            <div className="order-details"><h3>Pick Time : </h3><p>{detailOrder.order_pickup_time}</p></div>
            <div className="order-details"><h3>Complete Time : </h3><p>{detailOrder.order_complete_time}</p></div>
            <div className="order-details"><h3>Order Staus : </h3><p>{detailOrder.order_status}</p></div>
            <button onClick={() => setDetailPopUp(false)}>Back</button>
          </div>
          </div>
        )}
        </div>
    </>
  );
}

export default MainPage;
