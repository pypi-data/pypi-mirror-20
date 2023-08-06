// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.bridge.marshalling');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.core.async.impl.protocols');
goog.require('cognitect.transit');

/**
 * @interface
 */
org.numenta.sanity.bridge.marshalling.PMarshalled = function(){};

org.numenta.sanity.bridge.marshalling.release_BANG_ = (function org$numenta$sanity$bridge$marshalling$release_BANG_(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1 == null)))){
return this$.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.bridge.marshalling.release_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.bridge.marshalling.release_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PMarshalled.release!",this$);
}
}
}
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.bridge.marshalling.PMarshalled}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.bridge.marshalling.ChannelMarshal = (function (ch,single_use_QMARK_,released_QMARK_,__meta,__extmap,__hash){
this.ch = ch;
this.single_use_QMARK_ = single_use_QMARK_;
this.released_QMARK_ = released_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k45574,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__45576 = (((k45574 instanceof cljs.core.Keyword))?k45574.fqn:null);
switch (G__45576) {
case "ch":
return self__.ch;

break;
case "single-use?":
return self__.single_use_QMARK_;

break;
case "released?":
return self__.released_QMARK_;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45574,else__9951__auto__);

}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$ = true;

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.released_QMARK_,true) : cljs.core.reset_BANG_.call(null,self__.released_QMARK_,true));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.bridge.marshalling.ChannelMarshal{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$single_DASH_use_QMARK_,self__.single_use_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45573){
var self__ = this;
var G__45573__$1 = this;
return (new cljs.core.RecordIter((0),G__45573__$1,3,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$single_DASH_use_QMARK_,cljs.core.cst$kw$released_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (3 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$ch,null,cljs.core.cst$kw$single_DASH_use_QMARK_,null,cljs.core.cst$kw$released_QMARK_,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__45573){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__45577 = cljs.core.keyword_identical_QMARK_;
var expr__45578 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__45580 = cljs.core.cst$kw$ch;
var G__45581 = expr__45578;
return (pred__45577.cljs$core$IFn$_invoke$arity$2 ? pred__45577.cljs$core$IFn$_invoke$arity$2(G__45580,G__45581) : pred__45577.call(null,G__45580,G__45581));
})())){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(G__45573,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45582 = cljs.core.cst$kw$single_DASH_use_QMARK_;
var G__45583 = expr__45578;
return (pred__45577.cljs$core$IFn$_invoke$arity$2 ? pred__45577.cljs$core$IFn$_invoke$arity$2(G__45582,G__45583) : pred__45577.call(null,G__45582,G__45583));
})())){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,G__45573,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45584 = cljs.core.cst$kw$released_QMARK_;
var G__45585 = expr__45578;
return (pred__45577.cljs$core$IFn$_invoke$arity$2 ? pred__45577.cljs$core$IFn$_invoke$arity$2(G__45584,G__45585) : pred__45577.call(null,G__45584,G__45585));
})())){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,G__45573,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__45573),null));
}
}
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$single_DASH_use_QMARK_,self__.single_use_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__45573){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(self__.ch,self__.single_use_QMARK_,self__.released_QMARK_,G__45573,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ch,cljs.core.cst$sym$single_DASH_use_QMARK_,cljs.core.cst$sym$released_QMARK_], null);
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ChannelMarshal.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/ChannelMarshal");
});

org.numenta.sanity.bridge.marshalling.ChannelMarshal.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.bridge.marshalling/ChannelMarshal");
});

org.numenta.sanity.bridge.marshalling.__GT_ChannelMarshal = (function org$numenta$sanity$bridge$marshalling$__GT_ChannelMarshal(ch,single_use_QMARK_,released_QMARK_){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(ch,single_use_QMARK_,released_QMARK_,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_ChannelMarshal = (function org$numenta$sanity$bridge$marshalling$map__GT_ChannelMarshal(G__45575){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(G__45575),cljs.core.cst$kw$single_DASH_use_QMARK_.cljs$core$IFn$_invoke$arity$1(G__45575),cljs.core.cst$kw$released_QMARK_.cljs$core$IFn$_invoke$arity$1(G__45575),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__45575,cljs.core.cst$kw$ch,cljs.core.array_seq([cljs.core.cst$kw$single_DASH_use_QMARK_,cljs.core.cst$kw$released_QMARK_], 0)),null));
});

