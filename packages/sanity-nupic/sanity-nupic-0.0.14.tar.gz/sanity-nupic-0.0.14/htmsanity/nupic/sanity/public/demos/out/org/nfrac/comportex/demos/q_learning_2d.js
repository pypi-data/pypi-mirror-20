// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.q_learning_2d');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.demos.q_learning_1d');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('org.nfrac.comportex.layer');
org.nfrac.comportex.demos.q_learning_2d.input_dim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10),(40)], null);
org.nfrac.comportex.demos.q_learning_2d.grid_w = (7);
org.nfrac.comportex.demos.q_learning_2d.grid_h = (7);
org.nfrac.comportex.demos.q_learning_2d.n_on_bits = (40);
org.nfrac.comportex.demos.q_learning_2d.coord_radius = (5);
org.nfrac.comportex.demos.q_learning_2d.surface_coord_scale = (5);
org.nfrac.comportex.demos.q_learning_2d.empty_reward = (-3);
org.nfrac.comportex.demos.q_learning_2d.hazard_reward = (-200);
org.nfrac.comportex.demos.q_learning_2d.finish_reward = (200);
org.nfrac.comportex.demos.q_learning_2d.surface = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,(function (){var iter__10132__auto__ = (function org$nfrac$comportex$demos$q_learning_2d$iter__84259(s__84260){
return (new cljs.core.LazySeq(null,(function (){
var s__84260__$1 = s__84260;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__84260__$1);
if(temp__6728__auto__){
var s__84260__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__84260__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__84260__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__84262 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__84261 = (0);
while(true){
if((i__84261 < size__10131__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__84261);
cljs.core.chunk_append(b__84262,(function (){var iter__10132__auto__ = ((function (i__84261,x,c__10130__auto__,size__10131__auto__,b__84262,s__84260__$2,temp__6728__auto__){
return (function org$nfrac$comportex$demos$q_learning_2d$iter__84259_$_iter__84285(s__84286){
return (new cljs.core.LazySeq(null,((function (i__84261,x,c__10130__auto__,size__10131__auto__,b__84262,s__84260__$2,temp__6728__auto__){
return (function (){
var s__84286__$1 = s__84286;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__84286__$1);
if(temp__6728__auto____$1){
var s__84286__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__84286__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__84286__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__84288 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__84287 = (0);
while(true){
if((i__84287 < size__10131__auto____$1)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__84287);
cljs.core.chunk_append(b__84288,(function (){var G__84293 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__84293)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84293)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84293)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__84293)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__84293)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})());

var G__84305 = (i__84287 + (1));
i__84287 = G__84305;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84288),org$nfrac$comportex$demos$q_learning_2d$iter__84259_$_iter__84285(cljs.core.chunk_rest(s__84286__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84288),null);
}
} else {
var y = cljs.core.first(s__84286__$2);
return cljs.core.cons((function (){var G__84294 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__84294)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84294)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84294)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__84294)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__84294)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})(),org$nfrac$comportex$demos$q_learning_2d$iter__84259_$_iter__84285(cljs.core.rest(s__84286__$2)));
}
} else {
return null;
}
break;
}
});})(i__84261,x,c__10130__auto__,size__10131__auto__,b__84262,s__84260__$2,temp__6728__auto__))
,null,null));
});})(i__84261,x,c__10130__auto__,size__10131__auto__,b__84262,s__84260__$2,temp__6728__auto__))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.q_learning_2d.grid_h));
})());

