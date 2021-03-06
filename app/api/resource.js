import Vue from 'vue'
import domain from '../config/domain.js'
import { removeCookie, getCookie } from '../utils/cookieAuth.js'


// 
Vue.http.options.root = domain.API_ROOT;

Vue.http.interceptors.push(
  (request, next) => {
    // mock
    // request.headers['X-YUNHUNI-API-TOKEN'] = getCookie('token')
    next((response) => {
      // 每次请求判断一次401
      if(response.status === 401){
		    window.location= '/#!/auth/login'
      }
    })
  }
)

export const AuthResource = Vue.resource(domain.API_ROOT+'/auth/login')
export const DemandMemberAwait = Vue.resource(domain.API_ROOT+'')

//首页
export const DashboardApp = Vue.resource(domain.API_ROOT+'/dashboard/app/indicant')
export const DashboardMember = Vue.resource(domain.API_ROOT+'/dashboard/member/indicant')
export const DashboardMemberRankList = Vue.resource(domain.API_ROOT+'/dashboard/member/top')
export const DashboardComsume = Vue.resource(domain.API_ROOT+'/dashboard/comsume/indicant')
export const DashboardDuration = Vue.resource(domain.API_ROOT+'/dashboard/duration/indicant')
export const Dashboardstatistic = Vue.resource(domain.API_ROOT+'/dashboard/statistic')
export const ConsumeAnduration = Vue.resource(domain.API_ROOT+'/dashboard/consumeAnduration/statistic')

//租户中心

// 租户列表
export const TenantList = Vue.resource(domain.API_ROOT+'/tenant/tenants/')

// 上月数据指标
export const TenantIndicant = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/indicant')

// 消费额 和 活务量
export const TenantConsumeAnduration = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/consumeAnduration/statistic')

// api 调用次数
export const TenantApiInvoke = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/api_invoke/statistic')

// 会话量
export const TenantSessionStatistic = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/session/statistic')


export const TenantRecharge = Vue.resource(domain.API_ROOT+'/tenant/tenants/recharge')
export const TenantActStatus = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}') 
export const TenantAppList = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/app/list')
export const TenantApps = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/apps')
export const TenantBilling = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/billing') 
export const TenantCert = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/cert')

//

// 租户 会员总览 消费记录
export const TenantConsumes = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/consumes')

// 租户 会员总览 消费记录
export const TenantAuthInfo = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/auth/info')

export const TenantInfo = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/info') 
export const TenantResetPass = Vue.resource(domain.API_ROOT+'/tenant/tenants/{id}/resetPass') 
export const TenantAppDetail = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/apps/{appId}') 
export const TenantFileSize = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/apps/{appId}/file/totalSize')
export const TenantAppPlays = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/apps/{appId}/plays') 
export const TenantAppRecord = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/apps/{appId}/records') 
export const TenantAppDownload = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/apps/{appId}/records/batch/download') 
export const TenantAppDownRecord =  Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/apps/{appId}/records/{record}') 
export const TenantConsumeStatistic = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/consume/statistic') 
export const TenantConsumeMonth = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/consume_month') 
export const TenantRechargeDetail = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/recharges') 
export const TenantRechargeStatistic = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/recharges/statistic') 
export const TenantSwtichs = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/switchs') 
export const TenantSaveSwtichs = Vue.resource(domain.API_ROOT+'/tenant/tenants/{tenant}/switch') 



//消息中心
export const MessageList = Vue.resource(domain.API_ROOT+'/message/list')
export const MessageNew = Vue.resource(domain.API_ROOT+'/message/new')
export const MessageEdit = Vue.resource(domain.API_ROOT+'/message/edit/{id}')
export const MessageDetail = Vue.resource(domain.API_ROOT+'/message/detail/{id}')
export const MessageNum = Vue.resource(domain.API_ROOT+'/message/await/num')


//财务中心
export const InvoiceList = Vue.resource(domain.API_ROOT+'/finance/invoice/{status}/list')
export const InvoiceSendList = Vue.resource(domain.API_ROOT+'/finance/invoice/{status}/send/list')
export const InvoiceDetail = Vue.resource(domain.API_ROOT+'/finance/invoice/detail/{id}')
export const InvoiceEdit = Vue.resource(domain.API_ROOT+'/finance/invoice/edit/{id}')
export const InvoiceNum = Vue.resource(domain.API_ROOT+'/finance/invoice/await/num')

//客服中心
export const ServiceList = Vue.resource(domain.API_ROOT+'/service/list')

//审核中心
export const DemandDetail = Vue.resource(domain.API_ROOT+'/demand/member/detail/{uid}')
export const DemandEdit = Vue.resource(domain.API_ROOT+'/demand/member/edit')
export const DemandList = Vue.resource(domain.API_ROOT+'/demand/member/{authStatus}/list')
export const DemandNum = Vue.resource(domain.API_ROOT+'/demand/await/num')

//放音文件
export const VoiceLlist = Vue.resource(domain.API_ROOT+'/demand/member/voice/{type}/list')
export const VoiceEdit  = Vue.resource(domain.API_ROOT+'/demand/member/voice/edit')
