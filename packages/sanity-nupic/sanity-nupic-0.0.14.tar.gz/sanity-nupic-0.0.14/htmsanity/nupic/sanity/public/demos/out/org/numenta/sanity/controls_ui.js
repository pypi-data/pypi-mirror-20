// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.controls_ui');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('goog.string');
goog.require('cljs.core.async');
goog.require('clojure.browser.repl');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.selection');
goog.require('clojure.string');
goog.require('cljs.reader');
goog.require('clojure.walk');
org.numenta.sanity.controls_ui.now = (function org$numenta$sanity$controls_ui$now(){
return (new Date()).getTime();
});
/**
 * Returns the simulation rate in timesteps per second for current
 * run.
 */
org.numenta.sanity.controls_ui.sim_rate = (function org$numenta$sanity$controls_ui$sim_rate(step,run_start){
var temp__6726__auto__ = cljs.core.cst$kw$time.cljs$core$IFn$_invoke$arity$1(run_start);
if(cljs.core.truth_(temp__6726__auto__)){
var time_start = temp__6726__auto__;
var dur_ms = (org.numenta.sanity.controls_ui.now() - time_start);
return (((cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(step) - cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(run_start)) / dur_ms) * (1000));
} else {
return (0);
}
});
org.numenta.sanity.controls_ui.param_type = (function org$numenta$sanity$controls_ui$param_type(v){
if((v === true) || (v === false)){
return cljs.core.cst$kw$boolean;
} else {
if(cljs.core.vector_QMARK_(v)){
return cljs.core.cst$kw$vector;
} else {
return cljs.core.cst$kw$number;

}
}
});
org.numenta.sanity.controls_ui.params_form = (function org$numenta$sanity$controls_ui$params_form(network_shape,partypes,params,params_path,skip_set){
var iter__10132__auto__ = (function org$numenta$sanity$controls_ui$params_form_$_iter__69753(s__69754){
return (new cljs.core.LazySeq(null,(function (){
var s__69754__$1 = s__69754;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__69754__$1);
if(temp__6728__auto__){
var s__69754__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69754__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__69754__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__69756 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__69755 = (0);
while(true){
if((i__69755 < size__10131__auto__)){
var vec__69773 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__69755);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69773,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69773,(1),null);
if(cljs.core.not((skip_set.cljs$core$IFn$_invoke$arity$1 ? skip_set.cljs$core$IFn$_invoke$arity$1(k) : skip_set.call(null,k)))){
var typ = (function (){var or__9278__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(partypes) : cljs.core.deref.call(null,partypes)),k);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(partypes,cljs.core.assoc,k,org.numenta.sanity.controls_ui.param_type(v)),k);
}
})();
var setv_BANG_ = ((function (i__69755,s__69754__$1,typ,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__){
return (function (p1__69718_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(network_shape,cljs.core.assoc_in,params_path,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(params,k,p1__69718_SHARP_));
});})(i__69755,s__69754__$1,typ,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__))
;
cljs.core.chunk_append(b__69756,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,((((v == null)) || (typeof v === 'string'))?"has-error":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$control_DASH_label$text_DASH_left,cljs.core.name(k)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_4,(function (){var G__69776 = (((typ instanceof cljs.core.Keyword))?typ.fqn:null);
switch (G__69776) {
case "boolean":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_(v)?true:null),cljs.core.cst$kw$on_DASH_change,((function (i__69755,s__69754__$1,G__69776,typ,setv_BANG_,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__){
return (function (){
return setv_BANG_(cljs.core.not(v));
});})(i__69755,s__69754__$1,G__69776,typ,setv_BANG_,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__))
], null)], null);

break;
case "vector":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,[cljs.core.str(v)].join(''),cljs.core.cst$kw$on_DASH_change,((function (i__69755,s__69754__$1,G__69776,typ,setv_BANG_,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__){
return (function (e){
var s = (function (){var G__69777 = e.target;
return goog.dom.forms.getValue(G__69777);
})();
var x = (function (){try{return cljs.reader.read_string(s);
}catch (e69778){var _ = e69778;
return s;
}})();
var newval = (((cljs.core.vector_QMARK_(x)) && (cljs.core.every_QMARK_(cljs.core.integer_QMARK_,x)))?x:s);
return setv_BANG_(newval);
});})(i__69755,s__69754__$1,G__69776,typ,setv_BANG_,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__))
], null)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$on_DASH_change,((function (i__69755,s__69754__$1,G__69776,typ,setv_BANG_,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__){
return (function (e){
var s = (function (){var G__69779 = e.target;
return goog.dom.forms.getValue(G__69779);
})();
var parsed = parseFloat(s);
var newval = (cljs.core.truth_((function (){var or__9278__auto__ = cljs.core.empty_QMARK_(s);
if(or__9278__auto__){
return or__9278__auto__;
} else {
return isNaN(parsed);
}
})())?null:((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,[cljs.core.str(parsed)].join('')))?s:parsed));
return setv_BANG_(newval);
});})(i__69755,s__69754__$1,G__69776,typ,setv_BANG_,vec__69773,k,v,c__10130__auto__,size__10131__auto__,b__69756,s__69754__$2,temp__6728__auto__))
], null)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(typ)].join('')));

}
})()], null)], null));

var G__69788 = (i__69755 + (1));
i__69755 = G__69788;
continue;
} else {
var G__69789 = (i__69755 + (1));
i__69755 = G__69789;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69756),org$numenta$sanity$controls_ui$params_form_$_iter__69753(cljs.core.chunk_rest(s__69754__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69756),null);
}
} else {
var vec__69780 = cljs.core.first(s__69754__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69780,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69780,(1),null);
if(cljs.core.not((skip_set.cljs$core$IFn$_invoke$arity$1 ? skip_set.cljs$core$IFn$_invoke$arity$1(k) : skip_set.call(null,k)))){
var typ = (function (){var or__9278__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(partypes) : cljs.core.deref.call(null,partypes)),k);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(partypes,cljs.core.assoc,k,org.numenta.sanity.controls_ui.param_type(v)),k);
}
})();
var setv_BANG_ = ((function (s__69754__$1,typ,vec__69780,k,v,s__69754__$2,temp__6728__auto__){
return (function (p1__69718_SHARP_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(network_shape,cljs.core.assoc_in,params_path,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(params,k,p1__69718_SHARP_));
});})(s__69754__$1,typ,vec__69780,k,v,s__69754__$2,temp__6728__auto__))
;
return cljs.core.cons(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,((((v == null)) || (typeof v === 'string'))?"has-error":null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$control_DASH_label$text_DASH_left,cljs.core.name(k)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_4,(function (){var G__69783 = (((typ instanceof cljs.core.Keyword))?typ.fqn:null);
switch (G__69783) {
case "boolean":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_(v)?true:null),cljs.core.cst$kw$on_DASH_change,((function (s__69754__$1,G__69783,typ,setv_BANG_,vec__69780,k,v,s__69754__$2,temp__6728__auto__){
return (function (){
return setv_BANG_(cljs.core.not(v));
});})(s__69754__$1,G__69783,typ,setv_BANG_,vec__69780,k,v,s__69754__$2,temp__6728__auto__))
], null)], null);

break;
case "vector":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,[cljs.core.str(v)].join(''),cljs.core.cst$kw$on_DASH_change,((function (s__69754__$1,G__69783,typ,setv_BANG_,vec__69780,k,v,s__69754__$2,temp__6728__auto__){
return (function (e){
var s = (function (){var G__69784 = e.target;
return goog.dom.forms.getValue(G__69784);
})();
var x = (function (){try{return cljs.reader.read_string(s);
}catch (e69785){var _ = e69785;
return s;
}})();
var newval = (((cljs.core.vector_QMARK_(x)) && (cljs.core.every_QMARK_(cljs.core.integer_QMARK_,x)))?x:s);
return setv_BANG_(newval);
});})(s__69754__$1,G__69783,typ,setv_BANG_,vec__69780,k,v,s__69754__$2,temp__6728__auto__))
], null)], null);

break;
case "number":
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$on_DASH_change,((function (s__69754__$1,G__69783,typ,setv_BANG_,vec__69780,k,v,s__69754__$2,temp__6728__auto__){
return (function (e){
var s = (function (){var G__69786 = e.target;
return goog.dom.forms.getValue(G__69786);
})();
var parsed = parseFloat(s);
var newval = (cljs.core.truth_((function (){var or__9278__auto__ = cljs.core.empty_QMARK_(s);
if(or__9278__auto__){
return or__9278__auto__;
} else {
return isNaN(parsed);
}
})())?null:((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,[cljs.core.str(parsed)].join('')))?s:parsed));
return setv_BANG_(newval);
});})(s__69754__$1,G__69783,typ,setv_BANG_,vec__69780,k,v,s__69754__$2,temp__6728__auto__))
], null)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(typ)].join('')));

}
})()], null)], null),org$numenta$sanity$controls_ui$params_form_$_iter__69753(cljs.core.rest(s__69754__$2)));
} else {
var G__69791 = cljs.core.rest(s__69754__$2);
s__69754__$1 = G__69791;
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
return iter__10132__auto__(cljs.core.sort.cljs$core$IFn$_invoke$arity$1(params));
});
org.numenta.sanity.controls_ui.parameters_tab = (function org$numenta$sanity$controls_ui$parameters_tab(network_shape,_,into_sim,___$1){
cljs.core.add_watch(network_shape,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_push_DASH_to_DASH_server,(function (___$2,___$3,prev_st,st){
if((prev_st == null)){
return null;
} else {
var seq__69839 = cljs.core.seq(cljs.core.keys(cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(st)));
var chunk__69841 = null;
var count__69842 = (0);
var i__69843 = (0);
while(true){
if((i__69843 < count__69842)){
var lyr_id = chunk__69841.cljs$core$IIndexed$_nth$arity$2(null,i__69843);
var path_69886 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id,cljs.core.cst$kw$params], null);
var old_params_69887 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_st,path_69886);
var new_params_69888 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,path_69886);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_params_69887,new_params_69888)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-params",lyr_id,new_params_69888], null));
} else {
}

var G__69889 = seq__69839;
var G__69890 = chunk__69841;
var G__69891 = count__69842;
var G__69892 = (i__69843 + (1));
seq__69839 = G__69889;
chunk__69841 = G__69890;
count__69842 = G__69891;
i__69843 = G__69892;
continue;
} else {
var temp__6728__auto__ = cljs.core.seq(seq__69839);
if(temp__6728__auto__){
var seq__69839__$1 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__69839__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__69839__$1);
var G__69893 = cljs.core.chunk_rest(seq__69839__$1);
var G__69894 = c__10181__auto__;
var G__69895 = cljs.core.count(c__10181__auto__);
var G__69896 = (0);
seq__69839 = G__69893;
chunk__69841 = G__69894;
count__69842 = G__69895;
i__69843 = G__69896;
continue;
} else {
var lyr_id = cljs.core.first(seq__69839__$1);
var path_69897 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id,cljs.core.cst$kw$params], null);
var old_params_69898 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(prev_st,path_69897);
var new_params_69899 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(st,path_69897);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_params_69898,new_params_69899)){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-params",lyr_id,new_params_69899], null));
} else {
}

