// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.core');
goog.require('cljs.core');
goog.require('clojure.set');
goog.require('cljs.spec');
goog.require('cljs.spec.impl.gen');
goog.require('org.nfrac.comportex.util.algo_graph');
goog.require('org.nfrac.comportex.topography');
goog.require('org.nfrac.comportex.util');
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)))))),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(2048),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((2048) - (1))], null)], 0));
}),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.cst$kw$distinct,true),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$distinct,true,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits_DASH_set,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_set_QMARK_),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$kind,cljs.core.set_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_set_QMARK_], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47623_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$p1__47623_SHARP_,cljs.core.cst$kw$bits))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$bits))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$sym$keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits], null)),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.map_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_], null),null),(function (p1__47623_SHARP_){
return cljs.core.contains_QMARK_(p1__47623_SHARP_,cljs.core.cst$kw$bits);
})], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_topo,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47624_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__GT__EQ_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size,cljs.core.cst$sym$p1__47624_SHARP_),(1)))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__GT__EQ_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size,cljs.core.cst$sym$_PERCENT_),(1)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,(function (p1__47624_SHARP_){
return (org.nfrac.comportex.topography.size(p1__47624_SHARP_) >= (1));
})], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography);
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography);
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_embedding,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_topo], null)),cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_topo], null),null,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$ff_DASH_topo);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$fb_DASH_topo);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$lat_DASH_topo);
})], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_topo,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_topo], null),null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_topo,cljs.core.cst$kw$fb_DASH_topo,cljs.core.cst$kw$lat_DASH_topo], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$ff_DASH_topo)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$fb_DASH_topo)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$lat_DASH_topo))], null),null])));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_timestep,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.nat_int_QMARK_);

/**
 * @interface
 */
org.nfrac.comportex.core.PTemporal = function(){};

org.nfrac.comportex.core.timestep = (function org$nfrac$comportex$core$timestep(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PTemporal$timestep$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PTemporal$timestep$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.timestep[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.timestep["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTemporal.timestep",this$);
}
}
}
});


/**
 * @interface
 */
org.nfrac.comportex.core.PParameterised = function(){};

/**
 * A parameter set as map with keyword keys.
 */
org.nfrac.comportex.core.params = (function org$nfrac$comportex$core$params(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PParameterised$params$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PParameterised$params$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.params[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.params["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PParameterised.params",this$);
}
}
}
});


/**
 * @interface
 */
org.nfrac.comportex.core.PTopographic = function(){};

org.nfrac.comportex.core.topography = (function org$nfrac$comportex$core$topography(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PTopographic$topography$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PTopographic$topography$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.topography[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.topography["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTopographic.topography",this$);
}
}
}
});

/**
 * The dimensions of a topography as an n-tuple vector.
 */
org.nfrac.comportex.core.dims_of = (function org$nfrac$comportex$core$dims_of(x){
return org.nfrac.comportex.topography.dimensions(org.nfrac.comportex.core.topography(x));
});
/**
 * The total number of elements in a topography.
 */
org.nfrac.comportex.core.size_of = (function org$nfrac$comportex$core$size_of(x){
return org.nfrac.comportex.topography.size(org.nfrac.comportex.core.topography(x));
});

/**
 * A network of layers and senses, forming Hierarchical Temporal Memory.
 * @interface
 */
org.nfrac.comportex.core.PHTM = function(){};

/**
 * Takes an input value. Updates the HTM's senses by applying
 *  corresponding sensors to the input value. `mode` may be
 *  :ff or :lat to update only senses with those deps, or nil to update
 *  all. Also updates :input-value. Returns updated HTM.
 */
org.nfrac.comportex.core.htm_sense = (function org$nfrac$comportex$core$htm_sense(this$,inval,mode){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PHTM$htm_sense$arity$3 == null)))){
return this$.org$nfrac$comportex$core$PHTM$htm_sense$arity$3(this$,inval,mode);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.htm_sense[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,inval,mode) : m__9992__auto__.call(null,this$,inval,mode));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.htm_sense["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,inval,mode) : m__9992__auto____$1.call(null,this$,inval,mode));
} else {
throw cljs.core.missing_protocol("PHTM.htm-sense",this$);
}
}
}
});

/**
 * Propagates feed-forward input through the network to activate
 *  columns and cells. Assumes senses have already been encoded, with
 *  `htm-sense`. Increments the time step. Returns updated HTM.
 */
org.nfrac.comportex.core.htm_activate = (function org$nfrac$comportex$core$htm_activate(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PHTM$htm_activate$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PHTM$htm_activate$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.htm_activate[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.htm_activate["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PHTM.htm-activate",this$);
}
}
}
});

/**
 * Applies learning rules to synapses. Assumes `this` has been through
 *  the `htm-activate` phase already. Returns updated HTM.
 */
org.nfrac.comportex.core.htm_learn = (function org$nfrac$comportex$core$htm_learn(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PHTM$htm_learn$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PHTM$htm_learn$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.htm_learn[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.htm_learn["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PHTM.htm-learn",this$);
}
}
}
});

/**
 * Propagates lateral and feed-back activity to put cells into a
 *  depolarised (predictive) state. Assumes `this` has been through
 *  the `htm-activate` phase already. Returns updated HTM.
 */
org.nfrac.comportex.core.htm_depolarise = (function org$nfrac$comportex$core$htm_depolarise(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PHTM$htm_depolarise$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PHTM$htm_depolarise$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.htm_depolarise[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.htm_depolarise["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PHTM.htm-depolarise",this$);
}
}
}
});

/**
 * Advances a HTM by a full time step with the given input value. Just
 *   (-> htm (htm-sense inval nil) htm-activate htm-learn htm-depolarise)
 */
org.nfrac.comportex.core.htm_step = (function org$nfrac$comportex$core$htm_step(htm,inval){
return org.nfrac.comportex.core.htm_depolarise(org.nfrac.comportex.core.htm_learn(org.nfrac.comportex.core.htm_activate(org.nfrac.comportex.core.htm_sense(htm,inval,null))));
});

/**
 * Neural information sources with a bit set representation. Could be
 *   an encoded sense or a layer (where cells are bits).
 * @interface
 */
org.nfrac.comportex.core.PSignalSource = function(){};

org.nfrac.comportex.core.signal_STAR_ = (function org$nfrac$comportex$core$signal_STAR_(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PSignalSource$signal_STAR_$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PSignalSource$signal_STAR_$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.signal_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.signal_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PSignalSource.signal*",this$);
}
}
}
});

org.nfrac.comportex.core.signal = (function org$nfrac$comportex$core$signal(this$){
return org.nfrac.comportex.core.signal_STAR_(this$);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$this,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$this,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$this], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.any_QMARK_], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$this,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,null,null,null));

/**
 * @interface
 */
org.nfrac.comportex.core.PLayer = function(){};

org.nfrac.comportex.core.layer_embed_STAR_ = (function org$nfrac$comportex$core$layer_embed_STAR_(this$,embedding){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PLayer$layer_embed_STAR_$arity$2 == null)))){
return this$.org$nfrac$comportex$core$PLayer$layer_embed_STAR_$arity$2(this$,embedding);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.layer_embed_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,embedding) : m__9992__auto__.call(null,this$,embedding));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.layer_embed_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,embedding) : m__9992__auto____$1.call(null,this$,embedding));
} else {
throw cljs.core.missing_protocol("PLayer.layer-embed*",this$);
}
}
}
});

org.nfrac.comportex.core.layer_activate_STAR_ = (function org$nfrac$comportex$core$layer_activate_STAR_(this$,ff_signal){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PLayer$layer_activate_STAR_$arity$2 == null)))){
return this$.org$nfrac$comportex$core$PLayer$layer_activate_STAR_$arity$2(this$,ff_signal);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.layer_activate_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,ff_signal) : m__9992__auto__.call(null,this$,ff_signal));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.layer_activate_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ff_signal) : m__9992__auto____$1.call(null,this$,ff_signal));
} else {
throw cljs.core.missing_protocol("PLayer.layer-activate*",this$);
}
}
}
});

org.nfrac.comportex.core.layer_learn_STAR_ = (function org$nfrac$comportex$core$layer_learn_STAR_(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PLayer$layer_learn_STAR_$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PLayer$layer_learn_STAR_$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.layer_learn_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.layer_learn_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PLayer.layer-learn*",this$);
}
}
}
});

org.nfrac.comportex.core.layer_depolarise_STAR_ = (function org$nfrac$comportex$core$layer_depolarise_STAR_(this$,fb_signal,lat_signal){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PLayer$layer_depolarise_STAR_$arity$3 == null)))){
return this$.org$nfrac$comportex$core$PLayer$layer_depolarise_STAR_$arity$3(this$,fb_signal,lat_signal);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.layer_depolarise_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,fb_signal,lat_signal) : m__9992__auto__.call(null,this$,fb_signal,lat_signal));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.layer_depolarise_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,fb_signal,lat_signal) : m__9992__auto____$1.call(null,this$,fb_signal,lat_signal));
} else {
throw cljs.core.missing_protocol("PLayer.layer-depolarise*",this$);
}
}
}
});

