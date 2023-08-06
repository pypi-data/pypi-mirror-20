// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.topography');
goog.require('cljs.core');
goog.require('cljs.spec');
goog.require('cljs.spec.impl.gen');
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_vector_QMARK_,cljs.core.cst$kw$min_DASH_count,(1),cljs.core.cst$kw$max_DASH_count,(3),cljs.core.cst$kw$gen,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)),cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_vector_QMARK_,cljs.core.cst$kw$min_DASH_count,(1),cljs.core.cst$kw$max_DASH_count,(3)),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47299_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_reduce,cljs.core.cst$sym$cljs$core_SLASH__STAR_,cljs.core.cst$sym$p1__47299_SHARP_),(2048))))))),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$sym$nat_DASH_int_QMARK_,cljs.core.nat_int_QMARK_,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$min_DASH_count,(1),cljs.core.cst$kw$kind,cljs.core.vector_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_vector_QMARK_,cljs.core.cst$kw$max_DASH_count,(3)], null),(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(2048)),cljs.core.cst$kw$kind,cljs.core.cst$sym$cljs$core_SLASH_vector_QMARK_,cljs.core.cst$kw$min_DASH_count,(1),cljs.core.cst$kw$max_DASH_count,(3)),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_reduce,cljs.core.cst$sym$cljs$core_SLASH__STAR_,cljs.core.cst$sym$_PERCENT_),(2048)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$s_SLASH_int_DASH_in,(0),(2048)),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(2048),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(2048),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((2048) - (1))], null)], 0));
}),null),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$min_DASH_count,(1),cljs.core.cst$kw$kind,cljs.core.vector_QMARK_,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,cljs.core.cst$sym$cljs$core_SLASH_vector_QMARK_,cljs.core.cst$kw$max_DASH_count,(3)], null),null),(function (p1__47299_SHARP_){
return (cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,p1__47299_SHARP_) <= (2048));
})], null),null));
})));
cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_pos_DASH_dimensions,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47300_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__GT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_reduce,cljs.core.cst$sym$cljs$core_SLASH__STAR_,cljs.core.cst$sym$p1__47300_SHARP_),(1)))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__GT__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_reduce,cljs.core.cst$sym$cljs$core_SLASH__STAR_,cljs.core.cst$sym$_PERCENT_),(1)))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,(function (p1__47300_SHARP_){
return (cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,p1__47300_SHARP_) >= (1));
})], null),null));

/**
 * Operating on a regular grid of certain dimensions, where each
 * coordinate is an n-tuple vector---or integer for 1D---and also has
 * a unique integer index.
 * @interface
 */
org.nfrac.comportex.topography.PTopography = function(){};

org.nfrac.comportex.topography.dimensions = (function org$nfrac$comportex$topography$dimensions(this$){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$topography$PTopography$dimensions$arity$1 == null)))){
return this$.org$nfrac$comportex$topography$PTopography$dimensions$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.topography.dimensions[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.topography.dimensions["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTopography.dimensions",this$);
}
}
}
});

org.nfrac.comportex.topography.coordinates_of_index = (function org$nfrac$comportex$topography$coordinates_of_index(this$,idx){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$topography$PTopography$coordinates_of_index$arity$2 == null)))){
return this$.org$nfrac$comportex$topography$PTopography$coordinates_of_index$arity$2(this$,idx);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.topography.coordinates_of_index[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,idx) : m__9992__auto__.call(null,this$,idx));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.topography.coordinates_of_index["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,idx) : m__9992__auto____$1.call(null,this$,idx));
} else {
throw cljs.core.missing_protocol("PTopography.coordinates-of-index",this$);
}
}
}
});

org.nfrac.comportex.topography.index_of_coordinates = (function org$nfrac$comportex$topography$index_of_coordinates(this$,coord){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$topography$PTopography$index_of_coordinates$arity$2 == null)))){
return this$.org$nfrac$comportex$topography$PTopography$index_of_coordinates$arity$2(this$,coord);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.topography.index_of_coordinates[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,coord) : m__9992__auto__.call(null,this$,coord));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.topography.index_of_coordinates["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,coord) : m__9992__auto____$1.call(null,this$,coord));
} else {
throw cljs.core.missing_protocol("PTopography.index-of-coordinates",this$);
}
}
}
});

org.nfrac.comportex.topography.neighbours_STAR_ = (function org$nfrac$comportex$topography$neighbours_STAR_(this$,coord,outer_r,inner_r){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$topography$PTopography$neighbours_STAR_$arity$4 == null)))){
return this$.org$nfrac$comportex$topography$PTopography$neighbours_STAR_$arity$4(this$,coord,outer_r,inner_r);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.topography.neighbours_STAR_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$4(this$,coord,outer_r,inner_r) : m__9992__auto__.call(null,this$,coord,outer_r,inner_r));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.topography.neighbours_STAR_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,coord,outer_r,inner_r) : m__9992__auto____$1.call(null,this$,coord,outer_r,inner_r));
} else {
throw cljs.core.missing_protocol("PTopography.neighbours*",this$);
}
}
}
});

org.nfrac.comportex.topography.coord_distance = (function org$nfrac$comportex$topography$coord_distance(this$,coord_a,coord_b){
if((!((this$ == null))) && (!((this$.org$nfrac$comportex$topography$PTopography$coord_distance$arity$3 == null)))){
return this$.org$nfrac$comportex$topography$PTopography$coord_distance$arity$3(this$,coord_a,coord_b);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.nfrac.comportex.topography.coord_distance[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,coord_a,coord_b) : m__9992__auto__.call(null,this$,coord_a,coord_b));
} else {
var m__9992__auto____$1 = (org.nfrac.comportex.topography.coord_distance["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,coord_a,coord_b) : m__9992__auto____$1.call(null,this$,coord_a,coord_b));
} else {
throw cljs.core.missing_protocol("PTopography.coord-distance",this$);
}
}
}
});