/**
 * Allows a channel to be marshalled across the network.
 * 
 *   When Client A serializes a ChannelMarshal, Client A will assign it a target-id
 *   and send the target-id across the network. When decoding the message, Client B
 *   will set the decoded ChannelMarshal's :ch field to a ChannelProxy. Any `put!`
 *   or `close!` on a ChannelProxy will be delivered across the network back to
 *   Client A.
 * 
 *   Client B should not send a ChannelMarshal back to Client A. It will create a
 *   silly chain of proxies. Use `channel-weak`.
 * 
 *   All of this assumes that the network code on both clients is using
 *   write-handlers and read-handlers that follow this protocol.
 */
org.numenta.sanity.bridge.marshalling.channel = (function org$numenta$sanity$bridge$marshalling$channel(var_args){
var args45587 = [];
var len__10461__auto___45590 = arguments.length;
var i__10462__auto___45591 = (0);
while(true){
if((i__10462__auto___45591 < len__10461__auto___45590)){
args45587.push((arguments[i__10462__auto___45591]));

var G__45592 = (i__10462__auto___45591 + (1));
i__10462__auto___45591 = G__45592;
continue;
} else {
}
break;
}

var G__45589 = args45587.length;
switch (G__45589) {
case 1:
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args45587.length)].join('')));

}
});

org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(ch,false);
});

org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2 = (function (ch,single_use_QMARK_){
return (new org.numenta.sanity.bridge.marshalling.ChannelMarshal(ch,single_use_QMARK_,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),null,null,null));
});

org.numenta.sanity.bridge.marshalling.channel.cljs$lang$maxFixedArity = 2;


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal = (function (target_id,__meta,__extmap,__hash){
this.target_id = target_id;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k45595,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__45597 = (((k45595 instanceof cljs.core.Keyword))?k45595.fqn:null);
switch (G__45597) {
case "target-id":
return self__.target_id;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45595,else__9951__auto__);

}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45594){
var self__ = this;
var G__45594__$1 = this;
return (new cljs.core.RecordIter((0),G__45594__$1,1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target_DASH_id], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (1 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$target_DASH_id,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__45594){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__45598 = cljs.core.keyword_identical_QMARK_;
var expr__45599 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__45601 = cljs.core.cst$kw$target_DASH_id;
var G__45602 = expr__45599;
return (pred__45598.cljs$core$IFn$_invoke$arity$2 ? pred__45598.cljs$core$IFn$_invoke$arity$2(G__45601,G__45602) : pred__45598.call(null,G__45601,G__45602));
})())){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(G__45594,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__45594),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__45594){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(self__.target_id,G__45594,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$target_DASH_id], null);
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/ChannelWeakMarshal");
});

org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.bridge.marshalling/ChannelWeakMarshal");
});

org.numenta.sanity.bridge.marshalling.__GT_ChannelWeakMarshal = (function org$numenta$sanity$bridge$marshalling$__GT_ChannelWeakMarshal(target_id){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(target_id,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_ChannelWeakMarshal = (function org$numenta$sanity$bridge$marshalling$map__GT_ChannelWeakMarshal(G__45596){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(G__45596),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__45596,cljs.core.cst$kw$target_DASH_id),null));
});

/**
 * Allows a marshalled channel to be referred to without creating chains of
 *   proxies.
 * 
 *   When a client decodes a message containing a ChannelWeakMarshal, it will check
 *   if this target-id belongs to this client. If it does, this ChannelWeakMarshal
 *   will be 'decoded' into its original ChannelMarshal. This allows Client B to
 *   tell Client A 'If we get disconnected, send me this data blob on reconnect,
 *   and I'll remember you'. This allows the data blob to contain channels that are
 *   usable again on second send without causing a chain of proxies.
 * 
 *   All of this assumes that the network code on both clients is using
 *   write-handlers and read-handlers that follow this protocol.
 */
