// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.letters');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.letters');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.demos.letters.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$n_DASH_layers,(1),cljs.core.cst$kw$world_DASH_buffer_DASH_count,(0)], null));
org.numenta.sanity.demos.letters.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.letters.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.letters.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((300),cljs.core.cst$kw$value,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__83245_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__83245_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__83245_SHARP_));
}))));
org.numenta.sanity.demos.letters.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.letters.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.add_watch(org.numenta.sanity.demos.letters.model,cljs.core.cst$kw$org$numenta$sanity$demos$letters_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.letters.world_buffer));
}));
org.numenta.sanity.demos.letters.text_to_send = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("Jane has eyes.\nJane has a head.\nJane has a mouth.\nJane has a brain.\nJane has a book.\nJane has no friend.\n\nChifung has eyes.\nChifung has a head.\nChifung has a mouth.\nChifung has a brain.\nChifung has no book.\nChifung has a friend.");
org.numenta.sanity.demos.letters.max_shown = (300);
org.numenta.sanity.demos.letters.scroll_every = (150);
org.numenta.sanity.demos.letters.world_pane = (function org$numenta$sanity$demos$letters$world_pane(){
var show_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$letters_SLASH_fetch_DASH_selected_DASH_htm,((function (show_predictions,selected_htm){
return (function (_,___$1,___$2,p__83263){
var vec__83264 = p__83263;
var sel1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83264,(0),null);
var temp__6728__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sel1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step,cljs.core.cst$kw$snapshot_DASH_id], null));
if(cljs.core.truth_(temp__6728__auto__)){
var snapshot_id = temp__6728__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",snapshot_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83264,sel1,show_predictions,selected_htm){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83264,sel1,show_predictions,selected_htm){
return (function (state_83271){
var state_val_83272 = (state_83271[(1)]);
if((state_val_83272 === (1))){
var state_83271__$1 = state_83271;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83271__$1,(2),out_c);
} else {
if((state_val_83272 === (2))){
var inst_83268 = (state_83271[(2)]);
var inst_83269 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_83268) : cljs.core.reset_BANG_.call(null,selected_htm,inst_83268));
var state_83271__$1 = state_83271;
return cljs.core.async.impl.ioc_helpers.return_chan(state_83271__$1,inst_83269);
} else {
return null;
}
}
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83264,sel1,show_predictions,selected_htm))
;
return ((function (switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83264,sel1,show_predictions,selected_htm){
return (function() {
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_83276 = [null,null,null,null,null,null,null];
(statearr_83276[(0)] = org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto__);

(statearr_83276[(1)] = (1));

return statearr_83276;
});
var org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto____1 = (function (state_83271){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_83271);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e83277){if((e83277 instanceof Object)){
var ex__41988__auto__ = e83277;
var statearr_83278_83280 = state_83271;
(statearr_83278_83280[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_83271);

return cljs.core.cst$kw$recur;
} else {
throw e83277;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83281 = state_83271;
state_83271 = G__83281;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto__ = function(state_83271){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto____1.call(this,state_83271);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$letters$world_pane_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83264,sel1,show_predictions,selected_htm))
})();
var state__42112__auto__ = (function (){var statearr_83279 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_83279[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_83279;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83264,sel1,show_predictions,selected_htm))
);

return c__42110__auto__;
} else {
return null;
}
});})(show_predictions,selected_htm))
);

