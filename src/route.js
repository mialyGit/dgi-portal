import React from 'react';

const SignUp = React.lazy(() => import('./components/Authentication/SignUp'));
const Signin = React.lazy(() => import('./components/Authentication/SignIn'));
const Activation = React.lazy(() => import('./components/Authentication/Activation'));
const ResetPassword = React.lazy(() => import('./components/Authentication/ResetPassword'));

const route = [
    { path: '/', exact: true, name: 'Signin', component: Signin },
    { path: '/activation', exact: true, name: 'Activation', component: Activation },
    { path: '/sign-up', exact: true, name: 'Signup', component: SignUp },
    { path: '/reset-password', exact: true, name: 'Reset Password', component: ResetPassword }
];

export default route;