// pages/devTool/component/src/dialog.js
Component({
  options:{
    multipleSlots: true  // 在组件定义时的选项中启用多slot支持
  },
  /*
   * 组件的属性列表
   * 用于组件自定义设置
  */ 
  properties:{
    // 弹框标题
    title:{
      type: String,// 类型必填，目前可接受的类型包括：String、Number、Boolean、Object、Array、null（表示任意类型)
      value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    content:{
      type: String,
      value: '弹框内容'
    },
    cancleText:{
      type: String,
      value: 'Cancle'
    },
    confirmText:{
      type: String,
      value: 'Sure'
    }
  },
  /*
   * 私有数据，组件的初始数据，用于模板渲染
  */ 
  data:{
    isShow: false
  },
  /*
   * 组件的方法列表
  */ 
  methods:{
    // 公有方法
    showDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    hidenDialog(){
      this.setData({
        isShow: !this.data.isShow
      })
    },
    // 私有方法
    _cancleEvent(){
      this.triggerEvent("cancleEvent")
    }, 
    _confirmEvent(){
      this.triggerEvent("confirmEvent")
    }
  }
})