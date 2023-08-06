// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.q_learning_1d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.q_learning_1d');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('goog.string');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('goog.string.format');
goog.require('monet.canvas');
org.numenta.sanity.demos.q_learning_1d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_layers,(1)], null));
org.numenta.sanity.demos.q_learning_1d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.frequencies_middleware(cljs.core.cst$kw$x,cljs.core.cst$kw$freqs)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__83455_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__83455_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__83455_SHARP_));
}))));
org.numenta.sanity.demos.q_learning_1d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.q_learning_1d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.q_learning_1d.draw_world = (function org$numenta$sanity$demos$q_learning_1d$draw_world(ctx,inval){
var surface = org.nfrac.comportex.demos.q_learning_1d.surface;
var surface_xy = cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,cljs.core.range.cljs$core$IFn$_invoke$arity$0(),surface);
var x_max = cljs.core.count(surface);
var y_max = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.max,surface);
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((0) - (1)),(x_max + (1))], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(y_max + (1)),(0)], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,(100)], null);
monet.canvas.save(ctx);

monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

var qplot_size_83516 = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size),cljs.core.cst$kw$h,(40)], null);
var qplot_lim_83517 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(2)], null);
var qplot_83518 = org.numenta.sanity.plots_canvas.xy_plot(ctx,qplot_size_83516,x_lim,qplot_lim_83517);
org.numenta.sanity.plots_canvas.frame_BANG_(qplot_83518);

