// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.viz_layouts');
goog.require('cljs.core');
goog.require('monet.canvas');
goog.require('tailrecursion.priority_map');
goog.require('org.nfrac.comportex.topography');

/**
 * @interface
 */
org.numenta.sanity.viz_layouts.PBox = function(){};

/**
 * Returns `{:x :y :w :h}` defining bounding box from top left.
 */
org.numenta.sanity.viz_layouts.layout_bounds = (function org$numenta$sanity$viz_layouts$layout_bounds(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.layout_bounds[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.layout_bounds["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PBox.layout-bounds",this$);
}
}
}
});


/**
 * @interface
 */
org.numenta.sanity.viz_layouts.PArrayLayout = function(){};

/**
 * Returns [x y] pixel coordinates for top left of time offset dt.
 */
org.numenta.sanity.viz_layouts.origin_px_topleft = (function org$numenta$sanity$viz_layouts$origin_px_topleft(this$,dt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2(this$,dt);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.origin_px_topleft[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__9992__auto__.call(null,this$,dt));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.origin_px_topleft["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__9992__auto____$1.call(null,this$,dt));
} else {
throw cljs.core.missing_protocol("PArrayLayout.origin-px-topleft",this$);
}
}
}
});

/**
 * Returns `{:x :y :w :h}` defining local bounding box relative to dt origin.
 */
org.numenta.sanity.viz_layouts.local_dt_bounds = (function org$numenta$sanity$viz_layouts$local_dt_bounds(this$,dt){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2(this$,dt);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.local_dt_bounds[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__9992__auto__.call(null,this$,dt));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.local_dt_bounds["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,dt) : m__9992__auto____$1.call(null,this$,dt));
} else {
throw cljs.core.missing_protocol("PArrayLayout.local-dt-bounds",this$);
}
}
}
});

/**
 * Returns [x y] pixel coordinates for id relative to the dt origin.
 */
org.numenta.sanity.viz_layouts.local_px_topleft = (function org$numenta$sanity$viz_layouts$local_px_topleft(this$,id){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2(this$,id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.local_px_topleft[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,id) : m__9992__auto__.call(null,this$,id));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.local_px_topleft["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,id) : m__9992__auto____$1.call(null,this$,id));
} else {
throw cljs.core.missing_protocol("PArrayLayout.local-px-topleft",this$);
}
}
}
});

/**
 * The size [w h] in pixels of each drawn array element.
 */
org.numenta.sanity.viz_layouts.element_size_px = (function org$numenta$sanity$viz_layouts$element_size_px(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.element_size_px[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.element_size_px["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.element-size-px",this$);
}
}
}
});

/**
 * Current scroll position, giving the first element index visible on screen.
 */
org.numenta.sanity.viz_layouts.scroll_position = (function org$numenta$sanity$viz_layouts$scroll_position(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.scroll_position[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.scroll_position["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.scroll-position",this$);
}
}
}
});

/**
 * Updates the layout with scroll position adjusted up or down one page.
 */
org.numenta.sanity.viz_layouts.scroll = (function org$numenta$sanity$viz_layouts$scroll(this$,down_QMARK_){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2(this$,down_QMARK_);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.scroll[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,down_QMARK_) : m__9992__auto__.call(null,this$,down_QMARK_));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.scroll["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,down_QMARK_) : m__9992__auto____$1.call(null,this$,down_QMARK_));
} else {
throw cljs.core.missing_protocol("PArrayLayout.scroll",this$);
}
}
}
});

/**
 * Returns the total number of ids
 */
org.numenta.sanity.viz_layouts.ids_count = (function org$numenta$sanity$viz_layouts$ids_count(_){
if((!((_ == null))) && (!((_.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 == null)))){
return _.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1(_);
} else {
var x__9991__auto__ = (((_ == null))?null:_);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.ids_count[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__9992__auto__.call(null,_));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.ids_count["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(_) : m__9992__auto____$1.call(null,_));
} else {
throw cljs.core.missing_protocol("PArrayLayout.ids-count",_);
}
}
}
});

/**
 * Returns the number of ids onscreen in constant time
 */
org.numenta.sanity.viz_layouts.ids_onscreen_count = (function org$numenta$sanity$viz_layouts$ids_onscreen_count(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.ids_onscreen_count[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.ids_onscreen_count["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.ids-onscreen-count",this$);
}
}
}
});

/**
 * Sequence of element ids per timestep currently drawn in the layout.
 */
org.numenta.sanity.viz_layouts.ids_onscreen = (function org$numenta$sanity$viz_layouts$ids_onscreen(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.ids_onscreen[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.ids_onscreen["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PArrayLayout.ids-onscreen",this$);
}
}
}
});

/**
 * Checks whether the element id is currently drawn in the layout.
 */
org.numenta.sanity.viz_layouts.id_onscreen_QMARK_ = (function org$numenta$sanity$viz_layouts$id_onscreen_QMARK_(this$,id){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2(this$,id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.id_onscreen_QMARK_[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,id) : m__9992__auto__.call(null,this$,id));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.id_onscreen_QMARK_["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,id) : m__9992__auto____$1.call(null,this$,id));
} else {
throw cljs.core.missing_protocol("PArrayLayout.id-onscreen?",this$);
}
}
}
});

/**
 * Returns [dt id] for the [x y] pixel coordinates, or null.
 */
org.numenta.sanity.viz_layouts.clicked_id = (function org$numenta$sanity$viz_layouts$clicked_id(this$,x,y){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3(this$,x,y);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.clicked_id[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__9992__auto__.call(null,this$,x,y));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.clicked_id["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,x,y) : m__9992__auto____$1.call(null,this$,x,y));
} else {
throw cljs.core.missing_protocol("PArrayLayout.clicked-id",this$);
}
}
}
});

/**
 * Draws the element in dt-local coordinates. Does not stroke or fill.
 */
org.numenta.sanity.viz_layouts.draw_element = (function org$numenta$sanity$viz_layouts$draw_element(this$,ctx,id){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 == null)))){
return this$.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3(this$,ctx,id);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.draw_element[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,ctx,id) : m__9992__auto__.call(null,this$,ctx,id));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.draw_element["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,ctx,id) : m__9992__auto____$1.call(null,this$,ctx,id));
} else {
throw cljs.core.missing_protocol("PArrayLayout.draw-element",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.right_px = (function org$numenta$sanity$viz_layouts$right_px(this$){
var b = org.numenta.sanity.viz_layouts.layout_bounds(this$);
return (cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(b) + cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(b));
});
/**
 * Returns pixel coordinates on the canvas `[x y]` for the
 * center of an input element `id` at time delay `dt`.
 */
org.numenta.sanity.viz_layouts.element_xy = (function org$numenta$sanity$viz_layouts$element_xy(lay,id,dt){
var vec__48764 = org.numenta.sanity.viz_layouts.element_size_px(lay);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48764,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48764,(1),null);
var vec__48767 = org.numenta.sanity.viz_layouts.origin_px_topleft(lay,dt);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48767,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48767,(1),null);
var vec__48770 = org.numenta.sanity.viz_layouts.local_px_topleft(lay,id);
var lx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48770,(0),null);
var ly = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48770,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((x + lx) + (w * 0.5)),((y + ly) + (h * 0.5))], null);
});
/**
 * Fills all elements with the given ids (in a single path if
 *   possible). For efficiency, skips any ids which are currently
 *   offscreen.
 */
