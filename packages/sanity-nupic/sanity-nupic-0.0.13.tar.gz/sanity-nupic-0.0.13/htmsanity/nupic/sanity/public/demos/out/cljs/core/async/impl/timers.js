// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('cljs.core.async.impl.timers');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.dispatch');
cljs.core.async.impl.timers.MAX_LEVEL = (15);
cljs.core.async.impl.timers.P = ((1) / (2));
cljs.core.async.impl.timers.random_level = (function cljs$core$async$impl$timers$random_level(var_args){
var args42053 = [];
var len__10461__auto___42056 = arguments.length;
var i__10462__auto___42057 = (0);
while(true){
if((i__10462__auto___42057 < len__10461__auto___42056)){
args42053.push((arguments[i__10462__auto___42057]));

var G__42058 = (i__10462__auto___42057 + (1));
i__10462__auto___42057 = G__42058;
continue;
} else {
}
break;
}

var G__42055 = args42053.length;
switch (G__42055) {
case 0:
return cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42053.length)].join('')));

}
});

cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$1((0));
});

cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$1 = (function (level){
while(true){
if(((Math.random() < cljs.core.async.impl.timers.P)) && ((level < cljs.core.async.impl.timers.MAX_LEVEL))){
var G__42060 = (level + (1));
level = G__42060;
continue;
} else {
return level;
}
break;
}
});

cljs.core.async.impl.timers.random_level.cljs$lang$maxFixedArity = 1;


/**
* @constructor
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IPrintWithWriter}
*/
cljs.core.async.impl.timers.SkipListNode = (function (key,val,forward){
this.key = key;
this.val = val;
this.forward = forward;
this.cljs$lang$protocol_mask$partition0$ = 2155872256;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
var x__10204__auto__ = self__.key;
return cljs.core._conj((function (){var x__10204__auto____$1 = self__.val;
return cljs.core._conj(cljs.core.List.EMPTY,x__10204__auto____$1);
})(),x__10204__auto__);
});

cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,"["," ","]",opts,coll__$1);
});

cljs.core.async.impl.timers.SkipListNode.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$key,cljs.core.with_meta(cljs.core.cst$sym$val,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null)),cljs.core.cst$sym$forward], null);
});

cljs.core.async.impl.timers.SkipListNode.cljs$lang$type = true;

cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipListNode";

cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorPrWriter = (function (this__9930__auto__,writer__9931__auto__,opt__9932__auto__){
return cljs.core._write(writer__9931__auto__,"cljs.core.async.impl.timers/SkipListNode");
});

cljs.core.async.impl.timers.__GT_SkipListNode = (function cljs$core$async$impl$timers$__GT_SkipListNode(key,val,forward){
return (new cljs.core.async.impl.timers.SkipListNode(key,val,forward));
});

cljs.core.async.impl.timers.skip_list_node = (function cljs$core$async$impl$timers$skip_list_node(var_args){
var args42061 = [];
var len__10461__auto___42064 = arguments.length;
var i__10462__auto___42065 = (0);
while(true){
if((i__10462__auto___42065 < len__10461__auto___42064)){
args42061.push((arguments[i__10462__auto___42065]));

var G__42066 = (i__10462__auto___42065 + (1));
i__10462__auto___42065 = G__42066;
continue;
} else {
}
break;
}

var G__42063 = args42061.length;
switch (G__42063) {
case 1:
return cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42061.length)].join('')));

}
});

cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$1 = (function (level){
return cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$3(null,null,level);
});

cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$3 = (function (k,v,level){
var arr = (new Array((level + (1))));
var i_42068 = (0);
while(true){
if((i_42068 < arr.length)){
(arr[i_42068] = null);

var G__42069 = (i_42068 + (1));
i_42068 = G__42069;
continue;
} else {
}
break;
}

return (new cljs.core.async.impl.timers.SkipListNode(k,v,arr));
});

cljs.core.async.impl.timers.skip_list_node.cljs$lang$maxFixedArity = 3;

cljs.core.async.impl.timers.least_greater_node = (function cljs$core$async$impl$timers$least_greater_node(var_args){
var args42070 = [];
var len__10461__auto___42073 = arguments.length;
var i__10462__auto___42074 = (0);
while(true){
if((i__10462__auto___42074 < len__10461__auto___42073)){
args42070.push((arguments[i__10462__auto___42074]));

var G__42075 = (i__10462__auto___42074 + (1));
i__10462__auto___42074 = G__42075;
continue;
} else {
}
break;
}

var G__42072 = args42070.length;
switch (G__42072) {
case 3:
return cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args42070.length)].join('')));

}
});

cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$3 = (function (x,k,level){
return cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4(x,k,level,null);
});

cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4 = (function (x,k,level,update){
while(true){
if(!((level < (0)))){
var x__$1 = (function (){var x__$1 = x;
while(true){
var temp__6726__auto__ = (x__$1.forward[level]);
if(cljs.core.truth_(temp__6726__auto__)){
var x_SINGLEQUOTE_ = temp__6726__auto__;
if((x_SINGLEQUOTE_.key < k)){
var G__42077 = x_SINGLEQUOTE_;
x__$1 = G__42077;
continue;
} else {
return x__$1;
}
} else {
return x__$1;
}
break;
}
})();
if((update == null)){
} else {
(update[level] = x__$1);
}

var G__42078 = x__$1;
var G__42079 = k;
var G__42080 = (level - (1));
var G__42081 = update;
x = G__42078;
k = G__42079;
level = G__42080;
update = G__42081;
continue;
} else {
return x;
}
break;
}
});

cljs.core.async.impl.timers.least_greater_node.cljs$lang$maxFixedArity = 4;


/**
* @constructor
 * @implements {cljs.core.async.impl.timers.Object}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IPrintWithWriter}
*/
cljs.core.async.impl.timers.SkipList = (function (header,level){
this.header = header;
this.level = level;
this.cljs$lang$protocol_mask$partition0$ = 2155872256;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.core.async.impl.timers.SkipList.prototype.put = (function (k,v){
var self__ = this;
var coll = this;
var update = (new Array(cljs.core.async.impl.timers.MAX_LEVEL));
var x = cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4(self__.header,k,self__.level,update);
var x__$1 = (x.forward[(0)]);
if((!((x__$1 == null))) && ((x__$1.key === k))){
return x__$1.val = v;
} else {
var new_level = cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$0();
if((new_level > self__.level)){
var i_42084 = (self__.level + (1));
while(true){
if((i_42084 <= (new_level + (1)))){
(update[i_42084] = self__.header);

var G__42085 = (i_42084 + (1));
i_42084 = G__42085;
continue;
} else {
}
break;
}

self__.level = new_level;
} else {
}

var x__$2 = cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$3(k,v,(new Array(new_level)));
var i = (0);
while(true){
if((i <= self__.level)){
var links = (update[i]).forward;
(x__$2.forward[i] = (links[i]));

return (links[i] = x__$2);
} else {
return null;
}
break;
}
}
});

cljs.core.async.impl.timers.SkipList.prototype.remove = (function (k){
var self__ = this;
var coll = this;
var update = (new Array(cljs.core.async.impl.timers.MAX_LEVEL));
var x = cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4(self__.header,k,self__.level,update);
var x__$1 = (x.forward[(0)]);
if((!((x__$1 == null))) && ((x__$1.key === k))){
var i_42086 = (0);
while(true){
if((i_42086 <= self__.level)){
var links_42087 = (update[i_42086]).forward;
if(((links_42087[i_42086]) === x__$1)){
(links_42087[i_42086] = (x__$1.forward[i_42086]));

var G__42088 = (i_42086 + (1));
i_42086 = G__42088;
continue;
} else {
var G__42089 = (i_42086 + (1));
i_42086 = G__42089;
continue;
}
} else {
}
break;
}

while(true){
if(((self__.level > (0))) && (((self__.header.forward[self__.level]) == null))){
self__.level = (self__.level - (1));

continue;
} else {
return null;
}
break;
}
} else {
return null;
}
});

cljs.core.async.impl.timers.SkipList.prototype.ceilingEntry = (function (k){
var self__ = this;
var coll = this;
var x = self__.header;
var level__$1 = self__.level;
while(true){
if(!((level__$1 < (0)))){
var nx = (function (){var x__$1 = x;
while(true){
var x_SINGLEQUOTE_ = (x__$1.forward[level__$1]);
if((x_SINGLEQUOTE_ == null)){
return null;
} else {
if((x_SINGLEQUOTE_.key >= k)){
return x_SINGLEQUOTE_;
} else {
var G__42090 = x_SINGLEQUOTE_;
x__$1 = G__42090;
continue;
}
}
break;
}
})();
if(!((nx == null))){
var G__42091 = nx;
var G__42092 = (level__$1 - (1));
x = G__42091;
level__$1 = G__42092;
continue;
} else {
var G__42093 = x;
var G__42094 = (level__$1 - (1));
x = G__42093;
level__$1 = G__42094;
continue;
}
} else {
if((x === self__.header)){
return null;
} else {
return x;
}
}
break;
}
});

cljs.core.async.impl.timers.SkipList.prototype.floorEntry = (function (k){
var self__ = this;
var coll = this;
var x = self__.header;
var level__$1 = self__.level;
while(true){
if(!((level__$1 < (0)))){
var nx = (function (){var x__$1 = x;
while(true){
var x_SINGLEQUOTE_ = (x__$1.forward[level__$1]);
if(!((x_SINGLEQUOTE_ == null))){
if((x_SINGLEQUOTE_.key > k)){
return x__$1;
} else {
var G__42095 = x_SINGLEQUOTE_;
x__$1 = G__42095;
continue;
}
} else {
if((level__$1 === (0))){
return x__$1;
} else {
return null;
}
}
break;
}
})();
if(cljs.core.truth_(nx)){
var G__42096 = nx;
var G__42097 = (level__$1 - (1));
x = G__42096;
level__$1 = G__42097;
continue;
} else {
var G__42098 = x;
var G__42099 = (level__$1 - (1));
x = G__42098;
level__$1 = G__42099;
continue;
}
} else {
if((x === self__.header)){
return null;
} else {
return x;
}
}
break;
}
});

cljs.core.async.impl.timers.SkipList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
var iter = ((function (coll__$1){
return (function cljs$core$async$impl$timers$iter(node){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
if((node == null)){
return null;
} else {
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node.key,node.val], null),cljs$core$async$impl$timers$iter((node.forward[(0)])));
}
});})(coll__$1))
,null,null));
});})(coll__$1))
;
return iter((self__.header.forward[(0)]));
});

