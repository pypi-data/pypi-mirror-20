// Compiled by ClojureScript 1.7.228 {:static-fns true, :optimize-constants true}
goog.provide('clojure.browser.repl');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.userAgent.product');
goog.require('goog.array');
goog.require('goog.object');
goog.require('clojure.browser.net');
goog.require('clojure.browser.event');
goog.require('cljs.repl');
clojure.browser.repl.xpc_connection = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
clojure.browser.repl.print_queue = [];
clojure.browser.repl.flush_print_queue_BANG_ = (function clojure$browser$repl$flush_print_queue_BANG_(conn){
var seq__65876_65880 = cljs.core.seq(clojure.browser.repl.print_queue);
var chunk__65877_65881 = null;
var count__65878_65882 = (0);
var i__65879_65883 = (0);
while(true){
if((i__65879_65883 < count__65878_65882)){
var str_65884 = chunk__65877_65881.cljs$core$IIndexed$_nth$arity$2(null,i__65879_65883);
clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(conn,cljs.core.cst$kw$print,str_65884);

var G__65885 = seq__65876_65880;
var G__65886 = chunk__65877_65881;
var G__65887 = count__65878_65882;
var G__65888 = (i__65879_65883 + (1));
seq__65876_65880 = G__65885;
chunk__65877_65881 = G__65886;
count__65878_65882 = G__65887;
i__65879_65883 = G__65888;
continue;
} else {
var temp__4657__auto___65889 = cljs.core.seq(seq__65876_65880);
if(temp__4657__auto___65889){
var seq__65876_65890__$1 = temp__4657__auto___65889;
if(cljs.core.chunked_seq_QMARK_(seq__65876_65890__$1)){
var c__6956__auto___65891 = cljs.core.chunk_first(seq__65876_65890__$1);
var G__65892 = cljs.core.chunk_rest(seq__65876_65890__$1);
var G__65893 = c__6956__auto___65891;
var G__65894 = cljs.core.count(c__6956__auto___65891);
var G__65895 = (0);
seq__65876_65880 = G__65892;
chunk__65877_65881 = G__65893;
count__65878_65882 = G__65894;
i__65879_65883 = G__65895;
continue;
} else {
var str_65896 = cljs.core.first(seq__65876_65890__$1);
clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(conn,cljs.core.cst$kw$print,str_65896);

var G__65897 = cljs.core.next(seq__65876_65890__$1);
var G__65898 = null;
var G__65899 = (0);
var G__65900 = (0);
seq__65876_65880 = G__65897;
chunk__65877_65881 = G__65898;
count__65878_65882 = G__65899;
i__65879_65883 = G__65900;
continue;
}
} else {
}
}
break;
}

return goog.array.clear(clojure.browser.repl.print_queue);
});
clojure.browser.repl.repl_print = (function clojure$browser$repl$repl_print(data){
clojure.browser.repl.print_queue.push(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([data], 0)));

var temp__4657__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(clojure.browser.repl.xpc_connection) : cljs.core.deref.call(null,clojure.browser.repl.xpc_connection));
if(cljs.core.truth_(temp__4657__auto__)){
var conn = temp__4657__auto__;
return clojure.browser.repl.flush_print_queue_BANG_(conn);
} else {
return null;
}
});
cljs.core._STAR_print_fn_STAR_ = clojure.browser.repl.repl_print;
cljs.core._STAR_print_err_fn_STAR_ = clojure.browser.repl.repl_print;
cljs.core._STAR_print_newline_STAR_ = true;
clojure.browser.repl.get_ua_product = (function clojure$browser$repl$get_ua_product(){
if(cljs.core.truth_(goog.userAgent.product.SAFARI)){
return cljs.core.cst$kw$safari;
} else {
if(cljs.core.truth_(goog.userAgent.product.CHROME)){
return cljs.core.cst$kw$chrome;
} else {
if(cljs.core.truth_(goog.userAgent.product.FIREFOX)){
return cljs.core.cst$kw$firefox;
} else {
if(cljs.core.truth_(goog.userAgent.product.IE)){
return cljs.core.cst$kw$ie;
} else {
return null;
}
}
}
}
});
/**
 * Process a single block of JavaScript received from the server
 */