org.nfrac.comportex.core.layer_state_STAR_ = (function org$nfrac$comportex$core$layer_state_STAR_(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PLayer$layer_state_STAR_$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PLayer$layer_state_STAR_$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.layer_state_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.layer_state_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PLayer.layer-state*",this$);
}
}
}
});

org.nfrac.comportex.core.layer_decode_to_ff_bits_STAR_ = (function org$nfrac$comportex$core$layer_decode_to_ff_bits_STAR_(this$,opts){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PLayer$layer_decode_to_ff_bits_STAR_$arity$2 == null)))){
return this$.org$nfrac$comportex$core$PLayer$layer_decode_to_ff_bits_STAR_$arity$2(this$,opts);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.layer_decode_to_ff_bits_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,opts) : m__9992__auto__.call(null,this$,opts));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.layer_decode_to_ff_bits_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,opts) : m__9992__auto____$1.call(null,this$,opts));
} else {
throw cljs.core.missing_protocol("PLayer.layer-decode-to-ff-bits*",this$);
}
}
}
});

if(typeof org.nfrac.comportex.core.layer_spec !== 'undefined'){
} else {
org.nfrac.comportex.core.layer_spec = (function (){var method_table__10301__auto__ = (function (){var G__47625 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47625) : cljs.core.atom.call(null,G__47625));
})();
var prefer_table__10302__auto__ = (function (){var G__47626 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47626) : cljs.core.atom.call(null,G__47626));
})();
var method_cache__10303__auto__ = (function (){var G__47627 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47627) : cljs.core.atom.call(null,G__47627));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__47628 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47628) : cljs.core.atom.call(null,G__47628));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("org.nfrac.comportex.core","layer-spec"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47629_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_PLayer,cljs.core.cst$sym$p1__47629_SHARP_)),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47630_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$p1__47630_SHARP_,cljs.core.cst$kw$embedding))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_PLayer,cljs.core.cst$sym$_PERCENT_)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$embedding))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_spec,new cljs.core.Var(function(){return org.nfrac.comportex.core.layer_spec;},cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_spec,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$file,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$arglists,cljs.core.cst$kw$doc,cljs.core.cst$kw$test],[cljs.core.cst$sym$org$nfrac$comportex$core,cljs.core.cst$sym$layer_DASH_spec,"public/demos/out/org/nfrac/comportex/core.cljc",21,1,111,111,cljs.core.List.EMPTY,null,(cljs.core.truth_(org.nfrac.comportex.core.layer_spec)?org.nfrac.comportex.core.layer_spec.cljs$lang$test:null)])),cljs.core.cst$kw$gen_DASH_type),(function (p1__47629_SHARP_){
if(!((p1__47629_SHARP_ == null))){
if((false) || (p1__47629_SHARP_.org$nfrac$comportex$core$PLayer$)){
return true;
} else {
if((!p1__47629_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.core.PLayer,p1__47629_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.core.PLayer,p1__47629_SHARP_);
}
}),(function (p1__47630_SHARP_){
return cljs.core.contains_QMARK_(p1__47630_SHARP_,cljs.core.cst$kw$embedding);
})], null),null));
if(typeof org.nfrac.comportex.core.layer_unembedded_spec !== 'undefined'){
} else {
org.nfrac.comportex.core.layer_unembedded_spec = (function (){var method_table__10301__auto__ = (function (){var G__47632 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47632) : cljs.core.atom.call(null,G__47632));
})();
var prefer_table__10302__auto__ = (function (){var G__47633 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47633) : cljs.core.atom.call(null,G__47633));
})();
var method_cache__10303__auto__ = (function (){var G__47634 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47634) : cljs.core.atom.call(null,G__47634));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__47635 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47635) : cljs.core.atom.call(null,G__47635));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("org.nfrac.comportex.core","layer-unembedded-spec"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded_DASH_spec,new cljs.core.Var(function(){return org.nfrac.comportex.core.layer_unembedded_spec;},cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded_DASH_spec,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$file,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$arglists,cljs.core.cst$kw$doc,cljs.core.cst$kw$test],[cljs.core.cst$sym$org$nfrac$comportex$core,cljs.core.cst$sym$layer_DASH_unembedded_DASH_spec,"public/demos/out/org/nfrac/comportex/core.cljc",32,1,116,116,cljs.core.List.EMPTY,null,(cljs.core.truth_(org.nfrac.comportex.core.layer_unembedded_spec)?org.nfrac.comportex.core.layer_unembedded_spec.cljs$lang$test:null)])),cljs.core.cst$kw$gen_DASH_type));
/**
 * Allows a layer to configure itself to expect the given input topographies
 *   on feed-forward, feed-back and lateral signals. To be applied before run.
 */
org.nfrac.comportex.core.layer_embed = (function org$nfrac$comportex$core$layer_embed(this$,embedding){
return org.nfrac.comportex.core.layer_embed_STAR_(this$,embedding);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_embed,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded,cljs.core.cst$kw$embedding,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_embedding),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded,cljs.core.cst$kw$embedding,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_embedding),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer,cljs.core.cst$kw$embedding], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_embedding], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_embedding], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded,cljs.core.cst$kw$embedding,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_embedding),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null,null));
org.nfrac.comportex.core.layer_activate = (function org$nfrac$comportex$core$layer_activate(this$,ff_signal){
return org.nfrac.comportex.core.layer_activate_STAR_(this$,ff_signal);
});
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_activate_DASH_args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$ff_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n_DASH_in,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$layer,cljs.core.cst$kw$embedding,cljs.core.cst$kw$ff_DASH_topo,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size)], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47636_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.cst$sym$p1__47636_SHARP_,cljs.core.cst$sym$n_DASH_in)),cljs.core.list(cljs.core.cst$kw$bits,cljs.core.list(cljs.core.cst$kw$ff_DASH_signal,cljs.core.cst$sym$v)))))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$ff_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n_DASH_in,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$layer,cljs.core.cst$kw$embedding,cljs.core.cst$kw$ff_DASH_topo,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size)], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47636_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.cst$sym$p1__47636_SHARP_,cljs.core.cst$sym$n_DASH_in)),cljs.core.list(cljs.core.cst$kw$bits,cljs.core.list(cljs.core.cst$kw$ff_DASH_signal,cljs.core.cst$sym$v)))))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer,cljs.core.cst$kw$ff_DASH_signal], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal], null)),(function (v){
var n_in = org.nfrac.comportex.topography.size(cljs.core.cst$kw$ff_DASH_topo.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$embedding.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$layer.cljs$core$IFn$_invoke$arity$1(v))));
return cljs.core.every_QMARK_(((function (n_in){
return (function (p1__47636_SHARP_){
return (p1__47636_SHARP_ < n_in);
});})(n_in))
,cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$ff_DASH_signal.cljs$core$IFn$_invoke$arity$1(v)));
})], null),null));
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_activate,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_activate_DASH_args,cljs.core.cst$kw$fn,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47637_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$p1__47637_SHARP_)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_inc,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$p1__47637_SHARP_,cljs.core.cst$kw$args,cljs.core.cst$kw$layer)))))),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_activate_DASH_args,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_activate_DASH_args,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_activate_DASH_args,cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47637_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$p1__47637_SHARP_)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_inc,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$p1__47637_SHARP_,cljs.core.cst$kw$args,cljs.core.cst$kw$layer)))))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$_PERCENT_)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_inc,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$args,cljs.core.cst$kw$layer)))))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (p1__47637_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.timestep(cljs.core.cst$kw$ret.cljs$core$IFn$_invoke$arity$1(p1__47637_SHARP_)),(org.nfrac.comportex.core.timestep(cljs.core.cst$kw$layer.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(p1__47637_SHARP_))) + (1)));
})], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47637_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$p1__47637_SHARP_)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_inc,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_timestep,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$p1__47637_SHARP_,cljs.core.cst$kw$args,cljs.core.cst$kw$layer)))))),null));
org.nfrac.comportex.core.layer_learn = (function org$nfrac$comportex$core$layer_learn(this$){
return org.nfrac.comportex.core.layer_learn_STAR_(this$);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_learn,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null,null));
org.nfrac.comportex.core.layer_depolarise = (function org$nfrac$comportex$core$layer_depolarise(this$,fb_signal,lat_signal){
return org.nfrac.comportex.core.layer_depolarise_STAR_(this$,fb_signal,lat_signal);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_depolarise,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$fb_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$lat_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$fb_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$lat_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer,cljs.core.cst$kw$fb_DASH_signal,cljs.core.cst$kw$lat_DASH_signal], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$fb_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$lat_DASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,null,null,null));
/**
 * The current information content of a layer, including the sets of active and
 *   predicted cells. This is a generic view to work with different implementations.
 */
org.nfrac.comportex.core.layer_state = (function org$nfrac$comportex$core$layer_state(layer){
return org.nfrac.comportex.core.layer_state_STAR_(layer);
});
/**
 * Converts the current predictive state of layer (by default) into a distribution
 *   of feed-forward input bits that matches it.
 */
