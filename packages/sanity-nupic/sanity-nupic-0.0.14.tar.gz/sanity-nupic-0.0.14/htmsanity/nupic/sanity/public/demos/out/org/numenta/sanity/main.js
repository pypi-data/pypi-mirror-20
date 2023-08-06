// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.main');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.util');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.selection');
goog.require('clojure.walk');
goog.require('org.numenta.sanity.controls_ui');
cljs.core.enable_console_print_BANG_();
org.numenta.sanity.main.into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((65536));
org.numenta.sanity.main.steps = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
org.numenta.sanity.main.network_shape = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.main.selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
org.numenta.sanity.main.capture_options = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.main.viz_options = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options);
org.numenta.sanity.main.into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.main.debug_data = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.controls_ui.default_debug_data);
org.numenta.sanity.main.subscribe_to_steps_BANG_ = (function org$numenta$sanity$main$subscribe_to_steps_BANG_(){
var response_c_70783 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-capture-options",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c_70783,true)], null));

var c__42110__auto___70784 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___70784,response_c_70783){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___70784,response_c_70783){
return (function (state_70691){
var state_val_70692 = (state_70691[(1)]);
if((state_val_70692 === (1))){
var state_70691__$1 = state_70691;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70691__$1,(2),response_c_70783);
} else {
if((state_val_70692 === (2))){
var inst_70685 = (state_70691[(2)]);
var inst_70686 = clojure.walk.keywordize_keys(inst_70685);
var inst_70687 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.capture_options,inst_70686) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.capture_options,inst_70686));
var inst_70688 = (function (){return ((function (inst_70685,inst_70686,inst_70687,state_val_70692,c__42110__auto___70784,response_c_70783){
return (function (_,___$1,___$2,co){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-capture-options",clojure.walk.stringify_keys(co)], null));
});
;})(inst_70685,inst_70686,inst_70687,state_val_70692,c__42110__auto___70784,response_c_70783))
})();
var inst_70689 = cljs.core.add_watch(org.numenta.sanity.main.capture_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_push_DASH_to_DASH_server,inst_70688);
var state_70691__$1 = (function (){var statearr_70693 = state_70691;
(statearr_70693[(7)] = inst_70687);

return statearr_70693;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_70691__$1,inst_70689);
} else {
return null;
}
}
});})(c__42110__auto___70784,response_c_70783))
;
return ((function (switch__41984__auto__,c__42110__auto___70784,response_c_70783){
return (function() {
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_70697 = [null,null,null,null,null,null,null,null];
(statearr_70697[(0)] = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__);

(statearr_70697[(1)] = (1));

return statearr_70697;
});
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____1 = (function (state_70691){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70691);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70698){if((e70698 instanceof Object)){
var ex__41988__auto__ = e70698;
var statearr_70699_70785 = state_70691;
(statearr_70699_70785[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70691);

return cljs.core.cst$kw$recur;
} else {
throw e70698;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70786 = state_70691;
state_70691 = G__70786;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__ = function(state_70691){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____1.call(this,state_70691);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___70784,response_c_70783))
})();
var state__42112__auto__ = (function (){var statearr_70700 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70700[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70784);

return statearr_70700;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___70784,response_c_70783))
);


var steps_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-network-shape",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__42110__auto___70787 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___70787,steps_c,response_c){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___70787,steps_c,response_c){
return (function (state_70760){
var state_val_70761 = (state_70760[(1)]);
if((state_val_70761 === (7))){
var state_70760__$1 = state_70760;
var statearr_70762_70788 = state_70760__$1;
(statearr_70762_70788[(2)] = null);

(statearr_70762_70788[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (1))){
var state_70760__$1 = state_70760;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70760__$1,(2),response_c);
} else {
if((state_val_70761 === (4))){
var inst_70758 = (state_70760[(2)]);
var state_70760__$1 = state_70760;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70760__$1,inst_70758);
} else {
if((state_val_70761 === (6))){
var inst_70726 = (state_70760[(7)]);
var inst_70735 = (state_70760[(8)]);
var inst_70731 = clojure.walk.keywordize_keys(inst_70726);
var inst_70732 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.network_shape) : cljs.core.deref.call(null,org.numenta.sanity.main.network_shape));
var inst_70733 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(inst_70731,cljs.core.cst$kw$network_DASH_shape,inst_70732);
var inst_70734 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.capture_options) : cljs.core.deref.call(null,org.numenta.sanity.main.capture_options));
var inst_70735__$1 = cljs.core.cst$kw$keep_DASH_steps.cljs$core$IFn$_invoke$arity$1(inst_70734);
var inst_70736 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps));
var inst_70737 = cljs.core.cons(inst_70733,inst_70736);
var state_70760__$1 = (function (){var statearr_70763 = state_70760;
(statearr_70763[(8)] = inst_70735__$1);

(statearr_70763[(9)] = inst_70737);

return statearr_70763;
})();
if(cljs.core.truth_(inst_70735__$1)){
var statearr_70764_70789 = state_70760__$1;
(statearr_70764_70789[(1)] = (9));

} else {
var statearr_70765_70790 = state_70760__$1;
(statearr_70765_70790[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (3))){
var state_70760__$1 = state_70760;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70760__$1,(5),steps_c);
} else {
if((state_val_70761 === (2))){
var inst_70702 = (state_70760[(2)]);
var inst_70703 = org.numenta.sanity.util.translate_network_shape(inst_70702);
var inst_70704 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.network_shape,inst_70703) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.network_shape,inst_70703));
var inst_70705 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70706 = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(steps_c);
var inst_70707 = ["subscribe",inst_70706];
var inst_70708 = (new cljs.core.PersistentVector(null,2,(5),inst_70705,inst_70707,null));
var inst_70709 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,inst_70708);
var inst_70710 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.network_shape) : cljs.core.deref.call(null,org.numenta.sanity.main.network_shape));
var inst_70711 = cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(inst_70710);
var inst_70712 = cljs.core.keys(inst_70711);
var inst_70713 = cljs.core.first(inst_70712);
var inst_70714 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70715 = [cljs.core.cst$kw$dt,cljs.core.cst$kw$path];
var inst_70716 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70717 = [cljs.core.cst$kw$layers,inst_70713];
var inst_70718 = (new cljs.core.PersistentVector(null,2,(5),inst_70716,inst_70717,null));
var inst_70719 = [(0),inst_70718];
var inst_70720 = cljs.core.PersistentHashMap.fromArrays(inst_70715,inst_70719);
var inst_70721 = [inst_70720];
var inst_70722 = (new cljs.core.PersistentVector(null,1,(5),inst_70714,inst_70721,null));
var inst_70723 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,inst_70722) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.selection,inst_70722));
var state_70760__$1 = (function (){var statearr_70766 = state_70760;
(statearr_70766[(10)] = inst_70709);

(statearr_70766[(11)] = inst_70704);

(statearr_70766[(12)] = inst_70723);

return statearr_70766;
})();
var statearr_70767_70791 = state_70760__$1;
(statearr_70767_70791[(2)] = null);

