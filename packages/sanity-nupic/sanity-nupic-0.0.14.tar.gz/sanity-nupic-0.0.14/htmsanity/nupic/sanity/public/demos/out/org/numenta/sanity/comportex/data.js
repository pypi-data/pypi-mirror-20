// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.data');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.layer.tools');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.layer');
org.numenta.sanity.comportex.data.all_cell_segments = (function org$numenta$sanity$comportex$data$all_cell_segments(sg,cell_id){
return cljs.core.reverse(cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(cljs.core.empty_QMARK_,cljs.core.reverse(org.nfrac.comportex.synapses.cell_segments(sg,cell_id))));
});
org.numenta.sanity.comportex.data.group_synapses = (function org$numenta$sanity$comportex$data$group_synapses(syns,ac,pcon){
return cljs.core.group_by((function (p__71655){
var vec__71656 = p__71655;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71656,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71656,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(((p >= pcon))?cljs.core.cst$kw$connected:cljs.core.cst$kw$disconnected),(cljs.core.truth_((ac.cljs$core$IFn$_invoke$arity$1 ? ac.cljs$core$IFn$_invoke$arity$1(id) : ac.call(null,id)))?cljs.core.cst$kw$active:cljs.core.cst$kw$inactive)], null);
}),syns);
});
org.numenta.sanity.comportex.data.count_segs_in_column = (function org$numenta$sanity$comportex$data$count_segs_in_column(distal_sg,depth,col){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (n,ci){
return (n + org.nfrac.comportex.util.count_filter(cljs.core.seq,org.nfrac.comportex.synapses.cell_segments(distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null))));
}),(0),cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth));
});
org.numenta.sanity.comportex.data.syns_from_source_bit = (function org$numenta$sanity$comportex$data$syns_from_source_bit(htm,sense_id,bit,syn_states){
var active_bit_QMARK_ = cljs.core.boolean$(cljs.core.some(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._EQ_,bit),cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null)))));
var map__71696 = org.nfrac.comportex.core.add_feedback_deps(htm);
var map__71696__$1 = ((((!((map__71696 == null)))?((((map__71696.cljs$lang$protocol_mask$partition0$ & (64))) || (map__71696.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__71696):map__71696);
var fb_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71696__$1,cljs.core.cst$kw$fb_DASH_deps);
var iter__10132__auto__ = ((function (active_bit_QMARK_,map__71696,map__71696__$1,fb_deps){
return (function org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__71698(s__71699){
return (new cljs.core.LazySeq(null,((function (active_bit_QMARK_,map__71696,map__71696__$1,fb_deps){
return (function (){
var s__71699__$1 = s__71699;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__71699__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var lyr_id = cljs.core.first(xs__7284__auto__);
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var sg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr);
var adjusted_bit = (org.nfrac.comportex.core.ff_base(htm,lyr_id,sense_id) + bit);
var to_segs = org.nfrac.comportex.synapses.targets_connected_from(sg,adjusted_bit);
var predictive_columns = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.cst$kw$prior_DASH_predictive_DASH_cells.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(lyr))));
var iterys__10128__auto__ = ((function (s__71699__$1,lyr,sg,adjusted_bit,to_segs,predictive_columns,lyr_id,xs__7284__auto__,temp__6728__auto__,active_bit_QMARK_,map__71696,map__71696__$1,fb_deps){
return (function org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__71698_$_iter__71700(s__71701){
return (new cljs.core.LazySeq(null,((function (s__71699__$1,lyr,sg,adjusted_bit,to_segs,predictive_columns,lyr_id,xs__7284__auto__,temp__6728__auto__,active_bit_QMARK_,map__71696,map__71696__$1,fb_deps){
return (function (){
var s__71701__$1 = s__71701;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__71701__$1);
if(temp__6728__auto____$1){
var s__71701__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__71701__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__71701__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__71703 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__71702 = (0);
while(true){
if((i__71702 < size__10131__auto__)){
var vec__71727 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__71702);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71727,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71727,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71727,(2),null);
var seg_path = vec__71727;
var predictive_col_QMARK_ = cljs.core.contains_QMARK_(predictive_columns,col);
if((cljs.core.contains_QMARK_(syn_states,"inactive")) || ((cljs.core.contains_QMARK_(syn_states,"predicted")) && (predictive_col_QMARK_)) || (active_bit_QMARK_)){
var perm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.synapses.in_synapses(sg,seg_path),adjusted_bit);
cljs.core.chunk_append(b__71703,new cljs.core.PersistentArrayMap(null, 5, ["target-lyr",lyr_id,"target-col",col,"target-dt",(0),"syn-state",((active_bit_QMARK_)?((predictive_col_QMARK_)?"active-predicted":"active"):((predictive_col_QMARK_)?"predicted":"inactive")),"perm",perm], null));

var G__71733 = (i__71702 + (1));
i__71702 = G__71733;
continue;
} else {
var G__71734 = (i__71702 + (1));
i__71702 = G__71734;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71703),org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__71698_$_iter__71700(cljs.core.chunk_rest(s__71701__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71703),null);
}
} else {
var vec__71730 = cljs.core.first(s__71701__$2);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71730,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71730,(1),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71730,(2),null);
var seg_path = vec__71730;
var predictive_col_QMARK_ = cljs.core.contains_QMARK_(predictive_columns,col);
if((cljs.core.contains_QMARK_(syn_states,"inactive")) || ((cljs.core.contains_QMARK_(syn_states,"predicted")) && (predictive_col_QMARK_)) || (active_bit_QMARK_)){
var perm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.synapses.in_synapses(sg,seg_path),adjusted_bit);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 5, ["target-lyr",lyr_id,"target-col",col,"target-dt",(0),"syn-state",((active_bit_QMARK_)?((predictive_col_QMARK_)?"active-predicted":"active"):((predictive_col_QMARK_)?"predicted":"inactive")),"perm",perm], null),org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__71698_$_iter__71700(cljs.core.rest(s__71701__$2)));
} else {
var G__71735 = cljs.core.rest(s__71701__$2);
s__71701__$1 = G__71735;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__71699__$1,lyr,sg,adjusted_bit,to_segs,predictive_columns,lyr_id,xs__7284__auto__,temp__6728__auto__,active_bit_QMARK_,map__71696,map__71696__$1,fb_deps))
,null,null));
});})(s__71699__$1,lyr,sg,adjusted_bit,to_segs,predictive_columns,lyr_id,xs__7284__auto__,temp__6728__auto__,active_bit_QMARK_,map__71696,map__71696__$1,fb_deps))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(to_segs));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$numenta$sanity$comportex$data$syns_from_source_bit_$_iter__71698(cljs.core.rest(s__71699__$1)));
} else {
var G__71736 = cljs.core.rest(s__71699__$1);
s__71699__$1 = G__71736;
continue;
}
} else {
return null;
}
break;
}
});})(active_bit_QMARK_,map__71696,map__71696__$1,fb_deps))
,null,null));
});})(active_bit_QMARK_,map__71696,map__71696__$1,fb_deps))
;
return iter__10132__auto__(cljs.core.get.cljs$core$IFn$_invoke$arity$2(fb_deps,sense_id));
});
/**
 * Lazily convert a seg-selector into a tree of indices.
 * 
 *   Some example seg-selectors:
 *   [] ;; none
 *   [1 7] ;; all segments for columns 1, 7
 *   {1 [2]} ;; all segments for column 1, cell 2
 *   {1 {2 [3 4]}} ;; the third and fourth segments on column 1, cell 2
 */
