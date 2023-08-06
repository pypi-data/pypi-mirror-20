// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('cljs_http.client');
goog.require('cljs.core');
goog.require('goog.Uri');
goog.require('cljs_http.core');
goog.require('cljs.core.async');
goog.require('no.en.core');
goog.require('cljs_http.util');
goog.require('clojure.string');
goog.require('cljs.reader');
cljs_http.client.if_pos = (function cljs_http$client$if_pos(v){
if(cljs.core.truth_((function (){var and__9266__auto__ = v;
if(cljs.core.truth_(and__9266__auto__)){
return (v > (0));
} else {
return and__9266__auto__;
}
})())){
return v;
} else {
return null;
}
});
/**
 * Parse `s` as query params and return a hash map.
 */
cljs_http.client.parse_query_params = (function cljs_http$client$parse_query_params(s){
if(!(clojure.string.blank_QMARK_(s))){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__82001_SHARP_,p2__82000_SHARP_){
var vec__82005 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(p2__82000_SHARP_,/=/);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82005,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82005,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82001_SHARP_,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(no.en.core.url_decode(k)),no.en.core.url_decode(v));
}),cljs.core.PersistentArrayMap.EMPTY,clojure.string.split.cljs$core$IFn$_invoke$arity$2([cljs.core.str(s)].join(''),/&/));
} else {
return null;
}
});
/**
 * Parse `url` into a hash map.
 */
cljs_http.client.parse_url = (function cljs_http$client$parse_url(url){
if(!(clojure.string.blank_QMARK_(url))){
var uri = goog.Uri.parse(url);
var query_data = uri.getQueryData();
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$scheme,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(uri.getScheme()),cljs.core.cst$kw$server_DASH_name,uri.getDomain(),cljs.core.cst$kw$server_DASH_port,cljs_http.client.if_pos(uri.getPort()),cljs.core.cst$kw$uri,uri.getPath(),cljs.core.cst$kw$query_DASH_string,((cljs.core.not(query_data.isEmpty()))?[cljs.core.str(query_data)].join(''):null),cljs.core.cst$kw$query_DASH_params,((cljs.core.not(query_data.isEmpty()))?cljs_http.client.parse_query_params([cljs.core.str(query_data)].join('')):null)], null);
} else {
return null;
}
});
cljs_http.client.unexceptional_status_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 13, [(205),null,(206),null,(300),null,(204),null,(307),null,(303),null,(301),null,(201),null,(302),null,(202),null,(200),null,(203),null,(207),null], null), null);
cljs_http.client.encode_val = (function cljs_http$client$encode_val(k,v){
return [cljs.core.str(no.en.core.url_encode(cljs.core.name(k))),cljs.core.str("="),cljs.core.str(no.en.core.url_encode([cljs.core.str(v)].join('')))].join('');
});
cljs_http.client.encode_vals = (function cljs_http$client$encode_vals(k,vs){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__82008_SHARP_){
return cljs_http.client.encode_val(k,p1__82008_SHARP_);
}),vs));
});
cljs_http.client.encode_param = (function cljs_http$client$encode_param(p__82009){
var vec__82013 = p__82009;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82013,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82013,(1),null);
if(cljs.core.coll_QMARK_(v)){
return cljs_http.client.encode_vals(k,v);
} else {
return cljs_http.client.encode_val(k,v);
}
});
cljs_http.client.generate_query_string = (function cljs_http$client$generate_query_string(params){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs_http.client.encode_param,params));
});
cljs_http.client.regex_char_esc_smap = (function (){var esc_chars = "()*&^%$#!+";
return cljs.core.zipmap(esc_chars,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (esc_chars){
return (function (p1__82016_SHARP_){
return [cljs.core.str("\\"),cljs.core.str(p1__82016_SHARP_)].join('');
});})(esc_chars))
,esc_chars));
})();
/**
 * Escape special characters -- for content-type.
 */
cljs_http.client.escape_special = (function cljs_http$client$escape_special(string){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.replace.cljs$core$IFn$_invoke$arity$2(cljs_http.client.regex_char_esc_smap,string));
});
/**
 * Decocde the :body of `response` with `decode-fn` if the content type matches.
 */
