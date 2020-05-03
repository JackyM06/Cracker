(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-65351850"],{"0f5b":function(t,e,a){"use strict";a.r(e);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return Object.keys(t.model).length>0?a("div",[a("el-tabs",{staticStyle:{background:"rgb(250,250,250)"},attrs:{type:"border-card",lazy:!0}},[a("el-tab-pane",[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-tickets"}),t._v("用户信息")]),a("el-form",{attrs:{"label-width":"80px",model:t.model},nativeOn:{submit:function(e){return e.preventDefault(),t.save(e)}}},[a("el-form-item",{attrs:{label:"用户名称"}},[a("el-input",{staticStyle:{width:"30%","min-width":"200px"},attrs:{maxlength:"20","show-word-limit":""},model:{value:t.model.name,callback:function(e){t.$set(t.model,"name",e)},expression:"model.name"}})],1),a("el-form-item",{attrs:{label:"用户头像"}},[a("img-upload",{attrs:{"img-src":t.model.avatar},on:{success:function(e){return t.model.avatar=e}}})],1),a("el-form-item",{attrs:{label:"所属职位"}},[a("el-input",{staticStyle:{width:"50%","min-width":"200px"},attrs:{maxlength:"20","show-word-limit":""},model:{value:t.model.position,callback:function(e){t.$set(t.model,"position",e)},expression:"model.position"}})],1),a("el-form-item",{attrs:{label:"所在公司"}},[a("el-input",{staticStyle:{width:"70%","min-width":"300px"},attrs:{maxlength:"40","show-word-limit":""},model:{value:t.model.company,callback:function(e){t.$set(t.model,"company",e)},expression:"model.company"}})],1),a("el-form-item",{attrs:{label:"个人简介"}},[a("el-input",{staticClass:"fs-xl",staticStyle:{width:"40%","min-width":"200px"},attrs:{type:"textarea",rows:4,maxlength:"120"},model:{value:t.model.introduction,callback:function(e){t.$set(t.model,"introduction",e)},expression:"model.introduction"}})],1),a("el-form-item",{attrs:{label:"Github"}},[a("el-input",{staticStyle:{width:"50%","min-width":"200px"},attrs:{type:"url",maxlength:"40","show-word-limit":""},model:{value:t.model.link.github,callback:function(e){t.$set(t.model.link,"github",e)},expression:"model.link.github"}})],1),a("el-form-item",{attrs:{label:"Sina"}},[a("el-input",{staticStyle:{width:"50%","min-width":"200px"},attrs:{type:"url",maxlength:"40","show-word-limit":""},model:{value:t.model.link.sina,callback:function(e){t.$set(t.model.link,"sina",e)},expression:"model.link.sina"}})],1),a("el-form-item",{attrs:{label:"个性主页"}},[a("el-input",{staticStyle:{width:"50%","min-width":"200px"},attrs:{type:"url",maxlength:"40","show-word-limit":""},model:{value:t.model.link.self,callback:function(e){t.$set(t.model.link,"self",e)},expression:"model.link.self"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"info",disabled:t.NoUpdate,"native-type":"submit"}},[t._v("保存改动")]),a("el-button",{attrs:{type:"info"},on:{click:function(e){return t.$router.push("/main/user")}}},[t._v("返回")])],1)],1)],1),a("el-tab-pane",[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-s-promotion"}),t._v("作品信息")]),a("gurid",{attrs:{"external-query":{author:t.id},"search-name":"title","list-name":"article","resource-name":"articles",column:[{label:"文章标题",prop:"title",width:"300px"},{label:"分类",prop:"categories"},{label:"访问量",prop:"visits",sort:"custom"}]}})],1),a("el-tab-pane",[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-s-data"}),t._v("粉丝查看("+t._s(t.model.fans_size)+")")]),a("el-table",{attrs:{data:t.model.fans}},[a("el-table-column",{attrs:{label:"用户ID",prop:"_id"}}),a("el-table-column",{attrs:{label:"用户名",prop:"name"}})],1)],1),a("el-tab-pane",[a("span",{attrs:{slot:"label"},slot:"label"},[a("i",{staticClass:"el-icon-s-flag"}),t._v("关注用户("+t._s(t.model.followers_size)+")")]),a("el-table",{attrs:{data:t.model.fans}},[a("el-table-column",{attrs:{label:"用户ID",prop:"_id"}}),a("el-table-column",{attrs:{label:"用户名",prop:"name"}})],1)],1)],1)],1):t._e()},n=[],i=(a("b64b"),a("96cf"),a("1da1")),s=a("f90e"),r=a("6c29"),o={props:{id:String},data:function(){return{model:{},isFull:!1,NoUpdate:!0}},methods:{fetch:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("rest/users/".concat(t.id));case 2:a=e.sent,a.data&&(t.model=a.data,setTimeout((function(){t.NoUpdate=!0}),0));case 4:case"end":return e.stop()}}),e)})))()},save:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.$confirm("是否整改该用户信息?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.put("rest/users/".concat(t.id),t.model);case 2:a=e.sent,a.data?(t.fetch(),t.$notify({title:"整改完成",message:t.$createElement("i",{style:"color: teal"},"根据你的管理员权限，已成功整改该文章！")})):t.$message({type:"error",message:"网络出错!"});case 4:case"end":return e.stop()}}),e)}))));case 1:case"end":return e.stop()}}),e)})))()}},watch:{model:{deep:!0,handler:function(t,e){Object.keys(e).length>0&&(this.NoUpdate=!1)}}},created:function(){this.fetch()},components:{Gurid:s["a"],ImgUpload:r["a"]}},c=o,m=(a("48ae"),a("2877")),u=Object(m["a"])(c,l,n,!1,null,null,null);e["default"]=u.exports},"48ae":function(t,e,a){"use strict";var l=a("f153"),n=a.n(l);n.a},"6c29":function(t,e,a){"use strict";var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-upload",{staticClass:"avatar-uploader",attrs:{headers:t.authHeader,"show-file-list":!1,"before-upload":t.beforeAvatarUpload,action:t.uploadURL,"on-success":function(e){return t.$emit("success",e.url)}}},[t.imgSrc?a("img",{staticClass:"avatar",staticStyle:{width:"100px",height:"100px"},attrs:{src:t.imgSrc}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])},n=[],i=(a("caad"),{props:{imgSrc:String},methods:{beforeAvatarUpload:function(t){var e=["image/jpeg","image/bmp","image/png"].includes(t.type);console.log(t.type);var a=t.size/1024/1024<1;return e||this.$message.error("上传头像图片只能是JPG/PNG/BMP格式!"),a||this.$message.error("上传头像图片大小不能超过 1MB!"),e&&a}}}),s=i,r=a("2877"),o=Object(r["a"])(s,l,n,!1,null,"58e014b3",null);e["a"]=o.exports},caad:function(t,e,a){"use strict";var l=a("23e7"),n=a("4d64").includes,i=a("44d2"),s=a("ae40"),r=s("indexOf",{ACCESSORS:!0,1:0});l({target:"Array",proto:!0,forced:!r},{includes:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},f153:function(t,e,a){}}]);
//# sourceMappingURL=chunk-65351850.f3532267.js.map