org.numenta.sanity.viz_layouts.fill_elements = (function org$numenta$sanity$viz_layouts$fill_elements(lay,ctx,ids){
var one_d_QMARK_ = ((1) === cljs.core.count(org.nfrac.comportex.topography.dimensions(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(lay))));
monet.canvas.begin_path(ctx);

var seq__48779_48785 = cljs.core.seq(ids);
var chunk__48781_48786 = null;
var count__48782_48787 = (0);
var i__48783_48788 = (0);
while(true){
if((i__48783_48788 < count__48782_48787)){
var id_48789 = chunk__48781_48786.cljs$core$IIndexed$_nth$arity$2(null,i__48783_48788);
if(cljs.core.truth_(org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(lay,id_48789))){
org.numenta.sanity.viz_layouts.draw_element(lay,ctx,id_48789);

if(one_d_QMARK_){
} else {
monet.canvas.fill(ctx);

monet.canvas.begin_path(ctx);
}

var G__48790 = seq__48779_48785;
var G__48791 = chunk__48781_48786;
var G__48792 = count__48782_48787;
var G__48793 = (i__48783_48788 + (1));
seq__48779_48785 = G__48790;
chunk__48781_48786 = G__48791;
count__48782_48787 = G__48792;
i__48783_48788 = G__48793;
continue;
} else {
var G__48794 = seq__48779_48785;
var G__48795 = chunk__48781_48786;
var G__48796 = count__48782_48787;
var G__48797 = (i__48783_48788 + (1));
seq__48779_48785 = G__48794;
chunk__48781_48786 = G__48795;
count__48782_48787 = G__48796;
i__48783_48788 = G__48797;
continue;
}
} else {
var temp__6728__auto___48798 = cljs.core.seq(seq__48779_48785);
if(temp__6728__auto___48798){
var seq__48779_48799__$1 = temp__6728__auto___48798;
if(cljs.core.chunked_seq_QMARK_(seq__48779_48799__$1)){
var c__10181__auto___48800 = cljs.core.chunk_first(seq__48779_48799__$1);
var G__48801 = cljs.core.chunk_rest(seq__48779_48799__$1);
var G__48802 = c__10181__auto___48800;
var G__48803 = cljs.core.count(c__10181__auto___48800);
var G__48804 = (0);
seq__48779_48785 = G__48801;
chunk__48781_48786 = G__48802;
count__48782_48787 = G__48803;
i__48783_48788 = G__48804;
continue;
} else {
var id_48805 = cljs.core.first(seq__48779_48799__$1);
if(cljs.core.truth_(org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(lay,id_48805))){
org.numenta.sanity.viz_layouts.draw_element(lay,ctx,id_48805);

if(one_d_QMARK_){
} else {
monet.canvas.fill(ctx);

monet.canvas.begin_path(ctx);
}

var G__48806 = cljs.core.next(seq__48779_48799__$1);
var G__48807 = null;
var G__48808 = (0);
var G__48809 = (0);
seq__48779_48785 = G__48806;
chunk__48781_48786 = G__48807;
count__48782_48787 = G__48808;
i__48783_48788 = G__48809;
continue;
} else {
var G__48810 = cljs.core.next(seq__48779_48799__$1);
var G__48811 = null;
var G__48812 = (0);
var G__48813 = (0);
seq__48779_48785 = G__48810;
chunk__48781_48786 = G__48811;
count__48782_48787 = G__48812;
i__48783_48788 = G__48813;
continue;
}
}
} else {
}
}
break;
}

if(one_d_QMARK_){
monet.canvas.fill(ctx);
} else {
}

return ctx;
});
/**
 * Groups the map `id-styles` by key, each key being a style value.
 * For each such group, calls `set-style` with the value and then
 * fills the group of elements.
 */
org.numenta.sanity.viz_layouts.group_and_fill_elements = (function org$numenta$sanity$viz_layouts$group_and_fill_elements(lay,ctx,id_styles,set_style){
monet.canvas.save(ctx);

var seq__48824_48834 = cljs.core.seq(cljs.core.group_by(id_styles,cljs.core.keys(id_styles)));
var chunk__48825_48835 = null;
var count__48826_48836 = (0);
var i__48827_48837 = (0);
while(true){
if((i__48827_48837 < count__48826_48836)){
var vec__48828_48838 = chunk__48825_48835.cljs$core$IIndexed$_nth$arity$2(null,i__48827_48837);
var style_48839 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48828_48838,(0),null);
var ids_48840 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48828_48838,(1),null);
(set_style.cljs$core$IFn$_invoke$arity$2 ? set_style.cljs$core$IFn$_invoke$arity$2(ctx,style_48839) : set_style.call(null,ctx,style_48839));

org.numenta.sanity.viz_layouts.fill_elements(lay,ctx,ids_48840);

monet.canvas.fill(ctx);

var G__48841 = seq__48824_48834;
var G__48842 = chunk__48825_48835;
var G__48843 = count__48826_48836;
var G__48844 = (i__48827_48837 + (1));
seq__48824_48834 = G__48841;
chunk__48825_48835 = G__48842;
count__48826_48836 = G__48843;
i__48827_48837 = G__48844;
continue;
} else {
var temp__6728__auto___48845 = cljs.core.seq(seq__48824_48834);
if(temp__6728__auto___48845){
var seq__48824_48846__$1 = temp__6728__auto___48845;
if(cljs.core.chunked_seq_QMARK_(seq__48824_48846__$1)){
var c__10181__auto___48847 = cljs.core.chunk_first(seq__48824_48846__$1);
var G__48848 = cljs.core.chunk_rest(seq__48824_48846__$1);
var G__48849 = c__10181__auto___48847;
var G__48850 = cljs.core.count(c__10181__auto___48847);
var G__48851 = (0);
seq__48824_48834 = G__48848;
chunk__48825_48835 = G__48849;
count__48826_48836 = G__48850;
i__48827_48837 = G__48851;
continue;
} else {
var vec__48831_48852 = cljs.core.first(seq__48824_48846__$1);
var style_48853 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48831_48852,(0),null);
var ids_48854 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48831_48852,(1),null);
(set_style.cljs$core$IFn$_invoke$arity$2 ? set_style.cljs$core$IFn$_invoke$arity$2(ctx,style_48853) : set_style.call(null,ctx,style_48853));

org.numenta.sanity.viz_layouts.fill_elements(lay,ctx,ids_48854);

monet.canvas.fill(ctx);

var G__48855 = cljs.core.next(seq__48824_48846__$1);
var G__48856 = null;
var G__48857 = (0);
var G__48858 = (0);
seq__48824_48834 = G__48855;
chunk__48825_48835 = G__48856;
count__48826_48836 = G__48857;
i__48827_48837 = G__48858;
continue;
}
} else {
}
}
break;
}

monet.canvas.restore(ctx);

return ctx;
});
org.numenta.sanity.viz_layouts.circle = (function org$numenta$sanity$viz_layouts$circle(ctx,x,y,r){
return ctx.arc(x,y,r,(0),(Math.PI * (2)),true);
});
org.numenta.sanity.viz_layouts.circle_from_bounds = (function org$numenta$sanity$viz_layouts$circle_from_bounds(ctx,x,y,w){
var r = (w * 0.5);
return org.numenta.sanity.viz_layouts.circle(ctx,(x + r),(y + r),r);
});
org.numenta.sanity.viz_layouts.extra_px_for_highlight = (4);
org.numenta.sanity.viz_layouts.highlight_rect = (function org$numenta$sanity$viz_layouts$highlight_rect(ctx,rect,color){
var G__48860 = ctx;
monet.canvas.stroke_style(G__48860,color);

monet.canvas.stroke_width(G__48860,(3));

monet.canvas.stroke_rect(G__48860,rect);

monet.canvas.stroke_style(G__48860,"black");

monet.canvas.stroke_width(G__48860,0.75);

monet.canvas.stroke_rect(G__48860,rect);

return G__48860;
});
/**
 * Draws highlight around the whole layout in global coordinates.
 */
org.numenta.sanity.viz_layouts.highlight_layer = (function org$numenta$sanity$viz_layouts$highlight_layer(lay,ctx,color){
var bb = org.numenta.sanity.viz_layouts.layout_bounds(lay);
var scroll_off = (((org.numenta.sanity.viz_layouts.scroll_position(lay) > (0)))?(50):(0));
return org.numenta.sanity.viz_layouts.highlight_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) - (1)),cljs.core.cst$kw$y,((cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(bb) - (1)) - scroll_off),cljs.core.cst$kw$w,(cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb) + (2)),cljs.core.cst$kw$h,((cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(bb) + (2)) + scroll_off)], null),color);
});
/**
 * Draws highlight on the time offset dt in global coordinates.
 */
