// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.inhibition');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.topography');
goog.require('org.nfrac.comportex.util');
org.nfrac.comportex.inhibition.numeric_span = (function org$nfrac$comportex$inhibition$numeric_span(xs){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,xs) - cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,xs));
});
/**
 * Returns the span over the input bit array to which this column has
 * connected synapses. Takes the maximum span in any one dimension.
 */
org.nfrac.comportex.inhibition.column_receptive_field_size = (function org$nfrac$comportex$inhibition$column_receptive_field_size(sg,itopo,col){
var ids = org.nfrac.comportex.synapses.sources_connected_to(sg,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null));
var coords = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.topography.coordinates_of_index,itopo),ids);
if(cljs.core.seq(coords)){
if(typeof cljs.core.first(coords) === 'number'){
return org.nfrac.comportex.inhibition.numeric_span(coords);
} else {
var m = cljs.core.count(org.nfrac.comportex.topography.dimensions(itopo));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,(function (){var iter__10132__auto__ = ((function (m,ids,coords){
return (function org$nfrac$comportex$inhibition$column_receptive_field_size_$_iter__63597(s__63598){
return (new cljs.core.LazySeq(null,((function (m,ids,coords){
return (function (){
var s__63598__$1 = s__63598;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__63598__$1);
if(temp__6728__auto__){
var s__63598__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__63598__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__63598__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__63600 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__63599 = (0);
while(true){
if((i__63599 < size__10131__auto__)){
var j = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__63599);
cljs.core.chunk_append(b__63600,org.nfrac.comportex.inhibition.numeric_span(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__63599,j,c__10130__auto__,size__10131__auto__,b__63600,s__63598__$2,temp__6728__auto__,m,ids,coords){
return (function (p1__63590_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p1__63590_SHARP_,j);
});})(i__63599,j,c__10130__auto__,size__10131__auto__,b__63600,s__63598__$2,temp__6728__auto__,m,ids,coords))
,coords)));

var G__63603 = (i__63599 + (1));
i__63599 = G__63603;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__63600),org$nfrac$comportex$inhibition$column_receptive_field_size_$_iter__63597(cljs.core.chunk_rest(s__63598__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__63600),null);
}
} else {
var j = cljs.core.first(s__63598__$2);
return cljs.core.cons(org.nfrac.comportex.inhibition.numeric_span(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (j,s__63598__$2,temp__6728__auto__,m,ids,coords){
return (function (p1__63590_SHARP_){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(p1__63590_SHARP_,j);
});})(j,s__63598__$2,temp__6728__auto__,m,ids,coords))
,coords)),org$nfrac$comportex$inhibition$column_receptive_field_size_$_iter__63597(cljs.core.rest(s__63598__$2)));
}
} else {
return null;
}
break;
}
});})(m,ids,coords))
,null,null));
});})(m,ids,coords))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(m));
})());
}
} else {
return (0);
}
});
org.nfrac.comportex.inhibition.avg_receptive_field_size = (function org$nfrac$comportex$inhibition$avg_receptive_field_size(sg,topo,itopo){
return org.nfrac.comportex.util.mean(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.inhibition.column_receptive_field_size,sg,itopo),cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.topography.size(topo))));
});
/**
 * The radius in column space defining neighbouring columns, based on
 * the average receptive field size.
 * 
 * * `sg` is the synapse graph linking the inputs to targets.
 * 
 * * `topo` is the topography of the targets (e.g. columns).
 * 
 * * `itopo` is the topography of the inputs.
 */
org.nfrac.comportex.inhibition.inhibition_radius = (function org$nfrac$comportex$inhibition$inhibition_radius(sg,topo,itopo){
var shared_frac = 0.0;
var max_dim = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.topography.dimensions(topo));
var max_idim = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.topography.dimensions(itopo));
var arfs = org.nfrac.comportex.inhibition.avg_receptive_field_size(sg,topo,itopo);
var cols_diameter = (max_dim * (arfs / max_idim));
var cols_radius = cljs.core.quot(cols_diameter,(2));
var x__9611__auto__ = org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((cols_radius * (1.0 - shared_frac)));
var y__9612__auto__ = (1);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
});
/**
 * Returns the set of column ids which should become active given the
 * map of column excitations `exc`, and the target activation rate
 * `level`. Global inhibition is applied, i.e. the top N columns by
 * excitation are selected.
 */
org.nfrac.comportex.inhibition.inhibit_globally = (function org$nfrac$comportex$inhibition$inhibit_globally(exc,n_on){
return org.nfrac.comportex.util.top_n_keys_by_value(n_on,exc);
});
/**
 * Threshold excitation level at which a cell with excitation `x`
 * inhibits a neighbour cell at a distance `dist` columns away.
 */
