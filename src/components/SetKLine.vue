<template>
<div>
  <KLine :id="'eeur'" :data="kdata_cross" :showRenewButt="true"/>
  七日均: {{ma168}}
</div>
</template>

<script>
import KLine from '@/components/KLine'

const CORS_URL = 'http://localhost:8088/'
  
export default {
  data () {
    return {
      interval: {},
      cal_interval: {},
      
      kdata_567: [],      
      kdata_481: [],
      kdata_678: [],
      kdata_cross: [],
      
      ma168: 0,
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
              close: a.close * 10,
              high: a.high * 10,
              low: a.low * 10,
              open: a.open * 10,
              timestamp: a.time * 1000
            }
          })
        }
      }
    },
    fetchPool(pool_id, symbol_1, symbol_2, resFunc) {
      this.axios
        .get(CORS_URL + 'https://api-osmosis.imperator.co/pairs/v1/historical/' + pool_id + '/chart?asset_in=' + symbol_1 + '&asset_out=' + symbol_2 + '&range=15d&asset_type=denom')
        .then(this.genResFunc(pool_id))
        .catch(this.errRes)
    },
    fetchAll() {
      let usdc = 'ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858'
      let eeur = 'ibc/5973C068568365FFF40DEDCF1A1CB7582B6116B731CD31A12231AE25E20B871F'
      this.fetchPool(678, usdc, 'uosmo')
      this.fetchPool(481, 'uosmo', eeur) 
      
      this.cal_interval = setInterval(this.cal, 5000)
    },
    cal() {
      clearInterval(this.cal_interval)
      
      for(let i = 0; i < this.kdata_481.length; i ++) {
        this.kdata_cross[i] =  {
          close: this.kdata_678[i].close * this.kdata_481[i].close,
          high: (this.kdata_678[i].high * this.kdata_481[i].close +
                 this.kdata_678[i].close * this.kdata_481[i].high) / 2,
          low: (this.kdata_678[i].low * this.kdata_481[i].close +
                this.kdata_678[i].close * this.kdata_481[i].low) / 2,
          open: this.kdata_678[i].open * this.kdata_481[i].open,
          timestamp: this.kdata_481[i].timestamp,
        }
      }
      console.log(this.kdata_cross.length)
      this.ma168 = 0
      this.kdata_cross.slice(-168).map(a => {
        this.ma168 += a.close
      })
      this.ma168 = Math.round(this.ma168 / 1.68) / 10000
    },
    errRes(res) {
      console.log('error')
    },
  },
  computed: {
  },
};

</script>

<style>
</style>