org.numenta.sanity.viz_layouts.highlight_dt = (function org$numenta$sanity$viz_layouts$highlight_dt(lay,ctx,dt,color){
var vec__48864 = org.numenta.sanity.viz_layouts.origin_px_topleft(lay,dt);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48864,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48864,(1),null);
var bb = org.numenta.sanity.viz_layouts.local_dt_bounds(lay,dt);
var scroll_off = (((org.numenta.sanity.viz_layouts.scroll_position(lay) > (0)))?(50):(0));
return org.numenta.sanity.viz_layouts.highlight_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(x - (0)),cljs.core.cst$kw$y,((y - (1)) - scroll_off),cljs.core.cst$kw$w,(cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb) + (0)),cljs.core.cst$kw$h,((cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(bb) + (2)) + scroll_off)], null),color);
});
/**
 * Draw highlight bar horizontally to left axis from element.
 */
org.numenta.sanity.viz_layouts.highlight_element = (function org$numenta$sanity$viz_layouts$highlight_element(lay,ctx,dt,id,label,color){
var vec__48876 = org.numenta.sanity.viz_layouts.origin_px_topleft(lay,dt);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48876,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48876,(1),null);
var vec__48879 = org.numenta.sanity.viz_layouts.local_px_topleft(lay,id);
var lx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48879,(0),null);
var ly = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48879,(1),null);
var bb = org.numenta.sanity.viz_layouts.layout_bounds(lay);
var vec__48882 = org.numenta.sanity.viz_layouts.element_size_px(lay);
var element_w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48882,(0),null);
var element_h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48882,(1),null);
var rect = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) - (1)),cljs.core.cst$kw$y,((y + ly) - (1)),cljs.core.cst$kw$w,((((x - cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb)) + lx) + element_w) + (2)),cljs.core.cst$kw$h,(element_h + (2))], null);
org.numenta.sanity.viz_layouts.highlight_rect(ctx,rect,color);

if(cljs.core.truth_(label)){
monet.canvas.save(ctx);

monet.canvas.text_align(ctx,cljs.core.cst$kw$right);

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$middle);

monet.canvas.fill_style(ctx,"black");

monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(rect) - (1)),cljs.core.cst$kw$y,(cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(rect) + (element_h / (2))),cljs.core.cst$kw$text,label], null));

return monet.canvas.restore(ctx);
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.viz_layouts.PArrayLayout}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.viz_layouts.PBox}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.viz_layouts.Grid1dLayout = (function (topo,scroll_top,dt_offset,draw_steps,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,__meta,__extmap,__hash){
this.topo = topo;
this.scroll_top = scroll_top;
this.dt_offset = dt_offset;
this.draw_steps = draw_steps;
this.element_w = element_w;
this.element_h = element_h;
this.shrink = shrink;
this.left_px = left_px;
this.top_px = top_px;
this.max_bottom_px = max_bottom_px;
this.circles_QMARK_ = circles_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k48886,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__48888 = (((k48886 instanceof cljs.core.Keyword))?k48886.fqn:null);
switch (G__48888) {
case "scroll-top":
return self__.scroll_top;

break;
case "topo":
return self__.topo;

break;
case "element-h":
return self__.element_h;

break;
case "dt-offset":
return self__.dt_offset;

break;
case "shrink":
return self__.shrink;

break;
case "draw-steps":
return self__.draw_steps;

break;
case "max-bottom-px":
return self__.max_bottom_px;

break;
case "top-px":
return self__.top_px;

break;
case "left-px":
return self__.left_px;

break;
case "circles?":
return self__.circles_QMARK_;

break;
case "element-w":
return self__.element_w;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k48886,else__9951__auto__);

}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.viz-layouts.Grid1dLayout{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$dt_DASH_offset,self__.dt_offset],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$draw_DASH_steps,self__.draw_steps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__48885){
var self__ = this;
var G__48885__$1 = this;
return (new cljs.core.RecordIter((0),G__48885__$1,11,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$topo,cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$draw_DASH_steps,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (11 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 = (function (this$,dt){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.viz_layouts.layout_bounds(this$__$1),cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,self__.element_w], 0));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var G__48889 = org.nfrac.comportex.topography.size(self__.topo);
if(cljs.core.truth_(self__.max_bottom_px)){
var x__9618__auto__ = G__48889;
var y__9619__auto__ = cljs.core.quot((self__.max_bottom_px - self__.top_px),self__.element_h);
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
} else {
return G__48889;
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.element_w,self__.element_h], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 = (function (this$,ctx,id){
var self__ = this;
var this$__$1 = this;
var vec__48890 = org.numenta.sanity.viz_layouts.local_px_topleft(this$__$1,id);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48890,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48890,(1),null);
if(cljs.core.truth_(self__.circles_QMARK_)){
return org.numenta.sanity.viz_layouts.circle_from_bounds(ctx,x,y,(self__.element_w * self__.shrink));
} else {
return ctx.rect(x,y,(self__.element_w * self__.shrink),(self__.element_h * self__.shrink));
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 = (function (this$,id){
var self__ = this;
var this$__$1 = this;
var n = org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1);
var n0 = self__.scroll_top;
return ((n0 <= id)) && ((id < (n0 + n)));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.nfrac.comportex.topography.size(self__.topo);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var n0 = self__.scroll_top;
return cljs.core.range.cljs$core$IFn$_invoke$arity$2(n0,(n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1)));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.scroll_top;
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
var right = (self__.left_px + (self__.draw_steps * self__.element_w));
var off_x_px = (((dt + (1)) - self__.dt_offset) * self__.element_w);
var x_px = (right - off_x_px);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_px,self__.top_px], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 = (function (this$,down_QMARK_){
var self__ = this;
var this$__$1 = this;
var page_n = org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1);
var n_ids = org.nfrac.comportex.topography.size(self__.topo);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$scroll_DASH_top,(cljs.core.truth_(down_QMARK_)?(((self__.scroll_top < (n_ids - page_n)))?(self__.scroll_top + page_n):self__.scroll_top):(function (){var x__9611__auto__ = (0);
var y__9612__auto__ = (self__.scroll_top - page_n);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})()));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),((id - self__.scroll_top) * self__.element_h)], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 = (function (this$,x,y){
var self__ = this;
var this$__$1 = this;
var right = (self__.left_px + (self__.draw_steps * self__.element_w));
var dt_STAR_ = (function (){var G__48893 = ((right - x) / self__.element_w);
return Math.floor(G__48893);
})();
var id_STAR_ = (function (){var G__48894 = ((y - self__.top_px) / self__.element_h);
return Math.floor(G__48894);
})();
var id = (id_STAR_ + self__.scroll_top);
var dt = (dt_STAR_ + self__.dt_offset);
if((((0) <= dt_STAR_)) && ((dt_STAR_ <= self__.draw_steps))){
if(cljs.core.truth_(org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(this$__$1,id))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,id], null);
} else {
if((y <= self__.top_px)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,null], null);
} else {
return null;
}
}
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [cljs.core.cst$kw$scroll_DASH_top,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$element_DASH_h,null,cljs.core.cst$kw$dt_DASH_offset,null,cljs.core.cst$kw$shrink,null,cljs.core.cst$kw$draw_DASH_steps,null,cljs.core.cst$kw$max_DASH_bottom_DASH_px,null,cljs.core.cst$kw$top_DASH_px,null,cljs.core.cst$kw$left_DASH_px,null,cljs.core.cst$kw$circles_QMARK_,null,cljs.core.cst$kw$element_DASH_w,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__48885){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__48895 = cljs.core.keyword_identical_QMARK_;
var expr__48896 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__48898 = cljs.core.cst$kw$topo;
var G__48899 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48898,G__48899) : pred__48895.call(null,G__48898,G__48899));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(G__48885,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48900 = cljs.core.cst$kw$scroll_DASH_top;
var G__48901 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48900,G__48901) : pred__48895.call(null,G__48900,G__48901));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,G__48885,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48902 = cljs.core.cst$kw$dt_DASH_offset;
var G__48903 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48902,G__48903) : pred__48895.call(null,G__48902,G__48903));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,G__48885,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48904 = cljs.core.cst$kw$draw_DASH_steps;
var G__48905 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48904,G__48905) : pred__48895.call(null,G__48904,G__48905));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,G__48885,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48906 = cljs.core.cst$kw$element_DASH_w;
var G__48907 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48906,G__48907) : pred__48895.call(null,G__48906,G__48907));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,G__48885,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48908 = cljs.core.cst$kw$element_DASH_h;
var G__48909 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48908,G__48909) : pred__48895.call(null,G__48908,G__48909));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,G__48885,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48910 = cljs.core.cst$kw$shrink;
var G__48911 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48910,G__48911) : pred__48895.call(null,G__48910,G__48911));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,G__48885,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48912 = cljs.core.cst$kw$left_DASH_px;
var G__48913 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48912,G__48913) : pred__48895.call(null,G__48912,G__48913));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,G__48885,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48914 = cljs.core.cst$kw$top_DASH_px;
var G__48915 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48914,G__48915) : pred__48895.call(null,G__48914,G__48915));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,G__48885,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48916 = cljs.core.cst$kw$max_DASH_bottom_DASH_px;
var G__48917 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48916,G__48917) : pred__48895.call(null,G__48916,G__48917));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,G__48885,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48918 = cljs.core.cst$kw$circles_QMARK_;
var G__48919 = expr__48896;
return (pred__48895.cljs$core$IFn$_invoke$arity$2 ? pred__48895.cljs$core$IFn$_invoke$arity$2(G__48918,G__48919) : pred__48895.call(null,G__48918,G__48919));
})())){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,G__48885,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__48885),null));
}
}
}
}
}
}
}
}
}
}
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$ = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,self__.left_px,cljs.core.cst$kw$y,self__.top_px,cljs.core.cst$kw$w,(self__.draw_steps * self__.element_w),cljs.core.cst$kw$h,(function (){var G__48920 = (org.nfrac.comportex.topography.size(self__.topo) * self__.element_h);
if(cljs.core.truth_(self__.max_bottom_px)){
var x__9618__auto__ = G__48920;
var y__9619__auto__ = (self__.max_bottom_px - self__.top_px);
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
} else {
return G__48920;
}
})()], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$dt_DASH_offset,self__.dt_offset],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$draw_DASH_steps,self__.draw_steps],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__48885){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(self__.topo,self__.scroll_top,self__.dt_offset,self__.draw_steps,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,G__48885,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid1dLayout.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.viz_layouts.Grid1dLayout.getBasis = (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$topo,cljs.core.cst$sym$scroll_DASH_top,cljs.core.cst$sym$dt_DASH_offset,cljs.core.cst$sym$draw_DASH_steps,cljs.core.cst$sym$element_DASH_w,cljs.core.cst$sym$element_DASH_h,cljs.core.cst$sym$shrink,cljs.core.cst$sym$left_DASH_px,cljs.core.cst$sym$top_DASH_px,cljs.core.cst$sym$max_DASH_bottom_DASH_px,cljs.core.cst$sym$circles_QMARK_], null);
});

