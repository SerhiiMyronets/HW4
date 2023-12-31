//presentation input models
export type PostInputModel = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}
export type PostInputByBlogModel = {
    title: string
    shortDescription: string
    content: string
}
export type findPostsPaginateModel = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: "asc" | "desc"
}
export type findPostsByBlogPaginateModel = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: "asc" | "desc"
}
//presentation view models
export type PostViewModel = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}
export type PostViewModelPaginated = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: PostViewModel[]
}
