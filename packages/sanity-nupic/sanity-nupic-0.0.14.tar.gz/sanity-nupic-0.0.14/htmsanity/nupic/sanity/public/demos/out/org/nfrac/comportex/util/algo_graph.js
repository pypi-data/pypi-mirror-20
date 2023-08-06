// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.nfrac.comportex.util.algo_graph');
goog.require('cljs.core');
goog.require('clojure.set');

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
org.nfrac.comportex.util.algo_graph.DirectedGraph = (function (nodes,neighbors,__meta,__extmap,__hash){
this.nodes = nodes;
this.neighbors = neighbors;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k45857,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__45859 = (((k45857 instanceof cljs.core.Keyword))?k45857.fqn:null);
switch (G__45859) {
case "nodes":
return self__.nodes;

break;
case "neighbors":
return self__.neighbors;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45857,else__9951__auto__);

}
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.nfrac.comportex.util.algo-graph.DirectedGraph{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$nodes,self__.nodes],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$neighbors,self__.neighbors],null))], null),self__.__extmap));
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IIterable$ = true;

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45856){
var self__ = this;
var G__45856__$1 = this;
return (new cljs.core.RecordIter((0),G__45856__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$nodes,cljs.core.cst$kw$neighbors], null),cljs.core._iterator(self__.__extmap)));
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(self__.nodes,self__.neighbors,self__.__meta,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$nodes,null,cljs.core.cst$kw$neighbors,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(self__.nodes,self__.neighbors,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__45856){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__45860 = cljs.core.keyword_identical_QMARK_;
var expr__45861 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__45863 = cljs.core.cst$kw$nodes;
var G__45864 = expr__45861;
return (pred__45860.cljs$core$IFn$_invoke$arity$2 ? pred__45860.cljs$core$IFn$_invoke$arity$2(G__45863,G__45864) : pred__45860.call(null,G__45863,G__45864));
})())){
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(G__45856,self__.neighbors,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__45865 = cljs.core.cst$kw$neighbors;
var G__45866 = expr__45861;
return (pred__45860.cljs$core$IFn$_invoke$arity$2 ? pred__45860.cljs$core$IFn$_invoke$arity$2(G__45865,G__45866) : pred__45860.call(null,G__45865,G__45866));
})())){
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(self__.nodes,G__45856,self__.__meta,self__.__extmap,null));
} else {
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(self__.nodes,self__.neighbors,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__45856),null));
}
}
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$nodes,self__.nodes],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$neighbors,self__.neighbors],null))], null),self__.__extmap));
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__45856){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(self__.nodes,self__.neighbors,G__45856,self__.__extmap,self__.__hash));
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$nodes,cljs.core.cst$sym$neighbors], null);
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.cljs$lang$type = true;

org.nfrac.comportex.util.algo_graph.DirectedGraph.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.nfrac.comportex.util.algo-graph/DirectedGraph");
});

org.nfrac.comportex.util.algo_graph.DirectedGraph.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.nfrac.comportex.util.algo-graph/DirectedGraph");
});

org.nfrac.comportex.util.algo_graph.__GT_DirectedGraph = (function org$nfrac$comportex$util$algo_graph$__GT_DirectedGraph(nodes,neighbors){
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(nodes,neighbors,null,null,null));
});

org.nfrac.comportex.util.algo_graph.map__GT_DirectedGraph = (function org$nfrac$comportex$util$algo_graph$map__GT_DirectedGraph(G__45858){
return (new org.nfrac.comportex.util.algo_graph.DirectedGraph(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(G__45858),cljs.core.cst$kw$neighbors.cljs$core$IFn$_invoke$arity$1(G__45858),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__45858,cljs.core.cst$kw$nodes,cljs.core.array_seq([cljs.core.cst$kw$neighbors], 0)),null));
});

/**
 * `nodes` - The nodes of the graph, a collection.
 * `neighbors` - A function from a node to its neighbor nodes collection.
 */
org.nfrac.comportex.util.algo_graph.directed_graph = (function org$nfrac$comportex$util$algo_graph$directed_graph(nodes,neighbors){
return org.nfrac.comportex.util.algo_graph.__GT_DirectedGraph(nodes,neighbors);
});
/**
 * Get the neighbors of a node.
 */
