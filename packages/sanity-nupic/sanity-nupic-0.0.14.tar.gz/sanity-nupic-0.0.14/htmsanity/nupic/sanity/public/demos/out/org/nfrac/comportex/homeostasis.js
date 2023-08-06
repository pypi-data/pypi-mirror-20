// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.homeostasis');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.topography');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.util');
goog.require('clojure.test.check.random');
/**
 * Given a map `exc` of the column overlap counts, multiplies the
 *   excitation value by the corresponding column boosting factor.
 */
org.nfrac.comportex.homeostasis.apply_overlap_boosting = (function org$nfrac$comportex$homeostasis$apply_overlap_boosting(exc,boosts){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,id,x){
var vec__63630 = id;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63630,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63630,(1),null);
var b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(boosts,col);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,(x * b));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),exc));
});
/**
 * y is the duty cycle value.
 */
org.nfrac.comportex.homeostasis.boost_factor = (function org$nfrac$comportex$homeostasis$boost_factor(y,neighbour_max,crit_ratio,max_boost){
if((neighbour_max === (0))){
return max_boost;
} else {
var crit_y = (neighbour_max * crit_ratio);
var maxb = max_boost;
var x__9611__auto__ = (maxb - ((maxb - (1)) * (y / crit_y)));
var y__9612__auto__ = 1.0;
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
}
});
org.nfrac.comportex.homeostasis.boost_factors_global = (function org$nfrac$comportex$homeostasis$boost_factors_global(ys,params){
var crit_ratio = cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(params);
var max_boost = cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(params);
var max_y = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),ys);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (crit_ratio,max_boost,max_y){
return (function (y){
return org.nfrac.comportex.homeostasis.boost_factor(y,max_y,crit_ratio,max_boost);
});})(crit_ratio,max_boost,max_y))
,ys);
});
org.nfrac.comportex.homeostasis.boost_factors_local = (function org$nfrac$comportex$homeostasis$boost_factors_local(ys,topo,inh_radius,params){
var crit_ratio = cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(params);
var max_boost = cljs.core.cst$kw$max_DASH_boost.cljs$core$IFn$_invoke$arity$1(params);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(((function (crit_ratio,max_boost){
return (function (col,y){
var nb_is = org.nfrac.comportex.topography.neighbours_indices.cljs$core$IFn$_invoke$arity$4(topo,col,inh_radius,(0));
var max_y = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$2(ys,nb_is));
return org.nfrac.comportex.homeostasis.boost_factor(y,max_y,crit_ratio,max_boost);
});})(crit_ratio,max_boost))
,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),ys);
});
/**
 * Recalculates boost factors for each column based on its frequency
 * of activation (active duty cycle) compared to the maximum from its
 * neighbours.
 */
