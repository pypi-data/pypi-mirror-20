// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.synapses');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.util');
goog.require('cljs.spec');
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)))))),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(2048),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((2048) - (1))], null)], 0));
}),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.cst$kw$distinct,true),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$distinct,true,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)))))),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(2048),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((2048) - (1))], null)], 0));
}),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(32)))))),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(32),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(32),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(32),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((32) - (1))], null)], 0));
}),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_id,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index], null)));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_path,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_column_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_cell_DASH_index], null)));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_excitation_DASH_amt,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,1.0E12),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(500)))))),cljs.spec.with_gen(org.nfrac.comportex.util.spec_finite.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,1.0E12], 0)),(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(500),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(500),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(500),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((500) - (1))], null)], 0));
}),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,0.0,cljs.core.cst$kw$max,1.0),org.nfrac.comportex.util.spec_finite.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$min,0.0,cljs.core.cst$kw$max,1.0], 0)));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_segment,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence], null)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_operation,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$reinforce,null,cljs.core.cst$kw$punish,null,cljs.core.cst$kw$learn,null], null), null),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$reinforce,null,cljs.core.cst$kw$punish,null,cljs.core.cst$kw$learn,null], null), null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_grow_DASH_sources,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_nilable,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$cljs$spec_SLASH_nil,cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_pred,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_conformer,cljs.core.cst$sym$cljs$core_SLASH_second)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$spec_SLASH_nil,cljs.core.cst$kw$cljs$spec_SLASH_pred], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.nil_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits], null),null),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$sym$clojure$core_SLASH_second,cljs.core.second,null,true)], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_die_DASH_sources,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_nilable,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$cljs$spec_SLASH_nil,cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_pred,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_conformer,cljs.core.cst$sym$cljs$core_SLASH_second)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cljs$spec_SLASH_nil,cljs.core.cst$kw$cljs$spec_SLASH_pred], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.nil_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits], null),null),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$sym$clojure$core_SLASH_second,cljs.core.second,null,true)], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_target_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_operation], null),cljs.core.cst$kw$opt_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_grow_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_die_DASH_sources], null)),cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_target_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_operation], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_grow_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_die_DASH_sources], null),null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$target_DASH_id);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$operation);
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$grow_DASH_sources,cljs.core.cst$kw$die_DASH_sources], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_target_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_operation], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target_DASH_id,cljs.core.cst$kw$operation], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_grow_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_die_DASH_sources], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$target_DASH_id)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$operation))], null),null])));

/**
 * The synaptic connections from a set of sources to a set of targets.
 * Synapses have an associated permanence value between 0 and 1; above
 * some permanence level they are defined to be connected.
 * @interface
 */
org.nfrac.comportex.synapses.PSynapseGraph = function(){};

/**
 * All synapses to the target. A map from source ids to permanences.
 */
org.nfrac.comportex.synapses.in_synapses = (function org$nfrac$comportex$synapses$in_synapses(this$,target_id){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$synapses$PSynapseGraph$in_synapses$arity$2 == null)))){
return this$.org$nfrac$comportex$synapses$PSynapseGraph$in_synapses$arity$2(this$,target_id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.synapses.in_synapses[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,target_id) : m__9992__auto__.call(null,this$,target_id));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.synapses.in_synapses["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,target_id) : m__9992__auto____$1.call(null,this$,target_id));
} else {
throw cljs.core.missing_protocol("PSynapseGraph.in-synapses",this$);
}
}
}
});

/**
 * The collection of source ids actually connected to target id.
 */
org.nfrac.comportex.synapses.sources_connected_to = (function org$nfrac$comportex$synapses$sources_connected_to(this$,target_id){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$synapses$PSynapseGraph$sources_connected_to$arity$2 == null)))){
return this$.org$nfrac$comportex$synapses$PSynapseGraph$sources_connected_to$arity$2(this$,target_id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.synapses.sources_connected_to[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,target_id) : m__9992__auto__.call(null,this$,target_id));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.synapses.sources_connected_to["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,target_id) : m__9992__auto____$1.call(null,this$,target_id));
} else {
throw cljs.core.missing_protocol("PSynapseGraph.sources-connected-to",this$);
}
}
}
});

/**
 * The collection of target ids actually connected from source id.
 */
org.nfrac.comportex.synapses.targets_connected_from = (function org$nfrac$comportex$synapses$targets_connected_from(this$,source_id){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$synapses$PSynapseGraph$targets_connected_from$arity$2 == null)))){
return this$.org$nfrac$comportex$synapses$PSynapseGraph$targets_connected_from$arity$2(this$,source_id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.synapses.targets_connected_from[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,source_id) : m__9992__auto__.call(null,this$,source_id));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.synapses.targets_connected_from["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,source_id) : m__9992__auto____$1.call(null,this$,source_id));
} else {
throw cljs.core.missing_protocol("PSynapseGraph.targets-connected-from",this$);
}
}
}
});

/**
 * Computes a map of target ids to their degree of excitation -- the
 *  number of sources in `active-sources` they are connected to -- excluding
 *  any below `stimulus-threshold`.
 */
org.nfrac.comportex.synapses.excitations = (function org$nfrac$comportex$synapses$excitations(this$,active_sources,stimulus_threshold){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$synapses$PSynapseGraph$excitations$arity$3 == null)))){
return this$.org$nfrac$comportex$synapses$PSynapseGraph$excitations$arity$3(this$,active_sources,stimulus_threshold);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.synapses.excitations[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,active_sources,stimulus_threshold) : m__9992__auto__.call(null,this$,active_sources,stimulus_threshold));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.synapses.excitations["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,active_sources,stimulus_threshold) : m__9992__auto____$1.call(null,this$,active_sources,stimulus_threshold));
} else {
throw cljs.core.missing_protocol("PSynapseGraph.excitations",this$);
}
}
}
});

/**
 * Applies learning updates to a batch of targets. `seg-updates` is
 *  a sequence of SegUpdate records, one for each target dendrite
 *  segment.
 */
org.nfrac.comportex.synapses.bulk_learn_STAR_ = (function org$nfrac$comportex$synapses$bulk_learn_STAR_(this$,seg_updates,active_sources,pinc,pdec,pinit){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$synapses$PSynapseGraph$bulk_learn_STAR_$arity$6 == null)))){
return this$.org$nfrac$comportex$synapses$PSynapseGraph$bulk_learn_STAR_$arity$6(this$,seg_updates,active_sources,pinc,pdec,pinit);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.synapses.bulk_learn_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$6 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$6(this$,seg_updates,active_sources,pinc,pdec,pinit) : m__9992__auto__.call(null,this$,seg_updates,active_sources,pinc,pdec,pinit));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.synapses.bulk_learn_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$6 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$6(this$,seg_updates,active_sources,pinc,pdec,pinit) : m__9992__auto____$1.call(null,this$,seg_updates,active_sources,pinc,pdec,pinit));
} else {
throw cljs.core.missing_protocol("PSynapseGraph.bulk-learn*",this$);
}
}
}
});

cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)))))),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(2048),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((2048) - (1))], null)], 0));
}),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)))))),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(2048),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((2048) - (1))], null)], 0));
}),null));
})));
if(typeof org.nfrac.comportex.synapses.synapse_graph_spec !== 'undefined'){
} else {
org.nfrac.comportex.synapses.synapse_graph_spec = (function (){var method_table__10301__auto__ = (function (){var G__63455 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63455) : cljs.core.atom.call(null,G__63455));
})();
var prefer_table__10302__auto__ = (function (){var G__63456 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63456) : cljs.core.atom.call(null,G__63456));
})();
var method_cache__10303__auto__ = (function (){var G__63457 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63457) : cljs.core.atom.call(null,G__63457));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__63458 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63458) : cljs.core.atom.call(null,G__63458));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("org.nfrac.comportex.synapses","synapse-graph-spec"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63459_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_PSynapseGraph,cljs.core.cst$sym$p1__63459_SHARP_)),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets], null))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_PSynapseGraph,cljs.core.cst$sym$_PERCENT_)),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets], null))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph_DASH_spec,new cljs.core.Var(function(){return org.nfrac.comportex.synapses.synapse_graph_spec;},cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph_DASH_spec,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$file,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$arglists,cljs.core.cst$kw$doc,cljs.core.cst$kw$test],[cljs.core.cst$sym$org$nfrac$comportex$synapses,cljs.core.cst$sym$synapse_DASH_graph_DASH_spec,"public/demos/out/org/nfrac/comportex/synapses.cljc",29,1,55,55,cljs.core.List.EMPTY,null,(cljs.core.truth_(org.nfrac.comportex.synapses.synapse_graph_spec)?org.nfrac.comportex.synapses.synapse_graph_spec.cljs$lang$test:null)])),cljs.core.cst$kw$gen_DASH_type),(function (p1__63459_SHARP_){
if(!((p1__63459_SHARP_ == null))){
if((false) || (p1__63459_SHARP_.org$nfrac$comportex$synapses$PSynapseGraph$)){
return true;
} else {
if((!p1__63459_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.synapses.PSynapseGraph,p1__63459_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.synapses.PSynapseGraph,p1__63459_SHARP_);
}
}),cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[null,null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets);
})], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets))], null),null]))], null),null));
org.nfrac.comportex.synapses.bulk_learn = (function org$nfrac$comportex$synapses$bulk_learn(this$,seg_updates,active_sources,pinc,pdec,pinit){
return org.nfrac.comportex.synapses.bulk_learn_STAR_(this$,seg_updates,active_sources,pinc,pdec,pinit);
});
org.nfrac.comportex.synapses.validate_seg_update = (function org$nfrac$comportex$synapses$validate_seg_update(upd,sg){
var n = cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources.cljs$core$IFn$_invoke$arity$1(sg);
var syns = org.nfrac.comportex.synapses.in_synapses(sg,cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(upd));
if(cljs.core.truth_(cljs.spec._STAR_compile_asserts_STAR_)){
if(cljs.core.truth_(cljs.spec._STAR_runtime_asserts_STAR_)){
cljs.spec.assert_STAR_(cljs.core.map_QMARK_,syns);
} else {
}
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd))){
if(cljs.core.truth_(cljs.spec._STAR_compile_asserts_STAR_)){
if(cljs.core.truth_(cljs.spec._STAR_runtime_asserts_STAR_)){
cljs.spec.assert_STAR_(cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63461_SHARP_], null),cljs.core.list(cljs.core.cst$sym$_LT_,cljs.core.cst$sym$p1__63461_SHARP_,cljs.core.cst$sym$n)),((function (n,syns){
return (function (p1__63461_SHARP_){
return (p1__63461_SHARP_ < n);
});})(n,syns))
,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd));
} else {
cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd);
}
} else {
cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd);
}
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd))){
if(cljs.core.truth_(cljs.spec._STAR_compile_asserts_STAR_)){
if(cljs.core.truth_(cljs.spec._STAR_runtime_asserts_STAR_)){
cljs.spec.assert_STAR_(cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63462_SHARP_], null),cljs.core.list(cljs.core.cst$sym$_LT_,cljs.core.cst$sym$p1__63462_SHARP_,cljs.core.cst$sym$n)),((function (n,syns){
return (function (p1__63462_SHARP_){
return (p1__63462_SHARP_ < n);
});})(n,syns))
,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd));
} else {
cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd);
}
} else {
cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd);
}

if(cljs.core.truth_(cljs.spec._STAR_compile_asserts_STAR_)){
if(cljs.core.truth_(cljs.spec._STAR_runtime_asserts_STAR_)){
cljs.spec.assert_STAR_(cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63463_SHARP_], null),cljs.core.list(cljs.core.cst$sym$contains_QMARK_,cljs.core.cst$sym$syns,cljs.core.cst$sym$p1__63463_SHARP_)),((function (n,syns){
return (function (p1__63463_SHARP_){
return cljs.core.contains_QMARK_(syns,p1__63463_SHARP_);
});})(n,syns))
,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd));
} else {
cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd);
}
} else {
cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(upd);
}
} else {
}

