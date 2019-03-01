/*
能发送ajax请求的函数模块
函数的返回值为promise对象
1. 异步得到的不再是reponse, data数据(result)
2. 对请求错误进行了统一的处理, 外面使用时不用再处理错误
 */

import axios from 'axios'

//ajax里边要传3个参数：1、url  2、所有的请求参数组成的一个对象（可能传也可能不传，最好给个默认值）  3、请求方式
export default function ajax(url = '', data = {}, method = 'GET' ) {     //ajax函数,括号里边是设置的默认属性
  return new Promise((resolve, reject) => {         //返回一个Promise对象，括号里传入两个参数
    let promise                                     //返回一个Promise对象，所以把下边的异步请求赋值过去
    if (method === 'GET'){
      //准备url query参数数据
      promise = axios.get(url, {params:data})       //指定所有的query参数
    }else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
      //请求成功，调用resolve
      resolve(response.data)
    }).catch(error => {
      //请求失败，调用reject
      reject(error)
      //统一处理请求错误，外面使用async/await    不使用try来处理错误
      alert('请求出错', error.message)
    })
  })
}