var G__69900 = cljs.core.next(seq__69839__$1);
var G__69901 = null;
var G__69902 = (0);
var G__69903 = (0);
seq__69839 = G__69900;
chunk__69841 = G__69901;
count__69842 = G__69902;
i__69843 = G__69903;
continue;
}
} else {
return null;
}
}
break;
}
}
}));

var partypes = (function (){var G__69845 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69845) : cljs.core.atom.call(null,G__69845));
})();
return ((function (partypes){
return (function (network_shape__$1,selection,into_sim__$1){
var lyr_id = cljs.core.some(org.numenta.sanity.selection.layer,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection)));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Read/write model parameters of the selected layer,\n                    with immediate effect. Click a layer to select it."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info$text_DASH_center,(cljs.core.truth_(lyr_id)?[cljs.core.str(cljs.core.name(lyr_id))].join(''):null)], null),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape__$1) : cljs.core.deref.call(null,network_shape__$1)))?(function (){var params_path = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id,cljs.core.cst$kw$params], null);
var params = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape__$1) : cljs.core.deref.call(null,network_shape__$1)),params_path);
return cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.controls_ui.params_form(network_shape__$1,partypes,params,params_path,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$distal,null,cljs.core.cst$kw$proximal,null,cljs.core.cst$kw$apical,null], null), null)),(function (){var iter__10132__auto__ = ((function (params_path,params,lyr_id,partypes){
return (function org$numenta$sanity$controls_ui$parameters_tab_$_iter__69846(s__69847){
return (new cljs.core.LazySeq(null,((function (params_path,params,lyr_id,partypes){
return (function (){
var s__69847__$1 = s__69847;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__69847__$1);
if(temp__6728__auto__){
var s__69847__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69847__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__69847__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__69849 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__69848 = (0);
while(true){
if((i__69848 < size__10131__auto__)){
var vec__69858 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__69848);
var sub_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69858,(0),null);
var title = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69858,(1),null);
cljs.core.chunk_append(b__69849,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),org.numenta.sanity.controls_ui.params_form(network_shape__$1,partypes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(params,sub_k),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(params_path,sub_k),cljs.core.PersistentHashSet.EMPTY))], null)], null));

var G__69904 = (i__69848 + (1));
i__69848 = G__69904;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69849),org$numenta$sanity$controls_ui$parameters_tab_$_iter__69846(cljs.core.chunk_rest(s__69847__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69849),null);
}
} else {
var vec__69861 = cljs.core.first(s__69847__$2);
var sub_k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69861,(0),null);
var title = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69861,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal], null),org.numenta.sanity.controls_ui.params_form(network_shape__$1,partypes,cljs.core.get.cljs$core$IFn$_invoke$arity$2(params,sub_k),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(params_path,sub_k),cljs.core.PersistentHashSet.EMPTY))], null)], null),org$numenta$sanity$controls_ui$parameters_tab_$_iter__69846(cljs.core.rest(s__69847__$2)));
}
} else {
return null;
}
break;
}
});})(params_path,params,lyr_id,partypes))
,null,null));
});})(params_path,params,lyr_id,partypes))
;
return iter__10132__auto__(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$proximal,"Proximal dendrites"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$distal,"Distal (lateral) dendrites"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$apical,"Apical dendrites"], null)], null));
})(),cljs.core.array_seq([new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Note"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Parameter values can be altered above, but some parameters\n                     must be in effect when the HTM layers are created.\n                     Notable examples are ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"column-dimensions"], null)," and ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"depth"], null),". After setting such parameter values, rebuild all layers\n                 (losing any learned connections in the process):"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (params_path,params,lyr_id,partypes){
return (function (){
return org.numenta.sanity.helpers.ui_loading_message_until((function (){var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,params_path,params,lyr_id,partypes){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,params_path,params,lyr_id,partypes){
return (function (state_69876){
var state_val_69877 = (state_69876[(1)]);
if((state_val_69877 === (1))){
var inst_69864 = cljs.core.async.timeout((100));
var state_69876__$1 = state_69876;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69876__$1,(2),inst_69864);
} else {
if((state_val_69877 === (2))){
var inst_69866 = (state_69876[(2)]);
var inst_69867 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var inst_69868 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_69869 = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(inst_69867,true);
var inst_69870 = ["restart",inst_69869];
var inst_69871 = (new cljs.core.PersistentVector(null,2,(5),inst_69868,inst_69870,null));
var inst_69872 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim__$1,inst_69871);
var state_69876__$1 = (function (){var statearr_69878 = state_69876;
(statearr_69878[(7)] = inst_69866);

(statearr_69878[(8)] = inst_69872);

return statearr_69878;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_69876__$1,(3),inst_69867);
} else {
if((state_val_69877 === (3))){
var inst_69874 = (state_69876[(2)]);
var state_69876__$1 = state_69876;
return cljs.core.async.impl.ioc_helpers.return_chan(state_69876__$1,inst_69874);
} else {
return null;
}
}
}
});})(c__42110__auto__,params_path,params,lyr_id,partypes))
;
return ((function (switch__41984__auto__,c__42110__auto__,params_path,params,lyr_id,partypes){
return (function() {
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto____0 = (function (){
var statearr_69882 = [null,null,null,null,null,null,null,null,null];
(statearr_69882[(0)] = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto__);

(statearr_69882[(1)] = (1));

return statearr_69882;
});
var org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto____1 = (function (state_69876){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_69876);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e69883){if((e69883 instanceof Object)){
var ex__41988__auto__ = e69883;
var statearr_69884_69905 = state_69876;
(statearr_69884_69905[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_69876);

return cljs.core.cst$kw$recur;
} else {
throw e69883;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__69906 = state_69876;
state_69876 = G__69906;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto__ = function(state_69876){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto____1.call(this,state_69876);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto____0;
org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto____1;
return org$numenta$sanity$controls_ui$parameters_tab_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,params_path,params,lyr_id,partypes))
})();
var state__42112__auto__ = (function (){var statearr_69885 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_69885[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_69885;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,params_path,params,lyr_id,partypes))
);

return c__42110__auto__;
})());
});})(params_path,params,lyr_id,partypes))
], null),"Rebuild model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$small,"This will not reset, or otherwise alter, the input stream."], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Current params value"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,[cljs.core.str(params)].join('')], null)], null)], 0));
})():null))], null);
});
;})(partypes))
});
org.numenta.sanity.controls_ui.gather_col_state_history_BANG_ = (function org$numenta$sanity$controls_ui$gather_col_state_history_BANG_(col_state_history,step,into_journal){
var map__70027 = step;
var map__70027__$1 = ((((!((map__70027 == null)))?((((map__70027.cljs$lang$protocol_mask$partition0$ & (64))) || (map__70027.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__70027):map__70027);
var snapshot_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70027__$1,cljs.core.cst$kw$snapshot_DASH_id);
var network_shape = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70027__$1,cljs.core.cst$kw$network_DASH_shape);
var timestep = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70027__$1,cljs.core.cst$kw$timestep);
var fetches = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, ["n-unpredicted-active-columns",null,"n-predicted-inactive-columns",null,"n-predicted-active-columns",null], null), null);
var seq__70029 = cljs.core.seq(cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(network_shape));
var chunk__70031 = null;
var count__70032 = (0);
var i__70033 = (0);
while(true){
if((i__70033 < count__70032)){
var vec__70035 = chunk__70031.cljs$core$IIndexed$_nth$arity$2(null,i__70033);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70035,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70035,(1),null);
var response_c_70147 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-layer-stats",snapshot_id,lyr_id,fetches,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c_70147,true)], null));

var c__42110__auto___70148 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function (state_70069){
var state_val_70070 = (state_70069[(1)]);
if((state_val_70070 === (7))){
var state_70069__$1 = state_70069;
var statearr_70071_70149 = state_70069__$1;
(statearr_70071_70149[(2)] = false);

(statearr_70071_70149[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (1))){
var state_70069__$1 = state_70069;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70069__$1,(2),response_c_70147);
} else {
if((state_val_70070 === (4))){
var state_70069__$1 = state_70069;
var statearr_70072_70150 = state_70069__$1;
(statearr_70072_70150[(2)] = false);

(statearr_70072_70150[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (6))){
var state_70069__$1 = state_70069;
var statearr_70073_70151 = state_70069__$1;
(statearr_70073_70151[(2)] = true);

(statearr_70073_70151[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (3))){
var inst_70040 = (state_70069[(7)]);
var inst_70045 = inst_70040.cljs$lang$protocol_mask$partition0$;
var inst_70046 = (inst_70045 & (64));
var inst_70047 = inst_70040.cljs$core$ISeq$;
var inst_70048 = (inst_70046) || (inst_70047);
var state_70069__$1 = state_70069;
if(cljs.core.truth_(inst_70048)){
var statearr_70074_70152 = state_70069__$1;
(statearr_70074_70152[(1)] = (6));

} else {
var statearr_70075_70153 = state_70069__$1;
(statearr_70075_70153[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (2))){
var inst_70040 = (state_70069[(7)]);
var inst_70040__$1 = (state_70069[(2)]);
var inst_70042 = (inst_70040__$1 == null);
var inst_70043 = cljs.core.not(inst_70042);
var state_70069__$1 = (function (){var statearr_70076 = state_70069;
(statearr_70076[(7)] = inst_70040__$1);

return statearr_70076;
})();
if(inst_70043){
var statearr_70077_70154 = state_70069__$1;
(statearr_70077_70154[(1)] = (3));

} else {
var statearr_70078_70155 = state_70069__$1;
(statearr_70078_70155[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (11))){
var inst_70040 = (state_70069[(7)]);
var inst_70060 = (state_70069[(2)]);
var inst_70061 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70060,"n-unpredicted-active-columns");
var inst_70062 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70060,"n-predicted-inactive-columns");
var inst_70063 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70060,"n-predicted-active-columns");
var inst_70064 = cljs.core.cst$kw$dimensions.cljs$core$IFn$_invoke$arity$1(lyr);
var inst_70065 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,inst_70064);
var inst_70066 = (function (){var r = inst_70040;
var map__70038 = inst_70060;
var active = inst_70061;
var predicted = inst_70062;
var active_predicted = inst_70063;
var size = inst_70065;
return ((function (seq__70029,chunk__70031,count__70032,i__70033,r,map__70038,active,predicted,active_predicted,size,inst_70040,inst_70060,inst_70061,inst_70062,inst_70063,inst_70064,inst_70065,state_val_70070,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function (csf_log){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__9278__auto__ = csf_log;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return org.numenta.sanity.plots.empty_col_state_freqs_log();
}
})(),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$active,active,cljs.core.cst$kw$predicted,predicted,cljs.core.cst$kw$active_DASH_predicted,active_predicted,cljs.core.cst$kw$timestep,timestep,cljs.core.cst$kw$size,size], null));
});
;})(seq__70029,chunk__70031,count__70032,i__70033,r,map__70038,active,predicted,active_predicted,size,inst_70040,inst_70060,inst_70061,inst_70062,inst_70063,inst_70064,inst_70065,state_val_70070,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
})();
var inst_70067 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(col_state_history,cljs.core.update,lyr_id,inst_70066);
var state_70069__$1 = state_70069;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70069__$1,inst_70067);
} else {
if((state_val_70070 === (9))){
var inst_70040 = (state_70069[(7)]);
var inst_70057 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_70040);
var state_70069__$1 = state_70069;
var statearr_70079_70156 = state_70069__$1;
(statearr_70079_70156[(2)] = inst_70057);

(statearr_70079_70156[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (5))){
var inst_70055 = (state_70069[(2)]);
var state_70069__$1 = state_70069;
if(cljs.core.truth_(inst_70055)){
var statearr_70080_70157 = state_70069__$1;
(statearr_70080_70157[(1)] = (9));

} else {
var statearr_70081_70158 = state_70069__$1;
(statearr_70081_70158[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (10))){
var inst_70040 = (state_70069[(7)]);
var state_70069__$1 = state_70069;
var statearr_70082_70159 = state_70069__$1;
(statearr_70082_70159[(2)] = inst_70040);

(statearr_70082_70159[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70070 === (8))){
var inst_70052 = (state_70069[(2)]);
var state_70069__$1 = state_70069;
var statearr_70083_70160 = state_70069__$1;
(statearr_70083_70160[(2)] = inst_70052);

(statearr_70083_70160[(1)] = (5));


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
});})(seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
;
return ((function (seq__70029,chunk__70031,count__70032,i__70033,switch__41984__auto__,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function() {
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_70087 = [null,null,null,null,null,null,null,null];
(statearr_70087[(0)] = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__);

(statearr_70087[(1)] = (1));

return statearr_70087;
});
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____1 = (function (state_70069){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70069);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70088){if((e70088 instanceof Object)){
var ex__41988__auto__ = e70088;
var statearr_70089_70161 = state_70069;
(statearr_70089_70161[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70069);

return cljs.core.cst$kw$recur;
} else {
throw e70088;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70162 = state_70069;
state_70069 = G__70162;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__ = function(state_70069){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____1.call(this,state_70069);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__;
})()
;})(seq__70029,chunk__70031,count__70032,i__70033,switch__41984__auto__,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
})();
var state__42112__auto__ = (function (){var statearr_70090 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70090[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70148);

return statearr_70090;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70148,response_c_70147,vec__70035,lyr_id,lyr,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
);


var G__70163 = seq__70029;
var G__70164 = chunk__70031;
var G__70165 = count__70032;
var G__70166 = (i__70033 + (1));
seq__70029 = G__70163;
chunk__70031 = G__70164;
count__70032 = G__70165;
i__70033 = G__70166;
continue;
} else {
var temp__6728__auto__ = cljs.core.seq(seq__70029);
if(temp__6728__auto__){
var seq__70029__$1 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__70029__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__70029__$1);
var G__70167 = cljs.core.chunk_rest(seq__70029__$1);
var G__70168 = c__10181__auto__;
var G__70169 = cljs.core.count(c__10181__auto__);
var G__70170 = (0);
seq__70029 = G__70167;
chunk__70031 = G__70168;
count__70032 = G__70169;
i__70033 = G__70170;
continue;
} else {
var vec__70091 = cljs.core.first(seq__70029__$1);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70091,(0),null);
var lyr = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70091,(1),null);
var response_c_70171 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-layer-stats",snapshot_id,lyr_id,fetches,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c_70171,true)], null));

var c__42110__auto___70172 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function (state_70125){
var state_val_70126 = (state_70125[(1)]);
if((state_val_70126 === (7))){
var state_70125__$1 = state_70125;
var statearr_70127_70173 = state_70125__$1;
(statearr_70127_70173[(2)] = false);

(statearr_70127_70173[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (1))){
var state_70125__$1 = state_70125;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70125__$1,(2),response_c_70171);
} else {
if((state_val_70126 === (4))){
var state_70125__$1 = state_70125;
var statearr_70128_70174 = state_70125__$1;
(statearr_70128_70174[(2)] = false);

(statearr_70128_70174[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (6))){
var state_70125__$1 = state_70125;
var statearr_70129_70175 = state_70125__$1;
(statearr_70129_70175[(2)] = true);

(statearr_70129_70175[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (3))){
var inst_70096 = (state_70125[(7)]);
var inst_70101 = inst_70096.cljs$lang$protocol_mask$partition0$;
var inst_70102 = (inst_70101 & (64));
var inst_70103 = inst_70096.cljs$core$ISeq$;
var inst_70104 = (inst_70102) || (inst_70103);
var state_70125__$1 = state_70125;
if(cljs.core.truth_(inst_70104)){
var statearr_70130_70176 = state_70125__$1;
(statearr_70130_70176[(1)] = (6));

} else {
var statearr_70131_70177 = state_70125__$1;
(statearr_70131_70177[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (2))){
var inst_70096 = (state_70125[(7)]);
var inst_70096__$1 = (state_70125[(2)]);
var inst_70098 = (inst_70096__$1 == null);
var inst_70099 = cljs.core.not(inst_70098);
var state_70125__$1 = (function (){var statearr_70132 = state_70125;
(statearr_70132[(7)] = inst_70096__$1);

return statearr_70132;
})();
if(inst_70099){
var statearr_70133_70178 = state_70125__$1;
(statearr_70133_70178[(1)] = (3));

} else {
var statearr_70134_70179 = state_70125__$1;
(statearr_70134_70179[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (11))){
var inst_70096 = (state_70125[(7)]);
var inst_70116 = (state_70125[(2)]);
var inst_70117 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70116,"n-unpredicted-active-columns");
var inst_70118 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70116,"n-predicted-inactive-columns");
var inst_70119 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_70116,"n-predicted-active-columns");
var inst_70120 = cljs.core.cst$kw$dimensions.cljs$core$IFn$_invoke$arity$1(lyr);
var inst_70121 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,inst_70120);
var inst_70122 = (function (){var r = inst_70096;
var map__70094 = inst_70116;
var active = inst_70117;
var predicted = inst_70118;
var active_predicted = inst_70119;
var size = inst_70121;
return ((function (seq__70029,chunk__70031,count__70032,i__70033,r,map__70094,active,predicted,active_predicted,size,inst_70096,inst_70116,inst_70117,inst_70118,inst_70119,inst_70120,inst_70121,state_val_70126,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function (csf_log){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2((function (){var or__9278__auto__ = csf_log;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return org.numenta.sanity.plots.empty_col_state_freqs_log();
}
})(),new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$active,active,cljs.core.cst$kw$predicted,predicted,cljs.core.cst$kw$active_DASH_predicted,active_predicted,cljs.core.cst$kw$timestep,timestep,cljs.core.cst$kw$size,size], null));
});
;})(seq__70029,chunk__70031,count__70032,i__70033,r,map__70094,active,predicted,active_predicted,size,inst_70096,inst_70116,inst_70117,inst_70118,inst_70119,inst_70120,inst_70121,state_val_70126,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
})();
var inst_70123 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(col_state_history,cljs.core.update,lyr_id,inst_70122);
var state_70125__$1 = state_70125;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70125__$1,inst_70123);
} else {
if((state_val_70126 === (9))){
var inst_70096 = (state_70125[(7)]);
var inst_70113 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,inst_70096);
var state_70125__$1 = state_70125;
var statearr_70135_70180 = state_70125__$1;
(statearr_70135_70180[(2)] = inst_70113);

(statearr_70135_70180[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (5))){
var inst_70111 = (state_70125[(2)]);
var state_70125__$1 = state_70125;
if(cljs.core.truth_(inst_70111)){
var statearr_70136_70181 = state_70125__$1;
(statearr_70136_70181[(1)] = (9));

} else {
var statearr_70137_70182 = state_70125__$1;
(statearr_70137_70182[(1)] = (10));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (10))){
var inst_70096 = (state_70125[(7)]);
var state_70125__$1 = state_70125;
var statearr_70138_70183 = state_70125__$1;
(statearr_70138_70183[(2)] = inst_70096);

(statearr_70138_70183[(1)] = (11));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70126 === (8))){
var inst_70108 = (state_70125[(2)]);
var state_70125__$1 = state_70125;
var statearr_70139_70184 = state_70125__$1;
(statearr_70139_70184[(2)] = inst_70108);

(statearr_70139_70184[(1)] = (5));


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
});})(seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
;
return ((function (seq__70029,chunk__70031,count__70032,i__70033,switch__41984__auto__,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches){
return (function() {
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_70143 = [null,null,null,null,null,null,null,null];
(statearr_70143[(0)] = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__);

(statearr_70143[(1)] = (1));

return statearr_70143;
});
var org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____1 = (function (state_70125){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70125);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70144){if((e70144 instanceof Object)){
var ex__41988__auto__ = e70144;
var statearr_70145_70185 = state_70125;
(statearr_70145_70185[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70125);

return cljs.core.cst$kw$recur;
} else {
throw e70144;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70186 = state_70125;
state_70125 = G__70186;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__ = function(state_70125){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____1.call(this,state_70125);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$controls_ui$gather_col_state_history_BANG__$_state_machine__41985__auto__;
})()
;})(seq__70029,chunk__70031,count__70032,i__70033,switch__41984__auto__,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
})();
var state__42112__auto__ = (function (){var statearr_70146 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70146[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70172);

return statearr_70146;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(seq__70029,chunk__70031,count__70032,i__70033,c__42110__auto___70172,response_c_70171,vec__70091,lyr_id,lyr,seq__70029__$1,temp__6728__auto__,map__70027,map__70027__$1,snapshot_id,network_shape,timestep,fetches))
);


var G__70187 = cljs.core.next(seq__70029__$1);
var G__70188 = null;
var G__70189 = (0);
var G__70190 = (0);
seq__70029 = G__70187;
chunk__70031 = G__70188;
count__70032 = G__70189;
i__70033 = G__70190;
continue;
}
} else {
return null;
}
}
break;
}
});
org.numenta.sanity.controls_ui.time_plots_tab_builder = (function org$numenta$sanity$controls_ui$time_plots_tab_builder(steps,into_journal){
var col_state_history = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
cljs.core.add_watch(steps,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_ts_DASH_plot_DASH_data,((function (col_state_history){
return (function (_,___$1,___$2,xs){
return org.numenta.sanity.controls_ui.gather_col_state_history_BANG_(col_state_history,cljs.core.first(xs),into_journal);
});})(col_state_history))
);

return ((function (col_state_history){
return (function org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab(series_colors){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Time series of cortical column activity."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,(function (){var iter__10132__auto__ = ((function (col_state_history){
return (function org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__70245(s__70246){
return (new cljs.core.LazySeq(null,((function (col_state_history){
return (function (){
var s__70246__$1 = s__70246;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__70246__$1);
if(temp__6728__auto__){
var s__70246__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__70246__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__70246__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__70248 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__70247 = (0);
while(true){
if((i__70247 < size__10131__auto__)){
var vec__70257 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__70247);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70257,(0),null);
var csf_log = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70257,(1),null);
cljs.core.chunk_append(b__70248,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(lyr_id))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.ts_freqs_plot_cmp,csf_log,series_colors], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,lyr_id], null)));

var G__70263 = (i__70247 + (1));
i__70247 = G__70263;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__70248),org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__70245(cljs.core.chunk_rest(s__70246__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__70248),null);
}
} else {
var vec__70260 = cljs.core.first(s__70246__$2);
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70260,(0),null);
var csf_log = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70260,(1),null);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(lyr_id))].join('')], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.ts_freqs_plot_cmp,csf_log,series_colors], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,lyr_id], null)),org$numenta$sanity$controls_ui$time_plots_tab_builder_$_time_plots_tab_$_iter__70245(cljs.core.rest(s__70246__$2)));
}
} else {
return null;
}
break;
}
});})(col_state_history))
,null,null));
});})(col_state_history))
;
return iter__10132__auto__((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(col_state_history) : cljs.core.deref.call(null,col_state_history)));
})()], null)], null);
});
;})(col_state_history))
});
org.numenta.sanity.controls_ui.sources_tab = (function org$numenta$sanity$controls_ui$sources_tab(network_shape,selection,series_colors,into_journal){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Plots of cell excitation broken down by source."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)))?(function (){var iter__10132__auto__ = (function org$numenta$sanity$controls_ui$sources_tab_$_iter__70270(s__70271){
return (new cljs.core.LazySeq(null,(function (){
var s__70271__$1 = s__70271;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__70271__$1);
if(temp__6728__auto__){
var s__70271__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__70271__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__70271__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__70273 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__70272 = (0);
while(true){
if((i__70272 < size__10131__auto__)){
var lyr_id = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__70272);
cljs.core.chunk_append(b__70273,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(lyr_id))].join('')], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.cell_excitation_plot_cmp,network_shape,selection,series_colors,lyr_id,into_journal], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,lyr_id], null)));