org.nfrac.comportex.homeostasis.boost_active = (function org$nfrac$comportex$homeostasis$boost_active(lyr){
if(!((cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr)) > (0)))){
return lyr;
} else {
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr);
var global_QMARK_ = (cljs.core.cst$kw$ff_DASH_potential_DASH_radius.cljs$core$IFn$_invoke$arity$1(params) >= (1));
var col_topo = org.nfrac.comportex.topography.make_topography(cljs.core.cst$kw$column_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(params));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(lyr,cljs.core.cst$kw$boosts,((global_QMARK_)?org.nfrac.comportex.homeostasis.boost_factors_global(cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr)):org.nfrac.comportex.homeostasis.boost_factors_local(cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr),col_topo,cljs.core.cst$kw$inh_DASH_radius.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr))));
}
});
org.nfrac.comportex.homeostasis.adjust_overlap_global = (function org$nfrac$comportex$homeostasis$adjust_overlap_global(sg,ys,params){
var crit_ratio = cljs.core.cst$kw$adjust_DASH_overlap_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(params);
var max_y = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),ys);
var crit_y = (max_y * crit_ratio);
var upds = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (crit_ratio,max_y,crit_y){
return (function (p__63637){
var vec__63638 = p__63637;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63638,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63638,(1),null);
if((y <= crit_y)){
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null),cljs.core.cst$kw$reinforce,null,null);
} else {
return null;
}
});})(crit_ratio,max_y,crit_y))
,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),ys));
var pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(params));
return org.nfrac.comportex.synapses.bulk_learn(sg,upds,cljs.core.constantly(true),(0.1 * pcon),0.0,0.0);
});
org.nfrac.comportex.homeostasis.adjust_overlap_local = (function org$nfrac$comportex$homeostasis$adjust_overlap_local(sg,ys,topo,inh_radius,params){
return org.nfrac.comportex.homeostasis.adjust_overlap_global(sg,ys,params);
});
org.nfrac.comportex.homeostasis.adjust_overlap = (function org$nfrac$comportex$homeostasis$adjust_overlap(lyr){
if(!((cljs.core.cst$kw$adjust_DASH_overlap_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr)) > (0)))){
return lyr;
} else {
var params = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr);
var global_QMARK_ = (cljs.core.cst$kw$ff_DASH_potential_DASH_radius.cljs$core$IFn$_invoke$arity$1(params) >= (1));
var col_topo = org.nfrac.comportex.topography.make_topography(cljs.core.cst$kw$column_DASH_dimensions.cljs$core$IFn$_invoke$arity$1(params));
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(lyr,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$proximal_DASH_sg], null),((function (params,global_QMARK_,col_topo){
return (function (sg){
if(global_QMARK_){
return org.nfrac.comportex.homeostasis.adjust_overlap_global(sg,cljs.core.cst$kw$overlap_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr));
} else {
return org.nfrac.comportex.homeostasis.adjust_overlap_local(sg,cljs.core.cst$kw$overlap_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr),col_topo,cljs.core.cst$kw$inh_DASH_radius.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr));
}
});})(params,global_QMARK_,col_topo))
);
}
});
org.nfrac.comportex.homeostasis.float_overlap_global = (function org$nfrac$comportex$homeostasis$float_overlap_global(sg,ys,params){
var ref_y = cljs.core.cst$kw$activation_DASH_level.cljs$core$IFn$_invoke$arity$1(params);
var lo_z = cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(params);
var hi_z = cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio_DASH_hi.cljs$core$IFn$_invoke$arity$1(params);
var weaks = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (ref_y,lo_z,hi_z){
return (function (p__63649){
var vec__63650 = p__63649;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63650,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63650,(1),null);
var z = (y / ref_y);
if((z < lo_z)){
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null),cljs.core.cst$kw$reinforce,null,null);
} else {
return null;
}
});})(ref_y,lo_z,hi_z))
,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),ys));
var strongs = cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (ref_y,lo_z,hi_z,weaks){
return (function (p__63653){
var vec__63654 = p__63653;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63654,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63654,(1),null);
var z = (y / ref_y);
if((z > hi_z)){
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null),cljs.core.cst$kw$punish,null,null);
} else {
return null;
}
});})(ref_y,lo_z,hi_z,weaks))
,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),ys));
var pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(params));
return org.nfrac.comportex.synapses.bulk_learn(sg,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(weaks,strongs),cljs.core.constantly(true),(0.1 * pcon),(0.1 * pcon),0.0);
});
org.nfrac.comportex.homeostasis.layer_float_overlap = (function org$nfrac$comportex$homeostasis$layer_float_overlap(lyr){
if(!((cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr)) > (0)))){
return lyr;
} else {
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(lyr,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$proximal_DASH_sg], null),(function (sg){
return org.nfrac.comportex.homeostasis.float_overlap_global(sg,cljs.core.cst$kw$active_DASH_duty_DASH_cycles.cljs$core$IFn$_invoke$arity$1(lyr),cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(lyr));
}));
}
});
/**
 * Records a set of events with indices `is` in the vector `v`
 * according to duty cycle period `period`. As in NuPIC, the formula
 * is
 * 
 * <pre>
 * y[t] = (period-1) * y[t-1]  +  1
 *     --------------------------
 *       period
 * </pre>
 */
org.nfrac.comportex.homeostasis.update_duty_cycles = (function org$nfrac$comportex$homeostasis$update_duty_cycles(v,is,period){
var d = (1.0 / period);
var decay = (d * (period - (1)));
return org.nfrac.comportex.util.update_each(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (d,decay){
return (function (p1__63657_SHARP_){
return (p1__63657_SHARP_ * decay);
});})(d,decay))
,v),is,((function (d,decay){
return (function (p1__63658_SHARP_){
return (p1__63658_SHARP_ + d);
});})(d,decay))
);
});
