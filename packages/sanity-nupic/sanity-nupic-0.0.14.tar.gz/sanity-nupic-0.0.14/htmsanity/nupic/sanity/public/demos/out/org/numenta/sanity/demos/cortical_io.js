// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.cortical_io');
goog.require('cljs.core');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.nfrac.comportex.cortical_io');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('org.nfrac.comportex.layer');
goog.require('clojure.string');
org.numenta.sanity.demos.cortical_io.fox_eats_what = "\nfrog eat flies.\ncow eat grain.\nelephant eat leaves.\ngoat eat grass.\nwolf eat rabbit.\ncat likes ball.\nelephant likes water.\nsheep eat grass.\ncat eat salmon.\nwolf eat mice.\nlion eat cow.\ndog likes sleep.\ncoyote eat mice.\ncoyote eat rodent.\ncoyote eat rabbit.\nwolf eat squirrel.\ncow eat grass.\nfrog eat flies.\ncow eat grain.\nelephant eat leaves.\ngoat eat grass.\nwolf eat rabbit.\nsheep eat grass.\ncat eat salmon.\nwolf eat mice.\nlion eat cow.\ncoyote eat mice.\nelephant likes water.\ncat likes ball.\ncoyote eat rodent.\ncoyote eat rabbit.\nwolf eat squirrel.\ndog likes sleep.\ncat eat salmon.\ncat likes ball.\ncow eat grass.\nfox eat something.\n";
org.numenta.sanity.demos.cortical_io.fingerprint_cache = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
org.numenta.sanity.demos.cortical_io.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$decode_DASH_locally_QMARK_,cljs.core.cst$kw$cache_DASH_count,cljs.core.cst$kw$repeats,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_,cljs.core.cst$kw$encoder,cljs.core.cst$kw$n_DASH_layers,cljs.core.cst$kw$have_DASH_model_QMARK_,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$params_DASH_choice,cljs.core.cst$kw$api_DASH_key,cljs.core.cst$kw$text],[true,(0),(3),false,cljs.core.cst$kw$cortical_DASH_io,(1),false,(0),cljs.core.cst$kw$a,null,org.numenta.sanity.demos.cortical_io.fox_eats_what]));
org.numenta.sanity.demos.cortical_io.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.cortical_io.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.cortical_io.world_buffer,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((100),cljs.core.cst$kw$word,cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__85168_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__85168_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$word.cljs$core$IFn$_invoke$arity$1(p1__85168_SHARP_));
}))));
org.numenta.sanity.demos.cortical_io.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.cortical_io.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.cortical_io.model,cljs.core.cst$kw$org$numenta$sanity$demos$cortical_DASH_io_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.cortical_io.world_buffer));
}));
cljs.core.add_watch(org.numenta.sanity.demos.cortical_io.fingerprint_cache,cljs.core.cst$kw$count,(function (_,___$1,___$2,v){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$cache_DASH_count,cljs.core.count(v));
}));
org.numenta.sanity.demos.cortical_io.params_global = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$column_DASH_dimensions,cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,cljs.core.cst$kw$ff_DASH_init_DASH_frac,cljs.core.cst$kw$distal,cljs.core.cst$kw$max_DASH_boost,cljs.core.cst$kw$ff_DASH_potential_DASH_radius,cljs.core.cst$kw$activation_DASH_level,cljs.core.cst$kw$proximal,cljs.core.cst$kw$depth,cljs.core.cst$kw$duty_DASH_cycle_DASH_period],[new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(30),(40)], null),(0),0.2,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$perm_DASH_connected,cljs.core.cst$kw$max_DASH_synapse_DASH_count,cljs.core.cst$kw$max_DASH_segments,cljs.core.cst$kw$perm_DASH_init,cljs.core.cst$kw$new_DASH_synapse_DASH_count,cljs.core.cst$kw$stimulus_DASH_threshold,cljs.core.cst$kw$punish_QMARK_,cljs.core.cst$kw$perm_DASH_dec,cljs.core.cst$kw$learn_DASH_threshold,cljs.core.cst$kw$perm_DASH_inc],[0.2,(18),(5),0.16,(12),(9),true,0.01,(6),0.05]),2.0,1.0,0.02,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$perm_DASH_inc,0.05,cljs.core.cst$kw$perm_DASH_dec,0.005,cljs.core.cst$kw$perm_DASH_connected,0.2,cljs.core.cst$kw$stimulus_DASH_threshold,(1)], null),(5),(100000)]);
org.numenta.sanity.demos.cortical_io.params_local = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.demos.cortical_io.params_global,cljs.core.cst$kw$ff_DASH_init_DASH_frac,0.3,cljs.core.array_seq([cljs.core.cst$kw$ff_DASH_potential_DASH_radius,0.2,cljs.core.cst$kw$spatial_DASH_pooling,cljs.core.cst$kw$local_DASH_inhibition,cljs.core.cst$kw$inhibition_DASH_base_DASH_distance,(1)], 0));
org.numenta.sanity.demos.cortical_io.higher_level_params_diff = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(300)], null)], null);
org.numenta.sanity.demos.cortical_io.load_predictions = (function org$numenta$sanity$demos$cortical_io$load_predictions(htm,n_predictions,predictions_cache){
var vec__85185 = cljs.core.first(cljs.core.vals(cljs.core.cst$kw$sensors.cljs$core$IFn$_invoke$arity$1(htm)));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85185,(0),null);
var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85185,(1),null);
var lyr = cljs.core.first(org.nfrac.comportex.core.layer_seq(htm));
var pr_votes = org.nfrac.comportex.core.layer_decode_to_ff_bits(lyr,cljs.core.PersistentArrayMap.EMPTY);
var predictions = org.nfrac.comportex.core.decode(e,pr_votes,n_predictions);
var temp__6726__auto__ = cljs.core.cst$kw$channel.cljs$core$IFn$_invoke$arity$1(predictions);
if(cljs.core.truth_(temp__6726__auto__)){
var c = temp__6726__auto__;
var c__42110__auto___85201 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___85201,c,temp__6726__auto__,vec__85185,_,e,lyr,pr_votes,predictions){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___85201,c,temp__6726__auto__,vec__85185,_,e,lyr,pr_votes,predictions){
return (function (state_85192){
var state_val_85193 = (state_85192[(1)]);
if((state_val_85193 === (1))){
var state_85192__$1 = state_85192;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_85192__$1,(2),c);
} else {
if((state_val_85193 === (2))){
var inst_85189 = (state_85192[(2)]);
var inst_85190 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(predictions_cache,cljs.core.assoc,htm,inst_85189);
var state_85192__$1 = state_85192;
return cljs.core.async.impl.ioc_helpers.return_chan(state_85192__$1,inst_85190);
} else {
return null;
}
}
});})(c__42110__auto___85201,c,temp__6726__auto__,vec__85185,_,e,lyr,pr_votes,predictions))
;
return ((function (switch__41984__auto__,c__42110__auto___85201,c,temp__6726__auto__,vec__85185,_,e,lyr,pr_votes,predictions){
return (function() {
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto____0 = (function (){
var statearr_85197 = [null,null,null,null,null,null,null];
(statearr_85197[(0)] = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto__);

(statearr_85197[(1)] = (1));

return statearr_85197;
});
var org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto____1 = (function (state_85192){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_85192);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e85198){if((e85198 instanceof Object)){
var ex__41988__auto__ = e85198;
var statearr_85199_85202 = state_85192;
(statearr_85199_85202[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_85192);

return cljs.core.cst$kw$recur;
} else {
throw e85198;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__85203 = state_85192;
state_85192 = G__85203;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto__ = function(state_85192){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto____1.call(this,state_85192);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$cortical_io$load_predictions_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___85201,c,temp__6726__auto__,vec__85185,_,e,lyr,pr_votes,predictions))
})();
var state__42112__auto__ = (function (){var statearr_85200 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_85200[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___85201);

return statearr_85200;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___85201,c,temp__6726__auto__,vec__85185,_,e,lyr,pr_votes,predictions))
);


return null;
} else {
return predictions;
}
});
org.numenta.sanity.demos.cortical_io.max_shown = (100);
org.numenta.sanity.demos.cortical_io.scroll_every = (50);
org.numenta.sanity.demos.cortical_io.world_pane = (function org$numenta$sanity$demos$cortical_io$world_pane(){
var show_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var predictions_cache = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$cortical_DASH_io_SLASH_fetch_DASH_selected_DASH_htm,((function (show_predictions,predictions_cache,selected_htm){
return (function (_,___$1,___$2,p__85221){
var vec__85222 = p__85221;
var sel1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85222,(0),null);
var temp__6728__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sel1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step,cljs.core.cst$kw$snapshot_DASH_id], null));
if(cljs.core.truth_(temp__6728__auto__)){
var snapshot_id = temp__6728__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",snapshot_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(out_c)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__85222,sel1,show_predictions,predictions_cache,selected_htm){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__85222,sel1,show_predictions,predictions_cache,selected_htm){
return (function (state_85229){
var state_val_85230 = (state_85229[(1)]);
if((state_val_85230 === (1))){
var state_85229__$1 = state_85229;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_85229__$1,(2),out_c);
} else {
if((state_val_85230 === (2))){
var inst_85226 = (state_85229[(2)]);
var inst_85227 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_85226) : cljs.core.reset_BANG_.call(null,selected_htm,inst_85226));
var state_85229__$1 = state_85229;
return cljs.core.async.impl.ioc_helpers.return_chan(state_85229__$1,inst_85227);
} else {
return null;
}
}
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__85222,sel1,show_predictions,predictions_cache,selected_htm))
;
return ((function (switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__85222,sel1,show_predictions,predictions_cache,selected_htm){
return (function() {
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_85234 = [null,null,null,null,null,null,null];
(statearr_85234[(0)] = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto__);

(statearr_85234[(1)] = (1));

return statearr_85234;
});
var org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto____1 = (function (state_85229){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_85229);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e85235){if((e85235 instanceof Object)){
var ex__41988__auto__ = e85235;
var statearr_85236_85238 = state_85229;
(statearr_85236_85238[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_85229);

return cljs.core.cst$kw$recur;
} else {
throw e85235;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__85239 = state_85229;
state_85229 = G__85239;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto__ = function(state_85229){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto____1.call(this,state_85229);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$cortical_io$world_pane_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__85222,sel1,show_predictions,predictions_cache,selected_htm))
})();
var state__42112__auto__ = (function (){var statearr_85237 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_85237[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_85237;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__85222,sel1,show_predictions,predictions_cache,selected_htm))
);

return c__42110__auto__;
} else {
return null;
}
});})(show_predictions,predictions_cache,selected_htm))
);

