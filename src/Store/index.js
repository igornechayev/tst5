
import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

const url = 'https://api.openrates.io/latest'


export default new Vuex.Store({

  state: {
    availableRates: [],
    baseRate: 'RUB',
    baseCount: 5,
    relativeRates: [],
  },


  mutations: {
    setBaseCount: function( state, val ) {
      const v = parseInt( val )
      // // eslint-disable-next-line no-debugger
      // debugger
      state.baseCount = isNaN( v ) ? 1 : v
    },
    setBaseRate: function( state, val ) {
      state.baseRate = val
    },
  },


  actions: {
    fetchRates( { state } ) {
      fetch(url).then( resp => {
        return resp.json()
      })
        .then( resp => {
          if ( resp && resp.rates ) {
            state.availableRates = Object.keys(resp.rates)
            // state.baseRate = 'RUB'
          }
        })
    },
    fetchRelativeRates( { state } ) {
      const base =  state.baseRate

      fetch(url + `?base=${base}`).then( resp => {
        return resp.json()
      })
        .then( resp => {
          if ( resp && resp.rates ) {
            const arr = []
            Object.keys( resp.rates ).forEach(key => {
              arr.push( { code: key, factor: resp.rates[ key ] } )
            })
            state.relativeRates = arr
          }
        })
    },

    updateBaseRate( { commit, dispatch  }, code ) {
      commit('setBaseRate', code )
      dispatch( 'fetchRelativeRates' )
    },
  },


} )
