const kt = K(vs, [["render", hs]]),
  Je = (e, t = "_bigger") => {
    const n =
      t === "_400x400"
        ? "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
        : "https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png";
    if (!e) return n;
    if (e.avatar?.image_url) return e.avatar.image_url.replace("_normal", t);
    const o = e.legacy;
    return o?.profile_image_url_https
      ? o.profile_image_url_https.replace("_normal", t)
      : n;
  },
  dt = (e) => {
    if (!e) return "";
    if ("core" in e && e.core && "name" in e.core) return e.core.name;
    const t = e.legacy;
    return t?.name ? t.name : "";
  },
  _t = (e) => {
    if (!e) return "";
    if ("core" in e && e.core && "screen_name" in e.core)
      return e.core.screen_name;
    const t = e.legacy;
    if (t?.screen_name) return t.screen_name;
    const n = e.legacy;
    return n?.username ? n.username : "";
  },
  ys = { class: "user-profile" },
  bs = { class: "user-profile__banner" },
  Ts = ["src"],
  $s = { key: 2, class: "user-profile__banner-placeholder" },
  ks = { class: "user-profile__content" },
  Cs = { class: "user-profile__header" },
  Is = { class: "user-profile__avatar-container" },
  Es = ["src", "alt"],
  Ss = { class: "user-profile__info" },
  Rs = { class: "user-profile__names" },
  Ps = { class: "user-profile__display-name" },
  Vs = { class: "user-profile__username" },
  xs = { key: 0, class: "user-profile__bio" },
  Ls = ["innerHTML"],
  Os = { class: "user-profile__metadata" },
  Ms = { key: 0, class: "user-profile__metadata-item" },
  Fs = { key: 1, class: "user-profile__metadata-item" },
  As = ["href"],
  Ns = { class: "user-profile__metadata-item" },
  Us = { class: "user-profile__stats" },
  Ds = { class: "user-profile__stat" },
  Bs = { class: "user-profile__stat-number" },
  qs = { class: "user-profile__stat" },
  Hs = { class: "user-profile__stat-number" },
  Ws = H({
    __name: "UserProfile",
    props: { user: {} },
    setup(e) {
      const t = e,
        n = async (_, w) => {
          try {
            const h = await fetch(_, { mode: "cors" });
            if (!h.ok) throw new Error(`Failed to download image: ${h.status}`);
            const m = await h.blob(),
              v = URL.createObjectURL(m),
              u = document.createElement("a");
            ((u.href = v),
              (u.download = w),
              document.body.appendChild(u),
              u.click(),
              u.remove(),
              URL.revokeObjectURL(v));
          } catch {
            window.open(_, "_blank", "noopener,noreferrer");
          }
        },
        o = I(() =>
          t.user.legacy.profile_banner_url
            ? t.user.legacy.profile_banner_url + "/1500x500"
            : "",
        ),
        s = async () => {
          o.value &&
            (await n(o.value, `${t.user.core.screen_name}-banner.jpg`));
        },
        i = I(() => Je(t.user, "_400x400")),
        d = async () => {
          i.value &&
            (await n(i.value, `${t.user.core.screen_name}-avatar.jpg`));
        },
        c = I(() => ({
          __typename: t.user.__typename,
          id: t.user.id,
          rest_id: t.user.rest_id,
          has_graduated_access: !0,
          is_blue_verified: t.user.is_blue_verified,
          profile_image_shape: "Circle",
          legacy: {
            verified: t.user.verification?.verified || !1,
            verified_type:
              t.user.verification?.verified_type || t.user.legacy.verified_type,
            can_dm: !1,
            can_media_tag: !1,
            created_at: t.user.core.created_at,
            default_profile: t.user.legacy.default_profile,
            default_profile_image: t.user.legacy.default_profile_image,
            description: t.user.legacy.description,
            entities: t.user.legacy.entities,
            fast_followers_count: t.user.legacy.fast_followers_count,
            favourites_count: t.user.legacy.favourites_count,
            followers_count: t.user.legacy.followers_count,
            friends_count: t.user.legacy.friends_count,
            has_custom_timelines: t.user.legacy.has_custom_timelines,
            is_translator: t.user.legacy.is_translator,
            listed_count: t.user.legacy.listed_count,
            location: t.user.location?.location || "",
            media_count: t.user.legacy.media_count,
            name: t.user.core.name,
            normal_followers_count: t.user.legacy.normal_followers_count,
            pinned_tweet_ids_str: t.user.legacy.pinned_tweet_ids_str,
            possibly_sensitive: t.user.legacy.possibly_sensitive,
            profile_banner_url: t.user.legacy.profile_banner_url,
            profile_image_url_https: t.user.avatar?.image_url || "",
            profile_interstitial_type: t.user.legacy.profile_interstitial_type,
            screen_name: t.user.core.screen_name,
            statuses_count: t.user.legacy.statuses_count,
            translator_type: t.user.legacy.translator_type,
            want_retweets: t.user.legacy.want_retweets,
            withheld_in_countries: t.user.legacy.withheld_in_countries,
          },
          professional: t.user.professional,
        })),
        l = (_) =>
          _ >= 1e6
            ? (_ / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
            : _ >= 1e3
              ? (_ / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
              : _.toString(),
        f = (_) =>
          new Date(_).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          }),
        T = I(() => {
          if (!t.user.legacy.description) return "";
          const _ = t.user.legacy.entities?.description?.urls || [];
          return Jn(t.user.legacy.description, _);
        });
      return (_, w) => {
        const h = ke;
        return (
          p(),
          y("div", ys, [
            a("div", bs, [
              _.user.legacy.profile_banner_url
                ? (p(),
                  y(
                    "img",
                    {
                      key: 0,
                      src: _.user.legacy.profile_banner_url + "/1500x500",
                      alt: "Profile banner",
                      class: "user-profile__banner-image",
                    },
                    null,
                    8,
                    Ts,
                  ))
                : S("", !0),
              _.user.legacy.profile_banner_url
                ? (p(),
                  y(
                    "button",
                    {
                      key: 1,
                      class:
                        "user-profile__download-btn user-profile__download-btn--banner",
                      type: "button",
                      "aria-label": "Download banner",
                      title: "Download banner",
                      onClick: s,
                    },
                    [
                      g(kt, { class: "user-profile__download-icon" }),
                      w[0] ||
                        (w[0] = a(
                          "span",
                          { class: "user-profile__download-text" },
                          "Download",
                          -1,
                        )),
                    ],
                  ))
                : (p(), y("div", $s)),
            ]),
            a("div", ks, [
              a("div", Cs, [
                a("div", Is, [
                  a(
                    "img",
                    {
                      src: r(i),
                      alt: `${_.user.core.name} avatar`,
                      class: "user-profile__avatar",
                    },
                    null,
                    8,
                    Es,
                  ),
                  a(
                    "button",
                    {
                      class:
                        "user-profile__download-btn user-profile__download-btn--avatar",
                      type: "button",
                      "aria-label": "Download avatar",
                      title: "Download avatar",
                      onClick: d,
                    },
                    [g(kt, { class: "user-profile__download-icon" })],
                  ),
                ]),
              ]),
              a("div", Ss, [
                a("div", Rs, [
                  a("h1", Ps, [
                    re(O(_.user.core.name) + " ", 1),
                    g(
                      Ge,
                      { user: r(c), class: "user-profile__verified-icon" },
                      null,
                      8,
                      ["user"],
                    ),
                  ]),
                  a("p", Vs, "@" + O(_.user.core.screen_name), 1),
                ]),
                _.user.legacy.description
                  ? (p(),
                    y("div", xs, [
                      a(
                        "p",
                        { class: "user-profile__bio-text", innerHTML: r(T) },
                        null,
                        8,
                        Ls,
                      ),
                    ]))
                  : S("", !0),
                a("div", Os, [
                  _.user.legacy.location
                    ? (p(),
                      y("div", Ms, [
                        g(
                          h,
                          { class: "user-profile__metadata-icon" },
                          { default: R(() => [g(r(Cn))]), _: 1 },
                        ),
                        a("span", null, O(_.user.legacy.location), 1),
                      ]))
                    : S("", !0),
                  _.user.legacy.entities.url?.urls?.[0]
                    ? (p(),
                      y("div", Fs, [
                        g(
                          h,
                          { class: "user-profile__metadata-icon" },
                          { default: R(() => [g(r(In))]), _: 1 },
                        ),
                        a(
                          "a",
                          {
                            href: _.user.legacy.entities.url.urls[0]
                              .expanded_url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            class: "user-profile__link",
                          },
                          O(_.user.legacy.entities.url.urls[0].display_url),
                          9,
                          As,
                        ),
                      ]))
                    : S("", !0),
                  a("div", Ns, [
                    g(
                      h,
                      { class: "user-profile__metadata-icon" },
                      { default: R(() => [g(r(En))]), _: 1 },
                    ),
                    a(
                      "span",
                      null,
                      "Joined " + O(f(_.user.core.created_at)),
                      1,
                    ),
                  ]),
                ]),
                a("div", Us, [
                  a("div", Ds, [
                    a("span", Bs, O(l(_.user.legacy.friends_count)), 1),
                    w[1] ||
                      (w[1] = a(
                        "span",
                        { class: "user-profile__stat-label" },
                        "Following",
                        -1,
                      )),
                  ]),
                  a("div", qs, [
                    a("span", Hs, O(l(_.user.legacy.followers_count)), 1),
                    w[2] ||
                      (w[2] = a(
                        "span",
                        { class: "user-profile__stat-label" },
                        "Followers",
                        -1,
                      )),
                  ]),
                ]),
              ]),
            ]),
          ])
        );
      };
    },
  }),
  js = K(Ws, [["__scopeId", "data-v-ad8ebf0e"]]),
  Ks = {},
  zs = {
    viewBox: "0 0 24 24",
    "aria-label": "Community",
    fill: "currentColor",
    role: "img",
  };
function Gs(e, t) {
  return (
    p(),
    y("svg", zs, [
      ...(t[0] ||
        (t[0] = [
          a(
            "g",
            null,
            [
              a("path", {
                d: "M7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-1.608 1.732-2.762 4.389-2.869 8.248l-.03 1.083zM9.616 9.27C10.452 8.63 11 7.632 11 6.5 11 4.57 9.433 3 7.5 3S4 4.57 4 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73zm6.884 1.726c-3.264 0-6.816 2.358-7 8.977L9.471 21h14.057l-.029-1.027c-.184-6.618-3.736-8.977-7-8.977zm2.116-1.726C19.452 8.63 20 7.632 20 6.5 20 4.57 18.433 3 16.5 3S13 4.57 13 6.5c0 1.132.548 2.13 1.384 2.77.589.451 1.317.73 2.116.73s1.527-.279 2.116-.73z",
              }),
            ],
            -1,
          ),
        ])),
    ])
  );
}
const nn = K(Ks, [["render", Gs]]),
  Ys = { key: 0, class: "community-indicator" },
  Js = { class: "community-indicator__text" },
  Xs = H({
    __name: "CommunityTweetIndicator",
    props: { communityInfo: {} },
    setup(e) {
      return (t, n) => {
        const o = nn;
        return t.communityInfo
          ? (p(),
            y("div", Ys, [
              g(o, { class: "community-indicator__icon" }),
              a("span", Js, O(t.communityInfo.name), 1),
            ]))
          : S("", !0);
      };
    },
  }),
  Zs = K(Xs, [["__scopeId", "data-v-8cca1f1e"]]),
  Qs = {},
  er = {
    viewBox: "0 0 24 24",
    "aria-label": "Repost Post",
    fill: "currentColor",
    role: "img",
  };
function tr(e, t) {
  return (
    p(),
    y("svg", er, [
      ...(t[0] ||
        (t[0] = [
          a(
            "g",
            null,
            [
              a("path", {
                d: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
              }),
            ],
            -1,
          ),
        ])),
    ])
  );
}
const on = K(Qs, [["render", tr]]),
  nr = { key: 0, class: "retweet-indicator" },
  or = { class: "retweet-indicator__text" },
  sr = H({
    __name: "RetweetIndicator",
    props: { retweetedBy: {} },
    setup(e) {
      return (t, n) => {
        const o = on;
        return t.retweetedBy
          ? (p(),
            y("div", nr, [
              g(o, { class: "retweet-indicator__icon" }),
              a("span", or, O(t.retweetedBy.core?.name) + " reposted", 1),
            ]))
          : S("", !0);
      };
    },
  }),
  rr = K(sr, [["__scopeId", "data-v-4287684a"]]),
  ir = {},
  ar = {
    viewBox: "0 0 24 24",
    "aria-label": "Pin Post",
    fill: "currentColor",
    role: "img",
  };
function lr(e, t) {
  return (
    p(),
    y("svg", ar, [
      ...(t[0] ||
        (t[0] = [
          a(
            "g",
            null,
            [
              a("path", {
                d: "M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z",
              }),
            ],
            -1,
          ),
        ])),
    ])
  );
}
const cr = K(ir, [["render", lr]]),
  ur = {},
  dr = { class: "pinned-tweet-indicator" },
  _r = { class: "pinned-tweet-indicator__content" };
