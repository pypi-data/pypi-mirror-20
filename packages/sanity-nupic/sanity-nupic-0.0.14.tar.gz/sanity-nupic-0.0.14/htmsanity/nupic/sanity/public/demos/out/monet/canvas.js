// Compiled by ClojureScript 1.9.229 {:static-fns true, :optimize-constants true}
goog.provide('monet.canvas');
goog.require('cljs.core');
goog.require('monet.core');
monet.canvas.get_context = (function monet$canvas$get_context(canvas,type){
return canvas.getContext(cljs.core.name(type));
});
/**
 * Starts a new path by resetting the list of sub-paths.
 * Call this method when you want to create a new path.
 */
monet.canvas.begin_path = (function monet$canvas$begin_path(ctx){
ctx.beginPath();

return ctx;
});
/**
 * Tries to draw a straight line from the current point to the start.
 * If the shape has already been closed or has only one point, this
 * function does nothing.
 */
monet.canvas.close_path = (function monet$canvas$close_path(ctx){
ctx.closePath();

return ctx;
});
/**
 * Saves the current drawing style state using a stack so you can revert
 * any change you make to it using restore.
 */
monet.canvas.save = (function monet$canvas$save(ctx){
ctx.save();

return ctx;
});
/**
 * Restores the drawing style state to the last element on the 'state stack'
 * saved by save.
 */
monet.canvas.restore = (function monet$canvas$restore(ctx){
ctx.restore();

return ctx;
});
/**
 * Rotate the context 
 */
monet.canvas.rotate = (function monet$canvas$rotate(ctx,angle){
ctx.rotate(angle);

return ctx;
});
/**
 * Scales the context by a floating-point factor in each direction
 */
monet.canvas.scale = (function monet$canvas$scale(ctx,x,y){
ctx.scale(x,y);

return ctx;
});
/**
 * Moves the origin point of the context to (x, y).
 */
monet.canvas.translate = (function monet$canvas$translate(ctx,x,y){
ctx.translate(x,y);

return ctx;
});
/**
 * Multiplies a custom transformation matrix to the existing
 * HTML5 canvas transformation according to the follow convention:
 * 
 * [ x']   [ m11 m21 dx ] [ x ]
 * [ y'] = [ m12 m22 dy ] [ y ]
 * [ 1 ]   [ 0   0   1  ] [ 1 ]
 */
monet.canvas.transform = (function monet$canvas$transform(var_args){
var args48559 = [];
var len__10461__auto___48565 = arguments.length;
var i__10462__auto___48566 = (0);
while(true){
if((i__10462__auto___48566 < len__10461__auto___48565)){
args48559.push((arguments[i__10462__auto___48566]));

var G__48567 = (i__10462__auto___48566 + (1));
i__10462__auto___48566 = G__48567;
continue;
} else {
}
break;
}

var G__48561 = args48559.length;
switch (G__48561) {
case 7:
return monet.canvas.transform.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 2:
return monet.canvas.transform.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args48559.length)].join('')));

}
});

monet.canvas.transform.cljs$core$IFn$_invoke$arity$7 = (function (ctx,m11,m12,m21,m22,dx,dy){
ctx.transform(m11,m12,m21,m22,dx,dy);

return ctx;
});

monet.canvas.transform.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__48562){
var map__48563 = p__48562;
var map__48563__$1 = ((((!((map__48563 == null)))?((((map__48563.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48563.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48563):map__48563);
var m11 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48563__$1,cljs.core.cst$kw$m11);
var m12 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48563__$1,cljs.core.cst$kw$m12);
var m21 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48563__$1,cljs.core.cst$kw$m21);
var m22 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48563__$1,cljs.core.cst$kw$m22);
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48563__$1,cljs.core.cst$kw$dx);
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48563__$1,cljs.core.cst$kw$dy);
ctx.transform(m11,m12,m21,m22,dx,dy);

return ctx;
});

monet.canvas.transform.cljs$lang$maxFixedArity = 7;

/**
 * Fills the subpaths with the current fill style.
 */