org.nfrac.comportex.core.layer_decode_to_ff_bits = (function org$nfrac$comportex$core$layer_decode_to_ff_bits(layer,opts){
return org.nfrac.comportex.core.layer_decode_to_ff_bits_STAR_(layer,opts);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_layer_DASH_decode_DASH_to_DASH_ff_DASH_bits,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$opts,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys)),cljs.core.cst$kw$ret,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0)))),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$opts,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys)),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer,cljs.core.cst$kw$opts], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[null,null,null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_], null),cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY,null,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_], null),null]))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys)], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layer,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer,cljs.core.cst$kw$opts,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys)),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,org.nfrac.comportex.util.spec_finite.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$min,(0)], 0))], null)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))),null,null,null));

/**
 * Pulls out a value according to some pattern, like a path or lens.
 *   Should be serializable. A Sensor is defined as [Selector Encoder].
 * @interface
 */
org.nfrac.comportex.core.PSelector = function(){};

/**
 * Extracts a value from `state` according to some configured pattern. A
 *  simple example is a lookup by keyword in a map.
 */
org.nfrac.comportex.core.extract = (function org$nfrac$comportex$core$extract(this$,state){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PSelector$extract$arity$2 == null)))){
return this$.org$nfrac$comportex$core$PSelector$extract$arity$2(this$,state);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.extract[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,state) : m__9992__auto__.call(null,this$,state));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.extract["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,state) : m__9992__auto____$1.call(null,this$,state));
} else {
throw cljs.core.missing_protocol("PSelector.extract",this$);
}
}
}
});

cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_selector,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_PSelector,cljs.core.cst$sym$_PERCENT_)),(function (p1__47638_SHARP_){
if(!((p1__47638_SHARP_ == null))){
if((false) || (p1__47638_SHARP_.org$nfrac$comportex$core$PSelector$)){
return true;
} else {
if((!p1__47638_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.core.PSelector,p1__47638_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.core.PSelector,p1__47638_SHARP_);
}
}));

/**
 * Encoders need to extend this together with PTopographic.
 * @interface
 */
org.nfrac.comportex.core.PEncoder = function(){};

org.nfrac.comportex.core.encode_STAR_ = (function org$nfrac$comportex$core$encode_STAR_(this$,x){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PEncoder$encode_STAR_$arity$2 == null)))){
return this$.org$nfrac$comportex$core$PEncoder$encode_STAR_$arity$2(this$,x);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.encode_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,x) : m__9992__auto__.call(null,this$,x));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.encode_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,x) : m__9992__auto____$1.call(null,this$,x));
} else {
throw cljs.core.missing_protocol("PEncoder.encode*",this$);
}
}
}
});

org.nfrac.comportex.core.decode_STAR_ = (function org$nfrac$comportex$core$decode_STAR_(this$,bit_votes,n){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PEncoder$decode_STAR_$arity$3 == null)))){
return this$.org$nfrac$comportex$core$PEncoder$decode_STAR_$arity$3(this$,bit_votes,n);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.decode_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,bit_votes,n) : m__9992__auto__.call(null,this$,bit_votes,n));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.decode_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,bit_votes,n) : m__9992__auto____$1.call(null,this$,bit_votes,n));
} else {
throw cljs.core.missing_protocol("PEncoder.decode*",this$);
}
}
}
});

org.nfrac.comportex.core.input_generator = (function org$nfrac$comportex$core$input_generator(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PEncoder$input_generator$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PEncoder$input_generator$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.input_generator[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.input_generator["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PEncoder.input-generator",this$);
}
}
}
});

if(typeof org.nfrac.comportex.core.encoder_spec !== 'undefined'){
} else {
org.nfrac.comportex.core.encoder_spec = (function (){var method_table__10301__auto__ = (function (){var G__47640 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47640) : cljs.core.atom.call(null,G__47640));
})();
var prefer_table__10302__auto__ = (function (){var G__47641 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47641) : cljs.core.atom.call(null,G__47641));
})();
var method_cache__10303__auto__ = (function (){var G__47642 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47642) : cljs.core.atom.call(null,G__47642));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__47643 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__47643) : cljs.core.atom.call(null,G__47643));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("org.nfrac.comportex.core","encoder-spec"),cljs.core.type,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_encoder_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47644_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_PEncoder,cljs.core.cst$sym$p1__47644_SHARP_))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_multi_DASH_spec,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_encoder_DASH_spec,cljs.core.cst$kw$gen_DASH_type),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_PEncoder,cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.multi_spec_impl.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_encoder_DASH_spec,new cljs.core.Var(function(){return org.nfrac.comportex.core.encoder_spec;},cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_encoder_DASH_spec,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ns,cljs.core.cst$kw$name,cljs.core.cst$kw$file,cljs.core.cst$kw$end_DASH_column,cljs.core.cst$kw$column,cljs.core.cst$kw$line,cljs.core.cst$kw$end_DASH_line,cljs.core.cst$kw$arglists,cljs.core.cst$kw$doc,cljs.core.cst$kw$test],[cljs.core.cst$sym$org$nfrac$comportex$core,cljs.core.cst$sym$encoder_DASH_spec,"public/demos/out/org/nfrac/comportex/core.cljc",23,1,203,203,cljs.core.List.EMPTY,null,(cljs.core.truth_(org.nfrac.comportex.core.encoder_spec)?org.nfrac.comportex.core.encoder_spec.cljs$lang$test:null)])),cljs.core.cst$kw$gen_DASH_type),(function (p1__47644_SHARP_){
if(!((p1__47644_SHARP_ == null))){
if((false) || (p1__47644_SHARP_.org$nfrac$comportex$core$PEncoder$)){
return true;
} else {
if((!p1__47644_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.core.PEncoder,p1__47644_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.core.PEncoder,p1__47644_SHARP_);
}
})], null),null));
/**
 * Encodes `x` as a collection of distinct integers which are the on-bits.
 */
org.nfrac.comportex.core.encode = (function org$nfrac$comportex$core$encode(encoder,x){
return org.nfrac.comportex.core.encode_STAR_(encoder,x);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_encode,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$kw$x,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_bind,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$e], null),cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_tuple,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_return,cljs.core.cst$sym$e),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_input_DASH_generator,cljs.core.cst$sym$e))))))),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits,cljs.core.cst$kw$fn,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$w,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$args,cljs.core.cst$kw$encoder,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_size_DASH_of)], null),cljs.core.list(cljs.core.cst$sym$if,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$args,cljs.core.cst$kw$x)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_empty_QMARK_,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)),cljs.core.cst$sym$w),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47646_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.cst$sym$p1__47646_SHARP_,cljs.core.cst$sym$w)),cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v))))))),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$kw$x,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_bind,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$e], null),cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_tuple,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_return,cljs.core.cst$sym$e),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_input_DASH_generator,cljs.core.cst$sym$e))))))),cljs.spec.with_gen(cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$encoder,cljs.core.cst$kw$x], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.any_QMARK_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_], null)),(function (){
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder),(function (e){
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([e], 0)),org.nfrac.comportex.core.input_generator(e)], 0));
})], 0));
})),null,null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$kw$x,cljs.core.cst$sym$cljs$core_SLASH_any_QMARK_),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_bind,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$e], null),cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_tuple,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_return,cljs.core.cst$sym$e),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_input_DASH_generator,cljs.core.cst$sym$e))))))),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bits,cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$w,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$args,cljs.core.cst$kw$encoder,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_size_DASH_of)], null),cljs.core.list(cljs.core.cst$sym$if,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$args,cljs.core.cst$kw$x)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_empty_QMARK_,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)),cljs.core.cst$sym$w),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47646_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.cst$sym$p1__47646_SHARP_,cljs.core.cst$sym$w)),cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)))))),(function (v){
var w = org.nfrac.comportex.core.size_of(cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(v)));
if((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(v)) == null)){
return cljs.core.empty_QMARK_(cljs.core.cst$kw$ret.cljs$core$IFn$_invoke$arity$1(v));
} else {
return ((cljs.core.count(cljs.core.cst$kw$ret.cljs$core$IFn$_invoke$arity$1(v)) <= w)) && (cljs.core.every_QMARK_(((function (w){
return (function (p1__47646_SHARP_){
return (p1__47646_SHARP_ < w);
});})(w))
,cljs.core.cst$kw$ret.cljs$core$IFn$_invoke$arity$1(v)));
}
}),null,null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$v], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$w,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$args,cljs.core.cst$kw$encoder,cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_size_DASH_of)], null),cljs.core.list(cljs.core.cst$sym$if,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_nil_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$v,cljs.core.cst$kw$args,cljs.core.cst$kw$x)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_empty_QMARK_,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)),cljs.core.cst$sym$w),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47646_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.cst$sym$p1__47646_SHARP_,cljs.core.cst$sym$w)),cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$v)))))),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$selector,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_selector,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$selector,cljs.core.cst$kw$encoder], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_selector,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_selector,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder], null)));
/**
 * Finds `n` domain values matching the given bit set in a sequence
 *   of maps with keys `:value`, `:votes-frac`, `:votes-per-bit`,
 *   `:bit-coverage`, `:bit-precision`, ordered by votes fraction
 *   decreasing. The argument `bit-votes` is a map from encoded bit
 *   index to a number of votes, typically the number of synapse
 *   connections from predictive cells.
 */
