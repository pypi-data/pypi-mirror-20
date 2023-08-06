// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.layer.tools');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('org.nfrac.comportex.synapses');
goog.require('cljs.spec');
goog.require('cljs.spec.impl.gen');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.topography');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.layer');
/**
 * Returns [src-id j] where src-id may be a layer key or sense key, and j is
 *   the index into the output of the source.
 */
org.nfrac.comportex.layer.tools.source_of_distal_bit = (function org$nfrac$comportex$layer$tools$source_of_distal_bit(htm,lyr_id,i){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var params = org.nfrac.comportex.core.params(lyr);
var vec__64199 = org.nfrac.comportex.layer.id__GT_source(params,cljs.core.cst$kw$embedding.cljs$core$IFn$_invoke$arity$1(lyr),i);
var src_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64199,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64199,(1),null);
var G__64202 = (((src_type instanceof cljs.core.Keyword))?src_type.fqn:null);
switch (G__64202) {
case "this":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lyr_id,i], null);

break;
case "lat":
return org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,j,cljs.core.cst$kw$lat_DASH_deps);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(src_type)].join('')));

}
});
/**
 * Returns [src-id j] where src-id is a layer key, and j is the index into the
 *   output of the source layer.
 */
org.nfrac.comportex.layer.tools.source_of_apical_bit = (function org$nfrac$comportex$layer$tools$source_of_apical_bit(htm,lyr_id,i){
return org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,i,cljs.core.cst$kw$fb_DASH_deps);
});
org.nfrac.comportex.layer.tools.zap_fewer = (function org$nfrac$comportex$layer$tools$zap_fewer(n,xs){
if((cljs.core.count(xs) < n)){
return cljs.core.empty(xs);
} else {
return xs;
}
});
/**
 * Calculates the various sources contributing to total excitation
 *   level of each of the `cell-ids` in the given layer. Returns a map
 *   keyed by these cell ids. Each cell value is a map with keys
 * 
 *   * :total - number.
 *   * :proximal-unstable - a map keyed by source layer/sense id.
 *   * :proximal-stable - a map keyed by source layer/sense id.
 *   * :distal - a map keyed by source layer/sense id.
 *   * :boost - number.
 *   
 */
