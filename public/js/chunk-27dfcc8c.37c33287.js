(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27dfcc8c"],{"159b":function(e,r,s){var n=s("da84"),t=s("fdbc"),a=s("17c2"),o=s("9112");for(var c in t){var u=n[c],i=u&&u.prototype;if(i&&i.forEach!==a)try{o(i,"forEach",a)}catch(d){i.forEach=a}}},"17c2":function(e,r,s){"use strict";var n=s("b727").forEach,t=s("a640"),a=t("forEach");e.exports=a?[].forEach:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}},"38d0":function(e,r,s){"use strict";s("8f74")},"54b6":function(e,r,s){"use strict";s.r(r);var n=s("7a23"),t=Object(n["E"])("data-v-11d7a1bc");Object(n["s"])("data-v-11d7a1bc");var a={class:"container"},o={key:0,class:"message"},c={class:"input-container"},u={class:"input-group"},i=Object(n["g"])("label",{for:"username"},"Username: ",-1),d={key:0,class:"error-message"},f={key:1,class:"error-message"},l={class:"input-group"},m=Object(n["g"])("label",{for:"password"},"Password: ",-1),p={key:0,class:"error-message"},b={class:"input-group"},g=Object(n["g"])("label",{for:"confirmPassword"},"Confirm Password: ",-1);Object(n["q"])();var h=t((function(e,r,s,t,h,w){return Object(n["p"])(),Object(n["d"])("div",a,[""!==h.message?(Object(n["p"])(),Object(n["d"])("div",o,[Object(n["g"])("p",null,Object(n["y"])(h.message),1)])):Object(n["e"])("",!0),Object(n["g"])("div",c,[Object(n["g"])("div",u,[i,Object(n["D"])(Object(n["g"])("input",{class:{errorBorder:h.shortUsername},onFocus:r[1]||(r[1]=function(e){return h.shortUsername=!1,h.usernameTaken=!1}),type:"text",id:"username","onUpdate:modelValue":r[2]||(r[2]=function(e){return h.username=e})},null,34),[[n["A"],h.username]]),h.shortUsername?(Object(n["p"])(),Object(n["d"])("div",d,"Username must be at least 3 characters long")):Object(n["e"])("",!0),h.usernameTaken?(Object(n["p"])(),Object(n["d"])("div",f,"Username is already taken")):Object(n["e"])("",!0)]),Object(n["g"])("div",l,[m,Object(n["D"])(Object(n["g"])("input",{class:{errorBorder:h.unmatchedPassword},onFocus:r[3]||(r[3]=function(e){return h.unmatchedPassword=!1}),type:"password",id:"password","onUpdate:modelValue":r[4]||(r[4]=function(e){return h.password=e})},null,34),[[n["A"],h.password]]),h.unmatchedPassword?(Object(n["p"])(),Object(n["d"])("div",p,"Passwords must match and be at least 5 characters long!")):Object(n["e"])("",!0)]),Object(n["g"])("div",b,[g,Object(n["D"])(Object(n["g"])("input",{class:{errorBorder:h.unmatchedPassword},onFocus:r[5]||(r[5]=function(e){return h.unmatchedPassword=!1}),type:"password",id:"confirmPassword","onUpdate:modelValue":r[6]||(r[6]=function(e){return h.confirmPassword=e})},null,34),[[n["A"],h.confirmPassword]])]),Object(n["g"])("button",{onClick:r[7]||(r[7]=function(){return w.registerNewCook&&w.registerNewCook.apply(w,arguments)})},"Register")])])})),w=(s("159b"),s("a2a1")),v={name:"Cook Register",props:["loggedInAsId"],data:function(){return{username:"",password:"",confirmPassword:"",unmatchedPassword:!1,shortUsername:!1,usernameTaken:!1,message:""}},methods:{registerNewCook:function(){var e=this,r={username:this.username,password:this.password};w["a"].getAll().then((function(s){s.data.forEach((function(s){s.username===r.username&&(e.usernameTaken=!0)})),e.password===e.confirmPassword&&e.password.length>5&&e.username.length>3&&!1===e.usernameTaken?w["a"].registerCook(r).then((function(){e.username="",e.password="",e.confirmPassword="",e.message="Cook account successfully created, you can now log in!",setTimeout((function(){e.message=""}),2e3)})).catch((function(e){console.log(e.message)})):(e.username.length<3&&(e.shortUsername=!0),(e.password!==e.confirmPassword||e.password.length<5)&&(e.unmatchedPassword=!0))}))}},beforeMount:function(){null!==this.loggedInAsId.loggedInAsId&&this.$router.push("/")}};s("38d0");v.render=h,v.__scopeId="data-v-11d7a1bc";r["default"]=v},"65f0":function(e,r,s){var n=s("861d"),t=s("e8b5"),a=s("b622"),o=a("species");e.exports=function(e,r){var s;return t(e)&&(s=e.constructor,"function"!=typeof s||s!==Array&&!t(s.prototype)?n(s)&&(s=s[o],null===s&&(s=void 0)):s=void 0),new(void 0===s?Array:s)(0===r?0:r)}},"8f74":function(e,r,s){},a640:function(e,r,s){"use strict";var n=s("d039");e.exports=function(e,r){var s=[][e];return!!s&&n((function(){s.call(null,r||function(){throw 1},1)}))}},b727:function(e,r,s){var n=s("0366"),t=s("44ad"),a=s("7b0b"),o=s("50c4"),c=s("65f0"),u=[].push,i=function(e){var r=1==e,s=2==e,i=3==e,d=4==e,f=6==e,l=7==e,m=5==e||f;return function(p,b,g,h){for(var w,v,O=a(p),j=t(O),y=n(b,g,3),k=o(j.length),P=0,A=h||c,U=r?A(p,k):s||l?A(p,0):void 0;k>P;P++)if((m||P in j)&&(w=j[P],v=y(w,P,O),e))if(r)U[P]=v;else if(v)switch(e){case 3:return!0;case 5:return w;case 6:return P;case 2:u.call(U,w)}else switch(e){case 4:return!1;case 7:u.call(U,w)}return f?-1:i||d?d:U}};e.exports={forEach:i(0),map:i(1),filter:i(2),some:i(3),every:i(4),find:i(5),findIndex:i(6),filterOut:i(7)}},e8b5:function(e,r,s){var n=s("c6b6");e.exports=Array.isArray||function(e){return"Array"==n(e)}}}]);
//# sourceMappingURL=chunk-27dfcc8c.37c33287.js.map