org.nfrac.comportex.util.algo_graph.get_neighbors = (function org$nfrac$comportex$util$algo_graph$get_neighbors(g,n){
return cljs.core.cst$kw$neighbors.cljs$core$IFn$_invoke$arity$1(g).call(null,n);
});
/**
 * Given a directed graph, return another directed graph with the
 * order of the edges reversed.
 */
org.nfrac.comportex.util.algo_graph.reverse_graph = (function org$nfrac$comportex$util$algo_graph$reverse_graph(g){
var op = (function (rna,idx){
var ns = org.nfrac.comportex.util.algo_graph.get_neighbors(g,idx);
var am = ((function (ns){
return (function (m,val){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,val,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(m,val,cljs.core.PersistentHashSet.EMPTY),idx));
});})(ns))
;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(am,rna,ns);
});
var rn = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(op,cljs.core.PersistentArrayMap.EMPTY,cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g));
return org.nfrac.comportex.util.algo_graph.directed_graph(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g),rn);
});
/**
 * For each node n, add the edge n->n if not already present.
 */
org.nfrac.comportex.util.algo_graph.add_loops = (function org$nfrac$comportex$util$algo_graph$add_loops(g){
return org.nfrac.comportex.util.algo_graph.directed_graph(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (n){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.set(org.nfrac.comportex.util.algo_graph.get_neighbors(g,n)),n)], null);
}),cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g))));
});
/**
 * For each node n, remove any edges n->n.
 */
org.nfrac.comportex.util.algo_graph.remove_loops = (function org$nfrac$comportex$util$algo_graph$remove_loops(g){
return org.nfrac.comportex.util.algo_graph.directed_graph(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (n){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,cljs.core.disj.cljs$core$IFn$_invoke$arity$2(cljs.core.set(org.nfrac.comportex.util.algo_graph.get_neighbors(g,n)),n)], null);
}),cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g))));
});
/**
 * Return a lazy sequence of the nodes of a graph starting a node n.  Optionally,
 * provide a set of visited notes (v) and a collection of nodes to
 * visit (ns).
 */
org.nfrac.comportex.util.algo_graph.lazy_walk = (function org$nfrac$comportex$util$algo_graph$lazy_walk(var_args){
var args45868 = [];
var len__10461__auto___45871 = arguments.length;
var i__10462__auto___45872 = (0);
while(true){
if((i__10462__auto___45872 < len__10461__auto___45871)){
args45868.push((arguments[i__10462__auto___45872]));

var G__45873 = (i__10462__auto___45872 + (1));
i__10462__auto___45872 = G__45873;
continue;
} else {
}
break;
}

var G__45870 = args45868.length;
switch (G__45870) {
case 2:
return org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args45868.length)].join('')));

}
});

org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$2 = (function (g,n){
return org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$3(g,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [n], null),cljs.core.PersistentHashSet.EMPTY);
});

org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$3 = (function (g,ns,v){
return (new cljs.core.LazySeq(null,(function (){
var s = cljs.core.seq(cljs.core.drop_while.cljs$core$IFn$_invoke$arity$2(v,ns));
var n = cljs.core.first(s);
var ns__$1 = cljs.core.rest(s);
if(s){
return cljs.core.cons(n,org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$3(g,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.util.algo_graph.get_neighbors(g,n),ns__$1),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(v,n)));
} else {
return null;
}
}),null,null));
});

org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$lang$maxFixedArity = 3;

/**
 * Returns the transitive closure of a graph.  The neighbors are lazily computed.
 * 
 * Note: some version of this algorithm return all edges a->a
 * regardless of whether such loops exist in the original graph.  This
 * version does not.  Loops will be included only if produced by
 * cycles in the graph.  If you have code that depends on such
 * behavior, call (-> g transitive-closure add-loops)
 */