org.numenta.sanity.comportex.data.expand_seg_selector = (function org$numenta$sanity$comportex$data$expand_seg_selector(seg_selector,layer_depth,sg,seg_type){
var specific_cells_QMARK_ = cljs.core.map_QMARK_(seg_selector);
var cols = ((specific_cells_QMARK_)?cljs.core.keys(seg_selector):seg_selector);
var iter__10132__auto__ = ((function (specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863(s__71864){
return (new cljs.core.LazySeq(null,((function (specific_cells_QMARK_,cols){
return (function (){
var s__71864__$1 = s__71864;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__71864__$1);
if(temp__6728__auto__){
var s__71864__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__71864__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__71864__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__71866 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__71865 = (0);
while(true){
if((i__71865 < size__10131__auto__)){
var col = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__71865);
var selector_within_col = ((specific_cells_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(seg_selector,col):null);
var specific_segs_QMARK_ = cljs.core.map_QMARK_(selector_within_col);
var cell_indices = ((specific_cells_QMARK_)?((specific_segs_QMARK_)?cljs.core.keys(selector_within_col):selector_within_col):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(seg_type,cljs.core.cst$kw$proximal))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null):cljs.core.range.cljs$core$IFn$_invoke$arity$1(layer_depth)));
cljs.core.chunk_append(b__71866,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(function (){var iter__10132__auto__ = ((function (i__71865,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929(s__71930){
return (new cljs.core.LazySeq(null,((function (i__71865,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function (){
var s__71930__$1 = s__71930;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__71930__$1);
if(temp__6728__auto____$1){
var s__71930__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__71930__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__71930__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__71932 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__71931 = (0);
while(true){
if((i__71931 < size__10131__auto____$1)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__71931);
var seg_indices = ((specific_segs_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(selector_within_col,ci):cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(org.numenta.sanity.comportex.data.all_cell_segments(sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)))));
cljs.core.chunk_append(b__71932,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,(function (){var iter__10132__auto__ = ((function (i__71931,i__71865,seg_indices,ci,c__10130__auto____$1,size__10131__auto____$1,b__71932,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929_$_iter__71947(s__71948){
return (new cljs.core.LazySeq(null,((function (i__71931,i__71865,seg_indices,ci,c__10130__auto____$1,size__10131__auto____$1,b__71932,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function (){
var s__71948__$1 = s__71948;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__71948__$1);
if(temp__6728__auto____$2){
var s__71948__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__71948__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__71948__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__71950 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__71949 = (0);
while(true){
if((i__71949 < size__10131__auto____$2)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__71949);
cljs.core.chunk_append(b__71950,si);

var G__71989 = (i__71949 + (1));
i__71949 = G__71989;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71950),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929_$_iter__71947(cljs.core.chunk_rest(s__71948__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71950),null);
}
} else {
var si = cljs.core.first(s__71948__$2);
return cljs.core.cons(si,org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929_$_iter__71947(cljs.core.rest(s__71948__$2)));
}
} else {
return null;
}
break;
}
});})(i__71931,i__71865,seg_indices,ci,c__10130__auto____$1,size__10131__auto____$1,b__71932,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
,null,null));
});})(i__71931,i__71865,seg_indices,ci,c__10130__auto____$1,size__10131__auto____$1,b__71932,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
;
return iter__10132__auto__(seg_indices);
})()], null));

var G__71990 = (i__71931 + (1));
i__71931 = G__71990;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71932),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929(cljs.core.chunk_rest(s__71930__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71932),null);
}
} else {
var ci = cljs.core.first(s__71930__$2);
var seg_indices = ((specific_segs_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(selector_within_col,ci):cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(org.numenta.sanity.comportex.data.all_cell_segments(sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)))));
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,(function (){var iter__10132__auto__ = ((function (i__71865,seg_indices,ci,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929_$_iter__71953(s__71954){
return (new cljs.core.LazySeq(null,((function (i__71865,seg_indices,ci,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function (){
var s__71954__$1 = s__71954;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__71954__$1);
if(temp__6728__auto____$2){
var s__71954__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__71954__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__71954__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__71956 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__71955 = (0);
while(true){
if((i__71955 < size__10131__auto____$1)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__71955);
cljs.core.chunk_append(b__71956,si);

var G__71991 = (i__71955 + (1));
i__71955 = G__71991;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71956),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929_$_iter__71953(cljs.core.chunk_rest(s__71954__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71956),null);
}
} else {
var si = cljs.core.first(s__71954__$2);
return cljs.core.cons(si,org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929_$_iter__71953(cljs.core.rest(s__71954__$2)));
}
} else {
return null;
}
break;
}
});})(i__71865,seg_indices,ci,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
,null,null));
});})(i__71865,seg_indices,ci,s__71930__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
;
return iter__10132__auto__(seg_indices);
})()], null),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71929(cljs.core.rest(s__71930__$2)));
}
} else {
return null;
}
break;
}
});})(i__71865,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
,null,null));
});})(i__71865,selector_within_col,specific_segs_QMARK_,cell_indices,col,c__10130__auto__,size__10131__auto__,b__71866,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
;
return iter__10132__auto__(cell_indices);
})()], null));

var G__71992 = (i__71865 + (1));
i__71865 = G__71992;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71866),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863(cljs.core.chunk_rest(s__71864__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71866),null);
}
} else {
var col = cljs.core.first(s__71864__$2);
var selector_within_col = ((specific_cells_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(seg_selector,col):null);
var specific_segs_QMARK_ = cljs.core.map_QMARK_(selector_within_col);
var cell_indices = ((specific_cells_QMARK_)?((specific_segs_QMARK_)?cljs.core.keys(selector_within_col):selector_within_col):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(seg_type,cljs.core.cst$kw$proximal))?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null):cljs.core.range.cljs$core$IFn$_invoke$arity$1(layer_depth)));
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(function (){var iter__10132__auto__ = ((function (selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959(s__71960){
return (new cljs.core.LazySeq(null,((function (selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function (){
var s__71960__$1 = s__71960;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__71960__$1);
if(temp__6728__auto____$1){
var s__71960__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__71960__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__71960__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__71962 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__71961 = (0);
while(true){
if((i__71961 < size__10131__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__71961);
var seg_indices = ((specific_segs_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(selector_within_col,ci):cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(org.numenta.sanity.comportex.data.all_cell_segments(sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)))));
cljs.core.chunk_append(b__71962,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,(function (){var iter__10132__auto__ = ((function (i__71961,seg_indices,ci,c__10130__auto__,size__10131__auto__,b__71962,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959_$_iter__71977(s__71978){
return (new cljs.core.LazySeq(null,((function (i__71961,seg_indices,ci,c__10130__auto__,size__10131__auto__,b__71962,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function (){
var s__71978__$1 = s__71978;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__71978__$1);
if(temp__6728__auto____$2){
var s__71978__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__71978__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__71978__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__71980 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__71979 = (0);
while(true){
if((i__71979 < size__10131__auto____$1)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__71979);
cljs.core.chunk_append(b__71980,si);

var G__71993 = (i__71979 + (1));
i__71979 = G__71993;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71980),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959_$_iter__71977(cljs.core.chunk_rest(s__71978__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71980),null);
}
} else {
var si = cljs.core.first(s__71978__$2);
return cljs.core.cons(si,org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959_$_iter__71977(cljs.core.rest(s__71978__$2)));
}
} else {
return null;
}
break;
}
});})(i__71961,seg_indices,ci,c__10130__auto__,size__10131__auto__,b__71962,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
,null,null));
});})(i__71961,seg_indices,ci,c__10130__auto__,size__10131__auto__,b__71962,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
;
return iter__10132__auto__(seg_indices);
})()], null));

var G__71994 = (i__71961 + (1));
i__71961 = G__71994;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71962),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959(cljs.core.chunk_rest(s__71960__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71962),null);
}
} else {
var ci = cljs.core.first(s__71960__$2);
var seg_indices = ((specific_segs_QMARK_)?cljs.core.get.cljs$core$IFn$_invoke$arity$2(selector_within_col,ci):cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(org.numenta.sanity.comportex.data.all_cell_segments(sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)))));
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,(function (){var iter__10132__auto__ = ((function (seg_indices,ci,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959_$_iter__71983(s__71984){
return (new cljs.core.LazySeq(null,((function (seg_indices,ci,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols){
return (function (){
var s__71984__$1 = s__71984;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__71984__$1);
if(temp__6728__auto____$2){
var s__71984__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__71984__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__71984__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__71986 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__71985 = (0);
while(true){
if((i__71985 < size__10131__auto__)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__71985);
cljs.core.chunk_append(b__71986,si);

var G__71995 = (i__71985 + (1));
i__71985 = G__71995;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__71986),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959_$_iter__71983(cljs.core.chunk_rest(s__71984__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__71986),null);
}
} else {
var si = cljs.core.first(s__71984__$2);
return cljs.core.cons(si,org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959_$_iter__71983(cljs.core.rest(s__71984__$2)));
}
} else {
return null;
}
break;
}
});})(seg_indices,ci,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
,null,null));
});})(seg_indices,ci,s__71960__$2,temp__6728__auto____$1,selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
;
return iter__10132__auto__(seg_indices);
})()], null),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863_$_iter__71959(cljs.core.rest(s__71960__$2)));
}
} else {
return null;
}
break;
}
});})(selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
,null,null));
});})(selector_within_col,specific_segs_QMARK_,cell_indices,col,s__71864__$2,temp__6728__auto__,specific_cells_QMARK_,cols))
;
return iter__10132__auto__(cell_indices);
})()], null),org$numenta$sanity$comportex$data$expand_seg_selector_$_iter__71863(cljs.core.rest(s__71864__$2)));
}
} else {
return null;
}
break;
}
});})(specific_cells_QMARK_,cols))
,null,null));
});})(specific_cells_QMARK_,cols))
;
return iter__10132__auto__(cols);
});
org.numenta.sanity.comportex.data.query_segs = (function org$numenta$sanity$comportex$data$query_segs(htm,prev_htm,lyr_id,seg_selector,seg_type){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var params = org.nfrac.comportex.core.params(lyr);
var dparams = cljs.core.get.cljs$core$IFn$_invoke$arity$2(params,seg_type);
var stimulus_th = cljs.core.cst$kw$stimulus_DASH_threshold.cljs$core$IFn$_invoke$arity$1(dparams);
var learning_th = cljs.core.cst$kw$learn_DASH_threshold.cljs$core$IFn$_invoke$arity$1(dparams);
var pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(dparams);
var on_bits = cljs.core.set((function (){var G__72504 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__72504) {
case "apical":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_apical_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "distal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "proximal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$active_DASH_state,cljs.core.cst$kw$in_DASH_ff_DASH_signal,cljs.core.cst$kw$bits], null));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})());
var learning = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learn_DASH_state,cljs.core.cst$kw$learning,seg_type], null));
var sg_key = (function (){var G__72505 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__72505) {
case "apical":
return cljs.core.cst$kw$apical_DASH_sg;

break;
case "distal":
return cljs.core.cst$kw$distal_DASH_sg;

break;
case "proximal":
return cljs.core.cst$kw$proximal_DASH_sg;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var sg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(lyr,sg_key);
var prev_sg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id,sg_key], null));
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(params);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506(s__72507){
return (new cljs.core.LazySeq(null,((function (lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72507__$1 = s__72507;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__72507__$1);
if(temp__6728__auto__){
var s__72507__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__72507__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__72507__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__72509 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__72508 = (0);
while(true){
if((i__72508 < size__10131__auto__)){
var vec__72762 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__72508);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72762,(0),null);
var cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72762,(1),null);
cljs.core.chunk_append(b__72509,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__72508,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765(s__72766){
return (new cljs.core.LazySeq(null,((function (i__72508,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72766__$1 = s__72766;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__72766__$1);
if(temp__6728__auto____$1){
var s__72766__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__72766__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__72766__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__72768 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__72767 = (0);
while(true){
if((i__72767 < size__10131__auto____$1)){
var vec__72829 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__72767);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72829,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72829,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var learn_seg_paths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id));
var learn_seg_indices = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (i__72767,i__72508,cell_id,learn_seg_paths,vec__72829,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__72768,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (p__72832){
var vec__72833 = p__72832;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72833,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72833,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72833,(2),null);
return si;
});})(i__72767,i__72508,cell_id,learn_seg_paths,vec__72829,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__72768,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
),learn_seg_paths);
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
cljs.core.chunk_append(b__72768,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__72767,i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72829,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__72768,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765_$_iter__72836(s__72837){
return (new cljs.core.LazySeq(null,((function (i__72767,i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72829,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__72768,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72837__$1 = s__72837;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__72837__$1);
if(temp__6728__auto____$2){
var s__72837__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__72837__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__72837__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__72839 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__72838 = (0);
while(true){
if((i__72838 < size__10131__auto____$2)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__72838);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__72850 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72850) : grouped_syns.call(null,G__72850));
})());
var conn_tot = (cljs.core.count((function (){var G__72851 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72851) : grouped_syns.call(null,G__72851));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__72852 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72852) : grouped_syns.call(null,G__72852));
})());
var disc_tot = (cljs.core.count((function (){var G__72853 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72853) : grouped_syns.call(null,G__72853));
})()) + disc_act);
cljs.core.chunk_append(b__72839,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null));

var G__73014 = (i__72838 + (1));
i__72838 = G__73014;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72839),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765_$_iter__72836(cljs.core.chunk_rest(s__72837__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72839),null);
}
} else {
var si = cljs.core.first(s__72837__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__72854 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72854) : grouped_syns.call(null,G__72854));
})());
var conn_tot = (cljs.core.count((function (){var G__72855 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72855) : grouped_syns.call(null,G__72855));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__72856 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72856) : grouped_syns.call(null,G__72856));
})());
var disc_tot = (cljs.core.count((function (){var G__72857 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72857) : grouped_syns.call(null,G__72857));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765_$_iter__72836(cljs.core.rest(s__72837__$2)));
}
} else {
return null;
}
break;
}
});})(i__72767,i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72829,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__72768,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(i__72767,i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72829,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__72768,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(seg_indices);
})())], null));

