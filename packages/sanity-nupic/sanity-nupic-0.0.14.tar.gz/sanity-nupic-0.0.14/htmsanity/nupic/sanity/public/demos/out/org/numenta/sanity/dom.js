// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('org.numenta.sanity.dom');
goog.require('cljs.core');
org.numenta.sanity.dom.get_bounding_page_rect = (function org$numenta$sanity$dom$get_bounding_page_rect(el){
var vec__40718 = (function (){var el__$1 = el;
var x = (0);
var y = (0);
while(true){
if(cljs.core.truth_(el__$1)){
var s = getComputedStyle(el__$1);
var include_border_QMARK_ = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s.position,"static");
var G__40727 = el__$1.offsetParent;
var G__40728 = (function (){var G__40721 = (function (){var G__40722 = (x + el__$1.offsetLeft);
if(include_border_QMARK_){
return (G__40722 + (function (){var G__40723 = s.borderLeftWidth;
return parseInt(G__40723);
})());
} else {
return G__40722;
}
})();
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(el__$1,document.body)){
return (G__40721 - el__$1.scrollLeft);
} else {
return G__40721;
}
})();
var G__40729 = (function (){var G__40724 = (function (){var G__40725 = (y + el__$1.offsetTop);
if(include_border_QMARK_){
return (G__40725 + (function (){var G__40726 = s.borderTopWidth;
return parseInt(G__40726);
})());
} else {
return G__40725;
}
})();
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(el__$1,document.body)){
return (G__40724 - el__$1.scrollTop);
} else {
return G__40724;
}
})();
el__$1 = G__40727;
x = G__40728;
y = G__40729;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [x,y], null);
}
break;
}
})();
var left = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40718,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40718,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [left,top,(left + el.offsetWidth),(top + el.offsetHeight)], null);
});
org.numenta.sanity.dom.within_element_QMARK_ = (function org$numenta$sanity$dom$within_element_QMARK_(evt,el){
var vec__40733 = org.numenta.sanity.dom.get_bounding_page_rect(el);
var left = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40733,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40733,(1),null);
var right = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40733,(2),null);
var bottom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40733,(3),null);
return ((evt.pageX >= left)) && ((evt.pageX < right)) && ((evt.pageY >= top)) && ((evt.pageY < bottom));
});
org.numenta.sanity.dom.nonzero_number_QMARK_ = (function org$numenta$sanity$dom$nonzero_number_QMARK_(v){
if((typeof v === 'number') && (!((v === (0))))){
return v;
} else {
return false;
}
});
org.numenta.sanity.dom.page_x = (function org$numenta$sanity$dom$page_x(evt){
var or__9278__auto__ = evt.pageX;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
var doc = document.documentElement;
var body = document.body;
return (evt.clientX + ((function (){var or__9278__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = doc;
if(cljs.core.truth_(and__9266__auto__)){
return doc.scrollLeft;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$1)){
return or__9278__auto____$1;
} else {
var or__9278__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = body;
if(cljs.core.truth_(and__9266__auto__)){
return body.scrollLeft;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$2)){
return or__9278__auto____$2;
} else {
return (0);
}
}
})() - (function (){var or__9278__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = doc;
if(cljs.core.truth_(and__9266__auto__)){
return doc.clientLeft;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$1)){
return or__9278__auto____$1;
} else {
var or__9278__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = body;
if(cljs.core.truth_(and__9266__auto__)){
return body.clientLeft;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$2)){
return or__9278__auto____$2;
} else {
return (0);
}
}
})()));
}
});
org.numenta.sanity.dom.page_y = (function org$numenta$sanity$dom$page_y(evt){
var or__9278__auto__ = evt.pageY;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
var doc = document.documentElement;
var body = document.body;
return (evt.clientY + ((function (){var or__9278__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = doc;
if(cljs.core.truth_(and__9266__auto__)){
return doc.scrollTop;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$1)){
return or__9278__auto____$1;
} else {
var or__9278__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = body;
if(cljs.core.truth_(and__9266__auto__)){
return body.scrollTop;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$2)){
return or__9278__auto____$2;
} else {
return (0);
}
}
})() - (function (){var or__9278__auto____$1 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = doc;
if(cljs.core.truth_(and__9266__auto__)){
return doc.clientTop;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$1)){
return or__9278__auto____$1;
} else {
var or__9278__auto____$2 = org.numenta.sanity.dom.nonzero_number_QMARK_((function (){var and__9266__auto__ = body;
if(cljs.core.truth_(and__9266__auto__)){
return body.clientTop;
} else {
return and__9266__auto__;
}
})());
if(cljs.core.truth_(or__9278__auto____$2)){
return or__9278__auto____$2;
} else {
return (0);
}
}
})()));
}
});
org.numenta.sanity.dom.offset_from = (function org$numenta$sanity$dom$offset_from(evt,el){
var vec__40739 = org.numenta.sanity.dom.get_bounding_page_rect(el);
var left = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40739,(0),null);
var top = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40739,(1),null);
var right = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40739,(2),null);
var bottom = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40739,(3),null);
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$x,(org.numenta.sanity.dom.page_x(evt) - left),cljs.core.cst$kw$y,(org.numenta.sanity.dom.page_y(evt) - top)], null);
});
org.numenta.sanity.dom.offset_from_target = (function org$numenta$sanity$dom$offset_from_target(evt){
return org.numenta.sanity.dom.offset_from(evt,evt.target);
});
