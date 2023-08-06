// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.sensorimotor_1d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.sensorimotor_1d');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('monet.canvas');
org.numenta.sanity.demos.sensorimotor_1d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$n_DASH_layers,(1),cljs.core.cst$kw$field,cljs.core.cst$kw$abcdefghij,cljs.core.cst$kw$n_DASH_steps,(100),cljs.core.cst$kw$world_DASH_buffer_DASH_count,(0)], null));
org.numenta.sanity.demos.sensorimotor_1d.world_buffer = cljs.core.async.buffer((5000));
org.numenta.sanity.demos.sensorimotor_1d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.sensorimotor_1d.world_buffer,cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__84660_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__84660_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__84660_SHARP_));
})));
org.numenta.sanity.demos.sensorimotor_1d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.sensorimotor_1d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.core.add_watch(org.numenta.sanity.demos.sensorimotor_1d.model,cljs.core.cst$kw$org$numenta$sanity$demos$sensorimotor_DASH_1d_SLASH_count_DASH_world_DASH_buffer,(function (_,___$1,___$2,___$3){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer));
}));
org.numenta.sanity.demos.sensorimotor_1d.item_colors = cljs.core.zipmap(org.nfrac.comportex.demos.sensorimotor_1d.items,(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__84661(s__84662){
return (new cljs.core.LazySeq(null,(function (){
var s__84662__$1 = s__84662;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__84662__$1);
if(temp__6728__auto__){
var s__84662__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__84662__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__84662__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__84664 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__84663 = (0);
while(true){
if((i__84663 < size__10131__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__84663);
var hue = (i * (36));
var lig = ((cljs.core.even_QMARK_(i))?(70):(30));
cljs.core.chunk_append(b__84664,[cljs.core.str("hsl("),cljs.core.str(hue),cljs.core.str(",100%,"),cljs.core.str(lig),cljs.core.str("%)")].join(''));

var G__84667 = (i__84663 + (1));
i__84663 = G__84667;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84664),org$numenta$sanity$demos$sensorimotor_1d$iter__84661(cljs.core.chunk_rest(s__84662__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84664),null);
}
} else {
var i = cljs.core.first(s__84662__$2);
var hue = (i * (36));
var lig = ((cljs.core.even_QMARK_(i))?(70):(30));
return cljs.core.cons([cljs.core.str("hsl("),cljs.core.str(hue),cljs.core.str(",100%,"),cljs.core.str(lig),cljs.core.str("%)")].join(''),org$numenta$sanity$demos$sensorimotor_1d$iter__84661(cljs.core.rest(s__84662__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})());
org.numenta.sanity.demos.sensorimotor_1d.item_text_colors = cljs.core.zipmap(org.nfrac.comportex.demos.sensorimotor_1d.items,(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__84668(s__84669){
return (new cljs.core.LazySeq(null,(function (){
var s__84669__$1 = s__84669;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__84669__$1);
if(temp__6728__auto__){
var s__84669__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__84669__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__84669__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__84671 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__84670 = (0);
while(true){
if((i__84670 < size__10131__auto__)){
var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__84670);
cljs.core.chunk_append(b__84671,((cljs.core.even_QMARK_(i))?"black":"white"));

var G__84674 = (i__84670 + (1));
i__84670 = G__84674;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84671),org$numenta$sanity$demos$sensorimotor_1d$iter__84668(cljs.core.chunk_rest(s__84669__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84671),null);
}
} else {
var i = cljs.core.first(s__84669__$2);
return cljs.core.cons(((cljs.core.even_QMARK_(i))?"black":"white"),org$numenta$sanity$demos$sensorimotor_1d$iter__84668(cljs.core.rest(s__84669__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
})());
org.numenta.sanity.demos.sensorimotor_1d.draw_eye = (function org$numenta$sanity$demos$sensorimotor_1d$draw_eye(ctx,p__84675){
var map__84678 = p__84675;
var map__84678__$1 = ((((!((map__84678 == null)))?((((map__84678.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84678.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84678):map__84678);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84678__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84678__$1,cljs.core.cst$kw$y);
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84678__$1,cljs.core.cst$kw$angle);
var radius = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84678__$1,cljs.core.cst$kw$radius);
monet.canvas.save(ctx);

var pi2_84680 = (Math.PI / (2));
monet.canvas.begin_path(ctx);

monet.canvas.arc(ctx,new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,radius,cljs.core.cst$kw$start_DASH_angle,(- pi2_84680),cljs.core.cst$kw$end_DASH_angle,pi2_84680,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,true], null));

monet.canvas.close_path(ctx);

monet.canvas.fill_style(ctx,"white");

monet.canvas.fill(ctx);

monet.canvas.stroke_style(ctx,"black");

monet.canvas.stroke(ctx);

monet.canvas.clip(ctx);

var pupil_x_84681 = (x + (radius * Math.cos(angle)));
var pupil_y_84682 = (y + (radius * Math.sin(angle)));
monet.canvas.circle(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,pupil_x_84681,cljs.core.cst$kw$y,pupil_y_84682,cljs.core.cst$kw$r,cljs.core.quot(radius,(2))], null));

monet.canvas.fill_style(ctx,"rgb(128,128,255)");

monet.canvas.fill(ctx);

monet.canvas.circle(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,pupil_x_84681,cljs.core.cst$kw$y,pupil_y_84682,cljs.core.cst$kw$r,cljs.core.quot(radius,(5))], null));

monet.canvas.fill_style(ctx,"black");

monet.canvas.fill(ctx);

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.sensorimotor_1d.draw_world = (function org$numenta$sanity$demos$sensorimotor_1d$draw_world(ctx,in_value){
var map__84706 = in_value;
var map__84706__$1 = ((((!((map__84706 == null)))?((((map__84706.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84706.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84706):map__84706);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84706__$1,cljs.core.cst$kw$field);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84706__$1,cljs.core.cst$kw$position);
var next_saccade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84706__$1,cljs.core.cst$kw$next_DASH_saccade);
var item_w = (20);
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),cljs.core.count(field)], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,(cljs.core.count(field) * item_w)], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.stroke_style(ctx,"black");

monet.canvas.font_style(ctx,"bold 14px monospace");

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$middle);

var seq__84708_84729 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,field));
var chunk__84710_84730 = null;
var count__84711_84731 = (0);
var i__84712_84732 = (0);
while(true){
if((i__84712_84732 < count__84711_84731)){
var vec__84714_84733 = chunk__84710_84730.cljs$core$IIndexed$_nth$arity$2(null,i__84712_84732);
var y_84734 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84714_84733,(0),null);
var item_84735 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84714_84733,(1),null);
var rect_84736 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y_84734) : y_scale.call(null,y_84734)),cljs.core.cst$kw$w,item_w,cljs.core.cst$kw$h,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((1)) : y_scale.call(null,(1)))], null);
var G__84717_84737 = ctx;
monet.canvas.fill_style(G__84717_84737,(org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1(item_84735) : org.numenta.sanity.demos.sensorimotor_1d.item_colors.call(null,item_84735)));

monet.canvas.fill_rect(G__84717_84737,rect_84736);

monet.canvas.stroke_rect(G__84717_84737,rect_84736);

monet.canvas.fill_style(G__84717_84737,(org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1(item_84735) : org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.call(null,item_84735)));

monet.canvas.text(G__84717_84737,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__84718 = (y_84734 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__84718) : y_scale.call(null,G__84718));
})(),cljs.core.cst$kw$text,cljs.core.name(item_84735)], null));