var G__73015 = (i__72767 + (1));
i__72767 = G__73015;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72768),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765(cljs.core.chunk_rest(s__72766__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72768),null);
}
} else {
var vec__72858 = cljs.core.first(s__72766__$2);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72858,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72858,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var learn_seg_paths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id));
var learn_seg_indices = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (i__72508,cell_id,learn_seg_paths,vec__72858,ci,seg_indices,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (p__72861){
var vec__72862 = p__72861;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72862,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72862,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72862,(2),null);
return si;
});})(i__72508,cell_id,learn_seg_paths,vec__72858,ci,seg_indices,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
),learn_seg_paths);
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72858,ci,seg_indices,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765_$_iter__72865(s__72866){
return (new cljs.core.LazySeq(null,((function (i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72858,ci,seg_indices,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72866__$1 = s__72866;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__72866__$1);
if(temp__6728__auto____$2){
var s__72866__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__72866__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__72866__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__72868 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__72867 = (0);
while(true){
if((i__72867 < size__10131__auto____$1)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__72867);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__72879 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72879) : grouped_syns.call(null,G__72879));
})());
var conn_tot = (cljs.core.count((function (){var G__72880 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72880) : grouped_syns.call(null,G__72880));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__72881 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72881) : grouped_syns.call(null,G__72881));
})());
var disc_tot = (cljs.core.count((function (){var G__72882 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72882) : grouped_syns.call(null,G__72882));
})()) + disc_act);
cljs.core.chunk_append(b__72868,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null));

var G__73016 = (i__72867 + (1));
i__72867 = G__73016;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72868),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765_$_iter__72865(cljs.core.chunk_rest(s__72866__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72868),null);
}
} else {
var si = cljs.core.first(s__72866__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__72883 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72883) : grouped_syns.call(null,G__72883));
})());
var conn_tot = (cljs.core.count((function (){var G__72884 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72884) : grouped_syns.call(null,G__72884));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__72885 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72885) : grouped_syns.call(null,G__72885));
})());
var disc_tot = (cljs.core.count((function (){var G__72886 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72886) : grouped_syns.call(null,G__72886));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765_$_iter__72865(cljs.core.rest(s__72866__$2)));
}
} else {
return null;
}
break;
}
});})(i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72858,ci,seg_indices,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(i__72508,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72858,ci,seg_indices,s__72766__$2,temp__6728__auto____$1,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(seg_indices);
})())], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72765(cljs.core.rest(s__72766__$2)));
}
} else {
return null;
}
break;
}
});})(i__72508,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(i__72508,vec__72762,col,cells,c__10130__auto__,size__10131__auto__,b__72509,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(cells);
})())], null));

var G__73017 = (i__72508 + (1));
i__72508 = G__73017;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72509),org$numenta$sanity$comportex$data$query_segs_$_iter__72506(cljs.core.chunk_rest(s__72507__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72509),null);
}
} else {
var vec__72887 = cljs.core.first(s__72507__$2);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72887,(0),null);
var cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72887,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890(s__72891){
return (new cljs.core.LazySeq(null,((function (vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72891__$1 = s__72891;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__72891__$1);
if(temp__6728__auto____$1){
var s__72891__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__72891__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__72891__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__72893 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__72892 = (0);
while(true){
if((i__72892 < size__10131__auto__)){
var vec__72954 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__72892);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72954,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72954,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var learn_seg_paths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id));
var learn_seg_indices = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (i__72892,cell_id,learn_seg_paths,vec__72954,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__72893,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (p__72957){
var vec__72958 = p__72957;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72958,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72958,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72958,(2),null);
return si;
});})(i__72892,cell_id,learn_seg_paths,vec__72954,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__72893,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
),learn_seg_paths);
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
cljs.core.chunk_append(b__72893,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__72892,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72954,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__72893,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890_$_iter__72961(s__72962){
return (new cljs.core.LazySeq(null,((function (i__72892,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72954,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__72893,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72962__$1 = s__72962;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__72962__$1);
if(temp__6728__auto____$2){
var s__72962__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__72962__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__72962__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__72964 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__72963 = (0);
while(true){
if((i__72963 < size__10131__auto____$1)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__72963);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__72975 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72975) : grouped_syns.call(null,G__72975));
})());
var conn_tot = (cljs.core.count((function (){var G__72976 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72976) : grouped_syns.call(null,G__72976));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__72977 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72977) : grouped_syns.call(null,G__72977));
})());
var disc_tot = (cljs.core.count((function (){var G__72978 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72978) : grouped_syns.call(null,G__72978));
})()) + disc_act);
cljs.core.chunk_append(b__72964,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null));

