// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.hotgym');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.main');
goog.require('goog.net.XhrIo');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.layer.params');
goog.require('org.nfrac.comportex.layer');
goog.require('org.nfrac.comportex.encoders');
goog.require('cljs.reader');
org.numenta.sanity.demos.hotgym.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.hotgym.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.hotgym.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.hotgym.anomaly_score = (function org$numenta$sanity$demos$hotgym$anomaly_score(p__82252){
var map__82255 = p__82252;
var map__82255__$1 = ((((!((map__82255 == null)))?((((map__82255.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82255.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82255):map__82255);
var active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82255__$1,cljs.core.cst$kw$active);
var active_predicted = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82255__$1,cljs.core.cst$kw$active_DASH_predicted);
var total = (active + active_predicted);
if((total > (0))){
return (active / total);
} else {
return (1);
}
});
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_ = (function org$numenta$sanity$demos$hotgym$consider_consumption_BANG_(step__GT_scores,step,consumption){
var candidate = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$consumption,consumption], null);
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var snapshot_id = cljs.core.cst$kw$snapshot_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["consider-future",snapshot_id,candidate,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,candidate,out_c,snapshot_id){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,candidate,out_c,snapshot_id){
return (function (state_82303){
var state_val_82304 = (state_82303[(1)]);
if((state_val_82304 === (1))){
var state_82303__$1 = state_82303;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_82303__$1,(2),out_c);
} else {
if((state_val_82304 === (2))){
var inst_82292 = (state_82303[(2)]);
var inst_82293 = cljs.core.seq(inst_82292);
var inst_82294 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_82293,(0),null);
var inst_82295 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_82294,(0),null);
var inst_82296 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_82294,(1),null);
var inst_82297 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_82298 = [step,consumption];
var inst_82299 = (new cljs.core.PersistentVector(null,2,(5),inst_82297,inst_82298,null));
var inst_82300 = org.numenta.sanity.demos.hotgym.anomaly_score(inst_82296);
var inst_82301 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(step__GT_scores,cljs.core.assoc_in,inst_82299,inst_82300);
var state_82303__$1 = (function (){var statearr_82305 = state_82303;
(statearr_82305[(7)] = inst_82295);

return statearr_82305;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_82303__$1,inst_82301);
} else {
return null;
}
}
});})(c__42110__auto__,candidate,out_c,snapshot_id))
;
return ((function (switch__41984__auto__,c__42110__auto__,candidate,out_c,snapshot_id){
return (function() {
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_82309 = [null,null,null,null,null,null,null,null];
(statearr_82309[(0)] = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto__);

(statearr_82309[(1)] = (1));

return statearr_82309;
});
var org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto____1 = (function (state_82303){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_82303);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e82310){if((e82310 instanceof Object)){
var ex__41988__auto__ = e82310;
var statearr_82311_82313 = state_82303;
(statearr_82311_82313[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_82303);

return cljs.core.cst$kw$recur;
} else {
throw e82310;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__82314 = state_82303;
state_82303 = G__82314;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto__ = function(state_82303){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto____1.call(this,state_82303);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$hotgym$consider_consumption_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,candidate,out_c,snapshot_id))
})();
var state__42112__auto__ = (function (){var statearr_82312 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_82312[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_82312;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,candidate,out_c,snapshot_id))
);

return c__42110__auto__;
});
org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
org.numenta.sanity.demos.hotgym.try_last_value_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
org.numenta.sanity.demos.hotgym.n_predictions = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((3));
org.numenta.sanity.demos.hotgym.unit_width = (8);
org.numenta.sanity.demos.hotgym.cx = (org.numenta.sanity.demos.hotgym.unit_width / (2));
org.numenta.sanity.demos.hotgym.max_r = org.numenta.sanity.demos.hotgym.cx;
org.numenta.sanity.demos.hotgym.actual_svg = (function org$numenta$sanity$demos$hotgym$actual_svg(step,top,unit_height){
var actual_consumption = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null));
var y_actual = ((top - actual_consumption) * unit_height);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_actual - 1.5),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,(3),cljs.core.cst$kw$fill,"black"], null)], null);
});
org.numenta.sanity.demos.hotgym.prediction_svg = (function org$numenta$sanity$demos$hotgym$prediction_svg(y_scores){
var min_score = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.min,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,y_scores));
var candidates = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (min_score){
return (function (p__82325){
var vec__82326 = p__82325;
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82326,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82326,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(score,min_score);
});})(min_score))
,y_scores));
var vec__82322 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(candidates,cljs.core.quot(cljs.core.count(candidates),(2)));
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82322,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y - (1)),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,(2),cljs.core.cst$kw$fill,"#78B4FB"], null)], null);
});
org.numenta.sanity.demos.hotgym.anomaly_gradient_svg = (function org$numenta$sanity$demos$hotgym$anomaly_gradient_svg(y_scores){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__82371(s__82372){
return (new cljs.core.LazySeq(null,(function (){
var s__82372__$1 = s__82372;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__82372__$1);
if(temp__6728__auto__){
var s__82372__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82372__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__82372__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__82374 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__82373 = (0);
while(true){
if((i__82373 < size__10131__auto__)){
var vec__82395 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__82373);
var vec__82398 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82395,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82398,(0),null);
var score1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82398,(1),null);
var vec__82401 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82395,(1),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82401,(0),null);
var score2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82401,(1),null);
var grad_id = [cljs.core.str(cljs.core.random_uuid())].join('');
cljs.core.chunk_append(b__82374,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$defs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$linearGradient,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$id,grad_id,cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"0%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"100%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score2], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(org.numenta.sanity.demos.hotgym.cx - org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$y,y1,cljs.core.cst$kw$width,((2) * org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$height,(y2 - y1),cljs.core.cst$kw$fill,[cljs.core.str("url(#"),cljs.core.str(grad_id),cljs.core.str(")")].join('')], null)], null)], null));