cljs.spec.def_impl(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47301_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_satisfies_QMARK_,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_PTopography,cljs.core.cst$sym$p1__47301_SHARP_)),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec$impl$gen_SLASH_fmap,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_make_DASH_topography,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions))))),cljs.spec.with_gen((function (p1__47301_SHARP_){
if(!((p1__47301_SHARP_ == null))){
if((false) || (p1__47301_SHARP_.org$nfrac$comportex$topography$PTopography$)){
return true;
} else {
if((!p1__47301_SHARP_.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.topography.PTopography,p1__47301_SHARP_);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(org.nfrac.comportex.topography.PTopography,p1__47301_SHARP_);
}
}),(function (){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.topography.make_topography,cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions)], 0));
})));
/**
 * The total number of elements indexed in the topography.
 */
org.nfrac.comportex.topography.size = (function org$nfrac$comportex$topography$size(topo){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,org.nfrac.comportex.topography.dimensions(topo));
});
/**
 * Returns the coordinates away from `coord` at distances `inner-r` (exclusive)
 *   out to `outer-r` (inclusive). The default inner-r is 0 which excludes coord
 *   itself. To include coord, use inner-r -1.
 */
org.nfrac.comportex.topography.neighbours = (function org$nfrac$comportex$topography$neighbours(var_args){
var args47303 = [];
var len__10461__auto___47306 = arguments.length;
var i__10462__auto___47307 = (0);
while(true){
if((i__10462__auto___47307 < len__10461__auto___47306)){
args47303.push((arguments[i__10462__auto___47307]));

var G__47308 = (i__10462__auto___47307 + (1));
i__10462__auto___47307 = G__47308;
continue;
} else {
}
break;
}

var G__47305 = args47303.length;
switch (G__47305) {
case 3:
return org.nfrac.comportex.topography.neighbours.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return org.nfrac.comportex.topography.neighbours.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47303.length)].join('')));

}
});

org.nfrac.comportex.topography.neighbours.cljs$core$IFn$_invoke$arity$3 = (function (topo,coord,radius){
return org.nfrac.comportex.topography.neighbours_STAR_(topo,coord,radius,(0));
});

org.nfrac.comportex.topography.neighbours.cljs$core$IFn$_invoke$arity$4 = (function (topo,coord,outer_r,inner_r){
return org.nfrac.comportex.topography.neighbours_STAR_(topo,coord,outer_r,inner_r);
});

org.nfrac.comportex.topography.neighbours.cljs$lang$maxFixedArity = 4;

org.nfrac.comportex.topography.cvec = (function org$nfrac$comportex$topography$cvec(p__47310){
var vec__47315 = p__47310;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47315,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47315,(1),null);
var G__47318 = (((k instanceof cljs.core.Keyword))?k.fqn:null);
switch (G__47318) {
case "int":
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null);

break;
case "vec":
return v;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(k)].join('')));

}
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_neighbours,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$coord,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$vec,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$int,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47320_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$p1__47320_SHARP_))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47320_SHARP_))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47321_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_identity,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$p1__47321_SHARP_)),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47321_SHARP_))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47322_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$p1__47322_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47322_SHARP_))))))),cljs.core.cst$kw$ret,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions)),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$coord,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$vec,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$int,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47320_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$p1__47320_SHARP_))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47320_SHARP_))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47321_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_identity,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$p1__47321_SHARP_)),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47321_SHARP_))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47322_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$p1__47322_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47322_SHARP_))))))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$coord,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$vec,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$int,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$_PERCENT_))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$_PERCENT_))))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_identity,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$_PERCENT_)),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$_PERCENT_))))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$_PERCENT_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$_PERCENT_))))))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$coord,cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$kw$inner_DASH_r], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.spec.or_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$vec,cljs.core.cst$kw$int], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.nat_int_QMARK_], null),null),cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(9),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(9),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(9),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((9) - (1))], null)], 0));
}),null));
})),cljs.spec.maybe_impl(cljs.spec.with_gen(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),1.0E9,cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),1.0E9,cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((-1),1.0E9,p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(-1),cljs.core.cst$kw$max,(1.0E9 - (1))], null)], 0));
}),null),(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),(8),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),(8),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((-1),(8),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(-1),cljs.core.cst$kw$max,((8) - (1))], null)], 0));
}),null));
})),cljs.core.list(cljs.core.cst$sym$_DASH__GT_,cljs.core.list(cljs.core.cst$sym$s_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$s_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$s_SLASH_gen,cljs.core.list(cljs.core.cst$sym$s_SLASH_int_DASH_in,(-1),(8)))))))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$vec,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$int,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))], null)),(function (p1__47320_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(org.nfrac.comportex.topography.cvec(cljs.core.cst$kw$coord.cljs$core$IFn$_invoke$arity$1(p1__47320_SHARP_))),cljs.core.count(org.nfrac.comportex.topography.dimensions(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(p1__47320_SHARP_))));
}),(function (p1__47321_SHARP_){
return cljs.core.every_QMARK_(cljs.core.identity,cljs.core.map.cljs$core$IFn$_invoke$arity$3(cljs.core._LT_,org.nfrac.comportex.topography.cvec(cljs.core.cst$kw$coord.cljs$core$IFn$_invoke$arity$1(p1__47321_SHARP_)),org.nfrac.comportex.topography.dimensions(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(p1__47321_SHARP_))));
}),(function (p1__47322_SHARP_){
return (cljs.core.cst$kw$outer_DASH_r.cljs$core$IFn$_invoke$arity$1(p1__47322_SHARP_) < ((3) * cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.topography.dimensions(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(p1__47322_SHARP_)))));
})], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$coord,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_or,cljs.core.cst$kw$vec,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$int,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47320_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__EQ_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$p1__47320_SHARP_))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_count,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47320_SHARP_))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47321_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.cst$sym$cljs$core_SLASH_identity,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_map,cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_cvec,cljs.core.list(cljs.core.cst$kw$coord,cljs.core.cst$sym$p1__47321_SHARP_)),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47321_SHARP_))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47322_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$p1__47322_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47322_SHARP_))))))),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),null,null,null));
/**
 * Same as `neighbours` but taking and returning indices instead of
 * coordinates.
 */
