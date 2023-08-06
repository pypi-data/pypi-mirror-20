// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.util');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('clojure.walk');
org.numenta.sanity.util.tap_c = (function org$numenta$sanity$util$tap_c(mult){
var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(mult,c);

return c;
});
org.numenta.sanity.util.index_of = (function org$numenta$sanity$util$index_of(coll,pred){
return cljs.core.first(cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (i,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(v) : pred.call(null,v)))){
return i;
} else {
return null;
}
}),coll));
});
org.numenta.sanity.util.translate_network_shape = (function org$numenta$sanity$util$translate_network_shape(n_shape_from_server){
var map__45013 = n_shape_from_server;
var map__45013__$1 = ((((!((map__45013 == null)))?((((map__45013.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45013.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__45013):map__45013);
var layers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45013__$1,"layers");
var senses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45013__$1,"senses");
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layers,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (map__45013,map__45013__$1,layers,senses){
return (function org$numenta$sanity$util$translate_network_shape_$_iter__45015(s__45016){
return (new cljs.core.LazySeq(null,((function (map__45013,map__45013__$1,layers,senses){
return (function (){
var s__45016__$1 = s__45016;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__45016__$1);
if(temp__6728__auto__){
var s__45016__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__45016__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__45016__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__45018 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__45017 = (0);
while(true){
if((i__45017 < size__10131__auto__)){
var vec__45027 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__45017);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45027,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45027,(1),null);
cljs.core.chunk_append(b__45018,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null));

var G__45051 = (i__45017 + (1));
i__45017 = G__45051;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__45018),org$numenta$sanity$util$translate_network_shape_$_iter__45015(cljs.core.chunk_rest(s__45016__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__45018),null);
}
} else {
var vec__45030 = cljs.core.first(s__45016__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45030,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45030,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,clojure.walk.keywordize_keys(lyr)], null),org$numenta$sanity$util$translate_network_shape_$_iter__45015(cljs.core.rest(s__45016__$2)));
}
} else {
return null;
}
break;
}
});})(map__45013,map__45013__$1,layers,senses))
,null,null));
});})(map__45013,map__45013__$1,layers,senses))
;
return iter__10132__auto__(layers);
})()),cljs.core.cst$kw$senses,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (map__45013,map__45013__$1,layers,senses){
return (function org$numenta$sanity$util$translate_network_shape_$_iter__45033(s__45034){
return (new cljs.core.LazySeq(null,((function (map__45013,map__45013__$1,layers,senses){
return (function (){
var s__45034__$1 = s__45034;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__45034__$1);
if(temp__6728__auto__){
var s__45034__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__45034__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__45034__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__45036 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__45035 = (0);
while(true){
if((i__45035 < size__10131__auto__)){
var vec__45045 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__45035);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45045,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45045,(1),null);
cljs.core.chunk_append(b__45036,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null));

var G__45052 = (i__45035 + (1));
i__45035 = G__45052;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__45036),org$numenta$sanity$util$translate_network_shape_$_iter__45033(cljs.core.chunk_rest(s__45034__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__45036),null);
}
} else {
var vec__45048 = cljs.core.first(s__45034__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45048,(0),null);
var sense = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45048,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,clojure.walk.keywordize_keys(sense)], null),org$numenta$sanity$util$translate_network_shape_$_iter__45033(cljs.core.rest(s__45034__$2)));
}
} else {
return null;
}
break;
}
});})(map__45013,map__45013__$1,layers,senses))
,null,null));
});})(map__45013,map__45013__$1,layers,senses))
;
return iter__10132__auto__(senses);
})())], null);
});
