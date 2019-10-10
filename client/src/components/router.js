export const ROUTER = {
    HOME: "/",
    SEARCH: "/search",
    CONTACT: "/contact/",
    AUTHOR: (_id) => `/author/${_id}/`,
    POSTS_LIST: "/posts/list/",
    POSTS_READ: (_id) => `/posts/read/${_id}/`,
    DOCUMENTARIES_WATCH: (watch) => `/documentaries/watch/${watch}/`,
    DOCUMENTARIES_TYPE: (type) => `/documentaries/type/${type}/`,
    PAGE: (rank, slug) => `/page/${rank}/${slug}`,
    CATEGORY_DETAIL: (_id) => `/categories/detail/${_id}/`,
}