var G__70276 = (i__70272 + (1));
i__70272 = G__70276;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__70273),org$numenta$sanity$controls_ui$sources_tab_$_iter__70270(cljs.core.chunk_rest(s__70271__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__70273),null);
}
} else {
var lyr_id = cljs.core.first(s__70271__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$fieldset,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$legend,[cljs.core.str(cljs.core.name(lyr_id))].join('')], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.plots.cell_excitation_plot_cmp,network_shape,selection,series_colors,lyr_id,into_journal], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,lyr_id], null)),org$numenta$sanity$controls_ui$sources_tab_$_iter__70270(cljs.core.rest(s__70271__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.keys(cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)))));
})():null)], null)], null);
});
org.numenta.sanity.controls_ui.default_cell_sdrs_plot_options = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$group_DASH_contexts_QMARK_,false,cljs.core.cst$kw$spreading_DASH_activation_DASH_steps,(0),cljs.core.cst$kw$ordering,cljs.core.cst$kw$first_DASH_appearance,cljs.core.cst$kw$hide_DASH_states_DASH_older,(100),cljs.core.cst$kw$hide_DASH_states_DASH_rarer,(1),cljs.core.cst$kw$hide_DASH_conns_DASH_smaller,(5)], null);
org.numenta.sanity.controls_ui.cell_sdrs_plot_dt_limit = (300);
org.numenta.sanity.controls_ui.cell_sdrs_plot_options_template = new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,"Group contexts?"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,cljs.core.cst$kw$group_DASH_contexts_QMARK_], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small," (column-level SDRs)"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,"Order by"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control$input_DASH_sm,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$ordering], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$first_DASH_appearance], null),"first appearance"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$last_DASH_appearance], null),"last appearance"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_older,cljs.core.cst$kw$preamble,goog.string.unescapeEntities("Seen &le; "),cljs.core.cst$kw$postamble," steps ago"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(5),cljs.core.cst$kw$max,org.numenta.sanity.controls_ui.cell_sdrs_plot_dt_limit,cljs.core.cst$kw$step,(5),cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_older], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_rarer,cljs.core.cst$kw$preamble,goog.string.unescapeEntities("Seen &ge; "),cljs.core.cst$kw$postamble," times"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(1),cljs.core.cst$kw$max,(16),cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_states_DASH_rarer], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_conns_DASH_smaller,cljs.core.cst$kw$preamble,goog.string.unescapeEntities("&ge; "),cljs.core.cst$kw$postamble,"-cell connections"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(1),cljs.core.cst$kw$max,(16),cljs.core.cst$kw$id,cljs.core.cst$kw$hide_DASH_conns_DASH_smaller], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$spreading_DASH_activation_DASH_steps,cljs.core.cst$kw$preamble,"spreading ",cljs.core.cst$kw$postamble," steps"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$range,cljs.core.cst$kw$min,(0),cljs.core.cst$kw$max,(12),cljs.core.cst$kw$id,cljs.core.cst$kw$spreading_DASH_activation_DASH_steps], null)], null)], null)], null)], null);
org.numenta.sanity.controls_ui.cell_sdrs_tab_builder = (function org$numenta$sanity$controls_ui$cell_sdrs_tab_builder(steps,network_shape,selection,into_journal){
var plot_opts = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.controls_ui.default_cell_sdrs_plot_options);
var component = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var enable_BANG_ = ((function (plot_opts,component){
return (function (){
var G__70279 = component;
var G__70280 = org.numenta.sanity.plots.cell_sdrs_plot_builder(steps,network_shape,selection,into_journal,plot_opts);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__70279,G__70280) : cljs.core.reset_BANG_.call(null,G__70279,G__70280));
});})(plot_opts,component))
;
var disable_BANG_ = ((function (plot_opts,component,enable_BANG_){
return (function (){
var teardown_BANG__70281 = cljs.core.cst$kw$teardown.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component)));
(teardown_BANG__70281.cljs$core$IFn$_invoke$arity$0 ? teardown_BANG__70281.cljs$core$IFn$_invoke$arity$0() : teardown_BANG__70281.call(null));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(component,null) : cljs.core.reset_BANG_.call(null,component,null));
});})(plot_opts,component,enable_BANG_))
;
return ((function (plot_opts,component,enable_BANG_,disable_BANG_){
return (function org$numenta$sanity$controls_ui$cell_sdrs_tab_builder_$_cell_sdrs_tab(){
return new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,((cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component))))?new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"Cell ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,"Sparse Distributed Representations"], null),"SDRs"], null)," on a state transition diagram. Labels are corresponding inputs."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (plot_opts,component,enable_BANG_,disable_BANG_){
return (function (e){
enable_BANG_();

return e.preventDefault();
});})(plot_opts,component,enable_BANG_,disable_BANG_))
], null),"Start from selected timestep"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$small$text_DASH_warning,"So to start from the beginning, select timestep 1 first."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$small,"Not enabled by default because it can be slow."], null)], null):new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.cell_sdrs_plot_options_template,plot_opts], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$content.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(component) : cljs.core.deref.call(null,component)))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (plot_opts,component,enable_BANG_,disable_BANG_){
return (function (e){
disable_BANG_();

return e.preventDefault();
});})(plot_opts,component,enable_BANG_,disable_BANG_))
], null),"Disable and reset"], null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This shows the dynamics of a layer of cells as a state\n        transition diagram. The \"states\" are in fact cell SDRs,\n        i.e. sets of cells active together. They are fuzzy: cells may\n        participate in multiple states. And they are evolving: the\n        membership of a state may change over time."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"To be precise, a state is defined as a set of cells\n         weighted by their specificity to that state. So if a cell\n         participates in states A and B an equal number of times, it\n         will count only half as much to A as a cell fully specific to\n         A."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"If the active winner cells match a known state\n        sufficiently well (meeting ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"seg-learn-threshold"], null),") then the state is extended to include all current\n        cells. Otherwise, a new state is created."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Input labels (key :label) are recorded on matching\n        states, but this is only for display, it is not used to define\n        states."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The display shows one layer at one point in\n         time. Select other layers to switch the display to them. Step\n         back and forward in time as you wish."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Reading the diagram"], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"States are drawn in order of appearance."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"If any of a state's cells are currently active that\n         fraction will be shaded red (whether active due to bursting\n         or not)."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"Similarly, any predictive cells (predicting activation for the ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$strong,"next"], null)," time step) will be shaded blue."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"If any of a state's cells are the\n         current ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i,"winner cells"], null)," that fraction will be\n         outlined in black."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"When a matching state will be extended to include new\n         cells, those are shown in green."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"Transitions are drawn as blue curves. Thickness\n         corresponds to the number of connected synapses, weighted by\n         specificity of both the source and target cells."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"The height of a state corresponds to the (weighted)\n         number of cells it represents."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"The width of a state corresponds to the number of times\n         it has matched."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,"Labels are drawn with horizonal spacing by frequency."], null)], null)], null);
});
;})(plot_opts,component,enable_BANG_,disable_BANG_))
});
org.numenta.sanity.controls_ui.fetch_details_text_BANG_ = (function org$numenta$sanity$controls_ui$fetch_details_text_BANG_(into_journal,text_response,sel){
var map__70299 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.selection.layer,sel));
var map__70299__$1 = ((((!((map__70299 == null)))?((((map__70299.cljs$lang$protocol_mask$partition0$ & (64))) || (map__70299.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__70299):map__70299);
var sel1 = map__70299__$1;
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70299__$1,cljs.core.cst$kw$step);
var bit = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70299__$1,cljs.core.cst$kw$bit);
var map__70300 = step;
var map__70300__$1 = ((((!((map__70300 == null)))?((((map__70300.cljs$lang$protocol_mask$partition0$ & (64))) || (map__70300.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__70300):map__70300);
var snapshot_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70300__$1,cljs.core.cst$kw$snapshot_DASH_id);
var lyr_id = org.numenta.sanity.selection.layer(sel1);
if(cljs.core.truth_(lyr_id)){
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-details-text",snapshot_id,lyr_id,bit,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,response_c,map__70299,map__70299__$1,sel1,step,bit,map__70300,map__70300__$1,snapshot_id,lyr_id){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,response_c,map__70299,map__70299__$1,sel1,step,bit,map__70300,map__70300__$1,snapshot_id,lyr_id){
return (function (state_70307){
var state_val_70308 = (state_70307[(1)]);
if((state_val_70308 === (1))){
var state_70307__$1 = state_70307;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70307__$1,(2),response_c);
} else {
if((state_val_70308 === (2))){
var inst_70304 = (state_70307[(2)]);
var inst_70305 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(text_response,inst_70304) : cljs.core.reset_BANG_.call(null,text_response,inst_70304));
var state_70307__$1 = state_70307;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70307__$1,inst_70305);
} else {
return null;
}
}
});})(c__42110__auto__,response_c,map__70299,map__70299__$1,sel1,step,bit,map__70300,map__70300__$1,snapshot_id,lyr_id))
;
return ((function (switch__41984__auto__,c__42110__auto__,response_c,map__70299,map__70299__$1,sel1,step,bit,map__70300,map__70300__$1,snapshot_id,lyr_id){
return (function() {
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_70312 = [null,null,null,null,null,null,null];
(statearr_70312[(0)] = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto__);

(statearr_70312[(1)] = (1));

return statearr_70312;
});
var org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto____1 = (function (state_70307){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70307);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70313){if((e70313 instanceof Object)){
var ex__41988__auto__ = e70313;
var statearr_70314_70316 = state_70307;
(statearr_70314_70316[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70307);

return cljs.core.cst$kw$recur;
} else {
throw e70313;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70317 = state_70307;
state_70307 = G__70317;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto__ = function(state_70307){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto____1.call(this,state_70307);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$controls_ui$fetch_details_text_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,response_c,map__70299,map__70299__$1,sel1,step,bit,map__70300,map__70300__$1,snapshot_id,lyr_id))
})();
var state__42112__auto__ = (function (){var statearr_70315 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70315[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_70315;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,response_c,map__70299,map__70299__$1,sel1,step,bit,map__70300,map__70300__$1,snapshot_id,lyr_id))
);

return c__42110__auto__;
} else {
return null;
}
});
org.numenta.sanity.controls_ui.details_tab = (function org$numenta$sanity$controls_ui$details_tab(selection,into_journal){
var text_response = reagent.core.atom.cljs$core$IFn$_invoke$arity$1("");
return reagent.core.create_class(new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$component_DASH_will_DASH_mount,((function (text_response){
return (function (_){
cljs.core.add_watch(selection,cljs.core.cst$kw$fetch_DASH_details_DASH_text,((function (text_response){
return (function (___$1,___$2,___$3,sel){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(text_response,"") : cljs.core.reset_BANG_.call(null,text_response,""));

return org.numenta.sanity.controls_ui.fetch_details_text_BANG_(into_journal,text_response,sel);
});})(text_response))
);

return org.numenta.sanity.controls_ui.fetch_details_text_BANG_(into_journal,text_response,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection)));
});})(text_response))
,cljs.core.cst$kw$component_DASH_will_DASH_unmount,((function (text_response){
return (function (_){
return cljs.core.remove_watch(selection,cljs.core.cst$kw$fetch_DASH_details_DASH_text);
});})(text_response))
,cljs.core.cst$kw$reagent_DASH_render,((function (text_response){
return (function (_,___$1){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"The details of model state on the selected time step, selected column."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre$pre_DASH_scrollable,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$height,"90vh",cljs.core.cst$kw$resize,"both"], null)], null),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(text_response) : cljs.core.deref.call(null,text_response))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"(scrollable)"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,"If you're brave:"], null),(function (){var map__70336 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.selection.layer,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))));
var map__70336__$1 = ((((!((map__70336 == null)))?((((map__70336.cljs$lang$protocol_mask$partition0$ & (64))) || (map__70336.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__70336):map__70336);
var step = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70336__$1,cljs.core.cst$kw$step);
var map__70337 = step;
var map__70337__$1 = ((((!((map__70337 == null)))?((((map__70337.cljs$lang$protocol_mask$partition0$ & (64))) || (map__70337.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__70337):map__70337);
var snapshot_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__70337__$1,cljs.core.cst$kw$snapshot_DASH_id);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_block,(function (){var G__70340 = new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response){
return (function (e){
var response_c_70354 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$get_DASH_model,snapshot_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c_70354,true),true], null));

var c__42110__auto___70355 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___70355,response_c_70354,map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___70355,response_c_70354,map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response){
return (function (state_70345){
var state_val_70346 = (state_70345[(1)]);
if((state_val_70346 === (1))){
var state_70345__$1 = state_70345;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70345__$1,(2),response_c_70354);
} else {
if((state_val_70346 === (2))){
var inst_70342 = (state_70345[(2)]);
var inst_70343 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([inst_70342], 0));
var state_70345__$1 = state_70345;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70345__$1,inst_70343);
} else {
return null;
}
}
});})(c__42110__auto___70355,response_c_70354,map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response))
;
return ((function (switch__41984__auto__,c__42110__auto___70355,response_c_70354,map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response){
return (function() {
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto____0 = (function (){
var statearr_70350 = [null,null,null,null,null,null,null];
(statearr_70350[(0)] = org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto__);

(statearr_70350[(1)] = (1));

return statearr_70350;
});
var org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto____1 = (function (state_70345){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70345);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70351){if((e70351 instanceof Object)){
var ex__41988__auto__ = e70351;
var statearr_70352_70356 = state_70345;
(statearr_70352_70356[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70345);

return cljs.core.cst$kw$recur;
} else {
throw e70351;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70357 = state_70345;
state_70345 = G__70357;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto__ = function(state_70345){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto____1.call(this,state_70345);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto____0;
org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto____1;
return org$numenta$sanity$controls_ui$details_tab_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___70355,response_c_70354,map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response))
})();
var state__42112__auto__ = (function (){var statearr_70353 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70353[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70355);

return statearr_70353;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___70355,response_c_70354,map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response))
);


return e.preventDefault();
});})(map__70336,map__70336__$1,step,map__70337,map__70337__$1,snapshot_id,text_response))
], null);
if(cljs.core.not(snapshot_id)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__70340,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__70340;
}
})(),"Dump entire model to console"], null);
})()], null);
});})(text_response))
], null));
});
org.numenta.sanity.controls_ui.t_chbox = (function org$numenta$sanity$controls_ui$t_chbox(id,label){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,id], null)], null)," ",label], null)], null);
});
org.numenta.sanity.controls_ui.keep_steps_template = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_xs_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$font_DASH_weight,"normal"], null)], null),"Keep ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$keep_DASH_steps,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$text_DASH_align,"center"], null),cljs.core.cst$kw$size,(4)], null)], null)," steps of history"], null)], null)], null)], null)], null);
org.numenta.sanity.controls_ui.capture_tab = (function org$numenta$sanity$controls_ui$capture_tab(capture_options){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Choose data the server should capture."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.keep_steps_template,capture_options], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Feed-forward synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__70358_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__70358_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ff_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$ff_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected")], null)], null),capture_options], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Distal synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__70359_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__70359_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$distal_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$distal_DASH_synapses$only_DASH_noteworthy_DASH_columns_QMARK_,"Only active / predicted columns")], null)], null),capture_options], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"Apical synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$capture_QMARK_,"Save"),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_top,(-5)], null),cljs.core.cst$kw$visible_QMARK_,(function (p1__70360_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__70360_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$apical_DASH_synapses,cljs.core.cst$kw$capture_QMARK_], null));
})], null),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$only_DASH_active_QMARK_,"Only if active"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$only_DASH_connected_QMARK_,"Only if connected"),org.numenta.sanity.controls_ui.t_chbox(cljs.core.cst$kw$apical_DASH_synapses$only_DASH_noteworthy_DASH_columns_QMARK_,"Only active / predicted columns")], null)], null),capture_options], null)], null)], null)], null)], null)], null);
});
org.numenta.sanity.controls_ui.viz_options_template = (function (){var chbox = (function (id,label){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$id,id], null)], null),[cljs.core.str(" "),cljs.core.str(label)].join('')], null)], null);
});
var group = ((function (chbox){
return (function (title,content){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_6$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,title], null)], null),content], null)], null);
});})(chbox))
;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$radio,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$radio,cljs.core.cst$kw$name,cljs.core.cst$kw$drawing$display_DASH_mode,cljs.core.cst$kw$value,cljs.core.cst$kw$one_DASH_d], null)], null)," Draw ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$drawing$draw_DASH_steps,cljs.core.cst$kw$size,(4)], null)], null)," steps in 1D"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$radio,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$radio,cljs.core.cst$kw$name,cljs.core.cst$kw$drawing$display_DASH_mode,cljs.core.cst$kw$value,cljs.core.cst$kw$two_DASH_d], null)], null)," Draw one step in 2D"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,group("Inbits",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,chbox(cljs.core.cst$kw$inbits$active,"Active bits"),chbox(cljs.core.cst$kw$inbits$predicted,"Predicted bits")], null)),group("Columns",new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,chbox(cljs.core.cst$kw$columns$overlaps,"Overlaps"),chbox(cljs.core.cst$kw$columns$active_DASH_freq,"Active-duty"),chbox(cljs.core.cst$kw$columns$boosts,"Boosts"),chbox(cljs.core.cst$kw$columns$n_DASH_segments,"N.segments"),chbox(cljs.core.cst$kw$columns$active,"Active"),chbox(cljs.core.cst$kw$columns$predictive,"Predictive")], null)),group("Feed-forward synapses",new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"To ",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$ff_DASH_synapses$to], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$all], null),"all active columns"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$selected], null),"selected column"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$none], null),"none"], null)], null)], null),chbox(cljs.core.cst$kw$ff_DASH_synapses$trace_DASH_back_QMARK_,"Trace back"),chbox(cljs.core.cst$kw$ff_DASH_synapses$disconnected,"Disconnected"),chbox(cljs.core.cst$kw$ff_DASH_synapses$inactive,"Inactive"),chbox(cljs.core.cst$kw$ff_DASH_synapses$predicted,"Predictive"),chbox(cljs.core.cst$kw$ff_DASH_synapses$permanences,"Permanences")], null)),group("Distal synapses",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"(selected column) ",new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$distal_DASH_synapses$to], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$all], null),"all cell segments"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$selected], null),"selected segment"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$none], null),"none"], null)], null)], null),chbox(cljs.core.cst$kw$distal_DASH_synapses$disconnected,"Disconnected"),chbox(cljs.core.cst$kw$distal_DASH_synapses$inactive,"Inactive"),chbox(cljs.core.cst$kw$distal_DASH_synapses$permanences,"Permanences")], null))], null)], null);
})();
org.numenta.sanity.controls_ui.drawing_tab = (function org$numenta$sanity$controls_ui$drawing_tab(features,viz_options,capture_options){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Select drawing options, with immediate effect."], null),(cljs.core.truth_((function (){var G__70362 = cljs.core.cst$kw$capture;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70362) : features.call(null,G__70362));
})())?null:new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.keep_steps_template,capture_options], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.controls_ui.viz_options_template,viz_options], null)], null);
});
org.numenta.sanity.controls_ui.default_debug_data = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$repl_DASH_url,"http://localhost:9000/repl",cljs.core.cst$kw$started_QMARK_,false,cljs.core.cst$kw$conn,null], null);
org.numenta.sanity.controls_ui.debug_tab = (function org$numenta$sanity$controls_ui$debug_tab(debug_data){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_muted,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$margin_DASH_top,(15),cljs.core.cst$kw$margin_DASH_bottom,(15)], null)], null),"Inspect the inspector."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel$panel_DASH_default,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_heading,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4$panel_DASH_title,"REPL"], null)], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$panel_DASH_body,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"ClojureScript REPL URL:"], null),(cljs.core.truth_(cljs.core.cst$kw$started_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(debug_data) : cljs.core.deref.call(null,debug_data))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,cljs.core.cst$kw$repl_DASH_url.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(debug_data) : cljs.core.deref.call(null,debug_data)))], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"100%"], null),cljs.core.cst$kw$field,cljs.core.cst$kw$text,cljs.core.cst$kw$id,cljs.core.cst$kw$repl_DASH_url], null)], null),debug_data], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$btn_DASH_block,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (_){
var conn = clojure.browser.repl.connect(cljs.core.cst$kw$repl_DASH_url.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(debug_data) : cljs.core.deref.call(null,debug_data))));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(debug_data,cljs.core.assoc,cljs.core.cst$kw$started_QMARK_,true,cljs.core.array_seq([cljs.core.cst$kw$conn,conn], 0));
})], null),"Connect to Browser REPL"], null)], null)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Go start a ClojureScript REPL, then connect to it from here."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),"Sanity"], null)," has a browser_repl.clj that you can run."], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Pro-tip: in Emacs, do 'M-x shell', run ","'lein run -m clojure.main browser_repl.clj', ","and maybe do 'M-x paredit-mode'."], null)], null)], null)], null)], null);
});
org.numenta.sanity.controls_ui.send_command = (function org$numenta$sanity$controls_ui$send_command(var_args){
var args__10468__auto__ = [];
var len__10461__auto___70366 = arguments.length;
var i__10462__auto___70367 = (0);
while(true){
if((i__10462__auto___70367 < len__10461__auto___70366)){
args__10468__auto__.push((arguments[i__10462__auto___70367]));

var G__70368 = (i__10462__auto___70367 + (1));
i__10462__auto___70367 = G__70368;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((2) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((2)),(0),null)):null);
return org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__10469__auto__);
});