org.nfrac.comportex.topography.neighbours_indices = (function org$nfrac$comportex$topography$neighbours_indices(var_args){
var args47323 = [];
var len__10461__auto___47326 = arguments.length;
var i__10462__auto___47327 = (0);
while(true){
if((i__10462__auto___47327 < len__10461__auto___47326)){
args47323.push((arguments[i__10462__auto___47327]));

var G__47328 = (i__10462__auto___47327 + (1));
i__10462__auto___47327 = G__47328;
continue;
} else {
}
break;
}

var G__47325 = args47323.length;
switch (G__47325) {
case 3:
return org.nfrac.comportex.topography.neighbours_indices.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return org.nfrac.comportex.topography.neighbours_indices.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args47323.length)].join('')));

}
});

org.nfrac.comportex.topography.neighbours_indices.cljs$core$IFn$_invoke$arity$3 = (function (topo,idx,radius){
return org.nfrac.comportex.topography.neighbours_indices.cljs$core$IFn$_invoke$arity$4(topo,idx,radius,(0));
});

org.nfrac.comportex.topography.neighbours_indices.cljs$core$IFn$_invoke$arity$4 = (function (topo,idx,outer_r,inner_r){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.topography.index_of_coordinates,topo),org.nfrac.comportex.topography.neighbours_STAR_(topo,org.nfrac.comportex.topography.coordinates_of_index(topo,idx),outer_r,inner_r));
});

org.nfrac.comportex.topography.neighbours_indices.cljs$lang$maxFixedArity = 4;

cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_neighbours_DASH_indices,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$idx,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47330_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$idx,cljs.core.cst$sym$p1__47330_SHARP_),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47330_SHARP_)))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47331_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$p1__47331_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47331_SHARP_))))))),cljs.core.cst$kw$ret,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.core.cst$kw$fn,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$m], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$m,cljs.core.cst$kw$args,cljs.core.cst$kw$topo,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size)], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47332_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,(0),cljs.core.cst$sym$p1__47332_SHARP_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_dec,cljs.core.cst$sym$n))),cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$m))))),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$idx,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47330_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$idx,cljs.core.cst$sym$p1__47330_SHARP_),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47330_SHARP_)))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47331_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$p1__47331_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47331_SHARP_))))))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$idx,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$idx,cljs.core.cst$sym$_PERCENT_),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$_PERCENT_)))),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$_PERCENT_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$_PERCENT_))))))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$idx,cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$kw$inner_DASH_r], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.nat_int_QMARK_,cljs.spec.with_gen(cljs.core.nat_int_QMARK_,(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(9),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(0),(9),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((0),(9),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,((9) - (1))], null)], 0));
}),null));
})),cljs.spec.maybe_impl(cljs.spec.with_gen(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),1.0E9,cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),1.0E9,cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((-1),1.0E9,p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(-1),cljs.core.cst$kw$max,(1.0E9 - (1))], null)], 0));
}),null),(function (){
return cljs.spec.gen.cljs$core$IFn$_invoke$arity$1(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__46404__46405__auto__], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),(8),cljs.core.cst$sym$p1__46404__46405__auto__))),cljs.spec.and_spec_impl(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$cljs$core_SLASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$_PERCENT_], null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in_DASH_range_QMARK_,(-1),(8),cljs.core.cst$sym$_PERCENT_))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.int_QMARK_,(function (p1__46404__46405__auto__){
return cljs.spec.int_in_range_QMARK_((-1),(8),p1__46404__46405__auto__);
})], null),null),(function (){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$min,(-1),cljs.core.cst$kw$max,((8) - (1))], null)], 0));
}),null));
})),cljs.core.list(cljs.core.cst$sym$_DASH__GT_,cljs.core.list(cljs.core.cst$sym$s_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$s_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$s_SLASH_gen,cljs.core.list(cljs.core.cst$sym$s_SLASH_int_DASH_in,(-1),(8)))))))], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))], null)),(function (p1__47330_SHARP_){
return (cljs.core.cst$kw$idx.cljs$core$IFn$_invoke$arity$1(p1__47330_SHARP_) < org.nfrac.comportex.topography.size(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(p1__47330_SHARP_)));
}),(function (p1__47331_SHARP_){
return (cljs.core.cst$kw$outer_DASH_r.cljs$core$IFn$_invoke$arity$1(p1__47331_SHARP_) < ((3) * cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,org.nfrac.comportex.topography.dimensions(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(p1__47331_SHARP_)))));
})], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_and,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topo,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$idx,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.cst$kw$outer_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(0),(9)))))),cljs.core.cst$kw$inner_DASH_r,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__QMARK_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),1.0E9),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_with_DASH_gen,cljs.core.list(cljs.core.cst$sym$fn_STAR_,cljs.core.PersistentVector.EMPTY,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_gen,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_int_DASH_in,(-1),(8)))))))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47330_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$idx,cljs.core.cst$sym$p1__47330_SHARP_),cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47330_SHARP_)))),cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47331_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT_,cljs.core.list(cljs.core.cst$kw$outer_DASH_r,cljs.core.cst$sym$p1__47331_SHARP_),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__STAR_,(3),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_apply,cljs.core.cst$sym$cljs$core_SLASH_max,cljs.core.list(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.list(cljs.core.cst$kw$topo,cljs.core.cst$sym$p1__47331_SHARP_))))))),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$sym$nat_DASH_int_QMARK_,cljs.core.nat_int_QMARK_,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_every,cljs.core.cst$sym$cljs$core_SLASH_nat_DASH_int_QMARK_),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$m], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$m,cljs.core.cst$kw$args,cljs.core.cst$kw$topo,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size)], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47332_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,(0),cljs.core.cst$sym$p1__47332_SHARP_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_dec,cljs.core.cst$sym$n))),cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$m)))),(function (m){
var n = org.nfrac.comportex.topography.size(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$args.cljs$core$IFn$_invoke$arity$1(m)));
return cljs.core.every_QMARK_(((function (n){
return (function (p1__47332_SHARP_){
return (((0) <= p1__47332_SHARP_)) && ((p1__47332_SHARP_ <= (n - (1))));
});})(n))
,cljs.core.cst$kw$ret.cljs$core$IFn$_invoke$arity$1(m));
}),null,null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_fn,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$m], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_let,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__DASH__GT_,cljs.core.cst$sym$m,cljs.core.cst$kw$args,cljs.core.cst$kw$topo,cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_size)], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_every_QMARK_,cljs.core.list(cljs.core.cst$sym$fn_STAR_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$p1__47332_SHARP_], null),cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH__LT__EQ_,(0),cljs.core.cst$sym$p1__47332_SHARP_,cljs.core.list(cljs.core.cst$sym$cljs$core_SLASH_dec,cljs.core.cst$sym$n))),cljs.core.list(cljs.core.cst$kw$ret,cljs.core.cst$sym$m)))),null));
org.nfrac.comportex.topography.abs = (function org$nfrac$comportex$topography$abs(x){
if((x < (0))){
return (- x);
} else {
return x;
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
 * @implements {org.nfrac.comportex.topography.PTopography}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.topography.OneDTopography = (function (size,__meta,__extmap,__hash){
this.size = size;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k47334,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__47336 = (((k47334 instanceof cljs.core.Keyword))?k47334.fqn:null);
switch (G__47336) {
case "size":
return self__.size;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k47334,else__9951__auto__);

}
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.topography.OneDTopography{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$size,self__.size],null))], null),self__.__extmap));
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47333){
var self__ = this;
var G__47333__$1 = this;
return (new cljs.core.RecordIter((0),G__47333__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$size], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.topography.OneDTopography.prototype.org$nfrac$comportex$topography$PTopography$ = true;

org.nfrac.comportex.topography.OneDTopography.prototype.org$nfrac$comportex$topography$PTopography$dimensions$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.size], null);
});