var G__73018 = (i__72963 + (1));
i__72963 = G__73018;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72964),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890_$_iter__72961(cljs.core.chunk_rest(s__72962__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72964),null);
}
} else {
var si = cljs.core.first(s__72962__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__72979 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72979) : grouped_syns.call(null,G__72979));
})());
var conn_tot = (cljs.core.count((function (){var G__72980 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72980) : grouped_syns.call(null,G__72980));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__72981 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72981) : grouped_syns.call(null,G__72981));
})());
var disc_tot = (cljs.core.count((function (){var G__72982 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__72982) : grouped_syns.call(null,G__72982));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890_$_iter__72961(cljs.core.rest(s__72962__$2)));
}
} else {
return null;
}
break;
}
});})(i__72892,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72954,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__72893,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(i__72892,cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72954,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__72893,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(seg_indices);
})())], null));

var G__73019 = (i__72892 + (1));
i__72892 = G__73019;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72893),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890(cljs.core.chunk_rest(s__72891__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72893),null);
}
} else {
var vec__72983 = cljs.core.first(s__72891__$2);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72983,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72983,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var learn_seg_paths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id));
var learn_seg_indices = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (cell_id,learn_seg_paths,vec__72983,ci,seg_indices,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (p__72986){
var vec__72987 = p__72986;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72987,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72987,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__72987,(2),null);
return si;
});})(cell_id,learn_seg_paths,vec__72983,ci,seg_indices,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
),learn_seg_paths);
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72983,ci,seg_indices,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890_$_iter__72990(s__72991){
return (new cljs.core.LazySeq(null,((function (cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72983,ci,seg_indices,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth){
return (function (){
var s__72991__$1 = s__72991;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__72991__$1);
if(temp__6728__auto____$2){
var s__72991__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__72991__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__72991__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__72993 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__72992 = (0);
while(true){
if((i__72992 < size__10131__auto__)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__72992);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__73004 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73004) : grouped_syns.call(null,G__73004));
})());
var conn_tot = (cljs.core.count((function (){var G__73005 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73005) : grouped_syns.call(null,G__73005));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__73006 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73006) : grouped_syns.call(null,G__73006));
})());
var disc_tot = (cljs.core.count((function (){var G__73007 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73007) : grouped_syns.call(null,G__73007));
})()) + disc_act);
cljs.core.chunk_append(b__72993,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null));

var G__73020 = (i__72992 + (1));
i__72992 = G__73020;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__72993),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890_$_iter__72990(cljs.core.chunk_rest(s__72991__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__72993),null);
}
} else {
var si = cljs.core.first(s__72991__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var conn_act = cljs.core.count((function (){var G__73008 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73008) : grouped_syns.call(null,G__73008));
})());
var conn_tot = (cljs.core.count((function (){var G__73009 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73009) : grouped_syns.call(null,G__73009));
})()) + conn_act);
var disc_act = cljs.core.count((function (){var G__73010 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73010) : grouped_syns.call(null,G__73010));
})());
var disc_tot = (cljs.core.count((function (){var G__73011 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_syns.cljs$core$IFn$_invoke$arity$1(G__73011) : grouped_syns.call(null,G__73011));
})()) + disc_act);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,new cljs.core.PersistentArrayMap(null, 7, ["learn-seg?",cljs.core.contains_QMARK_(learn_seg_indices,si),"n-conn-act",conn_act,"n-conn-tot",conn_tot,"n-disc-act",disc_act,"n-disc-tot",disc_tot,"stimulus-th",stimulus_th,"learning-th",learning_th], null)], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890_$_iter__72990(cljs.core.rest(s__72991__$2)));
}
} else {
return null;
}
break;
}
});})(cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72983,ci,seg_indices,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(cell_id,learn_seg_paths,learn_seg_indices,p_segs,vec__72983,ci,seg_indices,s__72891__$2,temp__6728__auto____$1,vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(seg_indices);
})())], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506_$_iter__72890(cljs.core.rest(s__72891__$2)));
}
} else {
return null;
}
break;
}
});})(vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(vec__72887,col,cells,s__72507__$2,temp__6728__auto__,lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(cells);
})())], null),org$numenta$sanity$comportex$data$query_segs_$_iter__72506(cljs.core.rest(s__72507__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
,null,null));
});})(lyr,params,dparams,stimulus_th,learning_th,pcon,on_bits,learning,sg_key,sg,prev_sg,depth))
;
return iter__10132__auto__(org.numenta.sanity.comportex.data.expand_seg_selector(seg_selector,depth,sg,seg_type));
})());
});
org.numenta.sanity.comportex.data.query_syns = (function org$numenta$sanity$comportex$data$query_syns(htm,prev_htm,lyr_id,seg_selector,syn_states,seg_type){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var params = org.nfrac.comportex.core.params(lyr);
var dparams = cljs.core.get.cljs$core$IFn$_invoke$arity$2(params,seg_type);
var pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(dparams);
var pinit = cljs.core.cst$kw$perm_DASH_init.cljs$core$IFn$_invoke$arity$1(dparams);
var on_bits = cljs.core.set((function (){var G__75825 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__75825) {
case "apical":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_apical_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "distal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$prior_DASH_distal_DASH_state,cljs.core.cst$kw$active_DASH_bits], null));

break;
case "proximal":
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$active_DASH_state,cljs.core.cst$kw$in_DASH_ff_DASH_signal,cljs.core.cst$kw$bits], null));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})());
var learning = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(lyr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$learn_DASH_state,cljs.core.cst$kw$learning,seg_type], null));
var sg_key = (function (){var G__75826 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__75826) {
case "apical":
return cljs.core.cst$kw$apical_DASH_sg;

break;
case "distal":
return cljs.core.cst$kw$distal_DASH_sg;

break;
case "proximal":
return cljs.core.cst$kw$proximal_DASH_sg;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var sg = cljs.core.get.cljs$core$IFn$_invoke$arity$2(lyr,sg_key);
var prev_sg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id,sg_key], null));
var dt = (function (){var G__75827 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__75827) {
case "apical":
return (-1);

break;
case "distal":
return (-1);

break;
case "proximal":
return (0);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var source_of_bit = (function (){var G__75828 = (((seg_type instanceof cljs.core.Keyword))?seg_type.fqn:null);
switch (G__75828) {
case "distal":
return ((function (G__75828,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt){
return (function (p1__73021_SHARP_){
return org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,p1__73021_SHARP_);
});
;})(G__75828,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt))

break;
case "apical":
return ((function (G__75828,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt){
return (function (p1__73022_SHARP_){
return org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,p1__73022_SHARP_,cljs.core.cst$kw$fb_DASH_deps);
});
;})(G__75828,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt))

break;
case "proximal":
return ((function (G__75828,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt){
return (function (p1__73023_SHARP_){
return org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,p1__73023_SHARP_,cljs.core.cst$kw$ff_DASH_deps);
});
;})(G__75828,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt))

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(seg_type)].join('')));

}
})();
var source_id_and_dt_of_bit = ((function (lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit){
return (function (i){
var vec__75829 = (source_of_bit.cljs$core$IFn$_invoke$arity$1 ? source_of_bit.cljs$core$IFn$_invoke$arity$1(i) : source_of_bit.call(null,i));
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__75829,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__75829,(1),null);
if((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$proximal,seg_type)) && (cljs.core.contains_QMARK_(cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(htm),src_id))){
var src_state = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,src_id,cljs.core.cst$kw$active_DASH_state], null));
var src_depth = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,src_id,cljs.core.cst$kw$params,cljs.core.cst$kw$depth], null));
var prev_ss = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,src_id,cljs.core.cst$kw$active_DASH_state], null));
var src_cell_id = org.nfrac.comportex.layer.id__GT_cell(src_depth,src_i);
var src_dt = (function (){var dt__$1 = (0);
var csets = cljs.core.cons(cljs.core.cst$kw$active_DASH_cells.cljs$core$IFn$_invoke$arity$1(src_state),cljs.core.reverse(cljs.core.cst$kw$stable_DASH_cells_DASH_buffer.cljs$core$IFn$_invoke$arity$1(prev_ss)));
while(true){
var temp__6726__auto__ = cljs.core.first(csets);
if(cljs.core.truth_(temp__6726__auto__)){
var cset = temp__6726__auto__;
if(cljs.core.contains_QMARK_(cset,src_cell_id)){
return dt__$1;
} else {
var G__78630 = (dt__$1 - (1));
var G__78631 = cljs.core.next(csets);
dt__$1 = G__78630;
csets = G__78631;
continue;
}
} else {
return (0);
}
break;
}
})();
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,src_i,src_dt], null);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,src_i,dt], null);
}
});})(lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit))
;
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(params);
var iter__10132__auto__ = ((function (lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832(s__75833){
return (new cljs.core.LazySeq(null,((function (lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__75833__$1 = s__75833;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__75833__$1);
if(temp__6728__auto__){
var s__75833__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__75833__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__75833__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__75835 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__75834 = (0);
while(true){
if((i__75834 < size__10131__auto__)){
var vec__77232 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__75834);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77232,(0),null);
var cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77232,(1),null);
cljs.core.chunk_append(b__75835,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__75834,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235(s__77236){
return (new cljs.core.LazySeq(null,((function (i__75834,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77236__$1 = s__77236;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__77236__$1);
if(temp__6728__auto____$1){
var s__77236__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__77236__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__77236__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__77238 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__77237 = (0);
while(true){
if((i__77237 < size__10131__auto____$1)){
var vec__77585 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__77237);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77585,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77585,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var si__GT_seg_update = (function (){var upd = cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id);
var vec__77588 = cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(upd);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77588,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77588,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77588,(2),null);
return cljs.core.PersistentArrayMap.fromArray([si,upd], true, false);
})();
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
cljs.core.chunk_append(b__77238,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__77237,i__75834,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591(s__77592){
return (new cljs.core.LazySeq(null,((function (i__77237,i__75834,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77592__$1 = s__77592;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__77592__$1);
if(temp__6728__auto____$2){
var s__77592__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__77592__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__77592__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__77594 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__77593 = (0);
while(true){
if((i__77593 < size__10131__auto____$2)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__77593);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__77677){
var vec__77678 = p__77677;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77678,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77678,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__77681 = cljs.core.PersistentArrayMap.EMPTY;
var G__77681__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77681,"active",(function (){var G__77682 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77682) : grouped_sourced_syns.call(null,G__77682));
})()):G__77681);
var G__77681__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77681__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__77683 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77683) : grouped_sourced_syns.call(null,G__77683));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__77684 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77684) : grouped_sourced_syns.call(null,G__77684));
})():null))):G__77681__$1);
var G__77681__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77681__$2,"disconnected",(function (){var G__77685 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77685) : grouped_sourced_syns.call(null,G__77685));
})()):G__77681__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77681__$3,"growing",(function (){var G__77686 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77686) : grouped_sourced_syns.call(null,G__77686));
})());
} else {
return G__77681__$3;
}
})();
cljs.core.chunk_append(b__77594,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591_$_iter__77687(s__77688){
return (new cljs.core.LazySeq(null,((function (i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77688__$1 = s__77688;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__77688__$1);
if(temp__6728__auto____$3){
var s__77688__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__77688__$2)){
var c__10130__auto____$3 = cljs.core.chunk_first(s__77688__$2);
var size__10131__auto____$3 = cljs.core.count(c__10130__auto____$3);
var b__77690 = cljs.core.chunk_buffer(size__10131__auto____$3);
if((function (){var i__77689 = (0);
while(true){
if((i__77689 < size__10131__auto____$3)){
var vec__77705 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$3,i__77689);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77705,(0),null);
var vec__77708 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77705,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77708,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77708,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77708,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77705,(2),null);
cljs.core.chunk_append(b__77690,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78632 = (i__77689 + (1));
i__77689 = G__78632;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77690),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591_$_iter__77687(cljs.core.chunk_rest(s__77688__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77690),null);
}
} else {
var vec__77711 = cljs.core.first(s__77688__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77711,(0),null);
var vec__77714 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77711,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77714,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77714,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77714,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77711,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591_$_iter__77687(cljs.core.rest(s__77688__$2)));
}
} else {
return null;
}
break;
}
});})(i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__77593,i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$2,size__10131__auto____$2,b__77594,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null));

