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
                    url: '/contribuables/apps',
                    icon: 'feather icon-box',
                },
                {
                    id: 'privilège',
                    title: 'Mes privilèges',
                    type: 'item',
                    url: '/contribuables/mesprivileges',
                    icon: 'feather icon-shield',
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