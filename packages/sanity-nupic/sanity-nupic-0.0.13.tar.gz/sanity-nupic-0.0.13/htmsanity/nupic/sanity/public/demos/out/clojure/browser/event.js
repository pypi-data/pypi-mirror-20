// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('clojure.browser.event');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventType');

/**
 * @interface
 */
clojure.browser.event.IEventType = function(){};

clojure.browser.event.event_types = (function clojure$browser$event$event_types(this$){
if((!((this$ == null))) && (!((this$.clojure$browser$event$IEventType$event_types$arity$1 == null)))){
return this$.clojure$browser$event$IEventType$event_types$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (clojure.browser.event.event_types[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (clojure.browser.event.event_types["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("IEventType.event-types",this$);
}
}
}
});

goog.events.EventTarget.prototype.clojure$browser$event$IEventType$ = true;

goog.events.EventTarget.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__40357){
var vec__40358 = p__40357;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40358,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40358,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
});})(this$__$1))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.events.EventType)], 0))));
});
if(typeof Element !== 'undefined'){
Element.prototype.clojure$browser$event$IEventType$ = true;

Element.prototype.clojure$browser$event$IEventType$event_types$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__40361){
var vec__40362 = p__40361;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40362,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40362,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(k.toLowerCase()),v], null);
});})(this$__$1))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$1(goog.events.EventType)], 0))));
});
} else {
}
clojure.browser.event.listen = (function clojure$browser$event$listen(var_args){
var args40365 = [];
var len__10461__auto___40372 = arguments.length;
var i__10462__auto___40373 = (0);
while(true){
if((i__10462__auto___40373 < len__10461__auto___40372)){
args40365.push((arguments[i__10462__auto___40373]));

var G__40374 = (i__10462__auto___40373 + (1));
i__10462__auto___40373 = G__40374;
continue;
} else {
}
break;
}

var G__40367 = args40365.length;
switch (G__40367) {
case 3:
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40365.length)].join('')));

}
});

clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
});

clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
var G__40368 = src;
var G__40369 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type);
var G__40370 = fn;
var G__40371 = capture_QMARK_;
return goog.events.listen(G__40368,G__40369,G__40370,G__40371);
});

clojure.browser.event.listen.cljs$lang$maxFixedArity = 4;

clojure.browser.event.listen_once = (function clojure$browser$event$listen_once(var_args){
var args40376 = [];
var len__10461__auto___40383 = arguments.length;
var i__10462__auto___40384 = (0);
while(true){
if((i__10462__auto___40384 < len__10461__auto___40383)){
args40376.push((arguments[i__10462__auto___40384]));

var G__40385 = (i__10462__auto___40384 + (1));
i__10462__auto___40384 = G__40385;
continue;
} else {
}
break;
}

var G__40378 = args40376.length;
switch (G__40378) {
case 3:
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40376.length)].join('')));

}
});

clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
});

clojure.browser.event.listen_once.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
var G__40379 = src;
var G__40380 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type);
var G__40381 = fn;
var G__40382 = capture_QMARK_;
return goog.events.listenOnce(G__40379,G__40380,G__40381,G__40382);
});

clojure.browser.event.listen_once.cljs$lang$maxFixedArity = 4;

clojure.browser.event.unlisten = (function clojure$browser$event$unlisten(var_args){
var args40387 = [];
var len__10461__auto___40394 = arguments.length;
var i__10462__auto___40395 = (0);
while(true){
if((i__10462__auto___40395 < len__10461__auto___40394)){
args40387.push((arguments[i__10462__auto___40395]));

var G__40396 = (i__10462__auto___40395 + (1));
i__10462__auto___40395 = G__40396;
continue;
} else {
}
break;
}

var G__40389 = args40387.length;
switch (G__40389) {
case 3:
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args40387.length)].join('')));

}
});

clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$3 = (function (src,type,fn){
return clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4(src,type,fn,false);
});

clojure.browser.event.unlisten.cljs$core$IFn$_invoke$arity$4 = (function (src,type,fn,capture_QMARK_){
var G__40390 = src;
var G__40391 = cljs.core.get.cljs$core$IFn$_invoke$arity$3(clojure.browser.event.event_types(src),type,type);
var G__40392 = fn;
var G__40393 = capture_QMARK_;
return goog.events.unlisten(G__40390,G__40391,G__40392,G__40393);
});

clojure.browser.event.unlisten.cljs$lang$maxFixedArity = 4;

clojure.browser.event.unlisten_by_key = (function clojure$browser$event$unlisten_by_key(key){
return goog.events.unlistenByKey(key);
});
clojure.browser.event.dispatch_event = (function clojure$browser$event$dispatch_event(src,event){
return goog.events.dispatchEvent(src,event);
});
clojure.browser.event.expose = (function clojure$browser$event$expose(e){
return goog.events.expose(e);
});
clojure.browser.event.fire_listeners = (function clojure$browser$event$fire_listeners(obj,type,capture,event){
return null;
});
clojure.browser.event.total_listener_count = (function clojure$browser$event$total_listener_count(){
return goog.events.getTotalListenerCount();
});
clojure.browser.event.get_listener = (function clojure$browser$event$get_listener(src,type,listener,opt_capt,opt_handler){
return null;
});
clojure.browser.event.all_listeners = (function clojure$browser$event$all_listeners(obj,type,capture){
return null;
});
clojure.browser.event.unique_event_id = (function clojure$browser$event$unique_event_id(event_type){
return null;
});
clojure.browser.event.has_listener = (function clojure$browser$event$has_listener(obj,opt_type,opt_capture){
return null;
});
clojure.browser.event.remove_all = (function clojure$browser$event$remove_all(opt_obj,opt_type,opt_capt){
return null;
});
