import axios from "../config/axios"

export const startGetUser = ()=>{
    return async (dispatch)=>{
        try{
            const response = await axios.get('/api/listAllUsers', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(response.data, "check11")

            dispatch(setUser(response.data))
        }catch(e){
            console.log(e, "check")
        }
    }
}

const setUser = (data)=>{
    return {
        type: 'SET_USER',
        payload: data
    }
}

export const startUpdateUser = (id, formData)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`/api/users/${id}`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(updateUser(response.data))
        }catch(e){
            console.log(e)
        }
        
    }
}

const updateUser = (data)=>{
    return {
        type: 'UPDATE_USER',
        payload: data
    }
}