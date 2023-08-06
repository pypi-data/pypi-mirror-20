// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.q_learning_2d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.q_learning_2d');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('goog.string');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.q_learning_1d');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('goog.string.format');
goog.require('monet.canvas');
org.numenta.sanity.demos.q_learning_2d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_layers,(1)], null));
org.numenta.sanity.demos.q_learning_2d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__84345_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__84345_SHARP_,cljs.core.cst$kw$label,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(p1__84345_SHARP_),cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(p1__84345_SHARP_)], null));
})));
org.numenta.sanity.demos.q_learning_2d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.q_learning_2d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.q_learning_2d.draw_world = (function org$numenta$sanity$demos$q_learning_2d$draw_world(ctx,inval,htm){
var surface = org.nfrac.comportex.demos.q_learning_2d.surface;
var x_max = cljs.core.count(surface);
var y_max = cljs.core.count(cljs.core.first(surface));
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),x_max], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),y_max], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var edge_px = (function (){var x__9618__auto__ = width_px;
var y__9619__auto__ = height_px;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,edge_px,cljs.core.cst$kw$h,edge_px], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

var seq__84382_84418 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(surface)));
var chunk__84389_84419 = null;
var count__84390_84420 = (0);
var i__84391_84421 = (0);
while(true){
if((i__84391_84421 < count__84390_84420)){
var y_84422 = chunk__84389_84419.cljs$core$IIndexed$_nth$arity$2(null,i__84391_84421);
var seq__84392_84423 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__84394_84424 = null;
var count__84395_84425 = (0);
var i__84396_84426 = (0);
while(true){
if((i__84396_84426 < count__84395_84425)){
var x_84427 = chunk__84394_84424.cljs$core$IIndexed$_nth$arity$2(null,i__84396_84426);
var v_84428 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_84427,y_84422], null));
if((v_84428 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84427,y_84422,(1),(1));
} else {
if((v_84428 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84427,y_84422,(1),(1));
} else {
}
}

var G__84429 = seq__84392_84423;
var G__84430 = chunk__84394_84424;
var G__84431 = count__84395_84425;
var G__84432 = (i__84396_84426 + (1));
seq__84392_84423 = G__84429;
chunk__84394_84424 = G__84430;
count__84395_84425 = G__84431;
i__84396_84426 = G__84432;
continue;
} else {
var temp__6728__auto___84433 = cljs.core.seq(seq__84392_84423);
if(temp__6728__auto___84433){
var seq__84392_84434__$1 = temp__6728__auto___84433;
if(cljs.core.chunked_seq_QMARK_(seq__84392_84434__$1)){
var c__10181__auto___84435 = cljs.core.chunk_first(seq__84392_84434__$1);
var G__84436 = cljs.core.chunk_rest(seq__84392_84434__$1);
var G__84437 = c__10181__auto___84435;
var G__84438 = cljs.core.count(c__10181__auto___84435);
var G__84439 = (0);
seq__84392_84423 = G__84436;
chunk__84394_84424 = G__84437;
count__84395_84425 = G__84438;
i__84396_84426 = G__84439;
continue;
} else {
var x_84440 = cljs.core.first(seq__84392_84434__$1);
var v_84441 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_84440,y_84422], null));
if((v_84441 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84440,y_84422,(1),(1));
} else {
if((v_84441 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84440,y_84422,(1),(1));
} else {
}
}

var G__84442 = cljs.core.next(seq__84392_84434__$1);
var G__84443 = null;
var G__84444 = (0);
var G__84445 = (0);
seq__84392_84423 = G__84442;
chunk__84394_84424 = G__84443;
count__84395_84425 = G__84444;
i__84396_84426 = G__84445;
continue;
}
} else {
}
}
break;
}