org.nfrac.comportex.topography.OneDTopography.prototype.org$nfrac$comportex$topography$PTopography$coordinates_of_index$arity$2 = (function (_,idx){
var self__ = this;
var ___$1 = this;
return idx;
});

org.nfrac.comportex.topography.OneDTopography.prototype.org$nfrac$comportex$topography$PTopography$index_of_coordinates$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
return coord;
});

org.nfrac.comportex.topography.OneDTopography.prototype.org$nfrac$comportex$topography$PTopography$neighbours_STAR_$arity$4 = (function (this$,coord,outer_r,inner_r){
var self__ = this;
var this$__$1 = this;
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9618__auto__ = ((coord + inner_r) + (1));
var y__9619__auto__ = (self__.size - (1));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})(),(function (){var x__9618__auto__ = ((coord + outer_r) + (1));
var y__9619__auto__ = self__.size;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})()),cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9611__auto__ = (coord - outer_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})(),(function (){var x__9611__auto__ = (coord - inner_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})()));
});

org.nfrac.comportex.topography.OneDTopography.prototype.org$nfrac$comportex$topography$PTopography$coord_distance$arity$3 = (function (_,coord_a,coord_b){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.topography.abs((coord_b - coord_a));
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.topography.OneDTopography(self__.size,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$size,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.topography.OneDTopography(self__.size,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__47333){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__47337 = cljs.core.keyword_identical_QMARK_;
var expr__47338 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__47340 = cljs.core.cst$kw$size;
var G__47341 = expr__47338;
return (pred__47337.cljs$core$IFn$_invoke$arity$2 ? pred__47337.cljs$core$IFn$_invoke$arity$2(G__47340,G__47341) : pred__47337.call(null,G__47340,G__47341));
})())){
return (new org.nfrac.comportex.topography.OneDTopography(G__47333,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.topography.OneDTopography(self__.size,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__47333),null));
}
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$size,self__.size],null))], null),self__.__extmap));
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__47333){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.topography.OneDTopography(self__.size,G__47333,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topography.OneDTopography.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.topography.OneDTopography.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$size], null);
});

org.nfrac.comportex.topography.OneDTopography.cljs$lang$type = true;

org.nfrac.comportex.topography.OneDTopography.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.topography/OneDTopography");
});

org.nfrac.comportex.topography.OneDTopography.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.topography/OneDTopography");
});

org.nfrac.comportex.topography.__GT_OneDTopography = (function org$nfrac$comportex$topography$__GT_OneDTopography(size){
return (new org.nfrac.comportex.topography.OneDTopography(size,null,null,null));
});

org.nfrac.comportex.topography.map__GT_OneDTopography = (function org$nfrac$comportex$topography$map__GT_OneDTopography(G__47335){
return (new org.nfrac.comportex.topography.OneDTopography(cljs.core.cst$kw$size.cljs$core$IFn$_invoke$arity$1(G__47335),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__47335,cljs.core.cst$kw$size),null));
});

org.nfrac.comportex.topography.one_d_topography = (function org$nfrac$comportex$topography$one_d_topography(size){
return org.nfrac.comportex.topography.__GT_OneDTopography(size);
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
 * @implements {org.nfrac.comportex.topography.PTopography}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.topography.TwoDTopography = (function (width,height,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k47344,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__47346 = (((k47344 instanceof cljs.core.Keyword))?k47344.fqn:null);
switch (G__47346) {
case "width":
return self__.width;

break;
case "height":
return self__.height;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k47344,else__9951__auto__);

}
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.topography.TwoDTopography{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null))], null),self__.__extmap));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47343){
var self__ = this;
var G__47343__$1 = this;
return (new cljs.core.RecordIter((0),G__47343__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$width,cljs.core.cst$kw$height], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.org$nfrac$comportex$topography$PTopography$ = true;

org.nfrac.comportex.topography.TwoDTopography.prototype.org$nfrac$comportex$topography$PTopography$dimensions$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.width,self__.height], null);
});

org.nfrac.comportex.topography.TwoDTopography.prototype.org$nfrac$comportex$topography$PTopography$coordinates_of_index$arity$2 = (function (_,idx){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.rem(idx,self__.width),cljs.core.quot(idx,self__.width)], null);
});

