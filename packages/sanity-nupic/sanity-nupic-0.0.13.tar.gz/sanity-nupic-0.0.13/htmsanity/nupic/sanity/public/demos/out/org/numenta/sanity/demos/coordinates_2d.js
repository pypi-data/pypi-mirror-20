// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.coordinates_2d');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.coordinates_2d');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('org.nfrac.comportex.util');
goog.require('monet.canvas');
org.numenta.sanity.demos.coordinates_2d.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$n_DASH_layers,(1)], null));
org.numenta.sanity.demos.coordinates_2d.quadrant = (function org$numenta$sanity$demos$coordinates_2d$quadrant(inval){
return [cljs.core.str((((cljs.core.cst$kw$y.cljs$core$IFn$_invoke$arity$1(inval) > (0)))?"S":"N")),cljs.core.str((((cljs.core.cst$kw$x.cljs$core$IFn$_invoke$arity$1(inval) > (0)))?"E":"W"))].join('');
});
org.numenta.sanity.demos.coordinates_2d.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$1(org.nfrac.comportex.util.keep_history_middleware((50),(function (p1__84072_SHARP_){
return cljs.core.select_keys(p1__84072_SHARP_,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$x,cljs.core.cst$kw$y,cljs.core.cst$kw$vx,cljs.core.cst$kw$vy], null));
}),cljs.core.cst$kw$history)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__84073_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__84073_SHARP_,cljs.core.cst$kw$label,org.numenta.sanity.demos.coordinates_2d.quadrant(p1__84073_SHARP_));
}))));
org.numenta.sanity.demos.coordinates_2d.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.coordinates_2d.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.coordinates_2d.control_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
/**
 * Feed the world channel continuously, reacting to UI settings.
 */