org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic = (function (ch,command,xs){
return (function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [command], null),xs));

return e.preventDefault();
});
});

org.numenta.sanity.controls_ui.send_command.cljs$lang$maxFixedArity = (2);

org.numenta.sanity.controls_ui.send_command.cljs$lang$applyTo = (function (seq70363){
var G__70364 = cljs.core.first(seq70363);
var seq70363__$1 = cljs.core.next(seq70363);
var G__70365 = cljs.core.first(seq70363__$1);
var seq70363__$2 = cljs.core.next(seq70363__$1);
return org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(G__70364,G__70365,seq70363__$2);
});

org.numenta.sanity.controls_ui.gather_start_data_BANG_ = (function org$numenta$sanity$controls_ui$gather_start_data_BANG_(run_start,steps){
var G__70371 = run_start;
var G__70372 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$time,org.numenta.sanity.controls_ui.now(),cljs.core.cst$kw$timestep,cljs.core.cst$kw$timestep.cljs$core$IFn$_invoke$arity$1(cljs.core.first(steps))], null);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__70371,G__70372) : cljs.core.reset_BANG_.call(null,G__70371,G__70372));
});
org.numenta.sanity.controls_ui.navbar = (function org$numenta$sanity$controls_ui$navbar(_,___$1,steps,show_help,viz_options,viz_expanded,network_shape,into_viz,into_sim){
var has_scrolled_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var has_sorted_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var has_watched_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var apply_to_all_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var run_start = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var going_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var subscriber_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["subscribe-to-status",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(subscriber_c)], null));