var G__84446 = seq__84382_84418;
var G__84447 = chunk__84389_84419;
var G__84448 = count__84390_84420;
var G__84449 = (i__84391_84421 + (1));
seq__84382_84418 = G__84446;
chunk__84389_84419 = G__84447;
count__84390_84420 = G__84448;
i__84391_84421 = G__84449;
continue;
} else {
var temp__6728__auto___84450 = cljs.core.seq(seq__84382_84418);
if(temp__6728__auto___84450){
var seq__84382_84451__$1 = temp__6728__auto___84450;
if(cljs.core.chunked_seq_QMARK_(seq__84382_84451__$1)){
var c__10181__auto___84452 = cljs.core.chunk_first(seq__84382_84451__$1);
var G__84453 = cljs.core.chunk_rest(seq__84382_84451__$1);
var G__84454 = c__10181__auto___84452;
var G__84455 = cljs.core.count(c__10181__auto___84452);
var G__84456 = (0);
seq__84382_84418 = G__84453;
chunk__84389_84419 = G__84454;
count__84390_84420 = G__84455;
i__84391_84421 = G__84456;
continue;
} else {
var y_84457 = cljs.core.first(seq__84382_84451__$1);
var seq__84383_84458 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.first(surface))));
var chunk__84385_84459 = null;
var count__84386_84460 = (0);
var i__84387_84461 = (0);
while(true){
if((i__84387_84461 < count__84386_84460)){
var x_84462 = chunk__84385_84459.cljs$core$IIndexed$_nth$arity$2(null,i__84387_84461);
var v_84463 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_84462,y_84457], null));
if((v_84463 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84462,y_84457,(1),(1));
} else {
if((v_84463 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84462,y_84457,(1),(1));
} else {
}
}

var G__84464 = seq__84383_84458;
var G__84465 = chunk__84385_84459;
var G__84466 = count__84386_84460;
var G__84467 = (i__84387_84461 + (1));
seq__84383_84458 = G__84464;
chunk__84385_84459 = G__84465;
count__84386_84460 = G__84466;
i__84387_84461 = G__84467;
continue;
} else {
var temp__6728__auto___84468__$1 = cljs.core.seq(seq__84383_84458);
if(temp__6728__auto___84468__$1){
var seq__84383_84469__$1 = temp__6728__auto___84468__$1;
if(cljs.core.chunked_seq_QMARK_(seq__84383_84469__$1)){
var c__10181__auto___84470 = cljs.core.chunk_first(seq__84383_84469__$1);
var G__84471 = cljs.core.chunk_rest(seq__84383_84469__$1);
var G__84472 = c__10181__auto___84470;
var G__84473 = cljs.core.count(c__10181__auto___84470);
var G__84474 = (0);
seq__84383_84458 = G__84471;
chunk__84385_84459 = G__84472;
count__84386_84460 = G__84473;
i__84387_84461 = G__84474;
continue;
} else {
var x_84475 = cljs.core.first(seq__84383_84469__$1);
var v_84476 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(surface,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_84475,y_84457], null));
if((v_84476 >= (10))){
monet.canvas.fill_style(ctx,"#66ff66");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84475,y_84457,(1),(1));
} else {
if((v_84476 <= (-10))){
monet.canvas.fill_style(ctx,"black");

org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84475,y_84457,(1),(1));
} else {
}
}

var G__84477 = cljs.core.next(seq__84383_84469__$1);
var G__84478 = null;
var G__84479 = (0);
var G__84480 = (0);
seq__84383_84458 = G__84477;
chunk__84385_84459 = G__84478;
count__84386_84460 = G__84479;
i__84387_84461 = G__84480;
continue;
}
} else {
}
}
break;
}

var G__84481 = cljs.core.next(seq__84382_84451__$1);
var G__84482 = null;
var G__84483 = (0);
var G__84484 = (0);
seq__84382_84418 = G__84481;
chunk__84389_84419 = G__84482;
count__84390_84420 = G__84483;
i__84391_84421 = G__84484;
continue;
}
} else {
}
}
break;
}