var G__82413 = (i__82373 + (1));
i__82373 = G__82413;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82374),org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__82371(cljs.core.chunk_rest(s__82372__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82374),null);
}
} else {
var vec__82404 = cljs.core.first(s__82372__$2);
var vec__82407 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82404,(0),null);
var y1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82407,(0),null);
var score1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82407,(1),null);
var vec__82410 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82404,(1),null);
var y2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82410,(0),null);
var score2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82410,(1),null);
var grad_id = [cljs.core.str(cljs.core.random_uuid())].join('');
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$defs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$linearGradient,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$id,grad_id,cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(1)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"0%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$stop,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$offset,"100%",cljs.core.cst$kw$stop_DASH_color,"red",cljs.core.cst$kw$stop_DASH_opacity,score2], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(org.numenta.sanity.demos.hotgym.cx - org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$y,y1,cljs.core.cst$kw$width,((2) * org.numenta.sanity.demos.hotgym.max_r),cljs.core.cst$kw$height,(y2 - y1),cljs.core.cst$kw$fill,[cljs.core.str("url(#"),cljs.core.str(grad_id),cljs.core.str(")")].join('')], null)], null)], null),org$numenta$sanity$demos$hotgym$anomaly_gradient_svg_$_iter__82371(cljs.core.rest(s__82372__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)));
})());
});
org.numenta.sanity.demos.hotgym.anomaly_samples_svg = (function org$numenta$sanity$demos$hotgym$anomaly_samples_svg(ys){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__82420(s__82421){
return (new cljs.core.LazySeq(null,(function (){
var s__82421__$1 = s__82421;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__82421__$1);
if(temp__6728__auto__){
var s__82421__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82421__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__82421__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__82423 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__82422 = (0);
while(true){
if((i__82422 < size__10131__auto__)){
var y = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__82422);
cljs.core.chunk_append(b__82423,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fill,"brown",cljs.core.cst$kw$cx,org.numenta.sanity.demos.hotgym.cx,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,1.5], null)], null));

var G__82426 = (i__82422 + (1));
i__82422 = G__82426;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82423),org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__82420(cljs.core.chunk_rest(s__82421__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82423),null);
}
} else {
var y = cljs.core.first(s__82421__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$circle,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$fill,"brown",cljs.core.cst$kw$cx,org.numenta.sanity.demos.hotgym.cx,cljs.core.cst$kw$cy,y,cljs.core.cst$kw$r,1.5], null)], null),org$numenta$sanity$demos$hotgym$anomaly_samples_svg_$_iter__82420(cljs.core.rest(s__82421__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(ys);
})());
});
org.numenta.sanity.demos.hotgym.consumption_axis_svg = (function org$numenta$sanity$demos$hotgym$consumption_axis_svg(h,bottom,top){
var label_every = (10);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__10132__auto__ = ((function (label_every){
return (function org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__82433(s__82434){
return (new cljs.core.LazySeq(null,((function (label_every){
return (function (){
var s__82434__$1 = s__82434;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__82434__$1);
if(temp__6728__auto__){
var s__82434__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82434__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__82434__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__82436 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__82435 = (0);
while(true){
if((i__82435 < size__10131__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__82435);
cljs.core.chunk_append(b__82436,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(-5),cljs.core.cst$kw$y,(h * ((1) - ((i - bottom) / (top - bottom)))),cljs.core.cst$kw$dy,"0.35em",cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$fill,"rgb(104, 104, 104)",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"bold"], null),cljs.core.cst$kw$text_DASH_anchor,"end"], null),[cljs.core.str(i)].join('')], null));

var G__82439 = (i__82435 + (1));
i__82435 = G__82439;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82436),org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__82433(cljs.core.chunk_rest(s__82434__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82436),null);
}
} else {
var i = cljs.core.first(s__82434__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$x,(-5),cljs.core.cst$kw$y,(h * ((1) - ((i - bottom) / (top - bottom)))),cljs.core.cst$kw$dy,"0.35em",cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$fill,"rgb(104, 104, 104)",cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"bold"], null),cljs.core.cst$kw$text_DASH_anchor,"end"], null),[cljs.core.str(i)].join('')], null),org$numenta$sanity$demos$hotgym$consumption_axis_svg_$_iter__82433(cljs.core.rest(s__82434__$2)));
}
} else {
return null;
}
break;
}
});})(label_every))
,null,null));
});})(label_every))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$3(bottom,top,label_every));
})());
});
org.numenta.sanity.demos.hotgym.extend_past_px = (30);
org.numenta.sanity.demos.hotgym.horizontal_label = (function org$numenta$sanity$demos$hotgym$horizontal_label(x,y,w,transition_QMARK_,contents_above,contents_below){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$position,"relative"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,x,cljs.core.cst$kw$top,(y - 0.5),cljs.core.cst$kw$width,((w - x) + org.numenta.sanity.demos.hotgym.extend_past_px),cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$height,(1),cljs.core.cst$kw$background_DASH_color,"black"], null)], null)], null)], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__82458(s__82459){
return (new cljs.core.LazySeq(null,(function (){
var s__82459__$1 = s__82459;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__82459__$1);
if(temp__6728__auto__){
var s__82459__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82459__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__82459__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__82461 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__82460 = (0);
while(true){
if((i__82460 < size__10131__auto__)){
var vec__82470 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__82460);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82470,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82470,(1),null);
if(cljs.core.truth_(contents)){
cljs.core.chunk_append(b__82461,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,y,cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,w,cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,top,cljs.core.cst$kw$transition_DASH_property,"top",cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,(4)], null)], null),contents], null)], null));

