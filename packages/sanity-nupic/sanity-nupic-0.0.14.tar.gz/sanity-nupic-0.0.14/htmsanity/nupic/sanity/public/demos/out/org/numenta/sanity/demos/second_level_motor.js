// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.second_level_motor');
goog.require('cljs.core');
goog.require('org.numenta.sanity.plots_canvas');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('reagent.core');
goog.require('org.numenta.sanity.helpers');
goog.require('org.numenta.sanity.main');
goog.require('org.nfrac.comportex.demos.second_level_motor');
goog.require('org.numenta.sanity.util');
goog.require('org.numenta.sanity.comportex.data');
goog.require('cljs.core.async');
goog.require('reagent_forms.core');
goog.require('org.numenta.sanity.bridge.browser');
goog.require('org.numenta.sanity.demos.comportex_common');
goog.require('monet.canvas');
goog.require('org.numenta.sanity.demos.sensorimotor_1d');
goog.require('clojure.string');
org.numenta.sanity.demos.second_level_motor.config = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$text,org.nfrac.comportex.demos.second_level_motor.test_text,cljs.core.cst$kw$edit_DASH_text,org.nfrac.comportex.demos.second_level_motor.test_text], null));
org.numenta.sanity.demos.second_level_motor.world_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(cljs.core.async.buffer((1)),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__84983_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__84983_SHARP_,cljs.core.cst$kw$label,cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(p1__84983_SHARP_));
})));
org.numenta.sanity.demos.second_level_motor.control_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.second_level_motor.into_sim = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
org.numenta.sanity.demos.second_level_motor.model = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.second_level_motor.draw_world = (function org$numenta$sanity$demos$second_level_motor$draw_world(ctx,inval){
var map__85009 = inval;
var map__85009__$1 = ((((!((map__85009 == null)))?((((map__85009.cljs$lang$protocol_mask$partition0$ & (64))) || (map__85009.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__85009):map__85009);
var sentences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__85009__$1,cljs.core.cst$kw$sentences);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__85009__$1,cljs.core.cst$kw$position);
var vec__85010 = position;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85010,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85010,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85010,(2),null);
var sentence = cljs.core.get.cljs$core$IFn$_invoke$arity$2(sentences,i);
var word_n_letters = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.inc,cljs.core.count),sentence);
var sentence_flat = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.flatten(cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" ",sentence)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null));
var n_letters = cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_,word_n_letters);
var x_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(1)], null);
var y_lim = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),n_letters], null);
var width_px = ctx.canvas.width;
var height_px = ctx.canvas.height;
var plot_size = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null);
var plot = org.numenta.sanity.plots_canvas.xy_plot(ctx,plot_size,x_lim,y_lim);
var x_scale = org.numenta.sanity.plots_canvas.scale_fn(x_lim,cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size));
var y_scale = org.numenta.sanity.plots_canvas.scale_fn(y_lim,cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size));
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,width_px,cljs.core.cst$kw$h,height_px], null));

org.numenta.sanity.plots_canvas.frame_BANG_(plot);

monet.canvas.font_style(ctx,[cljs.core.str((function (){var x__9618__auto__ = (30);
var y__9619__auto__ = ((height_px / n_letters) | (0));
return ((x__9618__auto__ < y__9619__auto__) ? x__9618__auto__ : y__9619__auto__);
})()),cljs.core.str("px monospace")].join(''));

monet.canvas.text_baseline(ctx,cljs.core.cst$kw$middle);

monet.canvas.fill_style(ctx,"black");

var seq__85014_85034 = cljs.core.seq(cljs.core.map_indexed.cljs$core$IFn$_invoke$arity$2(cljs.core.vector,sentence_flat));
var chunk__85015_85035 = null;
var count__85016_85036 = (0);
var i__85017_85037 = (0);
while(true){
if((i__85017_85037 < count__85016_85036)){
var vec__85018_85038 = chunk__85015_85035.cljs$core$IIndexed$_nth$arity$2(null,i__85017_85037);
var y_85039 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85018_85038,(0),null);
var letter_85040 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85018_85038,(1),null);
monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__85021 = (y_85039 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__85021) : y_scale.call(null,G__85021));
})(),cljs.core.cst$kw$text,[cljs.core.str(letter_85040)].join('')], null));