org.nfrac.comportex.util.algo_graph.transitive_closure = (function org$nfrac$comportex$util$algo_graph$transitive_closure(g){
var nns = (function (n){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,(new cljs.core.Delay((function (){
return org.nfrac.comportex.util.algo_graph.lazy_walk.cljs$core$IFn$_invoke$arity$3(g,org.nfrac.comportex.util.algo_graph.get_neighbors(g,n),cljs.core.PersistentHashSet.EMPTY);
}),null))], null);
});
var nbs = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(nns,cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g)));
return org.nfrac.comportex.util.algo_graph.directed_graph(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g),((function (nns,nbs){
return (function (n){
return cljs.core.force((nbs.cljs$core$IFn$_invoke$arity$1 ? nbs.cljs$core$IFn$_invoke$arity$1(n) : nbs.call(null,n)));
});})(nns,nbs))
);
});
/**
 * Starting at node n, perform a post-ordered walk.
 */
org.nfrac.comportex.util.algo_graph.post_ordered_visit = (function org$nfrac$comportex$util$algo_graph$post_ordered_visit(g,n,p__45875){
var vec__45882 = p__45875;
var visited = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45882,(0),null);
var acc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45882,(1),null);
var state = vec__45882;
if(cljs.core.truth_((visited.cljs$core$IFn$_invoke$arity$1 ? visited.cljs$core$IFn$_invoke$arity$1(n) : visited.call(null,n)))){
return state;
} else {
var vec__45885 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (vec__45882,visited,acc,state){
return (function (st,nd){
return org$nfrac$comportex$util$algo_graph$post_ordered_visit(g,nd,st);
});})(vec__45882,visited,acc,state))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.conj.cljs$core$IFn$_invoke$arity$2(visited,n),acc], null),org.nfrac.comportex.util.algo_graph.get_neighbors(g,n));
var v2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45885,(0),null);
var acc2 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45885,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [v2,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc2,n)], null);
}
});
/**
 * Return a sequence of indexes of a post-ordered walk of the graph.
 */
org.nfrac.comportex.util.algo_graph.post_ordered_nodes = (function org$nfrac$comportex$util$algo_graph$post_ordered_nodes(g){
return cljs.core.fnext(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__45889_SHARP_,p2__45888_SHARP_){
return org.nfrac.comportex.util.algo_graph.post_ordered_visit(g,p2__45888_SHARP_,p1__45889_SHARP_);
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentHashSet.EMPTY,cljs.core.PersistentVector.EMPTY], null),cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g)));
});
/**
 * Returns, as a sequence of sets, the strongly connected components
 * of g.
 */
org.nfrac.comportex.util.algo_graph.scc = (function org$nfrac$comportex$util$algo_graph$scc(g){
var po = cljs.core.reverse(org.nfrac.comportex.util.algo_graph.post_ordered_nodes(g));
var rev = org.nfrac.comportex.util.algo_graph.reverse_graph(g);
var step = ((function (po,rev){
return (function (stack,visited,acc){
while(true){
if(cljs.core.empty_QMARK_(stack)){
return acc;
} else {
var vec__45893 = org.nfrac.comportex.util.algo_graph.post_ordered_visit(rev,cljs.core.first(stack),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [visited,cljs.core.PersistentHashSet.EMPTY], null));
var nv = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45893,(0),null);
var comp = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45893,(1),null);
var ns = cljs.core.remove.cljs$core$IFn$_invoke$arity$2(nv,stack);
var G__45896 = ns;
var G__45897 = nv;
var G__45898 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(acc,comp);
stack = G__45896;
visited = G__45897;
acc = G__45898;
continue;
}
break;
}
});})(po,rev))
;
return step(po,cljs.core.PersistentHashSet.EMPTY,cljs.core.PersistentVector.EMPTY);
});
/**
 * Given a graph, perhaps with cycles, return a reduced graph that is acyclic.
 * Each node in the new graph will be a set of nodes from the old.
 * These sets are the strongly connected components.  Each edge will
 * be the union of the corresponding edges of the prior graph.
 */
