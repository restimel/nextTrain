(function(t){function e(e){for(var i,r,s=e[0],c=e[1],u=e[2],d=0,f=[];d<s.length;d++)r=s[d],a[r]&&f.push(a[r][0]),a[r]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(f.length)f.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(i=!1)}i&&(o.splice(e--,1),t=r(r.s=n[0]))}return t}var i={},a={app:0},o=[];function r(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=i,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var i=n("64a9"),a=n.n(i);a.a},"0b03":function(t,e,n){},1353:function(t,e,n){"use strict";var i=n("6b70"),a=n.n(i);a.a},"2a3c":function(t,e,n){"use strict";var i=n("0b03"),a=n.n(i);a.a},"45bb":function(t,e,n){"use strict";var i=n("de69"),a=n.n(i);a.a},"4aac":function(t,e,n){"use strict";var i=n("c990"),a=n.n(i);a.a},"56d7":function(t,e,n){"use strict";n.r(e);var i=n("768b"),a=(n("386d"),n("28a5"),n("ac6a"),n("cadf"),n("551c"),n("f751"),n("097d"),n("2b0e")),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view"),n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"home"}},[t._v("Home")]),t._v(" |\n    "),n("router-link",{attrs:{to:"configuration"}},[t._v("Config")]),t._v(" |\n    "),n("router-link",{attrs:{to:"about"}},[t._v("About")])],1),t.showBanner?n("div",{attrs:{id:"information-banner"}},[t._v("\n      "+t._s(t.bannerText)+"\n  ")]):t._e()],1)},r=[],s={name:"App",computed:{isOnLine:function(){return this.$store.state.onLine},showBanner:function(){return!this.isOnLine},bannerText:function(){return this.isOnLine?"":"Offline mode: no internet connection"}}},c=s,u=(n("034f"),n("2877")),l=Object(u["a"])(c,o,r,!1,null,null,null),d=l.exports,f=n("8c4f"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[t._l(t.departures,function(t){return n("Train",{key:t.route.id+t.stop_date_time.departure_date_time,attrs:{departure:t}})}),0===t.departures.length?n("div",{staticClass:"banner-information"},[t._v("\n        Aucune ligne n'a été récupérée avec la configuration donnée.\n        "),n("router-link",{attrs:{to:"configuration"}},[t._v("Voir la configuration")])],1):t._e(),n("Clock",{staticClass:"clock"})],2)},m=[],h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"departure",class:t.status},[n("div",{style:t.codeColor},[t._v(t._s(t.line))]),n("div",[t._v(t._s(t.direction))]),n("div",[t._v(t._s(t.displayTime))])])},v=[],g=n("0a0d"),b=n.n(g),_=(n("a481"),{name:"train",props:{departure:Object},computed:{codeColor:function(){var t=this.departure.display_informations.color;return"color:#".concat(t)},line:function(){var t=this.departure.display_informations,e=t.commercial_mode,n=t.label,i=t.headsign;return e.length+n.length>12?e.length+i.length<=12?"".concat(e," ").concat(i):e:"".concat(e," ").concat(n)},direction:function(){return this.departure.display_informations.direction},time:function(){var t=this.departure.stop_date_time.departure_date_time,e=t.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,"$1-$2-$3 $4:$5:$6"),n=new Date(e),i=Math.floor((n.getTime()-b()())/6e4);return i},displayTime:function(){var t=this.time,e=t%60,n=Math.floor(t/60);return n?(e<10&&(e="0".concat(e)),"".concat(n," h ").concat(e)):"".concat(e," min")},status:function(){var t=this.time;return t>0?"scheduled":0===t?"coming":"late"}}}),k=_,T=(n("6366"),Object(u["a"])(k,h,v,!1,null,"5f423a65",null)),$=T.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"clock",on:{click:t.update}},[t._v("\n    "+t._s(t.time)+"\n")])},x=[],P={name:"clock",data:function(){return this.$nextTick(this.updateTime.bind(this)),{minutes:0,hours:0,timer:0}},computed:{time:function(){return"".concat(this.pad(this.hours),":").concat(this.pad(this.minutes))}},methods:{updateTime:function(){clearTimeout(this.timer);var t=new Date;this.hours=t.getHours(),this.minutes=t.getMinutes(),this.timer=setTimeout(this.updateTime.bind(this),1e4)},update:function(){this.$store.dispatch("update")},pad:function(t){return t>=10?t:"0".concat(t)}},deleted:function(){clearTimeout(this.timer)}},C=P,S=(n("1353"),Object(u["a"])(C,y,x,!1,null,"7aab19f6",null)),w=S.exports,O={name:"home",data:function(){return this.checkState(),{}},computed:{departures:function(){return this.$store.state.departures.slice(0,10)},fetchState:function(){return this.$store.state.fetchState}},methods:{update:function(){this.$store.dispatch("update")},goto:function(t){this.$router.push(t)},checkState:function(){"bad"===this.fetchState&&this.goto("configuration")}},watch:{fetchState:function(){this.checkState()}},mount:function(){this.update()},components:{Train:$,Clock:w}},N=O,M=(n("45bb"),Object(u["a"])(N,p,m,!1,null,"08af9219",null)),L=M.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("h1",[t._v("Objectif")]),n("p",[t._v("Une page de test pour visualiser les horaires des trains d'une gare.")]),n("h1",[t._v("Information")]),n("p",[t._v("Version: "+t._s(t.version))]),n("p",[t._v("Auteur: Restimel - 28 / 04 / 2019")])])},I=[],E=n("9224"),A={name:"about",data:function(){return{version:E["a"]}}},U=A,z=Object(u["a"])(U,j,I,!1,null,null,null),D=z.exports,R=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"configuration"},[n("h1",[t._v("Configuration")]),n("div",{staticClass:"content"},[n("label",{class:{isWrong:t.errors.has("apiName")}},[t._v("\n            API:\n            "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.apiName,expression:"apiName"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.apiName=e.target.multiple?n:n[0]}}},t._l(t.apiOptions,function(e){return n("option",{key:e.id,domProps:{value:e.id}},[t._v("\n                    "+t._s(e.label)+"\n                ")])}),0)]),n("label",{class:{isWrong:t.errors.has("apiMode")}},[t._v("\n            API mode:\n            "),n("select",{directives:[{name:"model",rawName:"v-model",value:t.apiMode,expression:"apiMode"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.apiMode=e.target.multiple?n:n[0]}}},t._l(t.apiModeOptions,function(e){return n("option",{key:e.id,domProps:{value:e.id}},[t._v("\n                    "+t._s(e.label)+"\n                ")])}),0)]),t.tags.includes("token")?n("label",{class:{isWrong:t.errors.has("token")}},[t._v("\n            API token: "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.token,expression:"token"}],domProps:{value:t.token},on:{input:function(e){e.target.composing||(t.token=e.target.value)}}})]):t._e(),t.tags.includes("station")?n("label",{class:{isWrong:t.errors.has("station")}},[t._v("\n            Id de gare: "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.stationId,expression:"stationId"}],domProps:{value:t.stationId},on:{input:function(e){e.target.composing||(t.stationId=e.target.value)}}})]):t._e(),t.tags.includes("lat")||t.tags.includes("lng")?n("label",{class:{isWrong:t.errors.has("lat")||t.errors.has("lng")}},[t._v("\n            Lieu:\n            "),n("GeoMap",{model:{value:t.latLng,callback:function(e){t.latLng=e},expression:"latLng"}})],1):t._e(),t.tags.includes("distance")?n("label",{class:{isWrong:t.errors.has("distance")}},[t._v("\n            Distance à partir du lieu: "),n("DistanceRange")],1):t._e(),n("label",{class:{isWrong:t.errors.has("refreshTime")}},[t._v("\n            Temps de rafraichissement: "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.refreshTime,expression:"refreshTime"}],attrs:{type:"number",min:"1"},domProps:{value:t.refreshTime},on:{input:function(e){e.target.composing||(t.refreshTime=e.target.value)}}}),t._v("s\n        ")]),n("label",{class:{isWrong:t.errors.has("silentPeriods")}},[t._v("\n            Périodes sans rafraichissement:\n                "),t._l(t.silentPeriods,function(e,i){return n("Period",{key:i,attrs:{period:e},on:{input:function(e){return t.updatePeriod(i,e)},delete:function(e){return t.deletePeriod(i)}}})}),n("button",{on:{click:t.addPeriod}},[t._v("+")])],2),n("div",[n("button",{attrs:{disabled:!t.isConfValid},on:{click:t.update}},[t._v("\n                Test\n            ")]),t.isValid?n("button",{on:{click:t.toHome}},[t._v("\n                Voir les départs\n            ")]):n("button",{attrs:{disabled:""}},[t._v("\n                Configuration invalide\n            ")])]),n("div",{class:t.fetchState},[t._v("\n            "+t._s(t.statusText)+"\n        ")])])])},B=[],V=n("a4bb"),H=n.n(V),W=(n("4917"),n("6b54"),n("b6d0")),G=n.n(W),J={sncf:{station:"https://%(token)s@api.sncf.com/v1/coverage/sncf/stop_areas/stop_area%3A%(station)s/departures",position:"https://%(token)s@api.sncf.com/v1/coverage/sncf/coord/%(lng)s%3B%(lat)s/departures?distance=%(distance)s"},stif:{position:"https://opendata.stif.info/service/api-stif-horaires/coords/%(lng)s%3B%(lat)s/departures?count=%(nbItems)s&distance=%(distance)s&apikey=%(token)s"}},q=new G.a;function F(t){var e=new Date,n=e.getHours(),i=e.getMinutes(),a=t.silentPeriods;return a.some(function(t){return t.from.hour<=n&&t.from.minute<=i&&t.to.hour>=n&&t.to.minute>=i})}function K(t,e){return q.clear(),e||(e=J[t.apiName]),e.replace(/%\((\w+)\)s/g,function(e,n){var i=t[n];""!==i.toString()&&void 0!==i&&null!==i||q.add(n)}),!q.size}function Q(t,e){var n=J[t],i=n&&n[e],a=/%\(([^)]+)\)s/g,o=i.match(a);return o.map(function(t){return t.replace(a,"$1")})}function X(t,e,n){var i=t.state,a=t.commit,o=i.cacheUrl;if(o)return o;var r=J[e];return o=r&&r[n],o&&K(i,o)?(o=o.replace(/%\((\w+)\)s/g,function(t,e){return encodeURIComponent(i[e])}),a&&a("setCacheUrl",o),o):""}var Y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.distance,expression:"distance"}],attrs:{type:"range",min:"1",max:"50"},domProps:{value:t.distance},on:{__r:function(e){t.distance=e.target.value}}}),t._v("\n    "+t._s(t.distanceLabel)+"\n")])},Z=[],tt=n("e814"),et=n.n(tt),nt=(n("7872"),{name:"distanceRange",props:{departure:Object},computed:{distance:{get:function(){return this.convertIn(this.$store.state.distance)},set:function(t){this.$store.commit("setConfiguration",{distance:this.convertOut(t)})}},distanceLabel:function(){var t=this.convertOut(this.distance);return t<1e3?"".concat(t,"m"):(t=Math.round(t/100)/10,"".concat(t,"km"))}},methods:{convertIn:function(t){var e=Math.floor(Math.log10(t)),n=Math.floor(t/Math.pow(10,e))-1,i=10*e+n;return et()(i.toString(),9)},convertOut:function(t){t=+t.toString(9);var e=Math.floor(t/10),n=t%10+1,i=Math.pow(10,e)*n;return i}}}),it=nt,at=Object(u["a"])(it,Y,Z,!1,null,"02ef864c",null),ot=at.exports,rt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",[n("span",{staticClass:"mainElement",on:{click:function(e){t.show=!0,t.initialize()}}},[t._v("\n        "+t._s(t.value)+"\n    ")]),t.show?n("dialog",{staticClass:"map"},[n("header",[t._v("Position")]),n("LMap",{ref:"map",staticStyle:{height:"100%",width:"100%"},attrs:{zoom:t.zoom,center:t.mapCenter},on:{click:t.setCenter}},[n("LTileLayer",{attrs:{url:t.url}}),n("LCircle",{attrs:{"lat-lng":t.center,radius:t.radius,color:"red"}})],1),n("aside",[t._v("lat: "+t._s(t.lat)+" lng: "+t._s(t.lng))]),n("aside",[n("label",[t._v("\n                Distance: "),n("DistanceRange")],1)]),n("footer",[n("span",[t._v(t._s(t.message))]),n("button",{on:{click:t.getPosition}},[t._v("Ma position actuelle")]),n("button",{on:{click:function(e){t.show=!1}}},[t._v("Close")])])],1):t._e()])},st=[],ct=(n("6cc5"),n("2699")),ut=n("a40a"),lt=n("0dbd"),dt=n("e11e"),ft=n.n(dt),pt={name:"geomap",props:{value:String},data:function(){return this.$nextTick(this.initialize),{show:!1,url:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",zoom:this.value?16:5,mapCenter:[46.34432063334355,2.605306736102118],message:""}},computed:{lat:function(){return this.value?+this.value.split(";")[0]:0},lng:function(){return this.value?+this.value.split(";")[1]:0},center:function(){return[this.lat,this.lng]},radius:function(){return this.$store.state.distance}},methods:{initialize:function(){var t=this;this.value&&(this.mapCenter=this.center.slice(),this.$nextTick(function(){var e=t.radius;if(t.$refs.map&&e){var n=ft.a.latLng(t.mapCenter);t.$refs.map.fitBounds(n.toBounds(e))}}))},getPosition:function(){var t=this;this.message="Géolocalisation en cours...",navigator.geolocation.getCurrentPosition(function(e){t.message="";var n=e.coords,i=n.latitude,a=n.longitude;t.$emit("input","".concat(i,";").concat(a)),t.mapCenter=[i,a];var o=e.coords.accuracy,r=ft.a.latLng(i,a);t.$refs.map.fitBounds(r.toBounds(o)),console.log("accuracy",e.coords.accuracy)},this.manageError,{enableHighAccuracy:!0})},manageError:function(t){switch(t.code){case t.PERMISSION_DENIED:this.message="Vous avez refusé la géolocalisation.";break;case t.POSITION_UNAVAILABLE:this.message="La géolocalisation n'a pas pu être réalisée.";break;case t.TIMEOUT:this.message="La géolocalisation a mis trop de temps.";break;default:this.message=t.message}},setCenter:function(t){var e=t.latlng,n=e.lat,i=e.lng;this.$emit("input",[n,i].join(";"))}},components:{DistanceRange:ot,LMap:ct["a"],LTileLayer:ut["a"],LCircle:lt["a"]}},mt=pt,ht=(n("f4fa"),Object(u["a"])(mt,rt,st,!1,null,"e42c29da",null)),vt=ht.exports,gt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._v("\n    de\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.fromTime,expression:"fromTime"}],attrs:{type:"time"},domProps:{value:t.fromTime},on:{input:function(e){e.target.composing||(t.fromTime=e.target.value)}}}),t._v("\n    à\n    "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.toTime,expression:"toTime"}],attrs:{type:"time"},domProps:{value:t.toTime},on:{input:function(e){e.target.composing||(t.toTime=e.target.value)}}}),n("button",{staticClass:"delete",on:{click:function(e){return t.$emit("delete")}}},[t._v("×")])])},bt=[],_t={name:"Period",props:{period:Object},computed:{fromTime:{get:function(){return this.buildHour(this.period.from)},set:function(t){if(t){var e=t.split(":").map(function(t){return+t}),n=Object(i["a"])(e,2),a=n[0],o=n[1];this.period.from={hour:a,minute:o},this.$emit("input",this.period)}}},toTime:{get:function(){return this.buildHour(this.period.to)},set:function(t){if(t){var e=t.split(":").map(function(t){return+t}),n=Object(i["a"])(e,2),a=n[0],o=n[1];this.period.to={hour:a,minute:o},this.$emit("input",this.period)}}}},methods:{buildHour:function(t){var e=t.hour,n=t.minute;return e<10&&(e="0".concat(e)),n<10&&(n="0".concat(n)),"".concat(e,":").concat(n)}}},kt=_t,Tt=(n("4aac"),Object(u["a"])(kt,gt,bt,!1,null,"1be11aae",null)),$t=Tt.exports,yt={name:"configuration",computed:{token:{get:function(){return this.$store.state.token},set:function(t){this.$store.commit("setConfiguration",{token:t})}},stationId:{get:function(){return this.$store.state.station},set:function(t){this.$store.commit("setConfiguration",{station:t})}},latLng:{get:function(){return this.$store.state.lat+";"+this.$store.state.lng},set:function(t){var e=t.split(";"),n=Object(i["a"])(e,2),a=n[0],o=n[1];this.$store.commit("setConfiguration",{lat:a,lng:o})}},refreshTime:{get:function(){return this.$store.state.refreshTime/1e3},set:function(t){this.$store.commit("setConfiguration",{refreshTime:1e3*t})}},silentPeriods:{get:function(){return this.$store.state.silentPeriods.slice()},set:function(t){this.$store.commit("setConfiguration",{silentPeriods:t})}},apiName:{get:function(){return this.$store.state.apiName},set:function(t){this.$store.commit("setConfiguration",{apiName:t})}},apiMode:{get:function(){return this.$store.state.apiMode},set:function(t){this.$store.commit("setConfiguration",{apiMode:t})}},fetchState:function(){return this.$store.state.fetchState},errors:function(){return q},tags:function(){return Q(this.apiName,this.apiMode)},statusText:function(){var t={good:"La configuration est bonne.",bad:"La configuration n'est pas correcte !",testing:"Test de la configuration en cours...",offline:"Aucune connexion internet pour tester la ligne..."};return t[this.fetchState]},isConfValid:function(){return!!X(this.$store,this.apiName,this.apiMode)},isValid:function(){return this.isConfValid&&"good"===this.fetchState},apiOptions:function(){return H()(J).map(function(t){return{id:t,label:t}})},apiModeOptions:function(){return H()(J[this.apiName]).map(function(t){return{id:t,label:t}})}},methods:{update:function(){this.$store.commit("setStatus",{fetchState:"testing"}),this.$store.dispatch("update")},toHome:function(){this.$router.push("home")},addPeriod:function(){var t=this.silentPeriods;t.push({from:{hour:0,minute:0},to:{hour:23,minute:59}}),this.silentPeriods=t},updatePeriod:function(t,e){var n=this.silentPeriods;n[t]=e,this.silentPeriods=n},deletePeriod:function(t){var e=this.silentPeriods;e.splice(t,1),this.silentPeriods=e}},components:{DistanceRange:ot,GeoMap:vt,Period:$t}},xt=yt,Pt=(n("2a3c"),Object(u["a"])(xt,R,B,!1,null,"3c702400",null)),Ct=Pt.exports;a["a"].use(f["a"]);var St=new f["a"]({mode:"hash",base:"/",routes:[{path:"*/home",name:"home",component:L,alias:"*/"},{path:"*/about",name:"about",component:D},{path:"*/configuration",name:"configuration",component:Ct},{path:"*",name:"Default",redirect:"home"}]}),wt=(n("6762"),n("2fdb"),n("96cf"),n("3b8d")),Ot=n("f499"),Nt=n.n(Ot),Mt=n("2f62");a["a"].use(Mt["a"]);var Lt=0,jt=new Mt["a"].Store({state:{departures:[],context:{timezone:"Europe/Paris",current_datetime:""},token:"",station:"",distance:200,lat:48.937591,lng:2.157858,silentPeriods:[],refreshTime:3e4,nbItems:10,apiName:"sncf",apiMode:"position",fetchState:"good",onLine:!0,cacheUrl:""},mutations:{setState:function(t,e){var n=e.departures,i=e.context;t.departures=n,t.context=i},setConfiguration:function(t,e){var n=e.token,i=e.station,a=e.distance,o=e.lat,r=e.lng,s=e.refreshTime,c=e.apiName,u=e.apiMode,l=e.silentPeriods,d=e.nbItems;"string"===typeof n&&(t.token=n),"string"===typeof i&&(t.station=i),"undefined"!==typeof a&&(a=+a,!isNaN(a)&&a>0?t.distance=a:t.distance=200),isNaN(o)||isNaN(r)?void 0===o&&void 0===r||(t.lat=0,t.lng=0):(t.lat=+o,t.lng=+r),"undefined"!==typeof s&&(s=+s,!isNaN(s)&&s>0?t.refreshTime=s:t.refreshTime=30),l instanceof Array&&(t.silentPeriods=l.slice()),"undefined"!==typeof d&&(d=+d,!isNaN(d)&&d>0?t.nbItems=d:t.nbItems=10),"string"===typeof c&&(t.apiName=c),"string"===typeof u&&(t.apiMode=u),t.cacheUrl="";var f={token:t.token,station:t.station,distance:t.distance,lat:t.lat,lng:t.lng,refreshTime:t.refreshTime,silentPeriods:t.silentPeriods,nbItems:t.nbItems,apiName:t.apiName,apiMode:t.apiMode};localStorage.nextTrainConfig=Nt()(f)},setStatus:function(t,e){var n=e.fetchState,i=e.onLine;n&&(t.fetchState=n),"boolean"===typeof i&&(t.onLine=i)},setCacheUrl:function(t,e){t.cacheUrl=e}},actions:{initialize:function(t){var e=t.commit,n=t.dispatch;e("setStatus",{onLine:navigator.onLine}),navigator.connection&&(navigator.connection.onchange=function(){e("setStatus",{onLine:navigator.onLine})}),n("update")},update:function(){var t=Object(wt["a"])(regeneratorRuntime.mark(function t(e){var n,i,a,o,r,s,c,u;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.commit,i=e.dispatch,a=e.state,a.onLine){t.next=5;break}return n("setStatus",{fetchState:"offline"}),i("nextUpdate"),t.abrupt("return");case 5:if(o=X({state:a,commit:n},a.apiName,a.apiMode),!o){t.next=24;break}return r={"Content-Type":"text/plain"},o.includes("@")&&(o=o.replace(/(https?:\/\/)([^@]+)@/,function(t,e,n){return s=n,e}),r.Authorization="Basic "+btoa(s)),t.next=11,fetch(o,{credentials:"same-origin",headers:r}).catch(function(t){return console.warn("Error in request:",t.message),{ok:!1}});case 11:if(c=t.sent,c.ok){t.next=16;break}return console.warn("Data failed to be fetched"),n("setStatus",{fetchState:"bad"}),t.abrupt("return");case 16:return t.next=18,c.json();case 18:u=t.sent,n("setState",u),n("setStatus",{fetchState:"good"}),i("nextUpdate"),t.next=26;break;case 24:console.info("we cannot fetch data without token and station id"),n("setStatus",{fetchState:"bad"});case 26:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}(),nextUpdate:function(t){var e=t.dispatch,n=t.state;clearTimeout(Lt);var i=n.refreshTime;Lt=setTimeout(function(){F(n)?e("nextUpdate"):e("update")},i)}}});function It(){var t=JSON.parse(localStorage.nextTrainConfig||"{}");document.location.search.slice(1).split("&").forEach(function(e){var n=e.split("="),a=Object(i["a"])(n,2),o=a[0],r=a[1];t[o]=decodeURIComponent(r)}),jt.commit("setConfiguration",t),jt.dispatch("initialize")}a["a"].config.productionTip=!1,new a["a"]({router:St,store:jt,render:function(t){return t(d)}}).$mount("#app"),It()},6366:function(t,e,n){"use strict";var i=n("e197"),a=n.n(i);a.a},"64a9":function(t,e,n){},"6b70":function(t,e,n){},9224:function(t){t.exports={a:"1.0.6"}},c990:function(t,e,n){},d424:function(t,e,n){},de69:function(t,e,n){},e197:function(t,e,n){},f4fa:function(t,e,n){"use strict";var i=n("d424"),a=n.n(i);a.a}});
//# sourceMappingURL=app.b65a7542.js.map