var seq__83486_83519 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__83488_83520 = null;
var count__83489_83521 = (0);
var i__83490_83522 = (0);
while(true){
if((i__83490_83522 < count__83489_83521)){
var vec__83492_83523 = chunk__83488_83520.cljs$core$IIndexed$_nth$arity$2(null,i__83490_83522);
var state_action_83524 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83492_83523,(0),null);
var q_83525 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83492_83523,(1),null);
var map__83495_83526 = state_action_83524;
var map__83495_83527__$1 = ((((!((map__83495_83526 == null)))?((((map__83495_83526.cljs$lang$protocol_mask$partition0$ & (64))) || (map__83495_83526.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__83495_83526):map__83495_83526);
var x_83528 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83495_83527__$1,cljs.core.cst$kw$x);
var action_83529 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83495_83527__$1,cljs.core.cst$kw$action);
var dx_83530 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(action_83529);
monet.canvas.fill_style(ctx,(((q_83525 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_83525));

if((dx_83530 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_83518,(x_83528 - 0.6),(0),0.6,(1));
} else {
if((dx_83530 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_83518,x_83528,(1),0.6,(1));
} else {
}
}

var G__83531 = seq__83486_83519;
var G__83532 = chunk__83488_83520;
var G__83533 = count__83489_83521;
var G__83534 = (i__83490_83522 + (1));
seq__83486_83519 = G__83531;
chunk__83488_83520 = G__83532;
count__83489_83521 = G__83533;
i__83490_83522 = G__83534;
continue;
} else {
var temp__6728__auto___83535 = cljs.core.seq(seq__83486_83519);
if(temp__6728__auto___83535){
var seq__83486_83536__$1 = temp__6728__auto___83535;
if(cljs.core.chunked_seq_QMARK_(seq__83486_83536__$1)){
var c__10181__auto___83537 = cljs.core.chunk_first(seq__83486_83536__$1);
var G__83538 = cljs.core.chunk_rest(seq__83486_83536__$1);
var G__83539 = c__10181__auto___83537;
var G__83540 = cljs.core.count(c__10181__auto___83537);
var G__83541 = (0);
seq__83486_83519 = G__83538;
chunk__83488_83520 = G__83539;
count__83489_83521 = G__83540;
i__83490_83522 = G__83541;
continue;
} else {
var vec__83497_83542 = cljs.core.first(seq__83486_83536__$1);
var state_action_83543 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83497_83542,(0),null);
var q_83544 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83497_83542,(1),null);
var map__83500_83545 = state_action_83543;
var map__83500_83546__$1 = ((((!((map__83500_83545 == null)))?((((map__83500_83545.cljs$lang$protocol_mask$partition0$ & (64))) || (map__83500_83545.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__83500_83545):map__83500_83545);
var x_83547 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83500_83546__$1,cljs.core.cst$kw$x);
var action_83548 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83500_83546__$1,cljs.core.cst$kw$action);
var dx_83549 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(action_83548);
monet.canvas.fill_style(ctx,(((q_83544 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_83544));

if((dx_83549 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_83518,(x_83547 - 0.6),(0),0.6,(1));
} else {
if((dx_83549 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(qplot_83518,x_83547,(1),0.6,(1));
} else {
}
}

var G__83550 = cljs.core.next(seq__83486_83536__$1);
var G__83551 = null;
var G__83552 = (0);
var G__83553 = (0);
seq__83486_83519 = G__83550;
chunk__83488_83520 = G__83551;
count__83489_83521 = G__83552;
i__83490_83522 = G__83553;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,0.25);

monet.canvas.fill_style(ctx,"black");

var seq__83502_83554 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1((cljs.core.count(surface) + (1))));
var chunk__83503_83555 = null;
var count__83504_83556 = (0);
var i__83505_83557 = (0);
while(true){
if((i__83505_83557 < count__83504_83556)){
var x_83558 = chunk__83503_83555.cljs$core$IIndexed$_nth$arity$2(null,i__83505_83557);
org.numenta.sanity.plots_canvas.line_BANG_(qplot_83518,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83558,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83558,(2)], null)], null));

var G__83559 = seq__83502_83554;
var G__83560 = chunk__83503_83555;
var G__83561 = count__83504_83556;
var G__83562 = (i__83505_83557 + (1));
seq__83502_83554 = G__83559;
chunk__83503_83555 = G__83560;
count__83504_83556 = G__83561;
i__83505_83557 = G__83562;
continue;
} else {
var temp__6728__auto___83563 = cljs.core.seq(seq__83502_83554);
if(temp__6728__auto___83563){
var seq__83502_83564__$1 = temp__6728__auto___83563;
if(cljs.core.chunked_seq_QMARK_(seq__83502_83564__$1)){
var c__10181__auto___83565 = cljs.core.chunk_first(seq__83502_83564__$1);
var G__83566 = cljs.core.chunk_rest(seq__83502_83564__$1);
var G__83567 = c__10181__auto___83565;
var G__83568 = cljs.core.count(c__10181__auto___83565);
var G__83569 = (0);
seq__83502_83554 = G__83566;
chunk__83503_83555 = G__83567;
count__83504_83556 = G__83568;
i__83505_83557 = G__83569;
continue;
} else {
var x_83570 = cljs.core.first(seq__83502_83564__$1);
org.numenta.sanity.plots_canvas.line_BANG_(qplot_83518,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83570,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83570,(2)], null)], null));

var G__83571 = cljs.core.next(seq__83502_83564__$1);
var G__83572 = null;
var G__83573 = (0);
var G__83574 = (0);
seq__83502_83554 = G__83571;
chunk__83503_83555 = G__83572;
count__83504_83556 = G__83573;
i__83505_83557 = G__83574;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

monet.canvas.translate(ctx,(0),(40));

var plot_83575 = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
org.numenta.sanity.plots_canvas.frame_BANG_(plot_83575);

monet.canvas.stroke_style(ctx,"lightgray");

org.numenta.sanity.plots_canvas.grid_BANG_(plot_83575,cljs.core.PersistentArrayMap.EMPTY);

monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot_83575,surface_xy);

var dx_1_83576 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var x_83577 = cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval);
var y_83578 = cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval);
var x_1_83579 = (x_83577 - dx_1_83576);
var y_1_83580 = (surface.cljs$core$IFn$_invoke$arity$1 ? surface.cljs$core$IFn$_invoke$arity$1(x_1_83579) : surface.call(null,x_1_83579));
monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot_83575,x_1_83579,y_1_83580,(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot_83575,x_83577,y_83578,(4));

monet.canvas.translate(ctx,(0),cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));

var freqs_83581 = cljs.core.cst$kw$freqs.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(inval));
var hist_lim_83582 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.max,cljs.core.vals(freqs_83581)) + (1))], null);
var histogram_83583 = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,hist_lim_83582);
monet.canvas.stroke_style(ctx,"black");

var seq__83506_83584 = cljs.core.seq(freqs_83581);
var chunk__83507_83585 = null;
var count__83508_83586 = (0);
var i__83509_83587 = (0);
while(true){
if((i__83509_83587 < count__83508_83586)){
var vec__83510_83588 = chunk__83507_83585.cljs$core$IIndexed$_nth$arity$2(null,i__83509_83587);
var x_83589 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83510_83588,(0),null);
var f_83590 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83510_83588,(1),null);
org.numenta.sanity.plots_canvas.line_BANG_(histogram_83583,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83589,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83589,f_83590], null)], null));