org.nfrac.comportex.inhibition.inhibits_exc = (function org$nfrac$comportex$inhibition$inhibits_exc(x,dist,max_dist,base_dist){
var z = (1.0 - ((function (){var x__9611__auto__ = 0.0;
var y__9612__auto__ = (dist - base_dist);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})() / (function (){var x__9611__auto__ = 1.0;
var y__9612__auto__ = (max_dist - base_dist);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})()));
return (x * z);
});
org.nfrac.comportex.inhibition.map__GT_vec = (function org$nfrac$comportex$inhibition$map__GT_vec(n,m){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(m,cljs.core.range.cljs$core$IFn$_invoke$arity$1(n));
});
org.nfrac.comportex.inhibition.vec__GT_map = (function org$nfrac$comportex$inhibition$vec__GT_map(v){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,i,x){
if(cljs.core.truth_(x)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,i,x);
} else {
return m;
}
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),v));
});
org.nfrac.comportex.inhibition.mask_out_inhibited_by_col = (function org$nfrac$comportex$inhibition$mask_out_inhibited_by_col(emask,col,x,topo,inh_radius,inh_base_dist){
var coord = org.nfrac.comportex.topography.coordinates_of_index(topo,col);
var x__$1 = x;
var inh_radius__$1 = inh_radius;
var inh_base_dist__$1 = inh_base_dist;
var nbs = org.nfrac.comportex.topography.neighbours.cljs$core$IFn$_invoke$arity$4(topo,coord,(inh_radius__$1 | (0)),(0));
var emask__$1 = emask;
while(true){
var temp__6726__auto__ = cljs.core.first(nbs);
if(cljs.core.truth_(temp__6726__auto__)){
var nb_coord = temp__6726__auto__;
var nb_col = org.nfrac.comportex.topography.index_of_coordinates(topo,nb_coord);
var temp__6726__auto____$1 = (emask__$1.cljs$core$IFn$_invoke$arity$1 ? emask__$1.cljs$core$IFn$_invoke$arity$1(nb_col) : emask__$1.call(null,nb_col));
if(cljs.core.truth_(temp__6726__auto____$1)){
var nb_x = temp__6726__auto____$1;
var dist = org.nfrac.comportex.topography.coord_distance(topo,coord,nb_coord);
if((nb_x <= org.nfrac.comportex.inhibition.inhibits_exc(x__$1,dist,inh_radius__$1,inh_base_dist__$1))){
var G__63604 = cljs.core.next(nbs);
var G__63605 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(emask__$1,nb_col,null);
nbs = G__63604;
emask__$1 = G__63605;
continue;
} else {
var G__63606 = cljs.core.next(nbs);
var G__63607 = emask__$1;
nbs = G__63606;
emask__$1 = G__63607;
continue;
}
} else {
var G__63608 = cljs.core.next(nbs);
var G__63609 = emask__$1;
nbs = G__63608;
emask__$1 = G__63609;
continue;
}
} else {
return emask__$1;
}
break;
}
});
/**
 * Returns the set of column ids which should become active given the
 * map of column excitations `exc` and the column topography. Applies
 * local inhibition to remove any columns dominated by their
 * neighbours.
 */
org.nfrac.comportex.inhibition.inhibit_locally = (function org$nfrac$comportex$inhibition$inhibit_locally(exc,topo,inh_radius,inh_base_dist,n_on){
var sel_cols = cljs.core.List.EMPTY;
var more_cols = cljs.core.keys(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3(cljs.core.val,cljs.core._GT_,exc));
var emask = cljs.core.transient$(org.nfrac.comportex.inhibition.map__GT_vec(org.nfrac.comportex.topography.size(topo),exc));
while(true){
if((cljs.core.count(sel_cols) < n_on)){
var temp__6726__auto__ = cljs.core.first(more_cols);
if(cljs.core.truth_(temp__6726__auto__)){
var col = temp__6726__auto__;
var temp__6726__auto____$1 = (emask.cljs$core$IFn$_invoke$arity$1 ? emask.cljs$core$IFn$_invoke$arity$1(col) : emask.call(null,col));
if(cljs.core.truth_(temp__6726__auto____$1)){
var x = temp__6726__auto____$1;
var G__63610 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sel_cols,col);
var G__63611 = cljs.core.next(more_cols);
var G__63612 = org.nfrac.comportex.inhibition.mask_out_inhibited_by_col(emask,col,x,topo,inh_radius,inh_base_dist);
sel_cols = G__63610;
more_cols = G__63611;
emask = G__63612;
continue;
} else {
var G__63613 = sel_cols;
var G__63614 = cljs.core.next(more_cols);
var G__63615 = emask;
sel_cols = G__63613;
more_cols = G__63614;
emask = G__63615;
continue;
}
} else {
return sel_cols;
}
} else {
return sel_cols;
}
break;
}
});
