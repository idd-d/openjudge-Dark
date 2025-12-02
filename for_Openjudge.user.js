// ==UserScript==
// @name        OpenJudge Dark Mode / 深色模式切换
// @match       http://dsa.openjudge.cn/*
// @match       http://*.openjudge.cn/*
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 定义深色模式的 CSS 样式
    const darkModeCSS = `
        /* 强制覆盖全局背景和文字颜色 */
        html.dark-mode,
        html.dark-mode body {
            background-color: #121212 !important;
            color: #e0e0e0 !important;
        }

        /* 链接颜色优化 - 浅蓝色更易读 */
        html.dark-mode a {
            color: #64b5f6 !important;
        }
        html.dark-mode a:hover {
            color: #9be7ff !important;
        }

        /* 常见的容器处理 (div, table, lists) */
        html.dark-mode div,
        html.dark-mode p,
        html.dark-mode ul,
        html.dark-mode li {
            background-color: transparent !important;
            color: inherit !important;
        }

        /* 顶部导航和底部区域通常需要深一点的背景 */
        html.dark-mode #header,
        html.dark-mode .header,
        html.dark-mode #footer,
        html.dark-mode .footer,
        html.dark-mode #top {
            background-color: #1f1f1f !important;
            border-bottom: 1px solid #333 !important;
        }

        /* 表格样式处理 (OpenJudge 常用表格布局) */
        html.dark-mode table,
        html.dark-mode tr,
        html.dark-mode td,
        html.dark-mode th {
            background-color: #1e1e1e !important;
            color: #e0e0e0 !important;
            border-color: #333 !important;
        }

        /* 偶数行稍微变色，增加可读性 */
        html.dark-mode tr:nth-child(even) td {
            background-color: #252525 !important;
        }

        /* 输入框和文本域 */
        html.dark-mode input,
        html.dark-mode textarea,
        html.dark-mode select {
            background-color: #2c2c2c !important;
            color: #fff !important;
            border: 1px solid #555 !important;
        }

        /* 代码块 (Code Blocks) - 最重要的部分 */
        html.dark-mode pre,
        html.dark-mode code {
            background-color: #282c34 !important;
            color: #abb2bf !important;
            border: 1px solid #3e4451 !important;
            font-family: 'Consolas', 'Monaco', monospace !important;
        }

        /* 处理特定的 OpenJudge 元素可能出现的白色背景 */
        html.dark-mode .main,
        html.dark-mode #main {
            background-color: #121212 !important;
        }

        /* 切换按钮样式 */
        #dm-toggle-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 99999;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background-color: #007bff;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #dm-toggle-btn:hover {
            transform: scale(1.1);
            background-color: #0056b3;
        }

        /* 针对特定高亮代码样式的修复 */
        html.dark-mode .syntaxhighlighter {
            background-color: #282c34 !important;
        }
        html.dark-mode .syntaxhighlighter .line.alt1,
        html.dark-mode .syntaxhighlighter .line.alt2 {
            background-color: #282c34 !important;
        }
    `;

    // 注入 CSS
    GM_addStyle(darkModeCSS);

    // 创建切换按钮
    const btn = document.createElement('button');
    btn.id = 'dm-toggle-btn';
    btn.innerHTML = '🌙'; // 默认月亮图标
    btn.title = "切换深色/浅色模式";
    document.body.appendChild(btn);

    // 状态管理函数
    function setDarkMode(isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
            btn.innerHTML = '☀️'; // 切换为太阳图标
            GM_setValue('oj_dark_mode', true);
        } else {
            document.documentElement.classList.remove('dark-mode');
            btn.innerHTML = '🌙'; // 切换为月亮图标
            GM_setValue('oj_dark_mode', false);
        }
    }

    // 初始化：读取存储的设置
    const savedMode = GM_getValue('oj_dark_mode', false);
    setDarkMode(savedMode);

    // 绑定点击事件
    btn.addEventListener('click', function() {
        const isCurrentlyDark = document.documentElement.classList.contains('dark-mode');
        setDarkMode(!isCurrentlyDark);
    });

})();
