<template>
  <Layout>
  <div class="omo abpos"><RightLink/></div>
  <div class="omo">
    <div class="omo_block">
      <input type="checkbox" v-model=bShowNotice> All&nbsp;&nbsp;
      <input type="checkbox" v-model=bStNotice> St&nbsp;&nbsp;
      <input type="checkbox" v-model=bAxlNotice> Axl&nbsp;&nbsp;
      <input type="checkbox" v-model=bRateNotice> Rate
      <input type="checkbox" v-model=bUpdateMaxDc> MxDc
      <br><br>
      == Cex-Usdc ======== <br>
      Bn: {{usdc_bn}}/{{busd_bn}}&nbsp;&nbsp; 
<!--      Max: {{dcdt_mx}}&nbsp;&nbsp;<br>-->
      <br>
      [TWD]&nbsp; {{usdt_mx}}&nbsp;&nbsp;<input v-model=usdc_mx style="width:80px">&nbsp;&nbsp;dc: {{usdc_mx_div}}
      <br><br>
      <CurvePools ref="curve_pools"/> 
      <br>
      [BTC Fee] <a class="s_red">{{btcFee}}%</a><br>
      [ETH Fee] <a class="s_red">{{ethFee}}%</a><br>
      [ATOM Fee] <a class="s_red">{{atomFee}}%</a><br><br>
      [BNB Fee] <a class="s_red">{{bnbFee}}%</a><br>
      [DOGE Fee] <a class="s_red">{{dogeFee}}%</a><br>
      [BCH Fee] <a class="s_red">{{bchFee}}%</a><br>
      <br>
      <div v-for="fund in fundArr">
        {{fund.symbol}}: {{fund.rate}}%
      </div>
      <br><br><br>
    </div>
    <div class="omo_block">
      Gmx rev: <input v-model=gmx_rev style="width:80px"> / {{gmx_period}}天 = {{gmx_annual}}%<br>
      cost: {{eth_cost}}&nbsp;&nbsp;&nbsp;&nbsp;short rev: {{short_annual}}%<br>
      Eth Future rrev: <input v-model=eth_future_div style="width:80px"> {{eth_future_rev}}%<br>
      Btc Future rrev: <input v-model=btc_future_div style="width:80px"> {{btc_future_rev}}%
      <br><br>
      <BorrowRate ref="borrow_rate"/>
      <br>
      [<a href="https://www.coingecko.com/zh-tw/數字貨幣/radiant-capital" target="_blank">Rdnt</a>]&nbsp; {{rdnt_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Bnb]&nbsp; {{price.bnb.cex}}
      <br>
      [Doge]&nbsp; {{doge_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Bch]&nbsp; {{bch_bn}}
      <br>
      [Arb]&nbsp; {{arb_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Dydx]&nbsp; {{dydx_bn}}
      <br>
      [Xvs]&nbsp; {{xvs_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Comp]&nbsp; {{comp_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      <br><br>
      [<a href="https://info.osmosis.zone/token/MARS" target="_blank">Mars</a>]&nbsp; {{mars_info}}&nbsp;&nbsp;&nbsp;&nbsp;
      [<a href="https://info.osmosis.zone/token/STRD" target="_blank">Strd</a>]&nbsp; {{strd_info}}
      <br>
      [<a href="https://info.osmosis.zone/token/LIKE" target="_blank">Like</a>]&nbsp; {{like_info}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Ion]&nbsp; {{ion_info}}
      <br><br><br>
    </div>
    <div class="omo_block">
      <SimpPrice ref="wbtc" symbol="WBTC" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="eth" symbol="ETH" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice><br>
      <SimpPrice ref="atom" symbol="ATOM" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="osmo" symbol="OSMO" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice><br>
      <input type="checkbox" v-model=bShowStBuy> Buying St&nbsp;&nbsp;
      <br>
      [stOs] {{osmo_redeem}} ~ osm {{st_osmo}}&nbsp;&nbsp;<a :href="genLink(833)" target="_blank" class="div_ju">{{st_osmo_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br>
      [stAt] {{atom_redeem}} ~ osm {{st_atom}}&nbsp;&nbsp;<a :href="genLink(1136)" target="_blank" class="div_ju">{{st_atom_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br><br><br>
      cake calc: <a class="s_red"> {{calcRes}}%</a><br>
      <input type="radio" id="a" v-model=calc_fee value="0.01"/>
      <label for="a">0.01%</label>&nbsp;
      <input type="radio" id="b" v-model=calc_fee value="0.05"/>
      <label for="b">0.05%</label>&nbsp;
      <input type="radio" id="c" v-model=calc_fee value="0.2"/>
      <label for="c">0.2%</label><br>
      liq: <input v-model=calc_liq style="width:40px"> M&nbsp;&nbsp;
      7vol: <input v-model=calc_vol style="width:40px"> M&nbsp;&nbsp;
      7fee: <input v-model=calc_7d_fee style="width:40px">
      <br><br><br>
    </div>
  </div> 
  </Layout>
</template>

<script>
import SimpPrice from "@/components/SimpPrice";
import RightLink from "@/components/RightLink";
import CurvePools from "@/components/CurvePools";
import BorrowRate from "@/components/BorrowRate";
  
const CORS_URL = 'http://localhost:8088/'

export default {
  data () {
    return {
      msg: 0,
      interval: null,
      intervalCheck: null,       
      
      bShowNotice: true,
      bStNotice: true,
      bAxlNotice: false,
      bRateNotice: false,
      bUpdateMaxDc: true,
      bShowStBuy: true,
      
      price: {
        atom: {osm: 1, ju: 1, kv: 1, cex: 1},
        osmo: {osm: 1, ju: 1, cex: 1},
        juno: {osm: 1, ju: 1},
        wbtc: {osm: 1, cex: 1},
        eth: {osm: 1, cex: 1},
        bnb: {osm: 1, cex: 1},
        matic: {osm: 1, cex: 1},
        kava: {osm: 1, cex: 1},
        scrt: {osm: 1, cex: 1},
        inj: {osm: 1, cex: 1},
        fet: {osm: 1, cex: 1},
      },
      
      doge_bn: 1,
      bch_bn: 1,
      wbtc_bn: 1,
      busd_bn: 1,
      scrt_bn: 1,
      usdc_bn: 1,
      arb_bn: 1,
      dydx_bn: 1,
      rdnt_bn: 1,
      cake_bn: 1,
      xvs_bn: 1,
      comp_bn: 1,
      
      atomFee: 1,
      btcFee: 1,
      ethFee: 1,
      bnbFee: 1,
      bchFee: 1,
      dogeFee: 1,
      
      usdc_mx: 1,
      usdt_mx: 1,
      dcdt_mx: 1,
      
      ion_info: 1, 
      like_info: 1,
      mars_info: 1,
      strd_info: 1,
      
      wbtc_qt: 0.5,
      gmx_rev: 0,
      gmx_period: 1,
      eth_future_div: 0,
      btc_future_div: 0,
      
      calc_fee: 0.01,
      calc_liq: 1,
      calc_vol: 1,
      calc_7d_fee: 1,
      
      st_atom: 1,  // 803
      st_osmo: 1,  // 833
      
      atom_redeem: 1,
      osmo_redeem: 1,
      
      fundArr: [],
    }
  },
  components: {
    SimpPrice,
    RightLink,
    CurvePools,
    BorrowRate
  },
  mounted: function() {
    if(!process.isClient){
      return
    }
    this.fetchStart()
    this.fetchStride()
    this.interval = setInterval(this.fetchStart, 60000)
  },
  methods: {
    genLink(poolID) {
      return "https://app.osmosis.zone/pool/" + poolID
    },
    notice(txt) {
      let notification = new Notification('chance!!', {body: txt})
    },
    checkCondition() {
      if(!this.intervalCheck) {
        this.intervalCheck = setInterval(this.checkCondition2, 5000)
        console.log('set cond check')
      }
    },
    checkCondition2() {
      clearInterval(this.intervalCheck)
      this.intervalCheck = null
      
      if(!this.bShowNotice) {
        return
      }
      
      if(Math.abs(this.$refs.wbtc.getDiv('osm', 'cex')) > 2) {
        this.notice('BTC go!!', 567)
      }
      if(Math.abs(this.$refs.osmo.getDiv('osm', 'cex')) > 2) {
        this.notice('OSMO go!!', 567)
      } 
      if(this.price.osmo.osm > 0.26 || this.price.osmo.osm < 0.23) {
        this.notice('Watch OSMO LP!!', 567)
      } 
      if(this.bRateNotice && (this.atomFee < 0 || this.usdcRate > 3)) {
        this.notice('Watch funding rate!!', 567)
      }
      if(this.bRateNotice && (this.bchFee > 0.009)) {
        this.notice('Watch bch rate!!', 567)
      }
      
      if(this.bAxlNotice) {
        this.$refs.curve_pools.checkCondition(this.notice)
      }
    },
    fetchBinance() { 
      this.axios
        .get('https://api1.binance.com/api/v3/ticker/price')
        .then(this.resBinance)
        .catch(this.errRes)
      this.axios
        .get('https://fapi.binance.com/fapi/v1/premiumIndex')
        .then(this.resAtomFee)
        .catch(this.errRes)
    },
    resBinance(res) { 
      this.price.atom.cex =
        Math.round(res.data.find(a=> a.symbol == 'ATOMUSDT').price * 1000) / 1000
      this.price.osmo.cex =
        Math.round(res.data.find(a=> a.symbol == 'OSMOUSDT').price * 10000) / 10000
      this.price.wbtc.cex =
        Math.round(res.data.find(a=> a.symbol == 'BTCUSDT').price)
      this.price.eth.cex =
        Math.round(res.data.find(a=> a.symbol == 'ETHUSDT').price * 10) / 10
      this.price.bnb.cex =
        Math.round(res.data.find(a=> a.symbol == 'BNBUSDT').price * 100) / 100
      this.doge_bn =
        Math.round(res.data.find(a=> a.symbol == 'DOGEUSDT').price * 1000000) / 1000000
      this.bch_bn =
        Math.round(res.data.find(a=> a.symbol == 'BCHUSDT').price * 100) / 100
      this.wbtc_bn =
        Math.round(res.data.find(a=> a.symbol == 'WBTCBTC').price * 10000)
      this.busd_bn =
        Math.round(res.data.find(a=> a.symbol == 'BUSDUSDT').price * 10000)
      this.price.scrt.cex =
        Math.round(res.data.find(a=> a.symbol == 'SCRTUSDT').price * 10000)
      this.usdc_bn = 
        Math.round(res.data.find(a=> a.symbol == 'USDCUSDT').price * 10000)
      this.arb_bn =
        Math.round(res.data.find(a=> a.symbol == 'ARBUSDT').price * 10000) / 10000
      this.dydx_bn =
        Math.round(res.data.find(a=> a.symbol == 'DYDXUSDT').price * 10000) / 10000
      this.rdnt_bn =
        Math.round(res.data.find(a=> a.symbol == 'RDNTUSDT').price * 10000) / 10000
      this.cake_bn =
        Math.round(res.data.find(a=> a.symbol == 'CAKEUSDT').price * 1000) / 1000
      this.xvs_bn =
        Math.round(res.data.find(a=> a.symbol == 'XVSUSDT').price * 1000) / 1000
      this.comp_bn =
        Math.round(res.data.find(a=> a.symbol == 'COMPUSDT').price * 1000) / 1000
    },
    resAtomFee(res) {
      let btcObj = res.data.find(a => 'BTCUSDT' == a.symbol)
      let atomObj = res.data.find(a => 'ATOMUSDT' == a.symbol)
      let ethObj = res.data.find(a => 'ETHUSDT' == a.symbol)
      let bnbObj = res.data.find(a => 'BNBUSDT' == a.symbol)
      let bchObj = res.data.find(a => 'BCHUSDT' == a.symbol)
      let dogeObj = res.data.find(a => 'DOGEUSDT' == a.symbol)
      this.btcFee = Math.round(btcObj.lastFundingRate * 10000000000) / 100000000
      this.atomFee = Math.round(atomObj.lastFundingRate * 10000000000) / 100000000
      this.ethFee = Math.round(ethObj.lastFundingRate * 10000000000) / 100000000
      this.bnbFee = Math.round(bnbObj.lastFundingRate * 10000000000) / 100000000
      this.bchFee = Math.round(bchObj.lastFundingRate * 10000000000) / 100000000
      this.dogeFee = Math.round(dogeObj.lastFundingRate * 10000000000) / 100000000
      this.fundArr = res.data.map(a =>{
        return {
          symbol: String(a.symbol).slice(0, -4),
          rate: Math.round(a.lastFundingRate * 10000000000) / 100000000
        }
      })
      this.fundArr = this.fundArr.filter(a => a.rate > 0.01)
    },
    fetchOsmoInfo() {
      this.axios
        .get('https://api-osmosis.imperator.co/tokens/v2/all')
        .then(this.resOsmoInfo)
        .catch(this.errRes)
    },
    resOsmoInfo(res) { 
      this.like_info =
        Math.round(res.data.find(a=> a.symbol == 'LIKE').price * 1000000) / 1000000
      this.ion_info =
        Math.round(res.data.find(a=> a.symbol == 'ION').price * 100) / 100
      this.mars_info =
        Math.round(res.data.find(a=> a.symbol == 'MARS').price * 10000) / 10000
      this.strd_info =
        Math.round(res.data.find(a=> a.symbol == 'STRD').price * 1000) / 1000
    },
    fetchStride() {
      this.axios
        .get(CORS_URL + 'https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
        .then(this.resStride)
        .catch(this.errRes)
    },
    resStride(res) {
      let resArr = res.data.host_zone
      let atomObj = resArr.find(a => a.chain_id == "cosmoshub-4")
      this.atom_redeem = Math.round(atomObj.redemption_rate * 10000) / 10000
//      let osmoObj = resArr.find(a => a.chain_id == "osmosis-1")
//      this.osmo_redeem = Math.round(osmoObj.redemption_rate * 10000) / 10000
    },
    fetchMax() {
      this.axios
        .get(CORS_URL + 'https://max-api.maicoin.com/api/v2/tickers')
        .then(this.resMax)
        .catch(this.errRes)
    },
    resMax(res) {
      this.usdt_mx = res.data.usdttwd.last
      this.dcdt_mx = Math.round(res.data.usdcusdt.last * 10000)
      if(this.bUpdateMaxDc) {
        this.usdc_mx = res.data.usdctwd.last
      }
    },
    fetchStart() {
      this.fetchPrior()
      
      this.fetchOsmoInfo()
      this.fetchMax()
      
      this.checkCorsAlive()
      
      this.checkCondition()
      this.calPeriod()
      
      this.$refs.curve_pools.fetch()      
      this.$refs.borrow_rate.fetch()
    },
    fetchPrior() {
      this.fetchBinance()
      this.fetchPool(1133, this.res1133)
    },
    fetchOsmoAll() {    
      this.fetchPool(833, this.res833)
      this.fetchPool(840, this.res840)  
      this.fetchPool(1090, this.res1090)
      this.fetchPool(1134, this.res1134)
      this.fetchPool(1135, this.res1135)
      this.fetchPool(1136, this.res1136)
    },
    fetchPool(poolID, funcRes) {
      this.axios 
//        .get('https://lcd-osmosis.blockapsis.com/osmosis/gamm/v1beta1/pools/' + poolID)
        .get('https://api-osmosis-ia.cosmosia.notional.ventures/osmosis/gamm/v1beta1/pools/' + poolID)
//        .get('https://lcd-osmosis.keplr.app/osmosis/gamm/v1beta1/pools/' + poolID)
//        .get('https://osmosis-api.polkachu.com/osmosis/gamm/v1beta1/pools/' + poolID)
        .then(funcRes)
        .catch(this.errRes)
    },
    res833(res) {
      let factor = res.data.pool.scaling_factors
      let std_ratio = factor[1] / factor[0]
      this.osmo_redeem = Math.round(std_ratio * 10000) / 10000
      
      let liq = res.data.pool.pool_liquidity
      let div = ((liq[1].amount / liq[0].amount) - 1) / 25128
      let div2 = liq[1].amount / liq[0].amount
      this.st_osmo = Math.round((std_ratio + div) * 10000) / 10000
    },
    res1090(res) {
      let sqrt = res.data.pool.current_sqrt_price * 0.1
      this.price.wbtc.osm = Math.round(this.fixed_osmo / sqrt / sqrt * 10) / 10
    },
    res1133(res) {
      let sqrt = res.data.pool.current_sqrt_price
      this.price.osmo.osm = Math.round(sqrt * sqrt * 10000) / 10000
      
      this.fetchOsmoAll()
    },
    res1134(res) {
      let sqrt = res.data.pool.current_sqrt_price * 0.000001
      this.price.eth.osm = Math.round(this.fixed_osmo / sqrt / sqrt * 10) / 10
    },
    res1135(res) {
      let sqrt = res.data.pool.current_sqrt_price
      this.price.atom.osm = Math.round(this.fixed_osmo / sqrt / sqrt * 1000) / 1000
    },
    res1136(res) {
      let sqrt = res.data.pool.current_sqrt_price
      this.st_atom = Math.round(sqrt * sqrt * 10000) / 10000
    },
    errRes(res) {
      console.log('error')
    },
    calDiv(a, b, fee) {
      let result = a / b - 1
      let feeFix = (result > 0) ? (fee * -1) : fee
      let resultFix = result + feeFix
      if(result * resultFix > 0) {  // both positive or both negative
        return Math.round(resultFix * 10000) / 100
      } else {
        return 0        
      }
    },
    checkCorsAlive() {
      this.axios
        .get('http://localhost:8088/')
        .then(this.resCheckCorsAlive)
        .catch(this.resCheckCorsAlive)
    },
    resCheckCorsAlive(res) {
      if(res.status != 200) {
        alert("Cors is dead.")
        return
      }
    },
    calPeriod() {
      let now = new Date()
      let gmxStart = new Date('2023-08-13T01:15')
      this.gmx_period = Math.round((now - gmxStart) / 36000 / 24) / 100
    },
  },
  computed: {
    st_atom_div() {
      let fee = (this.bShowStBuy) ? 0.003 : -0.003
      return this.calDiv(this.st_atom, this.atom_redeem, fee)
    },
    st_osmo_div() {
      let fee = (this.bShowStBuy) ? 0.003 : -0.003
      return this.calDiv(this.st_osmo, this.osmo_redeem, fee)
    },
    usdc_mx_div() {
      return Math.round(this.usdc_mx * 0.999 / this.usdt_mx * 0.999 * 10000)
    },
    fixed_osmo() {
      return this.price.osmo.osm * this.usdc_bn / 10000
    },
    gmx_annual() {
      let stRev = this.price.eth.cex * 2.32 * 0.038
      let rev = this.gmx_rev / this.gmx_period * 365 + stRev - (this.eth_cost * 0.035)
      return Math.round(rev / this.eth_cost * 10000) / 100
    },
    eth_cost() {
      let longCost = this.price.eth.cex * 2.32 * 2.5 * 0.6
      let shortCost = this.price.eth.cex * 2 * 2.5
      return Math.round(longCost + shortCost)
    },
    short_annual() {
      return Math.round(this.gmx_rev / this.gmx_period * 365 / (this.price.eth.cex * 4.35) * 10000) / 100
    },
    eth_future_rev() {
      let now = new Date()
      let end = new Date('2023-09-30T08:00')
      let period = (end - now) / 3600 / 24 / 1000
      return Math.round(this.eth_future_div / this.price.eth.cex / period * 365 * 10000) / 100
    },
    btc_future_rev() {
      let now = new Date()
      let end = new Date('2023-09-30T08:00')
      let period = (end - now) / 3600 / 24 / 1000
      return Math.round(this.btc_future_div / this.price.wbtc.cex / period * 365 * 10000) / 100
    },
  },
}
  
</script>

<style>
  .abpos {
    position: absolute;
    left: 90%;
  }
  .omo {
    display: flex;
    width: 90%;
    margin: -5px 10px auto;
  }
  a.omo {
    text-decoration: none;
  }
  .omo_block {
    width: 50%;
    border: 1px solid black;
    margin: 5px;
    padding: 10px 10px 0 5px;
  }
  .omo_block_c {
    width: 70%;
    border: 1px solid black;
    margin: 5px;
    padding: 10px 20px 0 30px;
  }
  .s_red {
/*    border: 1px solid black;*/
    font-weight: bolder;
    background: #ffcccc;
    text-decoration: none;
  }
  .div_ju {
    font-weight: bolder;
    background: #c1d5e8;
    text-decoration: none;
  }
  .s_grey {
    font-weight: bolder;
    background: #d1d1d1;
    text-decoration: none;
  }
  .div_cr {
    font-weight: bolder;
    background: #badbc3;
    text-decoration: none;
  }
  
  input[type=checkbox] {
    transform: scale(1.5);
    -ms-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    padding: 10px;
  }
  
</style>
