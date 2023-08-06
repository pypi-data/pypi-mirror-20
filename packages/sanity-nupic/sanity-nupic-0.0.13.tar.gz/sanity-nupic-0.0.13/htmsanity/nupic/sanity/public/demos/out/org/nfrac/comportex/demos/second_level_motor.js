// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.second_level_motor');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.core');
goog.require('cljs.core.async');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('org.nfrac.comportex.layer');
goog.require('clojure.string');
org.nfrac.comportex.demos.second_level_motor.bit_width = (600);
org.nfrac.comportex.demos.second_level_motor.n_on_bits = (30);
org.nfrac.comportex.demos.second_level_motor.motor_bit_width = (10);
org.nfrac.comportex.demos.second_level_motor.motor_n_on_bits = (5);
org.nfrac.comportex.demos.second_level_motor.test_text = "one two three four.\nthe three little pigs.\n6874230\n1874235.\n6342785\n1342780.\n09785341\n29785346.\n04358796\n24358791.";
org.nfrac.comportex.demos.second_level_motor.parse_sentences = (function org$nfrac$comportex$demos$second_level_motor$parse_sentences(text_STAR_){
var text = clojure.string.lower_case(clojure.string.trim(text_STAR_));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__84878_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.vec,p1__84878_SHARP_);
});})(text))
,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__84877_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__84877_SHARP_,/[^\w']+/);
});})(text))
,clojure.string.split.cljs$core$IFn$_invoke$arity$2(text,/[^\w]*\.+[^\w]*/)));
});
org.nfrac.comportex.demos.second_level_motor.params = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1000)], null),cljs.core.cst$kw$depth,(8),cljs.core.cst$kw$proximal,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$perm_DASH_stable_DASH_inc,0.15,cljs.core.cst$kw$perm_DASH_inc,0.04,cljs.core.cst$kw$perm_DASH_dec,0.01], null),cljs.core.cst$kw$lateral_DASH_synapses_QMARK_,true,cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,0.0,cljs.core.cst$kw$apical,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$learn_QMARK_,true], null)], null);
org.nfrac.comportex.demos.second_level_motor.higher_level_params = org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.demos.second_level_motor.params,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(800)], null),cljs.core.cst$kw$ff_DASH_init_DASH_frac,0.05,cljs.core.cst$kw$proximal,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$max_DASH_segments,(5),cljs.core.cst$kw$new_DASH_synapse_DASH_count,(12),cljs.core.cst$kw$learn_DASH_threshold,(6)], null)], null)], 0));
org.nfrac.comportex.demos.second_level_motor.initial_inval = (function org$nfrac$comportex$demos$second_level_motor$initial_inval(sentences){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$sentences,sentences,cljs.core.cst$kw$position,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null),cljs.core.cst$kw$value,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sentences,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null)),cljs.core.cst$kw$action,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_word_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_sentence_DASH_saccade,(-1)], null)], null);
});
org.nfrac.comportex.demos.second_level_motor.next_position = (function org$nfrac$comportex$demos$second_level_motor$next_position(p__84879,action){
var vec__84883 = p__84879;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84883,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84883,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84883,(2),null);
if((cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) > (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(i + (1)),(0),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_word_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) > (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,(j + (1)),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_word_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,(0),(0)], null);
} else {
if((cljs.core.cst$kw$next_DASH_letter_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) > (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j,(k + (1))], null);
} else {
if((cljs.core.cst$kw$next_DASH_letter_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action) < (0))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j,(0)], null);
} else {
return null;
}
}
}
}
}
}
});
org.nfrac.comportex.demos.second_level_motor.apply_action = (function org$nfrac$comportex$demos$second_level_motor$apply_action(inval){
var new_posn = org.nfrac.comportex.demos.second_level_motor.next_position(cljs.core.cst$kw$position.cljs$core$IFn$_invoke$arity$1(inval),cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var new_value = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$sentences.cljs$core$IFn$_invoke$arity$1(inval),new_posn);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$position,new_posn,cljs.core.array_seq([cljs.core.cst$kw$value,new_value], 0));
});
org.nfrac.comportex.demos.second_level_motor.letter_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$value,org.nfrac.comportex.encoders.unique_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.second_level_motor.bit_width], null),org.nfrac.comportex.demos.second_level_motor.n_on_bits)], null);
org.nfrac.comportex.demos.second_level_motor.letter_motor_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$next_DASH_letter_DASH_saccade], null),org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.second_level_motor.motor_bit_width], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(-1)], null))], null);
org.nfrac.comportex.demos.second_level_motor.word_motor_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$action,cljs.core.cst$kw$next_DASH_word_DASH_saccade], null),org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.second_level_motor.motor_bit_width], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),(-1)], null))], null);
org.nfrac.comportex.demos.second_level_motor.build = (function org$nfrac$comportex$demos$second_level_motor$build(var_args){
var args84886 = [];
var len__10461__auto___84889 = arguments.length;
var i__10462__auto___84890 = (0);
while(true){
if((i__10462__auto___84890 < len__10461__auto___84889)){
args84886.push((arguments[i__10462__auto___84890]));

var G__84891 = (i__10462__auto___84890 + (1));
i__10462__auto___84890 = G__84891;
continue;
} else {
}
break;
}

var G__84888 = args84886.length;
switch (G__84888) {
case 0:
return org.nfrac.comportex.demos.second_level_motor.build.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return org.nfrac.comportex.demos.second_level_motor.build.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args84886.length)].join('')));

}
});