org.numenta.sanity.viz_layouts.Grid1dLayout.cljs$lang$type = true;

org.numenta.sanity.viz_layouts.Grid1dLayout.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.viz-layouts/Grid1dLayout");
});

org.numenta.sanity.viz_layouts.Grid1dLayout.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.viz-layouts/Grid1dLayout");
});

org.numenta.sanity.viz_layouts.__GT_Grid1dLayout = (function org$numenta$sanity$viz_layouts$__GT_Grid1dLayout(topo,scroll_top,dt_offset,draw_steps,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(topo,scroll_top,dt_offset,draw_steps,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,null,null,null));
});

org.numenta.sanity.viz_layouts.map__GT_Grid1dLayout = (function org$numenta$sanity$viz_layouts$map__GT_Grid1dLayout(G__48887){
return (new org.numenta.sanity.viz_layouts.Grid1dLayout(cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$scroll_DASH_top.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$dt_DASH_offset.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$draw_DASH_steps.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$element_DASH_w.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$element_DASH_h.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$shrink.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$left_DASH_px.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$top_DASH_px.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$max_DASH_bottom_DASH_px.cljs$core$IFn$_invoke$arity$1(G__48887),cljs.core.cst$kw$circles_QMARK_.cljs$core$IFn$_invoke$arity$1(G__48887),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__48887,cljs.core.cst$kw$topo,cljs.core.array_seq([cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$draw_DASH_steps,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], 0)),null));
});