return ((function (show_predictions,predictions_cache,selected_htm){
return (function (){
var temp__6728__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm));
if(cljs.core.truth_(temp__6728__auto__)){
var htm = temp__6728__auto__;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min_DASH_height,"40vh"], null)], null),org.numenta.sanity.helpers.text_world_input_component(inval,htm,org.numenta.sanity.demos.cortical_io.max_shown,org.numenta.sanity.demos.cortical_io.scroll_every," ")], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$class,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?"active":null),cljs.core.cst$kw$on_DASH_click,((function (inval,htm,temp__6728__auto__,show_predictions,predictions_cache,selected_htm){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_predictions,cljs.core.not);

return e.preventDefault();
});})(inval,htm,temp__6728__auto__,show_predictions,predictions_cache,selected_htm))
], null),"Compute predictions"], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_predictions) : cljs.core.deref.call(null,show_predictions)))?(function (){var temp__6726__auto__ = (function (){var or__9278__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(predictions_cache) : cljs.core.deref.call(null,predictions_cache)),htm);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return org.numenta.sanity.demos.cortical_io.load_predictions(htm,(8),predictions_cache);
}
})();
if(cljs.core.truth_(temp__6726__auto__)){
var predictions = temp__6726__auto__;
return org.numenta.sanity.helpers.predictions_table(predictions);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,"Loading predictions..."], null);
}
})():null)], null);
} else {
return null;
}
});
;})(show_predictions,predictions_cache,selected_htm))
});
org.numenta.sanity.demos.cortical_io.split_sentences = (function org$numenta$sanity$demos$cortical_io$split_sentences(text){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__85241_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(p1__85241_SHARP_,".");
}),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p1__85240_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__85240_SHARP_,/[^\w']+/);
}),clojure.string.split.cljs$core$IFn$_invoke$arity$2(clojure.string.trim(text),/[^\w]*[\.\!\?]+[^\w]*/)));
});
/**
 * An input sequence consisting of words from the given text, with
 * periods separating sentences also included as distinct words. Each
 * sequence element has the form `{:word _, :index [i j]}`, where i is
 * the sentence index and j is the word index into sentence j.
 */
