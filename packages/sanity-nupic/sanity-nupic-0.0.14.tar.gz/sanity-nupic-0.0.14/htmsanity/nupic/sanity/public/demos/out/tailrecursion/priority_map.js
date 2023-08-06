// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('tailrecursion.priority_map');
goog.require('cljs.core');
goog.require('cljs.core');
goog.require('cljs.reader');

/**
* @constructor
 * @implements {cljs.core.IReversible}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IFn}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.IEmptyableCollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISorted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IStack}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
tailrecursion.priority_map.PersistentPriorityMap = (function (priority__GT_set_of_items,item__GT_priority,meta,keyfn,__hash){
this.priority__GT_set_of_items = priority__GT_set_of_items;
this.item__GT_priority = item__GT_priority;
this.meta = meta;
this.keyfn = keyfn;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2565220111;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (coll,item,not_found){
var self__ = this;
var coll__$1 = this;
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,not_found);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (coll,writer,opts){
var self__ = this;
var coll__$1 = this;
var pr_pair = ((function (coll__$1){
return (function (keyval){
return cljs.core.pr_sequential_writer(writer,cljs.core.pr_writer,""," ","",opts,keyval);
});})(coll__$1))
;
return cljs.core.pr_sequential_writer(writer,pr_pair,"#tailrecursion.priority-map {",", ","}",opts,coll__$1);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.meta;
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.count(self__.item__GT_priority);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IStack$_peek$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((cljs.core.count(self__.item__GT_priority) === (0))){
return null;
} else {
var f = cljs.core.first(self__.priority__GT_set_of_items);
var item = cljs.core.first(cljs.core.val(f));
if(cljs.core.truth_(self__.keyfn)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,cljs.core.key(f)], null);
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IStack$_pop$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if((cljs.core.count(self__.item__GT_priority) === (0))){
throw (new Error("Can't pop empty priority map"));
} else {
var f = cljs.core.first(self__.priority__GT_set_of_items);
var item_set = cljs.core.val(f);
var item = cljs.core.first(item_set);
var priority_key = cljs.core.key(f);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,priority_key),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(item_set,item)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IReversible$_rseq$arity$1 = (function (coll){
var self__ = this;
var coll__$1 = this;
if(cljs.core.truth_(self__.keyfn)){
return cljs.core.seq((function (){var iter__10132__auto__ = ((function (coll__$1){
return (function tailrecursion$priority_map$iter__48402(s__48403){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__48403__$1 = s__48403;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__48403__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__48414 = cljs.core.first(xs__7284__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48414,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48414,(1),null);
var iterys__10128__auto__ = ((function (s__48403__$1,vec__48414,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__48402_$_iter__48404(s__48405){
return (new cljs.core.LazySeq(null,((function (s__48403__$1,vec__48414,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1){
return (function (){
var s__48405__$1 = s__48405;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__48405__$1);
if(temp__6728__auto____$1){
var s__48405__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48405__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__48405__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__48407 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__48406 = (0);
while(true){
if((i__48406 < size__10131__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__48406);
cljs.core.chunk_append(b__48407,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__48507 = (i__48406 + (1));
i__48406 = G__48507;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48407),tailrecursion$priority_map$iter__48402_$_iter__48404(cljs.core.chunk_rest(s__48405__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48407),null);
}
} else {
var item = cljs.core.first(s__48405__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__48402_$_iter__48404(cljs.core.rest(s__48405__$2)));
}
} else {
return null;
}
break;
}
});})(s__48403__$1,vec__48414,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1))
,null,null));
});})(s__48403__$1,vec__48414,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(item_set));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,tailrecursion$priority_map$iter__48402(cljs.core.rest(s__48403__$1)));
} else {
var G__48508 = cljs.core.rest(s__48403__$1);
s__48403__$1 = G__48508;
continue;
}
} else {
return null;
}
break;
}
});})(coll__$1))
,null,null));
});})(coll__$1))
;
return iter__10132__auto__(cljs.core.rseq(self__.priority__GT_set_of_items));
})());
} else {
return cljs.core.seq((function (){var iter__10132__auto__ = ((function (coll__$1){
return (function tailrecursion$priority_map$iter__48419(s__48420){
return (new cljs.core.LazySeq(null,((function (coll__$1){
return (function (){
var s__48420__$1 = s__48420;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__48420__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__48431 = cljs.core.first(xs__7284__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48431,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48431,(1),null);
var iterys__10128__auto__ = ((function (s__48420__$1,vec__48431,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1){
return (function tailrecursion$priority_map$iter__48419_$_iter__48421(s__48422){
return (new cljs.core.LazySeq(null,((function (s__48420__$1,vec__48431,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1){
return (function (){
var s__48422__$1 = s__48422;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__48422__$1);
if(temp__6728__auto____$1){
var s__48422__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48422__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__48422__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__48424 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__48423 = (0);
while(true){
if((i__48423 < size__10131__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__48423);
cljs.core.chunk_append(b__48424,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__48509 = (i__48423 + (1));
i__48423 = G__48509;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48424),tailrecursion$priority_map$iter__48419_$_iter__48421(cljs.core.chunk_rest(s__48422__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48424),null);
}
} else {
var item = cljs.core.first(s__48422__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__48419_$_iter__48421(cljs.core.rest(s__48422__$2)));
}
} else {
return null;
}
break;
}
});})(s__48420__$1,vec__48431,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1))
,null,null));
});})(s__48420__$1,vec__48431,priority,item_set,xs__7284__auto__,temp__6728__auto__,coll__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(item_set));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,tailrecursion$priority_map$iter__48419(cljs.core.rest(s__48420__$1)));
} else {
var G__48510 = cljs.core.rest(s__48420__$1);
s__48420__$1 = G__48510;
continue;
}
} else {
return null;
}
break;
}
});})(coll__$1))
,null,null));
});})(coll__$1))
;
return iter__10132__auto__(cljs.core.rseq(self__.priority__GT_set_of_items));
})());
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var h__9715__auto__ = self__.__hash;
if(!((h__9715__auto__ == null))){
return h__9715__auto__;
} else {
var h__9715__auto____$1 = cljs.core.hash_unordered_coll(this$__$1);
self__.__hash = h__9715__auto____$1;

return h__9715__auto____$1;
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return cljs.core._equiv(self__.item__GT_priority,other);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.with_meta(tailrecursion.priority_map.PersistentPriorityMap.EMPTY,self__.meta);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
var priority = (function (){var G__48436 = item;
var G__48437 = cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found;
return (self__.item__GT_priority.cljs$core$IFn$_invoke$arity$2 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$2(G__48436,G__48437) : self__.item__GT_priority.call(null,G__48436,G__48437));
})();
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(priority,cljs.core.cst$kw$tailrecursion$priority_DASH_map_SLASH_not_DASH_found)){
return this$__$1;
} else {
var priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(priority) : self__.keyfn.call(null,priority));
var item_set = (self__.priority__GT_set_of_items.cljs$core$IFn$_invoke$arity$1 ? self__.priority__GT_set_of_items.cljs$core$IFn$_invoke$arity$1(priority_key) : self__.priority__GT_set_of_items.call(null,priority_key));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,priority_key),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(item_set,item)),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.item__GT_priority,item),self__.meta,self__.keyfn,null));
}
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this$,item,priority){
var self__ = this;
var this$__$1 = this;
var temp__6726__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,null);
if(cljs.core.truth_(temp__6726__auto__)){
var current_priority = temp__6726__auto__;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(current_priority,priority)){
return this$__$1;
} else {
var priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(priority) : self__.keyfn.call(null,priority));
var current_priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(current_priority) : self__.keyfn.call(null,current_priority));
var item_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority_key);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(item_set),(1))){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority_key),priority_key,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.PersistentHashSet.EMPTY),item)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,self__.keyfn,null));
} else {
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.priority__GT_set_of_items,current_priority_key,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(self__.priority__GT_set_of_items,current_priority_key),item),cljs.core.array_seq([priority_key,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.PersistentHashSet.EMPTY),item)], 0)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,self__.keyfn,null));
}
}
} else {
var priority_key = (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(priority) : self__.keyfn.call(null,priority));
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,priority_key,cljs.core.PersistentHashSet.EMPTY),item)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.item__GT_priority,item,priority),self__.meta,self__.keyfn,null));
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this$,item){
var self__ = this;
var this$__$1 = this;
return cljs.core.contains_QMARK_(self__.item__GT_priority,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.keyfn)){
return cljs.core.seq((function (){var iter__10132__auto__ = ((function (this$__$1){
return (function tailrecursion$priority_map$iter__48438(s__48439){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__48439__$1 = s__48439;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__48439__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__48450 = cljs.core.first(xs__7284__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48450,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48450,(1),null);
var iterys__10128__auto__ = ((function (s__48439__$1,vec__48450,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__48438_$_iter__48440(s__48441){
return (new cljs.core.LazySeq(null,((function (s__48439__$1,vec__48450,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1){
return (function (){
var s__48441__$1 = s__48441;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__48441__$1);
if(temp__6728__auto____$1){
var s__48441__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48441__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__48441__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__48443 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__48442 = (0);
while(true){
if((i__48442 < size__10131__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__48442);
cljs.core.chunk_append(b__48443,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__48511 = (i__48442 + (1));
i__48442 = G__48511;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48443),tailrecursion$priority_map$iter__48438_$_iter__48440(cljs.core.chunk_rest(s__48441__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48443),null);
}
} else {
var item = cljs.core.first(s__48441__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__48438_$_iter__48440(cljs.core.rest(s__48441__$2)));
}
} else {
return null;
}
break;
}
});})(s__48439__$1,vec__48450,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1))
,null,null));
});})(s__48439__$1,vec__48450,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(item_set));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,tailrecursion$priority_map$iter__48438(cljs.core.rest(s__48439__$1)));
} else {
var G__48512 = cljs.core.rest(s__48439__$1);
s__48439__$1 = G__48512;
continue;
}
} else {
return null;
}
break;
}
});})(this$__$1))
,null,null));
});})(this$__$1))
;
return iter__10132__auto__(self__.priority__GT_set_of_items);
})());
} else {
return cljs.core.seq((function (){var iter__10132__auto__ = ((function (this$__$1){
return (function tailrecursion$priority_map$iter__48455(s__48456){
return (new cljs.core.LazySeq(null,((function (this$__$1){
return (function (){
var s__48456__$1 = s__48456;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__48456__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__48467 = cljs.core.first(xs__7284__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48467,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48467,(1),null);
var iterys__10128__auto__ = ((function (s__48456__$1,vec__48467,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1){
return (function tailrecursion$priority_map$iter__48455_$_iter__48457(s__48458){
return (new cljs.core.LazySeq(null,((function (s__48456__$1,vec__48467,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1){
return (function (){
var s__48458__$1 = s__48458;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__48458__$1);
if(temp__6728__auto____$1){
var s__48458__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48458__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__48458__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__48460 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__48459 = (0);
while(true){
if((i__48459 < size__10131__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__48459);
cljs.core.chunk_append(b__48460,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__48513 = (i__48459 + (1));
i__48459 = G__48513;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48460),tailrecursion$priority_map$iter__48455_$_iter__48457(cljs.core.chunk_rest(s__48458__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48460),null);
}
} else {
var item = cljs.core.first(s__48458__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__48455_$_iter__48457(cljs.core.rest(s__48458__$2)));
}
} else {
return null;
}
break;
}
});})(s__48456__$1,vec__48467,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1))
,null,null));
});})(s__48456__$1,vec__48467,priority,item_set,xs__7284__auto__,temp__6728__auto__,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(item_set));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,tailrecursion$priority_map$iter__48455(cljs.core.rest(s__48456__$1)));
} else {
var G__48514 = cljs.core.rest(s__48456__$1);
s__48456__$1 = G__48514;
continue;
}
} else {
return null;
}
break;
}
});})(this$__$1))
,null,null));
});})(this$__$1))
;
return iter__10132__auto__(self__.priority__GT_set_of_items);
})());
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this$,meta__$1){
var self__ = this;
var this$__$1 = this;
return (new tailrecursion.priority_map.PersistentPriorityMap(self__.priority__GT_set_of_items,self__.item__GT_priority,meta__$1,self__.keyfn,self__.__hash));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this$,entry){
var self__ = this;
var this$__$1 = this;
if(cljs.core.vector_QMARK_(entry)){
return cljs.core._assoc(this$__$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this$__$1,entry);
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.call = (function() {
var G__48515 = null;
var G__48515__2 = (function (self__,item){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});
var G__48515__3 = (function (self__,item,not_found){
var self__ = this;
var self____$1 = this;
var this$ = self____$1;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});
G__48515 = function(self__,item,not_found){
switch(arguments.length){
case 2:
return G__48515__2.call(this,self__,item);
case 3:
return G__48515__3.call(this,self__,item,not_found);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__48515.cljs$core$IFn$_invoke$arity$2 = G__48515__2;
G__48515.cljs$core$IFn$_invoke$arity$3 = G__48515__3;
return G__48515;
})()
;

tailrecursion.priority_map.PersistentPriorityMap.prototype.apply = (function (self__,args48401){
var self__ = this;
var self____$1 = this;
return self____$1.call.apply(self____$1,[self____$1].concat(cljs.core.aclone(args48401)));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IFn$_invoke$arity$1 = (function (item){
var self__ = this;
var this$ = this;
return this$.cljs$core$ILookup$_lookup$arity$2(null,item);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$IFn$_invoke$arity$2 = (function (item,not_found){
var self__ = this;
var this$ = this;
return this$.cljs$core$ILookup$_lookup$arity$3(null,item,not_found);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = (function (this$,ascending_QMARK_){
var self__ = this;
var this$__$1 = this;
return (cljs.core.truth_(ascending_QMARK_)?cljs.core.seq:cljs.core.rseq).call(null,this$__$1);
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = (function (this$,k,ascending_QMARK_){
var self__ = this;
var this$__$1 = this;
var sets = (cljs.core.truth_(ascending_QMARK_)?cljs.core.subseq.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,cljs.core._GT__EQ_,k):cljs.core.rsubseq.cljs$core$IFn$_invoke$arity$3(self__.priority__GT_set_of_items,cljs.core._LT__EQ_,k));
if(cljs.core.truth_(self__.keyfn)){
return cljs.core.seq((function (){var iter__10132__auto__ = ((function (sets,this$__$1){
return (function tailrecursion$priority_map$iter__48472(s__48473){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__48473__$1 = s__48473;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__48473__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__48484 = cljs.core.first(xs__7284__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48484,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48484,(1),null);
var iterys__10128__auto__ = ((function (s__48473__$1,vec__48484,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__48472_$_iter__48474(s__48475){
return (new cljs.core.LazySeq(null,((function (s__48473__$1,vec__48484,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1){
return (function (){
var s__48475__$1 = s__48475;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__48475__$1);
if(temp__6728__auto____$1){
var s__48475__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48475__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__48475__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__48477 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__48476 = (0);
while(true){
if((i__48476 < size__10131__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__48476);
cljs.core.chunk_append(b__48477,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null));

var G__48516 = (i__48476 + (1));
i__48476 = G__48516;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48477),tailrecursion$priority_map$iter__48472_$_iter__48474(cljs.core.chunk_rest(s__48475__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48477),null);
}
} else {
var item = cljs.core.first(s__48475__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,(self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1 ? self__.item__GT_priority.cljs$core$IFn$_invoke$arity$1(item) : self__.item__GT_priority.call(null,item))], null),tailrecursion$priority_map$iter__48472_$_iter__48474(cljs.core.rest(s__48475__$2)));
}
} else {
return null;
}
break;
}
});})(s__48473__$1,vec__48484,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1))
,null,null));
});})(s__48473__$1,vec__48484,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(item_set));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,tailrecursion$priority_map$iter__48472(cljs.core.rest(s__48473__$1)));
} else {
var G__48517 = cljs.core.rest(s__48473__$1);
s__48473__$1 = G__48517;
continue;
}
} else {
return null;
}
break;
}
});})(sets,this$__$1))
,null,null));
});})(sets,this$__$1))
;
return iter__10132__auto__(sets);
})());
} else {
return cljs.core.seq((function (){var iter__10132__auto__ = ((function (sets,this$__$1){
return (function tailrecursion$priority_map$iter__48489(s__48490){
return (new cljs.core.LazySeq(null,((function (sets,this$__$1){
return (function (){
var s__48490__$1 = s__48490;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__48490__$1);
if(temp__6728__auto__){
var xs__7284__auto__ = temp__6728__auto__;
var vec__48501 = cljs.core.first(xs__7284__auto__);
var priority = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48501,(0),null);
var item_set = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48501,(1),null);
var iterys__10128__auto__ = ((function (s__48490__$1,vec__48501,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1){
return (function tailrecursion$priority_map$iter__48489_$_iter__48491(s__48492){
return (new cljs.core.LazySeq(null,((function (s__48490__$1,vec__48501,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1){
return (function (){
var s__48492__$1 = s__48492;
while(true){
var temp__6728__auto____$1 = cljs.core.seq(s__48492__$1);
if(temp__6728__auto____$1){
var s__48492__$2 = temp__6728__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48492__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__48492__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__48494 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__48493 = (0);
while(true){
if((i__48493 < size__10131__auto__)){
var item = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__48493);
cljs.core.chunk_append(b__48494,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null));

var G__48518 = (i__48493 + (1));
i__48493 = G__48518;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48494),tailrecursion$priority_map$iter__48489_$_iter__48491(cljs.core.chunk_rest(s__48492__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48494),null);
}
} else {
var item = cljs.core.first(s__48492__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [item,priority], null),tailrecursion$priority_map$iter__48489_$_iter__48491(cljs.core.rest(s__48492__$2)));
}
} else {
return null;
}
break;
}
});})(s__48490__$1,vec__48501,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1))
,null,null));
});})(s__48490__$1,vec__48501,priority,item_set,xs__7284__auto__,temp__6728__auto__,sets,this$__$1))
;
var fs__10129__auto__ = cljs.core.seq(iterys__10128__auto__(item_set));
if(fs__10129__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__10129__auto__,tailrecursion$priority_map$iter__48489(cljs.core.rest(s__48490__$1)));
} else {
var G__48519 = cljs.core.rest(s__48490__$1);
s__48490__$1 = G__48519;
continue;
}
} else {
return null;
}
break;
}
});})(sets,this$__$1))
,null,null));
});})(sets,this$__$1))
;
return iter__10132__auto__(sets);
})());
}
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = (function (this$,entry){
var self__ = this;
var this$__$1 = this;
var G__48506 = cljs.core.val(entry);
return (self__.keyfn.cljs$core$IFn$_invoke$arity$1 ? self__.keyfn.cljs$core$IFn$_invoke$arity$1(G__48506) : self__.keyfn.call(null,G__48506));
});

tailrecursion.priority_map.PersistentPriorityMap.prototype.cljs$core$ISorted$_comparator$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.compare;
});

tailrecursion.priority_map.PersistentPriorityMap.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$priority_DASH__GT_set_DASH_of_DASH_items,cljs.core.cst$sym$item_DASH__GT_priority,cljs.core.cst$sym$meta,cljs.core.cst$sym$keyfn,cljs.core.with_meta(cljs.core.cst$sym$__hash,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$mutable,true], null))], null);
});

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$type = true;

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$ctorStr = "tailrecursion.priority-map/PersistentPriorityMap";

tailrecursion.priority_map.PersistentPriorityMap.cljs$lang$ctorPrWriter = (function (this__9930__auto__,writer__9931__auto__,opt__9932__auto__){
return cljs.core._write(writer__9931__auto__,"tailrecursion.priority-map/PersistentPriorityMap");
});

tailrecursion.priority_map.__GT_PersistentPriorityMap = (function tailrecursion$priority_map$__GT_PersistentPriorityMap(priority__GT_set_of_items,item__GT_priority,meta,keyfn,__hash){
return (new tailrecursion.priority_map.PersistentPriorityMap(priority__GT_set_of_items,item__GT_priority,meta,keyfn,__hash));
});

tailrecursion.priority_map.PersistentPriorityMap.EMPTY = (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map(),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.identity,null));
tailrecursion.priority_map.pm_empty_by = (function tailrecursion$priority_map$pm_empty_by(comparator){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map_by(comparator),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,cljs.core.identity,null));
});
tailrecursion.priority_map.pm_empty_keyfn = (function tailrecursion$priority_map$pm_empty_keyfn(var_args){
var args48520 = [];
var len__10461__auto___48523 = arguments.length;
var i__10462__auto___48524 = (0);
while(true){
if((i__10462__auto___48524 < len__10461__auto___48523)){
args48520.push((arguments[i__10462__auto___48524]));

var G__48525 = (i__10462__auto___48524 + (1));
i__10462__auto___48524 = G__48525;
continue;
} else {
}
break;
}

var G__48522 = args48520.length;
switch (G__48522) {
case 1:
return tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args48520.length)].join('')));

}
});

tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1 = (function (keyfn){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map(),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,keyfn,null));
});

tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2 = (function (keyfn,comparator){
return (new tailrecursion.priority_map.PersistentPriorityMap(cljs.core.sorted_map_by(comparator),cljs.core.PersistentArrayMap.EMPTY,cljs.core.PersistentArrayMap.EMPTY,keyfn,null));
});

tailrecursion.priority_map.pm_empty_keyfn.cljs$lang$maxFixedArity = 2;

tailrecursion.priority_map.read_priority_map = (function tailrecursion$priority_map$read_priority_map(elems){
if(cljs.core.map_QMARK_(elems)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.PersistentPriorityMap.EMPTY,elems);
} else {
return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null,cljs.core.array_seq(["Priority map literal expects a map for its elements."], 0));
}
});
cljs.reader.register_tag_parser_BANG_("tailrecursion.priority-map",tailrecursion.priority_map.read_priority_map);
/**
 * keyval => key val
 *   Returns a new priority map with supplied mappings.
 */
