// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.plots_canvas');
goog.require('cljs.core');
goog.require('monet.canvas');
org.numenta.sanity.plots_canvas.indexed = (function org$numenta$sanity$plots_canvas$indexed(ys){
return cljs.core.vec(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,ys));
});

/**
 * @interface
 */
org.numenta.sanity.plots_canvas.PPlot = function(){};

org.numenta.sanity.plots_canvas.bg_BANG_ = (function org$numenta$sanity$plots_canvas$bg_BANG_(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.bg_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.bg_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PPlot.bg!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.frame_BANG_ = (function org$numenta$sanity$plots_canvas$frame_BANG_(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$frame_BANG_$arity$1 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$frame_BANG_$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.frame_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.frame_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PPlot.frame!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.grid_BANG_ = (function org$numenta$sanity$plots_canvas$grid_BANG_(this$,opts){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2(this$,opts);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.grid_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,opts) : m__9992__auto__.call(null,this$,opts));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.grid_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,opts) : m__9992__auto____$1.call(null,this$,opts));
} else {
throw cljs.core.missing_protocol("PPlot.grid!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.point_BANG_ = (function org$numenta$sanity$plots_canvas$point_BANG_(this$,x,y,radius_px){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$point_BANG_$arity$4 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$point_BANG_$arity$4(this$,x,y,radius_px);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.point_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$4(this$,x,y,radius_px) : m__9992__auto__.call(null,this$,x,y,radius_px));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.point_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,x,y,radius_px) : m__9992__auto____$1.call(null,this$,x,y,radius_px));
} else {
throw cljs.core.missing_protocol("PPlot.point!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.rect_BANG_ = (function org$numenta$sanity$plots_canvas$rect_BANG_(this$,x,y,w,h){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5(this$,x,y,w,h);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.rect_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$5 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$5(this$,x,y,w,h) : m__9992__auto__.call(null,this$,x,y,w,h));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.rect_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$5 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$5(this$,x,y,w,h) : m__9992__auto____$1.call(null,this$,x,y,w,h));
} else {
throw cljs.core.missing_protocol("PPlot.rect!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.line_BANG_ = (function org$numenta$sanity$plots_canvas$line_BANG_(this$,xys){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2(this$,xys);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.line_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,xys) : m__9992__auto__.call(null,this$,xys));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.line_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,xys) : m__9992__auto____$1.call(null,this$,xys));
} else {
throw cljs.core.missing_protocol("PPlot.line!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.text_BANG_ = (function org$numenta$sanity$plots_canvas$text_BANG_(this$,x,y,txt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$text_BANG_$arity$4 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$text_BANG_$arity$4(this$,x,y,txt);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.text_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__9992__auto__.call(null,this$,x,y,txt));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.text_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__9992__auto____$1.call(null,this$,x,y,txt));
} else {
throw cljs.core.missing_protocol("PPlot.text!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.texts_BANG_ = (function org$numenta$sanity$plots_canvas$texts_BANG_(this$,x,y,txts,line_height){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$texts_BANG_$arity$5 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$texts_BANG_$arity$5(this$,x,y,txts,line_height);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.texts_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$5 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$5(this$,x,y,txts,line_height) : m__9992__auto__.call(null,this$,x,y,txts,line_height));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.texts_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$5 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$5(this$,x,y,txts,line_height) : m__9992__auto____$1.call(null,this$,x,y,txts,line_height));
} else {
throw cljs.core.missing_protocol("PPlot.texts!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.text_rotated_BANG_ = (function org$numenta$sanity$plots_canvas$text_rotated_BANG_(this$,x,y,txt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$text_rotated_BANG_$arity$4 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$text_rotated_BANG_$arity$4(this$,x,y,txt);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.text_rotated_BANG_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__9992__auto__.call(null,this$,x,y,txt));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.text_rotated_BANG_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$4(this$,x,y,txt) : m__9992__auto____$1.call(null,this$,x,y,txt));
} else {
throw cljs.core.missing_protocol("PPlot.text-rotated!",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.__GT_px = (function org$numenta$sanity$plots_canvas$__GT_px(this$,x,y){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$plots_canvas$PPlot$__GT_px$arity$3 == null)))){
return this$.org$numenta$sanity$plots_canvas$PPlot$__GT_px$arity$3(this$,x,y);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.plots_canvas.__GT_px[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__9992__auto__.call(null,this$,x,y));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.plots_canvas.__GT_px["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__9992__auto____$1.call(null,this$,x,y));
} else {
throw cljs.core.missing_protocol("PPlot.->px",this$);
}
}
}
});

org.numenta.sanity.plots_canvas.draw_grid = (function org$numenta$sanity$plots_canvas$draw_grid(ctx,p__63264,p__63265,xs,ys){
var vec__63280 = p__63264;
var x_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63280,(0),null);
var x_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63280,(1),null);
var vec__63283 = p__63265;
var y_lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63283,(0),null);
var y_hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63283,(1),null);
monet.canvas.begin_path(ctx);

var seq__63286_63294 = cljs.core.seq(xs);
var chunk__63287_63295 = null;
var count__63288_63296 = (0);
var i__63289_63297 = (0);
while(true){
if((i__63289_63297 < count__63288_63296)){
var x_63298 = chunk__63287_63295.cljs$core$IIndexed$_nth$arity$2(null,i__63289_63297);
monet.canvas.move_to(ctx,x_63298,y_lo);

monet.canvas.line_to(ctx,x_63298,y_hi);

var G__63299 = seq__63286_63294;
var G__63300 = chunk__63287_63295;
var G__63301 = count__63288_63296;
var G__63302 = (i__63289_63297 + (1));
seq__63286_63294 = G__63299;
chunk__63287_63295 = G__63300;
count__63288_63296 = G__63301;
i__63289_63297 = G__63302;
continue;
} else {
var temp__6728__auto___63303 = cljs.core.seq(seq__63286_63294);
if(temp__6728__auto___63303){
var seq__63286_63304__$1 = temp__6728__auto___63303;
if(cljs.core.chunked_seq_QMARK_(seq__63286_63304__$1)){
var c__10181__auto___63305 = cljs.core.chunk_first(seq__63286_63304__$1);
var G__63306 = cljs.core.chunk_rest(seq__63286_63304__$1);
var G__63307 = c__10181__auto___63305;
var G__63308 = cljs.core.count(c__10181__auto___63305);
var G__63309 = (0);
seq__63286_63294 = G__63306;
chunk__63287_63295 = G__63307;
count__63288_63296 = G__63308;
i__63289_63297 = G__63309;
continue;
} else {
var x_63310 = cljs.core.first(seq__63286_63304__$1);
monet.canvas.move_to(ctx,x_63310,y_lo);

monet.canvas.line_to(ctx,x_63310,y_hi);

var G__63311 = cljs.core.next(seq__63286_63304__$1);
var G__63312 = null;
var G__63313 = (0);
var G__63314 = (0);
seq__63286_63294 = G__63311;
chunk__63287_63295 = G__63312;
count__63288_63296 = G__63313;
i__63289_63297 = G__63314;
continue;
}
} else {
}
}
break;
}

var seq__63290_63315 = cljs.core.seq(ys);
var chunk__63291_63316 = null;
var count__63292_63317 = (0);
var i__63293_63318 = (0);
while(true){
if((i__63293_63318 < count__63292_63317)){
var y_63319 = chunk__63291_63316.cljs$core$IIndexed$_nth$arity$2(null,i__63293_63318);
monet.canvas.move_to(ctx,x_lo,y_63319);

monet.canvas.line_to(ctx,x_hi,y_63319);

var G__63320 = seq__63290_63315;
var G__63321 = chunk__63291_63316;
var G__63322 = count__63292_63317;
var G__63323 = (i__63293_63318 + (1));
seq__63290_63315 = G__63320;
chunk__63291_63316 = G__63321;
count__63292_63317 = G__63322;
i__63293_63318 = G__63323;
continue;
} else {
var temp__6728__auto___63324 = cljs.core.seq(seq__63290_63315);
if(temp__6728__auto___63324){
var seq__63290_63325__$1 = temp__6728__auto___63324;
if(cljs.core.chunked_seq_QMARK_(seq__63290_63325__$1)){
var c__10181__auto___63326 = cljs.core.chunk_first(seq__63290_63325__$1);
var G__63327 = cljs.core.chunk_rest(seq__63290_63325__$1);
var G__63328 = c__10181__auto___63326;
var G__63329 = cljs.core.count(c__10181__auto___63326);
var G__63330 = (0);
seq__63290_63315 = G__63327;
chunk__63291_63316 = G__63328;
count__63292_63317 = G__63329;
i__63293_63318 = G__63330;
continue;
} else {
var y_63331 = cljs.core.first(seq__63290_63325__$1);
monet.canvas.move_to(ctx,x_lo,y_63331);

monet.canvas.line_to(ctx,x_hi,y_63331);

var G__63332 = cljs.core.next(seq__63290_63325__$1);
var G__63333 = null;
var G__63334 = (0);
var G__63335 = (0);
seq__63290_63315 = G__63332;
chunk__63291_63316 = G__63333;
count__63292_63317 = G__63334;
i__63293_63318 = G__63335;
continue;
}
} else {
}
}
break;
}

return monet.canvas.stroke(ctx);
});
org.numenta.sanity.plots_canvas.scale_fn = (function org$numenta$sanity$plots_canvas$scale_fn(p__63336,size_px){
var vec__63340 = p__63336;
var lo = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63340,(0),null);
var hi = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63340,(1),null);
return ((function (vec__63340,lo,hi){
return (function (x){
return ((x - lo) * (size_px / (hi - lo)));
});
;})(vec__63340,lo,hi))
});
org.numenta.sanity.plots_canvas.text_rotated = (function org$numenta$sanity$plots_canvas$text_rotated(ctx,p__63343){
var map__63346 = p__63343;
var map__63346__$1 = ((((!((map__63346 == null)))?((((map__63346.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63346.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63346):map__63346);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63346__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63346__$1,cljs.core.cst$kw$y);
var text = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63346__$1,cljs.core.cst$kw$text);
monet.canvas.save(ctx);

monet.canvas.translate(ctx,x,y);

monet.canvas.rotate(ctx,(Math.PI / (2)));

monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$text,text], null));

return monet.canvas.restore(ctx);
});

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
 * @implements {org.numenta.sanity.plots_canvas.PPlot}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.plots_canvas.XYPlot = (function (ctx,plot_size,x_lim,y_lim,x_scale,y_scale,__meta,__extmap,__hash){
this.ctx = ctx;
this.plot_size = plot_size;
this.x_lim = x_lim;
this.y_lim = y_lim;
this.x_scale = x_scale;
this.y_scale = y_scale;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k63349,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__63351 = (((k63349 instanceof cljs.core.Keyword))?k63349.fqn:null);
switch (G__63351) {
case "ctx":
return self__.ctx;

break;
case "plot-size":
return self__.plot_size;

break;
case "x-lim":
return self__.x_lim;

break;
case "y-lim":
return self__.y_lim;

break;
case "x-scale":
return self__.x_scale;

break;
case "y-scale":
return self__.y_scale;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k63349,else__9951__auto__);

}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.plots-canvas.XYPlot{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ctx,self__.ctx],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$plot_DASH_size,self__.plot_size],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_lim,self__.x_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_lim,self__.y_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_scale,self__.x_scale],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_scale,self__.y_scale],null))], null),self__.__extmap));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__63348){
var self__ = this;
var G__63348__$1 = this;
return (new cljs.core.RecordIter((0),G__63348__$1,6,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ctx,cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (6 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x_DASH_scale,null,cljs.core.cst$kw$plot_DASH_size,null,cljs.core.cst$kw$y_DASH_lim,null,cljs.core.cst$kw$x_DASH_lim,null,cljs.core.cst$kw$ctx,null,cljs.core.cst$kw$y_DASH_scale,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__63348){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__63352 = cljs.core.keyword_identical_QMARK_;
var expr__63353 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__63355 = cljs.core.cst$kw$ctx;
var G__63356 = expr__63353;
return (pred__63352.cljs$core$IFn$_invoke$arity$2 ? pred__63352.cljs$core$IFn$_invoke$arity$2(G__63355,G__63356) : pred__63352.call(null,G__63355,G__63356));
})())){
return (new org.numenta.sanity.plots_canvas.XYPlot(G__63348,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63357 = cljs.core.cst$kw$plot_DASH_size;
var G__63358 = expr__63353;
return (pred__63352.cljs$core$IFn$_invoke$arity$2 ? pred__63352.cljs$core$IFn$_invoke$arity$2(G__63357,G__63358) : pred__63352.call(null,G__63357,G__63358));
})())){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,G__63348,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63359 = cljs.core.cst$kw$x_DASH_lim;
var G__63360 = expr__63353;
return (pred__63352.cljs$core$IFn$_invoke$arity$2 ? pred__63352.cljs$core$IFn$_invoke$arity$2(G__63359,G__63360) : pred__63352.call(null,G__63359,G__63360));
})())){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,G__63348,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63361 = cljs.core.cst$kw$y_DASH_lim;
var G__63362 = expr__63353;
return (pred__63352.cljs$core$IFn$_invoke$arity$2 ? pred__63352.cljs$core$IFn$_invoke$arity$2(G__63361,G__63362) : pred__63352.call(null,G__63361,G__63362));
})())){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,G__63348,self__.x_scale,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63363 = cljs.core.cst$kw$x_DASH_scale;
var G__63364 = expr__63353;
return (pred__63352.cljs$core$IFn$_invoke$arity$2 ? pred__63352.cljs$core$IFn$_invoke$arity$2(G__63363,G__63364) : pred__63352.call(null,G__63363,G__63364));
})())){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,G__63348,self__.y_scale,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__63365 = cljs.core.cst$kw$y_DASH_scale;
var G__63366 = expr__63353;
return (pred__63352.cljs$core$IFn$_invoke$arity$2 ? pred__63352.cljs$core$IFn$_invoke$arity$2(G__63365,G__63366) : pred__63352.call(null,G__63365,G__63366));
})())){
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,G__63348,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__63348),null));
}
}
}
}
}
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$ctx,self__.ctx],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$plot_DASH_size,self__.plot_size],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_lim,self__.x_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_lim,self__.y_lim],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$x_DASH_scale,self__.x_scale],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$y_DASH_scale,self__.y_scale],null))], null),self__.__extmap));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__63348){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.plots_canvas.XYPlot(self__.ctx,self__.plot_size,self__.x_lim,self__.y_lim,self__.x_scale,self__.y_scale,G__63348,self__.__extmap,self__.__hash));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$ = true;

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$texts_BANG_$arity$5 = (function (_,x,y,txts,line_height){
var self__ = this;
var ___$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (___$1){
return (function (y_px,txt){
monet.canvas.text(self__.ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$text,txt,cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,y_px], null));

return (y_px + line_height);
});})(___$1))
,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y)),txts);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$frame_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var plot_rect = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.plot_size,cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
var G__63367 = self__.ctx;
monet.canvas.stroke_style(G__63367,"black");