org.numenta.sanity.demos.cortical_io.word_item_seq = (function org$numenta$sanity$demos$cortical_io$word_item_seq(n_repeats,text){
var iter__10132__auto__ = (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315(s__85316){
return (new cljs.core.LazySeq(null,(function (){
var s__85316__$1 = s__85316;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__85316__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__85356 = cljs.core.first(xs__7284__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85356,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85356,(1),null);
var iterys__10128__auto__ = ((function (s__85316__$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315_$_iter__85317(s__85318){
return (new cljs.core.LazySeq(null,((function (s__85316__$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__85318__$1 = s__85318;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__85318__$1);
if(temp__6728__auto____$1){
var xs__7284__auto____$1 = temp__6728__auto____$1;
var rep = cljs.core.first(xs__7284__auto____$1);
var iterys__10128__auto__ = ((function (s__85318__$1,s__85316__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315_$_iter__85317_$_iter__85319(s__85320){
return (new cljs.core.LazySeq(null,((function (s__85318__$1,s__85316__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__85320__$1 = s__85320;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__85320__$1);
if(temp__6728__auto____$2){
var s__85320__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__85320__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__85320__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__85322 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__85321 = (0);
while(true){
if((i__85321 < size__10131__auto__)){
var vec__85382 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__85321);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85382,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85382,(1),null);
cljs.core.chunk_append(b__85322,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__85388 = (i__85321 + (1));
i__85321 = G__85388;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__85322),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315_$_iter__85317_$_iter__85319(cljs.core.chunk_rest(s__85320__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__85322),null);
}
} else {
var vec__85385 = cljs.core.first(s__85320__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85385,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85385,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315_$_iter__85317_$_iter__85319(cljs.core.rest(s__85320__$2)));
}
} else {
return null;
}
break;
}
});})(s__85318__$1,s__85316__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__85318__$1,s__85316__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315_$_iter__85317(cljs.core.rest(s__85318__$1)));
} else {
var G__85389 = cljs.core.rest(s__85318__$1);
s__85318__$1 = G__85389;
continue;
}
} else {
return null;
}
break;
}
});})(s__85316__$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__85316__$1,vec__85356,i,sen,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$numenta$sanity$demos$cortical_io$word_item_seq_$_iter__85315(cljs.core.rest(s__85316__$1)));
} else {
var G__85390 = cljs.core.rest(s__85316__$1);
s__85316__$1 = G__85390;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,org.numenta.sanity.demos.cortical_io.split_sentences(text)));
});
/**
 * Kicks off the process to load the fingerprints.
 */
org.numenta.sanity.demos.cortical_io.cio_start_requests_BANG_ = (function org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG_(api_key,text){
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__){
return (function (state_85526){
var state_val_85527 = (state_85526[(1)]);
if((state_val_85527 === (7))){
var inst_85486 = (state_85526[(7)]);
var inst_85484 = (state_85526[(8)]);
var inst_85485 = (state_85526[(9)]);
var inst_85487 = (state_85526[(10)]);
var inst_85496 = (state_85526[(2)]);
var inst_85497 = (inst_85487 + (1));
var tmp85528 = inst_85486;
var tmp85529 = inst_85484;
var tmp85530 = inst_85485;
var inst_85484__$1 = tmp85529;
var inst_85485__$1 = tmp85530;
var inst_85486__$1 = tmp85528;
var inst_85487__$1 = inst_85497;
var state_85526__$1 = (function (){var statearr_85531 = state_85526;
(statearr_85531[(7)] = inst_85486__$1);

(statearr_85531[(11)] = inst_85496);

(statearr_85531[(8)] = inst_85484__$1);

(statearr_85531[(9)] = inst_85485__$1);

(statearr_85531[(10)] = inst_85487__$1);

return statearr_85531;
})();
var statearr_85532_85559 = state_85526__$1;
(statearr_85532_85559[(2)] = null);

(statearr_85532_85559[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (1))){
var inst_85479 = clojure.string.lower_case(text);
var inst_85480 = org.numenta.sanity.demos.cortical_io.split_sentences(inst_85479);
var inst_85481 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,inst_85480);
var inst_85482 = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(inst_85481);
var inst_85483 = cljs.core.seq(inst_85482);
var inst_85484 = inst_85483;
var inst_85485 = null;
var inst_85486 = (0);
var inst_85487 = (0);
var state_85526__$1 = (function (){var statearr_85533 = state_85526;
(statearr_85533[(7)] = inst_85486);

(statearr_85533[(8)] = inst_85484);

(statearr_85533[(9)] = inst_85485);

(statearr_85533[(10)] = inst_85487);

return statearr_85533;
})();
var statearr_85534_85560 = state_85526__$1;
(statearr_85534_85560[(2)] = null);

(statearr_85534_85560[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (4))){
var inst_85485 = (state_85526[(9)]);
var inst_85487 = (state_85526[(10)]);
var inst_85492 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_85485,inst_85487);
var inst_85493 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_85492], 0));
var inst_85494 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_85492);
var state_85526__$1 = (function (){var statearr_85535 = state_85526;
(statearr_85535[(12)] = inst_85493);

return statearr_85535;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_85526__$1,(7),inst_85494);
} else {
if((state_val_85527 === (13))){
var inst_85517 = (state_85526[(2)]);
var state_85526__$1 = state_85526;
var statearr_85536_85561 = state_85526__$1;
(statearr_85536_85561[(2)] = inst_85517);

(statearr_85536_85561[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (6))){
var inst_85522 = (state_85526[(2)]);
var state_85526__$1 = state_85526;
var statearr_85537_85562 = state_85526__$1;
(statearr_85537_85562[(2)] = inst_85522);

(statearr_85537_85562[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (3))){
var inst_85524 = (state_85526[(2)]);
var state_85526__$1 = state_85526;
return cljs.core.async.impl.ioc_helpers.return_chan(state_85526__$1,inst_85524);
} else {
if((state_val_85527 === (12))){
var inst_85500 = (state_85526[(13)]);
var inst_85509 = cljs.core.first(inst_85500);
var inst_85510 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["requesting fingerprint for:",inst_85509], 0));
var inst_85511 = org.nfrac.comportex.cortical_io.cache_fingerprint_BANG_(api_key,org.numenta.sanity.demos.cortical_io.fingerprint_cache,inst_85509);
var state_85526__$1 = (function (){var statearr_85538 = state_85526;
(statearr_85538[(14)] = inst_85510);

return statearr_85538;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_85526__$1,(14),inst_85511);
} else {
if((state_val_85527 === (2))){
var inst_85486 = (state_85526[(7)]);
var inst_85487 = (state_85526[(10)]);
var inst_85489 = (inst_85487 < inst_85486);
var inst_85490 = inst_85489;
var state_85526__$1 = state_85526;
if(cljs.core.truth_(inst_85490)){
var statearr_85539_85563 = state_85526__$1;
(statearr_85539_85563[(1)] = (4));

} else {
var statearr_85540_85564 = state_85526__$1;
(statearr_85540_85564[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (11))){
var inst_85500 = (state_85526[(13)]);
var inst_85504 = cljs.core.chunk_first(inst_85500);
var inst_85505 = cljs.core.chunk_rest(inst_85500);
var inst_85506 = cljs.core.count(inst_85504);
var inst_85484 = inst_85505;
var inst_85485 = inst_85504;
var inst_85486 = inst_85506;
var inst_85487 = (0);
var state_85526__$1 = (function (){var statearr_85541 = state_85526;
(statearr_85541[(7)] = inst_85486);

(statearr_85541[(8)] = inst_85484);

(statearr_85541[(9)] = inst_85485);

(statearr_85541[(10)] = inst_85487);

return statearr_85541;
})();
var statearr_85542_85565 = state_85526__$1;
(statearr_85542_85565[(2)] = null);

(statearr_85542_85565[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (9))){
var state_85526__$1 = state_85526;
var statearr_85543_85566 = state_85526__$1;
(statearr_85543_85566[(2)] = null);

(statearr_85543_85566[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (5))){
var inst_85484 = (state_85526[(8)]);
var inst_85500 = (state_85526[(13)]);
var inst_85500__$1 = cljs.core.seq(inst_85484);
var state_85526__$1 = (function (){var statearr_85544 = state_85526;
(statearr_85544[(13)] = inst_85500__$1);

return statearr_85544;
})();
if(inst_85500__$1){
var statearr_85545_85567 = state_85526__$1;
(statearr_85545_85567[(1)] = (8));

} else {
var statearr_85546_85568 = state_85526__$1;
(statearr_85546_85568[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (14))){
var inst_85500 = (state_85526[(13)]);
var inst_85513 = (state_85526[(2)]);
var inst_85514 = cljs.core.next(inst_85500);
var inst_85484 = inst_85514;
var inst_85485 = null;
var inst_85486 = (0);
var inst_85487 = (0);
var state_85526__$1 = (function (){var statearr_85547 = state_85526;
(statearr_85547[(7)] = inst_85486);

(statearr_85547[(8)] = inst_85484);

(statearr_85547[(15)] = inst_85513);

(statearr_85547[(9)] = inst_85485);

(statearr_85547[(10)] = inst_85487);

return statearr_85547;
})();
var statearr_85548_85569 = state_85526__$1;
(statearr_85548_85569[(2)] = null);

(statearr_85548_85569[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (10))){
var inst_85520 = (state_85526[(2)]);
var state_85526__$1 = state_85526;
var statearr_85549_85570 = state_85526__$1;
(statearr_85549_85570[(2)] = inst_85520);

(statearr_85549_85570[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85527 === (8))){
var inst_85500 = (state_85526[(13)]);
var inst_85502 = cljs.core.chunked_seq_QMARK_(inst_85500);
var state_85526__$1 = state_85526;
if(inst_85502){
var statearr_85550_85571 = state_85526__$1;
(statearr_85550_85571[(1)] = (11));

} else {
var statearr_85551_85572 = state_85526__$1;
(statearr_85551_85572[(1)] = (12));

}

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
});})(c__42110__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__){
return (function() {
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_85555 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_85555[(0)] = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto__);

(statearr_85555[(1)] = (1));

return statearr_85555;
});
var org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto____1 = (function (state_85526){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_85526);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e85556){if((e85556 instanceof Object)){
var ex__41988__auto__ = e85556;
var statearr_85557_85573 = state_85526;
(statearr_85557_85573[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_85526);

return cljs.core.cst$kw$recur;
} else {
throw e85556;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__85574 = state_85526;
state_85526 = G__85574;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto__ = function(state_85526){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto____1.call(this,state_85526);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$cortical_io$cio_start_requests_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__))
})();
var state__42112__auto__ = (function (){var statearr_85558 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_85558[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_85558;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__))
);

return c__42110__auto__;
});
org.numenta.sanity.demos.cortical_io.send_text_BANG_ = (function org$numenta$sanity$demos$cortical_io$send_text_BANG_(){
var temp__6728__auto__ = cljs.core.seq(org.numenta.sanity.demos.cortical_io.word_item_seq(cljs.core.cst$kw$repeats.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)))));
if(temp__6728__auto__){
var xs = temp__6728__auto__;
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,xs,temp__6728__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,xs,temp__6728__auto__){
return (function (state_85628){
var state_val_85629 = (state_85628[(1)]);
if((state_val_85629 === (1))){
var inst_85609 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_85610 = cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(inst_85609);
var inst_85611 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,inst_85610);
var state_85628__$1 = state_85628;
if(inst_85611){
var statearr_85630_85643 = state_85628__$1;
(statearr_85630_85643[(1)] = (2));

} else {
var statearr_85631_85644 = state_85628__$1;
(statearr_85631_85644[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_85629 === (2))){
var inst_85613 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_85614 = cljs.core.cst$kw$api_DASH_key.cljs$core$IFn$_invoke$arity$1(inst_85613);
var inst_85615 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config));
var inst_85616 = cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(inst_85615);
var inst_85617 = org.numenta.sanity.demos.cortical_io.cio_start_requests_BANG_(inst_85614,inst_85616);
var inst_85618 = cljs.core.async.timeout((2500));
var state_85628__$1 = (function (){var statearr_85632 = state_85628;
(statearr_85632[(7)] = inst_85617);

return statearr_85632;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_85628__$1,(5),inst_85618);
} else {
if((state_val_85629 === (3))){
var state_85628__$1 = state_85628;
var statearr_85633_85645 = state_85628__$1;
(statearr_85633_85645[(2)] = null);

(statearr_85633_85645[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85629 === (4))){
var inst_85623 = (state_85628[(2)]);
var inst_85624 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.cortical_io.world_c,xs,false);
var inst_85625 = cljs.core.count(org.numenta.sanity.demos.cortical_io.world_buffer);
var inst_85626 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_85625);
var state_85628__$1 = (function (){var statearr_85634 = state_85628;
(statearr_85634[(8)] = inst_85624);

(statearr_85634[(9)] = inst_85623);

return statearr_85634;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_85628__$1,inst_85626);
} else {
if((state_val_85629 === (5))){
var inst_85620 = (state_85628[(2)]);
var state_85628__$1 = state_85628;
var statearr_85635_85646 = state_85628__$1;
(statearr_85635_85646[(2)] = inst_85620);

(statearr_85635_85646[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
return null;
}
}
}
}
}
});})(c__42110__auto__,xs,temp__6728__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__,xs,temp__6728__auto__){
return (function() {
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_85639 = [null,null,null,null,null,null,null,null,null,null];
(statearr_85639[(0)] = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto__);

(statearr_85639[(1)] = (1));

return statearr_85639;
});
var org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto____1 = (function (state_85628){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_85628);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e85640){if((e85640 instanceof Object)){
var ex__41988__auto__ = e85640;
var statearr_85641_85647 = state_85628;
(statearr_85641_85647[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_85628);

return cljs.core.cst$kw$recur;
} else {
throw e85640;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__85648 = state_85628;
state_85628 = G__85648;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto__ = function(state_85628){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto____1.call(this,state_85628);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$cortical_io$send_text_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,xs,temp__6728__auto__))
})();
var state__42112__auto__ = (function (){var statearr_85642 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_85642[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_85642;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,xs,temp__6728__auto__))
);

return c__42110__auto__;
} else {
return null;
}
});
org.numenta.sanity.demos.cortical_io.set_model_BANG_ = (function org$numenta$sanity$demos$cortical_io$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var params = (function (){var G__85655 = (((cljs.core.cst$kw$params_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$params_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__85655) {
case "a":
return org.numenta.sanity.demos.cortical_io.params_global;

break;
case "b":
return org.numenta.sanity.demos.cortical_io.params_local;

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.cst$kw$params_DASH_choice.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))))].join('')));

}
})();
var e = (function (){var G__85656 = (((cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))) instanceof cljs.core.Keyword))?cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))).fqn:null);
switch (G__85656) {
case "cortical-io":
return org.nfrac.comportex.cortical_io.cortical_io_encoder.cljs$core$IFn$_invoke$arity$variadic(cljs.core.cst$kw$api_DASH_key.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),org.numenta.sanity.demos.cortical_io.fingerprint_cache,cljs.core.array_seq([cljs.core.cst$kw$decode_DASH_locally_QMARK_,cljs.core.cst$kw$decode_DASH_locally_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))),cljs.core.cst$kw$spatial_DASH_scramble_QMARK_,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config)))], 0));

