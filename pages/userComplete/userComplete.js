//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({
  data: {
    sForm:{
      phone:'',
      city:'',
      name:'',    
    },

    mainData:{},
    
  },


  onLoad(){
    const self = this;
    self.userInfoGet();
  },


  userInfoGet(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res)
      self.data.mainData = res;
      self.data.sForm.phone = res.info.data[0].phone;
      self.data.sForm.city = res.info.data[0].city;
      self.data.sForm.name = res.info.data[0].name;
      self.setData({
        web_sForm:self.data.sForm,
      });
      wx.hideLoading();
    };
    api.userInfoGet(postData,callback);
  },


  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    console.log(self.data.sForm);
    self.setData({
      web_sForm:self.data.sForm,
    });  
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },


  userInfoUpdate(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoUpdate(postData,callback);
  },
  

  userInfoAdd(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.data = {};
    postData.data = api.cloneForm(self.data.sForm);
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userInfoAdd(postData,callback);
  },
  

  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      if(wx.getStorageSync('info').info){
        wx.showLoading();
        self.userInfoUpdate();
      }else{
        wx.showLoading();
        self.userInfoAdd();
      }  
    }else{
      api.showToast('请补全信息','fail');
    };
  },

  
})