var c__42110__auto___70467 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___70467,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___70467,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (state_70436){
var state_val_70437 = (state_70436[(1)]);
if((state_val_70437 === (1))){
var state_70436__$1 = state_70436;
var statearr_70438_70468 = state_70436__$1;
(statearr_70438_70468[(2)] = null);

(statearr_70438_70468[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70437 === (2))){
var state_70436__$1 = state_70436;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_70436__$1,(4),subscriber_c);
} else {
if((state_val_70437 === (3))){
var inst_70434 = (state_70436[(2)]);
var state_70436__$1 = state_70436;
return cljs.core.async.impl.ioc_helpers.return_chan(state_70436__$1,inst_70434);
} else {
if((state_val_70437 === (4))){
var inst_70422 = (state_70436[(7)]);
var inst_70422__$1 = (state_70436[(2)]);
var state_70436__$1 = (function (){var statearr_70439 = state_70436;
(statearr_70439[(7)] = inst_70422__$1);

return statearr_70439;
})();
if(cljs.core.truth_(inst_70422__$1)){
var statearr_70440_70469 = state_70436__$1;
(statearr_70440_70469[(1)] = (5));

} else {
var statearr_70441_70470 = state_70436__$1;
(statearr_70441_70470[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_70437 === (5))){
var inst_70422 = (state_70436[(7)]);
var inst_70427 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_70422,(0),null);
var inst_70428 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(going_QMARK_,inst_70427) : cljs.core.reset_BANG_.call(null,going_QMARK_,inst_70427));
var state_70436__$1 = (function (){var statearr_70442 = state_70436;
(statearr_70442[(8)] = inst_70428);

return statearr_70442;
})();
var statearr_70443_70471 = state_70436__$1;
(statearr_70443_70471[(2)] = null);

(statearr_70443_70471[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70437 === (6))){
var state_70436__$1 = state_70436;
var statearr_70444_70472 = state_70436__$1;
(statearr_70444_70472[(2)] = null);

(statearr_70444_70472[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_70437 === (7))){
var inst_70432 = (state_70436[(2)]);
var state_70436__$1 = state_70436;
var statearr_70445_70473 = state_70436__$1;
(statearr_70445_70473[(2)] = inst_70432);

(statearr_70445_70473[(1)] = (3));


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
});})(c__42110__auto___70467,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
;
return ((function (switch__41984__auto__,c__42110__auto___70467,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function() {
var org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto____0 = (function (){
var statearr_70449 = [null,null,null,null,null,null,null,null,null];
(statearr_70449[(0)] = org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto__);

(statearr_70449[(1)] = (1));

return statearr_70449;
});
var org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto____1 = (function (state_70436){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_70436);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e70450){if((e70450 instanceof Object)){
var ex__41988__auto__ = e70450;
var statearr_70451_70474 = state_70436;
(statearr_70451_70474[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_70436);

return cljs.core.cst$kw$recur;
} else {
throw e70450;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__70475 = state_70436;
state_70436 = G__70475;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto__ = function(state_70436){
switch(arguments.length){
case 0:
return org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto____1.call(this,state_70436);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto____0;
org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto____1;
return org$numenta$sanity$controls_ui$navbar_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___70467,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
})();
var state__42112__auto__ = (function (){var statearr_70452 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_70452[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___70467);

return statearr_70452;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___70467,has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
);


cljs.core.add_watch(steps,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_gather_DASH_start_DASH_data,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$2,___$3,___$4,xs){
cljs.core.remove_watch(steps,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_gather_DASH_start_DASH_data);

return org.numenta.sanity.controls_ui.gather_start_data_BANG_(run_start,xs);
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
);

cljs.core.add_watch(going_QMARK_,cljs.core.cst$kw$org$numenta$sanity$controls_DASH_ui_SLASH_gather_DASH_start_DASH_data,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$2,___$3,oldv,go_QMARK_){
if(cljs.core.truth_((function (){var and__9266__auto__ = cljs.core.not(oldv);
if(and__9266__auto__){
return go_QMARK_;
} else {
return and__9266__auto__;
}
})())){
if(cljs.core.truth_(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))){
return org.numenta.sanity.controls_ui.gather_start_data_BANG_(run_start,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps)));
} else {
return null;
}
} else {
return null;
}
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
);

return ((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (title,features,___$2,___$3,___$4,___$5,___$6,___$7){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$nav$navbar$navbar_DASH_default,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$navbar_DASH_header,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$navbar_DASH_toggle$collapsed,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$data_DASH_toggle,"collapse",cljs.core.cst$kw$data_DASH_target,"#comportex-navbar-collapse"], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$icon_DASH_bar], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$navbar_DASH_brand,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),title], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$collapse$navbar_DASH_collapse,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$id,"comportex-navbar-collapse"], null),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$navbar_DASH_nav,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__70453 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command(into_viz,cljs.core.cst$kw$step_DASH_backward),cljs.core.cst$kw$title,"Step backward in time"], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__70453,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__70453;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_step_DASH_backward,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Step backward"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__70454 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command(into_viz,cljs.core.cst$kw$step_DASH_forward),cljs.core.cst$kw$title,"Step forward in time"], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__70454,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__70454;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_step_DASH_forward,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Step forward"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_)))?null:new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null)),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__70455 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["pause"], null));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"5em"], null)], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__70455,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__70455;
}
})(),"Pause"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_)))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary$navbar_DASH_btn,(function (){var G__70456 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["run"], null));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$width,"5em"], null)], null);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__70456,cljs.core.cst$kw$disabled,"disabled");
} else {
return G__70456;
}
})(),"Run"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$dropdown,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$dropdown_DASH_toggle,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$data_DASH_toggle,"dropdown",cljs.core.cst$kw$role,"button",cljs.core.cst$kw$href,"#"], null),"Display",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$caret], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$dropdown_DASH_menu,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$role,"menu"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$one_DASH_d);
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"column states over time (1D)"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"column states over space (2D)"], null)], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(viz_expanded) : cljs.core.deref.call(null,viz_expanded)))?null:new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$hidden_DASH_xs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
var seq__70457_70476 = cljs.core.seq(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("viz-expandable")));
var chunk__70458_70477 = null;
var count__70459_70478 = (0);
var i__70460_70479 = (0);
while(true){
if((i__70460_70479 < count__70459_70478)){
var el_70480 = chunk__70458_70477.cljs$core$IIndexed$_nth$arity$2(null,i__70460_70479);
goog.dom.classes.swap(el_70480,"col-sm-9","col-sm-12");

var G__70481 = seq__70457_70476;
var G__70482 = chunk__70458_70477;
var G__70483 = count__70459_70478;
var G__70484 = (i__70460_70479 + (1));
seq__70457_70476 = G__70481;
chunk__70458_70477 = G__70482;
count__70459_70478 = G__70483;
i__70460_70479 = G__70484;
continue;
} else {
var temp__6728__auto___70485 = cljs.core.seq(seq__70457_70476);
if(temp__6728__auto___70485){
var seq__70457_70486__$1 = temp__6728__auto___70485;
if(cljs.core.chunked_seq_QMARK_(seq__70457_70486__$1)){
var c__10181__auto___70487 = cljs.core.chunk_first(seq__70457_70486__$1);
var G__70488 = cljs.core.chunk_rest(seq__70457_70486__$1);
var G__70489 = c__10181__auto___70487;
var G__70490 = cljs.core.count(c__10181__auto___70487);
var G__70491 = (0);
seq__70457_70476 = G__70488;
chunk__70458_70477 = G__70489;
count__70459_70478 = G__70490;
i__70460_70479 = G__70491;
continue;
} else {
var el_70492 = cljs.core.first(seq__70457_70486__$1);
goog.dom.classes.swap(el_70492,"col-sm-9","col-sm-12");

var G__70493 = cljs.core.next(seq__70457_70486__$1);
var G__70494 = null;
var G__70495 = (0);
var G__70496 = (0);
seq__70457_70476 = G__70493;
chunk__70458_70477 = G__70494;
count__70459_70478 = G__70495;
i__70460_70479 = G__70496;
continue;
}
} else {
}
}
break;
}

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(viz_expanded,true) : cljs.core.reset_BANG_.call(null,viz_expanded,true));

