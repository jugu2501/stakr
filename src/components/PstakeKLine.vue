<template>
<div>
  <KLine :id="'pstake'" :data="kdata_886"/>
  月均: {{cal30}}
</div>
</template>

<script>
import KLine from '@/components/KLine'
import {BollingerBands} from 'trading-signals';

const CORS_URL = 'http://localhost:8088/'
  
export default {
  data () {
    return {
      interval: {},      
      kdata_886: [],
      ma30: 0,
      ma60: 0,
      msg: '',
    }
  },
  props: [],
  components: {
    KLine,
  },
  created: function() {
    if(!process.isClient){
      return
    }
    this.fetchAll()
    this.interval = setInterval(this.fetchAll, 420000)
    this.bollObj = new BollingerBands(20, 2)
  },
  methods: {
    genResFunc(pool_id) {
      return (res) => {
        if(res && res.data) {
          this['kdata_' + pool_id] = res.data.map(a => {
            this.bollObj.update(a.close * 100)
            return {
              close: a.close * 100,
              high: a.high * 100,
              low: a.low * 100,
              open: a.open * 100,
              timestamp: a.time * 1000
            }
          })
        }
      }
    },
    fetchPool(pool_id, symbol_1, symbol_2, resFunc) {
      this.axios
        .get(CORS_URL + 'https://api-osmosis.imperator.co/pairs/v1/historical/' + pool_id + '/chart?asset_in=' + symbol_1 + '&asset_out=' + symbol_2 + '&range=26w&asset_type=denom')
        .then(this.genResFunc(pool_id))
        .catch(this.errRes)
    },
    fetchAll() {
      let atom = 'ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2'
      let st = 'ibc/CAA179E40F0266B0B29FB5EAA288FB9212E628822265D4141EBD1C47C3CBFCBC'
      this.fetchPool(886, atom, st)
      // stkAtom
//      let st = 'ibc/CAA179E40F0266B0B29FB5EAA288FB9212E628822265D4141EBD1C47C3CBFCBC'
//      this.fetchPool(886, atom, st)
    },
    errRes(res) {
      console.log('error')
    },
  },
  computed: {
    cal30() {
      this.ma30 = 0
      this.kdata_886.slice(-30).map(a => {
        this.ma30 += a.close
      })
      return Math.round(this.ma30 / 30 * 100) / 10000
    },
    cal60() {
      this.ma60 = 0
      this.kdata_886.slice(-60).map(a => {
        this.ma60 += a.close
      })
      return Math.round(this.ma60 / 60 * 100) / 10000
    },
    getBBand() {
      return this.bollObj.getResult()
    },
  },
};

</script>

<style>
</style>