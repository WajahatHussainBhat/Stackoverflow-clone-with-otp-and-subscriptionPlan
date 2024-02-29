const initialState = {
    darkMode: false,
  };
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case "DARK_MODE":
        return {
          ...state,
          darkMode: true,
        };
      case "LIGHT_MODE":
        return {
          ...state,
          darkMode: false, 
        };
      default:
        return state;
    }
  };

  export default themeReducer