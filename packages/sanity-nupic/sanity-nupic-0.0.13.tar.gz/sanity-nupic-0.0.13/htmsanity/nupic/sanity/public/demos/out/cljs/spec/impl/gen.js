// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('cljs.spec.impl.gen');
goog.require('cljs.core');
goog.require('cljs.core');

/**
* @constructor
 * @implements {cljs.core.IDeref}
*/
cljs.spec.impl.gen.LazyVar = (function (f,cached){
this.f = f;
this.cached = cached;
this.cljs$lang$protocol_mask$partition0$ = 32768;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cljs.spec.impl.gen.LazyVar.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(!((self__.cached == null))){
return self__.cached;
} else {
var x = (self__.f.cljs$core$IFn$_invoke$arity$0 ? self__.f.cljs$core$IFn$_invoke$arity$0() : self__.f.call(null));
if((x == null)){
} else {
self__.cached = x;
}

return x;
}
});

cljs.spec.impl.gen.LazyVar.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$f,cljs.core.with_meta(cljs.core.cst$sym$cached,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

cljs.spec.impl.gen.LazyVar.cljs$lang$type = true;

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorStr = "cljs.spec.impl.gen/LazyVar";

cljs.spec.impl.gen.LazyVar.cljs$lang$ctorPrWriter = (function (this__9930__auto__,writer__9931__auto__,opt__9932__auto__){
return cljs.core._write(writer__9931__auto__,"cljs.spec.impl.gen/LazyVar");
});

cljs.spec.impl.gen.__GT_LazyVar = (function cljs$spec$impl$gen$__GT_LazyVar(f,cached){
return (new cljs.spec.impl.gen.LazyVar(f,cached));
});

cljs.spec.impl.gen.quick_check_ref = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check.quick_check !== 'undefined')){
return clojure.test.check.quick_check;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check_SLASH_quick_DASH_check),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check_SLASH_quick_DASH_check)),cljs.core.str(" never required")].join('')));
}
}),null));
cljs.spec.impl.gen.quick_check = (function cljs$spec$impl$gen$quick_check(var_args){
var args__10468__auto__ = [];
var len__10461__auto___45989 = arguments.length;
var i__10462__auto___45990 = (0);
while(true){
if((i__10462__auto___45990 < len__10461__auto___45989)){
args__10468__auto__.push((arguments[i__10462__auto___45990]));

var G__45991 = (i__10462__auto___45990 + (1));
i__10462__auto___45990 = G__45991;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});

cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.impl.gen.quick_check_ref) : cljs.core.deref.call(null,cljs.spec.impl.gen.quick_check_ref)),args);
});

cljs.spec.impl.gen.quick_check.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.quick_check.cljs$lang$applyTo = (function (seq45988){
return cljs.spec.impl.gen.quick_check.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq45988));
});

cljs.spec.impl.gen.for_all_STAR__ref = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.properties.for_all_STAR_ !== 'undefined')){
return clojure.test.check.properties.for_all_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$properties_SLASH_for_DASH_all_STAR_),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$properties_SLASH_for_DASH_all_STAR_)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Dynamically loaded clojure.test.check.properties/for-all*.
 */
cljs.spec.impl.gen.for_all_STAR_ = (function cljs$spec$impl$gen$for_all_STAR_(var_args){
var args__10468__auto__ = [];
var len__10461__auto___45993 = arguments.length;
var i__10462__auto___45994 = (0);
while(true){
if((i__10462__auto___45994 < len__10461__auto___45993)){
args__10468__auto__.push((arguments[i__10462__auto___45994]));

var G__45995 = (i__10462__auto___45994 + (1));
i__10462__auto___45994 = G__45995;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.impl.gen.for_all_STAR__ref) : cljs.core.deref.call(null,cljs.spec.impl.gen.for_all_STAR__ref)),args);
});

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.for_all_STAR_.cljs$lang$applyTo = (function (seq45992){
return cljs.spec.impl.gen.for_all_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq45992));
});

var g_QMARK__45996 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generator_QMARK_ !== 'undefined')){
return clojure.test.check.generators.generator_QMARK_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_generator_QMARK_),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_generator_QMARK_)),cljs.core.str(" never required")].join('')));
}
}),null));
var g_45997 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__45996){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.generate !== 'undefined')){
return clojure.test.check.generators.generate;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_generate),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_generate)),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__45996))
,null));
var mkg_45998 = (new cljs.spec.impl.gen.LazyVar(((function (g_QMARK__45996,g_45997){
return (function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.__GT_Generator !== 'undefined')){
return clojure.test.check.generators.__GT_Generator;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH__DASH__GT_Generator),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH__DASH__GT_Generator)),cljs.core.str(" never required")].join('')));
}
});})(g_QMARK__45996,g_45997))
,null));
cljs.spec.impl.gen.generator_QMARK_ = ((function (g_QMARK__45996,g_45997,mkg_45998){
return (function cljs$spec$impl$gen$generator_QMARK_(x){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g_QMARK__45996) : cljs.core.deref.call(null,g_QMARK__45996)).call(null,x);
});})(g_QMARK__45996,g_45997,mkg_45998))
;

cljs.spec.impl.gen.generator = ((function (g_QMARK__45996,g_45997,mkg_45998){
return (function cljs$spec$impl$gen$generator(gfn){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(mkg_45998) : cljs.core.deref.call(null,mkg_45998)).call(null,gfn);
});})(g_QMARK__45996,g_45997,mkg_45998))
;

/**
 * Generate a single value using generator.
 */
cljs.spec.impl.gen.generate = ((function (g_QMARK__45996,g_45997,mkg_45998){
return (function cljs$spec$impl$gen$generate(generator){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g_45997) : cljs.core.deref.call(null,g_45997)).call(null,generator);
});})(g_QMARK__45996,g_45997,mkg_45998))
;
cljs.spec.impl.gen.delay_impl = (function cljs$spec$impl$gen$delay_impl(gfnd){
return cljs.spec.impl.gen.generator((function (rnd,size){
return cljs.core.cst$kw$gen.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(gfnd) : cljs.core.deref.call(null,gfnd))).call(null,rnd,size);
}));
});
var g__45960__auto___46017 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.hash_map !== 'undefined')){
return clojure.test.check.generators.hash_map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_hash_DASH_map),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_hash_DASH_map)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/hash-map
 */
