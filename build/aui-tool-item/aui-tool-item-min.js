AUI.add("aui-tool-item",function(F){var I=F.Lang,D=I.isString,E=I.isFunction,O=I.isObject,G=F.ClassNameManager.getClassName,H="tool",K="icon",M="state",J=G(H),L=G(K),P="<span></span>",B=P,N=P;var C=function(A){if(D(A)){A={icon:A};}C.superclass.constructor.apply(this,arguments);};C.NAME="tool-item";C.ATTRS={classNames:{},activeState:{value:false},defaultState:{},handler:{lazyAdd:false,value:null,setter:function(U){var A=this;var T=U;var R=A;var Q=A;var S="click";if(O(T)){var V=T;T=V.fn||T;R=V.context||R;S=V.type||S;}if(E(T)){A.on(S,F.rbind(T,R,Q,V.args));}return U;}},hoverState:{},iconNode:{valueFn:function(){var A=this;return F.Node.create(B);}},icon:{lazyAdd:false,setter:function(Q){var A=this;A._uiSetIcon(Q);return Q;}},id:{valueFn:function(){return F.guid();}},renderTo:{value:null}};F.extend(C,F.Component,{UI_EVENTS:{},BOUNDING_TEMPLATE:P,CONTENT_TEMPLATE:P,initializer:function(){var A=this;var Q=A.get("renderTo");if(Q){A.render(Q);}},renderUI:function(){var A=this;var Q=A.get("contentBox");var R=A.get("iconNode");Q.addClass(J);R.addClass(L);A.plug(F.StateInteractionPlugin,{activeState:A.get("activeState"),classNames:A.get("classNames"),defaultState:A.get("defaultState"),hoverState:A.get("hoverState"),bubbleTarget:A});Q.appendChild(R);},bindUI:function(){var A=this;A.after("iconChange",A._afterIconChange);},destroy:function(){var A=this;var Q=A.get("boundingBox");Q.remove();},_afterIconChange:function(Q){var A=this;A._uiSetIcon(Q.newVal,Q.prevVal);},_uiSetIcon:function(R,S){var A=this;var Q=A.get("iconNode");R=G(K,R);if(S){S=G(K,S);}Q.replaceClass(S,R);}});F.ToolItem=C;},"@VERSION@",{requires:["aui-base","aui-state-interaction"],skinnable:true});