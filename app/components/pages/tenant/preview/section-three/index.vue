<template>
    <section class="section-three inline-block admin-padding bg-section-margin admin-border whilebg">
     <div class="flex flex-1 flex-direction-column">
       <div class="flex-1">
         <div class="flex flex-1 section-time-box">
           <!--<a >上个月</a>-->
           <!--<span>2016-08-1</span>-->
           <datetime-picker :uuid="'preview-section-three'" :action="getTenantDuration" :type.sync="date.type" :value.sync="date.value"></datetime-picker>
         </div>
         <chart
					  :uuid="'dashboard-st3-chart'" :type="['line','bar']"
            :title="['话务量','消费额']"
            :ydata1="comsumeduration.session"
            :ydata2="comsumeduration.cost"
            :xtitle="['话务量(分钟)','消费额(元)']"
            :color="[['rgba(246,239,232,0.2)','rgba(251,54,45,0.8)','rgba(251,54,45,0.8)','#FFF','rgba(251,54,45,0.8)','rgba(220,220,220,1)'],
                    ['#ebeecc','rgba(214,235,78,0.8)','rgba(214,235,78,1)','#FFF','rgba(214,235,78,0.1)','rgba(220,220,220,0.1)']]"
         ></chart>
       </div>
     </div>
    </section>
</template>
<script>
  import DATE from '../../../../../utils/date'
  
  export  default {
    components: {
      'chart': require('../../../../ui/chart.vue'),
      'datetime-picker': require('../../../../ui/datetimepicker.vue')
    },
    data(){
      return{
      	date: {
      	  type: 'month',
          value: DATE.todayString('month')
        },
        comsumeduration: {
          session: [],
          cost: []
        },
        
      }
    },
    methods: {
    	getTenantDuration(){
    	  let self = this
    	  let params = {}
        let uid = this.$route.params.uid
        let date = DATE.dateParse(this.date.value)
        
    		params.year = date.year
        params.month = date.month
		    
		    $.get('/tenant/tenants/'+uid+'/consumeAnduration/statistic', params).then((res)=> {
		    	self.comsumeduration = res.data
        })
      }
    },
    ready(){
      this.getTenantDuration()
    }
  }
</script>
<style lang='sass' scoped>
  .section-three{
    width: 100%;
  }
</style>