cljs.spec.impl.gen.hash_map = ((function (g__45960__auto___46017){
return (function cljs$spec$impl$gen$hash_map(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46018 = arguments.length;
var i__10462__auto___46019 = (0);
while(true){
if((i__10462__auto___46019 < len__10461__auto___46018)){
args__10468__auto__.push((arguments[i__10462__auto___46019]));

var G__46020 = (i__10462__auto___46019 + (1));
i__10462__auto___46019 = G__46020;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46017))
;

cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46017){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46017) : cljs.core.deref.call(null,g__45960__auto___46017)),args);
});})(g__45960__auto___46017))
;

cljs.spec.impl.gen.hash_map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.hash_map.cljs$lang$applyTo = ((function (g__45960__auto___46017){
return (function (seq45999){
return cljs.spec.impl.gen.hash_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq45999));
});})(g__45960__auto___46017))
;


var g__45960__auto___46021 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.list !== 'undefined')){
return clojure.test.check.generators.list;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_list),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_list)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/list
 */
cljs.spec.impl.gen.list = ((function (g__45960__auto___46021){
return (function cljs$spec$impl$gen$list(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46022 = arguments.length;
var i__10462__auto___46023 = (0);
while(true){
if((i__10462__auto___46023 < len__10461__auto___46022)){
args__10468__auto__.push((arguments[i__10462__auto___46023]));

var G__46024 = (i__10462__auto___46023 + (1));
i__10462__auto___46023 = G__46024;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46021))
;

cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46021){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46021) : cljs.core.deref.call(null,g__45960__auto___46021)),args);
});})(g__45960__auto___46021))
;

cljs.spec.impl.gen.list.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.list.cljs$lang$applyTo = ((function (g__45960__auto___46021){
return (function (seq46000){
return cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46000));
});})(g__45960__auto___46021))
;


var g__45960__auto___46025 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.map !== 'undefined')){
return clojure.test.check.generators.map;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_map),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_map)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/map
 */
cljs.spec.impl.gen.map = ((function (g__45960__auto___46025){
return (function cljs$spec$impl$gen$map(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46026 = arguments.length;
var i__10462__auto___46027 = (0);
while(true){
if((i__10462__auto___46027 < len__10461__auto___46026)){
args__10468__auto__.push((arguments[i__10462__auto___46027]));

var G__46028 = (i__10462__auto___46027 + (1));
i__10462__auto___46027 = G__46028;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46025))
;

cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46025){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46025) : cljs.core.deref.call(null,g__45960__auto___46025)),args);
});})(g__45960__auto___46025))
;

cljs.spec.impl.gen.map.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.map.cljs$lang$applyTo = ((function (g__45960__auto___46025){
return (function (seq46001){
return cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46001));
});})(g__45960__auto___46025))
;


var g__45960__auto___46029 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.not_empty !== 'undefined')){
return clojure.test.check.generators.not_empty;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_not_DASH_empty),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_not_DASH_empty)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/not-empty
 */
cljs.spec.impl.gen.not_empty = ((function (g__45960__auto___46029){
return (function cljs$spec$impl$gen$not_empty(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46030 = arguments.length;
var i__10462__auto___46031 = (0);
while(true){
if((i__10462__auto___46031 < len__10461__auto___46030)){
args__10468__auto__.push((arguments[i__10462__auto___46031]));

var G__46032 = (i__10462__auto___46031 + (1));
i__10462__auto___46031 = G__46032;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46029))
;

cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46029){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46029) : cljs.core.deref.call(null,g__45960__auto___46029)),args);
});})(g__45960__auto___46029))
;

cljs.spec.impl.gen.not_empty.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.not_empty.cljs$lang$applyTo = ((function (g__45960__auto___46029){
return (function (seq46002){
return cljs.spec.impl.gen.not_empty.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46002));
});})(g__45960__auto___46029))
;


var g__45960__auto___46033 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.set !== 'undefined')){
return clojure.test.check.generators.set;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_set),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_set)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/set
 */
cljs.spec.impl.gen.set = ((function (g__45960__auto___46033){
return (function cljs$spec$impl$gen$set(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46034 = arguments.length;
var i__10462__auto___46035 = (0);
while(true){
if((i__10462__auto___46035 < len__10461__auto___46034)){
args__10468__auto__.push((arguments[i__10462__auto___46035]));

var G__46036 = (i__10462__auto___46035 + (1));
i__10462__auto___46035 = G__46036;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46033))
;

cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46033){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46033) : cljs.core.deref.call(null,g__45960__auto___46033)),args);
});})(g__45960__auto___46033))
;

cljs.spec.impl.gen.set.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.set.cljs$lang$applyTo = ((function (g__45960__auto___46033){
return (function (seq46003){
return cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46003));
});})(g__45960__auto___46033))
;


var g__45960__auto___46037 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector !== 'undefined')){
return clojure.test.check.generators.vector;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_vector),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_vector)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector
 */
cljs.spec.impl.gen.vector = ((function (g__45960__auto___46037){
return (function cljs$spec$impl$gen$vector(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46038 = arguments.length;
var i__10462__auto___46039 = (0);
while(true){
if((i__10462__auto___46039 < len__10461__auto___46038)){
args__10468__auto__.push((arguments[i__10462__auto___46039]));

var G__46040 = (i__10462__auto___46039 + (1));
i__10462__auto___46039 = G__46040;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46037))
;

cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46037){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46037) : cljs.core.deref.call(null,g__45960__auto___46037)),args);
});})(g__45960__auto___46037))
;

cljs.spec.impl.gen.vector.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector.cljs$lang$applyTo = ((function (g__45960__auto___46037){
return (function (seq46004){
return cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46004));
});})(g__45960__auto___46037))
;


var g__45960__auto___46041 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.vector_distinct !== 'undefined')){
return clojure.test.check.generators.vector_distinct;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_vector_DASH_distinct),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_vector_DASH_distinct)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/vector-distinct
 */
cljs.spec.impl.gen.vector_distinct = ((function (g__45960__auto___46041){
return (function cljs$spec$impl$gen$vector_distinct(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46042 = arguments.length;
var i__10462__auto___46043 = (0);
while(true){
if((i__10462__auto___46043 < len__10461__auto___46042)){
args__10468__auto__.push((arguments[i__10462__auto___46043]));

var G__46044 = (i__10462__auto___46043 + (1));
i__10462__auto___46043 = G__46044;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46041))
;

cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46041){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46041) : cljs.core.deref.call(null,g__45960__auto___46041)),args);
});})(g__45960__auto___46041))
;

cljs.spec.impl.gen.vector_distinct.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.vector_distinct.cljs$lang$applyTo = ((function (g__45960__auto___46041){
return (function (seq46005){
return cljs.spec.impl.gen.vector_distinct.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46005));
});})(g__45960__auto___46041))
;