var G__85041 = seq__85014_85034;
var G__85042 = chunk__85015_85035;
var G__85043 = count__85016_85036;
var G__85044 = (i__85017_85037 + (1));
seq__85014_85034 = G__85041;
chunk__85015_85035 = G__85042;
count__85016_85036 = G__85043;
i__85017_85037 = G__85044;
continue;
} else {
var temp__6728__auto___85045 = cljs.core.seq(seq__85014_85034);
if(temp__6728__auto___85045){
var seq__85014_85046__$1 = temp__6728__auto___85045;
if(cljs.core.chunked_seq_QMARK_(seq__85014_85046__$1)){
var c__10181__auto___85047 = cljs.core.chunk_first(seq__85014_85046__$1);
var G__85048 = cljs.core.chunk_rest(seq__85014_85046__$1);
var G__85049 = c__10181__auto___85047;
var G__85050 = cljs.core.count(c__10181__auto___85047);
var G__85051 = (0);
seq__85014_85034 = G__85048;
chunk__85015_85035 = G__85049;
count__85016_85036 = G__85050;
i__85017_85037 = G__85051;
continue;
} else {
var vec__85022_85052 = cljs.core.first(seq__85014_85046__$1);
var y_85053 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85022_85052,(0),null);
var letter_85054 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85022_85052,(1),null);
monet.canvas.text(ctx,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$x,(5),cljs.core.cst$kw$y,(function (){var G__85025 = (y_85053 + 0.5);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__85025) : y_scale.call(null,G__85025));
})(),cljs.core.cst$kw$text,[cljs.core.str(letter_85054)].join('')], null));

var G__85055 = cljs.core.next(seq__85014_85046__$1);
var G__85056 = null;
var G__85057 = (0);
var G__85058 = (0);
seq__85014_85034 = G__85055;
chunk__85015_85035 = G__85056;
count__85016_85036 = G__85057;
i__85017_85037 = G__85058;
continue;
}
} else {
}
}
break;
}

var curr_index = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,k,cljs.core.take.cljs$core$IFn$_invoke$arity$2(j,word_n_letters));
var vec__85026 = org.nfrac.comportex.demos.second_level_motor.next_position(position,cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var ni = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85026,(0),null);
var nj = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85026,(1),null);
var nk = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85026,(2),null);
var sentence_sacc = cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$action.cljs$core$IFn$_invoke$arity$1(inval));
var next_index = (((sentence_sacc < (0)))?(-1):(((sentence_sacc > (0)))?(n_letters + (1)):cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core._PLUS_,nk,cljs.core.take.cljs$core$IFn$_invoke$arity$2(nj,word_n_letters))
));
var focus_x = (10);
var focus_y = (function (){var G__85029 = (0.5 + curr_index);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__85029) : y_scale.call(null,G__85029));
})();
var next_focus_y = (function (){var G__85030 = (0.5 + next_index);
return (y_scale.cljs$core$IFn$_invoke$arity$1 ? y_scale.cljs$core$IFn$_invoke$arity$1(G__85030) : y_scale.call(null,G__85030));
})();
var eye_x = cljs.core.cst$kw$w.cljs$core$IFn$_invoke$arity$1(plot_size);
var eye_y = cljs.core.quot(cljs.core.cst$kw$h.cljs$core$IFn$_invoke$arity$1(plot_size),(2));
var G__85031 = ctx;
monet.canvas.begin_path(G__85031);

monet.canvas.move_to(G__85031,eye_x,eye_y);

monet.canvas.line_to(G__85031,focus_x,next_focus_y);

monet.canvas.stroke_style(G__85031,"lightgrey");

monet.canvas.stroke(G__85031);

monet.canvas.begin_path(G__85031);

monet.canvas.move_to(G__85031,eye_x,eye_y);

monet.canvas.line_to(G__85031,focus_x,focus_y);

monet.canvas.stroke_style(G__85031,"black");

monet.canvas.stroke(G__85031);

