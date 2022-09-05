import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const UserApp = React.lazy(() => import('./components/Utilisateur/Application'));

const App = React.lazy(() => import('./components/Administrateur/Application'));
const AddApp = React.lazy(() => import('./components/Administrateur/Application/add'));
const EditApp = React.lazy(() => import('./components/Administrateur/Application/edit'));

const Privilege = React.lazy(() => import('./components/Administrateur/Privilege/add'));

const Utilisateur = React.lazy(() => import('./components/Administrateur/Utilisateur'));
const AddUser = React.lazy(() => import('./components/Administrateur/Utilisateur/add'));
const DetailsUser = React.lazy(() => import('./components/Administrateur/Utilisateur/details'));

const Profile = React.lazy(() => import('./components/Profile'));
const SignOut = React.lazy(() => import('./components/Authentication/SignOut'));

const routes = [
    { path: '/apps', exact: true, name: 'Application', component: App },
    { path: '/_apps/:name', exact: true, name: 'Application', component: UserApp },
    { path: '/_apps/:name/:method', exact: true, name: 'Application', component: UserApp },
    { path: '/apps/new', name: 'Nouvelle Application', component: AddApp },
    { path: '/apps/edit', name: 'Editer Application', component: EditApp },

    { path: '/privileges', exact: true, name: 'Privilège', component: Privilege },

    { path: '/users', exact: true, name: 'Utilisateur', component: Utilisateur },
    { path: '/users/new', name: 'Ajouter utilisateur', component: AddUser },
    { path: '/users/details', name: 'Information utilisateur', component: DetailsUser },
    
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/logout', exact: true, name: 'Déconnexion', component: SignOut },
];

export default routes;