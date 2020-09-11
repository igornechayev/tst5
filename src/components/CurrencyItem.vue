<template>
  <li class="currencyItem">
    <article>
      <h2><b>{{ baseCount }}</b> {{ baseRate }} =</h2>
      <p>
        <b>{{ multiplied }}</b> <i>{{ item.code }}</i>
      </p>
    </article>
  </li>
</template>


<script>
export default {

  props: [ 'item' ],

  data() {
    return {
    }
  },

  computed: {
    baseRate: function() { return this.$store.state.baseRate },
    baseCount: function() { return this.$store.state.baseCount },
    multiplied: function() { return (this.baseCount * this.item.factor).toFixed( 2 ) }
  }

}
</script>


<style scoped lang="scss">

.currencyItem {
  box-shadow: 0 3px 6px rgba(157,157,157, 0.36);
  background: #fff;
  border-radius: 12px;
  width: calc(50% - 30px);
  min-width: calc(50% - 30px);
  padding: 15px 30px;
  margin-bottom: 20px;
  margin-left: 20px;
  &:nth-child(2n) {
    margin-right: 20px;
  }
  //&:not(:last-child) {
  //  margin-right: 25px;
  //}
}


@media screen and (max-width: 780px) {
  .currencyItem {
    $w:calc(100% - 40px);
    width: $w;
    min-width: $w;
    &:nth-child(1n) {
      margin-right: 20px;
    }
  }
}

h2 {
  font-size: 24px;
  font-weight: 300;
  color: #b9b9b9;


  b {
    font-weight: normal;
    color: #2b2d33;

  }

}


p {
  margin-bottom: 0;
  b {
    font-weight: 300;
    font-size: 48px;
  }
  i {
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    display: inline-block;

  }
}

</style>

