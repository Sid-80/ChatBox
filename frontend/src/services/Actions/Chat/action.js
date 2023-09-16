// export const AddUser= (user) => {
//     return {
//       type: "ADD_USER",
//       payload:{...user},
//     };
//   };
  

export const AddUser= (user,users) => {

  return async (dispatch,getState)=>{

    const present=users.find((data)=>data._id===user._id);    
    if(present!==undefined)
    {
      console.log("Yes it is present so don't make an http request");
      dispatch({type:"SKIP"})
    }
    else{

      const info={userId:user._id};
      const cookie=localStorage.getItem('jwt');
      const response=await fetch(`http://127.0.0.1:4000/api/v1/chat/`,{
        method:'post',
        headers:{
          'Content-type':'application/json',
          'Authorization':`Bearer ${cookie}`
        },
        body:JSON.stringify(info)
      })
      const data=await response.json();
      
      dispatch({
        type : 'ADD_USER',
        payload : {...data}
      });
    }
}
};

export const InitializeChat=(chats)=>{
  return {
    type:"INIT_CHATS",
    payload:[...chats]
  }
}