var g__45960__auto___46045 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.fmap !== 'undefined')){
return clojure.test.check.generators.fmap;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_fmap),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_fmap)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/fmap
 */
cljs.spec.impl.gen.fmap = ((function (g__45960__auto___46045){
return (function cljs$spec$impl$gen$fmap(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46046 = arguments.length;
var i__10462__auto___46047 = (0);
while(true){
if((i__10462__auto___46047 < len__10461__auto___46046)){
args__10468__auto__.push((arguments[i__10462__auto___46047]));

var G__46048 = (i__10462__auto___46047 + (1));
i__10462__auto___46047 = G__46048;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46045))
;

cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46045){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46045) : cljs.core.deref.call(null,g__45960__auto___46045)),args);
});})(g__45960__auto___46045))
;

cljs.spec.impl.gen.fmap.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.fmap.cljs$lang$applyTo = ((function (g__45960__auto___46045){
return (function (seq46006){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46006));
});})(g__45960__auto___46045))
;


var g__45960__auto___46049 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.elements !== 'undefined')){
return clojure.test.check.generators.elements;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_elements),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_elements)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/elements
 */
cljs.spec.impl.gen.elements = ((function (g__45960__auto___46049){
return (function cljs$spec$impl$gen$elements(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46050 = arguments.length;
var i__10462__auto___46051 = (0);
while(true){
if((i__10462__auto___46051 < len__10461__auto___46050)){
args__10468__auto__.push((arguments[i__10462__auto___46051]));

var G__46052 = (i__10462__auto___46051 + (1));
i__10462__auto___46051 = G__46052;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46049))
;

cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46049){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46049) : cljs.core.deref.call(null,g__45960__auto___46049)),args);
});})(g__45960__auto___46049))
;

cljs.spec.impl.gen.elements.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.elements.cljs$lang$applyTo = ((function (g__45960__auto___46049){
return (function (seq46007){
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46007));
});})(g__45960__auto___46049))
;


var g__45960__auto___46053 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.bind !== 'undefined')){
return clojure.test.check.generators.bind;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_bind),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_bind)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/bind
 */
cljs.spec.impl.gen.bind = ((function (g__45960__auto___46053){
return (function cljs$spec$impl$gen$bind(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46054 = arguments.length;
var i__10462__auto___46055 = (0);
while(true){
if((i__10462__auto___46055 < len__10461__auto___46054)){
args__10468__auto__.push((arguments[i__10462__auto___46055]));

var G__46056 = (i__10462__auto___46055 + (1));
i__10462__auto___46055 = G__46056;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46053))
;

cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46053){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46053) : cljs.core.deref.call(null,g__45960__auto___46053)),args);
});})(g__45960__auto___46053))
;

cljs.spec.impl.gen.bind.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.bind.cljs$lang$applyTo = ((function (g__45960__auto___46053){
return (function (seq46008){
return cljs.spec.impl.gen.bind.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46008));
});})(g__45960__auto___46053))
;


var g__45960__auto___46057 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.choose !== 'undefined')){
return clojure.test.check.generators.choose;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_choose),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_choose)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/choose
 */
cljs.spec.impl.gen.choose = ((function (g__45960__auto___46057){
return (function cljs$spec$impl$gen$choose(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46058 = arguments.length;
var i__10462__auto___46059 = (0);
while(true){
if((i__10462__auto___46059 < len__10461__auto___46058)){
args__10468__auto__.push((arguments[i__10462__auto___46059]));

var G__46060 = (i__10462__auto___46059 + (1));
i__10462__auto___46059 = G__46060;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46057))
;

cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46057){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46057) : cljs.core.deref.call(null,g__45960__auto___46057)),args);
});})(g__45960__auto___46057))
;

cljs.spec.impl.gen.choose.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.choose.cljs$lang$applyTo = ((function (g__45960__auto___46057){
return (function (seq46009){
return cljs.spec.impl.gen.choose.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46009));
});})(g__45960__auto___46057))
;


var g__45960__auto___46061 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.one_of !== 'undefined')){
return clojure.test.check.generators.one_of;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_one_DASH_of),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_one_DASH_of)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/one-of
 */
cljs.spec.impl.gen.one_of = ((function (g__45960__auto___46061){
return (function cljs$spec$impl$gen$one_of(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46062 = arguments.length;
var i__10462__auto___46063 = (0);
while(true){
if((i__10462__auto___46063 < len__10461__auto___46062)){
args__10468__auto__.push((arguments[i__10462__auto___46063]));

var G__46064 = (i__10462__auto___46063 + (1));
i__10462__auto___46063 = G__46064;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46061))
;

cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46061){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46061) : cljs.core.deref.call(null,g__45960__auto___46061)),args);
});})(g__45960__auto___46061))
;

cljs.spec.impl.gen.one_of.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.one_of.cljs$lang$applyTo = ((function (g__45960__auto___46061){
return (function (seq46010){
return cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46010));
});})(g__45960__auto___46061))
;


var g__45960__auto___46065 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.such_that !== 'undefined')){
return clojure.test.check.generators.such_that;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_such_DASH_that),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_such_DASH_that)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/such-that
 */
cljs.spec.impl.gen.such_that = ((function (g__45960__auto___46065){
return (function cljs$spec$impl$gen$such_that(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46066 = arguments.length;
var i__10462__auto___46067 = (0);
while(true){
if((i__10462__auto___46067 < len__10461__auto___46066)){
args__10468__auto__.push((arguments[i__10462__auto___46067]));

var G__46068 = (i__10462__auto___46067 + (1));
i__10462__auto___46067 = G__46068;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46065))
;

cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46065){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46065) : cljs.core.deref.call(null,g__45960__auto___46065)),args);
});})(g__45960__auto___46065))
;

cljs.spec.impl.gen.such_that.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.such_that.cljs$lang$applyTo = ((function (g__45960__auto___46065){
return (function (seq46011){
return cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46011));
});})(g__45960__auto___46065))
;


var g__45960__auto___46069 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.tuple !== 'undefined')){
return clojure.test.check.generators.tuple;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_tuple),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_tuple)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/tuple
 */
