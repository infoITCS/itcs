import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'

let _ready = false
let _db = null

export const setDb = (db) => {
  _db = db
  _ready = true
  console.log('✅ dbHelpers initialized with database:', db.databaseName)
}

const coll = (name) => {
  if (!_ready || !_db) throw new Error('Database not connected')
  return _db.collection(name)
}

// Users
export const findUserByEmail = (email) => coll('users').findOne({ email })
export const findUserById = (id) => coll('users').findOne({ _id: ObjectId.createFromHexString(id) })
export const createUser = (data) => coll('users').insertOne(data)
export const updateUserById = (id, update) => coll('users').updateOne(
  { _id: ObjectId.createFromHexString(id) },
  { $set: update }
)
export const setUserResetToken = (email, token, expires) => coll('users').updateOne(
  { email },
  { $set: { resetPasswordToken: token, resetPasswordExpires: expires } }
)
export const findUserByResetToken = (token) => coll('users').findOne({
  resetPasswordToken: token,
  resetPasswordExpires: { $gt: new Date().toISOString() }
})

// CustomBlogs
export const findBlogPublished = (limit = 50) =>
  coll('customblogs').find({ status: 'published' }).sort({ createdAt: -1 }).limit(limit).toArray()

export const findBlogOneBySlug = (slug) =>
  coll('customblogs').findOne({ slug })

export const findBlogWhere = (query = {}) =>
  coll('customblogs').find(query).sort({ createdAt: -1 }).toArray()

export const findBlogById = (id) =>
  coll('customblogs').findOne({ _id: ObjectId.createFromHexString(id) })

export const createBlog = async (data) => {
  const doc = { ...data, createdAt: new Date(), updatedAt: new Date() }
  const result = await coll('customblogs').insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export const updateBlogById = async (id, update) => {
  const result = await coll('customblogs').findOneAndUpdate(
    { _id: ObjectId.createFromHexString(id) },
    { $set: { ...update, updatedAt: new Date() } },
    { returnDocument: 'after' }
  )
  return result
}

export const deleteBlogById = async (id) => {
  const result = await coll('customblogs').deleteOne({ _id: ObjectId.createFromHexString(id) })
  return result.deletedCount > 0 ? { _id: id } : null
}

// BlogStatuses (Dev.to)
export const findBlogStatuses = () =>
  coll('blogstatuses').find({}).toArray()

export const findApprovedIds = () =>
  coll('blogstatuses').find({ status: 'approved' }).project({
    devId: 1, customAuthor: 1, customDate: 1, createdAt: 1
  }).toArray()

export const upsertBlogStatus = (devId, update) =>
  coll('blogstatuses').findOneAndUpdate(
    { devId },
    { $set: update },
    { upsert: true, returnDocument: 'after' }
  )

// Jobs
export const findAllJobs = () =>
  coll('jobs').find({}).sort({ createdAt: -1 }).toArray()

export const findJobById = (id) =>
  coll('jobs').findOne({ _id: ObjectId.createFromHexString(id) })

export const createJob = async (data) => {
  const doc = { ...data, createdAt: new Date() }
  const result = await coll('jobs').insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export const deleteJobById = async (id) => {
  const result = await coll('jobs').deleteOne({ _id: ObjectId.createFromHexString(id) })
  return result.deletedCount > 0 ? { _id: id } : null
}
