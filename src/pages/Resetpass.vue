<template>
  <!-- <q-page class="fixed-center		" > -->
  <q-card class="my-card fixed-center text-dark">
    <q-card-section class="">
      <div class="text-h6 flex flex-center ">{{ $t("Resetpass.titulo") }}</div>
      <!-- <div class="text-subtitle2 flex flex-center ">Iniciar Sesion</div> -->
      <div class=" text-h2 flex flex-center ">
        <q-icon name="verified_user" />
      </div>
      <br />
      <br />
      <br />
      <br />
    </q-card-section>

    <q-card-section>
      <form @submit.prevent="submitForm">
        <div class="text-h9 flex flex-center ">
          <p style="text-align:center;">{{ $t("Resetpass.texto_1") }}</p>
        </div>
        <div class="row q-mb-md">
          <q-input
            v-model="formData.email"
            :rules="[
              val =>
                isValidEmailAddress(val) || this.$t('Resetpass.valid_email')
            ]"
            ref="email"
            lazy-rules
            rounded
            outlined
            class="col"
            label="Email"
            stack-label
          />
        </div>

        <div class="text-h9 flex flex-center "></div>
        <div class="text-h6 flex flex-center ">
          <q-btn
            class="felx flex-center"
            unelevated
            rounded
            color="green-10"
            type="submit"
            >{{ $t("Resetpass.btn_contraseña") }}</q-btn
          >
        </div>
      </form>
    </q-card-section>

    <q-separator dark />
  </q-card>
  <!-- </q-page> -->
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import Idioma from "src/components/Idioma.vue";

export default {
  components: { Idioma },
  data() {
    return {
      formData: {
        email: ""
      }
    };
  },

  computed: {
    ...mapState("auth", { language: state => state.language })
  },

  methods: {
    ...mapActions("auth", ["registerUser", "loginUser", "resetPassword"]),
    isValidEmailAddress(email) {
      email = email.trim();
      // eslint-disable-next-line no-useless-escape
      var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    submitForm() {
      this.formData.email = this.formData.email.trim();
      this.$refs.email.validate();
      if (!this.$refs.email.hasError) {
        var auth = firebaseAuth
          .signInWithEmailAndPassword(this.formData.email, "PRUEBA1234")
          .then(response => {})
          .catch(error => {
            if (error.code != "auth/user-not-found") {
              this.resetPassword(this.formData.email);
            } else {
              var msg =
                this.language == "es"
                  ? "Este usuario no existe"
                  : this.language == "en"
                  ? "This user does not exist"
                  : "Esse usuário não existe";
              showErrorMessage(msg);
            }
          });
      }

      //   firebaseAuth.sendPasswordResetEmail(this.formData.email)
    }
  }
};
</script>

<style>
.my-card {
  background: rgb(255, 255, 255) !important;
  width: auto;
  min-width: 25em;
}

p span {
  color: blue;
}
</style>
