<template>
<div>
  <div>
    [{{title}}]
    {{price[base]}}&nbsp;~
    {{compare}}&nbsp;{{price[compare]}}&nbsp;
    <a :href="buyWithUsdc()" target="_blank" class="div_ju">{{showDiv(compare)}}%</a>
    &nbsp;&nbsp;{{showFee(compare)}}&nbsp;{{comment[compare]}}
  </div>
</div>
</template>

<script>

export default {
  data () {
    return {
      symbolName: {
        atom: 'Atom', osmo: 'Osmo', wbtc: 'Btc', eth: 'Eth', dydx: 'Dydx',
      },
      feeData: {
        atom: {osm: 0.002, cex: 0.0001},
        osmo: {osm: 0.0015, cex: 0.001},
        wbtc: {osm: 0.001, pan: 0.003, cex: 0.001},
        eth: {osm: 0.0015, cex: 0.001},
        dydx: {osm: 0.005, cex: 0.0001},
      },
      commentData: {
        atom: {osm: '', cex: ''},
        osmo: {osm: '', cex: ''},
        wbtc: {osm: '', pan: '', cex: ''},
        eth: {osm: '', cex: ''},
        dydx: {osm: '', cex: ''},
      },
    }
  },
  props: ['symbol', 'priceData', 'base', 'compare'],
  created: function() {
    if(!process.isClient){
      return
    }
  },
  methods: {
    buyWithUsdc() {
      return "https://app.osmosis.zone/?from=USDC&to=" + this.symbol
    },
    calDiv(a, b, fee, isJunoswap) {
      let result = a / b - 1
      let feeFix = (result > 0) ? (fee * -1) : fee
      let resultFix = result + feeFix
      if(result * resultFix > 0) {  // both positive or both negative
        return Math.round(resultFix * 10000) / 100
      } else {
        return 0        
      }
    },
    getDiv(sDex, sDex2) {
      let base = this.price[sDex2]
      let compare = this.price[sDex]
      let fee = this.calFee(sDex, sDex2)
      return this.calDiv(compare, base, fee)
    },
    showDiv(sDex) {
      return (this.base == sDex) ? '--' : this.getDiv(sDex, this.base)
    },
    calFee(sDex, sDex2) {
      return (this.fee[sDex2] + this.fee[sDex])
    },
    showFee(sDex) {
      return (this.base == sDex) ? '--' : Math.round(this.calFee(sDex, this.base) * 10000) / 100
    },
  },
  computed: {
    symbol_low() {
      return this.symbol.toLowerCase()
    },
    price() {
      return this.priceData[this.symbol_low]
    },
    fee() {
      return this.feeData[this.symbol_low]
    },
    comment() {
      return this.commentData[this.symbol_low]
    },
    title() {
      return this.symbolName[this.symbol_low]
    },
  },
}
  
</script>
