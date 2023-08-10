<template>
<div>
  [<a href="https://www.coingecko.com/zh-tw/數字貨幣/usd-coin" target="_blank">Dc</a>-<a href="https://www.coingecko.com/zh-tw/數字貨幣/泰達幣" target="_blank">Dt</a>-Di]
  &nbsp;poly:&nbsp;{{get3PoolPrice('poly','usdc')}}/&nbsp;{{get3PoolPrice('poly','usdt')}}/&nbsp;{{get3PoolPrice('poly','dai')}}&nbsp;&nbsp;&nbsp;&nbsp;<a @click="showMore">[+]</a>
  {{sushi_usdc}}<br>
  <div v-show="bShowMore">
    &nbsp;eth&nbsp;{{get3PoolPrice('eth','usdc')}}/&nbsp;{{get3PoolPrice('eth','usdt')}}/&nbsp;{{get3PoolPrice('eth','dai')}},&nbsp;&nbsp;  
    arbi:&nbsp;{{get3PoolPrice('ar','usdc')}}/&nbsp;{{get3PoolPrice('ar','usdt')}}
    <br><br>
    [Avx pool] {{axl_avx_pool}}
  </div>
  [Axl-Dc]&nbsp;
  poly:{{getAxlPrice('poly')}}&nbsp;&nbsp; 
  <a :style=checkAvxPool()>avx:{{getAxlPrice('avx')}}</a>&nbsp;&nbsp;
  ar:{{getAxlPrice('sushi')}}&nbsp;&nbsp;
  ftm:{{Math.round(getAxlPrice('ftm')/1000)}}k&nbsp;&nbsp; 
<!--  celo:{{getAxlPrice('celo')}}&nbsp;&nbsp;
  ar:{{getAxlPrice("ar")}} -->
</div>
</template>

<script>

export default {
  data () {
    return {
      bShowMore: false,
      
      eth_usdt: -1,
      eth_usdc: -1,
      eth_dai: -1,  
      
      poly_usdt: -1,
      poly_usdc: -1,
      poly_dai: -1, 
      
      ar_usdt: -1,
      ar_usdc: -1,
      ar_dai: -1,
      
      sushi_usdc: -1,
      
      axl_poly: -1,
      axl_avx: -1,
      axl_ftm: -1,
      axl_celo: -1,
      axl_ar: -1,
      axl_sushi: -1,
      axl_avx_pool: -1,
    }
  },
//  props: ['symbol', 'priceData', 'compareDex'],
  created: function() {
    if(!process.isClient){
      return
    }
  },
  methods: {
    showMore() {
      this.bShowMore = !this.bShowMore
    },
    fetch() {
      this.axios
        .get('https://api.curve.fi/api/getPools/polygon/factory')
        .then(this.resCurve)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/avalanche/factory')
        .then(this.resCurve2)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/fantom/factory')
        .then(this.resCurve3)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/ethereum')
        .then(this.resCurve4)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/celo/factory')
        .then(this.resCurve5)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/arbitrum/factory')
        .then(this.resCurve6)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/polygon')
        .then(this.resCurve7)
        .catch(this.errRes)
      this.axios
        .get('https://api.curve.fi/api/getPools/arbitrum')
        .then(this.resCurve8)
        .catch(this.errRes)
      this.axios
        .get('https://token-price.sushi.com/v1/42161/0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8')
        .then(this.resSushiDc)
        .catch(this.errRes)
      this.axios
        .get('https://token-price.sushi.com/v1/42161/0xEB466342C4d449BC9f53A865D5Cb90586f405215')
        .then(this.resSushiAxl)
        .catch(this.errRes)
    },
    procCurvePrice(res, sPoolID) {
      let obj = res.data.data.poolData.find(a => a.id == sPoolID)
      return Math.round(
        obj.coins[0].usdPrice / obj.coins[1].usdPrice * 10000)      
    },
    procCurvePoolSize(res, sPoolID) {
      let obj = res.data.data.poolData.find(a => a.id == sPoolID)
      return Math.round(obj.coins[0].poolBalance * 0.000001)    
    },
    resCurve(res) {
      this.axl_poly = this.procCurvePrice(res, "factory-v2-221")
    },
    resCurve2(res) {
      this.axl_avx = this.procCurvePrice(res, "factory-v2-82") 
      this.axl_avx_pool = this.procCurvePoolSize(res, "factory-v2-82")     
    },
    resCurve3(res) {
      this.axl_ftm = this.procCurvePrice(res, "factory-v2-85")      
    },
    resCurve4(res) {
      let obj = res.data.data.poolData.find(a => a.id == 0)
      this.eth_dai = Math.round(obj.coins[0].usdPrice * 10000)
      this.eth_usdc = Math.round(obj.coins[1].usdPrice * 10000)
      this.eth_usdt = Math.round(obj.coins[2].usdPrice * 10000)
    },
    resCurve5(res) {
      this.axl_celo = this.procCurvePrice(res, "factory-v2-3")
    },
    resCurve6(res) {
      this.axl_ar = this.procCurvePrice(res, "factory-v2-64")      
    },
    resCurve7(res) {
      let obj = res.data.data.poolData.find(a => a.id == 1)
      this.poly_dai = Math.round(obj.coins[0].usdPrice * 10000)
      this.poly_usdc = Math.round(obj.coins[1].usdPrice * 10000)
      this.poly_usdt = Math.round(obj.coins[2].usdPrice * 10000)
    },
    resCurve8(res) {
      let obj = res.data.data.poolData.find(a => a.id == 0)
      this.ar_usdc = Math.round(obj.coins[0].usdPrice * 10000)
      this.ar_usdt = Math.round(obj.coins[1].usdPrice * 10000)
    },
    resSushiDc(res) {
      this.sushi_usdc = res.data
    },
    resSushiAxl(res) {
      this.axl_sushi = Math.round(res.data * 10000)
    },
    get3PoolPrice(chain, symbol) {
      return (this[chain + '_' + symbol] - 10000)
    },
    getAxlPrice(chain) {
      return (this['axl_' + chain] - 10000)
    },
    checkAvxPool() {
      return (this.axl_avx_pool > 1000) ? '' : 'color:Coral'
    },
    checkCondition(noticeFunc) {
      if(Math.abs(this.getAxlPrice('poly')) > 30 ||
        (Math.abs(this.getAxlPrice('avx')) > 30 && this.axl_avx_pool > 1000) ||
        Math.abs(this.getAxlPrice('sushi')) > 30 ||
        Math.abs(this.getAxlPrice('ftm')) > 30) {
        noticeFunc('AxlUsdc GO!!', 567)
      }
    },
  },
  computed: {
  },
}
  
</script>