monet.canvas.fill = (function monet$canvas$fill(ctx){
ctx.fill();

return ctx;
});
/**
 * Strokes the subpaths with the current stroke style.
 */
monet.canvas.stroke = (function monet$canvas$stroke(ctx){
ctx.stroke();

return ctx;
});
/**
 * Further constrains the clipping region to the current path.
 */
monet.canvas.clip = (function monet$canvas$clip(ctx){
ctx.clip();

return ctx;
});
/**
 * Path for a rectangle at position (x, y) with a size (w, h).
 */
monet.canvas.rect = (function monet$canvas$rect(ctx,p__48569){
var map__48572 = p__48569;
var map__48572__$1 = ((((!((map__48572 == null)))?((((map__48572.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48572.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48572):map__48572);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48572__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48572__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48572__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48572__$1,cljs.core.cst$kw$h);
ctx.rect(x,y,w,h);

return ctx;
});
/**
 * Sets all pixels in the rectangle defined by starting point (x, y)
 * and size (w, h) to transparent black.
 */
monet.canvas.clear_rect = (function monet$canvas$clear_rect(ctx,p__48574){
var map__48577 = p__48574;
var map__48577__$1 = ((((!((map__48577 == null)))?((((map__48577.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48577.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48577):map__48577);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48577__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48577__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48577__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48577__$1,cljs.core.cst$kw$h);
ctx.clearRect(x,y,w,h);

return ctx;
});
/**
 * Paints a rectangle which has a starting point at (x, y) and has a
 * w width and an h height onto the canvas, using the current stroke
 * style.
 */
monet.canvas.stroke_rect = (function monet$canvas$stroke_rect(ctx,p__48579){
var map__48582 = p__48579;
var map__48582__$1 = ((((!((map__48582 == null)))?((((map__48582.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48582.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48582):map__48582);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48582__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48582__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48582__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48582__$1,cljs.core.cst$kw$h);
ctx.strokeRect(x,y,w,h);

return ctx;
});
/**
 * Draws a filled rectangle at (x, y) position whose size is determined
 * by width w and height h.
 */
monet.canvas.fill_rect = (function monet$canvas$fill_rect(ctx,p__48584){
var map__48587 = p__48584;
var map__48587__$1 = ((((!((map__48587 == null)))?((((map__48587.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48587.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48587):map__48587);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48587__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48587__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48587__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48587__$1,cljs.core.cst$kw$h);
ctx.fillRect(x,y,w,h);

return ctx;
});
/**
 * Draws an arc at position (x, y) with radius r, beginning at start-angle,
 * finishing at end-angle, in the direction specified.
 */
monet.canvas.arc = (function monet$canvas$arc(ctx,p__48589){
var map__48592 = p__48589;
var map__48592__$1 = ((((!((map__48592 == null)))?((((map__48592.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48592.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48592):map__48592);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48592__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48592__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48592__$1,cljs.core.cst$kw$r);
var start_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48592__$1,cljs.core.cst$kw$start_DASH_angle);
var end_angle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48592__$1,cljs.core.cst$kw$end_DASH_angle);
var counter_clockwise_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48592__$1,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_);
ctx.arc(x,y,r,start_angle,end_angle,counter_clockwise_QMARK_);

return ctx;
});
monet.canvas.two_pi = ((2) * Math.PI);
/**
 * Draws an ellipse at position (x, y) with radius (rw, rh)
 */
monet.canvas.ellipse = (function monet$canvas$ellipse(ctx,p__48594){
var map__48597 = p__48594;
var map__48597__$1 = ((((!((map__48597 == null)))?((((map__48597.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48597.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48597):map__48597);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48597__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48597__$1,cljs.core.cst$kw$y);
var rw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48597__$1,cljs.core.cst$kw$rw);
var rh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48597__$1,cljs.core.cst$kw$rh);
return monet.canvas.restore(monet.canvas.close_path(monet.canvas.arc(monet.canvas.begin_path(monet.canvas.scale(monet.canvas.save(ctx),(1),(rh / rw))),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,rw,cljs.core.cst$kw$start_DASH_angle,(0),cljs.core.cst$kw$end_DASH_angle,monet.canvas.two_pi,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,false], null))));
});
/**
 * Draws a circle at position (x, y) with radius r
 */
monet.canvas.circle = (function monet$canvas$circle(ctx,p__48599){
var map__48602 = p__48599;
var map__48602__$1 = ((((!((map__48602 == null)))?((((map__48602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48602):map__48602);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48602__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48602__$1,cljs.core.cst$kw$y);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48602__$1,cljs.core.cst$kw$r);
return monet.canvas.close_path(monet.canvas.arc(monet.canvas.begin_path(ctx),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$x,x,cljs.core.cst$kw$y,y,cljs.core.cst$kw$r,r,cljs.core.cst$kw$start_DASH_angle,(0),cljs.core.cst$kw$end_DASH_angle,monet.canvas.two_pi,cljs.core.cst$kw$counter_DASH_clockwise_QMARK_,true], null)));
});
/**
 * Paints the given text at a starting point at (x, y), using the
 * current fill style.
 */
monet.canvas.text = (function monet$canvas$text(ctx,p__48604){
var map__48607 = p__48604;
var map__48607__$1 = ((((!((map__48607 == null)))?((((map__48607.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48607.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48607):map__48607);
var text__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48607__$1,cljs.core.cst$kw$text);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48607__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48607__$1,cljs.core.cst$kw$y);
ctx.fillText(text__$1,x,y);

return ctx;
});
/**
 * Sets the font. Default value 10px sans-serif.
 */
monet.canvas.font_style = (function monet$canvas$font_style(ctx,font){
ctx.font = font;

return ctx;
});
/**
 * Color or style to use inside shapes. Default #000 (black).
 */
monet.canvas.fill_style = (function monet$canvas$fill_style(ctx,color){
ctx.fillStyle = cljs.core.name(color);

return ctx;
});
/**
 * Color or style to use for the lines around shapes. Default #000 (black).
 */
monet.canvas.stroke_style = (function monet$canvas$stroke_style(ctx,color){
ctx.strokeStyle = cljs.core.name(color);

return ctx;
});
/**
 * Sets the line width. Default 1.0
 */
monet.canvas.stroke_width = (function monet$canvas$stroke_width(ctx,w){
ctx.lineWidth = w;

return ctx;
});
/**
 * Sets the line cap. Possible values (as string or keyword):
 * butt (default), round, square
 */
monet.canvas.stroke_cap = (function monet$canvas$stroke_cap(ctx,cap){
ctx.lineCap = cljs.core.name(cap);

return ctx;
});
/**
 * Can be set, to change the line join style. Possible values (as string
 * or keyword): bevel, round, and miter. Other values are ignored.
 */
monet.canvas.stroke_join = (function monet$canvas$stroke_join(ctx,join){
ctx.lineJoin = cljs.core.name(join);

return ctx;
});
/**
 * Moves the starting point of a new subpath to the (x, y) coordinates.
 */
monet.canvas.move_to = (function monet$canvas$move_to(ctx,x,y){
ctx.moveTo(x,y);

return ctx;
});
/**
 * Connects the last point in the subpath to the x, y coordinates with a
 * straight line.
 */
monet.canvas.line_to = (function monet$canvas$line_to(ctx,x,y){
ctx.lineTo(x,y);

return ctx;
});
/**
 * Global Alpha value that is applied to shapes and images before they are
 * composited onto the canvas. Default 1.0 (opaque).
 */
monet.canvas.alpha = (function monet$canvas$alpha(ctx,a){
ctx.globalAlpha = a;

return ctx;
});
/**
 * With Global Alpha applied this sets how shapes and images are drawn
 * onto the existing bitmap. Possible values (as string or keyword):
 * source-atop, source-in, source-out, source-over (default),
 * destination-atop, destination-in, destination-out, destination-over,
 * lighter, darker, copy, xor
 */
monet.canvas.composition_operation = (function monet$canvas$composition_operation(ctx,operation){
ctx.globalCompositionOperation = cljs.core.name(operation);

return ctx;
});
/**
 * Sets the text alignment attribute. Possible values (specified
 * as a string or keyword): start (default), end, left, right or
 * center.
 */
monet.canvas.text_align = (function monet$canvas$text_align(ctx,alignment){
ctx.textAlign = cljs.core.name(alignment);

return ctx;
});
/**
 * Sets the text baseline attribute. Possible values (specified
 * as a string or keyword): top, hanging, middle, alphabetic (default),
 * ideographic, bottom
 */
monet.canvas.text_baseline = (function monet$canvas$text_baseline(ctx,alignment){
ctx.textBaseline = cljs.core.name(alignment);

return ctx;
});
/**
 * Gets the pixel value as a hash map of RGBA values
 */
monet.canvas.get_pixel = (function monet$canvas$get_pixel(ctx,x,y){
var imgd = ctx.getImageData(x,y,(1),(1)).data;
return new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$red,(imgd[(0)]),cljs.core.cst$kw$green,(imgd[(1)]),cljs.core.cst$kw$blue,(imgd[(2)]),cljs.core.cst$kw$alpha,(imgd[(3)])], null);
});
/**
 * Draws the image onto the canvas at the given position.
 * If a map of params is given, the number of entries is used to
 * determine the underlying call to make.
 */
monet.canvas.draw_image = (function monet$canvas$draw_image(var_args){
var args48609 = [];
var len__10461__auto___48618 = arguments.length;
var i__10462__auto___48619 = (0);
while(true){
if((i__10462__auto___48619 < len__10461__auto___48618)){
args48609.push((arguments[i__10462__auto___48619]));

var G__48620 = (i__10462__auto___48619 + (1));
i__10462__auto___48619 = G__48620;
continue;
} else {
}
break;
}

var G__48611 = args48609.length;
switch (G__48611) {
case 4:
return monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args48609.length)].join('')));

}
});

monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$4 = (function (ctx,img,x,y){
ctx.drawImage(img,x,y);

return ctx;
});

monet.canvas.draw_image.cljs$core$IFn$_invoke$arity$3 = (function (ctx,img,p__48612){
var map__48613 = p__48612;
var map__48613__$1 = ((((!((map__48613 == null)))?((((map__48613.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48613.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48613):map__48613);
var params = map__48613__$1;
var sh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$sh);
var sw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$sw);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$y);
var dh = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$dh);
var dx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$dx);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$w);
var sy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$sy);
var dy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$dy);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$h);
var dw = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$dw);
var sx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48613__$1,cljs.core.cst$kw$sx);
var pred__48615_48622 = cljs.core._EQ_;
var expr__48616_48623 = cljs.core.count(params);
if(cljs.core.truth_((pred__48615_48622.cljs$core$IFn$_invoke$arity$2 ? pred__48615_48622.cljs$core$IFn$_invoke$arity$2((2),expr__48616_48623) : pred__48615_48622.call(null,(2),expr__48616_48623)))){
ctx.drawImage(img,x,y);
} else {
if(cljs.core.truth_((pred__48615_48622.cljs$core$IFn$_invoke$arity$2 ? pred__48615_48622.cljs$core$IFn$_invoke$arity$2((4),expr__48616_48623) : pred__48615_48622.call(null,(4),expr__48616_48623)))){
ctx.drawImage(img,x,y,w,h);
} else {
if(cljs.core.truth_((pred__48615_48622.cljs$core$IFn$_invoke$arity$2 ? pred__48615_48622.cljs$core$IFn$_invoke$arity$2((8),expr__48616_48623) : pred__48615_48622.call(null,(8),expr__48616_48623)))){
ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(expr__48616_48623)].join('')));
}
}
}

return ctx;
});

monet.canvas.draw_image.cljs$lang$maxFixedArity = 4;

monet.canvas.quadratic_curve_to = (function monet$canvas$quadratic_curve_to(var_args){
var args48624 = [];
var len__10461__auto___48630 = arguments.length;
var i__10462__auto___48631 = (0);
while(true){
if((i__10462__auto___48631 < len__10461__auto___48630)){
args48624.push((arguments[i__10462__auto___48631]));

var G__48632 = (i__10462__auto___48631 + (1));
i__10462__auto___48631 = G__48632;
continue;
} else {
}
break;
}

var G__48626 = args48624.length;
switch (G__48626) {
case 5:
return monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 2:
return monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args48624.length)].join('')));

}
});

monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5 = (function (ctx,cpx,cpy,x,y){
ctx.quadraticCurveTo(cpx,cpy,x,y);

return ctx;
});

monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__48627){
var map__48628 = p__48627;
var map__48628__$1 = ((((!((map__48628 == null)))?((((map__48628.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48628.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48628):map__48628);
var cpx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48628__$1,cljs.core.cst$kw$cpx);
var cpy = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48628__$1,cljs.core.cst$kw$cpy);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48628__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48628__$1,cljs.core.cst$kw$y);
ctx.quadraticCurveTo(cpx,cpy,x,y);

return ctx;
});

monet.canvas.quadratic_curve_to.cljs$lang$maxFixedArity = 5;

monet.canvas.bezier_curve_to = (function monet$canvas$bezier_curve_to(var_args){
var args48634 = [];
var len__10461__auto___48640 = arguments.length;
var i__10462__auto___48641 = (0);
while(true){
if((i__10462__auto___48641 < len__10461__auto___48640)){
args48634.push((arguments[i__10462__auto___48641]));

var G__48642 = (i__10462__auto___48641 + (1));
i__10462__auto___48641 = G__48642;
continue;
} else {
}
break;
}

var G__48636 = args48634.length;
switch (G__48636) {
case 7:
return monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
case 2:
return monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args48634.length)].join('')));

}
});

monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$7 = (function (ctx,cp1x,cp1y,cp2x,cp2y,x,y){
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

return ctx;
});

monet.canvas.bezier_curve_to.cljs$core$IFn$_invoke$arity$2 = (function (ctx,p__48637){
var map__48638 = p__48637;
var map__48638__$1 = ((((!((map__48638 == null)))?((((map__48638.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48638.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48638):map__48638);
var cp1x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48638__$1,cljs.core.cst$kw$cp1x);
var cp1y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48638__$1,cljs.core.cst$kw$cp1y);
var cp2x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48638__$1,cljs.core.cst$kw$cp2x);
var cp2y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48638__$1,cljs.core.cst$kw$cp2y);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48638__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48638__$1,cljs.core.cst$kw$y);
ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y);

return ctx;
});

monet.canvas.bezier_curve_to.cljs$lang$maxFixedArity = 7;

monet.canvas.rounded_rect = (function monet$canvas$rounded_rect(ctx,p__48644){
var map__48647 = p__48644;
var map__48647__$1 = ((((!((map__48647 == null)))?((((map__48647.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48647.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48647):map__48647);
var x = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48647__$1,cljs.core.cst$kw$x);
var y = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48647__$1,cljs.core.cst$kw$y);
var w = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48647__$1,cljs.core.cst$kw$w);
var h = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48647__$1,cljs.core.cst$kw$h);
var r = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48647__$1,cljs.core.cst$kw$r);

monet.canvas.stroke(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.quadratic_curve_to.cljs$core$IFn$_invoke$arity$5(monet.canvas.line_to(monet.canvas.move_to(monet.canvas.begin_path(ctx),x,(y + r)),x,((y + h) - r)),x,(y + h),(x + r),(y + h)),((x + w) - r),(y + h)),(x + w),(y + h),(x + w),((y + h) - r)),(x + w),(y + r)),(x + w),y,((x + w) - r),y),(x + r),y),x,y,x,(y + r)));

