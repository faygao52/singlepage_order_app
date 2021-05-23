import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '../App'

const server = setupServer(
    rest.get('/categories', (req, res, ctx) => {
        return res(ctx.json([ { name: 'Product', id: 1 }]))
    }),
    rest.get('/categories/1/items', (req, res, ctx) => {
        return res(ctx.json([{ name: 'Playstation 5', price: '749', id: 2 } ]))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('render', async () => {
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    expect(screen.getByText(/Products/i)).toBeInTheDocument()
    expect(screen.getByText(/Order/i)).toBeInTheDocument()
    expect(screen.getByText(/Pay/i)).toBeInTheDocument()
    expect(screen.getByText(/0.00/i)).toBeInTheDocument()
})

test('fetch and display categories', async () => {
    const fakeCategory = { name: 'Game Console', id: 1 }
    server.use(
        rest.get('/categories', (req, res, ctx) => {
            return res(ctx.json([fakeCategory]))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    expect(screen.getByText('Game Console')).toBeInTheDocument()
})

test('should display error message if category is not loaded', async () => {
    server.use(
        rest.get('/categories', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
})

test('should display error message if item is not loaded', async () => {
    server.use(
        rest.get('/categories/1/items', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading items...'))
    expect(screen.getByText(/Unable to load items, please try again later/i)).toBeInTheDocument()
})

test('should display item and total price when click item', async () => {
    server.use(
        rest.get('/categories/1/items', (req, res, ctx) => {
            return res(ctx.json([{ name: 'Playstation 5', price: '749', id: 2 }]))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading items...'))
    fireEvent.click(screen.getByText(/Playstation 5/i))
    expect(document.querySelector('.ItemName')).toHaveTextContent('Playstation 5')
    expect(document.querySelector('.Payment').children[1]).toHaveTextContent('$749.00')
})

test('should remove item when quantity becomes 0 ', async () => {
    server.use(
        rest.get('/categories/1/items', (req, res, ctx) => {
            return res(ctx.json([{ name: 'Playstation 5', price: '749', id: 2 }]))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading items...'))
    fireEvent.click(screen.getByText(/Playstation 5/i))
    expect(document.querySelector('.OrderedItemsWrapper').children.length).toEqual(1)
    fireEvent.click(screen.getByText(/-/i))
    expect(document.querySelector('.OrderedItemsWrapper').children.length).toEqual(0)
    expect(screen.getByText(/0.00/i)).toBeInTheDocument()
})

test('should calculate total when select mutiple items ', async () => {
    server.use(
        rest.get('/categories/1/items', (req, res, ctx) => {
            return res(ctx.json([{ name: 'Playstation 5', price: '749', id: 2 }, { name: 'XBox Series X', price: '859', id: 1} ]))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading items...'))
    fireEvent.click(screen.getByText(/Playstation 5/i))
    fireEvent.click(screen.getByText(/XBox Series X/i))
    expect(document.querySelector('.OrderedItemsWrapper').children.length).toEqual(2)
    expect(screen.getByText(/1608.00/i)).toBeInTheDocument()
})

test('should show error message when payment is failed', async () => {
    server.use(
        rest.post('/checkout', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading items...'))
    fireEvent.click(screen.getByText(/Playstation 5/i))
    fireEvent.click(screen.getByText(/Pay/i))
    setTimeout(() => {
        expect(screen.getByText(/Sorry, payment is not processed/i)).toBeInTheDocument()
    }, 2000);
})

test('should show clear order section when payment go through', async () => {
    server.use(
        rest.post('/checkout', (req, res, ctx) => {
            return res(ctx.status(200))
        })
    )    
    render(<App />)
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await waitForElementToBeRemoved(() => screen.getByText('Loading items...'))
    fireEvent.click(screen.getByText(/Playstation 5/i))
    fireEvent.click(screen.getByText(/Pay/i))
    setTimeout(() => {
        expect(screen.getByText(/0.00/i)).toBeInTheDocument()
    }, 2000);
})