org.nfrac.comportex.demos.second_level_motor.build.cljs$core$IFn$_invoke$arity$0 = (function (){
return org.nfrac.comportex.demos.second_level_motor.build.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.second_level_motor.params);
});

org.nfrac.comportex.demos.second_level_motor.build.cljs$core$IFn$_invoke$arity$1 = (function (params){
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,org.nfrac.comportex.layer.layer_of_cells(params),cljs.core.cst$kw$layer_DASH_b,org.nfrac.comportex.layer.layer_of_cells(org.nfrac.comportex.demos.second_level_motor.higher_level_params)], null),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$input,org.nfrac.comportex.demos.second_level_motor.letter_sensor,cljs.core.cst$kw$letter_DASH_motor,org.nfrac.comportex.demos.second_level_motor.letter_motor_sensor,cljs.core.cst$kw$word_DASH_motor,org.nfrac.comportex.demos.second_level_motor.word_motor_sensor], null),org.nfrac.comportex.core.add_feedback_deps(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ff_DASH_deps,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input], null),cljs.core.cst$kw$layer_DASH_b,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layer_DASH_a], null)], null),cljs.core.cst$kw$lat_DASH_deps,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$letter_DASH_motor], null),cljs.core.cst$kw$layer_DASH_b,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$word_DASH_motor], null)], null)], null)));
});

org.nfrac.comportex.demos.second_level_motor.build.cljs$lang$maxFixedArity = 1;

