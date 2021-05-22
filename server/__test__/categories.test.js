const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../server')

chai.use(chaiHttp)

describe('Categories', () => {
    describe('/GET categories', ()=> {
        it('should retrieve all categories', (done) => {
            chai.request(server)
                .get('/categories')
                .end((err, res) => {
                    should.exist(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(3)
                    res.body.should.be.eql(
                        [
                            {
                                "id": 1,
                                "name": "Burger"
                            },
                            {
                                "id": 2,
                                "name": "Sides"
                            },
                            {
                                "id": 3,
                                "name": "Drinks"
                            }
                        ]
                    )
                    done()
              })
        })
    })

    describe('/GET/:id/items ', ()=> {
        it('should return all items when category with given id exists', (done) => {
            chai.request(server)
                .get('/categories/1/items')
                .end((err, res) => {
                    should.exist(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(4)
                    res.body[0].should.eql({
                        "id": 1,
                        "name": "Chicken Burger",
                        "img": "https://assets.grilld.com.au/images/Products/Burgers/Chicken-Burgers/_crop185/CHICKEN_BirdAndBrie_Trad_1500x1200px.jpg?mtime=20210429162929",
                        "price": 15.99,
                        "categoryId": 1
                    })
                    done()
              })
        })

        it('should return empty list when category id not given', (done) => {
            chai.request(server)
                .get('/categories/null/items')
                .end((err, res) => {
                    should.exist(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
              })
        })

        it('should return empty list when category with id not exists', (done) => {
            chai.request(server)
                .get('/categories/13/items')
                .end((err, res) => {
                    should.exist(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(0)
                    done()
              })
        })
    })
})