return ctx;
});
monet.canvas.add_entity = (function monet$canvas$add_entity(mc,k,ent){
return (cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k] = ent);
});
monet.canvas.remove_entity = (function monet$canvas$remove_entity(mc,k){
return delete cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k];
});
monet.canvas.get_entity = (function monet$canvas$get_entity(mc,k){
return cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1((cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k]));
});
monet.canvas.update_entity = (function monet$canvas$update_entity(var_args){
var args__10468__auto__ = [];
var len__10461__auto___48653 = arguments.length;
var i__10462__auto___48654 = (0);
while(true){
if((i__10462__auto___48654 < len__10461__auto___48653)){
args__10468__auto__.push((arguments[i__10462__auto___48654]));

var G__48655 = (i__10462__auto___48654 + (1));
i__10462__auto___48654 = G__48655;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((3) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((3)),(0),null)):null);
return monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__10469__auto__);
});

monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic = (function (mc,k,func,extra){
var cur = (cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k]);
var res = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(func,cur,extra);
return (cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc)[k] = res);
});

monet.canvas.update_entity.cljs$lang$maxFixedArity = (3);

monet.canvas.update_entity.cljs$lang$applyTo = (function (seq48649){
var G__48650 = cljs.core.first(seq48649);
var seq48649__$1 = cljs.core.next(seq48649);
var G__48651 = cljs.core.first(seq48649__$1);
var seq48649__$2 = cljs.core.next(seq48649__$1);
var G__48652 = cljs.core.first(seq48649__$2);
var seq48649__$3 = cljs.core.next(seq48649__$2);
return monet.canvas.update_entity.cljs$core$IFn$_invoke$arity$variadic(G__48650,G__48651,G__48652,seq48649__$3);
});

