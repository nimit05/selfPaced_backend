(this.webpackJsonppuranibooks_frontend = this.webpackJsonppuranibooks_frontend || []).push([
	[ 0 ],
	{
		10: function(e, t, a) {
			e.exports = a.p + 'static/media/bookcover.74dcbe09.jpg';
		},
		16: function(e, t, a) {
			e.exports = a.p + 'static/media/propic.5ca40737.svg';
		},
		19: function(e, t, a) {
			e.exports = a.p + 'static/media/cart.ba058549.svg';
		},
		20: function(e, t, a) {
			e.exports = a.p + 'static/media/lib.4e53e8d4.svg';
		},
		21: function(e, t, a) {
			e.exports = a.p + 'static/media/plus.452f3397.svg';
		},
		36: function(e, t, a) {
			e.exports = a.p + 'static/media/name-logo.6e230433.png';
		},
		37: function(e, t, a) {
			e.exports = a.p + 'static/media/money.5ce23e72.svg';
		},
		38: function(e, t, a) {
			e.exports = a.p + 'static/media/icon.1d4f583c.svg';
		},
		40: function(e, t, a) {
			e.exports = a.p + 'static/media/info.2508df20.svg';
		},
		41: function(e, t, a) {
			e.exports = a.p + 'static/media/bin.650cdc57.svg';
		},
		42: function(e, t, a) {
			e.exports = a.p + 'static/media/eye.9ecb58e5.svg';
		},
		47: function(e, t, a) {
			e.exports = a(68);
		},
		52: function(e, t, a) {},
		68: function(e, t, a) {
			'use strict';
			a.r(t);
			var n = a(0),
				r = a.n(n),
				c = a(28),
				o = a.n(c),
				i = (a(52), a(2)),
				l = a(1),
				s = a(4),
				u = a(3),
				m = a(36),
				d = a.n(m),
				p = a(19),
				h = a.n(p),
				f = a(20),
				v = a.n(f),
				E = a(21),
				_ = a.n(E),
				g = a(16),
				b = a.n(g),
				y = a(37),
				N = a.n(y),
				j = a(46),
				k = function() {
					var e = Object(n.useRef)(null),
						t = Object(n.useState)(!1),
						a = Object(j.a)(t, 2),
						r = a[0],
						c = a[1],
						o = function(t) {
							e.current && !e.current.contains(t.target) && c(!1);
						},
						i = function(e) {
							'Escape' == e.key && c(!1);
						};
					return (
						Object(n.useEffect)(
							function() {
								return (
									document.addEventListener('click', o, !0),
									document.addEventListener('keydown', i, !0),
									function() {
										document.removeEventListener('click', o, !0),
											document.removeEventListener('keydown', i, !0);
									}
								);
							},
							[ e ]
						),
						{ open: r, setOpen: c, ref: e }
					);
				},
				O = a(23),
				C = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).findName = function() {
								var e = document.getElementById('main_search_inp').value;
								if ('' === e)
									return (
										(n.state.searchNames = []),
										void n.setState(function() {
											return { serachNames: [] };
										})
									);
								var t = n.state.allItemsName.filter(function(t) {
									return t.indexOf(e) > -1;
								});
								(n.state.searchNames = t),
									n.setState(function() {
										return { serachNames: t };
									});
							}),
							(n.responseGoogle = function(e) {
								fetch('/api/register/google', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ tokenId: e.tokenId })
								})
									.then(function(e) {
										return e.json();
									})
									.then(function(e) {
										e.email ? (window.location.href = '/') : e.error && alert('error occured');
									});
							}),
							fetch('/api/user')
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return {
													islogin: !0,
													username: e.username,
													coins: e.Coins,
													pro_pic: e.pro_img
												};
											});
								}),
							(n.state = {
								islogin: !1,
								username: null,
								pro_pic: null,
								allItemsName: [],
								searchNames: []
							}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'findbook',
								value: function() {
									null != document.getElementById('main_search_inp').value &&
										document
											.getElementById('main_search_inp')
											.addEventListener('keyup', function(e) {
												13 == e.keyCode &&
													(e.preventDefault(),
													document.getElementById('main_search_inp').value.trim()
														? (window.location.href = '/Search_items/'.concat(
																document.getElementById('main_search_inp').value.trim()
															))
														: (window.location.href = '/'));
											});
								}
							}
						]),
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'header_cont' },
										r.a.createElement(
											'div',
											{
												className: 'header_left',
												onClick: function() {
													window.location.href = '/';
												}
											},
											r.a.createElement('img', { src: d.a, alt: ' ' })
										),
										r.a.createElement(
											'div',
											{ className: 'parent search_con' },
											r.a.createElement('input', {
												onChange: this.findName,
												id: 'main_search_inp',
												placeholder: 'Search',
												type: 'text',
												onClick: this.findbook
											}),
											r.a.createElement(
												'div',
												{ className: 'searchRe' },
												this.state.searchNames.map(function(e, t) {
													return !(t > 5) && r.a.createElement('li', { key: t }, e);
												})
											)
										),
										r.a.createElement(
											'div',
											{ className: 'user_btn_con frse' },
											this.state.islogin
												? r.a.createElement(
														'div',
														{ className: 'frse logindet' },
														r.a.createElement(
															'div',
															{ class: 'tooltip' },
															' ',
															r.a.createElement('img', {
																onClick: function() {
																	window.location.href = '/sell-your-product';
																},
																src: _.a,
																alt: ' '
															}),
															r.a.createElement(
																'span',
																{ class: 'tooltiptext' },
																'Sell Items'
															)
														),
														r.a.createElement(
															'div',
															{
																class: 'tooltip',
																onClick: function() {
																	window.location.href = '/myCart';
																}
															},
															' ',
															r.a.createElement('img', { src: h.a, alt: ' ' }),
															r.a.createElement('span', { class: 'tooltiptext' }, 'Cart')
														),
														r.a.createElement(
															'div',
															{
																class: 'tooltip',
																onClick: function() {
																	window.location.href = '/My-Library';
																}
															},
															' ',
															r.a.createElement('img', { src: v.a, alt: ' ' }),
															r.a.createElement(
																'span',
																{ class: 'tooltiptext' },
																'My Library'
															)
														),
														r.a.createElement(
															'div',
															{ class: 'tooltip' },
															' ',
															r.a.createElement(
																'div',
																{ className: 'profile' },
																r.a.createElement(
																	w,
																	null,
																	r.a.createElement(
																		T,
																		{
																			icon: r.a.createElement('img', {
																				id: 'pro_pic',
																				src: this.state.pro_pic
																					? this.state.pro_pic
																					: b.a,
																				alt: ' '
																			}),
																			coins: this.state.coins
																		},
																		r.a.createElement(I, null)
																	)
																)
															)
														)
													)
												: r.a.createElement(
														'div',
														{ className: 'fr' },
														r.a.createElement(
															'button',
															{
																id: 'reg_btn',
																onClick: function() {
																	window.location.href = '/regis.html';
																}
															},
															'Register/Login'
														),
														r.a.createElement(O.GoogleLogin, {
															clientId:
																'1059529825547-aplj58mp67dhb9j5smat7g5jjf3flgl2.apps.googleusercontent.com',
															buttonText: 'Continue with Google',
															style: { backgroundColor: 'blue' },
															className: 'gbtn',
															onSuccess: this.responseGoogle,
															onFailure: function() {
																alert('Error in google login ');
															},
															cookiePolicy: 'single_host_origin'
														})
													)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				w = function(e) {
					return r.a.createElement(
						'nav',
						{ className: 'navbar' },
						r.a.createElement('ul', { className: 'navbar-nav' }, e.children)
					);
				},
				T = function(e) {
					var t = k(!1),
						a = t.ref,
						n = t.open,
						c = t.setOpen;
					return r.a.createElement(
						'li',
						{
							className: 'nav-item',
							onClick: function() {
								c(function(e) {
									return !e;
								});
							},
							id: 'nav-item'
						},
						r.a.createElement(
							'span',
							{ className: 'name', id: 'coins' },
							r.a.createElement('img', { src: N.a, alt: '' }),
							e.coins
						),
						r.a.createElement('a', { href: '#', className: 'icon-button' }, e.icon),
						n && r.a.createElement('div', { ref: a, className: 'ref' }, e.children)
					);
				},
				I = function() {
					function e(e) {
						return r.a.createElement('a', { className: 'menu-item' }, e.children);
					}
					return r.a.createElement(
						'div',
						{ className: 'dropdown' },
						r.a.createElement(
							'div',
							{
								onClick: function() {
									return (window.location.href = '/myprofile');
								}
							},
							r.a.createElement(
								e,
								null,
								r.a.createElement('span', { className: 'span_dd' }, 'My Profile')
							)
						),
						r.a.createElement('div', null),
						r.a.createElement(
							'div',
							{
								onClick: function() {
									window.location.href = '/myorders';
								}
							},
							r.a.createElement(e, null, r.a.createElement('span', { className: 'span_dd' }, 'My orders'))
						),
						r.a.createElement(
							e,
							null,
							r.a.createElement(
								'span',
								{
									onClick: function() {
										fetch('/api/login/out', { method: 'DELETE' }), window.location.reload();
									},
									className: 'span_dd'
								},
								'Log Out'
							)
						)
					);
				},
				P = C,
				S = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(i.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement('div', { className: 'MainHeader' });
								}
							}
						]),
						a
					);
				})(r.a.Component),
				B = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(i.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement('div', { className: 'Middle' });
								}
							}
						]),
						a
					);
				})(r.a.Component),
				A = a(5),
				x = a.n(A),
				V = a(6),
				F = a(10),
				L = a.n(F),
				D = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).loaded = function(e) {
								document.getElementById(e).style.display = 'block';
							}),
							(n.addToCart = function(e) {
								!1 === n.state.addedToCart &&
									(function() {
										M.apply(this, arguments);
									})('/api/products/AddToCart', { refrenceId: e });
								n.setState(function(e) {
									return { addedToCart: !0 };
								});
							}),
							console.log(n.props.isAdded),
							(n.state = { addedToCart: n.props.isAdded }),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e,
										t = this;
									return (
										(e = this.state.addedToCart
											? { backgroundColor: 'green' }
											: { backgroundColor: '#fa255e' }),
										r.a.createElement(
											'div',
											{ className: 'productcont', id: this.props.refId },
											r.a.createElement(
												'div',
												{ className: 'tag' },
												r.a.createElement('strong', null, this.props.tag)
											),
											r.a.createElement(
												'div',
												{
													className: 'product_img',
													onClick: function() {
														window.location.href = '/productpage/'.concat(t.props.refId);
													}
												},
												r.a.createElement('img', {
													className: 'bookcover',
													onLoad: function() {
														t.loaded(t.props.refId);
													},
													src: this.props.bookimg ? this.props.bookimg : L.a,
													alt: this.props.title
												})
											),
											r.a.createElement(
												'div',
												{ className: 'product_body' },
												r.a.createElement('h3', null, this.props.title),
												r.a.createElement('h6', null, '(', this.props.stitle, ')'),
												r.a.createElement('p', null, this.props.short_des),
												r.a.createElement(
													'h1',
													null,
													this.props.price,
													' ',
													r.a.createElement('span', null, 'coins')
												),
												r.a.createElement(
													'button',
													{
														onClick: function() {
															t.addToCart(t.props.refId);
														},
														className: 'add_to_cart_btn',
														style: e
													},
													this.state.addedToCart ? 'Added To Cart' : 'Add To Cart'
												)
											)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			function M() {
				return (M = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n,
							r = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = r.length > 0 && void 0 !== r[0] ? r[0] : ''),
											(a = r.length > 1 && void 0 !== r[1] ? r[1] : {}),
											(e.next = 4),
											fetch(t, {
												method: 'POST',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer',
												body: JSON.stringify(a)
											})
										);
									case 4:
										return (n = e.sent), e.abrupt('return', n.json());
									case 6:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var R = (function(e) {
				Object(s.a)(a, e);
				var t = Object(u.a)(a);
				function a(e) {
					var n;
					return (
						Object(i.a)(this, a),
						((n = t.call(this, e)).state = { proArray: [], addedtocartArr: [] }),
						G('/api/user/CartRefId')
							.then(function(e) {
								console.log(e),
									n.setState(function() {
										return { addedtocartArr: e };
									}),
									G('/api/products').then(function(e) {
										console.log(e),
											n.setState(function() {
												return { proArray: e.products };
											});
									});
							})
							.catch(function() {
								G('/api/products').then(function(e) {
									console.log(e),
										n.setState(function() {
											return { proArray: e.products };
										});
								});
							}),
						n
					);
				}
				return (
					Object(l.a)(a, [
						{
							key: 'render',
							value: function() {
								var e = this;
								return r.a.createElement(
									'div',
									{ className: 'CateCon' },
									r.a.createElement(
										'div',
										{ className: 'cate_head' },
										r.a.createElement('h1', null, 'BEST SELLER'),
										r.a.createElement('h3', null, 'See More ->')
									),
									r.a.createElement(
										'div',
										{ className: 'cate_body' },
										this.state.proArray.map(function(t) {
											var a,
												n = e.state.addedtocartArr.indexOf(t.refrenceId);
											return (
												console.log(n),
												(a = -1 != n),
												r.a.createElement(D, {
													title: t.title,
													tag: t.tag,
													stitle: t.s_title,
													short_des: t.short_des,
													price: t.Value,
													refId: t.refrenceId,
													isAdded: a,
													bookimg: '/covers/'.concat(t.cover_img)
												})
											);
										})
									)
								);
							}
						}
					]),
					a
				);
			})(r.a.Component);
			function G() {
				return z.apply(this, arguments);
			}
			function z() {
				return (z = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = n.length > 0 && void 0 !== n[0] ? n[0] : ''),
											n.length > 1 && void 0 !== n[1] ? n[1] : {},
											(e.next = 4),
											fetch(t, {
												method: 'GET',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer'
											})
										);
									case 4:
										return (a = e.sent), e.abrupt('return', a.json());
									case 6:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var J = a(38),
				H = a.n(J),
				Y = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).responseGoogle = function(e) {
								fetch('/api/register/google', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({ tokenId: e.tokenId })
								})
									.then(function(e) {
										return e.json();
									})
									.then(function(e) {
										e.email && (window.location.href = '/');
									});
							}),
							fetch('/api/user')
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return { islogin: !0 };
											});
								}),
							(n.state = { islogin: !1 }),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'base_header' },
										r.a.createElement(
											'div',
											{ className: 'img_cont_bh' },
											this.state.islogin
												? r.a.createElement(
														'div',
														{ className: 'icon_bh' },
														' ',
														r.a.createElement('img', {
															onClick: function() {
																window.location.href = '/';
															},
															className: 'home_svg ',
															src: H.a,
															alt: ' '
														}),
														r.a.createElement('img', {
															onClick: function() {
																window.location.href = '/myCart';
															},
															src: h.a,
															alt: ' '
														}),
														r.a.createElement('img', {
															onClick: function() {
																window.location.href = '/sell-your-product';
															},
															src: _.a,
															alt: ' '
														}),
														r.a.createElement('img', {
															onClick: function() {
																window.location.href = '/My-Library';
															},
															src: v.a,
															alt: ' '
														}),
														r.a.createElement('img', {
															onClick: function() {
																window.location.href = '/myprofile';
															},
															src: b.a,
															alt: ' '
														})
													)
												: r.a.createElement(
														'div',
														{ className: 'reg_btn_div' },
														r.a.createElement(
															'button',
															{
																id: 'reg_btn_bh',
																onClick: function() {
																	window.location.href = '/regis.html';
																}
															},
															'Register/Login'
														),
														r.a.createElement(O.GoogleLogin, {
															clientId:
																'1059529825547-aplj58mp67dhb9j5smat7g5jjf3flgl2.apps.googleusercontent.com',
															buttonText: 'Continue with Google',
															style: { backgroundColor: 'blue' },
															className: 'gbtn',
															onSuccess: this.responseGoogle,
															onFailure: function() {
																alert('Error in google login ');
															},
															cookiePolicy: 'single_host_origin'
														})
													)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				U = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { proArray: [], addedtocartArr: [] }),
							$('/api/user/CartRefId')
								.then(function(e) {
									console.log(e),
										n.setState(function() {
											return { addedtocartArr: e };
										}),
										$('/api/products').then(function(e) {
											console.log(e),
												n.setState(function() {
													return { proArray: e.products };
												});
										});
								})
								.catch(function() {
									$('/api/products').then(function(e) {
										console.log(e),
											n.setState(function() {
												return { proArray: e.products };
											});
									});
								}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										null,
										r.a.createElement('h1', null, 'Fresh Arrivals'),
										r.a.createElement(
											'div',
											{ className: 'cont_for_product' },
											this.state.proArray.map(function(t) {
												var a,
													n = e.state.addedtocartArr.indexOf(t.refrenceId);
												return (
													console.log(n),
													(a = -1 != n),
													r.a.createElement(D, {
														title: t.title,
														tag: t.tag,
														stitle: t.s_title,
														short_des: t.short_des,
														price: t.Value,
														refId: t.refrenceId,
														isAdded: a,
														bookimg: 'covers/'.concat(t.cover_img)
													})
												);
											})
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			function $() {
				return K.apply(this, arguments);
			}
			function K() {
				return (K = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = n.length > 0 && void 0 !== n[0] ? n[0] : ''),
											n.length > 1 && void 0 !== n[1] ? n[1] : {},
											(e.next = 4),
											fetch(t, {
												method: 'GET',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer'
											})
										);
									case 4:
										return (a = e.sent), e.abrupt('return', a.json());
									case 6:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var W = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(i.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'HomePage' },
										r.a.createElement(S, null),
										r.a.createElement(B, null),
										r.a.createElement(U, null),
										r.a.createElement(Y, null)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				q = a(43),
				Q = a(13),
				X = a(25),
				Z = a(17),
				ee = a(24),
				te = a(39),
				ae = a.n(te),
				ne = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n, r;
						return (
							Object(i.a)(this, a),
							((r = t.call(this, e)).alugobi = function() {
								r.setState(function(e) {
									return { open: !e.open };
								});
							}),
							(r.buy = Object(V.a)(
								x.a.mark(function e() {
									var t, a;
									return x.a.wrap(function(e) {
										for (;;)
											switch ((e.prev = e.next)) {
												case 0:
													return (
														(t = { refrenceId: r.props.match.params.refId }),
														(e.next = 3),
														ie('/api/products/Buy', t)
													);
												case 3:
													(a = e.sent), console.log(a), a && alert('buyed');
												case 6:
												case 'end':
													return e.stop();
											}
									}, e);
								})
							)),
							(r.addToCart = function(e) {
								ie('/api/products/AddToCart', { refrenceId: e });
							}),
							(r.state = ((n = {
								title: null,
								s_title: null,
								Value: null,
								cover_img: null,
								description: null,
								refId: null,
								inLibrary: !0,
								id: null,
								tag: null,
								rating: null,
								open: !1
							}),
							Object(Z.a)(n, 'cover_img', null),
							Object(Z.a)(n, 'star_Value', null),
							Object(Z.a)(n, 'sample_file', null),
							n)),
							r
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'SetRating',
								value: function(e) {
									this.setState(function() {
										return { star_Value: e };
									});
								}
							}
						]),
						Object(l.a)(a, [
							{
								key: 'componentDidMount',
								value: (function() {
									var e = Object(V.a)(
										x.a.mark(function e() {
											var t,
												a,
												n = this;
											return x.a.wrap(
												function(e) {
													for (;;)
														switch ((e.prev = e.next)) {
															case 0:
																return (
																	(t = this.props.match.params.refId),
																	fetch('/api/products/specific/'.concat(t))
																		.then(function(e) {
																			return e.json();
																		})
																		.then(function(e) {
																			console.log(e),
																				e &&
																					n.setState(function() {
																						var t;
																						return (
																							(t = {
																								id: e.id,
																								title: e.title,
																								s_title: e.s_title,
																								Value: e.Value,
																								cover_img: e.cover_img,
																								description:
																									e.Description,
																								refId: e.refrenceId,
																								tag: e.tag,
																								rating: e.rating
																							}),
																							Object(Z.a)(
																								t,
																								'cover_img',
																								e.cover_img
																							),
																							Object(Z.a)(
																								t,
																								'sample_file',
																								e.sample_pro
																							),
																							t
																						);
																					});
																		}),
																	(e.next = 4),
																	fetch('/api/products/search_item/'.concat(t))
																);
															case 4:
																return (a = e.sent), (e.next = 7), a.json();
															case 7:
																1 == e.sent &&
																	this.setState(function() {
																		return { inLibrary: !1 };
																	});
															case 9:
															case 'end':
																return e.stop();
														}
												},
												e,
												this
											);
										})
									);
									return function() {
										return e.apply(this, arguments);
									};
								})()
							},
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										null,
										r.a.createElement(
											'div',
											{ className: 'main_body_pro_page' },
											r.a.createElement(re, { cover_img: this.state.cover_img }),
											r.a.createElement(ce, {
												title: this.state.title,
												s_title: this.state.s_title,
												Value: this.state.Value,
												description: this.state.description,
												buy: this.buy,
												refId: this.state.refId,
												addToCart: this.addToCart,
												inLibrary: this.state.inLibrary,
												id: this.state.id,
												tag: this.state.tag,
												rating: this.state.rating,
												cover_img: '/covers/'.concat(this.state.cover_img),
												sample_file: this.state.sample_file
											})
										),
										r.a.createElement('hr', null),
										r.a.createElement(
											'div',
											{ className: 'review_pp_heading' },
											r.a.createElement('h1', null, 'Reviews About Product'),
											r.a.createElement(
												'button',
												{ className: 'modal_btn', onClick: this.alugobi },
												'Post your review'
											),
											this.state.id &&
												r.a.createElement(oe, {
													pro_id: this.state.id,
													rating: this.state.rating
												})
										),
										r.a.createElement(
											ae.a,
											{
												isOpen: this.state.open,
												className: 'modal',
												contentLabel: 'Selected Option',
												onRequestClose: this.alugobi
											},
											r.a.createElement(
												'div',
												{ className: 'pic_modal' },
												r.a.createElement('img', {
													src: '/covers/'.concat(this.state.cover_img),
													alt: ' '
												}),
												r.a.createElement(
													'div',
													{ className: 'modal_title' },
													this.state.title,
													' - ',
													this.state.s_title
												),
												r.a.createElement(
													'div',
													null,
													r.a.createElement(
														'h2',
														{ className: 'rate_modal' },
														'Rate Product'
													),
													r.a.createElement(
														'div',
														{ className: 'star_cont' },
														Object(X.a)(Array(5)).map(function(t, a) {
															var n = a + 1;
															return r.a.createElement(
																'label',
																null,
																r.a.createElement('input', {
																	className: 'inp',
																	type: 'radio',
																	value: n,
																	onClick: function() {
																		e.SetRating(n);
																	}
																}),
																r.a.createElement(ee.a, {
																	color:
																		n <= e.state.star_Value ? '#ffc107' : '#D3D3D3',
																	className: 'star',
																	size: 20
																})
															);
														})
													)
												),
												r.a.createElement(
													'div',
													{ className: 'review_body' },
													r.a.createElement(
														'h2',
														{ className: 'rate_modal' },
														'Post Your Review'
													),
													r.a.createElement('input', {
														type: 'text',
														placeholder: 'Write your review about product',
														id: 'body_input'
													})
												),
												r.a.createElement(
													'div',
													{ className: 'submit_div' },
													r.a.createElement(
														'button',
														{
															className: 'submit_modal',
															onClick: function() {
																e.alugobi(),
																	ie('/api/review', {
																		comment: document.getElementById('body_input')
																			.value,
																		rating: e.state.star_Value,
																		productId: e.state.id
																	}).then(function(e) {
																		e || alert('internal error');
																	});
															}
														},
														'Submit'
													)
												)
											)
										),
										r.a.createElement('hr', null),
										r.a.createElement(R, null)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				re = function(e) {
					return r.a.createElement(
						'div',
						{ className: 'Main_BI' },
						r.a.createElement('img', {
							className: 'product_img_pp',
							src: '/covers/'.concat(e.cover_img),
							alt: ' '
						})
					);
				},
				ce = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { inLibrary: !0, rating: null }),
							ie('/api/products/search_item', { id: n.props.id }).then(function(e) {
								e &&
									n.setState(function() {
										return { inLibrary: !1 };
									});
							}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'Main_CT' },
										r.a.createElement(
											'div',
											null,
											this.props.title,
											r.a.createElement(
												'div',
												{ className: 'author' },
												r.a.createElement('span', { className: 'by' }, 'By'),
												' ',
												this.props.s_title,
												r.a.createElement('hr', { className: 'hr' })
											),
											r.a.createElement(
												'div',
												{ className: 'price_pp' },
												'Rating :',
												r.a.createElement(
													'span',
													null,
													Object(X.a)(Array(5)).map(function(t, a) {
														var n = a + 1;
														return r.a.createElement(
															'label',
															null,
															r.a.createElement(ee.a, {
																color: n <= e.props.rating ? '#ffc107' : '#D3D3D3',
																size: 20
															})
														);
													})
												)
											),
											r.a.createElement(
												'div',
												{ className: 'price_pp' },
												'Type : ',
												r.a.createElement('span', { className: 'type_value' }, this.props.tag)
											),
											r.a.createElement(
												'div',
												{ className: 'price_pp' },
												'Price :',
												r.a.createElement(
													'span',
													{ className: 'price_val' },
													this.props.Value,
													' coins'
												)
											)
										),
										r.a.createElement(
											'div',
											null,
											this.props.inLibrary
												? r.a.createElement(
														'div',
														{ className: 'buy_pp ' },
														r.a.createElement(
															'button',
															{ className: 'buy_btn_pp', onClick: this.props.buy },
															'Buy Now'
														),
														r.a.createElement(
															'button',
															{
																className: 'adc_btn_pp ',
																onClick: function() {
																	e.props.addToCart(e.props.refId);
																}
															},
															'Add to Cart'
														),
														this.props.sample_file &&
															r.a.createElement(
																'button',
																{
																	className: 'adc_btn_pp ',
																	onClick: function() {
																		window.location.href = '/files/'.concat(
																			e.props.sample_file,
																			'.pdf'
																		);
																	}
																},
																'See Sample'
															)
													)
												: r.a.createElement(
														'div',
														{ className: 'buy_pp ' },
														r.a.createElement(
															'button',
															{
																className: 'buy_btn_pp',
																onClick: function() {
																	window.location.href = '/My-Library';
																}
															},
															'See in Library'
														)
													)
										),
										r.a.createElement('br', null),
										r.a.createElement(
											'div',
											{ className: 'des_pp' },
											'About',
											r.a.createElement('div', { className: 'des_cont' }, this.props.description)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				oe = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						if (
							(Object(i.a)(this, a),
							((n = t.call(this, e)).state = { reviews: [], user_pic: null }),
							n.props.pro_id)
						) {
							var r = { username: n.props.username };
							fetch('/api/review/'.concat(n.props.pro_id), r)
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									e &&
										n.setState(function() {
											return { reviews: e.reverse() };
										});
								});
						}
						return n;
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'review_section' },
										r.a.createElement(
											'div',
											{ className: 'revsec_con' },
											this.state.reviews.map(function(t) {
												return r.a.createElement(
													'div',
													{ className: 'rev_con' },
													r.a.createElement(
														'div',
														{ className: 'user_det' },
														r.a.createElement('img', { src: b.a }),
														r.a.createElement(
															'span',
															{ className: 'review_username' },
															t.userId
														)
													),
													r.a.createElement(
														'div',
														null,
														Object(X.a)(Array(5)).map(function(t, a) {
															var n = a + 1;
															return r.a.createElement(
																'label',
																null,
																r.a.createElement(ee.a, {
																	color: n <= e.props.rating ? '#ffc107' : '#D3D3D3',
																	size: 20
																})
															);
														})
													),
													r.a.createElement('div', null, t.comment),
													r.a.createElement('br', null),
													r.a.createElement('br', null)
												);
											})
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			function ie() {
				return le.apply(this, arguments);
			}
			function le() {
				return (le = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n,
							r = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = r.length > 0 && void 0 !== r[0] ? r[0] : ''),
											(a = r.length > 1 && void 0 !== r[1] ? r[1] : {}),
											(e.next = 4),
											fetch(t, {
												method: 'POST',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer',
												body: JSON.stringify(a)
											})
										);
									case 4:
										return (n = e.sent), e.abrupt('return', n.json());
									case 6:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var se = a(12);
			var ue = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).updateProductPre = function() {
								var e = document.getElementById('pro_title').value,
									t = document.getElementById('pro_s_title').value,
									a = document.getElementById('pro_s_des').value,
									r = {
										title: e,
										tag: document.getElementById('pro_type').value,
										stitle: t,
										short_des: a,
										price: document.getElementById('pro_price').value
									};
								n.setState(function() {
									return { productdet: r };
								});
							}),
							(n._onChange = function() {
								var e = document.getElementById('pro_img');
								if (e.files.length > 0)
									for (var t = 0; t <= e.files.length - 1; t++) {
										var a = e.files.item(t).size,
											r = Math.round(a / 1024);
										if (r >= 4096)
											return void alert('File too Big, please select a file less than 4mb');
										if (r < 10)
											return void alert('File too small, please select a file greater than 10kb');
										document.getElementById('size').innerHTML = '<b>' + r + '</b> KB';
									}
								if (e.files.length > 0) {
									var c = n.refs.file.files[0],
										o = new FileReader();
									o.readAsDataURL(c);
									o.onloadend = function(e) {
										this.setState(function() {
											return { imgSrc: [ o.result ] };
										});
									}.bind(Object(se.a)(n));
								}
							}),
							(n._onChangeFile = function() {
								var e = document.getElementById('pro_file');
								if (e.files.length > 0)
									for (var t = 0; t <= e.files.length - 1; t++) {
										var a = e.files.item(t).size,
											n = Math.round(a / 1024);
										if (n >= 5e4)
											return void alert('File too Big, please select a file less than 50mb');
										if (n < 10)
											return void alert('File too small, please select a file greater than 10kb');
										document.getElementById('size').innerHTML = '<b>' + n + '</b> KB';
									}
							}),
							(n.state = {
								productdet: {
									title: 'Title',
									tag: 'PDF',
									stitle: 'short title ',
									short_des: 'short description ',
									price: '0',
									image: ''
								},
								imgSrc: null
							}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										null,
										r.a.createElement(
											'div',
											{ className: 'add_pro_con' },
											r.a.createElement(
												'div',
												{ className: 'preview' },
												r.a.createElement(D, {
													title: this.state.productdet.title,
													tag: this.state.productdet.tag,
													bookimg: this.state.imgSrc,
													stitle: this.state.productdet.stitle,
													short_des: this.state.productdet.short_des,
													price: this.state.productdet.price,
													refId: 'sample'
												}),
												r.a.createElement('h2', null, 'Live Preview')
											),
											r.a.createElement(
												'div',
												{ className: 'add_pro_det' },
												r.a.createElement('h1', null, 'Create Your Product'),
												r.a.createElement(
													'form',
													{
														action: '/api/sell',
														method: 'post',
														encType: 'multipart/form-data'
													},
													r.a.createElement(
														'div',
														{ className: 'row_pair' },
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement('label', { htmlFor: 'Type' }, 'Type'),
															r.a.createElement(
																'select',
																{
																	name: 'tag',
																	id: 'pro_type',
																	onChange: this.updateProductPre
																},
																r.a.createElement('option', { value: 'PDF' }, 'PDF'),
																r.a.createElement(
																	'option',
																	{ value: 'old' },
																	'Old Book'
																),
																r.a.createElement(
																	'option',
																	{ value: 'Audio' },
																	'Audio Book'
																),
																r.a.createElement(
																	'option',
																	{ value: 'new_book' },
																	'New Book'
																)
															)
														),
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement(
																'label',
																{ htmlFor: 'Category' },
																'Category'
															),
															r.a.createElement(
																'select',
																{
																	name: 'category',
																	id: 'pro_cat',
																	onChange: this.updateProductPre
																},
																r.a.createElement(
																	'option',
																	{ value: 'college' },
																	'College'
																),
																r.a.createElement(
																	'option',
																	{ value: 'old_book' },
																	'Fiction'
																),
																r.a.createElement(
																	'option',
																	{ value: 'audio_book' },
																	'Novel'
																),
																r.a.createElement(
																	'option',
																	{ value: 'new_book' },
																	'sci-fi'
																)
															)
														)
													),
													r.a.createElement(
														'div',
														{
															className:
																('PDF' === this.state.productdet.tag ||
																	'Audio' === this.state.productdet.tag) &&
																'row_pair'
														},
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement('label', { htmlFor: 'Type' }, 'Image'),
															r.a.createElement('input', {
																id: 'pro_img',
																ref: 'file',
																type: 'file',
																name: 'cover_img',
																accept: 'image/png, image/jpeg',
																multiple: 'true',
																onChange: this._onChange
															}),
															r.a.createElement('span', { id: 'size' })
														),
														('PDF' === this.state.productdet.tag ||
															'Audio' === this.state.productdet.tag) &&
															r.a.createElement(
																'div',
																{ className: 'lable_inp_pair' },
																r.a.createElement(
																	'label',
																	{ htmlFor: 'InputFile' },
																	this.state.productdet.tag,
																	' File'
																),
																r.a.createElement('input', {
																	id: 'pro_file',
																	ref: 'pfile',
																	type: 'file',
																	name: 'product_file',
																	multiple: 'true',
																	onChange: this._onChangeFile
																}),
																r.a.createElement('span', { id: 'file_size' })
															)
													),
													r.a.createElement(
														'div',
														{ className: 'row_pair' },
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement('label', { htmlFor: 'Type' }, 'Title'),
															r.a.createElement('input', {
																name: 'title',
																type: 'text',
																id: 'pro_title',
																onChange: this.updateProductPre
															})
														),
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement('label', { htmlFor: 'Type' }, 'Author'),
															r.a.createElement('input', {
																name: 'short_title',
																type: 'text',
																id: 'pro_s_title',
																onChange: this.updateProductPre
															})
														)
													),
													r.a.createElement(
														'div',
														{ className: 'row_pair' },
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement(
																'label',
																{ htmlFor: 'Type' },
																'Short Description'
															),
															r.a.createElement('input', {
																name: 'short_des',
																type: 'text',
																id: 'pro_s_des',
																onChange: this.updateProductPre
															})
														),
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement('label', { htmlFor: 'Type' }, 'Price'),
															r.a.createElement('input', {
																name: 'price',
																type: 'number',
																id: 'pro_price',
																onChange: this.updateProductPre
															})
														)
													),
													r.a.createElement(
														'div',
														{ className: 'row_pair' },
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement(
																'label',
																{ htmlFor: 'Type' },
																'Sample PDF (Starting Page Number)'
															),
															r.a.createElement('input', {
																name: 'sample_start',
																type: 'number',
																id: 'pro_sample_start'
															})
														),
														r.a.createElement(
															'div',
															{ className: 'lable_inp_pair' },
															r.a.createElement(
																'label',
																{ htmlFor: 'Type' },
																'Number of Pages in Sample PDF'
															),
															r.a.createElement('input', {
																name: 'sample_pages',
																type: 'number',
																id: 'pro_sample_end'
															})
														)
													),
													r.a.createElement(
														'div',
														{ className: 'lable_inp_pair' },
														r.a.createElement(
															'label',
															{ htmlFor: 'Type' },
															'Breif Description'
														),
														r.a.createElement('textarea', {
															name: 'B_des',
															type: 'text',
															id: 'pro_des'
														})
													),
													r.a.createElement(
														'div',
														{ className: 'row_pair', id: 'btnrow' },
														r.a.createElement(
															'button',
															{
																id: 'addpro_canbtn',
																onClick: function() {
																	window.location.href = '/';
																}
															},
															'Cancel'
														),
														r.a.createElement('input', {
															id: 'addpro_addbtn',
															type: 'submit',
															value: 'Add to Store'
														})
													)
												)
											)
										)
									);
								}
							}
						]),
						a
					);
				})(n.Component),
				me = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(i.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'HomePage' },
										r.a.createElement(ue, null),
										r.a.createElement(Y, null)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				de = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { proArray: [] }),
							fetch('/api/user/products', {
								method: 'GET',
								mode: 'cors',
								cache: 'no-cache',
								credentials: 'same-origin',
								headers: { 'Content-Type': 'application/json' },
								redirect: 'follow',
								referrerPolicy: 'no-referrer'
							})
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return { proArray: e };
											});
								}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'CateCon' },
										r.a.createElement(
											'div',
											{ className: 'cate_head' },
											r.a.createElement('h1', { className: 'heading_mob_pp' }, 'My Products'),
											r.a.createElement('h3', { className: 'see_mob_pp' }, 'See More ->')
										),
										r.a.createElement(
											'div',
											{ className: 'cate_body' },
											this.state.proArray.map(function(e) {
												return r.a.createElement(pe, {
													title: e.title,
													tag: e.tag,
													stitle: e.s_title,
													short_des: e.short_des,
													price: e.Value,
													refId: e.refrenceId,
													bookimg: '/covers/'.concat(e.cover_img)
												});
											})
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			var pe = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return Object(i.a)(this, a), ((n = t.call(this, e)).state = { product_file: null }), n;
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'productcont_for_profile' },
										r.a.createElement(
											'div',
											{ className: 'tag_for_profile' },
											r.a.createElement('strong', null, this.props.tag)
										),
										r.a.createElement(
											'div',
											{
												className: 'product_img',
												onClick: function() {
													window.location.href = '/productpage/'.concat(e.props.refId);
												}
											},
											r.a.createElement('img', {
												className: 'bookcover',
												src: this.props.bookimg ? this.props.bookimg : L.a,
												alt: ' '
											})
										),
										r.a.createElement(
											'div',
											{ className: 'product_body_for_profile' },
											r.a.createElement('h3', null, this.props.title),
											r.a.createElement('h6', null, '(', this.props.stitle, ')'),
											r.a.createElement('p', null, this.props.short_des),
											r.a.createElement(
												'h1',
												null,
												this.props.price,
												' ',
												r.a.createElement('span', null, 'coins')
											)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				he = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(i.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										null,
										r.a.createElement(
											'div',
											{ className: 'main_profile_page' },
											r.a.createElement(fe, null),
											r.a.createElement(
												'div',
												{ className: 'trans' },
												r.a.createElement(Ee, null),
												r.a.createElement(ve, null)
											)
										),
										r.a.createElement(Y, null)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				fe = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							(n = t.call(this, e)),
							fetch('/api/user', {
								method: 'GET',
								mode: 'cors',
								cache: 'no-cache',
								credentials: 'same-origin',
								headers: { 'Content-Type': 'application/json' },
								redirect: 'follow',
								referrerPolicy: 'no-referrer'
							})
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return {
													username: e.username,
													email: e.email,
													phone_Number: e.phone_Number,
													Address: e.Address,
													name: e.name,
													coins: e.Coins,
													pro_pic: e.pro_img,
													Earnings: e.Earnings
												};
											});
								}),
							(n.state = {
								username: null,
								email: null,
								phone_Number: null,
								Address: null,
								name: null,
								coins: null,
								edited: !1,
								pro_pic: null,
								Earnings: null
							}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ id: 'ProfileCard' },
										r.a.createElement(
											'div',
											{ className: 'info' },
											r.a.createElement(
												'div',
												{ className: 'user_pro_pic' },
												r.a.createElement('img', {
													id: 'pro_pic',
													src: this.state.pro_pic,
													alt: ' '
												})
											),
											r.a.createElement(
												'div',
												{ className: 'user_name' },
												this.state.name,
												r.a.createElement(
													'div',
													null,
													' ',
													this.state.edited
														? r.a.createElement(
																'div',
																{
																	className: 'edit',
																	onClick: function() {
																		e.setState(function() {
																			return { edited: !1 };
																		}),
																			(function() {
																				return _e.apply(this, arguments);
																			})('api/user/', {
																				email: document.getElementById(
																					'input_email'
																				).value,
																				phone_Number: document.getElementById(
																					'input_phone_Number'
																				).value,
																				Address: document.getElementById(
																					'input_Address'
																				).value
																			}).then(function(e) {
																				e.email
																					? window.location.reload()
																					: alert('we are having some problem');
																			});
																	}
																},
																'Save'
															)
														: r.a.createElement(
																'div',
																{
																	className: 'edit',
																	onClick: function() {
																		e.setState(function(e) {
																			return { edited: !e.edited };
																		});
																	}
																},
																'Edit Profile'
															)
												)
											)
										),
										r.a.createElement('div', { className: 'hr_pp' }, r.a.createElement('hr', null)),
										r.a.createElement(
											'div',
											{ className: 'details' },
											r.a.createElement(
												'div',
												{ className: 'heading' },
												'Username',
												this.state.edited
													? r.a.createElement('input', {
															type: 'text',
															className: 'heading_value ',
															value: this.state.username
														})
													: r.a.createElement(
															'div',
															{ className: 'heading_value' },
															this.state.username
														)
											),
											r.a.createElement(
												'div',
												{ className: 'heading' },
												'Email',
												r.a.createElement(
													'div',
													{ className: 'heading_value' },
													this.state.edited
														? r.a.createElement('input', {
																type: 'text',
																className: 'heading_value input_email',
																id: 'input_email'
															})
														: r.a.createElement(
																'div',
																{ className: 'heading_value' },
																this.state.email
															)
												)
											),
											r.a.createElement(
												'div',
												{ className: 'heading' },
												'Phone No.',
												r.a.createElement(
													'div',
													{ className: 'heading_value' },
													this.state.edited
														? r.a.createElement('input', {
																type: 'text',
																className: 'heading_value ',
																id: 'input_phone_Number'
															})
														: r.a.createElement(
																'div',
																{ className: 'heading_value' },
																this.state.phone_Number
															)
												)
											),
											r.a.createElement(
												'div',
												{ className: 'heading' },
												'Address',
												r.a.createElement(
													'div',
													{ className: 'heading_value' },
													this.state.edited
														? r.a.createElement('input', {
																type: 'text',
																className: 'heading_value input_Address',
																id: 'input_Address'
															})
														: r.a.createElement(
																'div',
																{ className: 'heading_value' },
																this.state.Address
															)
												)
											),
											r.a.createElement(
												'div',
												{ className: 'heading' },
												'Wallet',
												r.a.createElement(
													'div',
													{ className: 'heading_value' },
													this.state.coins,
													' coins'
												)
											),
											r.a.createElement(
												'div',
												{ className: 'heading' },
												'Earnings',
												r.a.createElement(
													'div',
													{ className: 'heading_value' },
													this.state.Earnings,
													' coins'
												)
											)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				ve = function() {
					return r.a.createElement('div', { className: 'items_cont' }, r.a.createElement(de, null));
				},
				Ee = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { total_trans: [] }),
							fetch('/api/user/transaction', {
								method: 'GET',
								mode: 'cors',
								cache: 'no-cache',
								credentials: 'same-origin',
								headers: { 'Content-Type': 'application/json' },
								redirect: 'follow',
								referrerPolicy: 'no-referrer'
							})
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									e &&
										n.setState(function() {
											return { total_trans: e.reverse() };
										});
								}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'transaction' },
										r.a.createElement(
											'h1',
											null,
											'Transactions(',
											this.state.total_trans.length,
											')'
										),
										r.a.createElement('h3', null, 'Latest Transaction'),
										r.a.createElement(
											'div',
											{ className: 'trans_details' },
											r.a.createElement('div', { className: 'trans_date' }, 'Date'),
											r.a.createElement(
												'div',
												{ className: 'trans_transaction' },
												'Transaction ID'
											),
											r.a.createElement('div', { className: 'trans_product_head' }, 'Product'),
											r.a.createElement('div', { className: 'trans_Value_head' }, 'Value')
										),
										this.state.total_trans.map(function(e) {
											return r.a.createElement(
												'div',
												{ className: 'trans_details' },
												r.a.createElement('div', { className: 'trans_date' }, '2020-06-13'),
												r.a.createElement(
													'div',
													{ className: 'trans_transaction' },
													e.TransactionId
												),
												r.a.createElement('div', { className: 'trans_product' }, e.item.title),
												r.a.createElement(
													'div',
													{ className: 'trans_Value' },
													e.Debited
														? r.a.createElement(
																'div',
																{ className: 'trans_minus' },
																'-',
																e.Value,
																' coins'
															)
														: r.a.createElement(
																'div',
																{ className: 'trans_plus' },
																' +',
																e.Value,
																'coins'
															)
												)
											);
										}),
										this.state.total_trans.map(function(e) {
											return r.a.createElement(
												'div',
												{ className: 'trans_details_mob' },
												r.a.createElement(
													'div',
													{ className: 'trans_product_mob' },
													e.item.title
												),
												r.a.createElement(
													'div',
													{ className: 'trans_row' },
													r.a.createElement(
														'div',
														{ className: 'trans_Value_mob' },
														e.Debited
															? r.a.createElement(
																	'div',
																	{ className: 'trans_minus_mob' },
																	'-',
																	e.Value,
																	'coins'
																)
															: r.a.createElement(
																	'div',
																	{ className: 'trans_plus' },
																	' +',
																	e.Value,
																	'coins'
																)
													),
													r.a.createElement(
														'div',
														{ className: 'trans_date_mob' },
														'2020-06-13'
													)
												)
											);
										})
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			function _e() {
				return (_e = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n,
							r = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = r.length > 0 && void 0 !== r[0] ? r[0] : ''),
											(a = r.length > 1 && void 0 !== r[1] ? r[1] : {}),
											(e.next = 4),
											fetch(t, {
												method: 'PUT',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer',
												body: JSON.stringify(a)
											})
										);
									case 4:
										return (n = e.sent), e.abrupt('return', n.json());
									case 6:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var ge = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a() {
						return Object(i.a)(this, a), t.apply(this, arguments);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement('div', null, r.a.createElement(ye, null));
								}
							}
						]),
						a
					);
				})(r.a.Component),
				be = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).Total_Value = n.Total_Value.bind(Object(se.a)(n))),
							(n.Total = n.Total.bind(Object(se.a)(n))),
							(n.state = { Cart_Product: [], coins: null }),
							fetch('/api/user/Cart', {
								method: 'GET',
								mode: 'cors',
								cache: 'no-cache',
								credentials: 'same-origin',
								headers: { 'Content-Type': 'application/json' },
								redirect: 'follow',
								referrerPolicy: 'no-referrer'
							})
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return { Cart_Product: e };
											});
								}),
							fetch('/api/user', {
								method: 'GET',
								mode: 'cors',
								cache: 'no-cache',
								credentials: 'same-origin',
								headers: { 'Content-Type': 'application/json' },
								redirect: 'follow',
								referrerPolicy: 'no-referrer'
							})
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return { coins: e.Coins };
											});
								}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'Total_Value',
								value: function(e) {
									for (var t = 0, a = 0; a < e.length; a++) t += e[a].Value;
									return t;
								}
							},
							{
								key: 'Total',
								value: function(e) {
									return this.Total_Value(this.state.Cart_Product) > e
										? this.Total_Value(this.state.Cart_Product) - e
										: e < 0
											? this.Total_Value(this.state.Cart_Product)
											: e - this.Total_Value(this.state.Cart_Product);
								}
							},
							{
								key: 'isDisable',
								value: function(e) {
									return e < this.Total_Value(this.state.Cart_Product);
								}
							},
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'payment_tab' },
										r.a.createElement('div', { className: 'payment_tab_heading' }, 'ORDER SUMMARY'),
										r.a.createElement('hr', null),
										r.a.createElement(
											'div',
											null,
											r.a.createElement('input', {
												placeholder: 'HAVE A PROMOCODE?',
												type: 'text',
												className: 'payment_promo'
											})
										),
										r.a.createElement(
											'div',
											{ className: 'prod_det' },
											this.state.Cart_Product.map(function(e) {
												return r.a.createElement(je, {
													title: e.title,
													Value: e.Value,
													cover_img: e.cover_img
												});
											})
										),
										r.a.createElement('hr', null),
										r.a.createElement(
											'div',
											null,
											r.a.createElement(
												'div',
												{ className: 'title_tab_total' },
												'Total Value',
												r.a.createElement(
													'div',
													{ className: 'title_ab_total_value' },
													'$',
													this.Total_Value(this.state.Cart_Product)
												)
											),
											r.a.createElement(
												'div',
												{ className: 'user_coins' },
												'Your Coins',
												r.a.createElement(
													'span',
													{ className: 'user_coins_value' },
													' $',
													this.state.coins
												)
											),
											r.a.createElement(
												'div',
												{ className: 'checkout_div' },
												r.a.createElement(
													'button',
													{
														className: 'checkout_btn',
														onClick: function() {
															e.state.coins < e.Total_Value(e.state.Cart_Product) &&
																alert('Insufficient Balance'),
																(function() {
																	return Oe.apply(this, arguments);
																})('/api/user/CheckoutFromCart', {
																	coins:
																		e.state.coins -
																		e.Total_Value(e.state.Cart_Product)
																}).then(function(e) {
																	e || alert('error occured');
																});
														}
													},
													'Proceed To Checkout'
												)
											)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				ye = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							(n = t.call(this, e)),
							fetch('/api/user/Cart', {
								method: 'GET',
								mode: 'cors',
								cache: 'no-cache',
								credentials: 'same-origin',
								headers: { 'Content-Type': 'application/json' },
								redirect: 'follow',
								referrerPolicy: 'no-referrer'
							})
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									console.log(e),
										e &&
											n.setState(function() {
												return { Cart_Product: e, count: e.length };
											});
								}),
							(n.state = { Cart_Product: [], count: 0 }),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										null,
										r.a.createElement(
											'div',
											{ className: 'heading_cart' },
											r.a.createElement(
												'h1',
												{ className: 'heading_left_cart' },
												'Your Cart(',
												this.state.count,
												')'
											)
										),
										r.a.createElement(
											'div',
											{ className: 'content_div' },
											r.a.createElement(be, null),
											r.a.createElement('hr', { className: 'hidden_hr' }),
											r.a.createElement(
												'div',
												{ className: 'product_row_div' },
												this.state.Cart_Product.map(function(t) {
													return r.a.createElement(Ne, {
														key: t.refrenceId,
														title: t.title,
														s_title: t.s_title,
														Value: t.Value,
														tag: t.tag,
														refrenceId: t.refrenceId,
														total: e.Total_Value,
														bookimg: '/covers/'.concat(t.cover_img)
													});
												})
											)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				Ne = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).RemoveFromcart = n.RemoveFromcart.bind(Object(se.a)(n))),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'RemoveFromcart',
								value: function(e) {
									!(function() {
										ke.apply(this, arguments);
									})('/api/products/RemoveFromCart', { refrenceId: e });
								}
							},
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'product_cart_cont' },
										r.a.createElement(
											'div',
											{ className: 'product_cart' },
											r.a.createElement(
												'div',
												{
													className: 'img_cart',
													onClick: function() {
														window.location.href = '/productpage/'.concat(
															e.props.refrenceId
														);
													}
												},
												r.a.createElement('img', {
													className: 'product_img_cart',
													src: this.props.bookimg,
													alt: ' '
												})
											),
											r.a.createElement(
												'div',
												{ className: 'details_cart' },
												r.a.createElement(
													'h3',
													{
														onClick: function() {
															window.location.href = '/productpage/'.concat(
																e.props.refrenceId
															);
														}
													},
													this.props.title
												),
												r.a.createElement('h6', null, this.props.s_title),
												r.a.createElement('span', null),
												r.a.createElement(
													'div',
													{ className: 'type_product_cart' },
													'Type : ',
													r.a.createElement(
														'span',
														{ className: 'type_value' },
														this.props.tag
													)
												),
												r.a.createElement(
													'div',
													{ className: 'cart_product_price_mob' },
													'$',
													this.props.Value
												),
												r.a.createElement(
													'div',
													{
														className: 'btn_cart_div',
														onClick: function() {
															e.RemoveFromcart(e.props.refrenceId);
														}
													},
													r.a.createElement(
														'button',
														{ className: 'cart_remove_button' },
														'Remove'
													)
												)
											)
										),
										r.a.createElement('br', null),
										r.a.createElement('hr', { className: 'hr_cart' })
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				je = function(e) {
					return r.a.createElement(
						'div',
						{ className: 'title_div' },
						r.a.createElement(
							'div',
							{ className: 'title_div_name' },
							e.title,
							r.a.createElement('div', { className: 'title_div_price' }, '$', e.Value)
						)
					);
				};
			function ke() {
				return (ke = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n,
							r = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = r.length > 0 && void 0 !== r[0] ? r[0] : ''),
											(a = r.length > 1 && void 0 !== r[1] ? r[1] : {}),
											(e.next = 4),
											fetch(t, {
												method: 'POST',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer',
												body: JSON.stringify(a)
											})
										);
									case 4:
										return (n = e.sent), window.location.reload(), e.abrupt('return', n.json());
									case 7:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			function Oe() {
				return (Oe = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n,
							r = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = r.length > 0 && void 0 !== r[0] ? r[0] : ''),
											(a = r.length > 1 && void 0 !== r[1] ? r[1] : {}),
											(e.next = 4),
											fetch(t, {
												method: 'DELETE',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer',
												body: JSON.stringify(a)
											})
										);
									case 4:
										return (n = e.sent), window.location.reload(), e.abrupt('return', n.json());
									case 7:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var Ce = a(40),
				we = a.n(Ce),
				Te = a(41),
				Ie = a.n(Te),
				Pe = a(42),
				Se = a.n(Pe),
				Be = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).loaded = function(e) {
								document.getElementById(e).style.display = 'block';
							}),
							(n.show = function() {
								window.location.href = n.props.file;
							}),
							(n.state = {}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'Myproductcont', id: this.props.refId },
										r.a.createElement(
											'div',
											{ className: 'myBtnCon' },
											r.a.createElement('img', { onClick: this.show, src: Se.a, alt: '' }),
											r.a.createElement('img', { onClick: this.info, src: we.a, alt: '' }),
											r.a.createElement('img', { src: Ie.a, alt: '' })
										),
										r.a.createElement(
											'div',
											{ className: 'Myproduct_img' },
											r.a.createElement(
												'div',
												{ className: 'Mytag' },
												r.a.createElement('strong', null, this.props.tag)
											),
											r.a.createElement('img', {
												onLoad: function() {
													e.loaded(e.props.refId);
												},
												className: 'Mybookcover',
												src: this.props.bookimg ? this.props.bookimg : L.a,
												alt: ' '
											})
										),
										r.a.createElement(
											'div',
											{ className: 'Myproduct_body' },
											r.a.createElement('h3', null, this.props.title)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			var Ae = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { products: [] }),
							fetch('api/products/myproducts')
								.then(function(e) {
									return console.log('hii ' + e), e.json();
								})
								.then(function(e) {
									console.log(e),
										n.setState(function() {
											return { products: e };
										});
								}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'Library_con' },
										r.a.createElement(
											'h1',
											{ id: 'lib_head' },
											'Shelf (',
											this.state.products.length,
											')'
										),
										r.a.createElement(
											'div',
											{ className: 'proCon' },
											this.state.products &&
												this.state.products.map(function(e, t) {
													return r.a.createElement(Be, {
														key: t,
														tag: e.Product.tag,
														title: e.Product.title,
														bookimg: '/covers/'.concat(e.Product.cover_img),
														file: '/files/'.concat(e.Product.product_file),
														refId: e.Product.refrenceId
													});
												})
										),
										r.a.createElement(Y, null)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				xe = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { products: [], addedtocartArr: [] }),
							(function() {
								return Ve.apply(this, arguments);
							})('/api/user/CartRefId').then(function(e) {
								e &&
									n.setState(function() {
										return { addedtocartArr: e };
									});
							}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'componentDidMount',
								value: function() {
									var e = this,
										t = this.props.match.params.name;
									fetch('/api/products/search/'.concat(t))
										.then(function(e) {
											return e.json();
										})
										.then(function(t) {
											t &&
												e.setState(function() {
													return { products: t };
												});
										});
								}
							},
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										null,
										r.a.createElement(
											'div',
											{ className: 'heading_cart' },
											r.a.createElement(
												'h1',
												{ className: 'heading_left_cart' },
												'Search(',
												this.state.products.length,
												')'
											)
										),
										r.a.createElement(
											'div',
											null,
											this.state.products.length
												? r.a.createElement(
														'div',
														{ className: 'search_items' },
														this.state.products.map(function(t) {
															var a,
																n = e.state.addedtocartArr.indexOf(t.refrenceId);
															return (
																console.log(n),
																(a = -1 != n),
																r.a.createElement(D, {
																	title: t.title,
																	tag: t.tag,
																	stitle: t.s_title,
																	short_des: t.short_des,
																	price: t.Value,
																	refId: t.refrenceId,
																	isAdded: a,
																	bookimg: '/covers/'.concat(t.cover_img)
																})
															);
														})
													)
												: r.a.createElement(
														'div',
														{ className: 'search_error' },
														r.a.createElement(
															'h2',
															null,
															'Sorry! NO such product found.\ud83d\ude01\ud83d\ude01'
														)
													)
										),
										r.a.createElement('br', null),
										r.a.createElement('br', null),
										r.a.createElement('hr', { className: 'hr_pro' }),
										r.a.createElement(R, null),
										r.a.createElement(R, null),
										r.a.createElement(R, null),
										r.a.createElement(Y, null)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component);
			function Ve() {
				return (Ve = Object(V.a)(
					x.a.mark(function e() {
						var t,
							a,
							n = arguments;
						return x.a.wrap(function(e) {
							for (;;)
								switch ((e.prev = e.next)) {
									case 0:
										return (
											(t = n.length > 0 && void 0 !== n[0] ? n[0] : ''),
											(e.next = 3),
											fetch(t, {
												method: 'GET',
												mode: 'cors',
												cache: 'no-cache',
												credentials: 'same-origin',
												headers: { 'Content-Type': 'application/json' },
												redirect: 'follow',
												referrerPolicy: 'no-referrer'
											})
										);
									case 3:
										return (a = e.sent), e.abrupt('return', a.json());
									case 5:
									case 'end':
										return e.stop();
								}
						}, e);
					})
				)).apply(this, arguments);
			}
			var Fe = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						var n;
						return (
							Object(i.a)(this, a),
							((n = t.call(this, e)).state = { orders: [] }),
							fetch('/api/user/myorders')
								.then(function(e) {
									return e.json();
								})
								.then(function(e) {
									e &&
										n.setState(function() {
											return { orders: e };
										});
								}),
							n
						);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									return r.a.createElement(
										'div',
										{ className: 'my_order_div' },
										r.a.createElement(
											'div',
											{ className: 'ordered_pro' },
											this.state.orders.map(function(e) {
												return r.a.createElement(
													'div',
													null,
													r.a.createElement(Le, {
														title: e.item.title,
														tag: e.item.tag,
														stitle: e.item.s_title,
														short_des: e.item.short_des,
														price: e.item.Value,
														refId: e.item.refrenceId,
														bookimg: '/covers/'.concat(e.item.cover_img)
													}),
													r.a.createElement(
														'div',
														{ className: 'order_det' },
														r.a.createElement('div', null, 'Ordered on'),
														r.a.createElement(
															'div',
															{ className: 'order_date' },
															e.createdAt
														)
													)
												);
											})
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				Le = (function(e) {
					Object(s.a)(a, e);
					var t = Object(u.a)(a);
					function a(e) {
						return Object(i.a)(this, a), t.call(this, e);
					}
					return (
						Object(l.a)(a, [
							{
								key: 'render',
								value: function() {
									var e = this;
									return r.a.createElement(
										'div',
										{ className: 'productcont_for_profile' },
										r.a.createElement(
											'div',
											{ className: 'tag_for_profile' },
											r.a.createElement('strong', null, this.props.tag)
										),
										r.a.createElement(
											'div',
											{
												className: 'product_img',
												onClick: function() {
													window.location.href = '/productpage/'.concat(e.props.refId);
												}
											},
											r.a.createElement('img', {
												className: 'bookcover',
												src: this.props.bookimg ? this.props.bookimg : L.a,
												alt: ' '
											})
										),
										r.a.createElement(
											'div',
											{ className: 'product_body_for_profile' },
											r.a.createElement('h3', null, this.props.title),
											r.a.createElement('h6', null, '(', this.props.stitle, ')'),
											r.a.createElement('p', null, this.props.short_des),
											r.a.createElement(
												'h1',
												null,
												this.props.price,
												' ',
												r.a.createElement('span', null, 'coins')
											)
										)
									);
								}
							}
						]),
						a
					);
				})(r.a.Component),
				De = function() {
					return r.a.createElement(
						q.a,
						null,
						r.a.createElement(
							'div',
							null,
							r.a.createElement(P, null),
							r.a.createElement(
								Q.c,
								null,
								r.a.createElement(Q.a, { path: '/sell-your-product', component: me, exact: !0 }),
								r.a.createElement(Q.a, { path: '/container', component: D, exact: !0 }),
								r.a.createElement(Q.a, { path: '/', component: W, exact: !0 }),
								r.a.createElement(Q.a, { path: '/productpage/:refId', component: ne, exact: !0 }),
								r.a.createElement(Q.a, { path: '/My-Library', component: Ae, exact: !0 }),
								r.a.createElement(Q.a, { path: '/myprofile', component: he }),
								r.a.createElement(Q.a, { path: '/myCart', component: ge }),
								r.a.createElement(Q.a, { path: '/myorders', component: Fe }),
								r.a.createElement(Q.a, { path: '/Base_Header', component: Y }),
								r.a.createElement(Q.a, { path: '/Search_items/:name', component: xe })
							),
							r.a.createElement(Y, null)
						)
					);
				};
			window.addEventListener('load', function() {
				setTimeout(function() {
					window.scrollTo(0, 1);
				}, 0);
			}),
				o.a.render(r.a.createElement(De, null), document.getElementById('root'));
		}
	},
	[ [ 47, 1, 2 ] ]
]);
//# sourceMappingURL=main.792aa282.chunk.js.map