var G__82476 = (i__82460 + (1));
i__82460 = G__82476;
continue;
} else {
var G__82477 = (i__82460 + (1));
i__82460 = G__82477;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82461),org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__82458(cljs.core.chunk_rest(s__82459__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82461),null);
}
} else {
var vec__82473 = cljs.core.first(s__82459__$2);
var contents = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82473,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82473,(1),null);
if(cljs.core.truth_(contents)){
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,y,cljs.core.cst$kw$transition_DASH_property,(cljs.core.truth_(transition_QMARK_)?"top":"none"),cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,w,cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,top,cljs.core.cst$kw$transition_DASH_property,"top",cljs.core.cst$kw$transition_DASH_duration,"0.15s",cljs.core.cst$kw$left,(4)], null)], null),contents], null)], null),org$numenta$sanity$demos$hotgym$horizontal_label_$_iter__82458(cljs.core.rest(s__82459__$2)));
} else {
var G__82478 = cljs.core.rest(s__82459__$2);
s__82459__$1 = G__82478;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents_above,"-2.7em"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents_below,"0.2em"], null)], null));
})());
});
org.numenta.sanity.demos.hotgym.y__GT_consumption = (function org$numenta$sanity$demos$hotgym$y__GT_consumption(y,h,top,bottom){
return ((((1) - (y / h)) * (top - bottom)) + bottom);
});
org.numenta.sanity.demos.hotgym.consumption__GT_y = (function org$numenta$sanity$demos$hotgym$consumption__GT_y(consumption,top,unit_height){
return ((top - consumption) * unit_height);
});
org.numenta.sanity.demos.hotgym.anomaly_radar_pane = (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane(){
var step__GT_scores = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var hover_i = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var hover_y = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.steps,cljs.core.cst$kw$org$numenta$sanity$demos$hotgym_SLASH_fetch_DASH_anomaly_DASH_radar,((function (step__GT_scores,hover_i,hover_y){
return (function (_,___$1,___$2,steps_v){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(step__GT_scores,cljs.core.select_keys,steps_v);

var seq__82739 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.contains_QMARK_,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores))),steps_v));
var chunk__82741 = null;
var count__82742 = (0);
var i__82743 = (0);
while(true){
if((i__82743 < count__82742)){
var step = chunk__82741.cljs$core$IIndexed$_nth$arity$2(null,i__82743);
var out_c_82999 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var snapshot_id_83000 = cljs.core.cst$kw$snapshot_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["decode-predictive-columns",snapshot_id_83000,cljs.core.cst$kw$power_DASH_consumption,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.n_predictions) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.n_predictions)),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c_82999,true)], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(-10));

org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(110));
} else {
}

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_last_value_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_last_value_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null)));
} else {
}

var c__42110__auto___83001 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83001,out_c_82999,snapshot_id_83000,step,step__GT_scores,hover_i,hover_y){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83001,out_c_82999,snapshot_id_83000,step,step__GT_scores,hover_i,hover_y){
return (function (state_82789){
var state_val_82790 = (state_82789[(1)]);
if((state_val_82790 === (7))){
var inst_82785 = (state_82789[(2)]);
var state_82789__$1 = state_82789;
var statearr_82791_83002 = state_82789__$1;
(statearr_82791_83002[(2)] = inst_82785);

(statearr_82791_83002[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (1))){
var state_82789__$1 = state_82789;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_82789__$1,(2),out_c_82999);
} else {
if((state_val_82790 === (4))){
var inst_82787 = (state_82789[(2)]);
var state_82789__$1 = state_82789;
return cljs.core.async.impl.ioc_helpers.return_chan(state_82789__$1,inst_82787);
} else {
if((state_val_82790 === (13))){
var inst_82780 = (state_82789[(2)]);
var state_82789__$1 = state_82789;
var statearr_82792_83003 = state_82789__$1;
(statearr_82792_83003[(2)] = inst_82780);

(statearr_82792_83003[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (6))){
var inst_82753 = (state_82789[(7)]);
var inst_82766 = (state_82789[(8)]);
var inst_82766__$1 = cljs.core.seq(inst_82753);
var state_82789__$1 = (function (){var statearr_82793 = state_82789;
(statearr_82793[(8)] = inst_82766__$1);

return statearr_82793;
})();
if(inst_82766__$1){
var statearr_82794_83004 = state_82789__$1;
(statearr_82794_83004[(1)] = (8));

} else {
var statearr_82795_83005 = state_82789__$1;
(statearr_82795_83005[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (3))){
var inst_82755 = (state_82789[(9)]);
var inst_82756 = (state_82789[(10)]);
var inst_82758 = (inst_82756 < inst_82755);
var inst_82759 = inst_82758;
var state_82789__$1 = state_82789;
if(cljs.core.truth_(inst_82759)){
var statearr_82796_83006 = state_82789__$1;
(statearr_82796_83006[(1)] = (5));

} else {
var statearr_82797_83007 = state_82789__$1;
(statearr_82797_83007[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (12))){
var inst_82766 = (state_82789[(8)]);
var inst_82775 = cljs.core.first(inst_82766);
var inst_82776 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_82775);
var inst_82777 = cljs.core.next(inst_82766);
var inst_82753 = inst_82777;
var inst_82754 = null;
var inst_82755 = (0);
var inst_82756 = (0);
var state_82789__$1 = (function (){var statearr_82798 = state_82789;
(statearr_82798[(9)] = inst_82755);

(statearr_82798[(11)] = inst_82776);

(statearr_82798[(7)] = inst_82753);

(statearr_82798[(10)] = inst_82756);

(statearr_82798[(12)] = inst_82754);

return statearr_82798;
})();
var statearr_82799_83008 = state_82789__$1;
(statearr_82799_83008[(2)] = null);

(statearr_82799_83008[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (2))){
var inst_82750 = (state_82789[(2)]);
var inst_82751 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,inst_82750);
var inst_82752 = cljs.core.seq(inst_82751);
var inst_82753 = inst_82752;
var inst_82754 = null;
var inst_82755 = (0);
var inst_82756 = (0);
var state_82789__$1 = (function (){var statearr_82800 = state_82789;
(statearr_82800[(9)] = inst_82755);

(statearr_82800[(7)] = inst_82753);

(statearr_82800[(10)] = inst_82756);

(statearr_82800[(12)] = inst_82754);

return statearr_82800;
})();
var statearr_82801_83009 = state_82789__$1;
(statearr_82801_83009[(2)] = null);

(statearr_82801_83009[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (11))){
var inst_82766 = (state_82789[(8)]);
var inst_82770 = cljs.core.chunk_first(inst_82766);
var inst_82771 = cljs.core.chunk_rest(inst_82766);
var inst_82772 = cljs.core.count(inst_82770);
var inst_82753 = inst_82771;
var inst_82754 = inst_82770;
var inst_82755 = inst_82772;
var inst_82756 = (0);
var state_82789__$1 = (function (){var statearr_82805 = state_82789;
(statearr_82805[(9)] = inst_82755);

(statearr_82805[(7)] = inst_82753);

(statearr_82805[(10)] = inst_82756);

(statearr_82805[(12)] = inst_82754);

return statearr_82805;
})();
var statearr_82806_83010 = state_82789__$1;
(statearr_82806_83010[(2)] = null);

(statearr_82806_83010[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (9))){
var state_82789__$1 = state_82789;
var statearr_82807_83011 = state_82789__$1;
(statearr_82807_83011[(2)] = null);

(statearr_82807_83011[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (5))){
var inst_82755 = (state_82789[(9)]);
var inst_82753 = (state_82789[(7)]);
var inst_82756 = (state_82789[(10)]);
var inst_82754 = (state_82789[(12)]);
var inst_82761 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_82754,inst_82756);
var inst_82762 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_82761);
var inst_82763 = (inst_82756 + (1));
var tmp82802 = inst_82755;
var tmp82803 = inst_82753;
var tmp82804 = inst_82754;
var inst_82753__$1 = tmp82803;
var inst_82754__$1 = tmp82804;
var inst_82755__$1 = tmp82802;
var inst_82756__$1 = inst_82763;
var state_82789__$1 = (function (){var statearr_82808 = state_82789;
(statearr_82808[(9)] = inst_82755__$1);

(statearr_82808[(7)] = inst_82753__$1);

(statearr_82808[(10)] = inst_82756__$1);

(statearr_82808[(13)] = inst_82762);

(statearr_82808[(12)] = inst_82754__$1);

return statearr_82808;
})();
var statearr_82809_83012 = state_82789__$1;
(statearr_82809_83012[(2)] = null);

(statearr_82809_83012[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (10))){
var inst_82783 = (state_82789[(2)]);
var state_82789__$1 = state_82789;
var statearr_82810_83013 = state_82789__$1;
(statearr_82810_83013[(2)] = inst_82783);

(statearr_82810_83013[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82790 === (8))){
var inst_82766 = (state_82789[(8)]);
var inst_82768 = cljs.core.chunked_seq_QMARK_(inst_82766);
var state_82789__$1 = state_82789;
if(inst_82768){
var statearr_82811_83014 = state_82789__$1;
(statearr_82811_83014[(1)] = (11));

} else {
var statearr_82812_83015 = state_82789__$1;
(statearr_82812_83015[(1)] = (12));

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
});})(seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83001,out_c_82999,snapshot_id_83000,step,step__GT_scores,hover_i,hover_y))
;
return ((function (seq__82739,chunk__82741,count__82742,i__82743,switch__41984__auto__,c__42110__auto___83001,out_c_82999,snapshot_id_83000,step,step__GT_scores,hover_i,hover_y){
return (function() {
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_82816 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_82816[(0)] = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__);

(statearr_82816[(1)] = (1));

return statearr_82816;
});
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____1 = (function (state_82789){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_82789);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e82817){if((e82817 instanceof Object)){
var ex__41988__auto__ = e82817;
var statearr_82818_83016 = state_82789;
(statearr_82818_83016[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_82789);

return cljs.core.cst$kw$recur;
} else {
throw e82817;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83017 = state_82789;
state_82789 = G__83017;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__ = function(state_82789){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____1.call(this,state_82789);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__;
})()
;})(seq__82739,chunk__82741,count__82742,i__82743,switch__41984__auto__,c__42110__auto___83001,out_c_82999,snapshot_id_83000,step,step__GT_scores,hover_i,hover_y))
})();
var state__42112__auto__ = (function (){var statearr_82819 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_82819[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___83001);

return statearr_82819;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83001,out_c_82999,snapshot_id_83000,step,step__GT_scores,hover_i,hover_y))
);


var G__83018 = seq__82739;
var G__83019 = chunk__82741;
var G__83020 = count__82742;
var G__83021 = (i__82743 + (1));
seq__82739 = G__83018;
chunk__82741 = G__83019;
count__82742 = G__83020;
i__82743 = G__83021;
continue;
} else {
var temp__6728__auto__ = cljs.core.seq(seq__82739);
if(temp__6728__auto__){
var seq__82739__$1 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__82739__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__82739__$1);
var G__83022 = cljs.core.chunk_rest(seq__82739__$1);
var G__83023 = c__10181__auto__;
var G__83024 = cljs.core.count(c__10181__auto__);
var G__83025 = (0);
seq__82739 = G__83022;
chunk__82741 = G__83023;
count__82742 = G__83024;
i__82743 = G__83025;
continue;
} else {
var step = cljs.core.first(seq__82739__$1);
var out_c_83026 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var snapshot_id_83027 = cljs.core.cst$kw$snapshot_DASH_id.cljs$core$IFn$_invoke$arity$1(step);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["decode-predictive-columns",snapshot_id_83027,cljs.core.cst$kw$power_DASH_consumption,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.n_predictions) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.n_predictions)),org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c_83026,true)], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_boundaries_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(-10));

org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,(110));
} else {
}

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.try_last_value_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.try_last_value_QMARK_)))){
org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(step,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input_DASH_value,cljs.core.cst$kw$consumption], null)));
} else {
}

