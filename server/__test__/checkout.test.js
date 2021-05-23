const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')
const should = chai.should()
const server = require('../src/server')

chai.use(chaiHttp)

describe('Checkout', () => {
    describe('/POST checkout', ()=> {

        it('should write request into output file', (done) => {
            let request = {
                items: [
                    {
                        id: 1,
                        quantity: 2,
                        total: 24
                    },
                    {
                        id: 2,
                        quantity:1,
                        total: 7
                    }
                ],
                totalAmount: 31
            }
            chai.request(server)
                .post('/checkout')
                .send(request)
                .end((err, res) => {
                    should.exist(res.body)
                    res.should.have.status(200)
                    const output = require('./test_output.json')
                    output.should.be.eql(request)
                    done()
              })
        })
    })
})