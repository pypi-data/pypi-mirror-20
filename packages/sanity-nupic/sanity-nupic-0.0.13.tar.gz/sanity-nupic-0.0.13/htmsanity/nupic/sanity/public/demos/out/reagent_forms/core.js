// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('reagent_forms.core');
goog.require('cljs.core');
goog.require('clojure.walk');
goog.require('clojure.string');
goog.require('goog.string');
goog.require('goog.string.format');
goog.require('reagent.core');
goog.require('reagent_forms.datepicker');
reagent_forms.core.value_of = (function reagent_forms$core$value_of(element){
return element.target.value;
});
reagent_forms.core.id__GT_path = cljs.core.memoize((function (id){
if(cljs.core.sequential_QMARK_(id)){
return id;
} else {
var segments = clojure.string.split.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$2([cljs.core.str(id)].join(''),(1)),/\./);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.keyword,segments);
}
}));
reagent_forms.core.set_doc_value = (function reagent_forms$core$set_doc_value(doc,id,value,events){
var path = (reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1 ? reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1(id) : reagent_forms.core.id__GT_path.call(null,id));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (path){
return (function (p1__69258_SHARP_,p2__69257_SHARP_){
var or__9278__auto__ = (p2__69257_SHARP_.cljs$core$IFn$_invoke$arity$3 ? p2__69257_SHARP_.cljs$core$IFn$_invoke$arity$3(path,value,p1__69258_SHARP_) : p2__69257_SHARP_.call(null,path,value,p1__69258_SHARP_));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return p1__69258_SHARP_;
}
});})(path))
,cljs.core.assoc_in(doc,path,value),events);
});
reagent_forms.core.mk_save_fn = (function reagent_forms$core$mk_save_fn(doc,events){
return (function (id,value){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(doc,reagent_forms.core.set_doc_value,id,value,cljs.core.array_seq([events], 0));
});
});
reagent_forms.core.wrap_get_fn = (function reagent_forms$core$wrap_get_fn(get,wrapper){
return (function (id){
var G__69260 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(G__69260) : wrapper.call(null,G__69260));
});
});
reagent_forms.core.wrap_save_fn = (function reagent_forms$core$wrap_save_fn(save_BANG_,wrapper){
return (function (id,value){
var G__69263 = id;
var G__69264 = (wrapper.cljs$core$IFn$_invoke$arity$1 ? wrapper.cljs$core$IFn$_invoke$arity$1(value) : wrapper.call(null,value));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69263,G__69264) : save_BANG_.call(null,G__69263,G__69264));
});
});
reagent_forms.core.wrap_fns = (function reagent_forms$core$wrap_fns(opts,node){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$doc,cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(opts),cljs.core.cst$kw$get,(function (){var temp__6726__auto__ = cljs.core.cst$kw$in_DASH_fn.cljs$core$IFn$_invoke$arity$1(cljs.core.second(node));
if(cljs.core.truth_(temp__6726__auto__)){
var in_fn = temp__6726__auto__;
return reagent_forms.core.wrap_get_fn(cljs.core.cst$kw$get.cljs$core$IFn$_invoke$arity$1(opts),in_fn);
} else {
return cljs.core.cst$kw$get.cljs$core$IFn$_invoke$arity$1(opts);
}
})(),cljs.core.cst$kw$save_BANG_,(function (){var temp__6726__auto__ = cljs.core.cst$kw$out_DASH_fn.cljs$core$IFn$_invoke$arity$1(cljs.core.second(node));
if(cljs.core.truth_(temp__6726__auto__)){
var out_fn = temp__6726__auto__;
return reagent_forms.core.wrap_save_fn(cljs.core.cst$kw$save_BANG_.cljs$core$IFn$_invoke$arity$1(opts),out_fn);
} else {
return cljs.core.cst$kw$save_BANG_.cljs$core$IFn$_invoke$arity$1(opts);
}
})()], null);
});
if(typeof reagent_forms.core.format_type !== 'undefined'){
} else {
reagent_forms.core.format_type = (function (){var method_table__10301__auto__ = (function (){var G__69265 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69265) : cljs.core.atom.call(null,G__69265));
})();
var prefer_table__10302__auto__ = (function (){var G__69266 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69266) : cljs.core.atom.call(null,G__69266));
})();
var method_cache__10303__auto__ = (function (){var G__69267 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69267) : cljs.core.atom.call(null,G__69267));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__69268 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69268) : cljs.core.atom.call(null,G__69268));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","format-type"),((function (method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__,hierarchy__10305__auto__){
return (function (field_type,_){
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field_type], true),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$range,cljs.core.cst$kw$numeric], null)))){
return cljs.core.cst$kw$numeric;
} else {
return field_type;
}
});})(method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__,hierarchy__10305__auto__))
,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
reagent_forms.core.valid_number_ending_QMARK_ = (function reagent_forms$core$valid_number_ending_QMARK_(n){
return ((cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(".",cljs.core.last(cljs.core.butlast(n)))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(".",cljs.core.last(n)))) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("0",cljs.core.last(n)));
});
reagent_forms.core.format_value = (function reagent_forms$core$format_value(fmt,value){
if(cljs.core.truth_((function (){var and__9266__auto__ = cljs.core.not((function (){var G__69272 = parseFloat(value);
return isNaN(G__69272);
})());
if(and__9266__auto__){
return fmt;
} else {
return and__9266__auto__;
}
})())){
return goog.string.format(fmt,value);
} else {
return value;
}
});
reagent_forms.core.format_type.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$numeric,(function (_,n){
if(cljs.core.truth_(cljs.core.not_empty(n))){
var parsed = parseFloat(n);
if(cljs.core.truth_(isNaN(parsed))){
return null;
} else {
return parsed;
}
} else {
return null;
}
}));
reagent_forms.core.format_type.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,value){
return value;
}));
if(typeof reagent_forms.core.bind !== 'undefined'){
} else {
reagent_forms.core.bind = (function (){var method_table__10301__auto__ = (function (){var G__69273 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69273) : cljs.core.atom.call(null,G__69273));
})();
var prefer_table__10302__auto__ = (function (){var G__69274 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69274) : cljs.core.atom.call(null,G__69274));
})();
var method_cache__10303__auto__ = (function (){var G__69275 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69275) : cljs.core.atom.call(null,G__69275));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__69276 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69276) : cljs.core.atom.call(null,G__69276));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","bind"),((function (method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__,hierarchy__10305__auto__){
return (function (p__69277,_){
var map__69278 = p__69277;
var map__69278__$1 = ((((!((map__69278 == null)))?((((map__69278.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69278.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69278):map__69278);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69278__$1,cljs.core.cst$kw$field);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field], true),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$text,cljs.core.cst$kw$numeric,cljs.core.cst$kw$password,cljs.core.cst$kw$email,cljs.core.cst$kw$tel,cljs.core.cst$kw$range,cljs.core.cst$kw$textarea], null)))){
return cljs.core.cst$kw$input_DASH_field;
} else {
return field;
}
});})(method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__,hierarchy__10305__auto__))
,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__69281,p__69282){
var map__69283 = p__69281;
var map__69283__$1 = ((((!((map__69283 == null)))?((((map__69283.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69283.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69283):map__69283);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69283__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69283__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69283__$1,cljs.core.cst$kw$fmt);
var map__69284 = p__69282;
var map__69284__$1 = ((((!((map__69284 == null)))?((((map__69284.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69284.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69284):map__69284);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69284__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69284__$1,cljs.core.cst$kw$save_BANG_);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69284__$1,cljs.core.cst$kw$doc);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$value,(function (){var value = (function (){var or__9278__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return "";
}
})();
return reagent_forms.core.format_value(fmt,value);
})(),cljs.core.cst$kw$on_DASH_change,((function (map__69283,map__69283__$1,field,id,fmt,map__69284,map__69284__$1,get,save_BANG_,doc){
return (function (p1__69280_SHARP_){
var G__69287 = id;
var G__69288 = (function (){var G__69289 = field;
var G__69290 = reagent_forms.core.value_of(p1__69280_SHARP_);
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__69289,G__69290) : reagent_forms.core.format_type.call(null,G__69289,G__69290));
})();
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69287,G__69288) : save_BANG_.call(null,G__69287,G__69288));
});})(map__69283,map__69283__$1,field,id,fmt,map__69284,map__69284__$1,get,save_BANG_,doc))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__69291,p__69292){
var map__69293 = p__69291;
var map__69293__$1 = ((((!((map__69293 == null)))?((((map__69293.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69293.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69293):map__69293);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69293__$1,cljs.core.cst$kw$id);
var map__69294 = p__69292;
var map__69294__$1 = ((((!((map__69294 == null)))?((((map__69294.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69294.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69294):map__69294);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69294__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69294__$1,cljs.core.cst$kw$save_BANG_);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$checked,cljs.core.boolean$((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id))),cljs.core.cst$kw$on_DASH_change,((function (map__69293,map__69293__$1,id,map__69294,map__69294__$1,get,save_BANG_){
return (function (){
var G__69297 = id;
var G__69298 = cljs.core.not((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69297,G__69298) : save_BANG_.call(null,G__69297,G__69298));
});})(map__69293,map__69293__$1,id,map__69294,map__69294__$1,get,save_BANG_))
], null);
}));
reagent_forms.core.bind.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$default,(function (_,___$1){
return null;
}));
reagent_forms.core.set_attrs = (function reagent_forms$core$set_attrs(var_args){
var args__10468__auto__ = [];
var len__10461__auto___69310 = arguments.length;
var i__10462__auto___69311 = (0);
while(true){
if((i__10462__auto___69311 < len__10461__auto___69310)){
args__10468__auto__.push((arguments[i__10462__auto___69311]));

var G__69312 = (i__10462__auto___69311 + (1));
i__10462__auto___69311 = G__69312;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((2) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((2)),(0),null)):null);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__10469__auto__);
});

reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic = (function (p__69302,opts,p__69303){
var vec__69304 = p__69302;
var seq__69305 = cljs.core.seq(vec__69304);
var first__69306 = cljs.core.first(seq__69305);
var seq__69305__$1 = cljs.core.next(seq__69305);
var type = first__69306;
var first__69306__$1 = cljs.core.first(seq__69305__$1);
var seq__69305__$2 = cljs.core.next(seq__69305__$1);
var attrs = first__69306__$1;
var body = seq__69305__$2;
var vec__69307 = p__69303;
var default_attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69307,(0),null);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([default_attrs,(reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.bind.cljs$core$IFn$_invoke$arity$2(attrs,opts) : reagent_forms.core.bind.call(null,attrs,opts)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(attrs,cljs.core.cst$kw$checked,cljs.core.array_seq([cljs.core.cst$kw$default_DASH_checked], 0))], 0))], null),body);
});

