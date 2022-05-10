
import { Notify, LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false,
  language: 'es',
  userAdmin: false,
  userEmail: null

}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setlanguage(state, value) {
    state.language = value
  },
  setUserAdmin(state, value){
    state.userAdmin = value
  },
  setUserEmail(state, value){
    state.userEmail = value
  }
}

var idioma = LocalStorage.getKey(idioma)

const actions = {
  registerUser({ }, payload) {
    Loading.show({ spinnerColor: 'blue' })
    var msg = (state.language == 'es')
    ? 'Se le ha enviado un email de verificacion.'
    : (this.language == 'en') ?  'A verification e-mail has been sent to you.'
    : "Um e-mail de verificação foi enviado para você."

    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        firebaseAuth.currentUser.sendEmailVerification()
        Notify.create({
          message: msg,
          icon: 'email',
          position: 'top'
        })
      })
      .catch(error => {
        var msg = (state.language == 'es')
        ? 'Este correo ya esta registrado'
        : (this.language == 'en')
        ?  'This account it´s already signed up'
        : 'Esta conta já está inscrita'
        showErrorMessage(msg)
      })
    firebaseAuth.currentUser.sendEmailVerification()
  },

  loginUser({ }, payload) {

    Loading.show({ spinnerColor: 'blue' })
    var msg = (state.language == 'es')
    ? 'El usuario y/o contraseña son incorrectos.'
    : (this.language == 'en') ?  'The user and/or the password are wrong'
    : 'O usuário e / ou a senha estão errados'
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        showErrorMessage(msg)
      })
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  resetPassword({ }, payload) {
    Loading.show({ spinnerColor: 'blue' })
    var msg = (state.language == 'es')
    ? 'Se le ha enviado un correo para reestablecer la contraseña'
    : (this.language == 'en') ? 'An email has been sent to you to restablace your password'
    : 'Um e-mail foi enviado a você para restabelecer sua senha'
    firebaseAuth
      .sendPasswordResetEmail(payload)
      .then(() => {
        Loading.hide()
        Notify.create({
          message: msg,
          type: 'warning',
          icon: 'privacy_tip',
          position: 'top',
        })
        this.$router.push('/login')

      })
      .catch(error => {
        showErrorMessage(console.log(error))
      })
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setUserAdmin', firebaseAuth.currentUser.email == "andres.coronado16@gmail.com")
        commit('setUserEmail', firebaseAuth.currentUser.email)
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(error => { })

      } else {
        commit('setUserAdmin', false)
        //LocalStorage.set('userAdmin', false )
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/login').catch(err => { })
      }
    })
  },
  updateLanguage({ commit },lang) {
    commit('setlanguage', lang)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