org.nfrac.comportex.layer.tools.cell_excitation_breakdowns = (function org$nfrac$comportex$layer$tools$cell_excitation_breakdowns(htm,prior_htm,lyr_id,cell_ids){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var prior_lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prior_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr);
var ff_stim_thresh = cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(params));
var d_stim_thresh = cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(params));
var a_stim_thresh = cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$apical.cljs$core$IFn$_invoke$arity$1(params));
var distal_weight = cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight.cljs$core$IFn$_invoke$arity$1(params);
var active_state = cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr);
var prior_active_state = cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(prior_lyr);
var distal_state = cljs.core.cst$kw$distal_DASH_state.cljs$core$IFn$_invoke$arity$1(prior_lyr);
var apical_state = cljs.core.cst$kw$apical_DASH_state.cljs$core$IFn$_invoke$arity$1(prior_lyr);
var ff_bits = cljs.core.set(cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$in_DASH_ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(active_state)));
var ff_s_bits = cljs.core.set(cljs.core.cst$kw$org$nfrac$comportex$layer_SLASH_stable_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$in_DASH_ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(active_state)));
var ff_b_bits = clojure.set.difference.cljs$core$IFn$_invoke$arity$2(ff_bits,ff_s_bits);
var distal_bits = cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(distal_state);
var apical_bits = cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(apical_state);
var ff_bits_srcs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits){
return (function (i){
var vec__64227 = org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,i,cljs.core.cst$kw$ff_DASH_bits);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64227,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64227,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,k], null);
});})(lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits))
),ff_bits);
var distal_bits_srcs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs){
return (function (i){
var vec__64230 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64230,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64230,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,k], null);
});})(lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs))
),distal_bits);
var apical_bits_srcs = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs){
return (function (i){
var vec__64233 = org.nfrac.comportex.layer.tools.source_of_apical_bit(htm,lyr_id,i);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64233,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64233,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,k], null);
});})(lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs))
),apical_bits);
var psg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(prior_lyr);
var dsg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(prior_lyr);
var asg = cljs.core.cst$kw$apical_DASH_sg.cljs$core$IFn$_invoke$arity$1(prior_lyr);
var boosts = cljs.core.cst$kw$boosts.cljs$core$IFn$_invoke$arity$1(prior_lyr);
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs,apical_bits_srcs,psg,dsg,asg,boosts){
return (function (cell_id){
var vec__64236 = cell_id;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64236,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64236,(1),null);
var vec__64239 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fully_DASH_matching_DASH_ff_DASH_segs.cljs$core$IFn$_invoke$arity$1(active_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null));
var ff_seg_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64239,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64239,(1),null);
var ff_conn_sources = (cljs.core.truth_(ff_seg_path)?org.nfrac.comportex.synapses.sources_connected_to(psg,ff_seg_path):null);
var active_ff_b = org.nfrac.comportex.layer.tools.zap_fewer(ff_stim_thresh,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(ff_b_bits,ff_conn_sources));
var active_ff_s = org.nfrac.comportex.layer.tools.zap_fewer(ff_stim_thresh,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(ff_s_bits,ff_conn_sources));
var ff_b_by_src = cljs.core.frequencies(cljs.core.map.cljs$core$IFn$_invoke$arity$2(ff_bits_srcs,active_ff_b));
var ff_s_by_src = cljs.core.frequencies(cljs.core.map.cljs$core$IFn$_invoke$arity$2(ff_bits_srcs,active_ff_s));
var vec__64242 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fully_DASH_matching_DASH_segs.cljs$core$IFn$_invoke$arity$1(distal_state),cell_id);
var d_seg_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64242,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64242,(1),null);
var d_conn_sources = (cljs.core.truth_(d_seg_path)?org.nfrac.comportex.synapses.sources_connected_to(dsg,d_seg_path):null);
var active_d = org.nfrac.comportex.layer.tools.zap_fewer(d_stim_thresh,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(distal_bits,d_conn_sources));
var d_by_src = org.nfrac.comportex.util.remap(((function (vec__64236,col,ci,vec__64239,ff_seg_path,_,ff_conn_sources,active_ff_b,active_ff_s,ff_b_by_src,ff_s_by_src,vec__64242,d_seg_path,___$1,d_conn_sources,active_d,lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs,apical_bits_srcs,psg,dsg,asg,boosts){
return (function (p1__64204_SHARP_){
return (p1__64204_SHARP_ * distal_weight);
});})(vec__64236,col,ci,vec__64239,ff_seg_path,_,ff_conn_sources,active_ff_b,active_ff_s,ff_b_by_src,ff_s_by_src,vec__64242,d_seg_path,___$1,d_conn_sources,active_d,lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs,apical_bits_srcs,psg,dsg,asg,boosts))
,cljs.core.frequencies(cljs.core.map.cljs$core$IFn$_invoke$arity$2(distal_bits_srcs,active_d)));
var vec__64245 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$fully_DASH_matching_DASH_segs.cljs$core$IFn$_invoke$arity$1(apical_state),cell_id);
var a_seg_path = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64245,(0),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__64245,(1),null);
var a_conn_sources = (cljs.core.truth_(a_seg_path)?org.nfrac.comportex.synapses.sources_connected_to(asg,a_seg_path):null);
var active_a = org.nfrac.comportex.layer.tools.zap_fewer(a_stim_thresh,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(apical_bits,a_conn_sources));
var a_by_src = org.nfrac.comportex.util.remap(((function (vec__64236,col,ci,vec__64239,ff_seg_path,_,ff_conn_sources,active_ff_b,active_ff_s,ff_b_by_src,ff_s_by_src,vec__64242,d_seg_path,___$1,d_conn_sources,active_d,d_by_src,vec__64245,a_seg_path,___$2,a_conn_sources,active_a,lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs,apical_bits_srcs,psg,dsg,asg,boosts){
return (function (p1__64205_SHARP_){
return (p1__64205_SHARP_ * distal_weight);
});})(vec__64236,col,ci,vec__64239,ff_seg_path,_,ff_conn_sources,active_ff_b,active_ff_s,ff_b_by_src,ff_s_by_src,vec__64242,d_seg_path,___$1,d_conn_sources,active_d,d_by_src,vec__64245,a_seg_path,___$2,a_conn_sources,active_a,lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs,apical_bits_srcs,psg,dsg,asg,boosts))
,cljs.core.frequencies(cljs.core.map.cljs$core$IFn$_invoke$arity$2(apical_bits_srcs,active_a)));
var b_overlap = cljs.core.count(active_ff_b);
var s_overlap = cljs.core.count(active_ff_s);
var d_a_exc = (distal_weight * (cljs.core.count(active_d) + cljs.core.count(active_a)));
var overlap = (b_overlap + s_overlap);
var boost_amt = (overlap * (cljs.core.get.cljs$core$IFn$_invoke$arity$2(boosts,col) - 1.0));
var total = (((b_overlap + s_overlap) + boost_amt) + d_a_exc);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cell_id,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$total,total,cljs.core.cst$kw$proximal_DASH_unstable,ff_b_by_src,cljs.core.cst$kw$proximal_DASH_stable,ff_s_by_src,cljs.core.cst$kw$boost,boost_amt,cljs.core.cst$kw$distal,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([d_by_src,a_by_src], 0))], null)], null);
});})(lyr,prior_lyr,params,ff_stim_thresh,d_stim_thresh,a_stim_thresh,distal_weight,active_state,prior_active_state,distal_state,apical_state,ff_bits,ff_s_bits,ff_b_bits,distal_bits,apical_bits,ff_bits_srcs,distal_bits_srcs,apical_bits_srcs,psg,dsg,asg,boosts))
),cell_ids);
});
/**
 * Takes an excitation breakdown such as returned under one key from
 *   cell-excitation-breakdowns, and updates each numeric component with
 *   the function f. Key :total will be updated accordingly. The default
 *   is to scale the values to a total of 1.0. To aggregate breakdowns,
 *   use `(util/deep-merge-with +)`.
 */
