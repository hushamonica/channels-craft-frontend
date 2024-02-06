import { useState, useEffect } from "react"
import { isEmail } from "validator"
import _ from "lodash"
import { useDispatch, useSelector } from "react-redux"
import { startAddCustomer } from "../../actions/customer-action"
import { startGetUser } from "../../actions/user-action"
import { startGetOperator } from "../../actions/operator-action"
import 'bootstrap/dist/css/bootstrap.min.css';


const AddCustomer = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user.data
    })

    const serverErrors = useSelector((state) => state.serverErrors)

    const operator = useSelector((state) => {
        return state.operator.data
    })

    useEffect(() => {
        dispatch(startGetUser())
        dispatch(startGetOperator())
    }, [])
  
    const [customerName, setCustomerName] = useState('')
    const [mobile, setMobile] = useState('')
    const [boxNumber, setBoxNumber] = useState('')
    const [formErrors, setFormErrors] = useState([])
    const [userId, setUserId] = useState('')
    const [operatorId, setOperatorId] = useState('')
    const [selectedOperator, setSelectedOperator] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const [address, setAddress] = useState({
        doorNumber: '',
        street: '',
        city: '',
        state: '',
        pincode: ''
    })
    const errors = {}

    function runValidation() {
        if (_.isEmpty(customerName.trim())) {
            errors.customerName = "customerName is required"
        } else if (customerName.trim().length < 4 || customerName.trim().length > 64) {
            errors.customerName = "username should be between 4-64 characters"
        }
        if (_.isEmpty(mobile)) {
            errors.mobile = "mobile Number is required"
        } else if (mobile.trim().length !== 10 && !_.isNumber(mobile)) {
            errors.mobile = "mobile number must be 10 Numbers"
        }
        if (_.isEmpty(boxNumber.trim())) {
            errors.boxNumber = "boxNumber is required"
        } else if (boxNumber.trim().length !== 15 && !_.isNumber(boxNumber)) {
            errors.boxNumber = "box number must be 15 digits"
        }
        if (_.isEmpty(address.doorNumber.trim())) {
            errors.doorNumber = "Door Number cannot be Empty"
        }
        if (_.isEmpty(address.street.trim())) {
            errors.street = "street cannot be Empty"
        }
        if (_.isEmpty(address.city.trim())) {
            errors.city = "city cannot be Empty"
        }
        if (_.isEmpty(address.state.trim())) {
            errors.state = "state cannot be Empty"
        }

        if (_.isEmpty(address.pincode.trim())) {
            errors.pincode = "pincode cannot be Empty"
        } else if (!(address.pincode.length === 6)) {
            errors.pincode = "pincode must be 6 digits"
        }
    }

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(errors).length === 0) {
            const formData = {
                customerName: customerName,
                mobile: mobile,
                boxNumber: boxNumber,
                userId: userId,
                address: {
                    doorNumber: address.doorNumber,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    pincode: address.pincode
                },
                operatorId

            }
            dispatch(startAddCustomer(formData))
                .then(() => {
                    setCustomerName('')
                    setMobile('')
                    setBoxNumber('')
                    setAddress({
                        doorNumber: '',
                        street: '',
                        city: '',
                        state: '',
                        pincode: ''
                    })

                }).catch((error) => {
                    if (error.response && error.response.data) {
                        dispatch(serverErrors(error.response.data.errors || []))
                    } else {
                        console.error("Unexpected error:", error);
                    }
                })
        } else {
            setFormErrors(errors)
        }
    }
    const handleUser = (e) => {
        let user = e.target.value
        setSelectedUser(user)
        setUserId(user)
    }

    const handleOperator = (e) => {
        let operator = e.target.value
        setSelectedOperator(operator)
        setOperatorId(operator)
    }

    useEffect(() => {
        if (selectedUser) {
            const selectedUserDetails = user.find((u) => u._id === selectedUser);
            if (selectedUserDetails) {
                setUserId(selectedUserDetails._id);
                setCustomerName(selectedUserDetails.username || '');
                setMobile(selectedUserDetails.mobile || '');
            }
        }
    }, [selectedUser, user]);

    return (


        <div className="container mt-5 d-flex justify-content-center" >

                    <form onSubmit={handleSubmit} class="row g-3"  >
                        <h3 style={{marginLeft:"120px"}}>Add Customer</h3>
                        <label>Select User</label><br />
                        <select class="form-select" aria-label="Default select example" value={selectedUser} onChange={handleUser}>
                            <option value="" >Select a User</option>
                            {user.map(user => <option key={user.id} value={user._id}>{user.username}</option>)}
                        </select><br />
                        <br />
                        <label className="dropdown">Select Operator</label><br />
                        <select class="form-select" aria-label="Default select example" value={selectedOperator} onChange={handleOperator}>
                            <option value="">Select operator</option>
                            {operator?.map(operator => <option key={operator.id} value={operator._id}>{operator.operatorName} </option>)}
                        </select><br />

                        <br />
                        <div class="col-md-6">
                            <label htmlFor="customerName">Name</label>
                            <input type="text"
                                value={customerName}
                                class="form-control"
                                placeholder="Name"
                                id="customerName"
                                onChange={(e) => {
                                    setCustomerName(e.target.value)
                                }}
                                disabled
                            />
                            {formErrors.customerName && formErrors.customerName}
                        </div>
                        <div class="col-md-6">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text"
                                value={mobile}
                                class="form-control"
                                placeholder="Mobile"
                                id="mobile"
                                onChange={(e) => {
                                    setMobile(e.target.value)
                                }}
                                disabled
                            />

                            {formErrors.mobile && formErrors.mobile}<br />
                        </div>
                        <div class="col-12">
                            <label htmlFor="boxNumber">Box Number</label><br />
                            <input type="text"
                                value={boxNumber}
                                class="form-control"
                                placeholder="box Number"
                                id="boxNumber"
                                onChange={(e) => {
                                    setBoxNumber(e.target.value)
                                }}
                            />
                            {formErrors.boxNumber && formErrors.boxNumber}
                        </div>
                        <br />
                        <label>ADDRESS</label><br />

                        <div class="col-md-6">
                            <label htmlFor="doorNumber">Door Number</label><br />
                            <input type="text"
                                value={address.doorNumber}
                                class="form-control"
                                placeholder="DoorNumber"
                                id="DoorNumber"
                                name='doorNumber'
                                onChange={handleChange}
                            />
                            {formErrors.doorNumber && formErrors.doorNumber}
                        </div>

                        <div class="col-md-6">
                            <label htmlFor="Street">Street</label>
                            <input type="text"
                                class="form-control"
                                value={address.street}
                                placeholder="Street"
                                id="street"
                                name='street'
                                onChange={handleChange}
                            /><br />
                            {formErrors.street && formErrors.street}
                        </div>

                        <div class="col-md-4">
                            <label htmlFor="city">city</label><br />
                            <input type="text"
                                value={address.city}
                                class="form-control"
                                placeholder="city"
                                id="city"
                                name='city'
                                onChange={handleChange} />
                            {formErrors.city && formErrors.city}
                        </div>
                        <div class="col-md-4">
                            <label htmlFor="state">State</label><br />
                            <input type="text"
                                value={address.state}
                                class="form-control"
                                placeholder="state"
                                id="state"
                                name='state'
                                onChange={handleChange} /><br />
                            {formErrors.state && formErrors.state}<br />
                        </div>
                        <div class="col-md-4">
                            <label htmlFor="Pincode">pincode</label><br />
                            <input type="text"
                                value={address.pincode}
                                class="form-control"
                                placeholder="pincode"
                                id="Pincode"
                                name='pincode'
                                onChange={handleChange} />
                            {formErrors.pincode && formErrors.pincode}
                        </div>
                        <div class="col-12">
                            <input type='submit' />
                        </div>
                    </form>
               
            </div>
    )
                            }
export default AddCustomer