var c__42110__auto___83028 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83028,out_c_83026,snapshot_id_83027,step,seq__82739__$1,temp__6728__auto__,step__GT_scores,hover_i,hover_y){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83028,out_c_83026,snapshot_id_83027,step,seq__82739__$1,temp__6728__auto__,step__GT_scores,hover_i,hover_y){
return (function (state_82864){
var state_val_82865 = (state_82864[(1)]);
if((state_val_82865 === (7))){
var inst_82860 = (state_82864[(2)]);
var state_82864__$1 = state_82864;
var statearr_82866_83029 = state_82864__$1;
(statearr_82866_83029[(2)] = inst_82860);

(statearr_82866_83029[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (1))){
var state_82864__$1 = state_82864;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_82864__$1,(2),out_c_83026);
} else {
if((state_val_82865 === (4))){
var inst_82862 = (state_82864[(2)]);
var state_82864__$1 = state_82864;
return cljs.core.async.impl.ioc_helpers.return_chan(state_82864__$1,inst_82862);
} else {
if((state_val_82865 === (13))){
var inst_82855 = (state_82864[(2)]);
var state_82864__$1 = state_82864;
var statearr_82867_83030 = state_82864__$1;
(statearr_82867_83030[(2)] = inst_82855);

(statearr_82867_83030[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (6))){
var inst_82841 = (state_82864[(7)]);
var inst_82828 = (state_82864[(8)]);
var inst_82841__$1 = cljs.core.seq(inst_82828);
var state_82864__$1 = (function (){var statearr_82868 = state_82864;
(statearr_82868[(7)] = inst_82841__$1);

return statearr_82868;
})();
if(inst_82841__$1){
var statearr_82869_83031 = state_82864__$1;
(statearr_82869_83031[(1)] = (8));

} else {
var statearr_82870_83032 = state_82864__$1;
(statearr_82870_83032[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (3))){
var inst_82831 = (state_82864[(9)]);
var inst_82830 = (state_82864[(10)]);
var inst_82833 = (inst_82831 < inst_82830);
var inst_82834 = inst_82833;
var state_82864__$1 = state_82864;
if(cljs.core.truth_(inst_82834)){
var statearr_82871_83033 = state_82864__$1;
(statearr_82871_83033[(1)] = (5));

} else {
var statearr_82872_83034 = state_82864__$1;
(statearr_82872_83034[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (12))){
var inst_82841 = (state_82864[(7)]);
var inst_82850 = cljs.core.first(inst_82841);
var inst_82851 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_82850);
var inst_82852 = cljs.core.next(inst_82841);
var inst_82828 = inst_82852;
var inst_82829 = null;
var inst_82830 = (0);
var inst_82831 = (0);
var state_82864__$1 = (function (){var statearr_82873 = state_82864;
(statearr_82873[(11)] = inst_82829);

(statearr_82873[(8)] = inst_82828);

(statearr_82873[(12)] = inst_82851);

(statearr_82873[(9)] = inst_82831);

(statearr_82873[(10)] = inst_82830);

return statearr_82873;
})();
var statearr_82874_83035 = state_82864__$1;
(statearr_82874_83035[(2)] = null);

(statearr_82874_83035[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (2))){
var inst_82825 = (state_82864[(2)]);
var inst_82826 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$value,inst_82825);
var inst_82827 = cljs.core.seq(inst_82826);
var inst_82828 = inst_82827;
var inst_82829 = null;
var inst_82830 = (0);
var inst_82831 = (0);
var state_82864__$1 = (function (){var statearr_82875 = state_82864;
(statearr_82875[(11)] = inst_82829);

(statearr_82875[(8)] = inst_82828);

(statearr_82875[(9)] = inst_82831);

(statearr_82875[(10)] = inst_82830);

return statearr_82875;
})();
var statearr_82876_83036 = state_82864__$1;
(statearr_82876_83036[(2)] = null);

(statearr_82876_83036[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (11))){
var inst_82841 = (state_82864[(7)]);
var inst_82845 = cljs.core.chunk_first(inst_82841);
var inst_82846 = cljs.core.chunk_rest(inst_82841);
var inst_82847 = cljs.core.count(inst_82845);
var inst_82828 = inst_82846;
var inst_82829 = inst_82845;
var inst_82830 = inst_82847;
var inst_82831 = (0);
var state_82864__$1 = (function (){var statearr_82880 = state_82864;
(statearr_82880[(11)] = inst_82829);

(statearr_82880[(8)] = inst_82828);

(statearr_82880[(9)] = inst_82831);

(statearr_82880[(10)] = inst_82830);

return statearr_82880;
})();
var statearr_82881_83037 = state_82864__$1;
(statearr_82881_83037[(2)] = null);

(statearr_82881_83037[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (9))){
var state_82864__$1 = state_82864;
var statearr_82882_83038 = state_82864__$1;
(statearr_82882_83038[(2)] = null);

(statearr_82882_83038[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (5))){
var inst_82829 = (state_82864[(11)]);
var inst_82828 = (state_82864[(8)]);
var inst_82831 = (state_82864[(9)]);
var inst_82830 = (state_82864[(10)]);
var inst_82836 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(inst_82829,inst_82831);
var inst_82837 = org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,step,inst_82836);
var inst_82838 = (inst_82831 + (1));
var tmp82877 = inst_82829;
var tmp82878 = inst_82828;
var tmp82879 = inst_82830;
var inst_82828__$1 = tmp82878;
var inst_82829__$1 = tmp82877;
var inst_82830__$1 = tmp82879;
var inst_82831__$1 = inst_82838;
var state_82864__$1 = (function (){var statearr_82883 = state_82864;
(statearr_82883[(11)] = inst_82829__$1);

(statearr_82883[(8)] = inst_82828__$1);

(statearr_82883[(9)] = inst_82831__$1);

(statearr_82883[(13)] = inst_82837);

(statearr_82883[(10)] = inst_82830__$1);

return statearr_82883;
})();
var statearr_82884_83039 = state_82864__$1;
(statearr_82884_83039[(2)] = null);

(statearr_82884_83039[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (10))){
var inst_82858 = (state_82864[(2)]);
var state_82864__$1 = state_82864;
var statearr_82885_83040 = state_82864__$1;
(statearr_82885_83040[(2)] = inst_82858);

(statearr_82885_83040[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_82865 === (8))){
var inst_82841 = (state_82864[(7)]);
var inst_82843 = cljs.core.chunked_seq_QMARK_(inst_82841);
var state_82864__$1 = state_82864;
if(inst_82843){
var statearr_82886_83041 = state_82864__$1;
(statearr_82886_83041[(1)] = (11));

} else {
var statearr_82887_83042 = state_82864__$1;
(statearr_82887_83042[(1)] = (12));

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
});})(seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83028,out_c_83026,snapshot_id_83027,step,seq__82739__$1,temp__6728__auto__,step__GT_scores,hover_i,hover_y))
;
return ((function (seq__82739,chunk__82741,count__82742,i__82743,switch__41984__auto__,c__42110__auto___83028,out_c_83026,snapshot_id_83027,step,seq__82739__$1,temp__6728__auto__,step__GT_scores,hover_i,hover_y){
return (function() {
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_82891 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_82891[(0)] = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__);

(statearr_82891[(1)] = (1));

return statearr_82891;
});
var org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____1 = (function (state_82864){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_82864);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e82892){if((e82892 instanceof Object)){
var ex__41988__auto__ = e82892;
var statearr_82893_83043 = state_82864;
(statearr_82893_83043[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_82864);

return cljs.core.cst$kw$recur;
} else {
throw e82892;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83044 = state_82864;
state_82864 = G__83044;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__ = function(state_82864){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____1.call(this,state_82864);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_state_machine__41985__auto__;
})()
;})(seq__82739,chunk__82741,count__82742,i__82743,switch__41984__auto__,c__42110__auto___83028,out_c_83026,snapshot_id_83027,step,seq__82739__$1,temp__6728__auto__,step__GT_scores,hover_i,hover_y))
})();
var state__42112__auto__ = (function (){var statearr_82894 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_82894[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___83028);

return statearr_82894;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(seq__82739,chunk__82741,count__82742,i__82743,c__42110__auto___83028,out_c_83026,snapshot_id_83027,step,seq__82739__$1,temp__6728__auto__,step__GT_scores,hover_i,hover_y))
);


var G__83045 = cljs.core.next(seq__82739__$1);
var G__83046 = null;
var G__83047 = (0);
var G__83048 = (0);
seq__82739 = G__83045;
chunk__82741 = G__83046;
count__82742 = G__83047;
i__82743 = G__83048;
continue;
}
} else {
return null;
}
}
break;
}
});})(step__GT_scores,hover_i,hover_y))
);

