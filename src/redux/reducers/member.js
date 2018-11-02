const initialState = {
}

const member = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_MEMBER':
      return {
        ...action.user
      };

    case 'LOGOUT_MEMBER':
      return {
        ...action.user
      };

    default:
      return state
  }
};
export default member;