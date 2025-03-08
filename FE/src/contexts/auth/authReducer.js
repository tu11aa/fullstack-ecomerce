export const AUTH_ACTIONS = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',

  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',

  RESET: 'RESET',
};

export const initialAuthState = {
  user: null,
  isLoading: true,
  error: null,
  message: '',
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.START:
      return {
        ...state,
        isLoading: true,
        error: null,
        message: action.payload || '',
      };
    case AUTH_ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: action.payload || '',
      };
    case AUTH_ACTIONS.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: '',
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
      };

    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return {
        ...initialAuthState,
        isLoading: false,
        message: action.payload,
      };

    case AUTH_ACTIONS.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case AUTH_ACTIONS.RESET:
      return {
        ...initialAuthState,
        isLoading: false,
        user: state.user,
      };
    default:
      return state;
  }
};
