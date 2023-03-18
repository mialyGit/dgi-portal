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
const AppDetailsPersonnel = React.lazy(() => import('./components/Personnel/Application/details'));
const AppDetailsContribuable = React.lazy(() => import('./components/Contribuable/Application/details'));

const MesPrivilege = React.lazy(() => import('./components/Contribuable/Privilege'));

const PrivilegePersonnel = React.lazy(() => import('./components/Administrateur/Privilege/add'));
const PrivilegeContribuable = React.lazy(() => import('./components/Personnel/Privilege/add'));
const PrivilegeEditPersonnel = React.lazy(() => import('./components/Administrateur/Privilege/edit'));
const PrivilegeEditContribuable = React.lazy(() => import('./components/Personnel/Privilege/edit'));

const Personnel = React.lazy(() => import('./components/Administrateur/Personnel'));
const AddPersonnel = React.lazy(() => import('./components/Administrateur/Personnel/add'));
const DetailsPersonnel = React.lazy(() => import('./components/Administrateur/Personnel/details'));

const Demande = React.lazy(() => import('./components/Administrateur/Demande'));
const Historique = React.lazy(() => import('./components/Administrateur/Historique'));

const Contribuable = React.lazy(() => import('./components/Personnel/Contribuable'));
const AddContribuable = React.lazy(() => import('./components/Personnel/Contribuable/add'));
const DetailsContribuable = React.lazy(() => import('./components/Personnel/Contribuable/details'));

const Privilege = React.lazy(() => import('./components/Administrateur/Privilege'));
const Fonction = React.lazy(() => import('./components/Administrateur/Fonction'));
const Service = React.lazy(() => import('./components/Administrateur/Service'));
const Grade = React.lazy(() => import('./components/Administrateur/Grade'));

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
    { path: '/historiques', exact: true, name: 'Historique', component: Historique },
    { path: '/employes', exact: true, name: 'Personnel', component: Personnel },
    { path: '/employes/apps', exact: true, name: 'Application', component: AppPersonnel },
    { path: '/employes/apps/details', name: 'Application details', component: AppDetailsPersonnel },
    { path: '/employes/new', name: 'Ajouter utilisateur', component: AddPersonnel },
    { path: '/employes/details', name: 'Information utilisateur', component: DetailsPersonnel },
    { path: '/employes/privileges', exact: true, name: 'Privilège', component: PrivilegePersonnel },
    { path: '/employes/privileges/edit', name: 'Modifier privilège', component: PrivilegeEditPersonnel },

    { path: '/contribuables', exact: true, name: 'Contribuable', component: Contribuable },
    { path: '/contribuables/apps', exact: true, name: 'Application', component: AppContribuable },
    { path: '/contribuables/apps/details', name: 'Application details', component: AppDetailsContribuable },
    { path: '/contribuables/mesprivileges', name: 'Mes privileges', component: MesPrivilege },
    { path: '/contribuables/new', name: 'Ajouter un contribuable', component: AddContribuable },
    { path: '/contribuables/details', name: 'Information contribuable', component: DetailsContribuable },
    { path: '/contribuables/privileges', exact: true, name: 'Privilège', component: PrivilegeContribuable },
    { path: '/contribuables/privileges/edit', name: 'Modifier privilège', component: PrivilegeEditContribuable },
    

    { path: '/privileges', exact: true, name: 'Privilege', component: Privilege },
    { path: '/services', exact: true, name: 'Service', component: Service },
    { path: '/grades', exact: true, name: 'Grade', component: Grade },
    { path: '/fonctions', exact: true, name: 'Fonction', component: Fonction },

    { path: '/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/logout', exact: true, name: 'Déconnexion', component: SignOut },
];

export default routes;