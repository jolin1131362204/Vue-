import Vue from 'vue'
import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from '../mutation-types'

import {
  reqInfo,
  reqRatings,
  reqGoods
} from '../../api'

/*
包含n个状态数据的对象
 */
const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [],  //购物车中所有食物food的数组
}

const mutations = {
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [ADD_FOOD_COUNT](state, {food}) {
    if (food.count){
      food.count++
    }else {          //第一次增加
      // food.count = 1  //给food添加一个新的属性，属性名：count,属性值1    新添加的属性没有数据绑定
      // Vue.set(key,string,value)
      Vue.set(food,'count',1)

      //将food添加到购物车中去（cartFoods）
      state.cartFoods.push(food)
    }
  },

  [REDUCE_FOOD_COUNT](state, {food}) {
    if (food.count>0){
      food.count--

      //当food的数量较少为0时，将food在购物车中删除
      //通过food在cartFoods里边的下标来去删除
      if (food.count === 0){
        const index = state.cartFoods.indexOf(food)
        state.cartFoods.splice(index,1)
      }
    }
  },

  [CLEAR_CART](state){
    //将购物车中的food的count设为0
    state.cartFoods.forEach(food => food.count = 0)
    //重置购物车数组
    state.cartFoods = []
  }
}

const actions = {
  // 异步获取商家信息
  async getShopInfo ({commit}) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },


  // 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 更新状态后立即调用回调函数
      typeof callback=== 'function' && callback()
    }
  },

  updateFoodCount({commit},{isAdd,food}){
    if (isAdd){
      commit(ADD_FOOD_COUNT,{food})
    } else {
      commit(REDUCE_FOOD_COUNT,{food})
    }
  },

  clearCart({commit}){
    commit(CLEAR_CART)
  }

}

const getters = {
  //购物车总数量
  totalCount(state){
    return state.cartFoods.reduce((preTotal,item) =>preTotal + item.count ,0)
  },

  //总价格
  totalPrice(state){
    return state.cartFoods.reduce((preTotal,item) =>preTotal + item.count*item.price ,0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