cljs.core.async.impl.timers.SkipList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
var pr_pair = ((function (coll__$1){
return (function (keyval){
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,""," ","",opts,keyval);
});})(coll__$1))
;
return cljs.core.pr_sequential_writer(writer,pr_pair,"{",", ","}",opts,coll__$1);
});

cljs.core.async.impl.timers.SkipList.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$header,cljs.core.with_meta(cljs.core.cst$sym$level,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.core.async.impl.timers.SkipList.cljs$lang$type = true;

cljs.core.async.impl.timers.SkipList.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipList";

cljs.core.async.impl.timers.SkipList.cljs$lang$ctorPrWriter = (function (this__9930__auto__,writer__9931__auto__,opt__9932__auto__){
return cljs.core._write(writer__9931__auto__,"cljs.core.async.impl.timers/SkipList");
});

cljs.core.async.impl.timers.__GT_SkipList = (function cljs$core$async$impl$timers$__GT_SkipList(header,level){
return (new cljs.core.async.impl.timers.SkipList(header,level));
});

cljs.core.async.impl.timers.skip_list = (function cljs$core$async$impl$timers$skip_list(){
return (new cljs.core.async.impl.timers.SkipList(cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$1((0)),(0)));
});
cljs.core.async.impl.timers.timeouts_map = cljs.core.async.impl.timers.skip_list();
cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS = (10);
/**
 * returns a channel that will close after msecs
 */
cljs.core.async.impl.timers.timeout = (function cljs$core$async$impl$timers$timeout(msecs){
var timeout__$1 = ((new Date()).valueOf() + msecs);
var me = cljs.core.async.impl.timers.timeouts_map.ceilingEntry(timeout__$1);
var or__9278__auto__ = (cljs.core.truth_((function (){var and__9266__auto__ = me;
if(cljs.core.truth_(and__9266__auto__)){
return (me.key < (timeout__$1 + cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS));
} else {
return and__9266__auto__;
}
})())?me.val:null);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
var timeout_channel = cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.async.impl.timers.timeouts_map.put(timeout__$1,timeout_channel);

cljs.core.async.impl.dispatch.queue_delay(((function (timeout_channel,or__9278__auto__,timeout__$1,me){
return (function (){
cljs.core.async.impl.timers.timeouts_map.remove(timeout__$1);

return cljs.core.async.impl.protocols.close_BANG_(timeout_channel);
});})(timeout_channel,or__9278__auto__,timeout__$1,me))
,msecs);

return timeout_channel;
}
});