var seq__84398_84485 = cljs.core.seq(cljs.core.cst$kw$Q_DASH_map.cljs$core$IFn$_invoke$arity$1(inval));
var chunk__84400_84486 = null;
var count__84401_84487 = (0);
var i__84402_84488 = (0);
while(true){
if((i__84402_84488 < count__84401_84487)){
var vec__84404_84489 = chunk__84400_84486.cljs$core$IIndexed$_nth$arity$2(null,i__84402_84488);
var state_action_84490 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84404_84489,(0),null);
var q_84491 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84404_84489,(1),null);
var map__84407_84492 = state_action_84490;
var map__84407_84493__$1 = ((((!((map__84407_84492 == null)))?((((map__84407_84492.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84407_84492.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84407_84492):map__84407_84492);
var x_84494 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84407_84493__$1,cljs.core.cst$kw$x);
var y_84495 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84407_84493__$1,cljs.core.cst$kw$y);
var action_84496 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84407_84493__$1,cljs.core.cst$kw$action);
var map__84408_84497 = action_84496;
var map__84408_84498__$1 = ((((!((map__84408_84497 == null)))?((((map__84408_84497.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84408_84497.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84408_84497):map__84408_84497);
var dx_84499 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84408_84498__$1,cljs.core.cst$kw$dx);
var dy_84500 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84408_84498__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_84491 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_84491));

if((dx_84499 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_84494 - 0.25),y_84495,0.25,(1));
} else {
if((dx_84499 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_84494 + (1)),y_84495,0.25,(1));
} else {
if((dy_84500 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84494,(y_84495 - 0.25),(1),0.25);
} else {
if((dy_84500 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84494,(y_84495 + (1)),(1),0.25);
} else {
}
}
}
}

var G__84501 = seq__84398_84485;
var G__84502 = chunk__84400_84486;
var G__84503 = count__84401_84487;
var G__84504 = (i__84402_84488 + (1));
seq__84398_84485 = G__84501;
chunk__84400_84486 = G__84502;
count__84401_84487 = G__84503;
i__84402_84488 = G__84504;
continue;
} else {
var temp__6728__auto___84505 = cljs.core.seq(seq__84398_84485);
if(temp__6728__auto___84505){
var seq__84398_84506__$1 = temp__6728__auto___84505;
if(cljs.core.chunked_seq_QMARK_(seq__84398_84506__$1)){
var c__10181__auto___84507 = cljs.core.chunk_first(seq__84398_84506__$1);
var G__84508 = cljs.core.chunk_rest(seq__84398_84506__$1);
var G__84509 = c__10181__auto___84507;
var G__84510 = cljs.core.count(c__10181__auto___84507);
var G__84511 = (0);
seq__84398_84485 = G__84508;
chunk__84400_84486 = G__84509;
count__84401_84487 = G__84510;
i__84402_84488 = G__84511;
continue;
} else {
var vec__84411_84512 = cljs.core.first(seq__84398_84506__$1);
var state_action_84513 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84411_84512,(0),null);
var q_84514 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84411_84512,(1),null);
var map__84414_84515 = state_action_84513;
var map__84414_84516__$1 = ((((!((map__84414_84515 == null)))?((((map__84414_84515.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84414_84515.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84414_84515):map__84414_84515);
var x_84517 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84414_84516__$1,cljs.core.cst$kw$x);
var y_84518 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84414_84516__$1,cljs.core.cst$kw$y);
var action_84519 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84414_84516__$1,cljs.core.cst$kw$action);
var map__84415_84520 = action_84519;
var map__84415_84521__$1 = ((((!((map__84415_84520 == null)))?((((map__84415_84520.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84415_84520.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84415_84520):map__84415_84520);
var dx_84522 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84415_84521__$1,cljs.core.cst$kw$dx);
var dy_84523 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84415_84521__$1,cljs.core.cst$kw$dy);
monet.canvas.fill_style(ctx,(((q_84514 > (0)))?"green":"red"));

monet.canvas.alpha(ctx,org.nfrac.comportex.util.abs(q_84514));

if((dx_84522 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_84517 - 0.25),y_84518,0.25,(1));
} else {
if((dx_84522 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,(x_84517 + (1)),y_84518,0.25,(1));
} else {
if((dy_84523 > (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84517,(y_84518 - 0.25),(1),0.25);
} else {
if((dy_84523 < (0))){
org.numenta.sanity.plots_canvas.rect_BANG_(plot,x_84517,(y_84518 + (1)),(1),0.25);
} else {
}
}
}
}

var G__84524 = cljs.core.next(seq__84398_84506__$1);
var G__84525 = null;
var G__84526 = (0);
var G__84527 = (0);
seq__84398_84485 = G__84524;
chunk__84400_84486 = G__84525;
count__84401_84487 = G__84526;
i__84402_84488 = G__84527;
continue;
}
} else {
}
}
break;
}

monet.canvas.alpha(ctx,(1));

var x_EQ__84528 = (0.5 + cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval));
var y_EQ__84529 = (0.5 + cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval));
var dx_1_84530 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_1_84531 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval));
var dx_84532 = cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var dy_84533 = cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__84528 - dx_1_84530),(y_EQ__84529 - dy_1_84531)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__84528,y_EQ__84529], null)], null));

