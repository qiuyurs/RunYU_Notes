// docs/.vitepress/config.mts
import { defineConfig } from "file:///E:/Study_notes/my-blog/node_modules/vitepress/dist/node/index.js";

// docs/.vitepress/blog-theme.ts
import { getThemeConfig } from "file:///E:/Study_notes/my-blog/node_modules/@sugarat/theme/node.mjs";
var blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,
  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,
  // markdown 图表支持（会增加一定的构建耗时）
  // mermaid: true
  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: "MIT License | \u6DA6\u96E8",
    icpRecord: {
      name: "	\u5180ICP\u59072022023787\u53F7",
      link: "https://beian.miit.gov.cn/"
    }
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },
  // 主题色修改
  themeColor: "el-blue",
  // 文章默认作者
  author: "\u6DA6\u96E8",
  // 友链
  friend: [
    {
      nickname: "\u7CA5\u91CC\u6709\u52FA\u7CD6",
      des: "\u4F60\u7684\u6307\u5C16\u7528\u4E8E\u6539\u53D8\u4E16\u754C\u7684\u529B\u91CF",
      avatar: "https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030",
      url: "https://sugarat.top"
    }
  ]
  // 公告，右侧广告栏
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //     {
  //       type: 'image',
  //       src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp'
  //     },
  //     {
  //       type: 'text',
  //       content: '欢迎大家加群&私信交流'
  //     },
  //     {
  //       type: 'text',
  //       content: '文章首/文尾有群二维码',
  //       style: 'padding-top:0'
  //     },
  //     {
  //       type: 'button',
  //       content: '作者博客',
  //       link: 'https://sugarat.top'
  //     },
  //     {
  //       type: 'button',
  //       content: '加群交流',
  //       props: {
  //         type: 'success'
  //       },
  //       link: 'https://theme.sugarat.top/group.html',
  //     }
  //   ],
  //   duration: 0
  // },
});

