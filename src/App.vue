<template>
  <div id="app" class="app">
    <Header ref="header" />
    <Wrp />
  </div>
</template>

<script>

import store from './Store'

import Header from '@/components/Header'
import Wrp from '@/components/Wrp'


export default {
  name: 'App',
  store,

  mounted() {
    this.$store.dispatch( 'fetchRates' )
    this.$store.dispatch( 'fetchRelativeRates' )
  },


  computed: {
    availableRates: function () { return this.$store.state.availableRates },
    baseCount: function () { return this.$store.state.baseCount },
  },


  components: {
    Header,
    Wrp,
  }
}
</script>

<style>

body {
  font-family: 'Roboto', sans-serif;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
.app {
  max-width: 720px;
  background: #fff;

}


@media screen and (max-width: 780px) {
  .app {
    max-width: 320px;
  }
}

h1 {
  text-align: center;
}
</style>