clojure.browser.repl.evaluate_javascript = (function clojure$browser$repl$evaluate_javascript(conn,block){
var result = (function (){try{return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$status,cljs.core.cst$kw$success,cljs.core.cst$kw$value,[cljs.core.str(eval(block))].join('')], null);
}catch (e65902){var e = e65902;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$status,cljs.core.cst$kw$exception,cljs.core.cst$kw$ua_DASH_product,clojure.browser.repl.get_ua_product(),cljs.core.cst$kw$value,[cljs.core.str(e)].join(''),cljs.core.cst$kw$stacktrace,(cljs.core.truth_(e.hasOwnProperty("stack"))?e.stack:"No stacktrace available.")], null);
}})();
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([result], 0));
});
clojure.browser.repl.send_result = (function clojure$browser$repl$send_result(connection,url,data){
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(connection,url,"POST",data,null,(0));
});
/**
 * Send data to be printed in the REPL. If there is an error, try again
 *   up to 10 times.
 */
clojure.browser.repl.send_print = (function clojure$browser$repl$send_print(var_args){
var args65903 = [];
var len__7211__auto___65906 = arguments.length;
var i__7212__auto___65907 = (0);
while(true){
if((i__7212__auto___65907 < len__7211__auto___65906)){
args65903.push((arguments[i__7212__auto___65907]));

var G__65908 = (i__7212__auto___65907 + (1));
i__7212__auto___65907 = G__65908;
continue;
} else {
}
break;
}

var G__65905 = args65903.length;
switch (G__65905) {
case 2:
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args65903.length)].join('')));

}
});

clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$2 = (function (url,data){
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3(url,data,(0));
});

clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3 = (function (url,data,n){
var conn = clojure.browser.net.xhr_connection();
clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3(conn,cljs.core.cst$kw$error,((function (conn){
return (function (_){
if((n < (10))){
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$3(url,data,(n + (1)));
} else {
return console.log([cljs.core.str("Could not send "),cljs.core.str(data),cljs.core.str(" after "),cljs.core.str(n),cljs.core.str(" attempts.")].join(''));
}
});})(conn))
);

return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$6(conn,url,"POST",data,null,(0));
});

clojure.browser.repl.send_print.cljs$lang$maxFixedArity = 3;
clojure.browser.repl.order = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)) : cljs.core.atom.call(null,(0)));
clojure.browser.repl.wrap_message = (function clojure$browser$repl$wrap_message(t,data){
return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$type,t,cljs.core.cst$kw$content,data,cljs.core.cst$kw$order,cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(clojure.browser.repl.order,cljs.core.inc)], null)], 0));
});
/**
 * Start the REPL server connection.
 */
clojure.browser.repl.start_evaluator = (function clojure$browser$repl$start_evaluator(url){
var temp__4655__auto__ = clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__4655__auto__)){
var repl_connection = temp__4655__auto__;
var connection = clojure.browser.net.xhr_connection();
clojure.browser.event.listen.cljs$core$IFn$_invoke$arity$3(connection,cljs.core.cst$kw$success,((function (connection,repl_connection,temp__4655__auto__){
return (function (e){
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.cst$kw$evaluate_DASH_javascript,e.currentTarget.getResponseText(cljs.core.List.EMPTY));
});})(connection,repl_connection,temp__4655__auto__))
);

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.cst$kw$send_DASH_result,((function (connection,repl_connection,temp__4655__auto__){
return (function (data){
return clojure.browser.repl.send_result(connection,url,clojure.browser.repl.wrap_message(cljs.core.cst$kw$result,data));
});})(connection,repl_connection,temp__4655__auto__))
);

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.cst$kw$print,((function (connection,repl_connection,temp__4655__auto__){
return (function (data){
return clojure.browser.repl.send_print.cljs$core$IFn$_invoke$arity$2(url,clojure.browser.repl.wrap_message(cljs.core.cst$kw$print,data));
});})(connection,repl_connection,temp__4655__auto__))
);

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$2(repl_connection,cljs.core.constantly(null));

