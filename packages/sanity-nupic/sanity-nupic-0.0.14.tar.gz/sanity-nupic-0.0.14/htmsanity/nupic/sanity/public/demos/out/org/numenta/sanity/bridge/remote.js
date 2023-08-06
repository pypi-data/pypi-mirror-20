// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.bridge.remote');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('cljs.pprint');
goog.require('cognitect.transit');
goog.require('org.numenta.sanity.bridge.marshalling');
org.numenta.sanity.bridge.remote.max_message_size = ((64) * (1024));
org.numenta.sanity.bridge.remote.transit_str = (function org$numenta$sanity$bridge$remote$transit_str(m,extra_handlers){
return cognitect.transit.write(cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.marshalling.encoding,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$handlers,extra_handlers], null)),m);
});
org.numenta.sanity.bridge.remote.read_transit_str = (function org$numenta$sanity$bridge$remote$read_transit_str(s,extra_handlers){
return cognitect.transit.read(cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.marshalling.encoding,new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$handlers,extra_handlers], null)),s);
});
org.numenta.sanity.bridge.remote.target_put = (function org$numenta$sanity$bridge$remote$target_put(target,v){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["put!",target,v], null);
});
org.numenta.sanity.bridge.remote.target_close = (function org$numenta$sanity$bridge$remote$target_close(target){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["close!",target], null);
});
org.numenta.sanity.bridge.remote.log_messages_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
org.numenta.sanity.bridge.remote.log_pretty_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true));
org.numenta.sanity.bridge.remote.log = (function org$numenta$sanity$bridge$remote$log(v,prefix){
cljs.core.pr.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([prefix], 0));

(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_pretty_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_pretty_QMARK_)))?cljs.pprint.pprint:cljs.core.println).call(null,v);

