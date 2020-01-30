import { Action, createReducer, on } from '@ngrx/store';
import { User } from '@core/models/user.model';
import { login, loginFromLocalStorage, loginFailed, loginSuccess, logout } from '@core/actions/auth.actions';

export interface State {
    hasFailedLogin: boolean;
    loggedInUser: User;
};

export const initialState: State = {
    hasFailedLogin: false,
    loggedInUser: null,
};

const LOCAL_STORAGE_KEY = 'loggin-in-user';

const authReducer = createReducer(
    initialState,
    on(login, state => ({ ...state, hasFailedLogin: false })),
    on(loginFromLocalStorage, state => {
        const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return userData
            ? { ...state, loggedInUser: JSON.parse(userData) }
            : state;
    }),
    on(loginFailed, state => ({ ...state, hasFailedLogin: true })),
    on(loginSuccess, (state, user) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
        return { ...state, loggedInUser: user };
    }),
    on(logout, () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return initialState;
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}

export const isLoggedIn = (state: State) => state.loggedInUser !== null;

export const getLoggedInUsername = (state: State) => state.loggedInUser ? state.loggedInUser.username : null;
export const getLoggedInUserId = (state: State) => state.loggedInUser ? state.loggedInUser._id : null;

export const hasFailedLogin = (state: State) => state.hasFailedLogin;