reagent_forms.core.set_attrs.cljs$lang$maxFixedArity = (2);

reagent_forms.core.set_attrs.cljs$lang$applyTo = (function (seq69299){
var G__69300 = cljs.core.first(seq69299);
var seq69299__$1 = cljs.core.next(seq69299);
var G__69301 = cljs.core.first(seq69299__$1);
var seq69299__$2 = cljs.core.next(seq69299__$1);
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(G__69300,G__69301,seq69299__$2);
});

if(typeof reagent_forms.core.init_field !== 'undefined'){
} else {
reagent_forms.core.init_field = (function (){var method_table__10301__auto__ = (function (){var G__69313 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69313) : cljs.core.atom.call(null,G__69313));
})();
var prefer_table__10302__auto__ = (function (){var G__69314 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69314) : cljs.core.atom.call(null,G__69314));
})();
var method_cache__10303__auto__ = (function (){var G__69315 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69315) : cljs.core.atom.call(null,G__69315));
})();
var cached_hierarchy__10304__auto__ = (function (){var G__69316 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__69316) : cljs.core.atom.call(null,G__69316));
})();
var hierarchy__10305__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$hierarchy,cljs.core.get_global_hierarchy());
return (new cljs.core.MultiFn(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("reagent-forms.core","init-field"),((function (method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__,hierarchy__10305__auto__){
return (function (p__69317,_){
var vec__69318 = p__69317;
var ___$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69318,(0),null);
var map__69321 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69318,(1),null);
var map__69321__$1 = ((((!((map__69321 == null)))?((((map__69321.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69321.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69321):map__69321);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69321__$1,cljs.core.cst$kw$field);
var field__$1 = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(field);
if(cljs.core.truth_(cljs.core.some(cljs.core.PersistentHashSet.fromArray([field__$1], true),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$range,cljs.core.cst$kw$text,cljs.core.cst$kw$password,cljs.core.cst$kw$email,cljs.core.cst$kw$tel,cljs.core.cst$kw$textarea], null)))){
return cljs.core.cst$kw$input_DASH_field;
} else {
return field__$1;
}
});})(method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__,hierarchy__10305__auto__))
,cljs.core.cst$kw$default,hierarchy__10305__auto__,method_table__10301__auto__,prefer_table__10302__auto__,method_cache__10303__auto__,cached_hierarchy__10304__auto__));
})();
}
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$container,(function (p__69324,p__69325){
var vec__69326 = p__69324;
var seq__69327 = cljs.core.seq(vec__69326);
var first__69328 = cljs.core.first(seq__69327);
var seq__69327__$1 = cljs.core.next(seq__69327);
var type = first__69328;
var first__69328__$1 = cljs.core.first(seq__69327__$1);
var seq__69327__$2 = cljs.core.next(seq__69327__$1);
var map__69329 = first__69328__$1;
var map__69329__$1 = ((((!((map__69329 == null)))?((((map__69329.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69329.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69329):map__69329);
var attrs = map__69329__$1;
var valid_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69329__$1,cljs.core.cst$kw$valid_QMARK_);
var body = seq__69327__$2;
var map__69330 = p__69325;
var map__69330__$1 = ((((!((map__69330 == null)))?((((map__69330.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69330.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69330):map__69330);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69330__$1,cljs.core.cst$kw$doc);
return ((function (vec__69326,seq__69327,first__69328,seq__69327__$1,type,first__69328__$1,seq__69327__$2,map__69329,map__69329__$1,attrs,valid_QMARK_,body,map__69330,map__69330__$1,doc){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69333 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69333) : visible__69249__auto__.call(null,G__69333));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__6726__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__69334 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__69334) : valid_QMARK_.call(null,G__69334));
})():null);
if(cljs.core.truth_(temp__6726__auto____$1)){
var valid_class = temp__6726__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__6726__auto____$1,visible__69249__auto__,temp__6726__auto__,vec__69326,seq__69327,first__69328,seq__69327__$1,type,first__69328__$1,seq__69327__$2,map__69329,map__69329__$1,attrs,valid_QMARK_,body,map__69330,map__69330__$1,doc){
return (function (p1__69323_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__69323_SHARP_))){
return [cljs.core.str(p1__69323_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__6726__auto____$1,visible__69249__auto__,temp__6726__auto__,vec__69326,seq__69327,first__69328,seq__69327__$1,type,first__69328__$1,seq__69327__$2,map__69329,map__69329__$1,attrs,valid_QMARK_,body,map__69330,map__69330__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,(function (){var temp__6726__auto____$1 = (cljs.core.truth_(valid_QMARK_)?(function (){var G__69335 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (valid_QMARK_.cljs$core$IFn$_invoke$arity$1 ? valid_QMARK_.cljs$core$IFn$_invoke$arity$1(G__69335) : valid_QMARK_.call(null,G__69335));
})():null);
if(cljs.core.truth_(temp__6726__auto____$1)){
var valid_class = temp__6726__auto____$1;
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(attrs,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$class], null),((function (valid_class,temp__6726__auto____$1,temp__6726__auto__,vec__69326,seq__69327,first__69328,seq__69327__$1,type,first__69328__$1,seq__69327__$2,map__69329,map__69329__$1,attrs,valid_QMARK_,body,map__69330,map__69330__$1,doc){
return (function (p1__69323_SHARP_){
if(!(cljs.core.empty_QMARK_(p1__69323_SHARP_))){
return [cljs.core.str(p1__69323_SHARP_),cljs.core.str(" "),cljs.core.str(valid_class)].join('');
} else {
return valid_class;
}
});})(valid_class,temp__6726__auto____$1,temp__6726__auto__,vec__69326,seq__69327,first__69328,seq__69327__$1,type,first__69328__$1,seq__69327__$2,map__69329,map__69329__$1,attrs,valid_QMARK_,body,map__69330,map__69330__$1,doc))
);
} else {
return attrs;
}
})()], null),body);
}
});
;})(vec__69326,seq__69327,first__69328,seq__69327__$1,type,first__69328__$1,seq__69327__$2,map__69329,map__69329__$1,attrs,valid_QMARK_,body,map__69330,map__69330__$1,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$input_DASH_field,(function (p__69336,p__69337){
var vec__69338 = p__69336;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69338,(0),null);
var map__69341 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69338,(1),null);
var map__69341__$1 = ((((!((map__69341 == null)))?((((map__69341.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69341.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69341):map__69341);
var attrs = map__69341__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69341__$1,cljs.core.cst$kw$field);
var component = vec__69338;
var map__69342 = p__69337;
var map__69342__$1 = ((((!((map__69342 == null)))?((((map__69342.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69342.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69342):map__69342);
var opts = map__69342__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69342__$1,cljs.core.cst$kw$doc);
return ((function (vec__69338,_,map__69341,map__69341__$1,attrs,field,component,map__69342,map__69342__$1,opts,doc){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69345 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69345) : visible__69249__auto__.call(null,G__69345));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__69338,_,map__69341,map__69341__$1,attrs,field,component,map__69342,map__69342__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$numeric,(function (p__69348,p__69349){
var vec__69350 = p__69348;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69350,(0),null);
var map__69353 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69350,(1),null);
var map__69353__$1 = ((((!((map__69353 == null)))?((((map__69353.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69353.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69353):map__69353);
var attrs = map__69353__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69353__$1,cljs.core.cst$kw$id);
var fmt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69353__$1,cljs.core.cst$kw$fmt);
var map__69354 = p__69349;
var map__69354__$1 = ((((!((map__69354 == null)))?((((map__69354.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69354.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69354):map__69354);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69354__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69354__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69354__$1,cljs.core.cst$kw$save_BANG_);
var input_value = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
return ((function (input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69357 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69357) : visible__69249__auto__.call(null,G__69357));
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$value,(function (){var or__9278__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(input_value) : cljs.core.deref.call(null,input_value));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (get.cljs$core$IFn$_invoke$arity$2 ? get.cljs$core$IFn$_invoke$arity$2(id,"") : get.call(null,id,""));
}
})(),cljs.core.cst$kw$on_DASH_change,((function (visible__69249__auto__,temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_){
return (function (p1__69346_SHARP_){
var G__69358 = input_value;
var G__69359 = reagent_forms.core.value_of(p1__69346_SHARP_);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69358,G__69359) : cljs.core.reset_BANG_.call(null,G__69358,G__69359));
});})(visible__69249__auto__,temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (visible__69249__auto__,temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_){
return (function (p1__69347_SHARP_){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(input_value,null) : cljs.core.reset_BANG_.call(null,input_value,null));

var G__69360 = id;
var G__69361 = (function (){var G__69362 = cljs.core.cst$kw$numeric;
var G__69363 = reagent_forms.core.format_value(fmt,reagent_forms.core.value_of(p1__69347_SHARP_));
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__69362,G__69363) : reagent_forms.core.format_type.call(null,G__69362,G__69363));
})();
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69360,G__69361) : save_BANG_.call(null,G__69360,G__69361));
});})(visible__69249__auto__,temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_))
], null),attrs], 0))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$value,(function (){var or__9278__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(input_value) : cljs.core.deref.call(null,input_value));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return (get.cljs$core$IFn$_invoke$arity$2 ? get.cljs$core$IFn$_invoke$arity$2(id,"") : get.call(null,id,""));
}
})(),cljs.core.cst$kw$on_DASH_change,((function (temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_){
return (function (p1__69346_SHARP_){
var G__69364 = input_value;
var G__69365 = reagent_forms.core.value_of(p1__69346_SHARP_);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69364,G__69365) : cljs.core.reset_BANG_.call(null,G__69364,G__69365));
});})(temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_){
return (function (p1__69347_SHARP_){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(input_value,null) : cljs.core.reset_BANG_.call(null,input_value,null));

var G__69366 = id;
var G__69367 = (function (){var G__69368 = cljs.core.cst$kw$numeric;
var G__69369 = reagent_forms.core.format_value(fmt,reagent_forms.core.value_of(p1__69347_SHARP_));
return (reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.format_type.cljs$core$IFn$_invoke$arity$2(G__69368,G__69369) : reagent_forms.core.format_type.call(null,G__69368,G__69369));
})();
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69366,G__69367) : save_BANG_.call(null,G__69366,G__69367));
});})(temp__6726__auto__,input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_))
], null),attrs], 0))], null);
}
});
;})(input_value,vec__69350,type,map__69353,map__69353__$1,attrs,id,fmt,map__69354,map__69354__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$datepicker,(function (p__69373,p__69374){
var vec__69375 = p__69373;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69375,(0),null);
var map__69378 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69375,(1),null);
var map__69378__$1 = ((((!((map__69378 == null)))?((((map__69378.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69378.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69378):map__69378);
var attrs = map__69378__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69378__$1,cljs.core.cst$kw$id);
var date_format = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69378__$1,cljs.core.cst$kw$date_DASH_format);
var inline = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69378__$1,cljs.core.cst$kw$inline);
var auto_close_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69378__$1,cljs.core.cst$kw$auto_DASH_close_QMARK_);
var lang = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__69378__$1,cljs.core.cst$kw$lang,cljs.core.cst$kw$en_DASH_US);
var map__69379 = p__69374;
var map__69379__$1 = ((((!((map__69379 == null)))?((((map__69379.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69379.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69379):map__69379);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69379__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69379__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69379__$1,cljs.core.cst$kw$save_BANG_);
var fmt = reagent_forms.datepicker.parse_format(date_format);
var selected_date = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
var selected_month = (((cljs.core.cst$kw$month.cljs$core$IFn$_invoke$arity$1(selected_date) > (0)))?(cljs.core.cst$kw$month.cljs$core$IFn$_invoke$arity$1(selected_date) - (1)):cljs.core.cst$kw$month.cljs$core$IFn$_invoke$arity$1(selected_date));
var today = (new Date());
var year = (function (){var or__9278__auto__ = cljs.core.cst$kw$year.cljs$core$IFn$_invoke$arity$1(selected_date);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return today.getFullYear();
}
})();
var month = (function (){var or__9278__auto__ = selected_month;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return today.getMonth();
}
})();
var day = (function (){var or__9278__auto__ = cljs.core.cst$kw$day.cljs$core$IFn$_invoke$arity$1(selected_date);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return today.getDate();
}
})();
var expanded_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return ((function (fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69382 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69382) : visible__69249__auto__.call(null,G__69382));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (p1__69370_SHARP_){
p1__69370_SHARP_.preventDefault();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__6728__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__6728__auto__)){
var date = temp__6728__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null),attrs], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (p1__69371_SHARP_){
p1__69371_SHARP_.preventDefault();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,year,month,day,expanded_QMARK_,auto_close_QMARK_,((function (visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
,((function (visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (p1__69372_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__69372_SHARP_) : save_BANG_.call(null,id,p1__69372_SHARP_));
});})(visible__69249__auto__,temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
,inline,lang], null)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$datepicker_DASH_wrapper,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$input_DASH_group$date,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$read_DASH_only,true,cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$on_DASH_click,((function (temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (p1__69370_SHARP_){
p1__69370_SHARP_.preventDefault();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$value,(function (){var temp__6728__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__6728__auto__)){
var date = temp__6728__auto__;
return reagent_forms.datepicker.format_date(date,fmt);
} else {
return null;
}
})()], null),attrs], 0))], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span$input_DASH_group_DASH_addon,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,((function (temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (p1__69371_SHARP_){
p1__69371_SHARP_.preventDefault();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(expanded_QMARK_,cljs.core.not);
});})(temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$i$glyphicon$glyphicon_DASH_calendar], null)], null)], null),new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.datepicker.datepicker,year,month,day,expanded_QMARK_,auto_close_QMARK_,((function (temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (){
return (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
});})(temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
,((function (temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_){
return (function (p1__69372_SHARP_){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,p1__69372_SHARP_) : save_BANG_.call(null,id,p1__69372_SHARP_));
});})(temp__6726__auto__,fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
,inline,lang], null)], null);
}
});
;})(fmt,selected_date,selected_month,today,year,month,day,expanded_QMARK_,vec__69375,_,map__69378,map__69378__$1,attrs,id,date_format,inline,auto_close_QMARK_,lang,map__69379,map__69379__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$checkbox,(function (p__69383,p__69384){
var vec__69385 = p__69383;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69385,(0),null);
var map__69388 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69385,(1),null);
var map__69388__$1 = ((((!((map__69388 == null)))?((((map__69388.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69388.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69388):map__69388);
var attrs = map__69388__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69388__$1,cljs.core.cst$kw$id);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69388__$1,cljs.core.cst$kw$field);
var checked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69388__$1,cljs.core.cst$kw$checked);
var default_checked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69388__$1,cljs.core.cst$kw$default_DASH_checked);
var component = vec__69385;
var map__69389 = p__69384;
var map__69389__$1 = ((((!((map__69389 == null)))?((((map__69389.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69389.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69389):map__69389);
var opts = map__69389__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69389__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69389__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69389__$1,cljs.core.cst$kw$save_BANG_);
if(cljs.core.truth_((function (){var or__9278__auto__ = checked;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return default_checked;
}
})())){
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,true) : save_BANG_.call(null,id,true));
} else {
}

return ((function (vec__69385,_,map__69388,map__69388__$1,attrs,id,field,checked,default_checked,component,map__69389,map__69389__$1,opts,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(attrs,cljs.core.cst$kw$checked,cljs.core.array_seq([cljs.core.cst$kw$default_DASH_checked], 0)));
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69392 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69392) : visible__69249__auto__.call(null,G__69392));
})())){
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
} else {
return null;
}
} else {
return reagent_forms.core.set_attrs.cljs$core$IFn$_invoke$arity$variadic(component,opts,cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$type,field], null)], 0));
}
});
;})(vec__69385,_,map__69388,map__69388__$1,attrs,id,field,checked,default_checked,component,map__69389,map__69389__$1,opts,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$label,(function (p__69393,p__69394){
var vec__69395 = p__69393;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69395,(0),null);
var map__69398 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69395,(1),null);
var map__69398__$1 = ((((!((map__69398 == null)))?((((map__69398.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69398.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69398):map__69398);
var attrs = map__69398__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69398__$1,cljs.core.cst$kw$id);
var preamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69398__$1,cljs.core.cst$kw$preamble);
var postamble = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69398__$1,cljs.core.cst$kw$postamble);
var placeholder = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69398__$1,cljs.core.cst$kw$placeholder);
var map__69399 = p__69394;
var map__69399__$1 = ((((!((map__69399 == null)))?((((map__69399.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69399.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69399):map__69399);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69399__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69399__$1,cljs.core.cst$kw$get);
return ((function (vec__69395,type,map__69398,map__69398__$1,attrs,id,preamble,postamble,placeholder,map__69399,map__69399__$1,doc,get){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69402 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69402) : visible__69249__auto__.call(null,G__69402));
})())){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,preamble,(function (){var temp__6726__auto____$1 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__6726__auto____$1)){
var value = temp__6726__auto____$1;
return [cljs.core.str(value),cljs.core.str(postamble)].join('');
} else {
return placeholder;
}
})()], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,preamble,(function (){var temp__6726__auto____$1 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(temp__6726__auto____$1)){
var value = temp__6726__auto____$1;
return [cljs.core.str(value),cljs.core.str(postamble)].join('');
} else {
return placeholder;
}
})()], null);
}
});
;})(vec__69395,type,map__69398,map__69398__$1,attrs,id,preamble,postamble,placeholder,map__69399,map__69399__$1,doc,get))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$alert,(function (p__69403,p__69404){
var vec__69405 = p__69403;
var seq__69406 = cljs.core.seq(vec__69405);
var first__69407 = cljs.core.first(seq__69406);
var seq__69406__$1 = cljs.core.next(seq__69406);
var type = first__69407;
var first__69407__$1 = cljs.core.first(seq__69406__$1);
var seq__69406__$2 = cljs.core.next(seq__69406__$1);
var map__69408 = first__69407__$1;
var map__69408__$1 = ((((!((map__69408 == null)))?((((map__69408.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69408.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69408):map__69408);
var attrs = map__69408__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69408__$1,cljs.core.cst$kw$id);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69408__$1,cljs.core.cst$kw$event);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69408__$1,cljs.core.cst$kw$touch_DASH_event);
var closeable_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__69408__$1,cljs.core.cst$kw$closeable_QMARK_,true);
var body = seq__69406__$2;
var map__69409 = p__69404;
var map__69409__$1 = ((((!((map__69409 == null)))?((((map__69409.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69409.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69409):map__69409);
var opts = map__69409__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69409__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69409__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69409__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__69405,seq__69406,first__69407,seq__69406__$1,type,first__69407__$1,seq__69406__$2,map__69408,map__69408__$1,attrs,id,event,touch_event,closeable_QMARK_,body,map__69409,map__69409__$1,opts,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69412 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69412) : visible__69249__auto__.call(null,G__69412));
})())){
if(cljs.core.truth_(event)){
if(cljs.core.truth_((function (){var G__69413 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__69413) : event.call(null,G__69413));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(attrs,event)], null),body);
} else {
return null;
}
} else {
var temp__6726__auto____$1 = cljs.core.not_empty((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
if(cljs.core.truth_(temp__6726__auto____$1)){
var message = temp__6726__auto____$1;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,(cljs.core.truth_(closeable_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$close,cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$type,"button",cljs.core.cst$kw$aria_DASH_hidden,true,(function (){var or__9278__auto__ = touch_event;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),((function (message,temp__6726__auto____$1,visible__69249__auto__,temp__6726__auto__,vec__69405,seq__69406,first__69407,seq__69406__$1,type,first__69407__$1,seq__69406__$2,map__69408,map__69408__$1,attrs,id,event,touch_event,closeable_QMARK_,body,map__69409,map__69409__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__6726__auto____$1,visible__69249__auto__,temp__6726__auto__,vec__69405,seq__69406,first__69407,seq__69406__$1,type,first__69407__$1,seq__69406__$2,map__69408,map__69408__$1,attrs,id,event,touch_event,closeable_QMARK_,body,map__69409,map__69409__$1,opts,doc,get,save_BANG_))
], true, false),"X"], null):null),message], null);
} else {
return null;
}
}
} else {
return null;
}
} else {
if(cljs.core.truth_(event)){
if(cljs.core.truth_((function (){var G__69414 = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return (event.cljs$core$IFn$_invoke$arity$1 ? event.cljs$core$IFn$_invoke$arity$1(G__69414) : event.call(null,G__69414));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(attrs,event)], null),body);
} else {
return null;
}
} else {
var temp__6726__auto____$1 = cljs.core.not_empty((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)));
if(cljs.core.truth_(temp__6726__auto____$1)){
var message = temp__6726__auto____$1;
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs,(cljs.core.truth_(closeable_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$close,cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$type,"button",cljs.core.cst$kw$aria_DASH_hidden,true,(function (){var or__9278__auto__ = touch_event;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),((function (message,temp__6726__auto____$1,temp__6726__auto__,vec__69405,seq__69406,first__69407,seq__69406__$1,type,first__69407__$1,seq__69406__$2,map__69408,map__69408__$1,attrs,id,event,touch_event,closeable_QMARK_,body,map__69409,map__69409__$1,opts,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
});})(message,temp__6726__auto____$1,temp__6726__auto__,vec__69405,seq__69406,first__69407,seq__69406__$1,type,first__69407__$1,seq__69406__$2,map__69408,map__69408__$1,attrs,id,event,touch_event,closeable_QMARK_,body,map__69409,map__69409__$1,opts,doc,get,save_BANG_))
], true, false),"X"], null):null),message], null);
} else {
return null;
}
}
}
});
;})(vec__69405,seq__69406,first__69407,seq__69406__$1,type,first__69407__$1,seq__69406__$2,map__69408,map__69408__$1,attrs,id,event,touch_event,closeable_QMARK_,body,map__69409,map__69409__$1,opts,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$radio,(function (p__69415,p__69416){
var vec__69417 = p__69415;
var seq__69418 = cljs.core.seq(vec__69417);
var first__69419 = cljs.core.first(seq__69418);
var seq__69418__$1 = cljs.core.next(seq__69418);
var type = first__69419;
var first__69419__$1 = cljs.core.first(seq__69418__$1);
var seq__69418__$2 = cljs.core.next(seq__69418__$1);
var map__69420 = first__69419__$1;
var map__69420__$1 = ((((!((map__69420 == null)))?((((map__69420.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69420.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69420):map__69420);
var attrs = map__69420__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69420__$1,cljs.core.cst$kw$field);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69420__$1,cljs.core.cst$kw$name);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69420__$1,cljs.core.cst$kw$value);
var checked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69420__$1,cljs.core.cst$kw$checked);
var default_checked = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69420__$1,cljs.core.cst$kw$default_DASH_checked);
var body = seq__69418__$2;
var map__69421 = p__69416;
var map__69421__$1 = ((((!((map__69421 == null)))?((((map__69421.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69421.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69421):map__69421);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69421__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69421__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69421__$1,cljs.core.cst$kw$save_BANG_);
if(cljs.core.truth_((function (){var or__9278__auto__ = checked;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return default_checked;
}
})())){
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
} else {
}

return ((function (vec__69417,seq__69418,first__69419,seq__69418__$1,type,first__69419__$1,seq__69418__$2,map__69420,map__69420__$1,attrs,field,name,value,checked,default_checked,body,map__69421,map__69421__$1,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69424 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69424) : visible__69249__auto__.call(null,G__69424));
})())){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(attrs,cljs.core.cst$kw$value,cljs.core.array_seq([cljs.core.cst$kw$default_DASH_checked], 0)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (visible__69249__auto__,temp__6726__auto__,vec__69417,seq__69418,first__69419,seq__69418__$1,type,first__69419__$1,seq__69418__$2,map__69420,map__69420__$1,attrs,field,name,value,checked,default_checked,body,map__69421,map__69421__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(visible__69249__auto__,temp__6726__auto__,vec__69417,seq__69418,first__69419,seq__69418__$1,type,first__69419__$1,seq__69418__$2,map__69420,map__69420__$1,attrs,field,name,value,checked,default_checked,body,map__69421,map__69421__$1,doc,get,save_BANG_))
], null)], 0))], null),body);
} else {
return null;
}
} else {
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(attrs,cljs.core.cst$kw$value,cljs.core.array_seq([cljs.core.cst$kw$default_DASH_checked], 0)),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$radio,cljs.core.cst$kw$checked,cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,(get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(name) : get.call(null,name))),cljs.core.cst$kw$on_DASH_change,((function (temp__6726__auto__,vec__69417,seq__69418,first__69419,seq__69418__$1,type,first__69419__$1,seq__69418__$2,map__69420,map__69420__$1,attrs,field,name,value,checked,default_checked,body,map__69421,map__69421__$1,doc,get,save_BANG_){
return (function (){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(name,value) : save_BANG_.call(null,name,value));
});})(temp__6726__auto__,vec__69417,seq__69418,first__69419,seq__69418__$1,type,first__69419__$1,seq__69418__$2,map__69420,map__69420__$1,attrs,field,name,value,checked,default_checked,body,map__69421,map__69421__$1,doc,get,save_BANG_))
], null)], 0))], null),body);
}
});
;})(vec__69417,seq__69418,first__69419,seq__69418__$1,type,first__69419__$1,seq__69418__$2,map__69420,map__69420__$1,attrs,field,name,value,checked,default_checked,body,map__69421,map__69421__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$typeahead,(function (p__69428,p__69429){
var vec__69430 = p__69428;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69430,(0),null);
var map__69433 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69430,(1),null);
var map__69433__$1 = ((((!((map__69433 == null)))?((((map__69433.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69433.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69433):map__69433);
var attrs = map__69433__$1;
var result_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__69433__$1,cljs.core.cst$kw$result_DASH_fn,cljs.core.identity);
var item_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$item_DASH_class);
var input_placeholder = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$input_DASH_placeholder);
var highlight_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$highlight_DASH_class);
var list_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$list_DASH_class);
var data_source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$data_DASH_source);
var input_class = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$input_DASH_class);
var clear_on_focus_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__69433__$1,cljs.core.cst$kw$clear_DASH_on_DASH_focus_QMARK_,true);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69433__$1,cljs.core.cst$kw$id);
var choice_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__69433__$1,cljs.core.cst$kw$choice_DASH_fn,cljs.core.identity);
var map__69434 = p__69429;
var map__69434__$1 = ((((!((map__69434 == null)))?((((map__69434.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69434.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69434):map__69434);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69434__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69434__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69434__$1,cljs.core.cst$kw$save_BANG_);
var typeahead_hidden_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(true);
var mouse_on_list_QMARK_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var selected_index = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((-1));
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
var choose_selected = ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((function (){var and__9266__auto__ = cljs.core.not_empty((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(cljs.core.truth_(and__9266__auto__)){
return ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)) > (-1));
} else {
return and__9266__auto__;
}
})())){
var choice = cljs.core.nth.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,choice) : save_BANG_.call(null,id,choice));

(choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(choice) : choice_fn.call(null,choice));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));
} else {
return null;
}
});})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
;
return ((function (typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69437 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69437) : visible__69249__auto__.call(null,G__69437));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$placeholder,input_placeholder,cljs.core.cst$kw$class,input_class,cljs.core.cst$kw$value,(function (){var v = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(!(cljs.core.iterable_QMARK_(v))){
return v;
} else {
return cljs.core.first(v);
}
})(),cljs.core.cst$kw$on_DASH_focus,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
} else {
return null;
}
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(-1)) : cljs.core.reset_BANG_.call(null,selected_index,(-1)));
}
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (p1__69425_SHARP_){
var temp__6728__auto__ = clojure.string.trim(reagent_forms.core.value_of(p1__69425_SHARP_));
if(cljs.core.truth_(temp__6728__auto__)){
var value = temp__6728__auto__;
var G__69438_69460 = selections;
var G__69439_69461 = (function (){var G__69440 = value.toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__69440) : data_source.call(null,G__69440));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69438_69460,G__69439_69461) : cljs.core.reset_BANG_.call(null,G__69438_69460,G__69439_69461));