org.numenta.sanity.viz_layouts.grid_1d_layout = (function org$numenta$sanity$viz_layouts$grid_1d_layout(topography,top,left,opts,inbits_QMARK_){
var map__48924 = opts;
var map__48924__$1 = ((((!((map__48924 == null)))?((((map__48924.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48924.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48924):map__48924);
var draw_steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$draw_DASH_steps);
var max_height_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$max_DASH_height_DASH_px);
var col_d_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$col_DASH_d_DASH_px);
var col_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$col_DASH_shrink);
var bit_w_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$bit_DASH_w_DASH_px);
var bit_h_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$bit_DASH_h_DASH_px);
var bit_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48924__$1,cljs.core.cst$kw$bit_DASH_shrink);
return org.numenta.sanity.viz_layouts.map__GT_Grid1dLayout(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$topo,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$shrink,cljs.core.cst$kw$draw_DASH_steps,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$circles_QMARK_,cljs.core.cst$kw$element_DASH_w],[(0),topography,(cljs.core.truth_(inbits_QMARK_)?bit_h_px:col_d_px),(0),(cljs.core.truth_(inbits_QMARK_)?bit_shrink:col_shrink),draw_steps,(cljs.core.truth_(max_height_px)?(max_height_px - org.numenta.sanity.viz_layouts.extra_px_for_highlight):null),top,left,(cljs.core.truth_(inbits_QMARK_)?false:true),(cljs.core.truth_(inbits_QMARK_)?bit_w_px:col_d_px)]));
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {org.numenta.sanity.viz_layouts.PArrayLayout}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.viz_layouts.PBox}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.viz_layouts.Grid2dLayout = (function (n_elements,topo,scroll_top,dt_offset,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,__meta,__extmap,__hash){
this.n_elements = n_elements;
this.topo = topo;
this.scroll_top = scroll_top;
this.dt_offset = dt_offset;
this.element_w = element_w;
this.element_h = element_h;
this.shrink = shrink;
this.left_px = left_px;
this.top_px = top_px;
this.max_bottom_px = max_bottom_px;
this.circles_QMARK_ = circles_QMARK_;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k48927,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__48929 = (((k48927 instanceof cljs.core.Keyword))?k48927.fqn:null);
switch (G__48929) {
case "scroll-top":
return self__.scroll_top;

break;
case "topo":
return self__.topo;

break;
case "element-h":
return self__.element_h;

break;
case "dt-offset":
return self__.dt_offset;

break;
case "shrink":
return self__.shrink;

break;
case "max-bottom-px":
return self__.max_bottom_px;

break;
case "n-elements":
return self__.n_elements;

break;
case "top-px":
return self__.top_px;

break;
case "left-px":
return self__.left_px;

break;
case "circles?":
return self__.circles_QMARK_;

break;
case "element-w":
return self__.element_w;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k48927,else__9951__auto__);

}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.viz-layouts.Grid2dLayout{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_elements,self__.n_elements],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$dt_DASH_offset,self__.dt_offset],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__48926){
var self__ = this;
var G__48926__$1 = this;
return (new cljs.core.RecordIter((0),G__48926__$1,11,new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$n_DASH_elements,cljs.core.cst$kw$topo,cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (11 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 = (function (this$,dt){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(org.numenta.sanity.viz_layouts.layout_bounds(this$__$1),cljs.core.cst$kw$x,(0),cljs.core.array_seq([cljs.core.cst$kw$y,(0)], 0));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var vec__48930 = org.nfrac.comportex.topography.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48930,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48930,(1),null);
var x__9618__auto__ = self__.n_elements;
var y__9619__auto__ = (w * (function (){var G__48933 = h;
if(cljs.core.truth_(self__.max_bottom_px)){
var x__9618__auto____$1 = G__48933;
var y__9619__auto__ = cljs.core.quot((self__.max_bottom_px - self__.top_px),self__.element_h);
return ((x__9618__auto____$1 < y__9619__auto__) ? x__9618__auto____$1 : y__9619__auto__);
} else {
return G__48933;
}
})());
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.element_w,self__.element_h], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 = (function (this$,ctx,id){
var self__ = this;
var this$__$1 = this;
var vec__48934 = org.numenta.sanity.viz_layouts.local_px_topleft(this$__$1,id);
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48934,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48934,(1),null);
if(cljs.core.truth_(self__.circles_QMARK_)){
return org.numenta.sanity.viz_layouts.circle_from_bounds(ctx,x,y,(self__.element_w * self__.shrink));
} else {
return ctx.rect(x,y,(self__.element_w * self__.shrink),(self__.element_h * self__.shrink));
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 = (function (this$,id){
var self__ = this;
var this$__$1 = this;
var n0 = self__.scroll_top;
return ((n0 <= id)) && ((id < (n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1))));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.n_elements;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var n0 = self__.scroll_top;
return cljs.core.range.cljs$core$IFn$_invoke$arity$2(n0,(n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1)));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.scroll_top;
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.left_px,self__.top_px], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 = (function (this$,down_QMARK_){
var self__ = this;
var this$__$1 = this;
var page_n = org.numenta.sanity.viz_layouts.ids_onscreen_count(this$__$1);
var n_ids = org.nfrac.comportex.topography.size(self__.topo);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$scroll_DASH_top,(cljs.core.truth_(down_QMARK_)?(((self__.scroll_top < (n_ids - page_n)))?(self__.scroll_top + page_n):self__.scroll_top):(function (){var x__9611__auto__ = (0);
var y__9612__auto__ = (self__.scroll_top - page_n);
return ((x__9611__auto__ > y__9612__auto__) ? x__9611__auto__ : y__9612__auto__);
})()));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
var vec__48937 = org.nfrac.comportex.topography.coordinates_of_index(self__.topo,(id + self__.scroll_top));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48937,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48937,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x * self__.element_w),(y * self__.element_h)], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 = (function (_,x,y){
var self__ = this;
var ___$1 = this;
var vec__48940 = org.nfrac.comportex.topography.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48940,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48940,(1),null);
var xi = (function (){var G__48943 = ((x - self__.left_px) / self__.element_w);
return Math.floor(G__48943);
})();
var yi = (function (){var G__48944 = ((y - self__.top_px) / self__.element_h);
return Math.floor(G__48944);
})();
if(((((0) <= xi)) && ((xi <= (w - (1))))) && ((yi <= (h - (1))))){
if((y >= (0))){
var id_STAR_ = org.nfrac.comportex.topography.index_of_coordinates(self__.topo,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [xi,yi], null));
var id = (id_STAR_ - self__.scroll_top);
if((id < self__.n_elements)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.dt_offset,id], null);
} else {
return null;
}
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.dt_offset,null], null);
}
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [cljs.core.cst$kw$scroll_DASH_top,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$element_DASH_h,null,cljs.core.cst$kw$dt_DASH_offset,null,cljs.core.cst$kw$shrink,null,cljs.core.cst$kw$max_DASH_bottom_DASH_px,null,cljs.core.cst$kw$n_DASH_elements,null,cljs.core.cst$kw$top_DASH_px,null,cljs.core.cst$kw$left_DASH_px,null,cljs.core.cst$kw$circles_QMARK_,null,cljs.core.cst$kw$element_DASH_w,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__48926){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__48945 = cljs.core.keyword_identical_QMARK_;
var expr__48946 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__48948 = cljs.core.cst$kw$n_DASH_elements;
var G__48949 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48948,G__48949) : pred__48945.call(null,G__48948,G__48949));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(G__48926,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48950 = cljs.core.cst$kw$topo;
var G__48951 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48950,G__48951) : pred__48945.call(null,G__48950,G__48951));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,G__48926,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48952 = cljs.core.cst$kw$scroll_DASH_top;
var G__48953 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48952,G__48953) : pred__48945.call(null,G__48952,G__48953));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,G__48926,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48954 = cljs.core.cst$kw$dt_DASH_offset;
var G__48955 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48954,G__48955) : pred__48945.call(null,G__48954,G__48955));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,G__48926,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48956 = cljs.core.cst$kw$element_DASH_w;
var G__48957 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48956,G__48957) : pred__48945.call(null,G__48956,G__48957));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,G__48926,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48958 = cljs.core.cst$kw$element_DASH_h;
var G__48959 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48958,G__48959) : pred__48945.call(null,G__48958,G__48959));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,G__48926,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48960 = cljs.core.cst$kw$shrink;
var G__48961 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48960,G__48961) : pred__48945.call(null,G__48960,G__48961));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,G__48926,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48962 = cljs.core.cst$kw$left_DASH_px;
var G__48963 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48962,G__48963) : pred__48945.call(null,G__48962,G__48963));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,G__48926,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48964 = cljs.core.cst$kw$top_DASH_px;
var G__48965 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48964,G__48965) : pred__48945.call(null,G__48964,G__48965));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,G__48926,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48966 = cljs.core.cst$kw$max_DASH_bottom_DASH_px;
var G__48967 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48966,G__48967) : pred__48945.call(null,G__48966,G__48967));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,G__48926,self__.circles_QMARK_,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__48968 = cljs.core.cst$kw$circles_QMARK_;
var G__48969 = expr__48946;
return (pred__48945.cljs$core$IFn$_invoke$arity$2 ? pred__48945.cljs$core$IFn$_invoke$arity$2(G__48968,G__48969) : pred__48945.call(null,G__48968,G__48969));
})())){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,G__48926,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__48926),null));
}
}
}
}
}
}
}
}
}
}
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$ = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var vec__48970 = org.nfrac.comportex.topography.dimensions(self__.topo);
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48970,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48970,(1),null);
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,self__.left_px,cljs.core.cst$kw$y,self__.top_px,cljs.core.cst$kw$w,(w * self__.element_w),cljs.core.cst$kw$h,(function (){var G__48973 = (h * self__.element_h);
if(cljs.core.truth_(self__.max_bottom_px)){
var x__9618__auto__ = G__48973;
var y__9619__auto__ = (self__.max_bottom_px - self__.top_px);
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
} else {
return G__48973;
}
})()], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$n_DASH_elements,self__.n_elements],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$scroll_DASH_top,self__.scroll_top],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$dt_DASH_offset,self__.dt_offset],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_w,self__.element_w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$element_DASH_h,self__.element_h],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$shrink,self__.shrink],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$left_DASH_px,self__.left_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$top_DASH_px,self__.top_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$max_DASH_bottom_DASH_px,self__.max_bottom_px],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$circles_QMARK_,self__.circles_QMARK_],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__48926){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(self__.n_elements,self__.topo,self__.scroll_top,self__.dt_offset,self__.element_w,self__.element_h,self__.shrink,self__.left_px,self__.top_px,self__.max_bottom_px,self__.circles_QMARK_,G__48926,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.Grid2dLayout.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.viz_layouts.Grid2dLayout.getBasis = (function (){
return new cljs.core.PersistentVector(null, 11, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$n_DASH_elements,cljs.core.cst$sym$topo,cljs.core.cst$sym$scroll_DASH_top,cljs.core.cst$sym$dt_DASH_offset,cljs.core.cst$sym$element_DASH_w,cljs.core.cst$sym$element_DASH_h,cljs.core.cst$sym$shrink,cljs.core.cst$sym$left_DASH_px,cljs.core.cst$sym$top_DASH_px,cljs.core.cst$sym$max_DASH_bottom_DASH_px,cljs.core.cst$sym$circles_QMARK_], null);
});

org.numenta.sanity.viz_layouts.Grid2dLayout.cljs$lang$type = true;

org.numenta.sanity.viz_layouts.Grid2dLayout.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.viz-layouts/Grid2dLayout");
});

org.numenta.sanity.viz_layouts.Grid2dLayout.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.viz-layouts/Grid2dLayout");
});