window.dispatchEvent((new Event("resize")));

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Expand visualisation"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_resize_DASH_full,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$sr_DASH_only,"Expand"], null)], null)], null)),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(viz_expanded) : cljs.core.deref.call(null,viz_expanded)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$hidden_DASH_xs,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
var seq__70461_70497 = cljs.core.seq(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$1(goog.dom.getElementsByClass("viz-expandable")));
var chunk__70462_70498 = null;
var count__70463_70499 = (0);
var i__70464_70500 = (0);
while(true){
if((i__70464_70500 < count__70463_70499)){
var el_70501 = chunk__70462_70498.cljs$core$IIndexed$_nth$arity$2(null,i__70464_70500);
goog.dom.classes.swap(el_70501,"col-sm-12","col-sm-9");

var G__70502 = seq__70461_70497;
var G__70503 = chunk__70462_70498;
var G__70504 = count__70463_70499;
var G__70505 = (i__70464_70500 + (1));
seq__70461_70497 = G__70502;
chunk__70462_70498 = G__70503;
count__70463_70499 = G__70504;
i__70464_70500 = G__70505;
continue;
} else {
var temp__6728__auto___70506 = cljs.core.seq(seq__70461_70497);
if(temp__6728__auto___70506){
var seq__70461_70507__$1 = temp__6728__auto___70506;
if(cljs.core.chunked_seq_QMARK_(seq__70461_70507__$1)){
var c__10181__auto___70508 = cljs.core.chunk_first(seq__70461_70507__$1);
var G__70509 = cljs.core.chunk_rest(seq__70461_70507__$1);
var G__70510 = c__10181__auto___70508;
var G__70511 = cljs.core.count(c__10181__auto___70508);
var G__70512 = (0);
seq__70461_70497 = G__70509;
chunk__70462_70498 = G__70510;
count__70463_70499 = G__70511;
i__70464_70500 = G__70512;
continue;
} else {
var el_70513 = cljs.core.first(seq__70461_70507__$1);
goog.dom.classes.swap(el_70513,"col-sm-12","col-sm-9");

var G__70514 = cljs.core.next(seq__70461_70507__$1);
var G__70515 = null;
var G__70516 = (0);
var G__70517 = (0);
seq__70461_70497 = G__70514;
chunk__70462_70498 = G__70515;
count__70463_70499 = G__70516;
i__70464_70500 = G__70517;
continue;
}
} else {
}
}
break;
}

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(viz_expanded,false) : cljs.core.reset_BANG_.call(null,viz_expanded,false));