var G__84306 = (i__84261 + (1));
i__84261 = G__84306;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84262),org$nfrac$comportex$demos$q_learning_2d$iter__84259(cljs.core.chunk_rest(s__84260__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84262),null);
}
} else {
var x = cljs.core.first(s__84260__$2);
return cljs.core.cons((function (){var iter__10132__auto__ = ((function (x,s__84260__$2,temp__6728__auto__){
return (function org$nfrac$comportex$demos$q_learning_2d$iter__84259_$_iter__84295(s__84296){
return (new cljs.core.LazySeq(null,((function (x,s__84260__$2,temp__6728__auto__){
return (function (){
var s__84296__$1 = s__84296;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__84296__$1);
if(temp__6728__auto____$1){
var s__84296__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__84296__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__84296__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__84298 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__84297 = (0);
while(true){
if((i__84297 < size__10131__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__84297);
cljs.core.chunk_append(b__84298,(function (){var G__84303 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__84303)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84303)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84303)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__84303)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__84303)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})());

var G__84307 = (i__84297 + (1));
i__84297 = G__84307;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84298),org$nfrac$comportex$demos$q_learning_2d$iter__84259_$_iter__84295(cljs.core.chunk_rest(s__84296__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84298),null);
}
} else {
var y = cljs.core.first(s__84296__$2);
return cljs.core.cons((function (){var G__84304 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1))], null),G__84304)){
return org.nfrac.comportex.demos.q_learning_2d.finish_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)) - (2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84304)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2))], null),G__84304)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_w,(2)),(cljs.core.quot(org.nfrac.comportex.demos.q_learning_2d.grid_h,(2)) - (1))], null),G__84304)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1)),(0)], null),G__84304)){
return org.nfrac.comportex.demos.q_learning_2d.hazard_reward;
} else {
return org.nfrac.comportex.demos.q_learning_2d.empty_reward;

}
}
}
}
}
})(),org$nfrac$comportex$demos$q_learning_2d$iter__84259_$_iter__84295(cljs.core.rest(s__84296__$2)));
}
} else {
return null;
}
break;
}
});})(x,s__84260__$2,temp__6728__auto__))
,null,null));
});})(x,s__84260__$2,temp__6728__auto__))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.q_learning_2d.grid_h));
})(),org$nfrac$comportex$demos$q_learning_2d$iter__84259(cljs.core.rest(s__84260__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.q_learning_2d.grid_w));
})());
org.nfrac.comportex.demos.q_learning_2d.initial_inval = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$z,(0),cljs.core.cst$kw$action,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(0),cljs.core.cst$kw$dy,(0)], null)], null);
org.nfrac.comportex.demos.q_learning_2d.params = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio,cljs.core.cst$kw$boost_DASH_active_DASH_every,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,cljs.core.cst$kw$adjust_DASH_overlap_DASH_duty_DASH_ratio],[0.02,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(30),(30)], null),0.5,(0),(100),0.15,(4),(300),(0)]);
org.nfrac.comportex.demos.q_learning_2d.action_params = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$ff_DASH_perm_DASH_init,cljs.core.cst$kw$q_DASH_alpha,cljs.core.cst$kw$boost_DASH_active_DASH_duty_DASH_ratio,cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$float_DASH_overlap_DASH_duty_DASH_ratio,cljs.core.cst$kw$q_DASH_discount,cljs.core.cst$kw$boost_DASH_active_DASH_every,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$activation_DASH_level,cljs.core.cst$kw$proximal,cljs.core.cst$kw$stable_DASH_activation_DASH_steps,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period,cljs.core.cst$kw$adjust_DASH_overlap_DASH_duty_DASH_ratio],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [0.35,0.45], null),0.75,0.05,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(4),(10)], null),0.5,(0),0.9,(1),3.0,(1),0.2,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$perm_DASH_inc,0.05,cljs.core.cst$kw$perm_DASH_dec,0.05,cljs.core.cst$kw$perm_DASH_connected,0.1,cljs.core.cst$kw$stimulus_DASH_threshold,(1),cljs.core.cst$kw$learn_QMARK_,false], null),(1),(1),(250),(0)]);
org.nfrac.comportex.demos.q_learning_2d.direction__GT_action = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$up,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(0),cljs.core.cst$kw$dy,(-1)], null),cljs.core.cst$kw$down,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(0),cljs.core.cst$kw$dy,(1)], null),cljs.core.cst$kw$left,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(-1),cljs.core.cst$kw$dy,(0)], null),cljs.core.cst$kw$right,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$dx,(1),cljs.core.cst$kw$dy,(0)], null)], null);
org.nfrac.comportex.demos.q_learning_2d.possible_directions = (function org$nfrac$comportex$demos$q_learning_2d$possible_directions(p__84308){
var vec__84313 = p__84308;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84313,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84313,(1),null);
var G__84316 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$down,null,cljs.core.cst$kw$up,null,cljs.core.cst$kw$right,null,cljs.core.cst$kw$left,null], null), null);
var G__84316__$1 = (((x === (0)))?cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__84316,cljs.core.cst$kw$left):G__84316);
var G__84316__$2 = (((y === (0)))?cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__84316__$1,cljs.core.cst$kw$up):G__84316__$1);
var G__84316__$3 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(x,(org.nfrac.comportex.demos.q_learning_2d.grid_w - (1))))?cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__84316__$2,cljs.core.cst$kw$right):G__84316__$2);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(y,(org.nfrac.comportex.demos.q_learning_2d.grid_h - (1)))){
return cljs.core.disj.cljs$core$IFn$_invoke$arity$2(G__84316__$3,cljs.core.cst$kw$down);
} else {
return G__84316__$3;
}
});
org.nfrac.comportex.demos.q_learning_2d.column__GT_signal = cljs.core.zipmap(cljs.core.range.cljs$core$IFn$_invoke$arity$0(),(function (){var iter__10132__auto__ = (function org$nfrac$comportex$demos$q_learning_2d$iter__84317(s__84318){
return (new cljs.core.LazySeq(null,(function (){
var s__84318__$1 = s__84318;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__84318__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var motion = cljs.core.first(xs__7284__auto__);
var iterys__10128__auto__ = ((function (s__84318__$1,motion,xs__7284__auto__,temp__6728__auto__){
return (function org$nfrac$comportex$demos$q_learning_2d$iter__84317_$_iter__84319(s__84320){
return (new cljs.core.LazySeq(null,((function (s__84318__$1,motion,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__84320__$1 = s__84320;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__84320__$1);
if(temp__6728__auto____$1){
var s__84320__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__84320__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__84320__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__84322 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__84321 = (0);
while(true){
if((i__84321 < size__10131__auto__)){
var influence = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__84321);
cljs.core.chunk_append(b__84322,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [motion,influence], null));

var G__84328 = (i__84321 + (1));
i__84321 = G__84328;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84322),org$nfrac$comportex$demos$q_learning_2d$iter__84317_$_iter__84319(cljs.core.chunk_rest(s__84320__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84322),null);
}
} else {
var influence = cljs.core.first(s__84320__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [motion,influence], null),org$nfrac$comportex$demos$q_learning_2d$iter__84317_$_iter__84319(cljs.core.rest(s__84320__$2)));
}
} else {
return null;
}
break;
}
});})(s__84318__$1,motion,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__84318__$1,motion,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.repeat.cljs$core$IFn$_invoke$arity$2((10),1.0)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$demos$q_learning_2d$iter__84317(cljs.core.rest(s__84318__$1)));
} else {
var G__84329 = cljs.core.rest(s__84318__$1);
s__84318__$1 = G__84329;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$up,cljs.core.cst$kw$down,cljs.core.cst$kw$left,cljs.core.cst$kw$right], null));
})());
org.nfrac.comportex.demos.q_learning_2d.select_action = (function org$nfrac$comportex$demos$q_learning_2d$select_action(htm,curr_pos){
var alyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action], null));
var acols = cljs.core.cst$kw$active_DASH_columns.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.core.layer_state(alyr));
var signals = cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.demos.q_learning_2d.column__GT_signal,acols);
var poss = org.nfrac.comportex.demos.q_learning_2d.possible_directions(curr_pos);
var G__84335 = cljs.core.key(cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key,cljs.core.val,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(poss,cljs.core.key),cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (alyr,acols,signals,poss){
return (function (m,p__84336){
var vec__84337 = p__84336;
var motion = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84337,(0),null);
var influence = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84337,(1),null);
return cljs.core.assoc_BANG_.cljs$core$IFn$_invoke$arity$3(m,motion,(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,motion,(0)) + influence));
});})(alyr,acols,signals,poss))
,cljs.core.transient$(cljs.core.zipmap(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$up,cljs.core.cst$kw$down,cljs.core.cst$kw$left,cljs.core.cst$kw$right], null),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1((0)))),signals)))));
return (org.nfrac.comportex.demos.q_learning_2d.direction__GT_action.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.q_learning_2d.direction__GT_action.cljs$core$IFn$_invoke$arity$1(G__84335) : org.nfrac.comportex.demos.q_learning_2d.direction__GT_action.call(null,G__84335));
});
org.nfrac.comportex.demos.q_learning_2d.apply_action = (function org$nfrac$comportex$demos$q_learning_2d$apply_action(inval){
var x = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval);
var y = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval);
var dx = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var dy = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var next_x = (function (){var x__9611__auto__ = (function (){var x__9618__auto__ = (x + dx);
var y__9619__auto__ = (org.nfrac.comportex.demos.q_learning_2d.grid_w - (1));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var next_y = (function (){var x__9611__auto__ = (function (){var x__9618__auto__ = (y + dy);
var y__9619__auto__ = (org.nfrac.comportex.demos.q_learning_2d.grid_h - (1));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var y__9612__auto__ = (0);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var next_z = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.demos.q_learning_2d.surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [next_x,next_y], null));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$x,next_x,cljs.core.array_seq([cljs.core.cst$kw$y,next_y,cljs.core.cst$kw$z,next_z], 0));
});
org.nfrac.comportex.demos.q_learning_2d.build = (function org$nfrac$comportex$demos$q_learning_2d$build(){
var sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.encoders.vec_selector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$x,cljs.core.cst$kw$y], 0)),org.nfrac.comportex.encoders.coordinate_encoder(org.nfrac.comportex.demos.q_learning_2d.input_dim,org.nfrac.comportex.demos.q_learning_2d.n_on_bits,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.q_learning_2d.surface_coord_scale,org.nfrac.comportex.demos.q_learning_2d.surface_coord_scale], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.q_learning_2d.coord_radius,org.nfrac.comportex.demos.q_learning_2d.coord_radius], null))], null);
var dx_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$dx], null),org.nfrac.comportex.encoders.linear_encoder.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100)], null),(30),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(1)], null))], null);
var dy_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$dy], null),org.nfrac.comportex.encoders.linear_encoder.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(100)], null),(30),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(-1),(1)], null))], null);
var msensor = org.nfrac.comportex.encoders.sensor_cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([dx_sensor,dy_sensor], 0));
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,org.nfrac.comportex.layer.layer_of_cells(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.demos.q_learning_2d.params,cljs.core.cst$kw$lateral_DASH_synapses_QMARK_,false)),cljs.core.cst$kw$action,org.nfrac.comportex.layer.layer_of_cells(org.nfrac.comportex.demos.q_learning_2d.action_params)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$input,sensor,cljs.core.cst$kw$motor,msensor], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ff_DASH_deps,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input], null),cljs.core.cst$kw$action,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer_DASH_a], null)], null),cljs.core.cst$kw$lat_DASH_deps,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$motor], null)], null)], null));
});
org.nfrac.comportex.demos.q_learning_2d.htm_step_with_action_selection = (function org$nfrac$comportex$demos$q_learning_2d$htm_step_with_action_selection(world_c){
return (function (htm,inval){
var htm_a = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.core.htm_activate(org.nfrac.comportex.core.htm_sense(htm,inval,cljs.core.cst$kw$ff)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_a], null),org.nfrac.comportex.core.layer_learn);
var reward = (0.01 * cljs.core.cst$kw$z.cljs$core$IFn$_invoke$arity$1(inval));
var terminal_state_QMARK_ = (org.nfrac.comportex.util.abs(cljs.core.cst$kw$z.cljs$core$IFn$_invoke$arity$1(inval)) >= (100));
var upd_htm = (cljs.core.truth_(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval))?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(htm_a,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action], null),org.nfrac.comportex.demos.q_learning_1d.q_learn,reward):cljs.core.assoc_in(htm_a,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action,cljs.core.cst$kw$Q_DASH_info], null),cljs.core.PersistentArrayMap.EMPTY));
var info = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(upd_htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action,cljs.core.cst$kw$Q_DASH_info], null));
var newQ = (function (){var x__9618__auto__ = (function (){var x__9611__auto__ = (cljs.core.cst$kw$Q_DASH_old.cljs$core$IFn$_invoke$arity$2(info,(0)) + cljs.core.cst$kw$adj.cljs$core$IFn$_invoke$arity$2(info,(0)));
var y__9612__auto__ = -1.0;
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var y__9619__auto__ = 1.0;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var Q_map = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.select_keys(inval,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x,cljs.core.cst$kw$y,cljs.core.cst$kw$action], null)),newQ);
var action = org.nfrac.comportex.demos.q_learning_2d.select_action(upd_htm,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval)], null));
var inval_with_action = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$action,action,cljs.core.array_seq([cljs.core.cst$kw$prev_DASH_action,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$Q_DASH_map,Q_map], 0));
var new_inval_84342 = ((terminal_state_QMARK_)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.nfrac.comportex.demos.q_learning_2d.initial_inval,cljs.core.cst$kw$Q_DASH_map,Q_map):org.nfrac.comportex.demos.q_learning_2d.apply_action(inval_with_action));
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(world_c,new_inval_84342);

var G__84341 = upd_htm;
var G__84341__$1 = org.nfrac.comportex.core.htm_sense(G__84341,inval_with_action,cljs.core.cst$kw$lat)
;
var G__84341__$2 = org.nfrac.comportex.core.htm_depolarise(G__84341__$1)
;
if(terminal_state_QMARK_){
return org.nfrac.comportex.core.break$(G__84341__$2,cljs.core.cst$kw$tm);
} else {
return G__84341__$2;
}
});
});