monet.canvas.clear_BANG_ = (function monet$canvas$clear_BANG_(mc){
var ks = cljs.core.js_keys(cljs.core.cst$kw$entities.cljs$core$IFn$_invoke$arity$1(mc));
var seq__48660 = cljs.core.seq(ks);
var chunk__48661 = null;
var count__48662 = (0);
var i__48663 = (0);
while(true){
if((i__48663 < count__48662)){
var k = chunk__48661.cljs$core$IIndexed$_nth$arity$2(null,i__48663);
monet.canvas.remove_entity(mc,k);

var G__48664 = seq__48660;
var G__48665 = chunk__48661;
var G__48666 = count__48662;
var G__48667 = (i__48663 + (1));
seq__48660 = G__48664;
chunk__48661 = G__48665;
count__48662 = G__48666;
i__48663 = G__48667;
continue;
} else {
var temp__6728__auto__ = cljs.core.seq(seq__48660);
if(temp__6728__auto__){
var seq__48660__$1 = temp__6728__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__48660__$1)){
var c__10181__auto__ = cljs.core.chunk_first(seq__48660__$1);
var G__48668 = cljs.core.chunk_rest(seq__48660__$1);
var G__48669 = c__10181__auto__;
var G__48670 = cljs.core.count(c__10181__auto__);
var G__48671 = (0);
seq__48660 = G__48668;
chunk__48661 = G__48669;
count__48662 = G__48670;
i__48663 = G__48671;
continue;
} else {
var k = cljs.core.first(seq__48660__$1);
monet.canvas.remove_entity(mc,k);

var G__48672 = cljs.core.next(seq__48660__$1);
var G__48673 = null;
var G__48674 = (0);
var G__48675 = (0);
seq__48660 = G__48672;
chunk__48661 = G__48673;
count__48662 = G__48674;
i__48663 = G__48675;
continue;
}
} else {
return null;
}
}
break;
}
});
monet.canvas.entity = (function monet$canvas$entity(v,update,draw){
return new cljs.core.PersistentArrayMap(null, 3, [cljs.core.cst$kw$value,v,cljs.core.cst$kw$draw,draw,cljs.core.cst$kw$update,update], null);
});
monet.canvas.attr = (function monet$canvas$attr(e,a){
return e.getAttribute(a);
});
monet.canvas.draw_loop = (function monet$canvas$draw_loop(p__48676){
var map__48687 = p__48676;
var map__48687__$1 = ((((!((map__48687 == null)))?((((map__48687.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48687.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48687):map__48687);
var mc = map__48687__$1;
var canvas = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48687__$1,cljs.core.cst$kw$canvas);
var updating_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48687__$1,cljs.core.cst$kw$updating_QMARK_);
var ctx = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48687__$1,cljs.core.cst$kw$ctx);
var active = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48687__$1,cljs.core.cst$kw$active);
var entities = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48687__$1,cljs.core.cst$kw$entities);
var last_frame_time = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48687__$1,cljs.core.cst$kw$last_DASH_frame_DASH_time);
monet.canvas.clear_rect(ctx,new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$x,(0),cljs.core.cst$kw$y,(0),cljs.core.cst$kw$w,monet.canvas.attr(canvas,"width"),cljs.core.cst$kw$h,monet.canvas.attr(canvas,"height")], null));

