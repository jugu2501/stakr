<template>
  <Layout>
<!--  <div class="kline"><br><AtomKLine ref="atom_kline"/><PstakeKLine ref="pstake_kline"/><OsmoKLine ref="osmo_kline"/><br></div>-->
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
      Ku: {{usdc_ku}}/{{busd_ku}}&nbsp;&nbsp;
      <br>
      [TWD]&nbsp; {{usdt_mx}}&nbsp;&nbsp;<input v-model=usdc_mx style="width:80px">&nbsp;&nbsp;dc: {{usdc_mx_div}}
      <br><br>
      <CurvePools ref="curve_pools"/>
      [DcRate] p: <a class="div_cr">{{aaveRate.pUsdc}}%</a> ar: <a class="div_cr">{{aaveRate.arUsdc}}%</a> op: <a class="div_cr">{{aaveRate.opUsdc}}%</a><br>
      [DtRate] p: <a class="div_cr">{{aaveRate.pUsdt}}%</a> ar: <a class="div_cr">{{aaveRate.arUsdt}}%</a> op: <a class="div_cr">{{aaveRate.opUsdt}}%</a><br>
      [Eth Rate] p2: <a class="div_cr">{{aaveRate.p2Eth}}%</a> p: <a class="div_cr">{{aaveRate.pEth}}%</a> ar: <a class="div_cr">{{aaveRate.arEth}}%</a><br>
      [ATOM Fee] <a class="s_red">{{atomFee}}%</a><br>
      [ETH Fee] <a class="s_red">{{ethFee}}%</a><br>
      [BNB Fee] <a class="s_red">{{bnbFee}}%</a><br>
<!--      [BCH Fee] <a class="s_red">{{bchFee}}%</a><br>-->
<!--
      [USDC Fee] <a class="div_cr">{{usdcFee}}%</a><br>
      [Ku-USDC Fee] <a class="div_cr">{{usdcFee_ku}}%</a><br>
      [Ku-USDC Fee Pre] <a class="div_cr">{{usdcFeePre_ku}}%</a><br>
      <br>
      [WBTC]&nbsp; {{wbtc_bn}}&nbsp;&nbsp;<input v-model=wbtc_qt style="width:30px">&nbsp;&nbsp;{{wbtc_fee}}%
