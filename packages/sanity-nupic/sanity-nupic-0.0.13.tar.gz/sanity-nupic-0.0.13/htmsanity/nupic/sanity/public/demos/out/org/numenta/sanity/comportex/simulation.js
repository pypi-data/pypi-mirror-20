// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.comportex.simulation');
goog.require('cljs.core');
goog.require('cljs.core.async');
goog.require('org.numenta.sanity.bridge.marshalling');
goog.require('org.nfrac.comportex.core');
goog.require('org.nfrac.comportex.util');
org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_ = (function org$numenta$sanity$comportex$simulation$should_go_QMARK__BANG_(options){
var map__71248 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options));
var map__71248__$1 = ((((!((map__71248 == null)))?((((map__71248.cljs$lang$protocol_mask$partition0$ & (64))) || (map__71248.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__71248):map__71248);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71248__$1,cljs.core.cst$kw$go_QMARK_);
var force_n_steps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71248__$1,cljs.core.cst$kw$force_DASH_n_DASH_steps);
var step_ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71248__$1,cljs.core.cst$kw$step_DASH_ms);
if(cljs.core.truth_(go_QMARK_)){
return step_ms;
} else {
if((force_n_steps > (0))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.update,cljs.core.cst$kw$force_DASH_n_DASH_steps,cljs.core.dec);

return (0);
} else {
return false;

}
}
});
org.numenta.sanity.comportex.simulation.simulation_loop = (function org$numenta$sanity$comportex$simulation$simulation_loop(model,world,out,options,sim_closed_QMARK_,htm_step){
var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__){
return (function (state_71349){
var state_val_71350 = (state_71349[(1)]);
if((state_val_71350 === (7))){
var state_71349__$1 = state_71349;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_71349__$1,(10),world);
} else {
if((state_val_71350 === (1))){
var state_71349__$1 = state_71349;
var statearr_71351_71380 = state_71349__$1;
(statearr_71351_71380[(2)] = null);

(statearr_71351_71380[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (4))){
var inst_71319 = (state_71349[(7)]);
var inst_71319__$1 = org.numenta.sanity.comportex.simulation.should_go_QMARK__BANG_(options);
var state_71349__$1 = (function (){var statearr_71352 = state_71349;
(statearr_71352[(7)] = inst_71319__$1);

return statearr_71352;
})();
if(cljs.core.truth_(inst_71319__$1)){
var statearr_71353_71381 = state_71349__$1;
(statearr_71353_71381[(1)] = (7));

} else {
var statearr_71354_71382 = state_71349__$1;
(statearr_71354_71382[(1)] = (8));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (15))){
var inst_71342 = (function (){return ((function (state_val_71350,c__42110__auto__){
return (function (_,___$1,___$2,___$3){
cljs.core.remove_watch(options,cljs.core.cst$kw$run_DASH_sim);

return org$numenta$sanity$comportex$simulation$simulation_loop(model,world,out,options,sim_closed_QMARK_,htm_step);
});
;})(state_val_71350,c__42110__auto__))
})();
var inst_71343 = cljs.core.add_watch(options,cljs.core.cst$kw$run_DASH_sim,inst_71342);
var state_71349__$1 = state_71349;
var statearr_71355_71383 = state_71349__$1;
(statearr_71355_71383[(2)] = inst_71343);

(statearr_71355_71383[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (13))){
var inst_71332 = (state_71349[(2)]);
var state_71349__$1 = state_71349;
var statearr_71356_71384 = state_71349__$1;
(statearr_71356_71384[(2)] = inst_71332);

(statearr_71356_71384[(1)] = (9));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (6))){
var inst_71338 = (state_71349[(2)]);
var state_71349__$1 = state_71349;
var statearr_71357_71385 = state_71349__$1;
(statearr_71357_71385[(2)] = inst_71338);

(statearr_71357_71385[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (17))){
var inst_71347 = (state_71349[(2)]);
var state_71349__$1 = state_71349;
return cljs.core.async.impl.ioc_helpers.return_chan(state_71349__$1,inst_71347);
} else {
if((state_val_71350 === (3))){
var inst_71340 = (state_71349[(2)]);
var state_71349__$1 = state_71349;
if(cljs.core.truth_(inst_71340)){
var statearr_71358_71386 = state_71349__$1;
(statearr_71358_71386[(1)] = (15));

} else {
var statearr_71359_71387 = state_71349__$1;
(statearr_71359_71387[(1)] = (16));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (12))){
var state_71349__$1 = state_71349;
var statearr_71360_71388 = state_71349__$1;
(statearr_71360_71388[(2)] = null);

(statearr_71360_71388[(1)] = (13));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (2))){
var inst_71316 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_71317 = cljs.core.not(inst_71316);
var state_71349__$1 = state_71349;
if(inst_71317){
var statearr_71361_71389 = state_71349__$1;
(statearr_71361_71389[(1)] = (4));

} else {
var statearr_71362_71390 = state_71349__$1;
(statearr_71362_71390[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (11))){
var inst_71319 = (state_71349[(7)]);
var inst_71322 = (state_71349[(8)]);
var inst_71324 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(model,htm_step,inst_71322);
var inst_71325 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(out,inst_71324);
var inst_71326 = cljs.core.async.timeout(inst_71319);
var state_71349__$1 = (function (){var statearr_71363 = state_71349;
(statearr_71363[(9)] = inst_71325);

return statearr_71363;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_71349__$1,(14),inst_71326);
} else {
if((state_val_71350 === (9))){
var inst_71335 = (state_71349[(2)]);
var state_71349__$1 = state_71349;
var statearr_71364_71391 = state_71349__$1;
(statearr_71364_71391[(2)] = inst_71335);

(statearr_71364_71391[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (5))){
var state_71349__$1 = state_71349;
var statearr_71365_71392 = state_71349__$1;
(statearr_71365_71392[(2)] = null);

(statearr_71365_71392[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (14))){
var inst_71328 = (state_71349[(2)]);
var state_71349__$1 = (function (){var statearr_71366 = state_71349;
(statearr_71366[(10)] = inst_71328);

return statearr_71366;
})();
var statearr_71367_71393 = state_71349__$1;
(statearr_71367_71393[(2)] = null);

(statearr_71367_71393[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (16))){
var inst_71345 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_71349__$1 = state_71349;
var statearr_71368_71394 = state_71349__$1;
(statearr_71368_71394[(2)] = inst_71345);

(statearr_71368_71394[(1)] = (17));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (10))){
var inst_71322 = (state_71349[(8)]);
var inst_71322__$1 = (state_71349[(2)]);
var state_71349__$1 = (function (){var statearr_71369 = state_71349;
(statearr_71369[(8)] = inst_71322__$1);

return statearr_71369;
})();
if(cljs.core.truth_(inst_71322__$1)){
var statearr_71370_71395 = state_71349__$1;
(statearr_71370_71395[(1)] = (11));

} else {
var statearr_71371_71396 = state_71349__$1;
(statearr_71371_71396[(1)] = (12));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_71350 === (8))){
var state_71349__$1 = state_71349;
var statearr_71372_71397 = state_71349__$1;
(statearr_71372_71397[(2)] = true);

(statearr_71372_71397[(1)] = (9));


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
});})(c__42110__auto__))
;
return ((function (switch__41984__auto__,c__42110__auto__){
return (function() {
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto____0 = (function (){
var statearr_71376 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_71376[(0)] = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto__);

(statearr_71376[(1)] = (1));

return statearr_71376;
});
var org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto____1 = (function (state_71349){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_71349);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e71377){if((e71377 instanceof Object)){
var ex__41988__auto__ = e71377;
var statearr_71378_71398 = state_71349;
(statearr_71378_71398[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_71349);

return cljs.core.cst$kw$recur;
} else {
throw e71377;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__71399 = state_71349;
state_71349 = G__71399;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto__ = function(state_71349){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto____1.call(this,state_71349);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto____0;
org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto____1;
return org$numenta$sanity$comportex$simulation$simulation_loop_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__))
})();
var state__42112__auto__ = (function (){var statearr_71379 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_71379[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_71379;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__))
);

return c__42110__auto__;
});
org.numenta.sanity.comportex.simulation.command_handler = (function org$numenta$sanity$comportex$simulation$command_handler(model,options,status,status_subscribers,client_infos,all_client_infos){
return (function org$numenta$sanity$comportex$simulation$command_handler_$_handle_command(c){
var vec__71487 = c;
var vec__71490 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71487,(0),null);
var seq__71491 = cljs.core.seq(vec__71490);
var first__71492 = cljs.core.first(seq__71491);
var seq__71491__$1 = cljs.core.next(seq__71491);
var command = first__71492;
var xs = seq__71491__$1;
var client_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71487,(1),null);
var client_info = (function (){var or__9278__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_infos) : cljs.core.deref.call(null,client_infos)),client_id);
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
var v = (function (){var G__71493 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__71493) : cljs.core.atom.call(null,G__71493));
})();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_infos,cljs.core.assoc,client_id,v);

return v;
}
})();
var G__71494 = command;
switch (G__71494) {
case "client-disconnect":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client disconnected."], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.disj,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(client_info) : cljs.core.deref.call(null,client_info))));

break;
case "connect":
var vec__71495 = xs;
var old_client_info = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71495,(0),null);
var map__71498 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71495,(1),null);
var map__71498__$1 = ((((!((map__71498 == null)))?((((map__71498.cljs$lang$protocol_mask$partition0$ & (64))) || (map__71498.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__71498):map__71498);
var subscriber_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71498__$1,cljs.core.cst$kw$ch);
cljs.core.add_watch(client_info,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_client,((function (vec__71495,old_client_info,map__71498,map__71498__$1,subscriber_c,G__71494,vec__71487,vec__71490,seq__71491,first__71492,seq__71491__$1,command,xs,client_id,client_info){
return (function (_,___$1,___$2,v){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,cljs.core.update.cljs$core$IFn$_invoke$arity$3(v,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,((function (vec__71495,old_client_info,map__71498,map__71498__$1,subscriber_c,G__71494,vec__71487,vec__71490,seq__71491,first__71492,seq__71491__$1,command,xs,client_id,client_info){
return (function (subscriber_mchannel){
return org.numenta.sanity.bridge.marshalling.channel_weak(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(subscriber_mchannel,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$ch,cljs.core.cst$kw$target_DASH_id], null)));
});})(vec__71495,old_client_info,map__71498,map__71498__$1,subscriber_c,G__71494,vec__71487,vec__71490,seq__71491,first__71492,seq__71491__$1,command,xs,client_id,client_info))
));
});})(vec__71495,old_client_info,map__71498,map__71498__$1,subscriber_c,G__71494,vec__71487,vec__71490,seq__71491,first__71492,seq__71491__$1,command,xs,client_id,client_info))
);

var temp__6728__auto__ = cljs.core.cst$kw$sim_DASH_status_DASH_subscriber.cljs$core$IFn$_invoke$arity$1(old_client_info);
if(cljs.core.truth_(temp__6728__auto__)){
var map__71500 = temp__6728__auto__;
var map__71500__$1 = ((((!((map__71500 == null)))?((((map__71500.cljs$lang$protocol_mask$partition0$ & (64))) || (map__71500.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__71500):map__71500);
var subscriber_c__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71500__$1,cljs.core.cst$kw$ch);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client resubscribed to status."], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.conj,subscriber_c__$1);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,subscriber_c__$1);
} else {
return null;
}

break;
case "step":
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.update,cljs.core.cst$kw$force_DASH_n_DASH_steps,cljs.core.inc);

break;
case "set-params":
var vec__71502 = xs;
var lyr_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71502,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71502,(1),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(model,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$layers,lyr_id,cljs.core.cst$kw$params], null),v);

break;
case "restart":
var vec__71505 = xs;
var map__71508 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71505,(0),null);
var map__71508__$1 = ((((!((map__71508 == null)))?((((map__71508.cljs$lang$protocol_mask$partition0$ & (64))) || (map__71508.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__71508):map__71508);
var response_c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71508__$1,cljs.core.cst$kw$ch);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(model,org.nfrac.comportex.core.restart);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(response_c,cljs.core.cst$kw$done);

break;
case "toggle":
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION TOGGLE. Current timestep:",org.nfrac.comportex.core.timestep((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model) : cljs.core.deref.call(null,model))),cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.update,cljs.core.cst$kw$go_QMARK_,cljs.core.not)], 0));

break;
case "pause":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION PAUSE. Current timestep:",org.nfrac.comportex.core.timestep((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model) : cljs.core.deref.call(null,model)))], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$go_QMARK_,false);

break;
case "run":
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION RUN. Current timestep:",org.nfrac.comportex.core.timestep((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(model) : cljs.core.deref.call(null,model)))], 0));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$go_QMARK_,true);

break;
case "set-step-ms":
var vec__71510 = xs;
var t = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71510,(0),null);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(options,cljs.core.assoc,cljs.core.cst$kw$step_DASH_ms,t);

break;
case "subscribe-to-status":
var vec__71513 = xs;
var subscriber_mchannel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__71513,(0),null);
var subscriber_c = cljs.core.cst$kw$ch.cljs$core$IFn$_invoke$arity$1(subscriber_mchannel);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["SIMULATION: Client subscribed to status."], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(status_subscribers,cljs.core.conj,subscriber_c);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client_info,cljs.core.assoc,cljs.core.cst$kw$sim_DASH_status_DASH_subscriber,subscriber_mchannel);

return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(subscriber_c,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(status) : cljs.core.deref.call(null,status))], null));