var G__78633 = (i__77593 + (1));
i__77593 = G__78633;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77594),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591(cljs.core.chunk_rest(s__77592__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77594),null);
}
} else {
var si = cljs.core.first(s__77592__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__77237,i__75834,seg,grow_sources,grouped_syns,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__77237,i__75834,seg,grow_sources,grouped_syns,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__77717){
var vec__77718 = p__77717;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77718,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77718,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__77237,i__75834,seg,grow_sources,grouped_syns,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__77237,i__75834,seg,grow_sources,grouped_syns,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__77721 = cljs.core.PersistentArrayMap.EMPTY;
var G__77721__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77721,"active",(function (){var G__77722 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77722) : grouped_sourced_syns.call(null,G__77722));
})()):G__77721);
var G__77721__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77721__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__77723 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77723) : grouped_sourced_syns.call(null,G__77723));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__77724 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77724) : grouped_sourced_syns.call(null,G__77724));
})():null))):G__77721__$1);
var G__77721__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77721__$2,"disconnected",(function (){var G__77725 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77725) : grouped_sourced_syns.call(null,G__77725));
})()):G__77721__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77721__$3,"growing",(function (){var G__77726 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77726) : grouped_sourced_syns.call(null,G__77726));
})());
} else {
return G__77721__$3;
}
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591_$_iter__77727(s__77728){
return (new cljs.core.LazySeq(null,((function (i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77728__$1 = s__77728;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__77728__$1);
if(temp__6728__auto____$3){
var s__77728__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__77728__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__77728__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__77730 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__77729 = (0);
while(true){
if((i__77729 < size__10131__auto____$2)){
var vec__77745 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__77729);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77745,(0),null);
var vec__77748 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77745,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77748,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77748,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77748,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77745,(2),null);
cljs.core.chunk_append(b__77730,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78634 = (i__77729 + (1));
i__77729 = G__78634;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77730),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591_$_iter__77727(cljs.core.chunk_rest(s__77728__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77730),null);
}
} else {
var vec__77751 = cljs.core.first(s__77728__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77751,(0),null);
var vec__77754 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77751,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77754,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77754,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77754,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77751,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591_$_iter__77727(cljs.core.rest(s__77728__$2)));
}
} else {
return null;
}
break;
}
});})(i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__77237,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77592__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77591(cljs.core.rest(s__77592__$2)));
}
} else {
return null;
}
break;
}
});})(i__77237,i__75834,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__77237,i__75834,cell_id,si__GT_seg_update,p_segs,vec__77585,ci,seg_indices,c__10130__auto____$1,size__10131__auto____$1,b__77238,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(seg_indices);
})())], null));

var G__78635 = (i__77237 + (1));
i__77237 = G__78635;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77238),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235(cljs.core.chunk_rest(s__77236__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77238),null);
}
} else {
var vec__77757 = cljs.core.first(s__77236__$2);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77757,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77757,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var si__GT_seg_update = (function (){var upd = cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id);
var vec__77760 = cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(upd);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77760,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77760,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77760,(2),null);
return cljs.core.PersistentArrayMap.fromArray([si,upd], true, false);
})();
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__75834,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763(s__77764){
return (new cljs.core.LazySeq(null,((function (i__75834,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77764__$1 = s__77764;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__77764__$1);
if(temp__6728__auto____$2){
var s__77764__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__77764__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__77764__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__77766 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__77765 = (0);
while(true){
if((i__77765 < size__10131__auto____$1)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__77765);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__77765,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__77765,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__77849){
var vec__77850 = p__77849;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77850,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77850,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__77765,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__77765,i__75834,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__77853 = cljs.core.PersistentArrayMap.EMPTY;
var G__77853__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77853,"active",(function (){var G__77854 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77854) : grouped_sourced_syns.call(null,G__77854));
})()):G__77853);
var G__77853__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77853__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__77855 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77855) : grouped_sourced_syns.call(null,G__77855));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__77856 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77856) : grouped_sourced_syns.call(null,G__77856));
})():null))):G__77853__$1);
var G__77853__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77853__$2,"disconnected",(function (){var G__77857 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77857) : grouped_sourced_syns.call(null,G__77857));
})()):G__77853__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77853__$3,"growing",(function (){var G__77858 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77858) : grouped_sourced_syns.call(null,G__77858));
})());
} else {
return G__77853__$3;
}
})();
cljs.core.chunk_append(b__77766,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__77765,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__77765,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763_$_iter__77859(s__77860){
return (new cljs.core.LazySeq(null,((function (i__77765,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77860__$1 = s__77860;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__77860__$1);
if(temp__6728__auto____$3){
var s__77860__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__77860__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__77860__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__77862 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__77861 = (0);
while(true){
if((i__77861 < size__10131__auto____$2)){
var vec__77877 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__77861);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77877,(0),null);
var vec__77880 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77877,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77880,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77880,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77880,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77877,(2),null);
cljs.core.chunk_append(b__77862,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78636 = (i__77861 + (1));
i__77861 = G__78636;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77862),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763_$_iter__77859(cljs.core.chunk_rest(s__77860__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77862),null);
}
} else {
var vec__77883 = cljs.core.first(s__77860__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77883,(0),null);
var vec__77886 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77883,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77886,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77886,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77886,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77883,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763_$_iter__77859(cljs.core.rest(s__77860__$2)));
}
} else {
return null;
}
break;
}
});})(i__77765,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__77765,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__77765,i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__77766,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null));