return ((function (step__GT_scores,hover_i,hover_y){
return (function (){
var h = (400);
var draw_steps = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.viz_options) : cljs.core.deref.call(null,org.numenta.sanity.main.viz_options)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$draw_DASH_steps], null));
var w = (org.numenta.sanity.demos.hotgym.unit_width * draw_steps);
var h_pad_top = (15);
var h_pad_bottom = (8);
var w_pad_left = (20);
var w_pad_right = (42);
var top = (110);
var bottom = (-10);
var unit_height = (h / (top - bottom));
var label_every = (10);
var center_dt = cljs.core.cst$kw$dt.cljs$core$IFn$_invoke$arity$1(cljs.core.peek((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.selection) : cljs.core.deref.call(null,org.numenta.sanity.main.selection))));
var dt0 = (function (){var x__9611__auto__ = (-1);
var y__9612__auto__ = (center_dt - cljs.core.quot(draw_steps,(2)));
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})();
var center_i = (center_dt - dt0);
var draw_dts = cljs.core.range.cljs$core$IFn$_invoke$arity$2(dt0,(function (){var x__9618__auto__ = (dt0 + draw_steps);
var y__9619__auto__ = cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})());
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$position,"relative",cljs.core.cst$kw$width,((w_pad_left + w) + w_pad_right)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$top,(0),cljs.core.cst$kw$left,(0),cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),"power-consumption"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$svg,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$height,((h + h_pad_top) + h_pad_bottom),cljs.core.cst$kw$width,((w + w_pad_left) + w_pad_right)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str(w_pad_left),cljs.core.str(","),cljs.core.str(h_pad_top),cljs.core.str(")")].join('')], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption_axis_svg,h,bottom,top], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g], null),(function (){var iter__10132__auto__ = ((function (h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895(s__82896){
return (new cljs.core.LazySeq(null,((function (h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__82896__$1 = s__82896;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__82896__$1);
if(temp__6728__auto__){
var s__82896__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__82896__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__82896__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__82898 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__82897 = (0);
while(true){
if((i__82897 < size__10131__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__82897);
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)),null);
var y_scores = (cljs.core.truth_(from_step)?(function (){var iter__10132__auto__ = ((function (i__82897,dt,from_step,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895_$_iter__82939(s__82940){
return (new cljs.core.LazySeq(null,((function (i__82897,dt,from_step,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__82940__$1 = s__82940;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__82940__$1);
if(temp__6728__auto____$1){
var s__82940__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82940__$2)){
var c__10130__auto____$1 = cljs.core.chunk_first(s__82940__$2);
var size__10131__auto____$1 = cljs.core.count(c__10130__auto____$1);
var b__82942 = cljs.core.chunk_buffer(size__10131__auto____$1);
if((function (){var i__82941 = (0);
while(true){
if((i__82941 < size__10131__auto____$1)){
var vec__82951 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto____$1,i__82941);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82951,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82951,(1),null);
cljs.core.chunk_append(b__82942,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null));

var G__83049 = (i__82941 + (1));
i__82941 = G__83049;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82942),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895_$_iter__82939(cljs.core.chunk_rest(s__82940__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82942),null);
}
} else {
var vec__82954 = cljs.core.first(s__82940__$2);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82954,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82954,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895_$_iter__82939(cljs.core.rest(s__82940__$2)));
}
} else {
return null;
}
break;
}
});})(i__82897,dt,from_step,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(i__82897,dt,from_step,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__10132__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)));
})():null);
cljs.core.chunk_append(b__82898,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str((org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - i))),cljs.core.str(",0)")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,(function (){var G__82957 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,h,cljs.core.cst$kw$fill,"white"], null);
if(cljs.core.truth_(from_step)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__82957,cljs.core.cst$kw$on_DASH_click,((function (i__82897,G__82957,dt,from_step,y_scores,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
return org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,from_step,org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom));
});})(i__82897,G__82957,dt,from_step,y_scores,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.array_seq([cljs.core.cst$kw$on_DASH_mouse_DASH_move,((function (i__82897,G__82957,dt,from_step,y_scores,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,i) : cljs.core.reset_BANG_.call(null,hover_i,i));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,y) : cljs.core.reset_BANG_.call(null,hover_y,y));
});})(i__82897,G__82957,dt,from_step,y_scores,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (i__82897,G__82957,dt,from_step,y_scores,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,null) : cljs.core.reset_BANG_.call(null,hover_i,null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,null) : cljs.core.reset_BANG_.call(null,hover_y,null));
});})(i__82897,G__82957,dt,from_step,y_scores,i,c__10130__auto__,size__10131__auto__,b__82898,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
], 0));
} else {
return G__82957;
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_gradient_svg,y_scores], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_samples_svg,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)], null):null),(((((0) <= dt)) && ((dt < cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.actual_svg,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),dt),top,unit_height], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.prediction_svg,y_scores], null):null)], null)], null));

