<template>
  <header ref="header">
    <h1>Курс {{ baseRate }} сегодня</h1>

    <div class="codeHeaderWrp" @wheel="handleScroll">
      <button class="prev" v-if="headerScrolled > 0"></button>
      <ul
          class="codesHeader"
          ref="codesHeader"
          @click="handleCodesHeaderClick"
      >
        <li
            v-for="code in availableRates"
            :key="code"
            :class="{ [`code_${code}`]: true, active: code === baseRate }"
            :data-code="code"
        >
          <span>{{ code }}</span>
        </li>
      </ul>
      <button v-if="!headerScrolledMax" class="next"></button>
    </div>

  </header>
</template>


<script>

export default {

  data() {
    return {
      headerScrolled: 0,
      headerScrolledMax: false,
    }
  },

  watch: {
    baseRate: function() {
      this.scrollIntoBaseRate()
    },

    availableRates: function() {
      this.$nextTick(() => {
        this.scrollIntoBaseRate()
      })

    },
  },

  mounted() {
    this.$refs.header.scrollTop = 0
    // setTimeout(() => {
    //   this.scrollIntoBaseRate()
    // }, 300)

  },


  computed: {
    baseRate: function() { return this.$store.state.baseRate },
    availableRates: function() { return this.$store.state.availableRates }

    // baseCount: function() { return this.$store.state.baseCount },
  },



  methods: {
    handleCodesHeaderClick( ev ) {
      const { code } = ev.target.dataset
      if ( typeof code !== 'string' || code.length !== 3 ) return

      this.$store.dispatch('updateBaseRate', code )

    },

    scrollIntoBaseRate() {

      const codesHeader = this.$refs.codesHeader
      if ( !codesHeader ) return
      const li = codesHeader.querySelector(`.code_${this.baseRate}`)
      if ( !li ) return
      li.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })

      this.handleScroll()

    },
    handleScroll() {
      const codesHeader = this.$refs.codesHeader
      if ( !codesHeader ) return

      setTimeout(() => {
        this.headerScrolled = codesHeader.scrollLeft
        this.headerScrolledMax = ( codesHeader.scrollWidth - codesHeader.getBoundingClientRect().width ) === codesHeader.scrollLeft
      },100)
    }
  },
}
</script>


<style scoped lang="scss">
header {
  height: 111px;
  background: #ffe782;
  padding: 10px 25px 0;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  overflow: hidden;
}


.codesHeader {
  display: flex;
  flex-flow: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

h1 {
  text-align: left;
  font-size: 21px;
  font-weight: normal;
}


ul {
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 100px;
}

li {
  width: 90px;
  min-width: 90px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;


  span {
    color: #ccae68;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    display: inline-block;
    margin-bottom: 5px;
    pointer-events: none;

  }
  &.active {
    background: #fff;
    span {
      color: #000;
    }

  }

}

.prev, .next {
  box-shadow: none;
  pointer-events: none;
  border: 0;
  background: #ffe782 center no-repeat;
  position: absolute;
  width: 20px;
  height: 30px;
  top: 5px;
}

.prev {
  background-image: url(../assets/chevron-left.png);
  left: 0px;
}
.next {
  background-image: url(../assets/chevron-right.png);
  right: 0px;
}

.codeHeaderWrp {
  position: relative;
  padding-right: 30px;
  //padding: 0 30px;

}

</style>