monet.canvas.stroke_rect(G__63367,plot_rect);

return G__63367;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$bg_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var plot_rect = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(self__.plot_size,cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
var G__63368 = self__.ctx;
monet.canvas.fill_style(G__63368,"white");

monet.canvas.fill_rect(G__63368,plot_rect);

return G__63368;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$rect_BANG_$arity$5 = (function (_,x,y,w,h){
var self__ = this;
var ___$1 = this;
var xpx = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x));
var ypx = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y));
var G__63369 = self__.ctx;
monet.canvas.fill_rect(G__63369,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,xpx,cljs.core.cst$kw$y,ypx,cljs.core.cst$kw$w,((function (){var G__63370 = (x + w);
return (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(G__63370) : self__.x_scale.call(null,G__63370));
})() - xpx),cljs.core.cst$kw$h,((function (){var G__63371 = (y + h);
return (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(G__63371) : self__.y_scale.call(null,G__63371));
})() - ypx)], null));

return G__63369;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$line_BANG_$arity$2 = (function (_,xys){
var self__ = this;
var ___$1 = this;
monet.canvas.begin_path(self__.ctx);

var seq__63372_63405 = cljs.core.seq(org.numenta.sanity.plots_canvas.indexed(xys));
var chunk__63373_63406 = null;
var count__63374_63407 = (0);
var i__63375_63408 = (0);
while(true){
if((i__63375_63408 < count__63374_63407)){
var vec__63376_63409 = chunk__63373_63406.cljs$core$IIndexed$_nth$arity$2(null,i__63375_63408);
var i_63410 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63376_63409,(0),null);
var vec__63379_63411 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63376_63409,(1),null);
var x_63412 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63379_63411,(0),null);
var y_63413 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63379_63411,(1),null);
var f_63414 = (((i_63410 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__63382_63415 = self__.ctx;
var G__63383_63416 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_63412) : self__.x_scale.call(null,x_63412));
var G__63384_63417 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_63413) : self__.y_scale.call(null,y_63413));
(f_63414.cljs$core$IFn$_invoke$arity$3 ? f_63414.cljs$core$IFn$_invoke$arity$3(G__63382_63415,G__63383_63416,G__63384_63417) : f_63414.call(null,G__63382_63415,G__63383_63416,G__63384_63417));