org.nfrac.comportex.core.decode = (function org$nfrac$comportex$core$decode(encoder,bit_votes,n){
return org.nfrac.comportex.core.decode_STAR_(encoder,bit_votes,n);
});
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_number_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_complement,cljs.core.cst$sym$cljs$core_SLASH_neg_QMARK_)),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_number_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_complement,cljs.core.cst$sym$cljs$core_SLASH_neg_QMARK_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.number_QMARK_,cljs.core.complement(cljs.core.neg_QMARK_)], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_number_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_complement,cljs.core.cst$sym$cljs$core_SLASH_neg_QMARK_)),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_number_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_complement,cljs.core.cst$sym$cljs$core_SLASH_neg_QMARK_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.number_QMARK_,cljs.core.complement(cljs.core.neg_QMARK_)], null),null));
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_decode,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$kw$bit_DASH_votes,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.core.cst$kw$n,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(1000))),cljs.core.cst$kw$ret,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage], null)))),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$kw$bit_DASH_votes,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.core.cst$kw$n,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(1000))),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$encoder,cljs.core.cst$kw$bit_DASH_votes,cljs.core.cst$kw$n], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,org.nfrac.comportex.util.spec_finite.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$min,(0)], 0))], null)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(1000),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(1000),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(1000),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((1000) - (1))], null)], 0));
}),null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(1000))], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$encoder,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_encoder,cljs.core.cst$kw$bit_DASH_votes,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every_DASH_kv,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$util_SLASH_spec_DASH_finite,cljs.core.cst$kw$min,(0))),cljs.core.cst$kw$n,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(1000))),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage], null))),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$s_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage], null)),cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage], null),null,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$votes_DASH_frac);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$bit_DASH_coverage);
})], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$votes_DASH_frac,cljs.core.cst$kw$bit_DASH_coverage], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$votes_DASH_frac)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$bit_DASH_coverage))], null),null])),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_votes_DASH_frac,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_bit_DASH_coverage], null))),null,null,null));

/**
 * @interface
 */
org.nfrac.comportex.core.PRestartable = function(){};

/**
 * Returns this model (or model component) reverted to its initial
 *  state prior to any learning.
 */
org.nfrac.comportex.core.restart = (function org$nfrac$comportex$core$restart(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PRestartable$restart$arity$1 == null)))){
return this$.org$nfrac$comportex$core$PRestartable$restart$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.restart[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.restart["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PRestartable.restart",this$);
}
}
}
});


/**
 * @interface
 */
org.nfrac.comportex.core.PInterruptable = function(){};

/**
 * Returns this model (or model component) without its current
 *  sequence state, forcing the following input to be treated as a new
 *  sequence. `mode` can be
 * 
 *  * :tm, cancels any distal predictions and prevents learning
 *    lateral/distal connections.
 *  * :fb, cancels any feedback predictions and prevents learning
 *    connections on apical dendrites.
 *  * :syns, cancels any continuing stable synapses used for temporal
 *    pooling in any higher layers (not `this` layer).
 *  * :winners, allows new winner cells to be chosen in continuing
 *    columns.
 */
org.nfrac.comportex.core.break$ = (function org$nfrac$comportex$core$break(this$,mode){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$core$PInterruptable$break$arity$2 == null)))){
return this$.org$nfrac$comportex$core$PInterruptable$break$arity$2(this$,mode);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.core.break$[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,mode) : m__9992__auto__.call(null,this$,mode));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.core.break$["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,mode) : m__9992__auto____$1.call(null,this$,mode));
} else {
throw cljs.core.missing_protocol("PInterruptable.break",this$);
}
}
}
});

cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.keyword_QMARK_);
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_sequential_QMARK_)),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.list(cljs.core.cst$sym$s_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$kind,cljs.core.cst$sym$sequential_QMARK_)),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_sequential_QMARK_)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.sequential_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_sequential_QMARK_], null),null)], null)),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.map_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps);
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps);
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps], null),cljs.core.cst$kw$opt_DASH_un,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps], null)),cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps], null),null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$ff_DASH_deps);
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fb_DASH_deps,cljs.core.cst$kw$lat_DASH_deps], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps], null),null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_deps], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$ff_DASH_deps))], null),null])));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_strata,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_set_QMARK_)),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$s_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$kind,cljs.core.cst$sym$set_QMARK_),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.set_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_set_QMARK_], null),null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensors,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$sym$keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor], null)),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.map_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_], null),null));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_keys,cljs.core.cst$kw$req_DASH_un,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_strata,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layers,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensors,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_senses], null)),cljs.spec.map_spec_impl(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$req_DASH_un,cljs.core.cst$kw$opt_DASH_un,cljs.core.cst$kw$gfn,cljs.core.cst$kw$pred_DASH_exprs,cljs.core.cst$kw$opt_DASH_keys,cljs.core.cst$kw$req_DASH_specs,cljs.core.cst$kw$req,cljs.core.cst$kw$req_DASH_keys,cljs.core.cst$kw$opt_DASH_specs,cljs.core.cst$kw$pred_DASH_forms,cljs.core.cst$kw$opt],[new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_strata,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layers,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensors,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_senses], null),null,null,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map_QMARK_,(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$ff_DASH_deps);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$fb_DASH_deps);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$lat_DASH_deps);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$strata);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$layers);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$sensors);
}),(function (p1__46250__46251__auto__){
return cljs.core.contains_QMARK_(p1__46250__46251__auto__,cljs.core.cst$kw$senses);
})], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_ff_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_fb_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_lat_DASH_deps,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_strata,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layers,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensors,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_senses], null),null,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_deps,cljs.core.cst$kw$fb_DASH_deps,cljs.core.cst$kw$lat_DASH_deps,cljs.core.cst$kw$strata,cljs.core.cst$kw$layers,cljs.core.cst$kw$sensors,cljs.core.cst$kw$senses], null),cljs.core.PersistentVector.EMPTY,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$ff_DASH_deps)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$fb_DASH_deps)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$lat_DASH_deps)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$strata)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$layers)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$sensors)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_contains_QMARK_,cljs.core.cst$sym$_PERCENT_,cljs.core.cst$kw$senses))], null),null])));

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.nfrac.comportex.core.PSignalSource}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.nfrac.comportex.core.PTopographic}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.core.SenseNode = (function (topography,bits,__meta,__extmap,__hash){
this.topography = topography;
this.bits = bits;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.core.SenseNode.prototype.org$nfrac$comportex$core$PTopographic$ = true;

org.nfrac.comportex.core.SenseNode.prototype.org$nfrac$comportex$core$PTopographic$topography$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.topography;
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k47648,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__47650 = (((k47648 instanceof cljs.core.Keyword))?k47648.fqn:null);
switch (G__47650) {
case "topography":
return self__.topography;

break;
case "bits":
return self__.bits;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k47648,else__9951__auto__);

}
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.core.SenseNode{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topography,self__.topography],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$bits,self__.bits],null))], null),self__.__extmap));
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47647){
var self__ = this;
var G__47647__$1 = this;
return (new cljs.core.RecordIter((0),G__47647__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topography,cljs.core.cst$kw$bits], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.core.SenseNode(self__.topography,self__.bits,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.nfrac.comportex.core.SenseNode.prototype.org$nfrac$comportex$core$PSignalSource$ = true;

org.nfrac.comportex.core.SenseNode.prototype.org$nfrac$comportex$core$PSignalSource$signal_STAR_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$bits,self__.bits], null);
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$bits,null,cljs.core.cst$kw$topography,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.core.SenseNode(self__.topography,self__.bits,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__47647){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__47651 = cljs.core.keyword_identical_QMARK_;
var expr__47652 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__47654 = cljs.core.cst$kw$topography;
var G__47655 = expr__47652;
return (pred__47651.cljs$core$IFn$_invoke$arity$2 ? pred__47651.cljs$core$IFn$_invoke$arity$2(G__47654,G__47655) : pred__47651.call(null,G__47654,G__47655));
})())){
return (new org.nfrac.comportex.core.SenseNode(G__47647,self__.bits,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47656 = cljs.core.cst$kw$bits;
var G__47657 = expr__47652;
return (pred__47651.cljs$core$IFn$_invoke$arity$2 ? pred__47651.cljs$core$IFn$_invoke$arity$2(G__47656,G__47657) : pred__47651.call(null,G__47656,G__47657));
})())){
return (new org.nfrac.comportex.core.SenseNode(self__.topography,G__47647,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.core.SenseNode(self__.topography,self__.bits,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__47647),null));
}
}
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topography,self__.topography],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$bits,self__.bits],null))], null),self__.__extmap));
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__47647){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.core.SenseNode(self__.topography,self__.bits,G__47647,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.core.SenseNode.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.core.SenseNode.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topography,cljs.core.cst$sym$bits], null);
});

org.nfrac.comportex.core.SenseNode.cljs$lang$type = true;