return true;
});
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bulk_DASH_learn_DASH_args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$sg,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,cljs.core.cst$kw$seg_DASH_updates,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63464_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT__GT_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$kw$target_DASH_id,cljs.core.cst$sym$p1__63464_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_distinct_QMARK_,null)))),cljs.core.cst$kw$active_DASH_sources,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$set,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits_DASH_set,cljs.core.cst$kw$fn,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit),cljs.core.cst$kw$ret,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_)),cljs.core.cst$kw$pinc,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$pdec,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$pinit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63465_SHARP_], null),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_validate_DASH_seg_DASH_update,cljs.core.cst$sym$p1__63465_SHARP_,cljs.core.list(cljs.core.cst$kw$sg,cljs.core.cst$sym$v))),cljs.core.list(cljs.core.cst$kw$seg_DASH_updates,cljs.core.cst$sym$v)))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$sg,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,cljs.core.cst$kw$seg_DASH_updates,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63464_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT__GT_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$kw$target_DASH_id,cljs.core.cst$sym$p1__63464_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_distinct_QMARK_,null)))),cljs.core.cst$kw$active_DASH_sources,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$set,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits_DASH_set,cljs.core.cst$kw$fn,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit),cljs.core.cst$kw$ret,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_)),cljs.core.cst$kw$pinc,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$pdec,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$pinit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63465_SHARP_], null),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_validate_DASH_seg_DASH_update,cljs.core.cst$sym$p1__63465_SHARP_,cljs.core.list(cljs.core.cst$kw$sg,cljs.core.cst$sym$v))),cljs.core.list(cljs.core.cst$kw$seg_DASH_updates,cljs.core.cst$sym$v)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sg,cljs.core.cst$kw$seg_DASH_updates,cljs.core.cst$kw$active_DASH_sources,cljs.core.cst$kw$pinc,cljs.core.cst$kw$pdec,cljs.core.cst$kw$pinit], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT__GT_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$kw$target_DASH_id,cljs.core.cst$sym$_PERCENT_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_distinct_QMARK_,null)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),(function (p1__63464_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.distinct_QMARK_,null,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$target_DASH_id,p1__63464_SHARP_));
})], null),null),cljs.spec.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$set,cljs.core.cst$kw$fn], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits_DASH_set,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit),cljs.core.cst$kw$ret,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits_DASH_set,cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$bit], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_,cljs.core.any_QMARK_,null,null),cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_,null,null,null)], null),null),cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_seg_DASH_update),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__63464_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT__GT_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$kw$target_DASH_id,cljs.core.cst$sym$p1__63464_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_distinct_QMARK_,null)))),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$set,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bits_DASH_set,cljs.core.cst$kw$fn,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$bit,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bit),cljs.core.cst$kw$ret,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_)),cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_permanence], null)),(function (v){
return cljs.core.every_QMARK_((function (p1__63465_SHARP_){
return org.nfrac.comportex.synapses.validate_seg_update(p1__63465_SHARP_,cljs.core.cst$kw$sg.cljs$core$IFn$_invoke$arity$1(v));
}),cljs.core.cst$kw$seg_DASH_updates.cljs$core$IFn$_invoke$arity$1(v));
})], null),null));
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$synapses_SLASH_bulk_DASH_learn,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bulk_DASH_learn_DASH_args,cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bulk_DASH_learn_DASH_args,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bulk_DASH_learn_DASH_args,null,null),cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_bulk_DASH_learn_DASH_args,cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,null,null),cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_synapse_DASH_graph,null,null,null));

/**
 * @interface
 */
org.nfrac.comportex.synapses.PSegments = function(){};

/**
 * A vector of segments on the cell, each being a synapse map.
 */
org.nfrac.comportex.synapses.cell_segments = (function org$nfrac$comportex$synapses$cell_segments(this$,cell_id){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$synapses$PSegments$cell_segments$arity$2 == null)))){
return this$.org$nfrac$comportex$synapses$PSegments$cell_segments$arity$2(this$,cell_id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.synapses.cell_segments[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,cell_id) : m__9992__auto__.call(null,this$,cell_id));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.synapses.cell_segments["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,cell_id) : m__9992__auto____$1.call(null,this$,cell_id));
} else {
throw cljs.core.missing_protocol("PSegments.cell-segments",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.synapses.SegUpdate = (function (target_id,operation,grow_sources,die_sources,__meta,__extmap,__hash){
this.target_id = target_id;
this.operation = operation;
this.grow_sources = grow_sources;
this.die_sources = die_sources;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k63467,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__63469 = (((k63467 instanceof cljs.core.Keyword))?k63467.fqn:null);
switch (G__63469) {
case "target-id":
return self__.target_id;

break;
case "operation":
return self__.operation;

break;
case "grow-sources":
return self__.grow_sources;

break;
case "die-sources":
return self__.die_sources;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63467,else__9951__auto__);

}
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.synapses.SegUpdate{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$operation,self__.operation],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$grow_DASH_sources,self__.grow_sources],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$die_DASH_sources,self__.die_sources],null))], null),self__.__extmap));
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63466){
var self__ = this;
var G__63466__$1 = this;
return (new cljs.core.RecordIter((0),G__63466__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target_DASH_id,cljs.core.cst$kw$operation,cljs.core.cst$kw$grow_DASH_sources,cljs.core.cst$kw$die_DASH_sources], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,self__.operation,self__.grow_sources,self__.die_sources,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$die_DASH_sources,null,cljs.core.cst$kw$operation,null,cljs.core.cst$kw$target_DASH_id,null,cljs.core.cst$kw$grow_DASH_sources,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,self__.operation,self__.grow_sources,self__.die_sources,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__63466){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__63470 = cljs.core.keyword_identical_QMARK_;
var expr__63471 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__63473 = cljs.core.cst$kw$target_DASH_id;
var G__63474 = expr__63471;
return (pred__63470.cljs$core$IFn$_invoke$arity$2 ? pred__63470.cljs$core$IFn$_invoke$arity$2(G__63473,G__63474) : pred__63470.call(null,G__63473,G__63474));
})())){
return (new org.nfrac.comportex.synapses.SegUpdate(G__63466,self__.operation,self__.grow_sources,self__.die_sources,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63475 = cljs.core.cst$kw$operation;
var G__63476 = expr__63471;
return (pred__63470.cljs$core$IFn$_invoke$arity$2 ? pred__63470.cljs$core$IFn$_invoke$arity$2(G__63475,G__63476) : pred__63470.call(null,G__63475,G__63476));
})())){
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,G__63466,self__.grow_sources,self__.die_sources,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63477 = cljs.core.cst$kw$grow_DASH_sources;
var G__63478 = expr__63471;
return (pred__63470.cljs$core$IFn$_invoke$arity$2 ? pred__63470.cljs$core$IFn$_invoke$arity$2(G__63477,G__63478) : pred__63470.call(null,G__63477,G__63478));
})())){
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,self__.operation,G__63466,self__.die_sources,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63479 = cljs.core.cst$kw$die_DASH_sources;
var G__63480 = expr__63471;
return (pred__63470.cljs$core$IFn$_invoke$arity$2 ? pred__63470.cljs$core$IFn$_invoke$arity$2(G__63479,G__63480) : pred__63470.call(null,G__63479,G__63480));
})())){
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,self__.operation,self__.grow_sources,G__63466,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,self__.operation,self__.grow_sources,self__.die_sources,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__63466),null));
}
}
}
}
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$operation,self__.operation],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$grow_DASH_sources,self__.grow_sources],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$die_DASH_sources,self__.die_sources],null))], null),self__.__extmap));
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__63466){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.synapses.SegUpdate(self__.target_id,self__.operation,self__.grow_sources,self__.die_sources,G__63466,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.synapses.SegUpdate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.synapses.SegUpdate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$target_DASH_id,cljs.core.cst$sym$operation,cljs.core.cst$sym$grow_DASH_sources,cljs.core.cst$sym$die_DASH_sources], null);
});