break;
default:
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(command)].join('')));

}
});
});
org.numenta.sanity.comportex.simulation.handle_commands = (function org$numenta$sanity$comportex$simulation$handle_commands(commands,model,options,sim_closed_QMARK_){
var status = (function (){var G__71569 = cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(options) : cljs.core.deref.call(null,options)));
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__71569) : cljs.core.atom.call(null,G__71569));
})();
var status_subscribers = (function (){var G__71570 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__71570) : cljs.core.atom.call(null,G__71570));
})();
var client_infos = (function (){var G__71571 = cljs.core.PersistentArrayMap.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__71571) : cljs.core.atom.call(null,G__71571));
})();
var all_client_infos = (function (){var G__71572 = cljs.core.PersistentHashSet.EMPTY;
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__71572) : cljs.core.atom.call(null,G__71572));
})();
var handle_command = org.numenta.sanity.comportex.simulation.command_handler(model,options,status,status_subscribers,client_infos,all_client_infos);
cljs.core.add_watch(options,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_extract_DASH_status_DASH_change,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,oldv,newv){
var map__71573 = newv;
var map__71573__$1 = ((((!((map__71573 == null)))?((((map__71573.cljs$lang$protocol_mask$partition0$ & (64))) || (map__71573.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__71573):map__71573);
var go_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__71573__$1,cljs.core.cst$kw$go_QMARK_);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(go_QMARK_,cljs.core.cst$kw$go_QMARK_.cljs$core$IFn$_invoke$arity$1(oldv))){
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(status,go_QMARK_) : cljs.core.reset_BANG_.call(null,status,go_QMARK_));
} else {
return null;
}
});})(status,status_subscribers,client_infos,all_client_infos,handle_command))
);