return v;
});
org.numenta.sanity.bridge.remote.connect_BANG_ = (function org$numenta$sanity$bridge$remote$connect_BANG_(connection_id,to_network_c,on_connect_c,ws_url,connecting_QMARK_,target__GT_mchannel){
var ws = (new WebSocket(ws_url));
var teardown_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var connection_id_STAR_ = cljs.core.random_uuid();
var local_resources = (function (){var G__62638 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62638) : cljs.core.atom.call(null,G__62638));
})();
var remote_resources = (function (){var G__62639 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__62639) : cljs.core.atom.call(null,G__62639));
})();
var G__62640 = ws;
(G__62640["onopen"] = ((function (G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket connected."], 0));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,connection_id_STAR_) : cljs.core.reset_BANG_.call(null,connection_id,connection_id_STAR_));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

var c__42110__auto___62834 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___62834,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___62834,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_62680){
var state_val_62681 = (state_62680[(1)]);
if((state_val_62681 === (7))){
var inst_62676 = (state_62680[(2)]);
var state_62680__$1 = state_62680;
var statearr_62682_62835 = state_62680__$1;
(statearr_62682_62835[(2)] = inst_62676);

(statearr_62682_62835[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (1))){
var state_62680__$1 = state_62680;
var statearr_62683_62836 = state_62680__$1;
(statearr_62683_62836[(2)] = null);

(statearr_62683_62836[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (4))){
var inst_62655 = (state_62680[(7)]);
var inst_62653 = (state_62680[(8)]);
var inst_62653__$1 = (state_62680[(2)]);
var inst_62654 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_62653__$1,(0),null);
var inst_62655__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_62653__$1,(1),null);
var inst_62656 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_62655__$1,teardown_c);
var state_62680__$1 = (function (){var statearr_62684 = state_62680;
(statearr_62684[(9)] = inst_62654);

(statearr_62684[(7)] = inst_62655__$1);

(statearr_62684[(8)] = inst_62653__$1);

return statearr_62684;
})();
if(inst_62656){
var statearr_62685_62837 = state_62680__$1;
(statearr_62685_62837[(1)] = (5));

} else {
var statearr_62686_62838 = state_62680__$1;
(statearr_62686_62838[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (13))){
var inst_62672 = (state_62680[(2)]);
var state_62680__$1 = state_62680;
var statearr_62687_62839 = state_62680__$1;
(statearr_62687_62839[(2)] = inst_62672);

(statearr_62687_62839[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (6))){
var inst_62655 = (state_62680[(7)]);
var inst_62659 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_62655,on_connect_c);
var state_62680__$1 = state_62680;
if(inst_62659){
var statearr_62688_62840 = state_62680__$1;
(statearr_62688_62840[(1)] = (8));

} else {
var statearr_62689_62841 = state_62680__$1;
(statearr_62689_62841[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (3))){
var inst_62678 = (state_62680[(2)]);
var state_62680__$1 = state_62680;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62680__$1,inst_62678);
} else {
if((state_val_62681 === (12))){
var state_62680__$1 = state_62680;
var statearr_62690_62842 = state_62680__$1;
(statearr_62690_62842[(2)] = null);

(statearr_62690_62842[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (2))){
var inst_62649 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_62650 = [teardown_c,on_connect_c];
var inst_62651 = (new cljs.core.PersistentVector(null,2,(5),inst_62649,inst_62650,null));
var state_62680__$1 = state_62680;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_62680__$1,(4),inst_62651,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_62681 === (11))){
var inst_62654 = (state_62680[(9)]);
var state_62680__$1 = state_62680;
var statearr_62691_62843 = state_62680__$1;
(statearr_62691_62843[(2)] = inst_62654);

(statearr_62691_62843[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (9))){
var inst_62655 = (state_62680[(7)]);
var inst_62668 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_62655,cljs.core.cst$kw$default);
var state_62680__$1 = state_62680;
if(inst_62668){
var statearr_62692_62844 = state_62680__$1;
(statearr_62692_62844[(1)] = (11));

} else {
var statearr_62693_62845 = state_62680__$1;
(statearr_62693_62845[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (5))){
var state_62680__$1 = state_62680;
var statearr_62694_62846 = state_62680__$1;
(statearr_62694_62846[(2)] = null);

(statearr_62694_62846[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (10))){
var inst_62674 = (state_62680[(2)]);
var state_62680__$1 = state_62680;
var statearr_62695_62847 = state_62680__$1;
(statearr_62695_62847[(2)] = inst_62674);

(statearr_62695_62847[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62681 === (8))){
var inst_62653 = (state_62680[(8)]);
var inst_62664 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_62653,(0),null);
var inst_62665 = (inst_62664.cljs$core$IFn$_invoke$arity$0 ? inst_62664.cljs$core$IFn$_invoke$arity$0() : inst_62664.call(null));
var state_62680__$1 = (function (){var statearr_62696 = state_62680;
(statearr_62696[(10)] = inst_62665);

return statearr_62696;
})();
var statearr_62697_62848 = state_62680__$1;
(statearr_62697_62848[(2)] = null);

(statearr_62697_62848[(1)] = (2));


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
}
}
}
});})(c__42110__auto___62834,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__41984__auto__,c__42110__auto___62834,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_62701 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_62701[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__);

(statearr_62701[(1)] = (1));

return statearr_62701;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____1 = (function (state_62680){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_62680);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e62702){if((e62702 instanceof Object)){
var ex__41988__auto__ = e62702;
var statearr_62703_62849 = state_62680;
(statearr_62703_62849[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62680);

return cljs.core.cst$kw$recur;
} else {
throw e62702;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__62850 = state_62680;
state_62680 = G__62850;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__ = function(state_62680){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____1.call(this,state_62680);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___62834,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__42112__auto__ = (function (){var statearr_62704 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_62704[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___62834);

return statearr_62704;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___62834,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);


var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (state_62777){
var state_val_62778 = (state_62777[(1)]);
if((state_val_62778 === (7))){
var inst_62738 = (state_62777[(7)]);
var inst_62738__$1 = (state_62777[(2)]);
var inst_62739 = (inst_62738__$1 == null);
var state_62777__$1 = (function (){var statearr_62779 = state_62777;
(statearr_62779[(7)] = inst_62738__$1);

return statearr_62779;
})();
if(cljs.core.truth_(inst_62739)){
var statearr_62780_62851 = state_62777__$1;
(statearr_62780_62851[(1)] = (14));

} else {
var statearr_62781_62852 = state_62777__$1;
(statearr_62781_62852[(1)] = (15));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (20))){
var inst_62748 = (state_62777[(8)]);
var inst_62750 = org.numenta.sanity.bridge.marshalling.write_handlers(target__GT_mchannel,local_resources);
var inst_62751 = org.numenta.sanity.bridge.remote.transit_str(inst_62748,inst_62750);
var state_62777__$1 = state_62777;
var statearr_62782_62853 = state_62777__$1;
(statearr_62782_62853[(2)] = inst_62751);

(statearr_62782_62853[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (27))){
var state_62777__$1 = state_62777;
var statearr_62783_62854 = state_62777__$1;
(statearr_62783_62854[(2)] = null);

(statearr_62783_62854[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (1))){
var state_62777__$1 = state_62777;
var statearr_62784_62855 = state_62777__$1;
(statearr_62784_62855[(2)] = null);

(statearr_62784_62855[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (24))){
var inst_62754 = (state_62777[(9)]);
var state_62777__$1 = state_62777;
var statearr_62785_62856 = state_62777__$1;
(statearr_62785_62856[(2)] = inst_62754);

(statearr_62785_62856[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (4))){
var inst_62717 = (state_62777[(10)]);
var inst_62719 = (state_62777[(11)]);
var inst_62717__$1 = (state_62777[(2)]);
var inst_62718 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_62717__$1,(0),null);
var inst_62719__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_62717__$1,(1),null);
var inst_62720 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_62719__$1,teardown_c);
var state_62777__$1 = (function (){var statearr_62786 = state_62777;
(statearr_62786[(12)] = inst_62718);

(statearr_62786[(10)] = inst_62717__$1);

(statearr_62786[(11)] = inst_62719__$1);

return statearr_62786;
})();
if(inst_62720){
var statearr_62787_62857 = state_62777__$1;
(statearr_62787_62857[(1)] = (5));

} else {
var statearr_62788_62858 = state_62777__$1;
(statearr_62788_62858[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (15))){
var inst_62743 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_));
var state_62777__$1 = state_62777;
if(cljs.core.truth_(inst_62743)){
var statearr_62789_62859 = state_62777__$1;
(statearr_62789_62859[(1)] = (17));

} else {
var statearr_62790_62860 = state_62777__$1;
(statearr_62790_62860[(1)] = (18));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (21))){
var inst_62748 = (state_62777[(8)]);
var state_62777__$1 = state_62777;
var statearr_62791_62861 = state_62777__$1;
(statearr_62791_62861[(2)] = inst_62748);

(statearr_62791_62861[(1)] = (22));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (13))){
var inst_62734 = (state_62777[(2)]);
var state_62777__$1 = state_62777;
var statearr_62792_62862 = state_62777__$1;
(statearr_62792_62862[(2)] = inst_62734);

(statearr_62792_62862[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (22))){
var inst_62754 = (state_62777[(2)]);
var inst_62755 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_));
var state_62777__$1 = (function (){var statearr_62793 = state_62777;
(statearr_62793[(9)] = inst_62754);

return statearr_62793;
})();
if(cljs.core.truth_(inst_62755)){
var statearr_62794_62863 = state_62777__$1;
(statearr_62794_62863[(1)] = (23));

} else {
var statearr_62795_62864 = state_62777__$1;
(statearr_62795_62864[(1)] = (24));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (6))){
var inst_62719 = (state_62777[(11)]);
var inst_62723 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_62719,to_network_c);
var state_62777__$1 = state_62777;
if(inst_62723){
var statearr_62796_62865 = state_62777__$1;
(statearr_62796_62865[(1)] = (8));

} else {
var statearr_62797_62866 = state_62777__$1;
(statearr_62797_62866[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (28))){
var inst_62760 = (state_62777[(13)]);
var inst_62769 = (state_62777[(2)]);
var inst_62770 = ws.send(inst_62760);
var state_62777__$1 = (function (){var statearr_62798 = state_62777;
(statearr_62798[(14)] = inst_62770);

(statearr_62798[(15)] = inst_62769);

return statearr_62798;
})();
var statearr_62799_62867 = state_62777__$1;
(statearr_62799_62867[(2)] = null);

(statearr_62799_62867[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (25))){
var inst_62760 = (state_62777[(13)]);
var inst_62761 = (state_62777[(16)]);
var inst_62760__$1 = (state_62777[(2)]);
var inst_62761__$1 = cljs.core.count(inst_62760__$1);
var inst_62762 = (inst_62761__$1 > org.numenta.sanity.bridge.remote.max_message_size);
var state_62777__$1 = (function (){var statearr_62800 = state_62777;
(statearr_62800[(13)] = inst_62760__$1);

(statearr_62800[(16)] = inst_62761__$1);

return statearr_62800;
})();
if(cljs.core.truth_(inst_62762)){
var statearr_62801_62868 = state_62777__$1;
(statearr_62801_62868[(1)] = (26));

} else {
var statearr_62802_62869 = state_62777__$1;
(statearr_62802_62869[(1)] = (27));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (17))){
var inst_62738 = (state_62777[(7)]);
var inst_62745 = org.numenta.sanity.bridge.remote.log(inst_62738,"SENDING:");
var state_62777__$1 = state_62777;
var statearr_62803_62870 = state_62777__$1;
(statearr_62803_62870[(2)] = inst_62745);

(statearr_62803_62870[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (3))){
var inst_62775 = (state_62777[(2)]);
var state_62777__$1 = state_62777;
return cljs.core.async.impl.ioc_helpers.return_chan(state_62777__$1,inst_62775);
} else {
if((state_val_62778 === (12))){
var state_62777__$1 = state_62777;
var statearr_62804_62871 = state_62777__$1;
(statearr_62804_62871[(2)] = null);

(statearr_62804_62871[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (2))){
var inst_62713 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_62714 = [teardown_c,to_network_c];
var inst_62715 = (new cljs.core.PersistentVector(null,2,(5),inst_62713,inst_62714,null));
var state_62777__$1 = state_62777;
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_62777__$1,(4),inst_62715,cljs.core.array_seq([cljs.core.cst$kw$priority,true], 0));
} else {
if((state_val_62778 === (23))){
var inst_62754 = (state_62777[(9)]);
var inst_62757 = org.numenta.sanity.bridge.remote.log(inst_62754,"SENDING TEXT:");
var state_62777__$1 = state_62777;
var statearr_62805_62872 = state_62777__$1;
(statearr_62805_62872[(2)] = inst_62757);

(statearr_62805_62872[(1)] = (25));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (19))){
var inst_62748 = (state_62777[(2)]);
var state_62777__$1 = (function (){var statearr_62806 = state_62777;
(statearr_62806[(8)] = inst_62748);

return statearr_62806;
})();
var statearr_62807_62873 = state_62777__$1;
(statearr_62807_62873[(1)] = (20));



return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (11))){
var inst_62718 = (state_62777[(12)]);
var state_62777__$1 = state_62777;
var statearr_62809_62874 = state_62777__$1;
(statearr_62809_62874[(2)] = inst_62718);

(statearr_62809_62874[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (9))){
var inst_62719 = (state_62777[(11)]);
var inst_62730 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_62719,cljs.core.cst$kw$default);
var state_62777__$1 = state_62777;
if(inst_62730){
var statearr_62810_62875 = state_62777__$1;
(statearr_62810_62875[(1)] = (11));

} else {
var statearr_62811_62876 = state_62777__$1;
(statearr_62811_62876[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (5))){
var state_62777__$1 = state_62777;
var statearr_62812_62877 = state_62777__$1;
(statearr_62812_62877[(2)] = null);

(statearr_62812_62877[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (14))){
var state_62777__$1 = state_62777;
var statearr_62813_62878 = state_62777__$1;
(statearr_62813_62878[(2)] = null);

(statearr_62813_62878[(1)] = (16));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (26))){
var inst_62760 = (state_62777[(13)]);
var inst_62761 = (state_62777[(16)]);
var inst_62764 = [cljs.core.str("Message too large! Size: "),cljs.core.str(inst_62761),cljs.core.str("Max-size: "),cljs.core.str(org.numenta.sanity.bridge.remote.max_message_size)].join('');
var inst_62765 = alert(inst_62764);
var inst_62766 = cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Message too large!",inst_62760], 0));
var state_62777__$1 = (function (){var statearr_62814 = state_62777;
(statearr_62814[(17)] = inst_62765);

return statearr_62814;
})();
var statearr_62815_62879 = state_62777__$1;
(statearr_62815_62879[(2)] = inst_62766);

(statearr_62815_62879[(1)] = (28));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (16))){
var inst_62773 = (state_62777[(2)]);
var state_62777__$1 = state_62777;
var statearr_62816_62880 = state_62777__$1;
(statearr_62816_62880[(2)] = inst_62773);

(statearr_62816_62880[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (10))){
var inst_62736 = (state_62777[(2)]);
var state_62777__$1 = state_62777;
var statearr_62817_62881 = state_62777__$1;
(statearr_62817_62881[(2)] = inst_62736);

(statearr_62817_62881[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (18))){
var inst_62738 = (state_62777[(7)]);
var state_62777__$1 = state_62777;
var statearr_62818_62882 = state_62777__$1;
(statearr_62818_62882[(2)] = inst_62738);

(statearr_62818_62882[(1)] = (19));


return cljs.core.cst$kw$recur;
} else {
if((state_val_62778 === (8))){
var inst_62717 = (state_62777[(10)]);
var inst_62728 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_62717,(0),null);
var state_62777__$1 = state_62777;
var statearr_62819_62883 = state_62777__$1;
(statearr_62819_62883[(2)] = inst_62728);

(statearr_62819_62883[(1)] = (10));


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
}
}
}
}
}
}
}
});})(c__42110__auto__,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
;
return ((function (switch__41984__auto__,c__42110__auto__,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function() {
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__ = null;
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____0 = (function (){
var statearr_62823 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_62823[(0)] = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__);

(statearr_62823[(1)] = (1));

return statearr_62823;
});
var org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____1 = (function (state_62777){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_62777);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e62824){if((e62824 instanceof Object)){
var ex__41988__auto__ = e62824;
var statearr_62825_62884 = state_62777;
(statearr_62825_62884[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_62777);

return cljs.core.cst$kw$recur;
} else {
throw e62824;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__62885 = state_62777;
state_62777 = G__62885;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__ = function(state_62777){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____1.call(this,state_62777);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____0;
org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto____1;
return org$numenta$sanity$bridge$remote$connect_BANG__$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
})();
var state__42112__auto__ = (function (){var statearr_62826 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_62826[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_62826;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return c__42110__auto__;
});})(G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__62640["onerror"] = ((function (G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket error:"], 0));

return console.error(evt);
});})(G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__62640["onclose"] = ((function (G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connection_id,null) : cljs.core.reset_BANG_.call(null,connection_id,null));

(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,false) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,false));

cljs.core.async.close_BANG_(teardown_c);

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["WebSocket closed."], 0));
});})(G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

(G__62640["onmessage"] = ((function (G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (evt){
var vec__62827 = (function (){var G__62831 = evt.data;
var G__62831__$1 = (cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_)))?org.numenta.sanity.bridge.remote.log(G__62831,"RECEIVED TEXT:"):G__62831);
var G__62831__$2 = org.numenta.sanity.bridge.remote.read_transit_str(G__62831__$1,org.numenta.sanity.bridge.marshalling.read_handlers(target__GT_mchannel,((function (G__62831,G__62831__$1,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
});})(G__62831,G__62831__$1,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,((function (G__62831,G__62831__$1,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources){
return (function (t){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
});})(G__62831,G__62831__$1,G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
,remote_resources))
;
if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(org.numenta.sanity.bridge.remote.log_messages_QMARK_) : cljs.core.deref.call(null,org.numenta.sanity.bridge.remote.log_messages_QMARK_)))){
return org.numenta.sanity.bridge.remote.log(G__62831__$2,"RECEIVED:");
} else {
return G__62831__$2;
}
})();
var op = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62827,(0),null);
var target = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62827,(1),null);
var msg = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__62827,(2),null);
var map__62830 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel)).call(null,target);
var map__62830__$1 = ((((!((map__62830 == null)))?((((map__62830.cljs$lang$protocol_mask$partition0$ & (64))) || (map__62830.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__62830):map__62830);
var mchannel = map__62830__$1;
var ch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62830__$1,cljs.core.cst$kw$ch);
var single_use_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__62830__$1,cljs.core.cst$kw$single_DASH_use_QMARK_);
if(cljs.core.truth_(ch)){
if(cljs.core.truth_(single_use_QMARK_)){
org.numenta.sanity.bridge.marshalling.release_BANG_(mchannel);
} else {
}

var G__62833 = op;
switch (G__62833) {
case "put!":
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,msg);

break;
case "close!":
return cljs.core.async.close_BANG_(ch);

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(op)].join('')));

}
} else {
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["UNRECOGNIZED TARGET",target], 0));

