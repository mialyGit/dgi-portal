import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const UserApp = React.lazy(() => import('./components/Utilisateur/Application'));

const App = React.lazy(() => import('./components/Administrateur/Application'));
const AddApp = React.lazy(() => import('./components/Administrateur/Application/add'));
const EditApp = React.lazy(() => import('./components/Administrateur/Application/edit'));
const AppPersonnel = React.lazy(() => import('./components/Personnel/Application'));
const AppContribuable = React.lazy(() => import('./components/Contribuable/Application'));

const PrivilegePersonnel = React.lazy(() => import('./components/Administrateur/Privilege/add'));
const PrivilegeContribuable = React.lazy(() => import('./components/Personnel/Privilege/add'));

const Personnel = React.lazy(() => import('./components/Administrateur/Personnel'));
const AddPersonnel = React.lazy(() => import('./components/Administrateur/Personnel/add'));
const DetailsPersonnel = React.lazy(() => import('./components/Administrateur/Personnel/details'));

const Demande = React.lazy(() => import('./components/Administrateur/Demande'));

const Contribuable = React.lazy(() => import('./components/Personnel/Contribuable'));
const AddContribuable = React.lazy(() => import('./components/Personnel/Contribuable/add'));
const DetailsContribuable = React.lazy(() => import('./components/Personnel/Contribuable/details'));

const Profile = React.lazy(() => import('./components/Profile'));
const SignOut = React.lazy(() => import('./components/Authentication/SignOut'));

const routes = [
    { path: '/apps', exact: true, name: 'Application', component: App },
    { path: '/_apps/:name', exact: true, name: 'Application', component: UserApp },
    { path: '/_apps/:name/:method', exact: true, name: 'Application', component: UserApp },
    { path: '/apps/new', name: 'Nouvelle Application', component: AddApp },
    { path: '/apps/edit', name: 'Editer Application', component: EditApp },

    /*{ path: '/users', exact: true, name: 'Utilisateur', component: Utilisateur },
    { path: '/users/new', name: 'Ajouter utilisateur', component: AddUser },
    { path: '/users/details', name: 'Information utilisateur', component: DetailsUser },*/

    { path: '/demandes', exact: true, name: 'Demande', component: Demande },
    { path: '/personnels', exact: true, name: 'Personnel', component: Personnel },
    { path: '/personnels/apps', name: 'Application', component: AppPersonnel },
    { path: '/personnels/new', name: 'Ajouter utilisateur', component: AddPersonnel },
    { path: '/personnels/details', name: 'Information utilisateur', component: DetailsPersonnel },
    { path: '/personnels/privileges', exact: true, name: 'Privilège', component: PrivilegePersonnel },

    { path: '/contribuables', exact: true, name: 'Contribuable', component: Contribuable },
    { path: '/contribuables/apps', name: 'Application', component: AppContribuable },
    { path: '/contribuables/new', name: 'Ajouter un contribuable', component: AddContribuable },
    { path: '/contribuables/details', name: 'Information contribuable', component: DetailsContribuable },
    { path: '/contribuables/privileges', exact: true, name: 'Privilège', component: PrivilegeContribuable },
    
    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/logout', exact: true, name: 'Déconnexion', component: SignOut },
];

export default routes;