cljs.core.add_watch(status,cljs.core.cst$kw$org$numenta$sanity$comportex$simulation_SLASH_push_DASH_to_DASH_subscribers,((function (status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (_,___$1,___$2,v){
var seq__71575 = cljs.core.seq((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(status_subscribers) : cljs.core.deref.call(null,status_subscribers)));
var chunk__71576 = null;
var count__71577 = (0);
var i__71578 = (0);
while(true){
if((i__71578 < count__71577)){
var ch = chunk__71576.cljs$core$IIndexed$_nth$arity$2(null,i__71578);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__71621 = seq__71575;
var G__71622 = chunk__71576;
var G__71623 = count__71577;
var G__71624 = (i__71578 + (1));
seq__71575 = G__71621;
chunk__71576 = G__71622;
count__71577 = G__71623;
i__71578 = G__71624;
continue;
} else {
var temp__6728__auto__ = cljs.core.seq(seq__71575);
if(temp__6728__auto__){
var seq__71575__$1 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__71575__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__71575__$1);
var G__71625 = cljs.core.chunk_rest(seq__71575__$1);
var G__71626 = c__10181__auto__;
var G__71627 = cljs.core.count(c__10181__auto__);
var G__71628 = (0);
seq__71575 = G__71625;
chunk__71576 = G__71626;
count__71577 = G__71627;
i__71578 = G__71628;
continue;
} else {
var ch = cljs.core.first(seq__71575__$1);
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(ch,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [v], null));

var G__71629 = cljs.core.next(seq__71575__$1);
var G__71630 = null;
var G__71631 = (0);
var G__71632 = (0);
seq__71575 = G__71629;
chunk__71576 = G__71630;
count__71577 = G__71631;
i__71578 = G__71632;
continue;
}
} else {
return null;
}
}
break;
}
});})(status,status_subscribers,client_infos,all_client_infos,handle_command))
);