org.nfrac.comportex.core.SenseNode.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.core/SenseNode");
});

org.nfrac.comportex.core.SenseNode.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.core/SenseNode");
});

org.nfrac.comportex.core.__GT_SenseNode = (function org$nfrac$comportex$core$__GT_SenseNode(topography,bits){
return (new org.nfrac.comportex.core.SenseNode(topography,bits,null,null,null));
});

org.nfrac.comportex.core.map__GT_SenseNode = (function org$nfrac$comportex$core$map__GT_SenseNode(G__47649){
return (new org.nfrac.comportex.core.SenseNode(cljs.core.cst$kw$topography.cljs$core$IFn$_invoke$arity$1(G__47649),cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(G__47649),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__47649,cljs.core.cst$kw$topography,cljs.core.array_seq([cljs.core.cst$kw$bits], 0)),null));
});

org.nfrac.comportex.core.composite_signal = (function org$nfrac$comportex$core$composite_signal(ffs){
var signals = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.signal,ffs);
var widths = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.size_of,ffs);
var sigkeys = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.keys,cljs.core.array_seq([signals], 0)));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (signals,widths,sigkeys){
return (function (m,k){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,org.nfrac.comportex.util.align_indices.cljs$core$IFn$_invoke$arity$2(widths,cljs.core.map.cljs$core$IFn$_invoke$arity$2(k,signals)));
});})(signals,widths,sigkeys))
,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$bits,cljs.core.List.EMPTY], null),sigkeys);
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_composite_DASH_signal,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$ffs,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47659_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_valid_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$sym$p1__47659_SHARP_))))),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$ffs,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47659_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_valid_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$sym$p1__47659_SHARP_))))),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ffs], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47659_SHARP_], null),cljs.core.list(cljs.core.cst$sym$s_SLASH_valid_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$signal,cljs.core.cst$sym$p1__47659_SHARP_))),(function (p1__47659_SHARP_){
return cljs.spec.valid_QMARK_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,org.nfrac.comportex.core.signal(p1__47659_SHARP_));
}),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47659_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_valid_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$sym$p1__47659_SHARP_))))], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$ffs,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47659_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_valid_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$sym$p1__47659_SHARP_))))),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_signal,null,null,null));
/**
 * Taking the index of an input bit as received by the given layer, return its
 *   source element as [src-id j] where src-id is the key of the source layer or
 *   sense, and j is the index adjusted to refer to the output of that source.
 * 
 *   `field` can be :ff-deps, :fb-deps or :lat-deps depending on which input field
 *   `i` is an index into.
 */
