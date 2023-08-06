// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.runner');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.main');
goog.require('org.numenta.sanity.bridge.remote');
goog.require('org.numenta.sanity.util');
goog.require('cljs.core.async');
org.numenta.sanity.demos.runner.key_value_display = (function org$numenta$sanity$demos$runner$key_value_display(k,v){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),k], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,v], null)], null)], null);
});
org.numenta.sanity.demos.runner.world_pane = (function org$numenta$sanity$demos$runner$world_pane(steps,selection){
if(cljs.core.truth_(cljs.core.not_empty((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))){
var step = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2(steps,selection);
var kvs = (function (){var temp__6726__auto__ = cljs.core.cst$kw$display_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
if(cljs.core.truth_(temp__6726__auto__)){
var display_value = temp__6726__auto__;
return cljs.core.seq(display_value);
} else {
if(cljs.core.truth_(cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step))){
var iter__10132__auto__ = ((function (temp__6726__auto__,step){
return (function org$numenta$sanity$demos$runner$world_pane_$_iter__70921(s__70922){
return (new cljs.core.LazySeq(null,((function (temp__6726__auto__,step){
return (function (){
var s__70922__$1 = s__70922;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__70922__$1);
if(temp__6728__auto__){
var s__70922__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__70922__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__70922__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__70924 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__70923 = (0);
while(true){
if((i__70923 < size__10131__auto__)){
var vec__70933 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__70923);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70933,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70933,(1),null);
cljs.core.chunk_append(b__70924,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(sense_id),[cljs.core.str(v)].join('')], null));

var G__70957 = (i__70923 + (1));
i__70923 = G__70957;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__70924),org$numenta$sanity$demos$runner$world_pane_$_iter__70921(cljs.core.chunk_rest(s__70922__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__70924),null);
}
} else {
var vec__70936 = cljs.core.first(s__70922__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70936,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70936,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name(sense_id),[cljs.core.str(v)].join('')], null),org$numenta$sanity$demos$runner$world_pane_$_iter__70921(cljs.core.rest(s__70922__$2)));
}
} else {
return null;
}
break;
}
});})(temp__6726__auto__,step))
,null,null));
});})(temp__6726__auto__,step))
;
return iter__10132__auto__(cljs.core.cst$kw$sensed_DASH_values.cljs$core$IFn$_invoke$arity$1(step));
} else {
return null;
}
}
})();
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div], null),(function (){var iter__10132__auto__ = ((function (step,kvs){
return (function org$numenta$sanity$demos$runner$world_pane_$_iter__70939(s__70940){
return (new cljs.core.LazySeq(null,((function (step,kvs){
return (function (){
var s__70940__$1 = s__70940;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__70940__$1);
if(temp__6728__auto__){
var s__70940__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__70940__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__70940__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__70942 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__70941 = (0);
while(true){
if((i__70941 < size__10131__auto__)){
var vec__70951 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__70941);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70951,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70951,(1),null);
cljs.core.chunk_append(b__70942,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.key_value_display,k,v], null));

var G__70958 = (i__70941 + (1));
i__70941 = G__70958;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__70942),org$numenta$sanity$demos$runner$world_pane_$_iter__70939(cljs.core.chunk_rest(s__70940__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__70942),null);
}
} else {
var vec__70954 = cljs.core.first(s__70940__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70954,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70954,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.key_value_display,k,v], null),org$numenta$sanity$demos$runner$world_pane_$_iter__70939(cljs.core.rest(s__70940__$2)));
}
} else {
return null;
}
break;
}
});})(step,kvs))
,null,null));
});})(step,kvs))
;
return iter__10132__auto__(kvs);
})());
} else {
return null;
}
});
org.numenta.sanity.demos.runner.init = (function org$numenta$sanity$demos$runner$init(var_args){
var args__10468__auto__ = [];
var len__10461__auto___70997 = arguments.length;
var i__10462__auto___70998 = (0);
while(true){
if((i__10462__auto___70998 < len__10461__auto___70997)){
args__10468__auto__.push((arguments[i__10462__auto___70998]));

var G__70999 = (i__10462__auto___70998 + (1));
i__10462__auto___70998 = G__70999;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((3) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((3)),(0),null)):null);
return org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__10469__auto__);
});
goog.exportSymbol('org.numenta.sanity.demos.runner.init', org.numenta.sanity.demos.runner.init);

org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic = (function (title,ws_url,selected_tab,feature_list){
var into_sim_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_sim_mult = cljs.core.async.mult(into_sim_in);
var into_sim_eavesdrop = org.numenta.sanity.util.tap_c(into_sim_mult);
var into_journal = org.numenta.sanity.main.into_journal;
var pipe_to_remote_target_BANG_ = org.numenta.sanity.bridge.remote.init(ws_url);
var features = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.keyword),feature_list);
var current_tab = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(selected_tab));
(pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2 ? pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2("journal",into_journal) : pipe_to_remote_target_BANG_.call(null,"journal",into_journal));