org.nfrac.comportex.synapses.SegUpdate.cljs$lang$type = true;

org.nfrac.comportex.synapses.SegUpdate.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.synapses/SegUpdate");
});

org.nfrac.comportex.synapses.SegUpdate.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.synapses/SegUpdate");
});

org.nfrac.comportex.synapses.__GT_SegUpdate = (function org$nfrac$comportex$synapses$__GT_SegUpdate(target_id,operation,grow_sources,die_sources){
return (new org.nfrac.comportex.synapses.SegUpdate(target_id,operation,grow_sources,die_sources,null,null,null));
});

org.nfrac.comportex.synapses.map__GT_SegUpdate = (function org$nfrac$comportex$synapses$map__GT_SegUpdate(G__63468){
return (new org.nfrac.comportex.synapses.SegUpdate(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(G__63468),cljs.core.cst$kw$operation.cljs$core$IFn$_invoke$arity$1(G__63468),cljs.core.cst$kw$grow_DASH_sources.cljs$core$IFn$_invoke$arity$1(G__63468),cljs.core.cst$kw$die_DASH_sources.cljs$core$IFn$_invoke$arity$1(G__63468),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63468,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$operation,cljs.core.cst$kw$grow_DASH_sources,cljs.core.cst$kw$die_DASH_sources], 0)),null));
});

/**
 * Creates a record defining changes to make to a synaptic
 *   segment. Operation can be one of `:learn` (increment active sources,
 *   decrement inactive), `:punish` (decrement active sources) or
 *   `:reinforce` (increment active sources). Without the operation
 *   argument, only the growth and death of synapses will be applied.
 *   It is allowed for a source to die and (re-)grow in the same update.
 */
org.nfrac.comportex.synapses.seg_update = (function org$nfrac$comportex$synapses$seg_update(var_args){
var args63482 = [];
var len__10461__auto___63485 = arguments.length;
var i__10462__auto___63486 = (0);
while(true){
if((i__10462__auto___63486 < len__10461__auto___63485)){
args63482.push((arguments[i__10462__auto___63486]));

var G__63487 = (i__10462__auto___63486 + (1));
i__10462__auto___63486 = G__63487;
continue;
} else {
}
break;
}

var G__63484 = args63482.length;
switch (G__63484) {
case 3:
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args63482.length)].join('')));

}
});

org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$3 = (function (target_id,grow_sources,die_sources){
return (new org.nfrac.comportex.synapses.SegUpdate(target_id,null,grow_sources,die_sources,null,null,null));
});

org.nfrac.comportex.synapses.seg_update.cljs$core$IFn$_invoke$arity$4 = (function (target_id,operation,grow_sources,die_sources){
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$reinforce,null,cljs.core.cst$kw$punish,null,cljs.core.cst$kw$learn,null], null), null),operation)){
} else {
throw (new Error("Assert failed: (contains? #{:reinforce :punish :learn} operation)"));
}

return (new org.nfrac.comportex.synapses.SegUpdate(target_id,operation,grow_sources,die_sources,null,null,null));
});

org.nfrac.comportex.synapses.seg_update.cljs$lang$maxFixedArity = 4;

/**
 * Returns lists of synapse source ids as `[up promote down demote
 * cull]` according to whether they should be increased or decreased
 * and whether they are crossing the connected permanence threshold.
 */
