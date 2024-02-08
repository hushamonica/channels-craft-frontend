import { useDispatch, useSelector } from "react-redux";
import { OperatorContext } from "./operatorContext";
import { useState, useEffect, useContext } from "react";
import { startUpdateUser } from "../../actions/user-action";
import { startEditCustomer } from "../../actions/customer-action";
import { StartGetCustomer } from "../../actions/customer-action"
import { startGetOrder } from "../../actions/order-action";

const CustomerProfile = () => {
  const dispatch = useDispatch();

  const customers = useSelector((state) => {
    return state.customer.data
  })

  const order = useSelector((state)=>{
    return state.order
  })
  console.log(order.paid, "current order")
  console.log(order.packages, "kkk")
  // console.log(order.packages[0].packageName, "current packages")
  // console.log(order.channels[0].channelName, "current channels")

  useEffect(() => {
    dispatch(StartGetCustomer())
    dispatch(startGetOrder())
  }, [dispatch])

  const { userState } = useContext(OperatorContext);

  const [formData, setFormData] = useState({
    customerName: userState.userDetails.username,
    mobile: userState.userDetails.mobile,
    boxNumber: userState.customer.boxNumber,
    address: {
      doorNumber: '',
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    oldPassword: '',
    newPassword: ''
  });
  console.log(formData, "address check")

  const userId = userState.userDetails._id;
  const customerId = userState.customer._id;
  console.log(customerId, "priya")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(startUpdateUser(userId, {
        "oldPassword": formData.oldPassword,
        "newPassword": formData.newPassword
      }));
      await dispatch(startEditCustomer(customerId, {
        "mobile": formData.mobile,
      }))
      setFormData({
        ...formData,
        oldPassword: '',
        newPassword: ''
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const { userDetails, customer } = userState;
    const customerAddress = customer.address || {};

    setFormData({
      customerName: userDetails.username || '',
      mobile: userDetails.mobile || '',
      boxNumber: customer.boxNumber || '',
      address: {
        doorNumber: customerAddress.doorNumber || '',
        street: customerAddress.street || '',
        city: customerAddress.city || '',
        state: customerAddress.state || '',
        pincode: customerAddress.pincode || ''
      },
      oldPassword: '',
      newPassword: ''
    });
  }, [userState]);


  return (
    <div>
      {userState.userDetails.role === 'customer' && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={handleChange}
              name="customerName"
              disabled
            />
            <br />

            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <br />

            <label>Box Number</label>
            <input
              type="string"
              name="boxNumber"
              value={formData.boxNumber}
              onChange={handleChange}
            />
            <br />

            <label>Address</label>
            <br />
            <label>Door Number</label>
            <input
              type="text"
              value={formData.address.doorNumber}
              name="doorNumber"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, doorNumber: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>Street</label>
            <input
              type="text"
              value={formData.address.street}
              name="street"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, street: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>City</label>
            <input
              type="text"
              value={formData.address.city}
              name="city"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, city: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>State</label>
            <input
              type="text"
              value={formData.address.state}
              name="state"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, state: e.target.value }
                })
              }
              disabled
            />
            <br />

            <label>Pincode</label>
            <input
              type="text"
              value={formData.address.pincode}
              name="pincode"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: { ...formData.address, pincode: e.target.value }
                })
              }
              disabled
            />
            <br />

            {Object.keys(order.paid).length > 0 ? (
              <div>
                {
                  order.paid.packages.map(ele => (
                    <>
                      <label>Current Packages</label>
                      <input 
                        type='text'
                        value={ele.packageId.packageName}
                        name='currentPackages'
                        onChange={handleChange}
                        disabled
                      />
                      <br />
                    </>
                  ))
                }
              </div>
             ) : (
              <p>No packages available</p> 
             )} 

            {Object.keys(order.paid).length > 0 ? (
              <div>
                {
                  order.paid.channels.map(ele => (
                    <>
                      <label>Current Channels</label>
                      <input 
                        type='text'
                        value={ele.channelId.channelName}
                        name='currentChannels'
                        onChange={handleChange}
                      />
                      <br />
                    </>
                  ))
                }
              </div>
            ): ( 
               <p>No channels available</p> 
             )} 

            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
            <br />

            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <br />

            <input type="submit" />
          </form>
         
        </div>
      )}
    </div>
  );
};

export default CustomerProfile;
