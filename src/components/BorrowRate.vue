<template>
<div>
  == Borrow Rate ========<br>
  [Arbi]&nbsp;&nbsp;<a class="div_ju">{{rate(usdc.ar)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{rate(usdt.ar)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{rate(eth.ar)}}%</a><br>
  [Poly]&nbsp;&nbsp;<a class="div_ju">{{rate(usdc.p)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{rate(usdt.p)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{rate(eth.p)}}%</a><br>
  [P-v2]&nbsp;&nbsp;<a class="div_ju">{{rate(usdc.p2)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{rate(usdt.p2)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{rate(eth.p2)}}%</a><br>
  [Opti]&nbsp;&nbsp;<a class="div_ju">{{rate(usdc.op)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{rate(usdt.op)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{rate(eth.op)}}%</a><br>
  [Eth]&nbsp;&nbsp;<a class="div_ju">{{rate(usdc.e)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{rate(usdt.e)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{rate(eth.e)}}%</a><br>
  [E-v2]&nbsp;&nbsp;<a class="div_ju">{{rate(usdc.e2)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{rate(usdt.e2)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{rate(eth.e2)}}%</a><br>
</div>
</template>

<script>

export default {
  data () {
    return {
      bShowMore: false,
      aaveRate: {},
      lastData: {}
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
      this.fetchAave()
    },
    rate(id) {
      if(this.lastData) {
        let obj = this.lastData.reserves.find(a => id == a.id)
        return Math.round(obj.variableBorrowRate * 10000) / 100        
      }
      return -1
    },
    fetchAave() {
      this.axios
        .get('https://aave-api-v2.aave.com/data/markets-data')
        .then(this.resAave)
        .catch(this.errRes)
    },
    resAave(res) {
      this.lastData = res.data
      return
      let obj = res.data.reserves.find(
        a => "137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174-0xa97684ead0e402dc232d5a977953df7ecbab3cdb" == a.id)
      this.aaveRate.pUsdc = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "137-0xc2132d05d31c914a87c6611c10748aeb04b58e8f-0xa97684ead0e402dc232d5a977953df7ecbab3cdb" == a.id)
//      this.aaveRate.pUsdt = Math.round(obj.variableBorrowRate * 10000) / 100
      this.aaveRate.pUsdt = this.findData(res, "137-0xc2132d05d31c914a87c6611c10748aeb04b58e8f-0xa97684ead0e402dc232d5a977953df7ecbab3cdb")
      obj = res.data.reserves.find(
        a => "0x2791bca1f2de4661ed88a30c99a7a9449aa841740xd05e3e715d945b59290df0ae8ef85c1bdb684744" == a.id)
      this.aaveRate.p2Usdc = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "0xc2132d05d31c914a87c6611c10748aeb04b58e8f0xd05e3e715d945b59290df0ae8ef85c1bdb684744" == a.id)
      this.aaveRate.p2Usdt = Math.round(obj.variableBorrowRate * 10000) / 100
      
      obj = res.data.reserves.find(
        a => "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8" == a.underlyingAsset)
      this.aaveRate.arUsdc = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9" == a.underlyingAsset)
      this.aaveRate.arUsdt = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "0x7f5c764cbc14f9669b88837ca1490cca17c31607" == a.underlyingAsset)
      this.aaveRate.opUsdc = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58" == a.underlyingAsset)
      this.aaveRate.opUsdt = Math.round(obj.variableBorrowRate * 10000) / 100      
      obj = res.data.reserves.find(
        a => "0x7ceb23fd6bc0add59e62ac25578270cff1b9f6190xd05e3e715d945b59290df0ae8ef85c1bdb684744" == a.id)
      this.aaveRate.p2Eth = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "137-0x7ceb23fd6bc0add59e62ac25578270cff1b9f619-0xa97684ead0e402dc232d5a977953df7ecbab3cdb" == a.id)
      this.aaveRate.pEth = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "0x82af49447d8a07e3bd95bd0d56f35241523fbab1" == a.underlyingAsset)
      this.aaveRate.arEth = Math.round(obj.variableBorrowRate * 10000) / 100
      
//      this.axios
//        .get('https://api.curve.fi/api/getPools/polygon/factory')
//        .then(this.resCurve)
//        .catch(this.errRes)
    },
    checkCondition(noticeFunc) {
    },
    errRes(res) {
      console.log('error')
    },
  },
  computed: {
    usdc() {
      return {
        p: "137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        p2: "0x2791bca1f2de4661ed88a30c99a7a9449aa841740xd05e3e715d945b59290df0ae8ef85c1bdb684744",
        ar: "42161-0xff970a61a04b1ca14834a43f5de4533ebddb5cc8-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        op: "10-0x7f5c764cbc14f9669b88837ca1490cca17c31607-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        e: "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-0x2f39d218133afab8f2b819b1066c7e434ad94e9e",
        e2: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
      }
    },
    usdt() {
      return {
        p: "137-0xc2132d05d31c914a87c6611c10748aeb04b58e8f-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        p2: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f0xd05e3e715d945b59290df0ae8ef85c1bdb684744",
        ar: "42161-0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        op: "10-0x94b008aa00579c1307b0ef2c499ad98a8ce58e58-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        e: "1-0xdac17f958d2ee523a2206206994597c13d831ec7-0x2f39d218133afab8f2b819b1066c7e434ad94e9e",
        e2: "0xdac17f958d2ee523a2206206994597c13d831ec70xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
      }
    },
    eth() {
      return {
        p: "137-0x7ceb23fd6bc0add59e62ac25578270cff1b9f619-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        p2: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f6190xd05e3e715d945b59290df0ae8ef85c1bdb684744",
        ar: "42161-0x82af49447d8a07e3bd95bd0d56f35241523fbab1-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        op: "10-0x4200000000000000000000000000000000000006-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        e: "1-0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-0x2f39d218133afab8f2b819b1066c7e434ad94e9e",
        e2: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc20xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
      }
    },
  },
}
  
</script>