org.numenta.sanity.demos.coordinates_2d.feed_world_BANG_ = (function org$numenta$sanity$demos$coordinates_2d$feed_world_BANG_(){
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__){
return (function (state_84158){
var state_val_84159 = (state_84158[(1)]);
if((state_val_84159 === (7))){
var inst_84141 = (state_84158[(2)]);
var inst_84142 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_84141,(0),null);
var inst_84143 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_84141,(1),null);
var inst_84144 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_84143,org.numenta.sanity.demos.coordinates_2d.control_c);
var state_84158__$1 = (function (){var statearr_84160 = state_84158;
(statearr_84160[(7)] = inst_84142);

return statearr_84160;
})();
if(inst_84144){
var statearr_84161_84180 = state_84158__$1;
(statearr_84161_84180[(1)] = (8));

} else {
var statearr_84162_84181 = state_84158__$1;
(statearr_84162_84181[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_84159 === (1))){
var inst_84127 = org.nfrac.comportex.demos.coordinates_2d.initial_input_val;
var state_84158__$1 = (function (){var statearr_84163 = state_84158;
(statearr_84163[(8)] = inst_84127);

return statearr_84163;
})();
var statearr_84164_84182 = state_84158__$1;
(statearr_84164_84182[(2)] = null);

(statearr_84164_84182[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84159 === (4))){
var inst_84127 = (state_84158[(8)]);
var inst_84130 = (state_84158[(2)]);
var inst_84131 = cljs.core.async.timeout((50));
var inst_84132 = inst_84127;
var state_84158__$1 = (function (){var statearr_84165 = state_84158;
(statearr_84165[(9)] = inst_84132);

(statearr_84165[(10)] = inst_84130);

(statearr_84165[(11)] = inst_84131);

return statearr_84165;
})();
var statearr_84166_84183 = state_84158__$1;
(statearr_84166_84183[(2)] = null);

(statearr_84166_84183[(1)] = (5));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84159 === (6))){
var inst_84152 = (state_84158[(2)]);
var inst_84153 = org.nfrac.comportex.demos.coordinates_2d.input_transform(inst_84152);
var inst_84127 = inst_84153;
var state_84158__$1 = (function (){var statearr_84167 = state_84158;
(statearr_84167[(8)] = inst_84127);

return statearr_84167;
})();
var statearr_84168_84184 = state_84158__$1;
(statearr_84168_84184[(2)] = null);

(statearr_84168_84184[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84159 === (3))){
var inst_84156 = (state_84158[(2)]);
var state_84158__$1 = state_84158;
return cljs.core.async.impl.ioc_helpers.return_chan(state_84158__$1,inst_84156);
} else {
if((state_val_84159 === (2))){
var inst_84127 = (state_84158[(8)]);
var state_84158__$1 = state_84158;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_84158__$1,(4),org.numenta.sanity.demos.coordinates_2d.world_c,inst_84127);
} else {
if((state_val_84159 === (9))){
var inst_84132 = (state_84158[(9)]);
var state_84158__$1 = state_84158;
var statearr_84169_84185 = state_84158__$1;
(statearr_84169_84185[(2)] = inst_84132);

(statearr_84169_84185[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84159 === (5))){
var inst_84131 = (state_84158[(11)]);
var inst_84137 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_84138 = [org.numenta.sanity.demos.coordinates_2d.control_c,inst_84131];
var inst_84139 = (new cljs.core.PersistentVector(null,2,(5),inst_84137,inst_84138,null));
var state_84158__$1 = state_84158;
return cljs.core.async.ioc_alts_BANG_(state_84158__$1,(7),inst_84139);
} else {
if((state_val_84159 === (10))){
var inst_84150 = (state_84158[(2)]);
var state_84158__$1 = state_84158;
var statearr_84170_84186 = state_84158__$1;
(statearr_84170_84186[(2)] = inst_84150);

(statearr_84170_84186[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_84159 === (8))){
var inst_84132 = (state_84158[(9)]);
var inst_84142 = (state_84158[(7)]);
var inst_84146 = (inst_84142.cljs$core$IFn$_invoke$arity$1 ? inst_84142.cljs$core$IFn$_invoke$arity$1(inst_84132) : inst_84142.call(null,inst_84132));
var inst_84132__$1 = inst_84146;
var state_84158__$1 = (function (){var statearr_84171 = state_84158;
(statearr_84171[(9)] = inst_84132__$1);

return statearr_84171;
})();
var statearr_84172_84187 = state_84158__$1;
(statearr_84172_84187[(2)] = null);

(statearr_84172_84187[(1)] = (5));


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
});})(c__42110__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__){
return (function() {
var org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_84176 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_84176[(0)] = org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto__);

(statearr_84176[(1)] = (1));

return statearr_84176;
});
var org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto____1 = (function (state_84158){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_84158);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84177){if((e84177 instanceof Object)){
var ex__41988__auto__ = e84177;
var statearr_84178_84188 = state_84158;
(statearr_84178_84188[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_84158);

return cljs.core.cst$kw$recur;
} else {
throw e84177;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84189 = state_84158;
state_84158 = G__84189;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto__ = function(state_84158){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto____1.call(this,state_84158);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$coordinates_2d$feed_world_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__))
})();
var state__42112__auto__ = (function (){var statearr_84179 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84179[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_84179;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__))
);

return c__42110__auto__;
});
org.numenta.sanity.demos.coordinates_2d.draw_arrow = (function org$numenta$sanity$demos$coordinates_2d$draw_arrow(ctx,p__84190){
var map__84193 = p__84190;
var map__84193__$1 = ((((!((map__84193 == null)))?((((map__84193.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84193.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84193):map__84193);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84193__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84193__$1,cljs.core.cst$kw$y);
var angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84193__$1,cljs.core.cst$kw$angle);
monet.canvas.save(ctx);

monet.canvas.translate(ctx,x,y);

monet.canvas.rotate(ctx,angle);

monet.canvas.begin_path(ctx);

monet.canvas.move_to(ctx,(5),(0));

monet.canvas.line_to(ctx,(-5),(3));

monet.canvas.line_to(ctx,(-5),(-3));

monet.canvas.line_to(ctx,(5),(0));

monet.canvas.fill(ctx);

monet.canvas.stroke(ctx);

return monet.canvas.restore(ctx);
});
org.numenta.sanity.demos.coordinates_2d.centred_rect = (function org$numenta$sanity$demos$coordinates_2d$centred_rect(cx,cy,w,h){
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(cx - (w / (2))),cljs.core.cst$kw$y,(cy - (h / (2))),cljs.core.cst$kw$w,w,cljs.core.cst$kw$h,h], null);
});
org.numenta.sanity.demos.coordinates_2d.draw_world = (function org$numenta$sanity$demos$coordinates_2d$draw_world(ctx,in_value){
var max_pos = org.nfrac.comportex.demos.coordinates_2d.max_pos;
var radius = org.nfrac.comportex.demos.coordinates_2d.radius;
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- max_pos),max_pos], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(- max_pos),max_pos], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var edge_px = (function (){var x__9618__auto__ = width_px;
var y__9619__auto__ = height_px;
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})();
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,edge_px,cljs.core.cst$kw$h,edge_px], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
var map__84211 = in_value;
var map__84211__$1 = ((((!((map__84211 == null)))?((((map__84211.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84211.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84211):map__84211);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84211__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84211__$1,cljs.core.cst$kw$y);
var vx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84211__$1,cljs.core.cst$kw$vx);
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84211__$1,cljs.core.cst$kw$vy);
var history = cljs.core.cst$kw$history.cljs$core$IFn$_invoke$arity$1(cljs.core.meta(in_value));
var r_px = ((x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(radius) : x_scale.call(null,radius)) - (x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1((0)) : x_scale.call(null,(0))));
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.stroke_style(ctx,"lightgray");

org.numenta.sanity.plots_canvas.grid_BANG_(plot,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$grid_DASH_every,(2)], null));

monet.canvas.stroke_style(ctx,"black");

org.numenta.sanity.plots_canvas.draw_grid(ctx,cljs.core.map.cljs$core$IFn$_invoke$arity$2(x_scale,x_lim),cljs.core.map.cljs$core$IFn$_invoke$arity$2(y_scale,y_lim),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1((0)) : x_scale.call(null,(0))))], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.nfrac.comportex.util.round.cljs$core$IFn$_invoke$arity$1((y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1((0)) : y_scale.call(null,(0))))], null));

