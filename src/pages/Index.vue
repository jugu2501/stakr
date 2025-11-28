<template>
  <Layout>
  <div class="omo abpos"><RightLink/></div>
  <div class="omo">
    <div class="omo_block">
      <input type="checkbox" v-model=bShowNotice> All&nbsp;&nbsp;
      <input type="checkbox" v-model=bStNotice> St&nbsp;&nbsp;
      <input type="checkbox" v-model=bRateNotice> Rate
      <br><br><br>
      [Usdc]&nbsp; {{usdc_bn}}&nbsp;&nbsp;
      [Wbtc]&nbsp; {{wbtc_bn}}<br>
      [Doge]&nbsp; {{doge_bn}}&nbsp;&nbsp;
      [Like]&nbsp; {{like_info}}<br>
      [Mars]&nbsp; {{mars_info}}&nbsp;&nbsp;
      [Strd]&nbsp; {{strd_info}}<br>
      <br><br>
      <BorrowRate ref="borrow_rate"/>
      <br><br><br>
    </div>
    <div class="omo_block">
      [Mstr] {{rayd_mstr}}&nbsp;&nbsp;{{mstr_div}}%&nbsp;&nbsp;
      <a href="https://bitcointreasuries.net/public-companies/microstrategy" target="_blank">data</a>&nbsp;&nbsp;
      <a href="https://raydium.io/swap/?inputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&outputMint=XsP7xzNPvEHS1m6qfanPUGjNmdnmsLKEoNAnHjdxxyZ" target="_blank">Rayd</a>&nbsp;&nbsp;
      <a href="https://jup.ag/swap?sell=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&buy=XsP7xzNPvEHS1m6qfanPUGjNmdnmsLKEoNAnHjdxxyZ" target="_blank">Jup</a>
      <br><br>
      <SimpPrice ref="wbtc" symbol="WBTC" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      [近] {{price.wbtc.cm}} <a class="s_red">{{btc_cm_div}}%</a>&nbsp;&nbsp;
      [次] {{price.wbtc.cm2}} <a class="s_red">{{btc_cm_div2}}%</a><br>
      <SimpPrice ref="eth" symbol="ETH" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      [近] {{price.eth.cm}} <a class="s_red">{{eth_cm_div}}%</a>&nbsp;&nbsp;
      [次] {{price.eth.cm2}} <a class="s_red">{{eth_cm_div2}}%</a><br><br>
      <SimpPrice ref="atom" symbol="ATOM" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="osmo" symbol="OSMO" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice>
      <SimpPrice ref="dydx" symbol="DYDX" :priceData="price" :base="'cex'" :compare="'osm'"></SimpPrice><br>
      <a href="https://www.coingecko.com/zh-tw/數字貨幣/snek" target="_blank">[SNEK]</a>&nbsp;&nbsp;
      <a href="https://www.coingecko.com/zh-tw/數字貨幣/alienbase" target="_blank">[ALB]</a>&nbsp;&nbsp;
      <a href="https://www.coingecko.com/zh-tw/數字貨幣/unidentified-anomalous-phenomena" target="_blank">[UAP]</a>&nbsp;&nbsp;
      <a href="https://www.coingecko.com/zh-tw/數字貨幣/ai16z" target="_blank">[Ai16z]</a>&nbsp;&nbsp;
      <br><br>
      {{msg}}
      <br><br><br>
    </div>
    <div class="omo_block">
      == Levana funding ========<br>
      [BTC] <a class="s_red">{{btcFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [wBTC] <a class="s_red">{{wbtcFee_le}}%</a><br>
      [Atom] <a class="s_red">{{atomFee_le}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;
      [Osmo] <a class="s_red">{{osmoFee}}%</a><br>
      [ETH] <a class="s_red">{{ethFee_le}}%</a><br>
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
      <input type="checkbox" v-model=bShowStBuy> Buying St<br>
      [stOs] {{osmo_redeem}} ~ osm {{st_osmo}}&nbsp;&nbsp;<a class="div_ju">{{st_osmo_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br>
      [stAt] {{atom_redeem}} ~ osm {{st_atom}}&nbsp;&nbsp;<a class="div_ju">{{st_atom_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br>
      [stDy] {{dydx_redeem}} ~ osm {{st_dydx}}&nbsp;&nbsp;<a class="div_ju">{{st_dydx_div}}%</a>&nbsp;&nbsp;&nbsp;&nbsp;0.3
      <br><br>
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
      msg: '',
      interval: null,
      intervalCheck: null,       
      
      bShowNotice: true,
      bStNotice: true,
      bRateNotice: false,
      bShowStBuy: true,
      
      price: {
        atom: {osm: 1, cex: 1},
        osmo: {osm: 1, cex: 1},
        wbtc: {osm: 1, cex: 1, ft: 1, cm: 1, cm2: 1},
        eth: {osm: 1, cex: 1, ft: 1, cm2: 1},
        dydx: {osm: 1, cex: 1},
      },
      
      sqsData: {},
      
      doge_bn: 1,
      bch_bn: 1,
      wbtc_bn: 1,
      busd_bn: 1,
      usdc_bn: 1,
      arb_bn: 1,
      op_bn: 1,
      rdnt_bn: 1,
      cake_bn: 1,
      gmx_bn: 1,
      aave_bn: 1,
      comp_bn: 1,
      
      rayd_mstr: 1,
      
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
      osmoFee: 1,
      
      like_info: 1,
      mars_info: 1,
      strd_info: 1,
      
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
  },
  watch:{
  },
  methods: {
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
      this.price.dydx.cex =
        Math.round(res.data.find(a=> a.symbol == 'DYDXUSDT').price * 10000) / 10000
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
      let btcObj2 = res.data.find(a => 'BTCUSDT_251226' == a.symbol)
      let btcObj3 = res.data.find(a => 'BTCUSDT_260327' == a.symbol)
      let atomObj = res.data.find(a => 'ATOMUSDT' == a.symbol)
      let ethObj = res.data.find(a => 'ETHUSDT' == a.symbol)
      let ethObj2 = res.data.find(a => 'ETHUSDT_251226' == a.symbol)
      let ethObj3 = res.data.find(a => 'ETHUSDT_260327' == a.symbol)
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
      fetchRaydium() { 
      this.axios
        .get('https://api-v3.raydium.io/mint/price?mints=XsP7xzNPvEHS1m6qfanPUGjNmdnmsLKEoNAnHjdxxyZ')
        .then(this.resRaydium)
        .catch(this.errRes)
    },
    resRaydium(res) {
      let addr = 'XsP7xzNPvEHS1m6qfanPUGjNmdnmsLKEoNAnHjdxxyZ'
      this.rayd_mstr = Math.round(res.data.data[addr] *100) / 100
    },
    fetchLevana() {
      this.axios
        .get('https://querier-mainnet.levana.finance/v1/perps/markets?network=osmosis-mainnet&factory=osmo1ssw6x553kzqher0earlkwlxasfm2stnl3ms3ma2zz4tnajxyyaaqlucd45')
        .then(this.resLevana)
        .catch(this.errRes)
    },
    resLevana(res) {
        let markets = res.data.markets
        let tmpObj = markets.find(a => a.status.base == 'ATOM')
        this.atomFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'OSMO')
        this.osmoFee = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'BTC')
        this.btcFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'wBTC')
        this.wbtcFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
        
        tmpObj = markets.find(a => a.status.base == 'axlETH')
        this.ethFee_le = Math.round(tmpObj.status.short_funding * 1000) / 10
    },
    fetchTest() {
      return
      let data = JSON.stringify({
        "nonce": 1695828436
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: CORS_URL + 'https://api.kraken.com/0/private/Balance',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'API-Key': 'Uc2qW2EePIvJ9ZRGwzfY3PrNQx9YQXg+uktRJSxrlUFUATkzWfkLif8A', 
          'API-Sign': 'hPzBbglw8I80pTCaAduqZV1ztIeY1h6KxAzhw+g2/heu2L4GVTL5QnuxzZL8ETEVUkCdwaV87990T2xBFbhfHg=='
//          'API-Key': 'MRfLvxUn0ADCDlK5vTbwE8xGZ5Uh06SvgTszzn13hxL02An6BuLQHtv6', 
//          'API-Sign': '2Tb5uWrakbamsizp/xehRKl7AjGyjx6bKbPuSn1OS8zJaxhfPKI2PQasiJvZm5GPTqqP0qJDFtwTBWs923UdwQ=='
        },
        data : data
      };
      
      this.axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
//        .get(CORS_URL + 'https://api.seer.coinhall.org/api/coinhall/hallswap/assets/v2?fromChainId=osmosis-1')
//        .then(this.resTest)
//        .catch(this.errRes)
    },
    resTest(res) {
      this.msg = res.data
    },
    fetchStride() {
      this.axios
        .get('https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone')
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
    fetchMain() {
      this.now = new Date()
      
      this.fetchPrior()
      this.fetchRaydium()
      this.fetchLevana()
      
      this.$refs.borrow_rate.fetch()
      
//      this.checkCorsAlive()      
      this.checkCondition()           
    },
    fetchLess() {
      this.fetchPool(833, this.res833)
      this.fetchPool(1136, this.res1136)
      this.fetchPool(1423, this.res1423)
    },
    fetchPrior() {
      this.fetchBinance()
//      this.fetchKraken()
      this.fetchOsmoSqs()
    },
    fetchOsmoSqs() {
      this.axios
        .get('https://sqsprod.osmosis.zone/tokens/prices?base=uosmo,ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4,ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2,ibc/831F0B1BBB1D08A2B75311892876D71565478C532967545476DF4C2D7492E48C,factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc,ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5,ibc/A8CA5EE328FA10C9519DF6057DA1F69682D28F7D0F5CCC7ECB72E3DCA2D157A4,ibc/9989AD6CCA39D1131523DB0617B50F6442081162294B4795E26746292467B525,ibc/B67DF59507B3755EEDE0866C449445BD54B4DA82CCEBA89D775E53DC35664255')  
        .then(this.resOsmoSqs)
        .catch(this.errRes)
    },
    resOsmoSqs(res) {
      this.price.osmo.osm = Math.round(res.data.uosmo['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] * 10000) / 10000
      this.price.atom.osm = Math.round(res.data['ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] *1000) / 1000
      this.price.dydx.osm = Math.round(res.data['ibc/831F0B1BBB1D08A2B75311892876D71565478C532967545476DF4C2D7492E48C']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] *10000) / 10000
      this.price.wbtc.osm = Math.round(res.data['factory/osmo1z0qrq605sjgcqpylfl4aa6s90x738j7m58wyatt0tdzflg2ha26q67k743/wbtc']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'])
      this.price.eth.osm = Math.round(res.data['ibc/EA1D43981D5C9A1C4AAEA9C23BB1D4FA126BA9BC7020A25E0AE4AA841EA25DC5']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] * 10) / 10
      this.strd_info = Math.round(res.data['ibc/A8CA5EE328FA10C9519DF6057DA1F69682D28F7D0F5CCC7ECB72E3DCA2D157A4']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] * 10000) / 10000
      this.like_info = Math.round(res.data['ibc/9989AD6CCA39D1131523DB0617B50F6442081162294B4795E26746292467B525']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] * 1000000)
      this.mars_info = Math.round(res.data['ibc/B67DF59507B3755EEDE0866C449445BD54B4DA82CCEBA89D775E53DC35664255']['ibc/498A0751C798A0D9A389AA3691123DADA57DAA4FE165D5C75894505B876BA6E4'] * 100000)
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
    res1136(res) {
      let sqrt = res.data.pool.current_sqrt_price
      this.st_atom = Math.round(sqrt * sqrt * 10000) / 10000
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
  },
  computed: {
    mstr_div() {
      let curPrice = this.rayd_mstr / 0.00226157
      return Math.round(curPrice / this.price.wbtc.cex * 10000) / 100
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
    cm_period() {
      let end = new Date('2025-12-26T16:00')
      return (end - this.now) / 3600 / 24 / 1000  // days
    },
    cm_period2() {
      let end = new Date('2026-03-27T16:00')
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
