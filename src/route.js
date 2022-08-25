import React from 'react';

const SignUp = React.lazy(() => import('./components/Authentication/SignUp'));
const Signin = React.lazy(() => import('./components/Authentication/SignIn'));

const route = [
    { path: '/sign-up', exact: true, name: 'Signup', component: SignUp },
    { path: '/', exact: true, name: 'Signin', component: Signin }
];

export default route;