monet.canvas.fill_style(ctx,"rgba(255,0,0,0.25)");

monet.canvas.fill_rect(ctx,org.numenta.sanity.demos.coordinates_2d.centred_rect((x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(x) : x_scale.call(null,x)),(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y) : y_scale.call(null,y)),((2) * r_px),((2) * r_px)));

monet.canvas.stroke_style(ctx,"black");

monet.canvas.fill_style(ctx,"yellow");

var seq__84213 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,history));
var chunk__84214 = null;
var count__84215 = (0);
var i__84216 = (0);
while(true){
if((i__84216 < count__84215)){
var vec__84217 = chunk__84214.cljs$core$IIndexed$_nth$arity$2(null,i__84216);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84217,(0),null);
var map__84220 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84217,(1),null);
var map__84220__$1 = ((((!((map__84220 == null)))?((((map__84220.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84220.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84220):map__84220);
var x__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84220__$1,cljs.core.cst$kw$x);
var y__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84220__$1,cljs.core.cst$kw$y);
var vx__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84220__$1,cljs.core.cst$kw$vx);
var vy__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84220__$1,cljs.core.cst$kw$vy);
if(((i + (1)) === cljs.core.count(history))){
monet.canvas.alpha(ctx,(1));
} else {
monet.canvas.alpha(ctx,(((i + (1)) / cljs.core.count(history)) / (2)));
}

org.numenta.sanity.demos.coordinates_2d.draw_arrow(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(x__$1) : x_scale.call(null,x__$1)),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y__$1) : y_scale.call(null,y__$1)),cljs.core.cst$kw$angle,Math.atan2(vy__$1,vx__$1)], null));

var G__84227 = seq__84213;
var G__84228 = chunk__84214;
var G__84229 = count__84215;
var G__84230 = (i__84216 + (1));
seq__84213 = G__84227;
chunk__84214 = G__84228;
count__84215 = G__84229;
i__84216 = G__84230;
continue;
} else {
var temp__6728__auto__ = cljs.core.seq(seq__84213);
if(temp__6728__auto__){
var seq__84213__$1 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__84213__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__84213__$1);
var G__84231 = cljs.core.chunk_rest(seq__84213__$1);
var G__84232 = c__10181__auto__;
var G__84233 = cljs.core.count(c__10181__auto__);
var G__84234 = (0);
seq__84213 = G__84231;
chunk__84214 = G__84232;
count__84215 = G__84233;
i__84216 = G__84234;
continue;
} else {
var vec__84222 = cljs.core.first(seq__84213__$1);
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84222,(0),null);
var map__84225 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__84222,(1),null);
var map__84225__$1 = ((((!((map__84225 == null)))?((((map__84225.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84225.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84225):map__84225);
var x__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84225__$1,cljs.core.cst$kw$x);
var y__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84225__$1,cljs.core.cst$kw$y);
var vx__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84225__$1,cljs.core.cst$kw$vx);
var vy__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84225__$1,cljs.core.cst$kw$vy);
if(((i + (1)) === cljs.core.count(history))){
monet.canvas.alpha(ctx,(1));
} else {
monet.canvas.alpha(ctx,(((i + (1)) / cljs.core.count(history)) / (2)));
}

org.numenta.sanity.demos.coordinates_2d.draw_arrow(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(x_scale.cljs$core$IFn$_invoke$arity$1 ? x_scale.cljs$core$IFn$_invoke$arity$1(x__$1) : x_scale.call(null,x__$1)),cljs.core.cst$kw$y,(y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(y__$1) : y_scale.call(null,y__$1)),cljs.core.cst$kw$angle,Math.atan2(vy__$1,vx__$1)], null));