var G__84738 = seq__84708_84729;
var G__84739 = chunk__84710_84730;
var G__84740 = count__84711_84731;
var G__84741 = (i__84712_84732 + (1));
seq__84708_84729 = G__84738;
chunk__84710_84730 = G__84739;
count__84711_84731 = G__84740;
i__84712_84732 = G__84741;
continue;
} else {
var temp__6728__auto___84742 = cljs.core.seq(seq__84708_84729);
if(temp__6728__auto___84742){
var seq__84708_84743__$1 = temp__6728__auto___84742;
if(cljs.core.chunked_seq_QMARK_(seq__84708_84743__$1)){
var c__10181__auto___84744 = cljs.core.chunk_first(seq__84708_84743__$1);
var G__84745 = cljs.core.chunk_rest(seq__84708_84743__$1);
var G__84746 = c__10181__auto___84744;
var G__84747 = cljs.core.count(c__10181__auto___84744);
var G__84748 = (0);
seq__84708_84729 = G__84745;
chunk__84710_84730 = G__84746;
count__84711_84731 = G__84747;
i__84712_84732 = G__84748;
continue;
} else {
var vec__84719_84749 = cljs.core.first(seq__84708_84743__$1);
var y_84750 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84719_84749,(0),null);
var item_84751 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84719_84749,(1),null);
var rect_84752 = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y_84750) : y_scale.call(null,y_84750)),cljs.core.cst$kw$w,item_w,cljs.core.cst$kw$h,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((1)) : y_scale.call(null,(1)))], null);
var G__84722_84753 = ctx;
monet.canvas.fill_style(G__84722_84753,(org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_colors.cljs$core$IFn$_invoke$arity$1(item_84751) : org.numenta.sanity.demos.sensorimotor_1d.item_colors.call(null,item_84751)));