var G__69441_69462 = id;
var G__69442_69463 = reagent_forms.core.value_of(p1__69425_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69441_69462,G__69442_69463) : save_BANG_.call(null,G__69441_69462,G__69442_69463));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(-1)) : cljs.core.reset_BANG_.call(null,selected_index,(-1)));
} else {
return null;
}
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (p1__69426_SHARP_){
var G__69443 = p1__69426_SHARP_.which;
switch (G__69443) {
case (38):
p1__69426_SHARP_.preventDefault();

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0))){
return null;
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
}

break;
case (40):
p1__69426_SHARP_.preventDefault();

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))) - (1)))){
return null;
} else {
var G__69444_69465 = id;
var G__69445_69466 = reagent_forms.core.value_of(p1__69426_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69444_69465,G__69445_69466) : save_BANG_.call(null,G__69444_69465,G__69445_69466));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.inc);
}

break;
case (9):
return choose_selected();

break;
case (13):
return choose_selected();

break;
case (27):
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));

break;
default:
return "default";

}
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__9278__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__9278__auto__){
return or__9278__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (p1__69427_SHARP_){
var G__69446 = selected_index;
var G__69447 = (function (){var G__69448 = p1__69427_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__69448);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69446,G__69447) : cljs.core.reset_BANG_.call(null,G__69446,G__69447));
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(visible__69249__auto__,temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))))], null)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input,new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$type,cljs.core.cst$kw$text,cljs.core.cst$kw$placeholder,input_placeholder,cljs.core.cst$kw$class,input_class,cljs.core.cst$kw$value,(function (){var v = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(!(cljs.core.iterable_QMARK_(v))){
return v;
} else {
return cljs.core.first(v);
}
})(),cljs.core.cst$kw$on_DASH_focus,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_(clear_on_focus_QMARK_)){
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,null) : save_BANG_.call(null,id,null));
} else {
return null;
}
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_blur,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mouse_on_list_QMARK_) : cljs.core.deref.call(null,mouse_on_list_QMARK_)))){
return null;
} else {
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(-1)) : cljs.core.reset_BANG_.call(null,selected_index,(-1)));
}
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_change,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (p1__69425_SHARP_){
var temp__6728__auto__ = clojure.string.trim(reagent_forms.core.value_of(p1__69425_SHARP_));
if(cljs.core.truth_(temp__6728__auto__)){
var value = temp__6728__auto__;
var G__69449_69467 = selections;
var G__69450_69468 = (function (){var G__69451 = value.toLowerCase();
return (data_source.cljs$core$IFn$_invoke$arity$1 ? data_source.cljs$core$IFn$_invoke$arity$1(G__69451) : data_source.call(null,G__69451));
})();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69449_69467,G__69450_69468) : cljs.core.reset_BANG_.call(null,G__69449_69467,G__69450_69468));