cljs.spec.impl.gen.tuple = ((function (g__45960__auto___46069){
return (function cljs$spec$impl$gen$tuple(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46070 = arguments.length;
var i__10462__auto___46071 = (0);
while(true){
if((i__10462__auto___46071 < len__10461__auto___46070)){
args__10468__auto__.push((arguments[i__10462__auto___46071]));

var G__46072 = (i__10462__auto___46071 + (1));
i__10462__auto___46071 = G__46072;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46069))
;

cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46069){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46069) : cljs.core.deref.call(null,g__45960__auto___46069)),args);
});})(g__45960__auto___46069))
;

cljs.spec.impl.gen.tuple.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.tuple.cljs$lang$applyTo = ((function (g__45960__auto___46069){
return (function (seq46012){
return cljs.spec.impl.gen.tuple.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46012));
});})(g__45960__auto___46069))
;


var g__45960__auto___46073 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.sample !== 'undefined')){
return clojure.test.check.generators.sample;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_sample),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_sample)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/sample
 */
cljs.spec.impl.gen.sample = ((function (g__45960__auto___46073){
return (function cljs$spec$impl$gen$sample(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46074 = arguments.length;
var i__10462__auto___46075 = (0);
while(true){
if((i__10462__auto___46075 < len__10461__auto___46074)){
args__10468__auto__.push((arguments[i__10462__auto___46075]));

var G__46076 = (i__10462__auto___46075 + (1));
i__10462__auto___46075 = G__46076;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46073))
;

cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46073){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46073) : cljs.core.deref.call(null,g__45960__auto___46073)),args);
});})(g__45960__auto___46073))
;

cljs.spec.impl.gen.sample.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.sample.cljs$lang$applyTo = ((function (g__45960__auto___46073){
return (function (seq46013){
return cljs.spec.impl.gen.sample.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46013));
});})(g__45960__auto___46073))
;


var g__45960__auto___46077 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.return$ !== 'undefined')){
return clojure.test.check.generators.return$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_return),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_return)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/return
 */
cljs.spec.impl.gen.return$ = ((function (g__45960__auto___46077){
return (function cljs$spec$impl$gen$return(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46078 = arguments.length;
var i__10462__auto___46079 = (0);
while(true){
if((i__10462__auto___46079 < len__10461__auto___46078)){
args__10468__auto__.push((arguments[i__10462__auto___46079]));

var G__46080 = (i__10462__auto___46079 + (1));
i__10462__auto___46079 = G__46080;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46077))
;

cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46077){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46077) : cljs.core.deref.call(null,g__45960__auto___46077)),args);
});})(g__45960__auto___46077))
;

cljs.spec.impl.gen.return$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.return$.cljs$lang$applyTo = ((function (g__45960__auto___46077){
return (function (seq46014){
return cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46014));
});})(g__45960__auto___46077))
;


var g__45960__auto___46081 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer_STAR_ !== 'undefined')){
return clojure.test.check.generators.large_integer_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_large_DASH_integer_STAR_),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_large_DASH_integer_STAR_)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/large-integer*
 */
cljs.spec.impl.gen.large_integer_STAR_ = ((function (g__45960__auto___46081){
return (function cljs$spec$impl$gen$large_integer_STAR_(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46082 = arguments.length;
var i__10462__auto___46083 = (0);
while(true){
if((i__10462__auto___46083 < len__10461__auto___46082)){
args__10468__auto__.push((arguments[i__10462__auto___46083]));

var G__46084 = (i__10462__auto___46083 + (1));
i__10462__auto___46083 = G__46084;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46081))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46081){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46081) : cljs.core.deref.call(null,g__45960__auto___46081)),args);
});})(g__45960__auto___46081))
;

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer_STAR_.cljs$lang$applyTo = ((function (g__45960__auto___46081){
return (function (seq46015){
return cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46015));
});})(g__45960__auto___46081))
;


var g__45960__auto___46085 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double_STAR_ !== 'undefined')){
return clojure.test.check.generators.double_STAR_;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_double_STAR_),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_double_STAR_)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Lazy loaded version of clojure.test.check.generators/double*
 */
cljs.spec.impl.gen.double_STAR_ = ((function (g__45960__auto___46085){
return (function cljs$spec$impl$gen$double_STAR_(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46086 = arguments.length;
var i__10462__auto___46087 = (0);
while(true){
if((i__10462__auto___46087 < len__10461__auto___46086)){
args__10468__auto__.push((arguments[i__10462__auto___46087]));

var G__46088 = (i__10462__auto___46087 + (1));
i__10462__auto___46087 = G__46088;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.double_STAR_.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45960__auto___46085))
;

cljs.spec.impl.gen.double_STAR_.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45960__auto___46085){
return (function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45960__auto___46085) : cljs.core.deref.call(null,g__45960__auto___46085)),args);
});})(g__45960__auto___46085))
;

cljs.spec.impl.gen.double_STAR_.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.double_STAR_.cljs$lang$applyTo = ((function (g__45960__auto___46085){
return (function (seq46016){
return cljs.spec.impl.gen.double_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46016));
});})(g__45960__auto___46085))
;

var g__45973__auto___46110 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any !== 'undefined')){
return clojure.test.check.generators.any;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_any),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_any)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any
 */
cljs.spec.impl.gen.any = ((function (g__45973__auto___46110){
return (function cljs$spec$impl$gen$any(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46111 = arguments.length;
var i__10462__auto___46112 = (0);
while(true){
if((i__10462__auto___46112 < len__10461__auto___46111)){
args__10468__auto__.push((arguments[i__10462__auto___46112]));

var G__46113 = (i__10462__auto___46112 + (1));
i__10462__auto___46112 = G__46113;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46110))
;

cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46110){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46110) : cljs.core.deref.call(null,g__45973__auto___46110));
});})(g__45973__auto___46110))
;

cljs.spec.impl.gen.any.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any.cljs$lang$applyTo = ((function (g__45973__auto___46110){
return (function (seq46089){
return cljs.spec.impl.gen.any.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46089));
});})(g__45973__auto___46110))
;


var g__45973__auto___46114 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.any_printable !== 'undefined')){
return clojure.test.check.generators.any_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_any_DASH_printable),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_any_DASH_printable)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/any-printable
 */
cljs.spec.impl.gen.any_printable = ((function (g__45973__auto___46114){
return (function cljs$spec$impl$gen$any_printable(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46115 = arguments.length;
var i__10462__auto___46116 = (0);
while(true){
if((i__10462__auto___46116 < len__10461__auto___46115)){
args__10468__auto__.push((arguments[i__10462__auto___46116]));

var G__46117 = (i__10462__auto___46116 + (1));
i__10462__auto___46116 = G__46117;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46114))
;

cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46114){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46114) : cljs.core.deref.call(null,g__45973__auto___46114));
});})(g__45973__auto___46114))
;

