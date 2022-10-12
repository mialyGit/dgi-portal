export default {
    items: [
        {
            id: 'navigation',
            title: 'Menu',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Application',
                    type: 'item',
                    url: '/personnels/apps',
                    icon: 'feather icon-box',
                },
                {
                    id: 'bootstrap',
                    title: 'Contribuables',
                    type: 'item',
                    icon: 'feather icon-users',
                    url: '/contribuables'
                },
                {
                    id: 'privilege',
                    title: 'Privilège',
                    type: 'item',
                    icon: 'feather icon-shield',
                    url: '/contribuables/privileges'
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