monet.canvas.fill_rect(G__84722_84753,rect_84752);

monet.canvas.stroke_rect(G__84722_84753,rect_84752);

monet.canvas.fill_style(G__84722_84753,(org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1 ? org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.cljs$core$IFn$_invoke$arity$1(item_84751) : org.numenta.sanity.demos.sensorimotor_1d.item_text_colors.call(null,item_84751)));

monet.canvas.text(G__84722_84753,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__84723 = (y_84750 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__84723) : y_scale.call(null,G__84723));
})(),cljs.core.cst$kw$text,cljs.core.name(item_84751)], null));


var G__84754 = cljs.core.next(seq__84708_84743__$1);
var G__84755 = null;
var G__84756 = (0);
var G__84757 = (0);
seq__84708_84729 = G__84754;
chunk__84710_84730 = G__84755;
count__84711_84731 = G__84756;
i__84712_84732 = G__84757;
continue;
}
} else {
}
}
break;
}

var focus_x = (10);
var focus_y = (function (){var G__84724 = (0.5 + position);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__84724) : y_scale.call(null,G__84724));
})();
var next_focus_y = (function (){var G__84725 = ((0.5 + position) + next_saccade);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__84725) : y_scale.call(null,G__84725));
})();
var eye_x = cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size);
var eye_y = cljs.core.quot(cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size),(2));
var G__84726 = ctx;
monet.canvas.begin_path(G__84726);

monet.canvas.move_to(G__84726,eye_x,eye_y);

monet.canvas.line_to(G__84726,focus_x,next_focus_y);

monet.canvas.stroke_style(G__84726,"lightgrey");

monet.canvas.stroke(G__84726);

monet.canvas.begin_path(G__84726);

monet.canvas.move_to(G__84726,eye_x,eye_y);

monet.canvas.line_to(G__84726,focus_x,focus_y);

monet.canvas.stroke_style(G__84726,"black");

monet.canvas.stroke(G__84726);

org.numenta.sanity.demos.sensorimotor_1d.draw_eye(G__84726,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,eye_x,cljs.core.cst$kw$y,eye_y,cljs.core.cst$kw$angle,(function (){var G__84727 = (focus_y - eye_y);
var G__84728 = (focus_x - eye_x);
return Math.atan2(G__84727,G__84728);
})(),cljs.core.cst$kw$radius,(30)], null));

