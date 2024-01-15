<template>
<div>
  == Borrow Rate ========<br>
  [Arbi]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.ar)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.ar)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.ar)}}%</a><br>
  [Poly]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.p)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.p)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.p)}}%</a><br>
  [P-v2]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.p2)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.p2)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.p2)}}%</a><br>
  [Opti]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.op)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.op)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.op)}}%</a><br>
<!--
  [Eth]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.e)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.e)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.e)}}%</a><br>
  [E-v2]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.e2)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.e2)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.e2)}}%</a><br>
-->
  [Comp]&nbsp;&nbsp;p-<a class="div_ju">{{compRate.p}}%</a>&nbsp;&nbsp;ar-<a class="div_ju">{{compRate.ar}}%</a>&nbsp;&nbsp;ba-<a class="div_ju">{{compRate.ba}}%</a><br>
  <br>
  == Supply Rate ========<br>
  [Arbi]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.ar)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.ar)}}%</a><br>
  [Poly]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.p)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.p)}}%</a><br>
  [P-v2]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.p2)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.p2)}}%</a><br>
  [Opti]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.op)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.op)}}%</a><br>
  [Venus]&nbsp;&nbsp;<a class="div_ju">{{venusRate.usdc}}%</a>&nbsp;&nbsp;<a class="div_cr">{{venusRate.usdt}}%</a>&nbsp;
</div>
</template>

<script>
  
const CORS_URL = 'http://localhost:8088/'

export default {
  data () {
    return {
      msg: '',
      bShowMore: false,
      aaveData: {},
      compRate: {},
      venusRate: {},
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
      this.fetchComp()
      this.fetchVenus()
    },
    borrow(id) {
      if(this.aaveData && this.aaveData.reserves) {
        let obj = this.aaveData.reserves.find(a => id == a.id)
        return Math.round(obj.variableBorrowRate * 10000) / 100        
      }
      return -1
    },
    supply(id) {
      if(this.aaveData && this.aaveData.reserves) {
        let obj = this.aaveData.reserves.find(a => id == a.id)
        return Math.round(obj.liquidityRate * 10000) / 100        
      }
      return -1
    },
    fetchAave() {
      this.axios
        .get(CORS_URL + 'https://aave-api-v2.aave.com/data/markets-data')
        .then(this.resAave)
        .catch(this.errRes)
    },
    resAave(res) {
      this.aaveData = res.data
    },
    fetchVenus() {
      this.axios
        .get('https://api.venus.io/markets/core-pool?address=' + this.venus_addr.usdc)
        .then(this.resVenus)
        .catch(this.errRes)
      this.axios
        .get('https://api.venus.io/markets/core-pool?address=' + this.venus_addr.usdt)
        .then(this.resVenus2)
        .catch(this.errRes)
    },
    resVenus(res) {
      let objArr = res.data.result
      let tmpObj = objArr.find(a => this.venus_addr.usdc == a.address)
      this.venusRate.usdc = Math.round(tmpObj.supplyApy * 100) / 100
//      this.venusRate.usdc = Math.round(tmpObj.borrowApy * 100) / 100
    },
    resVenus2(res) {
      let objArr = res.data.result
      let tmpObj = objArr.find(a => this.venus_addr.usdt == a.address)
      this.venusRate.usdt = Math.round(tmpObj.supplyApy * 100) / 100
//      this.venusRate.usdc = Math.round(tmpObj.borrowApy * 100) / 100
    },
    fetchComp() {
      // https://v3-api.compound.finance/market/all-networks/all-contracts/summary
      this.axios
        .get('https://v3-api.compound.finance/market/all-networks/all-contracts/summary')
        .then(this.resComp)
        .catch(this.errRes)
//      this.axios
//        .get('https://v3-api.compound.finance/market/polygon-mainnet/0xF25212E676D1F7F89Cd72fFEe66158f541246445/historical/summary')
//        .then(this.resCompPoly)
//        .catch(this.errRes)
//      this.axios
//        .get('https://v3-api.compound.finance/market/arbitrum-mainnet/0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf/historical/summary')
//        .then(this.resCompAr)
//        .catch(this.errRes)
//      this.axios
//        .get('https://v3-api.compound.finance/market/base-mainnet/0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf/historical/summary')
//        .then(this.resCompBa)
//        .catch(this.errRes)
    },
    resComp(res) {
      let objArr = res.data
      let tmpObj = objArr.find(a => this.comp_usdc.p == a.comet.address)
      this.compRate.p = Math.round(tmpObj.borrow_apr * 10000) / 100
      tmpObj = objArr.find(a => (42161 == a.chain_id) && (this.comp_usdc.ar == a.comet.address))
      this.compRate.ar = Math.round(tmpObj.borrow_apr * 10000) / 100
      tmpObj = objArr.find(a => (8453 == a.chain_id) && (this.comp_usdc.ar == a.comet.address))
      this.compRate.ba = Math.round(tmpObj.borrow_apr * 10000) / 100
    },
    resCompPoly(res) {
      let idx = res.data.length - 1
      this.compRate.p = Math.round(res.data[idx].borrow_apr * 10000) / 100
    },
    resCompAr(res) {
      let idx = res.data.length - 1
      this.compRate.ar = Math.round(res.data[idx].borrow_apr * 10000) / 100
    },
    resCompBa(res) {
      let idx = res.data.length - 1
      this.compRate.ba = Math.round(res.data[idx].borrow_apr * 10000) / 100
    },
    checkCondition(noticeFunc) {
    },
    errRes(res) {
      console.log('error')
    },
  },
  computed: {
    venus_addr() {
      return {
        usdc: "0xecA88125a5ADbe82614ffC12D0DB554E2e2867C8",
        usdt: "0xfD5840Cd36d94D7229439859C0112a4185BC0255",
        eth: "0xf508fCD89b8bd15579dc79A6827cB4686A3592c8",
      }
    },
    comp_usdc() {
      return {
        p: "0xF25212E676D1F7F89Cd72fFEe66158f541246445",
        ar: "0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf",
      }
    },
    usdc() {
      return {
        p: "137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        p2: "0x2791bca1f2de4661ed88a30c99a7a9449aa841740xd05e3e715d945b59290df0ae8ef85c1bdb684744",
        ar: "42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
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