if(cljs.core.truth_((cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(active) : cljs.core.deref.call(null,active)))){
var ks_48697 = cljs.core.js_keys(entities);
var cnt_48698 = ks_48697.length;
var now_48699 = Date.now();
var dt_48700 = (now_48699 - (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(last_frame_time) : cljs.core.deref.call(null,last_frame_time)));
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(last_frame_time,now_48699) : cljs.core.reset_BANG_.call(null,last_frame_time,now_48699));

var i_48701 = (0);
while(true){
if((i_48701 < cnt_48698)){
var k_48702 = (ks_48697[i_48701]);
var map__48689_48703 = (entities[k_48702]);
var map__48689_48704__$1 = ((((!((map__48689_48703 == null)))?((((map__48689_48703.cljs$lang$protocol_mask$partition0$ & (64))) || (map__48689_48703.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__48689_48703):map__48689_48703);
var ent_48705 = map__48689_48704__$1;
var draw_48706 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48689_48704__$1,cljs.core.cst$kw$draw);
var update_48707 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48689_48704__$1,cljs.core.cst$kw$update);
var value_48708 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48689_48704__$1,cljs.core.cst$kw$value);
if(cljs.core.truth_((function (){var and__9266__auto__ = update_48707;
if(cljs.core.truth_(and__9266__auto__)){
return (cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(updating_QMARK_) : cljs.core.deref.call(null,updating_QMARK_));
} else {
return and__9266__auto__;
}
})())){
var updated_48709 = (function (){var or__9278__auto__ = (function (){try{return (update_48707.cljs$core$IFn$_invoke$arity$2 ? update_48707.cljs$core$IFn$_invoke$arity$2(value_48708,dt_48700) : update_48707.call(null,value_48708,dt_48700));
}catch (e48692){if((e48692 instanceof Error)){
var e = e48692;
console.log(e);

return value_48708;
} else {
throw e48692;

}
}})();
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return value_48708;
}
})();
if(cljs.core.truth_((entities[k_48702]))){
(entities[k_48702] = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(ent_48705,cljs.core.cst$kw$value,updated_48709));
} else {
}
} else {
}

if(cljs.core.truth_(draw_48706)){
try{var G__48694_48710 = ctx;
var G__48695_48711 = cljs.core.cst$kw$value.cljs$core$IFn$_invoke$arity$1((entities[k_48702]));
(draw_48706.cljs$core$IFn$_invoke$arity$2 ? draw_48706.cljs$core$IFn$_invoke$arity$2(G__48694_48710,G__48695_48711) : draw_48706.call(null,G__48694_48710,G__48695_48711));
}catch (e48693){if((e48693 instanceof Error)){
var e_48712 = e48693;
console.log(e_48712);
} else {
throw e48693;

}
}} else {
}

var G__48713 = (i_48701 + (1));
i_48701 = G__48713;
continue;
} else {
}
break;
}

