(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-703a0440"],{"129f":function(e,t){e.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t}},2532:function(e,t,i){"use strict";var r=i("23e7"),a=i("5a34"),s=i("1d80"),n=i("ab13");r({target:"String",proto:!0,forced:!n("includes")},{includes:function(e){return!!~String(s(this)).indexOf(a(e),arguments.length>1?arguments[1]:void 0)}})},2862:function(e,t,i){"use strict";var r=i("7638"),a=i.n(r);a.a},"44e7":function(e,t,i){var r=i("861d"),a=i("c6b6"),s=i("b622"),n=s("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[n])?!!t:"RegExp"==a(e))}},"4de4":function(e,t,i){"use strict";var r=i("23e7"),a=i("b727").filter,s=i("1dde"),n=i("ae40"),c=s("filter"),o=n("filter");r({target:"Array",proto:!0,forced:!c||!o},{filter:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},"575a":function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return Object.keys(e.user).length>0&&Object.keys(e.Article).length>0?i("div",[i("div",{staticClass:"w-100 input d-flex bg-white border-b align-items-center px-3"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.Article.title,expression:"Article.title"}],staticClass:" flex-1 titleInput px-2",attrs:{type:"text",maxlength:"80",placeholder:"输入文章标题..."},domProps:{value:e.Article.title},on:{input:[function(t){t.target.composing||e.$set(e.Article,"title",t.target.value)},e.editorChange]}}),i("div",{staticClass:"text-grey-light d-flex align-items-center"},["public"!=e.Article.type?i("span",{staticClass:"d-none d-md-flex flex-column"},[i("span",[e._v(e._s(e.message))]),"已自动保存至"==e.message?i("span",{staticClass:"fs-xxs text-right"},[e._v(e._s(e._f("date")(e.Article.updatedAt)))]):e._e()]):e._e(),i("button",{staticClass:"btn text-grey-light py-1 px-2 fs-sm ml-3",staticStyle:{"border-color":"#f0f2f7"},on:{click:function(t){return e.$router.push("/editor/drafts")}}},[e._v("草稿")])]),i("div",{staticClass:"position-relative mx-3"},[i("button",{staticClass:"text-red bg-white border-0",staticStyle:{outline:"none"},on:{click:function(t){return t.stopPropagation(),e.publishClick()}}},["public"==e.Article.type?i("span",[e._v("保存")]):i("span",[e._v("发布")]),i("svg",{staticClass:"icon",class:{Reversal:e.publish},staticStyle:{padding:"3px"},attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-sanjiaoxing"}})])]),i("category-choice",{directives:[{name:"show",rawName:"v-show",value:e.publish,expression:"publish"}],ref:"catePanel",attrs:{user:e.user,categoriesDefalut:e.Article.categories,isDraft:"private"==e.Article.type},on:{Public:function(t){return e.Public()},CateChange:e.CateChange}})],1),i("avatar",{attrs:{user:e.user}})],1),i("mavon-editor",{ref:"mavon",staticClass:"editor-body",staticStyle:{"z-index":"1"},attrs:{toolbars:e.toolbars,placeholder:"开始编辑文章..."},on:{change:e.editorChange,save:e.autoSave,imgAdd:e.imgAdd},model:{value:e.Article.content,callback:function(t){e.$set(e.Article,"content",t)},expression:"Article.content"}})],1):e._e()},a=[],s=(i("ac1f"),i("5319"),i("96cf"),i("1da1")),n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("panel",{staticClass:"bg-white mt-3",staticStyle:{width:"300px"}},[i("div",{staticClass:"px-3 py-4  text-grey-light"},[i("h5",{staticClass:"font-weight"},[e._v("发布文章")]),i("div",{staticClass:"mt-2"},[i("span",[e._v("已关注分类")]),e.user.categories.length>0?i("div",{staticClass:"d-flex flex-wrap py-2"},e._l(e.user.categories,(function(t,r){return i("cate-item",{key:r,class:{choice:e.isChoice(t._id)},attrs:{isChoice:e.isChoice(t._id),Category:t},on:{Choice:function(i){return e.Choice(t._id)},disChoice:function(i){return e.disChoice(t._id)}}},[e._v(e._s(t.name))])})),1):i("div",{staticClass:"my-3"},[e._v(" 无")])]),i("div",{staticClass:"mt-2"},[i("span",[e._v("更多分类")]),i("div",{staticClass:"position-relative"},[i("div",{staticClass:"d-flex flex-wrap py-2"},e._l(e.moreCate,(function(t,r){return i("cate-item",{key:r,class:{choice:e.isChoice(t._id)},attrs:{isChoice:e.isChoice(t._id),Category:t},on:{Choice:function(i){return e.Choice(t._id)},disChoice:function(i){return e.disChoice(t._id)}}},[e._v(e._s(t.name))])})),1),i("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"searchInput fs-xs w-100",attrs:{type:"text",placeholder:"添加分类"},domProps:{value:e.search},on:{input:[function(t){t.target.composing||(e.search=t.target.value)},e.SearchCate]}}),i("nor-panel",{directives:[{name:"show",rawName:"v-show",value:e.cateRes.length>0,expression:"cateRes.length>0"}],staticClass:"bg-white mt-2 p-2",staticStyle:{width:"200px",left:"0"}},[i("div",e._l(e.cateRes,(function(t,r){return i("div",{key:r,staticClass:"searchItem py-1 cursor-point fs-sm",on:{click:function(i){return e.pushMoreChoice(t)}}},[e._v(e._s(t.name))])})),0)])],1)]),i("span",{directives:[{name:"show",rawName:"v-show",value:e.Categories.length>=3,expression:"Categories.length >= 3"}],staticClass:"fs-xs text-red"},[e._v("最多选择3个分类")]),i("div",{staticClass:"text-center mt-2"},[i("button",{staticClass:"followBtn fs-sm text-red px-2 py-1",on:{click:function(t){return e.$emit("Public")}}},[e.isDraft?i("span",[e._v("确定并发布")]):i("span",[e._v("确定并更新")])])])])])},c=[],o=(i("4de4"),i("caad"),i("d81d"),i("2532"),i("841c"),i("498a"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"activePanel"},[i("svg",{staticClass:"icon  triangle bgTriangle",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-sanjiaoxing"}})]),i("svg",{staticClass:"icon  triangle",attrs:{"aria-hidden":"true"}},[i("use",{attrs:{"xlink:href":"#icon-sanjiaoxing"}})]),e._t("default")],2)}),l=[],u={},h=u,d=(i("6566"),i("2877")),f=Object(d["a"])(h,o,l,!1,null,"8c8b4c28",null),p=f.exports,g=i("8d61"),v=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"py-1 px-2 fs-xs mr-2 mb-3 cateItem",on:{click:e.ChoiceClick}},[i("span",[e._t("default")],2)])},m=[],C={props:{isChoice:Boolean},data:function(){return{choice:!1}},methods:{ChoiceClick:function(){this.choice=!this.choice,this.choice?this.$emit("Choice"):this.$emit("disChoice")}},updated:function(){this.choice=this.isChoice}},x=C,b=(i("d056"),Object(d["a"])(x,v,m,!1,null,"0b0a82b5",null)),w=b.exports,y={props:{categoriesDefalut:Array,isDraft:Boolean,user:Object},data:function(){return{search:"",Categories:[],cateRes:[],lazy:null,moreCate:[]}},methods:{commit:function(){this.$emit("CateChange",this.Categories)},Choice:function(e){return!this.Categories.includes(e)&&this.Categories.length<3&&(this.Categories.push(e),this.commit(),!0)},disChoice:function(e){this.$set(this,"Categories",this.Categories.filter((function(t){return t!=e}))),this.commit()},isChoice:function(e){return this.Categories.includes(e)},SearchCate:function(){var e=this;this.lazy&&clearTimeout(this.lazy),this.lazy=setTimeout(Object(s["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.search=e.search.trim(),""==e.search){t.next=8;break}return t.next=4,e.$http.get("categories/page",{params:{pageSize:10,searchKey:{name:e.search}}});case 4:i=t.sent,e.cateRes=i.data,t.next=9;break;case 8:e.cateRes=[];case 9:case"end":return t.stop()}}),t)}))),500)},pushMoreChoice:function(e){this.Choice(e._id)&&(this.moreCate.push(e),this.search="",this.cateRes=[])}},components:{Panel:p,NorPanel:g["a"],cateItem:w},created:function(){var e=this.user.categories.map((function(e){return e._id}));this.moreCate=this.categoriesDefalut.filter((function(t){return!e.includes(t._id)})),this.$set(this,"Categories",this.categoriesDefalut.map((function(e){return e._id})))}},_=y,k=(i("2862"),Object(d["a"])(_,n,c,!1,null,"32cd0cd8",null)),A=k.exports,$=i("5c3d"),R={props:{id:String},data:function(){return{Article:{content:"",title:"",categories:[],type:"private"},publish:!1,message:"文章将会自动保存至",lazy:null,onceFlag:!0,toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!1,readmodel:!0,htmlcode:!0,help:!0,undo:!0,redo:!0,trash:!0,save:!0,navigation:!0,alignleft:!0,aligncenter:!0,alignright:!0,subfield:!0,preview:!0},user:{},published:!1}},methods:{publishClick:function(){this.publish=!this.publish},autoSave:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""==e.Article.title||""==e.Article.content){t.next=14;break}if(e.message="文章正在自动保存...",i=null,e.id){t.next=9;break}return t.next=6,e.$http.post("articles/new",e.Article);case 6:i=t.sent,t.next=13;break;case 9:return t.next=11,e.$http.put("articles/".concat(e.id),e.Article);case 11:i=t.sent,e.fetchArticle();case 13:i.data&&(e.message="已自动保存至",i.data[0]?e.$router.replace("/editor/".concat(i.data[0]["_id"])):1!=i.data.ok&&(e.message="保存出错",e.$router.replace("/editor/new")));case 14:case"end":return t.stop()}}),t)})))()},editorChange:function(){this.onceFlag?this.onceFlag=!1:"public"!=this.Article.type&&(this.lazy&&clearTimeout(this.lazy),this.lazy=setTimeout(this.autoSave,2e3))},fetchArticle:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.id){t.next=5;break}return t.next=3,e.$http.get("articles/".concat(e.id));case 3:i=t.sent,e.Article=i.data;case 5:case"end":return t.stop()}}),t)})))()},imgAdd:function(e,t){var i=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=new FormData,a.append("file",t),r.next=4,i.$http.post("upload",a);case 4:s=r.sent,i.$refs.mavon.$img2Url(e,s.data.url);case 6:case"end":return r.stop()}}),r)})))()},CateChange:function(e){this.Article.categories=e,this.editorChange()},Public:function(){0!=this.Article.categories.length?0!=this.Article.title.length?0!=this.Article.content.length?(this.Article.type="public",this.autoSave(),this.published=!0,this.$router.push("/"),this.$message.success("发布成功！")):this.$message.warning("请填写内容"):this.$message.warning("请填写标题"):this.$message.warning("请至少选择一个分类")},fetchUser:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("users/info");case 2:i=t.sent,e.user=i.data;case 4:case"end":return t.stop()}}),t)})))()}},components:{CategoryChoice:A,Avatar:$["a"]},created:function(){var e=this;this.$store.state.Logged||this.$router.go(-1),this.fetchArticle(),this.fetchUser(),document.addEventListener("click",(function(t){if(e.$refs.catePanel){var i=e.$refs.catePanel.$el.contains(t.target);i||(e.publish=!1)}}))}},S=R,j=(i("66df"),Object(d["a"])(S,r,a,!1,null,"404b0652",null));t["default"]=j.exports},"5a34":function(e,t,i){var r=i("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},6566:function(e,t,i){"use strict";var r=i("f8d0"),a=i.n(r);a.a},"66df":function(e,t,i){"use strict";var r=i("f255"),a=i.n(r);a.a},7638:function(e,t,i){},"841c":function(e,t,i){"use strict";var r=i("d784"),a=i("825a"),s=i("1d80"),n=i("129f"),c=i("14c3");r("search",1,(function(e,t,i){return[function(t){var i=s(this),r=void 0==t?void 0:t[e];return void 0!==r?r.call(t,i):new RegExp(t)[e](String(i))},function(e){var r=i(t,e,this);if(r.done)return r.value;var s=a(e),o=String(this),l=s.lastIndex;n(l,0)||(s.lastIndex=0);var u=c(s,o);return n(s.lastIndex,l)||(s.lastIndex=l),null===u?-1:u.index}]}))},ab13:function(e,t,i){var r=i("b622"),a=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(i){try{return t[a]=!1,"/./"[e](t)}catch(r){}}return!1}},b727:function(e,t,i){var r=i("0366"),a=i("44ad"),s=i("7b0b"),n=i("50c4"),c=i("65f0"),o=[].push,l=function(e){var t=1==e,i=2==e,l=3==e,u=4==e,h=6==e,d=5==e||h;return function(f,p,g,v){for(var m,C,x=s(f),b=a(x),w=r(p,g,3),y=n(b.length),_=0,k=v||c,A=t?k(f,y):i?k(f,0):void 0;y>_;_++)if((d||_ in b)&&(m=b[_],C=w(m,_,x),e))if(t)A[_]=C;else if(C)switch(e){case 3:return!0;case 5:return m;case 6:return _;case 2:o.call(A,m)}else if(u)return!1;return h?-1:l||u?u:A}};e.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6)}},caad:function(e,t,i){"use strict";var r=i("23e7"),a=i("4d64").includes,s=i("44d2"),n=i("ae40"),c=n("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!c},{includes:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),s("includes")},d056:function(e,t,i){"use strict";var r=i("d24c"),a=i.n(r);a.a},d24c:function(e,t,i){},d81d:function(e,t,i){"use strict";var r=i("23e7"),a=i("b727").map,s=i("1dde"),n=i("ae40"),c=s("map"),o=n("map");r({target:"Array",proto:!0,forced:!c||!o},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},f255:function(e,t,i){},f8d0:function(e,t,i){}}]);
//# sourceMappingURL=chunk-703a0440.471cb5f4.js.map