org.numenta.sanity.bridge.marshalling.channel_weak = (function org$numenta$sanity$bridge$marshalling$channel_weak(target_id){
return (new org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal(target_id,null,null,null));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.bridge.marshalling.PMarshalled}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.bridge.marshalling.BigValueMarshal = (function (resource_id,value,pushed_QMARK_,released_QMARK_,__meta,__extmap,__hash){
this.resource_id = resource_id;
this.value = value;
this.pushed_QMARK_ = pushed_QMARK_;
this.released_QMARK_ = released_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k45605,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__45607 = (((k45605 instanceof cljs.core.Keyword))?k45605.fqn:null);
switch (G__45607) {
case "resource-id":
return self__.resource_id;

break;
case "value":
return self__.value;

break;
case "pushed?":
return self__.pushed_QMARK_;

break;
case "released?":
return self__.released_QMARK_;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45605,else__9951__auto__);

}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$ = true;

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.org$numenta$sanity$bridge$marshalling$PMarshalled$release_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(self__.released_QMARK_,true) : cljs.core.reset_BANG_.call(null,self__.released_QMARK_,true));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.bridge.marshalling.BigValueMarshal{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$resource_DASH_id,self__.resource_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value,self__.value],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pushed_QMARK_,self__.pushed_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45604){
var self__ = this;
var G__45604__$1 = this;
return (new cljs.core.RecordIter((0),G__45604__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$resource_DASH_id,cljs.core.cst$kw$value,cljs.core.cst$kw$pushed_QMARK_,cljs.core.cst$kw$released_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$value,null,cljs.core.cst$kw$resource_DASH_id,null,cljs.core.cst$kw$pushed_QMARK_,null,cljs.core.cst$kw$released_QMARK_,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__45604){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__45608 = cljs.core.keyword_identical_QMARK_;
var expr__45609 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__45611 = cljs.core.cst$kw$resource_DASH_id;
var G__45612 = expr__45609;
return (pred__45608.cljs$core$IFn$_invoke$arity$2 ? pred__45608.cljs$core$IFn$_invoke$arity$2(G__45611,G__45612) : pred__45608.call(null,G__45611,G__45612));
})())){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(G__45604,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45613 = cljs.core.cst$kw$value;
var G__45614 = expr__45609;
return (pred__45608.cljs$core$IFn$_invoke$arity$2 ? pred__45608.cljs$core$IFn$_invoke$arity$2(G__45613,G__45614) : pred__45608.call(null,G__45613,G__45614));
})())){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,G__45604,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45615 = cljs.core.cst$kw$pushed_QMARK_;
var G__45616 = expr__45609;
return (pred__45608.cljs$core$IFn$_invoke$arity$2 ? pred__45608.cljs$core$IFn$_invoke$arity$2(G__45615,G__45616) : pred__45608.call(null,G__45615,G__45616));
})())){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,G__45604,self__.released_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45617 = cljs.core.cst$kw$released_QMARK_;
var G__45618 = expr__45609;
return (pred__45608.cljs$core$IFn$_invoke$arity$2 ? pred__45608.cljs$core$IFn$_invoke$arity$2(G__45617,G__45618) : pred__45608.call(null,G__45617,G__45618));
})())){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,G__45604,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__45604),null));
}
}
}
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$resource_DASH_id,self__.resource_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$value,self__.value],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$pushed_QMARK_,self__.pushed_QMARK_],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$released_QMARK_,self__.released_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__45604){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(self__.resource_id,self__.value,self__.pushed_QMARK_,self__.released_QMARK_,G__45604,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$resource_DASH_id,cljs.core.cst$sym$value,cljs.core.cst$sym$pushed_QMARK_,cljs.core.cst$sym$released_QMARK_], null);
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.BigValueMarshal.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/BigValueMarshal");
});

org.numenta.sanity.bridge.marshalling.BigValueMarshal.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.bridge.marshalling/BigValueMarshal");
});

org.numenta.sanity.bridge.marshalling.__GT_BigValueMarshal = (function org$numenta$sanity$bridge$marshalling$__GT_BigValueMarshal(resource_id,value,pushed_QMARK_,released_QMARK_){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(resource_id,value,pushed_QMARK_,released_QMARK_,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_BigValueMarshal = (function org$numenta$sanity$bridge$marshalling$map__GT_BigValueMarshal(G__45606){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(cljs.core.cst$kw$resource_DASH_id.cljs$core$IFn$_invoke$arity$1(G__45606),cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(G__45606),cljs.core.cst$kw$pushed_QMARK_.cljs$core$IFn$_invoke$arity$1(G__45606),cljs.core.cst$kw$released_QMARK_.cljs$core$IFn$_invoke$arity$1(G__45606),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__45606,cljs.core.cst$kw$resource_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$value,cljs.core.cst$kw$pushed_QMARK_,cljs.core.cst$kw$released_QMARK_], 0)),null));
});