org.nfrac.comportex.core.source_of_incoming_bit = (function org$nfrac$comportex$core$source_of_incoming_bit(htm,lyr_id,i,field){
var senses = cljs.core.cst$kw$senses.cljs$core$IFn$_invoke$arity$1(htm);
var layers = cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(htm);
var src_ids = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [field,lyr_id], null));
var src_ids__$1 = src_ids;
var offset = (0);
while(true){
var temp__6728__auto__ = cljs.core.first(src_ids__$1);
if(cljs.core.truth_(temp__6728__auto__)){
var src_id = temp__6728__auto__;
var node = (function (){var or__9278__auto__ = (senses.cljs$core$IFn$_invoke$arity$1 ? senses.cljs$core$IFn$_invoke$arity$1(src_id) : senses.call(null,src_id));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (layers.cljs$core$IFn$_invoke$arity$1 ? layers.cljs$core$IFn$_invoke$arity$1(src_id) : layers.call(null,src_id));
}
})();
var width = cljs.core.long$(org.nfrac.comportex.core.size_of(node));
if((i < (offset + width))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [src_id,(i - offset)], null);
} else {
var G__47660 = cljs.core.next(src_ids__$1);
var G__47661 = (offset + width);
src_ids__$1 = G__47660;
offset = G__47661;
continue;
}
} else {
return null;
}
break;
}
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_source_DASH_of_DASH_incoming_DASH_bit,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$htm,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.cst$kw$lyr_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$i,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$field,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ff_DASH_deps,null,cljs.core.cst$kw$fb_DASH_deps,null,cljs.core.cst$kw$lat_DASH_deps,null], null), null)),cljs.core.cst$kw$ret,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$src_DASH_id,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$index,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_)),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$htm,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.cst$kw$lyr_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$i,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$field,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ff_DASH_deps,null,cljs.core.cst$kw$fb_DASH_deps,null,cljs.core.cst$kw$lat_DASH_deps,null], null), null)),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$htm,cljs.core.cst$kw$lyr_DASH_id,cljs.core.cst$kw$i,cljs.core.cst$kw$field], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.nat_int_QMARK_,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ff_DASH_deps,null,cljs.core.cst$kw$fb_DASH_deps,null,cljs.core.cst$kw$lat_DASH_deps,null], null), null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ff_DASH_deps,null,cljs.core.cst$kw$fb_DASH_deps,null,cljs.core.cst$kw$lat_DASH_deps,null], null), null)], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$htm,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.cst$kw$lyr_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$i,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$field,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ff_DASH_deps,null,cljs.core.cst$kw$fb_DASH_deps,null,cljs.core.cst$kw$lat_DASH_deps,null], null), null)),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$src_DASH_id,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$index,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$src_DASH_id,cljs.core.cst$kw$index], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.core.nat_int_QMARK_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$src_DASH_id,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$index,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),null,null,null));
org.nfrac.comportex.core.pmap = cljs.core.map;
org.nfrac.comportex.core.htm_sense_impl = (function org$nfrac$comportex$core$htm_sense_impl(this$,inval,mode){
var map__47669 = this$;
var map__47669__$1 = ((((!((map__47669 == null)))?((((map__47669.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47669.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47669):map__47669);
var ff_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47669__$1,cljs.core.cst$kw$ff_DASH_deps);
var lat_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47669__$1,cljs.core.cst$kw$lat_DASH_deps);
var sensors = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47669__$1,cljs.core.cst$kw$sensors);
var senses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47669__$1,cljs.core.cst$kw$senses);
var is_ff_dep_QMARK_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.cat,cljs.core.vals(ff_deps));
var is_lat_dep_QMARK_ = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.cat,cljs.core.vals(lat_deps));
var sm = cljs.core.reduce_kv(((function (map__47669,map__47669__$1,ff_deps,lat_deps,sensors,senses,is_ff_dep_QMARK_,is_lat_dep_QMARK_){
return (function (m,k,p__47671){
var vec__47672 = p__47671;
var selector = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47672,(0),null);
var encoder = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47672,(1),null);
if(cljs.core.truth_((function (){var G__47675 = mode;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ff,G__47675)){
return (is_ff_dep_QMARK_.cljs$core$IFn$_invoke$arity$1 ? is_ff_dep_QMARK_.cljs$core$IFn$_invoke$arity$1(k) : is_ff_dep_QMARK_.call(null,k));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$lat,G__47675)){
return (is_lat_dep_QMARK_.cljs$core$IFn$_invoke$arity$1 ? is_lat_dep_QMARK_.cljs$core$IFn$_invoke$arity$1(k) : is_lat_dep_QMARK_.call(null,k));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(null,G__47675)){
return true;
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(mode)].join('')));

}
}
}
})())){
var bits = org.nfrac.comportex.core.encode(encoder,org.nfrac.comportex.core.extract(selector,inval));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,org.nfrac.comportex.core.__GT_SenseNode(org.nfrac.comportex.core.topography(encoder),bits));
} else {
return m;
}
});})(map__47669,map__47669__$1,ff_deps,lat_deps,sensors,senses,is_ff_dep_QMARK_,is_lat_dep_QMARK_))
,senses,sensors);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.cst$kw$senses,sm,cljs.core.array_seq([cljs.core.cst$kw$input_DASH_value,inval], 0));
});
org.nfrac.comportex.core.htm_activate_impl = (function org$nfrac$comportex$core$htm_activate_impl(this$){
var map__47680 = this$;
var map__47680__$1 = ((((!((map__47680 == null)))?((((map__47680.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47680.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47680):map__47680);
var strata = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47680__$1,cljs.core.cst$kw$strata);
var ff_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47680__$1,cljs.core.cst$kw$ff_DASH_deps);
var layers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47680__$1,cljs.core.cst$kw$layers);
var senses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47680__$1,cljs.core.cst$kw$senses);
var lm = cljs.core.select_keys(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (map__47680,map__47680__$1,strata,ff_deps,layers,senses){
return (function (m,stratum){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(m,cljs.core.zipmap(stratum,(function (){var G__47682 = ((function (map__47680,map__47680__$1,strata,ff_deps,layers,senses){
return (function (id){
var ffs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(m,(ff_deps.cljs$core$IFn$_invoke$arity$1 ? ff_deps.cljs$core$IFn$_invoke$arity$1(id) : ff_deps.call(null,id)));
return org.nfrac.comportex.core.layer_activate(cljs.core.get.cljs$core$IFn$_invoke$arity$2(layers,id),org.nfrac.comportex.core.composite_signal(ffs));
});})(map__47680,map__47680__$1,strata,ff_deps,layers,senses))
;
var G__47683 = stratum;
return (org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2 ? org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2(G__47682,G__47683) : org.nfrac.comportex.core.pmap.call(null,G__47682,G__47683));
})()));
});})(map__47680,map__47680__$1,strata,ff_deps,layers,senses))
,senses,cljs.core.rest(strata)),cljs.core.keys(layers));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$,cljs.core.cst$kw$layers,lm);
});
org.nfrac.comportex.core.htm_learn_impl = (function org$nfrac$comportex$core$htm_learn_impl(this$){
var layers = cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(this$);
var lm = cljs.core.zipmap(cljs.core.keys(layers),(function (){var G__47686 = org.nfrac.comportex.core.layer_learn;
var G__47687 = cljs.core.vals(layers);
return (org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2 ? org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2(G__47686,G__47687) : org.nfrac.comportex.core.pmap.call(null,G__47686,G__47687));
})());
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$,cljs.core.cst$kw$layers,lm);
});
org.nfrac.comportex.core.htm_depolarise_impl = (function org$nfrac$comportex$core$htm_depolarise_impl(this$){
var map__47697 = this$;
var map__47697__$1 = ((((!((map__47697 == null)))?((((map__47697.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47697.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47697):map__47697);
var fb_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47697__$1,cljs.core.cst$kw$fb_DASH_deps);
var lat_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47697__$1,cljs.core.cst$kw$lat_DASH_deps);
var layers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47697__$1,cljs.core.cst$kw$layers);
var senses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47697__$1,cljs.core.cst$kw$senses);
var lm = cljs.core.zipmap(cljs.core.keys(layers),(function (){var G__47699 = ((function (map__47697,map__47697__$1,fb_deps,lat_deps,layers,senses){
return (function (p__47701){
var vec__47702 = p__47701;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47702,(0),null);
var layer = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47702,(1),null);
var fbs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(layers,cljs.core.get.cljs$core$IFn$_invoke$arity$2(fb_deps,id));
var lats = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (fbs,vec__47702,id,layer,map__47697,map__47697__$1,fb_deps,lat_deps,layers,senses){
return (function (p1__47688_SHARP_){
var or__9278__auto__ = (senses.cljs$core$IFn$_invoke$arity$1 ? senses.cljs$core$IFn$_invoke$arity$1(p1__47688_SHARP_) : senses.call(null,p1__47688_SHARP_));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (layers.cljs$core$IFn$_invoke$arity$1 ? layers.cljs$core$IFn$_invoke$arity$1(p1__47688_SHARP_) : layers.call(null,p1__47688_SHARP_));
}
});})(fbs,vec__47702,id,layer,map__47697,map__47697__$1,fb_deps,lat_deps,layers,senses))
,cljs.core.get.cljs$core$IFn$_invoke$arity$2(lat_deps,id));
return org.nfrac.comportex.core.layer_depolarise(layer,org.nfrac.comportex.core.composite_signal(fbs),org.nfrac.comportex.core.composite_signal(lats));
});})(map__47697,map__47697__$1,fb_deps,lat_deps,layers,senses))
;
var G__47700 = layers;
return (org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2 ? org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2(G__47699,G__47700) : org.nfrac.comportex.core.pmap.call(null,G__47699,G__47700));
})());
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$,cljs.core.cst$kw$layers,lm);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {org.nfrac.comportex.core.PRestartable}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.nfrac.comportex.core.PHTM}
 * @implements {org.nfrac.comportex.core.PInterruptable}
 * @implements {cljs.core.ICounted}
 * @implements {org.nfrac.comportex.core.PTemporal}
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
org.nfrac.comportex.core.Network = (function (ff_deps,fb_deps,lat_deps,strata,layers,sensors,senses,__meta,__extmap,__hash){
this.ff_deps = ff_deps;
this.fb_deps = fb_deps;
this.lat_deps = lat_deps;
this.strata = strata;
this.layers = layers;
this.sensors = sensors;
this.senses = senses;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.core.Network.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.core.Network.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k47707,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__47709 = (((k47707 instanceof cljs.core.Keyword))?k47707.fqn:null);
switch (G__47709) {
case "ff-deps":
return self__.ff_deps;

break;
case "fb-deps":
return self__.fb_deps;

break;
case "lat-deps":
return self__.lat_deps;

break;
case "strata":
return self__.strata;

break;
case "layers":
return self__.layers;

break;
case "sensors":
return self__.sensors;

break;
case "senses":
return self__.senses;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k47707,else__9951__auto__);

}
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PTemporal$ = true;

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PTemporal$timestep$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.core.timestep(cljs.core.first(cljs.core.vals(self__.layers)));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.core.Network{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ff_DASH_deps,self__.ff_deps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$fb_DASH_deps,self__.fb_deps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$lat_DASH_deps,self__.lat_deps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$strata,self__.strata],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$layers,self__.layers],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$sensors,self__.sensors],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$senses,self__.senses],null))], null),self__.__extmap));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.core.Network.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47706){
var self__ = this;
var G__47706__$1 = this;
return (new cljs.core.RecordIter((0),G__47706__$1,7,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_deps,cljs.core.cst$kw$fb_DASH_deps,cljs.core.cst$kw$lat_DASH_deps,cljs.core.cst$kw$strata,cljs.core.cst$kw$layers,cljs.core.cst$kw$sensors,cljs.core.cst$kw$senses], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.core.Network.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,self__.sensors,self__.senses,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (7 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.nfrac.comportex.core.Network.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.nfrac.comportex.core.Network.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$senses,null,cljs.core.cst$kw$ff_DASH_deps,null,cljs.core.cst$kw$fb_DASH_deps,null,cljs.core.cst$kw$sensors,null,cljs.core.cst$kw$layers,null,cljs.core.cst$kw$lat_DASH_deps,null,cljs.core.cst$kw$strata,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,self__.sensors,self__.senses,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PRestartable$ = true;

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PRestartable$restart$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$layers,cljs.core.zipmap(cljs.core.keys(self__.layers),(function (){var G__47710 = org.nfrac.comportex.core.restart;
var G__47711 = cljs.core.vals(self__.layers);
return (org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2 ? org.nfrac.comportex.core.pmap.cljs$core$IFn$_invoke$arity$2(G__47710,G__47711) : org.nfrac.comportex.core.pmap.call(null,G__47710,G__47711));
})()));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__47706){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__47712 = cljs.core.keyword_identical_QMARK_;
var expr__47713 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__47715 = cljs.core.cst$kw$ff_DASH_deps;
var G__47716 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47715,G__47716) : pred__47712.call(null,G__47715,G__47716));
})())){
return (new org.nfrac.comportex.core.Network(G__47706,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,self__.sensors,self__.senses,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47717 = cljs.core.cst$kw$fb_DASH_deps;
var G__47718 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47717,G__47718) : pred__47712.call(null,G__47717,G__47718));
})())){
return (new org.nfrac.comportex.core.Network(self__.ff_deps,G__47706,self__.lat_deps,self__.strata,self__.layers,self__.sensors,self__.senses,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47719 = cljs.core.cst$kw$lat_DASH_deps;
var G__47720 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47719,G__47720) : pred__47712.call(null,G__47719,G__47720));
})())){
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,G__47706,self__.strata,self__.layers,self__.sensors,self__.senses,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47721 = cljs.core.cst$kw$strata;
var G__47722 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47721,G__47722) : pred__47712.call(null,G__47721,G__47722));
})())){
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,G__47706,self__.layers,self__.sensors,self__.senses,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47723 = cljs.core.cst$kw$layers;
var G__47724 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47723,G__47724) : pred__47712.call(null,G__47723,G__47724));
})())){
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,G__47706,self__.sensors,self__.senses,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47725 = cljs.core.cst$kw$sensors;
var G__47726 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47725,G__47726) : pred__47712.call(null,G__47725,G__47726));
})())){
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,G__47706,self__.senses,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47727 = cljs.core.cst$kw$senses;
var G__47728 = expr__47713;
return (pred__47712.cljs$core$IFn$_invoke$arity$2 ? pred__47712.cljs$core$IFn$_invoke$arity$2(G__47727,G__47728) : pred__47712.call(null,G__47727,G__47728));
})())){
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,self__.sensors,G__47706,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,self__.sensors,self__.senses,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__47706),null));
}
}
}
}
}
}
}
});

