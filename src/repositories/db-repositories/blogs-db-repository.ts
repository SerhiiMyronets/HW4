import {blogsCollection} from "../../db/db";
import {ObjectId} from "mongodb";
import {mapperRepository} from "../mapper-repository";
import {BlogInputModel, BlogViewModel} from "../../models/repository/blogs-models";
import {BlogInputMongoDB} from "../../models/db-models";

export const blogsRepository = {
    async findBlogs(): Promise<BlogViewModel[]> {
        const result = await blogsCollection
            .find()
            .toArray()
        return result.map(b =>
            (mapperRepository.blogOutputMongoDBToBlogViewModel(b)))
    },
    async findBlogById(id: string): Promise<BlogViewModel | null> {
        const result = await blogsCollection
            .findOne({_id: new ObjectId(id)})
        if (result) {
            return mapperRepository.blogOutputMongoDBToBlogViewModel(result)
        } else {
            return null
        }
    },
    async creatBlog(newBlogBody: BlogInputMongoDB): Promise<BlogViewModel | null> {
        const res = await blogsCollection
            .insertOne(newBlogBody)
        return this.findBlogById(res.insertedId.toString());
    },
    async updateBlog(id: string, newUpdatedBlogBody: BlogInputModel): Promise<Boolean> {
        const result = await blogsCollection
            .updateOne({_id: new ObjectId(id)}, {
                $set: newUpdatedBlogBody
            })
        return result.modifiedCount === 1
    },
    async deleteBlog(id: string): Promise<Boolean> {
        const result = await blogsCollection
            .deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async deleteAllBlogs(): Promise<Boolean> {
        await blogsCollection
            .deleteMany({})
        return true
    }
}