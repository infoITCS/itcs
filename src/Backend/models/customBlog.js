import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

const collection = () => mongoose.connection.db.collection('customblogs')

export const findPublished = async (limit = 50) =>
  collection().find({ status: 'published' }).sort({ createdAt: -1 }).limit(limit).toArray()

export const findOneBySlug = async (slug) =>
  collection().findOne({ slug })

export const findWhere = async (query = {}) =>
  collection().find(query).sort({ createdAt: -1 }).toArray()

export const findById = async (id) =>
  collection().findOne({ _id: ObjectId.createFromHexString(id) })

export const create = async (data) => {
  const doc = { ...data, createdAt: new Date(), updatedAt: new Date() }
  const result = await collection().insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export const findByIdAndUpdate = async (id, update) => {
  const result = await collection().findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    { $set: { ...update, updatedAt: new Date() } },
    { returnDocument: 'after' }
  )
  return result
}

export const findByIdAndDelete = async (id) => {
  const result = await collection().deleteOne({ _id: ObjectId.createFromHexString(id) })
  return result.deletedCount > 0 ? { _id: id } : null
}