break;
case "random":
return org.nfrac.comportex.encoders.unique_encoder(org.nfrac.comportex.cortical_io.retina_dim,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core._STAR_,0.02,org.nfrac.comportex.cortical_io.retina_dim));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.config))))].join('')));

}
})();
var sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$word,e], null);
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.model)) == null);
var G__85657_85663 = org.numenta.sanity.demos.cortical_io.model;
var G__85658_85664 = org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,org.nfrac.comportex.layer.layer_of_cells(params)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,sensor], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__85657_85663,G__85658_85664) : cljs.core.reset_BANG_.call(null,G__85657_85663,G__85658_85664));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.model,org.numenta.sanity.demos.cortical_io.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.cortical_io.into_sim);
} else {
var G__85659_85665 = org.numenta.sanity.main.network_shape;
var G__85660_85666 = org.numenta.sanity.util.translate_network_shape(org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.cortical_io.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.cortical_io.model))));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__85659_85665,G__85660_85666) : cljs.core.reset_BANG_.call(null,G__85659_85665,G__85660_85666));
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.cortical_io.config,cljs.core.assoc,cljs.core.cst$kw$have_DASH_model_QMARK_,true);
}));
});
org.numenta.sanity.demos.cortical_io.config_template = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Word sequences"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$cache_DASH_count,cljs.core.cst$kw$postamble," cached word fingerprints."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Repeats of each sentence:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$repeats], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$text,cljs.core.cst$kw$rows,(10)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__85667_SHARP_){
return cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__85667_SHARP_);
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.cortical_io.send_text_BANG_();