org.nfrac.comportex.topography.TwoDTopography.prototype.org$nfrac$comportex$topography$PTopography$index_of_coordinates$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
var vec__47347 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47347,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47347,(1),null);
return (cx + (cy * self__.width));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.org$nfrac$comportex$topography$PTopography$neighbours_STAR_$arity$4 = (function (this$,coord,outer_r,inner_r){
var self__ = this;
var this$__$1 = this;
var vec__47350 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47350,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47350,(1),null);
var iter__10132__auto__ = ((function (vec__47350,cx,cy,this$__$1){
return (function org$nfrac$comportex$topography$iter__47353(s__47354){
return (new cljs.core.LazySeq(null,((function (vec__47350,cx,cy,this$__$1){
return (function (){
var s__47354__$1 = s__47354;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__47354__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var x = cljs.core.first(xs__7284__auto__);
var iterys__10128__auto__ = ((function (s__47354__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47350,cx,cy,this$__$1){
return (function org$nfrac$comportex$topography$iter__47353_$_iter__47355(s__47356){
return (new cljs.core.LazySeq(null,((function (s__47354__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47350,cx,cy,this$__$1){
return (function (){
var s__47356__$1 = s__47356;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__47356__$1);
if(temp__6728__auto____$1){
var s__47356__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__47356__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__47356__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__47358 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__47357 = (0);
while(true){
if((i__47357 < size__10131__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__47357);
if(((org.nfrac.comportex.topography.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topography.abs((y - cy)) > inner_r))){
cljs.core.chunk_append(b__47358,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null));

var G__47378 = (i__47357 + (1));
i__47357 = G__47378;
continue;
} else {
var G__47379 = (i__47357 + (1));
i__47357 = G__47379;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47358),org$nfrac$comportex$topography$iter__47353_$_iter__47355(cljs.core.chunk_rest(s__47356__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47358),null);
}
} else {
var y = cljs.core.first(s__47356__$2);
if(((org.nfrac.comportex.topography.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topography.abs((y - cy)) > inner_r))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null),org$nfrac$comportex$topography$iter__47353_$_iter__47355(cljs.core.rest(s__47356__$2)));
} else {
var G__47380 = cljs.core.rest(s__47356__$2);
s__47356__$1 = G__47380;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__47354__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47350,cx,cy,this$__$1))
,null,null));
});})(s__47354__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47350,cx,cy,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9611__auto__ = (cy - outer_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})(),(function (){var x__9618__auto__ = ((cy + outer_r) + (1));
var y__9619__auto__ = self__.height;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})())));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$topography$iter__47353(cljs.core.rest(s__47354__$1)));
} else {
var G__47381 = cljs.core.rest(s__47354__$1);
s__47354__$1 = G__47381;
continue;
}
} else {
return null;
}
break;
}
});})(vec__47350,cx,cy,this$__$1))
,null,null));
});})(vec__47350,cx,cy,this$__$1))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9611__auto__ = (cx - outer_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})(),(function (){var x__9618__auto__ = ((cx + outer_r) + (1));
var y__9619__auto__ = self__.width;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})()));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.org$nfrac$comportex$topography$PTopography$coord_distance$arity$3 = (function (_,coord_a,coord_b){
var self__ = this;
var ___$1 = this;
var vec__47364 = coord_a;
var xa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47364,(0),null);
var ya = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47364,(1),null);
var vec__47367 = coord_b;
var xb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47367,(0),null);
var yb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47367,(1),null);
var x__9611__auto__ = org.nfrac.comportex.topography.abs((xb - xa));
var y__9612__auto__ = org.nfrac.comportex.topography.abs((yb - ya));
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.topography.TwoDTopography(self__.width,self__.height,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,null,cljs.core.cst$kw$height,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.topography.TwoDTopography(self__.width,self__.height,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__47343){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__47370 = cljs.core.keyword_identical_QMARK_;
var expr__47371 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__47373 = cljs.core.cst$kw$width;
var G__47374 = expr__47371;
return (pred__47370.cljs$core$IFn$_invoke$arity$2 ? pred__47370.cljs$core$IFn$_invoke$arity$2(G__47373,G__47374) : pred__47370.call(null,G__47373,G__47374));
})())){
return (new org.nfrac.comportex.topography.TwoDTopography(G__47343,self__.height,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47375 = cljs.core.cst$kw$height;
var G__47376 = expr__47371;
return (pred__47370.cljs$core$IFn$_invoke$arity$2 ? pred__47370.cljs$core$IFn$_invoke$arity$2(G__47375,G__47376) : pred__47370.call(null,G__47375,G__47376));
})())){
return (new org.nfrac.comportex.topography.TwoDTopography(self__.width,G__47343,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.topography.TwoDTopography(self__.width,self__.height,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__47343),null));
}
}
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null))], null),self__.__extmap));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__47343){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.topography.TwoDTopography(self__.width,self__.height,G__47343,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topography.TwoDTopography.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.topography.TwoDTopography.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$width,cljs.core.cst$sym$height], null);
});

org.nfrac.comportex.topography.TwoDTopography.cljs$lang$type = true;

org.nfrac.comportex.topography.TwoDTopography.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.topography/TwoDTopography");
});

org.nfrac.comportex.topography.TwoDTopography.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.topography/TwoDTopography");
});

org.nfrac.comportex.topography.__GT_TwoDTopography = (function org$nfrac$comportex$topography$__GT_TwoDTopography(width,height){
return (new org.nfrac.comportex.topography.TwoDTopography(width,height,null,null,null));
});

org.nfrac.comportex.topography.map__GT_TwoDTopography = (function org$nfrac$comportex$topography$map__GT_TwoDTopography(G__47345){
return (new org.nfrac.comportex.topography.TwoDTopography(cljs.core.cst$kw$width.cljs$core$IFn$_invoke$arity$1(G__47345),cljs.core.cst$kw$height.cljs$core$IFn$_invoke$arity$1(G__47345),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__47345,cljs.core.cst$kw$width,cljs.core.array_seq([cljs.core.cst$kw$height], 0)),null));
});

