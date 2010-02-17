AUI.add("aui-tree-data",function(P){var H=P.Lang,M=H.isArray,K=H.isObject,N=H.isString,D=H.isUndefined,Y="boundingBox",F="children",Q="container",S=".",I="id",W="index",V="nextSibling",a="node",E="ownerTree",G="parentNode",T="prevSibling",R="previousSibling",U="tree",C="tree-data",O=function(A){return P.get(A);},J=function(A){return(A instanceof P.TreeNode);},X=P.ClassNameManager.getClassName,B=X(U,a);function Z(A){Z.superclass.constructor.apply(this,arguments);}P.mix(Z,{NAME:C,ATTRS:{container:{setter:O},children:{value:[],validator:M,setter:function(A){return this._setChildren(A);}},index:{value:{}}}});P.extend(Z,P.Widget,{initializer:function(){var A=this;A.publish("move");A.publish("collapseAll",{defaultFn:A._collapseAll});A.publish("expandAll",{defaultFn:A._expandAll});A.publish("append",{defaultFn:A._appendChild});A.publish("remove",{defaultFn:A._removeChild});Z.superclass.initializer.apply(this,arguments);},getNodeById:function(L){var A=this;return A.get(W)[L];},isRegistered:function(L){var A=this;return !!(A.get(W)[L.get(I)]);},updateReferences:function(c,d,g){var h=this;var f=c.get(G);var A=c.get(E);var e=f&&(f!=d);if(f){if(e){var L=f.get(F);P.Array.removeItem(L,h);f.set(F,L);}f.unregisterNode(c);}if(A){A.unregisterNode(c);}c.set(G,d);c.set(E,g);if(d){d.registerNode(c);}if(g){g.registerNode(c);}if(A!=g){c.eachChildren(function(i){h.updateReferences(i,i.get(G),g);});}if(e){var b=h.getEventOutputMap(c);b.tree.oldParent=f;b.tree.oldOwnerTree=A;h.bubbleEvent("move",b);}},refreshIndex:function(){var A=this;A.updateIndex({});A.eachChildren(function(L){A.registerNode(L);},true);},registerNode:function(c){var A=this;var b=c.get(I);var L=A.get(W);if(b){L[b]=c;}A.updateIndex(L);},updateIndex:function(L){var A=this;if(L){A.set(W,L);}},unregisterNode:function(b){var A=this;var L=A.get(W);delete L[b.get(I)];A.updateIndex(L);},collapseAll:function(){var A=this;var L=A.getEventOutputMap(A);A.fire("collapseAll",L);},_collapseAll:function(L){var A=this;A.eachChildren(function(b){b.collapse();},true);},expandAll:function(){var A=this;var L=A.getEventOutputMap(A);A.fire("expandAll",L);},_expandAll:function(L){var A=this;A.eachChildren(function(b){b.expand();},true);},selectAll:function(){var A=this;A.eachChildren(function(L){L.select();},true);},unselectAll:function(){var A=this;A.eachChildren(function(L){L.unselect();},true);},eachChildren:function(c,L){var A=this;var b=A.getChildren(L);P.Array.each(b,function(d){if(d){c.apply(A,arguments);}});},eachParent:function(b){var L=this;var A=L.get(G);while(A){if(A){b.apply(L,[A]);}A=A.get(G);}},bubbleEvent:function(d,c,e,b){var L=this;L.fire(d,c);if(!e){var A=L.get(G);c=c||{};if(D(b)){b=true;}c.stopActionPropagation=b;while(A){A.fire(d,c);A=A.get(G);}}},createNode:function(L){var A=this;var b=L.type;if(N(b)&&P.TreeNode.nodeTypes){b=P.TreeNode.nodeTypes[b];}if(!b){b=P.TreeNode;}return new b(L);},appendChild:function(c,b){var A=this;var L=A.getEventOutputMap(c);A.bubbleEvent("append",L,b);},_appendChild:function(g){if(g.stopActionPropagation){return false;}var A=this;var f=g.tree.node;var L=A.get(E);var d=A.get(F);A.updateReferences(f,A,L);var e=d.push(f);A.set(F,d);var c=e-2;var b=A.item(c);f.set(V,null);f.set(T,b);A.get(Q).append(f.get(Y));f.render();},item:function(L){var A=this;return A.get(F)[L];},indexOf:function(L){var A=this;return P.Array.indexOf(A.get(F),L);},hasChildNodes:function(){return(this.get(F).length>0);},getChildren:function(L){var A=this;var c=[];var b=A.get(F);c=c.concat(b);if(L){A.eachChildren(function(d){c=c.concat(d.getChildren(L));});}return c;},getEventOutputMap:function(L){var A=this;return{tree:{instance:A,node:L||A}};},removeChild:function(b){var A=this;var L=A.getEventOutputMap(b);A.bubbleEvent("remove",L);},_removeChild:function(d){if(d.stopActionPropagation){return false;}var A=this;var c=d.tree.node;var L=A.get(E);if(A.isRegistered(c)){c.set(G,null);A.unregisterNode(c);c.set(E,null);if(L){L.unregisterNode(c);}c.get(Y).remove();var b=A.get(F);P.Array.removeItem(b,c);A.set(F,b);}},empty:function(){var A=this;A.eachChildren(function(b){var L=b.get(G);if(L){L.removeChild(b);}});},insert:function(g,d,e){var j=this;d=d||this;if(d==g){return false;}var A=d.get(G);if(g&&A){var f=g.get(Y);var c=d.get(Y);var i=d.get(E);if(e=="before"){c.placeBefore(f);}else{if(e=="after"){c.placeAfter(f);}}var L=[];var h=A.get(Y).all("> ul > li");h.each(function(k){L.push(P.Widget.getByNode(k));});g.set(V,P.Widget.getByNode(f.get(V)));g.set(T,P.Widget.getByNode(f.get(R)));d.updateReferences(g,A,i);A.set(F,L);}g.render();var b=d.getEventOutputMap(g);b.tree.refTreeNode=d;d.bubbleEvent("insert",b);},insertAfter:function(L,A){A.insert(L,A,"after");},insertBefore:function(L,A){A.insert(L,A,"before");},getNodeByChild:function(b){var A=this;var L=b.ancestor(S+B);if(L){return A.getNodeById(L.attr(I));}return null;},_setChildren:function(L){var A=this;var b=[];P.Array.each(L,function(c){if(c){if(!J(c)&&K(c)){c=A.createNode(c);}c.render();if(P.Array.indexOf(b,c)==-1){b.push(c);}}});return b;}});P.TreeData=Z;},"@VERSION@",{skinnable:false,requires:["aui-base"]});AUI.add("aui-tree-node",function(AB){var v=AB.Lang,AZ=v.isString,AR=v.isBoolean,Ag="alwaysShowHitArea",n="",S="boundingBox",G="children",AV="clearfix",Y="collapsed",B="container",z="content",W="contentBox",J="expanded",O="helper",s="hidden",g="hitarea",F="hitAreaEl",r="icon",Af="iconEl",AN="id",AF="label",t="labelEl",q="lastSelected",AU="leaf",Q="node",AH="over",w="ownerTree",E="parentNode",AT="selected",T=" ",H="tree",h="tree-node",U=function(A){return AB.get(A);},Ac=function(){return Array.prototype.slice.call(arguments).join(T);},AK=function(A){return(A instanceof AB.TreeNode);},Ab=function(A){return(A instanceof AB.TreeView);},f=AB.ClassNameManager.getClassName,AD=f(O,AV),Z=f(H,Y),C=f(H,B),Ah=f(H,J),V=f(H,s),AO=f(H,g),e=f(H,r),K=f(H,AF),d=f(H,Q,z),AP=f(H,Q,s,g),I=f(H,Q,AU),AY=f(H,Q,AH),i=f(H,Q,AT),AA='<div class="'+AO+'"></div>',R='<div class="'+e+'"></div>',D='<div class="'+K+'"></div>',Ae="<ul></ul>",X="<li></li>",x='<div class="'+Ac(AD,d)+'"></div>';
function l(A){l.superclass.constructor.apply(this,arguments);}AB.mix(l,{NAME:h,ATTRS:{draggable:{value:true,validator:AR},ownerTree:{value:null},label:{value:n,validator:AZ},expanded:{value:false,validator:AR},id:{validator:AZ},leaf:{value:true,setter:function(A){if(A&&this.get(G).length){return false;}return A;},validator:AR},nextSibling:{value:null,validator:AK},prevSibling:{value:null,validator:AK},parentNode:{value:null,validator:function(A){return AK(A)||Ab(A);}},labelEl:{setter:U,valueFn:function(){var A=this.get(AF);return AB.Node.create(D).html(A).unselectable();}},hitAreaEl:{setter:U,valueFn:function(){return AB.Node.create(AA);}},alwaysShowHitArea:{value:true,validator:AR},iconEl:{setter:U,valueFn:function(){return AB.Node.create(R);}},tabIndex:{value:null}}});AB.extend(l,AB.TreeData,{BOUNDING_TEMPLATE:X,CONTENT_TEMPLATE:x,initializer:function(){var A=this;if(!A.get(AN)){A.set(AN,AB.guid(h));}l.superclass.initializer.apply(this,arguments);},bindUI:function(){var A=this;A.publish("collapse",{defaultFn:A._collapse});A.publish("expand",{defaultFn:A._expand});A.after("childrenChange",AB.bind(A._afterSetChildren,A));A.after("idChange",A._afterSetId,A);},_renderUI:function(A){this._renderBoxClassNames();},renderUI:function(){var A=this;A._renderBoundingBox();A._renderContentBox();},syncUI:function(){var A=this;A._syncHitArea(A.get(G));},_renderContentBox:function(Ak){var A=this;var L=A.get(W);if(A.isLeaf()){L.addClass(I);}else{L.addClass(A.get(J)?Ah:Z);}return L;},_renderBoundingBox:function(){var A=this;var Ak=A.get(S);var L=A.get(W);var Al=null;if(!A.isLeaf()){L.append(A.get(F));Al=A._createNodeContainer();}L.append(A.get(Af));L.append(A.get(t));Ak.append(L);if(Al){if(!A.get(J)){Al.addClass(V);}Ak.append(Al);}return Ak;},_createNodeContainer:function(){var A=this;var L=A.get(B)||AB.Node.create(Ae);L.addClass(C);A.set(B,L);A.eachChildren(function(Ak){A.appendChild(Ak);});return L;},_syncHitArea:function(L){var A=this;if(A.get(Ag)||L.length){A.showHitArea();}else{A.hideHitArea();A.collapse();}},appendChild:function(){var A=this;if(!A.isLeaf()){l.superclass.appendChild.apply(A,arguments);}},collapse:function(){var A=this;if(A.get(J)){var L=A.getEventOutputMap(A);A.bubbleEvent("collapse",L);}},_collapse:function(Al){if(Al.stopActionPropagation){return false;}var A=this;if(!A.isLeaf()){var Ak=A.get(B);var L=A.get(W);L.replaceClass(Ah,Z);if(Ak){Ak.addClass(V);}A.set(J,false);}},collapseAll:function(){var A=this;l.superclass.collapseAll.apply(A,arguments);A.collapse();},contains:function(A){return A.isAncestor(this);},expand:function(){var A=this;if(!A.get(J)){var L=A.getEventOutputMap(A);A.bubbleEvent("expand",L);}},_expand:function(Al){if(Al.stopActionPropagation){return false;}var A=this;if(!A.isLeaf()){var Ak=A.get(B);var L=A.get(W);L.replaceClass(Z,Ah);if(Ak){Ak.removeClass(V);}A.set(J,true);}},expandAll:function(){var A=this;l.superclass.expandAll.apply(A,arguments);A.expand();},getDepth:function(){var Ak=0;var L=this;var A=L.get(E);while(A){++Ak;A=A.get(E);}return Ak;},hasChildNodes:function(){var A=this;return(!A.isLeaf()&&l.superclass.hasChildNodes.apply(this,arguments));},isSelected:function(){return this.get(W).hasClass(i);},isLeaf:function(){var A=this;return A.get(AU);},isAncestor:function(Ak){var L=this;var A=L.get(E);while(A){if(A==Ak){return true;}A=A.get(E);}return false;},insertAfter:function(Ak,L){var A=this;l.superclass.insertAfter.apply(this,[Ak,A]);},insertBefore:function(L){var A=this;l.superclass.insertBefore.apply(this,[L,A]);},removeChild:function(L){var A=this;if(!A.isLeaf()){l.superclass.removeChild.apply(A,arguments);}},toggle:function(){var A=this;if(A.get(J)){A.collapse();}else{A.expand();}},select:function(){var A=this;var L=A.get(w);if(L){L.set(q,A);}A.get(W).addClass(i);A.fire("select");},unselect:function(){var A=this;A.get(W).removeClass(i);A.fire("unselect");},over:function(){this.get(W).addClass(AY);},out:function(){this.get(W).removeClass(AY);},showHitArea:function(){var A=this;var L=A.get(F);L.removeClass(AP);},hideHitArea:function(){var A=this;var L=A.get(F);L.addClass(AP);},_afterSetChildren:function(L){var A=this;A._syncHitArea(L.newVal);},_afterSetId:function(L){var A=this;A.get(S).attr(AN,L.newVal);}});AB.TreeNode=l;var AQ=v.isFunction,Aa="cache",AG="io",Ad="loaded",Ai="loading",AM="tree-node-io",a=f(H,Q,AG,Ai);function k(A){k.superclass.constructor.apply(this,arguments);}AB.mix(k,{NAME:AM,ATTRS:{io:{lazyAdd:false,value:null,setter:function(A){return this._setIO(A);}},loading:{value:false,validator:AR},loaded:{value:false,validator:AR},cache:{value:true,validator:AR},leaf:{value:false,validator:AR}}});AB.extend(k,AB.TreeNode,{createNode:function(L){var A=this;AB.each(L,function(Al){var Ak=k.superclass.createNode.apply(A,[Al]);A.appendChild(Ak);});},expand:function(){var L=this;var Ak=L.get(Aa);var Ao=L.get(AG);var Am=L.get(Ad);var An=L.get(Ai);var Al=L.get(w);if(!Ao&&Al){L.set(AG,AB.clone(Al.get(AG)));Ao=L.get(AG);}if(!Ak){L.set(Ad,false);}if(!Ao||Am){k.superclass.expand.apply(this,arguments);}else{if(!An){if(!Ak){L.empty();}if(AQ(Ao.cfg.data)){Ao.cfg.data=Ao.cfg.data.apply(L,[L]);}if(AQ(Ao.loader)){var A=AB.bind(Ao.loader,L);A(Ao.url,Ao.cfg,L);}else{AB.io(Ao.url,Ao.cfg);}}}},ioStartHandler:function(){var A=this;var L=A.get(W);A.set(Ai,true);L.addClass(a);},ioCompleteHandler:function(){var A=this;var L=A.get(W);A.set(Ai,false);A.set(Ad,true);L.removeClass(a);},ioSuccessHandler:function(){var A=this;var Ap=A.get(AG);var Ak=Array.prototype.slice.call(arguments);var Am=Ak.length;var L=Ak[0];if(Am>=2){var Ao=Ak[1];try{L=AB.JSON.parse(Ao.responseText);}catch(An){}}var Al=Ap.formatter;if(Al){L=Al(L);}A.createNode(L);A.expand();},ioFailureHandler:function(){var A=this;A.set(Ai,false);A.set(Ad,false);},_setIO:function(Ak){var A=this;if(!Ak){return null;}else{if(AZ(Ak)){Ak={url:Ak};}}Ak=Ak||{};Ak.cfg=Ak.cfg||{};Ak.cfg.on=Ak.cfg.on||{};var L={start:AB.bind(A.ioStartHandler,A),complete:AB.bind(A.ioCompleteHandler,A),success:AB.bind(A.ioSuccessHandler,A),failure:AB.bind(A.ioFailureHandler,A)};
AB.each(L,function(An,Al){var Ao=Ak.cfg.on[Al];if(AQ(Ao)){var Am=function(){An.apply(A,arguments);Ao.apply(A,arguments);};Ak.cfg.on[Al]=AB.bind(Am,A);}else{Ak.cfg.on[Al]=An;}});return Ak;}});AB.TreeNodeIO=k;var M="checkbox",P="checked",y="checkContainerEl",AW="checkEl",m="checkName",u=".",N="name",b="tree-node-check",AE=f(H,Q,M),AJ=f(H,Q,M,B),AL=f(H,Q,P),p='<div class="'+AJ+'"></div>',AI='<input class="'+AE+'" type="checkbox" />';function AS(A){AS.superclass.constructor.apply(this,arguments);}AB.mix(AS,{NAME:b,ATTRS:{checked:{value:false,validator:AR},checkName:{value:b,validator:AZ},checkContainerEl:{setter:U,valueFn:function(){return AB.Node.create(p);}},checkEl:{setter:U,valueFn:function(){var A=this.get(m);return AB.Node.create(AI).attr(N,A);}}}});AB.extend(AS,AB.TreeNodeIO,{renderUI:function(){var L=this;AS.superclass.renderUI.apply(L,arguments);var Ak=L.get(t);var A=L.get(AW);var Al=L.get(y);A.hide();Al.append(A);Ak.placeBefore(Al);if(L.isChecked()){L.check();}},bindUI:function(){var A=this;var L=A.get(W);var Ak=A.get(t);AS.superclass.bindUI.apply(A,arguments);A.publish("check");A.publish("uncheck");L.delegate("click",AB.bind(A.toggleCheck,A),u+AJ);L.delegate("click",AB.bind(A.toggleCheck,A),u+K);Ak.swallowEvent("dblclick");},check:function(){var L=this;var Ak=L.get(W);var A=L.get(AW);Ak.addClass(AL);L.set(P,true);A.attr(P,P);L.fire("check");},uncheck:function(){var L=this;var Ak=L.get(W);var A=L.get(AW);Ak.removeClass(AL);L.set(P,false);A.attr(P,n);L.fire("uncheck");},toggleCheck:function(){var L=this;var A=L.get(AW);var Ak=A.attr(P);if(!Ak){L.check();}else{L.uncheck();}},isChecked:function(){var A=this;return A.get(P);}});AB.TreeNodeCheck=AS;var c="child",o="tree-node-task",j="unchecked",AX=function(A){return A instanceof AB.TreeNodeCheck;},AC=f(H,Q,c,j);function Aj(A){Aj.superclass.constructor.apply(this,arguments);}AB.mix(Aj,{NAME:o});AB.extend(Aj,AB.TreeNodeCheck,{check:function(Al){var L=this;var A=L.get(E);var Ak=L.get(W);Aj.superclass.check.apply(this,arguments);if(!Al){Ak.removeClass(AC);L.eachParent(function(Am){if(AX(Am)){var An=false;Am.check(true);Am.get(W).addClass(AC);Am.eachChildren(function(Ao){if(AX(Ao)&&!Ao.isChecked()){An=true;}},true);if(!An){Am.get(W).removeClass(AC);}}});if(!L.isLeaf()){L.eachChildren(function(Am){if(AX(Am)){Am.check();}});}}},uncheck:function(){var A=this;var L=A.get(W);Aj.superclass.uncheck.apply(this,arguments);L.removeClass(AC);A.eachParent(function(Ak){if(AX(Ak)&&Ak.isChecked()){Ak.get(W).addClass(AC);}});if(!A.isLeaf()){A.eachChildren(function(Ak){if(Ak instanceof AB.TreeNodeCheck){Ak.uncheck();}});}}});AB.TreeNodeTask=Aj;AB.TreeNode.nodeTypes={task:AB.TreeNodeTask,check:AB.TreeNodeCheck,node:AB.TreeNode,io:AB.TreeNodeIO};},"@VERSION@",{skinnable:false,requires:["aui-tree-data","io","json"]});AUI.add("aui-tree-view",function(a){var S=a.Lang,T=S.isString,AO="boundingBox",g="children",I="container",AA="content",s="contentBox",o=".",AD="file",AL="hitarea",w="icon",AQ="label",C="lastSelected",V="leaf",AS="node",AI="ownerTree",AM="root",B=" ",AB="tree",i="tree-view",e="type",k="view",r=function(){return Array.prototype.slice.call(arguments).join(B);},x=function(A){return(A instanceof a.TreeNode);},Q=a.ClassNameManager.getClassName,d=Q(AB,AL),U=Q(AB,w),P=Q(AB,AQ),q=Q(AB,AS,AA),h=Q(AB,AM,I),K=Q(AB,k,AA);function X(A){X.superclass.constructor.apply(this,arguments);}a.mix(X,{NAME:i,ATTRS:{type:{value:AD,validator:T},lastSelected:{value:null,validator:x},io:{value:null}}});a.extend(X,a.TreeData,{CONTENT_TEMPLATE:"<ul></ul>",bindUI:function(){var A=this;A._delegateDOM();},renderUI:function(){var A=this;A._renderElements();},syncUI:function(){var A=this;A.refreshIndex();},registerNode:function(L){var A=this;L.set(AI,A);X.superclass.registerNode.apply(this,arguments);},_createFromHTMLMarkup:function(L){var A=this;L.all("> li").each(function(AZ){var AX=AZ.one("> *").remove();var AW=AX.outerHTML();docFrag=null;var Aa=new a.TreeNode({boundingBox:AZ,label:AW});var AV=AZ.one("> ul");if(AV){Aa.set(V,false);Aa.set(I,AV);Aa.render();A._createFromHTMLMarkup(AV);}else{Aa.render();}var AU=AZ.get(W).get(W);var AY=a.Widget.getByNode(AU);AY.appendChild(Aa);});},_renderElements:function(){var A=this;var L=A.get(s);var AU=A.get(g);var AV=A.get(e);var AW=Q(AB,AV);L.addClass(K);A.set(I,L);L.addClass(r(AW,h));if(AU.length){A.eachChildren(function(AX){A.appendChild(AX,true);});}else{A._createFromHTMLMarkup(L);}},_delegateDOM:function(){var A=this;var L=A.get(AO);L.delegate("click",a.bind(A._onClickHitArea,A),o+d);L.delegate("dblclick",a.bind(A._onClickHitArea,A),o+U);L.delegate("dblclick",a.bind(A._onClickHitArea,A),o+P);L.delegate("mouseenter",a.bind(A._onMouseEnterNodeEl,A),o+q);L.delegate("mouseleave",a.bind(A._onMouseLeaveNodeEl,A),o+q);L.delegate("click",a.bind(A._onClickNodeEl,A),o+q);},_onClickNodeEl:function(L){var A=this;var AV=A.getNodeByChild(L.currentTarget);if(AV&&!AV.isSelected()){var AU=A.get(C);if(AU){AU.unselect();}AV.select();}},_onMouseEnterNodeEl:function(L){var A=this;var AU=A.getNodeByChild(L.currentTarget);if(AU){AU.over();}},_onMouseLeaveNodeEl:function(L){var A=this;var AU=A.getNodeByChild(L.currentTarget);if(AU){AU.out();}},_onClickHitArea:function(L){var A=this;var AU=A.getNodeByChild(L.currentTarget);if(AU){AU.toggle();}}});a.TreeView=X;var AT=S.isNumber,f="above",Z="append",AE="below",c="block",AJ="body",H="clearfix",AG="default",E="display",t="down",n="drag",Y="draggable",AP="dragCursor",O="dragNode",D="expanded",AH="helper",AF="insert",z="offsetHeight",W="parentNode",v="scrollDelay",M="state",AC="tree-drag-drop",j="up",N=a.DD.DDM,R=Q(AH,H),AN=Q(w),p=Q(AB,n,AH),J=Q(AB,n,AH,AA),b=Q(AB,n,AH,AQ),G=Q(AB,n,AF,f),AR=Q(AB,n,AF,Z),m=Q(AB,n,AF,AE),y=Q(AB,n,M,Z),l=Q(AB,n,M,AF,f),AK=Q(AB,n,M,AF,AE),F='<div class="'+p+'">'+'<div class="'+[J,R].join(B)+'">'+'<span class="'+AN+'"></span>'+'<span class="'+b+'"></span>'+"</div>"+"</div>";function u(A){u.superclass.constructor.apply(this,arguments);}a.mix(u,{NAME:AC,ATTRS:{helper:{value:null},scrollDelay:{value:100,validator:AT}}});
a.extend(u,a.TreeView,{direction:AE,dropAction:null,lastY:0,node:null,nodeContent:null,bindUI:function(){var A=this;u.superclass.bindUI.apply(this,arguments);A._bindDragDrop();},renderUI:function(){var A=this;u.superclass.renderUI.apply(this,arguments);var L=a.Node.create(F).hide();a.get(AJ).append(L);A.set(AH,L);N.set(AP,AG);},_createDrag:function(AV){var L=this;if(!L.dragTimers){L.dragTimers=[];}if(!N.getDrag(AV)){var A=L.dragTimers;var AU=50*A.length;var AW=setTimeout(function(){if(!N.getDrag(AV)){var AX=new a.DD.Drag({bubbleTargets:L,node:AV,target:true}).plug(a.Plugin.DDProxy,{moveOnEnd:false,positionProxy:false,borderStyle:null}).plug(a.Plugin.DDNodeScroll,{scrollDelay:L.get(v),node:L.get(AO)});}a.Array.removeItem(A,AW);},AU);A.push(AW);}},_bindDragDrop:function(){var A=this;var L=A.get(AO);A._createDragInitHandler=a.bind(function(){A.eachChildren(function(AU){if(AU.get(Y)){A._createDrag(AU.get(s));}},true);L.detach("mouseover",A._createDragInitHandler);},A);L.on("mouseover",A._createDragInitHandler);A.after("insert",a.bind(A._afterAppend,A));A.after("append",a.bind(A._afterAppend,A));A.on("drag:align",A._onDragAlign);A.on("drag:start",A._onDragStart);A.on("drop:exit",A._onDropExit);A.on("drop:hit",A._onDropHit);A.on("drop:over",A._onDropOver);},_appendState:function(L){var A=this;A.dropAction=Z;A.get(AH).addClass(y);L.addClass(AR);},_goingDownState:function(L){var A=this;A.dropAction=AE;A.get(AH).addClass(AK);L.addClass(m);},_goingUpState:function(L){var A=this;A.dropAction=f;A.get(AH).addClass(l);L.addClass(G);},_resetState:function(L){var A=this;var AU=A.get(AH);AU.removeClass(y);AU.removeClass(l);AU.removeClass(AK);if(L){L.removeClass(G);L.removeClass(AR);L.removeClass(m);}},_updateNodeState:function(A){var Ad=this;var AZ=A.drag;var AW=A.drop;var L=AW.get(AS);var Ac=L.get(W);var AY=AZ.get(AS).get(W);var AV=a.Widget.getByNode(Ac);Ad._resetState(Ad.nodeContent);if(!AY.contains(Ac)){var Ae=L.get(z)/3;var AU=L.getY();var Ab=AU+Ae*1;var Aa=AU+Ae*2;var AX=AZ.mouseXY[1];if((AX>AU)&&(AX<Ab)){Ad._goingUpState(L);}else{if(AX>Aa){Ad._goingDownState(L);}else{if((AX>Ab)&&(AX<Aa)){if(AV&&!AV.isLeaf()){Ad._appendState(L);}else{if(Ad.direction==j){Ad._goingUpState(L);}else{Ad._goingDownState(L);}}}}}}Ad.nodeContent=L;},_afterAppend:function(L){var A=this;var AU=L.tree.node;if(AU.get(Y)){A._createDrag(AU.get(s));}},_onDragAlign:function(AU){var A=this;var L=A.lastY;var AV=AU.target.lastXY[1];if(AV!=L){A.direction=(AV<L)?j:t;}A.lastY=AV;},_onDragStart:function(AX){var A=this;var AV=AX.target;var AZ=AV.get(AS).get(W);var AU=a.Widget.getByNode(AZ);var AY=A.get(C);if(AY){AY.unselect();}AU.select();var AW=A.get(AH);var L=AW.query(o+b);AW.setStyle(E,c).show();L.html(AU.get(AQ));AV.set(O,AW);},_onDropOver:function(L){var A=this;A._updateNodeState(L);},_onDropHit:function(AW){var A=this;var AY=A.dropAction;var AX=AW.drag.get(AS).get(W);var AU=AW.drop.get(AS).get(W);var AZ=a.Widget.getByNode(AU);var AV=a.Widget.getByNode(AX);var L=A.getEventOutputMap(A);L.tree.dropNode=AZ;L.tree.dragNode=AV;if(AY==f){AZ.insertBefore(AV);A.bubbleEvent("dropInsert",L);}else{if(AY==AE){AZ.insertAfter(AV);A.bubbleEvent("dropInsert",L);}else{if(AY==Z){if(AZ&&!AZ.isLeaf()){AZ.appendChild(AV);if(!AZ.get(D)){AZ.expand();}A.bubbleEvent("dropAppend",L);}}}}A._resetState(A.nodeContent);A.bubbleEvent("drop",L);},_onDropExit:function(){var A=this;A.dropAction=null;A._resetState(A.nodeContent);}});a.TreeViewDD=u;},"@VERSION@",{skinnable:true,requires:["aui-tree-node","dd"]});AUI.add("aui-tree",function(B){},"@VERSION@",{use:["aui-tree-data","aui-tree-node","aui-tree-view"]});