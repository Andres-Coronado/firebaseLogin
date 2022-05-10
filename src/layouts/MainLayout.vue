  <template>
  <q-layout view="lHh Lpr lFf">
    <!-- esto es sirve  para cambiar el color en caso de que userAdmin sea true  -->
    <q-header v-bind:class="[userAdmin ? isAdmin : '', isNotAdmin]"  elevated>
      <q-toolbar v-if="loggedIn">
        <q-btn
        v-if="loggedIn"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
        <div class="logo"></div>
        <q-toolbar-title>Auth-wt-firebase</q-toolbar-title>




        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
    v-if="loggedIn"
      side="left"
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      content-class="navs-color"
      :width="220"
    >
      <!-- <p>soy el cambio</p> {{ $t('menu_desplegable.inicio') }} -->

      <q-list bordered separator>

        <q-item v-if="userAdmin" class="bgHeaderAdmin" >
          <q-item-section v-if="userAdmin" avatar >
            <q-icon name='admin_panel_settings' />
          </q-item-section>
            <q-item-section>{{ $t('menu_desplegable.logeado_admin') }}</q-item-section>
        </q-item>




        <!-- <q-list bordered separator> -->
        <q-item class="text-grey-2" exact clickable v-ripple to="/" >
          <q-item-section avatar>
            <q-icon name='home' />
          </q-item-section>
          <q-item-section>{{ $t('menu_desplegable.inicio') }}</q-item-section>
        </q-item>

        <q-item class="text-grey-2" v-if="!loggedIn" to="/login" type="submit">
          <q-item-section avatar>
            <q-icon name='login' />
          </q-item-section>
          <q-item-section>{{ $t('menu_desplegable.btn_login') }}</q-item-section>
        </q-item>

        <q-item class="text-grey-2" exact clickable @click="logoutUser" >
          <q-item-section avatar>
            <q-icon name='logout' />
          </q-item-section>
          <q-item-section>{{ $t('menu_desplegable.btn_logout') }}</q-item-section>
        </q-item>


      </q-list>

    <q-list class="absolute-bottom" >


      <!-- <q-select          v-model="lang"
        :options="langOptions"
        dense
        borderless
        emit-value
        map-options
        options-dense>
      </q-select> -->
      <Idioma/>
    </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { openURL, LocalStorage} from "quasar";
import Idioma from 'src/components/Idioma.vue'
export default {
  name: "MyLayout",
  components:{Idioma},
  data() {
    return {
      isAdmin: "bgHeaderAdmin",
      isNotAdmin: "bgHeader",
      rightDrawerOpen: false,
      lang: this.$i18n.locale,
      langOptions: [
        { value: "es", label: "Español", icon: "home" },
        { value: "en", label: "English", icon: "home" },
      ]
    };
  },
  computed: {
    ...mapState("auth",{loggedIn: state => state.loggedIn, userAdmin: state => state.userAdmin}),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    openURL,
  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang;
    },
  },
  created(){
    var cartSession = LocalStorage.getItem("cart");
    if(cartSession == undefined){
      LocalStorage.set("cart", []);
    };
  }
};
</script>

<style>
.text-grey-2 {
  color: black !important;
}
.bgHeader {
  color: rgb(7, 6, 6) !important;
  background: #ececec;
}
.bgHeaderAdmin {
  color: rgb(7, 5, 5) !important;
  background: #13b61b;
}
</style>