function pr(e, t) {
  const n = cr;
  return (
    p(),
    y("div", dr, [
      a("div", _r, [
        g(n, { class: "pinned-tweet-indicator__icon" }),
        t[0] ||
          (t[0] = a(
            "span",
            { class: "pinned-tweet-indicator__text" },
            "Pinned",
            -1,
          )),
      ]),
    ])
  );
}
const mr = K(ur, [
    ["render", pr],
    ["__scopeId", "data-v-d4dcc918"],
  ]),
  fr = ["innerHTML"],
  wr = H({
    __name: "TweetText",
    props: { text: {}, urls: {} },
    setup(e) {
      const t = e,
        n = te("twitterViewerNavigateToProfile"),
        o = I(() => Xn(t.text, t.urls)),
        s = (i) => {
          const d = i.target;
          if (!d) return;
          const c = d.closest("a");
          if (c && c.classList.contains("tweet-card__mention")) {
            i.preventDefault();
            const l = (c.textContent || "").replace(/^@+/, "").trim();
            if (!l) return;
            n && n(l);
          }
        };
      return (i, d) =>
        i.text
          ? (p(),
            y("div", { key: 0, class: "tweet-text", onClick: s }, [
              a(
                "p",
                { class: "tweet-text__content", innerHTML: r(o) },
                null,
                8,
                fr,
              ),
            ]))
          : S("", !0);
    },
  }),
  Ae = K(wr, [["__scopeId", "data-v-f17b9c66"]]),
  vr = { key: 0, class: "tweet-media__single" },
  gr = { key: 0, class: "tweet-media__image-container" },
  hr = ["src"],
  yr = { key: 1, class: "tweet-media__video-container" },
  br = ["src", "poster", "autoplay", "loop", "muted"],
  Tr = ["src"],
  $r = { class: "tweet-media__video-overlay" },
  kr = { class: "tweet-media__video-type" },
  Cr = ["onClick"],
  Ir = ["src", "alt"],
  Er = { key: 0, class: "tweet-media__more-overlay" },
  Sr = { class: "tweet-media__more-text" },
  Rr = H({
    __name: "TweetMedia",
    props: { media: {}, compact: { type: Boolean, default: !1 } },
    setup(e) {
      const t = e,
        n = L(!1),
        o = L([]),
        s = L(0),
        i = it({});
      (() => {
        t.media.forEach((u) => {
          (u.type === "video" || u.type === "animated_gif") &&
            (i[u.id_str] = !0);
        });
      })();
      const c = (u) => {
          if (u.video_info && u.video_info.variants) {
            const C = u.video_info.variants
              .filter((V) => V.content_type === "video/mp4")
              .sort((V, A) => (A.bitrate || 0) - (V.bitrate || 0));
            if (C.length > 0) return C[0].url;
            if (u.video_info.variants.length > 0)
              return u.video_info.variants[0].url;
          }
          return (
            console.warn("No video_info found for media item:", u.id_str),
            u.media_url_https.replace(/\.(jpg|png)$/, ".mp4")
          );
        },
        l = L({}),
        f = async (u) => {
          ((i[u] = !1), await ye());
          const C = l.value[u];
          C &&
            ((C.muted = !0),
            C.play().catch((V) => console.error("Error playing video:", V)));
        },
        T = (u) => {
          console.log(`Video ${u} started loading`);
        },
        _ = (u) => {
          (console.error(`Video ${u} failed to load, showing thumbnail`),
            (i[u] = !0));
        },
        w = (u) => u.media_url_https,
        h = (u) => {
          const C = t.media.filter((A) => A.type === "photo").map((A) => w(A)),
            V = C.findIndex((A) => A === u);
          ((o.value = C), (s.value = V >= 0 ? V : 0), (n.value = !0));
        },
        m = () => {
          n.value = !1;
        },
        v = (u) => (u === 2 ? "two" : u === 3 ? "three" : "four");
      return (u, C) => {
        const V = ke,
          A = Zn;
        return (
          p(),
          y(
            "div",
            {
              class: ce(["tweet-media", { "tweet-media--compact": u.compact }]),
            },
            [
              u.media.length === 1
                ? (p(),
                  y("div", vr, [
                    u.media[0].type === "photo"
                      ? (p(),
                        y("div", gr, [
                          a(
                            "img",
                            {
                              src: u.media[0].media_url_https + ":large",
                              alt: "Image",
                              class: "tweet-media__image",
                              onClick: C[0] || (C[0] = (P) => h(w(u.media[0]))),
                            },
                            null,
                            8,
                            hr,
                          ),
                        ]))
                      : u.media[0].type === "video" ||
                          u.media[0].type === "animated_gif"
                        ? (p(),
                          y("div", yr, [
                            i[u.media[0].id_str]
                              ? (p(),
                                y(
                                  "div",
                                  {
                                    key: 1,
                                    class: "tweet-media__video-placeholder",
                                    onClick:
                                      C[3] ||
                                      (C[3] = (P) => f(u.media[0].id_str)),
                                  },
                                  [
                                    a(
                                      "img",
                                      {
                                        src: u.media[0].media_url_https,
                                        alt: "Video thumbnail",
                                        class: "tweet-media__video-thumbnail",
                                      },
                                      null,
                                      8,
                                      Tr,
                                    ),
                                    a("div", $r, [
                                      g(
                                        V,
                                        { class: "tweet-media__play-icon" },
                                        { default: R(() => [g(r(Sn))]), _: 1 },
                                      ),
                                    ]),
                                    a(
                                      "div",
                                      kr,
                                      O(
                                        u.media[0].type === "animated_gif"
                                          ? "GIF"
                                          : "Video",
                                      ),
                                      1,
                                    ),
                                  ],
                                ))
                              : (p(),
                                y(
                                  "video",
                                  {
                                    key: 0,
                                    ref: (P) =>
                                      (l.value[u.media[0].id_str] = P),
                                    src: c(u.media[0]),
                                    poster: u.media[0].media_url_https,
                                    controls: "",
                                    autoplay:
                                      u.media[0].type === "animated_gif",
                                    loop: u.media[0].type === "animated_gif",
                                    muted: u.media[0].type === "animated_gif",
                                    class: "tweet-media__video",
                                    onLoadstart:
                                      C[1] ||
                                      (C[1] = (P) => T(u.media[0].id_str)),
                                    onError:
                                      C[2] ||
                                      (C[2] = (P) => _(u.media[0].id_str)),
                                  },
                                  " Your browser does not support the video tag. ",
                                  40,
                                  br,
                                )),
                          ]))
                        : S("", !0),
                  ]))
                : u.media.length > 1
                  ? (p(),
                    y(
                      "div",
                      {
                        key: 1,
                        class: ce([
                          "tweet-media__grid",
                          `tweet-media__grid--${v(u.media.length)}`,
                        ]),
                      },
                      [
                        (p(!0),
                        y(
                          pe,
                          null,
                          Fe(
                            u.media.slice(0, 4),
                            (P, E) => (
                              p(),
                              y(
                                "div",
                                {
                                  key: P.id_str,
                                  class: "tweet-media__grid-item",
                                  onClick: ($) => h(w(P)),
                                },
                                [
                                  a(
                                    "img",
                                    {
                                      src: P.media_url_https + ":medium",
                                      alt: `Image ${E + 1}`,
                                      class: "tweet-media__grid-image",
                                    },
                                    null,
                                    8,
                                    Ir,
                                  ),
                                  E === 3 && u.media.length > 4
                                    ? (p(),
                                      y("div", Er, [
                                        a(
                                          "span",
                                          Sr,
                                          "+" + O(u.media.length - 4),
                                          1,
                                        ),
                                      ]))
                                    : S("", !0),
                                ],
                                8,
                                Cr,
                              )
                            ),
                          ),
                          128,
                        )),
                      ],
                      2,
                    ))
                  : S("", !0),
              n.value
                ? (p(),
                  U(
                    A,
                    {
                      key: 2,
                      "url-list": o.value,
                      "initial-index": s.value,
                      "hide-on-click-modal": !0,
                      "close-on-press-escape": !0,
                      "show-progress": !0,
                      onClose: m,
                    },
                    null,
                    8,
                    ["url-list", "initial-index"],
                  ))
                : S("", !0),
            ],
            2,
          )
        );
      };
    },
  }),
  pt = K(Rr, [["__scopeId", "data-v-68f9309a"]]),
  Pr = { key: 0, class: "link-card-wrapper" },
  Vr = ["href"],
  xr = { key: 0, class: "link-card__image" },
  Lr = ["src", "alt"],
  Or = { key: 0, class: "link-card__title-overlay" },
  Mr = { key: 1, class: "link-card__content" },
  Fr = { class: "link-card__domain" },
  Ar = { class: "link-card__title" },
  Nr = { key: 0, class: "link-card__description" },
  Ur = { key: 0, class: "link-card__title" },
  Dr = {
    key: 1,
    class: "link-card__description link-card__description--large",
  },
  Br = ["href"],
  qr = H({
    __name: "LinkCard",
    props: { tweet: {} },
    setup(e) {
      const t = e,
        n = I(() => {
          const s = (
            t.tweet?.__typename === "TweetWithVisibilityResults"
              ? t.tweet.tweet
              : t.tweet
          )?.card?.legacy;
          if (!s) return null;
          const i = s.binding_values || [],
            d = (f) => i.find((T) => T.key === f)?.value,
            l = (s.name || "").toLowerCase().includes("summary_large_image");
          return {
            url: d("card_url")?.string_value || s.url,
            title: d("title")?.string_value || "",
            description: d("description")?.string_value || "",
            domain:
              d("vanity_url")?.string_value || d("domain")?.string_value || "",
            image:
              d("thumbnail_image_large")?.image_value?.url ||
              d("thumbnail_image")?.image_value?.url,
            isLargeImage: l,
          };
        });
      return (o, s) =>
        r(n)
          ? (p(),
            y("div", Pr, [
              a(
                "a",
                {
                  href: r(n).url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: ce([
                    "link-card",
                    { "link-card--large": r(n).isLargeImage },
                  ]),
                },
                [
                  r(n).image
                    ? (p(),
                      y("div", xr, [
                        a(
                          "img",
                          { src: r(n).image, alt: r(n).title },
                          null,
                          8,
                          Lr,
                        ),
                        r(n).isLargeImage && r(n).title
                          ? (p(), y("div", Or, O(r(n).title), 1))
                          : S("", !0),
                      ]))
                    : S("", !0),
                  !r(n).isLargeImage || !r(n).image
                    ? (p(),
                      y("div", Mr, [
                        a("div", Fr, O(r(n).domain), 1),
                        r(n).isLargeImage
                          ? (p(),
                            y(
                              pe,
                              { key: 1 },
                              [
                                r(n).title
                                  ? (p(), y("div", Ur, O(r(n).title), 1))
                                  : S("", !0),
                                r(n).description
                                  ? (p(), y("div", Dr, O(r(n).description), 1))
                                  : S("", !0),
                              ],
                              64,
                            ))
                          : (p(),
                            y(
                              pe,
                              { key: 0 },
                              [
                                a("div", Ar, O(r(n).title), 1),
                                r(n).description
                                  ? (p(), y("div", Nr, O(r(n).description), 1))
                                  : S("", !0),
                              ],
                              64,
                            )),
                      ]))
                    : S("", !0),
                ],
                10,
                Vr,
              ),
              r(n).isLargeImage && r(n).domain
                ? (p(),
                  y(
                    "a",
                    {
                      key: 0,
                      href: r(n).url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "link-card-source",
                    },
                    " æ¥è‡ª " + O(r(n).domain),
                    9,
                    Br,
                  ))
                : S("", !0),
            ]))
          : S("", !0);
    },
  }),
  Hr = K(qr, [["__scopeId", "data-v-3c456c6e"]]),
  Wr = ["href"],
  jr = { key: 0, class: "article-card__cover" },
  Kr = ["src", "alt"],
  zr = { class: "article-card__content" },
  Gr = { class: "article-card__title" },
  Yr = ["innerHTML"],
  Jr = H({
    __name: "ArticleCard",
    props: { tweet: {} },
    setup(e) {
      const t = e,
        n = I(() => {
          const d = (
            t.tweet?.__typename === "TweetWithVisibilityResults"
              ? t.tweet.tweet
              : t.tweet
          )?.article?.article_results?.result;
          return d
            ? {
                title: d.title || "",
                previewText: d.preview_text || "",
                coverImage: d.cover_media?.media_info?.original_img_url || "",
                restId: d.rest_id,
              }
            : null;
        }),
        o = I(() =>
          n.value ? `https://x.com/i/article/${n.value.restId}` : "",
        ),
        s = I(() =>
          (n.value?.previewText || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br>"),
        );
      return (i, d) =>
        r(n)
          ? (p(),
            y(
              "a",
              {
                key: 0,
                href: r(o),
                target: "_blank",
                rel: "noopener noreferrer",
                class: "article-card",
              },
              [
                r(n).coverImage
                  ? (p(),
                    y("div", jr, [
                      a(
                        "img",
                        { src: r(n).coverImage, alt: r(n).title },
                        null,
                        8,
                        Kr,
                      ),
                      d[0] ||
                        (d[0] = a(
                          "span",
                          { class: "article-card__badge" },
                          [
                            a(
                              "svg",
                              {
                                class: "article-card__badge-icon",
                                viewBox: "0 0 24 24",
                                fill: "currentColor",
                              },
                              [
                                a("path", {
                                  d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                                }),
                              ],
                            ),
                            re(" æ–‡ç«  "),
                          ],
                          -1,
                        )),
                    ]))
                  : S("", !0),
                a("div", zr, [
                  a("div", Gr, O(r(n).title), 1),
                  r(n).previewText
                    ? (p(),
                      y(
                        "div",
                        {
                          key: 0,
                          class: "article-card__preview",
                          innerHTML: r(s),
                        },
                        null,
                        8,
                        Yr,
                      ))
                    : S("", !0),
                ]),
              ],
              8,
              Wr,
            ))
          : S("", !0);
    },
  }),
  Xr = K(Jr, [["__scopeId", "data-v-5af8cfda"]]),
  mt = (e) => {
    const t = te("twitterViewerNavigateToProfile");
    return {
      navigateToProfile: t,
      onProfileClick: () => {
        const o = e.value;
        o && t && t(o);
      },
    };
  },
  Zr = {},
  Qr = {
    viewBox: "0 0 24 24",
    "aria-label": "Comment Post",
    fill: "currentColor",
    role: "img",
  };
function ei(e, t) {
  return (
    p(),
    y("svg", Qr, [
      ...(t[0] ||
        (t[0] = [
          a(
            "g",
            null,
            [
              a("path", {
                d: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
              }),
            ],
            -1,
          ),
        ])),
    ])
  );
}
const ti = K(Zr, [["render", ei]]),
  ni = {},
  oi = {
    viewBox: "0 0 24 24",
    "aria-label": "Like Post",
    fill: "currentColor",
    role: "img",
  };
function si(e, t) {
  return (
    p(),
    y("svg", oi, [
      ...(t[0] ||
        (t[0] = [
          a(
            "g",
            null,
            [
              a("path", {
                d: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
              }),
            ],
            -1,
          ),
        ])),
    ])
  );
}
const ri = K(ni, [["render", si]]),
  ii = {},
  ai = {
    viewBox: "0 0 24 24",
    "aria-label": "Save Post",
    fill: "currentColor",
    role: "img",
  };
function li(e, t) {
  return (
    p(),
    y("svg", ai, [
      ...(t[0] ||
        (t[0] = [
          a(
            "g",
            null,
            [
              a("path", {
                d: "M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z",
              }),
            ],
            -1,
          ),
        ])),
    ])
  );
}
const ci = K(ii, [["render", li]]),
  ui = { class: "tweet-stats" },
  di = { class: "tweet-stats__stat" },
  _i = { class: "tweet-stats__stat-number" },
  pi = { class: "tweet-stats__stat" },
  mi = { class: "tweet-stats__stat-number" },
  fi = { class: "tweet-stats__stat" },
  wi = { class: "tweet-stats__stat-number" },
  vi = { key: 0, class: "tweet-stats__stat" },
  gi = { class: "tweet-stats__stat-number" },
  hi = { key: 1, class: "tweet-stats__stat" },
  yi = { class: "tweet-stats__stat-number" },
  bi = H({
    __name: "TweetStats",
    props: { stats: {}, viewCount: {} },
    setup(e) {
      return (t, n) => {
        const o = ti,
          s = on,
          i = ri,
          d = ci,
          c = Qn;
        return (
          p(),
          y("div", ui, [
            a("div", di, [
              g(o, { class: "tweet-stats__stat-icon" }),
              a("span", _i, O(r(Le)(t.stats.reply_count)), 1),
            ]),
            a("div", pi, [
              g(s, { class: "tweet-stats__stat-icon" }),
              a("span", mi, O(r(Le)(t.stats.retweet_count)), 1),
            ]),
            a("div", fi, [
              g(i, { class: "tweet-stats__stat-icon" }),
              a("span", wi, O(r(Le)(t.stats.favorite_count)), 1),
            ]),
            t.stats.bookmark_count !== void 0
              ? (p(),
                y("div", vi, [
                  g(d, { class: "tweet-stats__stat-icon" }),
                  a("span", gi, O(r(Le)(t.stats.bookmark_count)), 1),
                ]))
              : S("", !0),
            t.viewCount
              ? (p(),
                y("div", hi, [
                  g(c, { class: "tweet-stats__stat-icon" }),
                  a("span", yi, O(r(Le)(parseInt(t.viewCount))), 1),
                ]))
              : S("", !0),
          ])
        );
      };
    },
  }),
  sn = K(bi, [["__scopeId", "data-v-383c5350"]]),
  Ti = { key: 0, class: "quoted-tweet" },
  $i = { class: "quoted-tweet__header" },
  ki = ["src", "alt"],
  Ci = { class: "quoted-tweet__time" },
  Ii = { key: 1, class: "quoted-tweet__media" },
  Ei = H({
    __name: "QuotedTweetCard",
    props: { quotedTweet: {} },
    setup(e) {
      const t = e,
        n = I(() =>
          t.quotedTweet.__typename === "TweetWithVisibilityResults"
            ? t.quotedTweet.tweet
            : t.quotedTweet,
        ),
        o = I(() => n.value.core?.user_results?.result),
        s = I(() => Je(o.value)),
        i = I(() => dt(o.value)),
        d = I(() => _t(o.value)),
        { onProfileClick: c } = mt(d),
        l = I(() =>
          n.value.note_tweet
            ? n.value.note_tweet.note_tweet_results.result.text
            : n.value.legacy?.full_text || "",
        ),
        f = I(() => n.value.legacy?.entities?.urls || []),
        T = I(
          () =>
            !!(
              n.value.legacy?.entities?.media ||
              n.value.legacy?.extended_entities?.media
            ),
        ),
        _ = I(
          () =>
            n.value.legacy?.extended_entities?.media ||
            n.value.legacy?.entities?.media,
        ),
        w = I(() =>
          n.value.legacy?.created_at ? Ht(n.value.legacy.created_at) : "",
        );
      return (h, m) =>
        h.quotedTweet && r(o)
          ? (p(),
            y("div", Ti, [
              a("div", $i, [
                a(
                  "img",
                  {
                    src: r(s),
                    alt: `${r(i)} avatar`,
                    class: "quoted-tweet__avatar",
                  },
                  null,
                  8,
                  ki,
                ),
                a(
                  "a",
                  {
                    href: "#",
                    onClick:
                      m[0] ||
                      (m[0] = _e((...v) => r(c) && r(c)(...v), ["prevent"])),
                    class: "quoted-tweet__name",
                  },
                  O(r(i)),
                  1,
                ),
                g(Ge, { user: r(o) }, null, 8, ["user"]),
                a(
                  "a",
                  {
                    href: "#",
                    onClick:
                      m[1] ||
                      (m[1] = _e((...v) => r(c) && r(c)(...v), ["prevent"])),
                    class: "quoted-tweet__username",
                  },
                  "@" + O(r(d)),
                  1,
                ),
                m[2] ||
                  (m[2] = a(
                    "span",
                    { class: "quoted-tweet__separator" },
                    "Â·",
                    -1,
                  )),
                a("span", Ci, O(r(w)), 1),
              ]),
              r(l)
                ? (p(),
                  U(
                    Ae,
                    {
                      key: 0,
                      text: r(l),
                      urls: r(f),
                      class: "quoted-tweet__text",
                    },
                    null,
                    8,
                    ["text", "urls"],
                  ))
                : S("", !0),
              r(T)
                ? (p(),
                  y("div", Ii, [g(pt, { media: r(_) }, null, 8, ["media"])]))
                : S("", !0),
            ]))
          : S("", !0);
    },
  }),
  rn = K(Ei, [["__scopeId", "data-v-6a3dc4d9"]]),
  ft = (e) => {
    const t = I(() =>
        e.__typename === "TweetWithVisibilityResults" ? e.tweet : e,
      ),
      n = I(
        () =>
          e.__typename === "TweetWithVisibilityResults" ||
          !!t.value.author_community_relationship,
      ),
      o = I(() =>
        t.value.author_community_relationship
          ? t.value.author_community_relationship.community_results.result
          : null,
      ),
      s = I(
        () =>
          t.value.isRetweet ||
          !!t.value.legacy.retweeted_status_result ||
          t.value.legacy.full_text?.startsWith("RT @"),
      ),
      i = I(() => {
        if (t.value.legacy.retweeted_status_result) {
          const C = t.value.legacy.retweeted_status_result.result;
          return C.__typename === "TweetWithVisibilityResults" ? C.tweet : C;
        }
        return null;
      }),
      d = I(() => t.value.core?.user_results?.result),
      c = I(() => (i.value ? i.value.core?.user_results?.result : null)),
      l = I(() => {
        const C = t.value;
        return C.isRetweet ? C.retweetedBy : i.value ? d.value : null;
      }),
      f = I(() => {
        if (c.value) return c.value;
        const C = t.value;
        return C.isRetweet && C.originalUsername
          ? {
              avatar: {
                image_url:
                  "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
              },
              core: {
                created_at: new Date().toISOString(),
                name: C.originalUsername,
                screen_name: C.originalUsername,
              },
              legacy: {
                name: C.originalUsername,
                screen_name: C.originalUsername,
                profile_image_url_https:
                  "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
                verified: !1,
              },
              is_blue_verified: !1,
            }
          : null;
      }),
      T = I(() =>
        i.value
          ? i.value.legacy?.full_text || ""
          : t.value.legacy?.full_text || "",
      ),
      _ = I(() => i.value || t.value),
      w = I(() => {
        const C = _.value;
        return C.legacy.entities.media && C.legacy.entities.media.length > 0;
      }),
      h = I(() => {
        const C = _.value.quoted_status_result?.result;
        return C || null;
      }),
      m = I(() => !!_.value.card?.legacy),
      v = I(() => !!_.value.article?.article_results?.result),
      u = I(() => (s.value && f.value ? f.value : d.value));
    return {
      actualTweet: t,
      isCommunityTweet: n,
      communityInfo: o,
      isRetweet: s,
      retweetedBy: l,
      tweetUser: d,
      originalAuthor: f,
      displayUser: u,
      tweetContent: T,
      displayTweetData: _,
      hasMedia: w,
      hasCard: m,
      hasArticle: v,
      quotedTweet: h,
    };
  },
  Si = { key: 0, class: "base-tweet" },
  Ri = { class: "base-tweet__avatar-column" },
  Pi = ["src", "alt"],
  Vi = { class: "base-tweet__content-column" },
  xi = { class: "base-tweet__header" },
  Li = { class: "base-tweet__user-names" },
  Oi = { class: "base-tweet__time" },
  Mi = { key: 0, class: "base-tweet__count" },
  Fi = { key: 2, class: "base-tweet__media" },
  Ai = H({
    __name: "BaseTweet",
    props: {
      tweet: {},
      showFullDate: { type: Boolean, default: !1 },
      tweetCount: { default: "" },
    },
    setup(e) {
      const t = e,
        {
          displayUser: n,
          tweetContent: o,
          displayTweetData: s,
          hasMedia: i,
          hasCard: d,
          hasArticle: c,
          quotedTweet: l,
        } = ft(t.tweet),
        f = I(() => Je(n.value)),
        T = I(() => dt(n.value)),
        _ = I(() => _t(n.value)),
        { onProfileClick: w } = mt(_),
        h = I(() => {
          const P = s.value.card?.legacy;
          if (!P) return !1;
          const E = P.binding_values || [],
            $ = (q) => E.find((D) => D.key === q)?.value;
          return !!(
            $("thumbnail_image_large")?.image_value?.url ||
            $("thumbnail_image")?.image_value?.url
          );
        }),
        m = I(() => s.value.legacy?.entities?.urls || []),
        v = (P) => P.replace(/(\s+)?https?:\/\/\S+$/g, "").trim(),
        u = I(() =>
          o.value ? (h.value || c.value ? v(o.value) : o.value) : "",
        ),
        C = I(() => {
          const P = s.value.note_tweet?.note_tweet_results?.result?.text || "";
          return h.value || c.value ? v(P) : P;
        }),
        V = I(() => {
          const P = s.value.legacy.created_at;
          return t.showFullDate ? Wt(P) : Ht(P);
        }),
        A = I(
          () =>
            n.value &&
            "__typename" in n.value &&
            "id" in n.value &&
            "rest_id" in n.value,
        );
      return (P, E) =>
        r(n)
          ? (p(),
            y("div", Si, [
              a("div", Ri, [
                a(
                  "img",
                  {
                    src: r(f),
                    alt: `${r(T)} avatar`,
                    class: "base-tweet__avatar",
                  },
                  null,
                  8,
                  Pi,
                ),
              ]),
              a("div", Vi, [
                a("div", xi, [
                  a("div", Li, [
                    a(
                      "a",
                      {
                        href: "#",
                        onClick:
                          E[0] ||
                          (E[0] = _e(
                            (...$) => r(w) && r(w)(...$),
                            ["prevent"],
                          )),
                        class: "base-tweet__display-name",
                      },
                      O(r(T)),
                      1,
                    ),
                    r(A) && r(n)
                      ? (p(), U(Ge, { key: 0, user: r(n) }, null, 8, ["user"]))
                      : S("", !0),
                    a(
                      "a",
                      {
                        href: "#",
                        onClick:
                          E[1] ||
                          (E[1] = _e(
                            (...$) => r(w) && r(w)(...$),
                            ["prevent"],
                          )),
                        class: "base-tweet__username",
                      },
                      "@" + O(r(_)),
                      1,
                    ),
                    E[2] ||
                      (E[2] = a(
                        "span",
                        { class: "base-tweet__separator" },
                        "Â·",
                        -1,
                      )),
                    a("span", Oi, O(r(V)), 1),
                  ]),
                  P.tweetCount
                    ? (p(), y("div", Mi, O(P.tweetCount), 1))
                    : S("", !0),
                ]),
                r(s).note_tweet
                  ? (p(),
                    U(Ae, { key: 0, text: r(C), urls: r(m) }, null, 8, [
                      "text",
                      "urls",
                    ]))
                  : r(u)
                    ? (p(),
                      U(Ae, { key: 1, text: r(u), urls: r(m) }, null, 8, [
                        "text",
                        "urls",
                      ]))
                    : S("", !0),
                r(i)
                  ? (p(),
                    y("div", Fi, [
                      g(pt, { media: r(s).legacy.entities.media }, null, 8, [
                        "media",
                      ]),
                    ]))
                  : S("", !0),
                r(c)
                  ? (p(), U(Xr, { key: 3, tweet: r(s) }, null, 8, ["tweet"]))
                  : r(d) && !r(l)
                    ? (p(), U(Hr, { key: 4, tweet: r(s) }, null, 8, ["tweet"]))
                    : S("", !0),
                r(l)
                  ? (p(),
                    U(rn, { key: 5, "quoted-tweet": r(l) }, null, 8, [
                      "quoted-tweet",
                    ]))
                  : S("", !0),
                g(
                  sn,
                  {
                    stats: {
                      reply_count: r(s).legacy.reply_count,
                      retweet_count: r(s).legacy.retweet_count,
                      favorite_count: r(s).legacy.favorite_count,
                      bookmark_count: r(s).legacy.bookmark_count,
                    },
                    "view-count": r(s).views?.count,
                  },
                  null,
                  8,
                  ["stats", "view-count"],
                ),
              ]),
            ]))
          : S("", !0);
    },
  }),
  Ni = K(Ai, [["__scopeId", "data-v-2f70c92c"]]),
  Ui = { class: "thread-tweet-item__avatar-column" },
  Di = ["src", "alt"],
  Bi = { key: 0, class: "thread-tweet-item__line" },
  qi = { class: "thread-tweet-item__content-column" },
  Hi = { class: "thread-tweet-item__header" },
  Wi = { class: "thread-tweet-item__user-names" },
  ji = { class: "thread-tweet-item__time" },
  Ki = { key: 2, class: "thread-tweet-item__media" },
  zi = H({
    __name: "ThreadTweetItem",
    props: { tweet: {}, hasNext: { type: Boolean, default: !1 } },
    setup(e) {
      const t = e,
        {
          displayUser: n,
          tweetContent: o,
          displayTweetData: s,
          hasMedia: i,
          quotedTweet: d,
        } = ft(t.tweet),
        c = I(() => Je(n.value)),
        l = I(() => dt(n.value)),
        f = I(() => _t(n.value)),
        { onProfileClick: T } = mt(f),
        _ = I(() => s.value.legacy?.entities?.urls || []),
        w = I(() => Wt(s.value.legacy.created_at)),
        h = I(
          () =>
            n.value &&
            "__typename" in n.value &&
            "id" in n.value &&
            "rest_id" in n.value,
        );
      return (m, v) =>
        r(n)
          ? (p(),
            y(
              "div",
              {
                key: 0,
                class: ce([
                  "thread-tweet-item",
                  { "thread-tweet-item--has-next": m.hasNext },
                ]),
              },
              [
                a("div", Ui, [
                  a(
                    "img",
                    {
                      src: r(c),
                      alt: `${r(l)} avatar`,
                      class: "thread-tweet-item__avatar",
                    },
                    null,
                    8,
                    Di,
                  ),
                  m.hasNext ? (p(), y("div", Bi)) : S("", !0),
                ]),
                a("div", qi, [
                  a("div", Hi, [
                    a("div", Wi, [
                      a(
                        "a",
                        {
                          href: "#",
                          onClick:
                            v[0] ||
                            (v[0] = _e(
                              (...u) => r(T) && r(T)(...u),
                              ["prevent"],
                            )),
                          class: "thread-tweet-item__display-name",
                        },
                        O(r(l)),
                        1,
                      ),
                      r(h) && r(n)
                        ? (p(),
                          U(Ge, { key: 0, user: r(n) }, null, 8, ["user"]))
                        : S("", !0),
                      a(
                        "a",
                        {
                          href: "#",
                          onClick:
                            v[1] ||
                            (v[1] = _e(
                              (...u) => r(T) && r(T)(...u),
                              ["prevent"],
                            )),
                          class: "thread-tweet-item__username",
                        },
                        "@" + O(r(f)),
                        1,
                      ),
                      v[2] ||
                        (v[2] = a(
                          "span",
                          { class: "thread-tweet-item__separator" },
                          "Â·",
                          -1,
                        )),
                      a("span", ji, O(r(w)), 1),
                    ]),
                  ]),
                  r(s).note_tweet
                    ? (p(),
                      U(
                        Ae,
                        {
                          key: 0,
                          text: r(s).note_tweet.note_tweet_results.result.text,
                          urls: r(_),
                        },
                        null,
                        8,
                        ["text", "urls"],
                      ))
                    : r(o)
                      ? (p(),
                        U(Ae, { key: 1, text: r(o), urls: r(_) }, null, 8, [
                          "text",
                          "urls",
                        ]))
                      : S("", !0),
                  r(i)
                    ? (p(),
                      y("div", Ki, [
                        g(pt, { media: r(s).legacy.entities.media }, null, 8, [
                          "media",
                        ]),
                      ]))
                    : S("", !0),
                  r(d)
                    ? (p(),
                      U(rn, { key: 3, "quoted-tweet": r(d) }, null, 8, [
                        "quoted-tweet",
                      ]))
                    : S("", !0),
                  g(
                    sn,
                    {
                      stats: {
                        reply_count: r(s).legacy.reply_count,
                        retweet_count: r(s).legacy.retweet_count,
                        favorite_count: r(s).legacy.favorite_count,
                        bookmark_count: r(s).legacy.bookmark_count,
                      },
                      "view-count": r(s).views?.count,
                    },
                    null,
                    8,
                    ["stats", "view-count"],
                  ),
                ]),
              ],
              2,
            ))
          : S("", !0);
    },
  }),
  Gi = K(zi, [["__scopeId", "data-v-6525c65f"]]),
  Yi = { class: "thread-tweet-card" },
  Ji = H({
    __name: "ThreadTweetCard",
    props: { items: {} },
    setup(e) {
      const t = e,
        n = I(() =>
          t.items.map((s) => {
            const i = s.tweetResult;
            return i.__typename === "TweetWithVisibilityResults"
              ? { ...i, socialContext: s.socialContext }
              : { ...i, socialContext: s.socialContext };
          }),
        ),
        o = (s) =>
          s.__typename === "TweetWithVisibilityResults"
            ? s.tweet.rest_id
            : s.rest_id;
      return (s, i) => (
        p(),
        y("div", Yi, [
          (p(!0),
          y(
            pe,
            null,
            Fe(
              r(n),
              (d, c) => (
                p(),
                U(
                  Gi,
                  { key: o(d), tweet: d, "has-next": c < r(n).length - 1 },
                  null,
                  8,
                  ["tweet", "has-next"],
                )
              ),
            ),
            128,
          )),
        ])
      );
    },
  }),
  Xi = K(Ji, [["__scopeId", "data-v-4fe7a340"]]),
  Zi = { class: "tweet-card" },
  Qi = { class: "tweet-card__content" },
  ea = H({
    __name: "TweetCard",
    props: {
      tweet: {},
      showFullDate: { type: Boolean },
      showCommunity: { type: Boolean, default: !0 },
      tweetCount: {},
      originalUser: {},
      socialContext: {},
    },
    setup(e) {
      const t = e,
        n = I(() => t.tweet.__typename === "Thread" || t.tweet.isThread),
        o = I(() => (n.value ? t.tweet.items : [])),
        s = I(() => !n.value && t.tweet.isPinned === !0),
        {
          isCommunityTweet: i,
          communityInfo: d,
          isRetweet: c,
          retweetedBy: l,
        } = ft(t.tweet);
      return (f, T) => (
        p(),
        y("div", Zi, [
          r(n)
            ? (p(), U(Xi, { key: 0, items: r(o) }, null, 8, ["items"]))
            : (p(),
              y(
                pe,
                { key: 1 },
                [
                  r(s) ? (p(), U(mr, { key: 0 })) : S("", !0),
                  t.showCommunity && r(i)
                    ? (p(),
                      U(Zs, { key: 1, "community-info": r(d) }, null, 8, [
                        "community-info",
                      ]))
                    : S("", !0),
                  r(c) && r(l)
                    ? (p(),
                      U(rr, { key: 2, "retweeted-by": r(l) }, null, 8, [
                        "retweeted-by",
                      ]))
                    : S("", !0),
                  a("div", Qi, [
                    g(
                      Ni,
                      {
                        tweet: f.tweet,
                        "show-full-date": f.showFullDate,
                        "tweet-count": f.tweetCount,
                      },
                      null,
                      8,
                      ["tweet", "show-full-date", "tweet-count"],
                    ),
                  ]),
                ],
                64,
              )),
        ])
      );
    },
  }),
  ot = K(ea, [["__scopeId", "data-v-b925201a"]]),
  ta = { class: "tweet-list" },
  na = { key: 0, class: "tweet-list__loading" },
  oa = { class: "tweet-skeleton" },
  sa = { class: "tweet-skeleton__content" },
  ra = { key: 1, class: "tweet-list__empty" },
  ia = { key: 2, class: "tweet-list__content" },
  aa = { key: 0, class: "tweet-list__loading-more" },
  la = H({
    __name: "TweetList",
    props: { tweets: {}, loading: { type: Boolean, default: !1 } },
    setup(e) {
      const t = (o) =>
          o.__typename === "Thread" || o.isThread
            ? o.items?.[0]?.tweetResult?.rest_id || `thread-${Date.now()}`
            : o.__typename === "TweetWithVisibilityResults"
              ? o.tweet.rest_id
              : o.rest_id,
        n = (o) => o.socialContext || null;
      return (o, s) => {
        const i = to,
          d = eo,
          c = no,
          l = ke;
        return (
          p(),
          y("div", ta, [
            o.loading && o.tweets.length === 0
              ? (p(),
                y("div", na, [
                  (p(),
                  y(
                    pe,
                    null,
                    Fe(5, (f) =>
                      a("div", { class: "tweet-list__loading-item", key: f }, [
                        g(
                          d,
                          { animated: "" },
                          {
                            template: R(() => [
                              a("div", oa, [
                                g(i, {
                                  variant: "circle",
                                  style: { width: "48px", height: "48px" },
                                }),
                                a("div", sa, [
                                  g(i, {
                                    variant: "text",
                                    style: {
                                      width: "30%",
                                      "margin-bottom": "8px",
                                    },
                                  }),
                                  g(i, {
                                    variant: "text",
                                    style: {
                                      width: "100%",
                                      "margin-bottom": "4px",
                                    },
                                  }),
                                  g(i, {
                                    variant: "text",
                                    style: {
                                      width: "80%",
                                      "margin-bottom": "8px",
                                    },
                                  }),
                                  g(i, {
                                    variant: "text",
                                    style: { width: "60%" },
                                  }),
                                ]),
                              ]),
                            ]),
                            _: 1,
                          },
                        ),
                      ]),
                    ),
                    64,
                  )),
                ]))
              : o.tweets.length === 0
                ? (p(),
                  y("div", ra, [g(c, { description: "No tweets found" })]))
                : (p(),
                  y("div", ia, [
                    (p(!0),
                    y(
                      pe,
                      null,
                      Fe(
                        o.tweets,
                        (f) => (
                          p(),
                          U(
                            ot,
                            {
                              key: t(f),
                              tweet: f,
                              "social-context": n(f),
                              class: "tweet-list__item",
                            },
                            null,
                            8,
                            ["tweet", "social-context"],
                          )
                        ),
                      ),
                      128,
                    )),
                    o.loading
                      ? (p(),
                        y("div", aa, [
                          g(
                            l,
                            { class: "is-loading" },
                            { default: R(() => [g(r(Rn))]), _: 1 },
                          ),
                          s[0] ||
                            (s[0] = a("span", null, "Loading more...", -1)),
                        ]))
                      : S("", !0),
                  ])),
          ])
        );
      };
    },
  }),
  ca = K(la, [["__scopeId", "data-v-3a4a9be4"]]),
  ua = (e) => {
    const t = e.trim();
    if (!t) return { isValid: !1, error: "Please enter a tweet URL." };
    const n = t.startsWith("http") ? t : `https://${t}`;
    try {
      const o = new URL(n),
        s = o.hostname.toLowerCase(),
        i = o.pathname;
      if (
        !["twitter.com", "x.com", "www.twitter.com", "www.x.com"].some(
          (f) => s === f || s.endsWith("." + f),
        )
      )
        return { isValid: !1, error: "Please enter a valid tweet URL." };
      const l = i.match(/^\/([a-zA-Z0-9_]{1,15})\/status\/(\d+)\/?$/);
      if (l && l[2]) return { isValid: !0, tweetId: l[2] };
    } catch {}
    return { isValid: !1, error: "Please enter a valid tweet URL." };
  },
  Ct = (e) => {
    const t = e.trim();
    if (!t) return { isValid: !1 };
    const n = t.startsWith("http") ? t : `https://${t}`;
    try {
      const o = new URL(n),
        s = o.hostname.toLowerCase(),
        i = o.pathname;
      if (
        !["twitter.com", "x.com", "www.twitter.com", "www.x.com"].some(
          (f) => s === f || s.endsWith("." + f),
        )
      )
        return { isValid: !1 };
      const l = i.match(/^\/([a-zA-Z0-9_]{1,15})\/status\/(\d+)\/?$/);
      return l
        ? { isValid: !0, username: l[1], tweetId: l[2] }
        : { isValid: !1 };
    } catch {
      return { isValid: !1 };
    }
  },
  da = { class: "tweet-viewer-tab" },
  _a = { class: "tweet-viewer-tab__search" },
  pa = { class: "tweet-viewer-tab__search-container" },
  ma = { key: 0, class: "tweet-viewer-tab__error" },
  fa = { class: "tweet-viewer-tab__error-container" },
  wa = { class: "tweet-viewer-tab__results-container" },
  va = { class: "tweet-viewer-tab__tweet-detail", id: "tweet-export-area" },
  ga = { class: "tweet-viewer-tab__tweet-detail-header" },
  ha = { key: 0, class: "tweet-viewer-tab__community-info" },
  ya = { class: "tweet-viewer-tab__community-text" },
  ba = { key: 1 },
  Ta = { class: "tweet-viewer-tab__actions no-export" },
  $a = { class: "tweet-viewer-tab__main-tweet" },
  ka = { key: 0, class: "tweet-viewer-tab__show-threads no-export" },
  Ca = { key: 0, class: "tweet-viewer-tab__thread" },
  Ia = { key: 0, class: "tweet-viewer-tab__show-threads no-export" },
  Ea = "Enter tweet URL (https://x.com/username/status/1234567890)",
  Sa = H({
    __name: "TweetViewer",
    setup(e) {
      const t = L(""),
        n = L(!1),
        o = L(""),
        s = At("resultsRef"),
        i = Kt(),
        d = (E, $) => {
          $([]);
        },
        c = L(null),
        l = L([]),
        f = L(!1),
        T = L(0),
        _ = I(() => {
          if (!c.value) return null;
          const E =
            c.value.__typename === "TweetWithVisibilityResults"
              ? c.value.tweet
              : c.value;
          return E.author_community_relationship
            ? E.author_community_relationship.community_results.result
            : null;
        }),
        w = I(() => !t.value.trim() || n.value),
        h = async () => {
          if ((await ye(), !s.value)) return;
          const $ = s.value.getBoundingClientRect(),
            D = window.scrollY + $.top - 24;
          window.scrollTo({ top: Math.max(0, D), behavior: "smooth" });
        },
        m = () => {
          ((o.value = ""),
            (c.value = null),
            (l.value = []),
            (f.value = !1),
            (T.value = 0));
        },
        v = () => {
          f.value = !0;
          const E = l.value.length,
            $ = 19;
          ((T.value = E <= $ ? E : $),
            i.send(820012, { thread_total: E, tweet_url: t.value.trim() }));
        },
        u = () => {
          ((T.value = Math.min(l.value.length, T.value + 20)),
            i.send(820013, {
              thread_total: l.value.length,
              tweet_url: t.value.trim(),
            }));
        };
      me(
        () => ({ detail: c.value, loading: n.value }),
        async ({ detail: E, loading: $ }) => {
          E && !$ && (await h());
        },
      );
      const C = async () => {
          const E = t.value.trim(),
            $ = ua(E);
          if (!$.isValid) {
            ((o.value = $.error || "Please enter a valid tweet URL."),
              i.send(820008, { tweet_url: E, error_message: o.value }));
            return;
          }
          const q = $.tweetId;
          (m(), (n.value = !0));
          try {
            i.send(820009, { tweet_url: E });
            const D = 15e3,
              ne =
                (
                  (
                    await Promise.race([
                      io(q),
                      new Promise((M, F) =>
                        setTimeout(() => F(new Error("timeout")), D),
                      ),
                    ])
                  ).data.data.threaded_conversation_with_injections_v2
                    .instructions || []
                ).find((M) => M.type === "TimelineAddEntries")?.entries || [],
              N = [];
            for (const M of ne)
              if (
                M.content?.entryType === "TimelineTimelineItem" &&
                M.content?.itemContent?.itemType === "TimelineTweet"
              ) {
                const F = M.content.itemContent.tweet_results?.result;
                F &&
                  (F.__typename === "Tweet" ||
                    F.__typename === "TweetWithVisibilityResults") &&
                  N.push(F);
              } else if (M.content?.entryType === "TimelineTimelineModule") {
                const F = M.content.items || [];
                for (const ee of F)
                  if (ee.item?.itemContent?.itemType === "TimelineTweet") {
                    const z = ee.item.itemContent.tweet_results?.result;
                    z &&
                      (z.__typename === "Tweet" ||
                        z.__typename === "TweetWithVisibilityResults") &&
                      N.push(z);
                  }
              }
            if (N.length === 0) {
              o.value = "Tweet not found or has been deleted.";
              return;
            }
            const oe = N.findIndex(
                (M) =>
                  (M.__typename === "TweetWithVisibilityResults"
                    ? M.tweet.rest_id
                    : M.rest_id) === q,
              ),
              ae = oe > -1 ? N[oe] : N[0],
              k =
                ae.__typename === "TweetWithVisibilityResults" ? ae.tweet : ae,
              b = N.findIndex((M) => {
                const F =
                  M.__typename === "TweetWithVisibilityResults" ? M.tweet : M;
                return F.rest_id === F.legacy.conversation_id_str;
              }),
              x = b > -1 ? N[b] : ae,
              j = x.__typename === "TweetWithVisibilityResults" ? x.tweet : x,
              W = k.rest_id === k.legacy.conversation_id_str;
            let Q = [];
            const J = j.core.user_results.result.rest_id,
              fe = j.legacy.conversation_id_str;
            if (
              (W &&
                (Q = N.filter((M) => {
                  const F =
                    M.__typename === "TweetWithVisibilityResults" ? M.tweet : M;
                  if (F.rest_id === j.rest_id) return !1;
                  const ee = F.core.user_results.result.rest_id === J,
                    z = F.legacy.conversation_id_str === fe,
                    Y =
                      F.legacy.in_reply_to_user_id_str &&
                      F.legacy.in_reply_to_user_id_str !== J;
                  return z && ee && !Y;
                })),
              (c.value = ae),
              (l.value = Q),
              (T.value = Math.min(20, l.value.length)),
              i.send(820010, { tweet_url: E }),
              typeof window < "u")
            ) {
              const M = Ct(E);
              if (M.isValid && M.username && M.tweetId) {
                const F = new URL(window.location.href);
                (F.searchParams.set("type", "tweet"),
                  F.searchParams.set("username", M.username),
                  F.searchParams.set("id", M.tweetId),
                  F.searchParams.delete("tab"),
                  F.searchParams.delete("url"),
                  window.history.replaceState({}, "", F.toString()));
              }
            }
          } catch (D) {
            (i.send(820011, {
              tweet_url: E,
              error_type:
                D?.message === "timeout" ? "timeout" : "request_failed",
            }),
              D?.message === "timeout"
                ? await Be.alert(
                    "Request timed out. Please try again later.",
                    "Error",
                    { type: "error" },
                  )
                : await Be.alert(
                    "Failed to load tweet. Please try again later.",
                    "Error",
                    { type: "error" },
                  ));
          } finally {
            n.value = !1;
          }
        },
        V = L(!1),
        A = async (E) => {
          i.send(820015, { format: E, tweet_url: t.value.trim() });
          const $ = document.getElementById("tweet-export-area");
          if (!$) return;
          const q = (
              await Ze(
                async () => {
                  const { default: N } = await import("./pv_kU_aj.js");
                  return { default: N };
                },
                [],
                import.meta.url,
              )
            ).default,
            { saveAs: D } = await Ze(
              async () => {
                const { saveAs: N } = await import("./CNLo03QH.js");
                return { saveAs: N };
              },
              __vite__mapDeps([0, 1, 2]),
              import.meta.url,
            );
          ((V.value = !0),
            await ye(),
            await new Promise((N) => requestAnimationFrame(() => N())),
            await new Promise((N) => setTimeout(() => N(), 120)));
          const B = 19,
            G = $.querySelectorAll(".tweet-viewer-tab__thread-item"),
            Z = G.length > B,
            ne = [];
          if (Z)
            for (let N = B; N < G.length; N++) {
              const oe = G[N];
              ((oe.style.display = "none"), ne.push(oe));
            }
          try {
            const N = await q($, {
              useCORS: !0,
              allowTaint: !0,
              backgroundColor: "#ffffff",
              scale: 2,
              ignoreElements: (k) => k.classList.contains("no-export"),
            });
            if (E === "pdf") {
              const k = (
                  await Ze(
                    async () => {
                      const { jsPDF: z } = await import("./BH4Y-fZt.js").then(
                        (Y) => Y.j,
                      );
                      return { jsPDF: z };
                    },
                    __vite__mapDeps([3, 1, 2]),
                    import.meta.url,
                  )
                ).jsPDF,
                b = new k({ orientation: "p", unit: "mm", format: "a4" }),
                x = b.internal.pageSize.getWidth(),
                j = b.internal.pageSize.getHeight(),
                W = 10,
                Q = x - W * 2,
                J = [
                  $.querySelector(".tweet-viewer-tab__main-tweet"),
                  ...Array.from(
                    $.querySelectorAll(".tweet-viewer-tab__thread-item"),
                  ).filter((z) => z.style.display !== "none"),
                ].filter(Boolean),
                fe = {
                  useCORS: !0,
                  allowTaint: !0,
                  backgroundColor: "#ffffff",
                  scale: 2,
                  ignoreElements: (z) => z.classList.contains("no-export"),
                  logging: !1,
                },
                M = 4,
                F = new Array(J.length);
              for (let z = 0; z < J.length; z += M) {
                const Y = J.slice(z, z + M);
                (await Promise.all(Y.map((Ce) => q(Ce, fe)))).forEach(
                  (Ce, Pe) => {
                    F[z + Pe] = Ce;
                  },
                );
              }
              let ee = W;
              for (let z = 0; z < F.length; z++) {
                const Y = F[z],
                  Re = (Y.height * Q) / Y.width,
                  Ce = j - W * 2;
                if (Re <= Ce) {
                  ee + Re > j - W && (b.addPage(), (ee = W));
                  const we = Y.toDataURL("image/jpeg", 0.9);
                  (b.addImage(we, "JPEG", W, ee, Q, Re), (ee += Re));
                  continue;
                }
                const Pe = J[z],
                  Ie = [];
                if (Pe) {
                  const we = Array.from(
                      Pe.querySelectorAll(".base-tweet__media"),
                    ),
                    ve = Pe.getBoundingClientRect(),
                    he = Y.height / Math.max(1, ve.height);
                  for (const Ee of we) {
                    const Ve = Ee.getBoundingClientRect(),
                      Se = Math.max(0, Math.floor((Ve.top - ve.top) * he)),
                      xe = Math.min(
                        Y.height,
                        Math.ceil((Ve.bottom - ve.top) * he),
                      );
                    (Ie.push(Math.max(0, Se - 8)),
                      Ie.push(Math.min(Y.height, xe + 8)));
                  }
                }
                (Ie.push(0), Ie.push(Y.height), Ie.sort((we, ve) => we - ve));
                const un = (Ce * Y.width) / Q;
                let Te = 0;
                for (; Te < Y.height; ) {
                  let we = Math.min(Y.height, Te + un);
                  const ve = Ie.filter((Se) => Se > Te + 20 && Se <= we);
                  ve.length > 0 && (we = ve[ve.length - 1]);
                  const he = Math.max(1, Math.floor(we - Te)),
                    Ee = document.createElement("canvas");
                  ((Ee.width = Y.width), (Ee.height = he));
                  const Ve = Ee.getContext("2d");
                  if (Ve) {
                    Ve.drawImage(Y, 0, Te, Y.width, he, 0, 0, Y.width, he);
                    const Se = Ee.toDataURL("image/jpeg", 0.9),
                      xe = (he * Q) / Y.width;
                    (ee + xe > j - W + 0.5 && (b.addPage(), (ee = W)),
                      b.addImage(Se, "JPEG", W, ee, Q, xe),
                      (ee += xe));
                  }
                  ((Te += he), Te < Y.height && (b.addPage(), (ee = W)));
                }
              }
              (b.save(`tweet-${Date.now()}.pdf`),
                Z &&
                  (await Be.alert(
                    "Exports include first 20 tweets only.",
                    "Notification",
                    { confirmButtonText: "OK", type: "info" },
                  )));
              return;
            }
            const oe = E === "jpg" ? "image/jpeg" : "image/png",
              ae = await new Promise((k) =>
                N.toBlob(k, oe, E === "jpg" ? 0.9 : 1),
              );
            (ae && (await D(ae, `tweet-${Date.now()}.${E}`)),
              Z &&
                Be.alert(
                  "Exports include first 20 tweets only.",
                  "Notification",
                  { confirmButtonText: "OK", type: "info" },
                ));
          } finally {
            (ne.forEach((N) => {
              N.style.display = "";
            }),
              (V.value = !1));
          }
        },
        P = (E) => {
          const $ = t.value.trim(),
            q = $ ? Ct($) : { isValid: !1 };
          i.send(820014, { platform: E, tweet_url: $ });
          const D =
            q.isValid && q.username && q.tweetId
              ? `${window.location.origin}${window.location.pathname}?type=tweet&username=${encodeURIComponent(q.username)}&id=${encodeURIComponent(q.tweetId)}`
              : $
                ? `${window.location.origin}${window.location.pathname}?tab=tweet&url=${encodeURIComponent($)}`
                : `${window.location.origin}${window.location.pathname}?tab=tweet`;
          let B = "";
          switch (E) {
            case "twitter": {
              const G = `View this tweet & thread online for free â€“ TweetGrok ${D}`;
              B = `https://twitter.com/intent/tweet?text=${encodeURIComponent(G)}`;
              break;
            }
            case "facebook":
              B = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(D)}`;
              break;
            case "linkedin":
              B = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(D)}`;
              break;
            case "pinterest":
              B = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(D)}`;
              break;
          }
          B && window.open(B, "_blank", "noopener,noreferrer");
        };
      return (
        be(() => {
          const E = new URLSearchParams(window.location.search),
            $ = E.get("tab"),
            q = E.get("type"),
            D = E.get("url"),
            B = E.get("username"),
            G = E.get("id");
          (q === "tweet" || $ === "tweet") && B && G
            ? ((t.value = `https://x.com/${B}/status/${G}`), C())
            : D && ((t.value = D), C());
        }),
        (E, $) => {
          const q = Ue,
            D = Bt,
            B = qt,
            G = ke,
            Z = fs,
            ne = ws,
            N = ms;
          return (
            p(),
            y("div", da, [
              a("div", _a, [
                a("div", pa, [
                  g(
                    D,
                    {
                      modelValue: t.value,
                      "onUpdate:modelValue":
                        $[0] || ($[0] = (oe) => (t.value = oe)),
                      "fetch-suggestions": d,
                      placeholder: Ea,
                      size: "large",
                      class: "tweet-viewer-tab__search-input",
                      onKeyup: Nt(C, ["enter"]),
                      disabled: n.value,
                      "trigger-on-focus": !0,
                      "fit-input-width": "",
                    },
                    {
                      suffix: R(() => [
                        g(
                          q,
                          {
                            type: "primary",
                            loading: n.value,
                            onClick: C,
                            disabled: w.value,
                            icon: r(Pn),
                            class: "tweet-viewer-tab__search-button",
                          },
                          {
                            default: R(() => [
                              ...($[1] || ($[1] = [re(" View Tweet ", -1)])),
                            ]),
                            _: 1,
                          },
                          8,
                          ["loading", "disabled", "icon"],
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ["modelValue", "disabled"],
                  ),
                ]),
              ]),
              o.value
                ? (p(),
                  y("div", ma, [
                    a("div", fa, [
                      g(
                        B,
                        {
                          title: o.value,
                          type: "error",
                          "show-icon": "",
                          closable: !1,
                        },
                        null,
                        8,
                        ["title"],
                      ),
                    ]),
                  ]))
                : S("", !0),
              c.value && !n.value
                ? (p(),
                  y(
                    "div",
                    {
                      key: 1,
                      class: "tweet-viewer-tab__results",
                      ref_key: "resultsRef",
                      ref: s,
                    },
                    [
                      a("div", wa, [
                        a("div", va, [
                          a("div", ga, [
                            _.value
                              ? (p(),
                                y("div", ha, [
                                  g(nn, {
                                    class: "tweet-viewer-tab__community-icon",
                                  }),
                                  a("span", ya, O(_.value.name), 1),
                                ]))
                              : (p(), y("div", ba)),
                            a("div", Ta, [
                              g(
                                N,
                                { trigger: "click", onCommand: P },
                                {
                                  dropdown: R(() => [
                                    g(
                                      ne,
                                      {
                                        class:
                                          "tweet-viewer-tab__dropdown-menu",
                                      },
                                      {
                                        default: R(() => [
                                          g(
                                            Z,
                                            { command: "twitter" },
                                            {
                                              default: R(() => [
                                                ...($[3] ||
                                                  ($[3] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a(
                                                          "span",
                                                          {
                                                            class:
                                                              "tweet-viewer-tab__brand tweet-viewer-tab__brand--x",
                                                          },
                                                          "X",
                                                        ),
                                                        re(" Twitter "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          g(
                                            Z,
                                            { command: "facebook" },
                                            {
                                              default: R(() => [
                                                ...($[4] ||
                                                  ($[4] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a(
                                                          "span",
                                                          {
                                                            class:
                                                              "tweet-viewer-tab__brand tweet-viewer-tab__brand--fb",
                                                          },
                                                          "f",
                                                        ),
                                                        re(" Facebook "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          g(
                                            Z,
                                            { command: "linkedin" },
                                            {
                                              default: R(() => [
                                                ...($[5] ||
                                                  ($[5] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a(
                                                          "span",
                                                          {
                                                            class:
                                                              "tweet-viewer-tab__brand tweet-viewer-tab__brand--in",
                                                          },
                                                          "in",
                                                        ),
                                                        re(" Linkedin "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          g(
                                            Z,
                                            { command: "pinterest" },
                                            {
                                              default: R(() => [
                                                ...($[6] ||
                                                  ($[6] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a(
                                                          "span",
                                                          {
                                                            class:
                                                              "tweet-viewer-tab__brand tweet-viewer-tab__brand--pin",
                                                          },
                                                          "P",
                                                        ),
                                                        re(" Pinterest "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  default: R(() => [
                                    g(
                                      q,
                                      {
                                        class: "tweet-viewer-tab__action-btn",
                                        plain: "",
                                        size: "small",
                                      },
                                      {
                                        default: R(() => [
                                          g(
                                            G,
                                            {
                                              class:
                                                "tweet-viewer-tab__action-btn-icon",
                                            },
                                            {
                                              default: R(() => [g(r(Vn))]),
                                              _: 1,
                                            },
                                          ),
                                          $[2] || ($[2] = re(" Share ", -1)),
                                          g(
                                            G,
                                            {
                                              class:
                                                "tweet-viewer-tab__action-btn-caret",
                                            },
                                            {
                                              default: R(() => [g(r(wt))]),
                                              _: 1,
                                            },
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  _: 1,
                                },
                              ),
                              g(
                                N,
                                {
                                  trigger: "click",
                                  onCommand: A,
                                  disabled: V.value,
                                },
                                {
                                  dropdown: R(() => [
                                    g(
                                      ne,
                                      {
                                        class:
                                          "tweet-viewer-tab__dropdown-menu",
                                      },
                                      {
                                        default: R(() => [
                                          g(
                                            Z,
                                            { command: "jpg" },
                                            {
                                              default: R(() => [
                                                ...($[8] ||
                                                  ($[8] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a("span", {
                                                          class:
                                                            "tweet-viewer-tab__file-icon tweet-viewer-tab__file-icon--jpg",
                                                        }),
                                                        re(" Download as JPG "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          g(
                                            Z,
                                            { command: "png" },
                                            {
                                              default: R(() => [
                                                ...($[9] ||
                                                  ($[9] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a("span", {
                                                          class:
                                                            "tweet-viewer-tab__file-icon tweet-viewer-tab__file-icon--png",
                                                        }),
                                                        re(" Download as PNG "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                          g(
                                            Z,
                                            { command: "pdf" },
                                            {
                                              default: R(() => [
                                                ...($[10] ||
                                                  ($[10] = [
                                                    a(
                                                      "span",
                                                      {
                                                        class:
                                                          "tweet-viewer-tab__dropdown-item",
                                                      },
                                                      [
                                                        a("span", {
                                                          class:
                                                            "tweet-viewer-tab__file-icon tweet-viewer-tab__file-icon--pdf",
                                                        }),
                                                        re(" Download as PDF "),
                                                      ],
                                                      -1,
                                                    ),
                                                  ])),
                                              ]),
                                              _: 1,
                                            },
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                    ),
                                  ]),
                                  default: R(() => [
                                    g(
                                      q,
                                      {
                                        class: "tweet-viewer-tab__action-btn",
                                        plain: "",
                                        size: "small",
                                        loading: V.value,
                                      },
                                      {
                                        default: R(() => [
                                          g(
                                            G,
                                            {
                                              class:
                                                "tweet-viewer-tab__action-btn-icon",
                                            },
                                            {
                                              default: R(() => [g(r(xn))]),
                                              _: 1,
                                            },
                                          ),
                                          $[7] || ($[7] = re(" Download ", -1)),
                                          g(
                                            G,
                                            {
                                              class:
                                                "tweet-viewer-tab__action-btn-caret",
                                            },
                                            {
                                              default: R(() => [g(r(wt))]),
                                              _: 1,
                                            },
                                          ),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["loading"],
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["disabled"],
                              ),
                            ]),
                          ]),
                          a("div", $a, [
                            g(
                              ot,
                              {
                                tweet: c.value,
                                "show-stats": !0,
                                "is-main-tweet": !0,
                                "show-full-date": !0,
                                "show-community": !1,
                                "tweet-count":
                                  l.value.length > 0
                                    ? `${l.value.length + 1} tweets`
                                    : "1 tweet",
                              },
                              null,
                              8,
                              ["tweet", "tweet-count"],
                            ),
                            l.value.length > 0 && !f.value
                              ? (p(),
                                y("div", ka, [
                                  a(
                                    "button",
                                    {
                                      class:
                                        "tweet-viewer-tab__show-threads-btn",
                                      onClick: v,
                                    },
                                    " Show threads ",
                                  ),
                                ]))
                              : S("", !0),
                          ]),
                          f.value
                            ? (p(),
                              y("div", Ca, [
                                (p(!0),
                                y(
                                  pe,
                                  null,
                                  Fe(
                                    l.value.slice(0, T.value),
                                    (oe, ae) => (
                                      p(),
                                      y(
                                        "div",
                                        {
                                          key: ae,
                                          class:
                                            "tweet-viewer-tab__thread-item",
                                        },
                                        [
                                          g(
                                            ot,
                                            {
                                              tweet: oe,
                                              "show-full-date": !0,
                                              "show-community": !1,
                                            },
                                            null,
                                            8,
                                            ["tweet"],
                                          ),
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                                T.value < l.value.length
                                  ? (p(),
                                    y("div", Ia, [
                                      a(
                                        "button",
                                        {
                                          class:
                                            "tweet-viewer-tab__show-threads-btn",
                                          onClick: u,
                                        },
                                        " Load More ",
                                      ),
                                    ]))
                                  : S("", !0),
                              ]))
                            : S("", !0),
                        ]),
                      ]),
                    ],
                    512,
                  ))
                : S("", !0),
            ])
          );
        }
      );
    },
  }),
  Ra = K(Sa, [["__scopeId", "data-v-63aa4eb6"]]),
  Qe = (e) => {
    const t = /^[a-zA-Z0-9_]([a-zA-Z0-9_]{0,13}[a-zA-Z0-9])?$/;
    return !(
      !e ||
      e.length === 0 ||
      e.length > 15 ||
      !t.test(e) ||
      e.endsWith("_") ||
      e.includes("__")
    );
  },
  Pa = (e) => {
    try {
      const t = new URL(e),
        n = t.hostname.toLowerCase(),
        o = t.pathname;
      return [
        "twitter.com",
        "x.com",
        "www.twitter.com",
        "www.x.com",
        "mobile.twitter.com",
        "m.twitter.com",
      ].includes(n)
        ? /^\/[a-zA-Z0-9_]{1,15}\/?$/.test(o)
        : !1;
    } catch {
      return !1;
    }
  },
  It = (e) => {
    const t = e.trim();
    if (!t)
      return {
        isValid: !1,
        type: "invalid",
        error: "Please enter a Twitter username or profile link",
      };
    if (
      t.includes("://") ||
      t.startsWith("twitter.com") ||
      t.startsWith("x.com")
    ) {
      const n = t.startsWith("http") ? t : `https://${t}`;
      if (!Pa(n))
        return {
          isValid: !1,
          type: "invalid",
          error: "Please enter a valid Twitter/X profile link",
        };
      const o = n.match(
        /(?:https?:\/\/)?(?:www\.)?(?:x\.com|twitter\.com)\/([a-zA-Z0-9_]+)/i,
      );
      if (o) {
        const s = o[1];
        return Qe(s)
          ? { isValid: !0, type: "url", username: s }
          : {
              isValid: !1,
              type: "invalid",
              error: "Invalid username format in the link",
            };
      }
    }
    if (t.startsWith("@")) {
      const n = t.slice(1);
      return Qe(n)
        ? { isValid: !0, type: "username", username: n }
        : {
            isValid: !1,
            type: "invalid",
            error:
              "Invalid username format. Twitter usernames can only contain letters, numbers, and underscores, 1-15 characters long",
          };
    }
    return Qe(t)
      ? { isValid: !0, type: "username", username: t }
      : {
          isValid: !1,
          type: "invalid",
          error: "Please enter a valid Twitter username or profile link",
        };
  };
function Va(e, t) {
  const n = e?.message ?? "";
  return n.includes("User not found") || n.includes("User does not exist")
    ? {
        message: `User "${t}" not found. Please check if the username is correct`,
        type: "user_not_found",
      }
    : n.includes("Protected account") || n.includes("Private account")
      ? {
          message: `User "${t}" has a protected account and their profile cannot be viewed`,
          type: "protected_account",
        }
      : n.includes("Rate limit") || n.includes("Too many requests")
        ? {
            message: "Too many requests. Please try again later",
            type: "rate_limit",
          }
        : n.includes("Network") || n.includes("timeout")
          ? {
              message:
                "Network connection failed. Please check your connection and try again",
              type: "network",
            }
          : {
              message: `Failed to fetch profile for "${t}". Please check the username or try again later`,
              type: "fetch_profile_failed",
            };
}
function an(e) {
  return (
    e?.content?.entryType === "TimelineTimelineItem" &&
    e?.content?.itemContent?.itemType === "TimelineTweet"
  );
}
function xa(e) {
  return e?.content?.entryType === "TimelineTimelineModule";
}
function Et(e) {
  const t = [];
  for (const n of e)
    if (!n.entryId?.startsWith("promoted-tweet-")) {
      if (an(n))
        t.push({
          type: "single",
          tweetResult: n.content.itemContent.tweet_results.result,
          socialContext: n.content.itemContent.socialContext,
        });
      else if (xa(n)) {
        const o = n.content;
        if (!o.items) continue;
        const s = [];
        for (const i of o.items)
          i.item?.itemContent?.itemType === "TimelineTweet" &&
            s.push({
              tweetResult: i.item.itemContent.tweet_results.result,
              socialContext: i.item.itemContent.socialContext,
            });
        s.length > 0 && t.push({ type: "thread", items: s });
      }
    }
  return t;
}
function La(e) {
  return !e || !an(e)
    ? null
    : {
        type: "single",
        tweetResult: e.content.itemContent.tweet_results.result,
        socialContext: e.content.itemContent.socialContext,
        isPinned: !0,
      };
}
function Oa(e, t, n) {
  if (e.__typename === "TweetWithVisibilityResults")
    return { ...e, socialContext: t, ...(n !== void 0 ? { isPinned: n } : {}) };
  if (e.__typename === "Tweet") {
    const o = e;
    if (o.legacy.retweeted_status_result)
      return {
        ...o,
        isRetweet: !0,
        retweetedBy: o.core?.user_results?.result || null,
        ...(n !== void 0 ? { isPinned: n } : {}),
      };
    if (o.legacy?.full_text?.startsWith("RT @")) {
      const s = o.legacy.full_text,
        i = s.match(/^RT @(\w+): (.+)$/s) || s.match(/^RT @(\w+) (.+)$/s);
      if (i) {
        const [, d, c] = i;
        return {
          ...o,
          isRetweet: !0,
          retweetedBy: o.core?.user_results?.result,
          originalContent: c,
          originalUsername: d,
          legacy: { ...o.legacy, full_text: c },
          ...(n !== void 0 ? { isPinned: n } : {}),
        };
      }
      return {
        ...o,
        isRetweet: !0,
        retweetedBy: o.core?.user_results?.result,
        originalContent: s,
        originalUsername: "Unknown",
        ...(n !== void 0 ? { isPinned: n } : {}),
      };
    }
    return { ...o, socialContext: t, ...(n !== void 0 ? { isPinned: n } : {}) };
  }
  return e;
}
function St(e) {
  return e
    .map((t) => {
      if (t.type === "thread")
        return { __typename: "Thread", isThread: !0, items: t.items };
      const { tweetResult: n, socialContext: o, isPinned: s } = t;
      return Oa(n, o, s);
    })
    .filter(
      (t) =>
        t.__typename === "Tweet" ||
        t.__typename === "TweetWithVisibilityResults" ||
        t.__typename === "Thread",
    );
}
function Rt(e) {
  return e.find((t) => t.type === "TimelineAddEntries")?.entries || [];
}
function Ma(e) {
  return e.find((n) => n.type === "TimelinePinEntry")?.entry;
}
function Pt(e, t, n) {
  let o = t || "",
    s = !0;
  return (n(e) && ((s = !1), (o = "")), { cursor: o, hasMore: s });
}
const et = "turnstile-signature",
  X = it({
    turnstileToken: "",
    isTurnstileVisible: !1,
    signature: "",
    triggerSource: "",
    verificationResolve: null,
    verificationReject: null,
  });

function Xe(e) {
  return Fn() ? (je(e), !0) : !1;
}
const qa = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Ha = (e) => e != null,
  Wa = Object.prototype.toString,
  ja = (e) => Wa.call(e) === "[object Object]",
  tt = () => {};
function He(e) {
  return Array.isArray(e) ? e : [e];
}
function Ka(e) {
  return Ne();
}
function za(e, t = !0, n) {
  Ka() ? be(e, n) : t ? e() : ye(e);
}
function Ga(e, t, n) {
  return me(e, t, { ...n, immediate: !0 });
}
const cn = qa ? window : void 0;
function We(e) {
  var t;
  const n = Me(e);
  return (t = n?.$el) != null ? t : n;
}
function Ya(...e) {
  const t = [],
    n = () => {
      (t.forEach((c) => c()), (t.length = 0));
    },
    o = (c, l, f, T) => (
      c.addEventListener(l, f, T),
      () => c.removeEventListener(l, f, T)
    ),
    s = I(() => {
      const c = He(Me(e[0])).filter((l) => l != null);
      return c.every((l) => typeof l != "string") ? c : void 0;
    }),
    i = Ga(
      () => {
        var c, l;
        return [
          (l = (c = s.value) == null ? void 0 : c.map((f) => We(f))) != null
            ? l
            : [cn].filter((f) => f != null),
          He(Me(s.value ? e[1] : e[0])),
          He(r(s.value ? e[2] : e[1])),
          Me(s.value ? e[3] : e[2]),
        ];
      },
      ([c, l, f, T]) => {
        if ((n(), !c?.length || !l?.length || !f?.length)) return;
        const _ = ja(T) ? { ...T } : T;
        t.push(
          ...c.flatMap((w) => l.flatMap((h) => f.map((m) => o(w, h, m, _)))),
        );
      },
      { flush: "post" },
    ),
    d = () => {
      (i(), n());
    };
  return (Xe(n), d);
}
function Ja() {
  const e = Dt(!1),
    t = Ne();
  return (
    t &&
      be(() => {
        e.value = !0;
      }, t),
    e
  );
}
function Xa(e) {
  const t = Ja();
  return I(() => (t.value, !!e()));
}
function Za(e, t, n = {}) {
  const {
      root: o,
      rootMargin: s = "0px",
      threshold: i = 0,
      window: d = cn,
      immediate: c = !0,
    } = n,
    l = Xa(() => d && "IntersectionObserver" in d),
    f = I(() => {
      const m = Me(e);
      return He(m).map(We).filter(Ha);
    });
  let T = tt;
  const _ = Dt(c),
    w = l.value
      ? me(
          () => [f.value, We(o), _.value],
          ([m, v]) => {
            if ((T(), !_.value || !m.length)) return;
            const u = new IntersectionObserver(t, {
              root: We(v),
              rootMargin: s,
              threshold: i,
            });
            (m.forEach((C) => C && u.observe(C)),
              (T = () => {
                (u.disconnect(), (T = tt));
              }));
          },
          { immediate: c, flush: "post" },
        )
      : tt,
    h = () => {
      (T(), w(), (_.value = !1));
    };
  return (
    Xe(h),
    {
      isSupported: l,
      isActive: _,
      pause() {
        (T(), (_.value = !1));
      },
      resume() {
        _.value = !0;
      },
      stop: h,
    }
  );
}
function Qa(e) {
  let t;
  return new Promise((n) => {
    ((t = Za(
      e,
      (o) => {
        for (const s of o) s.isIntersecting && n(!0);
      },
      { rootMargin: "30px 0px 0px 0px", threshold: 0 },
    )),
      Xe(() => n(!1)));
  }).finally(() => {
    t.stop();
  });
}
function el(e) {
  const { el: t, trigger: n } = e,
    o = (Array.isArray(e.trigger) ? e.trigger : [e.trigger]).filter(Boolean);
  if (!n || o.includes("immediate") || o.includes("onNuxtReady"))
    return "onNuxtReady";
  if (o.some((d) => ["visibility", "visible"].includes(d)))
    return t ? Qa(t) : new Promise(() => {});
  const s = {},
    i = new Promise((d) => {
      const c = typeof t < "u" ? t : document.body,
        l = Ya(
          c,
          o,
          () => {
            (l(), d(!0));
          },
          { once: !0, passive: !0 },
        );
      (za(() => {
        me(
          c,
          (f) => {
            f &&
              o.forEach((T) => {
                f.dataset[`script_${T}`] && (l(), d(!0));
              });
          },
          { immediate: !0 },
        );
      }),
        Xe(() => d(!1)));
    });
  return Object.assign(i, { ssrAttrs: s });
}
const tl = H({
    __name: "NuxtTurnstile",
    props: {
      modelValue: {},
      trigger: { type: [String, Array, Boolean] },
      element: { default: "div" },
      siteKey: {},
      options: { default: () => ({}) },
      resetInterval: { default: 1e3 * 250 },
    },
    emits: ["update:modelValue"],
    setup(e, { expose: t, emit: n }) {
      const o = e,
        s = n,
        i = at().public.turnstile,
        d = L(),
        c = L(!1);
      let l, f;
      const { onLoaded: T } = Ba({
        scriptOptions: { trigger: el({ trigger: o.trigger, el: d }) },
      });
      let _, w;
      const h = () => {
          l && _(l);
        },
        m = () => {
          ((c.value = !0), clearInterval(f), l && w(l));
        };
      return (
        be(() => {
          T(async ({ render: v, reset: u, remove: C }) => {
            ((_ = u),
              (w = C),
              (l = await v(d.value, {
                sitekey: o.siteKey || i.siteKey,
                callback: (V) => s("update:modelValue", V),
                ...o.options,
              })),
              (f = setInterval(h, o.resetInterval)),
              c.value && m());
          });
        }),
        st(m),
        t({ reset: h }),
        (v, u) => (p(), U(Mt(v.element), { ref_key: "el", ref: d }, null, 512))
      );
    },
  }),
  nl = { class: "turnstile-dialog__content" },
  ol = { class: "turnstile-dialog__title" },
  sl = { class: "turnstile-dialog__subtitle" },
  rl = { class: "turnstile-dialog__turnstile-wrapper" },
  il = { key: 0, class: "turnstile-dialog__actions" },
  al = H({
    __name: "BaseTurnstileDialog",
    props: { visible: { type: Boolean }, turnstileToken: {} },
    emits: ["update:visible", "turnstile-success", "turnstile-error"],
    setup(e, { emit: t }) {
      const n = e,
        o = t,
        s = L(),
        i = L(!1),
        d = I({ get: () => n.visible, set: (_) => o("update:visible", _) });
      me(
        () => n.visible,
        (_) => {
          _ && (i.value = !1);
        },
      );
      const c = I(() => {
          if (typeof window > "u") return "90%";
          const _ = window.innerWidth;
          return _ < 480 ? "90%" : (_ < 768, "400px");
        }),
        l = (_) => {
          ((i.value = !1), o("turnstile-success", _));
        },
        f = (_) => {
          ((i.value = !0), o("turnstile-error", _));
        },
        T = () => {
          if (s.value) {
            i.value = !1;
            try {
              s.value.reset && s.value.reset();
            } catch (_) {
              (console.error("Failed to reset turnstile:", _), (i.value = !0));
            }
          }
        };
      return (_, w) => {
        const h = tl,
          m = Ue,
          v = so;
        return (
          p(),
          U(
            v,
            {
              modelValue: r(d),
              "onUpdate:modelValue":
                w[0] || (w[0] = (u) => (Lt(d) ? (d.value = u) : null)),
              width: r(c),
              "close-on-click-modal": !1,
              "close-on-press-escape": !1,
              "show-close": !1,
              "destroy-on-close": !0,
              center: "",
              class: "turnstile-dialog",
            },
            {
              default: R(() => [
                a("div", nl, [
                  a(
                    "div",
                    {
                      class: ce([
                        "turnstile-dialog__icon-wrapper",
                        { error: r(i) },
                      ]),
                    },
                    [
                      r(i)
                        ? (p(),
                          U(r(An), {
                            key: 1,
                            class:
                              "turnstile-dialog__icon turnstile-dialog__icon--error",
                          }))
                        : (p(),
                          U(r(ko), {
                            key: 0,
                            class: "turnstile-dialog__icon",
                          })),
                    ],
                    2,
                  ),
                  a(
                    "h3",
                    ol,
                    O(r(i) ? "Verification Failed" : "Security Check"),
                    1,
                  ),
                  a(
                    "p",
                    sl,
                    O(
                      r(i)
                        ? "An error occurred. Please try again."
                        : "Please complete the verification to continue",
                    ),
                    1,
                  ),
                  a("div", rl, [
                    g(
                      h,
                      {
                        modelValue: _.turnstileToken,
                        "onUpdate:modelValue": l,
                        options: { "error-callback": f },
                        ref_key: "turnstileRef",
                        ref: s,
                      },
                      null,
                      8,
                      ["modelValue", "options"],
                    ),
                  ]),
                  r(i)
                    ? (p(),
                      y("div", il, [
                        g(
                          m,
                          { type: "primary", onClick: T },
                          {
                            default: R(() => [
                              ...(w[1] ||
                                (w[1] = [re("Retry Verification", -1)])),
                            ]),
                            _: 1,
                          },
                        ),
                      ]))
                    : S("", !0),
                ]),
              ]),
              _: 1,
            },
            8,
            ["modelValue", "width"],
          )
        );
      };
    },
  }),
  ll = K(al, [["__scopeId", "data-v-8f666d4c"]]),
  cl = H({
    __name: "TurnstileProvider",
    setup(e) {
      const t = ln();
      be(() => {
        t.loadSignatureFromStorage();
      });
      const n = async (i) => {
          ((t.isTurnstileVisible.value = !1),
            (t.turnstileToken.value = i),
            t.resolveVerification());
        },
        o = (i) => {
          (console.error("Turnstile verification failed:", i),
            (t.isTurnstileVisible.value = !1),
            t.rejectVerification(i));
        },
        s = (i) => {
          !i &&
            t.isTurnstileVisible.value &&
            ((t.isTurnstileVisible.value = !1),
            t.rejectVerification("User cancelled verification"));
        };
      return (i, d) => {
        const c = ll;
        return (
          p(),
          y(
            pe,
            null,
            [
              le(i.$slots, "default"),
              g(
                c,
                {
                  visible: r(t).isTurnstileVisible.value,
                  "turnstile-token": r(t).turnstileToken.value,
                  onTurnstileSuccess: n,
                  onTurnstileError: o,
                  "onUpdate:visible": s,
                },
                null,
                8,
                ["visible", "turnstile-token"],
              ),
            ],
            64,
          )
        );
      };
    },
  }),
  ul = { class: "twitter-viewer" },
  dl = { class: "twitter-viewer__tabs" },
  _l = { class: "twitter-viewer__tabs-container" },
  pl = { class: "twitter-viewer__search" },
  ml = { class: "twitter-viewer__search-container" },
  fl = { key: 0, class: "twitter-viewer__error" },
  wl = { class: "twitter-viewer__error-container" },
  vl = { class: "twitter-viewer__results-container" },
  gl = { class: "twitter-viewer__profile" },
  hl = { class: "twitter-viewer__tweets" },
  yl = { class: "twitter-viewer__tweets-footer", ref: "tweetsFooter" },
  bl = { key: 1, class: "twitter-viewer__no-more-posts" },
  Vt = "twitter-viewer:recent-searches",
  Tl = 8,
  $l = 10,
  kl = H({
    __name: "App",
    setup(e) {
      const t = Nn(),
        n = ln(),
        o = L(
          t.query.tab === "tweet" || t.query.type === "tweet"
            ? "tweet"
            : "profile",
        ),
        s = (t.query.username || "").trim(),
        i = L([]),
        d = () => {
          if (!(typeof window > "u"))
            try {
              const k = window.localStorage.getItem(Vt);
              i.value = k ? JSON.parse(k) : [];
            } catch {
              i.value = [];
            }
        },
        c = () => {
          if (!(typeof window > "u"))
            try {
              window.localStorage.setItem(Vt, JSON.stringify(i.value));
            } catch {}
        },
        l = (k) => {
          const b = k.trim();
          b &&
            ((i.value = [b, ...i.value.filter((x) => x !== b)].slice(0, Tl)),
            c());
        },
        f = (k) => {
          const b = typeof k == "string" ? k : k.value;
          _.value = b;
        },
        T = (k, b) => {
          const x = k.trim().toLowerCase(),
            j = i.value
              .filter((W) => (x ? W.toLowerCase().includes(x) : !0))
              .map((W) => ({ value: W }));
          b(j);
        },
        _ = L(s),
        w = L(!1),
        h = L(!1),
        m = L(""),
        v = L(null),
        u = L([]),
        C = At("resultsRef"),
        V = L(""),
        A = L(0),
        P = L(""),
        E = L(!0),
        $ = Kt();
      $e("twitterViewerNavigateToProfile", (k) => {
        const b = (k || "").replace(/^@+/, "").trim();
        if (!b || typeof window > "u") return;
        const x = new URL(window.location.href);
        (x.searchParams.delete("tab"),
          x.searchParams.delete("type"),
          x.searchParams.set("username", b),
          window.open(x.toString(), "_blank", "noopener,noreferrer"));
      });
      const D = (k) => {
          if (o.value === k) return;
          const b = o.value;
          ((o.value = k), $.send(820007, { from_tab: b, to_tab: k }));
        },
        B = (k) =>
          !k || k.length === 0
            ? !0
            : !k.some((x) => {
                const j = x.entryId || "";
                return (
                  j.startsWith("tweet-") ||
                  j.startsWith("profile-conversation-")
                );
              });
      (be(async () => {
        ($.send(820001), d(), s && ((o.value = "profile"), await oe()));
      }),
        me(o, (k) => {
          if (typeof window > "u") return;
          const b = new URL(window.location.href);
          if (k === "profile") {
            const x = b.searchParams.get("username");
            ((b.search = ""), x && b.searchParams.set("username", x));
          } else
            (b.searchParams.set("tab", "tweet"),
              b.searchParams.delete("username"));
          window.history.replaceState({}, "", b.toString());
        }));
      const G = I(() => {
          if (!_.value.trim()) return { isValid: !0, message: "" };
          const k = It(_.value);
          return {
            isValid: k.isValid,
            message: k.isValid ? "" : k.error || "",
          };
        }),
        Z = I(() => !_.value.trim() || !G.value.isValid || w.value),
        ne = I(() =>
          m.value
            ? m.value
            : _.value.trim() && !G.value.isValid
              ? G.value.message
              : "",
        ),
        N = async () => {
          if ((await ye(), !C.value)) return;
          const b = C.value.getBoundingClientRect(),
            j = window.scrollY + b.top - 24;
          window.scrollTo({ top: Math.max(0, j), behavior: "smooth" });
        };
      me(
        () => ({ user: v.value, loading: w.value }),
        async ({ user: k, loading: b }) => {
          k && !b && (await N());
        },
      );
      const oe = async () => {
          if (!_.value.trim()) return;
          const k = It(_.value);
          if (!k.isValid) {
            ((m.value =
              k.error || "Please enter a valid Twitter username or link"),
              $.send(820003, {
                search_input: _.value,
                error_message: m.value,
              }));
            return;
          }
          const b = k.username;
          ((P.value = b),
            $.send(820002, { search_input: _.value }),
            (w.value = !0),
            (m.value = ""),
            (v.value = null),
            (u.value = []),
            (V.value = ""),
            (A.value = 0),
            (E.value = !0));
          try {
            const x = await n.withSignatureRetry((ee) => Wn(b, ee))();
            ((v.value = x.data.result.data.user.result),
              l(_.value),
              (h.value = !0));
            const j = v.value.rest_id,
              W = await n.withSignatureRetry((ee) => vt(j, "", ee))(),
              Q = W.data.result.timeline.instructions,
              J = Rt(Q),
              fe = Pt(J, W.data.cursor?.bottom, B);
            ((V.value = fe.cursor), (E.value = fe.hasMore));
            const M = La(Ma(Q)),
              F = Et(J);
            ((u.value = St(M ? [M, ...F] : F)),
              await ye(),
              $.send(820004, {
                username: P.value,
                user_id: v.value.rest_id,
                current_page: 1,
              }));
          } catch (x) {
            if (
              (console.error("Error fetching Twitter data:", x),
              x instanceof gt)
            ) {
              De.error(x.message);
              return;
            }
            if (x instanceof ht) {
              De.error(x.message);
              return;
            }
            const { message: j } = Va(x, b);
            m.value = j;
          } finally {
            ((w.value = !1), (h.value = !1));
          }
        },
        ae = async (k) => {
          if (!v.value || !V.value) return;
          k?.preventDefault?.();
          const b = 1 + A.value + 1;
          ($.send(820006, {
            username: P.value,
            current_page: b,
            has_cursor: !!V.value,
          }),
            (h.value = !0));
          try {
            const x = v.value.rest_id,
              j = V.value,
              W = await n.withSignatureRetry((F) => vt(x, j, F))(),
              Q = W.data.result.timeline.instructions,
              J = Rt(Q),
              fe = Pt(J, W.data.cursor?.bottom, B);
            ((V.value = fe.cursor), (E.value = fe.hasMore));
            const M = St(Et(J));
            ((u.value = [...u.value, ...M]),
              A.value++,
              await ye(),
              $.send(820004, {
                username: P.value,
                user_id: v.value.rest_id,
                current_page: 1 + A.value,
              }));
          } catch (x) {
            if (
              (console.error("Error loading more tweets:", x), x instanceof gt)
            ) {
              De.error(x.message);
              return;
            }
            if (x instanceof ht) {
              De.error(x.message);
              return;
            }
            m.value = "Failed to load more posts. Please try again";
          } finally {
            h.value = !1;
          }
        };
      return (k, b) => {
        const x = ke,
          j = Ue,
          W = Bt,
          Q = qt;
        return (
          p(),
          U(r(cl), null, {
            default: R(() => [
              a("div", ul, [
                b[11] ||
                  (b[11] = a(
                    "div",
                    { class: "twitter-viewer__header" },
                    [
                      a("div", { class: "twitter-viewer__header-container" }, [
                        a(
                          "h1",
                          { class: "twitter-viewer__title" },
                          "Twitter Viewer â€“ View Profiles & Tweets Anonymously",
                        ),
                        a(
                          "p",
                          { class: "twitter-viewer__subtitle" },
                          " Instantly browse any Twitter profile, tweet, or complete thread for free. Stay anonymous, no login needed. ",
                        ),
                      ]),
                    ],
                    -1,
                  )),
                a("div", dl, [
                  a("div", _l, [
                    a(
                      "button",
                      {
                        type: "button",
                        class: ce([
                          "twitter-viewer__tab",
                          { "is-active": o.value === "profile" },
                        ]),
                        onClick: b[0] || (b[0] = (J) => D("profile")),
                      },
                      [
                        g(
                          x,
                          { class: "twitter-viewer__tab-icon" },
                          { default: R(() => [g(r(Un))]), _: 1 },
                        ),
                        b[5] || (b[5] = a("span", null, "Profile", -1)),
                      ],
                      2,
                    ),
                    a(
                      "button",
                      {
                        type: "button",
                        class: ce([
                          "twitter-viewer__tab",
                          { "is-active": o.value === "tweet" },
                        ]),
                        onClick: b[1] || (b[1] = (J) => D("tweet")),
                      },
                      [
                        g(
                          x,
                          { class: "twitter-viewer__tab-icon" },
                          { default: R(() => [g(r(Dn))]), _: 1 },
                        ),
                        b[6] || (b[6] = a("span", null, "Tweet", -1)),
                      ],
                      2,
                    ),
                  ]),
                ]),
                o.value === "profile"
                  ? (p(),
                    y(
                      pe,
                      { key: 0 },
                      [
                        a("div", pl, [
                          a("div", ml, [
                            g(
                              W,
                              {
                                modelValue: _.value,
                                "onUpdate:modelValue":
                                  b[2] || (b[2] = (J) => (_.value = J)),
                                "fetch-suggestions": T,
                                placeholder:
                                  "Enter Twitter username (@username, username, or https://x.com/username)",
                                size: "large",
                                class: ce([
                                  "twitter-viewer__search-input",
                                  {
                                    "is-error":
                                      !G.value.isValid && _.value.trim(),
                                  },
                                ]),
                                onKeyup: Nt(oe, ["enter"]),
                                disabled: w.value,
                                onSelect: f,
                                "trigger-on-focus": !0,
                                "fit-input-width": "",
                              },
                              {
                                suffix: R(() => [
                                  g(
                                    j,
                                    {
                                      type: "primary",
                                      loading: w.value,
                                      onClick: oe,
                                      disabled: Z.value,
                                      icon: r(Bn),
                                      class: "twitter-viewer__search-button",
                                    },
                                    {
                                      default: R(() => [
                                        ...(b[7] ||
                                          (b[7] = [re(" View Profile ", -1)])),
                                      ]),
                                      _: 1,
                                    },
                                    8,
                                    ["loading", "disabled", "icon"],
                                  ),
                                ]),
                                _: 1,
                              },
                              8,
                              ["modelValue", "class", "disabled"],
                            ),
                          ]),
                        ]),
                        ne.value
                          ? (p(),
                            y("div", fl, [
                              a("div", wl, [
                                g(
                                  Q,
                                  {
                                    title: ne.value,
                                    type: "error",
                                    "show-icon": "",
                                    closable: !1,
                                  },
                                  null,
                                  8,
                                  ["title"],
                                ),
                              ]),
                            ]))
                          : S("", !0),
                        v.value && !w.value
                          ? (p(),
                            y(
                              "div",
                              {
                                key: 1,
                                class: "twitter-viewer__results",
                                ref_key: "resultsRef",
                                ref: C,
                              },
                              [
                                a("div", vl, [
                                  a("div", gl, [
                                    g(js, { user: v.value }, null, 8, ["user"]),
                                  ]),
                                  a("div", hl, [
                                    b[10] ||
                                      (b[10] = a(
                                        "div",
                                        {
                                          class:
                                            "twitter-viewer__tweets-header",
                                        },
                                        [
                                          a(
                                            "h3",
                                            {
                                              class:
                                                "twitter-viewer__tweets-title",
                                            },
                                            "Posts",
                                          ),
                                        ],
                                        -1,
                                      )),
                                    g(
                                      ca,
                                      { tweets: u.value, loading: h.value },
                                      null,
                                      8,
                                      ["tweets", "loading"],
                                    ),
                                    a(
                                      "div",
                                      yl,
                                      [
                                        E.value && V.value && A.value < $l - 1
                                          ? (p(),
                                            U(
                                              j,
                                              {
                                                key: 0,
                                                type: "primary",
                                                loading: h.value,
                                                onKeyup:
                                                  b[3] ||
                                                  (b[3] = _e(
                                                    (J) => ae(J),
                                                    ["prevent"],
                                                  )),
                                                onClick:
                                                  b[4] ||
                                                  (b[4] = _e(
                                                    (J) => ae(J),
                                                    ["prevent"],
                                                  )),
                                                class:
                                                  "twitter-viewer__load-more-button",
                                              },
                                              {
                                                default: R(() => [
                                                  ...(b[8] ||
                                                    (b[8] = [
                                                      re(
                                                        " Load More Posts ",
                                                        -1,
                                                      ),
                                                    ])),
                                                ]),
                                                _: 1,
                                              },
                                              8,
                                              ["loading"],
                                            ))
                                          : S("", !0),
                                        !E.value &&
                                        u.value.length > 0 &&
                                        !h.value
                                          ? (p(),
                                            y("div", bl, [
                                              ...(b[9] ||
                                                (b[9] = [
                                                  a(
                                                    "span",
                                                    null,
                                                    " No more posts available ",
                                                    -1,
                                                  ),
                                                ])),
                                            ]))
                                          : S("", !0),
                                      ],
                                      512,
                                    ),
                                  ]),
                                ]),
                              ],
                              512,
                            ))
                          : S("", !0),
                      ],
                      64,
                    ))
                  : (p(), U(Ra, { key: 1 })),
              ]),
            ]),
            _: 1,
          })
        );
      };
    },
  }),
  Cl = K(kl, [["__scopeId", "data-v-f7bcaee1"]]),
  xt = {
    title: "Why Use Our Twitter Viewer?",
    advantages: [
      {
        title: "Login-Free Access",
        description:
          "Use the Twitter Viewer instantly without any registration or Twitter account. Browse profiles and tweets safely and privately.",
      },
      {
        title: "Completely Free & Ad-Free",
        description:
          "Enjoy full access to Twitter profiles and tweets at no cost. Our tool offers a smooth, ad-free experience for fast browsing.",
      },
      {
        title: "View Profiles & Tweets Instantly",
        description:
          "Easily explore any Twitter content by entering a username or link. See profiles, individual tweets, and long threads clearly with simple steps.",
      },
      {
        title: "Share & Export Tweets Instantly",
        description:
          "Export individual tweets, full threads, or high-quality images and videos instantly. Our Twitter Viewer makes it easier than ever to save the content you love in just a few clicks.",
      },
    ],
  },
  nt = {
    title: "How to Use Twitter Viewer Easily",
    description:
      "Follow these simple steps to anonymously explore any Twitter profile or tweet for free while keeping your information private.",
    steps: [
      {
        title: "Step 1 â€“ Pick Your Viewing Mode",
        description:
          'Start by choosing whether you want to explore a complete user profile or a specific tweet thread using the "Profile" or "Tweet" toggle.',
        imageUrl:
          "https://se-data-us-oss.oss-us-west-1.aliyuncs.com/se/tweetgrok/twitter-viewer/assets/images/Step-1-Pick-Your-Viewing-Mode.png",
        imageAlt: "Pick Your Viewing Mode - Twitter Viewer",
      },
      {
        title: "Step 2 â€“ Enter a Username or Link",
        description:
          "Simply paste the Twitter handle or the direct URL into the search box. Our Twitter Viewer will securely fetch the content while keeping your identity 100% private.",
        imageUrl:
          "https://se-data-us-oss.oss-us-west-1.aliyuncs.com/se/tweetgrok/twitter-viewer/assets/images/Step-2-Enter-a-Username-or-Link.png",
        imageAlt: "Enter a Username or Link - Twitter Viewer",
      },
      {
        title: "Step 3 â€“ Explore, Share, and Export",
        description:
          "Dive into the profile, unroll long threads, or download high-quality media. You can even export tweets and threads directly to your device for offline reading in just a few clicks.",
        imageUrl:
          "https://se-data-us-oss.oss-us-west-1.aliyuncs.com/se/tweetgrok/twitter-viewer/assets/images/Step-3-Explore-Share-and-Export.png",
        imageAlt: "Explore, Share, and Export - Twitter Viewer",
      },
    ],
  },
  qe = {
    title: "Start Using Twitter Viewer Now",
    description:
      "Experience the freedom of browsing any Twitter profile or tweet anonymously. No login, no registration, completely free, and ready to use instantly.",
    link: "https://tweetgrok.ai/twitter-viewer",
    buttonText: "Try Twitter Viewer Free",
  },
  Il = [
    {
      name: "Emma Johnson",
      occupation: "Social Media Manager",
      avatar:
        "https://se-data-us-oss.oss-us-west-1.aliyuncs.com/se/easycomment/FacebookCommentPicker/assets/images/Emma-Richards.webp",
      comment:
        "The Twitter Viewer is a lifesaver! I can view profiles and tweets anonymously without logging in. Itâ€™s fast, free, and perfect for checking any public Twitter account safely.",
    },
    {
      name: "Liam Smith",
      occupation: "Blogger",
      avatar:
        "https://se-data-us-oss.oss-us-west-1.aliyuncs.com/se/easycomment/FacebookCommentPicker/assets/images/Michael-Turner.webp",
      comment:
        "I love this Twitter Viewer. It provides a clear and ad-free interface to explore tweets and profiles instantly. No login or registration needed at all.",
    },
    {
      name: "Ava Brown",
      occupation: "Marketing Specialist",
      avatar:
        "https://se-data-us-oss.oss-us-west-1.aliyuncs.com/se/easycomment/FacebookCommentPicker/assets/images/Sarah-Lee.webp",
      comment:
        "Using Tweet Grok's Twitter Viewer, I can check any Twitter content without sharing my account. Itâ€™s free, simple, and keeps my browsing private at all times.",
    },
  ],
  El = [
    {
      question: "Who can use the Twitter Viewer?",
      answer:
        "Anyone can use the Twitter Viewer to browse public Twitter profiles or tweets anonymously. It works for casual users, marketers, and professionals who want private access to content.",
    },
    {
      question: "Do I need a Twitter account to use this tool?",
      answer:
        "No, you donâ€™t need a Twitter account at all. You also donâ€™t need to register or log in on our websiteâ€”just enter a username or profile link to start browsing.",
    },
    {
      question: "Is this Twitter Viewer fully anonymous?",
      answer:
        "Absolutely. Our tool acts as a secure intermediary between you and Twitter. Your IP, location, and browsing activity remain private and are never shared or stored.",
    },
    {
      question: "Can I view tweets from private accounts?",
      answer:
        "No, the Twitter Viewer only supports public profiles and tweets. Private accounts cannot be accessed to protect user privacy and comply with Twitter rules.",
    },
    {
      question: "Is the Twitter Viewer completely free?",
      answer:
        "Yes, it is entirely free to use. You get access to all features without hidden costs or ads, providing a smooth and anonymous Twitter browsing experience.",
    },
    {
      question: "Is it safe and legal to use this Twitter Viewer?",
      answer:
        "Yes, it is completely safe and fully legal. We only access publicly available information that doesnâ€™t require a login, while respecting Twitterâ€™s rules and protecting your privacy.",
    },
    {
      question: "Can I view an entire Twitter thread using this tool?",
      answer:
        "Absolutely. TweetGrok is designed as a comprehensive Twitter Viewer that supports multi-tweet threads. It automatically links related tweets so you can read the whole conversation on one page.",
    },
  ],
  Sl = H({
    __name: "SEOContent",
    setup(e) {
      return (t, n) => (
        p(),
        y("div", null, [
          g(fo, { title: r(xt).title, advantages: r(xt).advantages }, null, 8, [
            "title",
            "advantages",
          ]),
          g(
            co,
            {
              title: r(nt).title,
              description: r(nt).description,
              steps: r(nt).steps,
            },
            null,
            8,
            ["title", "description", "steps"],
          ),
          g(
            _o,
            {
              title: r(qe).title,
              description: r(qe).description,
              link: r(qe).link,
              buttonText: r(qe).buttonText,
              buttonColor: "#0096ea",
            },
            null,
            8,
            ["title", "description", "link", "buttonText"],
          ),
          g(mo, { comments: r(Il) }, null, 8, ["comments"]),
          g(po, { faqs: r(El) }, null, 8, ["faqs"]),
          g(uo),
        ])
      );
    },
  }),
  Rl = { class: "twitter-viewer" },
  Pl = {
    __name: "Page",
    setup(e) {
      return (t, n) => (
        p(),
        y("div", Rl, [
          g(
            ao,
            { logStore: "tg-web-twitter-viewer" },
            { default: R(() => [g(Cl), g(Sl)]), _: 1 },
          ),
        ])
      );
    },
  },
  Vl = K(Pl, [["__scopeId", "data-v-9d6ca9f9"]]),
  sc = {
    __name: "index",
    setup(e) {
      return (t, n) => (p(), U(Vl));
    },
  };
export { sc as default };
