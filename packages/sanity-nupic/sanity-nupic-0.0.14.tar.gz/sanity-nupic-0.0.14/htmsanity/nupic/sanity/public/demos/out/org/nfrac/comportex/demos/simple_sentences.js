// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.demos.simple_sentences');
goog.require('cljs.core');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
goog.require('org.nfrac.comportex.encoders');
goog.require('org.nfrac.comportex.layer');
goog.require('clojure.string');
org.nfrac.comportex.demos.simple_sentences.bit_width = (500);
org.nfrac.comportex.demos.simple_sentences.n_on_bits = (25);
org.nfrac.comportex.demos.simple_sentences.params = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1000)], null),cljs.core.cst$kw$depth,(8),cljs.core.cst$kw$distal,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$perm_DASH_init,0.21], null),cljs.core.cst$kw$distal_DASH_vs_DASH_proximal_DASH_weight,0.2], null);
org.nfrac.comportex.demos.simple_sentences.higher_level_params = org.nfrac.comportex.util.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([org.nfrac.comportex.demos.simple_sentences.params,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$column_DASH_dimensions,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(800)], null),cljs.core.cst$kw$proximal,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$max_DASH_segments,(5)], null)], null)], 0));
org.nfrac.comportex.demos.simple_sentences.input_text = "Jane has eyes.\nJane has a head.\nJane has a mouth.\nJane has a brain.\nJane has a book.\nJane has no friend.\n\nChifung has eyes.\nChifung has a head.\nChifung has a mouth.\nChifung has a brain.\nChifung has no book.\nChifung has a friend.\n\nJane is something.\nJane is alive.\nJane is a person.\nJane can talk.\nJane can walk.\nJane can eat.\n\nChifung is something.\nChifung is alive.\nChifung is a person.\nChifung can talk.\nChifung can walk.\nChifung can eat.\n\nfox has eyes.\nfox has a head.\nfox has a mouth.\nfox has a brain.\nfox has a tail.\nfox is something.\nfox is alive.\nfox is no person.\nfox can no talk.\nfox can walk.\nfox can eat.\n\ndoes Jane have eyes ? yes.\ndoes Jane have a head ? yes.\ndoes Jane have a mouth ? yes.\ndoes Jane have a brain ? yes.\ndoes Jane have a book ? yes.\ndoes Jane have a friend ? no.\ndoes Jane have a tail ? no.\n\ndoes Chifung have eyes ? yes.\ndoes Chifung have a head ? yes.\ndoes Chifung have a mouth ? yes.\ndoes Chifung have a brain ? yes.\ndoes Chifung have a book ? no.\ndoes Chifung have a friend ? yes.\ndoes Chifung have a tail ? no.\n\ndoes fox have eyes ? yes.\ndoes fox have a head ? yes.\ndoes fox have a mouth ? yes.\ndoes fox have a brain ? yes.\ndoes fox have a book ? no.\ndoes fox have a friend ? no.\ndoes fox have a tail ? yes.\n\nJane has no tail.\nChifung has no tail.\n";
org.nfrac.comportex.demos.simple_sentences.split_sentences = (function org$nfrac$comportex$demos$simple_sentences$split_sentences(text_STAR_){
var text = clojure.string.lower_case(clojure.string.trim(text_STAR_));
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__81594_SHARP_){
return cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(p1__81594_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null)));
});})(text))
,cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (text){
return (function (p1__81593_SHARP_){
return clojure.string.split.cljs$core$IFn$_invoke$arity$2(p1__81593_SHARP_,/[^\w']+/);
});})(text))
,clojure.string.split.cljs$core$IFn$_invoke$arity$2(text,/[^\w]*\.+[^\w]*/)));
});
/**
 * An input sequence consisting of words from the given text, with
 * periods separating sentences also included as distinct words. Each
 * sequence element has the form `{:word _, :index [i j]}`, where i is
 * the sentence index and j is the word index into sentence j.
 */
