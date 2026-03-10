/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { Header } from '~/components/Header'
import { Footer } from '~/components/Footer'
import { LocaleContext } from '~/i18n/context'
import {
  getLocaleFromPath,
  getTranslations,
  LOCALE_HTML_LANG,
  LOCALE_OG,
  getAlternateLocalePath,
} from '~/i18n'
import { Progress } from 'react-kino'

import appCss from '~/styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TorinoJS - Community JavaScript a Torino' },
      {
        name: 'description',
        content:
          'Eventi async su JavaScript, Node.js, IoT e tecnologie web open source a Torino, Italia.',
      },
      { property: 'og:title', content: 'TorinoJS' },
      {
        property: 'og:description',
        content:
          'Eventi async su JavaScript, Node.js, IoT e tecnologie web open source a Torino, Italia.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'it_IT' },
      { property: 'og:locale:alternate', content: 'en_US' },
      { property: 'og:url', content: 'https://torino.js.org' },
      {
        property: 'og:image',
        content:
          'https://raw.githubusercontent.com/TorinoJS/discussion/master/torinojs-logo.svg.png',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-icon-precomposed.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Inter:wght@300;400;500;600;700;800;900&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const routerState = useRouterState()
  const pathname = routerState.location.pathname
  const locale = getLocaleFromPath(pathname)
  const t = getTranslations(locale)

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      <RootDocument lang={LOCALE_HTML_LANG[locale]}>
        <Progress type="bar" position="top" color="#f9e64f" />
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
        <LocaleRedirectScript />
      </RootDocument>
    </LocaleContext.Provider>
  )
}

function RootDocument({
  children,
  lang,
}: Readonly<{ children: ReactNode; lang: string }>) {
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

/**
 * Client-side script that checks localStorage for saved locale preference
 * and redirects on first visit if browser language differs from current page locale.
 */
function LocaleRedirectScript() {
  const script = `
(function() {
  try {
    var STORAGE_KEY = 'torinojs-locale';
    var saved = localStorage.getItem(STORAGE_KEY);
    var path = window.location.pathname;
    var isEn = path === '/en' || path.startsWith('/en/');
    var currentLocale = isEn ? 'en' : 'it';
    
    // If user has a saved preference and it differs from current, redirect
    if (saved && saved !== currentLocale) {
      var segments = path.split('/').filter(Boolean);
      var hasPrefix = segments[0] === 'en';
      var cleanSegments = hasPrefix ? segments.slice(1) : segments;
      var cleanPath = cleanSegments.length > 0 ? '/' + cleanSegments.join('/') : '/';
      
      var target;
      if (saved === 'it') {
        target = cleanPath;
      } else {
        target = cleanPath === '/' ? '/en' : '/en' + cleanPath;
      }
      
      if (target !== path) {
        window.location.replace(target);
        return;
      }
    }
    
    // First visit: detect browser language
    if (!saved) {
      var langs = navigator.languages || [navigator.language];
      var detected = 'it';
      for (var i = 0; i < langs.length; i++) {
        var code = langs[i].toLowerCase().split('-')[0];
        if (code === 'en') { detected = 'en'; break; }
        if (code === 'it') { detected = 'it'; break; }
      }
      
      localStorage.setItem(STORAGE_KEY, detected);
      
      if (detected !== currentLocale) {
        var segs = path.split('/').filter(Boolean);
        var hasP = segs[0] === 'en';
        var cSegs = hasP ? segs.slice(1) : segs;
        var cPath = cSegs.length > 0 ? '/' + cSegs.join('/') : '/';
        
        var dest;
        if (detected === 'it') {
          dest = cPath;
        } else {
          dest = cPath === '/' ? '/en' : '/en' + cPath;
        }
        
        if (dest !== path) {
          window.location.replace(dest);
        }
      }
    }
  } catch(e) {}
})();
`
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