var G__63418 = seq__63372_63405;
var G__63419 = chunk__63373_63406;
var G__63420 = count__63374_63407;
var G__63421 = (i__63375_63408 + (1));
seq__63372_63405 = G__63418;
chunk__63373_63406 = G__63419;
count__63374_63407 = G__63420;
i__63375_63408 = G__63421;
continue;
} else {
var temp__6728__auto___63422 = cljs.core.seq(seq__63372_63405);
if(temp__6728__auto___63422){
var seq__63372_63423__$1 = temp__6728__auto___63422;
if(cljs.core.chunked_seq_QMARK_(seq__63372_63423__$1)){
var c__10181__auto___63424 = cljs.core.chunk_first(seq__63372_63423__$1);
var G__63425 = cljs.core.chunk_rest(seq__63372_63423__$1);
var G__63426 = c__10181__auto___63424;
var G__63427 = cljs.core.count(c__10181__auto___63424);
var G__63428 = (0);
seq__63372_63405 = G__63425;
chunk__63373_63406 = G__63426;
count__63374_63407 = G__63427;
i__63375_63408 = G__63428;
continue;
} else {
var vec__63385_63429 = cljs.core.first(seq__63372_63423__$1);
var i_63430 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385_63429,(0),null);
var vec__63388_63431 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63385_63429,(1),null);
var x_63432 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63388_63431,(0),null);
var y_63433 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63388_63431,(1),null);
var f_63434 = (((i_63430 === (0)))?monet.canvas.move_to:monet.canvas.line_to);
var G__63391_63435 = self__.ctx;
var G__63392_63436 = (self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x_63432) : self__.x_scale.call(null,x_63432));
var G__63393_63437 = (self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y_63433) : self__.y_scale.call(null,y_63433));
(f_63434.cljs$core$IFn$_invoke$arity$3 ? f_63434.cljs$core$IFn$_invoke$arity$3(G__63391_63435,G__63392_63436,G__63393_63437) : f_63434.call(null,G__63391_63435,G__63392_63436,G__63393_63437));