org.numenta.sanity.viz_layouts.__GT_Grid2dLayout = (function org$numenta$sanity$viz_layouts$__GT_Grid2dLayout(n_elements,topo,scroll_top,dt_offset,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(n_elements,topo,scroll_top,dt_offset,element_w,element_h,shrink,left_px,top_px,max_bottom_px,circles_QMARK_,null,null,null));
});

org.numenta.sanity.viz_layouts.map__GT_Grid2dLayout = (function org$numenta$sanity$viz_layouts$map__GT_Grid2dLayout(G__48928){
return (new org.numenta.sanity.viz_layouts.Grid2dLayout(cljs.core.cst$kw$n_DASH_elements.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$scroll_DASH_top.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$dt_DASH_offset.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$element_DASH_w.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$element_DASH_h.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$shrink.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$left_DASH_px.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$top_DASH_px.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$max_DASH_bottom_DASH_px.cljs$core$IFn$_invoke$arity$1(G__48928),cljs.core.cst$kw$circles_QMARK_.cljs$core$IFn$_invoke$arity$1(G__48928),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__48928,cljs.core.cst$kw$n_DASH_elements,cljs.core.array_seq([cljs.core.cst$kw$topo,cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$element_DASH_w,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$shrink,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$circles_QMARK_], 0)),null));
});

org.numenta.sanity.viz_layouts.grid_2d_layout = (function org$numenta$sanity$viz_layouts$grid_2d_layout(n_elements,topography,top,left,opts,inbits_QMARK_){
var map__48977 = opts;
var map__48977__$1 = ((((!((map__48977 == null)))?((((map__48977.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48977.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48977):map__48977);
var max_height_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48977__$1,cljs.core.cst$kw$max_DASH_height_DASH_px);
var col_d_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48977__$1,cljs.core.cst$kw$col_DASH_d_DASH_px);
var col_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48977__$1,cljs.core.cst$kw$col_DASH_shrink);
var bit_w_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48977__$1,cljs.core.cst$kw$bit_DASH_w_DASH_px);
var bit_h_px = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48977__$1,cljs.core.cst$kw$bit_DASH_h_DASH_px);
var bit_shrink = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48977__$1,cljs.core.cst$kw$bit_DASH_shrink);
return org.numenta.sanity.viz_layouts.map__GT_Grid2dLayout(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$scroll_DASH_top,cljs.core.cst$kw$topo,cljs.core.cst$kw$element_DASH_h,cljs.core.cst$kw$dt_DASH_offset,cljs.core.cst$kw$shrink,cljs.core.cst$kw$max_DASH_bottom_DASH_px,cljs.core.cst$kw$n_DASH_elements,cljs.core.cst$kw$top_DASH_px,cljs.core.cst$kw$left_DASH_px,cljs.core.cst$kw$circles_QMARK_,cljs.core.cst$kw$element_DASH_w],[(0),topography,(cljs.core.truth_(inbits_QMARK_)?bit_h_px:col_d_px),(0),(cljs.core.truth_(inbits_QMARK_)?bit_shrink:col_shrink),(cljs.core.truth_(max_height_px)?(max_height_px - org.numenta.sanity.viz_layouts.extra_px_for_highlight):null),n_elements,top,left,(cljs.core.truth_(inbits_QMARK_)?false:true),(cljs.core.truth_(inbits_QMARK_)?bit_w_px:col_d_px)]));
});
org.numenta.sanity.viz_layouts.grid_layout = (function org$numenta$sanity$viz_layouts$grid_layout(dims,top,left,opts,inbits_QMARK_,display_mode){
var n_elements = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._STAR_,dims);
var G__48989 = (((display_mode instanceof cljs.core.Keyword))?display_mode.fqn:null);
switch (G__48989) {
case "one-d":
return org.numenta.sanity.viz_layouts.grid_1d_layout(org.nfrac.comportex.topography.make_topography(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [n_elements], null)),top,left,opts,inbits_QMARK_);

break;
case "two-d":
var vec__48990 = (function (){var G__48993 = cljs.core.count(dims);
switch (G__48993) {
case (2):
return dims;

break;
case (1):
var w = (function (){var x__9618__auto__ = (function (){var G__48994 = Math.sqrt(n_elements);
return Math.ceil(G__48994);
})();
var y__9619__auto__ = (20);
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [w,(function (){var G__48995 = (n_elements / w);
return Math.ceil(G__48995);
})()], null);

break;
case (3):
var vec__48996 = dims;
var w = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48996,(0),null);
var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48996,(1),null);
var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48996,(2),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [w,(h * d)], null);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.count(dims))].join('')));

}
})();
var width = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48990,(0),null);
var height = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48990,(1),null);
return org.numenta.sanity.viz_layouts.grid_2d_layout(n_elements,org.nfrac.comportex.topography.make_topography(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [width,height], null)),top,left,opts,inbits_QMARK_);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(display_mode)].join('')));

}
});

/**
 * @interface
 */
org.numenta.sanity.viz_layouts.POrderable = function(){};

org.numenta.sanity.viz_layouts.reorder = (function org$numenta$sanity$viz_layouts$reorder(this$,ordered_ids){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$POrderable$reorder$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$POrderable$reorder$arity$2(this$,ordered_ids);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.reorder[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,ordered_ids) : m__9992__auto__.call(null,this$,ordered_ids));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.reorder["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ordered_ids) : m__9992__auto____$1.call(null,this$,ordered_ids));
} else {
throw cljs.core.missing_protocol("POrderable.reorder",this$);
}
}
}
});


/**
 * @interface
 */
org.numenta.sanity.viz_layouts.PTemporalSortable = function(){};