-->
      <br>
      <input type="checkbox" v-model=bBusdWithdrawNotice>
      Kava 可提 BUSD:&nbsp;&nbsp;<a href="https://explorer.binance.org/address/bnb10zq89008gmedc6rrwzdfukjk94swynd7dl97w8" target="_blank" class="div_cr">{{busdAvailable}}</a><br>
      [<a href="https://www.coingecko.com/zh-tw/數字貨幣/usdx" target="_blank">USDX</a>] <a class="s_red">{{usdx_kava}}</a>&nbsp;&nbsp; 0.4&nbsp;&nbsp;&nbsp;&nbsp;
      [BuRate] <a class="div_cr">{{busd_rate}}%</a>
      <br><br>
      <div v-for="fund in fundArr">
        {{fund.symbol}}: {{fund.rate}}%
      </div>
      <br><br><br>
    </div>
    <div class="omo_block">
      <br>
      [stAt] pre25: {{st_atom_pre}}&nbsp;&nbsp;rdm: {{atom_redeem}}&nbsp;&nbsp;22.11%
      <br>
      &nbsp;osm: {{st_atom}}&nbsp;&nbsp;<a class="s_red">{{st_atom_div}}%</a>&nbsp;&nbsp;<a :href="genLink(803)" target="_blank" class="div_ju">{{st_atom_div2}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;{{calStakeRevenue('atom')}}%
      <br>
      &nbsp;cr: {{st_atom_cr}}&nbsp;&nbsp;<a class="s_red">{{st_atom_cr_div}}%</a>&nbsp;&nbsp;<a :href="genLink(803)" target="_blank" class="div_ju">{{st_atom_cr_div12}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;{{calStakeRevenue('atom_cr')}}%
      <br>
      &nbsp;cr:&nbsp;&nbsp;{{st_atom_cr2}}&nbsp;&nbsp;<a class="s_red">{{st_atom_cr_div21}}%</a>&nbsp;&nbsp;<a :href="genLink(803)" target="_blank" class="div_ju">{{st_atom_cr_div22}}%</a>&nbsp;&nbsp;<a :href="genLink(803)" target="_blank" class="div_cr">{{st_atom_cr_div3}}%</a>
      <br>
      &nbsp;BUY&nbsp;&nbsp;{{should_sell_st_atom_cr}}&nbsp;&nbsp;in&nbsp;&nbsp;{{st_atom_cr_ist_fix}}&nbsp;
<!--      <input v-model=st_cost style="width:50px">&nbsp;&nbsp;&nbsp;-->
      {{calStakeRevenue('atom_cr2')}}%
      <br><br>
      [stAt] {{st_atom}}&nbsp;&nbsp;cr: {{st_atom_cr}}&nbsp;&nbsp;<a :href="genLink(803)" target="_blank" class="div_ju">{{st_dex_div}}%</a>&nbsp;&nbsp;0.3<br>
      [stkAt] {{stk_redeem}}&nbsp;&nbsp;cr: {{stk_atom_cr}}&nbsp;&nbsp;<a :href="genLink(886)" target="_blank" class="s_red">{{stk_atom_cr_div}}%</a>&nbsp;&nbsp;0<br>
      [stkAt] {{stk_atom}}&nbsp;&nbsp;cr: {{stk_atom_cr}}&nbsp;&nbsp;<a :href="genLink(886)" target="_blank" class="div_ju">{{stk_dex_div}}%</a>&nbsp;&nbsp;0.3
      <br><br>
      [stOS] pre25: {{st_osmo_pre}}&nbsp;&nbsp;rdm: {{osmo_redeem}}&nbsp;&nbsp;22.07%<br>
      &nbsp;osm: {{st_osmo}}&nbsp;&nbsp;<a class="s_red">{{st_osmo_div}}%</a>&nbsp;&nbsp;<a :href="genLink(833)" target="_blank" class="div_ju">{{st_osmo_div2}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;{{calStakeRevenue('osmo')}}%
      <br><br>
      [<a href="https://info.osmosis.zone/token/MARS" target="_blank">Mars</a>]&nbsp; {{mars_info}}&nbsp;&nbsp;&nbsp;&nbsp;
      [<a href="https://info.osmosis.zone/token/STRD" target="_blank">Strd</a>]&nbsp; {{strd_info}}
      <br>
      [<a href="https://info.osmosis.zone/token/LIKE" target="_blank">Like</a>]&nbsp; {{like_info}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Ion]&nbsp; {{ion_info}}
    </div>
    <div class="omo_block">
      <SimpPrice ref="wbtc" symbol="WBTC" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="weth" symbol="WETH" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice><br>
      <SimpPrice ref="atom" symbol="ATOM" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="atom" symbol="ATOM" :priceData="price" :base="'osm'" :compare="'cr'"></SimpPrice><br>
      <SimpPrice ref="osmo" symbol="OSMO" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
<!--
      <SimpPrice ref="bnb" symbol="BNB" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="matic" symbol="MATIC" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="kava" symbol="KAVA" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
-->
      <SimpPrice ref="scrt" symbol="SCRT" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="inj" symbol="INJ" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="fet" symbol="FET" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <br>
      [<a href="https://www.coingecko.com/zh-tw/數字貨幣/radiant-capital" target="_blank">Rdnt</a>]&nbsp; {{rdnt_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [<a href="https://www.coingecko.com/zh-tw/數字貨幣/pancakeswap" target="_blank">Cake</a>]&nbsp; {{cake_bn}}
      <br>
      [Doge]&nbsp; {{doge_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Bch]&nbsp; {{bch_bn}}
      <br>
      [Arb]&nbsp; {{arb_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Dydx]&nbsp; {{dydx_bn}}
      <br>
      [Xvs]&nbsp; {{xvs_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Bnb]&nbsp; {{price.bnb.cex}}
      <br><br><br>
    </div>
  </div> 
  </Layout>
</template>

<script>
import SetKLine from "@/components/SetKLine";
import AtomKLine from "@/components/AtomKLine";
import PstakeKLine from "@/components/PstakeKLine";
import OsmoKLine from "@/components/OsmoKLine";
import SimpPrice from "@/components/SimpPrice";
import RightLink from "@/components/RightLink";
import CurvePools from "@/components/CurvePools";
  
const CORS_URL = 'http://localhost:8088/'
  
// basic coin: osmo
// osmo price: binance_ATOM * coingecko_OSMO / coingecko_ATOM

export default {
  data () {
    return {
      msg: 0,
      interval: null,
      intervalCheck: null,       
      
      busdAvailable: 0,
      bShowNotice: true,
      bBusdWithdrawNotice: false,
      bStNotice: true,
      bAxlNotice: false,
      bRateNotice: false,
      bFetchPre25: false,
      bUpdateMaxDc: true,
      
      price: {
        atom: {osm: 1, ju: 1, kv: 1, cex: 1, cr: 1},
        osmo: {osm: 1, ju: 1, cex: 1},
        juno: {osm: 1, ju: 1},
        wbtc: {osm: 1, cex: 1},
        weth: {osm: 1, cex: 1},
        bnb: {osm: 1, cex: 1},
        matic: {osm: 1, cex: 1},
        kava: {osm: 1, kv: 1, cex: 1},
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
      
      atomFee: 1,
      ethFee: 1,
      bnbFee: 1,
      bchFee: 1,
      usdcFee: 1,
      usdcFee_ku: 1,
      usdcFeePre_ku: 1,
      
      usdc_ku: 1,
      busd_ku: 1,
      
      usdc_mx: 1,
      usdt_mx: 1,
      dcdt_mx: 1,
      
      aaveRate: {},
      
      ion_info: 1, 
      like_info: 1,
      mars_info: 1,
      strd_info: 1,
      
      usdx_kava: 1,
      busd_rate: 1,
      
      wbtc_qt: 0.5,
      
      scrt_osm: 1, // 584
      st_atom: 1,  // 803
      st_osmo: 1,  // 833
      stk_atom: 1,  // 886
      
      st_atom_cr: 1,
      st_atom_cr_ist: 1,
      st_atom_pre: 1,
      st_stake_pre: 1,
      st_osmo_pre: 1,
      st_cost: 0,
      stk_atom_cr: 1,
      
      atom_redeem: 1,
      osmo_redeem: 1,
      stk_redeem: 1,
      
      fundArr: [],
    }
  },
  components: {
    SetKLine,
    AtomKLine,
    PstakeKLine,
    OsmoKLine,
    SimpPrice,
    RightLink,
    CurvePools
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
      return "https://frontier.osmosis.zone/pool/" + poolID
    },
    buyWithUsdc(symbol) {
      let sUpper = symbol.toUpperCase()
      return "https://frontier.osmosis.zone/?from=USDC&to=" + sUpper
    },
    sellWithUsdc(symbol) {
      let sUpper = symbol.toUpperCase()
      return "https://frontier.osmosis.zone/?from=" + sUpper + "&to=USDC"
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
      
      if(!this.bFetchPre25) {
        this.fetchPre25()
      }
      
      if(!this.bShowNotice) {
        return
      }
      
      if(this.bBusdWithdrawNotice && this.busdAvailable > 300) {
        this.notice('BUSD added !!', 567)
      }
      
      if(this.bStNotice) {
        if(this.calStakeDiv('atom') < -3.5) {
          this.notice('stATOM go!!', 567)
        }    
        if(this.calStakeDiv('osmo') < -3.5) {
          this.notice('stOSMO go!!', 567)
        }  
      }
      if(Math.abs(this.$refs.wbtc.getDiv('osm', 'cex')) > 2) {
        this.notice('BTC go!!', 567)
      }
      if(Math.abs(this.$refs.osmo.getDiv('osm', 'cex')) > 2) {
        this.notice('OSMO go!!', 567)
      } 
//      if(Math.abs(this.$refs.bnb.getDiv('osm', 'cex')) > 2) {
//        this.notice('BNB go!!', 567)
//      }
//      if(Math.abs(this.$refs.matic.getDiv('osm', 'cex')) > 2) {
//        this.notice('MATIC go!!', 567)
//      } 
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
      this.price.weth.cex =
        Math.round(res.data.find(a=> a.symbol == 'ETHUSDT').price * 10) / 10
      this.price.bnb.cex =
        Math.round(res.data.find(a=> a.symbol == 'BNBUSDT').price * 100) / 100
      this.price.matic.cex =
        Math.round(res.data.find(a=> a.symbol == 'MATICUSDT').price * 10000) / 10000
      this.price.kava.cex =
        Math.round(res.data.find(a=> a.symbol == 'KAVAUSDT').price * 10000)
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
      this.price.inj.cex =
        Math.round(res.data.find(a=> a.symbol == 'INJUSDT').price * 1000) / 1000
      this.price.fet.cex =
        Math.round(res.data.find(a=> a.symbol == 'FETUSDT').price * 10000) / 10000
      this.xvs_bn =
        Math.round(res.data.find(a=> a.symbol == 'XVSUSDT').price * 1000) / 1000
    },
    resAtomFee(res) {
      let atomObj = res.data.find(a => 'ATOMUSDT' == a.symbol)
      let ethObj = res.data.find(a => 'ETHUSDT' == a.symbol)
      let bnbObj = res.data.find(a => 'BNBUSDT' == a.symbol)
      let bchObj = res.data.find(a => 'BCHUSDT' == a.symbol)
      let usdcObj = res.data.find(a => 'USDCUSDT' == a.symbol)
      this.atomFee = Math.round(atomObj.lastFundingRate * 10000000000) / 100000000
      this.ethFee = Math.round(ethObj.lastFundingRate * 10000000000) / 100000000
      this.bnbFee = Math.round(bnbObj.lastFundingRate * 10000000000) / 100000000
      this.bchFee = Math.round(bchObj.lastFundingRate * 10000000000) / 100000000
      this.usdcFee = Math.round(usdcObj.lastFundingRate * 10000000000) / 100000000
      this.fundArr = res.data.map(a =>{
        return {
          symbol: String(a.symbol).slice(0, -4),
          rate: Math.round(a.lastFundingRate * 10000000000) / 100000000
        }
      })
      this.fundArr = this.fundArr.filter(a => a.rate > 0.01)
    },
    fetchKucoin() { 
      this.axios
        .get(CORS_URL + 'https://api.kucoin.com/api/v1/market/allTickers')
        .then(this.resKucoin)
        .catch(this.errRes)
//      this.axios
//        .get(CORS_URL + 'https://api-futures.kucoin.com/api/v1/contracts/active')
//        .then(this.resKucoinFee)
//        .catch(this.errRes)
    },
    resKucoin(res) {
      let usdcObj = res.data.data.ticker.find(a => 'USDC-USDT' == a.symbol)
      let busdcObj = res.data.data.ticker.find(a => 'BUSD-USDT' == a.symbol)
      this.usdc_ku = Math.round(usdcObj.last * 10000) / 1
      this.busd_ku = Math.round(busdcObj.last * 10000) / 1
    },
    resKucoinFee(res) {
      let usdcObj = res.data.data.find(a => 'USDCUSDTM' == a.symbol)
      this.usdcFee_ku = usdcObj.fundingFeeRate
      this.usdcFeePre_ku = usdcObj.predictedFundingFeeRate
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
    fetchKava() {
      this.axios 
        .get('https://api2.kava.io/kava/swap/v1beta1/pools')
        .then(this.resKava)
        .catch(this.errRes)
      this.axios 
        .get('https://api2.kava.io/kava/hard/v1beta1/interest-rate?denom=busd')
        .then(this.resKava2)
        .catch(this.errRes)      
    },
    resKava(res) {
      if(res.status != 200) {
        alert("Fetching kava failed.")
        return
      }
      
      let kavaObj = res.data.pools.find(a => 'ukava:usdx' == a.name)
      let busdObj = res.data.pools.find(a => 'busd:usdx' == a.name)
      let atomObj = res.data.pools.find(a => 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2:usdx' == a.name)
      
      let busd = busdObj.coins[1].amount / busdObj.coins[0].amount
      this.usdx_kava = Math.round(100 / busd)
      this.price.atom.kv = Math.round(
        atomObj.coins[1].amount / atomObj.coins[0].amount / busd * 10) / 1000
      this.price.kava.kv = Math.round(
        kavaObj.coins[1].amount / kavaObj.coins[0].amount / busd * 100)
    },
    resKava2(res) {
      if(res.status != 200) {
        alert("Fetching kava2 failed.")
        return
      }
      this.busd_rate =
        Math.round(res.data.interest_rates[0].supply_interest_rate * 10000) / 100
    },
    fetchCrescent() {
      this.axios
//        .get('https://apigw-v2.crescent.network/pair/info')
        .get('https://apigw-v3.crescent.network/pool/live')
        .then(this.resCrescent)
        .catch(this.errRes)
    },
    resCrescent(res) {
      let usdcObj = res.data.data.find(a => 32 == a.poolId)
      let stObj = res.data.data.find(a => 76 == a.poolId)
      let atomObj = res.data.data.find(a => 19 == a.poolId)
      let twoDcObj = res.data.data.find(a => 21 == a.poolId)
      let istStObj = res.data.data.find(a => 53 == a.poolId)
      let stkObj = res.data.data.find(a => 57 == a.poolId)
      
      if(usdcObj && atomObj) {
        this.price.atom.cr = Math.round(atomObj.poolPrice * 100) / 100
        this.st_atom_cr_ist = Math.round(istStObj.poolPrice * 100) / 100
        this.st_atom_cr = Math.round(stObj.poolPrice * 10000) / 10000
        this.stk_atom_cr = Math.round(stkObj.poolPrice * 10000) / 10000
      }
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
//      let osmoObj = resArr.find(a => a.chain_id == "osmosis-1")
      this.atom_redeem = Math.round(atomObj.redemption_rate * 10000) / 10000
//      this.osmo_redeem = Math.round(osmoObj.redemption_rate * 10000) / 10000
    },
    fetchAave() {
      this.axios
        .get('https://aave-api-v2.aave.com/data/markets-data')
        .then(this.resAave)
        .catch(this.errRes)
    },
    resAave(res) {
      let obj = res.data.reserves.find(
        a => "137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174-0xa97684ead0e402dc232d5a977953df7ecbab3cdb" == a.id)
      this.aaveRate.pUsdc = Math.round(obj.variableBorrowRate * 10000) / 100
      obj = res.data.reserves.find(
        a => "137-0xc2132d05d31c914a87c6611c10748aeb04b58e8f-0xa97684ead0e402dc232d5a977953df7ecbab3cdb" == a.id)
      this.aaveRate.pUsdt = Math.round(obj.variableBorrowRate * 10000) / 100
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
      
      this.fetchKava()
      this.fetchCrescent()
      this.fetchOsmoInfo()
      this.fetchKucoin()
      this.fetchAave()
      this.fetchMax()
      
      this.checkCorsAlive()
      this.checkBusdAvailable()
      
      this.checkCondition()
      
      this.$refs.curve_pools.fetch()
    },
    fetchPrior() {
      this.fetchBinance()
      this.fetchPool(678, this.res678)
    },
    fetchOsmoAll() {      
      this.fetchPool(1, this.res1)
      this.fetchPool(584, this.res584)
      this.fetchPool(681, this.res681)
      this.fetchPool(704, this.res704)
      this.fetchPool(725, this.res725)
      this.fetchPool(730, this.res730)
      this.fetchPool(712, this.res712)
      this.fetchPool(789, this.res789)
      this.fetchPool(803, this.res803)
      this.fetchPool(833, this.res833)
      this.fetchPool(840, this.res840)
      this.fetchPool(886, this.res886)
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
    res1(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.atom.osm = Math.round(b / a * this.fixed_osmo * 1000) / 1000
    },
    res584(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.scrt.osm = Math.round(b / a * this.fixed_osmo * 10000)
    },
    res678(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.osmo.osm = Math.round((a / b) * 10000) / 10000
      
      this.fetchOsmoAll()
    },
    res681(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.fet.osm = Math.round(b / a * this.fixed_osmo * 10000000000000000) / 10000
    },
    res704(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.weth.osm = Math.round(b / a * this.fixed_osmo * 10000000000000) / 10
    },
    res725(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.inj.osm = Math.round(b / a * this.fixed_osmo * 1000000000000000) / 1000
    },
    res730(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.kava.osm = Math.round(b / a * this.fixed_osmo * 10000)
    },
    res789(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.matic.osm = Math.round(b / a * this.fixed_osmo * 10000000000000000) / 10000
    },
    res712(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.wbtc.osm = Math.round(b / a * this.fixed_osmo * 100)
    },
    res803(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.st_atom = Math.round(a / b * 10000) / 10000
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
    res840(res) {
      let a = res.data.pool.pool_assets[0].token.amount
      let b = res.data.pool.pool_assets[1].token.amount
      this.price.bnb.osm = Math.round(b / a * this.fixed_osmo * 100000000000000) / 100
    },
    res886(res) {
      let factor = res.data.pool.scaling_factors
      this.stk_redeem = Math.round(factor[0] / factor[1] * 10000) / 10000
      
      let liq = res.data.pool.pool_liquidity
      let div = ((liq[0].amount / liq[1].amount) - 1) / 27
      this.stk_atom = Math.round((factor[0] / factor[1] + div) * 10000) / 10000
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
    checkBusdAvailable() {
      this.axios
        .get( 'https://dex.binance.org/api/v1/account/bnb10zq89008gmedc6rrwzdfukjk94swynd7dl97w8')
        .then(this.resBusdAvailable)
        .catch(this.resBusdAvailable)
    },
    resBusdAvailable(res) {
      if(res.status != 200) {
//        alert("Busd checking failed.")
        this.busdAvailable = 'check failed.'
        return
      }
      this.busdAvailable = Math.round(res.data.balances[1].free * 10) / 10
    },
    calStakeRevenue(symbol) {
      let rounds = ('osmo' == symbol) ? (365 / 15.5) : (365 / 22.5)
      let revenueRate = this.calStakeDiv(symbol) * -1
      return Math.round(revenueRate * (365 / 22.5) * 100) / 100
    },
    calStakeDiv(symbol) {
      let price = this['st_' + symbol]
      let ratio = 1.00301
      if(symbol == 'atom_cr') {
        symbol = 'atom'
        ratio = 1.0005
      } else if(symbol == 'atom_cr2') {
        symbol = 'atom'
        ratio = 1.0017
      }
      let prediction = this['st_' + symbol + '_pre']
      return Math.round((price * ratio / prediction - 1) * 10000) / 100
    },
    fetchPre25() {
      if(this.$refs && this.$refs.atom_kline && this.$refs.osmo_kline && this.$refs.pstake_kline) {
        let tmp = (this.$refs.atom_kline.cal30 - this.$refs.atom_kline.cal60) * 8 / 3 + this.$refs.atom_kline.cal30
        this.st_atom_pre = Math.max(0, Math.round(tmp * 10000) / 10000)
        
        tmp = (this.$refs.osmo_kline.cal30 - this.$refs.osmo_kline.cal60) *  8 / 3 + this.$refs.osmo_kline.cal30
        this.st_osmo_pre = Math.max(0, Math.round(tmp * 10000) / 10000)
        
        tmp = (this.$refs.pstake_kline.cal30 - this.$refs.pstake_kline.cal60) *  8 / 3 + this.$refs.pstake_kline.cal30
        this.st_pstake_pre = Math.max(0, Math.round(tmp * 10000) / 10000)
        this.bFetchPre25 = true
      }
    },
  },
  computed: {
    wbtc_fee() {      
      // wbtc提現費0.00017, 跨鏈0.00003+gas, 總成本0.0002+5u(gas)
      return Math.round((0.0002 / this.wbtc_qt + (5 / this.wbtc_bn / this.wbtc_qt) + 0.001) * 100000) / 1000
    },
    stk_dex_div() {
      return this.calDiv(this.stk_atom_cr, this.stk_atom, 0.003)
    },
    stk_atom_cr_div() {
      return this.calDiv(this.stk_atom_cr, this.stk_redeem, 0.003)
    },
    st_dex_div() {
      return this.calDiv(this.st_atom_cr, this.st_atom, 0.00302)
    },
    st_atom_div() {
      return this.calDiv(this.st_atom, this.st_atom_pre, 0.003)
    },
    st_atom_div2() {
      return this.calDiv(this.st_atom, this.atom_redeem, 0.003)
    },
    cheap_atom() {
      return this.price.atom.osm
      return Math.min(this.price.atom.osm * 1.002, this.price.atom.cex * 1.001)
    },
    expensive_atom() {
      return this.price.atom.osm
      return Math.max(this.price.atom.osm * 0.998, this.price.atom.cex * 0.999)
    },
    st_atom_cr_ist_fix() {
      return Math.round(this.st_atom_cr_ist * 1.0015 * 100) / 100
    },
    st_atom_cr2() {
      return Math.round(this.st_atom_cr_ist / this.cheap_atom * 10000) / 10000
    },
    st_atom_cr3() {
      return Math.round(this.st_atom_cr_ist / this.expensive_atom * 10000) / 10000
    },
    st_atom_cr_div() {
      return this.calDiv(this.st_atom_cr, this.st_atom_pre, 0.00002)
    },
    st_atom_cr_div12() {
      return this.calDiv(this.st_atom_cr, this.atom_redeem, 0.00002)
    },
    st_atom_cr_div21() {
      return this.calDiv(this.st_atom_cr2, this.st_atom_pre, 0.00002)
    },
    st_atom_cr_div22() {
      return this.calDiv(this.st_atom_cr2, this.atom_redeem, 0.0017)
    },
    st_atom_cr_div3() {
      return this.calDiv(this.st_atom_cr3, this.atom_redeem, 0.0017)
    },
    should_sell_st_atom_cr() {
      return Math.round(25 / this.st_atom_cr3 * 1000) /1000
    },
    st_osmo_div() {
      return this.calDiv(this.st_osmo, this.st_osmo_pre, 0.003)
    },
    st_osmo_div2() {
      return this.calDiv(this.st_osmo, this.osmo_redeem, 0.003)
    },
    usdc_mx_div() {
      return Math.round(this.usdc_mx * 0.999 / this.usdt_mx * 0.999 * 10000)
    },
    fixed_osmo() {
      return this.price.osmo.osm * this.usdc_bn / 10000
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
  
  .kline {
    position: absolute;
    top: 350px;
    left: 360px;
    z-index: 1;
  }
  
  input[type=checkbox] {
    transform: scale(1.5);
    -ms-transform: scale(1.5);
    -webkit-transform: scale(1.5);
    padding: 10px;
  }
  
</style>