return ((function (show_predictions,selected_htm){
return (function (){
var temp__6728__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm));
if(cljs.core.truth_(temp__6728__auto__)){
var htm = temp__6728__auto__;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min_DASH_height,"40vh"], null)], null),org.numenta.sanity.helpers.text_world_input_component(inval,htm,org.numenta.sanity.demos.letters.max_shown,org.numenta.sanity.demos.letters.scroll_every,"")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?true:null),cljs.core.cst$kw$on_DASH_change,((function (inval,htm,temp__6728__auto__,show_predictions,selected_htm){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_predictions,cljs.core.not);

return e.preventDefault();
});})(inval,htm,temp__6728__auto__,show_predictions,selected_htm))
], null)], null),"Compute predictions"], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?org.numenta.sanity.helpers.text_world_predictions_component(htm,(8)):null)], null);
} else {
return null;
}
});
;})(show_predictions,selected_htm))
});
org.numenta.sanity.demos.letters.set_model_BANG_ = (function org$numenta$sanity$demos$letters$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.model)) == null);
var G__83286_83290 = org.numenta.sanity.demos.letters.model;
var G__83287_83291 = org.nfrac.comportex.demos.letters.build.cljs$core$IFn$_invoke$arity$0();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__83286_83290,G__83287_83291) : cljs.core.reset_BANG_.call(null,G__83286_83290,G__83287_83291));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.model,org.numenta.sanity.demos.letters.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.letters.into_sim);
} else {
var G__83288 = org.numenta.sanity.main.network_shape;
var G__83289 = org.numenta.sanity.util.translate_network_shape(org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.model))));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__83288,G__83289) : cljs.core.reset_BANG_.call(null,G__83288,G__83289));
}
}));
});
org.numenta.sanity.demos.letters.immediate_key_down_BANG_ = (function org$numenta$sanity$demos$letters$immediate_key_down_BANG_(e){
var temp__6728__auto___83298 = cljs.core.seq(org.nfrac.comportex.demos.letters.clean_text(String.fromCharCode(e.charCode)));
if(temp__6728__auto___83298){
var vec__83295_83299 = temp__6728__auto___83298;
var x_83300 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83295_83299,(0),null);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.letters.world_c,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x_83300)].join('')], null));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.letters.world_buffer));
});
org.numenta.sanity.demos.letters.send_text_BANG_ = (function org$numenta$sanity$demos$letters$send_text_BANG_(){
var temp__6728__auto__ = cljs.core.seq(org.nfrac.comportex.demos.letters.clean_text((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.text_to_send) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.text_to_send))));
if(temp__6728__auto__){
var xs = temp__6728__auto__;
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,xs,temp__6728__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,xs,temp__6728__auto__){
return (function (state_83337){
var state_val_83338 = (state_83337[(1)]);
if((state_val_83338 === (1))){
var inst_83329 = (function (){return ((function (state_val_83338,c__42110__auto__,xs,temp__6728__auto__){
return (function org$numenta$sanity$demos$letters$send_text_BANG__$_iter__83325(s__83326){
return (new cljs.core.LazySeq(null,((function (state_val_83338,c__42110__auto__,xs,temp__6728__auto__){
return (function (){
var s__83326__$1 = s__83326;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__83326__$1);
if(temp__6728__auto____$1){
var s__83326__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__83326__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__83326__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__83328 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__83327 = (0);
while(true){
if((i__83327 < size__10131__auto__)){
var x = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__83327);
cljs.core.chunk_append(b__83328,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x)].join('')], null));

var G__83349 = (i__83327 + (1));
i__83327 = G__83349;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83328),org$numenta$sanity$demos$letters$send_text_BANG__$_iter__83325(cljs.core.chunk_rest(s__83326__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83328),null);
}
} else {
var x = cljs.core.first(s__83326__$2);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$value,[cljs.core.str(x)].join('')], null),org$numenta$sanity$demos$letters$send_text_BANG__$_iter__83325(cljs.core.rest(s__83326__$2)));
}
} else {
return null;
}
break;
}
});})(state_val_83338,c__42110__auto__,xs,temp__6728__auto__))
,null,null));
});
;})(state_val_83338,c__42110__auto__,xs,temp__6728__auto__))
})();
var inst_83330 = (inst_83329.cljs$core$IFn$_invoke$arity$1 ? inst_83329.cljs$core$IFn$_invoke$arity$1(xs) : inst_83329.call(null,xs));
var inst_83331 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.letters.world_c,inst_83330,false);
var state_83337__$1 = state_83337;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83337__$1,(2),inst_83331);
} else {
if((state_val_83338 === (2))){
var inst_83333 = (state_83337[(2)]);
var inst_83334 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_83335 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_83334);
var state_83337__$1 = (function (){var statearr_83341 = state_83337;
(statearr_83341[(7)] = inst_83333);

return statearr_83341;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_83337__$1,inst_83335);
} else {
return null;
}
}
});})(c__42110__auto__,xs,temp__6728__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__,xs,temp__6728__auto__){
return (function() {
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_83345 = [null,null,null,null,null,null,null,null];
(statearr_83345[(0)] = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto__);

(statearr_83345[(1)] = (1));

return statearr_83345;
});
var org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto____1 = (function (state_83337){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_83337);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e83346){if((e83346 instanceof Object)){
var ex__41988__auto__ = e83346;
var statearr_83347_83350 = state_83337;
(statearr_83347_83350[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_83337);

return cljs.core.cst$kw$recur;
} else {
throw e83346;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83351 = state_83337;
state_83337 = G__83351;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto__ = function(state_83337){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto____1.call(this,state_83337);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$letters$send_text_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,xs,temp__6728__auto__))
})();
var state__42112__auto__ = (function (){var statearr_83348 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_83348[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_83348;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,xs,temp__6728__auto__))
);

return c__42110__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.letters.config_template = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.letters.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.letters.model_tab = (function org$numenta$sanity$demos$letters$model_tab(){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"In this example, text input is presented as a sequence of\n        letters, with independent unique encodings. It is transformed\n        to lower case, and all whitespace is squashed into single\n        spaces."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Letter sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,[cljs.core.str(cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.config)))),cljs.core.str(" queued input values.")].join('')," ",(((cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.config))) > (0)))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__42110__auto___83438 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___83438){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___83438){
return (function (state_83414){
var state_val_83415 = (state_83414[(1)]);
if((state_val_83415 === (7))){
var inst_83400 = (state_83414[(2)]);
var state_83414__$1 = state_83414;
var statearr_83416_83439 = state_83414__$1;
(statearr_83416_83439[(2)] = inst_83400);

(statearr_83416_83439[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (1))){
var state_83414__$1 = state_83414;
var statearr_83417_83440 = state_83414__$1;
(statearr_83417_83440[(2)] = null);

(statearr_83417_83440[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (4))){
var state_83414__$1 = state_83414;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83414__$1,(7),org.numenta.sanity.demos.letters.world_c);
} else {
if((state_val_83415 === (6))){
var inst_83403 = (state_83414[(2)]);
var state_83414__$1 = state_83414;
if(cljs.core.truth_(inst_83403)){
var statearr_83418_83441 = state_83414__$1;
(statearr_83418_83441[(1)] = (8));

} else {
var statearr_83419_83442 = state_83414__$1;
(statearr_83419_83442[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (3))){
var inst_83412 = (state_83414[(2)]);
var state_83414__$1 = state_83414;
return cljs.core.async.impl.ioc_helpers.return_chan(state_83414__$1,inst_83412);
} else {
if((state_val_83415 === (2))){
var inst_83397 = (state_83414[(7)]);
var inst_83396 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_83397__$1 = (inst_83396 > (0));
var state_83414__$1 = (function (){var statearr_83420 = state_83414;
(statearr_83420[(7)] = inst_83397__$1);

return statearr_83420;
})();
if(cljs.core.truth_(inst_83397__$1)){
var statearr_83421_83443 = state_83414__$1;
(statearr_83421_83443[(1)] = (4));

} else {
var statearr_83422_83444 = state_83414__$1;
(statearr_83422_83444[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (9))){
var state_83414__$1 = state_83414;
var statearr_83423_83445 = state_83414__$1;
(statearr_83423_83445[(2)] = null);

(statearr_83423_83445[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (5))){
var inst_83397 = (state_83414[(7)]);
var state_83414__$1 = state_83414;
var statearr_83424_83446 = state_83414__$1;
(statearr_83424_83446[(2)] = inst_83397);

(statearr_83424_83446[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (10))){
var inst_83410 = (state_83414[(2)]);
var state_83414__$1 = state_83414;
var statearr_83425_83447 = state_83414__$1;
(statearr_83425_83447[(2)] = inst_83410);

(statearr_83425_83447[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83415 === (8))){
var inst_83405 = cljs.core.count(org.numenta.sanity.demos.letters.world_buffer);
var inst_83406 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.letters.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_83405);
var state_83414__$1 = (function (){var statearr_83426 = state_83414;
(statearr_83426[(8)] = inst_83406);

return statearr_83426;
})();
var statearr_83427_83448 = state_83414__$1;
(statearr_83427_83448[(2)] = null);

(statearr_83427_83448[(1)] = (2));


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
}
}
}
});})(c__42110__auto___83438))
;
return ((function (switch__41984__auto__,c__42110__auto___83438){
return (function() {
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto____0 = (function (){
var statearr_83431 = [null,null,null,null,null,null,null,null,null];
(statearr_83431[(0)] = org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto__);

(statearr_83431[(1)] = (1));

return statearr_83431;
});
var org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto____1 = (function (state_83414){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_83414);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e83432){if((e83432 instanceof Object)){
var ex__41988__auto__ = e83432;
var statearr_83433_83449 = state_83414;
(statearr_83433_83449[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_83414);

return cljs.core.cst$kw$recur;
} else {
throw e83432;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83450 = state_83414;
state_83414 = G__83450;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto__ = function(state_83414){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto____1.call(this,state_83414);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$letters$model_tab_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___83438))
})();
var state__42112__auto__ = (function (){var statearr_83434 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_83434[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___83438);

return statearr_83434;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___83438))
);


return e.preventDefault();
})], null),"Clear"], null):null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$well,"Immediate input as you type: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$size,(2),cljs.core.cst$kw$maxLength,(1),cljs.core.cst$kw$on_DASH_key_DASH_press,(function (e){
org.numenta.sanity.demos.letters.immediate_key_down_BANG_(e);

return e.preventDefault();
})], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$well,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"90%",cljs.core.cst$kw$height,"10em"], null),cljs.core.cst$kw$value,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.letters.text_to_send) : cljs.core.deref.call(null,org.numenta.sanity.demos.letters.text_to_send)),cljs.core.cst$kw$on_DASH_change,(function (e){
var G__83435_83451 = org.numenta.sanity.demos.letters.text_to_send;
var G__83436_83452 = (function (){var G__83437 = e.target;
return goog.dom.forms.getValue(G__83437);
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__83435_83451,G__83436_83452) : cljs.core.reset_BANG_.call(null,G__83435_83451,G__83436_83452));

return e.preventDefault();
})], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,(((cljs.core.count(org.numenta.sanity.demos.letters.world_buffer) > (0)))?"btn-default":"btn-primary"),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.letters.send_text_BANG_();

return e.preventDefault();
})], null),(((cljs.core.count(org.numenta.sanity.demos.letters.world_buffer) > (0)))?"Queue more text input":"Queue text input")], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.letters.config_template,org.numenta.sanity.demos.letters.config], null)], null);
});
org.numenta.sanity.demos.letters.init = (function org$numenta$sanity$demos$letters$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.letters.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.letters.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.letters.into_sim], null),goog.dom.getElement("sanity-app"));

org.numenta.sanity.demos.letters.send_text_BANG_();

return org.numenta.sanity.demos.letters.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.letters.init', org.numenta.sanity.demos.letters.init);