org.nfrac.comportex.synapses.segment_alterations = (function org$nfrac$comportex$synapses$segment_alterations(syns,adjustable_QMARK_,reinforce_QMARK_,pcon,pinc,pdec,cull_zeros_QMARK_){
var pcon__$1 = pcon;
var pcon_PLUS_pdec = (pcon__$1 + pdec);
var pcon_pinc = (pcon__$1 - pinc);
var syns__$1 = cljs.core.seq(syns);
var up = cljs.core.List.EMPTY;
var promote = cljs.core.List.EMPTY;
var down = cljs.core.List.EMPTY;
var demote = cljs.core.List.EMPTY;
var cull = cljs.core.List.EMPTY;
while(true){
if(syns__$1){
var vec__63492 = cljs.core.first(syns__$1);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63492,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63492,(1),null);
var p__$1 = p;
if(cljs.core.not((adjustable_QMARK_.cljs$core$IFn$_invoke$arity$1 ? adjustable_QMARK_.cljs$core$IFn$_invoke$arity$1(id) : adjustable_QMARK_.call(null,id)))){
var G__63495 = cljs.core.next(syns__$1);
var G__63496 = up;
var G__63497 = promote;
var G__63498 = down;
var G__63499 = demote;
var G__63500 = cull;
syns__$1 = G__63495;
up = G__63496;
promote = G__63497;
down = G__63498;
demote = G__63499;
cull = G__63500;
continue;
} else {
if(cljs.core.truth_((reinforce_QMARK_.cljs$core$IFn$_invoke$arity$1 ? reinforce_QMARK_.cljs$core$IFn$_invoke$arity$1(id) : reinforce_QMARK_.call(null,id)))){
var G__63501 = cljs.core.next(syns__$1);
var G__63502 = (((p__$1 < 1.0))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(up,id):up);
var G__63503 = ((((p__$1 < pcon__$1)) && ((p__$1 >= pcon_pinc)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(promote,id):promote);
var G__63504 = down;
var G__63505 = demote;
var G__63506 = cull;
syns__$1 = G__63501;
up = G__63502;
promote = G__63503;
down = G__63504;
demote = G__63505;
cull = G__63506;
continue;
} else {
var G__63507 = cljs.core.next(syns__$1);
var G__63508 = up;
var G__63509 = promote;
var G__63510 = (((p__$1 > 0.0))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(down,id):down);
var G__63511 = ((((p__$1 >= pcon__$1)) && ((p__$1 < pcon_PLUS_pdec)))?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(demote,id):demote);
var G__63512 = (cljs.core.truth_((function (){var and__9266__auto__ = (p__$1 <= 0.0);
if(and__9266__auto__){
return cull_zeros_QMARK_;
} else {
return and__9266__auto__;
}
})())?cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cull,id):cull);
syns__$1 = G__63507;
up = G__63508;
promote = G__63509;
down = G__63510;
demote = G__63511;
cull = G__63512;
continue;
}
}
} else {
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [up,promote,down,demote,cull], null);
}
break;
}
});
org.nfrac.comportex.synapses.never = (function org$nfrac$comportex$synapses$never(_){
return false;
});
org.nfrac.comportex.synapses.always = (function org$nfrac$comportex$synapses$always(_){
return true;
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.nfrac.comportex.synapses.PSynapseGraph}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.synapses.SynapseGraph = (function (syns_by_target,targets_by_source,pcon,cull_zeros_QMARK_,__meta,__extmap,__hash){
this.syns_by_target = syns_by_target;
this.targets_by_source = targets_by_source;
this.pcon = pcon;
this.cull_zeros_QMARK_ = cull_zeros_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k63518,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__63520 = (((k63518 instanceof cljs.core.Keyword))?k63518.fqn:null);
switch (G__63520) {
case "syns-by-target":
return self__.syns_by_target;

break;
case "targets-by-source":
return self__.targets_by_source;

break;
case "pcon":
return self__.pcon;

break;
case "cull-zeros?":
return self__.cull_zeros_QMARK_;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63518,else__9951__auto__);

}
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.synapses.SynapseGraph{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$syns_DASH_by_DASH_target,self__.syns_by_target],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$targets_DASH_by_DASH_source,self__.targets_by_source],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pcon,self__.pcon],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cull_DASH_zeros_QMARK_,self__.cull_zeros_QMARK_],null))], null),self__.__extmap));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63517){
var self__ = this;
var G__63517__$1 = this;
return (new cljs.core.RecordIter((0),G__63517__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$syns_DASH_by_DASH_target,cljs.core.cst$kw$targets_DASH_by_DASH_source,cljs.core.cst$kw$pcon,cljs.core.cst$kw$cull_DASH_zeros_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,self__.targets_by_source,self__.pcon,self__.cull_zeros_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$ = true;

org.nfrac.comportex.synapses.SynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$in_synapses$arity$2 = (function (this$,target_id){
var self__ = this;
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.syns_by_target,target_id);
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$sources_connected_to$arity$2 = (function (this$,target_id){
var self__ = this;
var this$__$1 = this;
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p__63521){
var vec__63522 = p__63521;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63522,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63522,(1),null);
if((p >= self__.pcon)){
return k;
} else {
return null;
}
});})(this$__$1))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.syns_by_target,target_id));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$targets_connected_from$arity$2 = (function (this$,source_id){
var self__ = this;
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.targets_by_source,source_id);
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$excitations$arity$3 = (function (this$,active_sources,stimulus_threshold){
var self__ = this;
var this$__$1 = this;
return cljs.core.persistent_BANG_(cljs.core.reduce_kv(((function (this$__$1){
return (function (m,id,exc){
if((exc >= stimulus_threshold)){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,id,exc);
} else {
return m;
}
});})(this$__$1))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (this$__$1){
return (function (m,source_i){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (this$__$1){
return (function (m__$1,id){
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m__$1,id,(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m__$1,id,(0)) + (1)));
});})(this$__$1))
,m,org.nfrac.comportex.synapses.targets_connected_from(this$__$1,source_i));
});})(this$__$1))
,cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY),active_sources))));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$bulk_learn_STAR_$arity$6 = (function (this$,seg_updates,active_sources,pinc,pdec,pinit){
var self__ = this;
var this$__$1 = this;
var seg_updates__$1 = cljs.core.seq(seg_updates);
var syns_by_target__$1 = cljs.core.transient$(self__.syns_by_target);
var targets_by_source__$1 = cljs.core.transient$(self__.targets_by_source);
while(true){
var temp__6726__auto__ = cljs.core.first(seg_updates__$1);
if(cljs.core.truth_(temp__6726__auto__)){
var seg_up = temp__6726__auto__;
var map__63525 = seg_up;
var map__63525__$1 = ((((!((map__63525 == null)))?((((map__63525.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63525.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63525):map__63525);
var target_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63525__$1,cljs.core.cst$kw$target_DASH_id);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63525__$1,cljs.core.cst$kw$operation);
var grow_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63525__$1,cljs.core.cst$kw$grow_DASH_sources);
var die_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63525__$1,cljs.core.cst$kw$die_DASH_sources);
var syns_STAR_ = org.nfrac.comportex.util.getx(syns_by_target__$1,target_id);
var syns = ((cljs.core.seq(die_sources))?cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc,syns_STAR_,die_sources):syns_STAR_);
var vec__63526 = (function (){var G__63530 = (((operation instanceof cljs.core.Keyword))?operation.fqn:null);
switch (G__63530) {
case "learn":
return org.nfrac.comportex.synapses.segment_alterations(syns,org.nfrac.comportex.synapses.always,active_sources,self__.pcon,pinc,pdec,self__.cull_zeros_QMARK_);

break;
case "punish":
return org.nfrac.comportex.synapses.segment_alterations(syns,active_sources,org.nfrac.comportex.synapses.never,self__.pcon,pinc,pdec,self__.cull_zeros_QMARK_);

break;
case "reinforce":
return org.nfrac.comportex.synapses.segment_alterations(syns,active_sources,org.nfrac.comportex.synapses.always,self__.pcon,pinc,pdec,self__.cull_zeros_QMARK_);

break;
default:
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.List.EMPTY,cljs.core.List.EMPTY,cljs.core.List.EMPTY,cljs.core.List.EMPTY,cljs.core.List.EMPTY], null);

}
})();
var up = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63526,(0),null);
var promote = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63526,(1),null);
var down = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63526,(2),null);
var demote = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63526,(3),null);
var cull = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63526,(4),null);
var new_syns = cljs.core.persistent_BANG_(cljs.core.conj_BANG_.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.util.update_each_BANG_(org.nfrac.comportex.util.update_each_BANG_(((cljs.core.seq(cull))?cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc_BANG_,cljs.core.transient$(syns),cull):cljs.core.transient$(syns)),up,((function (seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,seg_up,temp__6726__auto__,this$__$1){
return (function (p1__63513_SHARP_){
var x__9618__auto__ = (p1__63513_SHARP_ + pinc);
var y__9619__auto__ = 1.0;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
});})(seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,seg_up,temp__6726__auto__,this$__$1))
),down,((function (seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,seg_up,temp__6726__auto__,this$__$1){
return (function (p1__63514_SHARP_){
var x__9611__auto__ = (p1__63514_SHARP_ - pdec);
var y__9612__auto__ = 0.0;
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
});})(seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,seg_up,temp__6726__auto__,this$__$1))
),cljs.core.zipmap(grow_sources,cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(pinit))));
var connect_ids = (((pinit >= self__.pcon))?cljs.core.concat.cljs$core$IFn$_invoke$arity$2(promote,grow_sources):promote);
var disconnect_ids = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(demote,die_sources);
var G__63544 = cljs.core.next(seg_updates__$1);
var G__63545 = cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(syns_by_target__$1,target_id,new_syns);
var G__63546 = org.nfrac.comportex.util.update_each_BANG_(org.nfrac.comportex.util.update_each_BANG_(targets_by_source__$1,disconnect_ids,((function (seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,new_syns,connect_ids,disconnect_ids,seg_up,temp__6726__auto__,this$__$1){
return (function (p1__63515_SHARP_){
return cljs.core.disj.cljs$core$IFn$_invoke$arity$2(p1__63515_SHARP_,target_id);
});})(seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,new_syns,connect_ids,disconnect_ids,seg_up,temp__6726__auto__,this$__$1))
),connect_ids,((function (seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,new_syns,connect_ids,disconnect_ids,seg_up,temp__6726__auto__,this$__$1){
return (function (p1__63516_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__63516_SHARP_,target_id);
});})(seg_updates__$1,syns_by_target__$1,targets_by_source__$1,map__63525,map__63525__$1,target_id,operation,grow_sources,die_sources,syns_STAR_,syns,vec__63526,up,promote,down,demote,cull,new_syns,connect_ids,disconnect_ids,seg_up,temp__6726__auto__,this$__$1))
);
seg_updates__$1 = G__63544;
syns_by_target__$1 = G__63545;
targets_by_source__$1 = G__63546;
continue;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$__$1,cljs.core.cst$kw$syns_DASH_by_DASH_target,cljs.core.persistent_BANG_(syns_by_target__$1),cljs.core.array_seq([cljs.core.cst$kw$targets_DASH_by_DASH_source,cljs.core.persistent_BANG_(targets_by_source__$1)], 0));
}
break;
}
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$targets_DASH_by_DASH_source,null,cljs.core.cst$kw$syns_DASH_by_DASH_target,null,cljs.core.cst$kw$pcon,null,cljs.core.cst$kw$cull_DASH_zeros_QMARK_,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,self__.targets_by_source,self__.pcon,self__.cull_zeros_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__63517){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__63531 = cljs.core.keyword_identical_QMARK_;
var expr__63532 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__63534 = cljs.core.cst$kw$syns_DASH_by_DASH_target;
var G__63535 = expr__63532;
return (pred__63531.cljs$core$IFn$_invoke$arity$2 ? pred__63531.cljs$core$IFn$_invoke$arity$2(G__63534,G__63535) : pred__63531.call(null,G__63534,G__63535));
})())){
return (new org.nfrac.comportex.synapses.SynapseGraph(G__63517,self__.targets_by_source,self__.pcon,self__.cull_zeros_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63536 = cljs.core.cst$kw$targets_DASH_by_DASH_source;
var G__63537 = expr__63532;
return (pred__63531.cljs$core$IFn$_invoke$arity$2 ? pred__63531.cljs$core$IFn$_invoke$arity$2(G__63536,G__63537) : pred__63531.call(null,G__63536,G__63537));
})())){
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,G__63517,self__.pcon,self__.cull_zeros_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63538 = cljs.core.cst$kw$pcon;
var G__63539 = expr__63532;
return (pred__63531.cljs$core$IFn$_invoke$arity$2 ? pred__63531.cljs$core$IFn$_invoke$arity$2(G__63538,G__63539) : pred__63531.call(null,G__63538,G__63539));
})())){
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,self__.targets_by_source,G__63517,self__.cull_zeros_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63540 = cljs.core.cst$kw$cull_DASH_zeros_QMARK_;
var G__63541 = expr__63532;
return (pred__63531.cljs$core$IFn$_invoke$arity$2 ? pred__63531.cljs$core$IFn$_invoke$arity$2(G__63540,G__63541) : pred__63531.call(null,G__63540,G__63541));
})())){
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,self__.targets_by_source,self__.pcon,G__63517,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,self__.targets_by_source,self__.pcon,self__.cull_zeros_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__63517),null));
}
}
}
}
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$syns_DASH_by_DASH_target,self__.syns_by_target],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$targets_DASH_by_DASH_source,self__.targets_by_source],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pcon,self__.pcon],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$cull_DASH_zeros_QMARK_,self__.cull_zeros_QMARK_],null))], null),self__.__extmap));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__63517){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.synapses.SynapseGraph(self__.syns_by_target,self__.targets_by_source,self__.pcon,self__.cull_zeros_QMARK_,G__63517,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.synapses.SynapseGraph.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.synapses.SynapseGraph.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$syns_DASH_by_DASH_target,cljs.core.cst$sym$targets_DASH_by_DASH_source,cljs.core.cst$sym$pcon,cljs.core.cst$sym$cull_DASH_zeros_QMARK_], null);
});