return G__84726;
});
org.numenta.sanity.demos.sensorimotor_1d.world_pane = (function org$numenta$sanity$demos$sensorimotor_1d$world_pane(){
var temp__6728__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__6728__auto__)){
var step = temp__6728__auto__;
var in_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__84760 = in_value;
var map__84760__$1 = ((((!((map__84760 == null)))?((((map__84760.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84760.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84760):map__84760);
var field = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84760__$1,cljs.core.cst$kw$field);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84760__$1,cljs.core.cst$kw$position);
var next_saccade = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84760__$1,cljs.core.cst$kw$next_DASH_saccade);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"val"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(cljs.core.get.cljs$core$IFn$_invoke$arity$2(field,position))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"next"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,(((next_saccade < (0)))?"":"+"),next_saccade], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"300px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (in_value,map__84760,map__84760__$1,field,position,next_saccade,step,temp__6728__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var in_value__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.sensorimotor_1d.draw_world(ctx,in_value__$1);
});})(in_value,map__84760,map__84760__$1,field,position,next_saccade,step,temp__6728__auto__))
,null], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.sensorimotor_1d.seed_counter = reagent.core.atom.cljs$core$IFn$_invoke$arity$1((0));
org.numenta.sanity.demos.sensorimotor_1d.send_input_stream_BANG_ = (function org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG_(){
var field_key = cljs.core.cst$kw$field.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.config)));
var n_steps = cljs.core.cst$kw$n_DASH_steps.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.config)));
var field = (org.nfrac.comportex.demos.sensorimotor_1d.fields.cljs$core$IFn$_invoke$arity$1 ? org.nfrac.comportex.demos.sensorimotor_1d.fields.cljs$core$IFn$_invoke$arity$1(field_key) : org.nfrac.comportex.demos.sensorimotor_1d.fields.call(null,field_key));
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,field_key,n_steps,field){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,field_key,n_steps,field){
return (function (state_84792){
var state_val_84793 = (state_84792[(1)]);
if((state_val_84793 === (1))){
var inst_84782 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.sensorimotor_1d.seed_counter,cljs.core.inc);
var inst_84783 = org.nfrac.comportex.demos.sensorimotor_1d.initial_world(field,inst_84782);
var inst_84784 = org.nfrac.comportex.demos.sensorimotor_1d.input_seq.cljs$core$IFn$_invoke$arity$1(inst_84783);
var inst_84785 = cljs.core.take.cljs$core$IFn$_invoke$arity$2(n_steps,inst_84784);
var inst_84786 = cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.sensorimotor_1d.world_c,inst_84785,false);
var state_84792__$1 = state_84792;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_84792__$1,(2),inst_84786);
} else {
if((state_val_84793 === (2))){
var inst_84788 = (state_84792[(2)]);
var inst_84789 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_84790 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_84789);
var state_84792__$1 = (function (){var statearr_84794 = state_84792;
(statearr_84794[(7)] = inst_84788);

return statearr_84794;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_84792__$1,inst_84790);
} else {
return null;
}
}
});})(c__42110__auto__,field_key,n_steps,field))
;
return ((function (switch__41984__auto__,c__42110__auto__,field_key,n_steps,field){
return (function() {
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_84798 = [null,null,null,null,null,null,null,null];
(statearr_84798[(0)] = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto__);

(statearr_84798[(1)] = (1));

return statearr_84798;
});
var org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto____1 = (function (state_84792){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_84792);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84799){if((e84799 instanceof Object)){
var ex__41988__auto__ = e84799;
var statearr_84800_84802 = state_84792;
(statearr_84800_84802[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_84792);

return cljs.core.cst$kw$recur;
} else {
throw e84799;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84803 = state_84792;
state_84792 = G__84803;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto__ = function(state_84792){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto____1.call(this,state_84792);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$sensorimotor_1d$send_input_stream_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,field_key,n_steps,field))
})();
var state__42112__auto__ = (function (){var statearr_84801 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84801[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_84801;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,field_key,n_steps,field))
);

return c__42110__auto__;
});
org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_ = (function org$numenta$sanity$demos$sensorimotor_1d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.model)) == null);
var G__84808_84812 = org.numenta.sanity.demos.sensorimotor_1d.model;
var G__84809_84813 = org.nfrac.comportex.demos.sensorimotor_1d.build.cljs$core$IFn$_invoke$arity$0();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__84808_84812,G__84809_84813) : cljs.core.reset_BANG_.call(null,G__84808_84812,G__84809_84813));

