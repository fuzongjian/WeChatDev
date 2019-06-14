// pages/devTool/weRun/index.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const werun = require('../../../utils/werun.js');
const util = require('../../../utils/util.js');
import * as echarts from '../../../ec-canvas/echarts.js';
var barec = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    steps: [],
    tabs: ["Echart展示", "表格展示"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    stepsNum: [],
    ec:{
      onInit: function(canvas,width,height){
        barec = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barec);
        return barec;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载...',
    })
    // 设置标题
    wx.setNavigationBarTitle({
      title: '微信运动',
      success: ()=>{},
      fail: (err)=>{ console.log(err.errMsg) }
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    // 登录拿到code
    wx.login({
      success: (res)=>{
        // 拿到运动的encryptedData数据
        wx.getWeRunData({
          success: (re)=>{
            let body = {
              code: res.code,
              encryptedData: re.encryptedData,
              iv: re.iv
            }
            let url = 'http://192.168.50.199:1110/wx/auth'
            wx.request({
              url: url,
              method: 'POST',
              data: body,
              success: (res)=>{
                let datajson = res.data.stepInfoList
                var array = [],numbers = []
                for(var i = 0; i < datajson.length; i ++){
                  var item = datajson[i]
                  var time = item.timestamp
                  time = util.beautifyTime(time * 1000)
                  var obj = {
                    time: time,
                    step: item.step
                  }
                  array.push(obj)
                  numbers.push(item.step)
                }
                this.setData({ 
                  steps: array,
                  stepsNum: numbers  
                })
                this.updateChart()
                wx.hideLoading()
              },
              fail: (err)=>{
                console.log(err.errMsg)
              }
            })
          }
        })
        console.log(res)
      },
      fail: (err)=>{

      }
    })
  },
  tabClick (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  updateChart(){
    console.log('updateChart')
    var option = {
      color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: '步数',
        type: 'line',
        smooth: true,
        data: this.data.stepsNum
      }]
    };
    console.log(this.data.stepsNum)
    barec.setOption(option);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})