org.nfrac.comportex.synapses.SynapseGraph.cljs$lang$type = true;

org.nfrac.comportex.synapses.SynapseGraph.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.synapses/SynapseGraph");
});

org.nfrac.comportex.synapses.SynapseGraph.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.synapses/SynapseGraph");
});

org.nfrac.comportex.synapses.__GT_SynapseGraph = (function org$nfrac$comportex$synapses$__GT_SynapseGraph(syns_by_target,targets_by_source,pcon,cull_zeros_QMARK_){
return (new org.nfrac.comportex.synapses.SynapseGraph(syns_by_target,targets_by_source,pcon,cull_zeros_QMARK_,null,null,null));
});

org.nfrac.comportex.synapses.map__GT_SynapseGraph = (function org$nfrac$comportex$synapses$map__GT_SynapseGraph(G__63519){
return (new org.nfrac.comportex.synapses.SynapseGraph(cljs.core.cst$kw$syns_DASH_by_DASH_target.cljs$core$IFn$_invoke$arity$1(G__63519),cljs.core.cst$kw$targets_DASH_by_DASH_source.cljs$core$IFn$_invoke$arity$1(G__63519),cljs.core.cst$kw$pcon.cljs$core$IFn$_invoke$arity$1(G__63519),cljs.core.cst$kw$cull_DASH_zeros_QMARK_.cljs$core$IFn$_invoke$arity$1(G__63519),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63519,cljs.core.cst$kw$syns_DASH_by_DASH_target,cljs.core.array_seq([cljs.core.cst$kw$targets_DASH_by_DASH_source,cljs.core.cst$kw$pcon,cljs.core.cst$kw$cull_DASH_zeros_QMARK_], 0)),null));
});