// docs/.vitepress/config.mts
var config_default = defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  // base,
  lang: "zh-cn",
  title: "@sugarat/theme",
  description: "\u7CA5\u91CC\u6709\u52FA\u7CD6\u7684\u535A\u5BA2\u4E3B\u9898\uFF0C\u57FA\u4E8E vitepress \u5B9E\u73B0",
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ["link", { rel: "icon", href: "/favicon.ico" }]
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: "\u76EE\u5F55"
    },
    // 默认文案修改
    returnToTopLabel: "\u56DE\u5230\u9876\u90E8",
    sidebarMenuLabel: "\u76F8\u5173\u6587\u7AE0",
    lastUpdatedText: "\u4E0A\u6B21\u66F4\u65B0\u4E8E",
    // 设置logo
    logo: "/logo.png",
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: "\u9996\u9875", link: "/" },
      { text: "\u5173\u4E8E\u4F5C\u8005", link: "/" }
    ],
    socialLinks: [
      // {
      //   icon: 'github',
      //   link: 'https://github.com/ATQQ/sugar-blog/tree/master/packages/theme'
      // }
    ]
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAiZG9jcy8udml0ZXByZXNzL2Jsb2ctdGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTdHVkeV9ub3Rlc1xcXFxteS1ibG9nXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcU3R1ZHlfbm90ZXNcXFxcbXktYmxvZ1xcXFxkb2NzXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovU3R1ZHlfbm90ZXMvbXktYmxvZy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuLy8gXHU1QkZDXHU1MTY1XHU0RTNCXHU5ODk4XHU3Njg0XHU5MTREXHU3RjZFXG5pbXBvcnQgeyBibG9nVGhlbWUgfSBmcm9tICcuL2Jsb2ctdGhlbWUnXG5cbi8vIFx1NTk4Mlx1Njc5Q1x1NEY3Rlx1NzUyOCBHaXRIdWIvR2l0ZWUgUGFnZXMgXHU3QjQ5XHU1MTZDXHU1MTcxXHU1RTczXHU1M0YwXHU5MEU4XHU3RjcyXG4vLyBcdTkwMUFcdTVFMzhcdTk3MDBcdTg5ODFcdTRGRUVcdTY1MzkgYmFzZSBcdThERUZcdTVGODRcdUZGMENcdTkwMUFcdTVFMzhcdTRFM0FcdTIwMUMvXHU0RUQzXHU1RTkzXHU1NDBEL1x1MjAxRFxuLy8gXHU1OTgyXHU2NzlDXHU5ODc5XHU3NkVFXHU1NDBEXHU1REYyXHU3RUNGXHU0RTNBIG5hbWUuZ2l0aHViLmlvIFx1NTdERlx1NTQwRFx1RkYwQ1x1NTIxOVx1NEUwRFx1OTcwMFx1ODk4MVx1NEZFRVx1NjUzOVx1RkYwMVxuLy8gY29uc3QgYmFzZSA9IHByb2Nlc3MuZW52LkdJVEhVQl9BQ1RJT05TID09PSAndHJ1ZSdcbi8vICAgPyAnL3ZpdGVwcmVzcy1ibG9nLXN1Z2FyLXRlbXBsYXRlLydcbi8vICAgOiAnLydcblxuLy8gVml0ZXByZXNzIFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVxuLy8gXHU4QkU2XHU4OUMxXHU2NTg3XHU2ODYzXHVGRjFBaHR0cHM6Ly92aXRlcHJlc3MuZGV2L3JlZmVyZW5jZS9zaXRlLWNvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLy8gXHU3RUU3XHU2MjdGXHU1MzVBXHU1QkEyXHU0RTNCXHU5ODk4KEBzdWdhcmF0L3RoZW1lKVxuICBleHRlbmRzOiBibG9nVGhlbWUsXG4gIC8vIGJhc2UsXG4gIGxhbmc6ICd6aC1jbicsXG4gIHRpdGxlOiAnQHN1Z2FyYXQvdGhlbWUnLFxuICBkZXNjcmlwdGlvbjogJ1x1N0NBNVx1OTFDQ1x1NjcwOVx1NTJGQVx1N0NENlx1NzY4NFx1NTM1QVx1NUJBMlx1NEUzQlx1OTg5OFx1RkYwQ1x1NTdGQVx1NEU4RSB2aXRlcHJlc3MgXHU1QjlFXHU3M0IwJyxcbiAgbGFzdFVwZGF0ZWQ6IHRydWUsXG4gIC8vIFx1OEJFNlx1ODlDMVx1RkYxQWh0dHBzOi8vdml0ZXByZXNzLmRldi96aC9yZWZlcmVuY2Uvc2l0ZS1jb25maWcjaGVhZFxuICBoZWFkOiBbXG4gICAgLy8gXHU5MTREXHU3RjZFXHU3RjUxXHU3QUQ5XHU3Njg0XHU1NkZFXHU2ODA3XHVGRjA4XHU2NjNFXHU3OTNBXHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU3Njg0IHRhYiBcdTRFMEFcdUZGMDlcbiAgICAvLyBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiBgJHtiYXNlfWZhdmljb24uaWNvYCB9XSwgLy8gXHU0RkVFXHU2NTM5XHU0RTg2IGJhc2UgXHU4RkQ5XHU5MUNDXHU0RTVGXHU5NzAwXHU4OTgxXHU1NDBDXHU2QjY1XHU0RkVFXHU2NTM5XG4gICAgWydsaW5rJywgeyByZWw6ICdpY29uJywgaHJlZjogJy9mYXZpY29uLmljbycgfV1cbiAgXSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICAvLyBcdTVDNTVcdTc5M0EgMiwzIFx1N0VBN1x1NjgwN1x1OTg5OFx1NTcyOFx1NzZFRVx1NUY1NVx1NEUyRFxuICAgIG91dGxpbmU6IHtcbiAgICAgIGxldmVsOiBbMiwgM10sXG4gICAgICBsYWJlbDogJ1x1NzZFRVx1NUY1NSdcbiAgICB9LFxuICAgIC8vIFx1OUVEOFx1OEJBNFx1NjU4N1x1Njg0OFx1NEZFRVx1NjUzOVxuICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdTU2REVcdTUyMzBcdTk4NzZcdTkwRTgnLFxuICAgIHNpZGViYXJNZW51TGFiZWw6ICdcdTc2RjhcdTUxNzNcdTY1ODdcdTdBRTAnLFxuICAgIGxhc3RVcGRhdGVkVGV4dDogJ1x1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFx1NEU4RScsXG5cbiAgICAvLyBcdThCQkVcdTdGNkVsb2dvXG4gICAgbG9nbzogJy9sb2dvLnBuZycsXG4gICAgLy8gZWRpdExpbms6IHtcbiAgICAvLyAgIHBhdHRlcm46XG4gICAgLy8gICAgICdodHRwczovL2dpdGh1Yi5jb20vQVRRUS9zdWdhci1ibG9nL3RyZWUvbWFzdGVyL3BhY2thZ2VzL2Jsb2dwcmVzcy86cGF0aCcsXG4gICAgLy8gICB0ZXh0OiAnXHU1M0JCIEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTUxODVcdTVCQjknXG4gICAgLy8gfSxcbiAgICBuYXY6IFtcbiAgICAgIHsgdGV4dDogJ1x1OTk5Nlx1OTg3NScsIGxpbms6ICcvJyB9LFxuICAgICAgeyB0ZXh0OiAnXHU1MTczXHU0RThFXHU0RjVDXHU4MDA1JywgbGluazogJy8nIH1cbiAgICBdLFxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICAvLyB7XG4gICAgICAvLyAgIGljb246ICdnaXRodWInLFxuICAgICAgLy8gICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL0FUUVEvc3VnYXItYmxvZy90cmVlL21hc3Rlci9wYWNrYWdlcy90aGVtZSdcbiAgICAgIC8vIH1cbiAgICBdXG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXFN0dWR5X25vdGVzXFxcXG15LWJsb2dcXFxcZG9jc1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxTdHVkeV9ub3Rlc1xcXFxteS1ibG9nXFxcXGRvY3NcXFxcLnZpdGVwcmVzc1xcXFxibG9nLXRoZW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9TdHVkeV9ub3Rlcy9teS1ibG9nL2RvY3MvLnZpdGVwcmVzcy9ibG9nLXRoZW1lLnRzXCI7Ly8gXHU0RTNCXHU5ODk4XHU3MkVDXHU2NzA5XHU5MTREXHU3RjZFXG5pbXBvcnQgeyBnZXRUaGVtZUNvbmZpZyB9IGZyb20gJ0BzdWdhcmF0L3RoZW1lL25vZGUnXG5cbi8vIFx1NUYwMFx1NTQyRlJTU1x1NjUyRlx1NjMwMVx1RkYwOFJTU1x1OTE0RFx1N0Y2RVx1RkYwOVxuLy8gaW1wb3J0IHR5cGUgeyBUaGVtZSB9IGZyb20gJ0BzdWdhcmF0L3RoZW1lJ1xuXG4vLyBjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vc3VnYXJhdC50b3AnXG4vLyBjb25zdCBSU1M6IFRoZW1lLlJTU09wdGlvbnMgPSB7XG4vLyAgIHRpdGxlOiAnXHU3Q0E1XHU5MUNDXHU2NzA5XHU1MkZBXHU3Q0Q2Jyxcbi8vICAgYmFzZVVybCxcbi8vICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIFx1N0NBNVx1OTFDQ1x1NjcwOVx1NTJGQVx1N0NENicsXG4vLyAgIGRlc2NyaXB0aW9uOiAnXHU0RjYwXHU3Njg0XHU2MzA3XHU1QzE2LFx1NjJFNVx1NjcwOVx1NjUzOVx1NTNEOFx1NEUxNlx1NzU0Q1x1NzY4NFx1NTI5Qlx1OTFDRlx1RkYwOFx1NTkyN1x1NTI0RFx1N0FFRlx1NzZGOFx1NTE3M1x1NjI4MFx1NjcyRlx1NTIwNlx1NEVBQlx1RkYwOScsXG4vLyAgIGxhbmd1YWdlOiAnemgtY24nLFxuLy8gICBpbWFnZTogJ2h0dHBzOi8vaW1nLmNkbi5zdWdhcmF0LnRvcC9tZEltZy9NVFkzTkRrNU5URTJOekF6TUE9PTY3NDk5NTE2NzAzMCcsXG4vLyAgIGZhdmljb246ICdodHRwczovL3N1Z2FyYXQudG9wL2Zhdmljb24uaWNvJyxcbi8vIH1cblxuLy8gXHU2MjQwXHU2NzA5XHU5MTREXHU3RjZFXHU5ODc5XHVGRjBDXHU4QkU2XHU4OUMxXHU2NTg3XHU2ODYzOiBodHRwczovL3RoZW1lLnN1Z2FyYXQudG9wL1xuY29uc3QgYmxvZ1RoZW1lID0gZ2V0VGhlbWVDb25maWcoe1xuICAvLyBcdTVGMDBcdTU0MkZSU1NcdTY1MkZcdTYzMDFcbiAgLy8gUlNTLFxuXG4gIC8vIFx1NjQxQ1x1N0QyMlxuICAvLyBcdTlFRDhcdThCQTRcdTVGMDBcdTU0MkZwYWdlZmluZFx1NzlCQlx1N0VCRlx1NzY4NFx1NTE2OFx1NjU4N1x1NjQxQ1x1N0QyMlx1NjUyRlx1NjMwMVx1RkYwOFx1NTk4Mlx1NEY3Rlx1NzUyOFx1NTE3Nlx1NUI4M1x1NzY4NFx1NTNFRlx1NEVFNVx1OEJCRVx1N0Y2RVx1NEUzQWZhbHNlXHVGRjA5XG4gIC8vIHNlYXJjaDogZmFsc2UsXG5cbiAgLy8gbWFya2Rvd24gXHU1NkZFXHU4ODY4XHU2NTJGXHU2MzAxXHVGRjA4XHU0RjFBXHU1ODlFXHU1MkEwXHU0RTAwXHU1QjlBXHU3Njg0XHU2Nzg0XHU1RUZBXHU4MDE3XHU2NUY2XHVGRjA5XG4gIC8vIG1lcm1haWQ6IHRydWVcblxuICAvLyBcdTk4NzVcdTgxMUFcbiAgZm9vdGVyOiB7XG4gICAgLy8gbWVzc2FnZSBcdTVCNTdcdTZCQjVcdTY1MkZcdTYzMDFcdTkxNERcdTdGNkVcdTRFM0FIVE1MXHU1MTg1XHU1QkI5XHVGRjBDXHU5MTREXHU3RjZFXHU1OTFBXHU2NzYxXHU1M0VGXHU0RUU1XHU5MTREXHU3RjZFXHU0RTNBXHU2NTcwXHU3RUM0XG4gICAgLy8gbWVzc2FnZTogJ1x1NEUwQlx1OTc2MiBcdTc2ODRcdTUxODVcdTVCQjlcdTU0OENcdTU2RkVcdTY4MDdcdTkwRkRcdTY2MkZcdTUzRUZcdTRFRTVcdTRGRUVcdTY1MzlcdTc2ODRcdTU2NjJcdUZGMDhcdTVGNTNcdTcxMzZcdTY3MkNcdTY3NjFcdTUxODVcdTVCQjlcdTRFNUZcdTY2MkZcdTUzRUZcdTRFRTVcdTk2OTBcdTg1Q0ZcdTc2ODRcdUZGMDknLFxuICAgIGNvcHlyaWdodDogJ01JVCBMaWNlbnNlIHwgXHU2REE2XHU5NkU4JyxcbiAgICBpY3BSZWNvcmQ6IHtcbiAgICAgIG5hbWU6ICdcdFx1NTE4MElDUFx1NTkwNzIwMjIwMjM3ODdcdTUzRjcnLFxuICAgICAgbGluazogJ2h0dHBzOi8vYmVpYW4ubWlpdC5nb3YuY24vJ1xuICAgIH0sXG4gICAgLy8gc2VjdXJpdHlSZWNvcmQ6IHtcbiAgICAvLyAgIG5hbWU6ICdcdTUxNkNcdTdGNTFcdTVCODlcdTU5MDd4eHh4eCcsXG4gICAgLy8gICBsaW5rOiAnaHR0cHM6Ly93d3cuYmVpYW4uZ292LmNuL3BvcnRhbC9pbmRleC5kbydcbiAgICAvLyB9LFxuICB9LFxuXG4gIC8vIFx1NEUzQlx1OTg5OFx1ODI3Mlx1NEZFRVx1NjUzOVxuICB0aGVtZUNvbG9yOiAnZWwtYmx1ZScsXG5cbiAgLy8gXHU2NTg3XHU3QUUwXHU5RUQ4XHU4QkE0XHU0RjVDXHU4MDA1XG4gIGF1dGhvcjogJ1x1NkRBNlx1OTZFOCcsXG5cbiAgLy8gXHU1M0NCXHU5NEZFXG4gIGZyaWVuZDogW1xuICAgIHtcbiAgICAgIG5pY2tuYW1lOiAnXHU3Q0E1XHU5MUNDXHU2NzA5XHU1MkZBXHU3Q0Q2JyxcbiAgICAgIGRlczogJ1x1NEY2MFx1NzY4NFx1NjMwN1x1NUMxNlx1NzUyOFx1NEU4RVx1NjUzOVx1NTNEOFx1NEUxNlx1NzU0Q1x1NzY4NFx1NTI5Qlx1OTFDRicsXG4gICAgICBhdmF0YXI6XG4gICAgICAgICdodHRwczovL2ltZy5jZG4uc3VnYXJhdC50b3AvbWRJbWcvTVRZM05EazVOVEUyTnpBek1BPT02NzQ5OTUxNjcwMzAnLFxuICAgICAgdXJsOiAnaHR0cHM6Ly9zdWdhcmF0LnRvcCcsXG4gICAgfSxcbiAgXSxcblxuICAvLyBcdTUxNkNcdTU0NEFcdUZGMENcdTUzRjNcdTRGQTdcdTVFN0ZcdTU0NEFcdTY4MEZcbiAgLy8gcG9wb3Zlcjoge1xuICAvLyAgIHRpdGxlOiAnXHU1MTZDXHU1NDRBJyxcbiAgLy8gICBib2R5OiBbXG4gIC8vICAgICB7IHR5cGU6ICd0ZXh0JywgY29udGVudDogJ1x1RDgzRFx1REM0N1x1NTE2Q1x1NEYxN1x1NTNGN1x1RDgzRFx1REM0Ny0tLVx1RDgzRFx1REM0NyBcdTVGQUVcdTRGRTEgXHVEODNEXHVEQzQ3JyB9LFxuICAvLyAgICAge1xuICAvLyAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAvLyAgICAgICBzcmM6ICdodHRwczovL2ltZy5jZG4uc3VnYXJhdC50b3AvbWRJbWcvTVRZeE5UQXhPRGMyTlRJeE1BPT02MTUwMTg3NjUyMTB+Zm10LndlYnAnXG4gIC8vICAgICB9LFxuICAvLyAgICAge1xuICAvLyAgICAgICB0eXBlOiAndGV4dCcsXG4gIC8vICAgICAgIGNvbnRlbnQ6ICdcdTZCMjJcdThGQ0VcdTU5MjdcdTVCQjZcdTUyQTBcdTdGQTQmXHU3OUMxXHU0RkUxXHU0RUE0XHU2RDQxJ1xuICAvLyAgICAgfSxcbiAgLy8gICAgIHtcbiAgLy8gICAgICAgdHlwZTogJ3RleHQnLFxuICAvLyAgICAgICBjb250ZW50OiAnXHU2NTg3XHU3QUUwXHU5OTk2L1x1NjU4N1x1NUMzRVx1NjcwOVx1N0ZBNFx1NEU4Q1x1N0VGNFx1NzgwMScsXG4gIC8vICAgICAgIHN0eWxlOiAncGFkZGluZy10b3A6MCdcbiAgLy8gICAgIH0sXG4gIC8vICAgICB7XG4gIC8vICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAvLyAgICAgICBjb250ZW50OiAnXHU0RjVDXHU4MDA1XHU1MzVBXHU1QkEyJyxcbiAgLy8gICAgICAgbGluazogJ2h0dHBzOi8vc3VnYXJhdC50b3AnXG4gIC8vICAgICB9LFxuICAvLyAgICAge1xuICAvLyAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgLy8gICAgICAgY29udGVudDogJ1x1NTJBMFx1N0ZBNFx1NEVBNFx1NkQ0MScsXG4gIC8vICAgICAgIHByb3BzOiB7XG4gIC8vICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnXG4gIC8vICAgICAgIH0sXG4gIC8vICAgICAgIGxpbms6ICdodHRwczovL3RoZW1lLnN1Z2FyYXQudG9wL2dyb3VwLmh0bWwnLFxuICAvLyAgICAgfVxuICAvLyAgIF0sXG4gIC8vICAgZHVyYXRpb246IDBcbiAgLy8gfSxcbn0pXG5cbmV4cG9ydCB7IGJsb2dUaGVtZSB9XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNTLFNBQVMsb0JBQW9COzs7QUNDblUsU0FBUyxzQkFBc0I7QUFpQi9CLElBQU0sWUFBWSxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBWS9CLFFBQVE7QUFBQTtBQUFBO0FBQUEsSUFHTixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLRjtBQUFBO0FBQUEsRUFHQSxZQUFZO0FBQUE7QUFBQSxFQUdaLFFBQVE7QUFBQTtBQUFBLEVBR1IsUUFBUTtBQUFBLElBQ047QUFBQSxNQUNFLFVBQVU7QUFBQSxNQUNWLEtBQUs7QUFBQSxNQUNMLFFBQ0U7QUFBQSxNQUNGLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBb0NGLENBQUM7OztBRGpGRCxJQUFPLGlCQUFRLGFBQWE7QUFBQTtBQUFBLEVBRTFCLFNBQVM7QUFBQTtBQUFBLEVBRVQsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBO0FBQUEsRUFFYixNQUFNO0FBQUE7QUFBQTtBQUFBLElBR0osQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0sZUFBZSxDQUFDO0FBQUEsRUFDaEQ7QUFBQSxFQUNBLGFBQWE7QUFBQTtBQUFBLElBRVgsU0FBUztBQUFBLE1BQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUFBLE1BQ1osT0FBTztBQUFBLElBQ1Q7QUFBQTtBQUFBLElBRUEsa0JBQWtCO0FBQUEsSUFDbEIsa0JBQWtCO0FBQUEsSUFDbEIsaUJBQWlCO0FBQUE7QUFBQSxJQUdqQixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBTU4sS0FBSztBQUFBLE1BQ0gsRUFBRSxNQUFNLGdCQUFNLE1BQU0sSUFBSTtBQUFBLE1BQ3hCLEVBQUUsTUFBTSw0QkFBUSxNQUFNLElBQUk7QUFBQSxJQUM1QjtBQUFBLElBQ0EsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLYjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