org.nfrac.comportex.util.algo_graph.component_graph = (function org$nfrac$comportex$util$algo_graph$component_graph(var_args){
var args45900 = [];
var len__10461__auto___45903 = arguments.length;
var i__10462__auto___45904 = (0);
while(true){
if((i__10462__auto___45904 < len__10461__auto___45903)){
args45900.push((arguments[i__10462__auto___45904]));

var G__45905 = (i__10462__auto___45904 + (1));
i__10462__auto___45904 = G__45905;
continue;
} else {
}
break;
}

var G__45902 = args45900.length;
switch (G__45902) {
case 1:
return org.nfrac.comportex.util.algo_graph.component_graph.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return org.nfrac.comportex.util.algo_graph.component_graph.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args45900.length)].join('')));

}
});

org.nfrac.comportex.util.algo_graph.component_graph.cljs$core$IFn$_invoke$arity$1 = (function (g){
return org.nfrac.comportex.util.algo_graph.component_graph.cljs$core$IFn$_invoke$arity$2(g,org.nfrac.comportex.util.algo_graph.scc(g));
});

org.nfrac.comportex.util.algo_graph.component_graph.cljs$core$IFn$_invoke$arity$2 = (function (g,sccs){
var find_node_set = (function (n){
return cljs.core.some((function (p1__45899_SHARP_){
if(cljs.core.truth_((p1__45899_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__45899_SHARP_.cljs$core$IFn$_invoke$arity$1(n) : p1__45899_SHARP_.call(null,n)))){
return p1__45899_SHARP_;
} else {
return null;
}
}),sccs);
});
var find_neighbors = ((function (find_node_set){
return (function (ns){
var nbs1 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.util.algo_graph.get_neighbors,g),ns);
var nbs2 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.set,nbs1);
var nbs3 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(clojure.set.union,nbs2);
return cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(find_node_set,nbs3));
});})(find_node_set))
;
var nm = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (find_node_set,find_neighbors){
return (function (ns){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns,find_neighbors(ns)], null);
});})(find_node_set,find_neighbors))
,sccs));
return org.nfrac.comportex.util.algo_graph.directed_graph(cljs.core.set(sccs),nm);
});

org.nfrac.comportex.util.algo_graph.component_graph.cljs$lang$maxFixedArity = 2;

/**
 * Is the component (recieved from scc) self recursive?
 */
org.nfrac.comportex.util.algo_graph.recursive_component_QMARK_ = (function org$nfrac$comportex$util$algo_graph$recursive_component_QMARK_(g,ns){
var or__9278__auto__ = (cljs.core.count(ns) > (1));
if(or__9278__auto__){
return or__9278__auto__;
} else {
var n = cljs.core.first(ns);
return cljs.core.some(((function (n,or__9278__auto__){
return (function (p1__45907_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__45907_SHARP_,n);
});})(n,or__9278__auto__))
,org.nfrac.comportex.util.algo_graph.get_neighbors(g,n));
}
});
/**
 * Returns, as a sequence of sets, the components of a graph that are
 * self-recursive.
 */
org.nfrac.comportex.util.algo_graph.self_recursive_sets = (function org$nfrac$comportex$util$algo_graph$self_recursive_sets(g){
return cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(org.nfrac.comportex.util.algo_graph.recursive_component_QMARK_,g),org.nfrac.comportex.util.algo_graph.scc(g));
});
/**
 * Repeatedly apply fun to data until (equal old-data new-data)
 * returns true.  If max iterations occur, it will throw an
 * exception.  Set max to nil for unlimited iterations.
 */
org.nfrac.comportex.util.algo_graph.fixed_point = (function org$nfrac$comportex$util$algo_graph$fixed_point(data,fun,max,equal){
var step = (function org$nfrac$comportex$util$algo_graph$fixed_point_$_step(data__$1,idx){
while(true){
if(cljs.core.truth_((function (){var and__9266__auto__ = idx;
if(cljs.core.truth_(and__9266__auto__)){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),idx);
} else {
return and__9266__auto__;
}
})())){
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("Fixed point overflow"),cljs.core.str("\n"),cljs.core.str("false")].join('')));

} else {
}

