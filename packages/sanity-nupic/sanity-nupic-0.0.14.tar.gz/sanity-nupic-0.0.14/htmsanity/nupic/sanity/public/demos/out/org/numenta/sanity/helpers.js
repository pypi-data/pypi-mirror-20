// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.helpers');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('reagent.core');
goog.require('org.numenta.sanity.util');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.core');
goog.require('goog.events');
goog.require('org.nfrac.comportex.util');
goog.require('goog.style');
org.numenta.sanity.helpers.loading_message_element = (function org$numenta$sanity$helpers$loading_message_element(){
return goog.dom.getElement("loading-message");
});
org.numenta.sanity.helpers.show = (function org$numenta$sanity$helpers$show(el){
return goog.dom.classes.add(el,"show");
});
org.numenta.sanity.helpers.hide = (function org$numenta$sanity$helpers$hide(el){
return goog.dom.classes.remove(el,"show");
});
org.numenta.sanity.helpers.ui_loading_message_until = (function org$numenta$sanity$helpers$ui_loading_message_until(finished_c){
var el = org.numenta.sanity.helpers.loading_message_element();
org.numenta.sanity.helpers.show(el);

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,el){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,el){
return (function (state_47816){
var state_val_47817 = (state_47816[(1)]);
if((state_val_47817 === (1))){
var state_47816__$1 = state_47816;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_47816__$1,(2),finished_c);
} else {
if((state_val_47817 === (2))){
var inst_47813 = (state_47816[(2)]);
var inst_47814 = org.numenta.sanity.helpers.hide(el);
var state_47816__$1 = (function (){var statearr_47818 = state_47816;
(statearr_47818[(7)] = inst_47814);

return statearr_47818;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_47816__$1,inst_47813);
} else {
return null;
}
}
});})(c__42110__auto__,el))
;
return ((function (switch__41984__auto__,c__42110__auto__,el){
return (function() {
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto____0 = (function (){
var statearr_47822 = [null,null,null,null,null,null,null,null];
(statearr_47822[(0)] = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto__);

(statearr_47822[(1)] = (1));

return statearr_47822;
});
var org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto____1 = (function (state_47816){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_47816);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e47823){if((e47823 instanceof Object)){
var ex__41988__auto__ = e47823;
var statearr_47824_47826 = state_47816;
(statearr_47824_47826[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_47816);

return cljs.core.cst$kw$recur;
} else {
throw e47823;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__47827 = state_47816;
state_47816 = G__47827;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto__ = function(state_47816){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto____1.call(this,state_47816);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto____0;
org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto____1;
return org$numenta$sanity$helpers$ui_loading_message_until_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,el))
})();
var state__42112__auto__ = (function (){var statearr_47825 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_47825[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_47825;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,el))
);

return c__42110__auto__;
});
org.numenta.sanity.helpers.with_ui_loading_message = (function org$numenta$sanity$helpers$with_ui_loading_message(f){
return org.numenta.sanity.helpers.ui_loading_message_until((function (){var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__){
return (function (state_47848){
var state_val_47849 = (state_47848[(1)]);
if((state_val_47849 === (1))){
var inst_47843 = cljs.core.async.timeout((100));
var state_47848__$1 = state_47848;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_47848__$1,(2),inst_47843);
} else {
if((state_val_47849 === (2))){
var inst_47845 = (state_47848[(2)]);
var inst_47846 = (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
var state_47848__$1 = (function (){var statearr_47850 = state_47848;
(statearr_47850[(7)] = inst_47845);

return statearr_47850;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_47848__$1,inst_47846);
} else {
return null;
}
}
});})(c__42110__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__){
return (function() {
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto____0 = (function (){
var statearr_47854 = [null,null,null,null,null,null,null,null];
(statearr_47854[(0)] = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto__);

(statearr_47854[(1)] = (1));

return statearr_47854;
});
var org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto____1 = (function (state_47848){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_47848);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e47855){if((e47855 instanceof Object)){
var ex__41988__auto__ = e47855;
var statearr_47856_47858 = state_47848;
(statearr_47856_47858[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_47848);

return cljs.core.cst$kw$recur;
} else {
throw e47855;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__47859 = state_47848;
state_47848 = G__47859;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto__ = function(state_47848){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto____1.call(this,state_47848);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto____0;
org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto____1;
return org$numenta$sanity$helpers$with_ui_loading_message_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__))
})();
var state__42112__auto__ = (function (){var statearr_47857 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_47857[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_47857;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__))
);

return c__42110__auto__;
})());
});
org.numenta.sanity.helpers.text_world_input_component = (function org$numenta$sanity$helpers$text_world_input_component(inval,htm,max_shown,scroll_every,separator){
var time = org.nfrac.comportex.core.timestep(htm);
var show_n = (max_shown - cljs.core.mod((max_shown - time),scroll_every));
var history = cljs.core.take_last(show_n,cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(inval)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,(function (){var iter__10132__auto__ = ((function (time,show_n,history){
return (function org$numenta$sanity$helpers$text_world_input_component_$_iter__47878(s__47879){
return (new cljs.core.LazySeq(null,((function (time,show_n,history){
return (function (){
var s__47879__$1 = s__47879;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__47879__$1);
if(temp__6728__auto__){
var s__47879__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47879__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__47879__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__47881 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__47880 = (0);
while(true){
if((i__47880 < size__10131__auto__)){
var vec__47890 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__47880);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47890,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47890,(1),null);
var t = (i + (time - (cljs.core.count(history) - (1))));
var curr_QMARK_ = (time === t);
cljs.core.chunk_append(b__47881,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((curr_QMARK_)?cljs.core.cst$kw$ins:cljs.core.cst$kw$span),[cljs.core.str(word),cljs.core.str(separator)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(word),cljs.core.str(t)].join('')], null)));

var G__47896 = (i__47880 + (1));
i__47880 = G__47896;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47881),org$numenta$sanity$helpers$text_world_input_component_$_iter__47878(cljs.core.chunk_rest(s__47879__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47881),null);
}
} else {
var vec__47893 = cljs.core.first(s__47879__$2);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47893,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47893,(1),null);
var t = (i + (time - (cljs.core.count(history) - (1))));
var curr_QMARK_ = (time === t);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((curr_QMARK_)?cljs.core.cst$kw$ins:cljs.core.cst$kw$span),[cljs.core.str(word),cljs.core.str(separator)].join('')], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(word),cljs.core.str(t)].join('')], null)),org$numenta$sanity$helpers$text_world_input_component_$_iter__47878(cljs.core.rest(s__47879__$2)));
}
} else {
return null;
}
break;
}
});})(time,show_n,history))
,null,null));
});})(time,show_n,history))
;
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,history));
})()], null);
});
org.numenta.sanity.helpers.predictions_table = (function org$numenta$sanity$helpers$predictions_table(predictions){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"prediction"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"votes %"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"votes per bit"], null)], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$helpers$predictions_table_$_iter__47923(s__47924){
return (new cljs.core.LazySeq(null,(function (){
var s__47924__$1 = s__47924;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__47924__$1);
if(temp__6728__auto__){
var s__47924__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47924__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__47924__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__47926 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__47925 = (0);
while(true){
if((i__47925 < size__10131__auto__)){
var vec__47939 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__47925);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47939,(0),null);
var map__47942 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47939,(1),null);
var map__47942__$1 = ((((!((map__47942 == null)))?((((map__47942.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47942.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47942):map__47942);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47942__$1,cljs.core.cst$kw$value);
var votes_frac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47942__$1,cljs.core.cst$kw$votes_DASH_frac);
var votes_per_bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47942__$1,cljs.core.cst$kw$votes_DASH_per_DASH_bit);
cljs.core.chunk_append(b__47926,(function (){var txt = value;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,txt], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((votes_frac * (100))))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1(votes_per_bit))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(txt),cljs.core.str(j)].join('')], null));
})());

