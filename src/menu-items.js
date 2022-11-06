export default {
    items: [
        {
            id: 'navigation',
            title: 'Administrateur',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Application',
                    type: 'item',
                    url: '/apps',
                    icon: 'feather icon-box',
                },
                /*{
                    id: 'bootstrap',
                    title: 'Utilisateur',
                    type: 'item',
                    icon: 'feather icon-users',
                    url: '/users'
                },*/
                {
                    id: 'pers',
                    title: 'Employé',
                    type: 'item',
                    icon: 'feather icon-users',
                    url: '/employes'
                },
                {
                    id: 'privilege',
                    title: 'Privilège',
                    type: 'item',
                    icon: 'feather icon-shield',
                    url: '/employes/privileges'
                },
                {
                    id: 'demande',
                    title: 'Activation compte',
                    type: 'item',
                    icon: 'feather icon-unlock',
                    url: '/demandes'
                },
                {
                    id: 'historique',
                    title: 'Historique',
                    type: 'item',
                    icon: 'feather icon-clock',
                    url: '/historiques'
                },
                {
                    id: 'basic',
                    title: 'Autres',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'privilege',
                            title: 'Privilège',
                            type: 'item',
                            url: '/privileges'
                        },
                        {
                            id: 'fonction',
                            title: 'Fonction',
                            type: 'item',
                            url: '/fonctions'
                        },
                        {
                            id: 'grade',
                            title: 'Grade',
                            type: 'item',
                            url: '/grades'
                        },
                        {
                            id: 'service',
                            title: 'Service',
                            type: 'item',
                            url: '/services'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-element',
            title: 'Compte',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'form-basic',
                    title: 'Mon profile',
                    type: 'item',
                    url: '/profile',
                    icon: 'feather icon-home'
                },
                {
                    id: 'disabled-menu',
                    title: 'Déconnexion',
                    type: 'item',
                    url: '/logout',
                    classes: 'nav-item',
                    icon: 'feather icon-power'
                },
            ]
        }
    ]
}