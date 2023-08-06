// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.q_learning_1d');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.core');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('org.nfrac.comportex.layer');
org.nfrac.comportex.demos.q_learning_1d.input_dim = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(400)], null);
org.nfrac.comportex.demos.q_learning_1d.n_on_bits = (20);
org.nfrac.comportex.demos.q_learning_1d.surface = cljs.core.PersistentVector.fromArray([(0),0.5,(1),1.5,(2),1.5,(1),0.5,(0),(1),(2),(3),(4),(5),(4),(3),(2),(1),(1),(1),(1),(1),(1),(1),(2),(3),(4),(5),(6),(7),(8),(6),(4),(2)], true);
org.nfrac.comportex.demos.q_learning_1d.initial_inval = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(org.nfrac.comportex.demos.q_learning_1d.surface.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.q_learning_1d.surface.cljs$core$IFn$_invoke$arity$1((5)) : org.nfrac.comportex.demos.q_learning_1d.surface.call(null,(5))),cljs.core.cst$kw$dy,(0),cljs.core.cst$kw$action,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dx,(0)], null)], null);
org.nfrac.comportex.demos.q_learning_1d.params = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio,cljs.core.cst$kw$boost_DASH_active_DASH_every,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,cljs.core.cst$kw$adjust_DASH_overlap_DASH_duty_DASH_ratio],[0.05,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(500)], null),0.5,(0),(50),3.0,1.0,(1),(500),(0)]);
org.nfrac.comportex.demos.q_learning_1d.action_params = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ff_DASH_perm_DASH_init,cljs.core.cst$kw$q_DASH_alpha,cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio,cljs.core.cst$kw$q_DASH_discount,cljs.core.cst$kw$boost_DASH_active_DASH_every,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$activation_DASH_level,cljs.core.cst$kw$proximal,cljs.core.cst$kw$stable_DASH_activation_DASH_steps,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,cljs.core.cst$kw$adjust_DASH_overlap_DASH_duty_DASH_ratio],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.35,0.45], null),0.2,0.05,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(30)], null),0.5,(0),0.8,(100),3.0,1.0,0.2,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$perm_DASH_inc,0.05,cljs.core.cst$kw$perm_DASH_dec,0.05,cljs.core.cst$kw$perm_DASH_connected,0.1,cljs.core.cst$kw$stimulus_DASH_threshold,(1),cljs.core.cst$kw$learn_QMARK_,false], null),(1),(1),(500),(0)]);
org.nfrac.comportex.demos.q_learning_1d.direction__GT_action = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$left,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dx,(-1)], null),cljs.core.cst$kw$right,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$dx,(1)], null)], null);
org.nfrac.comportex.demos.q_learning_1d.possible_directions = (function org$nfrac$comportex$demos$q_learning_1d$possible_directions(x){
if((x === (0))){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$right,null], null), null);
} else {
if((x === (cljs.core.count(org.nfrac.comportex.demos.q_learning_1d.surface) - (1)))){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$left,null], null), null);
} else {
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$right,null,cljs.core.cst$kw$left,null], null), null);

}
}
});
org.nfrac.comportex.demos.q_learning_1d.column__GT_signal = cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),(function (){var iter__10132__auto__ = (function org$nfrac$comportex$demos$q_learning_1d$iter__83109(s__83110){
return (new cljs.core.LazySeq(null,(function (){
var s__83110__$1 = s__83110;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__83110__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var direction = cljs.core.first(xs__7284__auto__);
var iterys__10128__auto__ = ((function (s__83110__$1,direction,xs__7284__auto__,temp__6728__auto__){
return (function org$nfrac$comportex$demos$q_learning_1d$iter__83109_$_iter__83111(s__83112){
return (new cljs.core.LazySeq(null,((function (s__83110__$1,direction,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__83112__$1 = s__83112;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__83112__$1);
if(temp__6728__auto____$1){
var s__83112__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__83112__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__83112__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__83114 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__83113 = (0);
while(true){
if((i__83113 < size__10131__auto__)){
var influence = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__83113);
cljs.core.chunk_append(b__83114,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [direction,influence], null));

var G__83120 = (i__83113 + (1));
i__83113 = G__83120;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83114),org$nfrac$comportex$demos$q_learning_1d$iter__83109_$_iter__83111(cljs.core.chunk_rest(s__83112__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83114),null);
}
} else {
var influence = cljs.core.first(s__83112__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [direction,influence], null),org$nfrac$comportex$demos$q_learning_1d$iter__83109_$_iter__83111(cljs.core.rest(s__83112__$2)));
}
} else {
return null;
}
break;
}
});})(s__83110__$1,direction,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__83110__$1,direction,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((15),1.0)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$demos$q_learning_1d$iter__83109(cljs.core.rest(s__83110__$1)));
} else {
var G__83121 = cljs.core.rest(s__83110__$1);
s__83110__$1 = G__83121;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$left,cljs.core.cst$kw$right], null));
})());
org.nfrac.comportex.demos.q_learning_1d.select_action = (function org$nfrac$comportex$demos$q_learning_1d$select_action(htm,curr_pos){
var alyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action], null));
var acols = cljs.core.cst$kw$active_DASH_columns.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(alyr));
var signals = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.demos.q_learning_1d.column__GT_signal,acols);
var poss = org.nfrac.comportex.demos.q_learning_1d.possible_directions(curr_pos);
var G__83127 = cljs.core.key(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.val,cljs.core.shuffle(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(poss,cljs.core.key),cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (alyr,acols,signals,poss){
return (function (m,p__83128){
var vec__83129 = p__83128;
var motion = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83129,(0),null);
var influence = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83129,(1),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,motion,(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,motion,(0)) + influence));
});})(alyr,acols,signals,poss))
,cljs.core.transient$(cljs.core.zipmap(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$left,cljs.core.cst$kw$right], null),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1((0)))),signals))))));
return (org.nfrac.comportex.demos.q_learning_1d.direction__GT_action.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.q_learning_1d.direction__GT_action.cljs$core$IFn$_invoke$arity$1(G__83127) : org.nfrac.comportex.demos.q_learning_1d.direction__GT_action.call(null,G__83127));
});
org.nfrac.comportex.demos.q_learning_1d.apply_action = (function org$nfrac$comportex$demos$q_learning_1d$apply_action(inval){
var x = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval);
var dx = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var next_x = (function (){var x__9611__auto__ = (function (){var x__9618__auto__ = (x + dx);
var y__9619__auto__ = (cljs.core.count(org.nfrac.comportex.demos.q_learning_1d.surface) - (1));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var next_y = (org.nfrac.comportex.demos.q_learning_1d.surface.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.q_learning_1d.surface.cljs$core$IFn$_invoke$arity$1(next_x) : org.nfrac.comportex.demos.q_learning_1d.surface.call(null,next_x));
var dy = (next_y - cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$x,next_x,cljs.core.array_seq([cljs.core.cst$kw$y,next_y,cljs.core.cst$kw$dy,dy], 0));
});
org.nfrac.comportex.demos.q_learning_1d.active_synapses = (function org$nfrac$comportex$demos$q_learning_1d$active_synapses(sg,target_id,ff_bits){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__83136){
var vec__83137 = p__83136;
var in_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83137,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83137,(1),null);
return (ff_bits.cljs$core$IFn$_invoke$arity$1 ? ff_bits.cljs$core$IFn$_invoke$arity$1(in_id) : ff_bits.call(null,in_id));
}),org.nfrac.comportex.synapses.in_synapses(sg,target_id));
});
org.nfrac.comportex.demos.q_learning_1d.active_synapse_perms = (function org$nfrac$comportex$demos$q_learning_1d$active_synapse_perms(sg,target_id,ff_bits){
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p__83144){
var vec__83145 = p__83144;
var in_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83145,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83145,(1),null);
if(cljs.core.truth_((ff_bits.cljs$core$IFn$_invoke$arity$1 ? ff_bits.cljs$core$IFn$_invoke$arity$1(in_id) : ff_bits.call(null,in_id)))){
return p;
} else {
return null;
}
}),org.nfrac.comportex.synapses.in_synapses(sg,target_id));
});
org.nfrac.comportex.demos.q_learning_1d.mean = (function org$nfrac$comportex$demos$q_learning_1d$mean(xs){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,xs) / cljs.core.count(xs));
});
org.nfrac.comportex.demos.q_learning_1d.q_learn = (function org$nfrac$comportex$demos$q_learning_1d$q_learn(lyr,reward){
var map__83153 = org.nfrac.comportex.core.params(lyr);
var map__83153__$1 = ((((!((map__83153 == null)))?((((map__83153.cljs$lang$protocol_mask$partition0$ & (64))) || (map__83153.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__83153):map__83153);
var ff_perm_init = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83153__$1,cljs.core.cst$kw$ff_DASH_perm_DASH_init);
var q_alpha = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83153__$1,cljs.core.cst$kw$q_DASH_alpha);
var q_discount = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83153__$1,cljs.core.cst$kw$q_DASH_discount);
var vec__83154 = ff_perm_init;
var p_ref = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83154,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83154,(1),null);
var ff_bits = (function (){var or__9278__auto__ = cljs.core.set(cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$in_DASH_ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})();
var prev_ff_bits = (function (){var or__9278__auto__ = cljs.core.set(cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$in_DASH_ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prior_DASH_active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})();
var acols = cljs.core.cst$kw$active_DASH_cols.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr));
var prev_acols = cljs.core.cst$kw$active_DASH_cols.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prior_DASH_active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr));
var psg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr);
var aperms = cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (map__83153,map__83153__$1,ff_perm_init,q_alpha,q_discount,vec__83154,p_ref,_,ff_bits,prev_ff_bits,acols,prev_acols,psg){
return (function (col){
return org.nfrac.comportex.demos.q_learning_1d.active_synapse_perms(psg,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null),ff_bits);
});})(map__83153,map__83153__$1,ff_perm_init,q_alpha,q_discount,vec__83154,p_ref,_,ff_bits,prev_ff_bits,acols,prev_acols,psg))
,cljs.core.array_seq([acols], 0));
var Q_est = ((cljs.core.seq(aperms))?(org.nfrac.comportex.demos.q_learning_1d.mean(aperms) - p_ref):(0));
var Q_old = cljs.core.cst$kw$Q_DASH_val.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$Q_DASH_info.cljs$core$IFn$_invoke$arity$1(lyr),(0));
var learn_value = (reward + (q_discount * Q_est));
var adjust = (q_alpha * (learn_value - Q_old));
var op = (((adjust > (0)))?cljs.core.cst$kw$reinforce:cljs.core.cst$kw$punish);
var seg_updates = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__83153,map__83153__$1,ff_perm_init,q_alpha,q_discount,vec__83154,p_ref,_,ff_bits,prev_ff_bits,acols,prev_acols,psg,aperms,Q_est,Q_old,learn_value,adjust,op){
return (function (col){
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null),op,null,null);
});})(map__83153,map__83153__$1,ff_perm_init,q_alpha,q_discount,vec__83154,p_ref,_,ff_bits,prev_ff_bits,acols,prev_acols,psg,aperms,Q_est,Q_old,learn_value,adjust,op))
,prev_acols);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.core.layer_learn(lyr),cljs.core.cst$kw$proximal_DASH_sg,org.nfrac.comportex.synapses.bulk_learn(psg,seg_updates,prev_ff_bits,org.nfrac.comportex.util.abs(adjust),org.nfrac.comportex.util.abs(adjust),0.0)),cljs.core.cst$kw$Q_DASH_info,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$Q_DASH_val,Q_est,cljs.core.cst$kw$Q_DASH_old,Q_old,cljs.core.cst$kw$reward,reward,cljs.core.cst$kw$lrn,learn_value,cljs.core.cst$kw$adj,adjust,cljs.core.cst$kw$perms,cljs.core.count(aperms)], null));
});
org.nfrac.comportex.demos.q_learning_1d.build = (function org$nfrac$comportex$demos$q_learning_1d$build(){
var sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x,org.nfrac.comportex.encoders.linear_encoder.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.demos.q_learning_1d.input_dim,org.nfrac.comportex.demos.q_learning_1d.n_on_bits,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-5),(cljs.core.count(org.nfrac.comportex.demos.q_learning_1d.surface) + (5))], null))], null);
var msensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$dx], null),org.nfrac.comportex.encoders.linear_encoder.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100)], null),(30),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(1)], null))], null);
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,org.nfrac.comportex.layer.layer_of_cells(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.demos.q_learning_1d.params,cljs.core.cst$kw$lateral_DASH_synapses_QMARK_,false)),cljs.core.cst$kw$action,org.nfrac.comportex.layer.layer_of_cells(org.nfrac.comportex.demos.q_learning_1d.action_params)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$input,sensor,cljs.core.cst$kw$motor,msensor], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ff_DASH_deps,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input], null),cljs.core.cst$kw$action,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer_DASH_a], null)], null),cljs.core.cst$kw$lat_DASH_deps,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$motor], null)], null)], null));
});
org.nfrac.comportex.demos.q_learning_1d.htm_step_with_action_selection = (function org$nfrac$comportex$demos$q_learning_1d$htm_step_with_action_selection(world_c){
return (function (htm,inval){
var htm_a = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.core.htm_activate(org.nfrac.comportex.core.htm_sense(htm,inval,cljs.core.cst$kw$ff)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_a], null),org.nfrac.comportex.core.layer_learn);
var reward = (0.5 * cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(inval));
var upd_htm = cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(htm_a,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action], null),org.nfrac.comportex.demos.q_learning_1d.q_learn,reward);
var info = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(upd_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action,cljs.core.cst$kw$Q_DASH_info], null));
var newQ = (function (){var x__9618__auto__ = (function (){var x__9611__auto__ = (cljs.core.cst$kw$Q_DASH_old.cljs$core$IFn$_invoke$arity$2(info,(0)) + cljs.core.cst$kw$adj.cljs$core$IFn$_invoke$arity$2(info,(0)));
var y__9612__auto__ = -1.0;
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var y__9619__auto__ = 1.0;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var Q_map = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.select_keys(inval,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x,cljs.core.cst$kw$action], null)),newQ);
var action = org.nfrac.comportex.demos.q_learning_1d.select_action(upd_htm,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval));
var inval_with_action = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$action,action,cljs.core.array_seq([cljs.core.cst$kw$prev_DASH_action,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$Q_DASH_map,Q_map], 0));
var new_inval_83158 = org.nfrac.comportex.demos.q_learning_1d.apply_action(inval_with_action);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(world_c,new_inval_83158);

return org.nfrac.comportex.core.htm_depolarise(org.nfrac.comportex.core.htm_sense(upd_htm,inval_with_action,cljs.core.cst$kw$lat));
});
});