org.nfrac.comportex.core.Network.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ff_DASH_deps,self__.ff_deps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$fb_DASH_deps,self__.fb_deps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$lat_DASH_deps,self__.lat_deps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$strata,self__.strata],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$layers,self__.layers],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$sensors,self__.sensors],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$senses,self__.senses],null))], null),self__.__extmap));
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PInterruptable$ = true;

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PInterruptable$break$arity$2 = (function (this$,mode){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$layers,cljs.core.zipmap(cljs.core.keys(self__.layers),cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (this$__$1){
return (function (p1__47705_SHARP_){
return org.nfrac.comportex.core.break$(p1__47705_SHARP_,mode);
});})(this$__$1))
,cljs.core.vals(self__.layers))));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__47706){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.core.Network(self__.ff_deps,self__.fb_deps,self__.lat_deps,self__.strata,self__.layers,self__.sensors,self__.senses,G__47706,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.core.Network.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PHTM$ = true;

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PHTM$htm_sense$arity$3 = (function (this$,inval,mode){
var self__ = this;
var this$__$1 = this;
return org.nfrac.comportex.core.htm_sense_impl(this$__$1,inval,mode);
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PHTM$htm_activate$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return org.nfrac.comportex.core.htm_activate_impl(this$__$1);
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PHTM$htm_learn$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return org.nfrac.comportex.core.htm_learn_impl(this$__$1);
});

org.nfrac.comportex.core.Network.prototype.org$nfrac$comportex$core$PHTM$htm_depolarise$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return org.nfrac.comportex.core.htm_depolarise_impl(this$__$1);
});

org.nfrac.comportex.core.Network.getBasis = (function (){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ff_DASH_deps,cljs.core.cst$sym$fb_DASH_deps,cljs.core.cst$sym$lat_DASH_deps,cljs.core.cst$sym$strata,cljs.core.cst$sym$layers,cljs.core.cst$sym$sensors,cljs.core.cst$sym$senses], null);
});

org.nfrac.comportex.core.Network.cljs$lang$type = true;

org.nfrac.comportex.core.Network.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.core/Network");
});

org.nfrac.comportex.core.Network.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.core/Network");
});

org.nfrac.comportex.core.__GT_Network = (function org$nfrac$comportex$core$__GT_Network(ff_deps,fb_deps,lat_deps,strata,layers,sensors,senses){
return (new org.nfrac.comportex.core.Network(ff_deps,fb_deps,lat_deps,strata,layers,sensors,senses,null,null,null));
});

org.nfrac.comportex.core.map__GT_Network = (function org$nfrac$comportex$core$map__GT_Network(G__47708){
return (new org.nfrac.comportex.core.Network(cljs.core.cst$kw$ff_DASH_deps.cljs$core$IFn$_invoke$arity$1(G__47708),cljs.core.cst$kw$fb_DASH_deps.cljs$core$IFn$_invoke$arity$1(G__47708),cljs.core.cst$kw$lat_DASH_deps.cljs$core$IFn$_invoke$arity$1(G__47708),cljs.core.cst$kw$strata.cljs$core$IFn$_invoke$arity$1(G__47708),cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(G__47708),cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(G__47708),cljs.core.cst$kw$senses.cljs$core$IFn$_invoke$arity$1(G__47708),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__47708,cljs.core.cst$kw$ff_DASH_deps,cljs.core.array_seq([cljs.core.cst$kw$fb_DASH_deps,cljs.core.cst$kw$lat_DASH_deps,cljs.core.cst$kw$strata,cljs.core.cst$kw$layers,cljs.core.cst$kw$sensors,cljs.core.cst$kw$senses], 0)),null));
});

/**
 * A sequence of the keys of all layers in topologically-sorted
 *   order. If `n-levels` is provided, only the layers from that many
 *   hierarchical levels are included. So 1 gives the first tier directly
 *   receiving sensory inputs.
 */
org.nfrac.comportex.core.layer_keys = (function org$nfrac$comportex$core$layer_keys(var_args){
var args47730 = [];
var len__10461__auto___47733 = arguments.length;
var i__10462__auto___47734 = (0);
while(true){
if((i__10462__auto___47734 < len__10461__auto___47733)){
args47730.push((arguments[i__10462__auto___47734]));

var G__47735 = (i__10462__auto___47734 + (1));
i__10462__auto___47734 = G__47735;
continue;
} else {
}
break;
}

var G__47732 = args47730.length;
switch (G__47732) {
case 1:
return org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47730.length)].join('')));

}
});

org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$1 = (function (htm){
return org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$2(htm,(cljs.core.count(cljs.core.cst$kw$strata.cljs$core$IFn$_invoke$arity$1(htm)) - (1)));
});

org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$2 = (function (htm,n_levels){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,cljs.core.take.cljs$core$IFn$_invoke$arity$2(n_levels,cljs.core.rest(cljs.core.cst$kw$strata.cljs$core$IFn$_invoke$arity$1(htm))));
});

org.nfrac.comportex.core.layer_keys.cljs$lang$maxFixedArity = 2;

/**
 * A sequence of the keys of all sense nodes.
 */
org.nfrac.comportex.core.sense_keys = (function org$nfrac$comportex$core$sense_keys(htm){
return cljs.core.keys(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm));
});
org.nfrac.comportex.core.layer_seq = (function org$nfrac$comportex$core$layer_seq(htm){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(htm),org.nfrac.comportex.core.layer_keys.cljs$core$IFn$_invoke$arity$1(htm));
});
org.nfrac.comportex.core.in_vals_not_keys = (function org$nfrac$comportex$core$in_vals_not_keys(deps){
var have_deps = cljs.core.set(cljs.core.keys(deps));
var are_deps = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.cat,cljs.core.vals(deps));
return clojure.set.difference.cljs$core$IFn$_invoke$arity$2(are_deps,have_deps);
});
org.nfrac.comportex.core.series_deps = (function org$nfrac$comportex$core$series_deps(layer_keys,sense_keys){
var ff_deps = cljs.core.zipmap(layer_keys,cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(sense_keys,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,layer_keys)));
return new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ff_DASH_deps,ff_deps], null);
});
org.nfrac.comportex.core.add_feedback_deps = (function org$nfrac$comportex$core$add_feedback_deps(p__47737){
var map__47740 = p__47737;
var map__47740__$1 = ((((!((map__47740 == null)))?((((map__47740.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47740.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47740):map__47740);
var linkages = map__47740__$1;
var ff_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47740__$1,cljs.core.cst$kw$ff_DASH_deps);
var all_ids = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.set(cljs.core.keys(ff_deps)),cljs.core.cat,cljs.core.vals(ff_deps));
var ff_dag = org.nfrac.comportex.util.algo_graph.directed_graph(all_ids,ff_deps);
var fb_deps = org.nfrac.comportex.util.remap(cljs.core.seq,cljs.core.cst$kw$neighbors.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.algo_graph.reverse_graph(ff_dag)));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(linkages,cljs.core.cst$kw$fb_DASH_deps,fb_deps);
});
/**
 * Builds a network of layers and senses with the given linkages.
 *   Linkages between these nodes are given as direct dependencies:
 *   :ff-deps maps each layer to a list of nodes it takes feed-forward
 *   input from. Optionally, :fb-deps maps layers to lists of nodes to
 *   take feed-back input from. And :lat-deps lateral sources, which
 *   may also be senses (like motor senses).
 * 
 *   Sensors are defined to be the form `[selector encoder]`, satisfying
 *   protocols PSelector and PEncoder respectively.
 * 
 *   For each layer, the combined dimensions of each of its feed-forward
 *   sources, feed-back sources, and lateral sources are calculated and
 *   passed on to layer-embed to allow the layer to configure itself.
 * 
 *   For example a feed-forward network `inp -> v1 -> v2`:
 * 
 * (network
 *  {:v1 v1-layer
 *   :v2 v2-layer}
 *  {:inp [sel enc]}
 *  {:ff-deps {:v1 [:inp]
 *             :v2 [:v1]}})
 */
org.nfrac.comportex.core.network = (function org$nfrac$comportex$core$network(var_args){
var args47742 = [];
var len__10461__auto___47752 = arguments.length;
var i__10462__auto___47753 = (0);
while(true){
if((i__10462__auto___47753 < len__10461__auto___47752)){
args47742.push((arguments[i__10462__auto___47753]));

var G__47754 = (i__10462__auto___47753 + (1));
i__10462__auto___47753 = G__47754;
continue;
} else {
}
break;
}

var G__47744 = args47742.length;
switch (G__47744) {
case 2:
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47742.length)].join('')));

}
});

org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$2 = (function (layers,sensors){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),cljs.core.count(layers))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("linkages can be omitted only for single layer."),cljs.core.str("\n"),cljs.core.str("(= 1 (count layers))")].join('')));
}

var ff_deps = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.first(cljs.core.keys(layers)),cljs.core.keys(sensors));
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3(layers,sensors,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$ff_DASH_deps,ff_deps], null));
});