var G__78637 = (i__77765 + (1));
i__77765 = G__78637;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77766),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763(cljs.core.chunk_rest(s__77764__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77766),null);
}
} else {
var si = cljs.core.first(s__77764__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__75834,seg,grow_sources,grouped_syns,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__75834,seg,grow_sources,grouped_syns,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__77889){
var vec__77890 = p__77889;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77890,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77890,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__75834,seg,grow_sources,grouped_syns,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__75834,seg,grow_sources,grouped_syns,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__77893 = cljs.core.PersistentArrayMap.EMPTY;
var G__77893__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77893,"active",(function (){var G__77894 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77894) : grouped_sourced_syns.call(null,G__77894));
})()):G__77893);
var G__77893__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77893__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__77895 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77895) : grouped_sourced_syns.call(null,G__77895));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__77896 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77896) : grouped_sourced_syns.call(null,G__77896));
})():null))):G__77893__$1);
var G__77893__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77893__$2,"disconnected",(function (){var G__77897 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77897) : grouped_sourced_syns.call(null,G__77897));
})()):G__77893__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__77893__$3,"growing",(function (){var G__77898 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__77898) : grouped_sourced_syns.call(null,G__77898));
})());
} else {
return G__77893__$3;
}
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763_$_iter__77899(s__77900){
return (new cljs.core.LazySeq(null,((function (i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77900__$1 = s__77900;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__77900__$1);
if(temp__6728__auto____$3){
var s__77900__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__77900__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__77900__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__77902 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__77901 = (0);
while(true){
if((i__77901 < size__10131__auto____$1)){
var vec__77917 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__77901);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77917,(0),null);
var vec__77920 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77917,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77920,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77920,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77920,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77917,(2),null);
cljs.core.chunk_append(b__77902,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78638 = (i__77901 + (1));
i__77901 = G__78638;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77902),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763_$_iter__77899(cljs.core.chunk_rest(s__77900__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77902),null);
}
} else {
var vec__77923 = cljs.core.first(s__77900__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77923,(0),null);
var vec__77926 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77923,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77926,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77926,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77926,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77923,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763_$_iter__77899(cljs.core.rest(s__77900__$2)));
}
} else {
return null;
}
break;
}
});})(i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__75834,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__77764__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235_$_iter__77763(cljs.core.rest(s__77764__$2)));
}
} else {
return null;
}
break;
}
});})(i__75834,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__75834,cell_id,si__GT_seg_update,p_segs,vec__77757,ci,seg_indices,s__77236__$2,temp__6728__auto____$1,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(seg_indices);
})())], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77235(cljs.core.rest(s__77236__$2)));
}
} else {
return null;
}
break;
}
});})(i__75834,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__75834,vec__77232,col,cells,c__10130__auto__,size__10131__auto__,b__75835,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(cells);
})())], null));

var G__78639 = (i__75834 + (1));
i__75834 = G__78639;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__75835),org$numenta$sanity$comportex$data$query_syns_$_iter__75832(cljs.core.chunk_rest(s__75833__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__75835),null);
}
} else {
var vec__77929 = cljs.core.first(s__75833__$2);
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77929,(0),null);
var cells = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__77929,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932(s__77933){
return (new cljs.core.LazySeq(null,((function (vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__77933__$1 = s__77933;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__77933__$1);
if(temp__6728__auto____$1){
var s__77933__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__77933__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__77933__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__77935 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__77934 = (0);
while(true){
if((i__77934 < size__10131__auto__)){
var vec__78282 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__77934);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78282,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78282,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var si__GT_seg_update = (function (){var upd = cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id);
var vec__78285 = cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(upd);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78285,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78285,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78285,(2),null);
return cljs.core.PersistentArrayMap.fromArray([si,upd], true, false);
})();
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
cljs.core.chunk_append(b__77935,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (i__77934,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288(s__78289){
return (new cljs.core.LazySeq(null,((function (i__77934,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__78289__$1 = s__78289;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__78289__$1);
if(temp__6728__auto____$2){
var s__78289__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__78289__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__78289__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__78291 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__78290 = (0);
while(true){
if((i__78290 < size__10131__auto____$1)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__78290);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__78290,i__77934,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__78290,i__77934,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__78374){
var vec__78375 = p__78374;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78375,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78375,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__78290,i__77934,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__78290,i__77934,seg,grow_sources,grouped_syns,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__78378 = cljs.core.PersistentArrayMap.EMPTY;
var G__78378__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78378,"active",(function (){var G__78379 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78379) : grouped_sourced_syns.call(null,G__78379));
})()):G__78378);
var G__78378__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78378__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__78380 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78380) : grouped_sourced_syns.call(null,G__78380));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__78381 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78381) : grouped_sourced_syns.call(null,G__78381));
})():null))):G__78378__$1);
var G__78378__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78378__$2,"disconnected",(function (){var G__78382 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78382) : grouped_sourced_syns.call(null,G__78382));
})()):G__78378__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78378__$3,"growing",(function (){var G__78383 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78383) : grouped_sourced_syns.call(null,G__78383));
})());
} else {
return G__78378__$3;
}
})();
cljs.core.chunk_append(b__78291,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__78290,i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__78290,i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288_$_iter__78384(s__78385){
return (new cljs.core.LazySeq(null,((function (i__78290,i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__78385__$1 = s__78385;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__78385__$1);
if(temp__6728__auto____$3){
var s__78385__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__78385__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__78385__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__78387 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__78386 = (0);
while(true){
if((i__78386 < size__10131__auto____$2)){
var vec__78402 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__78386);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78402,(0),null);
var vec__78405 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78402,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78405,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78405,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78405,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78402,(2),null);
cljs.core.chunk_append(b__78387,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78640 = (i__78386 + (1));
i__78386 = G__78640;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78387),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288_$_iter__78384(cljs.core.chunk_rest(s__78385__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78387),null);
}
} else {
var vec__78408 = cljs.core.first(s__78385__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78408,(0),null);
var vec__78411 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78408,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78411,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78411,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78411,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78408,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288_$_iter__78384(cljs.core.rest(s__78385__$2)));
}
} else {
return null;
}
break;
}
});})(i__78290,i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__78290,i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__78290,i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto____$1,size__10131__auto____$1,b__78291,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null));

var G__78641 = (i__78290 + (1));
i__78290 = G__78641;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78291),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288(cljs.core.chunk_rest(s__78289__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78291),null);
}
} else {
var si = cljs.core.first(s__78289__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__77934,seg,grow_sources,grouped_syns,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__77934,seg,grow_sources,grouped_syns,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__78414){
var vec__78415 = p__78414;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78415,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78415,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__77934,seg,grow_sources,grouped_syns,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__77934,seg,grow_sources,grouped_syns,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__78418 = cljs.core.PersistentArrayMap.EMPTY;
var G__78418__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78418,"active",(function (){var G__78419 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78419) : grouped_sourced_syns.call(null,G__78419));
})()):G__78418);
var G__78418__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78418__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__78420 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78420) : grouped_sourced_syns.call(null,G__78420));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__78421 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78421) : grouped_sourced_syns.call(null,G__78421));
})():null))):G__78418__$1);
var G__78418__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78418__$2,"disconnected",(function (){var G__78422 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78422) : grouped_sourced_syns.call(null,G__78422));
})()):G__78418__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78418__$3,"growing",(function (){var G__78423 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78423) : grouped_sourced_syns.call(null,G__78423));
})());
} else {
return G__78418__$3;
}
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288_$_iter__78424(s__78425){
return (new cljs.core.LazySeq(null,((function (i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__78425__$1 = s__78425;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__78425__$1);
if(temp__6728__auto____$3){
var s__78425__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__78425__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__78425__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__78427 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__78426 = (0);
while(true){
if((i__78426 < size__10131__auto____$1)){
var vec__78442 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__78426);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78442,(0),null);
var vec__78445 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78442,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78445,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78445,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78445,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78442,(2),null);
cljs.core.chunk_append(b__78427,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78642 = (i__78426 + (1));
i__78426 = G__78642;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78427),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288_$_iter__78424(cljs.core.chunk_rest(s__78425__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78427),null);
}
} else {
var vec__78448 = cljs.core.first(s__78425__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78448,(0),null);
var vec__78451 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78448,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78451,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78451,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78451,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78448,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288_$_iter__78424(cljs.core.rest(s__78425__$2)));
}
} else {
return null;
}
break;
}
});})(i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__77934,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78289__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78288(cljs.core.rest(s__78289__$2)));
}
} else {
return null;
}
break;
}
});})(i__77934,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__77934,cell_id,si__GT_seg_update,p_segs,vec__78282,ci,seg_indices,c__10130__auto__,size__10131__auto__,b__77935,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(seg_indices);
})())], null));

