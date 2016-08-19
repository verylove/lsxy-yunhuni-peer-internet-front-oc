var router = require('koa-router')();
var REQUEST = require('request')
var covertKOAURL = require('../utils/coverURLSwaggerToKoa.js')
// var ccap = require('ccap')()

const RedisStore = require("../utils/store.js");
const store = new RedisStore()
const UUID = require('node-uuid')
const fs = require('fs')

const config = require('../config')

// 下面代码还需重构

function request(url, method, data, token) {
	return new Promise((resolve, reject)=>{
		let prefix = config.JAVAAPI
		switch (method) {
			case 'put':
			case 'patch':
			case 'post':
				REQUEST({
					url: prefix + url,
					method: method,
					json: true,
					headers: {
						"content-type": "application/json",
						"X-YUNHUNI-API-TOKEN": token
					},
					body: data
				}, (error, res, body) => {
					resolve(body)
				})
				break
			case 'delete':
			case 'get':
				REQUEST({
					url: prefix + url,
					method: method,
					headers: {
						"X-YUNHUNI-API-TOKEN": token
					},
				}, (error, res, body) => {
					resolve(body)
				})
				break
		}
	})
}

// 生成cookie
router.get('/login', async (ctx, next) => {
	let swaggerData = await request('/auth/login', 'post', {userName: 'user001', password: '123456'})
	ctx.session.token = swaggerData.data.token
	ctx.body = 'ok'
})

router.get('/verCode', async (ctx, next) => {
 	let ary = ccap.get()
	let txt = ary[0].toLowerCase()
	let buf = ary[1]
	ctx.session.verCode=txt
	ctx.type = 'image/png'
	ctx.body = buf
})

// 同步获取 swagger doc, 保存在内在当中
const path = JSON.parse(fs.readFileSync('./doc/swagger.json', 'utf8')).paths

for (let [key, value] of Object.entries(path)) {
  // 登入
	if (key === '/auth/login'){
		router.post(key , async function (ctx, next) {
			let uuid = UUID.v1()
			let data = ctx.request.body
			// if(!ctx.session.verCode || !data.code
			// 	|| ctx.session.verCode.toLowerCase() !== data.code.toLowerCase()){//验证码不匹配
			// 	console.log("验证码不匹配",ctx.session.verCode,data.code);
			// 	ctx.body = 'code error'
			// 	return
			// }
			let swaggerData = await request(key, 'post', data)
			// 登入成功后生成 session cookie
			if(swaggerData.data && swaggerData.data.token){
				ctx.cookies.set(config.COOKIENAME, uuid, {expires: new Date(), maxAge: 30*60*1000, domain: config.COOKIEDOAIM})
				ctx.session.token = swaggerData.data.token
				ctx.body = ' '
				return
			}
			ctx.status = 401
			ctx.body = 'java token fail'
			return
		})
	} else {
		// switch get post put
		// console.log(value)
		for(let method of Object.keys(value)){
			switch (method){
				case 'put':
					router.put(covertKOAURL(key), async(ctx, next) => {
						let token = ctx.session.token
						console.log('token node', token)
						if( token === null ){
							ctx.status = 401
							ctx.body = ' node token null'
							return
						}
						let req_url = ctx.req.url
						let data = ctx.request.body ?  ctx.request.body : {}
						ctx.body = await request(req_url, method, data, token)
					})
					break
				case 'patch':
					router.patch(covertKOAURL(key), async(ctx, next) => {
						let token = ctx.session.token
						console.log('token node', token)
						if( token === null ){
							ctx.status = 401
							ctx.body = ' node token null'
							return
						}
						let req_url = ctx.req.url
						let data = ctx.request.body ?  ctx.request.body : {}
						ctx.body = await request(req_url, method, data, token)
					})
					break
				case 'post':
					router.post(covertKOAURL(key), async(ctx, next) => {
						let token = ctx.session.token
						console.log('token node', token)
						if( token === null ){
							ctx.status = 401
							ctx.body = ' node token null'
							return
						}
						let req_url = ctx.req.url
						let data = ctx.request.body ?  ctx.request.body : {}
						ctx.body = await request(req_url, method, data, token)
					})
					break
				case 'delete':
					router.delete(covertKOAURL(key), async(ctx, next) => {
						let token = ctx.session.token
						console.log('token node', token)
						if( token === null ){
							ctx.status = 401
							ctx.body = ' node token null'
							return
						}
						let req_url = ctx.req.url
						let data = ctx.request.body ?  ctx.request.body : {}
						ctx.body = await request(req_url, method, data, token)
					})
					break
				case 'get':
					router.get(covertKOAURL(key), async(ctx, next) => {
						let token = ctx.session.token
						console.log('token node', token)
						if( !token ){
							ctx.status = 401
							ctx.body = ' node token null'
							return
						}
						let req_url = ctx.req.url
						let data = ctx.request.body ?  ctx.request.body : {}
						ctx.body = await request(req_url, method, data, token)
					})
					break
			}
		}
	}
}

module.exports = router;