org.nfrac.comportex.topography.two_d_topography = (function org$nfrac$comportex$topography$two_d_topography(width,height){
return org.nfrac.comportex.topography.__GT_TwoDTopography(width,height);
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
 * @implements {org.nfrac.comportex.topography.PTopography}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.nfrac.comportex.topography.ThreeDTopography = (function (width,height,depth,__meta,__extmap,__hash){
this.width = width;
this.height = height;
this.depth = depth;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k47383,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__47385 = (((k47383 instanceof cljs.core.Keyword))?k47383.fqn:null);
switch (G__47385) {
case "width":
return self__.width;

break;
case "height":
return self__.height;

break;
case "depth":
return self__.depth;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k47383,else__9951__auto__);

}
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.topography.ThreeDTopography{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$depth,self__.depth],null))], null),self__.__extmap));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__47382){
var self__ = this;
var G__47382__$1 = this;
return (new cljs.core.RecordIter((0),G__47382__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$width,cljs.core.cst$kw$height,cljs.core.cst$kw$depth], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.org$nfrac$comportex$topography$PTopography$ = true;

org.nfrac.comportex.topography.ThreeDTopography.prototype.org$nfrac$comportex$topography$PTopography$dimensions$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.width,self__.height,self__.depth], null);
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.org$nfrac$comportex$topography$PTopography$coordinates_of_index$arity$2 = (function (_,idx){
var self__ = this;
var ___$1 = this;
var z = cljs.core.quot(idx,(self__.width * self__.height));
var z_rem = cljs.core.rem(idx,(self__.width * self__.height));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.rem(z_rem,self__.width),cljs.core.quot(z_rem,self__.width),z], null);
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.org$nfrac$comportex$topography$PTopography$index_of_coordinates$arity$2 = (function (_,coord){
var self__ = this;
var ___$1 = this;
var vec__47386 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47386,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47386,(1),null);
var cz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47386,(2),null);
return ((cx + (cy * self__.width)) + ((cz * self__.width) * self__.height));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.org$nfrac$comportex$topography$PTopography$neighbours_STAR_$arity$4 = (function (this$,coord,outer_r,inner_r){
var self__ = this;
var this$__$1 = this;
var vec__47389 = coord;
var cx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47389,(0),null);
var cy = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47389,(1),null);
var cz = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47389,(2),null);
var iter__10132__auto__ = ((function (vec__47389,cx,cy,cz,this$__$1){
return (function org$nfrac$comportex$topography$iter__47392(s__47393){
return (new cljs.core.LazySeq(null,((function (vec__47389,cx,cy,cz,this$__$1){
return (function (){
var s__47393__$1 = s__47393;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__47393__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var x = cljs.core.first(xs__7284__auto__);
var iterys__10128__auto__ = ((function (s__47393__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1){
return (function org$nfrac$comportex$topography$iter__47392_$_iter__47394(s__47395){
return (new cljs.core.LazySeq(null,((function (s__47393__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1){
return (function (){
var s__47395__$1 = s__47395;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__47395__$1);
if(temp__6728__auto____$1){
var xs__7284__auto____$1 = temp__6728__auto____$1;
var y = cljs.core.first(xs__7284__auto____$1);
var iterys__10128__auto__ = ((function (s__47395__$1,s__47393__$1,y,xs__7284__auto____$1,temp__6728__auto____$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1){
return (function org$nfrac$comportex$topography$iter__47392_$_iter__47394_$_iter__47396(s__47397){
return (new cljs.core.LazySeq(null,((function (s__47395__$1,s__47393__$1,y,xs__7284__auto____$1,temp__6728__auto____$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1){
return (function (){
var s__47397__$1 = s__47397;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__47397__$1);
if(temp__6728__auto____$2){
var s__47397__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__47397__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__47397__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__47399 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__47398 = (0);
while(true){
if((i__47398 < size__10131__auto__)){
var z = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__47398);
if(((org.nfrac.comportex.topography.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topography.abs((y - cy)) > inner_r)) || ((org.nfrac.comportex.topography.abs((z - cz)) > inner_r))){
cljs.core.chunk_append(b__47399,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null));

var G__47427 = (i__47398 + (1));
i__47398 = G__47427;
continue;
} else {
var G__47428 = (i__47398 + (1));
i__47398 = G__47428;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47399),org$nfrac$comportex$topography$iter__47392_$_iter__47394_$_iter__47396(cljs.core.chunk_rest(s__47397__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47399),null);
}
} else {
var z = cljs.core.first(s__47397__$2);
if(((org.nfrac.comportex.topography.abs((x - cx)) > inner_r)) || ((org.nfrac.comportex.topography.abs((y - cy)) > inner_r)) || ((org.nfrac.comportex.topography.abs((z - cz)) > inner_r))){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y,z], null),org$nfrac$comportex$topography$iter__47392_$_iter__47394_$_iter__47396(cljs.core.rest(s__47397__$2)));
} else {
var G__47429 = cljs.core.rest(s__47397__$2);
s__47397__$1 = G__47429;
continue;
}
}
} else {
return null;
}
break;
}
});})(s__47395__$1,s__47393__$1,y,xs__7284__auto____$1,temp__6728__auto____$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1))
,null,null));
});})(s__47395__$1,s__47393__$1,y,xs__7284__auto____$1,temp__6728__auto____$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9611__auto__ = (cz - outer_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})(),(function (){var x__9618__auto__ = ((cz + outer_r) + (1));
var y__9619__auto__ = self__.depth;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})())));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$topography$iter__47392_$_iter__47394(cljs.core.rest(s__47395__$1)));
} else {
var G__47430 = cljs.core.rest(s__47395__$1);
s__47395__$1 = G__47430;
continue;
}
} else {
return null;
}
break;
}
});})(s__47393__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1))
,null,null));
});})(s__47393__$1,x,xs__7284__auto__,temp__6728__auto__,vec__47389,cx,cy,cz,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9611__auto__ = (cy - outer_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})(),(function (){var x__9618__auto__ = ((cy + outer_r) + (1));
var y__9619__auto__ = self__.height;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})())));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$topography$iter__47392(cljs.core.rest(s__47393__$1)));
} else {
var G__47431 = cljs.core.rest(s__47393__$1);
s__47393__$1 = G__47431;
continue;
}
} else {
return null;
}
break;
}
});})(vec__47389,cx,cy,cz,this$__$1))
,null,null));
});})(vec__47389,cx,cy,cz,this$__$1))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((function (){var x__9611__auto__ = (cx - outer_r);
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})(),(function (){var x__9618__auto__ = ((cx + outer_r) + (1));
var y__9619__auto__ = self__.width;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})()));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.org$nfrac$comportex$topography$PTopography$coord_distance$arity$3 = (function (_,coord_a,coord_b){
var self__ = this;
var ___$1 = this;
var vec__47411 = coord_a;
var xa = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47411,(0),null);
var ya = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47411,(1),null);
var za = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47411,(2),null);
var vec__47414 = coord_b;
var xb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47414,(0),null);
var yb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47414,(1),null);
var zb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47414,(2),null);
var x__9611__auto__ = (function (){var x__9611__auto__ = org.nfrac.comportex.topography.abs((xb - xa));
var y__9612__auto__ = org.nfrac.comportex.topography.abs((yb - ya));
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var y__9612__auto__ = org.nfrac.comportex.topography.abs((zb - za));
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.topography.ThreeDTopography(self__.width,self__.height,self__.depth,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$width,null,cljs.core.cst$kw$depth,null,cljs.core.cst$kw$height,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.topography.ThreeDTopography(self__.width,self__.height,self__.depth,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__47382){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__47417 = cljs.core.keyword_identical_QMARK_;
var expr__47418 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__47420 = cljs.core.cst$kw$width;
var G__47421 = expr__47418;
return (pred__47417.cljs$core$IFn$_invoke$arity$2 ? pred__47417.cljs$core$IFn$_invoke$arity$2(G__47420,G__47421) : pred__47417.call(null,G__47420,G__47421));
})())){
return (new org.nfrac.comportex.topography.ThreeDTopography(G__47382,self__.height,self__.depth,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47422 = cljs.core.cst$kw$height;
var G__47423 = expr__47418;
return (pred__47417.cljs$core$IFn$_invoke$arity$2 ? pred__47417.cljs$core$IFn$_invoke$arity$2(G__47422,G__47423) : pred__47417.call(null,G__47422,G__47423));
})())){
return (new org.nfrac.comportex.topography.ThreeDTopography(self__.width,G__47382,self__.depth,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__47424 = cljs.core.cst$kw$depth;
var G__47425 = expr__47418;
return (pred__47417.cljs$core$IFn$_invoke$arity$2 ? pred__47417.cljs$core$IFn$_invoke$arity$2(G__47424,G__47425) : pred__47417.call(null,G__47424,G__47425));
})())){
return (new org.nfrac.comportex.topography.ThreeDTopography(self__.width,self__.height,G__47382,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.topography.ThreeDTopography(self__.width,self__.height,self__.depth,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__47382),null));
}
}
}
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$width,self__.width],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$height,self__.height],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$depth,self__.depth],null))], null),self__.__extmap));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__47382){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.topography.ThreeDTopography(self__.width,self__.height,self__.depth,G__47382,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.topography.ThreeDTopography.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.topography.ThreeDTopography.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$width,cljs.core.cst$sym$height,cljs.core.cst$sym$depth], null);
});

