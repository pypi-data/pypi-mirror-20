// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.bridge.browser');
goog.require('cljs.core');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.simulation');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.comportex.journal');
goog.require('org.nfrac.comportex.core');
org.numenta.sanity.bridge.browser.init = (function org$numenta$sanity$bridge$browser$init(var_args){
var args81185 = [];
var len__10461__auto___81190 = arguments.length;
var i__10462__auto___81191 = (0);
while(true){
if((i__10462__auto___81191 < len__10461__auto___81190)){
args81185.push((arguments[i__10462__auto___81191]));

var G__81192 = (i__10462__auto___81191 + (1));
i__10462__auto___81191 = G__81192;
continue;
} else {
}
break;
}

var G__81187 = args81185.length;
switch (G__81187) {
case 4:
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args81185.length)].join('')));

}
});

org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4 = (function (model,world_c,into_journal,into_sim){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(model,world_c,into_journal,into_sim,org.nfrac.comportex.core.htm_step);
});

org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5 = (function (model,world_c,into_journal,into_sim,htm_step){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$6(model,world_c,into_journal,into_sim,htm_step,null);
});

org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$6 = (function (model,world_c,into_journal,into_sim,htm_step,models_out){
if(((!((model == null)))?((((model.cljs$lang$protocol_mask$partition0$ & (32768))) || (model.cljs$core$IDeref$))?true:(((!model.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,model):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,model))){
} else {
throw (new Error("Assert failed: (satisfies? IDeref model)"));
}

var models_in = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var models_mult = cljs.core.async.mult(models_in);
var into_journal_STAR_ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_sim_STAR_ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var client_info = (function (){var G__81189 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__81189) : cljs.core.atom.call(null,G__81189));
})();
var client_info_xf = cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (models_in,models_mult,into_journal_STAR_,into_sim_STAR_,client_info){
return (function (v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v,client_info], null);
});})(models_in,models_mult,into_journal_STAR_,into_sim_STAR_,client_info))
);
cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((1),into_sim_STAR_,client_info_xf,into_sim);

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((1),into_journal_STAR_,client_info_xf,into_journal);

if(cljs.core.truth_(models_out)){
cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2(models_mult,models_out);
} else {
}

org.numenta.sanity.comportex.simulation.start(models_in,model,world_c,into_sim_STAR_,htm_step);

return org.numenta.sanity.comportex.journal.init(org.numenta.sanity.util.tap_c(models_mult),into_journal_STAR_,model,(50));
});

org.numenta.sanity.bridge.browser.init.cljs$lang$maxFixedArity = 6;