var new_data = (fun.cljs$core$IFn$_invoke$arity$1 ? fun.cljs$core$IFn$_invoke$arity$1(data__$1) : fun.call(null,data__$1));
if(cljs.core.truth_((equal.cljs$core$IFn$_invoke$arity$2 ? equal.cljs$core$IFn$_invoke$arity$2(data__$1,new_data) : equal.call(null,data__$1,new_data)))){
return new_data;
} else {
var G__45908 = new_data;
var G__45909 = (function (){var and__9266__auto__ = idx;
if(cljs.core.truth_(and__9266__auto__)){
return (idx - (1));
} else {
return and__9266__auto__;
}
})();
data__$1 = G__45908;
idx = G__45909;
continue;
}
break;
}
});
return step(data,max);
});
org.nfrac.comportex.util.algo_graph.fold_into_sets = (function org$nfrac$comportex$util$algo_graph$fold_into_sets(priorities){
var max = (cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(0),cljs.core.vals(priorities)) + (1));
var step = ((function (max){
return (function (acc,p__45914){
var vec__45915 = p__45914;
var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45915,(0),null);
var dep = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45915,(1),null);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,dep,cljs.core.conj.cljs$core$IFn$_invoke$arity$2((acc.cljs$core$IFn$_invoke$arity$1 ? acc.cljs$core$IFn$_invoke$arity$1(dep) : acc.call(null,dep)),n));
});})(max))
;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(step,cljs.core.vec(cljs.core.replicate(max,cljs.core.PersistentHashSet.EMPTY)),priorities);
});
/**
 * Similar to a topological sort, this returns a vector of sets. The
 * set of nodes at index 0 are independent.  The set at index 1 depend
 * on index 0; those at 2 depend on 0 and 1, and so on.  Those withing
 * a set have no mutual dependencies.  Assume the input graph (which
 * much be acyclic) has an edge a->b when a depends on b.
 */
org.nfrac.comportex.util.algo_graph.dependency_list = (function org$nfrac$comportex$util$algo_graph$dependency_list(g){
var step = (function (d){
var update = (function (n){
return (cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(-1),cljs.core.map.cljs$core$IFn$_invoke$arity$2(d,org.nfrac.comportex.util.algo_graph.get_neighbors(g,n))) + (1));
});
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (update){
return (function (p__45922){
var vec__45923 = p__45922;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45923,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45923,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,update(k)], null);
});})(update))
,d));
});
var counts = org.nfrac.comportex.util.algo_graph.fixed_point(cljs.core.zipmap(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1((0))),step,(cljs.core.count(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g)) + (1)),cljs.core._EQ_);
return org.nfrac.comportex.util.algo_graph.fold_into_sets(counts);
});
/**
 * Similar to dependency-list (see doc), except two graphs are
 * provided.  The first is as dependency-list.  The second (which may
 * have cycles) provides a partial-dependency relation.  If node a
 * depends on node b (meaning an edge a->b exists) in the second
 * graph, node a must be equal or later in the sequence.
 */
org.nfrac.comportex.util.algo_graph.stratification_list = (function org$nfrac$comportex$util$algo_graph$stratification_list(g1,g2){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g1)),cljs.core.set(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g2)))){
} else {
throw (new Error("Assert failed: (= (-> g1 :nodes set) (-> g2 :nodes set))"));
}

var step = (function (d){
var update = (function (n){
var x__9611__auto__ = (cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(-1),cljs.core.map.cljs$core$IFn$_invoke$arity$2(d,org.nfrac.comportex.util.algo_graph.get_neighbors(g1,n))) + (1));
var y__9612__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max,(-1),cljs.core.map.cljs$core$IFn$_invoke$arity$2(d,org.nfrac.comportex.util.algo_graph.get_neighbors(g2,n)));
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
});
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (update){
return (function (p__45930){
var vec__45931 = p__45930;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45931,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45931,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,update(k)], null);
});})(update))
,d));
});
var counts = org.nfrac.comportex.util.algo_graph.fixed_point(cljs.core.zipmap(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g1),cljs.core.repeat.cljs$core$IFn$_invoke$arity$1((0))),step,(cljs.core.count(cljs.core.cst$kw$nodes.cljs$core$IFn$_invoke$arity$1(g1)) + (1)),cljs.core._EQ_);
return org.nfrac.comportex.util.algo_graph.fold_into_sets(counts);
});
