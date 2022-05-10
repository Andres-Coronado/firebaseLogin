<template>
  <!-- <q-page class="fixed-center		" > -->
  <q-card  class="my-card fixed-center text-dark">


    <q-card-section >
              <div class=" text-h2 flex flex-center ">               <img class="img-size  " src="../../public/logo.png"> </div>

      <form @submit.prevent="submitForm">
        <div  class="row q-mb-xs">
          <!-- <q-banner class="bg-grey-3 col">
            <template v-slot:avatar>
              <q-icon name="account_circle"  />
            </template>
          </q-banner> -->
        </div>

        <q-select borderless style="width:30%; margin-left:8em;" v-model="isAdmin" :options="options" />
        <div class="row q-mb-xs">
          <q-input
            v-model="formData.email"
            :rules="[
              (val) =>
                isValidEmailAddress(val) ||
                this.$t('Login.valid_email'),
            ]"
            ref="email"
            lazy-rules
            rounded outlined
            class="col"
            label="Email"
            stack-label
          />
        </div>
        <div class="row q-mb-xs">
          <q-input
            v-model="formData.password"
            :rules="[
              (val) =>
                val.length >= 6 || this.$t('Login.err_val'),
            ]"
            ref="password"
            lazy-rules
            type="password"
            rounded outlined
            class="col"
            label="Password"
            stack-label
          />
        </div>

        <div class="text-h6 flex flex-center ">    <q-btn class="felx flex-center" style="margin-right:1em" unelevated rounded color="green-10"  type="submit">{{ $t('Login.btn_inicio') }}</q-btn>  <q-btn class="felx flex-center" unelevated rounded color="blue-10"  type="submit" @click="sendToRegistro()">{{ $t('Login.link_registro') }}</q-btn></div>
        <div class="text-h9 flex flex-center ">
                <p style="margin-top:1em;" > <span @click="sendToResetPass()">{{$t('Login.link_contraseña')}}</span></p>
        </div>


      </form>
      <br>

            <div style="margin-top:3em; margin-right:2em;" class="text-h9 flex flex-center ">
               <Idioma/>

        </div>
    </q-card-section>

    <q-separator dark />
  </q-card>
  <!-- </q-page> -->


</template>

<script>
import { mapState, mapActions } from "vuex";
import Idioma from 'src/components/Idioma.vue'
import { showErrorMessage } from 'src/functions/function-show-error-message'
// import state from 'src/store/module-example/state';

export default {
    components:{Idioma},

  data() {
    return {
            isAdmin:'user',
            options: [
        { value: "user", label: "user" },
        { value: "admin", label: "admin" },
      ],
      formData: {
        email: "",
        password: "",

      },
      isBtnAdminPushed:false
    };
  },
  computed: {
    ...mapState("auth",{language: state => state.language}),
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser"]),
    isValidEmailAddress(email) {
      // eslint-disable-next-line no-useless-escape
      var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    submitForm() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError && this.isAdmin.value=="admin" &&this.formData.email == 'your-admin-email@gmail.com' ) {
            this.loginUser(this.formData);

      }
      else if(!this.$refs.email.hasError && !this.$refs.password.hasError && this.isAdmin.value=="admin") {
        if( this.formData.email !== 'your-admin-email@gmail.com' )
        {
          var msg = (this.language == 'es') ? 'No eres un usuario autorizado!': (this.language == 'en') ?  'You are not an authorized user!' : "Você não é um usuário autorizado!"
                  showErrorMessage(msg)
        this.$router.replace('/login')
                  this.formData.email =''
                  this.formData.password = ''
        }

      }else{
          this.loginUser(this.formData);
      }
    },
    sendToRegistro(){this.$router.push({path: '/registro'})},
      sendToResetPass(){this.$router.push({path: '/resetpass'})}

  }
};
</script>


<style  >

.my-card{
    background: rgb(255, 255, 255)!important;
    width: auto;
    min-width: 25em;
    border: 0px !important;
    box-shadow: 0 0px 0px rgb(0 0 0 / 20%) !important;

}

p span{
    color: blue;
}
</style>
