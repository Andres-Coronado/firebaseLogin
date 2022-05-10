import {
    LocalStorage
} from 'quasar'

export default ({
    router
}) => {
    router.beforeEach((to, from, next) => {
        const loggedIn = LocalStorage.getItem('loggedIn')
        let authPath = ['/login','/resetpass','/registro']

        if (!loggedIn &&  authPath.includes(to.path) ) {
            // next('/login')
            switch (to.path) {
                case to.path ==='/login':
                    next('/login')
                    break;
                case to.path === '/resetpass':
                    next('/resetpass')
                    break;
                case to.path === '/registro':
                    next('/registro')
                    break;
                default:
                    next()

                    break;
            }
        } else {
            next()
        }


    })
}
