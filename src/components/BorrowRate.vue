<template>
<div>
  == Borrow Rate ========<br>
<!--
  [Arbi]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.ar)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.ar)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.ar)}}%</a><br>
  [Poly]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.p)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.p)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.p)}}%</a><br>
  [Opti]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.op)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.op)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.op)}}%</a><br>
  [Bsc]&nbsp;&nbsp;<a class="div_ju">{{borrow(usdc.bsc)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{borrow(usdt.bsc)}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;eth-<a class="s_red">{{borrow(eth.bsc)}}%</a><br>
-->
  [Cp]&nbsp;p-<a class="div_ju">{{compBorrow.p}}%</a>&nbsp;ar-<a class="div_ju">{{compBorrow.ar}}%</a>&nbsp;op-<a class="div_ju">{{compBorrow.op}}%</a>&nbsp;ba-<a class="div_ju">{{compBorrow.ba}}%</a><br>
  [Venus]&nbsp;&nbsp;<a class="div_ju">{{venusBorrow.usdc}}%</a>&nbsp;&nbsp;<a class="div_cr">{{venusBorrow.usdt}}%</a>&nbsp;&nbsp;<a class="s_red">{{venusBorrow.eth}}%</a>&nbsp;
  <br><br>
  == Supply Rate ========<br>
<!--
  [Arbi]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.ar)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.ar)}}%</a><br>
  [Poly]&nbsp;&nbsp;<a class="div_ju">n{{supply(usdc.pn)}}%</a>&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.p)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.p)}}%</a><br>
  [Opti]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.op)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.op)}}%</a><br>
  [Bsc]&nbsp;&nbsp;<a class="div_ju">{{supply(usdc.bsc)}}%</a>&nbsp;&nbsp;<a class="div_cr">{{supply(usdt.bsc)}}%</a><br>
-->
  [Cp]&nbsp;p-<a class="div_ju">{{compSupply.p}}%</a>&nbsp;ar-<a class="div_ju">{{compSupply.ar}}%</a>&nbsp;op-<a class="div_ju">{{compSupply.op}}%</a>&nbsp;ba-<a class="div_ju">{{compSupply.ba}}%</a><br>
  [Venus]&nbsp;&nbsp;<a class="div_ju">{{venusSupply.usdc}}%</a>&nbsp;&nbsp;<a class="div_cr">{{venusSupply.usdt}}%</a>&nbsp;&nbsp;<a class="s_red">{{venusSupply.eth}}%</a>&nbsp;
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
      compBorrow: {},
      compSupply: {},
      venusBorrow: {},
      venusSupply: {},
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
//      this.fetchAave()
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
        .get('https://aave-api-v2.aave.com/data/markets-data')
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
      this.axios
        .get('https://api.venus.io/markets/core-pool?address=' + this.venus_addr.eth)
        .then(this.resVenus3)
        .catch(this.errRes)
    },
    resVenus(res) {
      let objArr = res.data.result
      let tmpObj = objArr.find(a => this.venus_addr.usdc == a.address)
      this.venusBorrow.usdc = Math.round(tmpObj.borrowApy * 100) / 100
      this.venusSupply.usdc = Math.round(tmpObj.supplyApy * 100) / 100
    },
    resVenus2(res) {
      let objArr = res.data.result
      let tmpObj = objArr.find(a => this.venus_addr.usdt == a.address)
      this.venusBorrow.usdt = Math.round(tmpObj.borrowApy * 100) / 100
      this.venusSupply.usdt = Math.round(tmpObj.supplyApy * 100) / 100
    },
    resVenus3(res) {
      let objArr = res.data.result
      let tmpObj = objArr.find(a => this.venus_addr.eth == a.address)
      this.venusBorrow.eth = Math.round(tmpObj.borrowApy * 100) / 100
      this.venusSupply.eth = Math.round(tmpObj.supplyApy * 100) / 100
    },
    fetchComp() {
      this.axios
        .get('https://v3-api.compound.finance/market/all-networks/all-contracts/summary')
        .then(this.resComp)
        .catch(this.errRes)
    },
    resComp(res) {
      this.compData = res.data
      
      let objArr = res.data
      let tmpObj = objArr.find(a => this.comp_usdc.p == a.comet.address)
      this.compBorrow.p = Math.round(tmpObj.borrow_apr * 1000) / 10
      this.compSupply.p = Math.round(tmpObj.supply_apr * 1000) / 10
      tmpObj = objArr.find(a => this.comp_usdc.op == a.comet.address)
      this.compBorrow.op = Math.round(tmpObj.borrow_apr * 1000) / 10
      this.compSupply.op = Math.round(tmpObj.supply_apr * 1000) / 10
      tmpObj = objArr.find(a => (42161 == a.chain_id) && (this.comp_usdc.ar == a.comet.address))
      this.compBorrow.ar = Math.round(tmpObj.borrow_apr * 1000) / 10
      this.compSupply.ar = Math.round(tmpObj.supply_apr * 1000) / 10
      tmpObj = objArr.find(a => (8453 == a.chain_id) && (this.comp_usdc.ar == a.comet.address))
      this.compBorrow.ba = Math.round(tmpObj.borrow_apr * 1000) / 10
      this.compSupply.ba = Math.round(tmpObj.supply_apr * 1000) / 10
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
        op: "0x2e44e174f7D53F0212823acC11C01A11d58c5bCB",
      }
    },
    usdc() {
      return {
        p: "137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        p2: "0x2791bca1f2de4661ed88a30c99a7a9449aa841740xd05e3e715d945b59290df0ae8ef85c1bdb684744",
        pn: "137-0x3c499c542cef5e3811e1192ce70d8cc03d5c3359-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        ar: "42161-0xaf88d065e77c8cc2239327c5edb3a432268e5831-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        op: "10-0x7f5c764cbc14f9669b88837ca1490cca17c31607-0xa97684ead0e402dc232d5a977953df7ecbab3cdb",
        e: "1-0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-0x2f39d218133afab8f2b819b1066c7e434ad94e9e",
        e2: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb480xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
        bsc: "56-0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d-0xff75b6da14ffbbfd355daf7a2731456b3562ba6d",
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
        bsc: "56-0x55d398326f99059ff775485246999027b3197955-0xff75b6da14ffbbfd355daf7a2731456b3562ba6d",
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
        bsc: "56-0x2170ed0880ac9a755fd29b2688956bd959f933f8-0xff75b6da14ffbbfd355daf7a2731456b3562ba6d"
      }
    },
  },
}
  
</script>
