// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.journal');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.comportex.details');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.layer');
goog.require('clojure.walk');
org.numenta.sanity.comportex.journal.make_step = (function org$numenta$sanity$comportex$journal$make_step(htm,id){
var input_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
return new cljs.core.PersistentArrayMap(null, 4, ["snapshot-id",id,"timestep",org.nfrac.comportex.core.timestep(htm),"input-value",input_value,"sensed-values",cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (input_value){
return (function org$numenta$sanity$comportex$journal$make_step_$_iter__80178(s__80179){
return (new cljs.core.LazySeq(null,((function (input_value){
return (function (){
var s__80179__$1 = s__80179;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__80179__$1);
if(temp__6728__auto__){
var s__80179__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__80179__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__80179__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__80181 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__80180 = (0);
while(true){
if((i__80180 < size__10131__auto__)){
var sense_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__80180);
var vec__80190 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80190,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80190,(1),null);
var v = org.nfrac.comportex.core.extract(selector,input_value);
cljs.core.chunk_append(b__80181,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null));

var G__80196 = (i__80180 + (1));
i__80180 = G__80196;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__80181),org$numenta$sanity$comportex$journal$make_step_$_iter__80178(cljs.core.chunk_rest(s__80179__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__80181),null);
}
} else {
var sense_id = cljs.core.first(s__80179__$2);
var vec__80193 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80193,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80193,(1),null);
var v = org.nfrac.comportex.core.extract(selector,input_value);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sense_id,v], null),org$numenta$sanity$comportex$journal$make_step_$_iter__80178(cljs.core.rest(s__80179__$2)));
}
} else {
return null;
}
break;
}
});})(input_value))
,null,null));
});})(input_value))
;
return iter__10132__auto__(org.nfrac.comportex.core.sense_keys(htm));
})())], null);
});
org.numenta.sanity.comportex.journal.id_missing_response = (function org$numenta$sanity$comportex$journal$id_missing_response(id,steps_offset){
var offset = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset));
if((offset > (0))){
if((id < offset)){
} else {
throw (new Error("Assert failed: (< id offset)"));
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("Can't fetch model "),cljs.core.str(id),cljs.core.str(". We've dropped all models below id "),cljs.core.str(offset)].join('')], 0));
} else {
}

return cljs.core.PersistentArrayMap.EMPTY;
});
org.numenta.sanity.comportex.journal.command_handler = (function org$numenta$sanity$comportex$journal$command_handler(current_model,steps_offset,model_steps,steps_mult,client_infos,capture_options){
var find_model = (function org$numenta$sanity$comportex$journal$command_handler_$_find_model(id){
if(typeof id === 'number'){
var i = (id - (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)));
if((i < (0))){
return null;
} else {
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),i,null);
}
} else {
return null;
}
});
var find_model_pair = (function org$numenta$sanity$comportex$journal$command_handler_$_find_model_pair(id){
if(typeof id === 'number'){
var i = (id - (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)));
if((i > (0))){
var vec__80589 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),(i - (1)),(i + (1)));
var prev_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80589,(0),null);
var step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80589,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((org.nfrac.comportex.core.timestep(prev_step) + (1)),org.nfrac.comportex.core.timestep(step))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [prev_step,step], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,step], null);
}
} else {
if((i === (0))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),i,null)], null);
} else {
return null;
}
}
} else {
return null;
}
});
return (function org$numenta$sanity$comportex$journal$command_handler_$_handle_command(p__80592){
var vec__80774 = p__80592;
var vec__80777 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80774,(0),null);
var seq__80778 = cljs.core.seq(vec__80777);
var first__80779 = cljs.core.first(seq__80778);
var seq__80778__$1 = cljs.core.next(seq__80778);
var command = first__80779;
var xs = seq__80778__$1;
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80774,(1),null);
var client_info = (function (){var or__9278__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
var v = (function (){var G__80780 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__80780) : cljs.core.atom.call(null,G__80780));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__80781 = command;
switch (G__80781) {
case "ping":
return null;

break;
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client disconnected."], 0));

return cljs.core.async.untap(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$steps_DASH_mchannel.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info)))));