var G__83050 = (i__82897 + (1));
i__82897 = G__83050;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82898),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895(cljs.core.chunk_rest(s__82896__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82898),null);
}
} else {
var i = cljs.core.first(s__82896__$2);
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$3((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)),null);
var y_scores = (cljs.core.truth_(from_step)?(function (){var iter__10132__auto__ = ((function (dt,from_step,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895_$_iter__82958(s__82959){
return (new cljs.core.LazySeq(null,((function (dt,from_step,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (){
var s__82959__$1 = s__82959;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__82959__$1);
if(temp__6728__auto____$1){
var s__82959__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__82959__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__82959__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__82961 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__82960 = (0);
while(true){
if((i__82960 < size__10131__auto__)){
var vec__82970 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__82960);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82970,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82970,(1),null);
cljs.core.chunk_append(b__82961,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null));

var G__83051 = (i__82960 + (1));
i__82960 = G__83051;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__82961),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895_$_iter__82958(cljs.core.chunk_rest(s__82959__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__82961),null);
}
} else {
var vec__82973 = cljs.core.first(s__82959__$2);
var consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82973,(0),null);
var score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82973,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.consumption__GT_y(consumption,top,unit_height),score], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895_$_iter__82958(cljs.core.rest(s__82959__$2)));
}
} else {
return null;
}
break;
}
});})(dt,from_step,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(dt,from_step,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__10132__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)));
})():null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate("),cljs.core.str((org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - i))),cljs.core.str(",0)")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,(function (){var G__82976 = new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,org.numenta.sanity.demos.hotgym.unit_width,cljs.core.cst$kw$height,h,cljs.core.cst$kw$fill,"white"], null);
if(cljs.core.truth_(from_step)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__82976,cljs.core.cst$kw$on_DASH_click,((function (G__82976,dt,from_step,y_scores,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
return org.numenta.sanity.demos.hotgym.consider_consumption_BANG_(step__GT_scores,from_step,org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom));
});})(G__82976,dt,from_step,y_scores,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.array_seq([cljs.core.cst$kw$on_DASH_mouse_DASH_move,((function (G__82976,dt,from_step,y_scores,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
var y = (e.clientY - e.target.getBoundingClientRect().top);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,i) : cljs.core.reset_BANG_.call(null,hover_i,i));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,y) : cljs.core.reset_BANG_.call(null,hover_y,y));
});})(G__82976,dt,from_step,y_scores,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (G__82976,dt,from_step,y_scores,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_i,null) : cljs.core.reset_BANG_.call(null,hover_i,null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(hover_y,null) : cljs.core.reset_BANG_.call(null,hover_y,null));
});})(G__82976,dt,from_step,y_scores,i,s__82896__$2,temp__6728__auto__,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
], 0));
} else {
return G__82976;
}
})()], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_gradient_svg,y_scores], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_samples_svg,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,y_scores)], null):null),(((((0) <= dt)) && ((dt < cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.actual_svg,cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),dt),top,unit_height], null):null),(cljs.core.truth_(cljs.core.not_empty(y_scores))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.prediction_svg,y_scores], null):null)], null)], null),org$numenta$sanity$demos$hotgym$anomaly_radar_pane_$_iter__82895(cljs.core.rest(s__82896__$2)));
}
} else {
return null;
}
break;
}
});})(h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,null,null));
});})(h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
;
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(draw_dts)));
})()),(function (){var x = (org.numenta.sanity.demos.hotgym.unit_width * ((draw_steps - (1)) - center_i));
var points = [cljs.core.str(x),cljs.core.str(","),cljs.core.str((0)),cljs.core.str(" "),cljs.core.str(x),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((0))].join('');
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,(function (){var points__$1 = [cljs.core.str(x),cljs.core.str(","),cljs.core.str((0)),cljs.core.str(" "),cljs.core.str(x),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((-1)),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((0))].join('');
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,cljs.core.cst$kw$highlight.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.state_colors),cljs.core.cst$kw$stroke_DASH_width,(3),cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,0.75,cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null)], null);
})(),(function (){var points__$1 = [cljs.core.str(x),cljs.core.str(","),cljs.core.str(h),cljs.core.str(" "),cljs.core.str(x),cljs.core.str(","),cljs.core.str((h + (6))),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str((h + (6))),cljs.core.str(" "),cljs.core.str((x + org.numenta.sanity.demos.hotgym.unit_width)),cljs.core.str(","),cljs.core.str(h)].join('');
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,cljs.core.cst$kw$highlight.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.state_colors),cljs.core.cst$kw$stroke_DASH_width,(3),cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$polyline,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,0.75,cljs.core.cst$kw$fill,"none",cljs.core.cst$kw$points,points__$1], null)], null)], null);
})()], null);
})()], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hover_y) : cljs.core.deref.call(null,hover_y)))?(function (){var i = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hover_i) : cljs.core.deref.call(null,hover_i));
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(draw_dts,i);
var from_step = cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps)),(dt + (1)));
var y = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(hover_y) : cljs.core.deref.call(null,hover_y));
var consumption = org.numenta.sanity.demos.hotgym.y__GT_consumption(y,h,top,bottom);
var vec__82977 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (i,dt,from_step,y,consumption,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y){
return (function (p__82986){
var vec__82987 = p__82986;
var vec__82990 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82987,(0),null);
var c1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82990,(0),null);
var s1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82990,(1),null);
var vec__82993 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82987,(1),null);
var c2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82993,(0),null);
var s2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82993,(1),null);
return ((c1 <= consumption)) && ((consumption <= c2));
});})(i,dt,from_step,y,consumption,h,draw_steps,w,h_pad_top,h_pad_bottom,w_pad_left,w_pad_right,top,bottom,unit_height,label_every,center_dt,dt0,center_i,draw_dts,step__GT_scores,hover_i,hover_y))
,cljs.core.partition.cljs$core$IFn$_invoke$arity$3((2),(1),cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(step__GT_scores) : cljs.core.deref.call(null,step__GT_scores)),from_step)))));
var vec__82980 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82977,(0),null);
var lower_consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82980,(0),null);
var lower_score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82980,(1),null);
var vec__82983 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82977,(1),null);
var upper_consumption = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82983,(0),null);
var upper_score = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82983,(1),null);
var lower_y = org.numenta.sanity.demos.hotgym.consumption__GT_y(lower_consumption,top,unit_height);
var upper_y = org.numenta.sanity.demos.hotgym.consumption__GT_y(upper_consumption,top,unit_height);
var dt_left = (w_pad_left + (org.numenta.sanity.demos.hotgym.unit_width * (((draw_steps - (1)) - i) + 0.5)));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$position,"absolute",cljs.core.cst$kw$left,(0),cljs.core.cst$kw$top,h_pad_top,cljs.core.cst$kw$pointer_DASH_events,"none"], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,lower_y,(w + w_pad_left),true,null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(lower_consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),[cljs.core.str(lower_score.toFixed((3)))].join('')], null)], null),(function (){var contents = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),"click"], null);
var vec__82996 = ((((y - upper_y) > (30)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [contents,null], null):((((lower_y - y) > (30)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,contents], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,null], null)
));
var above = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82996,(0),null);
var below = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82996,(1),null);
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,y,(w + w_pad_left),false,above,below], null);
})(),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.horizontal_label,dt_left,upper_y,(w + w_pad_left),true,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,[cljs.core.str(upper_consumption.toFixed((1))),cljs.core.str("kW")].join(''),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),[cljs.core.str(upper_score.toFixed((3)))].join('')], null),null], null)], null);
})():null)], null);
});
;})(step__GT_scores,hover_i,hover_y))
});
org.numenta.sanity.demos.hotgym.world_pane = (function org$numenta$sanity$demos$hotgym$world_pane(){
if(cljs.core.truth_(cljs.core.not_empty((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.steps) : cljs.core.deref.call(null,org.numenta.sanity.main.steps))))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(10)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.anomaly_radar_pane], null)], null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(30)], null)], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$hotgym$world_pane_$_iter__83070(s__83071){
return (new cljs.core.LazySeq(null,(function (){
var s__83071__$1 = s__83071;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__83071__$1);
if(temp__6728__auto__){
var s__83071__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__83071__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__83071__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__83073 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__83072 = (0);
while(true){
if((i__83072 < size__10131__auto__)){
var vec__83082 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__83072);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83082,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83082,(1),null);
cljs.core.chunk_append(b__83073,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_bottom,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),cljs.core.name(sense_id)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,[cljs.core.str(v)].join('')], null)], null)], null));

