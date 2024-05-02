class APIFeatures {
  constructor(query, queryString, authUserId) {
    this.query = query;
    this.queryString = queryString;
    this.authUserId = authUserId;
  }

  // FILTER
  filter() {
    // 1A) filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // 2A) Advanced filtering
    // SEARCH QUERY : ?difficulty=easy&duration[gte]=5
    // QUERY OBJECT : { difficulty: 'easy', duration: [ gte:'5' ]}
    // Expected QUERY OBJECT : { difficulty: 'easy', duration: [ $gte:'5' ]}
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // In mongoose there are two ways of writing a database query
    // Way 01 : Using objects
    // When we use await , the query will execute and return a document
    // If we use await , then we can't  use sorting methods [limit,sort,fields ] on return object
    this.query.find(JSON.parse(queryStr));

    // Way 02 : Using mongoose methods
    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    return this;
  }

  // SORT
  sort() {
    if (this.queryString.sort && this.authUserId) {
      this.query.populate("author");
      this.query.sort({ author: /equal to current login user / });
    } else {
      this.query.sort({ createdAt: -1 });
    }
    return this;
  }
}

module.exports = APIFeatures;