org.nfrac.comportex.demos.simple_sentences.word_item_seq = (function org$nfrac$comportex$demos$simple_sentences$word_item_seq(n_repeats,text){
var iter__10132__auto__ = (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668(s__81669){
return (new cljs.core.LazySeq(null,(function (){
var s__81669__$1 = s__81669;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__81669__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__81709 = cljs.core.first(xs__7284__auto__);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81709,(0),null);
var sen = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81709,(1),null);
var iterys__10128__auto__ = ((function (s__81669__$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668_$_iter__81670(s__81671){
return (new cljs.core.LazySeq(null,((function (s__81669__$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__81671__$1 = s__81671;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__81671__$1);
if(temp__6728__auto____$1){
var xs__7284__auto____$1 = temp__6728__auto____$1;
var rep = cljs.core.first(xs__7284__auto____$1);
var iterys__10128__auto__ = ((function (s__81671__$1,s__81669__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668_$_iter__81670_$_iter__81672(s__81673){
return (new cljs.core.LazySeq(null,((function (s__81671__$1,s__81669__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__){
return (function (){
var s__81673__$1 = s__81673;
while(true){
var temp__6728__auto____$2 = cljs.core.seq(s__81673__$1);
if(temp__6728__auto____$2){
var s__81673__$2 = temp__6728__auto____$2;
if(cljs.core.chunked_seq_QMARK_(s__81673__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__81673__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__81675 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__81674 = (0);
while(true){
if((i__81674 < size__10131__auto__)){
var vec__81735 = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__81674);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81735,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81735,(1),null);
cljs.core.chunk_append(b__81675,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null));

var G__81741 = (i__81674 + (1));
i__81674 = G__81741;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__81675),org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668_$_iter__81670_$_iter__81672(cljs.core.chunk_rest(s__81673__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__81675),null);
}
} else {
var vec__81738 = cljs.core.first(s__81673__$2);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81738,(0),null);
var word = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__81738,(1),null);
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$word,word,cljs.core.cst$kw$index,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,j], null)], null),org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668_$_iter__81670_$_iter__81672(cljs.core.rest(s__81673__$2)));
}
} else {
return null;
}
break;
}
});})(s__81671__$1,s__81669__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__81671__$1,s__81669__$1,rep,xs__7284__auto____$1,temp__6728__auto____$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sen)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668_$_iter__81670(cljs.core.rest(s__81671__$1)));
} else {
var G__81742 = cljs.core.rest(s__81671__$1);
s__81671__$1 = G__81742;
continue;
}
} else {
return null;
}
break;
}
});})(s__81669__$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__))
,null,null));
});})(s__81669__$1,vec__81709,i,sen,xs__7284__auto__,temp__6728__auto__))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_repeats)));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,org$nfrac$comportex$demos$simple_sentences$word_item_seq_$_iter__81668(cljs.core.rest(s__81669__$1)));
} else {
var G__81743 = cljs.core.rest(s__81669__$1);
s__81669__$1 = G__81743;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,org.nfrac.comportex.demos.simple_sentences.split_sentences(text)));
});
org.nfrac.comportex.demos.simple_sentences.random_sensor = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$word,org.nfrac.comportex.encoders.unique_encoder(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.demos.simple_sentences.bit_width], null),org.nfrac.comportex.demos.simple_sentences.n_on_bits)], null);
org.nfrac.comportex.demos.simple_sentences.build = (function org$nfrac$comportex$demos$simple_sentences$build(var_args){
var args81744 = [];
var len__10461__auto___81747 = arguments.length;
var i__10462__auto___81748 = (0);
while(true){
if((i__10462__auto___81748 < len__10461__auto___81747)){
args81744.push((arguments[i__10462__auto___81748]));

var G__81749 = (i__10462__auto___81748 + (1));
i__10462__auto___81748 = G__81749;
continue;
} else {
}
break;
}

var G__81746 = args81744.length;
switch (G__81746) {
case 0:
return org.nfrac.comportex.demos.simple_sentences.build.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return org.nfrac.comportex.demos.simple_sentences.build.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args81744.length)].join('')));

}
});

org.nfrac.comportex.demos.simple_sentences.build.cljs$core$IFn$_invoke$arity$0 = (function (){
return org.nfrac.comportex.demos.simple_sentences.build.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.demos.simple_sentences.params);
});

org.nfrac.comportex.demos.simple_sentences.build.cljs$core$IFn$_invoke$arity$1 = (function (params){
return org.nfrac.comportex.core.network.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$layer_DASH_a,org.nfrac.comportex.layer.layer_of_cells(params)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$input,org.nfrac.comportex.demos.simple_sentences.random_sensor], null));
});

org.nfrac.comportex.demos.simple_sentences.build.cljs$lang$maxFixedArity = 1;