var G__63438 = cljs.core.next(seq__63372_63423__$1);
var G__63439 = null;
var G__63440 = (0);
var G__63441 = (0);
seq__63372_63405 = G__63438;
chunk__63373_63406 = G__63439;
count__63374_63407 = G__63440;
i__63375_63408 = G__63441;
continue;
}
} else {
}
}
break;
}

return monet.canvas.stroke(self__.ctx);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$point_BANG_$arity$4 = (function (_,x,y,radius_px){
var self__ = this;
var ___$1 = this;
var G__63394 = self__.ctx;
monet.canvas.circle(G__63394,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y)),cljs.core.cst$kw$r,radius_px], null));

monet.canvas.fill(G__63394);

monet.canvas.stroke(G__63394);

return G__63394;
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$grid_BANG_$arity$2 = (function (_,p__63395){
var self__ = this;
var map__63396 = p__63395;
var map__63396__$1 = ((((!((map__63396 == null)))?((((map__63396.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63396.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63396):map__63396);
var grid_every = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__63396__$1,cljs.core.cst$kw$grid_DASH_every,(1));
var ___$1 = this;
monet.canvas.save(self__.ctx);

var vec__63398_63442 = self__.x_lim;
var x_lo_63443 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63398_63442,(0),null);
var x_hi_63444 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63398_63442,(1),null);
var vec__63401_63445 = self__.y_lim;
var y_lo_63446 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63401_63445,(0),null);
var y_hi_63447 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__63401_63445,(1),null);
org.numenta.sanity.plots_canvas.draw_grid(self__.ctx,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(self__.plot_size)], null),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.x_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(x_lo_63443),(cljs.core.long$(x_hi_63444) + (1)),grid_every)),cljs.core.map.cljs$core$IFn$_invoke$arity$2(self__.y_scale,cljs.core.range.cljs$core$IFn$_invoke$arity$3(cljs.core.long$(y_lo_63446),(cljs.core.long$(y_hi_63447) + (1)),grid_every)));