break;
case "connect":
var vec__80782 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80782,(0),null);
var map__80785 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80782,(1),null);
var map__80785__$1 = ((((!((map__80785 == null)))?((((map__80785.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80785.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80785):map__80785);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80785__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$journal_SLASH_push_DASH_to_DASH_client,((function (vec__80782,old_client_info,map__80785,map__80785__$1,subscriber_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$steps_DASH_mchannel,((function (vec__80782,old_client_info,map__80785,map__80785__$1,subscriber_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (steps_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(steps_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__80782,old_client_info,map__80785,map__80785__$1,subscriber_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
));
});})(vec__80782,old_client_info,map__80785,map__80785__$1,subscriber_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
);

var temp__6728__auto__ = old_client_info;
if(cljs.core.truth_(temp__6728__auto__)){
var map__80787 = temp__6728__auto__;
var map__80787__$1 = ((((!((map__80787 == null)))?((((map__80787.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80787.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80787):map__80787);
var steps_mchannel = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80787__$1,cljs.core.cst$kw$steps_DASH_mchannel);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client reconnected."], 0));

if(cljs.core.truth_(steps_mchannel)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client resubscribed to steps."], 0));

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(client_info,((function (map__80787,map__80787__$1,steps_mchannel,temp__6728__auto__,vec__80782,old_client_info,map__80785,map__80785__$1,subscriber_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80197_SHARP_){
var G__80789 = p1__80197_SHARP_;
if(cljs.core.truth_(steps_mchannel)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80789,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);
} else {
return G__80789;
}
});})(map__80787,map__80787__$1,steps_mchannel,temp__6728__auto__,vec__80782,old_client_info,map__80785,map__80785__$1,subscriber_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
);
} else {
return null;
}

break;
case "consider-future":
var vec__80790 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80790,(0),null);
var input = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80790,(1),null);
var map__80793 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80790,(2),null);
var map__80793__$1 = ((((!((map__80793 == null)))?((((map__80793.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80793.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80793):map__80793);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80793__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
return cljs.core.zipmap(org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$1(htm),cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.layer.column_state_freqs,org.nfrac.comportex.core.layer_seq(org.nfrac.comportex.core.htm_activate(org.nfrac.comportex.core.htm_sense(htm,input,null)))));
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "decode-predictive-columns":
var vec__80795 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80795,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80795,(1),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80795,(2),null);
var map__80798 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80795,(3),null);
var map__80798__$1 = ((((!((map__80798 == null)))?((((map__80798.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80798.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80798):map__80798);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80798__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
return org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$3(htm,sense_id,n);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-steps":
var vec__80800 = xs;
var map__80803 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80800,(0),null);
var map__80803__$1 = ((((!((map__80803 == null)))?((((map__80803.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80803.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80803):map__80803);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80803__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.comportex.journal.make_step,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps)),cljs.core.drop.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset)),cljs.core.range.cljs$core$IFn$_invoke$arity$0()))));

break;
case "subscribe":
var vec__80805 = xs;
var steps_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80805,(0),null);
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(steps_mult,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(steps_mchannel));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$steps_DASH_mchannel,steps_mchannel);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["JOURNAL: Client subscribed to steps."], 0));

break;
case "get-network-shape":
var vec__80808 = xs;
var map__80811 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80808,(0),null);
var map__80811__$1 = ((((!((map__80811 == null)))?((((map__80811.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80811.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80811):map__80811);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80811__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_model) : cljs.core.deref.call(null,current_model))));

break;
case "get-capture-options":
var vec__80813 = xs;
var map__80816 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80813,(0),null);
var map__80816__$1 = ((((!((map__80816 == null)))?((((map__80816.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80816.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80816):map__80816);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80816__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,clojure.walk.stringify_keys((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options))));

break;
case "set-capture-options":
var vec__80818 = xs;
var co = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80818,(0),null);
var G__80821 = capture_options;
var G__80822 = clojure.walk.keywordize_keys(co);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__80821,G__80822) : cljs.core.reset_BANG_.call(null,G__80821,G__80822));

break;
case "get-layer-bits":
var vec__80823 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80823,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80823,(1),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80823,(2),null);
var map__80826 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80823,(3),null);
var map__80826__$1 = ((((!((map__80826 == null)))?((((map__80826.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80826.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80826):map__80826);
var cols_subset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80826__$1,cljs.core.cst$kw$value);
var map__80827 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80823,(4),null);
var map__80827__$1 = ((((!((map__80827 == null)))?((((map__80827.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80827.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80827):map__80827);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80827__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var G__80830 = cljs.core.PersistentArrayMap.EMPTY;
var G__80830__$1 = ((cljs.core.contains_QMARK_(fetches,"active-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830,"active-columns",cljs.core.cst$kw$active_DASH_columns.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(lyr))):G__80830);
var G__80830__$2 = ((cljs.core.contains_QMARK_(fetches,"pred-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830__$1,"pred-columns",cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.cst$kw$prior_DASH_predictive_DASH_cells.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(lyr))))):G__80830__$1);
var G__80830__$3 = ((cljs.core.contains_QMARK_(fetches,"overlaps-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830__$2,"overlaps-columns-alpha",org.nfrac.comportex.util.remap(((function (G__80830,G__80830__$1,G__80830__$2,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80198_SHARP_){
var x__9618__auto__ = 1.0;
var y__9619__auto__ = (p1__80198_SHARP_ / (16));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
});})(G__80830,G__80830__$1,G__80830__$2,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (G__80830,G__80830__$1,G__80830__$2,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (m,p__80831,v){
var vec__80832 = p__80831;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80832,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80832,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80832,(2),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,col,(function (){var x__9611__auto__ = v;
var y__9612__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,col,(0));
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})());
});})(G__80830,G__80830__$1,G__80830__$2,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr)))))):G__80830__$2);
var G__80830__$4 = ((cljs.core.contains_QMARK_(fetches,"boost-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830__$3,"boost-columns-alpha",(function (){var map__80835 = org.nfrac.comportex.core.params(lyr);
var map__80835__$1 = ((((!((map__80835 == null)))?((((map__80835.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80835.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80835):map__80835);
var max_boost = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80835__$1,cljs.core.cst$kw$max_DASH_boost);
return cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.float$,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__80835,map__80835__$1,max_boost,G__80830,G__80830__$1,G__80830__$2,G__80830__$3,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80199_SHARP_){
return ((p1__80199_SHARP_ - (1)) / (max_boost - (1)));
});})(map__80835,map__80835__$1,max_boost,G__80830,G__80830__$1,G__80830__$2,G__80830__$3,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(lyr))));
})()):G__80830__$3);
var G__80830__$5 = ((cljs.core.contains_QMARK_(fetches,"active-freq-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830__$4,"active-freq-columns-alpha",cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__80830,G__80830__$1,G__80830__$2,G__80830__$3,G__80830__$4,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80200_SHARP_){
var x__9618__auto__ = 1.0;
var y__9619__auto__ = ((2) * p1__80200_SHARP_);
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
});})(G__80830,G__80830__$1,G__80830__$2,G__80830__$3,G__80830__$4,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr)))):G__80830__$4);
var G__80830__$6 = ((cljs.core.contains_QMARK_(fetches,"n-segments-columns-alpha"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830__$5,"n-segments-columns-alpha",cljs.core.zipmap(cols_subset,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__80830,G__80830__$1,G__80830__$2,G__80830__$3,G__80830__$4,G__80830__$5,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80202_SHARP_){
var x__9618__auto__ = 1.0;
var y__9619__auto__ = (p1__80202_SHARP_ / 16.0);
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
});})(G__80830,G__80830__$1,G__80830__$2,G__80830__$3,G__80830__$4,G__80830__$5,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (G__80830,G__80830__$1,G__80830__$2,G__80830__$3,G__80830__$4,G__80830__$5,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80201_SHARP_){
return org.numenta.sanity.comportex.data.count_segs_in_column(cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.params(lyr)),p1__80201_SHARP_);
});})(G__80830,G__80830__$1,G__80830__$2,G__80830__$3,G__80830__$4,G__80830__$5,lyr,htm,temp__6726__auto__,vec__80823,id,lyr_id,fetches,map__80826,map__80826__$1,cols_subset,map__80827,map__80827__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cols_subset)))):G__80830__$5);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80830__$6,"break?",cljs.core.empty_QMARK_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null))));

} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-sense-bits":
var vec__80837 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80837,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80837,(1),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80837,(2),null);
var map__80840 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80837,(3),null);
var map__80840__$1 = ((((!((map__80840 == null)))?((((map__80840.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80840.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80840):map__80840);
var bits_subset = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80840__$1,cljs.core.cst$kw$value);
var map__80841 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80837,(4),null);
var map__80841__$1 = ((((!((map__80841 == null)))?((((map__80841.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80841.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80841):map__80841);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80841__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80844 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80844,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80844,(1),null);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
var map__80847 = org.nfrac.comportex.core.add_feedback_deps(htm);
var map__80847__$1 = ((((!((map__80847 == null)))?((((map__80847.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80847.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80847):map__80847);
var fb_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80847__$1,cljs.core.cst$kw$fb_DASH_deps);
var lyr_id = cljs.core.first(cljs.core.get.cljs$core$IFn$_invoke$arity$2(fb_deps,sense_id));
var prev_lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var G__80849 = cljs.core.PersistentArrayMap.EMPTY;
var G__80849__$1 = ((cljs.core.contains_QMARK_(fetches,"active-bits"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80849,"active-bits",cljs.core.set(cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(sense))):G__80849);
if(cljs.core.truth_((function (){var and__9266__auto__ = cljs.core.contains_QMARK_(fetches,"pred-bits-alpha");
if(and__9266__auto__){
return prev_lyr;
} else {
return and__9266__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80849__$1,"pred-bits-alpha",(function (){var start = org.nfrac.comportex.core.ff_base(htm,lyr_id,sense_id);
var end = (start + org.nfrac.comportex.core.size_of(sense));
return org.nfrac.comportex.util.remap(((function (start,end,G__80849,G__80849__$1,sense,map__80847,map__80847__$1,fb_deps,lyr_id,prev_lyr,vec__80844,prev_htm,htm,temp__6726__auto__,vec__80837,id,sense_id,fetches,map__80840,map__80840__$1,bits_subset,map__80841,map__80841__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80203_SHARP_){
var x__9618__auto__ = 1.0;
var y__9619__auto__ = (p1__80203_SHARP_ / (8));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
});})(start,end,G__80849,G__80849__$1,sense,map__80847,map__80847__$1,fb_deps,lyr_id,prev_lyr,vec__80844,prev_htm,htm,temp__6726__auto__,vec__80837,id,sense_id,fetches,map__80840,map__80840__$1,bits_subset,map__80841,map__80841__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (start,end,G__80849,G__80849__$1,sense,map__80847,map__80847__$1,fb_deps,lyr_id,prev_lyr,vec__80844,prev_htm,htm,temp__6726__auto__,vec__80837,id,sense_id,fetches,map__80840,map__80840__$1,bits_subset,map__80841,map__80841__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p__80850){
var vec__80851 = p__80850;
var id__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80851,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80851,(1),null);
if(((start <= id__$1)) && ((id__$1 < end))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id__$1 - start),votes], null);
} else {
return null;
}
});})(start,end,G__80849,G__80849__$1,sense,map__80847,map__80847__$1,fb_deps,lyr_id,prev_lyr,vec__80844,prev_htm,htm,temp__6726__auto__,vec__80837,id,sense_id,fetches,map__80840,map__80840__$1,bits_subset,map__80841,map__80841__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,org.nfrac.comportex.core.layer_decode_to_ff_bits(prev_lyr,cljs.core.PersistentArrayMap.EMPTY))));
})());
} else {
return G__80849__$1;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-synapses-by-source-bit":
var vec__80854 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80854,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80854,(1),null);
var bit = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80854,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80854,(3),null);
var map__80857 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80854,(4),null);
var map__80857__$1 = ((((!((map__80857 == null)))?((((map__80857.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80857.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80857):map__80857);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80857__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
return org.numenta.sanity.comportex.data.syns_from_source_bit(htm,sense_id,bit,syn_states);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-column-cells":
var vec__80859 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80859,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80859,(1),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80859,(2),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80859,(3),null);
var map__80862 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80859,(4),null);
var map__80862__$1 = ((((!((map__80862 == null)))?((((map__80862.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80862.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80862):map__80862);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80862__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var info = org.nfrac.comportex.core.layer_state(lyr);
var extract_cells = ((function (lyr,info,htm,temp__6726__auto__,vec__80859,id,lyr_id,col,fetches,map__80862,map__80862__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p1__80204_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (lyr,info,htm,temp__6726__auto__,vec__80859,id,lyr_id,col,fetches,map__80862,map__80862__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id){
return (function (p__80864){
var vec__80865 = p__80864;
var column = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80865,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80865,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(col,column)){
return ci;
} else {
return null;
}
});})(lyr,info,htm,temp__6726__auto__,vec__80859,id,lyr_id,col,fetches,map__80862,map__80862__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
,p1__80204_SHARP_));
});})(lyr,info,htm,temp__6726__auto__,vec__80859,id,lyr_id,col,fetches,map__80862,map__80862__$1,response_c,G__80781,client_info,vec__80774,vec__80777,seq__80778,first__80779,seq__80778__$1,command,xs,client_id))
;
var G__80868 = cljs.core.PersistentArrayMap.EMPTY;
var G__80868__$1 = ((cljs.core.contains_QMARK_(fetches,"active-cells"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80868,"active-cells",extract_cells(cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(info))):G__80868);
var G__80868__$2 = ((cljs.core.contains_QMARK_(fetches,"prior-predicted-cells"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80868__$1,"prior-predicted-cells",extract_cells(cljs.core.cst$kw$prior_DASH_predictive_DASH_cells.cljs$core$IFn$_invoke$arity$1(info))):G__80868__$1);
if(cljs.core.contains_QMARK_(fetches,"winner-cells")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80868__$2,"winner-cells",extract_cells(cljs.core.cst$kw$winner_DASH_cells.cljs$core$IFn$_invoke$arity$1(info)));
} else {
return G__80868__$2;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-apical-segments":
var vec__80869 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80869,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80869,(1),null);
var seg_selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80869,(2),null);
var map__80872 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80869,(3),null);
var map__80872__$1 = ((((!((map__80872 == null)))?((((map__80872.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80872.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80872):map__80872);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80872__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80874 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80874,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80874,(1),null);
return org.numenta.sanity.comportex.data.query_segs(htm,prev_htm,lyr_id,seg_selector,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-distal-segments":
var vec__80877 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80877,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80877,(1),null);
var seg_selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80877,(2),null);
var map__80880 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80877,(3),null);
var map__80880__$1 = ((((!((map__80880 == null)))?((((map__80880.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80880.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80880):map__80880);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80880__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80882 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80882,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80882,(1),null);
return org.numenta.sanity.comportex.data.query_segs(htm,prev_htm,lyr_id,seg_selector,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-segments":
var vec__80885 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80885,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80885,(1),null);
var seg_selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80885,(2),null);
var map__80888 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80885,(3),null);
var map__80888__$1 = ((((!((map__80888 == null)))?((((map__80888.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80888.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80888):map__80888);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80888__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80890 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80890,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80890,(1),null);
return org.numenta.sanity.comportex.data.query_segs(htm,prev_htm,lyr_id,seg_selector,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-apical-synapses":
var vec__80893 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80893,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80893,(1),null);
var seg_selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80893,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80893,(3),null);
var map__80896 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80893,(4),null);
var map__80896__$1 = ((((!((map__80896 == null)))?((((map__80896.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80896.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80896):map__80896);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80896__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80898 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80898,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80898,(1),null);
return org.numenta.sanity.comportex.data.query_syns(htm,prev_htm,lyr_id,seg_selector,syn_states,cljs.core.cst$kw$apical);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-distal-synapses":
var vec__80901 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80901,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80901,(1),null);
var seg_selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80901,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80901,(3),null);
var map__80904 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80901,(4),null);
var map__80904__$1 = ((((!((map__80904 == null)))?((((map__80904.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80904.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80904):map__80904);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80904__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80906 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80906,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80906,(1),null);
return org.numenta.sanity.comportex.data.query_syns(htm,prev_htm,lyr_id,seg_selector,syn_states,cljs.core.cst$kw$distal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-proximal-synapses":
var vec__80909 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80909,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80909,(1),null);
var seg_selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80909,(2),null);
var syn_states = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80909,(3),null);
var map__80912 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80909,(4),null);
var map__80912__$1 = ((((!((map__80912 == null)))?((((map__80912.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80912.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80912):map__80912);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80912__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80914 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80914,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80914,(1),null);
return org.numenta.sanity.comportex.data.query_syns(htm,prev_htm,lyr_id,seg_selector,syn_states,cljs.core.cst$kw$proximal);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-details-text":
var vec__80917 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80917,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80917,(1),null);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80917,(2),null);
var map__80920 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80917,(3),null);
var map__80920__$1 = ((((!((map__80920 == null)))?((((map__80920.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80920.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80920):map__80920);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80920__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model_pair(id);
if(cljs.core.truth_(temp__6726__auto__)){
var vec__80922 = temp__6726__auto__;
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80922,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80922,(1),null);
return org.numenta.sanity.comportex.details.detail_text(htm,prev_htm,lyr_id,col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-model":
var vec__80925 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80925,(0),null);
var map__80928 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80925,(1),null);
var map__80928__$1 = ((((!((map__80928 == null)))?((((map__80928.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80928.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80928):map__80928);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80928__$1,cljs.core.cst$kw$ch);
var as_str_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80925,(2),null);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
var G__80930 = htm;
if(cljs.core.truth_(as_str_QMARK_)){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([G__80930], 0));
} else {
return G__80930;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-layer-stats":
var vec__80931 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80931,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80931,(1),null);
var fetches = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80931,(2),null);
var map__80934 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80931,(3),null);
var map__80934__$1 = ((((!((map__80934 == null)))?((((map__80934.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80934.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80934):map__80934);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80934__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var info = org.nfrac.comportex.core.layer_state(lyr);
var a_cols = cljs.core.cst$kw$active_DASH_columns.cljs$core$IFn$_invoke$arity$1(info);
var ppc = cljs.core.cst$kw$prior_DASH_predictive_DASH_cells.cljs$core$IFn$_invoke$arity$1(info);
var pp_cols = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,ppc));
var ap_cols = clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(pp_cols,a_cols);
var col_states = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.zipmap(pp_cols,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$predicted)),cljs.core.zipmap(a_cols,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active)),cljs.core.zipmap(ap_cols,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_predicted))], 0));
var freqs = cljs.core.frequencies(cljs.core.vals(col_states));
var G__80936 = cljs.core.PersistentArrayMap.EMPTY;
var G__80936__$1 = ((cljs.core.contains_QMARK_(fetches,"n-unpredicted-active-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80936,"n-unpredicted-active-columns",cljs.core.get.cljs$core$IFn$_invoke$arity$3(freqs,cljs.core.cst$kw$active,(0))):G__80936);
var G__80936__$2 = ((cljs.core.contains_QMARK_(fetches,"n-predicted-inactive-columns"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80936__$1,"n-predicted-inactive-columns",cljs.core.get.cljs$core$IFn$_invoke$arity$3(freqs,cljs.core.cst$kw$predicted,(0))):G__80936__$1);
if(cljs.core.contains_QMARK_(fetches,"n-predicted-active-columns")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__80936__$2,"n-predicted-active-columns",cljs.core.get.cljs$core$IFn$_invoke$arity$3(freqs,cljs.core.cst$kw$active_DASH_predicted,(0)));
} else {
return G__80936__$2;
}
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cell-excitation-data":
var vec__80937 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80937,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80937,(1),null);
var sel_col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80937,(2),null);
var map__80940 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80937,(3),null);
var map__80940__$1 = ((((!((map__80940 == null)))?((((map__80940.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80940.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80940):map__80940);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80940__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var vec__80942 = find_model_pair(id);
var prev_htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80942,(0),null);
var htm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80942,(1),null);
if(cljs.core.truth_(prev_htm)){
return org.numenta.sanity.comportex.data.cell_excitation_data(htm,prev_htm,lyr_id,sel_col);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-cells-by-state":
var vec__80945 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80945,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80945,(1),null);
var map__80948 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80945,(2),null);
var map__80948__$1 = ((((!((map__80948 == null)))?((((map__80948.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80948.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80948):map__80948);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80948__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
var layer = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var info = org.nfrac.comportex.core.layer_state(layer);
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$winner_DASH_cells,cljs.core.cst$kw$winner_DASH_cells.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$kw$active_DASH_cells,cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$kw$pred_DASH_cells,cljs.core.cst$kw$predictive_DASH_cells.cljs$core$IFn$_invoke$arity$1(info),cljs.core.cst$kw$engaged_QMARK_,true], null);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
case "get-transitions-data":
var vec__80950 = xs;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80950,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80950,(1),null);
var cell_sdr_fracs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80950,(2),null);
var map__80953 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80950,(3),null);
var map__80953__$1 = ((((!((map__80953 == null)))?((((map__80953.cljs$lang$protocol_mask$partition0$ & (64))) || (map__80953.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__80953):map__80953);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__80953__$1,cljs.core.cst$kw$ch);
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,(function (){var temp__6726__auto__ = find_model(id);
if(cljs.core.truth_(temp__6726__auto__)){
var htm = temp__6726__auto__;
return org.numenta.sanity.comportex.data.transitions_data(htm,lyr_id,cell_sdr_fracs);
} else {
return org.numenta.sanity.comportex.journal.id_missing_response(id,steps_offset);
}
})());

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(command)].join('')));

}
});
});
org.numenta.sanity.comportex.journal.init = (function org$numenta$sanity$comportex$journal$init(steps_c,commands_c,current_model,n_keep){
var steps_offset = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
var model_steps = (function (){var G__81057 = cljs.core.PersistentVector.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__81057) : cljs.core.atom.call(null,G__81057));
})();
var steps_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var steps_mult = cljs.core.async.mult(steps_in);
var client_infos = (function (){var G__81058 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__81058) : cljs.core.atom.call(null,G__81058));
})();
var capture_options = (function (){var G__81059 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$keep_DASH_steps,n_keep,cljs.core.cst$kw$ff_DASH_synapses,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false], null),cljs.core.cst$kw$distal_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null),cljs.core.cst$kw$apical_DASH_synapses,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$capture_QMARK_,true,cljs.core.cst$kw$only_DASH_active_QMARK_,false,cljs.core.cst$kw$only_DASH_connected_QMARK_,false,cljs.core.cst$kw$only_DASH_noteworthy_DASH_columns_QMARK_,false], null)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__81059) : cljs.core.atom.call(null,G__81059));
})();
var handle_command = org.numenta.sanity.comportex.journal.command_handler(current_model,steps_offset,model_steps,steps_mult,client_infos,capture_options);
var c__42110__auto___81158 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___81158,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___81158,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_81099){
var state_val_81100 = (state_81099[(1)]);
if((state_val_81100 === (7))){
var inst_81095 = (state_81099[(2)]);
var state_81099__$1 = state_81099;
var statearr_81101_81159 = state_81099__$1;
(statearr_81101_81159[(2)] = inst_81095);

(statearr_81101_81159[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (1))){
var state_81099__$1 = state_81099;
var statearr_81102_81160 = state_81099__$1;
(statearr_81102_81160[(2)] = null);

(statearr_81102_81160[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (4))){
var inst_81062 = (state_81099[(7)]);
var inst_81062__$1 = (state_81099[(2)]);
var state_81099__$1 = (function (){var statearr_81103 = state_81099;
(statearr_81103[(7)] = inst_81062__$1);

return statearr_81103;
})();
if(cljs.core.truth_(inst_81062__$1)){
var statearr_81104_81161 = state_81099__$1;
(statearr_81104_81161[(1)] = (5));

} else {
var statearr_81105_81162 = state_81099__$1;
(statearr_81105_81162[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (13))){
var inst_81080 = (state_81099[(8)]);
var inst_81067 = (state_81099[(9)]);
var inst_81062 = (state_81099[(7)]);
var inst_81087 = (state_81099[(2)]);
var inst_81088 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(model_steps,inst_81087) : cljs.core.reset_BANG_.call(null,model_steps,inst_81087));
var inst_81089 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(steps_offset,cljs.core._PLUS_,inst_81080);
var inst_81090 = org.numenta.sanity.comportex.journal.make_step(inst_81062,inst_81067);
var inst_81091 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(steps_in,inst_81090);
var state_81099__$1 = (function (){var statearr_81106 = state_81099;
(statearr_81106[(10)] = inst_81091);

(statearr_81106[(11)] = inst_81088);

(statearr_81106[(12)] = inst_81089);

return statearr_81106;
})();
var statearr_81107_81163 = state_81099__$1;
(statearr_81107_81163[(2)] = null);

(statearr_81107_81163[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (6))){
var state_81099__$1 = state_81099;
var statearr_81108_81164 = state_81099__$1;
(statearr_81108_81164[(2)] = null);

(statearr_81108_81164[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (3))){
var inst_81097 = (state_81099[(2)]);
var state_81099__$1 = state_81099;
return cljs.core.async.impl.ioc_helpers.return_chan(state_81099__$1,inst_81097);
} else {
if((state_val_81100 === (12))){
var inst_81069 = (state_81099[(13)]);
var state_81099__$1 = state_81099;
var statearr_81109_81165 = state_81099__$1;
(statearr_81109_81165[(2)] = inst_81069);

(statearr_81109_81165[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (2))){
var state_81099__$1 = state_81099;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_81099__$1,(4),steps_c);
} else {
if((state_val_81100 === (11))){
var inst_81080 = (state_81099[(8)]);
var inst_81069 = (state_81099[(13)]);
var inst_81084 = cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(inst_81069,inst_81080);
var state_81099__$1 = state_81099;
var statearr_81110_81166 = state_81099__$1;
(statearr_81110_81166[(2)] = inst_81084);

(statearr_81110_81166[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (9))){
var state_81099__$1 = state_81099;
var statearr_81111_81167 = state_81099__$1;
(statearr_81111_81167[(2)] = (0));

(statearr_81111_81167[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (5))){
var inst_81071 = (state_81099[(14)]);
var inst_81062 = (state_81099[(7)]);
var inst_81064 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps_offset) : cljs.core.deref.call(null,steps_offset));
var inst_81065 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_81066 = cljs.core.count(inst_81065);
var inst_81067 = (inst_81064 + inst_81066);
var inst_81068 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model_steps) : cljs.core.deref.call(null,model_steps));
var inst_81069 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(inst_81068,inst_81062);
var inst_81070 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(capture_options) : cljs.core.deref.call(null,capture_options));
var inst_81071__$1 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_81070);
var inst_81072 = (inst_81071__$1 < (0));
var inst_81073 = cljs.core.not(inst_81072);
var state_81099__$1 = (function (){var statearr_81112 = state_81099;
(statearr_81112[(14)] = inst_81071__$1);

(statearr_81112[(13)] = inst_81069);

(statearr_81112[(9)] = inst_81067);

return statearr_81112;
})();
if(inst_81073){
var statearr_81113_81168 = state_81099__$1;
(statearr_81113_81168[(1)] = (8));

} else {
var statearr_81114_81169 = state_81099__$1;
(statearr_81114_81169[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (10))){
var inst_81080 = (state_81099[(8)]);
var inst_81080__$1 = (state_81099[(2)]);
var inst_81082 = (inst_81080__$1 > (0));
var state_81099__$1 = (function (){var statearr_81115 = state_81099;
(statearr_81115[(8)] = inst_81080__$1);

return statearr_81115;
})();
if(cljs.core.truth_(inst_81082)){
var statearr_81116_81170 = state_81099__$1;
(statearr_81116_81170[(1)] = (11));

} else {
var statearr_81117_81171 = state_81099__$1;
(statearr_81117_81171[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_81100 === (8))){
var inst_81071 = (state_81099[(14)]);
var inst_81069 = (state_81099[(13)]);
var inst_81075 = cljs.core.count(inst_81069);
var inst_81076 = (inst_81075 - inst_81071);
var inst_81077 = (((0) > inst_81076) ? (0) : inst_81076);
var state_81099__$1 = state_81099;
var statearr_81118_81172 = state_81099__$1;
(statearr_81118_81172[(2)] = inst_81077);

(statearr_81118_81172[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__42110__auto___81158,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__41984__auto__,c__42110__auto___81158,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____0 = (function (){
var statearr_81122 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_81122[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__);

(statearr_81122[(1)] = (1));

return statearr_81122;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____1 = (function (state_81099){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_81099);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e81123){if((e81123 instanceof Object)){
var ex__41988__auto__ = e81123;
var statearr_81124_81173 = state_81099;
(statearr_81124_81173[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_81099);

return cljs.core.cst$kw$recur;
} else {
throw e81123;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__81174 = state_81099;
state_81099 = G__81174;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__ = function(state_81099){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____1.call(this,state_81099);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___81158,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__42112__auto__ = (function (){var statearr_81125 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_81125[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___81158);

return statearr_81125;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___81158,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);


var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function (state_81141){
var state_val_81142 = (state_81141[(1)]);
if((state_val_81142 === (1))){
var state_81141__$1 = state_81141;
var statearr_81143_81175 = state_81141__$1;
(statearr_81143_81175[(2)] = null);

(statearr_81143_81175[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81142 === (2))){
var state_81141__$1 = state_81141;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_81141__$1,(4),commands_c);
} else {
if((state_val_81142 === (3))){
var inst_81139 = (state_81141[(2)]);
var state_81141__$1 = state_81141;
return cljs.core.async.impl.ioc_helpers.return_chan(state_81141__$1,inst_81139);
} else {
if((state_val_81142 === (4))){
var inst_81128 = (state_81141[(7)]);
var inst_81128__$1 = (state_81141[(2)]);
var inst_81129 = (inst_81128__$1 == null);
var inst_81130 = cljs.core.not(inst_81129);
var state_81141__$1 = (function (){var statearr_81144 = state_81141;
(statearr_81144[(7)] = inst_81128__$1);

return statearr_81144;
})();
if(inst_81130){
var statearr_81145_81176 = state_81141__$1;
(statearr_81145_81176[(1)] = (5));

} else {
var statearr_81146_81177 = state_81141__$1;
(statearr_81146_81177[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_81142 === (5))){
var inst_81128 = (state_81141[(7)]);
var inst_81132 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_81128) : handle_command.call(null,inst_81128));
var state_81141__$1 = (function (){var statearr_81147 = state_81141;
(statearr_81147[(8)] = inst_81132);

return statearr_81147;
})();
var statearr_81148_81178 = state_81141__$1;
(statearr_81148_81178[(2)] = null);

(statearr_81148_81178[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81142 === (6))){
var inst_81135 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["CLOSING JOURNAL"], 0));
var state_81141__$1 = state_81141;
var statearr_81149_81179 = state_81141__$1;
(statearr_81149_81179[(2)] = inst_81135);

(statearr_81149_81179[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81142 === (7))){
var inst_81137 = (state_81141[(2)]);
var state_81141__$1 = state_81141;
var statearr_81150_81180 = state_81141__$1;
(statearr_81150_81180[(2)] = inst_81137);

(statearr_81150_81180[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
});})(c__42110__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
;
return ((function (switch__41984__auto__,c__42110__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command){
return (function() {
var org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____0 = (function (){
var statearr_81154 = [null,null,null,null,null,null,null,null,null];
(statearr_81154[(0)] = org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__);

(statearr_81154[(1)] = (1));

return statearr_81154;
});
var org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____1 = (function (state_81141){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_81141);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e81155){if((e81155 instanceof Object)){
var ex__41988__auto__ = e81155;
var statearr_81156_81181 = state_81141;
(statearr_81156_81181[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_81141);

return cljs.core.cst$kw$recur;
} else {
throw e81155;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__81182 = state_81141;
state_81141 = G__81182;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__ = function(state_81141){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____1.call(this,state_81141);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____0;
org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto____1;
return org$numenta$sanity$comportex$journal$init_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
})();
var state__42112__auto__ = (function (){var statearr_81157 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_81157[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_81157;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,steps_offset,model_steps,steps_in,steps_mult,client_infos,capture_options,handle_command))
);

return c__42110__auto__;
});
