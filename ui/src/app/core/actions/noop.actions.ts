import { createAction } from '@ngrx/store';

export const noop = createAction(
    '[Noop] Don\'t Do Anything',
);