tailrecursion.priority_map.priority_map = (function tailrecursion$priority_map$priority_map(var_args){
var args__10468__auto__ = [];
var len__10461__auto___48528 = arguments.length;
var i__10462__auto___48529 = (0);
while(true){
if((i__10462__auto___48529 < len__10461__auto___48528)){
args__10468__auto__.push((arguments[i__10462__auto___48529]));

var G__48530 = (i__10462__auto___48529 + (1));
i__10462__auto___48529 = G__48530;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((0) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((0)),(0),null)):null);
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(argseq__10469__auto__);
});

tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic = (function (keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.PersistentPriorityMap.EMPTY;
while(true){
if(in$){
var G__48531 = cljs.core.nnext(in$);
var G__48532 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__48531;
out = G__48532;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map.cljs$lang$maxFixedArity = (0);

tailrecursion.priority_map.priority_map.cljs$lang$applyTo = (function (seq48527){
return tailrecursion.priority_map.priority_map.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq48527));
});

/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied comparator.
 */
tailrecursion.priority_map.priority_map_by = (function tailrecursion$priority_map$priority_map_by(var_args){
var args__10468__auto__ = [];
var len__10461__auto___48535 = arguments.length;
var i__10462__auto___48536 = (0);
while(true){
if((i__10462__auto___48536 < len__10461__auto___48535)){
args__10468__auto__.push((arguments[i__10462__auto___48536]));

var G__48537 = (i__10462__auto___48536 + (1));
i__10462__auto___48536 = G__48537;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic = (function (comparator,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_by(comparator);
while(true){
if(in$){
var G__48538 = cljs.core.nnext(in$);
var G__48539 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__48538;
out = G__48539;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_by.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_by.cljs$lang$applyTo = (function (seq48533){
var G__48534 = cljs.core.first(seq48533);
var seq48533__$1 = cljs.core.next(seq48533);
return tailrecursion.priority_map.priority_map_by.cljs$core$IFn$_invoke$arity$variadic(G__48534,seq48533__$1);
});

/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied keyfn.
 */
tailrecursion.priority_map.priority_map_keyfn = (function tailrecursion$priority_map$priority_map_keyfn(var_args){
var args__10468__auto__ = [];
var len__10461__auto___48542 = arguments.length;
var i__10462__auto___48543 = (0);
while(true){
if((i__10462__auto___48543 < len__10461__auto___48542)){
args__10468__auto__.push((arguments[i__10462__auto___48543]));

var G__48544 = (i__10462__auto___48543 + (1));
i__10462__auto___48543 = G__48544;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic = (function (keyfn,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$1(keyfn);
while(true){
if(in$){
var G__48545 = cljs.core.nnext(in$);
var G__48546 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__48545;
out = G__48546;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_keyfn.cljs$lang$maxFixedArity = (1);

tailrecursion.priority_map.priority_map_keyfn.cljs$lang$applyTo = (function (seq48540){
var G__48541 = cljs.core.first(seq48540);
var seq48540__$1 = cljs.core.next(seq48540);
return tailrecursion.priority_map.priority_map_keyfn.cljs$core$IFn$_invoke$arity$variadic(G__48541,seq48540__$1);
});

/**
 * keyval => key val
 *   Returns a new priority map with supplied
 *   mappings, using the supplied keyfn and comparator.
 */
tailrecursion.priority_map.priority_map_keyfn_by = (function tailrecursion$priority_map$priority_map_keyfn_by(var_args){
var args__10468__auto__ = [];
var len__10461__auto___48550 = arguments.length;
var i__10462__auto___48551 = (0);
while(true){
if((i__10462__auto___48551 < len__10461__auto___48550)){
args__10468__auto__.push((arguments[i__10462__auto___48551]));

var G__48552 = (i__10462__auto___48551 + (1));
i__10462__auto___48551 = G__48552;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((2) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((2)),(0),null)):null);
return tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__10469__auto__);
});

tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic = (function (keyfn,comparator,keyvals){
var in$ = cljs.core.seq(keyvals);
var out = tailrecursion.priority_map.pm_empty_keyfn.cljs$core$IFn$_invoke$arity$2(keyfn,comparator);
while(true){
if(in$){
var G__48553 = cljs.core.nnext(in$);
var G__48554 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(out,cljs.core.first(in$),cljs.core.second(in$));
in$ = G__48553;
out = G__48554;
continue;
} else {
return out;
}
break;
}
});

tailrecursion.priority_map.priority_map_keyfn_by.cljs$lang$maxFixedArity = (2);

tailrecursion.priority_map.priority_map_keyfn_by.cljs$lang$applyTo = (function (seq48547){
var G__48548 = cljs.core.first(seq48547);
var seq48547__$1 = cljs.core.next(seq48547);
var G__48549 = cljs.core.first(seq48547__$1);
var seq48547__$2 = cljs.core.next(seq48547__$1);
return tailrecursion.priority_map.priority_map_keyfn_by.cljs$core$IFn$_invoke$arity$variadic(G__48548,G__48549,seq48547__$2);
});

