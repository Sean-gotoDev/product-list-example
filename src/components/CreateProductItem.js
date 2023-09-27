import {
    Button,
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    CardActions,
    CardContent, FormControl, OutlinedInput, InputAdornment, InputLabel, CardMedia, Select, MenuItem
} from "@mui/material"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import {useState} from "react";

import dayjs from "dayjs";
import 'dayjs/locale/en-gb';

export default function CreateProductItem({addProduct, existingProduct, editProduct, removeProduct}) {
    const [product, setProduct] = useState(existingProduct ? existingProduct : {name:"", description: "", price: "", category: "", expires: false, expiryDate: dayjs('2023-12-12'), special: false})
    
    const add = (e) => {
        addProduct(product)
        e.preventDefault()
    }
    
    const update = () => {
        setProduct((prevState) => ({ ...prevState, 'isEditMode': false }));
        editProduct(product)
    }

    const remove = () => {
        removeProduct(product.id)
    }

    const setEditMode = () => {
        setProduct((prevState) => ({ ...prevState, 'isEditMode': true }));
    }
    
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const onChangeBooleanHandler = (e) => {
        const { name, checked } = e.target;
        setProduct((prevState) => ({ ...prevState, [name]: checked }));
    };

    const onChangeDateHandler = (newValue) => {
        setProduct((prevState) => ({ ...prevState, expiryDate: newValue }));
    };
    
    return (
        <Grid item xs={2} sm={4} md={4} key={0}>
            <Card sx={{ minWidth: 275 }} className={existingProduct && existingProduct.special ? "special" : ""}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={product.image ? product.image : 'https://placehold.co/600x400?text=Add product'}
                    title={product.name}
                />
                <CardContent>
                    <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="Name"
                                variant="standard"
                                name="name"
                                onChange={onChangeHandler}
                                error={!product || !product.name}
                                value={product.name}
                                disabled={existingProduct && !product.isEditMode}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="standard-basic"
                                label="Description"
                                variant="standard"
                                name="description"
                                onChange={onChangeHandler}
                                value={product.description}
                                disabled={existingProduct && !product.isEditMode}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth error={!product || !product.price || isNaN(product.price)}>
                                <InputLabel htmlFor="price-field">Price</InputLabel>
                                <OutlinedInput
                                    id="price-field"
                                    name="price"
                                    startAdornment={<InputAdornment position="start">£</InputAdornment>}
                                    label="Price"
                                    onChange={onChangeHandler}
                                    value={product.price}
                                    disabled={existingProduct && !product.isEditMode}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category-select"
                                    name="category"
                                    label="Category"
                                    value={product.category}
                                    onChange={onChangeHandler}
                                    disabled={existingProduct && !product.isEditMode}
                                    >
                                    <MenuItem value={'groceries'}>Groceries</MenuItem>
                                    <MenuItem value={'furniture'}>Furniture</MenuItem>
                                    <MenuItem value={'appliances'}>Appliances</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel
                                control={<Checkbox checked={product.expires} />}
                                label="Expire"
                                name="expires"
                                onChange={onChangeBooleanHandler}
                                disabled={existingProduct && !product.isEditMode}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                <DatePicker
                                    disabled={existingProduct && !product.isEditMode && !product.expires}
                                    onChange={onChangeDateHandler}
                                    value={product.expiryDate} />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel
                                control={<Checkbox checked={product.special} />}
                                label="Special"
                                name="special"
                                onChange={onChangeBooleanHandler}
                                disabled={existingProduct && !product.isEditMode}
                            />
                        </Grid>
                    </Grid>
                    
                </CardContent>
                <CardActions>
                    {!existingProduct && <Button size="small" onClick={add} disabled={!product.name || !product.price || isNaN(product.price)}>Add</Button>}
                    {existingProduct && product.isEditMode && <Button size="small" onClick={update} disabled={!product.name || !product.price || isNaN(product.price)}>Save</Button>}
                    {existingProduct && !product.isEditMode && <Button size="small" onClick={setEditMode}>Edit</Button>}
                    {existingProduct && <Button size="small" onClick={remove}>Delete</Button>}
                </CardActions>
            </Card>
        </Grid>
        )
}