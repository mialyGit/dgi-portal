import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Application = React.lazy(() => import('./components/Application'));
const AddApp = React.lazy(() => import('./components/Application/add'));
const EditApp = React.lazy(() => import('./components/Application/edit'));
const Utilisateur = React.lazy(() => import('./components/Utilisateur'));
const AddUser = React.lazy(() => import('./components/Utilisateur/add'));
const Profile = React.lazy(() => import('./components/Profile'));
const SignOut = React.lazy(() => import('./components/Authentication/SignOut'));

const routes = [
    { path: '/apps', exact: true, name: 'Application', component: Application },
    { path: '/apps/new', name: 'Nouvelle Application', component: AddApp },
    { path: '/apps/edit', name: 'Editer Application', component: EditApp },

    { path: '/users', exact: true, name: 'Utilisateur', component: Utilisateur },
    { path: '/users/new', name: 'Ajouter utilisateur', component: AddUser },
    
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/logout', exact: true, name: 'Déconnexion', component: SignOut },
];

export default routes;