var G__78643 = (i__77934 + (1));
i__77934 = G__78643;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__77935),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932(cljs.core.chunk_rest(s__77933__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__77935),null);
}
} else {
var vec__78454 = cljs.core.first(s__77933__$2);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78454,(0),null);
var seg_indices = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78454,(1),null);
var cell_id = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null);
var si__GT_seg_update = (function (){var upd = cljs.core.get.cljs$core$IFn$_invoke$arity$2(learning,cell_id);
var vec__78457 = cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(upd);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78457,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78457,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78457,(2),null);
return cljs.core.PersistentArrayMap.fromArray([si,upd], true, false);
})();
var p_segs = (cljs.core.truth_(prev_htm)?org.numenta.sanity.comportex.data.all_cell_segments(prev_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null)):null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ci,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = ((function (cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460(s__78461){
return (new cljs.core.LazySeq(null,((function (cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__78461__$1 = s__78461;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__78461__$1);
if(temp__6728__auto____$2){
var s__78461__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__78461__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__78461__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__78463 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__78462 = (0);
while(true){
if((i__78462 < size__10131__auto__)){
var si = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__78462);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (i__78462,seg,grow_sources,grouped_syns,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (i__78462,seg,grow_sources,grouped_syns,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__78546){
var vec__78547 = p__78546;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78547,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78547,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(i__78462,seg,grow_sources,grouped_syns,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(i__78462,seg,grow_sources,grouped_syns,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__78550 = cljs.core.PersistentArrayMap.EMPTY;
var G__78550__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78550,"active",(function (){var G__78551 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78551) : grouped_sourced_syns.call(null,G__78551));
})()):G__78550);
var G__78550__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78550__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__78552 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78552) : grouped_sourced_syns.call(null,G__78552));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__78553 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78553) : grouped_sourced_syns.call(null,G__78553));
})():null))):G__78550__$1);
var G__78550__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78550__$2,"disconnected",(function (){var G__78554 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78554) : grouped_sourced_syns.call(null,G__78554));
})()):G__78550__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78550__$3,"growing",(function (){var G__78555 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78555) : grouped_sourced_syns.call(null,G__78555));
})());
} else {
return G__78550__$3;
}
})();
cljs.core.chunk_append(b__78463,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (i__78462,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (i__78462,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460_$_iter__78556(s__78557){
return (new cljs.core.LazySeq(null,((function (i__78462,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__78557__$1 = s__78557;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__78557__$1);
if(temp__6728__auto____$3){
var s__78557__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__78557__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__78557__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__78559 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__78558 = (0);
while(true){
if((i__78558 < size__10131__auto____$1)){
var vec__78574 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__78558);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78574,(0),null);
var vec__78577 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78574,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78577,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78577,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78577,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78574,(2),null);
cljs.core.chunk_append(b__78559,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78644 = (i__78558 + (1));
i__78558 = G__78644;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78559),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460_$_iter__78556(cljs.core.chunk_rest(s__78557__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78559),null);
}
} else {
var vec__78580 = cljs.core.first(s__78557__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78580,(0),null);
var vec__78583 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78580,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78583,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78583,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78583,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78580,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460_$_iter__78556(cljs.core.rest(s__78557__$2)));
}
} else {
return null;
}
break;
}
});})(i__78462,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(i__78462,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(i__78462,seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,c__10130__auto__,size__10131__auto__,b__78463,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null));

var G__78645 = (i__78462 + (1));
i__78462 = G__78645;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78463),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460(cljs.core.chunk_rest(s__78461__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78463),null);
}
} else {
var si = cljs.core.first(s__78461__$2);
var seg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(p_segs,si,cljs.core.PersistentArrayMap.EMPTY);
var grow_sources = cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1((si__GT_seg_update.cljs$core$IFn$_invoke$arity$1 ? si__GT_seg_update.cljs$core$IFn$_invoke$arity$1(si) : si__GT_seg_update.call(null,si)));
var grouped_syns = org.numenta.sanity.comportex.data.group_synapses(seg,on_bits,pcon);
var grouped_sourced_syns = org.nfrac.comportex.util.remap(((function (seg,grow_sources,grouped_syns,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (syns){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (seg,grow_sources,grouped_syns,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (p__78586){
var vec__78587 = p__78586;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78587,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78587,(1),null);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,source_id_and_dt_of_bit(i),p], null);
});})(seg,grow_sources,grouped_syns,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syns);
});})(seg,grow_sources,grouped_syns,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(grouped_syns,cljs.core.cst$kw$growing,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var syn_sources = (function (){var G__78590 = cljs.core.PersistentArrayMap.EMPTY;
var G__78590__$1 = ((cljs.core.contains_QMARK_(syn_states,"active"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78590,"active",(function (){var G__78591 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78591) : grouped_sourced_syns.call(null,G__78591));
})()):G__78590);
var G__78590__$2 = ((cljs.core.contains_QMARK_(syn_states,"inactive"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78590__$1,"inactive",cljs.core.concat.cljs$core$IFn$_invoke$arity$2((function (){var G__78592 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$connected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78592) : grouped_sourced_syns.call(null,G__78592));
})(),(cljs.core.truth_(cljs.core.cst$kw$disconnected.cljs$core$IFn$_invoke$arity$1(syn_states))?(function (){var G__78593 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$inactive], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78593) : grouped_sourced_syns.call(null,G__78593));
})():null))):G__78590__$1);
var G__78590__$3 = ((cljs.core.contains_QMARK_(syn_states,"disconnected"))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78590__$2,"disconnected",(function (){var G__78594 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$disconnected,cljs.core.cst$kw$active], null);
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78594) : grouped_sourced_syns.call(null,G__78594));
})()):G__78590__$2);
if(cljs.core.contains_QMARK_(syn_states,"growing")){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__78590__$3,"growing",(function (){var G__78595 = cljs.core.cst$kw$growing;
return (grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1 ? grouped_sourced_syns.cljs$core$IFn$_invoke$arity$1(G__78595) : grouped_sourced_syns.call(null,G__78595));
})());
} else {
return G__78590__$3;
}
})();
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [si,org.nfrac.comportex.util.remap(((function (seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (source_info){
var iter__10132__auto__ = ((function (seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460_$_iter__78596(s__78597){
return (new cljs.core.LazySeq(null,((function (seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth){
return (function (){
var s__78597__$1 = s__78597;
while(true){
var temp__6728__auto____$3 = cljs.core.seq(s__78597__$1);
if(temp__6728__auto____$3){
var s__78597__$2 = temp__6728__auto____$3;
if(cljs.core.chunked_seq_QMARK_(s__78597__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__78597__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__78599 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__78598 = (0);
while(true){
if((i__78598 < size__10131__auto__)){
var vec__78614 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__78598);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78614,(0),null);
var vec__78617 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78614,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78617,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78617,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78617,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78614,(2),null);
cljs.core.chunk_append(b__78599,new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null));

var G__78646 = (i__78598 + (1));
i__78598 = G__78646;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78599),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460_$_iter__78596(cljs.core.chunk_rest(s__78597__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78599),null);
}
} else {
var vec__78620 = cljs.core.first(s__78597__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78620,(0),null);
var vec__78623 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78620,(1),null);
var src_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78623,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78623,(1),null);
var src_dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78623,(2),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78620,(2),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 4, ["src-i",src_i,"src-id",src_id,"src-dt",src_dt,"perm",p], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460_$_iter__78596(cljs.core.rest(s__78597__$2)));
}
} else {
return null;
}
break;
}
});})(seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(source_info);
});})(seg,grow_sources,grouped_syns,grouped_sourced_syns,syn_sources,si,s__78461__$2,temp__6728__auto____$2,cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,syn_sources)], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932_$_iter__78460(cljs.core.rest(s__78461__$2)));
}
} else {
return null;
}
break;
}
});})(cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(cell_id,si__GT_seg_update,p_segs,vec__78454,ci,seg_indices,s__77933__$2,temp__6728__auto____$1,vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(seg_indices);
})())], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832_$_iter__77932(cljs.core.rest(s__77933__$2)));
}
} else {
return null;
}
break;
}
});})(vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(vec__77929,col,cells,s__75833__$2,temp__6728__auto__,lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(cells);
})())], null),org$numenta$sanity$comportex$data$query_syns_$_iter__75832(cljs.core.rest(s__75833__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
,null,null));
});})(lyr,params,dparams,pcon,pinit,on_bits,learning,sg_key,sg,prev_sg,dt,source_of_bit,source_id_and_dt_of_bit,depth))
;
return iter__10132__auto__(org.numenta.sanity.comportex.data.expand_seg_selector(seg_selector,depth,sg,seg_type));
});
org.numenta.sanity.comportex.data.cell_excitation_data = (function org$numenta$sanity$comportex$data$cell_excitation_data(htm,prior_htm,lyr_id,sel_col){
var wc = cljs.core.cst$kw$winner_DASH_cells.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null))));
var wc_PLUS_ = (cljs.core.truth_(sel_col)?(function (){var prior_wc = cljs.core.cst$kw$winner_DASH_cells.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prior_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null))));
var sel_cell = (function (){var or__9278__auto__ = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (prior_wc,wc){
return (function (p__78659){
var vec__78660 = p__78659;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78660,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78660,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(col,sel_col);
});})(prior_wc,wc))
,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(prior_wc,wc)));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [sel_col,(0)], null);
}
})();
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(wc,sel_cell);
})():wc);
return org.nfrac.comportex.layer.tools.cell_excitation_breakdowns(htm,prior_htm,lyr_id,wc_PLUS_);
});
org.numenta.sanity.comportex.data.network_shape = (function org$numenta$sanity$comportex$data$network_shape(htm){
var sense_keys = org.nfrac.comportex.core.sense_keys(htm);
return new cljs.core.PersistentArrayMap(null, 2, ["senses",cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_keys){
return (function (m,p__78671){
var vec__78672 = p__78671;
var ordinal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78672,(0),null);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78672,(1),null);
var sense = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,sense_id,new cljs.core.PersistentArrayMap(null, 2, ["dimensions",org.nfrac.comportex.core.dims_of(sense),"ordinal",ordinal], null));
});})(sense_keys))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),sense_keys)),"layers",cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_keys){
return (function (m,p__78675){
var vec__78676 = p__78675;
var ordinal = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78676,(0),null);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78676,(1),null);
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,lyr_id,new cljs.core.PersistentArrayMap(null, 4, ["params",org.nfrac.comportex.core.params(lyr),"dimensions",cljs.core.pop(org.nfrac.comportex.core.dims_of(lyr)),"cells-per-column",cljs.core.peek(org.nfrac.comportex.core.dims_of(lyr)),"ordinal",(ordinal + cljs.core.count(sense_keys))], null));
});})(sense_keys))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$1(htm)))], null);
});
org.numenta.sanity.comportex.data.cell_cells_transitions = (function org$numenta$sanity$comportex$data$cell_cells_transitions(distal_sg,depth,n_cols){
var all_cell_ids = (function (){var iter__10132__auto__ = (function org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__78690(s__78691){
return (new cljs.core.LazySeq(null,(function (){
var s__78691__$1 = s__78691;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__78691__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var col = cljs.core.first(xs__7284__auto__);
var iterys__10128__auto__ = ((function (s__78691__$1,col,xs__7284__auto__,temp__6728__auto__){
return (function org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__78690_$_iter__78692(s__78693){
return (new cljs.core.LazySeq(null,((function (s__78691__$1,col,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__78693__$1 = s__78693;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__78693__$1);
if(temp__6728__auto____$1){
var s__78693__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__78693__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__78693__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__78695 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__78694 = (0);
while(true){
if((i__78694 < size__10131__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__78694);
cljs.core.chunk_append(b__78695,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));

var G__78701 = (i__78694 + (1));
i__78694 = G__78701;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__78695),org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__78690_$_iter__78692(cljs.core.chunk_rest(s__78693__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__78695),null);
}
} else {
var ci = cljs.core.first(s__78693__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null),org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__78690_$_iter__78692(cljs.core.rest(s__78693__$2)));
}
} else {
return null;
}
break;
}
});})(s__78691__$1,col,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__78691__$1,col,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(depth)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$numenta$sanity$comportex$data$cell_cells_transitions_$_iter__78690(cljs.core.rest(s__78691__$1)));
} else {
var G__78702 = cljs.core.rest(s__78691__$1);
s__78691__$1 = G__78702;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_cols));
})();
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (all_cell_ids){
return (function (m,from_cell){
var source_id = org.nfrac.comportex.layer.cell__GT_id(depth,from_cell);
var to_segs = org.nfrac.comportex.synapses.targets_connected_from(distal_sg,source_id);
var to_cells = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.pop,to_segs);
if(cljs.core.seq(to_cells)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,from_cell,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,from_cell,cljs.core.PersistentHashSet.EMPTY),to_cells));
} else {
return m;
}
});})(all_cell_ids))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),all_cell_ids));
});
org.numenta.sanity.comportex.data.cell_sdr_transitions = (function org$numenta$sanity$comportex$data$cell_sdr_transitions(cell_cells_xns,cell_sdr_fracs){
return cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,from_cell,to_cells){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,from_cell,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.merge_with,cljs.core.max,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cell_sdr_fracs,to_cells)));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cell_cells_xns));
});
org.numenta.sanity.comportex.data.sdr_sdr_transitions = (function org$numenta$sanity$comportex$data$sdr_sdr_transitions(cell_sdrs_xns,cell_sdr_fracs){
return org.nfrac.comportex.util.remap((function (to_sdr_frac_sums){
return cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$1((function (p__78708){
var vec__78709 = p__78708;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78709,(0),null);
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__78709,(1),null);
return (n >= (1));
})),to_sdr_frac_sums);
}),cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (m,from_cell,to_sdrs_fracs){
return cljs.core.reduce_kv((function (m__$1,from_sdr,from_frac){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m__$1,from_sdr,cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core._PLUS_,cljs.core.array_seq([cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$1,from_sdr,cljs.core.PersistentArrayMap.EMPTY),org.nfrac.comportex.util.remap((function (p1__78703_SHARP_){
return (p1__78703_SHARP_ * from_frac);
}),to_sdrs_fracs)], 0)));
}),m,(cell_sdr_fracs.cljs$core$IFn$_invoke$arity$1 ? cell_sdr_fracs.cljs$core$IFn$_invoke$arity$1(from_cell) : cell_sdr_fracs.call(null,from_cell)));
}),cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cell_sdrs_xns)));
});
org.numenta.sanity.comportex.data.freqs__GT_fracs = (function org$numenta$sanity$comportex$data$freqs__GT_fracs(freqs){
var total = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.vals(freqs));
return org.nfrac.comportex.util.remap(((function (total){
return (function (p1__78712_SHARP_){
return (p1__78712_SHARP_ / total);
});})(total))
,freqs);
});
/**
 * Argument cell-sdr-counts is a map from cell id to the SDRs it
 *   participates in. Each value gives the frequencies map by SDR id
 *   for that cell.
 * 
 *   Returns the SDR to SDR transitions, derived from the distal synapse
 *   graph. It is a map from an SDR id to any subsequent SDRs, each
 *   mapped to the number of connected synapses, weighted by the
 *   specificity of both the source and target cells to those SDRs.
 */
org.numenta.sanity.comportex.data.transitions_data = (function org$numenta$sanity$comportex$data$transitions_data(htm,lyr_id,cell_sdr_counts){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var params = org.nfrac.comportex.core.params(lyr);
var depth = cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(params);
var distal_sg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(lyr);
var cell_sdr_fracs = org.nfrac.comportex.util.remap(org.numenta.sanity.comportex.data.freqs__GT_fracs,cell_sdr_counts);
return org.numenta.sanity.comportex.data.sdr_sdr_transitions(org.numenta.sanity.comportex.data.cell_sdr_transitions(org.numenta.sanity.comportex.data.cell_cells_transitions(distal_sg,depth,cljs.core.cst$kw$n_DASH_columns.cljs$core$IFn$_invoke$arity$1(lyr)),cell_sdr_fracs),cell_sdr_fracs);
});
