(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Login"],{a55b:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"mx-auto my-auto",attrs:{width:"500",elevation:"5"}},[a("v-img",{staticClass:"white--text align-end",attrs:{height:"100px",src:"https://cdn.vuetifyjs.com/images/cards/docks.jpg"}},[a("v-card-title",[e._v("Iniciar sesión")])],1),a("v-card-text",[a("v-dialog",{attrs:{"max-width":"290"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v(e._s(e.restMessage))]),a("v-card-text",[e._v(" Error. ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){e.dialog=!1}}},[e._v(" Ok ")])],1)],1)],1),a("form",{attrs:{autocomplete:"off"}},[a("v-text-field",{attrs:{"error-messages":e.nameErrors,counter:30,label:"Email",required:""},on:{input:function(t){return e.$v.name.$touch()},blur:function(t){return e.$v.name.$touch()}},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("v-text-field",{attrs:{"error-messages":e.passErrors,label:"Password",required:"",type:"password"},on:{input:function(t){return e.$v.pass.$touch()},blur:function(t){return e.$v.pass.$touch()}},model:{value:e.pass,callback:function(t){e.pass=t},expression:"pass"}}),a("v-btn",{staticClass:"mr-4",on:{click:e.submit}},[e._v("Entrar")]),a("v-btn",{on:{click:e.reg}},[e._v("Registrarme")])],1)],1)],1)},r=[],i=(a("b0c0"),a("1dce")),n=a("b5ae"),o=a("4328"),c=a.n(o),d={mixins:[i["validationMixin"]],validations:{name:{required:n["required"],maxLength:Object(n["maxLength"])(30)},pass:{required:n["required"]}},data:function(){return{name:"",pass:"",dialog:!1,restMessage:""}},computed:{nameErrors:function(){var e=[];return this.$v.name.$dirty?(!this.$v.name.required&&e.push("Email es requerido"),e):e},passErrors:function(){var e=[];return this.$v.pass.$dirty?(!this.$v.pass.required&&e.push("Password es requerido"),e):e}},methods:{submit:function(){var e=this;this.$v.$touch(),""!=this.name&&""!=this.pass&&this.axios({method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},data:c.a.stringify({email:this.name,password:this.pass}),url:this.$store.state.ip+"/user/login"}).then((function(t){"Bienvenido"==t.data.message?(localStorage.setItem("name",t.data.user.nombre),localStorage.setItem("nick",t.data.user.nick),localStorage.setItem("idUser",t.data.user.id),localStorage.setItem("token",t.data.token),e.$router.push("/home")):(e.restMessage=t.data.message,e.dialog=!0)})).catch((function(e){console.log(e)}))},reg:function(){this.$router.push("/register")}}},u=d,l=a("2877"),m=a("6544"),v=a.n(m),p=a("8336"),h=a("b0af"),g=a("99d9"),f=a("169a"),b=a("adda"),x=a("2fa4"),$=a("8654"),w=Object(l["a"])(u,s,r,!1,null,null,null);t["default"]=w.exports;v()(w,{VBtn:p["a"],VCard:h["a"],VCardActions:g["a"],VCardText:g["b"],VCardTitle:g["c"],VDialog:f["a"],VImg:b["a"],VSpacer:x["a"],VTextField:$["a"]})}}]);
//# sourceMappingURL=Login.d960c55a.js.map