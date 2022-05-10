<template>
  <!-- <q-page class="fixed-center		" > -->
  <q-card class="my-card fixed-center text-dark">
      <div class=" flex flex-center"><h4 style=" margin-top:2em;">{{ $t('Registro.crear_cuenta') }}</h4></div>
      <div class="text-subtitle2 flex flex-center ">{{ $t('Registro.registro') }} </div>

    <q-card-section>
      <form @submit.prevent="submitForm">
        <div  class="row q-mb-md">
          <!-- <q-banner class="bg-grey-3 col">
            <template v-slot:avatar>
              <q-icon name="account_circle"  />
            </template>
          </q-banner> -->

        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="formData.email"
            :rules="[
              (val) =>
                isValidEmailAddress(val) ||
                this.$t('Registro.valid_email'),
            ]"
            ref="email"
            rounded outlined
            class="col"
            label="Email"
            stack-label
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="formData.password"
            :rules="[
              (val) =>
                val.length >= 6 || this.$t('Registro.err_val'),
            ]"
            ref="password"
            type="password"
            rounded outlined
            class="col"
            label="Password"
            stack-label
          />
        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="formData.confirmPass"
            :rules="[
              (val) =>
                val ===this.formData.password || this.$t('Registro.confirm_pass'),
            ]"
            ref="password"
            type="password"
            rounded outlined
            class="col"
            label="Confirma Password"
            stack-label
          />
        </div>
        <div class="text-h6 flex flex-center ">    <q-btn class="felx flex-center" unelevated rounded color="green-10"  type="submit">{{ $t('Registro.btn_registro') }}</q-btn></div>

        <div class="text-h9 flex flex-center" style="margin-top:2em;">
        <p >{{ $t('Registro.si_cuenta') }}<span @click="sendToLogin()">  {{ $t('Registro.link_inicio') }}</span></p><br>
        </div>

      </form>
        <div style="margin-right:2em; margin-top:.5em;" class="text-h9 flex flex-center" >
           <Idioma/>

        </div>
    </q-card-section>

    <q-separator dark />
  </q-card>
  <!-- </q-page> -->


</template>

<script>
import { mapActions } from "vuex";
import Idioma from 'src/components/Idioma.vue'

export default {
  props: ["tab"],
    components:{Idioma},

  data() {
    return {
              expectedVal:this.$t('Login.err_val'),
      formData: {
        email: "",
        confirmPass: "",
        password: ""
      },
    };
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
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          this.registerUser(this.formData);
          this.$router.push({path: "/"})
      }
    },
  sendToLogin(){this.$router.push({path: '/login'})},
  sendToResetPass(){this.$router.push({path: '/resetpass'})}
  },
};
</script>


<style >

.my-card{
    background: rgb(255, 255, 255)!important;
    width: auto;
    min-width: 25em;
}
h4{
  color:green;
}

</style>
