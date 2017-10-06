webpackJsonp([1],{"03K8":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[t.successMessage?s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("Success")]),t._v(" "),s("v-card-text",[s("p",[s("v-icon",{attrs:{medium:""}},[t._v("check_circle")]),t._v(" Registered Successfully")],1),t._v(" "),s("v-btn",{attrs:{success:"",dark:""},on:{click:t.CloseLoginWindow}},[t._v("Ok")])],1)],1):t.loginError?s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("Oops!")]),t._v(" "),s("v-card-text",[s("p",[s("v-icon",{attrs:{medium:""}},[t._v("error_outline")]),t._v(" Login Failed ")],1),t._v(" "),s("v-btn",{attrs:{error:"",dark:""},on:{click:t.ResetLoginError}},[t._v("Try Again")])],1)],1):t.registerForm?s("v-card",[s("div",{staticClass:"loginModalHeader"},[s("v-card-title",{staticClass:"headline"},[t._v("Register")]),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"transparent",staticStyle:{"box-shadow":"none"},attrs:{fab:"",medium:""},on:{click:t.CloseLoginWindow}},[s("v-icon",{attrs:{medium:""}},[t._v("close")])],1)],1),t._v(" "),s("a",{on:{click:function(e){e.preventDefault(),t.uploadPic(e)}}},[s("v-card-media",{staticClass:"modal-image",attrs:{src:t.profileImg,height:"300"}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}})],1)],1)],1),t._v(" "),s("v-card-text",[s("v-form",[s("v-text-field",{attrs:{label:"Name",required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),s("v-text-field",{attrs:{label:"Email",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),s("v-text-field",{attrs:{label:"Password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("v-text-field",{attrs:{label:"Confirm Password",required:""},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}}),t._v(" "),t.confirmPassword&&t.password!=t.confirmPassword?s("p",{staticClass:"red"},[t._v("Passwords don't match")]):t._e(),t._v(" "),t.name&&t.email&&t.password&&t.password==t.confirmPassword?s("v-btn",{attrs:{success:"",dark:""},on:{click:function(e){e.stopPropagation(),t.RegisterUser(e)}}},[t._v("Submit")]):s("v-btn",{attrs:{success:"",dark:"",disabled:""}},[t._v("Submit")]),t._v(" "),s("v-btn",{attrs:{primary:"",dark:""},on:{click:t.BackToLogin}},[t._v("Login")])],1)],1)],1):s("v-card",[s("div",{staticClass:"loginModalHeader"},[s("v-card-title",{staticClass:"headline"},[t._v("Log In")]),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"transparent",staticStyle:{"box-shadow":"none"},attrs:{fab:"",medium:""},on:{click:t.CloseLoginWindow}},[s("v-icon",{attrs:{medium:""}},[t._v("close")])],1)],1),t._v(" "),s("v-card-text",[s("v-form",[s("v-text-field",{attrs:{label:"Email",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),s("v-text-field",{attrs:{name:"login-password",hint:"At least 8 characters",min:"8","append-icon":t.logPassHide?"visibility_off":"visibility","append-icon-cb":function(){return t.logPassHide=!t.logPassHide},type:t.logPassHide?"password":"text",counter:"",label:"Password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),t.email&&t.password?s("v-btn",{attrs:{success:"",dark:""},on:{click:t.Login}},[t._v("Send It!")]):s("v-btn",{attrs:{success:"",dark:"",disabled:""},on:{click:function(e){e.stopPropagation(),t.Login(e)}}},[t._v("Send It!")]),t._v(" "),s("v-btn",{attrs:{primary:"",dark:""},on:{click:t.ShowRegister}},[t._v("Register")])],1)],1)],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},"4JUm":function(t,e,s){"use strict";e.a={name:"mykeeps",data:function(){return{activeKeep:{},msg:"Welcome to Your Vue.js App",dialog:!1}},methods:{}}},"5qdy":function(t,e){},"6sfi":function(t,e){},Azn2:function(t,e,s){"use strict";function a(t){s("iqX0")}var i=s("4JUm"),o=s("SEwr"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-5f2808ba",null);e.a=c.exports},E45W:function(t,e){},EcoP:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("v-layout",{attrs:{row:""}},[s("v-flex",{staticClass:"vault-title-block",attrs:{xs12:""}},[s("h2",[t._v(t._s(t.activeVault.name))])])],1),t._v(" "),s("v-container",{staticClass:"transparent",attrs:{fluid:"","grid-list-md":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[t._l(t.vaultKeeps,function(e){return s("v-flex",t._b({key:e.title},"v-flex",(a={},a.xs4=!0,a),!1),[s("v-card",[s("v-card-media",{attrs:{src:e.imgUrl,height:"200px"},on:{click:function(s){s.stopPropagation(),t.expandKeep(e)}}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}},[s("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[s("span",{staticClass:"headline white--text",domProps:{textContent:t._s(e.title)}})])],1)],1)],1),t._v(" "),s("v-card-actions",{staticClass:"white"},[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("favorite")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("bookmark")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("share")])],1)],1),t._v(" "),s("v-card-text",[s("span",{staticClass:"white--text",domProps:{textContent:t._s(e.description)}})]),t._v(" "),s("v-flex",[s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("remove_red_eye")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(e.views.length)}}),t._v(" "),s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("bookmark")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(e.saves)}})],1)],1)],1);var a}),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",width:"80%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("v-card-media",{staticClass:"modal-image",attrs:{src:t.activeKeep.imgUrl}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}},[s("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[s("span",{staticClass:"headline white--text",domProps:{textContent:t._s(t.activeKeep.title)}})])],1)],1)],1),t._v(" "),s("v-card-actions",{staticClass:"white"},[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("favorite")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("bookmark")])],1),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("share")])],1)],1),t._v(" "),s("v-card-text",[s("span",{staticClass:"white--text",domProps:{textContent:t._s(t.activeKeep.description)}})]),t._v(" "),s("v-flex",[s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("remove_red_eye")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(t.activeKeep.views)}}),t._v(" "),s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("bookmark")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(t.activeKeep.saves)}})],1)],1)],1)],2)],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},Fs8J:function(t,e,s){"use strict";e.a={name:"home",data:function(){return{msg:"Welcome to Your Vue.js App",dialog:!1,showSaveMenu:!1,selectedVault:null}},methods:{expandKeep:function(t){this.dialog=!0,this.$store.dispatch("SetActiveKeep",t),this.$store.dispatch("AddView",t)},ShowSaveKeepMenu:function(){this.dialog=!1,this.showSaveMenu=!0},SaveKeep:function(){this.$store.dispatch("SaveActiveKeep",this.selectedVault._id),this.showSaveMenu=!1,this.dialog=!1},CloseSuccessMessage:function(){this.$store.commit("SetSaveKeepSuccess",!1)}},computed:{results:function(){return this.$store.state.results},activeKeep:function(){return this.$store.state.activeKeep},loggedIn:function(){return this.$store.state.loggedIn},vaults:function(){return this.$store.state.vaults},saveKeepSuccess:function(){return this.$store.state.saveKeepSuccess}},mounted:function(){this.$store.dispatch("GetKeeps"),this.$store.dispatch("getAuth")}}},I4t6:function(t,e,s){"use strict";e.a={name:"login",data:function(){return{name:null,email:null,password:null,logPassHide:!0,confirmPassword:null,successMessage:!1,profileImg:"//res.cloudinary.com/keepr/image/upload/v1507162512/GenericUser_jvtsds.png"}},methods:{Login:function(){var t=this,e={email:this.email,password:this.password};this.$store.dispatch("Login",e).then(function(){console.log("this is the user object:"),console.log(t.user),t.user.name&&t.CloseLoginWindow(),t.failMessage=!0})},uploadPic:function(){var t=this;cloudinary.openUploadWidget({cloud_name:"keepr",upload_preset:"l97fez81"},function(e,s){t.profileImg=s[0].url})},RegisterUser:function(){if(this.password==this.confirmPassword){var t={name:this.name,email:this.email,password:this.password,profileImg:this.profileImg};this.$store.dispatch("Register",t),this.successMessage=!0}},CloseLoginWindow:function(){this.$store.dispatch("SetLoginWindow",!1)},BackToLogin:function(){this.$store.dispatch("SetRegisterForm",!1),this.$store.dispatch("SetLoginWindow",!0)},ShowRegister:function(){this.$store.dispatch("SetRegisterForm",!0),this.$store.dispatch("SetLoginWindow",!0)},ResetLoginError:function(){this.$store.dispatch("ResetLoginError")}},computed:{loggedIn:function(){return this.$store.state.loggedIn},user:function(){return this.$store.state.user},loginError:function(){return this.$store.state.loginError},registerForm:function(){return this.$store.state.registerForm}}}},IcnI:function(t,e,s){"use strict";var a=s("7+uW"),i=s("NYxO"),o=s("7t+N"),n=(s.n(o),s("mtWM")),r=s.n(n),c=s("YaEn"),l=!window.location.host.includes("localhost"),d=l?"//awesome-keepr.herokuapp.com/":"//localhost:3000/";a.a.use(i.a);var u=r.a.create({baseURL:d+"api/",timeout:1e4,withCredentials:!0}),v=r.a.create({baseURL:d,timeout:4e4,withCredentials:!0}),p=new i.a.Store({state:{user:{},vaults:[],loggedIn:!1,results:[],vaultKeeps:[],loginWindow:!1,registerForm:!1,loginError:!1,error:{},activeVault:{},activeKeep:{views:[]},saveKeepSuccess:!1},mutations:{setDefaultState:function(t){},SetLoginWindow:function(t,e){t.loginWindow=e},SetRegisterForm:function(t,e){t.registerForm=e},setLoggedIn:function(t,e){t.loggedIn=e},SetLoginError:function(t,e){t.loginError=e},setUser:function(t,e){t.user=e},setVaults:function(t,e){t.vaults=e},setVaultKeeps:function(t,e){t.vaultKeeps=e},setResults:function(t,e){var s=3;e.forEach(function(t){t.flex=s%3==0?12:6,s++}),t.results=e},clearVaultKeeps:function(t){t.vaultKeeps=[]},setActiveVault:function(t,e){t.activeVault=e},setActiveKeep:function(t,e){t.activeKeep=e},handleError:function(t,e){t.error=e},SetSaveKeepSuccess:function(t,e){t.saveKeepSuccess=e}},actions:{SetLoginWindow:function(t,e){var s=t.commit;t.dispatch;s("SetLoginWindow",e)},SetRegisterForm:function(t,e){var s=t.commit;t.dispatch;s("SetRegisterForm",e)},ResetLoginError:function(t){var e=t.commit;t.dispatch;e("SetLoginError",!1)},Register:function(t,e){var s=t.commit,a=t.dispatch;v.post("register",e).then(function(t){console.log("user created successfully"),s("setLoggedIn",!0),a("getAuth"),a("AddVault",{name:"My Keeps",description:"A home for all of your uploaded keeps"})}).catch(function(t){console.log("your post request to make a new user failed. Here is the error:\n"+t)})},Login:function(t,e){var s=t.commit,a=t.dispatch;v.post("login",e).then(function(t){if(console.log("made it back from login. Here is the response:"),console.log(t),t.error)return console.log("Login failed at server"),void s("SetLoginError",!0);s("setLoggedIn",!0),s("setUser",t.data.data),s("SetLoginWindow",!1),a("GetVaults")})},Logout:function(t){var e=t.commit,s=t.dispatch;v.delete("logout").then(function(t){s("getAuth"),e("setDefaultState")})},GetVaults:function(t){var e=t.commit;t.dispatch;u("my-vaults").then(function(t){console.log(t.data.data),e("setVaults",t.data.data)})},AddVault:function(t,e){var s=(t.commit,t.dispatch);u.post("vaults",e).then(function(t){if(console.log("AddVault post request complete with the following response:"),console.log(t),t.error)return console.log("something went wrong with your post vault route");console.log("vault added successfully"),s("GetVaults")})},GetKeeps:function(t){var e=t.commit;t.dispatch;u("keeps").then(function(t){e("setResults",t.data.data)})},AddKeep:function(t,e){var s=(t.commit,t.dispatch),a={name:e.name,description:e.description,imgUrl:e.imgUrl,tags:e.tags,private:e.private,vault:e.vault};u.post("keeps",a).then(function(t){if(console.log(t),t.error)return console.log("something went wrong with your post keep route");console.log("Keep saved!"),console.log(t),e.id=t.data.data._id,e.creatorId=t.data.data.creatorId,s("SaveKeep",e),s("GetKeeps"),s("GetVaults")})},AddView:function(t,e){var s=(t.commit,t.dispatch);u.put("/keeps/"+e._id+"/view").then(function(t){s("GetKeeps")})},SaveKeep:function(t,e){var s=(t.commit,t.dispatch);u.put("vaults/"+e.vault+"/keeps/"+e.id+"/save").then(function(t){console.log(e.name+"successfully added to vault: "+e.vault),e.creatorId==p.state.user._id.toString()&&s("SaveToDevault",e),s("GetVaults")}).catch(function(t){console.log(t)})},SaveActiveKeep:function(t,e){var s=t.commit,a=t.dispatch;u.put("vaults/"+e+"/keeps/"+p.state.activeKeep._id+"/save").then(function(t){console.log(keep.name+"successfully added to vault: "+keep.vault),s("SetSaveKeepSuccess",!0),a("GetVaults")}).catch(function(t){console.log(t)})},SaveToDevault:function(t,e){t.commit,t.dispatch;e.vault=p.state.vaults[0]._id,u.put("vaults/"+e.vault+"/keeps/"+e.id+"/save").then(function(t){console.log(e.name+"successfully added keep to the default vault")}).catch(function(t){console.log(t)})},GetVault:function(t,e){var s=t.commit,a=t.dispatch;u("vaults/"+e).then(function(t){s("setActiveVault",t.data.data),a("GetVaultKeeps",t.data.data)})},GetVaultKeeps:function(t,e){var s=t.commit,a=(t.dispatch,e.keeps);u.post("vaultkeeps",a).then(function(t){console.log(t.data.keeps),s("setVaultKeeps",t.data.keeps)}).catch(function(t){console.log(t.message)})},clearActiveVault:function(t){var e=t.commit;t.dispatch;e("setActiveVault",{})},SetActiveKeep:function(t,e){var s=t.commit;t.dispatch;s("setActiveKeep",e)},getAuth:function(t){var e=t.commit,s=t.dispatch;v("authenticate").then(function(t){if(console.log("authenticated. Here is the response:"),console.log(t),t.data.error)return console.log("no session found"),e("setLoggedIn",!1),c.a.push("/");e("setUser",t.data.data),e("setLoggedIn",!0),s("GetVaults"),s("GetKeeps"),c.a.push("/")}).catch(function(t){e("handleError",t),c.a.push("/")})}}});e.a=p},ItxA:function(t,e,s){"use strict";e.a={name:"vaults",data:function(){return{activeKeep:{},msg:"Welcome to Your Vue.js App",vaultForm:!1,vaultTitle:null,vaultDescription:null}},mounted:function(){},methods:{sendVault:function(){var t=this,e={name:this.vaultTitle,description:this.vaultDescription};this.$store.dispatch("AddVault",e).then(function(){t.vaultForm=!1})}},computed:{vaults:function(){return this.$store.state.vaults}}}},K31e:function(t,e,s){"use strict";function a(t){s("6sfi")}var i=s("I4t6"),o=s("03K8"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-5834f181",null);e.a=c.exports},M93x:function(t,e,s){"use strict";function a(t){s("VgHx")}var i=s("xJD8"),o=s("p2LV"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-0ced6bc0",null);e.a=c.exports},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i=s("3EgV"),o=s.n(i),n=s("tLfa"),r=(s.n(n),s("M93x")),c=s("YaEn"),l=s("IcnI");a.a.use(o.a),a.a.config.productionTip=!1,a.a.mixin({methods:{signedIn:function(){}}}),new a.a({el:"#app",router:c.a,store:l.a,template:"<App/>",components:{App:r.a}})},OMmu:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"profile"},[t._v("\n    This is the profile page\n")])},i=[],o={render:a,staticRenderFns:i};e.a=o},RcId:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login"},[t.successMessage?s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("Success")]),t._v(" "),s("v-card-text",[s("p",[s("v-icon",{attrs:{medium:""}},[t._v("check_circle")]),t._v(" Registered Successfully")],1),t._v(" "),s("v-btn",{attrs:{success:"",dark:""},on:{click:t.CloseLoginWindow}},[t._v("Ok")])],1)],1):t.loginError?s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("Oops!")]),t._v(" "),s("v-card-text",[s("p",[s("v-icon",{attrs:{medium:""}},[t._v("error_outline")]),t._v(" Login Failed ")],1),t._v(" "),s("v-btn",{attrs:{error:"",dark:""},on:{click:t.ResetLoginError}},[t._v("Try Again")])],1)],1):t.registerForm?s("v-card",[s("div",{staticClass:"loginModalHeader"},[s("v-card-title",{staticClass:"headline"},[t._v("Register")]),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"transparent",staticStyle:{"box-shadow":"none"},attrs:{fab:"",medium:""},on:{click:t.CloseLoginWindow}},[s("v-icon",{attrs:{medium:""}},[t._v("close")])],1)],1),t._v(" "),s("a",{on:{click:function(e){e.preventDefault(),t.uploadPic(e)}}},[s("v-card-media",{staticClass:"modal-image",attrs:{src:t.profileImg,height:"300"}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}})],1)],1)],1),t._v(" "),s("v-card-text",[s("v-form",[s("v-text-field",{attrs:{label:"Name",required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),t._v(" "),s("v-text-field",{attrs:{label:"Email",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),s("v-text-field",{attrs:{label:"Password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("v-text-field",{attrs:{label:"Confirm Password",required:""},model:{value:t.confirmPassword,callback:function(e){t.confirmPassword=e},expression:"confirmPassword"}}),t._v(" "),t.confirmPassword&&t.password!=t.confirmPassword?s("p",{staticClass:"red"},[t._v("Passwords don't match")]):t._e(),t._v(" "),t.name&&t.email&&t.password&&t.password==t.confirmPassword?s("v-btn",{attrs:{success:"",dark:""},on:{click:function(e){e.stopPropagation(),t.RegisterUser(e)}}},[t._v("Submit")]):s("v-btn",{attrs:{success:"",dark:"",disabled:""}},[t._v("Submit")]),t._v(" "),s("v-btn",{attrs:{primary:"",dark:""},on:{click:t.BackToLogin}},[t._v("Login")])],1)],1)],1):s("v-card",[s("div",{staticClass:"loginModalHeader"},[s("v-card-title",{staticClass:"headline"},[t._v("Log In")]),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{staticClass:"transparent",staticStyle:{"box-shadow":"none"},attrs:{fab:"",medium:""},on:{click:t.CloseLoginWindow}},[s("v-icon",{attrs:{medium:""}},[t._v("close")])],1)],1),t._v(" "),s("v-card-text",[s("v-form",[s("v-text-field",{attrs:{label:"Email",required:""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t._v(" "),s("v-text-field",{attrs:{name:"login-password",hint:"At least 8 characters",min:"8","append-icon":t.logPassHide?"visibility_off":"visibility","append-icon-cb":function(){return t.logPassHide=!t.logPassHide},type:t.logPassHide?"password":"text",counter:"",label:"Password",required:""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),t.email&&t.password?s("v-btn",{attrs:{success:"",dark:""},on:{click:t.Login}},[t._v("Send It!")]):s("v-btn",{attrs:{success:"",dark:"",disabled:""},on:{click:function(e){e.stopPropagation(),t.Login(e)}}},[t._v("Send It!")]),t._v(" "),s("v-btn",{attrs:{primary:"",dark:""},on:{click:t.ShowRegister}},[t._v("Register")])],1)],1)],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},SEwr:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"mykeeps"},[t._v("\n    This is the MyKeeps page\n")])},i=[],o={render:a,staticRenderFns:i};e.a=o},Uhhc:function(t,e){},VgHx:function(t,e){},XbrT:function(t,e,s){"use strict";function a(t){s("5qdy")}var i=s("tClW"),o=s("EcoP"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-53e570ac",null);e.a=c.exports},YaEn:function(t,e,s){"use strict";var a=s("7+uW"),i=s("/ocq"),o=s("lO7g"),n=s("xJsL"),r=s("o9cx"),c=s("gW9K"),l=s("Azn2"),d=s("XbrT");a.a.use(i.a),e.a=new i.a({routes:[{path:"/",name:"Home",component:o.a},{path:"/login",name:"Login",component:n.a},{path:"/profile",name:"Profile",component:r.a},{path:"/vaults",name:"Vaults",component:c.a},{path:"/mykeeps",name:"MyKeeps",component:l.a},{path:"/vaults/:vaultId",name:"Vault",component:d.a}]})},a45v:function(t,e){},gW9K:function(t,e,s){"use strict";function a(t){s("E45W")}var i=s("ItxA"),o=s("wTEb"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-2171628e",null);e.a=c.exports},him6:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"home"},[s("v-container",{staticClass:"transparent",attrs:{fluid:"","grid-list-md":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[t._l(t.results,function(e){return s("v-flex",t._b({key:e.name},"v-flex",(a={},a["xs"+e.flex]=!0,a),!1),[s("v-card",[s("v-card-media",{attrs:{src:e.imgUrl,height:"200px"},on:{click:function(s){s.stopPropagation(),t.expandKeep(e)}}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}},[s("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[s("span",{staticClass:"headline white--text",domProps:{textContent:t._s(e.name)}})])],1)],1)],1),t._v(" "),s("v-card-actions",{staticClass:"white"},[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("share")])],1)],1),t._v(" "),s("v-card-text",[s("span",{staticClass:"white--text",domProps:{textContent:t._s(e.description)}})]),t._v(" "),s("v-flex",[s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("remove_red_eye")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(e.views.length)}}),t._v(" "),s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("bookmark")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(e.saves)}})],1)],1)],1);var a}),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",width:"80%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("v-card-media",{staticClass:"modal-image",attrs:{src:t.activeKeep.imgUrl}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}},[s("v-flex",{attrs:{xs12:"","align-end":"",flexbox:""}},[s("span",{staticClass:"headline white--text",domProps:{textContent:t._s(t.activeKeep.name)}})])],1)],1)],1),t._v(" "),s("v-card-actions",{staticClass:"white"},[s("v-spacer"),t._v(" "),t.loggedIn?s("v-btn",{attrs:{icon:""},on:{click:function(e){e.stopPropagation(),t.ShowSaveKeepMenu(e)}}},[s("v-icon",{staticClass:"grey--text"},[t._v("bookmark")])],1):t._e(),t._v(" "),s("v-btn",{attrs:{icon:""}},[s("v-icon",{staticClass:"grey--text"},[t._v("share")])],1)],1),t._v(" "),s("v-card-text",[s("span",{staticClass:"white--text",domProps:{textContent:t._s(t.activeKeep.description)}})]),t._v(" "),s("v-flex",[s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("remove_red_eye")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(t.activeKeep.views.length)}}),t._v(" "),s("v-icon",{staticClass:"grey--text bottom-icons"},[t._v("bookmark")]),s("span",{staticClass:"grey--text",domProps:{textContent:t._s(t.activeKeep.saves)}})],1)],1)],1),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",width:"50%"},model:{value:t.showSaveMenu,callback:function(e){t.showSaveMenu=e},expression:"showSaveMenu"}},[s("v-card",[s("v-card-media",{staticClass:"modal-image",attrs:{src:t.activeKeep.imgUrl,height:"300"}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}},[s("span",{staticClass:"headline white--text"},[t._v(t._s(t.activeKeep.name))])])],1)],1),t._v(" "),s("v-card-title",[s("div",{staticClass:"headline"},[t._v("Save keep")])]),t._v(" "),s("v-card-text",[s("div",{staticClass:"white--text",staticStyle:{"margin-bottom":"5rem"}},[t._v(t._s(t.activeKeep.description))]),t._v(" "),s("v-form",[s("v-select",{attrs:{label:"Choose Vault",items:t.vaults,"item-text":"name","item-value":"vault",dark:"",required:""},model:{value:t.selectedVault,callback:function(e){t.selectedVault=e},expression:"selectedVault"}}),t._v(" "),t.selectedVault?s("v-btn",{staticClass:"save-button",attrs:{success:"",dark:""},on:{click:t.SaveKeep}},[t._v("Send It!")]):s("v-btn",{staticClass:"save-button",attrs:{success:"",dark:"",disabled:""},on:{click:t.SaveKeep}},[t._v("Save")])],1)],1)],1)],1),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",persistent:"",width:"50%"},model:{value:t.saveKeepSuccess,callback:function(e){t.saveKeepSuccess=e},expression:"saveKeepSuccess"}},[s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("Success")]),t._v(" "),s("v-card-text",[s("p",[s("v-icon",{attrs:{medium:""}},[t._v("check_circle")]),t._v(" Save Successful")],1),t._v(" "),s("v-btn",{attrs:{success:"",dark:""},on:{click:t.CloseSuccessMessage}},[t._v("Ok")])],1)],1)],1)],2)],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},iqX0:function(t,e){},jkcp:function(t,e){},lO7g:function(t,e,s){"use strict";function a(t){s("a45v")}var i=s("Fs8J"),o=s("him6"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-7958d817",null);e.a=c.exports},"nKb+":function(t,e,s){"use strict";e.a={name:"login",data:function(){return{name:null,email:null,password:null,logPassHide:!0,confirmPassword:null,successMessage:!1,profileImg:"//res.cloudinary.com/keepr/image/upload/v1507162512/GenericUser_jvtsds.png"}},methods:{Login:function(){var t=this,e={email:this.email,password:this.password};this.$store.dispatch("Login",e).then(function(){console.log("this is the user object:"),console.log(t.user),t.user.name&&t.CloseLoginWindow(),t.failMessage=!0})},uploadPic:function(){var t=this;cloudinary.openUploadWidget({cloud_name:"keepr",upload_preset:"l97fez81"},function(e,s){t.profileImg=s[0].url})},RegisterUser:function(){if(this.password==this.confirmPassword){var t={name:this.name,email:this.email,password:this.password,profileImg:this.profileImg};this.$store.dispatch("Register",t),this.successMessage=!0}},CloseLoginWindow:function(){this.$store.dispatch("SetLoginWindow",!1)},BackToLogin:function(){this.$store.dispatch("SetRegisterForm",!1),this.$store.dispatch("SetLoginWindow",!0)},ShowRegister:function(){this.$store.dispatch("SetRegisterForm",!0),this.$store.dispatch("SetLoginWindow",!0)},ResetLoginError:function(){this.$store.dispatch("ResetLoginError")}},computed:{loggedIn:function(){return this.$store.state.loggedIn},user:function(){return this.$store.state.user},loginError:function(){return this.$store.state.loginError},registerForm:function(){return this.$store.state.registerForm}}}},o9cx:function(t,e,s){"use strict";function a(t){s("jkcp")}var i=s("yoF/"),o=s("OMmu"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-7d5513a1",null);e.a=c.exports},p2LV:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{attrs:{dark:""}},[t.loggedIn?s("v-navigation-drawer",{attrs:{persistent:"","enable-resize-watcher":""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[s("v-list",[s("router-link",{staticClass:"sidebar-header",attrs:{to:{name:"Profile"}}},[s("img",{staticClass:"img-circle img-responsive sidebar-profile-image",attrs:{src:t.user.profileImg}}),t._v(" "),s("h5",{staticClass:"sidebar-text",staticStyle:{"margin-right":"10px"}},[t._v(t._s(t.user.name))])]),t._v(" "),s("router-link",{attrs:{to:{name:"Home"}}},[s("v-list-tile",{staticClass:"sidebar-tile"},[s("v-list-tile-action",[s("v-icon",{staticClass:"sidebar-icon"},[t._v("explore")])],1),t._v(" "),s("v-list-tile-content",{staticClass:"sidebar-text-parent"},[s("v-list-tile-title",{staticClass:"sidebar-text"},[t._v("explore")])],1)],1)],1),t._v(" "),s("router-link",{attrs:{to:{name:"Vaults"}}},[s("v-list-tile",{staticClass:"sidebar-tile"},[s("v-list-tile-action",[s("v-icon",{staticClass:"sidebar-icon"},[t._v("fa-archive")])],1),t._v(" "),s("v-list-tile-content",{staticClass:"sidebar-text-parent"},[s("v-list-tile-title",{staticClass:"sidebar-text"},[t._v("Vaults")])],1)],1)],1),t._v(" "),s("router-link",{attrs:{to:{name:"MyKeeps"}}},[s("v-list-tile",{staticClass:"sidebar-tile"},[s("v-list-tile-action",[s("v-icon",{staticClass:"sidebar-icon"},[t._v("fingerprint")])],1),t._v(" "),s("v-list-tile-content",{staticClass:"sidebar-text-parent"},[s("v-list-tile-title",{staticClass:"sidebar-text"},[t._v("My Keeps")])],1)],1)],1)],1)],1):t._e(),t._v(" "),s("v-toolbar",{attrs:{fixed:""}},[t.loggedIn?s("v-toolbar-side-icon",{attrs:{dark:""},on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}):t._e(),t._v(" "),s("img",{staticStyle:{"max-height":"70px"},attrs:{src:"http://res.cloudinary.com/dvh7zccln/image/upload/v1506964113/powerline_k_ready_qjmbox.png",alt:""}}),t._v(" "),s("v-toolbar-title",{staticStyle:{"margin-left":"-15px"},domProps:{textContent:t._s(t.title)}}),t._v(" "),s("v-spacer"),t._v(" "),t.loggedIn?t._e():s("v-btn",{attrs:{primary:"",dark:""},on:{click:function(e){e.stopPropagation(),t.OpenRegisterWindow(e)}}},[t._v("Register")]),t._v(" "),t.loggedIn?t._e():s("v-btn",{staticClass:"transparent",staticStyle:{"box-shadow":"none","margin-right":"1.5rem"},attrs:{fab:"",dark:"",medium:""},on:{click:function(e){e.stopPropagation(),t.OpenLoginWindow(e)}}},[s("v-icon",[t._v("fa-sign-in")])],1),t._v(" "),t.loggedIn?s("router-link",{attrs:{to:{name:"Profile"}}},[s("div",{attrs:{id:"user-identifier"}},[s("p",{attrs:{id:"user-name-display"}},[t._v(t._s(t.user.name))]),t._v(" "),s("v-icon",[t._v("fa-user")])],1)]):t._e(),t._v(" "),t.loggedIn?s("v-btn",{staticClass:"transparent",staticStyle:{"box-shadow":"none"},attrs:{fab:"",dark:"",medium:""},on:{click:function(e){e.stopPropagation(),t.dialog=!0}}},[s("v-icon",[t._v("add_circle")])],1):t._e(),t._v(" "),t.loggedIn?s("v-btn",{staticClass:"red",staticStyle:{"margin-right":"15px"},attrs:{fab:"",dark:"",small:""},on:{click:t.Logout}},[s("v-icon",{attrs:{dark:""}},[t._v("fa-sign-out")])],1):t._e()],1),t._v(" "),s("main",[s("v-container",{attrs:{fluid:""}},[s("v-slide-y-transition",{attrs:{mode:"out-in"}},[s("router-view")],1)],1)],1),t._v(" "),s("v-footer",[s("span",[t._v("© 2017")])]),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",width:"50%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("a",{on:{click:function(e){e.preventDefault(),t.openCloud(e)}}},[s("v-card-media",{staticClass:"modal-image",attrs:{src:t.src,height:"300"}},[s("v-container",{attrs:{"fill-height":"",fluid:""}},[s("v-layout",{attrs:{"fill-height":""}})],1)],1)],1),t._v(" "),s("v-card-title",[s("div",{staticClass:"headline"},[t._v("Upload a keep")])]),t._v(" "),s("v-card-text",[s("v-form",[s("v-select",{attrs:{label:"Choose Vault",items:t.vaults,"item-text":"name","item-value":"vault",dark:"",required:""},model:{value:t.selectedVault,callback:function(e){t.selectedVault=e},expression:"selectedVault"}}),t._v(" "),s("v-text-field",{attrs:{label:"Keep Title",required:""},model:{value:t.keepTitle,callback:function(e){t.keepTitle=e},expression:"keepTitle"}}),t._v(" "),s("v-text-field",{attrs:{label:"Description",required:""},model:{value:t.keepDescription,callback:function(e){t.keepDescription=e},expression:"keepDescription"}}),t._v(" "),s("v-text-field",{attrs:{label:"Tags (comma separated, no spaces)"},model:{value:t.keepTags,callback:function(e){t.keepTags=e},expression:"keepTags"}}),t._v(" "),s("v-switch",{attrs:{label:"Private Keep"},model:{value:t.private,callback:function(e){t.private=e},expression:"private"}}),t._v(" "),t.selectedVault&&t.keepTitle&&t.keepDescription?s("v-btn",{attrs:{success:"",dark:""},on:{click:t.sendKeep}},[t._v("Send It!")]):s("v-btn",{attrs:{success:"",dark:"",disabled:""},on:{click:t.sendKeep}},[t._v("Send It!")])],1)],1)],1)],1),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",persistent:"",width:"50%"},model:{value:t.loginWindow,callback:function(e){t.loginWindow=e},expression:"loginWindow"}},[s("login")],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},tClW:function(t,e,s){"use strict";e.a={name:"home",data:function(){return{activeKeep:{},msg:"Welcome to Your Vue.js App",dialog:!1}},methods:{expandKeep:function(t){this.activeKeep=t,this.dialog=!0}},computed:{vaultKeeps:function(){return this.$store.state.vaultKeeps},activeVault:function(){return this.$store.state.activeVault}},beforeMount:function(){this.$store.dispatch("clearActiveVault")},mounted:function(){this.$store.dispatch("GetVault",this.$route.params.vaultId)}}},tLfa:function(t,e){},wTEb:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"vaults"},[s("v-btn",{attrs:{fab:"",primary:"",dark:""},on:{click:function(e){e.stopPropagation(),t.vaultForm=!0}}},[s("v-icon",[t._v("add_to_queue")])],1),t._v(" "),0==t.vaults.length?s("div",{staticClass:"announcement"},[s("h4",[t._v("No vaults yet. Add one now")])]):t._e(),t._v(" "),s("v-container",{staticClass:"transparent",staticStyle:{"min-height":"0"},attrs:{fluid:"","grid-list-md":""}},[s("v-layout",{attrs:{row:"",wrap:""}},t._l(t.vaults,function(e){return s("v-flex",t._b({key:e.title},"v-flex",(a={},a.xs12=!0,a),!1),[s("router-link",{attrs:{to:"/vaults/"+e._id}},[s("v-card",{staticClass:"white--text"},[s("v-container",{attrs:{fluid:"","grid-list-md":""}},[s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs2:""}},[s("v-card-media",{attrs:{src:"//res.cloudinary.com/keepr/image/upload/v1507214035/design-vault_rgrq5i.png",height:"125px",contain:""}})],1),t._v(" "),s("v-flex",{staticClass:"vault-text",attrs:{xs7:""}},[s("div",[s("div",{staticClass:"headline"},[t._v(t._s(e.name))]),t._v(" "),s("div",[t._v(t._s(e.description))])])])],1)],1)],1)],1)],1);var a}))],1),t._v(" "),s("v-dialog",{attrs:{lazy:"",absolute:"",width:"50%"},model:{value:t.vaultForm,callback:function(e){t.vaultForm=e},expression:"vaultForm"}},[s("v-card",[s("v-card-title",{staticClass:"headline"},[t._v("New Vault")]),t._v(" "),s("v-card-text",[s("v-form",[s("v-text-field",{attrs:{label:"Vault Name",required:""},model:{value:t.vaultTitle,callback:function(e){t.vaultTitle=e},expression:"vaultTitle"}}),t._v(" "),s("v-text-field",{attrs:{label:"Description",required:""},model:{value:t.vaultDescription,callback:function(e){t.vaultDescription=e},expression:"vaultDescription"}}),t._v(" "),t.vaultTitle&&t.vaultDescription?s("v-btn",{attrs:{success:"",dark:""},on:{click:t.sendVault}},[t._v("Add")]):s("v-btn",{attrs:{success:"",dark:"",disabled:""},on:{click:t.sendVault}},[t._v("Add")])],1)],1)],1)],1)],1)},i=[],o={render:a,staticRenderFns:i};e.a=o},xJD8:function(t,e,s){"use strict";var a=s("K31e");e.a={data:function(){return{drawer:!1,items:[{icon:"bubble_chart",title:"Inspire"}],title:"eepr",dialog:!1,keepTitle:null,keepDescription:null,keepTags:null,src:"//res.cloudinary.com/keepr/image/upload/v1507065886/placeholder_uanfhh.jpg",selectedVault:null,private:!1}},components:{Login:a.a},mounted:function(){this.$store.dispatch("getAuth"),this.$store.loggedIn&&this.$store.dispatch("GetVaults")},computed:{loggedIn:function(){return this.$store.state.loggedIn},vaults:function(){return this.$store.state.vaults},loginWindow:function(){return this.$store.state.loginWindow},user:function(){return this.$store.state.user}},methods:{OpenLoginWindow:function(){this.$store.dispatch("SetLoginWindow",!0)},OpenRegisterWindow:function(){this.$store.dispatch("SetLoginWindow",!0),this.$store.dispatch("SetRegisterForm",!0)},CloseLoginWindow:function(){this.$store.dispatch("SetLoginWindow",!1),this.$store.dispatch("SetRegisterForm",!1)},openCloud:function(){var t=this;cloudinary.openUploadWidget({cloud_name:"keepr",upload_preset:"zaloay8g"},function(e,s){t.src=s[0].url})},sendKeep:function(){var t={name:this.keepTitle,description:this.keepDescription,imgUrl:this.src,tags:this.keepTags.split(","),private:this.private,vault:this.selectedVault._id};console.log("logging from App.vue sendKeep() method:\n"+t),this.$store.dispatch("AddKeep",t),this.dialog=!1,this.keepTitle=null,this.keepDescription=null,this.src="//res.cloudinary.com/keepr/image/upload/v1507065886/placeholder_uanfhh.jpg",this.keepTags=null,this.private=!1,this.selectedVault=null},Logout:function(){this.$store.dispatch("Logout")}}}},xJsL:function(t,e,s){"use strict";function a(t){s("Uhhc")}var i=s("nKb+"),o=s("RcId"),n=s("VU/8"),r=a,c=n(i.a,o.a,r,"data-v-60b1dd3e",null);e.a=c.exports},"yoF/":function(t,e,s){"use strict";e.a={name:"profile",data:function(){return{activeKeep:{},msg:"Welcome to Your Vue.js App",dialog:!1}},methods:{}}}},["NHnr"]);
//# sourceMappingURL=app.063393be8ae6cff7aa3e.js.map