org.numenta.sanity.demos.sensorimotor_1d.draw_eye(G__85031,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,eye_x,cljs.core.cst$kw$y,eye_y,cljs.core.cst$kw$angle,(function (){var G__85032 = (focus_y - eye_y);
var G__85033 = (focus_x - eye_x);
return Math.atan2(G__85032,G__85033);
})(),cljs.core.cst$kw$radius,(30)], null));

return G__85031;
});
org.numenta.sanity.demos.second_level_motor.signed_str = (function org$numenta$sanity$demos$second_level_motor$signed_str(x){
return [cljs.core.str((((x < (0)))?"":"+")),cljs.core.str(x)].join('');
});
org.numenta.sanity.demos.second_level_motor.sentence_string = (function org$numenta$sanity$demos$second_level_motor$sentence_string(sentence){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.flatten(cljs.core.interpose.cljs$core$IFn$_invoke$arity$2(" ",sentence)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["."], null)));
});
org.numenta.sanity.demos.second_level_motor.world_pane = (function org$numenta$sanity$demos$second_level_motor$world_pane(){
var temp__6728__auto__ = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
if(cljs.core.truth_(temp__6728__auto__)){
var step = temp__6728__auto__;
var inval = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step);
var map__85064 = inval;
var map__85064__$1 = ((((!((map__85064 == null)))?((((map__85064.cljs$lang$protocol_mask$partition0$ & (64))) || (map__85064.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__85064):map__85064);
var sentences = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__85064__$1,cljs.core.cst$kw$sentences);
var position = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__85064__$1,cljs.core.cst$kw$position);
var action = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__85064__$1,cljs.core.cst$kw$action);
var vec__85065 = position;
var i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85065,(0),null);
var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85065,(1),null);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__85065,(2),null);
var letter_sacc = cljs.core.cst$kw$next_DASH_letter_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action);
var word_sacc = cljs.core.cst$kw$next_DASH_word_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action);
var sentence_sacc = cljs.core.cst$kw$next_DASH_sentence_DASH_saccade.cljs$core$IFn$_invoke$arity$1(action);
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$muted,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Input on selected timestep."], null)], null),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$table,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"value"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,[cljs.core.str(cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1(inval))].join('')], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"next move"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,((!((sentence_sacc === (0))))?"sentence":((!((word_sacc === (0))))?"word":((!((letter_sacc === (0))))?"letter":null)))], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"direction"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,(((((sentence_sacc + word_sacc) + letter_sacc) > (0)))?"fwd":"back")], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.sentence_string,cljs.core.take.cljs$core$IFn$_invoke$arity$2(i,sentences)))], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.helpers.resizing_canvas,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$style,new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$width,"100%",cljs.core.cst$kw$height,"75vh"], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.selection], null),((function (inval,map__85064,map__85064__$1,sentences,position,action,vec__85065,i,j,k,letter_sacc,word_sacc,sentence_sacc,step,temp__6728__auto__){
return (function (ctx){
var step__$1 = org.numenta.sanity.main.selected_step.cljs$core$IFn$_invoke$arity$0();
var inval__$1 = cljs.core.cst$kw$input_DASH_value.cljs$core$IFn$_invoke$arity$1(step__$1);
return org.numenta.sanity.demos.second_level_motor.draw_world(ctx,inval__$1);
});})(inval,map__85064,map__85064__$1,sentences,position,action,vec__85065,i,j,k,letter_sacc,word_sacc,sentence_sacc,step,temp__6728__auto__))
,null], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$pre,clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",cljs.core.map.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.sentence_string,cljs.core.drop.cljs$core$IFn$_invoke$arity$2((i + (1)),sentences)))], null)], null);
} else {
return null;
}
});
org.numenta.sanity.demos.second_level_motor.set_model_BANG_ = (function org$numenta$sanity$demos$second_level_motor$set_model_BANG_(){
return org.numenta.sanity.helpers.with_ui_loading_message((function (){
var init_QMARK_ = ((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.model)) == null);
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,init_QMARK_){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,init_QMARK_){
return (function (state_85136){
var state_val_85137 = (state_85136[(1)]);
if((state_val_85137 === (1))){
var state_85136__$1 = state_85136;
if(init_QMARK_){
var statearr_85138_85155 = state_85136__$1;
(statearr_85138_85155[(1)] = (2));

} else {
var statearr_85139_85156 = state_85136__$1;
(statearr_85139_85156[(1)] = (3));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_85137 === (2))){
var state_85136__$1 = state_85136;
var statearr_85140_85157 = state_85136__$1;
(statearr_85140_85157[(2)] = null);

(statearr_85140_85157[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85137 === (3))){
var state_85136__$1 = state_85136;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_85136__$1,(5),org.numenta.sanity.demos.second_level_motor.world_c);
} else {
if((state_val_85137 === (4))){
var inst_85117 = (state_85136[(2)]);
var inst_85118 = org.nfrac.comportex.demos.second_level_motor.build.cljs$core$IFn$_invoke$arity$0();
var inst_85119 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.model,inst_85118) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.demos.second_level_motor.model,inst_85118));
var state_85136__$1 = (function (){var statearr_85141 = state_85136;
(statearr_85141[(7)] = inst_85117);

(statearr_85141[(8)] = inst_85119);

return statearr_85141;
})();
if(init_QMARK_){
var statearr_85142_85158 = state_85136__$1;
(statearr_85142_85158[(1)] = (6));

} else {
var statearr_85143_85159 = state_85136__$1;
(statearr_85143_85159[(1)] = (7));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_85137 === (5))){
var inst_85115 = (state_85136[(2)]);
var state_85136__$1 = state_85136;
var statearr_85144_85160 = state_85136__$1;
(statearr_85144_85160[(2)] = inst_85115);

(statearr_85144_85160[(1)] = (4));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85137 === (6))){
var inst_85121 = org.nfrac.comportex.demos.second_level_motor.htm_step_with_action_selection(org.numenta.sanity.demos.second_level_motor.world_c,org.numenta.sanity.demos.second_level_motor.control_c);
var inst_85122 = org.numenta.sanity.bridge.browser.init.cljs$core$IFn$_invoke$arity$5(org.numenta.sanity.demos.second_level_motor.model,org.numenta.sanity.demos.second_level_motor.world_c,org.numenta.sanity.main.into_journal,org.numenta.sanity.demos.second_level_motor.into_sim,inst_85121);
var state_85136__$1 = state_85136;
var statearr_85145_85161 = state_85136__$1;
(statearr_85145_85161[(2)] = inst_85122);

(statearr_85145_85161[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85137 === (7))){
var inst_85124 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.model) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.model));
var inst_85125 = org.numenta.sanity.comportex.data.network_shape(inst_85124);
var inst_85126 = org.numenta.sanity.util.translate_network_shape(inst_85125);
var inst_85127 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.main.network_shape,inst_85126) : cljs.core.reset_BANG_.call(null,org.numenta.sanity.main.network_shape,inst_85126));
var state_85136__$1 = state_85136;
var statearr_85146_85162 = state_85136__$1;
(statearr_85146_85162[(2)] = inst_85127);

