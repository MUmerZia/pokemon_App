import { createSlice } from '@reduxjs/toolkit'


const addToFavSlice = createSlice({
    name:'addToFav',
    initialState:{
        favourateList:[]
    },
    reducers:{
        addToFav:(state,actions)=>{ 
            let list = actions.payload 
            state.favourateList.push(list) 
        }
    }
})

export default addToFavSlice.reducer;

export  const  {addToFav} = addToFavSlice.actions;