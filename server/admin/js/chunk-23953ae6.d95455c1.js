(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-23953ae6"],{"464d":function(e,t,r){"use strict";var n=r("80b7"),a=r.n(n);a.a},"4de4":function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").filter,o=r("1dde"),i=r("ae40"),c=o("filter"),s=i("filter");n({target:"Array",proto:!0,forced:!c||!s},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},5530:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));r("a4d3"),r("4de4"),r("4160"),r("e439"),r("dbb4"),r("b64b"),r("159b");var n=r("ade3");function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){Object(n["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}},"80b7":function(e,t,r){},ade3:function(e,t,r){"use strict";function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}r.d(t,"a",(function(){return n}))},dbb4:function(e,t,r){var n=r("23e7"),a=r("83ab"),o=r("56ef"),i=r("fc6a"),c=r("06cf"),s=r("8418");n({target:"Object",stat:!0,sham:!a},{getOwnPropertyDescriptors:function(e){var t,r,n=i(e),a=c.f,l=o(n),u={},d=0;while(l.length>d)r=a(n,t=l[d++]),void 0!==r&&s(u,t,r);return u}})},e439:function(e,t,r){var n=r("23e7"),a=r("d039"),o=r("fc6a"),i=r("06cf").f,c=r("83ab"),s=a((function(){i(1)})),l=!c||s;n({target:"Object",stat:!0,forced:l,sham:!c},{getOwnPropertyDescriptor:function(e,t){return i(o(e),t)}})},e5cc:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return!e.id||Object.keys(e.model).length>4?r("div",[r("el-form",{attrs:{"label-width":"80px",model:e.model},nativeOn:{submit:function(t){return t.preventDefault(),e.save(t)}}},[r("el-form-item",{staticClass:"mb-1 py-0",attrs:{label:"公告分类"}},[r("el-select",{attrs:{multiple:"",filterable:""},model:{value:e.model.categories,callback:function(t){e.$set(e.model,"categories",t)},expression:"model.categories"}},e._l(e.categories,(function(e){return r("el-option",{key:e._id,attrs:{label:e.name,value:e._id}})})),1)],1),e.id?r("el-form-item",{staticClass:"my-0 py-0",attrs:{label:"发布者"}},[r("span",{staticClass:"fs-xs text-dark "},[e._v(e._s(e.model.author.name))])]):e._e(),e.id?r("el-form-item",{staticClass:"my-0 py-0",attrs:{label:"时间"}},[r("span",{staticClass:"fs-xs text-dark "},[e._v("发布于："+e._s(e._f("date")(e.model.createdAt)))]),r("span",{staticClass:"fs-xs text-dark pl-2"},[e._v("更新于："+e._s(e._f("date")(e.model.updatedAt,e.model.createdAt)))]),e.model.editor?r("span",{staticClass:"fs-xs text-dark pl-2"},[e._v("管理员："+e._s(e.model.editor.name)+" 进行了最后一次更新")]):e._e()]):e._e(),r("el-form-item",{attrs:{label:"标题"}},[r("el-input",{model:{value:e.model.title,callback:function(t){e.$set(e.model,"title",t)},expression:"model.title"}})],1),r("el-form-item",{attrs:{label:"内容"}},[r("mavon-editor",{ref:"mavon",class:[{full:e.isFull},{notFull:!e.isFull}],on:{save:function(t){return e.save()},imgAdd:e.imgAdd,fullScreen:e.fullScreen},model:{value:e.model.content,callback:function(t){e.$set(e.model,"content",t)},expression:"model.content"}})],1),r("el-form-item",[r("el-button",{attrs:{type:"info",disabled:e.NoUpdate,"native-type":"submit"}},[e._v("保存")]),r("el-button",{attrs:{type:"info"},on:{click:function(t){return e.$router.go(-1)}}},[e._v("返回")])],1)],1)],1):e._e()},a=[],o=(r("b64b"),r("5530")),i=(r("96cf"),r("1da1")),c={props:{id:String},data:function(){return{categories:[],model:{title:"请输入公告标题",content:"输入公告内容",categories:[]},isFull:!1,NoUpdate:!0}},methods:{fetchNotice:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/notices/".concat(e.id));case 2:r=t.sent,r.data&&(e.model=r.data,setTimeout((function(){e.NoUpdate=!0}),100));case 4:case"end":return t.stop()}}),t)})))()},fullScreen:function(e){this.isFull=e},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$confirm(e.id?"是否整改该文章?":"是否新建公告？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=null,!e.id){t.next=7;break}return t.next=4,e.$http.put("rest/notices/".concat(e.id),Object(o["a"])({editor:localStorage.admin},e.model));case 4:r=t.sent,t.next=10;break;case 7:return t.next=9,e.$http.post("rest/notices",Object(o["a"])({author:localStorage.admin},e.model));case 9:r=t.sent;case 10:r.data?e.id?(e.fetchNotice(),e.$notify({title:"保存完成"})):e.$router.go(-1):e.$message({type:"error",message:"网络出错!"});case 11:case"end":return t.stop()}}),t)}))));case 1:case"end":return t.stop()}}),t)})))()},imgAdd:function(e,t){var r=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){var a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=new FormData,a.append("file",t),n.next=4,r.$http.post("upload",a);case 4:o=n.sent,r.$refs.mavon.$img2Url(e,o.data.url);case 6:case"end":return n.stop()}}),n)})))()},fetchCats:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("rest/categories");case 2:r=t.sent,e.categories=r.data;case 4:case"end":return t.stop()}}),t)})))()}},watch:{model:{deep:!0,handler:function(e,t){Object.keys(t).length>0&&(console.log(e,t),this.NoUpdate=!1)}}},created:function(){this.id&&this.fetchNotice(),this.fetchCats()}},s=c,l=(r("464d"),r("2877")),u=Object(l["a"])(s,n,a,!1,null,"c3bfd224",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-23953ae6.d95455c1.js.map