(statearr_85146_85162[(1)] = (8));


return cljs.core.cst$kw$recur;
} else {
if((state_val_85137 === (8))){
var inst_85129 = (state_85136[(2)]);
var inst_85130 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.config));
var inst_85131 = cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(inst_85130);
var inst_85132 = org.nfrac.comportex.demos.second_level_motor.parse_sentences(inst_85131);
var inst_85133 = org.nfrac.comportex.demos.second_level_motor.initial_inval(inst_85132);
var inst_85134 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.world_c,inst_85133);
var state_85136__$1 = (function (){var statearr_85147 = state_85136;
(statearr_85147[(9)] = inst_85129);

return statearr_85147;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_85136__$1,inst_85134);
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
var org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_85151 = [null,null,null,null,null,null,null,null,null,null];
(statearr_85151[(0)] = org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto__);

(statearr_85151[(1)] = (1));

return statearr_85151;
});
var org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto____1 = (function (state_85136){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_85136);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e85152){if((e85152 instanceof Object)){
var ex__41988__auto__ = e85152;
var statearr_85153_85163 = state_85136;
(statearr_85153_85163[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_85136);

return cljs.core.cst$kw$recur;
} else {
throw e85152;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__85164 = state_85136;
state_85136 = G__85164;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto__ = function(state_85136){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto____1.call(this,state_85136);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$second_level_motor$set_model_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,init_QMARK_))
})();
var state__42112__auto__ = (function (){var statearr_85154 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_85154[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_85154;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,init_QMARK_))
);