monet.canvas.stroke_style(ctx,"#888");

org.numenta.sanity.plots_canvas.line_BANG_(plot,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x_EQ__84528,y_EQ__84529], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(x_EQ__84528 + dx_84532),(y_EQ__84529 + dy_84533)], null)], null));

monet.canvas.stroke_style(ctx,"#888");

monet.canvas.fill_style(ctx,"white");

org.numenta.sanity.plots_canvas.point_BANG_(plot,(x_EQ__84528 - dx_1_84530),(y_EQ__84529 - dy_1_84531),(3));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

org.numenta.sanity.plots_canvas.point_BANG_(plot,x_EQ__84528,y_EQ__84529,(4));

monet.canvas.stroke_style(ctx,"black");

return org.numenta.sanity.plots_canvas.grid_BANG_(plot,cljs.core.PersistentArrayMap.EMPTY);
});
org.numenta.sanity.demos.q_learning_2d.signed_str = (function org$numenta$sanity$demos$q_learning_2d$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.q_learning_2d.world_pane = (function org$numenta$sanity$demos$q_learning_2d$world_pane(){
var selected_htm = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.main.selection,cljs.core.cst$kw$org$numenta$sanity$demos$q_DASH_learning_DASH_2d_SLASH_fetch_DASH_selected_DASH_htm,((function (selected_htm){
return (function (_,___$1,___$2,p__84551){
var vec__84552 = p__84551;
var sel1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84552,(0),null);
var temp__6728__auto__ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(sel1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$step,cljs.core.cst$kw$snapshot_DASH_id], null));
if(cljs.core.truth_(temp__6728__auto__)){
var snapshot_id = temp__6728__auto__;
var out_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.into_journal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-model",snapshot_id,org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(out_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__84552,sel1,selected_htm){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__84552,sel1,selected_htm){
return (function (state_84559){
var state_val_84560 = (state_84559[(1)]);
if((state_val_84560 === (1))){
var state_84559__$1 = state_84559;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_84559__$1,(2),out_c);
} else {
if((state_val_84560 === (2))){
var inst_84556 = (state_84559[(2)]);
var inst_84557 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(selected_htm,inst_84556) : cljs.core.reset_BANG_.call(null,selected_htm,inst_84556));
var state_84559__$1 = state_84559;
return cljs.core.async.impl.ioc_helpers.return_chan(state_84559__$1,inst_84557);
} else {
return null;
}
}
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__84552,sel1,selected_htm))
;
return ((function (switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__84552,sel1,selected_htm){
return (function() {
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto____0 = (function (){
var statearr_84564 = [null,null,null,null,null,null,null];
(statearr_84564[(0)] = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto__);

(statearr_84564[(1)] = (1));

return statearr_84564;
});
var org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto____1 = (function (state_84559){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_84559);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84565){if((e84565 instanceof Object)){
var ex__41988__auto__ = e84565;
var statearr_84566_84568 = state_84559;
(statearr_84566_84568[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_84559);

return cljs.core.cst$kw$recur;
} else {
throw e84565;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84569 = state_84559;
state_84559 = G__84569;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto__ = function(state_84559){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto____1.call(this,state_84559);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$q_learning_2d$world_pane_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__84552,sel1,selected_htm))
})();
var state__42112__auto__ = (function (){var statearr_84567 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84567[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_84567;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,out_c,snapshot_id,temp__6728__auto__,vec__84552,sel1,selected_htm))
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
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Reward ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"R"], null)," = z ",TIMES," 0.01"], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table$table_DASH_condensed,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"x,y"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"position"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval),",",cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x,"),cljs.core.str(DELTA),cljs.core.str("y")].join('')], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval)))),cljs.core.str(","),cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$prev_DASH_action.cljs$core$IFn$_invoke$arity$1(inval))))].join('')], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$var,"z"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"~reward"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$z.cljs$core$IFn$_invoke$arity$1(inval))], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,[cljs.core.str(DELTA),cljs.core.str("x,"),cljs.core.str(DELTA),cljs.core.str("y")].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$sub,"t+1"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"action"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dx.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval)))),cljs.core.str(","),cljs.core.str(org.numenta.sanity.demos.q_learning_2d.signed_str(cljs.core.cst$kw$dy.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval))))].join('')], null)], null)], null),org.numenta.sanity.demos.q_learning_1d.q_learning_sub_pane(htm),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"240px"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection,selected_htm], null),((function (inval,DELTA,TIMES,htm,temp__6728__auto__,selected_htm){
return (function (ctx){
var step = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
return org.numenta.sanity.demos.q_learning_2d.draw_world(ctx,inval__$1,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(selected_htm) : cljs.core.deref.call(null,selected_htm)));
});})(inval,DELTA,TIMES,htm,temp__6728__auto__,selected_htm))
,null], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Current position on the objective function surface. ","Also shows approx Q values for each position/action combination,\n            where green is positive and red is negative.\n            These are the last seen Q values including last adjustments."], null)], null)], null);
} else {
return null;
}
});
;})(selected_htm))
});
org.numenta.sanity.demos.q_learning_2d.set_model_BANG_ = (function org$numenta$sanity$demos$q_learning_2d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_2d.model)) == null);
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,init_QMARK_){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,init_QMARK_){
return (function (state_84629){
var state_val_84630 = (state_84629[(1)]);
if((state_val_84630 === (1))){
var state_84629__$1 = state_84629;
if(init_QMARK_){
var statearr_84631_84648 = state_84629__$1;
(statearr_84631_84648[(1)] = (2));

} else {
var statearr_84632_84649 = state_84629__$1;
(statearr_84632_84649[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_84630 === (2))){
var state_84629__$1 = state_84629;
var statearr_84633_84650 = state_84629__$1;
(statearr_84633_84650[(2)] = null);

(statearr_84633_84650[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84630 === (3))){
var state_84629__$1 = state_84629;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_84629__$1,(5),org.numenta.sanity.demos.q_learning_2d.world_c);
} else {
if((state_val_84630 === (4))){
var inst_84614 = (state_84629[(2)]);
var inst_84615 = org.nfrac.comportex.demos.q_learning_2d.build();
var inst_84616 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.model,inst_84615) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.q_learning_2d.model,inst_84615));
var state_84629__$1 = (function (){var statearr_84634 = state_84629;
(statearr_84634[(7)] = inst_84616);

(statearr_84634[(8)] = inst_84614);

return statearr_84634;
})();
if(init_QMARK_){
var statearr_84635_84651 = state_84629__$1;
(statearr_84635_84651[(1)] = (6));

} else {
var statearr_84636_84652 = state_84629__$1;
(statearr_84636_84652[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_84630 === (5))){
var inst_84612 = (state_84629[(2)]);
var state_84629__$1 = state_84629;
var statearr_84637_84653 = state_84629__$1;
(statearr_84637_84653[(2)] = inst_84612);

(statearr_84637_84653[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84630 === (6))){
var inst_84618 = org.nfrac.comportex.demos.q_learning_2d.htm_step_with_action_selection(org.numenta.sanity.demos.q_learning_2d.world_c);
var inst_84619 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.q_learning_2d.model,org.numenta.sanity.demos.q_learning_2d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.q_learning_2d.into_sim,inst_84618);
var state_84629__$1 = state_84629;
var statearr_84638_84654 = state_84629__$1;
(statearr_84638_84654[(2)] = inst_84619);

(statearr_84638_84654[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84630 === (7))){
var inst_84621 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.q_learning_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.q_learning_2d.model));
var inst_84622 = org.numenta.sanity.comportex.data.network_shape(inst_84621);
var inst_84623 = org.numenta.sanity.util.translate_network_shape(inst_84622);
var inst_84624 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.network_shape,inst_84623) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.network_shape,inst_84623));
var state_84629__$1 = state_84629;
var statearr_84639_84655 = state_84629__$1;
(statearr_84639_84655[(2)] = inst_84624);

(statearr_84639_84655[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84630 === (8))){
var inst_84626 = (state_84629[(2)]);
var inst_84627 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.q_learning_2d.world_c,org.nfrac.comportex.demos.q_learning_2d.initial_inval);
var state_84629__$1 = (function (){var statearr_84640 = state_84629;
(statearr_84640[(9)] = inst_84626);

return statearr_84640;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_84629__$1,inst_84627);
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
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_84644 = [null,null,null,null,null,null,null,null,null,null];
(statearr_84644[(0)] = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto__);

(statearr_84644[(1)] = (1));

return statearr_84644;
});
var org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto____1 = (function (state_84629){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_84629);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84645){if((e84645 instanceof Object)){
var ex__41988__auto__ = e84645;
var statearr_84646_84656 = state_84629;
(statearr_84646_84656[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_84629);

return cljs.core.cst$kw$recur;
} else {
throw e84645;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84657 = state_84629;
state_84629 = G__84657;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto__ = function(state_84629){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto____1.call(this,state_84629);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$q_learning_2d$set_model_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,init_QMARK_))
})();
var state__42112__auto__ = (function (){var statearr_84647 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84647[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_84647;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,init_QMARK_))
);

return c__42110__auto__;
}));
});
org.numenta.sanity.demos.q_learning_2d.config_template = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.q_learning_2d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.q_learning_2d.model_tab = (function org$numenta$sanity$demos$q_learning_2d$model_tab(){
return new cljs.core.PersistentVector(null, 14, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Highly experimental attempt at integrating ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$a,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$href,"http://en.wikipedia.org/wiki/Q-learning"], null),"Q learning"], null)," (reinforcement learning)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"General approach"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A Q value indicates the goodness of taking an action from some\n        state. We represent a Q value by the average permanence of\n        synapses activating the action from that state, minus the\n        initial permanence value."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action layer columns are activated just like any other\n        layer, but are then interpreted to produce an action."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Adjustments to a Q value, based on reward and expected future\n        reward, are applied to the permanence of synapses which\n        directly activated the action (columns). This adjustment\n        applies in the action layer only, where it replaces the usual\n        learning of proximal synapses (spatial pooling)."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Exploration arises from the usual boosting of neglected\n        columns, primarily in the action layer."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h4,"This example"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The agent can move up, down, left or right on a surface.\n        The reward is -3 on normal squares, -200 on hazard squares\n        and +200 on the goal square. These are divided by 100 for\n        comparison to Q values on the synaptic permanence scale."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The action layer columns are interpreted to produce an\n        action. 10 columns are allocated to each of the four\n        directions of movement, and the direction with most active\n        columns is used to move the agent."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The input is the location of the agent via coordinate\n        encoder, plus the last movement as distal input."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"This example is episodic: when the agent reaches either the\n        goal or a hazard it is returned to the starting point. Success\n        is indicated by the agent following a direct path to the goal\n        square."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.q_learning_2d.config_template,org.numenta.sanity.demos.q_learning_2d.config], null)], null);
});
org.numenta.sanity.demos.q_learning_2d.init = (function org$numenta$sanity$demos$q_learning_2d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_2d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.q_learning_2d.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.q_learning_2d.into_sim], null),goog.dom.getElement("sanity-app"));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);

return org.numenta.sanity.demos.q_learning_2d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.q_learning_2d.init', org.numenta.sanity.demos.q_learning_2d.init);