org.nfrac.comportex.layer.tools.update_excitation_breakdown = (function org$nfrac$comportex$layer$tools$update_excitation_breakdown(var_args){
var args64249 = [];
var len__10461__auto___64252 = arguments.length;
var i__10462__auto___64253 = (0);
while(true){
if((i__10462__auto___64253 < len__10461__auto___64252)){
args64249.push((arguments[i__10462__auto___64253]));

var G__64254 = (i__10462__auto___64253 + (1));
i__10462__auto___64253 = G__64254;
continue;
} else {
}
break;
}

var G__64251 = args64249.length;
switch (G__64251) {
case 1:
return org.nfrac.comportex.layer.tools.update_excitation_breakdown.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.layer.tools.update_excitation_breakdown.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args64249.length)].join('')));

}
});

org.nfrac.comportex.layer.tools.update_excitation_breakdown.cljs$core$IFn$_invoke$arity$1 = (function (breakdown){
var total = cljs.core.cst$kw$total.cljs$core$IFn$_invoke$arity$1(breakdown);
return org.nfrac.comportex.layer.tools.update_excitation_breakdown.cljs$core$IFn$_invoke$arity$2(breakdown,((function (total){
return (function (p1__64248_SHARP_){
return (p1__64248_SHARP_ / total);
});})(total))
);
});

org.nfrac.comportex.layer.tools.update_excitation_breakdown.cljs$core$IFn$_invoke$arity$2 = (function (breakdown,f){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,k,v){
var new_v = ((cljs.core.map_QMARK_(v))?org.nfrac.comportex.util.remap(f,v):(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null,v)));
var v_total = ((cljs.core.map_QMARK_(v))?cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(new_v)):new_v);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$variadic(m,k,new_v,cljs.core.array_seq([cljs.core.cst$kw$total,(cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,cljs.core.cst$kw$total) + v_total)], 0));
}),cljs.core.transient$(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$total,0.0], null)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(breakdown,cljs.core.cst$kw$total)));
});

org.nfrac.comportex.layer.tools.update_excitation_breakdown.cljs$lang$maxFixedArity = 2;