return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["Known targets:",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(target__GT_mchannel) : cljs.core.deref.call(null,target__GT_mchannel))], 0));
}
});})(G__62640,ws,teardown_c,connection_id_STAR_,local_resources,remote_resources))
);

return G__62640;
});
org.numenta.sanity.bridge.remote.init = (function org$numenta$sanity$bridge$remote$init(ws_url){
var to_network_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1024)));
var connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var on_connect_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1024)));
var connecting_QMARK_ = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
var target__GT_mchannel = (function (){var G__63060 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__63060) : cljs.core.atom.call(null,G__63060));
})();
return ((function (to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target(t,ch){
var last_seen_connection_id = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var reconnect_blob = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null) : cljs.core.atom.call(null,null));
var blob_resets_c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();
var blob_resets_cproxy = org.numenta.sanity.bridge.marshalling.channel.cljs$core$IFn$_invoke$arity$1(blob_resets_c);
var c__42110__auto___63233 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto___63233,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto___63233,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_63160){
var state_val_63161 = (state_63160[(1)]);
if((state_val_63161 === (1))){
var state_63160__$1 = state_63160;
var statearr_63162_63234 = state_63160__$1;
(statearr_63162_63234[(2)] = null);

(statearr_63162_63234[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63161 === (2))){
var state_63160__$1 = state_63160;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63160__$1,(4),blob_resets_c);
} else {
if((state_val_63161 === (3))){
var inst_63158 = (state_63160[(2)]);
var state_63160__$1 = state_63160;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63160__$1,inst_63158);
} else {
if((state_val_63161 === (4))){
var inst_63149 = (state_63160[(7)]);
var inst_63149__$1 = (state_63160[(2)]);
var inst_63150 = (inst_63149__$1 == null);
var state_63160__$1 = (function (){var statearr_63163 = state_63160;
(statearr_63163[(7)] = inst_63149__$1);

return statearr_63163;
})();
if(cljs.core.truth_(inst_63150)){
var statearr_63164_63235 = state_63160__$1;
(statearr_63164_63235[(1)] = (5));

} else {
var statearr_63165_63236 = state_63160__$1;
(statearr_63165_63236[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63161 === (5))){
var state_63160__$1 = state_63160;
var statearr_63166_63237 = state_63160__$1;
(statearr_63166_63237[(2)] = null);

(statearr_63166_63237[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63161 === (6))){
var inst_63149 = (state_63160[(7)]);
var inst_63153 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(reconnect_blob,inst_63149) : cljs.core.reset_BANG_.call(null,reconnect_blob,inst_63149));
var state_63160__$1 = (function (){var statearr_63167 = state_63160;
(statearr_63167[(8)] = inst_63153);

return statearr_63167;
})();
var statearr_63168_63238 = state_63160__$1;
(statearr_63168_63238[(2)] = null);

(statearr_63168_63238[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63161 === (7))){
var inst_63156 = (state_63160[(2)]);
var state_63160__$1 = state_63160;
var statearr_63169_63239 = state_63160__$1;
(statearr_63169_63239[(2)] = inst_63156);

(statearr_63169_63239[(1)] = (3));


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
});})(c__42110__auto___63233,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__41984__auto__,c__42110__auto___63233,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____0 = (function (){
var statearr_63173 = [null,null,null,null,null,null,null,null,null];
(statearr_63173[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__);

(statearr_63173[(1)] = (1));

return statearr_63173;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____1 = (function (state_63160){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_63160);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e63174){if((e63174 instanceof Object)){
var ex__41988__auto__ = e63174;
var statearr_63175_63240 = state_63160;
(statearr_63175_63240[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63160);

return cljs.core.cst$kw$recur;
} else {
throw e63174;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__63241 = state_63160;
state_63160 = G__63241;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__ = function(state_63160){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____1.call(this,state_63160);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto___63233,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__42112__auto__ = (function (){var statearr_63176 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_63176[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto___63233);

return statearr_63176;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto___63233,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);


var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (state_63204){
var state_val_63205 = (state_63204[(1)]);
if((state_val_63205 === (7))){
var inst_63179 = (state_63204[(7)]);
var inst_63194 = (state_63204[(2)]);
var inst_63195 = (inst_63179 == null);
var state_63204__$1 = (function (){var statearr_63206 = state_63204;
(statearr_63206[(8)] = inst_63194);

return statearr_63206;
})();
if(cljs.core.truth_(inst_63195)){
var statearr_63207_63242 = state_63204__$1;
(statearr_63207_63242[(1)] = (11));

} else {
var statearr_63208_63243 = state_63204__$1;
(statearr_63208_63243[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (1))){
var state_63204__$1 = state_63204;
var statearr_63209_63244 = state_63204__$1;
(statearr_63209_63244[(2)] = null);

(statearr_63209_63244[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (4))){
var inst_63179 = (state_63204[(7)]);
var inst_63179__$1 = (state_63204[(2)]);
var inst_63180 = (function (){var v = inst_63179__$1;
return ((function (v,inst_63179,inst_63179__$1,state_val_63205,c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function (){
if((((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id)) == null)) || (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id)),(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_seen_connection_id) : cljs.core.deref.call(null,last_seen_connection_id))))){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["connect",(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(reconnect_blob) : cljs.core.deref.call(null,reconnect_blob)),blob_resets_cproxy], null)));

var G__63210_63245 = last_seen_connection_id;
var G__63211_63246 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__63210_63245,G__63211_63246) : cljs.core.reset_BANG_.call(null,G__63210_63245,G__63211_63246));
} else {
}

if(!((v == null))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_put(t,v));
} else {
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(to_network_c,org.numenta.sanity.bridge.remote.target_close(t));
}
});
;})(v,inst_63179,inst_63179__$1,state_val_63205,c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var inst_63181 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connection_id) : cljs.core.deref.call(null,connection_id));
var state_63204__$1 = (function (){var statearr_63212 = state_63204;
(statearr_63212[(9)] = inst_63180);

(statearr_63212[(7)] = inst_63179__$1);

return statearr_63212;
})();
if(cljs.core.truth_(inst_63181)){
var statearr_63213_63247 = state_63204__$1;
(statearr_63213_63247[(1)] = (5));

} else {
var statearr_63214_63248 = state_63204__$1;
(statearr_63214_63248[(1)] = (6));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (13))){
var inst_63200 = (state_63204[(2)]);
var state_63204__$1 = state_63204;
var statearr_63215_63249 = state_63204__$1;
(statearr_63215_63249[(2)] = inst_63200);

(statearr_63215_63249[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (6))){
var inst_63180 = (state_63204[(9)]);
var inst_63185 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(on_connect_c,inst_63180);
var inst_63186 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(connecting_QMARK_) : cljs.core.deref.call(null,connecting_QMARK_));
var state_63204__$1 = (function (){var statearr_63216 = state_63204;
(statearr_63216[(10)] = inst_63185);

return statearr_63216;
})();
if(cljs.core.truth_(inst_63186)){
var statearr_63217_63250 = state_63204__$1;
(statearr_63217_63250[(1)] = (8));

} else {
var statearr_63218_63251 = state_63204__$1;
(statearr_63218_63251[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (3))){
var inst_63202 = (state_63204[(2)]);
var state_63204__$1 = state_63204;
return cljs.core.async.impl.ioc_helpers.return_chan(state_63204__$1,inst_63202);
} else {
if((state_val_63205 === (12))){
var state_63204__$1 = state_63204;
var statearr_63219_63252 = state_63204__$1;
(statearr_63219_63252[(2)] = null);

(statearr_63219_63252[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (2))){
var state_63204__$1 = state_63204;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_63204__$1,(4),ch);
} else {
if((state_val_63205 === (11))){
var state_63204__$1 = state_63204;
var statearr_63220_63253 = state_63204__$1;
(statearr_63220_63253[(2)] = null);

(statearr_63220_63253[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (9))){
var inst_63189 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(connecting_QMARK_,true) : cljs.core.reset_BANG_.call(null,connecting_QMARK_,true));
var inst_63190 = org.numenta.sanity.bridge.remote.connect_BANG_(connection_id,to_network_c,on_connect_c,ws_url,connecting_QMARK_,target__GT_mchannel);
var state_63204__$1 = (function (){var statearr_63221 = state_63204;
(statearr_63221[(11)] = inst_63189);

return statearr_63221;
})();
var statearr_63222_63254 = state_63204__$1;
(statearr_63222_63254[(2)] = inst_63190);

(statearr_63222_63254[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (5))){
var inst_63180 = (state_63204[(9)]);
var inst_63183 = (inst_63180.cljs$core$IFn$_invoke$arity$0 ? inst_63180.cljs$core$IFn$_invoke$arity$0() : inst_63180.call(null));
var state_63204__$1 = state_63204;
var statearr_63223_63255 = state_63204__$1;
(statearr_63223_63255[(2)] = inst_63183);

(statearr_63223_63255[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (10))){
var inst_63192 = (state_63204[(2)]);
var state_63204__$1 = state_63204;
var statearr_63224_63256 = state_63204__$1;
(statearr_63224_63256[(2)] = inst_63192);

(statearr_63224_63256[(1)] = (7));


return cljs.core.cst$kw$recur;
} else {
if((state_val_63205 === (8))){
var state_63204__$1 = state_63204;
var statearr_63225_63257 = state_63204__$1;
(statearr_63225_63257[(2)] = null);

(statearr_63225_63257[(1)] = (10));


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
}
}
}
});})(c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
;
return ((function (switch__41984__auto__,c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel){
return (function() {
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____0 = (function (){
var statearr_63229 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_63229[(0)] = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__);

(statearr_63229[(1)] = (1));

return statearr_63229;
});
var org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____1 = (function (state_63204){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_63204);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e63230){if((e63230 instanceof Object)){
var ex__41988__auto__ = e63230;
var statearr_63231_63258 = state_63204;
(statearr_63231_63258[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_63204);

return cljs.core.cst$kw$recur;
} else {
throw e63230;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__63259 = state_63204;
state_63204 = G__63259;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__ = function(state_63204){
switch(arguments.length){
case 0:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____1.call(this,state_63204);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____0;
org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto____1;
return org$numenta$sanity$bridge$remote$init_$_pipe_to_remote_target_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
})();
var state__42112__auto__ = (function (){var statearr_63232 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_63232[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_63232;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,last_seen_connection_id,reconnect_blob,blob_resets_c,blob_resets_cproxy,to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
);

return c__42110__auto__;
});
;})(to_network_c,connection_id,on_connect_c,connecting_QMARK_,target__GT_mchannel))
});
(window["sanityLogMessages"] = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.remote.log_messages_QMARK_,cljs.core.not);
}));
(window["sanityLogRawMessages"] = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.remote.log_raw_messages_QMARK_,cljs.core.not);
}));
(window["sanityLogUgly"] = (function (){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(org.numenta.sanity.bridge.remote.log_pretty_QMARK_,cljs.core.not);
}));
var G__63260_63261 = [cljs.core.str("Call sanityLogMessages() or sanityLogRawMessages() to display websocket "),cljs.core.str("traffic. Call sanityLogUgly() to condense the output.")].join('');
console.log(G__63260_63261);