cljs.spec.impl.gen.any_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.any_printable.cljs$lang$applyTo = ((function (g__45973__auto___46114){
return (function (seq46090){
return cljs.spec.impl.gen.any_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46090));
});})(g__45973__auto___46114))
;


var g__45973__auto___46118 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.boolean$ !== 'undefined')){
return clojure.test.check.generators.boolean$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_boolean),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_boolean)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/boolean
 */
cljs.spec.impl.gen.boolean$ = ((function (g__45973__auto___46118){
return (function cljs$spec$impl$gen$boolean(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46119 = arguments.length;
var i__10462__auto___46120 = (0);
while(true){
if((i__10462__auto___46120 < len__10461__auto___46119)){
args__10468__auto__.push((arguments[i__10462__auto___46120]));

var G__46121 = (i__10462__auto___46120 + (1));
i__10462__auto___46120 = G__46121;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46118))
;

cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46118){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46118) : cljs.core.deref.call(null,g__45973__auto___46118));
});})(g__45973__auto___46118))
;

cljs.spec.impl.gen.boolean$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.boolean$.cljs$lang$applyTo = ((function (g__45973__auto___46118){
return (function (seq46091){
return cljs.spec.impl.gen.boolean$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46091));
});})(g__45973__auto___46118))
;


var g__45973__auto___46122 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char$ !== 'undefined')){
return clojure.test.check.generators.char$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char
 */
cljs.spec.impl.gen.char$ = ((function (g__45973__auto___46122){
return (function cljs$spec$impl$gen$char(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46123 = arguments.length;
var i__10462__auto___46124 = (0);
while(true){
if((i__10462__auto___46124 < len__10461__auto___46123)){
args__10468__auto__.push((arguments[i__10462__auto___46124]));

var G__46125 = (i__10462__auto___46124 + (1));
i__10462__auto___46124 = G__46125;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46122))
;

cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46122){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46122) : cljs.core.deref.call(null,g__45973__auto___46122));
});})(g__45973__auto___46122))
;

cljs.spec.impl.gen.char$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char$.cljs$lang$applyTo = ((function (g__45973__auto___46122){
return (function (seq46092){
return cljs.spec.impl.gen.char$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46092));
});})(g__45973__auto___46122))
;


var g__45973__auto___46126 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alpha !== 'undefined')){
return clojure.test.check.generators.char_alpha;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char_DASH_alpha),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char_DASH_alpha)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alpha
 */
cljs.spec.impl.gen.char_alpha = ((function (g__45973__auto___46126){
return (function cljs$spec$impl$gen$char_alpha(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46127 = arguments.length;
var i__10462__auto___46128 = (0);
while(true){
if((i__10462__auto___46128 < len__10461__auto___46127)){
args__10468__auto__.push((arguments[i__10462__auto___46128]));

var G__46129 = (i__10462__auto___46128 + (1));
i__10462__auto___46128 = G__46129;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46126))
;

cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46126){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46126) : cljs.core.deref.call(null,g__45973__auto___46126));
});})(g__45973__auto___46126))
;

cljs.spec.impl.gen.char_alpha.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alpha.cljs$lang$applyTo = ((function (g__45973__auto___46126){
return (function (seq46093){
return cljs.spec.impl.gen.char_alpha.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46093));
});})(g__45973__auto___46126))
;


var g__45973__auto___46130 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_alphanumeric !== 'undefined')){
return clojure.test.check.generators.char_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char_DASH_alphanumeric),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char_DASH_alphanumeric)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-alphanumeric
 */
cljs.spec.impl.gen.char_alphanumeric = ((function (g__45973__auto___46130){
return (function cljs$spec$impl$gen$char_alphanumeric(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46131 = arguments.length;
var i__10462__auto___46132 = (0);
while(true){
if((i__10462__auto___46132 < len__10461__auto___46131)){
args__10468__auto__.push((arguments[i__10462__auto___46132]));

var G__46133 = (i__10462__auto___46132 + (1));
i__10462__auto___46132 = G__46133;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46130))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46130){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46130) : cljs.core.deref.call(null,g__45973__auto___46130));
});})(g__45973__auto___46130))
;

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_alphanumeric.cljs$lang$applyTo = ((function (g__45973__auto___46130){
return (function (seq46094){
return cljs.spec.impl.gen.char_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46094));
});})(g__45973__auto___46130))
;


var g__45973__auto___46134 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.char_ascii !== 'undefined')){
return clojure.test.check.generators.char_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char_DASH_ascii),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_char_DASH_ascii)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/char-ascii
 */
cljs.spec.impl.gen.char_ascii = ((function (g__45973__auto___46134){
return (function cljs$spec$impl$gen$char_ascii(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46135 = arguments.length;
var i__10462__auto___46136 = (0);
while(true){
if((i__10462__auto___46136 < len__10461__auto___46135)){
args__10468__auto__.push((arguments[i__10462__auto___46136]));

var G__46137 = (i__10462__auto___46136 + (1));
i__10462__auto___46136 = G__46137;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46134))
;

cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46134){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46134) : cljs.core.deref.call(null,g__45973__auto___46134));
});})(g__45973__auto___46134))
;

cljs.spec.impl.gen.char_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.char_ascii.cljs$lang$applyTo = ((function (g__45973__auto___46134){
return (function (seq46095){
return cljs.spec.impl.gen.char_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46095));
});})(g__45973__auto___46134))
;


var g__45973__auto___46138 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.double$ !== 'undefined')){
return clojure.test.check.generators.double$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_double),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_double)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/double
 */
cljs.spec.impl.gen.double$ = ((function (g__45973__auto___46138){
return (function cljs$spec$impl$gen$double(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46139 = arguments.length;
var i__10462__auto___46140 = (0);
while(true){
if((i__10462__auto___46140 < len__10461__auto___46139)){
args__10468__auto__.push((arguments[i__10462__auto___46140]));

var G__46141 = (i__10462__auto___46140 + (1));
i__10462__auto___46140 = G__46141;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46138))
;

cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46138){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46138) : cljs.core.deref.call(null,g__45973__auto___46138));
});})(g__45973__auto___46138))
;

cljs.spec.impl.gen.double$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.double$.cljs$lang$applyTo = ((function (g__45973__auto___46138){
return (function (seq46096){
return cljs.spec.impl.gen.double$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46096));
});})(g__45973__auto___46138))
;


var g__45973__auto___46142 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.int$ !== 'undefined')){
return clojure.test.check.generators.int$;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_int),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_int)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/int
 */