org.nfrac.comportex.synapses.empty_synapse_graph = (function org$nfrac$comportex$synapses$empty_synapse_graph(n_targets,n_sources,pcon,cull_zeros_QMARK_){
return org.nfrac.comportex.synapses.map__GT_SynapseGraph(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,n_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,n_sources,cljs.core.cst$kw$syns_DASH_by_DASH_target,cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n_targets,cljs.core.PersistentArrayMap.EMPTY)),cljs.core.cst$kw$targets_DASH_by_DASH_source,cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n_sources,cljs.core.PersistentHashSet.EMPTY)),cljs.core.cst$kw$pcon,pcon,cljs.core.cst$kw$cull_DASH_zeros_QMARK_,cull_zeros_QMARK_], null));
});
org.nfrac.comportex.synapses.synapse_graph = (function org$nfrac$comportex$synapses$synapse_graph(syns_by_target,n_sources,pcon,cull_zeros_QMARK_){
var targets_by_source = cljs.core.persistent_BANG_(cljs.core.reduce_kv((function (v,target_id,syns){
var connect_ids = cljs.core.keep.cljs$core$IFn$_invoke$arity$2((function (p__63552){
var vec__63553 = p__63552;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63553,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63553,(1),null);
if((p >= pcon)){
return i;
} else {
return null;
}
}),syns);
return org.nfrac.comportex.util.update_each_BANG_(v,connect_ids,((function (connect_ids){
return (function (p1__63547_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__63547_SHARP_,target_id);
});})(connect_ids))
);
}),cljs.core.transient$(cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n_sources,cljs.core.PersistentHashSet.EMPTY))),syns_by_target));
return org.nfrac.comportex.synapses.map__GT_SynapseGraph(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.count(syns_by_target),cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,n_sources,cljs.core.cst$kw$syns_DASH_by_DASH_target,syns_by_target,cljs.core.cst$kw$targets_DASH_by_DASH_source,targets_by_source,cljs.core.cst$kw$pcon,pcon,cljs.core.cst$kw$cull_DASH_zeros_QMARK_,cull_zeros_QMARK_], null));
});
org.nfrac.comportex.synapses.synapse_graph_spec.cljs$core$IMultiFn$_add_method$arity$3(null,org.nfrac.comportex.synapses.SynapseGraph,(function (_){
return cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[cljs.core.PersistentVector.EMPTY,null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources);
})], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources))], null),null]));
}));
org.nfrac.comportex.synapses.seg_uidx = (function org$nfrac$comportex$synapses$seg_uidx(depth,max_segs,p__63556){
var vec__63560 = p__63556;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63560,(0),null);
var ci = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63560,(1),null);
var si = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63560,(2),null);
return ((((col * depth) * max_segs) + (ci * max_segs)) + si);
});
org.nfrac.comportex.synapses.seg_path = (function org$nfrac$comportex$synapses$seg_path(depth,max_segs,uidx){
var col = cljs.core.quot(uidx,(depth * max_segs));
var col_rem = cljs.core.rem(uidx,(depth * max_segs));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,cljs.core.quot(col_rem,max_segs),cljs.core.rem(col_rem,max_segs)], null);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.nfrac.comportex.synapses.PSynapseGraph}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {org.nfrac.comportex.synapses.PSegments}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.synapses.CellSegmentsSynapseGraph = (function (int_sg,n_cols,depth,max_segs,__meta,__extmap,__hash){
this.int_sg = int_sg;
this.n_cols = n_cols;
this.depth = depth;
this.max_segs = max_segs;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k63565,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__63567 = (((k63565 instanceof cljs.core.Keyword))?k63565.fqn:null);
switch (G__63567) {
case "int-sg":
return self__.int_sg;

break;
case "n-cols":
return self__.n_cols;

break;
case "depth":
return self__.depth;

break;
case "max-segs":
return self__.max_segs;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63565,else__9951__auto__);

}
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.synapses.CellSegmentsSynapseGraph{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$int_DASH_sg,self__.int_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_cols,self__.n_cols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$depth,self__.depth],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_segs,self__.max_segs],null))], null),self__.__extmap));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63564){
var self__ = this;
var G__63564__$1 = this;
return (new cljs.core.RecordIter((0),G__63564__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$int_DASH_sg,cljs.core.cst$kw$n_DASH_cols,cljs.core.cst$kw$depth,cljs.core.cst$kw$max_DASH_segs], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,self__.n_cols,self__.depth,self__.max_segs,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$ = true;

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$in_synapses$arity$2 = (function (_,target_id){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.synapses.in_synapses(self__.int_sg,org.nfrac.comportex.synapses.seg_uidx(self__.depth,self__.max_segs,target_id));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$sources_connected_to$arity$2 = (function (_,target_id){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(target_id)){
} else {
throw (new Error("Assert failed: target-id"));
}

return org.nfrac.comportex.synapses.sources_connected_to(self__.int_sg,org.nfrac.comportex.synapses.seg_uidx(self__.depth,self__.max_segs,target_id));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$targets_connected_from$arity$2 = (function (_,source_id){
var self__ = this;
var ___$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.synapses.seg_path,self__.depth,self__.max_segs),org.nfrac.comportex.synapses.targets_connected_from(self__.int_sg,source_id));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$excitations$arity$3 = (function (_,active_sources,stimulus_threshold){
var self__ = this;
var ___$1 = this;
var exc_m = org.nfrac.comportex.synapses.excitations(self__.int_sg,active_sources,stimulus_threshold);
return cljs.core.zipmap(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (exc_m,___$1){
return (function (i){
return org.nfrac.comportex.synapses.seg_path(self__.depth,self__.max_segs,i);
});})(exc_m,___$1))
,cljs.core.keys(exc_m)),cljs.core.vals(exc_m));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSynapseGraph$bulk_learn_STAR_$arity$6 = (function (this$,seg_updates,active_sources,pinc,pdec,pinit){
var self__ = this;
var this$__$1 = this;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$variadic(this$__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$int_DASH_sg], null),org.nfrac.comportex.synapses.bulk_learn,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (seg_up){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(seg_up,cljs.core.cst$kw$target_DASH_id,org.nfrac.comportex.synapses.seg_uidx(self__.depth,self__.max_segs,cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(seg_up)));
});})(this$__$1))
,seg_updates),active_sources,pinc,cljs.core.array_seq([pdec,pinit], 0));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$max_DASH_segs,null,cljs.core.cst$kw$n_DASH_cols,null,cljs.core.cst$kw$depth,null,cljs.core.cst$kw$int_DASH_sg,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,self__.n_cols,self__.depth,self__.max_segs,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__63564){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__63568 = cljs.core.keyword_identical_QMARK_;
var expr__63569 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__63571 = cljs.core.cst$kw$int_DASH_sg;
var G__63572 = expr__63569;
return (pred__63568.cljs$core$IFn$_invoke$arity$2 ? pred__63568.cljs$core$IFn$_invoke$arity$2(G__63571,G__63572) : pred__63568.call(null,G__63571,G__63572));
})())){
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(G__63564,self__.n_cols,self__.depth,self__.max_segs,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63573 = cljs.core.cst$kw$n_DASH_cols;
var G__63574 = expr__63569;
return (pred__63568.cljs$core$IFn$_invoke$arity$2 ? pred__63568.cljs$core$IFn$_invoke$arity$2(G__63573,G__63574) : pred__63568.call(null,G__63573,G__63574));
})())){
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,G__63564,self__.depth,self__.max_segs,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63575 = cljs.core.cst$kw$depth;
var G__63576 = expr__63569;
return (pred__63568.cljs$core$IFn$_invoke$arity$2 ? pred__63568.cljs$core$IFn$_invoke$arity$2(G__63575,G__63576) : pred__63568.call(null,G__63575,G__63576));
})())){
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,self__.n_cols,G__63564,self__.max_segs,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63577 = cljs.core.cst$kw$max_DASH_segs;
var G__63578 = expr__63569;
return (pred__63568.cljs$core$IFn$_invoke$arity$2 ? pred__63568.cljs$core$IFn$_invoke$arity$2(G__63577,G__63578) : pred__63568.call(null,G__63577,G__63578));
})())){
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,self__.n_cols,self__.depth,G__63564,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,self__.n_cols,self__.depth,self__.max_segs,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__63564),null));
}
}
}
}
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$int_DASH_sg,self__.int_sg],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_cols,self__.n_cols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$depth,self__.depth],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_segs,self__.max_segs],null))], null),self__.__extmap));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__63564){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(self__.int_sg,self__.n_cols,self__.depth,self__.max_segs,G__63564,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSegments$ = true;

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.prototype.org$nfrac$comportex$synapses$PSegments$cell_segments$arity$2 = (function (this$,cell_id){
var self__ = this;
var this$__$1 = this;
var cell_id__$1 = cljs.core.vec(cell_id);
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (cell_id__$1,this$__$1){
return (function (p1__63563_SHARP_){
return org.nfrac.comportex.synapses.in_synapses(this$__$1,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cell_id__$1,p1__63563_SHARP_));
});})(cell_id__$1,this$__$1))
,cljs.core.range.cljs$core$IFn$_invoke$arity$1(self__.max_segs));
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$int_DASH_sg,cljs.core.cst$sym$n_DASH_cols,cljs.core.cst$sym$depth,cljs.core.cst$sym$max_DASH_segs], null);
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.cljs$lang$type = true;

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.synapses/CellSegmentsSynapseGraph");
});