var G__48696 = ((function (map__48687,map__48687__$1,mc,canvas,updating_QMARK_,ctx,active,entities,last_frame_time){
return (function (){
return monet$canvas$draw_loop(mc);
});})(map__48687,map__48687__$1,mc,canvas,updating_QMARK_,ctx,active,entities,last_frame_time))
;
return (monet.core.animation_frame.cljs$core$IFn$_invoke$arity$1 ? monet.core.animation_frame.cljs$core$IFn$_invoke$arity$1(G__48696) : monet.core.animation_frame.call(null,G__48696));
} else {
return null;
}
});
monet.canvas.monet_canvas = (function monet$canvas$monet_canvas(elem,context_type){
var ct = (function (){var or__9278__auto__ = context_type;
if(cljs.core.truth_(or__9278__auto__)){
return or__9278__auto__;
} else {
return "2d";
}
})();
var ctx = monet.canvas.get_context(elem,ct);
return new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$canvas,elem,cljs.core.cst$kw$ctx,ctx,cljs.core.cst$kw$last_DASH_frame_DASH_time,(function (){var G__48717 = Date.now();
return (cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(G__48717) : cljs.core.atom.call(null,G__48717));
})(),cljs.core.cst$kw$entities,{},cljs.core.cst$kw$updating_QMARK_,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true)),cljs.core.cst$kw$active,(cljs.core.atom.cljs$core$IFn$_invoke$arity$1 ? cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true) : cljs.core.atom.call(null,true))], null);
});
monet.canvas.init = (function monet$canvas$init(var_args){
var args__10468__auto__ = [];
var len__10461__auto___48726 = arguments.length;
var i__10462__auto___48727 = (0);
while(true){
if((i__10462__auto___48727 < len__10461__auto___48726)){
args__10468__auto__.push((arguments[i__10462__auto___48727]));

var G__48728 = (i__10462__auto___48727 + (1));
i__10462__auto___48727 = G__48728;
continue;
} else {
}
break;
}

var argseq__10469__auto__ = ((((1) < args__10468__auto__.length))?(new cljs.core.IndexedSeq(args__10468__auto__.slice((1)),(0),null)):null);
return monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__10469__auto__);
});

monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic = (function (canvas,p__48722){
var vec__48723 = p__48722;
var context_type = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48723,(0),null);
var mc = monet.canvas.monet_canvas(canvas,context_type);
monet.canvas.draw_loop(mc);

return mc;
});

monet.canvas.init.cljs$lang$maxFixedArity = (1);

monet.canvas.init.cljs$lang$applyTo = (function (seq48720){
var G__48721 = cljs.core.first(seq48720);
var seq48720__$1 = cljs.core.next(seq48720);
return monet.canvas.init.cljs$core$IFn$_invoke$arity$variadic(G__48721,seq48720__$1);
});

monet.canvas.stop = (function monet$canvas$stop(mc){
var G__48731 = cljs.core.cst$kw$active.cljs$core$IFn$_invoke$arity$1(mc);
var G__48732 = false;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__48731,G__48732) : cljs.core.reset_BANG_.call(null,G__48731,G__48732));
});
monet.canvas.stop_updating = (function monet$canvas$stop_updating(mc){
var G__48735 = cljs.core.cst$kw$updating_QMARK_.cljs$core$IFn$_invoke$arity$1(mc);
var G__48736 = false;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__48735,G__48736) : cljs.core.reset_BANG_.call(null,G__48735,G__48736));
});
monet.canvas.start_updating = (function monet$canvas$start_updating(mc){
var G__48739 = cljs.core.cst$kw$updating_QMARK_.cljs$core$IFn$_invoke$arity$1(mc);
var G__48740 = true;
return (cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__48739,G__48740) : cljs.core.reset_BANG_.call(null,G__48739,G__48740));
});
monet.canvas.restart = (function monet$canvas$restart(mc){
var G__48745_48749 = cljs.core.cst$kw$active.cljs$core$IFn$_invoke$arity$1(mc);
var G__48746_48750 = true;
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__48745_48749,G__48746_48750) : cljs.core.reset_BANG_.call(null,G__48745_48749,G__48746_48750));

var G__48747_48751 = cljs.core.cst$kw$last_DASH_frame_DASH_time.cljs$core$IFn$_invoke$arity$1(mc);
var G__48748_48752 = Date.now();
(cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2 ? cljs.core.reset_BANG_.cljs$core$IFn$_invoke$arity$2(G__48747_48751,G__48748_48752) : cljs.core.reset_BANG_.call(null,G__48747_48751,G__48748_48752));

return monet.canvas.draw_loop(mc);
});