org.nfrac.comportex.topography.ThreeDTopography.cljs$lang$type = true;

org.nfrac.comportex.topography.ThreeDTopography.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.topography/ThreeDTopography");
});

org.nfrac.comportex.topography.ThreeDTopography.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.topography/ThreeDTopography");
});

org.nfrac.comportex.topography.__GT_ThreeDTopography = (function org$nfrac$comportex$topography$__GT_ThreeDTopography(width,height,depth){
return (new org.nfrac.comportex.topography.ThreeDTopography(width,height,depth,null,null,null));
});

org.nfrac.comportex.topography.map__GT_ThreeDTopography = (function org$nfrac$comportex$topography$map__GT_ThreeDTopography(G__47384){
return (new org.nfrac.comportex.topography.ThreeDTopography(cljs.core.cst$kw$width.cljs$core$IFn$_invoke$arity$1(G__47384),cljs.core.cst$kw$height.cljs$core$IFn$_invoke$arity$1(G__47384),cljs.core.cst$kw$depth.cljs$core$IFn$_invoke$arity$1(G__47384),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__47384,cljs.core.cst$kw$width,cljs.core.array_seq([cljs.core.cst$kw$height,cljs.core.cst$kw$depth], 0)),null));
});

org.nfrac.comportex.topography.three_d_topography = (function org$nfrac$comportex$topography$three_d_topography(w,h,d){
return org.nfrac.comportex.topography.__GT_ThreeDTopography(w,h,d);
});
org.nfrac.comportex.topography.make_topography = (function org$nfrac$comportex$topography$make_topography(dims){
var vec__47436 = dims;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47436,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47436,(1),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47436,(2),null);
var q = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47436,(3),null);
var G__47439 = cljs.core.count(dims);
switch (G__47439) {
case (0):
return org.nfrac.comportex.topography.one_d_topography((0));

break;
case (1):
return org.nfrac.comportex.topography.one_d_topography(w);

break;
case (2):
return org.nfrac.comportex.topography.two_d_topography(w,h);

break;
case (3):
return org.nfrac.comportex.topography.three_d_topography(w,h,d);

break;
case (4):
return org.nfrac.comportex.topography.three_d_topography(w,h,(d * q));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.count(dims))].join('')));

}
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_make_DASH_topography,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$dims,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$dims,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$dims], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$dims,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,null,null),cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,null,null,null));
org.nfrac.comportex.topography.empty_topography = org.nfrac.comportex.topography.make_topography(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null));
/**
 * Project n dimensions to n-1 dimensions by eliminating the last dimension.
 * 
 *   This removes potentially-valuable structure.
 *   Example: in dimensions [8 7 6], the points [0 0 0] [0 1 0] are adjacent.
 *   After squashing to [8 42], these points [0 0] [0 6] are much further apart.
 */