return monet.canvas.restore(self__.ctx);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$__GT_px$arity$3 = (function (_,x,y){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y))], null);
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$text_BANG_$arity$4 = (function (_,x,y,txt){
var self__ = this;
var ___$1 = this;
return monet.canvas.text(self__.ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$text,txt,cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y))], null));
});

org.numenta.sanity.plots_canvas.XYPlot.prototype.org$numenta$sanity$plots_canvas$PPlot$text_rotated_BANG_$arity$4 = (function (_,x,y,txt){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.plots_canvas.text_rotated(self__.ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$text,txt,cljs.core.cst$kw$x,(self__.x_scale.cljs$core$IFn$_invoke$arity$1 ? self__.x_scale.cljs$core$IFn$_invoke$arity$1(x) : self__.x_scale.call(null,x)),cljs.core.cst$kw$y,(self__.y_scale.cljs$core$IFn$_invoke$arity$1 ? self__.y_scale.cljs$core$IFn$_invoke$arity$1(y) : self__.y_scale.call(null,y))], null));
});

org.numenta.sanity.plots_canvas.XYPlot.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$ctx,cljs.core.cst$sym$plot_DASH_size,cljs.core.cst$sym$x_DASH_lim,cljs.core.cst$sym$y_DASH_lim,cljs.core.cst$sym$x_DASH_scale,cljs.core.cst$sym$y_DASH_scale], null);
});

