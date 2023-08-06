// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.simple_sentences');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.simple_sentences');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.demos.simple_sentences.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$n_DASH_layers,(1),cljs.core.cst$kw$repeats,(1),cljs.core.cst$kw$text,org.nfrac.comportex.demos.simple_sentences.input_text,cljs.core.cst$kw$world_DASH_buffer_DASH_count,(0)], null));
org.numenta.sanity.demos.simple_sentences.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.simple_sentences.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.simple_sentences.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((100),cljs.core.cst$kw$word,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__81753_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__81753_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$word.cljs$core$IFn$_invoke$arity$1(p1__81753_SHARP_));
}))));
org.numenta.sanity.demos.simple_sentences.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.simple_sentences.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.simple_sentences.model,cljs.core.cst$kw$org$numenta$sanity$demos$simple_DASH_sentences_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer));
}));
org.numenta.sanity.demos.simple_sentences.max_shown = (100);
org.numenta.sanity.demos.simple_sentences.scroll_every = (50);
org.numenta.sanity.demos.simple_sentences.world_pane = (function org$numenta$sanity$demos$simple_sentences$world_pane(){
var show_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$simple_DASH_sentences_SLASH_fetch_DASH_selected_DASH_htm,((function (show_predictions,selected_htm){
return (function (_,___$1,___$2,p__81771){
var vec__81772 = p__81771;
var sel1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81772,(0),null);
var temp__6728__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sel1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step,cljs.core.cst$kw$snapshot_DASH_id], null));
if(cljs.core.truth_(temp__6728__auto__)){
var snapshot_id = temp__6728__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",snapshot_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__81772,sel1,show_predictions,selected_htm){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__81772,sel1,show_predictions,selected_htm){
return (function (state_81779){
var state_val_81780 = (state_81779[(1)]);
if((state_val_81780 === (1))){
var state_81779__$1 = state_81779;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_81779__$1,(2),out_c);
} else {
if((state_val_81780 === (2))){
var inst_81776 = (state_81779[(2)]);
var inst_81777 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_81776) : cljs.core.reset_BANG_.call(null,selected_htm,inst_81776));
var state_81779__$1 = state_81779;
return cljs.core.async.impl.ioc_helpers.return_chan(state_81779__$1,inst_81777);
} else {
return null;
}
}
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__81772,sel1,show_predictions,selected_htm))
;
return ((function (switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__81772,sel1,show_predictions,selected_htm){
return (function() {
var org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_81784 = [null,null,null,null,null,null,null];
(statearr_81784[(0)] = org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto__);

(statearr_81784[(1)] = (1));

return statearr_81784;
});
var org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto____1 = (function (state_81779){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_81779);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e81785){if((e81785 instanceof Object)){
var ex__41988__auto__ = e81785;
var statearr_81786_81788 = state_81779;
(statearr_81786_81788[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_81779);

return cljs.core.cst$kw$recur;
} else {
throw e81785;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__81789 = state_81779;
state_81779 = G__81789;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto__ = function(state_81779){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto____1.call(this,state_81779);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$simple_sentences$world_pane_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__81772,sel1,show_predictions,selected_htm))
})();
var state__42112__auto__ = (function (){var statearr_81787 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_81787[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_81787;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__81772,sel1,show_predictions,selected_htm))
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
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min_DASH_height,"40vh"], null)], null),org.numenta.sanity.helpers.text_world_input_component(inval,htm,org.numenta.sanity.demos.simple_sentences.max_shown,org.numenta.sanity.demos.simple_sentences.scroll_every," ")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?true:null),cljs.core.cst$kw$on_DASH_change,((function (inval,htm,temp__6728__auto__,show_predictions,selected_htm){
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
org.numenta.sanity.demos.simple_sentences.set_model_BANG_ = (function org$numenta$sanity$demos$simple_sentences$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.model)) == null);
var G__81794_81798 = org.numenta.sanity.demos.simple_sentences.model;
var G__81795_81799 = org.nfrac.comportex.demos.simple_sentences.build.cljs$core$IFn$_invoke$arity$0();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__81794_81798,G__81795_81799) : cljs.core.reset_BANG_.call(null,G__81794_81798,G__81795_81799));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.model,org.numenta.sanity.demos.simple_sentences.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.simple_sentences.into_sim);
} else {
var G__81796 = org.numenta.sanity.main.network_shape;
var G__81797 = org.numenta.sanity.util.translate_network_shape(org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.model))));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__81796,G__81797) : cljs.core.reset_BANG_.call(null,G__81796,G__81797));
}
}));
});
org.numenta.sanity.demos.simple_sentences.send_text_BANG_ = (function org$numenta$sanity$demos$simple_sentences$send_text_BANG_(){
var temp__6728__auto__ = cljs.core.seq(org.nfrac.comportex.demos.simple_sentences.word_item_seq(cljs.core.cst$kw$repeats.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.config))),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.simple_sentences.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.simple_sentences.config)))));
if(temp__6728__auto__){
var xs = temp__6728__auto__;
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,xs,temp__6728__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,xs,temp__6728__auto__){
return (function (state_81822){
var state_val_81823 = (state_81822[(1)]);
if((state_val_81823 === (1))){
var inst_81816 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.simple_sentences.world_c,xs,false);
var state_81822__$1 = state_81822;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_81822__$1,(2),inst_81816);
} else {
if((state_val_81823 === (2))){
var inst_81818 = (state_81822[(2)]);
var inst_81819 = cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer);
var inst_81820 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_81819);
var state_81822__$1 = (function (){var statearr_81824 = state_81822;
(statearr_81824[(7)] = inst_81818);

return statearr_81824;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_81822__$1,inst_81820);
} else {
return null;
}
}
});})(c__42110__auto__,xs,temp__6728__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__,xs,temp__6728__auto__){
return (function() {
var org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_81828 = [null,null,null,null,null,null,null,null];
(statearr_81828[(0)] = org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto__);

(statearr_81828[(1)] = (1));

return statearr_81828;
});
var org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto____1 = (function (state_81822){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_81822);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e81829){if((e81829 instanceof Object)){
var ex__41988__auto__ = e81829;
var statearr_81830_81832 = state_81822;
(statearr_81830_81832[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_81822);

return cljs.core.cst$kw$recur;
} else {
throw e81829;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__81833 = state_81822;
state_81822 = G__81833;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto__ = function(state_81822){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto____1.call(this,state_81822);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$simple_sentences$send_text_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,xs,temp__6728__auto__))
})();
var state__42112__auto__ = (function (){var statearr_81831 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_81831[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_81831;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,xs,temp__6728__auto__))
);

return c__42110__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.simple_sentences.config_template = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Word sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__81834_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__81834_SHARP_) > (0));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__42110__auto___81877 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___81877){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___81877){
return (function (state_81856){
var state_val_81857 = (state_81856[(1)]);
if((state_val_81857 === (7))){
var inst_81842 = (state_81856[(2)]);
var state_81856__$1 = state_81856;
var statearr_81858_81878 = state_81856__$1;
(statearr_81858_81878[(2)] = inst_81842);

(statearr_81858_81878[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (1))){
var state_81856__$1 = state_81856;
var statearr_81859_81879 = state_81856__$1;
(statearr_81859_81879[(2)] = null);

(statearr_81859_81879[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (4))){
var state_81856__$1 = state_81856;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_81856__$1,(7),org.numenta.sanity.demos.simple_sentences.world_c);
} else {
if((state_val_81857 === (6))){
var inst_81845 = (state_81856[(2)]);
var state_81856__$1 = state_81856;
if(cljs.core.truth_(inst_81845)){
var statearr_81860_81880 = state_81856__$1;
(statearr_81860_81880[(1)] = (8));

} else {
var statearr_81861_81881 = state_81856__$1;
(statearr_81861_81881[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (3))){
var inst_81854 = (state_81856[(2)]);
var state_81856__$1 = state_81856;
return cljs.core.async.impl.ioc_helpers.return_chan(state_81856__$1,inst_81854);
} else {
if((state_val_81857 === (2))){
var inst_81839 = (state_81856[(7)]);
var inst_81838 = cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer);
var inst_81839__$1 = (inst_81838 > (0));
var state_81856__$1 = (function (){var statearr_81862 = state_81856;
(statearr_81862[(7)] = inst_81839__$1);

return statearr_81862;
})();
if(cljs.core.truth_(inst_81839__$1)){
var statearr_81863_81882 = state_81856__$1;
(statearr_81863_81882[(1)] = (4));

} else {
var statearr_81864_81883 = state_81856__$1;
(statearr_81864_81883[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (9))){
var state_81856__$1 = state_81856;
var statearr_81865_81884 = state_81856__$1;
(statearr_81865_81884[(2)] = null);

(statearr_81865_81884[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (5))){
var inst_81839 = (state_81856[(7)]);
var state_81856__$1 = state_81856;
var statearr_81866_81885 = state_81856__$1;
(statearr_81866_81885[(2)] = inst_81839);

(statearr_81866_81885[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (10))){
var inst_81852 = (state_81856[(2)]);
var state_81856__$1 = state_81856;
var statearr_81867_81886 = state_81856__$1;
(statearr_81867_81886[(2)] = inst_81852);

(statearr_81867_81886[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_81857 === (8))){
var inst_81847 = cljs.core.count(org.numenta.sanity.demos.simple_sentences.world_buffer);
var inst_81848 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.simple_sentences.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_81847);
var state_81856__$1 = (function (){var statearr_81868 = state_81856;
(statearr_81868[(8)] = inst_81848);

return statearr_81868;
})();
var statearr_81869_81887 = state_81856__$1;
(statearr_81869_81887[(2)] = null);

(statearr_81869_81887[(1)] = (2));


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
});})(c__42110__auto___81877))
;
return ((function (switch__41984__auto__,c__42110__auto___81877){
return (function() {
var org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto____0 = (function (){
var statearr_81873 = [null,null,null,null,null,null,null,null,null];
(statearr_81873[(0)] = org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto__);

(statearr_81873[(1)] = (1));

return statearr_81873;
});
var org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto____1 = (function (state_81856){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_81856);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e81874){if((e81874 instanceof Object)){
var ex__41988__auto__ = e81874;
var statearr_81875_81888 = state_81856;
(statearr_81875_81888[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_81856);

return cljs.core.cst$kw$recur;
} else {
throw e81874;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__81889 = state_81856;
state_81856 = G__81889;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto__ = function(state_81856){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto____1.call(this,state_81856);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto____0;
org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto____1;
return org$numenta$sanity$demos$simple_sentences$state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___81877))
})();
var state__42112__auto__ = (function (){var statearr_81876 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_81876[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___81877);

return statearr_81876;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___81877))
);


return e.preventDefault();
})], null),"Clear"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Repeats of each sentence:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$repeats], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$text,cljs.core.cst$kw$rows,(10)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__81835_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__81835_SHARP_) === (0));
}),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.simple_sentences.send_text_BANG_();

return e.preventDefault();
})], null),"Queue text input"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__81836_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__81836_SHARP_) > (0));
}),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.simple_sentences.send_text_BANG_();

return e.preventDefault();
})], null),"Queue more text input"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.simple_sentences.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.simple_sentences.model_tab = (function org$numenta$sanity$demos$simple_sentences$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"In this example, text is presented as a sequence of words,\n        with independent unique encodings. The text is split into\n        sentences at each period (.) and each sentence into\n        words."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.simple_sentences.config_template,org.numenta.sanity.demos.simple_sentences.config], null)], null);
});
org.numenta.sanity.demos.simple_sentences.init = (function org$numenta$sanity$demos$simple_sentences$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.simple_sentences.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.simple_sentences.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.simple_sentences.into_sim], null),goog.dom.getElement("sanity-app"));

org.numenta.sanity.demos.simple_sentences.send_text_BANG_();

return org.numenta.sanity.demos.simple_sentences.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.simple_sentences.init', org.numenta.sanity.demos.simple_sentences.init);
