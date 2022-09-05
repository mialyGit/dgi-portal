export default {
    items: [
        {
            id: 'navigation',
            title: 'Utilisateur',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Consultation',
                    type: 'item',
                    url: '/_apps/ift-ifpb/consultation',
                    icon: 'feather icon-box',
                },
                {
                    id: 'bootstrap',
                    title: 'Saisie',
                    type: 'item',
                    icon: 'feather icon-users',
                    url: '/_apps/ift-ifpb/saisie'
                },
                {
                    id: 'privilege',
                    title: 'Autre',
                    type: 'item',
                    icon: 'feather icon-shield',
                    url: '/_apps/ift-ifpb/autre'
                },
            ]
        },
        {
            id: 'ui-element',
            title: 'Utilisateur',
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