org.nfrac.comportex.synapses.CellSegmentsSynapseGraph.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.synapses/CellSegmentsSynapseGraph");
});

org.nfrac.comportex.synapses.__GT_CellSegmentsSynapseGraph = (function org$nfrac$comportex$synapses$__GT_CellSegmentsSynapseGraph(int_sg,n_cols,depth,max_segs){
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(int_sg,n_cols,depth,max_segs,null,null,null));
});

org.nfrac.comportex.synapses.map__GT_CellSegmentsSynapseGraph = (function org$nfrac$comportex$synapses$map__GT_CellSegmentsSynapseGraph(G__63566){
return (new org.nfrac.comportex.synapses.CellSegmentsSynapseGraph(cljs.core.cst$kw$int_DASH_sg.cljs$core$IFn$_invoke$arity$1(G__63566),cljs.core.cst$kw$n_DASH_cols.cljs$core$IFn$_invoke$arity$1(G__63566),cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(G__63566),cljs.core.cst$kw$max_DASH_segs.cljs$core$IFn$_invoke$arity$1(G__63566),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63566,cljs.core.cst$kw$int_DASH_sg,cljs.core.array_seq([cljs.core.cst$kw$n_DASH_cols,cljs.core.cst$kw$depth,cljs.core.cst$kw$max_DASH_segs], 0)),null));
});

/**
 * A synapse graph where the targets refer to distal dendrite
 *   segments on cells, which themselves are arranged in columns.
 *   Accordingly `target-id` is passed and returned not as an integer
 *   but as a 3-tuple `[col ci si]`, column id, cell id, segment id.
 *   Sources often refer to cells but are passed and returned as
 *   **integers**, so any conversion to/from cell ids should happen
 *   externally.
 */
org.nfrac.comportex.synapses.cell_segs_synapse_graph = (function org$nfrac$comportex$synapses$cell_segs_synapse_graph(n_cols,depth,max_segs,n_sources,pcon,cull_zeros_QMARK_){
var n_targets = ((n_cols * depth) * max_segs);
var int_sg = org.nfrac.comportex.synapses.empty_synapse_graph(n_targets,n_sources,pcon,cull_zeros_QMARK_);
return org.nfrac.comportex.synapses.map__GT_CellSegmentsSynapseGraph(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,n_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,n_sources,cljs.core.cst$kw$pcon,pcon,cljs.core.cst$kw$int_DASH_sg,int_sg,cljs.core.cst$kw$depth,depth,cljs.core.cst$kw$max_DASH_segs,max_segs], null));
});
/**
 * A synapse graph where the targets refer to proximal dendrite
 *   segments on columns.  Accordingly `target-id` is passed and returned
 *   not as an integer but as a 3-tuple `[col 0 si]`, column id, (cell = 0),
 *   segment id.  Sources often refer to cells but are passed and
 *   returned as **integers**, so any conversion to/from cell ids should
 *   happen externally.  Initial synapses are given for each segment.
 */
org.nfrac.comportex.synapses.col_segs_synapse_graph = (function org$nfrac$comportex$synapses$col_segs_synapse_graph(syns_by_col,n_cols,max_segs,n_sources,pcon,cull_zeros_QMARK_){
var n_targets = (n_cols * max_segs);
var int_syns_by_target = cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (n_targets){
return (function (v,p__63584){
var vec__63585 = p__63584;
var col = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63585,(0),null);
var syns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63585,(1),null);
var path = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [col,(0),(0)], null);
var i = org.nfrac.comportex.synapses.seg_uidx((1),max_segs,path);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(v,i,syns);
});})(n_targets))
,cljs.core.transient$(cljs.core.vec(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2(n_targets,cljs.core.PersistentArrayMap.EMPTY))),cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,syns_by_col)));
var int_sg = org.nfrac.comportex.synapses.synapse_graph(int_syns_by_target,n_sources,pcon,cull_zeros_QMARK_);
return org.nfrac.comportex.synapses.map__GT_CellSegmentsSynapseGraph(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,n_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources,n_sources,cljs.core.cst$kw$pcon,pcon,cljs.core.cst$kw$int_DASH_sg,int_sg,cljs.core.cst$kw$depth,(1),cljs.core.cst$kw$max_DASH_segs,max_segs], null));
});
org.nfrac.comportex.synapses.synapse_graph_spec.cljs$core$IMultiFn$_add_method$arity$3(null,org.nfrac.comportex.synapses.CellSegmentsSynapseGraph,(function (_){
return cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[cljs.core.PersistentVector.EMPTY,null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources);
})], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_targets)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$org$nfrac$comportex$synapses_SLASH_n_DASH_synapse_DASH_sources))], null),null]));
}));
