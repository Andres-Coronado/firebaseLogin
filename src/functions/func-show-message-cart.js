import { Notify } from 'quasar'

export function showMessage (msg) {
    Notify.create({
        message: msg,
        type: 'positive',
        icon: 'add_shopping_cart ',
        position: 'top',
        timeout: 500

  
  })
}

export function showMessageInfo (msg) {
    Notify.create({
        message: msg,
        type: 'info',
        icon: 'info',
        position: 'top',
        timeout: 500

  })
}