window.dispatchEvent((new Event("resize")));

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Un-expand visualisation"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_resize_DASH_small,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$sr_DASH_only,"Un-expand"], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$navbar_DASH_text,"Sort/Watch/Scroll:"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_sorted_QMARK_,true) : cljs.core.reset_BANG_.call(null,has_sorted_QMARK_,true));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$sort,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Sort the columns by order of recent activity"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_sort_DASH_by_DASH_attributes_DASH_alt,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Sort by recent active columns"], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(has_sorted_QMARK_) : cljs.core.deref.call(null,has_sorted_QMARK_)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_)))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_sorted_QMARK_,false) : cljs.core.reset_BANG_.call(null,has_sorted_QMARK_,false));
} else {
return null;
}
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$clear_DASH_sort,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Clear all sorting - revert to actual column order"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_sort_DASH_by_DASH_order,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Clear sorting"], null)], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_left,"1ex"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_watched_QMARK_,true) : cljs.core.reset_BANG_.call(null,has_watched_QMARK_,true));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$add_DASH_facet,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Add a facet to watch the current active set of columns"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_eye_DASH_open,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Add facet, watching active set"], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(has_watched_QMARK_) : cljs.core.deref.call(null,has_watched_QMARK_)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_)))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_watched_QMARK_,false) : cljs.core.reset_BANG_.call(null,has_watched_QMARK_,false));
} else {
return null;
}
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$clear_DASH_facets,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Clear all facets (watching sets of columns)"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_eye_DASH_close,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Clear all facets"], null)], null)], null):null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_left,"1ex"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (___$8){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(has_scrolled_QMARK_,true) : cljs.core.reset_BANG_.call(null,has_scrolled_QMARK_,true));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$scroll_DASH_down,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0))),cljs.core.cst$kw$title,"Scroll down visible columns"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_arrow_DASH_down,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Scroll down"], null)], null)], null),(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(has_scrolled_QMARK_) : cljs.core.deref.call(null,has_scrolled_QMARK_)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,org.numenta.sanity.controls_ui.send_command.cljs$core$IFn$_invoke$arity$variadic(into_viz,cljs.core.cst$kw$scroll_DASH_up,cljs.core.array_seq([(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_))], 0)),cljs.core.cst$kw$title,"Scroll up visible columns"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_arrow_DASH_up,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Scroll up"], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$navbar_DASH_form,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$checkbox,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$small,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,[cljs.core.str("Apply scroll/sort/watch actions to all layers; "),cljs.core.str("otherwise only the selected layer.")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$checkbox,cljs.core.cst$kw$checked,(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(apply_to_all_QMARK_) : cljs.core.deref.call(null,apply_to_all_QMARK_)))?true:null),cljs.core.cst$kw$on_DASH_change,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(apply_to_all_QMARK_,cljs.core.not);

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null)], null)," all layers"], null)], null)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$navbar_DASH_nav$navbar_DASH_right,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,((cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(going_QMARK_) : cljs.core.deref.call(null,going_QMARK_))))?new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$class,"hidden"], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$navbar_DASH_text,[cljs.core.str(org.numenta.sanity.controls_ui.sim_rate(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(run_start) : cljs.core.deref.call(null,run_start))).toFixed((1))),cljs.core.str("/sec.")].join('')], null)], null),(cljs.core.truth_((function (){var G__70465 = cljs.core.cst$kw$speed;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70465) : features.call(null,G__70465));
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li$dropdown,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a$dropdown_DASH_toggle,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$data_DASH_toggle,"dropdown",cljs.core.cst$kw$role,"button",cljs.core.cst$kw$href,"#"], null),"Speed",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$caret], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$dropdown_DASH_menu,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$role,"menu"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(0)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"max sim speed"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(0)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(100));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"max sim speed, draw every 100 steps"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(250)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"limit to 4 steps/sec."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(500)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"limit to 2 steps/sec."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_sim,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["set-step-ms",(1000)], null));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$anim_DASH_every], null),(1));
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
], null),"limit to 1 step/sec."], null)], null)], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default$navbar_DASH_btn,(function (){var G__70466 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$button,cljs.core.cst$kw$on_DASH_click,((function (has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c){
return (function (e){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(show_help,cljs.core.not);

return e.preventDefault();
});})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
,cljs.core.cst$kw$title,"Help"], null);
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_help) : cljs.core.deref.call(null,show_help)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__70466,cljs.core.cst$kw$class,"active");
} else {
return G__70466;
}
})(),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$glyphicon$glyphicon_DASH_question_DASH_sign,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$aria_DASH_hidden,"true"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$visible_DASH_xs_DASH_inline," Help"], null)], null)], null)], null)], null)], null)], null);
});
;})(has_scrolled_QMARK_,has_sorted_QMARK_,has_watched_QMARK_,apply_to_all_QMARK_,run_start,going_QMARK_,subscriber_c))
});
org.numenta.sanity.controls_ui.tabs = (function org$numenta$sanity$controls_ui$tabs(current_tab,tab_cmps){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$nav,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul$nav$nav_DASH_tabs], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$controls_ui$tabs_$_iter__70543(s__70544){
return (new cljs.core.LazySeq(null,(function (){
var s__70544__$1 = s__70544;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__70544__$1);
if(temp__6728__auto__){
var s__70544__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__70544__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__70544__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__70546 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__70545 = (0);
while(true){
if((i__70545 < size__10131__auto__)){
var vec__70555 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__70545);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70555,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70555,(1),null);
cljs.core.chunk_append(b__70546,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$role,"presentation",cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k))?"active":null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (i__70545,vec__70555,k,_,c__10130__auto__,size__10131__auto__,b__70546,s__70544__$2,temp__6728__auto__){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(current_tab,k) : cljs.core.reset_BANG_.call(null,current_tab,k));

return e.preventDefault();
});})(i__70545,vec__70555,k,_,c__10130__auto__,size__10131__auto__,b__70546,s__70544__$2,temp__6728__auto__))
], null),cljs.core.name(k)], null)], null));

