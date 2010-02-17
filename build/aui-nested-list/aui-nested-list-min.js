AUI.add("aui-nested-list",function(W){var P=W.Lang,S=P.isString,B=P.isFunction,h="block",c="body",Z="dd",d="display",b="down",V="dragNode",g="dropCondition",C="dropContainer",i="dropOn",U="float",X="height",H="helper",e="hidden",T="left",f="nested-list",j="node",K="nodes",Q="none",G="offsetHeight",F="placeholder",M="proxy",O="px",R="right",E="sortCondition",J="up",N="visibility",a="visible",I=W.DD.DDM,Y=function(A){return(A instanceof W.NodeList);};function D(A){D.superclass.constructor.apply(this,arguments);}W.mix(D,{NAME:f,ATTRS:{dd:{value:null},dropCondition:{value:function(){return true;},setter:function(A){return W.bind(A,this);},validator:B},dropContainer:{value:function(m){var A=this;var L=m.drop;var k=L.get(j);var l=A.get(i);return k.one(l);},validator:B},dropOn:{validator:S},helper:{value:null},nodes:{setter:function(A){return this._setNodes(A);}},placeholder:{value:null},proxy:{value:null,setter:function(A){return W.merge({moveOnEnd:false,positionProxy:false},A||{});}},sortCondition:{value:function(){return true;},setter:function(A){return W.bind(A,this);},validator:B}}});W.extend(D,W.Base,{initializer:function(){var A=this;var L=A.get(K);A.on("drag:align",A._onDragAlign);A.on("drag:end",A._onDragEnd);A.on("drag:exit",A._onDragExit);A.on("drag:mouseDown",A._onDragMouseDown);A.on("drag:over",A._onDragOver);A.on("drag:start",A._onDragStart);A._createHelper();if(L){A.addAll(L);}},add:function(L){var A=this;A._createDrag(L);},addAll:function(L){var A=this;L.each(function(k){A.add(k);});},_createDrag:function(n){var L=this;var m=L.get(H);if(!I.getDrag(n)){var l={bubbleTargets:L,node:n,target:true};var k=L.get(M);if(m){k.borderStyle=null;}var A=new W.DD.Drag(W.mix(l,L.get(Z))).plug(W.Plugin.DDProxy,k);}},_createHelper:function(){var A=this;var L=A.get(H);if(L){W.get(c).append(L.hide());A.set(H,L);}},_updatePlaceholder:function(L,w){var u=this;var o=L.target;var k=L.drop;var m=o.get(j);var s=k.get(j);var v=u.get(i);var n=u.get(C);if(n){var A=n.apply(u,arguments);}var q=false;var l=u.XDirection;var r=u.YDirection;if(s.getStyle(U)!=Q){q=true;}var t=u.get(F);if(!t){t=m;}if(!t.contains(s)){var p=u.get(g);if(A&&!w&&p(L)){if(!A.contains(t)&&!t.contains(A)){A.append(t);}}else{if(q&&(l==T)||!q&&(r==J)){s.placeBefore(t);}else{s.placeAfter(t);}}}},_onDragAlign:function(l){var L=this;var m=L.lastX;var k=L.lastY;var n=l.target.lastXY;var A=n[0];var o=n[1];if(o!=k){L.YDirection=(o<k)?J:b;}if(A!=m){L.XDirection=(A<m)?T:R;}L.lastX=A;L.lastY=o;},_onDragEnd:function(k){var A=this;var L=k.target;var l=L.get(j);var m=A.get(F);if(m){l.show();m.hide();if(!l.contains(m)){m.placeAfter(l);}}},_onDragExit:function(L){var A=this;var k=A.get(E);if(k(L)){A._updatePlaceholder(L,true);}},_onDragMouseDown:function(l){var A=this;var L=l.target;var k=A.get(H);if(k){L.set(V,k);}},_onDragStart:function(m){var A=this;var L=m.target;var l=L.get(j);var k=A.get(H);var n=A.get(F);if(n){n.setStyle(X,l.get(G)+O);l.hide();n.show();l.placeAfter(n);if(k){k.setStyles({display:h,visibility:a}).show();}}},_onDragOver:function(L){var A=this;var k=A.get(E);if(k(L)){A._updatePlaceholder(L);}},_setNodes:function(L){var A=this;if(Y(L)){return L;}else{if(S(L)){return W.all(L);}}return new W.NodeList([L]);}});W.NestedList=D;},"@VERSION@",{skinnable:false,requires:["aui-base","dd"]});