var G__83591 = seq__83506_83584;
var G__83592 = chunk__83507_83585;
var G__83593 = count__83508_83586;
var G__83594 = (i__83509_83587 + (1));
seq__83506_83584 = G__83591;
chunk__83507_83585 = G__83592;
count__83508_83586 = G__83593;
i__83509_83587 = G__83594;
continue;
} else {
var temp__6728__auto___83595 = cljs.core.seq(seq__83506_83584);
if(temp__6728__auto___83595){
var seq__83506_83596__$1 = temp__6728__auto___83595;
if(cljs.core.chunked_seq_QMARK_(seq__83506_83596__$1)){
var c__10181__auto___83597 = cljs.core.chunk_first(seq__83506_83596__$1);
var G__83598 = cljs.core.chunk_rest(seq__83506_83596__$1);
var G__83599 = c__10181__auto___83597;
var G__83600 = cljs.core.count(c__10181__auto___83597);
var G__83601 = (0);
seq__83506_83584 = G__83598;
chunk__83507_83585 = G__83599;
count__83508_83586 = G__83600;
i__83509_83587 = G__83601;
continue;
} else {
var vec__83513_83602 = cljs.core.first(seq__83506_83596__$1);
var x_83603 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83513_83602,(0),null);
var f_83604 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83513_83602,(1),null);
org.numenta.sanity.plots_canvas.line_BANG_(histogram_83583,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83603,(0)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_83603,f_83604], null)], null));

var G__83605 = cljs.core.next(seq__83506_83596__$1);
var G__83606 = null;
var G__83607 = (0);
var G__83608 = (0);
seq__83506_83584 = G__83605;
chunk__83507_83585 = G__83606;
count__83508_83586 = G__83607;
i__83509_83587 = G__83608;
continue;
}
} else {
}
}
break;
}

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.q_learning_1d.signed_str = (function org$numenta$sanity$demos$q_learning_1d$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.q_learning_1d.q_learning_sub_pane = (function org$numenta$sanity$demos$q_learning_1d$q_learning_sub_pane(htm){
var alyr = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(htm,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,cljs.core.cst$kw$action,cljs.core.cst$kw$layer_DASH_3], null));
var qinfo = cljs.core.cst$kw$Q_DASH_info.cljs$core$IFn$_invoke$arity$1(alyr);
var map__83613 = cljs.core.cst$kw$params.cljs$core$IFn$_invoke$arity$1(alyr);
var map__83613__$1 = ((((!((map__83613 == null)))?((((map__83613.cljs$lang$protocol_mask$partition0$ & (64))) || (map__83613.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__83613):map__83613);
var q_alpha = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83613__$1,cljs.core.cst$kw$q_DASH_alpha);
var q_discount = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__83613__$1,cljs.core.cst$kw$q_DASH_discount);
var Q_T = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"Q",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t"], null)], null);
var Q_T_1 = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var$text_DASH_nowrap,"Q",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t-1"], null)], null);
var R_T = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var$text_DASH_nowrap,"R",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t"], null)], null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"Q learning"], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,R_T], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$reward.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((2))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,Q_T], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"goodness"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$Q_DASH_val.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((3))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,Q_T_1], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"previous"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$Q_DASH_old.cljs$core$IFn$_invoke$arity$2(qinfo,(0)).toFixed((3))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"n"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"active synapses"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$perms.cljs$core$IFn$_invoke$arity$2(qinfo,(0))], null)], null)], null),new cljs.core.PersistentVector(null, 13, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_right,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"adjustment: "], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$br], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,[cljs.core.str("learning rate, alpha")].join('')], null),q_alpha], null),"(",R_T," + ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$abbr,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$title,"discount factor"], null),q_discount], null),Q_T," - ",Q_T_1,") = ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$mark,(function (){var G__83615 = "%+.3f";
var G__83616 = cljs.core.cst$kw$adj.cljs$core$IFn$_invoke$arity$2(qinfo,(0));
return goog.string.format(G__83615,G__83616);
})()], null)], null)], null);
});
org.numenta.sanity.demos.q_learning_1d.world_pane = (function org$numenta$sanity$demos$q_learning_1d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_1d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__83634){
var vec__83635 = p__83634;
var sel1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83635,(0),null);
var temp__6728__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sel1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step,cljs.core.cst$kw$snapshot_DASH_id], null));
if(cljs.core.truth_(temp__6728__auto__)){
var snapshot_id = temp__6728__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",snapshot_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83635,sel1,selected_htm){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83635,sel1,selected_htm){
return (function (state_83642){
var state_val_83643 = (state_83642[(1)]);
if((state_val_83643 === (1))){
var state_83642__$1 = state_83642;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83642__$1,(2),out_c);
} else {
if((state_val_83643 === (2))){
var inst_83639 = (state_83642[(2)]);
var inst_83640 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_83639) : cljs.core.reset_BANG_.call(null,selected_htm,inst_83639));
var state_83642__$1 = state_83642;
return cljs.core.async.impl.ioc_helpers.return_chan(state_83642__$1,inst_83640);
} else {
return null;
}
}
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83635,sel1,selected_htm))
;
return ((function (switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83635,sel1,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_83647 = [null,null,null,null,null,null,null];
(statearr_83647[(0)] = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto__);

(statearr_83647[(1)] = (1));

return statearr_83647;
});
var org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto____1 = (function (state_83642){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_83642);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e83648){if((e83648 instanceof Object)){
var ex__41988__auto__ = e83648;
var statearr_83649_83651 = state_83642;
(statearr_83649_83651[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_83642);

return cljs.core.cst$kw$recur;
} else {
throw e83648;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83652 = state_83642;
state_83642 = G__83652;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto__ = function(state_83642){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto____1.call(this,state_83642);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$q_learning_1d$world_pane_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83635,sel1,selected_htm))
})();
var state__42112__auto__ = (function (){var statearr_83650 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_83650[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_83650;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__83635,sel1,selected_htm))
);

return c__42110__auto__;
} else {
return null;
}
});})(selected_htm))
);