org.numenta.sanity.viz_layouts.sort_by_recent_activity = (function org$numenta$sanity$viz_layouts$sort_by_recent_activity(this$,ids_ts){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$sort_by_recent_activity$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$sort_by_recent_activity$arity$2(this$,ids_ts);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.sort_by_recent_activity[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,ids_ts) : m__9992__auto__.call(null,this$,ids_ts));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.sort_by_recent_activity["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ids_ts) : m__9992__auto____$1.call(null,this$,ids_ts));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.sort-by-recent-activity",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.clear_sort = (function org$numenta$sanity$viz_layouts$clear_sort(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_sort$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_sort$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.clear_sort[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.clear_sort["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.clear-sort",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.add_facet = (function org$numenta$sanity$viz_layouts$add_facet(this$,ids,label){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$add_facet$arity$3 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$add_facet$arity$3(this$,ids,label);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.add_facet[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$3(this$,ids,label) : m__9992__auto__.call(null,this$,ids,label));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.add_facet["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$3(this$,ids,label) : m__9992__auto____$1.call(null,this$,ids,label));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.add-facet",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.clear_facets = (function org$numenta$sanity$viz_layouts$clear_facets(this$){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_facets$arity$1 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_facets$arity$1(this$);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.clear_facets[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto__.call(null,this$));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.clear_facets["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$1(this$) : m__9992__auto____$1.call(null,this$));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.clear-facets",this$);
}
}
}
});

org.numenta.sanity.viz_layouts.draw_facets = (function org$numenta$sanity$viz_layouts$draw_facets(this$,ctx){
if((!((this$ == null))) && (!((this$.org$numenta$sanity$viz_layouts$PTemporalSortable$draw_facets$arity$2 == null)))){
return this$.org$numenta$sanity$viz_layouts$PTemporalSortable$draw_facets$arity$2(this$,ctx);
} else {
var x__9991__auto__ = (((this$ == null))?null:this$);
var m__9992__auto__ = (org.numenta.sanity.viz_layouts.draw_facets[goog.typeOf(x__9991__auto__)]);
if(!((m__9992__auto__ == null))){
return (m__9992__auto__.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto__.cljs$core$IFn$_invoke$arity$2(this$,ctx) : m__9992__auto__.call(null,this$,ctx));
} else {
var m__9992__auto____$1 = (org.numenta.sanity.viz_layouts.draw_facets["_"]);
if(!((m__9992__auto____$1 == null))){
return (m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2 ? m__9992__auto____$1.cljs$core$IFn$_invoke$arity$2(this$,ctx) : m__9992__auto____$1.call(null,this$,ctx));
} else {
throw cljs.core.missing_protocol("PTemporalSortable.draw-facets",this$);
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
 * @implements {org.numenta.sanity.viz_layouts.PArrayLayout}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {org.numenta.sanity.viz_layouts.PTemporalSortable}
 * @implements {org.numenta.sanity.viz_layouts.PBox}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {org.numenta.sanity.viz_layouts.POrderable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
org.numenta.sanity.viz_layouts.OrderableLayout = (function (layout,topo,order,facets,__meta,__extmap,__hash){
this.layout = layout;
this.topo = topo;
this.order = order;
this.facets = facets;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__9948__auto__,k__9949__auto__){
var self__ = this;
var this__9948__auto____$1 = this;
return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this__9948__auto____$1,k__9949__auto__,null);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__9950__auto__,k49003,else__9951__auto__){
var self__ = this;
var this__9950__auto____$1 = this;
var G__49005 = (((k49003 instanceof cljs.core.Keyword))?k49003.fqn:null);
switch (G__49005) {
case "layout":
return self__.layout;

break;
case "topo":
return self__.topo;

break;
case "order":
return self__.order;

break;
case "facets":
return self__.facets;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k49003,else__9951__auto__);

}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__9962__auto__,writer__9963__auto__,opts__9964__auto__){
var self__ = this;
var this__9962__auto____$1 = this;
var pr_pair__9965__auto__ = ((function (this__9962__auto____$1){
return (function (keyval__9966__auto__){
return cljs.core.pr_sequential_writer(writer__9963__auto__,cljs.core.pr_writer,""," ","",opts__9964__auto__,keyval__9966__auto__);
});})(this__9962__auto____$1))
;
return cljs.core.pr_sequential_writer(writer__9963__auto__,pr_pair__9965__auto__,"#org.numenta.sanity.viz-layouts.OrderableLayout{",", ","}",opts__9964__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$layout,self__.layout],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$order,self__.order],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$facets,self__.facets],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IIterable$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__49002){
var self__ = this;
var G__49002__$1 = this;
return (new cljs.core.RecordIter((0),G__49002__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layout,cljs.core.cst$kw$topo,cljs.core.cst$kw$order,cljs.core.cst$kw$facets], null),cljs.core._iterator(self__.__extmap)));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__9946__auto__){
var self__ = this;
var this__9946__auto____$1 = this;
return self__.__meta;
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__9942__auto__){
var self__ = this;
var this__9942__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.topo,self__.order,self__.facets,self__.__meta,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__9952__auto__){
var self__ = this;
var this__9952__auto____$1 = this;
return (4 + cljs.core.count(self__.__extmap));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_dt_bounds$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.local_dt_bounds(self__.layout,dt);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.ids_onscreen_count(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$element_size_px$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.element_size_px(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$draw_element$arity$3 = (function (this$,ctx,id){
var self__ = this;
var this$__$1 = this;
var idx = (self__.order.cljs$core$IFn$_invoke$arity$1 ? self__.order.cljs$core$IFn$_invoke$arity$1(id) : self__.order.call(null,id));
return org.numenta.sanity.viz_layouts.draw_element(self__.layout,ctx,idx);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$id_onscreen_QMARK_$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
var idx = (self__.order.cljs$core$IFn$_invoke$arity$1 ? self__.order.cljs$core$IFn$_invoke$arity$1(id) : self__.order.call(null,id));
return org.numenta.sanity.viz_layouts.id_onscreen_QMARK_(self__.layout,idx);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_count$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.ids_count(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$ids_onscreen$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
var n0 = org.numenta.sanity.viz_layouts.scroll_position(self__.layout);
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.key,cljs.core.subseq.cljs$core$IFn$_invoke$arity$5(self__.order,cljs.core._GT__EQ_,n0,cljs.core._LT_,(n0 + org.numenta.sanity.viz_layouts.ids_onscreen_count(self__.layout))));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll_position$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.scroll_position(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$origin_px_topleft$arity$2 = (function (_,dt){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.origin_px_topleft(self__.layout,dt);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$scroll$arity$2 = (function (this$,down_QMARK_){
var self__ = this;
var this$__$1 = this;
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(this$__$1,cljs.core.cst$kw$layout,org.numenta.sanity.viz_layouts.scroll,down_QMARK_);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$local_px_topleft$arity$2 = (function (_,id){
var self__ = this;
var ___$1 = this;
var idx = (self__.order.cljs$core$IFn$_invoke$arity$1 ? self__.order.cljs$core$IFn$_invoke$arity$1(id) : self__.order.call(null,id));
return org.numenta.sanity.viz_layouts.local_px_topleft(self__.layout,idx);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PArrayLayout$clicked_id$arity$3 = (function (this$,x,y){
var self__ = this;
var this$__$1 = this;
var temp__6728__auto__ = org.numenta.sanity.viz_layouts.clicked_id(self__.layout,x,y);
if(cljs.core.truth_(temp__6728__auto__)){
var vec__49006 = temp__6728__auto__;
var dt = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49006,(0),null);
var idx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49006,(1),null);
if(cljs.core.truth_(idx)){
var id = cljs.core.key(cljs.core.first(cljs.core.subseq.cljs$core$IFn$_invoke$arity$5(self__.order,cljs.core._GT__EQ_,idx,cljs.core._LT__EQ_,idx)));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,id], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [dt,null], null);
}
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__9943__auto__){
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

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__9944__auto__,other__9945__auto__){
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

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__9957__auto__,k__9958__auto__){
var self__ = this;
var this__9957__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$layout,null,cljs.core.cst$kw$topo,null,cljs.core.cst$kw$order,null,cljs.core.cst$kw$facets,null], null), null),k__9958__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__9957__auto____$1),self__.__meta),k__9958__auto__);
} else {
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.topo,self__.order,self__.facets,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__9958__auto__)),null));
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$POrderable$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$POrderable$reorder$arity$2 = (function (this$,ordered_ids){
var self__ = this;
var this$__$1 = this;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(ordered_ids),cljs.core.count(self__.order))){
} else {
throw (new Error("Assert failed: (= (count ordered-ids) (count order))"));
}

return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$order,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.priority_map,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(ordered_ids,cljs.core.range.cljs$core$IFn$_invoke$arity$0())));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$sort_by_recent_activity$arity$2 = (function (this$,ids_ts){
var self__ = this;
var this$__$1 = this;
if(cljs.core.every_QMARK_(cljs.core.set_QMARK_,ids_ts)){
} else {
throw (new Error("Assert failed: (every? set? ids-ts)"));
}

var ftotal = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,self__.facets));
var faceted = cljs.core.take.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order));
var ord_ids = (function (){var ids_ts__$1 = ids_ts;
var ord = cljs.core.transient$(cljs.core.vec(faceted));
var ord_set = cljs.core.transient$(cljs.core.set(faceted));
while(true){
var temp__6726__auto__ = cljs.core.first(ids_ts__$1);
if(cljs.core.truth_(temp__6726__auto__)){
var ids = temp__6726__auto__;
var new_ids = cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(((function (ids_ts__$1,ord,ord_set,ids,temp__6726__auto__,ftotal,faceted,this$__$1){
return (function (id){
return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(((function (ids_ts__$1,ord,ord_set,ids,temp__6726__auto__,ftotal,faceted,this$__$1){
return (function (p1__49001_SHARP_){
return cljs.core.boolean$((p1__49001_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__49001_SHARP_.cljs$core$IFn$_invoke$arity$1(id) : p1__49001_SHARP_.call(null,id)));
});})(ids_ts__$1,ord,ord_set,ids,temp__6726__auto__,ftotal,faceted,this$__$1))
,ids_ts__$1);
});})(ids_ts__$1,ord,ord_set,ids,temp__6726__auto__,ftotal,faceted,this$__$1))
,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(ord_set,ids));
var G__49031 = cljs.core.next(ids_ts__$1);
var G__49032 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ord,new_ids);
var G__49033 = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ord_set,new_ids);
ids_ts__$1 = G__49031;
ord = G__49032;
ord_set = G__49033;
continue;
} else {
return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj_BANG_,ord,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(ord_set,cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(self__.order)))));
}
break;
}
})();
return org.numenta.sanity.viz_layouts.reorder(this$__$1,ord_ids);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_sort$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var ftotal = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,self__.facets));
var faceted = cljs.core.take.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order));
var ord_ids = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(faceted,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(faceted),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(self__.order))));
return org.numenta.sanity.viz_layouts.reorder(this$__$1,ord_ids);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$add_facet$arity$3 = (function (this$,ids,label){
var self__ = this;
var this$__$1 = this;
var ftotal = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.second,self__.facets));
var old_faceted = cljs.core.take.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order));
var new_faceted = cljs.core.distinct.cljs$core$IFn$_invoke$arity$1(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(old_faceted,ids));
var new_length = (cljs.core.count(new_faceted) - cljs.core.count(old_faceted));
if((new_length === (0))){
return this$__$1;
} else {
var ord_ids = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new_faceted,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.set(ids),cljs.core.drop.cljs$core$IFn$_invoke$arity$2(ftotal,cljs.core.keys(self__.order))));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.viz_layouts.reorder(this$__$1,ord_ids),cljs.core.cst$kw$facets,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(self__.facets,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [label,new_length], null)));
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$clear_facets$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this$__$1,cljs.core.cst$kw$facets,cljs.core.PersistentVector.EMPTY);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PTemporalSortable$draw_facets$arity$2 = (function (this$,ctx){
var self__ = this;
var this$__$1 = this;
if(cljs.core.seq(self__.facets)){
var bb = org.numenta.sanity.viz_layouts.layout_bounds(this$__$1);
var vec__49009 = org.numenta.sanity.viz_layouts.origin_px_topleft(this$__$1,(0));
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49009,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49009,(1),null);
monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"black");

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$bottom);

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(((function (bb,vec__49009,x,y,this$__$1){
return (function (offset,p__49012){
var vec__49013 = p__49012;
var label = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49013,(0),null);
var length = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49013,(1),null);
var idx = (offset + length);
var vec__49016 = org.numenta.sanity.viz_layouts.local_px_topleft(self__.layout,idx);
var lx = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49016,(0),null);
var ly = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__49016,(1),null);
var y_px = (y + ly);
monet.canvas.begin_path(ctx);

monet.canvas.move_to(ctx,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb),y_px);

monet.canvas.line_to(ctx,((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) + cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb)) + (16)),y_px);