var G__69452_69469 = id;
var G__69453_69470 = reagent_forms.core.value_of(p1__69425_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69452_69469,G__69453_69470) : save_BANG_.call(null,G__69452_69469,G__69453_69470));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,false) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,false));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(-1)) : cljs.core.reset_BANG_.call(null,selected_index,(-1)));
} else {
return null;
}
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_key_DASH_down,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (p1__69426_SHARP_){
var G__69454 = p1__69426_SHARP_.which;
switch (G__69454) {
case (38):
p1__69426_SHARP_.preventDefault();

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(0))){
return null;
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.dec);
}

break;
case (40):
p1__69426_SHARP_.preventDefault();

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),(cljs.core.count((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))) - (1)))){
return null;
} else {
var G__69455_69472 = id;
var G__69456_69473 = reagent_forms.core.value_of(p1__69426_SHARP_);
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69455_69472,G__69456_69473) : save_BANG_.call(null,G__69455_69472,G__69456_69473));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,cljs.core.inc);
}

break;
case (9):
return choose_selected();

break;
case (13):
return choose_selected();

break;
case (27):
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_index,(0)) : cljs.core.reset_BANG_.call(null,selected_index,(0)));

break;
default:
return "default";

}
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ul,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$display,(cljs.core.truth_((function (){var or__9278__auto__ = cljs.core.empty_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)));
if(or__9278__auto__){
return or__9278__auto__;
} else {
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(typeahead_hidden_QMARK_) : cljs.core.deref.call(null,typeahead_hidden_QMARK_));
}
})())?cljs.core.cst$kw$none:cljs.core.cst$kw$block)], null),cljs.core.cst$kw$class,list_class,cljs.core.cst$kw$on_DASH_mouse_DASH_enter,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,true) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,true));
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_mouse_DASH_leave,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(mouse_on_list_QMARK_,false) : cljs.core.reset_BANG_.call(null,mouse_on_list_QMARK_,false));
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
], null),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (index,result){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$li,new cljs.core.PersistentArrayMap(null, 5, [cljs.core.cst$kw$tab_DASH_index,index,cljs.core.cst$kw$key,index,cljs.core.cst$kw$class,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_index) : cljs.core.deref.call(null,selected_index)),index))?highlight_class:item_class),cljs.core.cst$kw$on_DASH_mouse_DASH_over,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (p1__69427_SHARP_){
var G__69457 = selected_index;
var G__69458 = (function (){var G__69459 = p1__69427_SHARP_.target.getAttribute("tabIndex");
return parseInt(G__69459);
})();
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69457,G__69458) : cljs.core.reset_BANG_.call(null,G__69457,G__69458));
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,cljs.core.cst$kw$on_DASH_click,((function (temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_){
return (function (){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(typeahead_hidden_QMARK_,true) : cljs.core.reset_BANG_.call(null,typeahead_hidden_QMARK_,true));

(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(id,result) : save_BANG_.call(null,id,result));

return (choice_fn.cljs$core$IFn$_invoke$arity$1 ? choice_fn.cljs$core$IFn$_invoke$arity$1(result) : choice_fn.call(null,result));
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
], null),(result_fn.cljs$core$IFn$_invoke$arity$1 ? result_fn.cljs$core$IFn$_invoke$arity$1(result) : result_fn.call(null,result))], null);
});})(temp__6726__auto__,typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))))], null)], null);
}
});
;})(typeahead_hidden_QMARK_,mouse_on_list_QMARK_,selected_index,selections,choose_selected,vec__69430,type,map__69433,map__69433__$1,attrs,result_fn,item_class,input_placeholder,highlight_class,list_class,data_source,input_class,clear_on_focus_QMARK_,id,choice_fn,map__69434,map__69434__$1,doc,get,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$file,(function (p__69475,p__69476){
var vec__69477 = p__69475;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69477,(0),null);
var map__69480 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69477,(1),null);
var map__69480__$1 = ((((!((map__69480 == null)))?((((map__69480.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69480.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69480):map__69480);
var attrs = map__69480__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69480__$1,cljs.core.cst$kw$id);
var map__69481 = p__69476;
var map__69481__$1 = ((((!((map__69481 == null)))?((((map__69481.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69481.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69481):map__69481);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69481__$1,cljs.core.cst$kw$doc);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69481__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__69477,type,map__69480,map__69480__$1,attrs,id,map__69481,map__69481__$1,doc,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69484 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69484) : visible__69249__auto__.call(null,G__69484));
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$type,cljs.core.cst$kw$file,cljs.core.cst$kw$on_DASH_change,((function (visible__69249__auto__,temp__6726__auto__,vec__69477,type,map__69480,map__69480__$1,attrs,id,map__69481,map__69481__$1,doc,save_BANG_){
return (function (p1__69474_SHARP_){
var G__69485 = id;
var G__69486 = cljs.core.first(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(p1__69474_SHARP_.target.files));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69485,G__69486) : save_BANG_.call(null,G__69485,G__69486));
});})(visible__69249__auto__,temp__6726__auto__,vec__69477,type,map__69480,map__69480__$1,attrs,id,map__69481,map__69481__$1,doc,save_BANG_))
], null),attrs], 0))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$type,cljs.core.cst$kw$file,cljs.core.cst$kw$on_DASH_change,((function (temp__6726__auto__,vec__69477,type,map__69480,map__69480__$1,attrs,id,map__69481,map__69481__$1,doc,save_BANG_){
return (function (p1__69474_SHARP_){
var G__69487 = id;
var G__69488 = cljs.core.first(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(p1__69474_SHARP_.target.files));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69487,G__69488) : save_BANG_.call(null,G__69487,G__69488));
});})(temp__6726__auto__,vec__69477,type,map__69480,map__69480__$1,attrs,id,map__69481,map__69481__$1,doc,save_BANG_))
], null),attrs], 0))], null);
}
});
;})(vec__69477,type,map__69480,map__69480__$1,attrs,id,map__69481,map__69481__$1,doc,save_BANG_))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$files,(function (p__69490,p__69491){
var vec__69492 = p__69490;
var type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69492,(0),null);
var map__69495 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69492,(1),null);
var map__69495__$1 = ((((!((map__69495 == null)))?((((map__69495.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69495.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69495):map__69495);
var attrs = map__69495__$1;
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69495__$1,cljs.core.cst$kw$id);
var map__69496 = p__69491;
var map__69496__$1 = ((((!((map__69496 == null)))?((((map__69496.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69496.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69496):map__69496);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69496__$1,cljs.core.cst$kw$doc);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69496__$1,cljs.core.cst$kw$save_BANG_);
return ((function (vec__69492,type,map__69495,map__69495__$1,attrs,id,map__69496,map__69496__$1,doc,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69499 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69499) : visible__69249__auto__.call(null,G__69499));
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$file,cljs.core.cst$kw$multiple,true,cljs.core.cst$kw$on_DASH_change,((function (visible__69249__auto__,temp__6726__auto__,vec__69492,type,map__69495,map__69495__$1,attrs,id,map__69496,map__69496__$1,doc,save_BANG_){
return (function (p1__69489_SHARP_){
var G__69500 = id;
var G__69501 = p1__69489_SHARP_.target.files;
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69500,G__69501) : save_BANG_.call(null,G__69500,G__69501));
});})(visible__69249__auto__,temp__6726__auto__,vec__69492,type,map__69495,map__69495__$1,attrs,id,map__69496,map__69496__$1,doc,save_BANG_))
], null),attrs], 0))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,cljs.core.cst$kw$file,cljs.core.cst$kw$multiple,true,cljs.core.cst$kw$on_DASH_change,((function (temp__6726__auto__,vec__69492,type,map__69495,map__69495__$1,attrs,id,map__69496,map__69496__$1,doc,save_BANG_){
return (function (p1__69489_SHARP_){
var G__69502 = id;
var G__69503 = p1__69489_SHARP_.target.files;
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69502,G__69503) : save_BANG_.call(null,G__69502,G__69503));
});})(temp__6726__auto__,vec__69492,type,map__69495,map__69495__$1,attrs,id,map__69496,map__69496__$1,doc,save_BANG_))
], null),attrs], 0))], null);
}
});
;})(vec__69492,type,map__69495,map__69495__$1,attrs,id,map__69496,map__69496__$1,doc,save_BANG_))
}));
reagent_forms.core.group_item = (function reagent_forms$core$group_item(p__69504,p__69505,selections,field,id){
var vec__69537 = p__69504;
var seq__69538 = cljs.core.seq(vec__69537);
var first__69539 = cljs.core.first(seq__69538);
var seq__69538__$1 = cljs.core.next(seq__69538);
var type = first__69539;
var first__69539__$1 = cljs.core.first(seq__69538__$1);
var seq__69538__$2 = cljs.core.next(seq__69538__$1);
var map__69540 = first__69539__$1;
var map__69540__$1 = ((((!((map__69540 == null)))?((((map__69540.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69540.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69540):map__69540);
var attrs = map__69540__$1;
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69540__$1,cljs.core.cst$kw$key);
var touch_event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69540__$1,cljs.core.cst$kw$touch_DASH_event);
var body = seq__69538__$2;
var map__69541 = p__69505;
var map__69541__$1 = ((((!((map__69541 == null)))?((((map__69541.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69541.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69541):map__69541);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69541__$1,cljs.core.cst$kw$save_BANG_);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69541__$1,cljs.core.cst$kw$multi_DASH_select);
var handle_click_BANG_ = ((function (vec__69537,seq__69538,first__69539,seq__69538__$1,type,first__69539__$1,seq__69538__$2,map__69540,map__69540__$1,attrs,key,touch_event,body,map__69541,map__69541__$1,save_BANG_,multi_select){
return (function reagent_forms$core$group_item_$_handle_click_BANG_(){
if(cljs.core.truth_(multi_select)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(selections,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [key], null),cljs.core.not);

var G__69562 = id;
var G__69563 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.second,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections))));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69562,G__69563) : save_BANG_.call(null,G__69562,G__69563));
} else {
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key);
var G__69564_69568 = selections;
var G__69565_69569 = cljs.core.PersistentArrayMap.fromArray([key,cljs.core.not(value)], true, false);
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__69564_69568,G__69565_69569) : cljs.core.reset_BANG_.call(null,G__69564_69568,G__69565_69569));

var G__69566 = id;
var G__69567 = (cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?key:null);
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69566,G__69567) : save_BANG_.call(null,G__69566,G__69567));
}
});})(vec__69537,seq__69538,first__69539,seq__69538__$1,type,first__69539__$1,seq__69538__$2,map__69540,map__69540__$1,attrs,key,touch_event,body,map__69541,map__69541__$1,save_BANG_,multi_select))
;
return ((function (vec__69537,seq__69538,first__69539,seq__69538__$1,type,first__69539__$1,seq__69538__$2,map__69540,map__69540__$1,attrs,key,touch_event,body,map__69541,map__69541__$1,save_BANG_,multi_select){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray([cljs.core.cst$kw$class,(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selections) : cljs.core.deref.call(null,selections)),key))?"active":null),(function (){var or__9278__auto__ = touch_event;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.cst$kw$on_DASH_click;
}
})(),handle_click_BANG_], true, false),attrs], 0)),body], null);
});
;})(vec__69537,seq__69538,first__69539,seq__69538__$1,type,first__69539__$1,seq__69538__$2,map__69540,map__69540__$1,attrs,key,touch_event,body,map__69541,map__69541__$1,save_BANG_,multi_select))
});
reagent_forms.core.mk_selections = (function reagent_forms$core$mk_selections(id,selectors,p__69570){
var map__69579 = p__69570;
var map__69579__$1 = ((((!((map__69579 == null)))?((((map__69579.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69579.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69579):map__69579);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69579__$1,cljs.core.cst$kw$get);
var multi_select = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69579__$1,cljs.core.cst$kw$multi_DASH_select);
var value = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (value,map__69579,map__69579__$1,get,multi_select){
return (function (m,p__69581){
var vec__69582 = p__69581;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69582,(0),null);
var map__69585 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69582,(1),null);
var map__69585__$1 = ((((!((map__69585 == null)))?((((map__69585.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69585.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69585):map__69585);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69585__$1,cljs.core.cst$kw$key);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,key,cljs.core.boolean$(cljs.core.some(cljs.core.PersistentHashSet.fromArray([key], true),(cljs.core.truth_(multi_select)?value:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [value], null)))));
});})(value,map__69579,map__69579__$1,get,multi_select))
,cljs.core.PersistentArrayMap.EMPTY,selectors);
});
/**
 * selectors might be passed in inline or as a collection
 */
