<template>
  <div class="wrp" ref="wrp">
    <div class="inputWrp">
      <input type="text" v-model.number="baseCount">
      <span class="code">{{ baseRate }}</span>
    </div>

    <div class="rates" :style="{ marginLeft: (page * -100) + '%' }">

      <ul class="codesList">
        <template v-for="curr in relativeRates.top">
          <CurrencyItem :item="curr" :key="curr.code" />
        </template>
      </ul>

      <ul class="codesList">
        <template v-for="curr in relativeRates.bottom">
          <CurrencyItem :item="curr" :key="curr.code" />
        </template>
      </ul>

    </div>

    <div class="btns">
      <button :disabled="page === 0" @click="handlePrevClick">назад</button>
      <button :disabled="isOnMaxPage" @click="handleNextClick">далее</button>
    </div>

  </div>
</template>


<script>

import CurrencyItem from '@/components/CurrencyItem'

export default {


  data() {
    return {
      page: 0,
    }
  },

  mounted() {
    window.addEventListener('resize', this.handleWindowResize )
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize )
  },


  computed: {
    baseCount: {
      get() {
        return this.$store.state.baseCount
      },
      set( val ) {
        this.$store.commit( 'setBaseCount', val  )
      },

    },

    baseRate: function() { return this.$store.state.baseRate },


    relativeRates: function() {
      const top = []
      const bottom = []
      this.$store.state.relativeRates.forEach((it, ind) => {
        if ( ind % 2 === 0 ) {
          top.push(it)
        } else {
          bottom.push( it )
        }
      })
      return { top, bottom }
    },

    isOnMaxPage() {
      const { page } = this
      const docWidth = document.documentElement.getBoundingClientRect().width
      const itemsOnPage = docWidth > 780 ? 4 : 2
      // eslint-disable-next-line no-debugger
      // debugger
      return (page + 1) * itemsOnPage >= ( this.relativeRates.top.length + this.relativeRates.bottom.length )
    },
  },


  methods: {

    handlePrevClick: function() {
      if ( this.page === 0 ) return
      this.page--
    },

    handleNextClick: function() {
      this.page++
    },

    handleWindowResize() {
      this.page = 0
    }
  },


  components: {
    CurrencyItem,
  }
}
</script>


<style scoped lang="scss">
input, .code {
  box-shadow: none;
  border: 0;
  border-bottom: 1px solid #d9d9d9;
  color: #2b2d33;
  font-size: 18px;
  line-height: 21px;
  width: 121px;
  text-align: right;
  padding: 0 5px;
}
.inputWrp {
  display: flex;
  justify-content: flex-end;
  padding: 0 24px;
}
.code {
  width: auto;
  border: 0;
  color: #b9b9b9;
  line-height: 35px;
}
.codesList {
  list-style: none;
  padding: 0;
  display: flex;
  width: 100%;
  flex-flow: nowrap row;
  justify-content: flex-start;
  box-sizing: border-box;
}

.wrp {
  overflow: hidden;
  box-sizing: border-box;
}

.rates {
  //padding: 24px;
  width: 100%;
  box-sizing: border-box;
  transition: margin .3s;
  will-change: margin-left;
}

.btns {
  text-align: center;
  margin-bottom: 30px;
  button {
    background: #fff;
    border-radius: 8px;
    border: 0;
    color: #787878;
    font-size: 14px;
    padding: 10px 25px;
    text-transform: uppercase;
    box-shadow: 0 5px 6px rgba(157,157,157, 0.36);
    margin: 0 10px;
    cursor: pointer;

    &:disabled {
      background: #efefef;
    }
  }
}


</style>
