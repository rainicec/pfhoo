require.config({
    paths: {
        'jquery': '../lib/jquery-1.10.1.min',
    },
    shim: {
        'index': ['jquery'],//依赖多个模块
        'head': ['jquery'],
        'sidebar': ['jquery'],
        'bottom_con': ['jquery'],
    }
});