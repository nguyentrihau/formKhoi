/* eslint-disable no-fallthrough */
const stateDefault = {
  arrUser: [
    {
      id: "111",
      name: "abc",
      phone: "0000",
      email: "hoa@gm.co",
    },
  ],

  editUser: {
    id: "",
    name: "",
    phone: "",
    email: "",
  },
};

export const userReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "ADD_USER": {
    }

    case "DELETE_USER": {
      let newState = { ...state };
      newState.arrUser = action.payload;
      return { ...newState };
    }

    case "EDIT_USER": {
      let newState = { ...state };
      newState.editUser = action.payload;
      return { ...newState };
    }

    case "UPDATE_USER": {
      let newState = [...state.arrUser];
      // let { arrUser } = newState;
      let index = newState.findIndex((user) => user.id === action.payload.id);
      // newState[index] = { ...action.payload };
      if(index !== -1){
        newState.splice(index, 1);
        console.log(newState);
        // newState.push(action.payload)
      }

      // console.log(arrUser);
      return { ...state,arrUser:newState };
    }

    default:
      return state;
  }
};