reagent_forms.core.extract_selectors = (function reagent_forms$core$extract_selectors(selectors){
if((cljs.core.ffirst(selectors) instanceof cljs.core.Keyword)){
return selectors;
} else {
return cljs.core.first(selectors);
}
});
reagent_forms.core.selection_group = (function reagent_forms$core$selection_group(p__69589,p__69590){
var vec__69604 = p__69589;
var seq__69605 = cljs.core.seq(vec__69604);
var first__69606 = cljs.core.first(seq__69605);
var seq__69605__$1 = cljs.core.next(seq__69605);
var type = first__69606;
var first__69606__$1 = cljs.core.first(seq__69605__$1);
var seq__69605__$2 = cljs.core.next(seq__69605__$1);
var map__69607 = first__69606__$1;
var map__69607__$1 = ((((!((map__69607 == null)))?((((map__69607.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69607.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69607):map__69607);
var attrs = map__69607__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69607__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69607__$1,cljs.core.cst$kw$id);
var selection_items = seq__69605__$2;
var map__69608 = p__69590;
var map__69608__$1 = ((((!((map__69608 == null)))?((((map__69608.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69608.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69608):map__69608);
var opts = map__69608__$1;
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69608__$1,cljs.core.cst$kw$get);
var selection_items__$1 = reagent_forms.core.extract_selectors(selection_items);
var selections = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(reagent_forms.core.mk_selections(id,selection_items__$1,opts));
var selectors = cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get){
return (function (item){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$visible_QMARK_,cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(item)),cljs.core.cst$kw$selector,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.group_item(item,opts,selections,field,id)], null)], null);
});})(selection_items__$1,selections,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get))
,selection_items__$1);
return ((function (selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get){
return (function (){
if(cljs.core.truth_((get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id)))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(selections,((function (selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get){
return (function (p1__69587_SHARP_){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get){
return (function (p__69611){
var vec__69612 = p__69611;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69612,(0),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,false], null);
});})(selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get))
,p1__69587_SHARP_));
});})(selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get))
);
}

return cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,attrs], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$selector,cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get){
return (function (p1__69588_SHARP_){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(p1__69588_SHARP_);
if(cljs.core.truth_(temp__6726__auto__)){
var visible_QMARK_ = temp__6726__auto__;
var G__69615 = (function (){var G__69616 = cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(opts);
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(G__69616) : cljs.core.deref.call(null,G__69616));
})();
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__69615) : visible_QMARK_.call(null,G__69615));
} else {
return true;
}
});})(selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get))
,selectors)));
});
;})(selection_items__$1,selections,selectors,vec__69604,seq__69605,first__69606,seq__69605__$1,type,first__69606__$1,seq__69605__$2,map__69607,map__69607__$1,attrs,field,id,selection_items,map__69608,map__69608__$1,opts,get))
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$single_DASH_select,(function (p__69617,p__69618){
var vec__69619 = p__69617;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69619,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69619,(1),null);
var field = vec__69619;
var map__69622 = p__69618;
var map__69622__$1 = ((((!((map__69622 == null)))?((((map__69622.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69622.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69622):map__69622);
var opts = map__69622__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69622__$1,cljs.core.cst$kw$doc);
return ((function (vec__69619,_,attrs,field,map__69622,map__69622__$1,opts,doc){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69624 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69624) : visible__69249__auto__.call(null,G__69624));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,opts], null);
}
});
;})(vec__69619,_,attrs,field,map__69622,map__69622__$1,opts,doc))
}));
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$multi_DASH_select,(function (p__69625,p__69626){
var vec__69627 = p__69625;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69627,(0),null);
var attrs = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69627,(1),null);
var field = vec__69627;
var map__69630 = p__69626;
var map__69630__$1 = ((((!((map__69630 == null)))?((((map__69630.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69630.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69630):map__69630);
var opts = map__69630__$1;
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69630__$1,cljs.core.cst$kw$doc);
return ((function (vec__69627,_,attrs,field,map__69630,map__69630__$1,opts,doc){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69632 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69632) : visible__69249__auto__.call(null,G__69632));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.selection_group,field,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(opts,cljs.core.cst$kw$multi_DASH_select,true)], null);
}
});
;})(vec__69627,_,attrs,field,map__69630,map__69630__$1,opts,doc))
}));
reagent_forms.core.map_options = (function reagent_forms$core$map_options(options){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__10132__auto__ = (function reagent_forms$core$map_options_$_iter__69659(s__69660){
return (new cljs.core.LazySeq(null,(function (){
var s__69660__$1 = s__69660;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__69660__$1);
if(temp__6728__auto__){
var s__69660__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__69660__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__69660__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__69662 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__69661 = (0);
while(true){
if((i__69661 < size__10131__auto__)){
var vec__69675 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__69661);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69675,(0),null);
var map__69678 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69675,(1),null);
var map__69678__$1 = ((((!((map__69678 == null)))?((((map__69678.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69678.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69678):map__69678);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69678__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69675,(2),null);
cljs.core.chunk_append(b__69662,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null));

var G__69685 = (i__69661 + (1));
i__69661 = G__69685;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__69662),reagent_forms$core$map_options_$_iter__69659(cljs.core.chunk_rest(s__69660__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__69662),null);
}
} else {
var vec__69680 = cljs.core.first(s__69660__$2);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69680,(0),null);
var map__69683 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69680,(1),null);
var map__69683__$1 = ((((!((map__69683 == null)))?((((map__69683.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69683.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69683):map__69683);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69683__$1,cljs.core.cst$kw$key);
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__69680,(2),null);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(label)].join(''),key], null),reagent_forms$core$map_options_$_iter__69659(cljs.core.rest(s__69660__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(options);
})());
});
reagent_forms.core.default_selection = (function reagent_forms$core$default_selection(options,v){
return cljs.core.last(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__69686_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(v,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(p1__69686_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null)));
}),options)));
});
reagent_forms.core.init_field.cljs$core$IMultiFn$_add_method$arity$3(null,cljs.core.cst$kw$list,(function (p__69689,p__69690){
var vec__69691 = p__69689;
var seq__69692 = cljs.core.seq(vec__69691);
var first__69693 = cljs.core.first(seq__69692);
var seq__69692__$1 = cljs.core.next(seq__69692);
var type = first__69693;
var first__69693__$1 = cljs.core.first(seq__69692__$1);
var seq__69692__$2 = cljs.core.next(seq__69692__$1);
var map__69694 = first__69693__$1;
var map__69694__$1 = ((((!((map__69694 == null)))?((((map__69694.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69694.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69694):map__69694);
var attrs = map__69694__$1;
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69694__$1,cljs.core.cst$kw$field);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69694__$1,cljs.core.cst$kw$id);
var options = seq__69692__$2;
var map__69695 = p__69690;
var map__69695__$1 = ((((!((map__69695 == null)))?((((map__69695.cljs$lang$protocol_mask$partition0$ & (64))) || (map__69695.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__69695):map__69695);
var doc = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69695__$1,cljs.core.cst$kw$doc);
var get = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69695__$1,cljs.core.cst$kw$get);
var save_BANG_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__69695__$1,cljs.core.cst$kw$save_BANG_);
var options__$1 = reagent_forms.core.extract_selectors(options);
var options_lookup = reagent_forms.core.map_options(options__$1);
var selection = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((function (){var or__9278__auto__ = (get.cljs$core$IFn$_invoke$arity$1 ? get.cljs$core$IFn$_invoke$arity$1(id) : get.call(null,id));
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.first(options__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1),cljs.core.cst$kw$key], null));
}
})());
var G__69698_69707 = id;
var G__69699_69708 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection));
(save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69698_69707,G__69699_69708) : save_BANG_.call(null,G__69698_69707,G__69699_69708));

