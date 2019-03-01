/*
vuex的actions模块
 */

import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {
  //获取异步地址
  async getAddress({commit,state}){
    //1. 发ajax请求
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    // 2. 成功后, 提交mutation
    if (result.code === 0){
      commit(RECEIVE_ADDRESS, result.data)
    }
  },
  //获取异步地址
  async getCategorys({commit}){
    //1. 发ajax请求
    const result = await reqCategorys()
    // 2. 成功后, 提交mutation
    if (result.code === 0){
      commit(RECEIVE_CATEGORYS, result.data)
    }
  },
  //// 异步获取商家列表的action
  async getShops({commit,state}){
    //1. 发ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 2. 成功后, 提交mutation
    if (result.code === 0){
      commit(RECEIVE_SHOPS, result.data)
    }
  },
}

