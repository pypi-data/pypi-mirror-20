// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('cljs.repl');
goog.require('cljs.core');
goog.require('cljs.spec');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__68362){
var map__68387 = p__68362;
var map__68387__$1 = ((((!((map__68387 == null)))?((((map__68387.cljs$lang$protocol_mask$partition0$ & (64))) || (map__68387.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__68387):map__68387);
var m = map__68387__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68387__$1,cljs.core.cst$kw$ns);
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68387__$1,cljs.core.cst$kw$name);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str((function (){var temp__6728__auto__ = cljs.core.cst$kw$ns.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__6728__auto__)){
var ns = temp__6728__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m))){
var seq__68389_68411 = cljs.core.seq(cljs.core.cst$kw$forms.cljs$core$IFn$_invoke$arity$1(m));
var chunk__68390_68412 = null;
var count__68391_68413 = (0);
var i__68392_68414 = (0);
while(true){
if((i__68392_68414 < count__68391_68413)){
var f_68415 = chunk__68390_68412.cljs$core$IIndexed$_nth$arity$2(null,i__68392_68414);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_68415], 0));

var G__68416 = seq__68389_68411;
var G__68417 = chunk__68390_68412;
var G__68418 = count__68391_68413;
var G__68419 = (i__68392_68414 + (1));
seq__68389_68411 = G__68416;
chunk__68390_68412 = G__68417;
count__68391_68413 = G__68418;
i__68392_68414 = G__68419;
continue;
} else {
var temp__6728__auto___68420 = cljs.core.seq(seq__68389_68411);
if(temp__6728__auto___68420){
var seq__68389_68421__$1 = temp__6728__auto___68420;
if(cljs.core.chunked_seq_QMARK_(seq__68389_68421__$1)){
var c__10181__auto___68422 = cljs.core.chunk_first(seq__68389_68421__$1);
var G__68423 = cljs.core.chunk_rest(seq__68389_68421__$1);
var G__68424 = c__10181__auto___68422;
var G__68425 = cljs.core.count(c__10181__auto___68422);
var G__68426 = (0);
seq__68389_68411 = G__68423;
chunk__68390_68412 = G__68424;
count__68391_68413 = G__68425;
i__68392_68414 = G__68426;
continue;
} else {
var f_68427 = cljs.core.first(seq__68389_68421__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["  ",f_68427], 0));

var G__68428 = cljs.core.next(seq__68389_68421__$1);
var G__68429 = null;
var G__68430 = (0);
var G__68431 = (0);
seq__68389_68411 = G__68428;
chunk__68390_68412 = G__68429;
count__68391_68413 = G__68430;
i__68392_68414 = G__68431;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m))){
var arglists_68432 = cljs.core.cst$kw$arglists.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__9278__auto__ = cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([arglists_68432], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$sym$quote,cljs.core.first(arglists_68432)))?cljs.core.second(arglists_68432):arglists_68432)], 0));
}
} else {
}
}