var G__65912 = ((function (connection,repl_connection,temp__4655__auto__){
return (function (){
return clojure.browser.repl.send_result(connection,url,clojure.browser.repl.wrap_message(cljs.core.cst$kw$ready,"ready"));
});})(connection,repl_connection,temp__4655__auto__))
;
var G__65913 = (50);
return setTimeout(G__65912,G__65913);
} else {
return alert("No 'xpc' param provided to child iframe.");
}
});
clojure.browser.repl.load_queue = null;
/**
 * Reusable browser REPL bootstrapping. Patches the essential functions
 *   in goog.base to support re-loading of namespaces after page load.
 */
clojure.browser.repl.bootstrap = (function clojure$browser$repl$bootstrap(){
if(cljs.core.truth_(COMPILED)){
return null;
} else {
goog.require__ = goog.require;

goog.isProvided_ = (function (name){
return false;
});

goog.constructNamespace_("cljs.user");

goog.writeScriptTag__ = (function (src,opt_sourceText){
var loaded = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
var onload = ((function (loaded){
return (function (){
if(cljs.core.truth_((function (){var and__6141__auto__ = clojure.browser.repl.load_queue;
if(cljs.core.truth_(and__6141__auto__)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(loaded) : cljs.core.deref.call(null,loaded)) === false;
} else {
return and__6141__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(loaded,cljs.core.not);

if((clojure.browser.repl.load_queue.length === (0))){
return clojure.browser.repl.load_queue = null;
} else {
return goog.writeScriptTag__.apply(null,clojure.browser.repl.load_queue.shift());
}
} else {
return null;
}
});})(loaded))
;
return document.body.appendChild((function (){var script = document.createElement("script");
var script__$1 = (function (){var G__65919 = script;
goog.object.set(G__65919,"type","text/javascript");

goog.object.set(G__65919,"onload",onload);

goog.object.set(G__65919,"onreadystatechange",onload);

return G__65919;
})();
if((opt_sourceText == null)){
var G__65920 = script__$1;
goog.object.set(G__65920,"src",src);

return G__65920;
} else {
var G__65921 = script__$1;
goog.dom.setTextContext(G__65921,opt_sourceText);

return G__65921;
}
})());
});

goog.writeScriptTag_ = (function (src,opt_sourceText){
if(cljs.core.truth_(clojure.browser.repl.load_queue)){
return clojure.browser.repl.load_queue.push([src,opt_sourceText]);
} else {
clojure.browser.repl.load_queue = [];

return goog.writeScriptTag__(src,opt_sourceText);
}
});

return goog.require = (function (src,reload){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(reload,"reload-all")){
goog.cljsReloadAll_ = true;
} else {
}

var reload_QMARK_ = (function (){var or__6153__auto__ = reload;
if(cljs.core.truth_(or__6153__auto__)){
return or__6153__auto__;
} else {
return goog.cljsReloadAll__;
}
})();
if(cljs.core.truth_(reload_QMARK_)){
var path_65924 = (goog.dependencies_.nameToPath[src]);
goog.object.remove(goog.dependencies_.visited,path_65924);

goog.object.remove(goog.dependencies_.written,path_65924);

var G__65922_65925 = goog.dependencies_.written;
var G__65923_65926 = [cljs.core.str(goog.basePath),cljs.core.str(path_65924)].join('');
goog.object.remove(G__65922_65925,G__65923_65926);
} else {
}

var ret = goog.require__(src);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(reload,"reload-all")){
goog.cljsReloadAll_ = false;
} else {
}

return ret;
});
}
});
/**
 * Connects to a REPL server from an HTML document. After the
 *   connection is made, the REPL will evaluate forms in the context of
 *   the document that called this function.
 */
clojure.browser.repl.connect = (function clojure$browser$repl$connect(repl_server_url){
var repl_connection = clojure.browser.net.xpc_connection.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$peer_uri,repl_server_url], null));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(clojure.browser.repl.xpc_connection,cljs.core.constantly(repl_connection));

clojure.browser.net.register_service.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.cst$kw$evaluate_DASH_javascript,((function (repl_connection){
return (function (js){
return clojure.browser.net.transmit.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.cst$kw$send_DASH_result,clojure.browser.repl.evaluate_javascript(repl_connection,js));
});})(repl_connection))
);

clojure.browser.net.connect.cljs$core$IFn$_invoke$arity$3(repl_connection,cljs.core.constantly(null),((function (repl_connection){
return (function (iframe){
return iframe.style.display = "none";
});})(repl_connection))
);

clojure.browser.repl.bootstrap();

return repl_connection;
});