org.nfrac.comportex.demos.second_level_motor.htm_step_with_action_selection = (function org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection(world_c,control_c){

var c__42110__auto___84971 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___84971){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___84971){
return (function (state_84948){
var state_val_84949 = (state_84948[(1)]);
if((state_val_84949 === (1))){
var state_84948__$1 = state_84948;
var statearr_84950_84972 = state_84948__$1;
(statearr_84950_84972[(2)] = null);

(statearr_84950_84972[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84949 === (2))){
var state_84948__$1 = state_84948;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_84948__$1,(4),control_c);
} else {
if((state_val_84949 === (3))){
var inst_84946 = (state_84948[(2)]);
var state_84948__$1 = state_84948;
return cljs.core.async.impl.ioc_helpers.return_chan(state_84948__$1,inst_84946);
} else {
if((state_val_84949 === (4))){
var inst_84934 = (state_84948[(7)]);
var inst_84934__$1 = (state_84948[(2)]);
var state_84948__$1 = (function (){var statearr_84951 = state_84948;
(statearr_84951[(7)] = inst_84934__$1);

return statearr_84951;
})();
if(cljs.core.truth_(inst_84934__$1)){
var statearr_84952_84973 = state_84948__$1;
(statearr_84952_84973[(1)] = (5));

} else {
var statearr_84953_84974 = state_84948__$1;
(statearr_84953_84974[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_84949 === (5))){
var state_84948__$1 = state_84948;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_84948__$1,(8),world_c);
} else {
if((state_val_84949 === (6))){
var state_84948__$1 = state_84948;
var statearr_84954_84975 = state_84948__$1;
(statearr_84954_84975[(2)] = null);

(statearr_84954_84975[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84949 === (7))){
var inst_84944 = (state_84948[(2)]);
var state_84948__$1 = state_84948;
var statearr_84955_84976 = state_84948__$1;
(statearr_84955_84976[(2)] = inst_84944);

(statearr_84955_84976[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84949 === (8))){
var inst_84934 = (state_84948[(7)]);
var inst_84937 = (state_84948[(2)]);
var inst_84938 = (inst_84934.cljs$core$IFn$_invoke$arity$1 ? inst_84934.cljs$core$IFn$_invoke$arity$1(inst_84937) : inst_84934.call(null,inst_84937));
var state_84948__$1 = state_84948;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_84948__$1,(9),world_c,inst_84938);
} else {
if((state_val_84949 === (9))){
var inst_84940 = (state_84948[(2)]);
var state_84948__$1 = (function (){var statearr_84956 = state_84948;
(statearr_84956[(8)] = inst_84940);

return statearr_84956;
})();
var statearr_84957_84977 = state_84948__$1;
(statearr_84957_84977[(2)] = null);

(statearr_84957_84977[(1)] = (2));


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
});})(c__42110__auto___84971))
;
return ((function (switch__41984__auto__,c__42110__auto___84971){
return (function() {
var org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto__ = null;
var org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto____0 = (function (){
var statearr_84961 = [null,null,null,null,null,null,null,null,null];
(statearr_84961[(0)] = org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto__);

(statearr_84961[(1)] = (1));

return statearr_84961;
});
var org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto____1 = (function (state_84948){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_84948);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84962){if((e84962 instanceof Object)){
var ex__41988__auto__ = e84962;
var statearr_84963_84978 = state_84948;
(statearr_84963_84978[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_84948);

return cljs.core.cst$kw$recur;
} else {
throw e84962;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84979 = state_84948;
state_84948 = G__84979;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto__ = function(state_84948){
switch(arguments.length){
case 0:
return org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto____0.call(this);
case 1:
return org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto____1.call(this,state_84948);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto____0;
org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto____1;
return org$nfrac$comportex$demos$second_level_motor$htm_step_with_action_selection_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___84971))
})();
var state__42112__auto__ = (function (){var statearr_84964 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84964[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___84971);

return statearr_84964;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___84971))
);


return (function (htm,inval){
var htm_a = org.nfrac.comportex.core.htm_learn(org.nfrac.comportex.core.htm_activate(org.nfrac.comportex.core.htm_sense(htm,inval,cljs.core.cst$kw$ff)));
var vec__84965 = cljs.core.cst$kw$position.cljs$core$IFn$_invoke$arity$1(inval);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84965,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84965,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84965,(2),null);
var sentences = cljs.core.cst$kw$sentences.cljs$core$IFn$_invoke$arity$1(inval);
var sentence = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sentences,i);
var word = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sentence,j);
var end_of_word_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,(cljs.core.count(word) - (1)));
var end_of_sentence_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(j,(cljs.core.count(sentence) - (1)));
var end_of_passage_QMARK_ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(i,(cljs.core.count(sentences) - (1)));
var lyr_a = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm_a,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_a], null));
var lyr_b = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm_a,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_b], null));
var a_signal = org.nfrac.comportex.core.signal(lyr_a);
var a_stability = (cljs.core.count(cljs.core.cst$kw$org$nfrac$comportex$layer_SLASH_stable_DASH_bits.cljs$core$IFn$_invoke$arity$1(a_signal)) / cljs.core.count(cljs.core.cst$kw$bits.cljs$core$IFn$_invoke$arity$1(a_signal)));
var word_burst_QMARK_ = (function (){var G__84968 = cljs.core.cst$kw$word_DASH_bursting_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
if((k > (0))){
var or__9278__auto__ = G__84968;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (a_stability < 0.5);
}
} else {
return G__84968;
}
})();
var sent_burst_QMARK_ = (function (){var G__84969 = cljs.core.cst$kw$sentence_DASH_bursting_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
if((k > (0))){
var or__9278__auto__ = G__84969;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (a_stability < 0.5);
}
} else {
return G__84969;
}
})();
var action_STAR_ = ((!(end_of_word_QMARK_))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(1)], null):(cljs.core.truth_(word_burst_QMARK_)?new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false], null):((!(end_of_sentence_QMARK_))?new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,(1),cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false], null):(cljs.core.truth_(sent_burst_QMARK_)?new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,false], null):((!(end_of_passage_QMARK_))?new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$next_DASH_sentence_DASH_saccade,(1),cljs.core.cst$kw$next_DASH_word_DASH_saccade,(1),cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,false], null):new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,(-1),cljs.core.cst$kw$next_DASH_letter_DASH_saccade,(-1),cljs.core.cst$kw$word_DASH_bursting_QMARK_,false,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,false], null)
)))));
var action = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$next_DASH_word_DASH_saccade,null,cljs.core.cst$kw$next_DASH_sentence_DASH_saccade,(0),cljs.core.cst$kw$word_DASH_bursting_QMARK_,word_burst_QMARK_,cljs.core.cst$kw$sentence_DASH_bursting_QMARK_,sent_burst_QMARK_], null),action_STAR_], 0));
var inval_with_action = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(inval,cljs.core.cst$kw$action,action,cljs.core.array_seq([cljs.core.cst$kw$prev_DASH_action,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval)], 0));
var new_inval_84980 = org.nfrac.comportex.demos.second_level_motor.apply_action(inval_with_action);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(world_c,new_inval_84980);

var G__84970 = htm_a;
var G__84970__$1 = org.nfrac.comportex.core.htm_sense(G__84970,inval_with_action,cljs.core.cst$kw$lat)
;
var G__84970__$2 = org.nfrac.comportex.core.htm_depolarise(G__84970__$1)
;
var G__84970__$3 = ((end_of_word_QMARK_)?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__84970__$2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_a], null),org.nfrac.comportex.core.break$,cljs.core.cst$kw$tm):G__84970__$2);
var G__84970__$4 = (((end_of_word_QMARK_) && (cljs.core.not(word_burst_QMARK_)))?cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__84970__$3,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_a], null),org.nfrac.comportex.core.break$,cljs.core.cst$kw$syns):G__84970__$3);
if((end_of_word_QMARK_) && (cljs.core.not(word_burst_QMARK_))){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(G__84970__$4,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$layer_DASH_b], null),org.nfrac.comportex.core.break$,cljs.core.cst$kw$winners);
} else {
return G__84970__$4;
}
});
});