if(cljs.core.truth_(cljs.core.cst$kw$special_DASH_form.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,cljs.core.cst$kw$url)){
if(cljs.core.truth_(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(cljs.core.cst$kw$url.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(cljs.core.cst$kw$name.cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(cljs.core.cst$kw$macro.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Macro"], 0));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$repl_DASH_special_DASH_function.cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",cljs.core.cst$kw$doc.cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(cljs.core.cst$kw$protocol.cljs$core$IFn$_invoke$arity$1(m))){
var seq__68393_68433 = cljs.core.seq(cljs.core.cst$kw$methods.cljs$core$IFn$_invoke$arity$1(m));
var chunk__68394_68434 = null;
var count__68395_68435 = (0);
var i__68396_68436 = (0);
while(true){
if((i__68396_68436 < count__68395_68435)){
var vec__68397_68437 = chunk__68394_68434.cljs$core$IIndexed$_nth$arity$2(null,i__68396_68436);
var name_68438 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68397_68437,(0),null);
var map__68400_68439 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68397_68437,(1),null);
var map__68400_68440__$1 = ((((!((map__68400_68439 == null)))?((((map__68400_68439.cljs$lang$protocol_mask$partition0$ & (64))) || (map__68400_68439.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__68400_68439):map__68400_68439);
var doc_68441 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68400_68440__$1,cljs.core.cst$kw$doc);
var arglists_68442 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68400_68440__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name_68438], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists_68442], 0));

if(cljs.core.truth_(doc_68441)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc_68441], 0));
} else {
}

var G__68443 = seq__68393_68433;
var G__68444 = chunk__68394_68434;
var G__68445 = count__68395_68435;
var G__68446 = (i__68396_68436 + (1));
seq__68393_68433 = G__68443;
chunk__68394_68434 = G__68444;
count__68395_68435 = G__68445;
i__68396_68436 = G__68446;
continue;
} else {
var temp__6728__auto___68447 = cljs.core.seq(seq__68393_68433);
if(temp__6728__auto___68447){
var seq__68393_68448__$1 = temp__6728__auto___68447;
if(cljs.core.chunked_seq_QMARK_(seq__68393_68448__$1)){
var c__10181__auto___68449 = cljs.core.chunk_first(seq__68393_68448__$1);
var G__68450 = cljs.core.chunk_rest(seq__68393_68448__$1);
var G__68451 = c__10181__auto___68449;
var G__68452 = cljs.core.count(c__10181__auto___68449);
var G__68453 = (0);
seq__68393_68433 = G__68450;
chunk__68394_68434 = G__68451;
count__68395_68435 = G__68452;
i__68396_68436 = G__68453;
continue;
} else {
var vec__68402_68454 = cljs.core.first(seq__68393_68448__$1);
var name_68455 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68402_68454,(0),null);
var map__68405_68456 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__68402_68454,(1),null);
var map__68405_68457__$1 = ((((!((map__68405_68456 == null)))?((((map__68405_68456.cljs$lang$protocol_mask$partition0$ & (64))) || (map__68405_68456.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__68405_68456):map__68405_68456);
var doc_68458 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68405_68457__$1,cljs.core.cst$kw$doc);
var arglists_68459 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__68405_68457__$1,cljs.core.cst$kw$arglists);
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",name_68455], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",arglists_68459], 0));

if(cljs.core.truth_(doc_68458)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([" ",doc_68458], 0));
} else {
}

var G__68460 = cljs.core.next(seq__68393_68448__$1);
var G__68461 = null;
var G__68462 = (0);
var G__68463 = (0);
seq__68393_68433 = G__68460;
chunk__68394_68434 = G__68461;
count__68395_68435 = G__68462;
i__68396_68436 = G__68463;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__6728__auto__ = cljs.spec.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2([cljs.core.str(cljs.core.ns_name(n))].join(''),cljs.core.name(nm)));
if(cljs.core.truth_(temp__6728__auto__)){
var fnspec = temp__6728__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Spec"], 0));

var seq__68407 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$args,cljs.core.cst$kw$ret,cljs.core.cst$kw$fn], null));
var chunk__68408 = null;
var count__68409 = (0);
var i__68410 = (0);
while(true){
if((i__68410 < count__68409)){
var role = chunk__68408.cljs$core$IIndexed$_nth$arity$2(null,i__68410);
var temp__6728__auto___68464__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__6728__auto___68464__$1)){
var spec_68465 = temp__6728__auto___68464__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n "),cljs.core.str(cljs.core.name(role)),cljs.core.str(":")].join(''),cljs.spec.describe(spec_68465)], 0));
} else {
}

var G__68466 = seq__68407;
var G__68467 = chunk__68408;
var G__68468 = count__68409;
var G__68469 = (i__68410 + (1));
seq__68407 = G__68466;
chunk__68408 = G__68467;
count__68409 = G__68468;
i__68410 = G__68469;
continue;
} else {
var temp__6728__auto____$1 = cljs.core.seq(seq__68407);
if(temp__6728__auto____$1){
var seq__68407__$1 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__68407__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__68407__$1);
var G__68470 = cljs.core.chunk_rest(seq__68407__$1);
var G__68471 = c__10181__auto__;
var G__68472 = cljs.core.count(c__10181__auto__);
var G__68473 = (0);
seq__68407 = G__68470;
chunk__68408 = G__68471;
count__68409 = G__68472;
i__68410 = G__68473;
continue;
} else {
var role = cljs.core.first(seq__68407__$1);
var temp__6728__auto___68474__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__6728__auto___68474__$2)){
var spec_68475 = temp__6728__auto___68474__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([[cljs.core.str("\n "),cljs.core.str(cljs.core.name(role)),cljs.core.str(":")].join(''),cljs.spec.describe(spec_68475)], 0));
} else {
}

var G__68476 = cljs.core.next(seq__68407__$1);
var G__68477 = null;
var G__68478 = (0);
var G__68479 = (0);
seq__68407 = G__68476;
chunk__68408 = G__68477;
count__68409 = G__68478;
i__68410 = G__68479;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
