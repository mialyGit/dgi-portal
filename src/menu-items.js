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
                    title: 'Personnel',
                    type: 'item',
                    icon: 'feather icon-users',
                    url: '/personnels'
                },
                {
                    id: 'privilege',
                    title: 'Privilège',
                    type: 'item',
                    icon: 'feather icon-shield',
                    url: '/personnels/privileges'
                },
                {
                    id: 'demande',
                    title: 'Activation compte',
                    type: 'item',
                    icon: 'feather icon-unlock',
                    url: '/demandes'
                },
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