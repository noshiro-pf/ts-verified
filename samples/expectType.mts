import { expectType } from 'ts-verified';

type User = { id: number; name: string };
type Admin = { id: number; name: string; role: 'admin' };

// Assert that Admin extends User
expectType<Admin, User>('<=');

// Assert that User does not extend Admin
expectType<User, Admin>('!<=');

// Assert exact type equality
expectType<{ x: number }, { x: number }>('=');

// The following would cause a compile-time error:
// expectType<User, Admin>("="); // Error: Type 'User' is not strictly equal to type 'Admin'.

expectType<User, any>('!='); // Error: Comparisons with `any` are also strictly checked.