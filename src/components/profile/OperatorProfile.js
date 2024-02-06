import { useState, useEffect, useContext } from "react";
import { OperatorContext } from "./operatorContext";
import { useDispatch } from "react-redux";
import { startUpdateUser } from "../../actions/user-action";
import { startEditOperator, startGetOperator } from "../../actions/operator-action";

export default function OperatorProfile(){
    const dispatch = useDispatch()

    const {userState, userDispatch} = useContext(OperatorContext)
    const [formData, setFormData] = useState({
        operatorName: userState.userDetails.username,
        mobile: userState.userDetails.mobile,
        state: userState.operator.state,
        city: userState.operator.city,
        oldPassword: '',
        newPassword: ''
    })

    useEffect(()=>{
        dispatch(startGetOperator())

    }, [dispatch])

    const userId = userState.userDetails._id
    const operatorId = userState.operator._id
    console.log(userId)

    const [formErrors, setFormErrors] = useState([]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            dispatch(startUpdateUser(userId, {
                "oldPassword": formData.oldPassword,
                "newPassword": formData.newPassword
            }))
            dispatch(startEditOperator(operatorId, {
                "mobile": formData.mobile
            }))
            setFormData({
                ...formData,
                oldPassword: "",
                newPassword: "",
              });
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        setFormData({
            operatorName: userState.userDetails.username,
            mobile: userState.userDetails.mobile,
            state: userState.operator.state,
            city: userState.operator.city,
            oldPassword: '',
            newPassword: ''
        });
    }, [userState])

    return(
        <div>
            {/* <h2>Account Details</h2>
            <p>username - {userState.userDetails.username}</p>
            <p>email - {userState.userDetails.email}</p>
            <p>mobile- {userState.userDetails.mobile}</p> */}

            {userState.userDetails.role === 'operator' && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>name</label>
                        <input type="text" value={formData.operatorName} name='operatorName' onChange={handleChange} disabled />
                        <br />

                        <label>mobile</label>
                        <input type="text" name='mobile' value={formData.mobile} onChange={handleChange} />
                        <br />

                        <label>city</label>
                        <input type='text' name='city' value={formData.city} onChange={handleChange} disabled/>
                        <br />

                        <label>state</label>
                        <input type='text' name='state' value={formData.state} onChange={handleChange} disabled/>
                        <br />

                        <label>old password</label>
                        <input type='password' name='oldPassword' value={formData.oldPassword} onChange={handleChange} />
                        <br />

                        <label>new password</label>
                        <input type='password' name='newPassword' value={formData.newPassword} onChange={handleChange} />
                        <br />

                        <input type='submit' />
                    </form>
                </div>
            )}
          
        </div>
    )

}