monet.canvas.stroke(ctx);

monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(bb) + cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(bb)) + (3)),cljs.core.cst$kw$y,y_px,cljs.core.cst$kw$text,label], null));

return (offset + length);
});})(bb,vec__49009,x,y,this$__$1))
,(0),self__.facets);
} else {
return null;
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__9955__auto__,k__9956__auto__,G__49002){
var self__ = this;
var this__9955__auto____$1 = this;
var pred__49019 = cljs.core.keyword_identical_QMARK_;
var expr__49020 = k__9956__auto__;
if(cljs.core.truth_((function (){var G__49022 = cljs.core.cst$kw$layout;
var G__49023 = expr__49020;
return (pred__49019.cljs$core$IFn$_invoke$arity$2 ? pred__49019.cljs$core$IFn$_invoke$arity$2(G__49022,G__49023) : pred__49019.call(null,G__49022,G__49023));
})())){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(G__49002,self__.topo,self__.order,self__.facets,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__49024 = cljs.core.cst$kw$topo;
var G__49025 = expr__49020;
return (pred__49019.cljs$core$IFn$_invoke$arity$2 ? pred__49019.cljs$core$IFn$_invoke$arity$2(G__49024,G__49025) : pred__49019.call(null,G__49024,G__49025));
})())){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,G__49002,self__.order,self__.facets,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__49026 = cljs.core.cst$kw$order;
var G__49027 = expr__49020;
return (pred__49019.cljs$core$IFn$_invoke$arity$2 ? pred__49019.cljs$core$IFn$_invoke$arity$2(G__49026,G__49027) : pred__49019.call(null,G__49026,G__49027));
})())){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.topo,G__49002,self__.facets,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((function (){var G__49028 = cljs.core.cst$kw$facets;
var G__49029 = expr__49020;
return (pred__49019.cljs$core$IFn$_invoke$arity$2 ? pred__49019.cljs$core$IFn$_invoke$arity$2(G__49028,G__49029) : pred__49019.call(null,G__49028,G__49029));
})())){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.topo,self__.order,G__49002,self__.__meta,self__.__extmap,null));
} else {
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.topo,self__.order,self__.facets,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__9956__auto__,G__49002),null));
}
}
}
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PBox$ = true;

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.org$numenta$sanity$viz_layouts$PBox$layout_bounds$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return org.numenta.sanity.viz_layouts.layout_bounds(self__.layout);
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__9960__auto__){
var self__ = this;
var this__9960__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$layout,self__.layout],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$topo,self__.topo],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$order,self__.order],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.core.cst$kw$facets,self__.facets],null))], null),self__.__extmap));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__9947__auto__,G__49002){
var self__ = this;
var this__9947__auto____$1 = this;
return (new org.numenta.sanity.viz_layouts.OrderableLayout(self__.layout,self__.topo,self__.order,self__.facets,G__49002,self__.__extmap,self__.__hash));
});

org.numenta.sanity.viz_layouts.OrderableLayout.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__9953__auto__,entry__9954__auto__){
var self__ = this;
var this__9953__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__9954__auto__)){
return cljs.core._assoc(this__9953__auto____$1,cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(0)),cljs.core._nth.cljs$core$IFn$_invoke$arity$2(entry__9954__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__9953__auto____$1,entry__9954__auto__);
}
});

org.numenta.sanity.viz_layouts.OrderableLayout.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$sym$layout,cljs.core.cst$sym$topo,cljs.core.cst$sym$order,cljs.core.cst$sym$facets], null);
});

org.numenta.sanity.viz_layouts.OrderableLayout.cljs$lang$type = true;

org.numenta.sanity.viz_layouts.OrderableLayout.cljs$lang$ctorPrSeq = (function (this__9984__auto__){
return cljs.core._conj(cljs.core.List.EMPTY,"org.numenta.sanity.viz-layouts/OrderableLayout");
});

org.numenta.sanity.viz_layouts.OrderableLayout.cljs$lang$ctorPrWriter = (function (this__9984__auto__,writer__9985__auto__){
return cljs.core._write(writer__9985__auto__,"org.numenta.sanity.viz-layouts/OrderableLayout");
});

org.numenta.sanity.viz_layouts.__GT_OrderableLayout = (function org$numenta$sanity$viz_layouts$__GT_OrderableLayout(layout,topo,order,facets){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(layout,topo,order,facets,null,null,null));
});

org.numenta.sanity.viz_layouts.map__GT_OrderableLayout = (function org$numenta$sanity$viz_layouts$map__GT_OrderableLayout(G__49004){
return (new org.numenta.sanity.viz_layouts.OrderableLayout(cljs.core.cst$kw$layout.cljs$core$IFn$_invoke$arity$1(G__49004),cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(G__49004),cljs.core.cst$kw$order.cljs$core$IFn$_invoke$arity$1(G__49004),cljs.core.cst$kw$facets.cljs$core$IFn$_invoke$arity$1(G__49004),null,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__49004,cljs.core.cst$kw$layout,cljs.core.array_seq([cljs.core.cst$kw$topo,cljs.core.cst$kw$order,cljs.core.cst$kw$facets], 0)),null));
});

org.numenta.sanity.viz_layouts.orderable_layout = (function org$numenta$sanity$viz_layouts$orderable_layout(lay,n_ids){
var order = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(tailrecursion.priority_map.priority_map,cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.range.cljs$core$IFn$_invoke$arity$1(n_ids),cljs.core.range.cljs$core$IFn$_invoke$arity$0()));
return org.numenta.sanity.viz_layouts.map__GT_OrderableLayout(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$layout,lay,cljs.core.cst$kw$topo,cljs.core.cst$kw$topo.cljs$core$IFn$_invoke$arity$1(lay),cljs.core.cst$kw$order,order,cljs.core.cst$kw$facets,cljs.core.PersistentVector.EMPTY], null));
});
