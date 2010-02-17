YUI.add("event-custom-complex",function(A){(function(){var C,E,B=A.CustomEvent.prototype,D=A.EventTarget.prototype;A.EventFacade=function(G,F){G=G||{};this.details=G.details;this.type=G.type;this._type=G.type;this.target=G.target;this.currentTarget=F;this.relatedTarget=G.relatedTarget;this.stopPropagation=function(){G.stopPropagation();};this.stopImmediatePropagation=function(){G.stopImmediatePropagation();};this.preventDefault=function(){G.preventDefault();};this.halt=function(H){G.halt(H);};};B.fireComplex=function(N){var O=A.Env._eventstack,J,F,L,G,M,R,H,Q=this,P=Q.host||Q,K,I;if(O){if(Q.queuable&&Q.type!=O.next.type){Q.log("queue "+Q.type);O.queue.push([Q,N]);return true;}}else{A.Env._eventstack={id:Q.id,next:Q,silent:Q.silent,stopped:0,prevented:0,bubbling:null,type:Q.type,afterQueue:new A.Queue(),defaultTargetOnly:Q.defaultTargetOnly,queue:[]};O=A.Env._eventstack;}H=Q.getSubs();Q.stopped=(Q.type!==O.type)?0:O.stopped;Q.prevented=(Q.type!==O.type)?0:O.prevented;Q.target=Q.target||P;R=new A.EventTarget({fireOnce:true,context:P});Q.events=R;if(Q.preventedFn){R.on("prevented",Q.preventedFn);}if(Q.stoppedFn){R.on("stopped",Q.stoppedFn);}Q.currentTarget=P;Q.details=N.slice();Q.log("Firing "+Q.type);Q._facade=null;J=Q._getFacade(N);if(A.Lang.isObject(N[0])){N[0]=J;}else{N.unshift(J);}if(H[0]){Q._procSubs(H[0],N,J);}if(Q.bubbles&&P.bubble&&!Q.stopped){I=O.bubbling;O.bubbling=Q.type;if(O.type!=Q.type){O.stopped=0;O.prevented=0;}M=P.bubble(Q);Q.stopped=Math.max(Q.stopped,O.stopped);Q.prevented=Math.max(Q.prevented,O.prevented);O.bubbling=I;}if(Q.defaultFn&&!Q.prevented&&((!Q.defaultTargetOnly&&!O.defaultTargetOnly)||P===J.target)){Q.defaultFn.apply(P,N);}Q._broadcast(N);if(H[1]&&!Q.prevented&&Q.stopped<2){if(O.id===Q.id||Q.type!=P._yuievt.bubbling){Q._procSubs(H[1],N,J);while((K=O.afterQueue.last())){K();}}else{O.afterQueue.add(function(){Q._procSubs(H[1],N,J);});}}Q.target=null;if(O.id===Q.id){L=O.queue;while(L.length){F=L.pop();G=F[0];O.next=G;G.fire.apply(G,F[1]);}A.Env._eventstack=null;}M=!(Q.stopped);if(Q.type!=P._yuievt.bubbling){O.stopped=0;O.prevented=0;Q.stopped=0;Q.prevented=0;}return M;};B._getFacade=function(){var F=this._facade,I,H,G=this.details;if(!F){F=new A.EventFacade(this,this.currentTarget);}I=G&&G[0];if(A.Lang.isObject(I,true)){H={};A.mix(H,F,true,E);A.mix(F,I,true);A.mix(F,H,true,E);F.type=I.type||F.type;}F.details=this.details;F.target=this.originalTarget||this.target;F.currentTarget=this.currentTarget;F.stopped=0;F.prevented=0;this._facade=F;return this._facade;};B.stopPropagation=function(){this.stopped=1;A.Env._eventstack.stopped=1;this.events.fire("stopped",this);};B.stopImmediatePropagation=function(){this.stopped=2;A.Env._eventstack.stopped=2;this.events.fire("stopped",this);};B.preventDefault=function(){if(this.preventable){this.prevented=1;A.Env._eventstack.prevented=1;this.events.fire("prevented",this);}};B.halt=function(F){if(F){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};D.addTarget=function(F){this._yuievt.targets[A.stamp(F)]=F;this._yuievt.hasTargets=true;};D.getTargets=function(){return A.Object.values(this._yuievt.targets);};D.removeTarget=function(F){delete this._yuievt.targets[A.stamp(F)];};D.bubble=function(R,O,M){var K=this._yuievt.targets,N=true,S,P=R&&R.type,G,J,L,H,F=M||(R&&R.target)||this,Q=A.Env._eventstack,I;if(!R||((!R.stopped)&&K)){for(J in K){if(K.hasOwnProperty(J)){S=K[J];G=S.getEvent(P,true);H=S.getSibling(P,G);if(H&&!G){G=S.publish(P);}I=S._yuievt.bubbling;S._yuievt.bubbling=P;if(!G){if(S._yuievt.hasTargets){S.bubble(R,O,F);}}else{G.sibling=H;G.target=F;G.originalTarget=F;G.currentTarget=S;L=G.broadcast;G.broadcast=false;N=N&&G.fire.apply(G,O||R.details||[]);G.broadcast=L;G.originalTarget=null;if(G.stopped){break;}}S._yuievt.bubbling=I;}}}return N;};C=new A.EventFacade();E=A.Object.keys(C);})();},"@VERSION@",{requires:["event-custom-base"]});