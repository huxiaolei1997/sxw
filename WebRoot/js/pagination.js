/*
 * pagination.js 2.0.7
 * A jQuery plugin to provide simple yet fully customisable pagination
 * https://github.com/superRaytin/paginationjs

 * Homepage: http://paginationjs.com
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
*/
!function(a, b) {
	function c(a) {
		throw new Error("Pagination: " + a)
	}
	function d(a) {
		a.dataSource || c('"dataSource" is required.'), "string" == typeof a.dataSource ? "undefined" == typeof a.totalNumber ? c('"totalNumber" is required.') : b.isNumeric(a.totalNumber) || c('"totalNumber" is incorrect. (Number)') : j.isObject(a.dataSource) && ("undefined" == typeof a.locator ? c('"dataSource" is an Object, please specify "locator".') : "string" == typeof a.locator || b.isFunction(a.locator) || c("" + a.locator + " is incorrect. (String | Function)"))
	}
	function e(a) {
		var c = [ "go", "previous", "next", "disable", "enable", "refresh", "show", "hide", "destroy" ];
		b.each(c, function(b, c) {
			a.off(i + c)
		}), a.data("pagination", {}), b(".paginationjs", a).remove()
	}
	function f(a, b) {
		return ("object" == (b = typeof a) ? null == a && "null" || Object.prototype.toString.call(a).slice(8, -1) : b).toLowerCase()
	}
	"undefined" == typeof b && c("Pagination requires jQuery.");
	var g = "pagination",
		h = "addHook",
		i = "__pagination-";
	b.fn.pagination && (g = "pagination2"), b.fn[g] = function(f) {
		if ("undefined" == typeof f) return this;
		var g = b(this),
			h = {
				initialize : function() {
					var a = this;
					if (g.data("pagination") || g.data("pagination", {}), a.callHook("beforeInit") !== !1) {
						g.data("pagination").initialized && b(".paginationjs", g).remove(), a.disabled = !!l.disabled;
						var c = a.model = {
							pageRange : l.pageRange,
							pageSize : l.pageSize
						};
						a.parseDataSource(l.dataSource, function(b) {
							if (a.sync = j.isArray(b), a.sync && (c.totalNumber = l.totalNumber = b.length), c.totalPage = a.getTotalPage(), !(l.hideWhenLessThanOnePage && c.totalPage <= 1)) {
								var d = a.render(!0);
								l.className && d.addClass(l.className), c.el = d, g["bottom" === l.position ? "append" : "prepend"](d), a.observer(), g.data("pagination").initialized = !0, a.callHook("afterInit", d)
							}
						})
					}
				},
				render : function(a) {
					var c = this,
						d = c.model,
						e = d.el || b('<div class="paginationjs"></div>'),
						f = a !== !0;
					c.callHook("beforeRender", f);
					var g = d.pageNumber || l.pageNumber,
						h = l.pageRange,
						i = d.totalPage,
						j = g - h,
						k = g + h;
					return k > i && (k = i, j = i - 2 * h, j = 1 > j ? 1 : j), 1 >= j && (j = 1, k = Math.min(2 * h + 1, i)), e.html(c.createTemplate({
							currentPage : g,
							pageRange : h,
							totalPage : i,
							rangeStart : j,
							rangeEnd : k
						})), c.callHook("afterRender", f), e
				},
				createTemplate : function(a) {
					var c,
						d,
						e = this,
						f = a.currentPage,
						g = a.totalPage,
						h = a.rangeStart,
						i = a.rangeEnd,
						j = l.totalNumber,
						k = l.showPrevious,
						m = l.showNext,
						n = l.showPageNumbers,
						o = l.showNavigator,
						p = l.showGoInput,
						q = l.showGoButton,
						r = l.pageLink,
						s = l.prevText,
						t = l.nextText,
						u = l.ellipsisText,
						v = l.goButtonText,
						w = l.classPrefix,
						x = l.activeClassName,
						y = l.disableClassName,
						z = l.ulClassName,
						A = b.isFunction(l.formatNavigator) ? l.formatNavigator() : l.formatNavigator,
						B = b.isFunction(l.formatGoInput) ? l.formatGoInput() : l.formatGoInput,
						C = b.isFunction(l.formatGoButton) ? l.formatGoButton() : l.formatGoButton,
						D = b.isFunction(l.autoHidePrevious) ? l.autoHidePrevious() : l.autoHidePrevious,
						E = b.isFunction(l.autoHideNext) ? l.autoHideNext() : l.autoHideNext,
						F = b.isFunction(l.header) ? l.header() : l.header,
						G = b.isFunction(l.footer) ? l.footer() : l.footer,
						H = "",
						I = '<input type="text" class="J-paginationjs-go-pagenumber">',
						J = '<input type="button" class="J-paginationjs-go-button" value="' + v + '">';
					if (F && (c = e.replaceVariables(F, {
							currentPage : f,
							totalPage : g,
							totalNumber : j
						}), H += c), k || n || m) {
						if (H += '<div class="paginationjs-pages">', H += z ? '<ul class="' + z + '">' : "<ul>", k && (1 === f ? D || (H += '<li class="' + w + "-prev " + y + '"><a>' + s + "</a></li>") : H += '<li class="' + w + '-prev J-paginationjs-previous" data-num="' + (f - 1) + '" title="Previous page"><a href="' + r + '">' + s + "</a></li>"), n) {
							if (3 >= h)
								for (d = 1; h > d; d++) H += d == f ? '<li class="' + w + "-page J-paginationjs-page " + x + '" data-num="' + d + '"><a>' + d + "</a></li>" : '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>";
							else l.showFirstOnEllipsisShow && (H += '<li class="' + w + "-page " + w + '-first J-paginationjs-page" data-num="1"><a href="' + r + '">1</a></li>'), H += '<li class="' + w + "-ellipsis " + y + '"><a>' + u + "</a></li>";
							for (d = h; i >= d; d++) H += d == f ? '<li class="' + w + "-page J-paginationjs-page " + x + '" data-num="' + d + '"><a>' + d + "</a></li>" : '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>";
							if (i >= g - 2)
								for (d = i + 1; g >= d; d++) H += '<li class="' + w + '-page J-paginationjs-page" data-num="' + d + '"><a href="' + r + '">' + d + "</a></li>";
							else H += '<li class="' + w + "-ellipsis " + y + '"><a>' + u + "</a></li>", l.showLastOnEllipsisShow && (H += '<li class="' + w + "-page " + w + '-last J-paginationjs-page" data-num="' + g + '"><a href="' + r + '">' + g + "</a></li>")
						}
						m && (f == g ? E || (H += '<li class="' + w + "-next " + y + '"><a>' + t + "</a></li>") : H += '<li class="' + w + '-next J-paginationjs-next" data-num="' + (f + 1) + '" title="Next page"><a href="' + r + '">' + t + "</a></li>"), H += "</ul></div>"
					}
					return o && A && (c = e.replaceVariables(A, {
							currentPage : f,
							totalPage : g,
							totalNumber : j
						}), H += '<div class="' + w + '-nav J-paginationjs-nav">' + c + "</div>"), p && B && (c = e.replaceVariables(B, {
							currentPage : f,
							totalPage : g,
							totalNumber : j,
							input : I
						}), H += '<div class="' + w + '-go-input">' + c + "</div>"), q && C && (c = e.replaceVariables(C, {
							currentPage : f,
							totalPage : g,
							totalNumber : j,
							button : J
						}), H += '<div class="' + w + '-go-button">' + c + "</div>"), G && (c = e.replaceVariables(G, {
							currentPage : f,
							totalPage : g,
							totalNumber : j
						}), H += c), H
				},
				go : function(a, c) {
					function d(a) {
						if (e.callHook("beforePaging", h) === !1) return !1;
						if (f.direction = "undefined" == typeof f.pageNumber ? 0 : h > f.pageNumber ? 1 : -1, f.pageNumber = h, e.render(), e.disabled && !e.sync && e.enable(), g.data("pagination").model = f, b.isFunction(l.formatResult)) {
							var d = b.extend(!0, [], a);
							j.isArray(a = l.formatResult(d)) || (a = d)
						}
						g.data("pagination").currentPageData = a, e.doCallback(a, c), e.callHook("afterPaging", h), 1 == h && e.callHook("afterIsFirstPage"), h == f.totalPage && e.callHook("afterIsLastPage")
					}
					var e = this,
						f = e.model;
					if (!e.disabled) {
						var h = a,
							i = l.pageSize,
							k = f.totalPage;
						if (h = parseInt(h), !(!h || 1 > h || h > k)) {
							if (e.sync) return void d(e.getDataSegment(h));
							var m = {},
								n = l.alias || {};
							m[n.pageSize ? n.pageSize : "pageSize"] = i, m[n.pageNumber ? n.pageNumber : "pageNumber"] = h;
							var o = {
								type : "get",
								cache : !1,
								data : {},
								contentType : "application/x-www-form-urlencoded; charset=UTF-8",
								dataType : "json",
								async : !0
							};
							b.extend(!0, o, l.ajax), b.extend(o.data || {}, m), o.url = l.dataSource, o.success = function(a) {
								d(e.filterDataByLocator(a))
							}, o.error = function(a, b, c) {
								l.formatAjaxError && l.formatAjaxError(a, b, c), e.enable()
							}, e.disable(), b.ajax(o)
						}
					}
				},
				doCallback : function(a, c) {
					var d = this,
						e = d.model;
					b.isFunction(c) ? c(a, e) : b.isFunction(l.callback) && l.callback(a, e)
				},
				destroy : function() {
					this.callHook("beforeDestroy") !== !1 && (this.model.el.remove(), g.off(), b("#paginationjs-style").remove(), this.callHook("afterDestroy"))
				},
				previous : function(a) {
					this.go(this.model.pageNumber - 1, a)
				},
				next : function(a) {
					this.go(this.model.pageNumber + 1, a)
				},
				disable : function() {
					var a = this,
						b = a.sync ? "sync" : "async";
					a.callHook("beforeDisable", b) !== !1 && (a.disabled = !0, a.model.disabled = !0, a.callHook("afterDisable", b))
				},
				enable : function() {
					var a = this,
						b = a.sync ? "sync" : "async";
					a.callHook("beforeEnable", b) !== !1 && (a.disabled = !1, a.model.disabled = !1, a.callHook("afterEnable", b))
				},
				refresh : function(a) {
					this.go(this.model.pageNumber, a)
				},
				show : function() {
					var a = this;
					a.model.el.is(":visible") || a.model.el.show()
				},
				hide : function() {
					var a = this;
					a.model.el.is(":visible") && a.model.el.hide()
				},
				replaceVariables : function(a, b) {
					var c;
					for (var d in b) {
						var e = b[d],
							f = new RegExp("<%=\\s*" + d + "\\s*%>", "img");
						c = (c || a).replace(f, e)
					}
					return c
				},
				getDataSegment : function(a) {
					var b = l.pageSize,
						c = l.dataSource,
						d = l.totalNumber,
						e = b * (a - 1) + 1,
						f = Math.min(a * b, d);
					return c.slice(e - 1, f)
				},
				getTotalPage : function() {
					return Math.ceil(l.totalNumber / l.pageSize)
				},
				getLocator : function(a) {
					var d;
					return "string" == typeof a ? d = a : b.isFunction(a) ? d = a() : c('"locator" is incorrect. (String | Function)'), d
				},
				filterDataByLocator : function(a) {
					var d,
						e = this.getLocator(l.locator);
					if (j.isObject(a)) {
						try {
							b.each(e.split("."), function(b, c) {
								d = (d ? d : a)[c]
							})
						} catch (f) {}
						d ? j.isArray(d) || c("dataSource." + e + " must be an Array.") : c("dataSource." + e + " is undefined.")
					}
					return d || a
				},
				parseDataSource : function(a, d) {
					var e = this,
						f = arguments;
					j.isObject(a) ? d(l.dataSource = e.filterDataByLocator(a)) : j.isArray(a) ? d(l.dataSource = a) : b.isFunction(a) ? l.dataSource(function(a) {
						b.isFunction(a) && c('Unexpect parameter of the "done" Function.'), f.callee.call(e, a, d)
					}) : "string" == typeof a ? (/^https?|file:/.test(a) && (l.ajaxDataType = "jsonp"), d(a)) : c('Unexpect data type of the "dataSource".')
				},
				callHook : function(c) {
					var d,
						e = g.data("pagination"),
						f = Array.prototype.slice.apply(arguments);
					return f.shift(), l[c] && b.isFunction(l[c]) && l[c].apply(a, f) === !1 && (d = !1), e.hooks && e.hooks[c] && b.each(e.hooks[c], function(b, c) {
							c.apply(a, f) === !1 && (d = !1)
						}), d !== !1
				},
				observer : function() {
					var a = this,
						d = a.model.el;
					g.on(i + "go", function(d, e, f) {
						e = parseInt(b.trim(e)), e && (b.isNumeric(e) || c('"pageNumber" is incorrect. (Number)'), a.go(e, f))
					}), d.delegate(".J-paginationjs-page", "click", function(c) {
						var d = b(c.currentTarget),
							e = b.trim(d.attr("data-num"));
						return !e || d.hasClass(l.disableClassName) || d.hasClass(l.activeClassName) ? void 0 : a.callHook("beforePageOnClick", c, e) === !1 ? !1 : (a.go(e), a.callHook("afterPageOnClick", c, e), l.pageLink ? void 0 : !1)
					}), d.delegate(".J-paginationjs-previous", "click", function(c) {
						var d = b(c.currentTarget),
							e = b.trim(d.attr("data-num"));
						return e && !d.hasClass(l.disableClassName) ? a.callHook("beforePreviousOnClick", c, e) === !1 ? !1 : (a.go(e), a.callHook("afterPreviousOnClick", c, e), l.pageLink ? void 0 : !1) : void 0
					}), d.delegate(".J-paginationjs-next", "click", function(c) {
						var d = b(c.currentTarget),
							e = b.trim(d.attr("data-num"));
						return e && !d.hasClass(l.disableClassName) ? a.callHook("beforeNextOnClick", c, e) === !1 ? !1 : (a.go(e), a.callHook("afterNextOnClick", c, e), l.pageLink ? void 0 : !1) : void 0
					}), d.delegate(".J-paginationjs-go-button", "click", function() {
						var c = b(".J-paginationjs-go-pagenumber", d).val();
						return a.callHook("beforeGoButtonOnClick", event, c) === !1 ? !1 : (g.trigger(i + "go", c), void a.callHook("afterGoButtonOnClick", event, c))
					}), d.delegate(".J-paginationjs-go-pagenumber", "keyup", function(c) {
						if (13 === c.which) {
							var e = b(c.currentTarget).val();
							if (a.callHook("beforeGoInputOnEnter", c, e) === !1) return !1;
							g.trigger(i + "go", e), b(".J-paginationjs-go-pagenumber", d).focus(), a.callHook("afterGoInputOnEnter", c, e)
						}
					}), g.on(i + "previous", function(b, c) {
						a.previous(c)
					}), g.on(i + "next", function(b, c) {
						a.next(c)
					}), g.on(i + "disable", function() {
						a.disable()
					}), g.on(i + "enable", function() {
						a.enable()
					}), g.on(i + "refresh", function(b, c) {
						a.refresh(c)
					}), g.on(i + "show", function() {
						a.show()
					}), g.on(i + "hide", function() {
						a.hide()
					}), g.on(i + "destroy", function() {
						a.destroy()
					}), l.triggerPagingOnInit && g.trigger(i + "go", Math.min(l.pageNumber, a.model.totalPage))
				}
			};
		if (g.data("pagination") && g.data("pagination").initialized === !0) {
			if (b.isNumeric(f)) return g.trigger.call(this, i + "go", f, arguments[1]), this;
			if ("string" == typeof f) {
				var k = Array.prototype.slice.apply(arguments);
				switch (k[0] = i + k[0], f) {
				case "previous":
				case "next":
				case "go":
				case "disable":
				case "enable":
				case "refresh":
				case "show":
				case "hide":
				case "destroy":
					g.trigger.apply(this, k);
					break;case "getSelectedPageNum":
					return g.data("pagination").model ? g.data("pagination").model.pageNumber : g.data("pagination").attributes.pageNumber;case "getTotalPage":
					return g.data("pagination").model.totalPage;case "getSelectedPageData":
					return g.data("pagination").currentPageData;case "isDisabled":
					return g.data("pagination").model.disabled === !0;default:
					c("Pagination do not provide action: " + f)
				}
				return this
			}
			e(g)
		} else j.isObject(f) || c("Illegal options");
		var l = b.extend({}, arguments.callee.defaults, f);
		return d(l), h.initialize(), this
	}, b.fn[g].defaults = {
		totalNumber : 1,
		pageNumber : 1,
		pageSize : 10,
		pageRange : 2,
		showPrevious : !0,
		showNext : !0,
		showPageNumbers : !0,
		showNavigator : !1,
		showGoInput : !1,
		showGoButton : !1,
		pageLink : "",
		prevText : "&laquo;",
		nextText : "&raquo;",
		ellipsisText : "...",
		goButtonText : "Go",
		classPrefix : "paginationjs",
		activeClassName : "active",
		disableClassName : "disabled",
		inlineStyle : !0,
		formatNavigator : "<%= currentPage %> / <%= totalPage %>",
		formatGoInput : "<%= input %>",
		formatGoButton : "<%= button %>",
		position : "bottom",
		autoHidePrevious : !1,
		autoHideNext : !1,
		triggerPagingOnInit : !0,
		hideWhenLessThanOnePage : !1,
		showFirstOnEllipsisShow : !0,
		showLastOnEllipsisShow : !0,
		callback : function() {}
	}, b.fn[h] = function(a, d) {
		arguments.length < 2 && c("Missing argument."), b.isFunction(d) || c("callback must be a function.");
		var e = b(this),
			f = e.data("pagination");
		f || (e.data("pagination", {}), f = e.data("pagination")), !f.hooks && (f.hooks = {}), f.hooks[a] = f.hooks[a] || [], f.hooks[a].push(d)
	}, b[g] = function(a, d) {
		arguments.length < 2 && c("Requires two parameters.");
		var e;
		return e = "string" != typeof a && a instanceof jQuery ? a : b(a), e.length ? (e.pagination(d), e) : void 0
	};
	var j = {};
	b.each([ "Object", "Array" ], function(a, b) {
		j["is" + b] = function(a) {
			return f(a) === b.toLowerCase()
		}
	}), "function" == typeof define && define.amd && define(function() {
		return b
	})
}(this, window.jQuery);