var G__83088 = (i__83072 + (1));
i__83072 = G__83088;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__83073),org$numenta$sanity$demos$hotgym$world_pane_$_iter__83070(cljs.core.chunk_rest(s__83071__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__83073),null);
}
} else {
var vec__83085 = cljs.core.first(s__83071__$2);
var sense_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83085,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83085,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_bottom,(20)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"9px",cljs.core.cst$kw$font_DASH_weight,"bold"], null)], null),cljs.core.name(sense_id)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,[cljs.core.str(v)].join('')], null)], null)], null),org$numenta$sanity$demos$hotgym$world_pane_$_iter__83070(cljs.core.rest(s__83071__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$sensed_DASH_values.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0()),cljs.core.cst$kw$power_DASH_consumption));
})())], null);
} else {
return null;
}
});
org.numenta.sanity.demos.hotgym.set_model_BANG_ = (function org$numenta$sanity$demos$hotgym$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.model)) == null);
var params = org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.layer.params.better_parameter_defaults,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$depth,(1),cljs.core.cst$kw$distal,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$max_DASH_segments,(128),cljs.core.cst$kw$perm_DASH_connected,0.2,cljs.core.cst$kw$perm_DASH_init,0.2], null)], null)], 0));
var G__83096_83103 = org.numenta.sanity.demos.hotgym.model;
var G__83097_83104 = org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,org.nfrac.comportex.layer.layer_of_cells(params)], null),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$power_DASH_consumption,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$consumption,org.nfrac.comportex.encoders.sampling_linear_encoder.cljs$core$IFn$_invoke$arity$4(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((1024) + (256))], null),(17),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [-12.8,112.8], null),12.8)], null),cljs.core.cst$kw$is_DASH_weekend_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$is_DASH_weekend_QMARK_,org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(10)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [true,false], null))], null),cljs.core.cst$kw$hour_DASH_of_DASH_day,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hour_DASH_of_DASH_day,org.nfrac.comportex.encoders.category_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [((40) * (24))], null),cljs.core.range.cljs$core$IFn$_invoke$arity$1((24)))], null)], null),new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$ff_DASH_deps,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$power_DASH_consumption], null)], null),cljs.core.cst$kw$lat_DASH_deps,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$is_DASH_weekend_QMARK_,cljs.core.cst$kw$hour_DASH_of_DASH_day], null)], null)], null));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__83096_83103,G__83097_83104) : cljs.core.reset_BANG_.call(null,G__83096_83103,G__83097_83104));