return e.preventDefault();
})], null),"Send text block input"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__85668_SHARP_){
return cljs.core.not(cljs.core.cst$kw$have_DASH_model_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__85668_SHARP_));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$disabled,"Send text block input"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,"Create a model first (below)."], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Word encoder:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$encoder], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$cortical_DASH_io], null),"cortical.io"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$random], null),"random"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__85669_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$cortical_DASH_io,cljs.core.cst$kw$encoder.cljs$core$IFn$_invoke$arity$1(p1__85669_SHARP_));
})], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Cortical.io API key:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$text,cljs.core.cst$kw$id,cljs.core.cst$kw$api_DASH_key], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Decode locally?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,cljs.core.cst$kw$decode_DASH_locally_QMARK_], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Spatial scramble?"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,cljs.core.cst$kw$spatial_DASH_scramble_QMARK_], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Starting parameter set:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$params_DASH_choice], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$a], null),"20% potential, no topography"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$b], null),"30% * local 16% area = 5% potential"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.cortical_io.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.cortical_io.model_tab = (function org$numenta$sanity$demos$cortical_io$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This demo looks up the ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://cortical.io/"], null),"cortical.io"], null)," fingerprint for each word. Enter your API key below to start. The\n     pre-loaded text below is the famous ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/numenta/nupic.nlp-examples/blob/master/resources/associations/foxeat.csv"], null),"'fox eats what?' example"], null)," but you can enter whatever text you like. Words that are not\n      found in the cortical.io 'associative_en' retina are assigned a\n      random SDR."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.cortical_io.config_template,org.numenta.sanity.demos.cortical_io.config], null)], null);
});
org.numenta.sanity.demos.cortical_io.init = (function org$numenta$sanity$demos$cortical_io$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.cortical_io.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.cortical_io.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.cortical_io.into_sim], null),goog.dom.getElement("sanity-app"));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.cortical_io.into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["run"], null));
});
goog.exportSymbol('org.numenta.sanity.demos.cortical_io.init', org.numenta.sanity.demos.cortical_io.init);