org.numenta.sanity.plots_canvas.XYPlot.cljs$lang$type = true;

org.numenta.sanity.plots_canvas.XYPlot.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.plots-canvas/XYPlot");
});

org.numenta.sanity.plots_canvas.XYPlot.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.plots-canvas/XYPlot");
});

org.numenta.sanity.plots_canvas.__GT_XYPlot = (function org$numenta$sanity$plots_canvas$__GT_XYPlot(ctx,plot_size,x_lim,y_lim,x_scale,y_scale){
return (new org.numenta.sanity.plots_canvas.XYPlot(ctx,plot_size,x_lim,y_lim,x_scale,y_scale,null,null,null));
});

org.numenta.sanity.plots_canvas.map__GT_XYPlot = (function org$numenta$sanity$plots_canvas$map__GT_XYPlot(G__63350){
return (new org.numenta.sanity.plots_canvas.XYPlot(cljs.core.cst$kw$ctx.cljs$core$IFn$_invoke$arity$1(G__63350),cljs.core.cst$kw$plot_DASH_size.cljs$core$IFn$_invoke$arity$1(G__63350),cljs.core.cst$kw$x_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__63350),cljs.core.cst$kw$y_DASH_lim.cljs$core$IFn$_invoke$arity$1(G__63350),cljs.core.cst$kw$x_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__63350),cljs.core.cst$kw$y_DASH_scale.cljs$core$IFn$_invoke$arity$1(G__63350),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__63350,cljs.core.cst$kw$ctx,cljs.core.array_seq([cljs.core.cst$kw$plot_DASH_size,cljs.core.cst$kw$x_DASH_lim,cljs.core.cst$kw$y_DASH_lim,cljs.core.cst$kw$x_DASH_scale,cljs.core.cst$kw$y_DASH_scale], 0)),null));
});

/**
 * Assumes ctx is already translated.
 */
org.numenta.sanity.plots_canvas.xy_plot = (function org$numenta$sanity$plots_canvas$xy_plot(ctx,p__63448,x_lim,y_lim){
var map__63451 = p__63448;
var map__63451__$1 = ((((!((map__63451 == null)))?((((map__63451.cljs$lang$protocol_mask$partition0$ & (64))) || (map__63451.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__63451):map__63451);
var plot_size = map__63451__$1;
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63451__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__63451__$1,cljs.core.cst$kw$h);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
return org.numenta.sanity.plots_canvas.map__GT_XYPlot(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$ctx,ctx,cljs.core.cst$kw$plot_DASH_size,plot_size,cljs.core.cst$kw$x_DASH_lim,x_lim,cljs.core.cst$kw$y_DASH_lim,y_lim,cljs.core.cst$kw$x_DASH_scale,x_scale,cljs.core.cst$kw$y_DASH_scale,y_scale], null));
});
