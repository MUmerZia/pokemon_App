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

            // state.favourateList= [] 
        },
        removeToFav:(state,actions)=>{  
            const newArray = state.favourateList.filter((item)=>{
                return   item.id != actions.payload
            })
            state.favourateList = newArray 

            // state.favourateList= [] 
        }
    }
})

export default addToFavSlice.reducer;

export  const  {addToFav,removeToFav} = addToFavSlice.actions;