if(init_QMARK_){
return org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.model,org.numenta.sanity.demos.sensorimotor_1d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.sensorimotor_1d.into_sim);
} else {
var G__84810 = org.numenta.sanity.main.network_shape;
var G__84811 = org.numenta.sanity.util.translate_network_shape(org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.sensorimotor_1d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.sensorimotor_1d.model))));
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__84810,G__84811) : cljs.core.reset_BANG_.call(null,G__84810,G__84811));
}
}));
});
org.numenta.sanity.demos.sensorimotor_1d.config_template = new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Sensorimotor sequences"], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$label,cljs.core.cst$kw$id,cljs.core.cst$kw$world_DASH_buffer_DASH_count,cljs.core.cst$kw$postamble," queued input values."], null)], null)," ",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$span,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__84814_SHARP_){
return (cljs.core.cst$kw$world_DASH_buffer_DASH_count.cljs$core$IFn$_invoke$arity$1(p1__84814_SHARP_) > (0));
})], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_warning$btn_DASH_xs,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
var c__42110__auto___84861 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___84861){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___84861){
return (function (state_84834){
var state_val_84835 = (state_84834[(1)]);
if((state_val_84835 === (7))){
var inst_84820 = (state_84834[(2)]);
var state_84834__$1 = state_84834;
var statearr_84836_84862 = state_84834__$1;
(statearr_84836_84862[(2)] = inst_84820);

(statearr_84836_84862[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (1))){
var state_84834__$1 = state_84834;
var statearr_84837_84863 = state_84834__$1;
(statearr_84837_84863[(2)] = null);

(statearr_84837_84863[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (4))){
var state_84834__$1 = state_84834;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_84834__$1,(7),org.numenta.sanity.demos.sensorimotor_1d.world_c);
} else {
if((state_val_84835 === (6))){
var inst_84823 = (state_84834[(2)]);
var state_84834__$1 = state_84834;
if(cljs.core.truth_(inst_84823)){
var statearr_84838_84864 = state_84834__$1;
(statearr_84838_84864[(1)] = (8));

} else {
var statearr_84839_84865 = state_84834__$1;
(statearr_84839_84865[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (3))){
var inst_84832 = (state_84834[(2)]);
var state_84834__$1 = state_84834;
return cljs.core.async.impl.ioc_helpers.return_chan(state_84834__$1,inst_84832);
} else {
if((state_val_84835 === (2))){
var inst_84817 = (state_84834[(7)]);
var inst_84816 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_84817__$1 = (inst_84816 > (0));
var state_84834__$1 = (function (){var statearr_84840 = state_84834;
(statearr_84840[(7)] = inst_84817__$1);

return statearr_84840;
})();
if(cljs.core.truth_(inst_84817__$1)){
var statearr_84841_84866 = state_84834__$1;
(statearr_84841_84866[(1)] = (4));

} else {
var statearr_84842_84867 = state_84834__$1;
(statearr_84842_84867[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (9))){
var state_84834__$1 = state_84834;
var statearr_84843_84868 = state_84834__$1;
(statearr_84843_84868[(2)] = null);

(statearr_84843_84868[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (5))){
var inst_84817 = (state_84834[(7)]);
var state_84834__$1 = state_84834;
var statearr_84844_84869 = state_84834__$1;
(statearr_84844_84869[(2)] = inst_84817);

(statearr_84844_84869[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (10))){
var inst_84830 = (state_84834[(2)]);
var state_84834__$1 = state_84834;
var statearr_84845_84870 = state_84834__$1;
(statearr_84845_84870[(2)] = inst_84830);

(statearr_84845_84870[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84835 === (8))){
var inst_84825 = cljs.core.count(org.numenta.sanity.demos.sensorimotor_1d.world_buffer);
var inst_84826 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.sensorimotor_1d.config,cljs.core.assoc,cljs.core.cst$kw$world_DASH_buffer_DASH_count,inst_84825);
var state_84834__$1 = (function (){var statearr_84846 = state_84834;
(statearr_84846[(8)] = inst_84826);

return statearr_84846;
})();
var statearr_84847_84871 = state_84834__$1;
(statearr_84847_84871[(2)] = null);

(statearr_84847_84871[(1)] = (2));


return cljs.core.cst$kw$recur;
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
}
}
});})(c__42110__auto___84861))
;
return ((function (switch__41984__auto__,c__42110__auto___84861){
return (function() {
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto____0 = (function (){
var statearr_84851 = [null,null,null,null,null,null,null,null,null];
(statearr_84851[(0)] = org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto__);

(statearr_84851[(1)] = (1));

return statearr_84851;
});
var org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto____1 = (function (state_84834){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_84834);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84852){if((e84852 instanceof Object)){
var ex__41988__auto__ = e84852;
var statearr_84853_84872 = state_84834;
(statearr_84853_84872[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_84834);

return cljs.core.cst$kw$recur;
} else {
throw e84852;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84873 = state_84834;
state_84834 = G__84873;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto__ = function(state_84834){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto____1.call(this,state_84834);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto____0;
org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto____1;
return org$numenta$sanity$demos$sensorimotor_1d$state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___84861))
})();
var state__42112__auto__ = (function (){var statearr_84854 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84854[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___84861);

return statearr_84854;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___84861))
);


return e.preventDefault();
})], null),"Clear"], null)], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Field of values (a world):"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$select$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$list,cljs.core.cst$kw$id,cljs.core.cst$kw$field], null),(function (){var iter__10132__auto__ = (function org$numenta$sanity$demos$sensorimotor_1d$iter__84855(s__84856){
return (new cljs.core.LazySeq(null,(function (){
var s__84856__$1 = s__84856;
while(true){
var temp__6728__auto__ = cljs.core.seq(s__84856__$1);
if(temp__6728__auto__){
var s__84856__$2 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(s__84856__$2)){
var c__10130__auto__ = cljs.core.chunk_first(s__84856__$2);
var size__10131__auto__ = cljs.core.count(c__10130__auto__);
var b__84858 = cljs.core.chunk_buffer(size__10131__auto__);
if((function (){var i__84857 = (0);
while(true){
if((i__84857 < size__10131__auto__)){
var k = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__10130__auto__,i__84857);
cljs.core.chunk_append(b__84858,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null),cljs.core.name(k)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null)));

var G__84874 = (i__84857 + (1));
i__84857 = G__84874;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__84858),org$numenta$sanity$demos$sensorimotor_1d$iter__84855(cljs.core.chunk_rest(s__84856__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__84858),null);
}
} else {
var k = cljs.core.first(s__84856__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$option,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null),cljs.core.name(k)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,k], null)),org$numenta$sanity$demos$sensorimotor_1d$iter__84855(cljs.core.rest(s__84856__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__10132__auto__(cljs.core.keys(org.nfrac.comportex.demos.sensorimotor_1d.fields));
})()], null)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label$col_DASH_sm_DASH_5,"Number of steps:"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$input$form_DASH_control,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$field,cljs.core.cst$kw$numeric,cljs.core.cst$kw$id,cljs.core.cst$kw$n_DASH_steps], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.sensorimotor_1d.send_input_stream_BANG_();

return e.preventDefault();
})], null),"Send input stream"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.sensorimotor_1d.model_tab = (function org$numenta$sanity$demos$sensorimotor_1d$model_tab(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A simple example of sensorimotor input in 1D."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.sensorimotor_1d.config_template,org.numenta.sanity.demos.sensorimotor_1d.config], null)], null);
});
org.numenta.sanity.demos.sensorimotor_1d.init = (function org$numenta$sanity$demos$sensorimotor_1d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.sensorimotor_1d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.sensorimotor_1d.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.sensorimotor_1d.into_sim], null),goog.dom.getElement("sanity-app"));

org.numenta.sanity.demos.sensorimotor_1d.send_input_stream_BANG_();

return org.numenta.sanity.demos.sensorimotor_1d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.sensorimotor_1d.init', org.numenta.sanity.demos.sensorimotor_1d.init);
