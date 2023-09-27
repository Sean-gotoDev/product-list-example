import { Grid} from "@mui/material"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {IconButton, Menu, MenuItem} from "@mui/material";
import FilterList from '@mui/icons-material/FilterList';
import { Container } from "@mui/system"

import { useState } from "react";

import CreateProductItem from "./CreateProductItem";

export default function ProductList() {

    const [anchorElement, setAnchorElement] = useState(null);
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState("all")
    
    const open = Boolean(anchorElement);
    const handleClick = (event) => {
        setAnchorElement(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElement(null);
    };

    const handleFilterSelect = (filterValue) => {
        setFilter(filterValue);
        handleClose();
    };
    
    function removeProduct(id) {
        setProducts(products.filter( t => t.id != id))
    }

    function editProduct(updatedProduct) {
        const updatedList = products.map((product) => {
            if (updatedProduct.id === product.id) {
                return updatedProduct;
            }
            return product;
        })
        
        setProducts(updatedList)
    }

    function addProduct(product) {
        setProducts([{
            ...product,
            image: "https://picsum.photos/id/" + (products.length + 1) + "/600/400",
            id: products.length + 1
        },
        ...products])
    }

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Products
                    </Typography>
                    <IconButton 
                        id="filter-button"
                        aria-controls={open ? 'filter-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{color: 'white'}}
                        >
                        <FilterList fontSize="inherit" />
                    </IconButton>
                    <Menu
                        id="filter-menu"
                        anchorEl={anchorElement}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'filter-button'}}
                        >
                        <MenuItem onClick={() => handleFilterSelect("all")}>All</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("groceries")}>Groceries</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("furniture")}>Furniture</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("appliances")}>Appliances</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Container className="Content">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                    <CreateProductItem addProduct={addProduct}></CreateProductItem>
                    {filter === 'all' && products && products.map( t => <CreateProductItem existingProduct={t} removeProduct={removeProduct} editProduct={editProduct} key={t.id}/>)}
                    {filter !== 'all' && products && products.filter( t => t.category === filter).map( t => <CreateProductItem existingProduct={t} removeProduct={removeProduct} editProduct={editProduct} key={t.id}/>)}
                </Grid>
            </Container>
        </div>
    )
}