return ((function (selected_htm){
return (function (){
var temp__6728__auto__ = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm));
if(cljs.core.truth_(temp__6728__auto__)){
var htm = temp__6728__auto__;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(htm);
var DELTA = goog.string.unescapeEntities("&Delta;");
var TIMES = goog.string.unescapeEntities("&times;");
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Reward ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"R"], null)," = ",DELTA,"y ",TIMES," 0.5"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"x"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"position"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_1d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval)))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("y")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"~reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_1d.signed_str(cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(inval))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x")].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t+1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_1d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval)))], null)], null)], null),org.numenta.sanity.demos.q_learning_1d.q_learning_sub_pane(htm),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"240px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (inval,DELTA,TIMES,htm,temp__6728__auto__,selected_htm){
return (function (ctx){
var step = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
return org.numenta.sanity.demos.q_learning_1d.draw_world(ctx,inval__$1);
});})(inval,DELTA,TIMES,htm,temp__6728__auto__,selected_htm))
,null], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"top: "], null),"Approx Q values for each position/action combination,\n            where green is positive and red is negative.\n            These are the last seen Q values including last adjustments."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"middle: "], null),"Current position on the objective function surface."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$b,"bottom: "], null),"Frequencies of being at each position."], null)], null)], null);
} else {
return null;
}
});
;})(selected_htm))
});
org.numenta.sanity.demos.q_learning_1d.set_model_BANG_ = (function org$numenta$sanity$demos$q_learning_1d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_1d.model)) == null);
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,init_QMARK_){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,init_QMARK_){
return (function (state_83712){
var state_val_83713 = (state_83712[(1)]);
if((state_val_83713 === (1))){
var state_83712__$1 = state_83712;
if(init_QMARK_){
var statearr_83714_83731 = state_83712__$1;
(statearr_83714_83731[(1)] = (2));

} else {
var statearr_83715_83732 = state_83712__$1;
(statearr_83715_83732[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_83713 === (2))){
var state_83712__$1 = state_83712;
var statearr_83716_83733 = state_83712__$1;
(statearr_83716_83733[(2)] = null);

(statearr_83716_83733[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83713 === (3))){
var state_83712__$1 = state_83712;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83712__$1,(5),org.numenta.sanity.demos.q_learning_1d.world_c);
} else {
if((state_val_83713 === (4))){
var inst_83697 = (state_83712[(2)]);
var inst_83698 = org.nfrac.comportex.demos.q_learning_1d.build();
var inst_83699 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_1d.model,inst_83698) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_1d.model,inst_83698));
var state_83712__$1 = (function (){var statearr_83717 = state_83712;
(statearr_83717[(7)] = inst_83699);

(statearr_83717[(8)] = inst_83697);

return statearr_83717;
})();
if(init_QMARK_){
var statearr_83718_83734 = state_83712__$1;
(statearr_83718_83734[(1)] = (6));

} else {
var statearr_83719_83735 = state_83712__$1;
(statearr_83719_83735[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_83713 === (5))){
var inst_83695 = (state_83712[(2)]);
var state_83712__$1 = state_83712;
var statearr_83720_83736 = state_83712__$1;
(statearr_83720_83736[(2)] = inst_83695);

(statearr_83720_83736[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83713 === (6))){
var inst_83701 = org.nfrac.comportex.demos.q_learning_1d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_1d.world_c);
var inst_83702 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_1d.model,org.numenta.sanity.demos.q_learning_1d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_1d.into_sim,inst_83701);
var state_83712__$1 = state_83712;
var statearr_83721_83737 = state_83712__$1;
(statearr_83721_83737[(2)] = inst_83702);

(statearr_83721_83737[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83713 === (7))){
var inst_83704 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_1d.model));
var inst_83705 = org.numenta.sanity.comportex.data.network_shape(inst_83704);
var inst_83706 = org.numenta.sanity.util.translate_network_shape(inst_83705);
var inst_83707 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.network_shape,inst_83706) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.network_shape,inst_83706));
var state_83712__$1 = state_83712;
var statearr_83722_83738 = state_83712__$1;
(statearr_83722_83738[(2)] = inst_83707);

(statearr_83722_83738[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83713 === (8))){
var inst_83709 = (state_83712[(2)]);
var inst_83710 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_1d.world_c,org.nfrac.comportex.demos.q_learning_1d.initial_inval);
var state_83712__$1 = (function (){var statearr_83723 = state_83712;
(statearr_83723[(9)] = inst_83709);

return statearr_83723;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_83712__$1,inst_83710);
} else {
return null;
}
}
}
}
}
}
}
}
});})(c__42110__auto__,init_QMARK_))
;
return ((function (switch__41984__auto__,c__42110__auto__,init_QMARK_){
return (function() {
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_83727 = [null,null,null,null,null,null,null,null,null,null];
(statearr_83727[(0)] = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto__);

(statearr_83727[(1)] = (1));

return statearr_83727;
});
var org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto____1 = (function (state_83712){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_83712);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e83728){if((e83728 instanceof Object)){
var ex__41988__auto__ = e83728;
var statearr_83729_83739 = state_83712;
(statearr_83729_83739[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_83712);

return cljs.core.cst$kw$recur;
} else {
throw e83728;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__83740 = state_83712;
state_83712 = G__83740;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto__ = function(state_83712){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto____1.call(this,state_83712);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$q_learning_1d$set_model_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,init_QMARK_))
})();
var state__42112__auto__ = (function (){var statearr_83730 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_83730[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_83730;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,init_QMARK_))
);

return c__42110__auto__;
}));
});
org.numenta.sanity.demos.q_learning_1d.config_template = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.q_learning_1d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.q_learning_1d.model_tab = (function org$numenta$sanity$demos$q_learning_1d$model_tab(){
return new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Highly experimental attempt at integrating ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://en.wikipedia.org/wiki/Q-learning"], null),"Q learning"], null)," (reinforcement learning)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"General approach"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A Q value indicates the goodness of taking an action from some\n        state. We represent a Q value by the average permanence of\n        synapses activating the action from that state, minus the\n        initial permanence value."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action layer columns are activated just like any other\n        layer, but are then interpreted to produce an action."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Adjustments to a Q value, based on reward and expected future\n        reward, are applied to the permanence of synapses which\n        directly activated the action (columns). This adjustment\n        applies in the action layer only, where it replaces the usual\n        learning of proximal synapses (spatial pooling)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Exploration arises from the usual boosting of neglected\n        columns, primarily in the action layer."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"This example"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The agent can move left or right on a reward surface. The\n        reward is proportional to the change in y value after\n        moving (dy)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action layer columns are interpreted to produce an\n        action. 15 columns are allocated to each of the two directions\n        of movement, and the direction with most active columns is\n        used to move the agent."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The input is the location of the agent via coordinate\n        encoder, plus the last movement as distal input."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This example is continuous, not episodic. Success is\n        presumably indicated by the agent finding the optimum position\n        and staying there."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.q_learning_1d.config_template,org.numenta.sanity.demos.q_learning_1d.config], null)], null);
});
org.numenta.sanity.demos.q_learning_1d.init = (function org$numenta$sanity$demos$q_learning_1d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_1d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_1d.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.q_learning_1d.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.q_learning_1d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.q_learning_1d.init', org.numenta.sanity.demos.q_learning_1d.init);