if(init_QMARK_){
var G__83098_83105 = "../data/hotgym.consumption_weekend_hour.edn";
var G__83099_83106 = ((function (G__83098_83105,init_QMARK_,params){
return (function (e){
if(cljs.core.truth_(e.target.isSuccess())){
var response = e.target.getResponseText();
var inputs = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.zipmap,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$consumption,cljs.core.cst$kw$is_DASH_weekend_QMARK_,cljs.core.cst$kw$hour_DASH_of_DASH_day], null)),cljs.reader.read_string(response));
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.hotgym.world_c,inputs,false);
} else {
var G__83100 = [cljs.core.str("Request to "),cljs.core.str(e.target.getLastUri()),cljs.core.str(" failed. "),cljs.core.str(e.target.getStatus()),cljs.core.str(" - "),cljs.core.str(e.target.getStatusText())].join('');
return log.error(G__83100);
}
});})(G__83098_83105,init_QMARK_,params))
;
goog.net.XhrIo.send(G__83098_83105,G__83099_83106);

return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.hotgym.model,org.numenta.sanity.demos.hotgym.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.hotgym.into_sim);
} else {
var G__83101 = org.numenta.sanity.main.network_shape;
var G__83102 = org.numenta.sanity.util.translate_network_shape(org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.hotgym.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.hotgym.model))));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__83101,G__83102) : cljs.core.reset_BANG_.call(null,G__83101,G__83102));
}
}));
});
org.numenta.sanity.demos.hotgym.model_tab = (function org$numenta$sanity$demos$hotgym$model_tab(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Numenta's \"hotgym\" dataset."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Uses the solution from:",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://mrcslws.com/gorilla/?path=hotgym.clj"], null),"Predicting power consumptions with HTM"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This demo highlights the Anomaly Radar display on the left. The anomaly\n   scores for possible next inputs are sampled, and the sample points are shown\n   as dots. The prediction is a blue dash, and the actual value is a black\n   dash. The red->white scale represents the anomaly score. The anomaly score is\n   correct wherever there's a dot, and it's estimated elsewhere."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Inspect the numbers by hovering your mouse over the Anomaly Radar. Click\n   to add your own samples. You might want to pause the simulation first."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This demo chooses samples by decoding the predictive columns, as\n   explained in the essay above."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"It's fun to click the black dashes and see if it changes the\n   prediction. When this happens, it shows that the HTM actually predicted\n   something better than we thought, we just didn't sample the right points. You\n   could expand on this demo to try different strategies for choosing a clever\n   set of samples, finding the right balance between results and code\n   performance."], null)], null);
});
org.numenta.sanity.demos.hotgym.init = (function org$numenta$sanity$demos$hotgym$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.hotgym.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.hotgym.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.hotgym.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.hotgym.init', org.numenta.sanity.demos.hotgym.init);