/**
 * Put a value in a box labelled 'recipients should cache this so that I don't
 *   have to send it every time.'
 * 
 *   When Client B decodes a message containing a BigValueMarshal, it will save the
 *   value and tell Client A that it has saved the value. Later, when Client A
 *   serializes the same BigValueMarshal to send it to Client B, it will only
 *   include the resource-id, and Client B will reinsert the value when it decodes
 *   the message.
 * 
 *   Call `release!` on a BigValueMarshal to tell other machines that they can
 *   release it.
 * 
 *   All of this assumes that the network code on both clients is using
 *   write-handlers and read-handlers that follow this protocol.
 */
org.numenta.sanity.bridge.marshalling.big_value = (function org$numenta$sanity$bridge$marshalling$big_value(value){
return (new org.numenta.sanity.bridge.marshalling.BigValueMarshal(cljs.core.random_uuid(),value,false,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false)),null,null,null));
});
org.numenta.sanity.bridge.marshalling.future = (function org$numenta$sanity$bridge$marshalling$future(val){
if(typeof org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IWithMeta}
*/
org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623 = (function (future,val,meta45624){
this.future = future;
this.val = val;
this.meta45624 = meta45624;
this.cljs$lang$protocol_mask$partition0$ = 425984;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_45625,meta45624__$1){
var self__ = this;
var _45625__$1 = this;
return (new org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623(self__.future,self__.val,meta45624__$1));
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_45625){
var self__ = this;
var _45625__$1 = this;
return self__.meta45624;
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.prototype.cljs$core$IDeref$_deref$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.val;
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(cljs.core.cst$sym$future,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$arglists,cljs.core.list(cljs.core.cst$sym$quote,cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$val], null)))], null)),cljs.core.cst$sym$val,cljs.core.cst$sym$meta45624], null);
});

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.cljs$lang$ctorStr = "org.numenta.sanity.bridge.marshalling/t_org$numenta$sanity$bridge$marshalling45623";

org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623.cljs$lang$ctorPrWriter = (function (this__9930__auto__,writer__9931__auto__,opt__9932__auto__){
return cljs.core._write(writer__9931__auto__,"org.numenta.sanity.bridge.marshalling/t_org$numenta$sanity$bridge$marshalling45623");
});

org.numenta.sanity.bridge.marshalling.__GT_t_org$numenta$sanity$bridge$marshalling45623 = (function org$numenta$sanity$bridge$marshalling$future_$___GT_t_org$numenta$sanity$bridge$marshalling45623(future__$1,val__$1,meta45624){
return (new org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623(future__$1,val__$1,meta45624));
});

}

return (new org.numenta.sanity.bridge.marshalling.t_org$numenta$sanity$bridge$marshalling45623(org$numenta$sanity$bridge$marshalling$future,val,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
*/
org.numenta.sanity.bridge.marshalling.ImpersonateChannel = (function (fput,fclose,ftake){
this.fput = fput;
this.fclose = fclose;
this.ftake = ftake;
})
org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,___$1){
var self__ = this;
var ___$2 = this;
return org.numenta.sanity.bridge.marshalling.future((self__.ftake.cljs$core$IFn$_invoke$arity$0 ? self__.ftake.cljs$core$IFn$_invoke$arity$0() : self__.ftake.call(null)));
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,v,___$1){
var self__ = this;
var ___$2 = this;
if(cljs.core.truth_(v)){
} else {
throw (new Error("Assert failed: v"));
}

return org.numenta.sanity.bridge.marshalling.future((self__.fput.cljs$core$IFn$_invoke$arity$1 ? self__.fput.cljs$core$IFn$_invoke$arity$1(v) : self__.fput.call(null,v)));
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$Channel$ = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return (self__.fclose.cljs$core$IFn$_invoke$arity$0 ? self__.fclose.cljs$core$IFn$_invoke$arity$0() : self__.fclose.call(null));
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$fput,cljs.core.cst$sym$fclose,cljs.core.cst$sym$ftake], null);
});

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.cljs$lang$ctorStr = "org.numenta.sanity.bridge.marshalling/ImpersonateChannel";