cljs_http.client.decode_body = (function cljs_http$client$decode_body(response,decode_fn,content_type,request_method){
if(cljs.core.truth_((function (){var and__9266__auto__ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$head,request_method);
if(and__9266__auto__){
var and__9266__auto____$1 = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((204),cljs.core.cst$kw$status.cljs$core$IFn$_invoke$arity$1(response));
if(and__9266__auto____$1){
return cljs.core.re_find(cljs.core.re_pattern([cljs.core.str("(?i)"),cljs.core.str(cljs_http.client.escape_special(content_type))].join('')),[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(response),"content-type",""))].join(''));
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(response,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$body], null),decode_fn);
} else {
return response;
}
});
/**
 * Encode :edn-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_edn_params = (function cljs_http$client$wrap_edn_params(client){
return (function (request){
var temp__6726__auto__ = cljs.core.cst$kw$edn_DASH_params.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__6726__auto__)){
var params = temp__6726__auto__;
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/edn"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__82018 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$edn_DASH_params),cljs.core.cst$kw$body,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([params], 0))),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82018) : client.call(null,G__82018));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Decode application/edn responses.
 */
cljs_http.client.wrap_edn_response = (function cljs_http$client$wrap_edn_response(client){
return (function (request){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__82019_SHARP_){
return cljs_http.client.decode_body(p1__82019_SHARP_,cljs.reader.read_string,"application/edn",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_default_headers = (function cljs_http$client$wrap_default_headers(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82027 = arguments.length;
var i__10462__auto___82028 = (0);
while(true){
if((i__10462__auto___82028 < len__10461__auto___82027)){
args__10468__auto__.push((arguments[i__10462__auto___82028]));

var G__82029 = (i__10462__auto___82028 + (1));
i__10462__auto___82028 = G__82029;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__82022){
var vec__82023 = p__82022;
var default_headers = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82023,(0),null);
return ((function (vec__82023,default_headers){
return (function (request){
var temp__6726__auto__ = (function (){var or__9278__auto__ = cljs.core.cst$kw$default_DASH_headers.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return default_headers;
}
})();
if(cljs.core.truth_(temp__6726__auto__)){
var default_headers__$1 = temp__6726__auto__;
var G__82026 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(request,cljs.core.cst$kw$default_DASH_headers,default_headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82026) : client.call(null,G__82026));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__82023,default_headers))
});

cljs_http.client.wrap_default_headers.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_default_headers.cljs$lang$applyTo = (function (seq82020){
var G__82021 = cljs.core.first(seq82020);
var seq82020__$1 = cljs.core.next(seq82020);
return cljs_http.client.wrap_default_headers.cljs$core$IFn$_invoke$arity$variadic(G__82021,seq82020__$1);
});

cljs_http.client.wrap_accept = (function cljs_http$client$wrap_accept(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82037 = arguments.length;
var i__10462__auto___82038 = (0);
while(true){
if((i__10462__auto___82038 < len__10461__auto___82037)){
args__10468__auto__.push((arguments[i__10462__auto___82038]));

var G__82039 = (i__10462__auto___82038 + (1));
i__10462__auto___82038 = G__82039;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__82032){
var vec__82033 = p__82032;
var accept = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82033,(0),null);
return ((function (vec__82033,accept){
return (function (request){
var temp__6726__auto__ = (function (){var or__9278__auto__ = cljs.core.cst$kw$accept.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return accept;
}
})();
if(cljs.core.truth_(temp__6726__auto__)){
var accept__$1 = temp__6726__auto__;
var G__82036 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"accept"], null),accept__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82036) : client.call(null,G__82036));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__82033,accept))
});

cljs_http.client.wrap_accept.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_accept.cljs$lang$applyTo = (function (seq82030){
var G__82031 = cljs.core.first(seq82030);
var seq82030__$1 = cljs.core.next(seq82030);
return cljs_http.client.wrap_accept.cljs$core$IFn$_invoke$arity$variadic(G__82031,seq82030__$1);
});

cljs_http.client.wrap_content_type = (function cljs_http$client$wrap_content_type(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82047 = arguments.length;
var i__10462__auto___82048 = (0);
while(true){
if((i__10462__auto___82048 < len__10461__auto___82047)){
args__10468__auto__.push((arguments[i__10462__auto___82048]));

var G__82049 = (i__10462__auto___82048 + (1));
i__10462__auto___82048 = G__82049;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__82042){
var vec__82043 = p__82042;
var content_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82043,(0),null);
return ((function (vec__82043,content_type){
return (function (request){
var temp__6726__auto__ = (function (){var or__9278__auto__ = cljs.core.cst$kw$content_DASH_type.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return content_type;
}
})();
if(cljs.core.truth_(temp__6726__auto__)){
var content_type__$1 = temp__6726__auto__;
var G__82046 = cljs.core.assoc_in(request,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"content-type"], null),content_type__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82046) : client.call(null,G__82046));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
;})(vec__82043,content_type))
});

cljs_http.client.wrap_content_type.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_content_type.cljs$lang$applyTo = (function (seq82040){
var G__82041 = cljs.core.first(seq82040);
var seq82040__$1 = cljs.core.next(seq82040);
return cljs_http.client.wrap_content_type.cljs$core$IFn$_invoke$arity$variadic(G__82041,seq82040__$1);
});

cljs_http.client.default_transit_opts = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$encoding,cljs.core.cst$kw$json,cljs.core.cst$kw$encoding_DASH_opts,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$decoding,cljs.core.cst$kw$json,cljs.core.cst$kw$decoding_DASH_opts,cljs.core.PersistentArrayMap.EMPTY], null);
/**
 * Encode :transit-params in the `request` :body and set the appropriate
 *   Content Type header.
 * 
 *   A :transit-opts map can be optionally provided with the following keys:
 * 
 *   :encoding                #{:json, :json-verbose}
 *   :decoding                #{:json, :json-verbose}
 *   :encoding/decoding-opts  appropriate map of options to be passed to
 *                         transit writer/reader, respectively.
 */
cljs_http.client.wrap_transit_params = (function cljs_http$client$wrap_transit_params(client){
return (function (request){
var temp__6726__auto__ = cljs.core.cst$kw$transit_DASH_params.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__6726__auto__)){
var params = temp__6726__auto__;
var map__82053 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__82053__$1 = ((((!((map__82053 == null)))?((((map__82053.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82053.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82053):map__82053);
var encoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82053__$1,cljs.core.cst$kw$encoding);
var encoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82053__$1,cljs.core.cst$kw$encoding_DASH_opts);
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/transit+json"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__82055 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$transit_DASH_params),cljs.core.cst$kw$body,cljs_http.util.transit_encode(params,encoding,encoding_opts)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82055) : client.call(null,G__82055));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Decode application/transit+json responses.
 */
cljs_http.client.wrap_transit_response = (function cljs_http$client$wrap_transit_response(client){
return (function (request){
var map__82060 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs_http.client.default_transit_opts,cljs.core.cst$kw$transit_DASH_opts.cljs$core$IFn$_invoke$arity$1(request)], 0));
var map__82060__$1 = ((((!((map__82060 == null)))?((((map__82060.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82060.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82060):map__82060);
var decoding = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82060__$1,cljs.core.cst$kw$decoding);
var decoding_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82060__$1,cljs.core.cst$kw$decoding_DASH_opts);
var transit_decode = ((function (map__82060,map__82060__$1,decoding,decoding_opts){
return (function (p1__82056_SHARP_){
return cljs_http.util.transit_decode(p1__82056_SHARP_,decoding,decoding_opts);
});})(map__82060,map__82060__$1,decoding,decoding_opts))
;
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2(((function (map__82060,map__82060__$1,decoding,decoding_opts,transit_decode){
return (function (p1__82057_SHARP_){
return cljs_http.client.decode_body(p1__82057_SHARP_,transit_decode,"application/transit+json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
});})(map__82060,map__82060__$1,decoding,decoding_opts,transit_decode))
,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
/**
 * Encode :json-params in the `request` :body and set the appropriate
 *   Content Type header.
 */
cljs_http.client.wrap_json_params = (function cljs_http$client$wrap_json_params(client){
return (function (request){
var temp__6726__auto__ = cljs.core.cst$kw$json_DASH_params.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__6726__auto__)){
var params = temp__6726__auto__;
var headers = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/json"], null),cljs.core.cst$kw$headers.cljs$core$IFn$_invoke$arity$1(request)], 0));
var G__82063 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$json_DASH_params),cljs.core.cst$kw$body,cljs_http.util.json_encode(params)),cljs.core.cst$kw$headers,headers);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82063) : client.call(null,G__82063));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Decode application/json responses.
 */
cljs_http.client.wrap_json_response = (function cljs_http$client$wrap_json_response(client){
return (function (request){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((function (p1__82064_SHARP_){
return cljs_http.client.decode_body(p1__82064_SHARP_,cljs_http.util.json_decode,"application/json",cljs.core.cst$kw$request_DASH_method.cljs$core$IFn$_invoke$arity$1(request));
}),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request))], null));
});
});
cljs_http.client.wrap_query_params = (function cljs_http$client$wrap_query_params(client){
return (function (p__82069){
var map__82070 = p__82069;
var map__82070__$1 = ((((!((map__82070 == null)))?((((map__82070.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82070.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82070):map__82070);
var req = map__82070__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82070__$1,cljs.core.cst$kw$query_DASH_params);
if(cljs.core.truth_(query_params)){
var G__82072 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$query_DASH_params),cljs.core.cst$kw$query_DASH_string,cljs_http.client.generate_query_string(query_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82072) : client.call(null,G__82072));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_form_params = (function cljs_http$client$wrap_form_params(client){
return (function (p__82077){
var map__82078 = p__82077;
var map__82078__$1 = ((((!((map__82078 == null)))?((((map__82078.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82078.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82078):map__82078);
var request = map__82078__$1;
var form_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82078__$1,cljs.core.cst$kw$form_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82078__$1,cljs.core.cst$kw$request_DASH_method);
var headers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82078__$1,cljs.core.cst$kw$headers);
if(cljs.core.truth_((function (){var and__9266__auto__ = form_params;
if(cljs.core.truth_(and__9266__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__9266__auto__;
}
})())){
var headers__$1 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, ["content-type","application/x-www-form-urlencoded"], null),headers], 0));
var G__82080 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$form_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_query_string(form_params)),cljs.core.cst$kw$headers,headers__$1);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82080) : client.call(null,G__82080));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
cljs_http.client.generate_form_data = (function cljs_http$client$generate_form_data(params){
var form_data = (new FormData());
var seq__82091_82101 = cljs.core.seq(params);
var chunk__82092_82102 = null;
var count__82093_82103 = (0);
var i__82094_82104 = (0);
while(true){
if((i__82094_82104 < count__82093_82103)){
var vec__82095_82105 = chunk__82092_82102.cljs$core$IIndexed$_nth$arity$2(null,i__82094_82104);
var k_82106 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82095_82105,(0),null);
var v_82107 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82095_82105,(1),null);
if(cljs.core.coll_QMARK_(v_82107)){
form_data.append(cljs.core.name(k_82106),cljs.core.first(v_82107),cljs.core.second(v_82107));
} else {
form_data.append(cljs.core.name(k_82106),v_82107);
}

var G__82108 = seq__82091_82101;
var G__82109 = chunk__82092_82102;
var G__82110 = count__82093_82103;
var G__82111 = (i__82094_82104 + (1));
seq__82091_82101 = G__82108;
chunk__82092_82102 = G__82109;
count__82093_82103 = G__82110;
i__82094_82104 = G__82111;
continue;
} else {
var temp__6728__auto___82112 = cljs.core.seq(seq__82091_82101);
if(temp__6728__auto___82112){
var seq__82091_82113__$1 = temp__6728__auto___82112;
if(cljs.core.chunked_seq_QMARK_(seq__82091_82113__$1)){
var c__10181__auto___82114 = cljs.core.chunk_first(seq__82091_82113__$1);
var G__82115 = cljs.core.chunk_rest(seq__82091_82113__$1);
var G__82116 = c__10181__auto___82114;
var G__82117 = cljs.core.count(c__10181__auto___82114);
var G__82118 = (0);
seq__82091_82101 = G__82115;
chunk__82092_82102 = G__82116;
count__82093_82103 = G__82117;
i__82094_82104 = G__82118;
continue;
} else {
var vec__82098_82119 = cljs.core.first(seq__82091_82113__$1);
var k_82120 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82098_82119,(0),null);
var v_82121 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82098_82119,(1),null);
if(cljs.core.coll_QMARK_(v_82121)){
form_data.append(cljs.core.name(k_82120),cljs.core.first(v_82121),cljs.core.second(v_82121));
} else {
form_data.append(cljs.core.name(k_82120),v_82121);
}

var G__82122 = cljs.core.next(seq__82091_82113__$1);
var G__82123 = null;
var G__82124 = (0);
var G__82125 = (0);
seq__82091_82101 = G__82122;
chunk__82092_82102 = G__82123;
count__82093_82103 = G__82124;
i__82094_82104 = G__82125;
continue;
}
} else {
}
}
break;
}

return form_data;
});
cljs_http.client.wrap_multipart_params = (function cljs_http$client$wrap_multipart_params(client){
return (function (p__82130){
var map__82131 = p__82130;
var map__82131__$1 = ((((!((map__82131 == null)))?((((map__82131.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82131.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82131):map__82131);
var request = map__82131__$1;
var multipart_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82131__$1,cljs.core.cst$kw$multipart_DASH_params);
var request_method = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82131__$1,cljs.core.cst$kw$request_DASH_method);
if(cljs.core.truth_((function (){var and__9266__auto__ = multipart_params;
if(cljs.core.truth_(and__9266__auto__)){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$patch,null,cljs.core.cst$kw$delete,null,cljs.core.cst$kw$post,null,cljs.core.cst$kw$put,null], null), null).call(null,request_method);
} else {
return and__9266__auto__;
}
})())){
var G__82133 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(request,cljs.core.cst$kw$multipart_DASH_params),cljs.core.cst$kw$body,cljs_http.client.generate_form_data(multipart_params));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82133) : client.call(null,G__82133));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
cljs_http.client.wrap_method = (function cljs_http$client$wrap_method(client){
return (function (req){
var temp__6726__auto__ = cljs.core.cst$kw$method.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__6726__auto__)){
var m = temp__6726__auto__;
var G__82135 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$method),cljs.core.cst$kw$request_DASH_method,m);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82135) : client.call(null,G__82135));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
cljs_http.client.wrap_server_name = (function cljs_http$client$wrap_server_name(client,server_name){
return (function (p1__82136_SHARP_){
var G__82138 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__82136_SHARP_,cljs.core.cst$kw$server_DASH_name,server_name);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82138) : client.call(null,G__82138));
});
});
cljs_http.client.wrap_url = (function cljs_http$client$wrap_url(client){
return (function (p__82144){
var map__82145 = p__82144;
var map__82145__$1 = ((((!((map__82145 == null)))?((((map__82145.cljs$lang$protocol_mask$partition0$ & (64))) || (map__82145.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__82145):map__82145);
var req = map__82145__$1;
var query_params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__82145__$1,cljs.core.cst$kw$query_DASH_params);
var temp__6726__auto__ = cljs_http.client.parse_url(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(req));
if(cljs.core.truth_(temp__6726__auto__)){
var spec = temp__6726__auto__;
var G__82147 = cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,spec], 0)),cljs.core.cst$kw$url),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$query_DASH_params], null),((function (spec,temp__6726__auto__,map__82145,map__82145__$1,req,query_params){
return (function (p1__82139_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([p1__82139_SHARP_,query_params], 0));
});})(spec,temp__6726__auto__,map__82145,map__82145__$1,req,query_params))
);
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82147) : client.call(null,G__82147));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
/**
 * Middleware converting the :basic-auth option or `credentials` into
 *   an Authorization header.
 */
cljs_http.client.wrap_basic_auth = (function cljs_http$client$wrap_basic_auth(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82155 = arguments.length;
var i__10462__auto___82156 = (0);
while(true){
if((i__10462__auto___82156 < len__10461__auto___82155)){
args__10468__auto__.push((arguments[i__10462__auto___82156]));

var G__82157 = (i__10462__auto___82156 + (1));
i__10462__auto___82156 = G__82157;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic = (function (client,p__82150){
var vec__82151 = p__82150;
var credentials = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82151,(0),null);
return ((function (vec__82151,credentials){
return (function (req){
var credentials__$1 = (function (){var or__9278__auto__ = cljs.core.cst$kw$basic_DASH_auth.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return credentials;
}
})();
if(!(cljs.core.empty_QMARK_(credentials__$1))){
var G__82154 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$basic_DASH_auth),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),cljs_http.util.basic_auth(credentials__$1));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82154) : client.call(null,G__82154));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
;})(vec__82151,credentials))
});

cljs_http.client.wrap_basic_auth.cljs$lang$maxFixedArity = (1);

cljs_http.client.wrap_basic_auth.cljs$lang$applyTo = (function (seq82148){
var G__82149 = cljs.core.first(seq82148);
var seq82148__$1 = cljs.core.next(seq82148);
return cljs_http.client.wrap_basic_auth.cljs$core$IFn$_invoke$arity$variadic(G__82149,seq82148__$1);
});

/**
 * Middleware converting the :oauth-token option into an Authorization header.
 */
cljs_http.client.wrap_oauth = (function cljs_http$client$wrap_oauth(client){
return (function (req){
var temp__6726__auto__ = cljs.core.cst$kw$oauth_DASH_token.cljs$core$IFn$_invoke$arity$1(req);
if(cljs.core.truth_(temp__6726__auto__)){
var oauth_token = temp__6726__auto__;
var G__82159 = cljs.core.assoc_in(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(req,cljs.core.cst$kw$oauth_DASH_token),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$headers,"authorization"], null),[cljs.core.str("Bearer "),cljs.core.str(oauth_token)].join(''));
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(G__82159) : client.call(null,G__82159));
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(req) : client.call(null,req));
}
});
});
/**
 * Pipe the response-channel into the request-map's
 * custom channel (e.g. to enable transducers)
 */
cljs_http.client.wrap_channel_from_request_map = (function cljs_http$client$wrap_channel_from_request_map(client){
return (function (request){
var temp__6726__auto__ = cljs.core.cst$kw$channel.cljs$core$IFn$_invoke$arity$1(request);
if(cljs.core.truth_(temp__6726__auto__)){
var custom_channel = temp__6726__auto__;
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request)),custom_channel);
} else {
return (client.cljs$core$IFn$_invoke$arity$1 ? client.cljs$core$IFn$_invoke$arity$1(request) : client.call(null,request));
}
});
});
/**
 * Returns a batteries-included HTTP request function coresponding to the given
 * core client. See client/request
 */
cljs_http.client.wrap_request = (function cljs_http$client$wrap_request(request){
return cljs_http.client.wrap_default_headers(cljs_http.client.wrap_channel_from_request_map(cljs_http.client.wrap_url(cljs_http.client.wrap_method(cljs_http.client.wrap_oauth(cljs_http.client.wrap_basic_auth(cljs_http.client.wrap_query_params(cljs_http.client.wrap_content_type(cljs_http.client.wrap_json_response(cljs_http.client.wrap_json_params(cljs_http.client.wrap_transit_response(cljs_http.client.wrap_transit_params(cljs_http.client.wrap_edn_response(cljs_http.client.wrap_edn_params(cljs_http.client.wrap_multipart_params(cljs_http.client.wrap_form_params(cljs_http.client.wrap_accept(request)))))))))))))))));
});
/**
 * Executes the HTTP request corresponding to the given map and returns the
 * response map for corresponding to the resulting HTTP response.
 * 
 * In addition to the standard Ring request keys, the following keys are also
 * recognized:
 * * :url
 * * :method
 * * :query-params
 */
cljs_http.client.request = cljs_http.client.wrap_request(cljs_http.core.request);
/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.delete$ = (function cljs_http$client$delete(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82167 = arguments.length;
var i__10462__auto___82168 = (0);
while(true){
if((i__10462__auto___82168 < len__10461__auto___82167)){
args__10468__auto__.push((arguments[i__10462__auto___82168]));

var G__82169 = (i__10462__auto___82168 + (1));
i__10462__auto___82168 = G__82169;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82162){
var vec__82163 = p__82162;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82163,(0),null);
var G__82166 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$delete,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82166) : cljs_http.client.request.call(null,G__82166));
});

cljs_http.client.delete$.cljs$lang$maxFixedArity = (1);

cljs_http.client.delete$.cljs$lang$applyTo = (function (seq82160){
var G__82161 = cljs.core.first(seq82160);
var seq82160__$1 = cljs.core.next(seq82160);
return cljs_http.client.delete$.cljs$core$IFn$_invoke$arity$variadic(G__82161,seq82160__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.get = (function cljs_http$client$get(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82177 = arguments.length;
var i__10462__auto___82178 = (0);
while(true){
if((i__10462__auto___82178 < len__10461__auto___82177)){
args__10468__auto__.push((arguments[i__10462__auto___82178]));

var G__82179 = (i__10462__auto___82178 + (1));
i__10462__auto___82178 = G__82179;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82172){
var vec__82173 = p__82172;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82173,(0),null);
var G__82176 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$get,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82176) : cljs_http.client.request.call(null,G__82176));
});

cljs_http.client.get.cljs$lang$maxFixedArity = (1);

cljs_http.client.get.cljs$lang$applyTo = (function (seq82170){
var G__82171 = cljs.core.first(seq82170);
var seq82170__$1 = cljs.core.next(seq82170);
return cljs_http.client.get.cljs$core$IFn$_invoke$arity$variadic(G__82171,seq82170__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.head = (function cljs_http$client$head(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82187 = arguments.length;
var i__10462__auto___82188 = (0);
while(true){
if((i__10462__auto___82188 < len__10461__auto___82187)){
args__10468__auto__.push((arguments[i__10462__auto___82188]));

var G__82189 = (i__10462__auto___82188 + (1));
i__10462__auto___82188 = G__82189;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82182){
var vec__82183 = p__82182;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82183,(0),null);
var G__82186 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$head,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82186) : cljs_http.client.request.call(null,G__82186));
});

cljs_http.client.head.cljs$lang$maxFixedArity = (1);

cljs_http.client.head.cljs$lang$applyTo = (function (seq82180){
var G__82181 = cljs.core.first(seq82180);
var seq82180__$1 = cljs.core.next(seq82180);
return cljs_http.client.head.cljs$core$IFn$_invoke$arity$variadic(G__82181,seq82180__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.jsonp = (function cljs_http$client$jsonp(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82197 = arguments.length;
var i__10462__auto___82198 = (0);
while(true){
if((i__10462__auto___82198 < len__10461__auto___82197)){
args__10468__auto__.push((arguments[i__10462__auto___82198]));

var G__82199 = (i__10462__auto___82198 + (1));
i__10462__auto___82198 = G__82199;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82192){
var vec__82193 = p__82192;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82193,(0),null);
var G__82196 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$jsonp,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82196) : cljs_http.client.request.call(null,G__82196));
});

cljs_http.client.jsonp.cljs$lang$maxFixedArity = (1);

cljs_http.client.jsonp.cljs$lang$applyTo = (function (seq82190){
var G__82191 = cljs.core.first(seq82190);
var seq82190__$1 = cljs.core.next(seq82190);
return cljs_http.client.jsonp.cljs$core$IFn$_invoke$arity$variadic(G__82191,seq82190__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.move = (function cljs_http$client$move(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82207 = arguments.length;
var i__10462__auto___82208 = (0);
while(true){
if((i__10462__auto___82208 < len__10461__auto___82207)){
args__10468__auto__.push((arguments[i__10462__auto___82208]));

var G__82209 = (i__10462__auto___82208 + (1));
i__10462__auto___82208 = G__82209;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82202){
var vec__82203 = p__82202;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82203,(0),null);
var G__82206 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$move,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82206) : cljs_http.client.request.call(null,G__82206));
});

cljs_http.client.move.cljs$lang$maxFixedArity = (1);

cljs_http.client.move.cljs$lang$applyTo = (function (seq82200){
var G__82201 = cljs.core.first(seq82200);
var seq82200__$1 = cljs.core.next(seq82200);
return cljs_http.client.move.cljs$core$IFn$_invoke$arity$variadic(G__82201,seq82200__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.options = (function cljs_http$client$options(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82217 = arguments.length;
var i__10462__auto___82218 = (0);
while(true){
if((i__10462__auto___82218 < len__10461__auto___82217)){
args__10468__auto__.push((arguments[i__10462__auto___82218]));

var G__82219 = (i__10462__auto___82218 + (1));
i__10462__auto___82218 = G__82219;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82212){
var vec__82213 = p__82212;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82213,(0),null);
var G__82216 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$options,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82216) : cljs_http.client.request.call(null,G__82216));
});

cljs_http.client.options.cljs$lang$maxFixedArity = (1);

cljs_http.client.options.cljs$lang$applyTo = (function (seq82210){
var G__82211 = cljs.core.first(seq82210);
var seq82210__$1 = cljs.core.next(seq82210);
return cljs_http.client.options.cljs$core$IFn$_invoke$arity$variadic(G__82211,seq82210__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.patch = (function cljs_http$client$patch(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82227 = arguments.length;
var i__10462__auto___82228 = (0);
while(true){
if((i__10462__auto___82228 < len__10461__auto___82227)){
args__10468__auto__.push((arguments[i__10462__auto___82228]));

var G__82229 = (i__10462__auto___82228 + (1));
i__10462__auto___82228 = G__82229;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82222){
var vec__82223 = p__82222;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82223,(0),null);
var G__82226 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$patch,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82226) : cljs_http.client.request.call(null,G__82226));
});

cljs_http.client.patch.cljs$lang$maxFixedArity = (1);

cljs_http.client.patch.cljs$lang$applyTo = (function (seq82220){
var G__82221 = cljs.core.first(seq82220);
var seq82220__$1 = cljs.core.next(seq82220);
return cljs_http.client.patch.cljs$core$IFn$_invoke$arity$variadic(G__82221,seq82220__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.post = (function cljs_http$client$post(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82237 = arguments.length;
var i__10462__auto___82238 = (0);
while(true){
if((i__10462__auto___82238 < len__10461__auto___82237)){
args__10468__auto__.push((arguments[i__10462__auto___82238]));

var G__82239 = (i__10462__auto___82238 + (1));
i__10462__auto___82238 = G__82239;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82232){
var vec__82233 = p__82232;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82233,(0),null);
var G__82236 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$post,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82236) : cljs_http.client.request.call(null,G__82236));
});

cljs_http.client.post.cljs$lang$maxFixedArity = (1);

cljs_http.client.post.cljs$lang$applyTo = (function (seq82230){
var G__82231 = cljs.core.first(seq82230);
var seq82230__$1 = cljs.core.next(seq82230);
return cljs_http.client.post.cljs$core$IFn$_invoke$arity$variadic(G__82231,seq82230__$1);
});

/**
 * Like #'request, but sets the :method and :url as appropriate.
 */
cljs_http.client.put = (function cljs_http$client$put(var_args){
var args__10468__auto__ = [];
var len__10461__auto___82247 = arguments.length;
var i__10462__auto___82248 = (0);
while(true){
if((i__10462__auto___82248 < len__10461__auto___82247)){
args__10468__auto__.push((arguments[i__10462__auto___82248]));

var G__82249 = (i__10462__auto___82248 + (1));
i__10462__auto___82248 = G__82249;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic = (function (url,p__82242){
var vec__82243 = p__82242;
var req = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__82243,(0),null);
var G__82246 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([req,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$method,cljs.core.cst$kw$put,cljs.core.cst$kw$url,url], null)], 0));
return (cljs_http.client.request.cljs$core$IFn$_invoke$arity$1 ? cljs_http.client.request.cljs$core$IFn$_invoke$arity$1(G__82246) : cljs_http.client.request.call(null,G__82246));
});

cljs_http.client.put.cljs$lang$maxFixedArity = (1);

cljs_http.client.put.cljs$lang$applyTo = (function (seq82240){
var G__82241 = cljs.core.first(seq82240);
var seq82240__$1 = cljs.core.next(seq82240);
return cljs_http.client.put.cljs$core$IFn$_invoke$arity$variadic(G__82241,seq82240__$1);
});

