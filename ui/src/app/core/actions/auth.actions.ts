import { createAction, props } from '@ngrx/store';
import { User } from '@core/models/user.model';

export const login = createAction(
    '[Auth] Login',
    props<{ username: string; password: string }>(),
);

export const loginFromLocalStorage = createAction(
    '[Auth] Login From Local Storage',
);

export const loginFailed = createAction(
    '[Auth] Login Failed',
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<User>(),
);

export const logout = createAction(
    '[Auth] Logout',
);