var G__47949 = (i__47925 + (1));
i__47925 = G__47949;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47926),org$numenta$sanity$helpers$predictions_table_$_iter__47923(cljs.core.chunk_rest(s__47924__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47926),null);
}
} else {
var vec__47944 = cljs.core.first(s__47924__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47944,(0),null);
var map__47947 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47944,(1),null);
var map__47947__$1 = ((((!((map__47947 == null)))?((((map__47947.cljs$lang$protocol_mask$partition0$ & (64))) || (map__47947.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__47947):map__47947);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47947__$1,cljs.core.cst$kw$value);
var votes_frac = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47947__$1,cljs.core.cst$kw$votes_DASH_frac);
var votes_per_bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47947__$1,cljs.core.cst$kw$votes_DASH_per_DASH_bit);
return cljs.core.cons((function (){var txt = value;
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,txt], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((votes_frac * (100))))].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td$text_DASH_right,[cljs.core.str(org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1(votes_per_bit))].join('')], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,[cljs.core.str(txt),cljs.core.str(j)].join('')], null));
})(),org$numenta$sanity$helpers$predictions_table_$_iter__47923(cljs.core.rest(s__47924__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,predictions));
})()], null)], null)], null);
});
org.numenta.sanity.helpers.text_world_predictions_component = (function org$numenta$sanity$helpers$text_world_predictions_component(htm,n_predictions){
var predictions = org.nfrac.comportex.core.predictions.cljs$core$IFn$_invoke$arity$4(htm,cljs.core.first(org.nfrac.comportex.core.sense_keys(htm)),n_predictions,cljs.core.PersistentArrayMap.EMPTY);
return org.numenta.sanity.helpers.predictions_table(predictions);
});
org.numenta.sanity.helpers.canvas$call_draw_fn = (function org$numenta$sanity$helpers$canvas$call_draw_fn(component){
var vec__47954 = reagent.core.argv(component);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47954,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47954,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47954,(2),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47954,(3),null);
var ___$4 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47954,(4),null);
var draw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47954,(5),null);
var G__47957 = reagent.core.dom_node(component).getContext("2d");
return (draw.cljs$core$IFn$_invoke$arity$1 ? draw.cljs$core$IFn$_invoke$arity$1(G__47957) : draw.call(null,G__47957));
});
org.numenta.sanity.helpers.canvas = (function org$numenta$sanity$helpers$canvas(_,___$1,___$2,___$3,___$4){
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$component_DASH_did_DASH_mount,(function (p1__47958_SHARP_){
return org.numenta.sanity.helpers.canvas$call_draw_fn(p1__47958_SHARP_);
}),cljs.core.cst$kw$component_DASH_did_DASH_update,(function (p1__47959_SHARP_){
return org.numenta.sanity.helpers.canvas$call_draw_fn(p1__47959_SHARP_);
}),cljs.core.cst$kw$display_DASH_name,"canvas",cljs.core.cst$kw$reagent_DASH_render,(function (props,width,height,canaries,___$5){
var seq__47966_47972 = cljs.core.seq(canaries);
var chunk__47967_47973 = null;
var count__47968_47974 = (0);
var i__47969_47975 = (0);
while(true){
if((i__47969_47975 < count__47968_47974)){
var v_47976 = chunk__47967_47973.cljs$core$IIndexed$_nth$arity$2(null,i__47969_47975);
if(((!((v_47976 == null)))?((((v_47976.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_47976.cljs$core$IDeref$))?true:(((!v_47976.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_47976):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_47976))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_47976) : cljs.core.deref.call(null,v_47976));
} else {
}

var G__47977 = seq__47966_47972;
var G__47978 = chunk__47967_47973;
var G__47979 = count__47968_47974;
var G__47980 = (i__47969_47975 + (1));
seq__47966_47972 = G__47977;
chunk__47967_47973 = G__47978;
count__47968_47974 = G__47979;
i__47969_47975 = G__47980;
continue;
} else {
var temp__6728__auto___47981 = cljs.core.seq(seq__47966_47972);
if(temp__6728__auto___47981){
var seq__47966_47982__$1 = temp__6728__auto___47981;
if(cljs.core.chunked_seq_QMARK_(seq__47966_47982__$1)){
var c__10181__auto___47983 = cljs.core.chunk_first(seq__47966_47982__$1);
var G__47984 = cljs.core.chunk_rest(seq__47966_47982__$1);
var G__47985 = c__10181__auto___47983;
var G__47986 = cljs.core.count(c__10181__auto___47983);
var G__47987 = (0);
seq__47966_47972 = G__47984;
chunk__47967_47973 = G__47985;
count__47968_47974 = G__47986;
i__47969_47975 = G__47987;
continue;
} else {
var v_47988 = cljs.core.first(seq__47966_47982__$1);
if(((!((v_47988 == null)))?((((v_47988.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_47988.cljs$core$IDeref$))?true:(((!v_47988.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_47988):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_47988))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_47988) : cljs.core.deref.call(null,v_47988));
} else {
}

var G__47989 = cljs.core.next(seq__47966_47982__$1);
var G__47990 = null;
var G__47991 = (0);
var G__47992 = (0);
seq__47966_47972 = G__47989;
chunk__47967_47973 = G__47990;
count__47968_47974 = G__47991;
i__47969_47975 = G__47992;
continue;
}
} else {
}
}
break;
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$canvas,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,cljs.core.cst$kw$width,width,cljs.core.array_seq([cljs.core.cst$kw$height,height], 0))], null);
})], null));
});
org.numenta.sanity.helpers.window_resize_listener = (function org$numenta$sanity$helpers$window_resize_listener(resizes_c){

var resize_key = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$component_DASH_did_DASH_mount,((function (resize_key){
return (function (component){
var G__47999 = resize_key;
var G__48000 = (function (){var G__48001 = window;
var G__48002 = "resize";
var G__48003 = ((function (G__48001,G__48002,G__47999,resize_key){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(resizes_c,cljs.core.cst$kw$window_DASH_resized);
});})(G__48001,G__48002,G__47999,resize_key))
;
return goog.events.listen(G__48001,G__48002,G__48003);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__47999,G__48000) : cljs.core.reset_BANG_.call(null,G__47999,G__48000));
});})(resize_key))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (resize_key){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(resize_key) : cljs.core.deref.call(null,resize_key)))){
var G__48004 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(resize_key) : cljs.core.deref.call(null,resize_key));
return goog.events.unlistenByKey(G__48004);
} else {
return null;
}
});})(resize_key))
,cljs.core.cst$kw$display_DASH_name,"window-resize-listener",cljs.core.cst$kw$reagent_DASH_render,((function (resize_key){
return (function (_){
return null;
});})(resize_key))
], null));
});
org.numenta.sanity.helpers.resizing_canvas$call_draw_fn = (function org$numenta$sanity$helpers$resizing_canvas$call_draw_fn(component){
var vec__48009 = reagent.core.argv(component);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48009,(0),null);
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48009,(1),null);
var ___$2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48009,(2),null);
var draw = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48009,(3),null);
var ___$3 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48009,(4),null);
var G__48012 = reagent.core.dom_node(component).getContext("2d");
return (draw.cljs$core$IFn$_invoke$arity$1 ? draw.cljs$core$IFn$_invoke$arity$1(G__48012) : draw.call(null,G__48012));
});
org.numenta.sanity.helpers.resizing_canvas = (function org$numenta$sanity$helpers$resizing_canvas(_,___$1,___$2,invalidates_c,resizes){

var width_px = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var height_px = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var invalidates_c__$1 = (function (){var or__9278__auto__ = invalidates_c;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
}
})();
var teardown_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$component_DASH_did_DASH_mount,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (component){
var c__42110__auto___48204 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___48204,width_px,height_px,invalidates_c__$1,teardown_c){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___48204,width_px,height_px,invalidates_c__$1,teardown_c){
return (function (state_48163){
var state_val_48164 = (state_48163[(1)]);
if((state_val_48164 === (7))){
var inst_48138 = (state_48163[(2)]);
var inst_48139 = (inst_48138 == null);
var inst_48140 = cljs.core.not(inst_48139);
var state_48163__$1 = state_48163;
if(inst_48140){
var statearr_48165_48205 = state_48163__$1;
(statearr_48165_48205[(1)] = (14));

} else {
var statearr_48166_48206 = state_48163__$1;
(statearr_48166_48206[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (1))){
var state_48163__$1 = state_48163;
var statearr_48167_48207 = state_48163__$1;
(statearr_48167_48207[(2)] = null);

(statearr_48167_48207[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (4))){
var inst_48123 = (state_48163[(7)]);
var inst_48121 = (state_48163[(2)]);
var inst_48122 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_48121,(0),null);
var inst_48123__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_48121,(1),null);
var inst_48124 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_48123__$1,teardown_c);
var state_48163__$1 = (function (){var statearr_48168 = state_48163;
(statearr_48168[(7)] = inst_48123__$1);

(statearr_48168[(8)] = inst_48122);

return statearr_48168;
})();
if(inst_48124){
var statearr_48169_48208 = state_48163__$1;
(statearr_48169_48208[(1)] = (5));

} else {
var statearr_48170_48209 = state_48163__$1;
(statearr_48170_48209[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (15))){
var state_48163__$1 = state_48163;
var statearr_48171_48210 = state_48163__$1;
(statearr_48171_48210[(2)] = null);

(statearr_48171_48210[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (13))){
var inst_48134 = (state_48163[(2)]);
var state_48163__$1 = state_48163;
var statearr_48172_48211 = state_48163__$1;
(statearr_48172_48211[(2)] = inst_48134);

(statearr_48172_48211[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (6))){
var inst_48123 = (state_48163[(7)]);
var inst_48127 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_48123,invalidates_c__$1);
var state_48163__$1 = state_48163;
if(inst_48127){
var statearr_48173_48212 = state_48163__$1;
(statearr_48173_48212[(1)] = (8));

} else {
var statearr_48174_48213 = state_48163__$1;
(statearr_48174_48213[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (17))){
var inst_48144 = (state_48163[(9)]);
var inst_48145 = (state_48163[(10)]);
var inst_48149 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_48150 = [inst_48144,inst_48145];
var inst_48151 = (new cljs.core.PersistentVector(null,2,(5),inst_48149,inst_48150,null));
var inst_48152 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(resizes,inst_48151);
var state_48163__$1 = state_48163;
var statearr_48175_48214 = state_48163__$1;
(statearr_48175_48214[(2)] = inst_48152);

(statearr_48175_48214[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (3))){
var inst_48161 = (state_48163[(2)]);
var state_48163__$1 = state_48163;
return cljs.core.async.impl.ioc_helpers.return_chan(state_48163__$1,inst_48161);
} else {
if((state_val_48164 === (12))){
var state_48163__$1 = state_48163;
var statearr_48176_48215 = state_48163__$1;
(statearr_48176_48215[(2)] = null);

(statearr_48176_48215[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (2))){
var inst_48117 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_48118 = [teardown_c,invalidates_c__$1];
var inst_48119 = (new cljs.core.PersistentVector(null,2,(5),inst_48117,inst_48118,null));
var state_48163__$1 = state_48163;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_48163__$1,(4),inst_48119,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_48164 === (19))){
var inst_48155 = (state_48163[(2)]);
var state_48163__$1 = (function (){var statearr_48177 = state_48163;
(statearr_48177[(11)] = inst_48155);

return statearr_48177;
})();
var statearr_48178_48216 = state_48163__$1;
(statearr_48178_48216[(2)] = null);

(statearr_48178_48216[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (11))){
var inst_48122 = (state_48163[(8)]);
var state_48163__$1 = state_48163;
var statearr_48179_48217 = state_48163__$1;
(statearr_48179_48217[(2)] = inst_48122);

(statearr_48179_48217[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (9))){
var inst_48123 = (state_48163[(7)]);
var inst_48130 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_48123,cljs.core.cst$kw$default);
var state_48163__$1 = state_48163;
if(inst_48130){
var statearr_48180_48218 = state_48163__$1;
(statearr_48180_48218[(1)] = (11));

} else {
var statearr_48181_48219 = state_48163__$1;
(statearr_48181_48219[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (5))){
var state_48163__$1 = state_48163;
var statearr_48182_48220 = state_48163__$1;
(statearr_48182_48220[(2)] = null);

(statearr_48182_48220[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (14))){
var inst_48144 = (state_48163[(9)]);
var inst_48145 = (state_48163[(10)]);
var inst_48142 = reagent.core.dom_node(component);
var inst_48143 = goog.style.getSize(inst_48142);
var inst_48144__$1 = inst_48143.width;
var inst_48145__$1 = inst_48143.height;
var inst_48146 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(width_px,inst_48144__$1) : cljs.core.reset_BANG_.call(null,width_px,inst_48144__$1));
var inst_48147 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(height_px,inst_48145__$1) : cljs.core.reset_BANG_.call(null,height_px,inst_48145__$1));
var state_48163__$1 = (function (){var statearr_48183 = state_48163;
(statearr_48183[(9)] = inst_48144__$1);

(statearr_48183[(12)] = inst_48147);

(statearr_48183[(10)] = inst_48145__$1);

(statearr_48183[(13)] = inst_48146);

return statearr_48183;
})();
if(cljs.core.truth_(resizes)){
var statearr_48184_48221 = state_48163__$1;
(statearr_48184_48221[(1)] = (17));

} else {
var statearr_48185_48222 = state_48163__$1;
(statearr_48185_48222[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (16))){
var inst_48159 = (state_48163[(2)]);
var state_48163__$1 = state_48163;
var statearr_48186_48223 = state_48163__$1;
(statearr_48186_48223[(2)] = inst_48159);

(statearr_48186_48223[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (10))){
var inst_48136 = (state_48163[(2)]);
var state_48163__$1 = state_48163;
var statearr_48187_48224 = state_48163__$1;
(statearr_48187_48224[(2)] = inst_48136);

(statearr_48187_48224[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (18))){
var state_48163__$1 = state_48163;
var statearr_48188_48225 = state_48163__$1;
(statearr_48188_48225[(2)] = null);

(statearr_48188_48225[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_48164 === (8))){
var state_48163__$1 = state_48163;
var statearr_48189_48226 = state_48163__$1;
(statearr_48189_48226[(2)] = true);

(statearr_48189_48226[(1)] = (10));


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
}
}
}
}
}
}
}
}
}
});})(c__42110__auto___48204,width_px,height_px,invalidates_c__$1,teardown_c))
;
return ((function (switch__41984__auto__,c__42110__auto___48204,width_px,height_px,invalidates_c__$1,teardown_c){
return (function() {
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto____0 = (function (){
var statearr_48193 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_48193[(0)] = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto__);

(statearr_48193[(1)] = (1));

return statearr_48193;
});
var org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto____1 = (function (state_48163){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_48163);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e48194){if((e48194 instanceof Object)){
var ex__41988__auto__ = e48194;
var statearr_48195_48227 = state_48163;
(statearr_48195_48227[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_48163);

return cljs.core.cst$kw$recur;
} else {
throw e48194;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__48228 = state_48163;
state_48163 = G__48228;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto__ = function(state_48163){
switch(arguments.length){
case 0:
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto____1.call(this,state_48163);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto____0;
org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto____1;
return org$numenta$sanity$helpers$resizing_canvas_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___48204,width_px,height_px,invalidates_c__$1,teardown_c))
})();
var state__42112__auto__ = (function (){var statearr_48196 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_48196[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___48204);

return statearr_48196;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___48204,width_px,height_px,invalidates_c__$1,teardown_c))
);


return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(invalidates_c__$1,cljs.core.cst$kw$initial_DASH_mount);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$component_DASH_did_DASH_update,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (p1__48013_SHARP_){
return org.numenta.sanity.helpers.resizing_canvas$call_draw_fn(p1__48013_SHARP_);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (){
return cljs.core.async.close_BANG_(teardown_c);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
,cljs.core.cst$kw$display_DASH_name,"resizing-canvas",cljs.core.cst$kw$reagent_DASH_render,((function (width_px,height_px,invalidates_c__$1,teardown_c){
return (function (props,canaries,___$3,___$4){
var seq__48197_48229 = cljs.core.seq(canaries);
var chunk__48198_48230 = null;
var count__48199_48231 = (0);
var i__48200_48232 = (0);
while(true){
if((i__48200_48232 < count__48199_48231)){
var v_48233 = chunk__48198_48230.cljs$core$IIndexed$_nth$arity$2(null,i__48200_48232);
if(((!((v_48233 == null)))?((((v_48233.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_48233.cljs$core$IDeref$))?true:(((!v_48233.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_48233):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_48233))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_48233) : cljs.core.deref.call(null,v_48233));
} else {
}

var G__48234 = seq__48197_48229;
var G__48235 = chunk__48198_48230;
var G__48236 = count__48199_48231;
var G__48237 = (i__48200_48232 + (1));
seq__48197_48229 = G__48234;
chunk__48198_48230 = G__48235;
count__48199_48231 = G__48236;
i__48200_48232 = G__48237;
continue;
} else {
var temp__6728__auto___48238 = cljs.core.seq(seq__48197_48229);
if(temp__6728__auto___48238){
var seq__48197_48239__$1 = temp__6728__auto___48238;
if(cljs.core.chunked_seq_QMARK_(seq__48197_48239__$1)){
var c__10181__auto___48240 = cljs.core.chunk_first(seq__48197_48239__$1);
var G__48241 = cljs.core.chunk_rest(seq__48197_48239__$1);
var G__48242 = c__10181__auto___48240;
var G__48243 = cljs.core.count(c__10181__auto___48240);
var G__48244 = (0);
seq__48197_48229 = G__48241;
chunk__48198_48230 = G__48242;
count__48199_48231 = G__48243;
i__48200_48232 = G__48244;
continue;
} else {
var v_48245 = cljs.core.first(seq__48197_48239__$1);
if(((!((v_48245 == null)))?((((v_48245.cljs$lang$protocol_mask$partition0$ & (32768))) || (v_48245.cljs$core$IDeref$))?true:(((!v_48245.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_48245):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,v_48245))){
(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(v_48245) : cljs.core.deref.call(null,v_48245));
} else {
}

var G__48246 = cljs.core.next(seq__48197_48239__$1);
var G__48247 = null;
var G__48248 = (0);
var G__48249 = (0);
seq__48197_48229 = G__48246;
chunk__48198_48230 = G__48247;
count__48199_48231 = G__48248;
i__48200_48232 = G__48249;
continue;
}
} else {
}
}
break;
}

var w = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(width_px) : cljs.core.deref.call(null,width_px));
var h = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(height_px) : cljs.core.deref.call(null,height_px));
if(((w === (0))) || ((h === (0)))){
var G__48203_48250 = [cljs.core.str("The resizing canvas is size "),cljs.core.str(w),cljs.core.str(" "),cljs.core.str(h),cljs.core.str(". If it's 'display:none`, it won't detect "),cljs.core.str("its own visibility change.")].join('');
console.warn(G__48203_48250);
} else {
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$canvas,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(props,cljs.core.cst$kw$width,w,cljs.core.array_seq([cljs.core.cst$kw$height,h], 0))], null);
});})(width_px,height_px,invalidates_c__$1,teardown_c))
], null));
});