(statearr_70767_70791[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (11))){
var inst_70745 = (state_70760[(2)]);
var inst_70746 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_70745,(0),null);
var inst_70747 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_70745,(1),null);
var inst_70748 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,inst_70746) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.steps,inst_70746));
var inst_70749 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70750 = [cljs.core.cst$kw$drop_DASH_steps_DASH_data,inst_70747];
var inst_70751 = (new cljs.core.PersistentVector(null,2,(5),inst_70749,inst_70750,null));
var inst_70752 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,inst_70751);
var state_70760__$1 = (function (){var statearr_70768 = state_70760;
(statearr_70768[(13)] = inst_70748);

(statearr_70768[(14)] = inst_70752);

return statearr_70768;
})();
var statearr_70769_70792 = state_70760__$1;
(statearr_70769_70792[(2)] = null);

(statearr_70769_70792[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (9))){
var inst_70735 = (state_70760[(8)]);
var inst_70737 = (state_70760[(9)]);
var inst_70739 = cljs.core.split_at(inst_70735,inst_70737);
var state_70760__$1 = state_70760;
var statearr_70770_70793 = state_70760__$1;
(statearr_70770_70793[(2)] = inst_70739);

(statearr_70770_70793[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (5))){
var inst_70726 = (state_70760[(7)]);
var inst_70726__$1 = (state_70760[(2)]);
var state_70760__$1 = (function (){var statearr_70771 = state_70760;
(statearr_70771[(7)] = inst_70726__$1);

return statearr_70771;
})();
if(cljs.core.truth_(inst_70726__$1)){
var statearr_70772_70794 = state_70760__$1;
(statearr_70772_70794[(1)] = (6));

} else {
var statearr_70773_70795 = state_70760__$1;
(statearr_70773_70795[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (10))){
var inst_70737 = (state_70760[(9)]);
var inst_70741 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70742 = [inst_70737,null];
var inst_70743 = (new cljs.core.PersistentVector(null,2,(5),inst_70741,inst_70742,null));
var state_70760__$1 = state_70760;
var statearr_70774_70796 = state_70760__$1;
(statearr_70774_70796[(2)] = inst_70743);

(statearr_70774_70796[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70761 === (8))){
var inst_70756 = (state_70760[(2)]);
var state_70760__$1 = state_70760;
var statearr_70775_70797 = state_70760__$1;
(statearr_70775_70797[(2)] = inst_70756);

(statearr_70775_70797[(1)] = (4));


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
});})(c__42110__auto___70787,steps_c,response_c))
;
return ((function (switch__41984__auto__,c__42110__auto___70787,steps_c,response_c){
return (function() {
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_70779 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_70779[(0)] = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__);

(statearr_70779[(1)] = (1));

return statearr_70779;
});
var org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____1 = (function (state_70760){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70760);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70780){if((e70780 instanceof Object)){
var ex__41988__auto__ = e70780;
var statearr_70781_70798 = state_70760;
(statearr_70781_70798[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70760);

return cljs.core.cst$kw$recur;
} else {
throw e70780;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70799 = state_70760;
state_70760 = G__70799;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__ = function(state_70760){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____1.call(this,state_70760);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$main$subscribe_to_steps_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___70787,steps_c,response_c))
})();
var state__42112__auto__ = (function (){var statearr_70782 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70782[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70787);

return statearr_70782;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___70787,steps_c,response_c))
);


return steps_c;
});
org.numenta.sanity.main.subscription_data = org.numenta.sanity.main.subscribe_to_steps_BANG_();
org.numenta.sanity.main.unsubscribe_BANG_ = (function org$numenta$sanity$main$unsubscribe_BANG_(subscription_data){
var steps_c_70800 = subscription_data;
cljs.core.async.close_BANG_(steps_c_70800);

return cljs.core.remove_watch(org.numenta.sanity.main.viz_options,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_keep_DASH_steps);
});
cljs.core.add_watch(org.numenta.sanity.main.steps,cljs.core.cst$kw$org$numenta$sanity$main_SLASH_recalculate_DASH_selection,(function (_,___$1,___$2,steps){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.selection,(function (p1__70801_SHARP_){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (sel){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(sel,cljs.core.cst$kw$step,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(sel)));
}),p1__70801_SHARP_);
}));
}));
org.numenta.sanity.main.main_pane = (function org$numenta$sanity$main$main_pane(_,___$1){
var size_invalidates_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__42110__auto___70867 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___70867,size_invalidates_c){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___70867,size_invalidates_c){
return (function (state_70851){
var state_val_70852 = (state_70851[(1)]);
if((state_val_70852 === (1))){
var state_70851__$1 = state_70851;
var statearr_70853_70868 = state_70851__$1;
(statearr_70853_70868[(2)] = null);

(statearr_70853_70868[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70852 === (2))){
var inst_70836 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_70837 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$max_DASH_height_DASH_px];
var inst_70838 = (new cljs.core.PersistentVector(null,2,(5),inst_70836,inst_70837,null));
var inst_70839 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,inst_70838,window.innerHeight);
var state_70851__$1 = (function (){var statearr_70854 = state_70851;
(statearr_70854[(7)] = inst_70839);

return statearr_70854;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70851__$1,(4),size_invalidates_c);
} else {
if((state_val_70852 === (3))){
var inst_70849 = (state_70851[(2)]);
var state_70851__$1 = state_70851;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70851__$1,inst_70849);
} else {
if((state_val_70852 === (4))){
var inst_70841 = (state_70851[(2)]);
var inst_70842 = (inst_70841 == null);
var state_70851__$1 = state_70851;
if(cljs.core.truth_(inst_70842)){
var statearr_70855_70869 = state_70851__$1;
(statearr_70855_70869[(1)] = (5));

} else {
var statearr_70856_70870 = state_70851__$1;
(statearr_70856_70870[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70852 === (5))){
var state_70851__$1 = state_70851;
var statearr_70857_70871 = state_70851__$1;
(statearr_70857_70871[(2)] = null);

(statearr_70857_70871[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70852 === (6))){
var state_70851__$1 = state_70851;
var statearr_70858_70872 = state_70851__$1;
(statearr_70858_70872[(2)] = null);

(statearr_70858_70872[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70852 === (7))){
var inst_70847 = (state_70851[(2)]);
var state_70851__$1 = state_70851;
var statearr_70859_70873 = state_70851__$1;
(statearr_70859_70873[(2)] = inst_70847);

(statearr_70859_70873[(1)] = (3));


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
});})(c__42110__auto___70867,size_invalidates_c))
;
return ((function (switch__41984__auto__,c__42110__auto___70867,size_invalidates_c){
return (function() {
var org$numenta$sanity$main$main_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$main$main_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_70863 = [null,null,null,null,null,null,null,null];
(statearr_70863[(0)] = org$numenta$sanity$main$main_pane_$_state_machine__41985__auto__);

(statearr_70863[(1)] = (1));

return statearr_70863;
});
var org$numenta$sanity$main$main_pane_$_state_machine__41985__auto____1 = (function (state_70851){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70851);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70864){if((e70864 instanceof Object)){
var ex__41988__auto__ = e70864;
var statearr_70865_70874 = state_70851;
(statearr_70865_70874[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70851);

return cljs.core.cst$kw$recur;
} else {
throw e70864;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70875 = state_70851;
state_70851 = G__70875;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$main$main_pane_$_state_machine__41985__auto__ = function(state_70851){
switch(arguments.length){
case 0:
return org$numenta$sanity$main$main_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$main$main_pane_$_state_machine__41985__auto____1.call(this,state_70851);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$main$main_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$main$main_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$main$main_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$main$main_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$main$main_pane_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___70867,size_invalidates_c))
})();
var state__42112__auto__ = (function (){var statearr_70866 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70866[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70867);

return statearr_70866;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___70867,size_invalidates_c))
);


return ((function (size_invalidates_c){
return (function (world_pane,into_sim){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$on_DASH_click,((function (size_invalidates_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});})(size_invalidates_c))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (size_invalidates_c){
return (function (p1__70802_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__70802_SHARP_,org.numenta.sanity.main.into_viz);
});})(size_invalidates_c))
,cljs.core.cst$kw$tabIndex,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_timeline,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.capture_options], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_3$col_DASH_lg_DASH_2,world_pane], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_9$col_DASH_lg_DASH_10,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$overflow,"auto"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.window_resize_listener,size_invalidates_c], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.viz_canvas,null,org.numenta.sanity.main.steps,org.numenta.sanity.main.selection,org.numenta.sanity.main.network_shape,org.numenta.sanity.main.viz_options,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal], null)], null)], null)], null);
});
;})(size_invalidates_c))
});
org.numenta.sanity.main.sanity_app = (function org$numenta$sanity$main$sanity_app(title,model_tab,world_pane,current_tab,features,into_sim){
return new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.sanity_app,title,model_tab,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.main_pane,world_pane,into_sim], null),features,org.numenta.sanity.main.capture_options,org.numenta.sanity.main.viz_options,current_tab,org.numenta.sanity.main.selection,org.numenta.sanity.main.steps,org.numenta.sanity.main.network_shape,org.numenta.sanity.viz_canvas.state_colors,org.numenta.sanity.main.into_viz,into_sim,org.numenta.sanity.main.into_journal,org.numenta.sanity.main.debug_data], null);
});
org.numenta.sanity.main.selected_step = (function org$numenta$sanity$main$selected_step(var_args){
var args70876 = [];
var len__10461__auto___70879 = arguments.length;
var i__10462__auto___70880 = (0);
while(true){
if((i__10462__auto___70880 < len__10461__auto___70879)){
args70876.push((arguments[i__10462__auto___70880]));

var G__70881 = (i__10462__auto___70880 + (1));
i__10462__auto___70880 = G__70881;
continue;
} else {
}
break;
}

var G__70878 = args70876.length;
switch (G__70878) {
case 0:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();

break;
case 2:
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args70876.length)].join('')));

}
});

org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0 = (function (){
return org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.steps,org.numenta.sanity.main.selection);
});

org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$2 = (function (steps,selection){
var temp__6728__auto__ = cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))));
if(cljs.core.truth_(temp__6728__auto__)){
var dt = temp__6728__auto__;
return cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps)),dt,null);
} else {
return null;
}
});

org.numenta.sanity.main.selected_step.cljs$lang$maxFixedArity = 2;

