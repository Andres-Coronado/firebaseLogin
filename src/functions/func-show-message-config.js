import { Notify } from 'quasar'

export function showMessageDelete (msg) {
    Notify.create({
        message: msg,
        type: 'positive',
        icon: 'info',
        position: 'top',
        timeout: 500

  
  })
}

export function showMessageAct (msg) {
    Notify.create({
        message: msg,
        type: 'positive',
        icon: 'info',
        position: 'top',
        timeout: 500

  })
}

export function showMessageConfirm (msg) {
    Notify.create({
        message: msg,
        color: 'red-5',
          textColor: 'white',
          icon: 'warning',
        position: 'top',
        timeout: 500

  })
}