var G__70568 = (i__70545 + (1));
i__70545 = G__70568;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__70546),org$numenta$sanity$controls_ui$tabs_$_iter__70543(cljs.core.chunk_rest(s__70544__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__70546),null);
}
} else {
var vec__70558 = cljs.core.first(s__70544__$2);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70558,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70558,(1),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$role,"presentation",cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k))?"active":null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$href,"#",cljs.core.cst$kw$on_DASH_click,((function (vec__70558,k,_,s__70544__$2,temp__6728__auto__){
return (function (e){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(current_tab,k) : cljs.core.reset_BANG_.call(null,current_tab,k));

return e.preventDefault();
});})(vec__70558,k,_,s__70544__$2,temp__6728__auto__))
], null),cljs.core.name(k)], null)], null),org$numenta$sanity$controls_ui$tabs_$_iter__70543(cljs.core.rest(s__70544__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(tab_cmps);
})())], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$tabs,(function (){var vec__70561 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__70564){
var vec__70565 = p__70564;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70565,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70565,(1),null);
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(current_tab) : cljs.core.deref.call(null,current_tab)),k);
}),tab_cmps));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70561,(0),null);
var cmp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__70561,(1),null);
return cmp;
})()], null)], null);
});
org.numenta.sanity.controls_ui.help_block = (function org$numenta$sanity$controls_ui$help_block(show_help){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(show_help) : cljs.core.deref.call(null,show_help)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Overview"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"https://github.com/nupic-community/sanity"], null),"Sanity"], null)," runs HTM models in the browser with interactive\n       controls. The model state from recent timesteps is kept, so you can step\n       back in time. You can inspect input values, encoded sense bits, and the\n       columns that make up cortical layers. Within a column you can inspect\n       cells and their distal dendrite segments. Feed-forward and distal synapses\n       can be shown."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Display"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Kept timesteps are shown in a row at the top of the display.\n      Click one to jump to it.\n      Below that, the blocks represent sensory fields (squares) and\n      layers of cortical columns (circles). Depending on the display mode,\n      these may be shown in 2D grids from a single time step, or as one\n      vertical line per timestep, allowing several time steps to be shown\n      in series."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Don't miss the various complementary displays in the other tabs."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Selection"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Click on the main canvas to select one column of cells,\n      within some layer. The individual cells\n      and their distal dendrite segments will be shown.\n      If you click off the layer, the column will be de-selected, but\n      the layer will remain selected. Its parameters can be seen and edited in\n      the 'params' tab."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Input bits can also be selected. For multiple selections,\n       hold Command / Ctrl key while clicking (on Mac / Windows,\n       respectively)."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Key controls"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"When the main canvas is in focus, ",new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"up"], null),"/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"down"], null)," select columns; "], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"page up"], null),"/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"page down"], null)," scroll the visible field; "], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"right"], null),"/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"left"], null)," step forward / back in time; "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"space"], null)," starts or stops running. "], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"/"], null)," sorts the selected layer (Shift for all);"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"\\"], null)," clears sorting (Shift for all);"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"+"], null)," adds a facet (Shift for all);"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$kbd,"-"], null)," clears facets (Shift for all);"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Colour legend"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"red"], null)], null),"Red"], null),": active"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"blue"], null)], null),"Blue"], null),": predicted"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"purple"], null)], null),"Purple"], null),": active+predicted (i.e. recognised)"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$color,"green"], null)], null),"Green"], null),": growing (new synapses)"], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_lg_DASH_3$col_DASH_md_DASH_4$col_DASH_sm_DASH_6,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Segment diagrams"], null),(function (){var conn_act_px = (115);
var disc_act_px = (25);
var stimulus_th_px = (100);
var learning_th_px = (60);
var conn_tot_px = (130);
var disc_tot_px = (40);
var width_label = ((function (conn_act_px,disc_act_px,stimulus_th_px,learning_th_px,conn_tot_px,disc_tot_px){
return (function (y_transform,width,label_above_QMARK_,text){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate(0,"),cljs.core.str(y_transform),cljs.core.str(")")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(-3),cljs.core.cst$kw$x2,(0),cljs.core.cst$kw$y2,(3),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x1,width,cljs.core.cst$kw$y1,(-3),cljs.core.cst$kw$x2,width,cljs.core.cst$kw$y2,(3),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,(1)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$line,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x1,(0),cljs.core.cst$kw$y1,(0),cljs.core.cst$kw$x2,width,cljs.core.cst$kw$y2,(0),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$stroke_DASH_width,(1)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(cljs.core.truth_(label_above_QMARK_)?(-5):(15)),cljs.core.cst$kw$font_DASH_family,"sans-serif",cljs.core.cst$kw$font_DASH_size,"13px"], null),text], null)], null);
});})(conn_act_px,disc_act_px,stimulus_th_px,learning_th_px,conn_tot_px,disc_tot_px))
;
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Segments are displayed as a pair of progress bars.\n              The meaning of each of the widths is shown below."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$margin_DASH_left,(20)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$svg,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,(200),cljs.core.cst$kw$height,(220)], null),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate(1,0)")].join('')], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(15),conn_tot_px,true,"connected synapses"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(45),conn_act_px,true,"active connected synapses"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(75),stimulus_th_px,true,"stimulus threshold"], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$g,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$transform,[cljs.core.str("translate(0,"),cljs.core.str((90)),cljs.core.str(")")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(1),cljs.core.cst$kw$width,conn_tot_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"black",cljs.core.cst$kw$fill_DASH_opacity,"0.1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(11),cljs.core.cst$kw$width,disc_tot_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"black",cljs.core.cst$kw$fill_DASH_opacity,"0.1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(1),cljs.core.cst$kw$width,conn_act_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"red"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(11),cljs.core.cst$kw$width,disc_act_px,cljs.core.cst$kw$height,(8),cljs.core.cst$kw$stroke,"none",cljs.core.cst$kw$fill,"red"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$width,stimulus_th_px,cljs.core.cst$kw$height,(10),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$fill_DASH_opacity,(0)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$rect,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(10),cljs.core.cst$kw$width,learning_th_px,cljs.core.cst$kw$height,(10),cljs.core.cst$kw$stroke,"black",cljs.core.cst$kw$fill_DASH_opacity,(0)], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(125),learning_th_px,false,"learning threshold"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(155),disc_tot_px,false,"disconnected synapses"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [width_label,(185),disc_act_px,false,"active disconnected synapses"], null)], null)], null)], null)], null);
})()], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$hr], null)], null);
} else {
return null;
}
});
org.numenta.sanity.controls_ui.sanity_app = (function org$numenta$sanity$controls_ui$sanity_app(_,___$1,___$2,features,___$3,___$4,___$5,selection,steps,network_shape,___$6,___$7,___$8,into_journal,___$9){
var show_help = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var viz_expanded = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var time_plots_tab = (cljs.core.truth_((function (){var G__70576 = cljs.core.cst$kw$time_DASH_plots;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70576) : features.call(null,G__70576));
})())?org.numenta.sanity.controls_ui.time_plots_tab_builder(steps,into_journal):null);
var cell_sdrs_tab = (cljs.core.truth_((function (){var G__70577 = cljs.core.cst$kw$cell_DASH_SDRs;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70577) : features.call(null,G__70577));
})())?org.numenta.sanity.controls_ui.cell_sdrs_tab_builder(steps,network_shape,selection,into_journal):null);
return ((function (show_help,viz_expanded,time_plots_tab,cell_sdrs_tab){
return (function (title,model_tab,main_pane,___$10,capture_options,viz_options,current_tab,selection__$1,steps__$1,network_shape__$1,series_colors,into_viz,into_sim,into_journal__$1,debug_data){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.navbar,title,features,steps__$1,show_help,viz_options,viz_expanded,network_shape__$1,into_viz,into_sim], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.help_block,show_help], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$container_DASH_fluid,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$row,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_9$viz_DASH_expandable,main_pane], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.tabs,current_tab,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(model_tab)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$model,model_tab], null):null),(cljs.core.truth_((function (){var G__70578 = cljs.core.cst$kw$capture;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70578) : features.call(null,G__70578));
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$capture,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.capture_tab,capture_options], null)], null):null),(cljs.core.truth_((function (){var G__70579 = cljs.core.cst$kw$drawing;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70579) : features.call(null,G__70579));
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.drawing_tab,features,viz_options,capture_options], null)], null):null),(cljs.core.truth_((function (){var G__70580 = cljs.core.cst$kw$params;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70580) : features.call(null,G__70580));
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$params,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.parameters_tab,network_shape__$1,selection__$1,into_sim], null)], null):null),(cljs.core.truth_(time_plots_tab)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$time_DASH_plots,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [time_plots_tab,series_colors], null)], null):null),(cljs.core.truth_(cell_sdrs_tab)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$cell_DASH_SDRs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cell_sdrs_tab], null)], null):null),(cljs.core.truth_((function (){var G__70581 = cljs.core.cst$kw$sources;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70581) : features.call(null,G__70581));
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sources,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.sources_tab,network_shape__$1,selection__$1,series_colors,into_journal__$1], null)], null):null),(cljs.core.truth_((function (){var G__70582 = cljs.core.cst$kw$details;
return (features.cljs$core$IFn$_invoke$arity$1 ? features.cljs$core$IFn$_invoke$arity$1(G__70582) : features.call(null,G__70582));
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$details,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.details_tab,selection__$1,into_journal__$1], null)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$debug,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.controls_ui.debug_tab,debug_data], null)], null)], null))], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div_SHARP_loading_DASH_message,"loading"], null)], null)], null);
});
;})(show_help,viz_expanded,time_plots_tab,cell_sdrs_tab))
});