org.nfrac.comportex.topography.squash_last_dimension = (function org$nfrac$comportex$topography$squash_last_dimension(dims){
return cljs.core.vec(cljs.core.butlast(cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(dims,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.count(dims) - (2))], null),cljs.core._STAR_,cljs.core.last(dims))));
});
/**
 * Project n dimensions to n+1 dimensions by dividing the first dimension
 *   into cross sections.
 * 
 *   This artificially adds structure. It can also disrupt existing structure.
 *   Example: In dimensions [64] the points [7] and [8] are adjacent.
 *   After splitting to [8 8], these points [0 7] [1 0] are further apart.
 */
org.nfrac.comportex.topography.split_first_dimension = (function org$nfrac$comportex$topography$split_first_dimension(dims,xsection_length){
var temp__6728__auto__ = dims;
if(cljs.core.truth_(temp__6728__auto__)){
var vec__47444 = temp__6728__auto__;
var seq__47445 = cljs.core.seq(vec__47444);
var first__47446 = cljs.core.first(seq__47445);
var seq__47445__$1 = cljs.core.next(seq__47445);
var x = first__47446;
var rest = seq__47445__$1;
if((cljs.core.rem(x,xsection_length) === (0))){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(x,xsection_length)], null),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(dims,(0),xsection_length));
} else {
return null;
}
} else {
return null;
}
});
/**
 * Align n topographies along the x axis into a single topography.
 *   If the topographies don't stack neatly, force compatibility via two
 *   strategies:
 * 
 *   1. Add dimensions to the lower-dimensional topography by splitting its first
 *   dimension into cross sections. This is analogous to summing numbers encoded
 *   in a mixed radix. If the sum of `higher` and `lower` can be expressed by only
 *   changing the first digit of `higher`, then the two can be stacked in
 *   `higher`'s radix (i.e. dimensions).
 * 
 *   Default behavior: don't redistribute / mangle `lower`'s lower dimensions
 *   (i.e. [y, z, ...]). To force mangling, provide a 1-dimensional `lower`.
 * 
 *   2. Remove dimensions from the higher-dimension topography by squashing its
 *   last two dimensions into one.
 * 
 *   It's best to hand-pick compatible topographies if topography matters.
 */
org.nfrac.comportex.topography.combined_dimensions = (function org$nfrac$comportex$topography$combined_dimensions(var_args){
var args47448 = [];
var len__10461__auto___47458 = arguments.length;
var i__10462__auto___47459 = (0);
while(true){
if((i__10462__auto___47459 < len__10461__auto___47458)){
args47448.push((arguments[i__10462__auto___47459]));

var G__47460 = (i__10462__auto___47459 + (1));
i__10462__auto___47459 = G__47460;
continue;
} else {
}
break;
}

var G__47451 = args47448.length;
switch (G__47451) {
case 0:
return org.nfrac.comportex.topography.combined_dimensions.cljs$core$IFn$_invoke$arity$0();

break;
default:
var argseq__10484__auto__ = (new cljs.core.IndexedSeq(args47448.slice((0)),(0),null));
return org.nfrac.comportex.topography.combined_dimensions.cljs$core$IFn$_invoke$arity$variadic(argseq__10484__auto__);

}
});

org.nfrac.comportex.topography.combined_dimensions.cljs$core$IFn$_invoke$arity$0 = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null);
});

org.nfrac.comportex.topography.combined_dimensions.cljs$core$IFn$_invoke$arity$variadic = (function (all_dims){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2((function (dims1,dims2){
while(true){
var vec__47452 = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.count,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (dims1,dims2){
return (function (p1__47447_SHARP_){
if(cljs.core.empty_QMARK_(p1__47447_SHARP_)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null);
} else {
return p1__47447_SHARP_;
}
});})(dims1,dims2))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dims1,dims2], null)));
var lower = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47452,(0),null);
var higher = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47452,(1),null);
var disparity = (cljs.core.count(higher) - cljs.core.count(lower));
var vec__47455 = cljs.core.split_at(disparity,cljs.core.rest(higher));
var to_match = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47455,(0),null);
var must_already_match = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47455,(1),null);
var temp__6726__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.rest(lower)),cljs.core.vec(must_already_match)))?cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.topography.split_first_dimension,lower,cljs.core.reverse(to_match)):null);
if(cljs.core.truth_(temp__6726__auto__)){
var compatible = temp__6726__auto__;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(higher,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),cljs.core._PLUS_,cljs.core.first(compatible));
} else {
var G__47462 = org.nfrac.comportex.topography.squash_last_dimension(higher);
var G__47463 = lower;
dims1 = G__47462;
dims2 = G__47463;
continue;
}
break;
}
}),all_dims);
});

org.nfrac.comportex.topography.combined_dimensions.cljs$lang$applyTo = (function (seq47449){
return org.nfrac.comportex.topography.combined_dimensions.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq47449));
});

org.nfrac.comportex.topography.combined_dimensions.cljs$lang$maxFixedArity = (0);

cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_combined_DASH_dimensions,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__STAR_,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__STAR_,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.spec.rep_impl(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH__STAR_,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,null,null),cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_dimensions,null,null,null));
org.nfrac.comportex.topography.topo_union = (function org$nfrac$comportex$topography$topo_union(topos){
return org.nfrac.comportex.topography.make_topography(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.topography.combined_dimensions,cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.topography.dimensions,topos)));
});
cljs.spec.def_impl(cljs.core.cst$sym$org$nfrac$comportex$topography_SLASH_topo_DASH_union,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_fspec,cljs.core.cst$kw$args,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topos,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography)),cljs.core.cst$kw$ret,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography),cljs.spec.fspec_impl(cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topos,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography)),cljs.spec.cat_impl(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topos], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.every_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$cljs$spec_SLASH_conform_DASH_all,true,cljs.core.cst$kw$cljs$spec_SLASH_kind_DASH_form,null], null),null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography)], null)),null,null),cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_cat,cljs.core.cst$kw$topos,cljs.core.list(cljs.core.cst$sym$cljs$spec_SLASH_coll_DASH_of,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography)),cljs.spec.spec_impl.cljs$core$IFn$_invoke$arity$4(cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,null,null),cljs.core.cst$kw$org$nfrac$comportex$topography_SLASH_topography,null,null,null));