var G__70963_71000 = "simulation";
var G__70964_71001 = org.numenta.sanity.util.tap_c(into_sim_mult);
(pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2 ? pipe_to_remote_target_BANG_.cljs$core$IFn$_invoke$arity$2(G__70963_71000,G__70964_71001) : pipe_to_remote_target_BANG_.call(null,G__70963_71000,G__70964_71001));

var c__42110__auto___71002 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___71002,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features,current_tab){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___71002,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features,current_tab){
return (function (state_70981){
var state_val_70982 = (state_70981[(1)]);
if((state_val_70982 === (1))){
var state_70981__$1 = state_70981;
var statearr_70983_71003 = state_70981__$1;
(statearr_70983_71003[(2)] = null);

(statearr_70983_71003[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70982 === (2))){
var state_70981__$1 = state_70981;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70981__$1,(4),into_sim_eavesdrop);
} else {
if((state_val_70982 === (3))){
var inst_70979 = (state_70981[(2)]);
var state_70981__$1 = state_70981;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70981__$1,inst_70979);
} else {
if((state_val_70982 === (4))){
var inst_70967 = (state_70981[(2)]);
var inst_70968 = (inst_70967 == null);
var state_70981__$1 = state_70981;
if(cljs.core.truth_(inst_70968)){
var statearr_70984_71004 = state_70981__$1;
(statearr_70984_71004[(1)] = (5));

} else {
var statearr_70985_71005 = state_70981__$1;
(statearr_70985_71005[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70982 === (5))){
var state_70981__$1 = state_70981;
var statearr_70986_71006 = state_70981__$1;
(statearr_70986_71006[(2)] = null);

(statearr_70986_71006[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70982 === (6))){
var inst_70971 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70972 = ["ping"];
var inst_70973 = (new cljs.core.PersistentVector(null,1,(5),inst_70971,inst_70972,null));
var inst_70974 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,inst_70973);
var state_70981__$1 = (function (){var statearr_70987 = state_70981;
(statearr_70987[(7)] = inst_70974);

return statearr_70987;
})();
var statearr_70988_71007 = state_70981__$1;
(statearr_70988_71007[(2)] = null);

(statearr_70988_71007[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70982 === (7))){
var inst_70977 = (state_70981[(2)]);
var state_70981__$1 = state_70981;
var statearr_70989_71008 = state_70981__$1;
(statearr_70989_71008[(2)] = inst_70977);

(statearr_70989_71008[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
}
}
});})(c__42110__auto___71002,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features,current_tab))
;
return ((function (switch__41984__auto__,c__42110__auto___71002,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features,current_tab){
return (function() {
var org$numenta$sanity$demos$runner$state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$runner$state_machine__41985__auto____0 = (function (){
var statearr_70993 = [null,null,null,null,null,null,null,null];
(statearr_70993[(0)] = org$numenta$sanity$demos$runner$state_machine__41985__auto__);

(statearr_70993[(1)] = (1));

return statearr_70993;
});
var org$numenta$sanity$demos$runner$state_machine__41985__auto____1 = (function (state_70981){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70981);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70994){if((e70994 instanceof Object)){
var ex__41988__auto__ = e70994;
var statearr_70995_71009 = state_70981;
(statearr_70995_71009[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70981);

return cljs.core.cst$kw$recur;
} else {
throw e70994;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__71010 = state_70981;
state_70981 = G__71010;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$runner$state_machine__41985__auto__ = function(state_70981){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$runner$state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$runner$state_machine__41985__auto____1.call(this,state_70981);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$runner$state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$runner$state_machine__41985__auto____0;
org$numenta$sanity$demos$runner$state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$runner$state_machine__41985__auto____1;
return org$numenta$sanity$demos$runner$state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___71002,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features,current_tab))
})();
var state__42112__auto__ = (function (){var statearr_70996 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70996[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___71002);

return statearr_70996;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___71002,into_sim_in,into_sim_mult,into_sim_eavesdrop,into_journal,pipe_to_remote_target_BANG_,features,current_tab))
);


return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,title,null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.runner.world_pane,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection], null),current_tab,features,into_sim_in], null),goog.dom.getElement("sanity-app"));
});

org.numenta.sanity.demos.runner.init.cljs$lang$maxFixedArity = (3);

org.numenta.sanity.demos.runner.init.cljs$lang$applyTo = (function (seq70959){
var G__70960 = cljs.core.first(seq70959);
var seq70959__$1 = cljs.core.next(seq70959);
var G__70961 = cljs.core.first(seq70959__$1);
var seq70959__$2 = cljs.core.next(seq70959__$1);
var G__70962 = cljs.core.first(seq70959__$2);
var seq70959__$3 = cljs.core.next(seq70959__$2);
return org.numenta.sanity.demos.runner.init.cljs$core$IFn$_invoke$arity$variadic(G__70960,G__70961,G__70962,seq70959__$3);
});

