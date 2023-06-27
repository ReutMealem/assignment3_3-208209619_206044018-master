(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c8dffad"],{6619:function(e,r,i){"use strict";i.r(r);var t=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"container"},[e.recipe?t("div",[t("div",{staticClass:"recipe-header mt-3 mb-4"},[t("h1",[e._v(e._s(e.recipe.recipe_name))]),e.$root.store.username?t("b",[e.isRecipeInFavorites(e.recipe.recipe_id)?t("img",{staticClass:"center small-image",attrs:{src:i("fa49")}}):e._e()]):e._e(),t("img",{staticClass:"center",attrs:{src:e.recipe.image_recipe}})]),t("div",{staticClass:"recipe-body"},[t("div",{staticClass:"wrapper"},[t("div",{staticClass:"wrapped"},[t("div",{staticClass:"mb-3"},[t("div",[e._v("Ready in "+e._s(e.recipe.prepare_time)+" minutes")]),t("div",[e._v("Likes: "+e._s(e.recipe.likes)+" likes")]),t("div",[e._v("Portions: "+e._s(e.recipe.portions))]),e.recipe.is_vegan?t("div",[e._v("Vegan")]):e._e(),e.recipe.is_veget?t("div",[e._v("Vegetarian")]):e._e(),e.recipe.is_glutenFree?t("div",[e._v("GlutenFree")]):e._e(),e.recipe.recipe_owner?t("div",[e._v(" Recipe Owner: "+e._s(e.recipe.recipe_owner)+" ")]):e._e(),e.recipe.when_prepared?t("div",[e._v(" When Prepared: "+e._s(e.recipe.when_prepared)+" ")]):e._e()]),e._v(" Ingredients: "),e.recipe.recipe_ingredient.length?t("ul",e._l(e.recipe.recipe_ingredient,(function(r,i){return t("li",{key:i+"_"+r.name},[e._v(" "+e._s(r.name)+" "+e._s(r.amount)+" "+e._s(r.unitLong)+" ")])})),0):t("p",[e._v("No ingredients available")])]),t("div",{staticClass:"wrapped"},[e._v(" Instructions: "),e.recipe.recipe_instruction[0]&&e.recipe.recipe_instruction[0].steps.length?t("ol",e._l(e.recipe.recipe_instruction[0].steps,(function(r){return t("li",{key:r},[e._v(" "+e._s(r)+" ")])})),0):t("p",[e._v("No instructions available")])])])])]):e._e(),t("div",[e.isRecipeInFavorites(e.recipe.recipe_id)?e._e():t("button",{on:{click:function(r){return e.addToFavorites()}}},[e._v(" Add To Favorites ")])])])},n=[],a=(i("99af"),i("7db0"),i("2909")),s=(i("96cf"),i("1da1")),c={data:function(){return{recipe:null,type:"",favoritesRecipes:[]}},created:function(){this.recipe=this.$route.params.recipe,this.type=this.$route.params.type,this.getFavorites()},methods:{addToFavorites:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(console.log("add to favorites clicked"),e.isRecipeInFavorites(e.recipe.recipe_id)){r.next=15;break}return console.log("Recipe is not in favorites and will add it now:"),r.prev=3,r.next=6,e.axios.put("".concat(e.$root.store.server_domain,"/users/userFavoriteRecipes/").concat(e.recipe.recipe_id,"/").concat(e.type));case 6:i=r.sent,console.log(i),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](3),console.error(r.t0);case 13:r.next=16;break;case 15:console.log("recipe is already in favorites!");case 16:case"end":return r.stop()}}),r,null,[[3,10]])})))()},getFavorites:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var i,t,n,s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.$root.store.username){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,e.axios.get(e.$root.store.server_domain+"/users/userFavoriteRecipes");case 4:i=r.sent,t=i.data.recipes.API,n=i.data.recipes.personal,s=i.data.recipes.family,e.favoritesRecipes=[].concat(Object(a["a"])(t),Object(a["a"])(n),Object(a["a"])(s));case 9:case"end":return r.stop()}}),r)})))()},isRecipeInFavorites:function(e){var r=this.favoritesRecipes.find((function(r){return r.recipe_id===e}));return void 0===r?(console.log("Recipe is NOT in favorites -> false"),!1):(console.log("Recipe is in favorites- > true"),!0)}}},o=c,p=(i("6b81"),i("2877")),d=Object(p["a"])(o,t,n,!1,null,"ee8e0e30",null);r["default"]=d.exports},"6b81":function(e,r,i){"use strict";var t=i("8f9e"),n=i.n(t);n.a},"7db0":function(e,r,i){"use strict";var t=i("23e7"),n=i("b727").find,a=i("44d2"),s=i("ae40"),c="find",o=!0,p=s(c);c in[]&&Array(1)[c]((function(){o=!1})),t({target:"Array",proto:!0,forced:o||!p},{find:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),a(c)},"8f9e":function(e,r,i){},"99af":function(e,r,i){"use strict";var t=i("23e7"),n=i("d039"),a=i("e8b5"),s=i("861d"),c=i("7b0b"),o=i("50c4"),p=i("8418"),d=i("65f0"),u=i("1dde"),v=i("b622"),l=i("2d00"),_=v("isConcatSpreadable"),f=9007199254740991,g="Maximum allowed index exceeded",h=l>=51||!n((function(){var e=[];return e[_]=!1,e.concat()[0]!==e})),m=u("concat"),b=function(e){if(!s(e))return!1;var r=e[_];return void 0!==r?!!r:a(e)},w=!h||!m;t({target:"Array",proto:!0,forced:w},{concat:function(e){var r,i,t,n,a,s=c(this),u=d(s,0),v=0;for(r=-1,t=arguments.length;r<t;r++)if(a=-1===r?s:arguments[r],b(a)){if(n=o(a.length),v+n>f)throw TypeError(g);for(i=0;i<n;i++,v++)i in a&&p(u,v,a[i])}else{if(v>=f)throw TypeError(g);p(u,v++,a)}return u.length=v,u}})},fa49:function(e,r,i){e.exports=i.p+"img/heart.3e7de5b3.png"}}]);
//# sourceMappingURL=chunk-4c8dffad.a0a2aa1d.js.map