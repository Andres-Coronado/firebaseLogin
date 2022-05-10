<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    dense
    borderless
    emit-value
    map-options
    class="style"
    options-dense
  >
    <template v-slot:append>
      <q-avatar  >
        <img v-if="lang =='es'"
          src="../assets/mxFlag.svg"
        />
        <img v-if="lang =='port'"
          src="../assets/brFlag.svg"
        />
        <img v-else
          src="../assets/usFlag.svg"
        />
      </q-avatar>
    </template>
  </q-select>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: "es", label: "Español" },
        { value: "en", label: "English" },
        { value: "port", label: "Portugues" },
      ],
    };
  },
  methods: {
    ...mapActions("auth", ["updateLanguage"]),
  },

  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
      this.updateLanguage(lang);
    },
    
  },
  
};
</script>
<style >
.style {
  width: 9em;
  margin-left: 4em;
  /* text-align: center; */
}
.img {
  width: 1em !important;
}
</style>