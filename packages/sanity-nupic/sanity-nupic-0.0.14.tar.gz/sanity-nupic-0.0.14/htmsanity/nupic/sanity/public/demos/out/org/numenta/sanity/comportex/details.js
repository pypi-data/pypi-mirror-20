// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.details');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.synapses');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.layer.tools');
goog.require('org.nfrac.comportex.layer');
goog.require('clojure.string');
org.numenta.sanity.comportex.details.to_fixed = (function org$numenta$sanity$comportex$details$to_fixed(n,digits){
return n.toFixed(digits);
});
org.numenta.sanity.comportex.details.detail_text = (function org$numenta$sanity$comportex$details$detail_text(htm,prior_htm,lyr_id,col){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var info = org.nfrac.comportex.core.layer_state(lyr);
var in$ = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
var in_bits = cljs.core.set(cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$in_DASH_ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))));
var in_sbits = cljs.core.set(cljs.core.cst$kw$org$nfrac$comportex$layer_SLASH_stable_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$in_DASH_ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))));
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.interpose.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.flatten(cljs.core.PersistentVector.fromArray(["__Selection__",[cljs.core.str("* timestep "),cljs.core.str(org.nfrac.comportex.core.timestep(lyr))].join(''),[cljs.core.str("* column "),cljs.core.str((function (){var or__9278__auto__ = col;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return "nil";
}
})())].join(''),"","__Input__",[cljs.core.str(in$)].join(''),[cljs.core.str("("),cljs.core.str(cljs.core.count(in_bits)),cljs.core.str(" bits, of which "),cljs.core.str(cljs.core.count(in_sbits)),cljs.core.str(" stable)")].join(''),"","__Input bits__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(in_bits))].join(''),"","__Active columns__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_columns.cljs$core$IFn$_invoke$arity$1(info)))].join(''),"","__Bursting columns__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$bursting_DASH_columns.cljs$core$IFn$_invoke$arity$1(info)))].join(''),"","__Winner cells__",[cljs.core.str(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$winner_DASH_cells.cljs$core$IFn$_invoke$arity$1(info)))].join(''),"","__Proximal learning__",(function (){var iter__10132__auto__ = ((function (lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79429(s__79430){
return (new cljs.core.LazySeq(null,((function (lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79430__$1 = s__79430;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__79430__$1);
if(temp__6728__auto__){
var s__79430__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__79430__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__79430__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__79432 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__79431 = (0);
while(true){
if((i__79431 < size__10131__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__79431);
cljs.core.chunk_append(b__79432,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__80143 = (i__79431 + (1));
i__79431 = G__80143;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79432),org$numenta$sanity$comportex$details$detail_text_$_iter__79429(cljs.core.chunk_rest(s__79430__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79432),null);
}
} else {
var seg_up = cljs.core.first(s__79430__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79429(cljs.core.rest(s__79430__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.vals(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learning.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))))));
})(),"","__Distal learning__",(function (){var iter__10132__auto__ = ((function (lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79435(s__79436){
return (new cljs.core.LazySeq(null,((function (lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79436__$1 = s__79436;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__79436__$1);
if(temp__6728__auto__){
var s__79436__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__79436__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__79436__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__79438 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__79437 = (0);
while(true){
if((i__79437 < size__10131__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__79437);
cljs.core.chunk_append(b__79438,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''));

var G__80144 = (i__79437 + (1));
i__79437 = G__80144;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79438),org$numenta$sanity$comportex$details$detail_text_$_iter__79435(cljs.core.chunk_rest(s__79436__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79438),null);
}
} else {
var seg_up = cljs.core.first(s__79436__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)),cljs.core.str(" "),cljs.core.str(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(seg_up,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation], 0)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79435(cljs.core.rest(s__79436__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.vals(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learning.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))))));
})(),"","__Distal punishments__",(function (){var iter__10132__auto__ = ((function (lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79441(s__79442){
return (new cljs.core.LazySeq(null,((function (lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79442__$1 = s__79442;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__79442__$1);
if(temp__6728__auto__){
var s__79442__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__79442__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__79442__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__79444 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__79443 = (0);
while(true){
if((i__79443 < size__10131__auto__)){
var seg_up = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__79443);
cljs.core.chunk_append(b__79444,[cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''));

var G__80145 = (i__79443 + (1));
i__79443 = G__80145;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79444),org$numenta$sanity$comportex$details$detail_text_$_iter__79441(cljs.core.chunk_rest(s__79442__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79444),null);
}
} else {
var seg_up = cljs.core.first(s__79442__$2);
return cljs.core.cons([cljs.core.str(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79441(cljs.core.rest(s__79442__$2)));
}
} else {
return null;
}
break;
}
});})(lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$punishments.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$learn_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr)))));
})(),"","__Stable cells buffer__",[cljs.core.str(cljs.core.seq(cljs.core.cst$kw$stable_DASH_cells_DASH_buffer.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr))))].join(''),"",(cljs.core.truth_((function (){var and__9266__auto__ = col;
if(cljs.core.truth_(and__9266__auto__)){
return prior_htm;
} else {
return and__9266__auto__;
}
})())?(function (){var p_lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prior_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var p_prox_sg = cljs.core.cst$kw$proximal_DASH_sg.cljs$core$IFn$_invoke$arity$1(p_lyr);
var p_distal_sg = cljs.core.cst$kw$distal_DASH_sg.cljs$core$IFn$_invoke$arity$1(p_lyr);
var d_pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$distal.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.params(p_lyr)));
var ff_pcon = cljs.core.cst$kw$perm_DASH_connected.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$proximal.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.params(p_lyr)));
var d_bits = cljs.core.cst$kw$active_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prior_DASH_distal_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr));
var d_lbits = cljs.core.cst$kw$learnable_DASH_bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prior_DASH_distal_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr));
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, ["__Column overlap__",[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$col_DASH_overlaps.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$active_DASH_state.cljs$core$IFn$_invoke$arity$1(lyr)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null)))].join(''),"","__Selected column__","__Connected ff-synapses__",(function (){var iter__10132__auto__ = ((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79447(s__79448){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79448__$1 = s__79448;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__79448__$1);
if(temp__6728__auto__){
var s__79448__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__79448__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__79448__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__79450 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__79449 = (0);
while(true){
if((i__79449 < size__10131__auto__)){
var vec__79519 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__79449);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79519,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79519,(1),null);
if(cljs.core.seq(syns)){
cljs.core.chunk_append(b__79450,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__10132__auto__ = ((function (i__79449,s__79448__$1,vec__79519,si,syns,c__10130__auto__,size__10131__auto__,b__79450,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79447_$_iter__79522(s__79523){
return (new cljs.core.LazySeq(null,((function (i__79449,s__79448__$1,vec__79519,si,syns,c__10130__auto__,size__10131__auto__,b__79450,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79523__$1 = s__79523;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__79523__$1);
if(temp__6728__auto____$1){
var s__79523__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__79523__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__79523__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__79525 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__79524 = (0);
while(true){
if((i__79524 < size__10131__auto____$1)){
var vec__79540 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__79524);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79540,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79540,(1),null);
var vec__79543 = org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,i,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79543,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79543,(1),null);
cljs.core.chunk_append(b__79525,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(in_sbits,i))?" S":((cljs.core.contains_QMARK_(in_bits,i))?" A":null)))].join(''));

var G__80146 = (i__79524 + (1));
i__79524 = G__80146;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79525),org$numenta$sanity$comportex$details$detail_text_$_iter__79447_$_iter__79522(cljs.core.chunk_rest(s__79523__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79525),null);
}
} else {
var vec__79546 = cljs.core.first(s__79523__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79546,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79546,(1),null);
var vec__79549 = org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,i,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79549,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79549,(1),null);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(in_sbits,i))?" S":((cljs.core.contains_QMARK_(in_bits,i))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79447_$_iter__79522(cljs.core.rest(s__79523__$2)));
}
} else {
return null;
}
break;
}
});})(i__79449,s__79448__$1,vec__79519,si,syns,c__10130__auto__,size__10131__auto__,b__79450,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(i__79449,s__79448__$1,vec__79519,si,syns,c__10130__auto__,size__10131__auto__,b__79450,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__80147 = (i__79449 + (1));
i__79449 = G__80147;
continue;
} else {
var G__80148 = (i__79449 + (1));
i__79449 = G__80148;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79450),org$numenta$sanity$comportex$details$detail_text_$_iter__79447(cljs.core.chunk_rest(s__79448__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79450),null);
}
} else {
var vec__79552 = cljs.core.first(s__79448__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79552,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79552,(1),null);
if(cljs.core.seq(syns)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("FF segment "),cljs.core.str(si)].join(''),(function (){var iter__10132__auto__ = ((function (s__79448__$1,vec__79552,si,syns,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79447_$_iter__79555(s__79556){
return (new cljs.core.LazySeq(null,((function (s__79448__$1,vec__79552,si,syns,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79556__$1 = s__79556;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__79556__$1);
if(temp__6728__auto____$1){
var s__79556__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__79556__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__79556__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__79558 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__79557 = (0);
while(true){
if((i__79557 < size__10131__auto__)){
var vec__79573 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__79557);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79573,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79573,(1),null);
var vec__79576 = org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,i,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79576,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79576,(1),null);
cljs.core.chunk_append(b__79558,[cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(in_sbits,i))?" S":((cljs.core.contains_QMARK_(in_bits,i))?" A":null)))].join(''));

var G__80149 = (i__79557 + (1));
i__79557 = G__80149;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79558),org$numenta$sanity$comportex$details$detail_text_$_iter__79447_$_iter__79555(cljs.core.chunk_rest(s__79556__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79558),null);
}
} else {
var vec__79579 = cljs.core.first(s__79556__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79579,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79579,(1),null);
var vec__79582 = org.nfrac.comportex.core.source_of_incoming_bit(htm,lyr_id,i,cljs.core.cst$kw$ff_DASH_deps);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79582,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79582,(1),null);
return cljs.core.cons([cljs.core.str("  "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= ff_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(in_sbits,i))?" S":((cljs.core.contains_QMARK_(in_bits,i))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79447_$_iter__79555(cljs.core.rest(s__79556__$2)));
}
} else {
return null;
}
break;
}
});})(s__79448__$1,vec__79552,si,syns,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(s__79448__$1,vec__79552,si,syns,s__79448__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__79447(cljs.core.rest(s__79448__$2)));
} else {
var G__80150 = cljs.core.rest(s__79448__$2);
s__79448__$1 = G__80150;
continue;
}
}
} else {
return null;
}
break;
}
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,org.nfrac.comportex.synapses.cell_segments(p_prox_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0)], null))));
})(),"__Cells and their distal dendrite segments__",(function (){var iter__10132__auto__ = ((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585(s__79586){
return (new cljs.core.LazySeq(null,((function (p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79586__$1 = s__79586;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__79586__$1);
if(temp__6728__auto__){
var s__79586__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__79586__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__79586__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__79588 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__79587 = (0);
while(true){
if((i__79587 < size__10131__auto__)){
var ci = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__79587);
var segs = org.nfrac.comportex.synapses.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
cljs.core.chunk_append(b__79588,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__10132__auto__ = ((function (i__79587,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867(s__79868){
return (new cljs.core.LazySeq(null,((function (i__79587,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79868__$1 = s__79868;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__79868__$1);
if(temp__6728__auto____$1){
var s__79868__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__79868__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__79868__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__79870 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__79869 = (0);
while(true){
if((i__79869 < size__10131__auto____$1)){
var vec__79939 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__79869);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79939,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79939,(1),null);
cljs.core.chunk_append(b__79870,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__10132__auto__ = ((function (i__79869,i__79587,vec__79939,si,syns,c__10130__auto____$1,size__10131__auto____$1,b__79870,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867_$_iter__79942(s__79943){
return (new cljs.core.LazySeq(null,((function (i__79869,i__79587,vec__79939,si,syns,c__10130__auto____$1,size__10131__auto____$1,b__79870,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79943__$1 = s__79943;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__79943__$1);
if(temp__6728__auto____$2){
var s__79943__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__79943__$2)){
var c__10130__auto____$2 = cljs.core.chunk_first(s__79943__$2);
var size__10131__auto____$2 = cljs.core.count(c__10130__auto____$2);
var b__79945 = cljs.core.chunk_buffer(size__10131__auto____$2);
if((function (){var i__79944 = (0);
while(true){
if((i__79944 < size__10131__auto____$2)){
var vec__79960 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$2,i__79944);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79960,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79960,(1),null);
var vec__79963 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79963,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79963,(1),null);
cljs.core.chunk_append(b__79945,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''));

var G__80151 = (i__79944 + (1));
i__79944 = G__80151;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79945),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867_$_iter__79942(cljs.core.chunk_rest(s__79943__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79945),null);
}
} else {
var vec__79966 = cljs.core.first(s__79943__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79966,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79966,(1),null);
var vec__79969 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79969,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79969,(1),null);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867_$_iter__79942(cljs.core.rest(s__79943__$2)));
}
} else {
return null;
}
break;
}
});})(i__79869,i__79587,vec__79939,si,syns,c__10130__auto____$1,size__10131__auto____$1,b__79870,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(i__79869,i__79587,vec__79939,si,syns,c__10130__auto____$1,size__10131__auto____$1,b__79870,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__80152 = (i__79869 + (1));
i__79869 = G__80152;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79870),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867(cljs.core.chunk_rest(s__79868__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79870),null);
}
} else {
var vec__79972 = cljs.core.first(s__79868__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79972,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79972,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__10132__auto__ = ((function (i__79587,vec__79972,si,syns,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867_$_iter__79975(s__79976){
return (new cljs.core.LazySeq(null,((function (i__79587,vec__79972,si,syns,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__79976__$1 = s__79976;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__79976__$1);
if(temp__6728__auto____$2){
var s__79976__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__79976__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__79976__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__79978 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__79977 = (0);
while(true){
if((i__79977 < size__10131__auto____$1)){
var vec__79993 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__79977);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79993,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79993,(1),null);
var vec__79996 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79996,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79996,(1),null);
cljs.core.chunk_append(b__79978,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''));

var G__80153 = (i__79977 + (1));
i__79977 = G__80153;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79978),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867_$_iter__79975(cljs.core.chunk_rest(s__79976__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79978),null);
}
} else {
var vec__79999 = cljs.core.first(s__79976__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79999,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__79999,(1),null);
var vec__80002 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80002,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80002,(1),null);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867_$_iter__79975(cljs.core.rest(s__79976__$2)));
}
} else {
return null;
}
break;
}
});})(i__79587,vec__79972,si,syns,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(i__79587,vec__79972,si,syns,s__79868__$2,temp__6728__auto____$1,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__79867(cljs.core.rest(s__79868__$2)));
}
} else {
return null;
}
break;
}
});})(i__79587,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(i__79587,segs,ci,c__10130__auto__,size__10131__auto__,b__79588,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null));

var G__80154 = (i__79587 + (1));
i__79587 = G__80154;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__79588),org$numenta$sanity$comportex$details$detail_text_$_iter__79585(cljs.core.chunk_rest(s__79586__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__79588),null);
}
} else {
var ci = cljs.core.first(s__79586__$2);
var segs = org.nfrac.comportex.synapses.cell_segments(p_distal_sg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,ci], null));
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("CELL "),cljs.core.str(ci)].join(''),[cljs.core.str(cljs.core.count(segs)),cljs.core.str(" = "),cljs.core.str(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.count,segs))].join(''),(function (){var iter__10132__auto__ = ((function (segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005(s__80006){
return (new cljs.core.LazySeq(null,((function (segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__80006__$1 = s__80006;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__80006__$1);
if(temp__6728__auto____$1){
var s__80006__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__80006__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__80006__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__80008 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__80007 = (0);
while(true){
if((i__80007 < size__10131__auto__)){
var vec__80077 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__80007);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80077,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80077,(1),null);
cljs.core.chunk_append(b__80008,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__10132__auto__ = ((function (i__80007,vec__80077,si,syns,c__10130__auto__,size__10131__auto__,b__80008,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005_$_iter__80080(s__80081){
return (new cljs.core.LazySeq(null,((function (i__80007,vec__80077,si,syns,c__10130__auto__,size__10131__auto__,b__80008,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__80081__$1 = s__80081;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__80081__$1);
if(temp__6728__auto____$2){
var s__80081__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__80081__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__80081__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__80083 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__80082 = (0);
while(true){
if((i__80082 < size__10131__auto____$1)){
var vec__80098 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__80082);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80098,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80098,(1),null);
var vec__80101 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80101,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80101,(1),null);
cljs.core.chunk_append(b__80083,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''));

var G__80155 = (i__80082 + (1));
i__80082 = G__80155;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__80083),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005_$_iter__80080(cljs.core.chunk_rest(s__80081__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__80083),null);
}
} else {
var vec__80104 = cljs.core.first(s__80081__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80104,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80104,(1),null);
var vec__80107 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80107,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80107,(1),null);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005_$_iter__80080(cljs.core.rest(s__80081__$2)));
}
} else {
return null;
}
break;
}
});})(i__80007,vec__80077,si,syns,c__10130__auto__,size__10131__auto__,b__80008,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(i__80007,vec__80077,si,syns,c__10130__auto__,size__10131__auto__,b__80008,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null));

var G__80156 = (i__80007 + (1));
i__80007 = G__80156;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__80008),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005(cljs.core.chunk_rest(s__80006__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__80008),null);
}
} else {
var vec__80110 = cljs.core.first(s__80006__$2);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80110,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80110,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  SEGMENT "),cljs.core.str(si)].join(''),(function (){var iter__10132__auto__ = ((function (vec__80110,si,syns,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005_$_iter__80113(s__80114){
return (new cljs.core.LazySeq(null,((function (vec__80110,si,syns,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits){
return (function (){
var s__80114__$1 = s__80114;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__80114__$1);
if(temp__6728__auto____$2){
var s__80114__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__80114__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__80114__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__80116 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__80115 = (0);
while(true){
if((i__80115 < size__10131__auto__)){
var vec__80131 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__80115);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80131,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80131,(1),null);
var vec__80134 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80134,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80134,(1),null);
cljs.core.chunk_append(b__80116,[cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''));

var G__80157 = (i__80115 + (1));
i__80115 = G__80157;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__80116),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005_$_iter__80113(cljs.core.chunk_rest(s__80114__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__80116),null);
}
} else {
var vec__80137 = cljs.core.first(s__80114__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80137,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80137,(1),null);
var vec__80140 = org.nfrac.comportex.layer.tools.source_of_distal_bit(htm,lyr_id,i);
var src_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80140,(0),null);
var src_i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__80140,(1),null);
return cljs.core.cons([cljs.core.str("    "),cljs.core.str(src_k),cljs.core.str(" "),cljs.core.str(src_i),cljs.core.str((((p >= d_pcon))?" :=> ":" :.: ")),cljs.core.str(org.numenta.sanity.comportex.details.to_fixed(p,(2))),cljs.core.str(((cljs.core.contains_QMARK_(d_lbits,i))?" L":((cljs.core.contains_QMARK_(d_bits,i))?" A":null)))].join(''),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005_$_iter__80113(cljs.core.rest(s__80114__$2)));
}
} else {
return null;
}
break;
}
});})(vec__80110,si,syns,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(vec__80110,si,syns,s__80006__$2,temp__6728__auto____$1,segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(syns));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__79585_$_iter__80005(cljs.core.rest(s__80006__$2)));
}
} else {
return null;
}
break;
}
});})(segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(segs,ci,s__79586__$2,temp__6728__auto__,p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,segs));
})()], null),org$numenta$sanity$comportex$details$detail_text_$_iter__79585(cljs.core.rest(s__79586__$2)));
}
} else {
return null;
}
break;
}
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
,null,null));
});})(p_lyr,p_prox_sg,p_distal_sg,d_pcon,ff_pcon,d_bits,d_lbits,lyr,info,in$,in_bits,in_sbits))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.params(lyr))));
})()], null);
})():null),"","__params__",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.sort.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.params(lyr)))], true))));
});