cljs.spec.impl.gen.int$ = ((function (g__45973__auto___46142){
return (function cljs$spec$impl$gen$int(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46143 = arguments.length;
var i__10462__auto___46144 = (0);
while(true){
if((i__10462__auto___46144 < len__10461__auto___46143)){
args__10468__auto__.push((arguments[i__10462__auto___46144]));

var G__46145 = (i__10462__auto___46144 + (1));
i__10462__auto___46144 = G__46145;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46142))
;

cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46142){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46142) : cljs.core.deref.call(null,g__45973__auto___46142));
});})(g__45973__auto___46142))
;

cljs.spec.impl.gen.int$.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.int$.cljs$lang$applyTo = ((function (g__45973__auto___46142){
return (function (seq46097){
return cljs.spec.impl.gen.int$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46097));
});})(g__45973__auto___46142))
;


var g__45973__auto___46146 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword !== 'undefined')){
return clojure.test.check.generators.keyword;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_keyword),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_keyword)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword
 */
cljs.spec.impl.gen.keyword = ((function (g__45973__auto___46146){
return (function cljs$spec$impl$gen$keyword(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46147 = arguments.length;
var i__10462__auto___46148 = (0);
while(true){
if((i__10462__auto___46148 < len__10461__auto___46147)){
args__10468__auto__.push((arguments[i__10462__auto___46148]));

var G__46149 = (i__10462__auto___46148 + (1));
i__10462__auto___46148 = G__46149;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46146))
;

cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46146){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46146) : cljs.core.deref.call(null,g__45973__auto___46146));
});})(g__45973__auto___46146))
;

cljs.spec.impl.gen.keyword.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword.cljs$lang$applyTo = ((function (g__45973__auto___46146){
return (function (seq46098){
return cljs.spec.impl.gen.keyword.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46098));
});})(g__45973__auto___46146))
;


var g__45973__auto___46150 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.keyword_ns !== 'undefined')){
return clojure.test.check.generators.keyword_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_keyword_DASH_ns),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_keyword_DASH_ns)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/keyword-ns
 */
cljs.spec.impl.gen.keyword_ns = ((function (g__45973__auto___46150){
return (function cljs$spec$impl$gen$keyword_ns(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46151 = arguments.length;
var i__10462__auto___46152 = (0);
while(true){
if((i__10462__auto___46152 < len__10461__auto___46151)){
args__10468__auto__.push((arguments[i__10462__auto___46152]));

var G__46153 = (i__10462__auto___46152 + (1));
i__10462__auto___46152 = G__46153;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46150))
;

cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46150){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46150) : cljs.core.deref.call(null,g__45973__auto___46150));
});})(g__45973__auto___46150))
;

cljs.spec.impl.gen.keyword_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.keyword_ns.cljs$lang$applyTo = ((function (g__45973__auto___46150){
return (function (seq46099){
return cljs.spec.impl.gen.keyword_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46099));
});})(g__45973__auto___46150))
;


var g__45973__auto___46154 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.large_integer !== 'undefined')){
return clojure.test.check.generators.large_integer;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_large_DASH_integer),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_large_DASH_integer)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/large-integer
 */
cljs.spec.impl.gen.large_integer = ((function (g__45973__auto___46154){
return (function cljs$spec$impl$gen$large_integer(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46155 = arguments.length;
var i__10462__auto___46156 = (0);
while(true){
if((i__10462__auto___46156 < len__10461__auto___46155)){
args__10468__auto__.push((arguments[i__10462__auto___46156]));

var G__46157 = (i__10462__auto___46156 + (1));
i__10462__auto___46156 = G__46157;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46154))
;

cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46154){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46154) : cljs.core.deref.call(null,g__45973__auto___46154));
});})(g__45973__auto___46154))
;

cljs.spec.impl.gen.large_integer.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.large_integer.cljs$lang$applyTo = ((function (g__45973__auto___46154){
return (function (seq46100){
return cljs.spec.impl.gen.large_integer.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46100));
});})(g__45973__auto___46154))
;


var g__45973__auto___46158 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.ratio !== 'undefined')){
return clojure.test.check.generators.ratio;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_ratio),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_ratio)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/ratio
 */
cljs.spec.impl.gen.ratio = ((function (g__45973__auto___46158){
return (function cljs$spec$impl$gen$ratio(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46159 = arguments.length;
var i__10462__auto___46160 = (0);
while(true){
if((i__10462__auto___46160 < len__10461__auto___46159)){
args__10468__auto__.push((arguments[i__10462__auto___46160]));

var G__46161 = (i__10462__auto___46160 + (1));
i__10462__auto___46160 = G__46161;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46158))
;

cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46158){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46158) : cljs.core.deref.call(null,g__45973__auto___46158));
});})(g__45973__auto___46158))
;

cljs.spec.impl.gen.ratio.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.ratio.cljs$lang$applyTo = ((function (g__45973__auto___46158){
return (function (seq46101){
return cljs.spec.impl.gen.ratio.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46101));
});})(g__45973__auto___46158))
;


var g__45973__auto___46162 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type !== 'undefined')){
return clojure.test.check.generators.simple_type;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_simple_DASH_type),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_simple_DASH_type)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type
 */
cljs.spec.impl.gen.simple_type = ((function (g__45973__auto___46162){
return (function cljs$spec$impl$gen$simple_type(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46163 = arguments.length;
var i__10462__auto___46164 = (0);
while(true){
if((i__10462__auto___46164 < len__10461__auto___46163)){
args__10468__auto__.push((arguments[i__10462__auto___46164]));

var G__46165 = (i__10462__auto___46164 + (1));
i__10462__auto___46164 = G__46165;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46162))
;

cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46162){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46162) : cljs.core.deref.call(null,g__45973__auto___46162));
});})(g__45973__auto___46162))
;

cljs.spec.impl.gen.simple_type.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type.cljs$lang$applyTo = ((function (g__45973__auto___46162){
return (function (seq46102){
return cljs.spec.impl.gen.simple_type.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46102));
});})(g__45973__auto___46162))
;


var g__45973__auto___46166 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.simple_type_printable !== 'undefined')){
return clojure.test.check.generators.simple_type_printable;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_simple_DASH_type_DASH_printable),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_simple_DASH_type_DASH_printable)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/simple-type-printable
 */
