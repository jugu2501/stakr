<template>
<div>
  <KLine :id="'osmo'" :data="kdata_833"/>
  七日均: {{cal30}}
</div>
</template>

<script>
import KLine from '@/components/KLine'

const CORS_URL = 'http://localhost:8088/'
  
export default {
  data () {
    return {
      interval: {},      
      kdata_833: [],
      ma30: 0,
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
  },
  methods: {
    genResFunc(pool_id) {
      return (res) => {
        if(res && res.data) {
          this['kdata_' + pool_id] = res.data.map(a => {
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
      let st = 'ibc/D176154B0C63D1F9C6DCFB4F70349EBF2E2B5A87A05902F57A6AE92B863E9AEC'
      this.fetchPool(833, 'uosmo', st)
    },
    errRes(res) {
      console.log('error')
    },
  },
  computed: {
    cal30() {
      this.ma30 = 0
      this.kdata_833.slice(-30).map(a => {
        this.ma30 += a.close
      })
      return Math.round(this.ma30 / 30 * 100) / 10000
    },
    cal60() {
      this.ma60 = 0
      this.kdata_833.slice(-60).map(a => {
        this.ma60 += a.close
      })
      return Math.round(this.ma60 / 60 * 100) / 10000
    },
  },
};

</script>

<style>
</style>