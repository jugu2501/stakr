<template>
  <Layout>
  <div class="omo abpos"><RightLink/></div>
  <div class="omo">
    <div class="omo_block">
      <input type="checkbox" v-model=bShowNotice> All&nbsp;&nbsp;
      <input type="checkbox" v-model=bStNotice> St&nbsp;&nbsp;
      <input type="checkbox" v-model=bRateNotice> Rate
      <input type="checkbox" v-model=bUpdateMaxDc> MxDc<br>
      == Cex-Usdc ======== <br>
      Bn: {{usdc_bn}}/{{busd_bn}}&nbsp;&nbsp; 
<!--      Max: {{dcdt_mx}}&nbsp;&nbsp;<br>-->
      <br>
      [TWD]&nbsp; {{usdt_mx}}&nbsp;&nbsp;<input v-model=usdc_mx style="width:80px">&nbsp;&nbsp;dc: {{usdc_mx_div}}
      <br><br>
      <BorrowRate ref="borrow_rate"/>
      <br><br><br>
    </div>
    <div class="omo_block">
      <SimpPrice ref="wbtc" symbol="WBTC" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      [近] {{price.wbtc.cm}} <a class="s_red">{{btc_cm_div}}%</a>&nbsp;&nbsp;
      [次] {{price.wbtc.cm2}} <a class="s_red">{{btc_cm_div2}}%</a><br>
      <SimpPrice ref="eth" symbol="ETH" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      [近] {{price.eth.cm}} <a class="s_red">{{eth_cm_div}}%</a>&nbsp;&nbsp;
      [次] {{price.eth.cm2}} <a class="s_red">{{eth_cm_div2}}%</a><br><br>
      <SimpPrice ref="atom" symbol="ATOM" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="osmo" symbol="OSMO" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      [Dydx]&nbsp;{{dydx_bn}} ~ osm {{dydx_info}} <a class="div_ju">{{dydx_div}}%</a>&nbsp;&nbsp;0.4<br>
      [Strd]&nbsp;{{strd_kr}} ~ osm {{strd_info}} <a class="div_ju">{{strd_div}}%</a>&nbsp;&nbsp;0.6<br><br>
      [<a href="https://www.coingecko.com/zh-tw/數字貨幣/radiant-capital" target="_blank">Rdnt</a>]&nbsp; {{rdnt_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Bnb]&nbsp; {{price.bnb.cex}}
      <br>
      [Doge]&nbsp; {{doge_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Bch]&nbsp; {{bch_bn}}
      <br>
      [Arb]&nbsp; {{arb_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Op]&nbsp; {{op_bn}}
      <br>
      [Gmx]&nbsp; {{gmx_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Dydx]&nbsp; {{dydx_bn}}
      <br>
      [Aave]&nbsp; {{aave_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Comp]&nbsp; {{comp_bn}}&nbsp;&nbsp;&nbsp;&nbsp;
      <br>
      [Mars]&nbsp; {{mars_info}}&nbsp;&nbsp;&nbsp;&nbsp;
      [Like]&nbsp; {{like_info}}
      <br><br>
      <input type="checkbox" v-model=bShowStBuy> Buying St&nbsp;&nbsp;
      &nbsp;&nbsp;<a @click="showPosDetail()">[+]</a><br>
      <div v-show="bShowPosDetail" class="bg_grey">
        &nbsp;&nbsp;&nbsp;&nbsp;{{pos1221.upper}}/{{pos1221.lower}}&nbsp;&nbsp;
        {{pos1221.period}}h<br>
        <b>[1136]</b> {{pos1136.upper}}/{{pos1136.lower}}&nbsp;&nbsp;
        {{pos1136.period}}h&nbsp;&nbsp;&nbsp;${{pos1136.value}}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;估年收 {{annual_1136}}&nbsp;&nbsp;
        apr {{apr_1136}}% + st {{apr_1136_st}}%
      </div>
      [stOs] {{osmo_redeem}} ~ osm {{st_osmo}}&nbsp;&nbsp;<a :href="genLink(833)" target="_blank" class="div_ju">{{st_osmo_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br>
      [stAt] {{atom_redeem}} ~ osm {{st_atom}}&nbsp;&nbsp;<a :href="genLink(1136)" target="_blank" class="div_ju">{{st_atom_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br>
      [stDy] {{dydx_redeem}} ~ osm {{st_dydx}}&nbsp;&nbsp;<a :href="genLink(1136)" target="_blank" class="div_ju">{{st_dydx_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br><br>
<!--
      == Position ========&nbsp;&nbsp;<input v-model=pos1221.reward style="width:60px"><br>
      <input type="checkbox" v-model=bHavePos>&nbsp;&nbsp;<b>[1221]</b>&nbsp;&nbsp;估年收 {{annual_1221}}&nbsp;&nbsp;apr {{apr_1221}}%
      &nbsp;&nbsp;<a @click="showPosDetail()">[+]</a><br>
      <div v-show="bShowPosDetail" class="bg_grey">
        &nbsp;&nbsp;&nbsp;&nbsp;{{pos1221.upper}}/{{pos1221.lower}}&nbsp;&nbsp;
        {{pos1221.period}}h<br>
        <b>[1136]</b> {{pos1136.upper}}/{{pos1136.lower}}&nbsp;&nbsp;
        {{pos1136.period}}h&nbsp;&nbsp;&nbsp;${{pos1136.value}}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;估年收 {{annual_1136}}&nbsp;&nbsp;
        apr {{apr_1136}}% + st {{apr_1136_st}}%<br>
        <b>[當期]</b> {{current_rev.period}}h<br>
        &nbsp;&nbsp;&nbsp;&nbsp;pos: {{current_rev.posOsmo}}o + {{current_rev.posUsd}}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;現金: {{current_rev.nowOsmo}}o + {{current_rev.nowUsd}}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;幣安: {{current_rev.bn_osmo}}o + {{current_rev.bn_usd}}
        <br><br>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;當期 {{current_1221}}&nbsp;&nbsp;&nbsp;估年收 {{current_annual}} &nbsp;&nbsp;&nbsp;apr {{apr_current}}%<br>
      &nbsp;&nbsp;&nbsp;&nbsp;NT<a class="div_ju">{{total_annual2}}萬</a>&nbsp;&nbsp;總年收 {{total_annual}} &nbsp;&nbsp;&nbsp;apr {{apr_total}}%
      <br><br>
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
      <br>
-->
      <br><br><br>
    </div>
    <div class="omo_block">
      == Levana funding ========<br>
      [Atom] <a class="s_red">{{atomFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [st] <a class="s_red">{{stFee}}%</a><br>
      [Osmo] <a class="s_red">{{osmoFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [st] <a class="s_red">{{stOsmoFee}}%</a><br>
      [BTC] <a class="s_red">{{btcFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [wBTC] <a class="s_red">{{wbtcFee_le}}%</a><br>
      [ETH] <a class="s_red">{{ethFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [DYX] <a class="s_red">{{dyxFee_le}}%</a><br>
      [SOL] <a class="s_red">{{solFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [DOGE] <a class="s_red">{{dogeFee_le}}%</a><br>
      [AVAX] <a class="s_red">{{avaxFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [LINK] <a class="s_red">{{linkFee_le}}%</a><br>
<!--      [TIA] <a class="s_red">{{tiaFee_le}}%</a><br>-->
      <br>
      == Binance funding ========<br>
      [BTC] <a class="s_red">{{btcFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [ETH] <a class="s_red">{{ethFee}}%</a><br>
      [ATOM] <a class="s_red">{{atomFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [DYX] <a class="s_red">{{dydxFee}}%</a><br>
      [BNB] <a class="s_red">{{bnbFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [DOGE] <a class="s_red">{{dogeFee}}%</a><br>
      [LTC] <a class="s_red">{{ltcFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [BCH] <a class="s_red">{{bchFee}}%</a><br>
      [ARB] <a class="s_red">{{arbFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [AVAX] <a class="s_red">{{avaxFee}}%</a><br>
      [SOL] <a class="s_red">{{solFee}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [LINK] <a class="s_red">{{linkFee}}%</a><br>
      <br>
      {{msg}}
      <div v-for="fund in fundArr">
        {{fund.symbol}}: {{fund.rate}}%
      </div>
      <br><br><br>
    </div>
  </div> 
  </Layout>
</template>

<script>
import SimpPrice from "@/components/SimpPrice";
import RightLink from "@/components/RightLink";
import BorrowRate from "@/components/BorrowRate";
  
const CORS_URL = 'http://localhost:8088/'

export default {
  data () {
    return {
      now: '',
      msg: 0,
      interval: null,
      intervalCheck: null,       
      
      bShowNotice: true,
      bStNotice: true,
      bRateNotice: false,
      bUpdateMaxDc: true,
      bShowStBuy: true,
      bShowPosDetail: false,
      bHavePos: false,
      
      price: {
        atom: {osm: 1, ju: 1, kv: 1, cex: 1},
        osmo: {osm: 1, ju: 1, cex: 1},
        wbtc: {osm: 1, cex: 1, ft: 1, cm: 1, cm2: 1},
        eth: {osm: 1, cex: 1, ft: 1, cm2: 1},
        bnb: {osm: 1, cex: 1},
      },
      
      current_rev: {  // 本期收益計算
        start: '2023-11-14T18:00', period: 1,
        initOsmo: 6677.6, initUsd: 17485, deposit: -11440, // 還債2820@ar-aave, 買1428.7Doge, 進出買3639.2Doge, 買3552.1Btc
        nowOsmo: 0, nowUsd: 0, posOsmo: 0, posUsd: 0,
        bn_osmo: 3000, bn_usd: 2826.3, fi_osmo: 0, fi_usd: -2001,
      },
      pos1221: {
        period: 1, value: 10000, reward: 0, lower: 1, upper: 1,
      },
      pos1136: {
        end: '2023-11-10T19:30', period: 1, reward: 32.5,
        value: 1, stValue: 1, atomAmt: 1, stAmt: 1, lower: 1, upper: 1,
      },
      contract_atom: 0, // le: 0atm
      collateral_le: 7.93, // st-atom
      fee_le: 0, //usd 前期已支付=42
      fund_le: 0, //usd 前期已有172.33
      fee_osmo_le: -140, // 攤提一半
      fund_osmo_le: 696, //usd 前期已有253.1
      
      doge_bn: 1,
      bch_bn: 1,
      wbtc_bn: 1,
      busd_bn: 1,
      usdc_bn: 1,
      arb_bn: 1,
      op_bn: 1,
      dydx_bn: 1,
      rdnt_bn: 1,
      cake_bn: 1,
      gmx_bn: 1,
      aave_bn: 1,
      comp_bn: 1,
      
      strd_kr: 1,
      
      atomFee: 1,
      btcFee: 1,
      ethFee: 1,
      dydxFee: 1,
      bnbFee: 1,
      bchFee: 1,
      arbFee: 1,
      avaxFee: 1,
      dogeFee: 1,
      ltcFee: 1,
      solFee: 1,
      linkFee: 1,
      
      atomFee_le: 1,
      btcFee_le: 1,
      wbtcFee_le: 1,
      ethFee_le: 1,
      tiaFee_le: 1,
      dyxFee_le: 1,
      solFee_le: 1,
      linkFee_le: 1,
      avaxFee_le: 1,
      dogeFee_le: 1,
      osmoFee: 1,
      stFee: 1,
      stOsmoFee: 1,
      
      usdc_mx: 1,
      usdt_mx: 1,
      dcdt_mx: 1,
      
      like_info: 1,
      mars_info: 1,
      strd_info: 1,
      dydx_info: 1,
      
      calc_fee: 0.01,
      calc_liq: 1,
      calc_vol: 1,
      calc_7d_fee: 1,
      
      st_atom: 1,  // 1136
      st_osmo: 1,  // 833
      st_dydx: 1,  // 1423
      
      atom_redeem: 1,
      osmo_redeem: 1,
      dydx_redeem: 1,
      
      fundArr: [],
    }
  },
  components: {
    SimpPrice,
    RightLink,
    BorrowRate
  },
  mounted: function() {
    if(!process.isClient){
      return
    }
    this.fetchMain()
    this.fetchLess()
    this.fetchStride()
    this.interval = setInterval(this.fetchMain, 60000)
    this.interval = setInterval(this.fetchLess, 300000)
    
    this.fetchTest()
    
    // fetch pos 1136
//    this.axios
//      .get('https://api-osmosis-chain.imperator.co/cl/v1/position/create/osmo1m33zxjmdudyusrwx8yry5kkunhc780947g8akg')
//      .then(this.resPos2)
//      .catch(this.errRes)
  },
  watch:{
    bHavePos() {
      this.fetchPos()      
    },
  },
  methods: {
    genLink(poolID) {
      return "https://app.osmosis.zone/pool/" + poolID
    },
    notice(txt) {
      let notification = new Notification('chance!!', {body: txt})
    },
    updateCurrentRev() {      
      let start = new Date(this.current_rev.start)
      this.current_rev.period = Math.round((this.now - start) / 3600) / 1000
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
      if(this.bHavePos && (this.price.osmo.osm > this.pos1221.upper ||
         this.price.osmo.osm < this.pos1221.lower)) {
        this.notice('Watch OSMO LP!!', 567)
      } 
      if(this.bRateNotice && (this.atomFee < 0 || this.usdcRate > 3)) {
        this.notice('Watch funding rate!!', 567)
      }
      if(this.bRateNotice && (this.bchFee > 0.009)) {
        this.notice('Watch bch rate!!', 567)
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
        Math.round(res.data.find(a=> a.symbol == 'DOGEUSDT').price * 100000)
      this.bch_bn =
        Math.round(res.data.find(a=> a.symbol == 'BCHUSDT').price * 100) / 100
      this.wbtc_bn =
        Math.round(res.data.find(a=> a.symbol == 'WBTCBTC').price * 10000)
      this.busd_bn =
        Math.round(res.data.find(a=> a.symbol == 'BUSDUSDT').price * 10000)
      this.usdc_bn = 
        Math.round(res.data.find(a=> a.symbol == 'USDCUSDT').price * 10000)
      this.arb_bn =
        Math.round(res.data.find(a=> a.symbol == 'ARBUSDT').price * 1000) / 1000
      this.op_bn =
        Math.round(res.data.find(a=> a.symbol == 'OPUSDT').price * 1000) / 1000
      this.dydx_bn =
        Math.round(res.data.find(a=> a.symbol == 'DYDXUSDT').price * 10000) / 10000
      this.rdnt_bn =
        Math.round(res.data.find(a=> a.symbol == 'RDNTUSDT').price * 10000) / 10000
      this.cake_bn =
        Math.round(res.data.find(a=> a.symbol == 'CAKEUSDT').price * 1000) / 1000
      this.gmx_bn =
        Math.round(res.data.find(a=> a.symbol == 'GMXUSDT').price * 1000) / 1000
      this.aave_bn =
        Math.round(res.data.find(a=> a.symbol == 'AAVEUSDT').price * 100) / 100
      this.comp_bn =
        Math.round(res.data.find(a=> a.symbol == 'COMPUSDT').price * 1000) / 1000  
    },
    resAtomFee(res) {
      let btcObj = res.data.find(a => 'BTCUSDT' == a.symbol)
      let btcObj2 = res.data.find(a => 'BTCUSDT_241227' == a.symbol)
      let btcObj3 = res.data.find(a => 'BTCUSDT_250328' == a.symbol)
      let atomObj = res.data.find(a => 'ATOMUSDT' == a.symbol)
      let ethObj = res.data.find(a => 'ETHUSDT' == a.symbol)
      let ethObj2 = res.data.find(a => 'ETHUSDT_241227' == a.symbol)
      let ethObj3 = res.data.find(a => 'ETHUSDT_250328' == a.symbol)
      let dydxObj = res.data.find(a => 'DYDXUSDT' == a.symbol)
      let gmxObj = res.data.find(a => 'GMXUSDT' == a.symbol)
      let bnbObj = res.data.find(a => 'BNBUSDT' == a.symbol)
      let bchObj = res.data.find(a => 'BCHUSDT' == a.symbol)
      let arbObj = res.data.find(a => 'ARBUSDT' == a.symbol)
      let avaxObj = res.data.find(a => 'AVAXUSDT' == a.symbol)
      let dogeObj = res.data.find(a => 'DOGEUSDT' == a.symbol)
      let ltcObj = res.data.find(a => 'LTCUSDT' == a.symbol)
      let solObj = res.data.find(a => 'SOLUSDT' == a.symbol)
      let linkObj = res.data.find(a => 'LINKUSDT' == a.symbol)
      this.btcFee = Math.round(btcObj.lastFundingRate * 10000000000) / 100000000
      this.price.wbtc.ft = Math.round(btcObj.markPrice * 10) / 10
      this.price.wbtc.cm = Math.round(btcObj2.markPrice * 10) / 10
      this.price.wbtc.cm2 = Math.round(btcObj3.markPrice * 10) / 10
      this.atomFee = Math.round(atomObj.lastFundingRate * 10000000000) / 100000000
      this.ethFee = Math.round(ethObj.lastFundingRate * 10000000000) / 100000000
      this.price.eth.ft = Math.round(ethObj.markPrice * 10) / 10
      this.price.eth.cm = Math.round(ethObj2.markPrice * 10) / 10
      this.price.eth.cm2 = Math.round(ethObj3.markPrice * 10) / 10
      this.dydxFee = Math.round(dydxObj.lastFundingRate * 10000000000) / 100000000
      this.bnbFee = Math.round(bnbObj.lastFundingRate * 10000000000) / 100000000
      this.bchFee = Math.round(bchObj.lastFundingRate * 10000000000) / 100000000
      this.arbFee = Math.round(arbObj.lastFundingRate * 10000000000) / 100000000
      this.avaxFee = Math.round(avaxObj.lastFundingRate * 10000000000) / 100000000      
      this.dogeFee = Math.round(dogeObj.lastFundingRate * 10000000000) / 100000000
      this.ltcFee = Math.round(ltcObj.lastFundingRate * 10000000000) / 100000000    
      this.solFee = Math.round(solObj.lastFundingRate * 10000000000) / 100000000
      this.linkFee = Math.round(linkObj.lastFundingRate * 10000000000) / 100000000
      this.fundArr = res.data.map(a =>{
        return {
          symbol: String(a.symbol).slice(0, -4),
          rate: Math.round(a.lastFundingRate * 10000000000) / 100000000
        }
      })
      this.fundArr = this.fundArr.filter(a => a.rate > 0.01)
    },
    fetchKraken() { 
      this.axios
        .get('https://api.kraken.com/0/public/Ticker')
        .then(this.resKraken)
        .catch(this.errRes)
    },
    resKraken(res) { 
      this.strd_kr =
        Math.round(res.data.result.STRDUSD.c[0] * 1000) / 1000
    },
    fetchLevana() {
      let month = this.now.getUTCMonth() * 1 + 1
      let query = this.now.getUTCFullYear() + '-' + month + '-' + this.now.getUTCDate()
      
      this.axios
        .get('https://querier-mainnet.levana.finance/v1/perps/markets?network=osmosis-mainnet&factory=osmo1ssw6x553kzqher0earlkwlxasfm2stnl3ms3ma2zz4tnajxyyaaqlucd45')
        .then(this.resLevana)
        .catch(this.errRes)
//      this.axios
//        .get(CORS_URL + 'https://indexer.levana.finance/funding-rates?market=osmo1hd7r733w49wrqnxx3daz4gy7kvdhgwsjwn28wj7msjfk4tde89aqjqhu8x&start_date=' + query + '&end_date=' + query)
    },
    resLevana(res) {
        let markets = res.data.markets
        let tmpObj = markets.find(a => a.status.base == 'ATOM')
        this.atomFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'OSMO')
        this.osmoFee = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'stATOM')
        this.stFee = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'stOSMO')
        this.stOsmoFee = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'BTC')
        this.btcFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'wBTC')
        this.wbtcFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'axlETH')
        this.ethFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'TIA')
        this.tiaFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'DYDX')
        this.dyxFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10   
        
        tmpObj = markets.find(a => a.status.base == 'SOL')
        this.solFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10   
        
        tmpObj = markets.find(a => a.status.base == 'DOGE')
        this.dogeFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10   
        
        tmpObj = markets.find(a => a.status.base == 'AVAX')
        this.avaxFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10   
        
        tmpObj = markets.find(a => a.status.base == 'LINK')
        this.linkFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10      
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
      this.mars_info =
        Math.round(res.data.find(a=> a.symbol == 'MARS').price * 10000) / 10000
      this.strd_info =
        Math.round(res.data.find(a=> a.symbol == 'STRD').price * 1000) / 1000
      this.dydx_info =
        Math.round(res.data.find(a=> a.symbol == 'DYDX').price * 1000) / 1000
    },
    fetchTest() {
      this.axios
        .get(CORS_URL + 'https://api.seer.coinhall.org/api/coinhall/hallswap/assets/v2?fromChainId=osmosis-1')
        .then(this.resTest)
        .catch(this.errRes)
    },
    resTest(res) {
      this.msg = res.data
    },
    fetchStride() {
      this.axios
        .get('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
//        .get(CORS_URL + 'https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
        .then(this.resStride)
        .catch(this.errRes)
    },
    resStride(res) {
      let resArr = res.data.host_zone
      let atomObj = resArr.find(a => a.chain_id == "cosmoshub-4")
      this.atom_redeem = Math.round(atomObj.redemption_rate * 10000) / 10000
//      let osmoObj = resArr.find(a => a.chain_id == "osmosis-1")
//      this.osmo_redeem = Math.round(osmoObj.redemption_rate * 10000) / 10000
      let dydxObj = resArr.find(a => a.chain_id == "dydx-mainnet-1")
      this.dydx_redeem = Math.round(dydxObj.redemption_rate * 10000) / 10000
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
    fetchBalance() {
      this.axios
        .get('https://lcd.osmosis.zone/cosmos/bank/v1beta1/balances/osmo1e7fcfaxpjlyf3h5qdpcr2qp0v5pctrqdkp2jl6')
        .then(this.resBalance)
        .catch(this.errRes)
    },
    resBalance(res) {
      let usdcObj =
          res.data.balances.find(a => 'ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4' == a.denom)
      let axlUsdcObj =
          res.data.balances.find(a => 'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858' == a.denom)
      let osmoObj = res.data.balances.find(a => 'uosmo' == a.denom)
      
      let nowUsd = usdcObj ? usdcObj.amount * 1 : 0
      nowUsd += axlUsdcObj ? axlUsdcObj.amount * 1 : 0
      this.current_rev.nowUsd = Math.round(nowUsd / 100000) / 10
      let nowOsmo = osmoObj ? osmoObj.amount * 1 : 0
      this.current_rev.nowOsmo = Math.round(nowOsmo / 100000) / 10
    },
    fetchPos() {
      this.axios
        .get('https://api-osmosis-chain.imperator.co/cl/v1/position/create/osmo1e7fcfaxpjlyf3h5qdpcr2qp0v5pctrqdkp2jl6')
        .then(this.resPos)
        .catch(this.errRes)
    },
    resPos(res) {
      if(!this.bHavePos) {
        this.current_rev.posUsd = 0
        this.current_rev.posOsmo = 0
        this.updateCurrentRev()
        return
      }
      let tmp = res.data.filter(a => 1221 == a.position.pool_id)
      if(tmp && tmp.length > 0) {
        let start = new Date(tmp[0].tx_time)
        this.pos1221.period = Math.round((this.now - start) / 3600 / 100 - 80) / 10
        this.pos1221.lower = (10000000 + tmp[0].position.lower_tick) / 10000000
        this.pos1221.upper = (10000000 + tmp[0].position.upper_tick) / 10000000
        
        let obj = tmp[0].assets.find(a => 'ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4' == a.denom)
        this.current_rev.posUsd = Math.round(obj.amount / 100000) / 10
        obj = tmp[0].assets.find(a => 'uosmo' == a.denom)
        this.current_rev.posOsmo = Math.round(obj.amount / 100000) / 10
        
        this.updateCurrentRev()
      }
    },
    resPos2(res) {
      let tmp = res.data.filter(a => 1136 == a.position.pool_id)
      if(tmp && tmp.length > 0) {
//        let start = new Date(tmp[0].tx_time)
        let start = new Date('2023-11-01T18:00')
        let end = new Date(this.pos1136.end)
        this.pos1136.period = Math.round((end - start) / 3600 / 100 - 80) / 10
        this.pos1136.value = Math.round(tmp[0].value)
        this.pos1136.lower = (1000000 + tmp[0].position.lower_tick) / 1000000
        this.pos1136.upper = (1000000 + tmp[0].position.upper_tick) / 1000000
        
        let stObj = tmp[0].assets.find(a => 'ibc/C140AFD542AE77BD7DCC83F13FDD8C5E5BB8C4929785E6EC2F4C636F98F17901' == a.denom)
        this.pos1136.stValue = stObj.value * 1
        this.pos1136.stAmt = stObj.amount / 1000000
        let atomObj = tmp[0].assets.find(a => 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2' == a.denom)
        this.pos1136.atomAmt = atomObj.amount / 1000000
      }
    },
    fetchMain() {
      this.now = new Date()
      
      this.fetchPrior()
      
      this.fetchBalance()
      this.fetchPos()
      
      this.fetchLevana()
      this.fetchOsmoInfo()
      this.fetchMax()
      
//      this.checkCorsAlive()      
      this.checkCondition()
           
      this.$refs.borrow_rate.fetch()
    },
    fetchLess() {
      this.fetchPool(833, this.res833)
      this.fetchPool(1136, this.res1136)
      this.fetchPool(1423, this.res1423)
    },
    fetchPrior() {
      this.fetchBinance()
      this.fetchKraken()
      this.fetchPool(1221, this.res1221)
    },
    fetchOsmoAll() {    
      this.fetchPool(1090, this.res1090)  // axl-btc
      this.fetchPool(1134, this.res1134)
      this.fetchPool(1135, this.res1135)
    },
    fetchPool(poolID, funcRes) {
      this.axios
        .get('https://lcd.osmosis.zone/osmosis/gamm/v1beta1/pools/' + poolID)  
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
      
      this.fetchPool(1422, this.res1422)  // dual btc
    },
    res1221(res) {
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
    res1422(res) {
      let sqrt = res.data.pool.current_sqrt_price
      this.price.wbtc.osm = Math.round(this.price.wbtc.osm * sqrt * sqrt * 10) / 10
    },
    res1423(res) {
      let sqrt = res.data.pool.current_sqrt_price
      this.st_dydx = Math.round(sqrt * sqrt * 10000) / 10000
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
    showPosDetail() {
      this.bShowPosDetail = !this.bShowPosDetail
    },
  },
  computed: {
    dydx_div() {
      return this.calDiv(this.dydx_info, this.dydx_bn, 0.004)
    },
    strd_div() {
      return this.calDiv(this.strd_info, this.strd_kr, 0.006)
    },
    st_atom_div() {
      let fee = (this.bShowStBuy) ? 0.003 : -0.003
      return this.calDiv(this.st_atom, this.atom_redeem, fee)
    },
    st_osmo_div() {
      let fee = (this.bShowStBuy) ? 0.003 : -0.003
      return this.calDiv(this.st_osmo, this.osmo_redeem, fee)
    },
    st_dydx_div() {
      let fee = (this.bShowStBuy) ? 0.0005 : -0.0005
      return this.calDiv(this.st_dydx, this.dydx_redeem, fee)
    },
    usdc_mx_div() {
      return Math.round(this.usdc_mx * 0.999 / this.usdt_mx * 0.999 * 10000)
    },
    fixed_osmo() {
      return this.price.osmo.osm
//      return this.price.osmo.osm * this.usdc_bn / 10000
    },
    calcRes() {
      let liq = this.calc_liq * 1000000
      if(this.calc_7d_fee > 1) {
        return Math.round(this.calc_7d_fee / liq / 7 * 365 * 10000) / 100
      }
      let rev = this.calc_vol * 1000000 * this.calc_fee / 100 / 7 * 365
      return Math.round(rev / liq * 10000) / 100
    },
    annual_1221() {
      return Math.round(this.pos1221.reward / this.pos1221.period * 24 * 365)
    },
    apr_1221() {
      return Math.round(this.annual_1221 / this.pos1221.value * 100 * 10) / 10
    },
    current_1221() {
      let data = this.current_rev
      let newOsmo =
          data.nowOsmo + data.posOsmo + data.bn_osmo + data.fi_osmo - data.initOsmo
      let newUsd =
          data.nowUsd + data.posUsd + data.bn_usd + data.fi_usd - data.initUsd - data.deposit + this.fund_le + this.fee_le + this.fund_osmo_le + this.fee_osmo_le
      return Math.round((newOsmo * this.fixed_osmo + newUsd) * 10) / 10
    },
    current_annual() {
      return Math.round(this.current_1221 / this.current_rev.period * 24 * 365)
    },
    apr_current() {
      return Math.round(this.current_annual / this.pos1221.value * 100 * 10) / 10
    },
    annual_1136() {
      return Math.round(this.pos1136.reward / this.pos1136.period * 24 * 365)
    },
    apr_1136() {
      return Math.round(this.annual_1136 / this.pos1136.value * 100 * 10) / 10
    },
    apr_1136_st() {
      return Math.round(this.pos1136.stValue / this.pos1136.value * 12.9 * 10) / 10
    },
    total_annual() {
      return Math.round(this.current_annual + this.annual_1136 + this.pos1136.stValue * 0.1774)
    },
    total_annual2() {
      return Math.round(this.total_annual * this.usdt_mx / 1000) / 10
    },
    apr_total() {
      return Math.round(this.total_annual / (this.pos1221.value + this.pos1136.value) * 100 * 10) / 10
    },
    cm_period() {
      let end = new Date('2024-12-27T16:00')
      return (end - this.now) / 3600 / 24 / 1000  // days
    },
    cm_period2() {
      let end = new Date('2025-03-28T16:00')
      return (end - this.now) / 3600 / 24 / 1000  // days
    },
    btc_cm_div() {
      let apr = (this.price.wbtc.cm / this.price.wbtc.ft - 1) / this.cm_period * 365
      return Math.round(apr * 10000) / 100
    },
    btc_cm_div2() {
      let apr = (this.price.wbtc.cm2 / this.price.wbtc.ft - 1) / this.cm_period2 * 365
      return Math.round(apr * 10000) / 100
    },
    eth_cm_div() {
      let apr = (this.price.eth.cm / this.price.eth.ft - 1) / this.cm_period * 365
      return Math.round(apr * 10000) / 100
    },
    eth_cm_div2() {
      let apr = (this.price.eth.cm2 / this.price.eth.ft - 1) / this.cm_period2 * 365
      return Math.round(apr * 10000) / 100
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
  .bg_grey {
    background: #d1d1d1;
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