return ((function (options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_){
return (function (){
var temp__6726__auto__ = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(attrs);
if(cljs.core.truth_(temp__6726__auto__)){
var visible__69249__auto__ = temp__6726__auto__;
if(cljs.core.truth_((function (){var G__69700 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible__69249__auto__.cljs$core$IFn$_invoke$arity$1 ? visible__69249__auto__.cljs$core$IFn$_invoke$arity$1(G__69700) : visible__69249__auto__.call(null,G__69700));
})())){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (visible__69249__auto__,temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_){
return (function (p1__69687_SHARP_){
var G__69701 = id;
var G__69702 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__69687_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69701,G__69702) : save_BANG_.call(null,G__69701,G__69702));
});})(visible__69249__auto__,temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (visible__69249__auto__,temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_){
return (function (p1__69688_SHARP_){
var temp__6726__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__69688_SHARP_));
if(cljs.core.truth_(temp__6726__auto____$1)){
var visible_QMARK_ = temp__6726__auto____$1;
var G__69703 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__69703) : visible_QMARK_.call(null,G__69703));
} else {
return true;
}
});})(visible__69249__auto__,temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_))
,options__$1))], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([attrs,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$default_DASH_value,reagent_forms.core.default_selection(options__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selection) : cljs.core.deref.call(null,selection))),cljs.core.cst$kw$on_DASH_change,((function (temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_){
return (function (p1__69687_SHARP_){
var G__69704 = id;
var G__69705 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(options_lookup,reagent_forms.core.value_of(p1__69687_SHARP_));
return (save_BANG_.cljs$core$IFn$_invoke$arity$2 ? save_BANG_.cljs$core$IFn$_invoke$arity$2(G__69704,G__69705) : save_BANG_.call(null,G__69704,G__69705));
});})(temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_))
], null)], 0)),cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_){
return (function (p1__69688_SHARP_){
var temp__6726__auto____$1 = cljs.core.cst$kw$visible_QMARK_.cljs$core$IFn$_invoke$arity$1(cljs.core.second(p1__69688_SHARP_));
if(cljs.core.truth_(temp__6726__auto____$1)){
var visible_QMARK_ = temp__6726__auto____$1;
var G__69706 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc));
return (visible_QMARK_.cljs$core$IFn$_invoke$arity$1 ? visible_QMARK_.cljs$core$IFn$_invoke$arity$1(G__69706) : visible_QMARK_.call(null,G__69706));
} else {
return true;
}
});})(temp__6726__auto__,options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_))
,options__$1))], null);
}
});
;})(options__$1,options_lookup,selection,vec__69691,seq__69692,first__69693,seq__69692__$1,type,first__69693__$1,seq__69692__$2,map__69694,map__69694__$1,attrs,field,id,options,map__69695,map__69695__$1,doc,get,save_BANG_))
}));
reagent_forms.core.field_QMARK_ = (function reagent_forms$core$field_QMARK_(node){
return (cljs.core.coll_QMARK_(node)) && (cljs.core.map_QMARK_(cljs.core.second(node))) && (cljs.core.contains_QMARK_(cljs.core.second(node),cljs.core.cst$kw$field));
});
/**
 * creates data bindings between the form fields and the supplied atom
 * form - the form template with the fields
 * doc - the document that the fields will be bound to
 * events - any events that should be triggered when the document state changes
 */
