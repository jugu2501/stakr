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
        atom: 'Atom', osmo: 'Osmo', juno: 'Juno', scrt: 'Scrt', inj: 'Inj', fet: 'Fet',
        wbtc: 'Btc', eth: 'Eth', bnb: 'Bnb', matic: 'Mtc', kava: 'Kava'
      },
      feeData: {
        atom: {osm: 0.002, ju: 0.0112, kv: 0.011, cr: 0.0052, cex: 0.001},
        osmo: {osm: 0.002, ju: 0.012, kv: 0.0145, cex: 0.001},
        juno: {osm: 0.003, ju: 0.0065, cex: 0.002},
        wbtc: {osm: 0.002, kv: 0.0095, pan: 0.003, cex: 0.001},
        eth: {osm: 0.002, cex: 0.001},
        bnb: {osm: 0.0052, cex: 0.001},
        matic: {osm: 0.0048, cex: 0.001},
        kava: {osm: 0.002, kv: 0.0068, cex: 0.001},
        scrt: {osm: 0.0038, cex: 0.001},
        inj: {osm: 0.0039, cex: 0.001},
        fet: {osm: 0.006, cex: 0.001},
      },
      commentData: {
        atom: {osm: '', ju: '(k)', kv: '(500)', cr: '(500)', cex: ''},
        osmo: {osm: '', ju: '(500)', kv: '(300)', cex: ''},
        juno: {osm: '', ju: '(k)', cex: ''},
        wbtc: {osm: '', kv: '(500)', pan: '', cex: ''},
        eth: {osm: '', cex: ''},
        bnb: {osm: '(k)', cex: ''},
        matic: {osm: '(k)', cex: ''},
        kava: {osm: '', kv: '(500)', cex: ''},
        scrt: {osm: '(k)', cex: ''},
        inj: {osm: '(k)', cex: ''},
        fet: {osm: '(500)', cex: ''},
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
