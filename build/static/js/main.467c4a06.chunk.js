(this.webpackJsonppuranibooks_frontend=this.webpackJsonppuranibooks_frontend||[]).push([[0],{13:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(3),u=t.n(o),l=t(4),m=t(5),i=t(1),d=t(7),s=t(6),p=function(e){Object(d.a)(t,e);var n=Object(s.a)(t);function t(e){var a;return Object(l.a)(this,t),(a=n.call(this,e)).Signup=a.Signup.bind(Object(i.a)(a)),a}return Object(m.a)(t,[{key:"Signup",value:function(){var e=document.getElementById("name").value,n=document.getElementById("username").value,t=document.getElementById("email").value,a=document.getElementById("password").value,r=document.getElementById("phone_Number").value,o=document.getElementById("Address").value;fetch("api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{name:e,username:n,email:t,password:a,phone_Number:r,Address:o}})}).then((function(e){return e.json()})).then((function(e){e.email===t?alert("Registration Complete Now log in "):e.errors&&alert(e.errors.body)})).catch((function(e){alert(e)}))}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Signup"),r.a.createElement("input",{placeholder:"name",type:"text",id:"name",name:"name"}),r.a.createElement("input",{placeholder:"username",type:"text",id:"username",name:"username"}),r.a.createElement("input",{placeholder:"email",type:"eamil",id:"email",name:"email"}),r.a.createElement("input",{placeholder:"password",type:"password",id:"password",name:"password"}),r.a.createElement("input",{placeholder:"Phone_Number",type:"number",id:"phone_Number",name:"phone_Number"}),r.a.createElement("input",{placeholder:"Address",type:"text",id:"Address",name:"Address"}),r.a.createElement("button",{onClick:this.Signup},"Submit"))}}]),t}(r.a.Component);u.a.render(r.a.createElement(p,null),document.getElementById("root"))},8:function(e,n,t){e.exports=t(13)}},[[8,1,2]]]);
//# sourceMappingURL=main.467c4a06.chunk.js.map