reagent_forms.core.bind_fields = (function reagent_forms$core$bind_fields(var_args){
var args__10468__auto__ = [];
var len__10461__auto___69713 = arguments.length;
var i__10462__auto___69714 = (0);
while(true){
if((i__10462__auto___69714 < len__10461__auto___69713)){
args__10468__auto__.push((arguments[i__10462__auto___69714]));

var G__69715 = (i__10462__auto___69714 + (1));
i__10462__auto___69714 = G__69715;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((2) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((2)),(0),null)):null);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__10469__auto__);
});

reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic = (function (form,doc,events){
var opts = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$doc,doc,cljs.core.cst$kw$get,(function (p1__69709_SHARP_){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(doc) : cljs.core.deref.call(null,doc)),(reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1 ? reagent_forms.core.id__GT_path.cljs$core$IFn$_invoke$arity$1(p1__69709_SHARP_) : reagent_forms.core.id__GT_path.call(null,p1__69709_SHARP_)));
}),cljs.core.cst$kw$save_BANG_,reagent_forms.core.mk_save_fn(doc,events)], null);
var form__$1 = clojure.walk.postwalk(((function (opts){
return (function (node){
if(cljs.core.truth_(reagent_forms.core.field_QMARK_(node))){
var opts__$1 = reagent_forms.core.wrap_fns(opts,node);
var field = (reagent_forms.core.init_field.cljs$core$IFn$_invoke$arity$2 ? reagent_forms.core.init_field.cljs$core$IFn$_invoke$arity$2(node,opts__$1) : reagent_forms.core.init_field.call(null,node,opts__$1));
if(cljs.core.fn_QMARK_(field)){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [field], null);
} else {
return field;
}
} else {
return node;
}
});})(opts))
,form);
return ((function (opts,form__$1){
return (function (){
return form__$1;
});
;})(opts,form__$1))
});

reagent_forms.core.bind_fields.cljs$lang$maxFixedArity = (2);

reagent_forms.core.bind_fields.cljs$lang$applyTo = (function (seq69710){
var G__69711 = cljs.core.first(seq69710);
var seq69710__$1 = cljs.core.next(seq69710);
var G__69712 = cljs.core.first(seq69710__$1);
var seq69710__$2 = cljs.core.next(seq69710__$1);
return reagent_forms.core.bind_fields.cljs$core$IFn$_invoke$arity$variadic(G__69711,G__69712,seq69710__$2);
});