org.numenta.sanity.bridge.marshalling.ImpersonateChannel.cljs$lang$ctorPrWriter = (function (this__9930__auto__,writer__9931__auto__,opt__9932__auto__){
return cljs.core._write(writer__9931__auto__,"org.numenta.sanity.bridge.marshalling/ImpersonateChannel");
});

org.numenta.sanity.bridge.marshalling.__GT_ImpersonateChannel = (function org$numenta$sanity$bridge$marshalling$__GT_ImpersonateChannel(fput,fclose,ftake){
return (new org.numenta.sanity.bridge.marshalling.ImpersonateChannel(fput,fclose,ftake));
});


/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.bridge.marshalling.ChannelProxy = (function (target_id,ch,__meta,__extmap,__hash){
this.target_id = target_id;
this.ch = ch;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$ReadPort$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,handler);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$Channel$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k45627,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__45629 = (((k45627 instanceof cljs.core.Keyword))?k45627.fqn:null);
switch (G__45629) {
case "target-id":
return self__.target_id;

break;
case "ch":
return self__.ch;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45627,else__9951__auto__);

}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.bridge.marshalling.ChannelProxy{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45626){
var self__ = this;
var G__45626__$1 = this;
return (new cljs.core.RecordIter((0),G__45626__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$target_DASH_id,cljs.core.cst$kw$ch], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
var self__ = this;
var this__9943__auto____$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_imap(this__9943__auto____$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
var self__ = this;
var this__9944__auto____$1 = this;
if(cljs.core.truth_((function (){var and__9266__auto__ = other__9945__auto__;
if(cljs.core.truth_(and__9266__auto__)){
var and__9266__auto____$1 = (this__9944__auto____$1.constructor === other__9945__auto__.constructor);
if(and__9266__auto____$1){
return cljs.core.equiv_map(this__9944__auto____$1,other__9945__auto__);
} else {
return and__9266__auto____$1;
}
} else {
return and__9266__auto__;
}
})())){
return true;
} else {
return false;
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$WritePort$ = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,v,handler){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,v,handler);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$target_DASH_id,null,cljs.core.cst$kw$ch,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__45626){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__45630 = cljs.core.keyword_identical_QMARK_;
var expr__45631 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__45633 = cljs.core.cst$kw$target_DASH_id;
var G__45634 = expr__45631;
return (pred__45630.cljs$core$IFn$_invoke$arity$2 ? pred__45630.cljs$core$IFn$_invoke$arity$2(G__45633,G__45634) : pred__45630.call(null,G__45633,G__45634));
})())){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(G__45626,self__.ch,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45635 = cljs.core.cst$kw$ch;
var G__45636 = expr__45631;
return (pred__45630.cljs$core$IFn$_invoke$arity$2 ? pred__45630.cljs$core$IFn$_invoke$arity$2(G__45635,G__45636) : pred__45630.call(null,G__45635,G__45636));
})())){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,G__45626,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__45626),null));
}
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$target_DASH_id,self__.target_id],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ch,self__.ch],null))], null),self__.__extmap));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__45626){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(self__.target_id,self__.ch,G__45626,self__.__extmap,self__.__hash));
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$target_DASH_id,cljs.core.cst$sym$ch], null);
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.cljs$lang$type = true;

org.numenta.sanity.bridge.marshalling.ChannelProxy.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.bridge.marshalling/ChannelProxy");
});

org.numenta.sanity.bridge.marshalling.ChannelProxy.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.bridge.marshalling/ChannelProxy");
});

org.numenta.sanity.bridge.marshalling.__GT_ChannelProxy = (function org$numenta$sanity$bridge$marshalling$__GT_ChannelProxy(target_id,ch){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(target_id,ch,null,null,null));
});

org.numenta.sanity.bridge.marshalling.map__GT_ChannelProxy = (function org$numenta$sanity$bridge$marshalling$map__GT_ChannelProxy(G__45628){
return (new org.numenta.sanity.bridge.marshalling.ChannelProxy(cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(G__45628),cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(G__45628),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__45628,cljs.core.cst$kw$target_DASH_id,cljs.core.array_seq([cljs.core.cst$kw$ch], 0)),null));
});

