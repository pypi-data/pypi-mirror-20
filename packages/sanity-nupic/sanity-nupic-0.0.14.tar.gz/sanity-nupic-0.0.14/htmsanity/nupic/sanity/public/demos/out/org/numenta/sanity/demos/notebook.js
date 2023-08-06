// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.demos.notebook');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('org.numenta.sanity.viz_canvas');
goog.require('org.numenta.sanity.demos.runner');
goog.require('org.numenta.sanity.bridge.remote');
goog.require('org.numenta.sanity.util');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.numenta.sanity.selection');
goog.require('cognitect.transit');
goog.require('org.nfrac.comportex.util');
goog.require('clojure.walk');
cljs.core.enable_console_print_BANG_();
org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_ = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
org.numenta.sanity.demos.notebook.remote_target__GT_chan = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
org.numenta.sanity.demos.notebook.connect = (function org$numenta$sanity$demos$notebook$connect(url){
var G__83774 = org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_;
var G__83775 = org.numenta.sanity.bridge.remote.init(url);
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__83774,G__83775) : cljs.core.reset_BANG_.call(null,G__83774,G__83775));
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.connect', org.numenta.sanity.demos.notebook.connect);
org.numenta.sanity.demos.notebook.read_transit_str = (function org$numenta$sanity$demos$notebook$read_transit_str(s){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$json),s);
});
org.numenta.sanity.demos.notebook.display_inbits = (function org$numenta$sanity$demos$notebook$display_inbits(el,serialized){
var vec__83779 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var dims = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83779,(0),null);
var state__GT_bits = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83779,(1),null);
var d_opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83779,(2),null);
return reagent.core.render.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [org.numenta.sanity.viz_canvas.inbits_display,dims,state__GT_bits,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.cst$kw$drawing.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.viz_canvas.default_viz_options),d_opts], 0))], null),el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.display_inbits', org.numenta.sanity.demos.notebook.display_inbits);
org.numenta.sanity.demos.notebook.release_inbits = (function org$numenta$sanity$demos$notebook$release_inbits(el){
return reagent.core.unmount_component_at_node(el);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_inbits', org.numenta.sanity.demos.notebook.release_inbits);
org.numenta.sanity.demos.notebook.add_viz = (function org$numenta$sanity$demos$notebook$add_viz(el,serialized){
var vec__83900 = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
var journal_target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83900,(0),null);
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__83900,(1),null);
var into_journal = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var into_viz = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var response_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.assoc,journal_target,into_journal);

(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.pipe_to_remote_target_BANG_)).call(null,journal_target,into_journal);

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-network-shape",org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(response_c,true)], null));

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function (state_83996){
var state_val_83997 = (state_83996[(1)]);
if((state_val_83997 === (1))){
var state_83996__$1 = state_83996;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83996__$1,(2),response_c);
} else {
if((state_val_83997 === (2))){
var inst_83907 = (state_83996[(7)]);
var inst_83904 = (state_83996[(2)]);
var inst_83905 = org.numenta.sanity.util.translate_network_shape(inst_83904);
var inst_83906 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_83905);
var inst_83907__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var inst_83908 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83909 = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$2(inst_83907__$1,true);
var inst_83910 = ["get-steps",inst_83909];
var inst_83911 = (new cljs.core.PersistentVector(null,2,(5),inst_83908,inst_83910,null));
var inst_83912 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_journal,inst_83911);
var state_83996__$1 = (function (){var statearr_83998 = state_83996;
(statearr_83998[(8)] = inst_83912);

(statearr_83998[(7)] = inst_83907__$1);

(statearr_83998[(9)] = inst_83906);

return statearr_83998;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_83996__$1,(3),inst_83907__$1);
} else {
if((state_val_83997 === (3))){
var inst_83920 = (state_83996[(10)]);
var inst_83914 = (state_83996[(11)]);
var inst_83907 = (state_83996[(7)]);
var inst_83906 = (state_83996[(9)]);
var inst_83914__$1 = (state_83996[(2)]);
var inst_83915 = (function (){var network_shape = inst_83906;
var response_c__$1 = inst_83907;
var all_steps = inst_83914__$1;
return ((function (network_shape,response_c__$1,all_steps,inst_83920,inst_83914,inst_83907,inst_83906,inst_83914__$1,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function (step){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(step,cljs.core.cst$kw$network_DASH_shape,(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(network_shape) : cljs.core.deref.call(null,network_shape)));
});
;})(network_shape,response_c__$1,all_steps,inst_83920,inst_83914,inst_83907,inst_83906,inst_83914__$1,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_83916 = clojure.walk.keywordize_keys(inst_83914__$1);
var inst_83917 = cljs.core.map.cljs$core$IFn$_invoke$arity$2(inst_83915,inst_83916);
var inst_83918 = cljs.core.reverse(inst_83917);
var inst_83919 = cljs.core.vec(inst_83918);
var inst_83920__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_83919);
var inst_83921 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.selection.blank_selection);
var inst_83923 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_83920__$1) : cljs.core.deref.call(null,inst_83920__$1));
var inst_83924 = cljs.core.count(inst_83923);
var inst_83925 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((1),inst_83924);
var state_83996__$1 = (function (){var statearr_83999 = state_83996;
(statearr_83999[(10)] = inst_83920__$1);

(statearr_83999[(11)] = inst_83914__$1);

(statearr_83999[(12)] = inst_83921);

return statearr_83999;
})();
if(inst_83925){
var statearr_84000_84016 = state_83996__$1;
(statearr_84000_84016[(1)] = (4));

} else {
var statearr_84001_84017 = state_83996__$1;
(statearr_84001_84017[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_83997 === (4))){
var inst_83927 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83928 = [cljs.core.cst$kw$drawing,cljs.core.cst$kw$display_DASH_mode];
var inst_83929 = (new cljs.core.PersistentVector(null,2,(5),inst_83927,inst_83928,null));
var inst_83930 = cljs.core.assoc_in(org.numenta.sanity.viz_canvas.default_viz_options,inst_83929,cljs.core.cst$kw$two_DASH_d);
var state_83996__$1 = state_83996;
var statearr_84002_84018 = state_83996__$1;
(statearr_84002_84018[(2)] = inst_83930);

(statearr_84002_84018[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83997 === (5))){
var state_83996__$1 = state_83996;
var statearr_84003_84019 = state_83996__$1;
(statearr_84003_84019[(2)] = org.numenta.sanity.viz_canvas.default_viz_options);

(statearr_84003_84019[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83997 === (6))){
var inst_83920 = (state_83996[(10)]);
var inst_83914 = (state_83996[(11)]);
var inst_83907 = (state_83996[(7)]);
var inst_83936 = (state_83996[(13)]);
var inst_83906 = (state_83996[(9)]);
var inst_83921 = (state_83996[(12)]);
var inst_83933 = (state_83996[(2)]);
var inst_83934 = (function (){var network_shape = inst_83906;
var response_c__$1 = inst_83907;
var all_steps = inst_83914;
var steps = inst_83920;
var selection = inst_83921;
var base_opts = inst_83933;
return ((function (network_shape,response_c__$1,all_steps,steps,selection,base_opts,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function() { 
var G__84020__delegate = function (xs){
var last_non_nil = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(cljs.core.complement(cljs.core.nil_QMARK_),cljs.core.reverse(xs)));
if(cljs.core.coll_QMARK_(last_non_nil)){
return last_non_nil;
} else {
return cljs.core.last(xs);
}
};
var G__84020 = function (var_args){
var xs = null;
if (arguments.length > 0) {
var G__84021__i = 0, G__84021__a = new Array(arguments.length -  0);
while (G__84021__i < G__84021__a.length) {G__84021__a[G__84021__i] = arguments[G__84021__i + 0]; ++G__84021__i;}
  xs = new cljs.core.IndexedSeq(G__84021__a,0);
} 
return G__84020__delegate.call(this,xs);};
G__84020.cljs$lang$maxFixedArity = 0;
G__84020.cljs$lang$applyTo = (function (arglist__84022){
var xs = cljs.core.seq(arglist__84022);
return G__84020__delegate(xs);
});
G__84020.cljs$core$IFn$_invoke$arity$variadic = G__84020__delegate;
return G__84020;
})()
;
;})(network_shape,response_c__$1,all_steps,steps,selection,base_opts,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_83935 = org.nfrac.comportex.util.deep_merge_with.cljs$core$IFn$_invoke$arity$variadic(inst_83934,cljs.core.array_seq([inst_83933,opts], 0));
var inst_83936__$1 = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(inst_83935);
var inst_83937 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_83906) : cljs.core.deref.call(null,inst_83906));
var inst_83938 = cljs.core.cst$kw$layers.cljs$core$IFn$_invoke$arity$1(inst_83937);
var inst_83939 = cljs.core.keys(inst_83938);
var inst_83940 = cljs.core.first(inst_83939);
var inst_83941 = (function (){var network_shape = inst_83906;
var response_c__$1 = inst_83907;
var all_steps = inst_83914;
var steps = inst_83920;
var selection = inst_83921;
var base_opts = inst_83933;
var viz_options = inst_83936__$1;
var layer_id = inst_83940;
return ((function (network_shape,response_c__$1,all_steps,steps,selection,base_opts,viz_options,layer_id,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,inst_83934,inst_83935,inst_83936__$1,inst_83937,inst_83938,inst_83939,inst_83940,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__83782_SHARP_){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.empty(p1__83782_SHARP_),new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$dt,(0),cljs.core.cst$kw$layer,layer_id,cljs.core.cst$kw$snapshot_DASH_id,cljs.core.cst$kw$snapshot_DASH_id.cljs$core$IFn$_invoke$arity$1(cljs.core.first((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(steps) : cljs.core.deref.call(null,steps))))], null));
});
;})(network_shape,response_c__$1,all_steps,steps,selection,base_opts,viz_options,layer_id,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,inst_83934,inst_83935,inst_83936__$1,inst_83937,inst_83938,inst_83939,inst_83940,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_83942 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(inst_83921,inst_83941);
var inst_83943 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83944 = [cljs.core.cst$kw$on_DASH_click,cljs.core.cst$kw$on_DASH_key_DASH_down,cljs.core.cst$kw$tabIndex];
var inst_83945 = (function (){var network_shape = inst_83906;
var response_c__$1 = inst_83907;
var all_steps = inst_83914;
var steps = inst_83920;
var selection = inst_83921;
var base_opts = inst_83933;
var viz_options = inst_83936__$1;
var layer_id = inst_83940;
return ((function (network_shape,response_c__$1,all_steps,steps,selection,base_opts,viz_options,layer_id,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,inst_83934,inst_83935,inst_83936__$1,inst_83937,inst_83938,inst_83939,inst_83940,inst_83941,inst_83942,inst_83943,inst_83944,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(into_viz,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$background_DASH_clicked], null));
});
;})(network_shape,response_c__$1,all_steps,steps,selection,base_opts,viz_options,layer_id,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,inst_83934,inst_83935,inst_83936__$1,inst_83937,inst_83938,inst_83939,inst_83940,inst_83941,inst_83942,inst_83943,inst_83944,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_83946 = (function (){var network_shape = inst_83906;
var response_c__$1 = inst_83907;
var all_steps = inst_83914;
var steps = inst_83920;
var selection = inst_83921;
var base_opts = inst_83933;
var viz_options = inst_83936__$1;
var layer_id = inst_83940;
return ((function (network_shape,response_c__$1,all_steps,steps,selection,base_opts,viz_options,layer_id,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,inst_83934,inst_83935,inst_83936__$1,inst_83937,inst_83938,inst_83939,inst_83940,inst_83941,inst_83942,inst_83943,inst_83944,inst_83945,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function (p1__83783_SHARP_){
return org.numenta.sanity.viz_canvas.viz_key_down(p1__83783_SHARP_,into_viz);
});
;})(network_shape,response_c__$1,all_steps,steps,selection,base_opts,viz_options,layer_id,inst_83920,inst_83914,inst_83907,inst_83936,inst_83906,inst_83921,inst_83933,inst_83934,inst_83935,inst_83936__$1,inst_83937,inst_83938,inst_83939,inst_83940,inst_83941,inst_83942,inst_83943,inst_83944,inst_83945,state_val_83997,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
})();
var inst_83947 = [inst_83945,inst_83946,(1)];
var inst_83948 = cljs.core.PersistentHashMap.fromArrays(inst_83944,inst_83947);
var inst_83949 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(inst_83920) : cljs.core.deref.call(null,inst_83920));
var inst_83950 = cljs.core.count(inst_83949);
var inst_83951 = (inst_83950 > (1));
var state_83996__$1 = (function (){var statearr_84004 = state_83996;
(statearr_84004[(14)] = inst_83943);

(statearr_84004[(15)] = inst_83942);

(statearr_84004[(16)] = inst_83948);

(statearr_84004[(13)] = inst_83936__$1);

return statearr_84004;
})();
if(cljs.core.truth_(inst_83951)){
var statearr_84005_84023 = state_83996__$1;
(statearr_84005_84023[(1)] = (7));

} else {
var statearr_84006_84024 = state_83996__$1;
(statearr_84006_84024[(1)] = (8));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_83997 === (7))){
var inst_83920 = (state_83996[(10)]);
var inst_83936 = (state_83996[(13)]);
var inst_83921 = (state_83996[(12)]);
var inst_83953 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83954 = [org.numenta.sanity.viz_canvas.viz_timeline,inst_83920,inst_83921,inst_83936];
var inst_83955 = (new cljs.core.PersistentVector(null,4,(5),inst_83953,inst_83954,null));
var state_83996__$1 = state_83996;
var statearr_84007_84025 = state_83996__$1;
(statearr_84007_84025[(2)] = inst_83955);

(statearr_84007_84025[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83997 === (8))){
var state_83996__$1 = state_83996;
var statearr_84008_84026 = state_83996__$1;
(statearr_84008_84026[(2)] = null);

(statearr_84008_84026[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_83997 === (9))){
var inst_83943 = (state_83996[(14)]);
var inst_83920 = (state_83996[(10)]);
var inst_83948 = (state_83996[(16)]);
var inst_83936 = (state_83996[(13)]);
var inst_83906 = (state_83996[(9)]);
var inst_83921 = (state_83996[(12)]);
var inst_83958 = (state_83996[(2)]);
var inst_83959 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83960 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83961 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83962 = [cljs.core.cst$kw$style];
var inst_83963 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_83964 = ["none","top"];
var inst_83965 = cljs.core.PersistentHashMap.fromArrays(inst_83963,inst_83964);
var inst_83966 = [inst_83965];
var inst_83967 = cljs.core.PersistentHashMap.fromArrays(inst_83962,inst_83966);
var inst_83968 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83969 = [org.numenta.sanity.demos.runner.world_pane,inst_83920,inst_83921];
var inst_83970 = (new cljs.core.PersistentVector(null,3,(5),inst_83968,inst_83969,null));
var inst_83971 = [cljs.core.cst$kw$td,inst_83967,inst_83970];
var inst_83972 = (new cljs.core.PersistentVector(null,3,(5),inst_83961,inst_83971,null));
var inst_83973 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83974 = [cljs.core.cst$kw$style];
var inst_83975 = [cljs.core.cst$kw$border,cljs.core.cst$kw$vertical_DASH_align];
var inst_83976 = ["none","top"];
var inst_83977 = cljs.core.PersistentHashMap.fromArrays(inst_83975,inst_83976);
var inst_83978 = [inst_83977];
var inst_83979 = cljs.core.PersistentHashMap.fromArrays(inst_83974,inst_83978);
var inst_83980 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_83981 = [cljs.core.cst$kw$tabIndex];
var inst_83982 = [(0)];
var inst_83983 = cljs.core.PersistentHashMap.fromArrays(inst_83981,inst_83982);
var inst_83984 = [org.numenta.sanity.viz_canvas.viz_canvas,inst_83983,inst_83920,inst_83921,inst_83906,inst_83936,into_viz,null,into_journal];
var inst_83985 = (new cljs.core.PersistentVector(null,9,(5),inst_83980,inst_83984,null));
var inst_83986 = [cljs.core.cst$kw$td,inst_83979,inst_83985];
var inst_83987 = (new cljs.core.PersistentVector(null,3,(5),inst_83973,inst_83986,null));
var inst_83988 = [cljs.core.cst$kw$tr,inst_83972,inst_83987];
var inst_83989 = (new cljs.core.PersistentVector(null,3,(5),inst_83960,inst_83988,null));
var inst_83990 = [cljs.core.cst$kw$table,inst_83989];
var inst_83991 = (new cljs.core.PersistentVector(null,2,(5),inst_83959,inst_83990,null));
var inst_83992 = [cljs.core.cst$kw$div,inst_83948,inst_83958,inst_83991];
var inst_83993 = (new cljs.core.PersistentVector(null,4,(5),inst_83943,inst_83992,null));
var inst_83994 = reagent.core.render.cljs$core$IFn$_invoke$arity$2(inst_83993,el);
var state_83996__$1 = state_83996;
return cljs.core.async.impl.ioc_helpers.return_chan(state_83996__$1,inst_83994);
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
});})(c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
;
return ((function (switch__41984__auto__,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c){
return (function() {
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto____0 = (function (){
var statearr_84012 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_84012[(0)] = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto__);

(statearr_84012[(1)] = (1));

return statearr_84012;
});
var org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto____1 = (function (state_83996){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_83996);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e84013){if((e84013 instanceof Object)){
var ex__41988__auto__ = e84013;
var statearr_84014_84027 = state_83996;
(statearr_84014_84027[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_83996);

return cljs.core.cst$kw$recur;
} else {
throw e84013;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__84028 = state_83996;
state_83996 = G__84028;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto__ = function(state_83996){
switch(arguments.length){
case 0:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto____1.call(this,state_83996);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto____0;
org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto____1;
return org$numenta$sanity$demos$notebook$add_viz_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
})();
var state__42112__auto__ = (function (){var statearr_84015 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_84015[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_84015;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,vec__83900,journal_target,opts,into_journal,into_viz,response_c))
);

return c__42110__auto__;
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.add_viz', org.numenta.sanity.demos.notebook.add_viz);
org.numenta.sanity.demos.notebook.release_viz = (function org$numenta$sanity$demos$notebook$release_viz(el,serialized){
reagent.core.unmount_component_at_node(el);

var journal_target = org.numenta.sanity.demos.notebook.read_transit_str(serialized);
cljs.core.async.close_BANG_(cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.demos.notebook.remote_target__GT_chan) : cljs.core.deref.call(null,org.numenta.sanity.demos.notebook.remote_target__GT_chan)),journal_target));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(org.numenta.sanity.demos.notebook.remote_target__GT_chan,cljs.core.dissoc,journal_target);
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.release_viz', org.numenta.sanity.demos.notebook.release_viz);
org.numenta.sanity.demos.notebook.exported_viz = (function org$numenta$sanity$demos$notebook$exported_viz(el){
var cnvs = cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(el.getElementsByTagName("canvas"));
var copy_el = document.createElement("div");
copy_el.innerHTML = el.innerHTML;

var seq__84035_84041 = cljs.core.seq(cnvs);
var chunk__84037_84042 = null;
var count__84038_84043 = (0);
var i__84039_84044 = (0);
while(true){
if((i__84039_84044 < count__84038_84043)){
var cnv_84045 = chunk__84037_84042.cljs$core$IIndexed$_nth$arity$2(null,i__84039_84044);
var victim_el_84046 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_84047 = document.createElement("img");
img_el_84047.setAttribute("src",cnv_84045.toDataURL("image/png"));

var temp__6728__auto___84048 = victim_el_84046.getAttribute("style");
if(cljs.core.truth_(temp__6728__auto___84048)){
var style_84049 = temp__6728__auto___84048;
img_el_84047.setAttribute("style",style_84049);
} else {
}

victim_el_84046.parentNode.replaceChild(img_el_84047,victim_el_84046);

var G__84050 = seq__84035_84041;
var G__84051 = chunk__84037_84042;
var G__84052 = count__84038_84043;
var G__84053 = (i__84039_84044 + (1));
seq__84035_84041 = G__84050;
chunk__84037_84042 = G__84051;
count__84038_84043 = G__84052;
i__84039_84044 = G__84053;
continue;
} else {
var temp__6728__auto___84054 = cljs.core.seq(seq__84035_84041);
if(temp__6728__auto___84054){
var seq__84035_84055__$1 = temp__6728__auto___84054;
if(cljs.core.chunked_seq_QMARK_(seq__84035_84055__$1)){
var c__10181__auto___84056 = cljs.core.chunk_first(seq__84035_84055__$1);
var G__84057 = cljs.core.chunk_rest(seq__84035_84055__$1);
var G__84058 = c__10181__auto___84056;
var G__84059 = cljs.core.count(c__10181__auto___84056);
var G__84060 = (0);
seq__84035_84041 = G__84057;
chunk__84037_84042 = G__84058;
count__84038_84043 = G__84059;
i__84039_84044 = G__84060;
continue;
} else {
var cnv_84061 = cljs.core.first(seq__84035_84055__$1);
var victim_el_84062 = (copy_el.getElementsByTagName("canvas")[(0)]);
var img_el_84063 = document.createElement("img");
img_el_84063.setAttribute("src",cnv_84061.toDataURL("image/png"));

var temp__6728__auto___84064__$1 = victim_el_84062.getAttribute("style");
if(cljs.core.truth_(temp__6728__auto___84064__$1)){
var style_84065 = temp__6728__auto___84064__$1;
img_el_84063.setAttribute("style",style_84065);
} else {
}

victim_el_84062.parentNode.replaceChild(img_el_84063,victim_el_84062);

var G__84066 = cljs.core.next(seq__84035_84055__$1);
var G__84067 = null;
var G__84068 = (0);
var G__84069 = (0);
seq__84035_84041 = G__84066;
chunk__84037_84042 = G__84067;
count__84038_84043 = G__84068;
i__84039_84044 = G__84069;
continue;
}
} else {
}
}
break;
}

return copy_el.innerHTML;
});
goog.exportSymbol('org.numenta.sanity.demos.notebook.exported_viz', org.numenta.sanity.demos.notebook.exported_viz);