return c__42110__auto__;
}));
});
org.numenta.sanity.demos.second_level_motor.set_text_BANG_ = (function org$numenta$sanity$demos$second_level_motor$set_text_BANG_(){
var text = cljs.core.cst$kw$edit_DASH_text.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.second_level_motor.config) : cljs.core.deref.call(null,org.numenta.sanity.demos.second_level_motor.config)));
var sentences = org.nfrac.comportex.demos.second_level_motor.parse_sentences(text);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.demos.second_level_motor.control_c,((function (text,sentences){
return (function (_){
return org.nfrac.comportex.demos.second_level_motor.initial_inval(sentences);
});})(text,sentences))
);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.second_level_motor.config,cljs.core.assoc,cljs.core.cst$kw$text,text);
});
org.numenta.sanity.demos.second_level_motor.config_template = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"Input ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$small,"Letters in words in sentences"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_12,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$textarea$form_DASH_control,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$textarea,cljs.core.cst$kw$id,cljs.core.cst$kw$edit_DASH_text,cljs.core.cst$kw$rows,(8)], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_8,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_primary,new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$field,cljs.core.cst$kw$container,cljs.core.cst$kw$visible_QMARK_,(function (p1__85165_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$edit_DASH_text.cljs$core$IFn$_invoke$arity$1(p1__85165_SHARP_),cljs.core.cst$kw$text.cljs$core$IFn$_invoke$arity$1(p1__85165_SHARP_));
}),cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.second_level_motor.set_text_BANG_();

return e.preventDefault();
})], null),"Set sentences"], null)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$h3,"HTM model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_horizontal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$form_DASH_group,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div$col_DASH_sm_DASH_offset_DASH_5$col_DASH_sm_DASH_7,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$button$btn$btn_DASH_default,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$on_DASH_click,(function (e){
org.numenta.sanity.demos.second_level_motor.set_model_BANG_();

return e.preventDefault();
})], null),"Restart with new model"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p$text_DASH_danger,"This resets all parameters."], null)], null)], null)], null)], null);
org.numenta.sanity.demos.second_level_motor.model_tab = (function org$numenta$sanity$demos$second_level_motor$model_tab(){
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"A two-layer example of temporal pooling over sensorimotor input."], null),new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"The world is a string of letters divided into words and\n   sentences. Only one letter is received as direct sensory input at\n   any one time. Motor actions (saccades) shift the focus to a new\n   letter. These motor actions are encoded in two separate senses: ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"letter-motor"], null)," and ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$code,"word-motor"], null),". The former is distal input to the first layer, while the\n    latter is distal input to the second layer."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Within a word, letter saccades always move forward one\n   letter. At the end of a word, we check whether the first layer's\n   columns are bursting (indicating it has not yet learned the word's\n   letter sequence). If it is bursting, a letter saccade moves back to\n   the start of the same word. Otherwise, a word saccade is\n   generated."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"Within a sentence, word saccades always move forward one\n   word. At the end of a sentence, we check whether the second\n   layer's columns are bursting (indicating it has not yet learned\n   the sentence's word sequence). If it is bursting, a word saccade\n   moves back to the start of the same sentence."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$p,"And similarly for sentence saccades."], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [reagent_forms.core.bind_fields,org.numenta.sanity.demos.second_level_motor.config_template,org.numenta.sanity.demos.second_level_motor.config], null)], null);
});
org.numenta.sanity.demos.second_level_motor.init = (function org$numenta$sanity$demos$second_level_motor$init(){
reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.main.sanity_app,"Comportex",new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.second_level_motor.model_tab], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.demos.second_level_motor.world_pane], null),reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$model),org.numenta.sanity.demos.comportex_common.all_features,org.numenta.sanity.demos.second_level_motor.into_sim], null),goog.dom.getElement("sanity-app"));

return org.numenta.sanity.demos.second_level_motor.set_model_BANG_();
});
goog.exportSymbol('org.numenta.sanity.demos.second_level_motor.init', org.numenta.sanity.demos.second_level_motor.init);