org.numenta.sanity.bridge.marshalling.encoding = cljs.core.cst$kw$json;
org.numenta.sanity.bridge.marshalling.write_handlers = (function org$numenta$sanity$bridge$marshalling$write_handlers(target__GT_mchannel,local_resources){
return cljs.core.PersistentArrayMap.fromArray([org.numenta.sanity.bridge.marshalling.ChannelMarshal,cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((function (_){
return "ChannelMarshal";
}),(function (mchannel){
var target_id = cljs.core.random_uuid();
var released_QMARK_ = cljs.core.cst$kw$released_QMARK_.cljs$core$IFn$_invoke$arity$1(mchannel);
if(cljs.core.not((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(released_QMARK_) : cljs.core.deref.call(null,released_QMARK_)))){
cljs.core.add_watch(released_QMARK_,cljs.core.random_uuid(),((function (target_id,released_QMARK_){
return (function (_,___$1,___$2,r_QMARK_){
if(cljs.core.truth_(r_QMARK_)){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(target__GT_mchannel,cljs.core.dissoc,target_id);
} else {
return null;
}
});})(target_id,released_QMARK_))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(target__GT_mchannel,cljs.core.assoc,target_id,mchannel);

return target_id;
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Serializing a released channel!",mchannel], 0));
}
})),org.numenta.sanity.bridge.marshalling.ChannelWeakMarshal,cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((function (_){
return "ChannelWeakMarshal";
}),(function (wmchannel){
return cljs.core.cst$kw$target_DASH_id.cljs$core$IFn$_invoke$arity$1(wmchannel);
})),org.numenta.sanity.bridge.marshalling.BigValueMarshal,cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((function (_){
return "BigValueMarshal";
}),(function (marshal){
var map__45669 = marshal;
var map__45669__$1 = ((((!((map__45669 == null)))?((((map__45669.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45669.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__45669):map__45669);
var released_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45669__$1,cljs.core.cst$kw$released_QMARK_);
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45669__$1,cljs.core.cst$kw$resource_DASH_id);
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(released_QMARK_) : cljs.core.deref.call(null,released_QMARK_)))){
} else {
if(cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(local_resources) : cljs.core.deref.call(null,local_resources)),resource_id)){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(local_resources,cljs.core.assoc,resource_id,marshal);

cljs.core.add_watch(released_QMARK_,local_resources,((function (map__45669,map__45669__$1,released_QMARK_,resource_id){
return (function (_,___$1,___$2,r_QMARK_){
if(cljs.core.truth_(r_QMARK_)){
cljs.core.remove_watch(released_QMARK_,local_resources);

var temp__6728__auto___45700 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(local_resources) : cljs.core.deref.call(null,local_resources)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [resource_id,cljs.core.cst$kw$on_DASH_released_DASH_c], null));
if(cljs.core.truth_(temp__6728__auto___45700)){
var ch_45701 = temp__6728__auto___45700;
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch_45701,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$release], null));
} else {
}

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(local_resources,cljs.core.dissoc,resource_id);
} else {
return null;
}
});})(map__45669,map__45669__$1,released_QMARK_,resource_id))
);
}
}

if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(local_resources) : cljs.core.deref.call(null,local_resources)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [resource_id,cljs.core.cst$kw$pushed_QMARK_], null)))){
return new cljs.core.PersistentArrayMap(null, 1, ["resource-id",resource_id], null);
} else {
var saved_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__42110__auto___45702 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id){
return (function (state_45685){
var state_val_45686 = (state_45685[(1)]);
if((state_val_45686 === (1))){
var state_45685__$1 = state_45685;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45685__$1,(2),saved_c);
} else {
if((state_val_45686 === (2))){
var inst_45672 = (state_45685[(7)]);
var inst_45672__$1 = (state_45685[(2)]);
var state_45685__$1 = (function (){var statearr_45687 = state_45685;
(statearr_45687[(7)] = inst_45672__$1);

return statearr_45687;
})();
if(cljs.core.truth_(inst_45672__$1)){
var statearr_45688_45703 = state_45685__$1;
(statearr_45688_45703[(1)] = (3));

} else {
var statearr_45689_45704 = state_45685__$1;
(statearr_45689_45704[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_45686 === (3))){
var inst_45672 = (state_45685[(7)]);
var inst_45677 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_45672,(0),null);
var inst_45678 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_45672,(1),null);
var inst_45679 = (function (){var temp__6728__auto__ = inst_45672;
var vec__45674 = inst_45672;
var _ = inst_45677;
var on_released_c_marshal = inst_45678;
return ((function (temp__6728__auto__,vec__45674,_,on_released_c_marshal,inst_45672,inst_45677,inst_45678,state_val_45686,c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id){
return (function (marshal__$1){
var G__45690 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(marshal__$1,cljs.core.cst$kw$pushed_QMARK_,true);
if(cljs.core.truth_(on_released_c_marshal)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45690,cljs.core.cst$kw$on_DASH_released_DASH_c,cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(on_released_c_marshal));
} else {
return G__45690;
}
});
;})(temp__6728__auto__,vec__45674,_,on_released_c_marshal,inst_45672,inst_45677,inst_45678,state_val_45686,c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id))
})();
var inst_45680 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(local_resources,cljs.core.update,resource_id,inst_45679);
var state_45685__$1 = state_45685;
var statearr_45691_45705 = state_45685__$1;
(statearr_45691_45705[(2)] = inst_45680);

(statearr_45691_45705[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_45686 === (4))){
var state_45685__$1 = state_45685;
var statearr_45692_45706 = state_45685__$1;
(statearr_45692_45706[(2)] = null);

(statearr_45692_45706[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_45686 === (5))){
var inst_45683 = (state_45685[(2)]);
var state_45685__$1 = state_45685;
return cljs.core.async.impl.ioc_helpers.return_chan(state_45685__$1,inst_45683);
} else {
return null;
}
}
}
}
}
});})(c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id))
;
return ((function (switch__41984__auto__,c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id){
return (function() {
var org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto____0 = (function (){
var statearr_45696 = [null,null,null,null,null,null,null,null];
(statearr_45696[(0)] = org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto__);

(statearr_45696[(1)] = (1));

return statearr_45696;
});
var org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto____1 = (function (state_45685){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_45685);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e45697){if((e45697 instanceof Object)){
var ex__41988__auto__ = e45697;
var statearr_45698_45707 = state_45685;
(statearr_45698_45707[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_45685);

return cljs.core.cst$kw$recur;
} else {
throw e45697;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__45708 = state_45685;
state_45685 = G__45708;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto__ = function(state_45685){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto____1.call(this,state_45685);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto____0;
org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto____1;
return org$numenta$sanity$bridge$marshalling$write_handlers_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id))
})();
var state__42112__auto__ = (function (){var statearr_45699 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_45699[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___45702);

return statearr_45699;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___45702,saved_c,map__45669,map__45669__$1,released_QMARK_,resource_id))
);


return new cljs.core.PersistentArrayMap(null, 3, ["resource-id",resource_id,"value",cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(marshal),"on-saved-c-marshal",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(saved_c,true)], null);
}
}))], true, false);
});
org.numenta.sanity.bridge.marshalling.read_handlers = (function org$numenta$sanity$bridge$marshalling$read_handlers(target__GT_mchannel,fput,fclose,remote_resources){
return new cljs.core.PersistentArrayMap(null, 3, ["ChannelMarshal",cognitect.transit.read_handler((function (target_id){
return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1((new org.numenta.sanity.bridge.marshalling.ChannelProxy(target_id,(new org.numenta.sanity.bridge.marshalling.ImpersonateChannel((function (v){
return (fput.cljs$core$IFn$_invoke$arity$2 ? fput.cljs$core$IFn$_invoke$arity$2(target_id,v) : fput.call(null,target_id,v));
}),(function (){
return (fclose.cljs$core$IFn$_invoke$arity$1 ? fclose.cljs$core$IFn$_invoke$arity$1(target_id) : fclose.call(null,target_id));
}),null)),null,null,null)));
})),"ChannelWeakMarshal",cognitect.transit.read_handler((function (target_id){
var temp__6726__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel)),target_id);
if(cljs.core.truth_(temp__6726__auto__)){
var mchannel = temp__6726__auto__;
return mchannel;
} else {
return org.numenta.sanity.bridge.marshalling.channel_weak(target_id);
}
})),"BigValueMarshal",cognitect.transit.read_handler((function (m){
var map__45733 = m;
var map__45733__$1 = ((((!((map__45733 == null)))?((((map__45733.cljs$lang$protocol_mask$partition0$ & (64))) || (map__45733.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__45733):map__45733);
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45733__$1,"resource-id");
var on_saved_c_marshal = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45733__$1,"on-saved-c-marshal");
var new_QMARK_ = !(cljs.core.contains_QMARK_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(remote_resources) : cljs.core.deref.call(null,remote_resources)),resource_id));
if(new_QMARK_){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(remote_resources,cljs.core.assoc,resource_id,(new org.numenta.sanity.bridge.marshalling.BigValueMarshal(resource_id,cljs.core.get.cljs$core$IFn$_invoke$arity$2(m,"value"),null,null,null,null,null)));
} else {
}

if(cljs.core.truth_(on_saved_c_marshal)){
var on_released_c_marshal_45757 = ((new_QMARK_)?(function (){var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var c__42110__auto___45758 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___45758,ch,map__45733,map__45733__$1,resource_id,on_saved_c_marshal,new_QMARK_){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___45758,ch,map__45733,map__45733__$1,resource_id,on_saved_c_marshal,new_QMARK_){
return (function (state_45744){
var state_val_45745 = (state_45744[(1)]);
if((state_val_45745 === (1))){
var state_45744__$1 = state_45744;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_45744__$1,(2),ch);
} else {
if((state_val_45745 === (2))){
var inst_45736 = (state_45744[(2)]);
var inst_45737 = (inst_45736 == null);
var state_45744__$1 = state_45744;
if(cljs.core.truth_(inst_45737)){
var statearr_45746_45759 = state_45744__$1;
(statearr_45746_45759[(1)] = (3));

} else {
var statearr_45747_45760 = state_45744__$1;
(statearr_45747_45760[(1)] = (4));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_45745 === (3))){
var state_45744__$1 = state_45744;
var statearr_45748_45761 = state_45744__$1;
(statearr_45748_45761[(2)] = null);

(statearr_45748_45761[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_45745 === (4))){
var inst_45740 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(remote_resources,cljs.core.dissoc,resource_id);
var state_45744__$1 = state_45744;
var statearr_45749_45762 = state_45744__$1;
(statearr_45749_45762[(2)] = inst_45740);

(statearr_45749_45762[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_45745 === (5))){
var inst_45742 = (state_45744[(2)]);
var state_45744__$1 = state_45744;
return cljs.core.async.impl.ioc_helpers.return_chan(state_45744__$1,inst_45742);
} else {
return null;
}
}
}
}
}
});})(c__42110__auto___45758,ch,map__45733,map__45733__$1,resource_id,on_saved_c_marshal,new_QMARK_))
;
return ((function (switch__41984__auto__,c__42110__auto___45758,ch,map__45733,map__45733__$1,resource_id,on_saved_c_marshal,new_QMARK_){
return (function() {
var org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto____0 = (function (){
var statearr_45753 = [null,null,null,null,null,null,null];
(statearr_45753[(0)] = org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto__);

(statearr_45753[(1)] = (1));

return statearr_45753;
});
var org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto____1 = (function (state_45744){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_45744);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e45754){if((e45754 instanceof Object)){
var ex__41988__auto__ = e45754;
var statearr_45755_45763 = state_45744;
(statearr_45755_45763[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_45744);

return cljs.core.cst$kw$recur;
} else {
throw e45754;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__45764 = state_45744;
state_45744 = G__45764;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto__ = function(state_45744){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto____1.call(this,state_45744);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto____0;
org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto____1;
return org$numenta$sanity$bridge$marshalling$read_handlers_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___45758,ch,map__45733,map__45733__$1,resource_id,on_saved_c_marshal,new_QMARK_))
})();
var state__42112__auto__ = (function (){var statearr_45756 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_45756[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___45758);

return statearr_45756;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___45758,ch,map__45733,map__45733__$1,resource_id,on_saved_c_marshal,new_QMARK_))
);


return org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(ch);
})():null);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(on_saved_c_marshal),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$saved,on_released_c_marshal_45757], null));
} else {
}

return cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(remote_resources) : cljs.core.deref.call(null,remote_resources)),resource_id);
}))], null);
});