var c__42110__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (c__42110__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (){
var f__42111__auto__ = (function (){var switch__41984__auto__ = ((function (c__42110__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function (state_71600){
var state_val_71601 = (state_71600[(1)]);
if((state_val_71601 === (7))){
var inst_71584 = (state_71600[(7)]);
var inst_71584__$1 = (state_71600[(2)]);
var inst_71585 = (inst_71584__$1 == null);
var inst_71586 = cljs.core.not(inst_71585);
var state_71600__$1 = (function (){var statearr_71602 = state_71600;
(statearr_71602[(7)] = inst_71584__$1);

return statearr_71602;
})();
if(inst_71586){
var statearr_71603_71633 = state_71600__$1;
(statearr_71603_71633[(1)] = (8));

} else {
var statearr_71604_71634 = state_71600__$1;
(statearr_71604_71634[(1)] = (9));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (1))){
var state_71600__$1 = state_71600;
var statearr_71605_71635 = state_71600__$1;
(statearr_71605_71635[(2)] = null);

(statearr_71605_71635[(1)] = (2));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (4))){
var state_71600__$1 = state_71600;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_71600__$1,(7),commands);
} else {
if((state_val_71601 === (6))){
var inst_71596 = (state_71600[(2)]);
var state_71600__$1 = state_71600;
var statearr_71606_71636 = state_71600__$1;
(statearr_71606_71636[(2)] = inst_71596);

(statearr_71606_71636[(1)] = (3));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (3))){
var inst_71598 = (state_71600[(2)]);
var state_71600__$1 = state_71600;
return cljs.core.async.impl.ioc_helpers.return_chan(state_71600__$1,inst_71598);
} else {
if((state_val_71601 === (2))){
var inst_71580 = (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(sim_closed_QMARK_) : cljs.core.deref.call(null,sim_closed_QMARK_));
var inst_71581 = cljs.core.not(inst_71580);
var state_71600__$1 = state_71600;
if(inst_71581){
var statearr_71607_71637 = state_71600__$1;
(statearr_71607_71637[(1)] = (4));

} else {
var statearr_71608_71638 = state_71600__$1;
(statearr_71608_71638[(1)] = (5));

}

return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (9))){
var inst_71591 = (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(sim_closed_QMARK_,true) : cljs.core.reset_BANG_.call(null,sim_closed_QMARK_,true));
var state_71600__$1 = state_71600;
var statearr_71609_71639 = state_71600__$1;
(statearr_71609_71639[(2)] = inst_71591);

(statearr_71609_71639[(1)] = (10));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (5))){
var state_71600__$1 = state_71600;
var statearr_71610_71640 = state_71600__$1;
(statearr_71610_71640[(2)] = null);

(statearr_71610_71640[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (10))){
var inst_71593 = (state_71600[(2)]);
var state_71600__$1 = state_71600;
var statearr_71611_71641 = state_71600__$1;
(statearr_71611_71641[(2)] = inst_71593);

(statearr_71611_71641[(1)] = (6));


return cljs.core.cst$kw$recur;
} else {
if((state_val_71601 === (8))){
var inst_71584 = (state_71600[(7)]);
var inst_71588 = (handle_command.cljs$core$IFn$_invoke$arity$1 ? handle_command.cljs$core$IFn$_invoke$arity$1(inst_71584) : handle_command.call(null,inst_71584));
var state_71600__$1 = (function (){var statearr_71612 = state_71600;
(statearr_71612[(8)] = inst_71588);

return statearr_71612;
})();
var statearr_71613_71642 = state_71600__$1;
(statearr_71613_71642[(2)] = null);

(statearr_71613_71642[(1)] = (2));


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
});})(c__42110__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
;
return ((function (switch__41984__auto__,c__42110__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command){
return (function() {
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto__ = null;
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto____0 = (function (){
var statearr_71617 = [null,null,null,null,null,null,null,null,null];
(statearr_71617[(0)] = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto__);

(statearr_71617[(1)] = (1));

return statearr_71617;
});
var org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto____1 = (function (state_71600){
while(true){
var ret_value__41986__auto__ = (function (){try{while(true){
var result__41987__auto__ = switch__41984__auto__(state_71600);
if(cljs.core.keyword_identical_QMARK_(result__41987__auto__,cljs.core.cst$kw$recur)){
continue;
} else {
return result__41987__auto__;
}
break;
}
}catch (e71618){if((e71618 instanceof Object)){
var ex__41988__auto__ = e71618;
var statearr_71619_71643 = state_71600;
(statearr_71619_71643[(5)] = ex__41988__auto__);


cljs.core.async.impl.ioc_helpers.process_exception(state_71600);

return cljs.core.cst$kw$recur;
} else {
throw e71618;

}
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__41986__auto__,cljs.core.cst$kw$recur)){
var G__71644 = state_71600;
state_71600 = G__71644;
continue;
} else {
return ret_value__41986__auto__;
}
break;
}
});
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto__ = function(state_71600){
switch(arguments.length){
case 0:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto____0.call(this);
case 1:
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto____1.call(this,state_71600);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$0 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto____0;
org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto__.cljs$core$IFn$_invoke$arity$1 = org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto____1;
return org$numenta$sanity$comportex$simulation$handle_commands_$_state_machine__41985__auto__;
})()
;})(switch__41984__auto__,c__42110__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
})();
var state__42112__auto__ = (function (){var statearr_71620 = (f__42111__auto__.cljs$core$IFn$_invoke$arity$0 ? f__42111__auto__.cljs$core$IFn$_invoke$arity$0() : f__42111__auto__.call(null));
(statearr_71620[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c__42110__auto__);

return statearr_71620;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__42112__auto__);
});})(c__42110__auto__,status,status_subscribers,client_infos,all_client_infos,handle_command))
);

return c__42110__auto__;
});
org.numenta.sanity.comportex.simulation.start = (function org$numenta$sanity$comportex$simulation$start(steps_c,model_atom,world_c,commands_c,htm_step){
var options_71647 = (function (){var G__71646 = new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$go_QMARK_,false,cljs.core.cst$kw$step_DASH_ms,(20),cljs.core.cst$kw$force_DASH_n_DASH_steps,(0)], null);
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__71646) : cljs.core.atom.call(null,G__71646));
})();
var sim_closed_QMARK__71648 = (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false) : cljs.core.atom.call(null,false));
if(cljs.core.truth_(commands_c)){
org.numenta.sanity.comportex.simulation.handle_commands(commands_c,model_atom,options_71647,sim_closed_QMARK__71648);
} else {
}

org.numenta.sanity.comportex.simulation.simulation_loop(model_atom,world_c,steps_c,options_71647,sim_closed_QMARK__71648,htm_step);

return null;
});