var G__84235 = cljs.core.next(seq__84213__$1);
var G__84236 = null;
var G__84237 = (0);
var G__84238 = (0);
seq__84213 = G__84235;
chunk__84214 = G__84236;
count__84215 = G__84237;
i__84216 = G__84238;
continue;
}
} else {
return null;
}
}
break;
}
});
org.numenta.sanity.demos.coordinates_2d.world_pane = (function org$numenta$sanity$demos$coordinates_2d$world_pane(){
var temp__6728__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__6728__auto__)){
var step = temp__6728__auto__;
var in_value = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__84241 = in_value;
var map__84241__$1 = ((((!((map__84241 == null)))?((((map__84241.cljs$lang$protocol_mask$partition0$ & (64))) || (map__84241.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__84241):map__84241);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84241__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84241__$1,cljs.core.cst$kw$y);
var vx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84241__$1,cljs.core.cst$kw$vx);
var vy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__84241__$1,cljs.core.cst$kw$vy);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"x"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,x], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"y"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,y], null)], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"300px"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (in_value,map__84241,map__84241__$1,x,y,vx,vy,step,temp__6728__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var in_value__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.coordinates_2d.draw_world(ctx,in_value__$1);
});})(in_value,map__84241,map__84241__$1,x,y,vx,vy,step,temp__6728__auto__))
,null], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.coordinates_2d.set_model_BANG_ = (function org$numenta$sanity$demos$coordinates_2d$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.coordinates_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.coordinates_2d.model)) == null);
var G__84247_84251 = org.numenta.sanity.demos.coordinates_2d.model;
var G__84248_84252 = org.nfrac.comportex.demos.coordinates_2d.build.cljs$core$IFn$_invoke$arity$0();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__84247_84251,G__84248_84252) : cljs.core.reset_BANG_.call(null,G__84247_84251,G__84248_84252));

if(init_QMARK_){
org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.coordinates_2d.model,org.numenta.sanity.demos.coordinates_2d.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.coordinates_2d.into_sim);
} else {
var G__84249_84253 = org.numenta.sanity.main.network_shape;
var G__84250_84254 = org.numenta.sanity.util.translate_network_shape(org.numenta.sanity.comportex.data.network_shape((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.coordinates_2d.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.coordinates_2d.model))));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__84249_84253,G__84250_84254) : cljs.core.reset_BANG_.call(null,G__84249_84253,G__84250_84254));
}

if(init_QMARK_){
return org.numenta.sanity.demos.coordinates_2d.feed_world_BANG_();
} else {
return null;
}
}));
});
org.numenta.sanity.demos.coordinates_2d.config_template = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.coordinates_2d.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null);
org.numenta.sanity.demos.coordinates_2d.model_tab = (function org$numenta$sanity$demos$coordinates_2d$model_tab(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A simple example of the coordinate encoder in 2\n    dimensions, on a repeating path."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The coordinate is on a 90x90 integer grid and has a\n    locality radius of 15 units. It maintains position, velocity\n    and acceleration. Velocity is limited to 5 units per timestep.\n    When the point crosses the horizontal axis, its vertical\n    acceleration is reversed; when it crosses the vertical axis,\n    its horizontal acceleration is reversed."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.coordinates_2d.config_template,org.numenta.sanity.demos.coordinates_2d.config], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$label,"Interference with the movement path"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.coordinates_2d.control_c,(function (p1__84255_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(p1__84255_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ay], null),cljs.core.dec);
}));

return e.preventDefault();
})], null),"Turn up"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.coordinates_2d.control_c,(function (p1__84256_SHARP_){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(p1__84256_SHARP_,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ay], null),cljs.core.inc);
}));

return e.preventDefault();
})], null),"Turn down"], null)], null)], null)], null)], null);
});
org.numenta.sanity.demos.coordinates_2d.init = (function org$numenta$sanity$demos$coordinates_2d$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.coordinates_2d.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.coordinates_2d.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.coordinates_2d.into_sim], null),goog.dom.getElement("sanity-app"));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.main.viz_options,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode], null),cljs.core.cst$kw$two_DASH_d);

return org.numenta.sanity.demos.coordinates_2d.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.coordinates_2d.init', org.numenta.sanity.demos.coordinates_2d.init);
