import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc     Fetch all products
//@route    Get /api/products
//@access   Public

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword })

  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc     Fetch single product
//@route    Get /api/products/:id
//@access   Public
const getProductbyId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) res.json(product)
  else {
    res.status(404)
    throw new Error('No product found')
  }
})

//@desc     Delete a product
//@route    Delete /api/products/:id
//@access   Private/Admin only
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({
      message: 'Product Removed successfully',
    })
  } else {
    res.status(404)
    throw new Error('No product found')
  }
})

//@desc     Create a product
//@route    POST /api/products/
//@access   Private/Admin only
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample/jpg',
    brand: 'sample brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private/Admin only

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.price = price
    product.name = name
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//@desc     Post Reviews
//@route    POST /api/products/:id/reviews
//@access   Private

const createProductReviews = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    const alreadyReviewed = product.review.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.review.push(review)
    product.numReviews = product.review.length
    product.rating =
      product.review.reduce((acc, item) => item.rating + acc, 0) /
      product.review.length
    await product.save()
    res.status(201).json({ message: 'review added' })
  } else {
    res.status(404)
    throw new Error('Product not Found')
  }
})

//@desc     GET top rated products
//@route    GET /api/products/top
//@access   Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5)
  res.json(products)
})

export {
  getProducts,
  getProductbyId,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReviews,
  getTopProducts,
}