org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3 = (function (layers,sensors,p__47745){
var map__47746 = p__47745;
var map__47746__$1 = ((((!((map__47746 == null)))?((((map__47746.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47746.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47746):map__47746);
var linkages = map__47746__$1;
var ff_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47746__$1,cljs.core.cst$kw$ff_DASH_deps);
var fb_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47746__$1,cljs.core.cst$kw$fb_DASH_deps);
var lat_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47746__$1,cljs.core.cst$kw$lat_DASH_deps);
if(cljs.core.every_QMARK_(ff_deps,cljs.core.keys(layers))){
} else {
throw (new Error("Assert failed: (every? ff-deps (keys layers))"));
}

if(cljs.core.every_QMARK_(org.nfrac.comportex.core.in_vals_not_keys(cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.array_seq([ff_deps,lat_deps], 0))),cljs.core.keys(sensors))){
} else {
throw (new Error("Assert failed: (every? (in-vals-not-keys (merge-with concat ff-deps lat-deps)) (keys sensors))"));
}

if(cljs.core.every_QMARK_(layers,cljs.core.keys(ff_deps))){
} else {
throw (new Error("Assert failed: (every? layers (keys ff-deps))"));
}

if(cljs.core.every_QMARK_(sensors,org.nfrac.comportex.core.in_vals_not_keys(cljs.core.merge_with.cljs$core$IFn$_invoke$arity$variadic(cljs.core.concat,cljs.core.array_seq([ff_deps,lat_deps], 0))))){
} else {
throw (new Error("Assert failed: (every? sensors (in-vals-not-keys (merge-with concat ff-deps lat-deps)))"));
}

var all_ids = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.set(cljs.core.keys(ff_deps)),cljs.core.cat,cljs.core.vals(ff_deps));
var ff_dag = org.nfrac.comportex.util.algo_graph.directed_graph(all_ids,ff_deps);
var strata = org.nfrac.comportex.util.algo_graph.dependency_list(ff_dag);
var senses = org.nfrac.comportex.util.remap(((function (all_ids,ff_dag,strata,map__47746,map__47746__$1,linkages,ff_deps,fb_deps,lat_deps){
return (function (p__47748){
var vec__47749 = p__47748;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47749,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47749,(1),null);
return org.nfrac.comportex.core.__GT_SenseNode(org.nfrac.comportex.core.topography(e),cljs.core.List.EMPTY);
});})(all_ids,ff_dag,strata,map__47746,map__47746__$1,linkages,ff_deps,fb_deps,lat_deps))
,sensors);
var elayers = cljs.core.select_keys(cljs.core.reduce_kv(((function (all_ids,ff_dag,strata,senses,map__47746,map__47746__$1,linkages,ff_deps,fb_deps,lat_deps){
return (function (m,id,layer){
var ffs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(m,cljs.core.get.cljs$core$IFn$_invoke$arity$2(ff_deps,id));
var fbs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(m,cljs.core.get.cljs$core$IFn$_invoke$arity$2(fb_deps,id));
var lats = cljs.core.map.cljs$core$IFn$_invoke$arity$2(m,cljs.core.get.cljs$core$IFn$_invoke$arity$2(lat_deps,id));
var ff_topo = org.nfrac.comportex.topography.topo_union(cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.topography,ffs));
var fb_topo = org.nfrac.comportex.topography.topo_union(cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.topography,fbs));
var lat_topo = org.nfrac.comportex.topography.topo_union(cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.topography,lats));
var embedding = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ff_DASH_topo,ff_topo,cljs.core.cst$kw$fb_DASH_topo,fb_topo,cljs.core.cst$kw$lat_DASH_topo,lat_topo], null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,id,org.nfrac.comportex.core.layer_embed(layer,embedding));
});})(all_ids,ff_dag,strata,senses,map__47746,map__47746__$1,linkages,ff_deps,fb_deps,lat_deps))
,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([senses,layers], 0)),layers),cljs.core.keys(layers));
return org.nfrac.comportex.core.map__GT_Network(new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$ff_DASH_deps,ff_deps,cljs.core.cst$kw$fb_DASH_deps,fb_deps,cljs.core.cst$kw$lat_DASH_deps,lat_deps,cljs.core.cst$kw$strata,strata,cljs.core.cst$kw$sensors,sensors,cljs.core.cst$kw$senses,senses,cljs.core.cst$kw$layers,elayers], null));
});

org.nfrac.comportex.core.network.cljs$lang$maxFixedArity = 3;

cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$core_SLASH_network,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layers,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded),cljs.core.cst$kw$sensors,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.core.cst$kw$linkages,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages)),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layers,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded),cljs.core.cst$kw$sensors,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.core.cst$kw$linkages,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages)),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$sensors,cljs.core.cst$kw$linkages], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded], null)),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.map_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_], null),null),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_tuple,cljs.core.cst$sym$keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.spec.tuple_impl.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor], null)),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$into,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$cljs$spec_SLASH_kfn,(function (i__46297__auto__,v__46298__auto__){
return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v__46298__auto__,(0));
}),cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$kind,cljs.core.map_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_map_QMARK_], null),null),cljs.spec.maybe_impl(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages)], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$layers,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_id,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_layer_DASH_unembedded),cljs.core.cst$kw$sensors,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_map_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_keyword_QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_sensor),cljs.core.cst$kw$linkages,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_linkages)),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,null,null),cljs.core.cst$kw$org$nfrac$comportex$core_SLASH_network,null,null,null));
/**
 * Returns the first index that corresponds with `ff-id` within the
 *   feedforward input to `lyr-id`.
 */
org.nfrac.comportex.core.ff_base = (function org$nfrac$comportex$core$ff_base(htm,lyr_id,ff_id){
var map__47766 = htm;
var map__47766__$1 = ((((!((map__47766 == null)))?((((map__47766.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47766.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47766):map__47766);
var senses = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47766__$1,cljs.core.cst$kw$senses);
var layers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47766__$1,cljs.core.cst$kw$layers);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,(0),cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.core.size_of,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__47766,map__47766__$1,senses,layers){
return (function (p__47768){
var vec__47769 = p__47768;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47769,(0),null);
var ff = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47769,(1),null);
return ff;
});})(map__47766,map__47766__$1,senses,layers))
,cljs.core.take_while.cljs$core$IFn$_invoke$arity$2(((function (map__47766,map__47766__$1,senses,layers){
return (function (p__47772){
var vec__47773 = p__47772;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47773,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47773,(1),null);
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(id,ff_id);
});})(map__47766,map__47766__$1,senses,layers))
,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (map__47766,map__47766__$1,senses,layers){
return (function (id){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [id,(function (){var or__9278__auto__ = (senses.cljs$core$IFn$_invoke$arity$1 ? senses.cljs$core$IFn$_invoke$arity$1(id) : senses.call(null,id));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (layers.cljs$core$IFn$_invoke$arity$1 ? layers.cljs$core$IFn$_invoke$arity$1(id) : layers.call(null,id));
}
})()], null);
});})(map__47766,map__47766__$1,senses,layers))
,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_deps,lyr_id], null)))))));
});
org.nfrac.comportex.core.predictions = (function org$nfrac$comportex$core$predictions(var_args){
var args47776 = [];
var len__10461__auto___47792 = arguments.length;
var i__10462__auto___47793 = (0);
while(true){
if((i__10462__auto___47793 < len__10461__auto___47792)){
args47776.push((arguments[i__10462__auto___47793]));

var G__47794 = (i__10462__auto___47793 + (1));
i__10462__auto___47793 = G__47794;
continue;
} else {
}
break;
}

var G__47778 = args47776.length;
switch (G__47778) {
case 3:
return org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47776.length)].join('')));

}
});

org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$3 = (function (htm,sense_id,n_predictions){
return org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$4(htm,sense_id,n_predictions,cljs.core.PersistentArrayMap.EMPTY);
});

org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$4 = (function (htm,sense_id,n_predictions,opts){
var sense_width = org.nfrac.comportex.core.size_of(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$senses,sense_id], null)));
var map__47779 = org.nfrac.comportex.core.add_feedback_deps(htm);
var map__47779__$1 = ((((!((map__47779 == null)))?((((map__47779.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47779.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47779):map__47779);
var fb_deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47779__$1,cljs.core.cst$kw$fb_DASH_deps);
var pr_votes = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (sense_width,map__47779,map__47779__$1,fb_deps){
return (function (m,p__47784){
var vec__47785 = p__47784;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47785,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47785,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,id,(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,id,(0)) + votes));
});})(sense_width,map__47779,map__47779__$1,fb_deps))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic(((function (sense_width,map__47779,map__47779__$1,fb_deps){
return (function (lyr_id){
var lyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id], null));
var start = org.nfrac.comportex.core.ff_base(htm,lyr_id,sense_id);
var end = (start + sense_width);
return cljs.core.keep.cljs$core$IFn$_invoke$arity$2(((function (lyr,start,end,sense_width,map__47779,map__47779__$1,fb_deps){
return (function (p__47788){
var vec__47789 = p__47788;
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47789,(0),null);
var votes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47789,(1),null);
if(((start <= id)) && ((id < end))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(id - start),votes], null);
} else {
return null;
}
});})(lyr,start,end,sense_width,map__47779,map__47779__$1,fb_deps))
,org.nfrac.comportex.core.layer_decode_to_ff_bits(lyr,opts));
});})(sense_width,map__47779,map__47779__$1,fb_deps))
,cljs.core.array_seq([(fb_deps.cljs$core$IFn$_invoke$arity$1 ? fb_deps.cljs$core$IFn$_invoke$arity$1(sense_id) : fb_deps.call(null,sense_id))], 0)));
var vec__47780 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sensors,sense_id], null));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47780,(0),null);
var encoder = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47780,(1),null);
return org.nfrac.comportex.core.decode(encoder,pr_votes,n_predictions);
});

org.nfrac.comportex.core.predictions.cljs$lang$maxFixedArity = 4;

