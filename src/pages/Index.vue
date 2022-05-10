<template>
  <div class="q-pa-md">
<p>{{$t('index.main_page')}}</p></div>
</template>

<script>
export default {
  //name: 'PageIndex'
  data() {
    return {
      slide: 1,
    };
  },
  methods:{

  }
};
</script>
<style scoped>
p span {
  color: black;
}
.bg {
  background: red !important;
}
.text-body2 span {
  font-size: 0.8em;
}
.Imgsize {
  width: 8;
}
.text1 {
  color: #8b4300;
  font-size: 40px;
}
.text2 {
  color: #000000;
  font-size: 20px;
}

.text3 {
  color: #14a348;
  font-size: 40px;
}
.img-src {
  width: 12em;
}
</style>