cljs.spec.impl.gen.simple_type_printable = ((function (g__45973__auto___46166){
return (function cljs$spec$impl$gen$simple_type_printable(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46167 = arguments.length;
var i__10462__auto___46168 = (0);
while(true){
if((i__10462__auto___46168 < len__10461__auto___46167)){
args__10468__auto__.push((arguments[i__10462__auto___46168]));

var G__46169 = (i__10462__auto___46168 + (1));
i__10462__auto___46168 = G__46169;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46166))
;

cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46166){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46166) : cljs.core.deref.call(null,g__45973__auto___46166));
});})(g__45973__auto___46166))
;

cljs.spec.impl.gen.simple_type_printable.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.simple_type_printable.cljs$lang$applyTo = ((function (g__45973__auto___46166){
return (function (seq46103){
return cljs.spec.impl.gen.simple_type_printable.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46103));
});})(g__45973__auto___46166))
;


var g__45973__auto___46170 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string !== 'undefined')){
return clojure.test.check.generators.string;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_string),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_string)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string
 */
cljs.spec.impl.gen.string = ((function (g__45973__auto___46170){
return (function cljs$spec$impl$gen$string(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46171 = arguments.length;
var i__10462__auto___46172 = (0);
while(true){
if((i__10462__auto___46172 < len__10461__auto___46171)){
args__10468__auto__.push((arguments[i__10462__auto___46172]));

var G__46173 = (i__10462__auto___46172 + (1));
i__10462__auto___46172 = G__46173;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46170))
;

cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46170){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46170) : cljs.core.deref.call(null,g__45973__auto___46170));
});})(g__45973__auto___46170))
;

cljs.spec.impl.gen.string.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string.cljs$lang$applyTo = ((function (g__45973__auto___46170){
return (function (seq46104){
return cljs.spec.impl.gen.string.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46104));
});})(g__45973__auto___46170))
;


var g__45973__auto___46174 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_ascii !== 'undefined')){
return clojure.test.check.generators.string_ascii;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_string_DASH_ascii),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_string_DASH_ascii)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-ascii
 */
cljs.spec.impl.gen.string_ascii = ((function (g__45973__auto___46174){
return (function cljs$spec$impl$gen$string_ascii(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46175 = arguments.length;
var i__10462__auto___46176 = (0);
while(true){
if((i__10462__auto___46176 < len__10461__auto___46175)){
args__10468__auto__.push((arguments[i__10462__auto___46176]));

var G__46177 = (i__10462__auto___46176 + (1));
i__10462__auto___46176 = G__46177;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46174))
;

cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46174){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46174) : cljs.core.deref.call(null,g__45973__auto___46174));
});})(g__45973__auto___46174))
;

cljs.spec.impl.gen.string_ascii.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_ascii.cljs$lang$applyTo = ((function (g__45973__auto___46174){
return (function (seq46105){
return cljs.spec.impl.gen.string_ascii.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46105));
});})(g__45973__auto___46174))
;


var g__45973__auto___46178 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.string_alphanumeric !== 'undefined')){
return clojure.test.check.generators.string_alphanumeric;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_string_DASH_alphanumeric),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_string_DASH_alphanumeric)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/string-alphanumeric
 */
cljs.spec.impl.gen.string_alphanumeric = ((function (g__45973__auto___46178){
return (function cljs$spec$impl$gen$string_alphanumeric(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46179 = arguments.length;
var i__10462__auto___46180 = (0);
while(true){
if((i__10462__auto___46180 < len__10461__auto___46179)){
args__10468__auto__.push((arguments[i__10462__auto___46180]));

var G__46181 = (i__10462__auto___46180 + (1));
i__10462__auto___46180 = G__46181;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46178))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46178){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46178) : cljs.core.deref.call(null,g__45973__auto___46178));
});})(g__45973__auto___46178))
;

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.string_alphanumeric.cljs$lang$applyTo = ((function (g__45973__auto___46178){
return (function (seq46106){
return cljs.spec.impl.gen.string_alphanumeric.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46106));
});})(g__45973__auto___46178))
;


var g__45973__auto___46182 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol !== 'undefined')){
return clojure.test.check.generators.symbol;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_symbol),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_symbol)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol
 */
cljs.spec.impl.gen.symbol = ((function (g__45973__auto___46182){
return (function cljs$spec$impl$gen$symbol(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46183 = arguments.length;
var i__10462__auto___46184 = (0);
while(true){
if((i__10462__auto___46184 < len__10461__auto___46183)){
args__10468__auto__.push((arguments[i__10462__auto___46184]));

var G__46185 = (i__10462__auto___46184 + (1));
i__10462__auto___46184 = G__46185;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46182))
;

cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46182){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46182) : cljs.core.deref.call(null,g__45973__auto___46182));
});})(g__45973__auto___46182))
;

cljs.spec.impl.gen.symbol.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol.cljs$lang$applyTo = ((function (g__45973__auto___46182){
return (function (seq46107){
return cljs.spec.impl.gen.symbol.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46107));
});})(g__45973__auto___46182))
;


var g__45973__auto___46186 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.symbol_ns !== 'undefined')){
return clojure.test.check.generators.symbol_ns;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_symbol_DASH_ns),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_symbol_DASH_ns)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/symbol-ns
 */
cljs.spec.impl.gen.symbol_ns = ((function (g__45973__auto___46186){
return (function cljs$spec$impl$gen$symbol_ns(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46187 = arguments.length;
var i__10462__auto___46188 = (0);
while(true){
if((i__10462__auto___46188 < len__10461__auto___46187)){
args__10468__auto__.push((arguments[i__10462__auto___46188]));

var G__46189 = (i__10462__auto___46188 + (1));
i__10462__auto___46188 = G__46189;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46186))
;

cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46186){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46186) : cljs.core.deref.call(null,g__45973__auto___46186));
});})(g__45973__auto___46186))
;

cljs.spec.impl.gen.symbol_ns.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.symbol_ns.cljs$lang$applyTo = ((function (g__45973__auto___46186){
return (function (seq46108){
return cljs.spec.impl.gen.symbol_ns.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46108));
});})(g__45973__auto___46186))
;


var g__45973__auto___46190 = (new cljs.spec.impl.gen.LazyVar((function (){
if((typeof clojure.test !== 'undefined') && (typeof clojure.test.check !== 'undefined') && (typeof clojure.test.check.generators.uuid !== 'undefined')){
return clojure.test.check.generators.uuid;
} else {
throw (new Error([cljs.core.str("Var "),cljs.core.str(cljs.core.cst$sym$clojure$test$check$generators_SLASH_uuid),cljs.core.str(" does not exist, "),cljs.core.str(cljs.core.namespace(cljs.core.cst$sym$clojure$test$check$generators_SLASH_uuid)),cljs.core.str(" never required")].join('')));
}
}),null));
/**
 * Fn returning clojure.test.check.generators/uuid
 */
