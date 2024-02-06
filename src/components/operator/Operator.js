import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"
import { startAddOperator } from "../../actions/operator-action";
import { useSelector } from "react-redux";
import { startGetUser } from "../../actions/user-action";
// import { GetOperator } from "../../actions/operator-action";
// import { startAddOperator } from "../../actions/package-action";
import { Row , Col} from "reactstrap"
import './operator.css'


const Operator = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => {
        return state.user.data
    })

    useEffect(()=>{
        dispatch(startGetUser())
    }, [])

    const [operatorName, setOperatorName] = useState('')
    const [city, setCity] = useState('')
    const [mobile, setMobile] = useState('')
    const [state, setState] = useState('')
    const [formErrors, setFormErrors] = useState([])
    const [selectedUser, setSelectedUser] = useState('')
    const [userId, setUserId] = useState('')

    const errors = {}

    function runValidation() {
        if (operatorName.trim().length === 0) {
            errors.operatorName = " operator name is required"
        }
        if (mobile.trim().length === 0) {
            errors.mobile = "mobile number is required"
        }else if(mobile.trim().length !== 10  ){
            errors.mobile = "invalid mobile Number"
        }
        if (state.length === 0) {
            errors.state = "state is required"
        }
        if (city.length === 0) {
            errors.city = "city is required"
        }
        setFormErrors(errors)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        runValidation()
        if (Object.keys(errors).length === 0) {
            const operatorData = {
                operatorName: operatorName,
                mobile: mobile,
                state: state,
                city: city,
                userId: userId,
            }
            dispatch(startAddOperator(operatorData))
        } else {
            setFormErrors(errors)
        }
    }

    const handleChange = (e) => { 
        let user = e.target.value
        setSelectedUser(user)
        setUserId(user)
    }

    useEffect(() => {
        if (selectedUser) {
            const selectedUserDetails = user.find((u) => u._id === selectedUser);
            if (selectedUserDetails) {
                setUserId(selectedUserDetails._id);
                setOperatorName(selectedUserDetails.username || '');
                setMobile(selectedUserDetails.mobile || '');
            }
        }
    }, [selectedUser, user]);

    return (
        <div>
            <Row className="dth">
                <Col>
            <form onSubmit={handleSubmit} style ={{textAlign :'centre' , fontWeight: 'bold' }} className="operator">
                <h2>Add Operator</h2><br/>

                <label className="dropdown">Select User</label>
                <br />
                <select value={selectedUser} onChange={handleChange}>
                <option value="" >Select a user...</option>
                {user.map((user) => (
                  <option key={user.id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select><br/>
              <br />
                <label>Enter Operator Name</label><br />
                <input
                    type="text"
                    placeholder="operatorName"
                    value={operatorName}
                    id="operatorName"
                    onChange={(e) => {
                        setOperatorName(e.target.value)
                    }}
                    disabled />
                {formErrors.operatorName && formErrors.operatorName}<br />
                <br />

                <label>Enter Mobile</label><br />
                <input
                    type="text"
                    placeholder="mobile"
                    value={mobile}
                    id="mobile"
                    onChange={(e) => {
                        setMobile(e.target.value)
                    }} 
                    disabled/>
                {formErrors.mobile && formErrors.mobile}<br />
                <br />

                <label>Enter city</label><br />
                <input
                    type="text"
                    placeholder="city"
                    value={city}
                    id="city"
                    onChange={(e) => {
                        setCity(e.target.value)
                    }} /> {formErrors.city && formErrors.city}
                <br />
                <br />
                <label>Enter State </label><br />
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    id="State"
                    onChange={(e) => {
                        setState(e.target.value)
                    }} />
                {formErrors.state && formErrors.state}
                <br />
                
                <br />
                <input type="submit" value="operator" />
            </form>
            </Col>
            </Row>
        </div>
    )
}


export default Operator