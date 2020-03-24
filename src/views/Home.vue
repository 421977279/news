<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ 符号就是指向src的，也就是src的别名
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return{}
  },
  methods:{},
  computed:{},
  watch:{},
  mounted:{},
  components: {
    HelloWorld
  }
}
</script>