cljs.spec.impl.gen.uuid = ((function (g__45973__auto___46190){
return (function cljs$spec$impl$gen$uuid(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46191 = arguments.length;
var i__10462__auto___46192 = (0);
while(true){
if((i__10462__auto___46192 < len__10461__auto___46191)){
args__10468__auto__.push((arguments[i__10462__auto___46192]));

var G__46193 = (i__10462__auto___46192 + (1));
i__10462__auto___46192 = G__46193;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});})(g__45973__auto___46190))
;

cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic = ((function (g__45973__auto___46190){
return (function (args){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(g__45973__auto___46190) : cljs.core.deref.call(null,g__45973__auto___46190));
});})(g__45973__auto___46190))
;

cljs.spec.impl.gen.uuid.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.uuid.cljs$lang$applyTo = ((function (g__45973__auto___46190){
return (function (seq46109){
return cljs.spec.impl.gen.uuid.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46109));
});})(g__45973__auto___46190))
;

/**
 * Returns a generator of a sequence catenated from results of
 * gens, each of which should generate something sequential.
 */
cljs.spec.impl.gen.cat = (function cljs$spec$impl$gen$cat(var_args){
var args__10468__auto__ = [];
var len__10461__auto___46196 = arguments.length;
var i__10462__auto___46197 = (0);
while(true){
if((i__10462__auto___46197 < len__10461__auto___46196)){
args__10468__auto__.push((arguments[i__10462__auto___46197]));

var G__46198 = (i__10462__auto___46197 + (1));
i__10462__auto___46197 = G__46198;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});

cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic = (function (gens){
return cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(function (p1__46194_SHARP_){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.concat,p1__46194_SHARP_);
}),cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.spec.impl.gen.tuple,gens)], 0));
});

cljs.spec.impl.gen.cat.cljs$lang$maxFixedArity = (0);

cljs.spec.impl.gen.cat.cljs$lang$applyTo = (function (seq46195){
return cljs.spec.impl.gen.cat.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46195));
});

cljs.spec.impl.gen.qualified_QMARK_ = (function cljs$spec$impl$gen$qualified_QMARK_(ident){
return !((cljs.core.namespace(ident) == null));
});
cljs.spec.impl.gen.gen_builtins = (new cljs.core.Delay((function (){
var simple = cljs.spec.impl.gen.simple_type_printable();
return cljs.core.PersistentHashMap.fromArrays([cljs.core.qualified_keyword_QMARK_,cljs.core.seq_QMARK_,cljs.core.vector_QMARK_,cljs.core.any_QMARK_,cljs.core.boolean_QMARK_,cljs.core.char_QMARK_,cljs.core.inst_QMARK_,cljs.core.simple_symbol_QMARK_,cljs.core.sequential_QMARK_,cljs.core.set_QMARK_,cljs.core.map_QMARK_,cljs.core.empty_QMARK_,cljs.core.string_QMARK_,cljs.core.int_QMARK_,cljs.core.associative_QMARK_,cljs.core.keyword_QMARK_,cljs.core.indexed_QMARK_,cljs.core.zero_QMARK_,cljs.core.simple_keyword_QMARK_,cljs.core.neg_int_QMARK_,cljs.core.nil_QMARK_,cljs.core.ident_QMARK_,cljs.core.qualified_ident_QMARK_,cljs.core.true_QMARK_,cljs.core.integer_QMARK_,cljs.core.nat_int_QMARK_,cljs.core.pos_int_QMARK_,cljs.core.uuid_QMARK_,cljs.core.false_QMARK_,cljs.core.list_QMARK_,cljs.core.simple_ident_QMARK_,cljs.core.number_QMARK_,cljs.core.qualified_symbol_QMARK_,cljs.core.seqable_QMARK_,cljs.core.symbol_QMARK_,cljs.core.coll_QMARK_],[cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.keyword_ns()], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)),cljs.spec.impl.gen.any_printable()], null)], 0)),cljs.spec.impl.gen.boolean$(),cljs.spec.impl.gen.char$(),cljs.spec.impl.gen.fmap.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([((function (simple){
return (function (p1__46199_SHARP_){
return (new Date(p1__46199_SHARP_));
});})(simple))
,cljs.spec.impl.gen.large_integer()], 0)),cljs.spec.impl.gen.symbol(),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0))], null)], 0)),cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,cljs.core.List.EMPTY,cljs.core.PersistentVector.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentHashSet.EMPTY], null)], 0)),cljs.spec.impl.gen.string_alphanumeric(),cljs.spec.impl.gen.large_integer(),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0))], null)], 0)),cljs.spec.impl.gen.keyword_ns(),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([(0)], 0)),cljs.spec.impl.gen.keyword(),cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max,(-1)], null)], 0)),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword_ns(),cljs.spec.impl.gen.symbol_ns()], null)], 0)),cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword_ns(),cljs.spec.impl.gen.symbol_ns()], null)], 0))], 0)),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([true], 0)),cljs.spec.impl.gen.large_integer(),cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min,(0)], null)], 0)),cljs.spec.impl.gen.large_integer_STAR_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$min,(1)], null)], 0)),cljs.spec.impl.gen.uuid(),cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([false], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.keyword(),cljs.spec.impl.gen.symbol()], null)], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.large_integer(),cljs.spec.impl.gen.double$()], null)], 0)),cljs.spec.impl.gen.such_that.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.spec.impl.gen.qualified_QMARK_,cljs.spec.impl.gen.symbol_ns()], 0)),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.return$.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.string_alphanumeric()], null)], 0)),cljs.spec.impl.gen.symbol_ns(),cljs.spec.impl.gen.one_of.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.spec.impl.gen.map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple,simple], 0)),cljs.spec.impl.gen.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0)),cljs.spec.impl.gen.set.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([simple], 0))], null)], 0))]);
}),null));
/**
 * Given a predicate, returns a built-in generator if one exists.
 */
cljs.spec.impl.gen.gen_for_pred = (function cljs$spec$impl$gen$gen_for_pred(pred){
if(cljs.core.set_QMARK_(pred)){
return cljs.spec.impl.gen.elements.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([pred], 0));
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(cljs.spec.impl.gen.gen_builtins) : cljs.core.deref.call(null,cljs.spec.impl.gen.gen_builtins)),pred);
}
});
